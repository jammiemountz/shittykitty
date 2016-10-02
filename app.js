var express = require('express');
var app = express();
var path = require('path');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', express.static(__dirname + '/'));

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/api/pooped', function(req, res) {
    //send to database
    res.end()
});

app.get('/api/getpoop', function(req, res) {
    //retrieve from database
    res.write('2')
    res.end()
});

console.log('live at http://localhost:8080/')
app.listen(8080);
