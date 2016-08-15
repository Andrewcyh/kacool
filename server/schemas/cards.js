/**
 * Created by andrewchen on 16/8/4.
 */
var mongoose = require('mongoose');

var CardSchema = new mongoose.Schema({
    cardID: { type: String, unique: true },
    cardName: String,
    toName: String,
    authName: String,
    type: Number,
    date: String,
    address: Array
});

CardSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .exec(cb);
    },
    findOne: function(val, cb) {
        this.find({"cardID": val},function(err, doc) {
            if(err) return cb(err);
            if(doc) {
                cb(null, doc[0]);
            }
        });
    },
    findByName: function(val, cb) {
        var query = this.find({"toName": val});
        query.exec(function(err, doc){
            if(err) return cb(err);
            if(doc) {
                cb(null, doc);
            }
        });
    },
    findByAuth: function(val, cb) {
        this.find({"authName": val}, function(err, doc) {
            if(err) return cb(err);
            if(doc) {
                cb(null, doc);
            }
        })
    },
    findCol: function(val, cb){
        var query = this.find({"toName": val, "type": 1});
        query.exec(function(err, doc){
            if(err) return cb(err);
            if(doc) {
                cb(null, doc);
            }
        });
    }
};

module.exports = CardSchema;
