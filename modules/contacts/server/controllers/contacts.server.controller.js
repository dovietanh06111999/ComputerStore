'use strict';

/**
 * Module dependencies
 */
var path = require('path')
const mongoose = require('mongoose')
const Contact = mongoose.model('Contact')
const errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'))
const _ = require('lodash')
const moment = require('moment')



exports.create = function (req, res) {
  const contact = new Contact(req.body);
  contact.createdBy = req.user;
  contact.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(contact);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  res.json(req.contact);
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  let contact = req.contact;
  contact.updateBy = req.user;
  contact.updateAt = moment().toDate();
  contact = _.assignIn(contact, req.body);

  contact.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(contact);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  const contact = req.contact;
  contact.status = 'deleted';
  contact.updateBy = req.user;
  contact.updateAt = moment().toDate();
  contact.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(contact);
    }
  });
};

/**
 * List of Articles
 */
exports.list = async function (req, res) {
  Contact.find({ status: { $nin: ['deleted'] } }).sort('-created')
    // .populate('user', 'displayName')
    .exec(function (err, contacts) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(contacts);
    }
  });
};

/**
 * Article middleware
 */
exports.contactById = function (req, res, next, id) {
  Contact.findById(id).populate('user', 'displayName').exec(function (err, contact) {
    if (err) return next(err);
    if (!contact) return next(new Error('Failed to load article ' + id));
    req.contact = contact;
    next();
  });

};
