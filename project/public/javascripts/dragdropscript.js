// output information
function Output(msg) {
    var m = document.getElementById("messages");
    m.innerHTML = msg + m.innerHTML;
}
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
        progressbar = document.querySelector('progress'),
        filePromises = [],
        formData = new FormData();
        xhr = new XMLHttpRequest();

    //formData.append("name", "Rashmika");
    // file drag hover

    function FileDragHover(e) {
        e.stopPropagation();
        e.preventDefault();
        e.target.className = (e.type == "dragover" ? "hover" : "");
    }

// file selection
    function FileSelectHandler(e) {
        // cancel event and hover styling
        FileDragHover(e);
        // fetch FileList object
        var files = Array.prototype.slice.call(e.target.files || e.dataTransfer.files);
        // process all File objects



        function getPromise(file, index) {
            return new Promise(function (resolve, reject) {
                //var xhr = new XMLHttpRequest();
                xhr.open('POST', '/');
                xhr.addEventListener('readystatechange', function(){
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200 ) {
                            console.log(xhr.responseText);
                            resolve(xhr.responseText);
                        } else {
                            reject (xhr.statusText);
                        }
                    }
                });
                formData.append('file ' + index, file);
                // not generally required
                /*xhr.addEventListener('error', function () {
                    reject('Some other error (error description here) ... ');
                });*/
                xhr.send(formData);
            });
        }



        //xhr.open('post', '/');
        files.forEach(function (file, index){
            filePromises.push[getPromise(file, index)];
        });
        Promise.all(filePromises).then(function (data) {
                console.log('results ',data[0]);
                //console.log('done');
            }, function (error) {
                console.log(error);

            });
        //console.log('formData', formData);
        /*xhr.upload.addEventListener('progress', function (event){
            var progressVal = event.loaded/event.total;
            console.log(progressVal);
            progressbar.setAttribute('value', progressVal * 100);
        });
*/
        //xhr.send(formData);
    }
    filedrag.addEventListener("dragover", FileDragHover, false);
    filedrag.addEventListener("dragleave", FileDragHover, false);
    filedrag.addEventListener("drop", FileSelectHandler, false);
}
