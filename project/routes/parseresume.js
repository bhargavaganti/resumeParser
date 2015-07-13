var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    resumeInfo = require('../modules/resumeInfo');

/* GET home page.*/
router.get('/', function(req, res) {
    resumeInfo.find({},function(err, results){
        if(err) res.status(500).json(err);
        else res.status(200).json(JSON.stringify(results));
    });
});
router.post('/', function (req, res){
    //console.log('files received', req.body);
    var textfiles = req.body.txtfiles, emailAddr = '', phoneNum = 0;
    //console.log(textfiles);
    textfiles.forEach(function(file){
        readContent(file, function(err, content){
            emailAddr = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi.exec(content);
            phoneNum = /(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/.exec(content);
            //console.log('email found in the resume ',emailAddr);
            //console.log('phone number found in the resume ',phoneNum);
            savetoMongo(file, emailAddr, phoneNum);
        });
    });
    res.status(200).json(JSON.stringify({message: 'Files uploaded successfully'}));
});

function savetoMongo(filename, email, phone){
    (new resumeInfo({filename: filename, email: email, phone: phone})).save(function (err, result){
        if(err) console.log(err);
        else console.log('saved to mongo', result);
    });
}

function readContent(filename, callback) {
    fs.readFile('./text/' + filename + '.txt', 'UTF-8', function (err, content) {
        if (err) return callback(err)
        callback(null, content);
    });
}
module.exports = router;
