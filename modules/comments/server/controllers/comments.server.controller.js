'use strict';

/**
 * Module dependencies
 */
var path = require('path')
const mongoose = require('mongoose')
const Comment = mongoose.model('Comment')
const errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'))
const _ = require('lodash')
const moment = require('moment')



exports.create = function (req, res) {
  const comment = new Comment(req.body);
  comment.createdBy = req.user;
  comment.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(comment);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  res.json(req.comment);
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  let comment = req.comment;
  comment.updateBy = req.user;
  comment.updateAt = moment().toDate();
  comment = _.assignIn(comment, req.body);

  comment.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(comment);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  const comment = req.comment;
  comment.status = 'deleted';
  comment.updateBy = req.user;
  comment.updateAt = moment().toDate();
  comment.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(comment);
    }
  });
};

/**
 * List of Articles
 */
exports.list = async function (req, res) {
  Comment.find({ status: { $nin: ['deleted'] } }).sort({"createdAt":-1})
    .populate('createdBy', 'displayName')
    .exec(function (err, comments) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(comments);
    }
  });
};

/**
 * Article middleware
 */
exports.commentById = function (req, res, next, id) {
  Comment.findById(id).populate('user', 'displayName').exec(function (err, comment) {
    if (err) return next(err);
    if (!comment) return next(new Error('Failed to load article ' + id));
    req.comment = comment;
    next();
  });

};
