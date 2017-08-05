const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express()
const Contact = require('./contact/contact.js');

var contacts = [];
var contactsID = 1;

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

app.post('/contacts', function (req, res) {
  Contact.Create(req.body, function (err, createdContact) {
    res.status(201).send(createdContact);
  });
}); 

app.get('/contacts/search', function (req, res) {
  console.log('here');
  Contact.find(req.query, function (err, results) {
    return res.status(200).send({ results: results });
  });
});

app.get('/contacts/:id', function (req, res) {
  Contact.findById(Number(req.params.id), function (err, foundContact) {
    if (foundContact) {
      return res.status(200).send(foundContact);
    }
    return res.status(404).send({ message: 'contact not found'});
  });
});

app.put('/contacts/:id', function (req, res) {
  Contact.findById(Number(req.params.id), function (err, foundContact) {
    if (foundContact) {
      foundContact = Object.assign(foundContact, req.body);
      return res.status(200).send(foundContact);
    }
    return res.status(404).send({ message: 'contact not found'});
  });
});

app.delete('/contacts/:id', function (req, res) {
  Contact.findById(Number(req.params.id), function (err, foundContact) {
    if (!foundContact) {
      return res.status(404).send({ message: 'contact not found' });
    }
    Contact.remove({ id: Number(req.params.id) }, function (err) {
      return res.status(200).send({ message: 'contact deleted' });
    });
  });
});

app.get('/contacts', function (req, res) {
  Contact.find({}, function (err, foundContacts) {
    return res.status(200).send(foundContacts);
  });
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

module.exports = app;