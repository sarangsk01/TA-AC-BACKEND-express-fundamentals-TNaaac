var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();

app.use(cookieParser());
app.use(logger('dev'));
app.use((req, res, next) => {
  res.cookie('username', 'sarang');
  next();
});
app.get('/about', (req, res) => {
  console.log(`Welcome`);
});

app.listen(3000, () => {
  console.log('server is listening on port 3k');
});
