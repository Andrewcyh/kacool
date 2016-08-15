var fs = require('fs');
var util = require('./../util');
var Cards = require('../../models/cards');

var Col = {
  init: function(app){
    app.post('/col/get', this.getCol);
    app.post('/col/add', this.addCol);
    app.post('/col/delete', this.deleteCol);
  },

  //获取收藏消息
  getCol: function(req, res){
    var name = req.session.user.name;

    Cards.findCol(name, function(err, doc){
      if(!doc){
        return res.send({
          status: 0,
          data: []
        });
      }else{
        return res.send({
          status: 1,
          data: doc
        });
      }
    });
  },

  //增加收藏
  addCol: function(req, res){
    var cardID = req.param('cardID');

    Cards.findOne(cardID, function(err, doc){
      if(!doc){
        res.send({
          status: 0,
          data: '没有此卡片'
        });
      }
      doc.type = 1;
      doc.save(function(err){
        if(err) throw err;
        else{
          return res.send({
            status: 1,
            data: '加入收藏'
          });
        }
      });
    });
  },

  deleteCol: function(req, res){
    var cardID = req.param('cardID');

    Cards.findOne(cardID, function(err ,doc){
      if(!doc){
        return res.send({
          status: 0,
          data: '没有此卡片'
        });
      }else{
        doc.type = 0;
        doc.save(function(err){
          if(err) throw err;
          else{
            return res.send({
              status: 1,
              data: '取消收藏'
            });
          }
        });
      }
    });
  }
};

module.exports = Col;