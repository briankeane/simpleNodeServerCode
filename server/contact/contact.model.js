const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ContactSchema = new Schema({
  name:                 { type: String },
  email:                { type: String },
}, {
  toJSON: {
    transform: function (doc, ret) {
      return {
        id: ret._id,
        email: ret.email,
        name: ret.name
      };
    }
  }
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
};

const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;