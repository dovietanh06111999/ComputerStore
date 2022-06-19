'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path'),
    config = require(path.resolve('./config/config')),
    chalk = require('chalk');


var OrderSchema = new Schema({
    code: {
        type: String,
        default: '',
        trim: true,
    },
    deliveryName: {
        type: String,
        default: '',
        trim: true,
        required: 'Chưa có tên người nhận'
    },
    deliveryPhone: {
        type: String,
        default: '',
        trim: true,
        required: 'Chưa có sđt người nhận'
    },
    deliveryEmail: {
        type: String,
        default: '',
        trim: true,
        required: 'Chưa có email người nhận'
    },
    deliveryAddress: {
        type: String,
        default: '',
        trim: true,
        required: 'Chưa có địa chỉ người nhận'
    },
    deliveryPaymentMethod: {
        type: String,
        enum: ['cashPayment', 'viaBankTransferPayment', 'onlinePayment'],
        default: 'cashPayment',
    },
    status: {
        type: String,
        enum: ['pending', 'shipping', 'done', 'deleted'],
        default: 'pending',
    },
    statusPayment: {
        type: String,
        enum: ['paid', 'unpaid'],
        default: 'unpaid',
    },
    customerId : {
        type: Schema.ObjectId,
        ref: 'User'
    },
    exportDate: {
        type: Date,
    },
    orderDetails: [{ 
        productId: { type: Schema.ObjectId, ref: 'Product' }, 
        buyQuantity: { type: Number }  
    }],
    note:{
        type: String,
        default: '',
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
    updateNote:{
        type: String,
        default: '',
    },
}, { timestamp: true });


mongoose.model('Order', OrderSchema);
