'use strict';

// const { Router } = require('express')
// const router = Router()
const slides = require('../controllers/slides.server.controller');



module.exports = function (app) {
    // Articles collection routes
    app.route('/api/slides')
        .get(slides.list)
        .post(slides.create);
    // Single article routes
    app.route('/api/slides/:slideId')
        .get(slides.read)
        .put(slides.update)
        .delete(slides.delete);

    // Finish by binding the article middleware
    app.param('slideId', slides.slideById);
};