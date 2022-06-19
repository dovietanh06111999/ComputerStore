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
 * Product Schema
 */
var ProductSchema = new Schema({
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Chưa điền tên danh mục sản phẩm'
  },
  categoryId : {
    type: Schema.ObjectId,
    ref: 'Category'
  },
  image: 
    {
      type: String,
      default: '',
      trim: true,
      required: 'Chưa điền tên danh mục sản phẩm'
    },
  quantity: { 
    type: Number, 
    default: 1 
  },
  proPrice: { 
    type: Number, 
    default: 1 
  },
  price: { 
    type: Number, 
    default: 1 
  },
  discount: { 
    type: Number, 
    default: 1 
  },
  detail: {
    type: String,
    default: '',
    trim: true,
    required: 'detail cannot be blank'
  },
  description: {
    type: String,
    default: '',
    trim: true,
    required: 'description cannot be blank'
  },
  specification: {
    type: String,
    default: '',
    trim: true,
    required: 'description cannot be blank'
  },
  installment:{
    type: Boolean,
    default: false
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
},{ timestamp: true });

mongoose.model('Product', ProductSchema);

