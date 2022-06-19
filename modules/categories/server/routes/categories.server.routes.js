'use strict';

// const { Router } = require('express')
// const router = Router()
const categories = require('../controllers/categories.server.controller');



module.exports = function (app) {
    // Articles collection routes
    app.route('/api/categories')
        .get(categories.list)
        .post(categories.create);
    // Single article routes
    app.route('/api/categories/:categoryId')
        .get(categories.read)
        .put(categories.update)
        .delete(categories.delete);

    // Finish by binding the article middleware
    app.param('categoryId', categories.categoryById);
};