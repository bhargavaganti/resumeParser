var express = require('express');
var router = express.Router();
var multer = require('multer');

/* GET home page.*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use(multer({
  dest:'./upload/'
}));
router.post('/', function (req, res){
  console.log('req.files',req.files);
  res.status(200).json(req.files);
  /*readContent(function (err, content) {
    console.log(content);
  });*/
  //res.render('upload');
});

/*function readContent(callback) {
  fs.readFile('./upload/TODO.txt', 'UTF-8', function (err, content) {
    if (err) return callback(err)
    callback(null, content);
  });
}*/
module.exports = router;