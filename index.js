/**
 * Created with JetBrains WebStorm.
 * User: t-tiyan
 * Date: 8/16/13
 * Time: 1:35 PM
 * To change this template use File | Settings | File Templates.
 */
console.log("Hello World");

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandler.js");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

server.start(router.route,handle);