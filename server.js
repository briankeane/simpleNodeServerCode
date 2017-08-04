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
  // grab the posted info
  var contactInfo = req.body;

  // add an id
  contactInfo.id = contactID;

  // increment the id for the next time
  contactID++;

  // add it to the in-memory array
  contacts.push(contactInfo);

  // tell the message sender that the contact has been added
  res.status(201).send(contactInfo);
}); 

app.get('/contacts/:id', function (req, res) {
  for (var i=0;i<contacts.length;i++) {
    if (contacts[i].id == Number(req.params.id)) {
      return res.status(200).send(contacts[i]);
    }
  }
  return res.status(404).send({ message: 'contact not found' });
});

app.put('/contacts/:id', function (req, res) {
  for (var i=0;i<contacts.length;i++) {
    if (contacts[i].id == Number(req.params.id)) {
      contacts[i] = Object.assign(contacts[i], req.body);
      return res.status(200).send(contacts[i]);
    }
  }
  return res.status(404).send({ message: 'contact not found'});
});

app.delete('/contacts/:id', function (req, res) {
  for (var i=0;i<contacts.length;i++) {
    if (contacts[i].id == Number(req.params.id)) {
      contacts.splice(i,1);
      return res.status(200).send({ message: 'contact deleted' });
    }
  }
  return res.status(404).send({ message: 'contact not found' });
});

app.get('/contacts', function (req, res) {
  return res.status(200).send(contacts);
});

app.get('/search', function (req, res) {
  var nameToMatch = req.query.name;
  var emailToMatch = req.query.email;

  var results = [];

  for (var i=0;i<contacts.length;i++) {
    var matchesName = true;
    var matchesEmail = true;

    // IF a name was provided and it doesn't match...
    if (nameToMatch && (contacts[i].name != nameToMatch)) {
      matchesName = false;
    }

    // IF an email was provided and it doesn't match
    if (emailToMatch && (contacts[i].email != emailToMatch)) {
      matchesEmail = false;
    }

    // IF it passed both tests, include it in the results
    if (matchesName && matchesEmail) {
      results.push(contacts[i]);
    }
  }
  return res.status(200).send({ results: results });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});