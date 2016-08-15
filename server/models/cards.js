/**
 * Created by andrewchen on 16/8/4.
 */
var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost','kacool');
db.on('error', function(err) {
    console.error(err);
});

var CardsSchema = require('../schemas/cards');
var Cards = db.model('Cards',CardsSchema);


module.exports = Cards;