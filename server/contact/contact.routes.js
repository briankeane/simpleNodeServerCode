const express = require('express');
const router = express.Router();
const Contact = require('./contact.js')


router.post('/', function (req, res) {
  Contact.Create(req.body, function (err, createdContact) {
    res.status(201).send(createdContact);
  });
}); 

router.get('/search', function (req, res) {
  console.log('here');
  Contact.find(req.query, function (err, results) {
    return res.status(200).send({ results: results });
  });
});

router.get('/:id', function (req, res) {
  Contact.findById(Number(req.params.id), function (err, foundContact) {
    if (foundContact) {
      return res.status(200).send(foundContact);
    }
    return res.status(404).send({ message: 'contact not found'});
  });
});

router.put('/:id', function (req, res) {
  Contact.findById(Number(req.params.id), function (err, foundContact) {
    if (foundContact) {
      foundContact = Object.assign(foundContact, req.body);
      return res.status(200).send(foundContact);
    }
    return res.status(404).send({ message: 'contact not found'});
  });
});

router.delete('/:id', function (req, res) {
  Contact.findById(Number(req.params.id), function (err, foundContact) {
    if (!foundContact) {
      return res.status(404).send({ message: 'contact not found' });
    }
    Contact.remove({ id: Number(req.params.id) }, function (err) {
      return res.status(200).send({ message: 'contact deleted' });
    });
  });
});

router.get('/', function (req, res) {
  Contact.find({}, function (err, foundContacts) {
    return res.status(200).send(foundContacts);
  });
});

module.exports = router;