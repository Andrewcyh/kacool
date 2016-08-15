/**
 * Created by andrewchen on 16/8/4.
 */
var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost','kacool');
db.on('error', function(err) {
    console.error(err);
});

var ColsSchema = require('../schemas/collections');
var Cols = db.model('Cols',ColsSchema);


module.exports = Cols;