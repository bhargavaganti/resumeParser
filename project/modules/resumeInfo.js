var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var resumeInfo = mongoose.model('resume',{
    filename: String,
    email: Object,
    phone: Object
});
module.exports = resumeInfo;