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

    paymentType: {
      type: String,
      enum: ['COD', 'Esewa', 'Khalti'],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('order', OrderSchema);