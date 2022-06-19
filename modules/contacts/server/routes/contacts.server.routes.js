'use strict';

// const { Router } = require('express')
// const router = Router()
const contacts = require('../controllers/contacts.server.controller');



module.exports = function (app) {
    // Articles collection routes
    app.route('/api/contacts')
        .get(contacts.list)
        .post(contacts.create);
    // Single article routes
    app.route('/api/contacts/:contactId')
        .get(contacts.read)
        .put(contacts.update)
        .delete(contacts.delete);

    // Finish by binding the article middleware
    app.param('contactId', contacts.contactById);
};