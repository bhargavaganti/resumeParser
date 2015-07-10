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
        info = document.getElementById('info'),
        filePromises = [];
        //xhr = new XMLHttpRequest();

    //formData.append("name", "Rashmika");
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
        console.log('number of files',files.length);
        // process all File objects

        files.forEach(function (file, index){
            filePromises.push[getPromise(file, index)];
        });

        function getPromise(file, index) {
            formData.append('file ' + index, file);
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', '/parseresume');
                xhr.addEventListener('readystatechange', function(){
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200 ) {
                            //console.log(xhr.responseText);
                            resolve(JSON.parse(xhr.responseText));
                        } else {
                            reject (xhr.statusText);
                        }
                    }
                });
                xhr.send(formData);
            });
        }
        console.log('promises array length', filePromises);
        Promise.all(filePromises).then(function (data) {
                //console.log('results ',data[0]);
                msg.innerHTML = 'Files uploaded successfully';
                list.style.display = 'block';
            list.addEventListener('click', function(){
                var xhr = new XMLHttpRequest(), data;
                xhr.open('GET', '/parseresume');
                xhr.addEventListener('readystatechange',function(){
                    if(xhr.readyState === 4){
                        if (xhr.status == 200) {
                            info.innerHTML = '';
                            data = JSON.parse(xhr.responseText);
                            msg.innerHTML = data;
                        }
                    }
                });
                xhr.send();
            });
            }, function (error) {
                console.log(error);
            });
    }

    filedrag.addEventListener("dragover", FileDragHover, false);
    filedrag.addEventListener("dragleave", FileDragHover, false);
    filedrag.addEventListener("drop", FileSelectHandler, false);
}
