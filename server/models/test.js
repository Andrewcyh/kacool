/**
 * Created by andrewchen on 16/8/7.
 */
var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost','kacool');
db.on('error', function(err) {
    console.error(err);
});

var newSchema = require('../schemas/test');
var New = db.model('new',newSchema);


module.exports = New;