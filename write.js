var http = require('http');
var fs = require('fs');
var redis = require('redis-client').createClient();
var constants = require('myconstants');

http.createServer(function (req, res) {
  fs.readFile('content.txt', function(err, data) {
    if (err) throw err;
    redis.lpush(constants.listname, data);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(data);
  });
  
}).listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');
