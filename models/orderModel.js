const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      required: true,
    },

    products: [Object],

    status: {
      type: String,
      enum: ['Processing', 'Delivered', 'Received', 'Cancelled'],
      default: 'Processing',
    },

    shippingAddress: {
      type: String,
      required: [true, 'shippingAddress is required'],
    },

    deliveryDate: {
      type: Date,
      required: [true, 'deliveryDate is required'],
    },

    shippingCharge: {
      type: Number,
      required: [true, 'shippingCharge is required'],
    },

    paymentType: {
      type: String,
      enum: ['COD', 'Esewa', 'Khalti'],
      required: true,
    },

    paymentFulfilled: {
      type: Boolean,
      default: false,
    },

    esewaCredentials: {},
    khaltiCredentials: {},
  },
  { timestamps: true }
);

module.exports = mongoose.model('order', OrderSchema);
