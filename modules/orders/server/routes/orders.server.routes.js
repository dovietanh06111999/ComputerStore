'use strict';

// const { Router } = require('express')
// const router = Router()
const orders = require('../controllers/orders.server.controller');



module.exports = function (app) {
    // Articles collection routes
    app.route('/api/orders')
        .get(orders.list)
        .post(orders.create);
    // Single article routes
    app.route('/api/orders/:orderId')
        .get(orders.read)
        .put(orders.update)
        .delete(orders.delete);

    // Finish by binding the article middleware
    app.param('orderId', orders.orderById);
};