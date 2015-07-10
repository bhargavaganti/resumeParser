// call initialization file
if (window.File && window.FileList && window.FileReader) {
    //console.log('calling init');
    document.addEventListener('DOMContentLoaded', function(){
        Init();
    });
}
// initialize
function Init() {
    //console.log('hi from init');
    var filedrag = document.getElementById("filedrag"),
        list = document.getElementById('list'),
        msg = document.getElementById("messages"),
        info = document.getElementById('info');
    // file drag hover
    list.style.display = 'none';
    function FileDragHover(e) {
        e.stopPropagation();
        e.preventDefault();
        e.target.className = (e.type == "dragover" ? "hover" : "");
    }

    // file selection
    function FileSelectHandler(e) {
        // cancel event and hover styling
        console.log('event', e);
        FileDragHover(e);
        // fetch FileList object
        var files = Array.prototype.slice.call(e.target.files || e.dataTransfer.files);
        var formData = new FormData();
        console.log('number of files', files.length);
        // process all File objects

        files.forEach(function (file, index) {
            formData.append('file ' + index, file);
        });
        Promise.all([getPromise('/uploadresume', 'POST', formData)]).then(function (data) {
            //console.log('results ',data[0]);
            msg.innerHTML = 'Files uploaded successfully';
            console.log(JSON.parse(data));
            msg.innerHTML = 'files uploaded successfully';
            parseResume(JSON.parse(data));
       },function(err){
         console.log('error uploading files ', err);
        });
    function getPromise(url, httpVerb, formData) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(httpVerb, url);
            xhr.addEventListener('readystatechange', function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        //console.log(xhr.responseText);
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(xhr.statusText);
                    }
                }
            });
            xhr.send(formData);
        });
    }
    function getDetails() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/getdetails');
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4) {
                console.log(JSON.parse(xhr.responseText));
                list.style.display = 'block';
                list.addEventListener('click', function(){
                   list.innerHTML = JSON.parse(xhr.responseText);
                });
            }
        });
        xhr.send(JSON.stringify(files));
    }
    function parseResume(files) {
        console.log('files', files);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/parseresume');
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4) {
                console.log(xhr.responseText);
                getDetails();
            }
        });
        xhr.send(JSON.stringify(files));
    }
};
    filedrag.addEventListener("dragover", FileDragHover, false);
    filedrag.addEventListener("dragleave", FileDragHover, false);
    filedrag.addEventListener("drop", FileSelectHandler, false);
}
