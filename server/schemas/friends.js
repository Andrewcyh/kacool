  /**
 * Created by andrewchen on 16/8/4.
 */
  var mongoose = require('mongoose');

  var FriendSchema = new mongoose.Schema({
    name: String,
    friendName: Array
  });

  FriendSchema.statics = {
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
    }
  };

  module.exports = FriendSchema;
