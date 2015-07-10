var express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    spawn = require('child_process').spawn;

/* GET home page.*/
router.get('/', function(req, res) {
    /*resumeInfo.find({},function(err, results){
        if(err) res.status(500).json(err);
        else res.status(200).json(JSON.stringify(results));
    });*/
});
router.use(multer({
    dest:'./upload/'
}));
router.post('/', function (req, res){
    //console.log('files received',req.files);
    var files = [], filesObj = {}, filename = '';
    filesObj = req.files;
    //console.log('keys',Object.keys(filesObj));
    Object.keys(filesObj).forEach(function(index){
        filename = filesObj[index].originalname.split('.')[0];
        files.push(filename);
        //console.log('filename',filename);
        pdftotext = spawn('pdftotext.exe', ['C:\\Users\\Rashmika\\Documents\\GitHub\\resumeParser\\project\\upload\\' + req.files[index].name, 'C:\\Users\\Rashmika\\Documents\\GitHub\\resumeParser\\project\\text\\' + filename + '.txt'],  {cwd: 'C:\\Users\\Rashmika\\Documents\\xpdf'});

        pdftotext.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });
        pdftotext.on('close', function (code) {
            console.log('child process exited with code ' + code);
        });
    });
    console.log('files',files);
    res.status(200).json(JSON.stringify({txtfiles: files}));
});
module.exports = router;
