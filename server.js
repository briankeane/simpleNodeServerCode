const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express()

var contacts = [];
var contactID = 1;

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json())

app.post('/contacts', function (req, res) {
  console.log(req);
  res.send('ok');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});