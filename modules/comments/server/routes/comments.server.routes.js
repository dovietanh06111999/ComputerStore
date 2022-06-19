'use strict';

// const { Router } = require('express')
// const router = Router()
const comments = require('../controllers/comments.server.controller');



module.exports = function (app) {
    // Articles collection routes
    app.route('/api/comments')
        .get(comments.list)
        .post(comments.create);
    // Single article routes
    app.route('/api/comments/:commentId')
        .get(comments.read)
        .put(comments.update)
        .delete(comments.delete);

    // Finish by binding the article middleware
    app.param('commentId', comments.commentById);
};