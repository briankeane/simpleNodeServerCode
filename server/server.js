const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// routes
app.use('/contacts', require('./contact/contact.routes.js'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

module.exports = app;