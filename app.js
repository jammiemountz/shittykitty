var express = require('express');
var app = express();
var path = require('path');
var pg = require('pg');
var query = require('pg-query');
pg.defaults.ssl = true;

var env = process.env.PORT ? 'prod' : 'dev';
var port = process.env.PORT ? process.env.PORT : 8080;
var databaseId = env==='dev' ? 'poopdev' : 'poop';
var dburl = process.env.DATABASE_URL;

query.connectionParameters = dburl;

// create dev and prod tables if they dont exist
query('CREATE TABLE IF NOT EXISTS poop(id SERIAL PRIMARY KEY, date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW())', function() {
});
query('CREATE TABLE IF NOT EXISTS poopdev(id SERIAL PRIMARY KEY, date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW())', function() {
  query('INSERT INTO poopdev VALUES (DEFAULT, DEFAULT)');
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/', express.static(__dirname + '/'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/api/pooped', function(req, res) {
  var amount;
  query('INSERT INTO ' + databaseId + ' VALUES (DEFAULT, DEFAULT)', function(err,rows,result) {
    if (err) {
      res.send(JSON.stringify({ error: err }));
      res.end();
    } else {
      res.send(JSON.stringify({ data: 'success' }))
      res.end();
    }
  });
});

app.get('/api/getpoop', function(req, res) {
  var amount;
  query('SELECT * FROM ' + databaseId + ' ORDER BY id DESC LIMIT 1', function(err, rows, result){
    if (err) {
      res.send(JSON.stringify({ error: err }));
      res.end();
    } else {
      res.send(JSON.stringify({ data: rows[0] }));
      res.end();
    }
  });
});

app.get('/api/getfirstpoop', function(req, res) {
  var amount;
  query('SELECT * FROM ' + databaseId + ' ORDER BY id ASC LIMIT 1', function(err, rows, result){
    if (err) {
      res.send(JSON.stringify({ error: err }));
      res.end();
    } else {
      res.send(JSON.stringify({ data: rows[0] }));
      res.end();
    }
  });
});

console.log('RUNNING ENVIRONMENT ' + env + ' ON PORT ' + port + ' USING DB ID ' + databaseId);
app.listen(port);
