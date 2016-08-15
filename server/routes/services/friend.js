/**
 * Created by andrewchen on 16/8/7.
 */
var fs = require('fs');
var util = require('./../util');
var Friends = require('../../models/friends');
var Users = require('../../models/users');
var Cards = require('../../models/cards');

var Friend = {
    init: function(app){
        app.post('/friend/add', this.addFriend); //增加好友
        app.post('/friend/show', this.showFriend); //获得好友信息
        app.post('/friend/query', this.queryFriend); //查询所有人
    },

    //增加好友
    addFriend: function(req, res){
        var name = req.session.user.name;
        var FriName = req.param('FriName');
        Users.findOne(FriName, function(err, doc){
            if(!doc) {
                return res.send({
                    status: 0,
                    data: '没有此用户'
                });
            }
            var FriID = doc.userID;
            Friends.findOne(name, function(err, doc){
                if(FriID in doc.friendName){
                    return res.send({
                        status: 0,
                        data: '此用户已为好友'
                    });
                }
                doc.friendName.push(FriID);
                doc.save(function(err){
                    if(err) throw err;
                    else{
                        return res.send({
                            status: 1,
                            data: '成功加为好友'
                        });
                    }
                });

            });
        });
    },

    //获得好友信息
    showFriend: function(req, res){
        var name = req.session.user.name;
        Friends.findOne(name, function(err, doc){
            if(!doc){
                return res.send({
                    status: 0,
                    data: '无此用户'
                });
            }else{
                var result = doc.friendName;
                Users.findFriend(result, function(err, doc){
                   if(!doc){
                       return res.send({
                           status: 0,
                           data: 'Failed'
                       })
                   }else{
                       return res.send({
                           status: 1,
                           data: doc
                       });
                   }
                });
            }
        });
    },

    //查询所有人
    queryFriend: function(req, res){
        var name = req.param('name');

        Users.findOne(name, function(err, doc){
           if(!doc){
               return res.send({
                   status: 0,
                   data: '没有此用户'
               });
           } else{
               delete doc.password;
               delete doc.token;
               return res.send({
                   status: 1,
                   data: doc
               });
           }
        });
    }
};

module.exports = Friend;