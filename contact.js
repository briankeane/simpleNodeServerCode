function ContactsHandler() {
  var self = this;

  this.contacts = [];
  this.contactsID = 1;

  this.find = function (attrs, callback) {

  };

  this.findById = function (attrs, callback) {

  };

  this.Create = function (attrs, callback) {
    attrs.id = self.contactsID;
    self.contactsID++;
    this.contacts.push(attrs);
    callback(null, attrs);
  };

  this.remove = function (attrs, callback) {

  };
}

module.exports = new ContactsHandler();