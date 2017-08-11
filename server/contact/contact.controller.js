const Contact = require('./contact.model.js');

module.exports.create = function (req, res) {
  Contact.create(req.body, function (err, createdContact) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.status(201).send(createdContact);
  });
};

module.exports.search = function (req, res) {
  Contact.find(req.query, function (err, results) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.status(200).send({ results: results });
  });
};

module.exports.show = function (req, res) {
  Contact.findById(req.params.id, function (err, foundContact) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    if (foundContact) {
      return res.status(200).send(foundContact);
    }
    return res.status(404).send({ message: 'contact not found'});
  });
};

module.exports.modify = function (req, res) {
  Contact.findById(req.params.id, function (err, foundContact) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    if (!foundContact) {
      return res.status(404).send({ message: 'contact not found' });
    }
    if (req.body.email) {
      foundContact.email = req.body.email;
    }
    if (req.body.name) {
      foundContact.name = req.body.name;
    }
    foundContact.save(function (err, savedContact) {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      return res.status(200).send(savedContact);
    });
  });
};

module.exports.delete = function (req, res) {
  Contact.findById(req.params.id, function (err, foundContact) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    if (!foundContact) {
      return res.status(404).send({ message: 'contact not found' });
    }
    Contact.remove({ id: req.params.id }, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      return res.status(200).send({ message: 'contact deleted' });
    });
  });
};

module.exports.list = function (req, res) {
  Contact.find({}, function (err, foundContacts) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    return res.status(200).send(foundContacts);
  });
};