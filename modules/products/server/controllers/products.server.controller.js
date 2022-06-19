'use strict';

/**
 * Module dependencies
 */
var path = require('path')
const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'))
const _ = require('lodash')
const moment = require('moment')



exports.create = function (req, res) {
  const product = new Product(req.body);
  product.createdBy = req.user;
  product.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(product);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  res.json(req.product);
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  let product = req.product;
  product.updateBy = req.user;
  product.updateAt = moment().toDate();
  product = _.assignIn(product, req.body);

  product.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(product);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  const product = req.product;
  product.status = 'deleted';
  product.updateBy = req.user;
  product.updateAt = moment().toDate();
  product.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(product);
    }
  });
};

/**
 * List of Articles
 */
exports.list = async function (req, res) {
  Product.find({ status: { $nin: ['deleted'] } }).sort('-created')
    .populate('categoryId', 'name')
    .exec(function (err, products) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(products);
    }
  });
};
/**
 * Article middleware
 */
exports.productById = function (req, res, next, id) {
  Product.findById(id).populate('user', 'displayName').exec(function (err, product) {
    if (err) return next(err);
    if (!product) return next(new Error('Failed to load article ' + id));
    req.product = product;
    next();
  });

};
