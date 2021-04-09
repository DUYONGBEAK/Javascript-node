//서버구축
let express = require('express');
let http = require('http');
let app = express();

let server = http.createServer(app).listen(80);
let mysql = require('mysql');

//연결통로 구축과정
// npm으로 설치했기 때문에 사용가능하다.
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'test'
});

//로그인 버튼
connection.connect();

// 라우터
// 여기 이름이 같으면, 파일로 따지면 이름과 확장자가 같은 경우라고 생각하면 됨.
app.get('/mission', function(req, res) {
  res.sendfile("mission.html");
});

//포스트방식을 사용하기 위한 툴
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//post방식
app.post('/test1', function(req, res) {
  connection.query(`INSERT INTO news
(title, content)
VALUES
  ('${req.body.title}','${req.body.content}')`, // 문자열과 숫자를 모두 받기 위해서는 홑다옴표를 사용해야 한다. 숫자만 받으려면 없어도 됨
    function(error, results, fields){
      if(error) {
        res.send('not ok');
      }else if(results.affectedRows==1){
        res.send('ok')
      }
     console.log(res);

    });
});

//get방식
app.get('/test1', function(req, res) {
  connection.query(`SELECT * FROM news where no='${req.query.no}'`,
    function(error, results, fields){
  if(error) throw error
      res.send(results);
      console.log(res);
    });
});
