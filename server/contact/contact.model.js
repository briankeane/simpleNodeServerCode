const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ContactSchema = new Schema({
  name:                 { type: String },
  email:                { type: String },
});

ContactSchema.statics.clearAll = function (callback) {
  this.find({}).remove(function (err) {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null);
    }
  });
}

const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;