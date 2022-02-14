const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      unique: true,
      required: [true, 'categoryName is required'],
      maxlength: [50, 'Name cannot be more than of 30 characters'],
      trim: true,
    },
    noOfProducts: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('category', CategorySchema);
