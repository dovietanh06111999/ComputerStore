'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path'),
    config = require(path.resolve('./config/config')),
    chalk = require('chalk');


var CommentSchema = new Schema({
    detail: {
        type: String,
        default: '',
        trim: true,
    },
    productId: {
        type: Schema.ObjectId,
        ref: 'Product'
    },
    status: {
        type: String,
        enum: ['pending', 'deleted'],
        default: 'pending',
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
}, { timestamp: true });


mongoose.model('Comment', CommentSchema);
