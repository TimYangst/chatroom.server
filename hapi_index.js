/**
 * Created with JetBrains WebStorm.
 * User: t-tiyan
 * Date: 8/30/13
 * Time: 4:59 PM
 * To change this template use File | Settings | File Templates.
 */

var hapi = require('hapi');

var server = hapi.createServer('localhost', 9998);

server.route({
    method : 'GET',
    path : '/update/{path*}',
    handler : {
        directory: { path : './update', listing : true, index: false }
    }
});

server.start();