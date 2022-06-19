'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  path = require('path'),
  config = require(path.resolve('./config/config')),
  chalk = require('chalk');

/**
 * Contact Schema
 */
var ContactSchema = new Schema({
  fullName: {
    type: String,
    default: '',
    trim: true,
    required: 'name cannot be blank'
  },
  email: {
    type: String,
    default: '',
    required: 'name cannot be blank'
  },
  phone: { 
    type: String, 
    required: 'name cannot be blank'
  },
  status: {
    type: String,
    enum: ['active', 'deleted'],
    default: 'active',
  },
  title: {
    type: String,
    default: '',
  },
  detail: {
    type: String,
    default: '',
    trim: true,
    required: 'detail cannot be blank'
  },
  reply: {
    type: String,
    default: '',
  },
  createdBy : {
    type: Schema.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updateBy: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  updateAt: { 
    type: Date 
  },
},{ timestamp: true });

mongoose.model('Contact', ContactSchema);

