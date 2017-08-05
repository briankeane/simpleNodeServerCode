const expect = require('chai').expect;
const Contact = require('./contact.js');

describe('/contacts', function () {
  beforeEach(function () {
    Contact.contacts = [
                          {
                            name: 'bob',
                            email: 'bob@bob.com',
                            id: 1
                          },
                          {
                            name: 'sam',
                            email: 'sam@sam.com',
                            id: 2
                          },
                          {
                            name: 'bill',
                            email: 'bill@bill.com',
                            id: 3
                          },
                          {
                            name: 'bob',
                            email: 'bob@bob.com',
                            id: 4
                          },
                          {
                            name: 'bill',
                            email: 'bill@bill.com',
                            id: 5
                          }
                        ];
  });
});