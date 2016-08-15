/**
 * Created by andrewchen on 16/8/2.
 */
var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost','kacool');
db.on('error', function(err) {
    console.error(err);
});

var UsersSchema = require('../schemas/users');
var Users = db.model('User',UsersSchema);


module.exports = Users;