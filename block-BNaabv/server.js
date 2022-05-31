var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var app = express();

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

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
  res.setHeader('Content-Type', 'text/html');
  res.send('<h2>Welcome to express</h2>');
});

app.get('/about', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send('My name is qwerty');
});

app.get('/users/:username', (req, res) => {
  var username = req.params.username;
  console.log(req.query);
  res.setHeader('Content-Type', 'text/html');
  res.send(`<h2>${username}</h2>`);
});

app.post('/form', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.post('/json', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.use((req, res, next) => {
  res.send('Page Not Found');
});

app.use((err, req, res, next) => {
  res.status(500).send(err);
  console.log(err);
});

app.listen(3000, () => {
  console.log('server is listening on port 3k');
});
