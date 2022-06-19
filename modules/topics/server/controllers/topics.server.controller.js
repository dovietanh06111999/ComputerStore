'use strict';

/**
 * Module dependencies
 */
var path = require('path')
const mongoose = require('mongoose')
const Topic = mongoose.model('Topic')
const errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'))
const _ = require('lodash')
const moment = require('moment')



exports.create = function (req, res) {
  const topic = new Topic(req.body);
  topic.createdBy = req.user;
  topic.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(topic);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  res.json(req.topic);
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  let topic = req.topic;
  topic.updateBy = req.user;
  topic.updateAt = moment().toDate();
  topic = _.assignIn(topic, req.body);

  topic.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(topic);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  const topic = req.topic;
  topic.status = 'deleted';
  topic.updateBy = req.user;
  topic.updateAt = moment().toDate();
  topic.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(topic);
    }
  });
};

/**
 * List of Articles
 */
exports.list = async function (req, res) {
  Topic.find({ status: { $nin: ['deleted'] } }).sort('-created')
    // .populate('user', 'displayName')
    .exec(function (err, topics) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(topics);
    }
  });
};

/**
 * Article middleware
 */
exports.topicById = function (req, res, next, id) {
  Topic.findById(id).populate('user', 'displayName').exec(function (err, topic) {
    if (err) return next(err);
    if (!topic) return next(new Error('Failed to load topic ' + id));
    req.topic = topic;
    next();
  });

};
