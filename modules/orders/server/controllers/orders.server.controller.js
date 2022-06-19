'use strict';

/**
 * Module dependencies
 */
var path = require('path')
const mongoose = require('mongoose')
const Order = mongoose.model('Order')
const errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'))
const _ = require('lodash')
const moment = require('moment')



exports.create = function (req, res) {
  const order = new Order(req.body);
  order.createdBy = req.user;
  order.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(order);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  res.json(req.order);
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  let order = req.order;
  if(order.status ==='shipping'){
    order.status ='done'
    order.statusPayment ='paid'
  } else
  if(order.status ==='pending'){
    order.status ='shipping'
    order.exportDate = moment().toDate();
  }
  order.updateBy = req.user;
  order.updateAt = moment().toDate();
  order.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(order);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  const order = req.order;
  order.status = 'deleted';
  order.updateBy = req.user;
  order.updateAt = moment().toDate();
  order.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(order);
    }
  });
};
//
/**
 * List of Articles
 */
exports.list = async function (req, res) {
  let { status,startDate,endDate } = req.query
  const query = Order.find({})
  if(status){
    query.where('status', status)
  }
  if (startDate && endDate) {
    query.where('createdAt', {
      $gte: startDate ,
      $lte:endDate  ,
    })
  }
  query.populate({
    path: 'orderDetails.productId',
    select: 'name price image',
  }).sort('-created')
    // .populate('user', 'displayName')
    .exec(function (err, orders) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(orders);
    }
  });
};

/**
 * Article middleware
 */
exports.orderById = function (req, res, next, id) {
  Order.findById(id).populate('user', 'displayName').populate({
    path: 'orderDetails.productId',
    select: 'name price image',
    // populate: {
    //   path: 'outlet',
    //   select: 'code',
    // },
  }).exec(function (err, order) {
    if (err) return next(err);
    if (!order) return next(new Error('Failed to load article ' + id));
    req.order = order;
    next();
  });

};
