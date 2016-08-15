/**
 * Created by andrewchen on 16/8/7.
 */
var mongoose = require('mongoose');

var newSchema = new mongoose.Schema({
    name: String
});

newSchema.statics = {
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
    insertOne: function(val, cb){
        this.insert(val, function(err){
            if(err) return cb(err);
            return cb(null);
        });
    }
};

module.exports = newSchema;