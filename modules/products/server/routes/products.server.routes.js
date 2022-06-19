'use strict';

// const { Router } = require('express')
// const router = Router()
const products = require('../controllers/products.server.controller');



module.exports = function (app) {
    // Articles collection routes
    app.route('/api/products')
        .get(products.list)
        .post(products.create);
    // Single article routes
    app.route('/api/products/:productId')
        .get(products.read)
        .put(products.update)
        .delete(products.delete);

    // Finish by binding the article middleware
    app.param('productId', products.productById);
};