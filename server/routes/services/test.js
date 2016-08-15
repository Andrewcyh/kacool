var New = require('../../models/test');

var Test = {
  init: function(app){
    app.get('/test/test', this.doTest);
    app.get('/test/show', this.doShow);
    app.get('/test/add/:name', this.doAdd);
    app.get('/test/update/:oldname/:name', this.doUpdate);
    app.get('/test/fetch', this.doFetch);
    app.get('/test/delete/:name', this.doDelete);
  },

  doTest: function(req, res){
    res.send({
      status: 1,
      info: '测试服务doTest'
    });
  },

  doShow: function(req, res){
    res.json({
      status: 1,
      info: '测试服务doShow'
    });
  },

  doAdd: function(req, res){
    var name = req.param('name');

    var obj = new New;
    obj.name = name;

    obj.save(function(err){
      if(err){
        return res.send({
          status: 0,
          info: "Failed"
        });
      }else{
        return res.send({
          status: 1,
          info: 'Success'
        });
      }
    });
  },

  doUpdate: function(req, res){
    var oldname = req.param('oldname');
    var name = req.param('name');

    New.findOne(oldname, function(err, doc){
      if(!doc){
        return res.send({
          status: 0,
          info: '没有此用户'
        });
      }else{
        doc.name = name;
        doc.save(function(err){
          if(err){
            return res.send({
              status: 0,
              info: "Update Failed"
            });
          }else{
            return res.send({
              status: 1,
              info: 'Update Success'
            });
          }
        });
      }
    })
  },

  doFetch: function(req, res){
    New.fetch(function(err, doc){
      if(!doc){
        return res.send({
          status: 0,
          info: '没有数据'
        });
      }else{
        return res.send({
          status: 1,
          info: doc
        });
      }
    });
  },

  doDelete: function(req, res){
    var name = req.param('name');

    New.findOne(name, function(err, doc){
      if(!doc){
        return res.send({
          status: 0,
          info: '没有此用户'
        });
      }else{
        doc.remove(function(err){
          if(err){
            return res.send({
              status: 0,
              info: "删除失败"
            });
          }else{
            return res.send({
              status: 1,
              info: '删除成功'
            });
          }
        });
      }
    })
  }
};

module.exports = Test;