var express = require('express');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log('Welcome to Express');
  next();
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/new', (req, res) => {
  res.sendFile(__dirname + '/new.html');
});

app.post('/new', (req, res) => {
  console.log(req.body);
});

app.get('/users/:asdf', (req, res) => {
  var username = req.params.asdf;
  res.send(username);
});

app.listen(3000, () => {
  console.log('server is listening on port 3k');
});
