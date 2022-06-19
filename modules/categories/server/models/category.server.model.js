'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path'),
    config = require(path.resolve('./config/config')),
    chalk = require('chalk');


var CategorySchema = new Schema({
    slug: {
        type: String,
        default: '',
        trim: true,
    },
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'Chưa điền tên danh mục sản phẩm'
    },
    status: {
        type: String,
        enum: ['active', 'deleted'],
        default: 'active',
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


mongoose.model('Category', CategorySchema);
