/**
 * Created with JetBrains WebStorm.
 * User: t-tiyan
 * Date: 8/16/13
 * Time: 3:22 PM
 * To change this template use File | Settings | File Templates.
 */
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

function start(response) {
    console.log("Request handler 'start' was called.");

    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" enctype="multipart/form-data" '+
        'method="post">'+
        '<input type="file" name="upload">'+
        '<input type="submit" value="Upload file" />'+
        '</form>'+
        '</body>'+
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

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

}

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


exports.start = start;
exports.upload = upload;
exports.show = show;