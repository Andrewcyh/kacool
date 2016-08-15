/**
 * Created by andrewchen on 16/8/7.
 */
var fs = require('fs');
var util = require('./../util');
var Cards = require('../../models/cards');
var uuid = require('node-uuid');
var moment = require('../../public/js/moment');
var formidable = require('formidable');

var Card = {
    init: function(app){
        app.post('/card/get', this.getCard); //获得所有卡片信息
        //app.post('/card/update', this.updateCard); //是否有更新
        app.post('/card/delete', this.deleteCard); //删除卡片
        app.post('/card/add', this.addCard); //增加卡片
    },

    //获得所有卡片信息
    getCard: function(req, res){
        var name = req.param('name');

        Cards.findByName(name, function(err, doc){
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

    //是否有更新
    //updateCard: function(req, res){
    //
    //},

    //删除卡片
    deleteCard: function(req, res){
        var cardID = req.param('cardID');

        Cards.findOne(cardID, function(err, doc){
            if(!doc){
                return res.send({
                    status: 0,
                    data: '没有此卡片'
                });
            }else{
                doc.remove(function(err){
                    if(err){
                        return res.send({
                            status: 0,
                            data: '删除失败'
                        });
                    }else{
                        return res.send({
                            status: 1,
                            data: '删除成功'
                        });
                    }
                });

            }
        });
    },

    //增加卡片
    addCard: function(req, res){
        var form = new formidable.IncomingForm();
        form.uploadDir = 'public/upload/';   //文件保存在系统临时目录
        form.encoding = 'utf-8';   //设置编辑
        form.maxFieldsSize = 20 * 1024 * 1024;  //上传文件大小限制为最大20M
        form.keepExtensions = true;        //使用文件的原扩展名

        var targetDir = path.join(__dirname, '../../public/upload');
        // 检查目标目录，不存在则创建
        fs.access(targetDir, function(err){
            if(err){
                fs.mkdirSync(targetDir);
            }
            _fileParse();
        });

        // 文件解析与保存
        function _fileParse() {
            form.parse(req, function (err, fields, files) {
                var obj= new Cards;
                var ext = moment().format('X');
                obj.cardID = util.guid() + '-' + ext;
                obj.cardName = fields.cardName;
                obj.toName = fields.toName;
                obj.authName = fields.authName;
                obj.type = 0;
                obj.date = moment().format('YYYY-MM-DD HH:mm:ss');
                obj.address = [];

                address = fields.address;
                obj.address.push = address;
                if (err) throw err;
                //var filesUrl = [];
                var errCount = 0;
                var keys = Object.keys(files);
                keys.forEach(function(key){
                    var filePath = files[key].path;
                    var fileExt = filePath.substring(filePath.lastIndexOf('.'));
                    if (('.jpg.jpeg.png.gif.mp4').indexOf(fileExt.toLowerCase()) === -1) {
                        errCount += 1;
                    } else {
                        //以当前时间戳对上传文件进行重命名
                        var fileName = uuid.v1() + fileExt;
                        var targetFile = path.join(targetDir, fileName);
                        //移动文件
                        fs.renameSync(filePath, targetFile);
                        // 文件的Url（相对路径）
                        obj.address.push = '/upload/' +  fileName;
                    }
                });
                // 返回上传信息
                obj.save(function(err){
                    if(err){
                        return res.send({
                            status: 0,
                            data: err + "--" + errCount
                        });
                    }else{
                        console.log("上传成功");
                        return res.send({
                            status: 1,
                            data: 'success'
                        });
                    }
                });
            });
        }
    }
};

module.exports = Card;