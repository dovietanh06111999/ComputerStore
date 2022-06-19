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
 * post Schema
 */
var PostSchema = new Schema({
  topicId: {
    type: Schema.ObjectId,
    ref: 'Topic'
  },
  slug: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['active', 'deleted'],
    default: 'active',
  },
  title: {
    type: String,
    default: '',
    required: 'title cannot be blank'
  },
  detail: {
    type: String,
    default: '',
    trim: true,
    required: 'detail cannot be blank'
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

mongoose.model('Post', PostSchema);

