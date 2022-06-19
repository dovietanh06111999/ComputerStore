'use strict';

/**
 * Module dependencies
 */
var path = require('path')
const mongoose = require('mongoose')
const Category = mongoose.model('Category')
const errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'))
const _ = require('lodash')
const moment = require('moment')



exports.create = function (req, res) {
  const category = new Category(req.body);
  category.createdBy = req.user;
  category.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(category);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  res.json(req.category);
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  let category = req.category;
  category.updateBy = req.user;
  category.updateAt = moment().toDate();
  category = _.assignIn(category, req.body);

  category.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(category);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  const category = req.category;
  category.status = 'deleted';
  category.updateBy = req.user;
  category.updateAt = moment().toDate();
  category.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(category);
    }
  });
};

/**
 * List of Articles
 */
exports.list = async function (req, res) {
  Category.find({ status: { $nin: ['deleted'] } }).sort({"name":1})
    // .populate('user', 'displayName')
    .exec(function (err, categories) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(categories);
    }
  });
};

/**
 * Article middleware
 */
exports.categoryById = function (req, res, next, id) {
  Category.findById(id).populate('user', 'displayName').exec(function (err, category) {
    if (err) return next(err);
    if (!category) return next(new Error('Failed to load article ' + id));
    req.category = category;
    next();
  });

};
