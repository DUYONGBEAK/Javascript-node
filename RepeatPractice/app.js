let express = require('express');
let http = require('http');
let app = express();

let server = http.createServer(app).listen(80);

let mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'test'
});

connection.connect();

app.get('/test', function(req, res) {
  res.sendfile("test.html");
});

//포스트방식을 사용하기 위한 툴
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


app.get('/test1', function(req, res) {
  connection.query(`SELECT * FROM news where title='${req.query.title}'`,
    function(error, results, fields){
  if(error) throw error
      res.send(results);
      console.log(res);
    });
});
