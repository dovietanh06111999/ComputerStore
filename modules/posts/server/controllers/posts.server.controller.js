'use strict';

/**
 * Module dependencies
 */
var path = require('path')
const mongoose = require('mongoose')
const Post = mongoose.model('Post')
const errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'))
const _ = require('lodash')
const moment = require('moment')



exports.create = function (req, res) {
  const post = new Post(req.body);
  post.createdBy = req.user;
  post.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(post);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  res.json(req.post);
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  let post = req.post;
  post.updateBy = req.user;
  post.updateAt = moment().toDate();
  post = _.assignIn(post, req.body);

  post.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(post);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  const post = req.post;
  post.status = 'deleted';
  post.updateBy = req.user;
  post.updateAt = moment().toDate();
  post.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(post);
    }
  });
};

/**
 * List of Articles
 */
exports.list = async function (req, res) {
  Post.find({ status: { $nin: ['deleted'] } }).sort('-created')
    .populate('createdBy', 'displayName')
    .exec(function (err, posts) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(posts);
    }
  });
};

/**
 * Article middleware
 */
exports.postById = function (req, res, next, id) {
  Post.findById(id).populate('createdBy', 'displayName').exec(function (err, post) {
    if (err) return next(err);
    if (!post) return next(new Error('Failed to load article ' + id));
    req.post = post;
    next();
  });

};
