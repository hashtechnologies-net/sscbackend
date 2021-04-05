const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A rental must have a name'],
    },
    province: {
      type: String,
      required: [true, 'A rental must have a state/Province'],
    },
    state: {
      type: String,
      required: [true, 'A rental must have a state'],
    },
    city: {
      type: String,
      required: [true, 'A rental must have a city'],
    },
    quantity: {
      type: Number,
      required: [true, 'A rental must have a quantity'],
    },
    numberOfDays: {
      type: Number,
      required: [true, 'A rental must have number of days'],
      default: '1 day',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Rental = mongoose.model('rental', rentalSchema);

module.exports = Rental;
