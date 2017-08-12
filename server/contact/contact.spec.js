const expect = require('chai').expect;
const Contact = require('./contact.model.js');
const SpecHelper = require('../utilities/specHelper.js');

describe('A Contact', function () {
  beforeEach(function (done) {
    SpecHelper.clearDatabase(function (err) {
      done();
    });
  });

  it('creates a contact', function (done) {
    Contact.create({ name: 'bob', email: 'bob@bob.com' }, function (err, createdContact) {
      expect(createdContact.name).to.equal('bob');
      expect(createdContact.email).to.equal('bob@bob.com');
      expect(createdContact.id).to.exist;

      // Also check the db
      Contact.findById(createdContact.id, function (err, foundContact) {
        expect(foundContact.name).to.equal('bob');
        expect(foundContact.email).to.equal('bob@bob.com');
        expect(foundContact.id).to.exist;
        done();
      });
    });
  });

  describe('find', function () {
    var savedContacts;
    beforeEach(function (done) {
      Contact.create({
                       name: 'bob',
                       email: 'bob@bob.com'
                    }, function (err, savedContact0) {
        Contact.create({
                       name: 'sam',
                       email: 'sam@sam.com'
                    }, function (err, savedContact1) {
          Contact.create({
                       name: 'bill',
                       email: 'bill@bill.com'
                    }, function (err, savedContact2) {
            Contact.create({
                       name: 'bob',
                       email: 'bob@bob.com'
                    }, function (err, savedContact3) {
              Contact.create({
                       name: 'bill',
                       email: 'bill@bill.com'
                    }, function (err, savedContact4) {
                savedContacts = [
                                  savedContact0,
                                  savedContact1,
                                  savedContact2,
                                  savedContact3,
                                  savedContact4
                                ];
                done();
              });
            });
          });
        });
      });
    });

    it ('finds by name', function (done) {
      Contact.find({ name: 'bob' }, function (err, foundContacts) {
        expect(foundContacts.length).to.equal(2);
        var ids = foundContacts.map((contact) => contact.id);
        expect(ids).to.contain(savedContacts[0].id);
        expect(ids).to.contain(savedContacts[3].id);

        Contact.find({ name: 'sam' }, function (err, otherFoundContacts) {
          expect(otherFoundContacts.length).to.equal(1);
          expect(otherFoundContacts[0].id).to.equal(savedContacts[1].id);
          done();
        });
      });
    });

    it ('finds by email', function (done) {
      Contact.find({ email: 'bob@bob.com' }, function (err, foundContacts) {
        expect(foundContacts.length).to.equal(2);
        var ids = foundContacts.map((contact) => contact.id);
        expect(ids).to.contain(savedContacts[0].id);
        expect(ids).to.contain(savedContacts[3].id);

        Contact.find({ email: 'sam@sam.com' }, function (err, otherFoundContacts) {
          expect(otherFoundContacts.length).to.equal(1);
          expect(otherFoundContacts[0].id).to.equal(savedContacts[1].id);
          done();
        });
      });
    });

    it('returns all contacts if search object is empty', function (done) {
      Contact.find({}, function (err, foundContacts) {
        expect(foundContacts.length).to.equal(5);
        done();
      });
    });

    it('removes by id', function (done) {
      Contact.remove({ _id: savedContacts[2].id }, function (err) {
        Contact.find({}, function (err, allContacts) {
          expect(allContacts.length).to.equal(4);
          var ids = allContacts.map((contact) => contact.id);
          expect(ids).to.not.contain(savedContacts[2].id);

          Contact.remove({ _id: savedContacts[0].id }, function (err) {
            Contact.find({}, function (err, newAllContacts) {
              expect(newAllContacts.length).to.equal(3);
              var ids = newAllContacts.map((contact) => contact.id);
              expect(ids).to.not.contain(savedContacts[0].id);
              done();
            })
          });
        })
      });
    });

    it ('finds by id', function (done) {
      Contact.findById(savedContacts[2].id, function (err, foundContact) {
        expect(foundContact.name).to.equal('bill');
        expect(foundContact.id).to.equal(savedContacts[2].id);

        Contact.findById(savedContacts[1].id, function (err, foundContact) {
          expect(foundContact.name).to.equal('sam');
          expect(foundContact.id).to.equal(savedContacts[1].id);
          done();
        });
      });
    });

    it ('calls back with null if not found', function (done) {
      Contact.findById(12, function (err, foundContact) {
        expect(foundContact).to.not.exist;
        done();
      });
    });

    it ('calls back with null for foundContact if id arg is null', function (done) {
      Contact.findById(null, function (err, foundContact) {
        expect(foundContact).to.not.exist;
        done();
      });
    });
  });
});