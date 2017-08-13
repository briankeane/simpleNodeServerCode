const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Database Setup
mongoose.connect('mongodb://localhost:27017/contactMgr-dev', { useMongoClient: true });
mongoose.connection.on('error', function(err) {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// routes
app.use('/contacts', require('./contact/contact.routes.js'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

module.exports = app;