/**
 * Created with JetBrains WebStorm.
 * User: t-tiyan
 * Date: 8/16/13
 * Time: 2:48 PM
 * To change this template use File | Settings | File Templates.
 */

function route(handle, pathname, response, request, query) {
    console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response, request, query);
    } else {
        console.log("No request handler found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}

exports.route =  route;