/**
 * Created with JetBrains WebStorm.
 * User: t-tiyan
 * Date: 8/21/13
 * Time: 2:48 PM
 * To change this template use File | Settings | File Templates.
 */


var config = require('./config');
var collections = ["message"];

var db = require('mongojs').connect(config.DATABASE_URL, collections);

function list(output)
{   try{
        db.find().toArray(function(err, messages) {
                if (!err){
                    output.writeHead(200, {"Content-Type" : "text/html"});
                    output.write(messages);
                    output.end();
                }
            }
        );
    } catch (e)
    {
        output.writeHead(404);
        output.write(e.toLocaleString());
        output.end();
    }
}

exports.list = list;