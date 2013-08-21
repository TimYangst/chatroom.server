/**
 * Created with JetBrains WebStorm.
 * User: yt
 * Date: 13-8-16
 * Time: 下午8:35
 * To change this template use File | Settings | File Templates.
 */

var app = require('http').createServer(handler)
    , io = require('socket.io').listen(app)
    , fs = require('fs');
var mysocket = 0;
app.listen(8070);
function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            res.writeHead(200);
            res.end(data);
        });
}
io.sockets.on('connection', function (socket) {
    console.log('index.html connected');
    mysocket = socket;
});

//udp server on 41181
var dgram = require("dgram");
var server = dgram.createSocket("udp4");
server.on("message", function (msg, rinfo) {
    console.log("msg: " + msg);
    if (mysocket != 0) {
        mysocket.emit('field', "" + msg);
        mysocket.broadcast.emit('field', "" + msg);
    }
});
server.on("listening", function () {
    var address = server.address();
    console.log("udp server listening " + address.address + ":" + address.port);
});
server.bind(41181);
