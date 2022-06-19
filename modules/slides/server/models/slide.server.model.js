'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path'),
    config = require(path.resolve('./config/config')),
    chalk = require('chalk');


var SlideSchema = new Schema({
    slug: {
        type: String,
        default: '',
        trim: true,
    },
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'Chưa điền tên slide'
    },
    position: {
        type: String,
        default: '',
        required: 'Chưa điền vị trí slide'
    },
    imgage: {
        type: String,
        default: '',
        trim: true,
        required: 'Chưa điền link'
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


mongoose.model('Slide', SlideSchema);
