var express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    spawn = require('child_process').spawn,
    fs = require('fs'),
    filename = '';

/* GET home page.*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use(multer({
  dest:'./upload/'
}));
router.post('/', function (req, res){
  console.log('req.files',req.files);
  var filename = req.files['file 0'].originalname.split('.')[0];
  pdftotext    = spawn('pdftotext.exe', ['C:\\Users\\Rashmika\\Documents\\GitHub\\resumeParser\\project\\upload\\' + req.files['file 0'].name, 'C:\\Users\\Rashmika\\Documents\\GitHub\\resumeParser\\project\\text\\' + filename + '.txt'],  {cwd: 'C:\\Users\\Rashmika\\Documents\\xpdf'});
  pdftotext.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });

  pdftotext.on('close', function (code) {
    console.log('child process exited with code ' + code);
    readContent(filename, function (err, content) {
     console.log(content);
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