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

function save(msgObj, callback) {
    try {
        var conn = mongoose.connect(config.DATABASE_URL);
        var MessageModule = mongoose.model('message', messageSchema);
        msgObj.time = new Date().getTime();
        var newMsg = new MessageModule(msgObj);
        newMsg.save(function (err, newMsg) {
          callback(JSON.stringify(newMsg),err);
          conn.connection.close();
        });
    } catch (e) {
        callback(null, e);
    }
}

function list(callback) {
    try {
        var conn = mongoose.connect(config.DATABASE_URL);
        var MessageModule = mongoose.model('message', messageSchema);
        MessageModule.find(function (err, messages) {
            callback(JSON.stringify(messages), err);
            conn.connection.close();
        });
    } catch (e) {
        callback(null, e);
    }
}

exports.list = list;
exports.save = save;