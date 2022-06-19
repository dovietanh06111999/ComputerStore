'use strict';

var validator = require('validator'),
  path = require('path'),
  config = require(path.resolve('./config/config'));
  const mongoose = require('mongoose')
  const Product = mongoose.model('Product')
  const Order = mongoose.model('Order')
  const Contact = mongoose.model('Contact')
  const Comment = mongoose.model('Comment')
  const errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'))
  const _ = require('lodash')
  const moment = require('moment')
/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {
  var safeUserObject = null;
  if (req.user) {
    safeUserObject = {
      id: req.user._id,
      displayName: validator.escape(req.user.displayName),
      provider: validator.escape(req.user.provider),
      username: validator.escape(req.user.username),
      created: req.user.created.toString(),
      roles: req.user.roles,
      profileImageURL: req.user.profileImageURL,
      email: validator.escape(req.user.email),
      lastName: validator.escape(req.user.lastName),
      firstName: validator.escape(req.user.firstName),
      additionalProvidersData: req.user.additionalProvidersData
    };
  }

  res.render('modules/core/server/views/index', {
    user: JSON.stringify(safeUserObject),
    sharedConfig: JSON.stringify(config.shared)
  });
};

/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
  res.status(500).render('modules/core/server/views/500', {
    error: 'Oops! Something went wrong...'
  });
};
exports.getProductsByKeyword= function (req, res) {
  const {keyword } = req.query
  console.log(keyword);
  Product.find(
    { status: 
      { $nin: ['deleted'] } 
    ,
    name:
      {$regex:keyword,$options:"$i"}
    }
    )
    .sort('-created')
    .exec(function (err, products) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(products);
    }
  });
}

exports.orderDone= function (req, res) {
  const {shoppingCart, clientOrder } = req.body
  const order = new Order(clientOrder);
  _.forEach(shoppingCart,(cart)=>{
    order.orderDetails.push({
      productId:cart._id,
      buyQuantity:cart.buyQuantity,
    })
  })
  if(req.user){
    order.customerId = req.user;
  }
  order.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(order);
    }
  });
}

exports.createContact = function (req, res) {
  const { contact } = req.body
  const _contact = new Contact(contact);
  if(req.user){
    _contact.createdBy = req.user;
  }
  _contact.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(_contact);
    }
  });
}


exports.createComment = function (req, res) {
  const { comment } = req.body
  const _comment = new Comment(comment);
  _comment.createdBy = req.user;
  _comment.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(_comment);
    }
  });
}

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

  res.status(404).format({
    'text/html': function () {
      res.render('modules/core/server/views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};
