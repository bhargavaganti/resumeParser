var express = require('express');
var router = express.Router();
var spawn = require('child_process').spawn;

function conversion(filename){

    pdftotext    = spawn('pdftotext.exe', ['C:\\Users\\Rashmika\\Documents\\GitHub\\untitled\\upload\\' + filename + '.pdf', 'C:\\Users\\Rashmika\\Documents\\GitHub\\untitled\\text\\' + filename + '.txt'],  {cwd: 'C:\\Users\\Rashmika\\Documents\\xpdf'});

    pdftotext.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });

    pdftotext.on('close', function (code) {
        console.log('child process exited with code ' + code);
    });
}



