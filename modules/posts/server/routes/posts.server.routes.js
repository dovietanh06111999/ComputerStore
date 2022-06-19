'use strict';

// const { Router } = require('express')
// const router = Router()
const posts = require('../controllers/posts.server.controller');



module.exports = function (app) {
    // Articles collection routes
    app.route('/api/posts')
        .get(posts.list)
        .post(posts.create);
    // Single article routes
    app.route('/api/posts/:postId')
        .get(posts.read)
        .put(posts.update)
        .delete(posts.delete);

    // Finish by binding the article middleware
    app.param('postId', posts.postById);
};