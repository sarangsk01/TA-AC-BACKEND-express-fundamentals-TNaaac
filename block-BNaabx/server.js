var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var app = express();

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.method, req.url);
});

app.use((req, res, next) => {
  var count = req.cookies.count;
  if (count) {
    res.cookie('count', Number(count) + 1);
  } else {
    res.cookie('count', 1);
  }
  console.log(count);
  next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/admin', (req, res, next) => {
  next('Unauthorized');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/project', (req, res) => {
  res.sendFile(__dirname + '/project.html');
});

app.use((req, res, next) => {
  res.send('Page Not Found');
});

app.use((err, req, res, next) => {
  res.status(500).send(err);
  console.log(err);
});

app.listen(4000, () => {
  console.log('server is listening on port 4k');
});
