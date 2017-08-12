const Contact = require('../contact/contact.model.js');

function SpecHelper() {
  var self = this;

  this.contacts = [];

  this.clearDatabase = function (callback) {
    Contact.find({}).remove(function (err) {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null);
      }
    });
  };
}

module.exports = new SpecHelper();