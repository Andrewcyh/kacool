var fs = require('fs');
var util = require('./../util');
var Friends = require('../../models/friends');
var Users = require('../../models/users');
var uuid = require('node-uuid');
var formidable = require('formidable');
var moment = require('../../public/js/moment');


var User = {

  init: function(app){
    app.post('/user/get', this.getUser); //获取用户信息
    app.post('/user/register', this.addUser); //注册
    app.post('/user/login/', this.login); //登陆
    app.post('/user/login/token', this.loginByToken); //用token登陆
    app.post('/user/password/update', this.updatePassword); //更新密码
    app.post('/user/head/upload', this.updatehead); //更新头像
    app.post('/usr/address/update', this.updateAdd); //更新用户所在地址
  },

  //获取用户信息
  getUser: function(req, res){
    var token = req.param("token");

    Users.findToken(token, function(err, doc){
      if(!doc){
        return res.send({
          status: 0,
          data: 'token失效'
        });
      }else{
        return res.send({
          status: 0,
          data: doc
        });
      }
    });
  },

  //添加用户
  addUser: function(req, res){
    var username = req.param('username');
    var password = util.md5(req.param('password'));
    var userUrl = '';
    var headUrl = '';
    var email = req.param('email');
    var token = '';

    if(!username || !password || !userUrl || !headUrl || !email || !token){
      return res.send({
        status: 0,
        data: '缺少必要参数'
      });
    }
    var obj1 = new Users;

    obj1 = {
      "userID": util.guid(),
      "name": username,
      "password": password,
      "email": email,
      "userUrl": userUrl,
      "headUrl": headUrl,
      "address": "",
      "time": moment().format('YYYY-MM-DD HH:mm:ss'),
      "token": ''
    };

    var obj2 = new Friends;
    obj2 = {
      "name": username,
      "friendName": []
    };

    Users.findOne(username, function(err, doc){
      if(!doc){
        obj1.save(function(err){
          if(err) throw err;
          else{
            obj2.save(function(err){
              if(err) throw err;
              else{
                return res.send({
                  status: 1,
                  data: '注册成功'
                });
              }
            });
          }
        });
      }else{
        return res.send({
          status: 0,
          data: '用户已经存在'
        });
      }
    });
  },

  //用户登录
  login: function(req, res){
    var user = {
      name: "",
      password: "",
      token: ""
    };
    var name = req.param('name');
    var password = util.md5(req.param('password'));
    var deviceId = req.param('deviceId');
    var token = util.guid() + deviceId;

    Users.findOne(name,function(err,doc){
      if(!doc){
        return res.send({
          status: 0,
          data:'该用户不存在'
        });
      }else{
        if(password != doc.password){
          return res.send({
            status:0,
            data:'密码错误'
          })
        }
        user.name = name;
        user.password = password;
        user.token = token;
        req.session.user = user;
        doc.token = token;
        doc.save(function(err){
          if(err) throw err;
          else{
            doc.token = token;
            //删除密码
            delete doc.password;
            return res.send({
              status:1,
              data: doc
            });
          }
        });

      }
    });
  },

  //通过token登录
  loginByToken: function(req, res){
    var token = req.session.user.token;

    Users.findToken(token, function(err, doc){
      if(!doc){
        return res.send({
          status: 0,
          data: 'token失效'
        });
      }else{
        delete doc.password;
        res.send({
          status: 1,
          data: doc
        })
      }
    });
  },

  //用户修改密码
  updatePassword: function(req, res){
    var token = req.param('token');
    var oldPassword = util.md5(req.param('oldPassword'));
    var password = util.md5(req.param('password'));

    Users.findToken(token, function(err, doc){
      if(!doc){
        return res.send({
          status: 0,
          data: '更新失败，没有找到该用户'
        });
      }else{
        if(oldPassword != doc.password){
          return res.send({
            status: 0,
            data: '更新失败，初始密码错误'
          });
        }
        doc.password = password;
        doc.save(function(err){
          if(err) throw err;
          else{
            return res.send({
              status: 1,
              data: '更新成功'
            });
          }
        });

      }
    });
  },


  //用户上传头像
  updatehead: function(req, res){
    //创建上传表单
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置上传目录
    form.uploadDir = 'public/upload/';
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
      if(err) {
        return res.send({
          status: 0,
          data: err
        });
      }
      console.log(fields);
      var extName = /\.[^\.]+/.exec(files.file.name);
      var ext = Array.isArray(extName) ? extName[0] : '';
      //重命名，以防文件重复
      var avatarName = uuid.v4() + ext;
      console.log(avatarName);
      //移动的文件目录
      var newPath = form.uploadDir + avatarName;
      fs.renameSync(files.file.path, newPath);
      //保存路径
      Users.findOne(req.session.user.name, function(err,doc) {
        if (doc == 0) {
          return res.send({
            status: 0,
            data:'error'
          });
        } else {
          doc.headUrl = avatarName;
          doc.save(function(err) {
            if (err) throw err;
            else {
              console.log("上传成功");
              console.log(doc);
              return res.send({
                status: 1,
                data: 'success'
              });
            }
          });
        }
      }); //save
    });
  },

  //更新用户所在地址
  updateAdd: function(req, res){
    var address = req.param('address');

  }
};


module.exports = User;