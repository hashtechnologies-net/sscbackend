const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    productCode: {
      type: String,
      required: [true, 'productCode is required'],
      trim: true,
      unique: [true, 'productCode should be unique'],
    },
    category: {
      type: String,
      required: [true, 'category is required'],
      trim: 'true',
    },
    stock: {
      type: Number,
      required: [true, 'Stock of the product is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    imageUrl: [String],
    brandName: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
  },
  { timestamps: true }
);

productSchema.index({ productName: 'text' });

module.exports = mongoose.model('products', productSchema);
