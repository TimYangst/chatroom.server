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
var hapi = require('hapi');
var config =  require("./config");

var handle = {}
handle["/"] = requestHandlers.messagebox;
//handle["/start"] = requestHandlers.start;
//handle["/upload"] = requestHandlers.upload;
//handle["/show"] = requestHandlers.show;
handle["/list"] = requestHandlers.list;
handle["/post"] = requestHandlers.post;
handle["/heartbeat"] = requestHandlers.heartbeat;
handle["/messagebox"] = requestHandlers.messagebox;

server.start(router.route,handle);

var hapi_server = hapi.createServer(config.LOCAL_IP, config.UPDATE_PORT);

hapi_server.route({
    method : 'GET',
    path : '/update/{path*}',
    handler : {
        directory: { path : './update/', listing : true, index: false }
    }
});

hapi_server.start();
console.log("hapi server is start at : "+ config.UPDATE_PORT);