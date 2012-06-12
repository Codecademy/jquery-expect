
var connect = require('connect')
  , http = require('http')
  , fs   = require('fs')
  , app = connect()
      .use(connect.static(__dirname + '/../'));
      
http.createServer(app).listen(process.argv[2] || '80');

fs.writeFileSync(__dirname + '/pid.txt', process.pid, 'utf-8');
