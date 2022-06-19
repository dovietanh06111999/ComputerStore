'use strict';

// const { Router } = require('express')
// const router = Router()
const topics = require('../controllers/topics.server.controller');



module.exports = function (app) {
    // Articles collection routes
    app.route('/api/topics')
        .get(topics.list)
        .post(topics.create);
    // Single article routes
    app.route('/api/topics/:topicId')
        .get(topics.read)
        .put(topics.update)
        .delete(topics.delete);

    // Finish by binding the article middleware
    app.param('topicId', topics.topicById);
};