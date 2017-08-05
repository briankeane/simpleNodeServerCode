const express = require('express');
const router = express.Router();
const controller = require('./contact.controller.js');
// POST
router.post('/', controller.create); 

// GET
router.get('/search', controller.search);
router.get('/:id', controller.show);
router.get('/', controller.list);

// PUT
router.put('/:id', controller.modify);

// DELETE
router.delete('/:id', controller.delete);

module.exports = router;