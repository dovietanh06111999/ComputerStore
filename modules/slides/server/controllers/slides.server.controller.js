'use strict';

/**
 * Module dependencies
 */
var path = require('path')
const mongoose = require('mongoose')
const Slide = mongoose.model('Slide')
const errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'))
const _ = require('lodash')
const moment = require('moment')



exports.create = function (req, res) {
  const slide = new Slide(req.body);
  slide.createdBy = req.user;
  slide.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(slide);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  res.json(req.slide);
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  let slide = req.slide;
  slide.updateBy = req.user;
  slide.updateAt = moment().toDate();
  slide = _.assignIn(slide, req.body);

  slide.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(slide);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  const slide = req.slide;
  slide.status = 'deleted';
  slide.updateBy = req.user;
  slide.updateAt = moment().toDate();
  slide.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(slide);
    }
  });
};

/**
 * List of Articles
 */
exports.list = async function (req, res) {
  Slide.find({ status: { $nin: ['deleted'] } }).sort('-created')
    // .populate('user', 'displayName')
    .exec(function (err, slides) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(slides);
    }
  });
};

/**
 * Article middleware
 */
exports.slideById = function (req, res, next, id) {
  Slide.findById(id).populate('user', 'displayName').exec(function (err, slide) {
    if (err) return next(err);
    if (!slide) return next(new Error('Failed to load article ' + id));
    req.slide = slide;
    next();
  });

};
