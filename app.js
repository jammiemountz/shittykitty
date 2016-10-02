var express = require('express');
var app = express();
var path = require('path');
var pg = require('pg');

pg.defaults.ssl = true;
console.log('----------', process.env.DATABASE_URL)
pg.connect(process.env.DATABASE_URL, function(err, client) {
// pg.connect("//yzjbpbvlspnfki:MXpfTCsB-TOY2LQd_MbwpX5kbL@ec2-54-225-81-90.compute-1.amazonaws.com:5432/d5sfp9vtqj8hue", function(err, client) {
  if (err) {
    console.log(err)
    throw err;
  }
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});

// postgres://yzjbpbvlspnfki:MXpfTCsB-TOY2LQd_MbwpX5kbL@ec2-54-225-81-90.compute-1.amazonaws.com:5432/d5sfp9vtqj8hue
// app.get('/db', function (request, response) {
//   // pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//   pg.connect("//yzjbpbvlspnfki:MXpfTCsB-TOY2LQd_MbwpX5kbL@ec2-54-225-81-90.compute-1.amazonaws.com:5432/d5sfp9vtqj8hue", function(err, client, done) {
//     client.query('SELECT * FROM test_table', function(err, result) {
//       done();
//       if (err)
//        { console.error(err); response.send("Error " + err); }
//       else
//        { response.render('pages/db', {results: result.rows} ); }
//     });
//   });
// });

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
app.listen(process.env.PORT || 8080);
