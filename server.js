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

  console.log(contacts);
  
  // tell the message sender that the contact has been added
  res.status(201).send(contactInfo);
}); 


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});