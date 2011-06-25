var http = require('http');
var fs = require('fs');
var redis = require('redis-client').createClient();
var constants = require('myconstants');

var re = new RegExp("eleifend .*? felis", 'g');
http.createServer(function (req, res) {
  redis.rpop(constants.listname, function(err, val) {
    if (err) throw err;
    res.writeHead(200, {'Content-Type': 'text/plain'});
    val = val || 'empty';
    var match = val.toString().match(re);
    for (var i=0; match && i< match.length; i++) {
      res.write("match:"+match[i]+'\n');
    }

    res.end(val);
  });
  
}).listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');
