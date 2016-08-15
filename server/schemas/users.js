/**
 * Created by andrewchen on 16/8/4.
 */
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    userID: { type: String, unique: true },
    name: String,
    password: String,
    email: String,
    userUrl: String,
    headUrl: String,
    address: String,
    time: String,
    token: String
});

UserSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .exec(cb);
    },
    findOne: function(val, cb) {
        this.find({"name": val},function(err, doc) {
            if(err) return cb(err);
            if(doc) {
                cb(null, doc[0]);
            }
        });
    },
    findFriend: function(val, cb){
        var query = this.find({"userID": {$in: val}});
        query.exec(function(err, doc){
            if(err) return cb(err);
            if(doc) {
                cb(null, doc);
            }
        });
    }
    ,
    findToken: function(val, cb) {
        this.find({"token": val},function(err, doc) {
            if(err) return cb(err);
            if(doc) {
                cb(null, doc[0]);
            }
        });
    }
};

module.exports = UserSchema;