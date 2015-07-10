var express = require('express'),
    router = express.Router(),
    resumeInfo = require('../modules/resumeInfo');

/* GET home page.*/
router.get('/', function(req, res) {
    resumeInfo.find({},function(err, results){
        if(err) res.status(500).json(err);
        else res.status(200).json(JSON.stringify(results));
    });
});
router.post('/', function (req, res){
    res.send({default: ''});
});
module.exports = router;
