var express = require('express');
var app = express();
var path = require('path');
var pg = require('pg');
var query = require('pg-query');
pg.defaults.ssl = true;

var env = process.env.PORT ? 'prod' : 'dev';
var port = process.env.PORT ? process.env.PORT : 8080;
var databaseId = env==='dev' ? 100 : 1;
var dburl = process.env.DATABASE_URL;
query.connectionParameters = dburl;

query('CREATE TABLE IF NOT EXISTS items(id SERIAL PRIMARY KEY, amount INTEGER not null)', function() {
  query('INSERT INTO items VALUES (1,0)');
  query('INSERT INTO items VALUES (100,0)');
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
  query('SELECT * FROM items WHERE id=' + databaseId,function(err, rows, result){
    rows.forEach(function(row) {
      amount = row.amount + 1;
    })
    query('UPDATE items SET amount=' + amount + ' WHERE id=' + databaseId, function(err, rows, result) {
      if (err) {
        res.send(err);
        res.end();
      }
      res.send(JSON.stringify({ data: 'success' }))
      res.end();
    })
  });
});

app.get('/api/getpoop', function(req, res) {
  var amount;
  query('SELECT * FROM items WHERE id=' + databaseId,function(err, rows, result){
    rows.forEach(function(row) {
      amount = row.amount;
    })
    res.send(JSON.stringify({ data: amount }));
    res.end();
  });
});

console.log('RUNNING ENVIRONMENT ' + env + ' ON PORT ' + port + ' USING DB ID ' + databaseId);
app.listen(port);
