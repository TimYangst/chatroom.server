/**
 * Created with JetBrains WebStorm.
 * User: t-tiyan
 * Date: 8/16/13
 * Time: 3:22 PM
 * To change this template use File | Settings | File Templates.
 */
var querystring = require("querystring");
var fs = require("fs");
var messageDao = require("./messageDao");

function messagebox(response) {
    console.log("Request handler 'start' was called.");

    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/post"'+
        'method="post">'+
        'username : <input type="text" name="username"/> <br/>'+
        'message : <input type="text" name="content" /> <br/>'+
        '<input type="submit" value="submit">'+
        '</form>'+
        '</body>'+
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}
/*
function upload(response, request) {
    console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    form.uploadDir = "/tmp/upload";
    console.log("about to parse");
    form.parse(request, function(error, fields, files) {
        console.log("parsing done");
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show?path=" +files.upload.path + "' />");
        response.end();
    });
}    */
/*
function show(response, request, query) {
    console.log("Request handler 'show' was called.");
    var path = querystring.parse(query).path;
    fs.readFile(path, "binary", function(error, file) {
        if(error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}
  */
function Outputer(resp)
{
    var response = resp;
    return function(msg, err){
        if (!err){
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(msg);
            response.end();
        } else {
            response.writeHead(500, {"Content-Type": "text/html"});
            response.write(err.toString());
            response.end();
        }
    }
}

function heartbeat(response, request, query)
{
    console.log("Request handler 'heartbeat' was called.");
    var lasttime = querystring.parse(query).lasttime;
    if (lasttime == null || lasttime == "") lasttime = "0";
    messageDao.lookup(lasttime, new Outputer(response));

}

function list(response){
    console.log("Request handler 'list' was called.");
    messageDao.list(new Outputer(response));
}

function post(response, request)
{
    var postData = "";
    console.log("Request handler 'post' was called.");
    request.addListener("data", function(postDataChunk) {
        postData += postDataChunk;
        console.log("Received POST data chunk '" + postDataChunk +"'.");
    });
    request.addListener("end", function() {
        console.log("Post end.");
        messageDao.save(querystring.parse(postData),new Outputer(response));
    });
}

//exports.start = start;
//exports.upload = upload;
//exports.show = show;
exports.messagebox = messagebox;
exports.list = list;
exports.post= post;
exports.heartbeat = heartbeat;