var express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    spawn = require('child_process').spawn,
    fs = require('fs'),
    filename = '',
    email = '',
    filesObj = {},
    phone = 0;

/* GET home page.*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use(multer({
  dest:'./upload/'
}));
router.post('/', function (req, res){
  //console.log('req.files',req.files);
  filesObj = req.files;
  //console.log(Object.keys(filesObj));
  Object.keys(filesObj).forEach(function(index){
    //console.log(index);
    var filename = req.files[index].originalname.split('.')[0];
    pdftotext    = spawn('pdftotext.exe', ['C:\\Users\\Rashmika\\Documents\\GitHub\\resumeParser\\project\\upload\\' + req.files[index].name, 'C:\\Users\\Rashmika\\Documents\\GitHub\\resumeParser\\project\\text\\' + filename + '.txt'],  {cwd: 'C:\\Users\\Rashmika\\Documents\\xpdf'});
    pdftotext.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });
    pdftotext.on('close', function (code) {
      console.log('child process exited with code ' + code);
      readContent(filename, function (err, content) {
        console.log(content);
        email = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi.exec(content);
        phone = /(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/.exec(content);
        console.log('email found in the resume',email[0]);
        console.log('phone number found in the resume',phone[0]);
        //email = content.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
      });
    });
  });
  res.status(200).json(req.files);
});

function readContent(filename, callback) {
  fs.readFile('./text/' + filename + '.txt', 'UTF-8', function (err, content) {
    if (err) return callback(err)
    callback(null, content);
  });
}
module.exports = router;