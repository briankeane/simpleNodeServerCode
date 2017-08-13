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
    if (foundContact) {
      for (var propertyName in req.body) {
        if (req.body.hasOwnProperty(propertyName)) {
          foundContact[propertyName] = req.body[propertyName];
        }
      }
      foundContact.save(function (err, savedContact) {
        if (err) {
          console.log(err);
          return res.status(500).send(err);
        }
        return res.status(200).send(savedContact);
      });
    } else {
      return res.status(404).send({ message: 'contact not found'});
    }
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
    Contact.remove({ _id: req.params.id }, function (err) {
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
    return res.status(200).send(foundContacts);
  });
};