  /**
 * Created by andrewchen on 16/8/4.
 */
  var mongoose = require('mongoose');
  var db = mongoose.createConnection('localhost','kacool');
  db.on('error', function(err) {
    console.error(err);
  });

  var FriendsSchema = require('../schemas/friends');
  var Friends = db.model('Friends',FriendsSchema);


  module.exports = Friends;