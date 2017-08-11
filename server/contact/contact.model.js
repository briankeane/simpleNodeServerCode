const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ContactSchema = new Schema({
  name:                 { type: String },
  email:                { type: String },
}, {
  toJSON: {
    transform: function (doc, ret, options) {
      return {
        id: ret._id.toHexString(),
        name: ret.name,
        email: ret.email
      };
    }
  }
});

const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;