const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ContactSchema = new Schema({
  name:                 { type: String },
  email:                { type: String },
});

const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;