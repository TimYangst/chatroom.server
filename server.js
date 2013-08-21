/**
 * Created with JetBrains WebStorm.
 * User: t-tiyan
 * Date: 8/16/13
 * Time: 2:40 PM
 * To change this template use File | Settings | File Templates.
 */
var http = require("http");
var url = require("url");
var config = require("./config");

function start(route, handle)
{
    function onRequest(request, response)
    {
        var pathname = url.parse(request.url).pathname;
        var query =  url.parse(request.url).query;
        console.log("Request for " + pathname + " received.");
        route(handle, pathname, response, request, query);
    }

    http.createServer(onRequest).listen(config.PORT);
    console.log("Server has started.");
}

exports.start = start;