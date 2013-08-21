/**
 * Created with JetBrains WebStorm.
 * User: t-tiyan
 * Date: 8/21/13
 * Time: 2:48 PM
 * To change this template use File | Settings | File Templates.
 */


var config = require('./config');
var collections = ["message"];
var mongoose = require('mongoose');

var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId;

var messageSchema = new Schema({
    username: String,
    content: String,
    time: Number
});

function save(username,content,time,output){
    var conn = mongoose.connect(config.DATABASE_URL);
    var MessageModule = mongoose.model('message', messageSchema);
    var newMsg= new  MessageModule({username : username, content : content, time : time});
    newMsg.save(function(err, newMsg){

        if (!err){
        output.writeHead(200,{"Content-Type" : "text/html"});
        output.write("Success!");
        output.end();
            conn.connection.close();
        } else {
            output.writeHead(403);
            output.write(err);
            output.end();
            conn.connection.close();
        }
    });
}

function list(output) {
    try {
        var conn = mongoose.connect(config.DATABASE_URL);
        var MessageModule = mongoose.model('message', messageSchema);
        MessageModule.find(function (err, messages) {
            if (!err) {
                output.writeHead(200, {"Content-Type": "text/html"});
                messages.forEach(function(message) {
                    output.write(message.username+" "+message.content+" "+message.time+ "<br/>" );

                });
                output.end();
                conn.connection.close();
            }else {
                output.writeHead(403);
                output.write(err);
                output.end();
                conn.connection.close();
            }
        });
        /*var msinst = new MessageModule();

        msinst.find(function (err, messages) {
            if (!err) {
                output.writeHead(200, {"Content-Type": "text/html"});
                output.write(messages.toLocaleString());
                output.end();
            }
        });*/

    } catch (e) {
        output.writeHead(404);
        output.write(e.toLocaleString());
        output.end();
    }
}

exports.list = list;
exports.save = save;