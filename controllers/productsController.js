const Products = require('../models/productsModel');
const Category = require('../models/categoryModel');
const catchAsync = require('../utils/catchAsync');

exports.createProduct = catchAsync(async (req, res, next) => {
  const promises = [
    Products.create(req.body),
    Category.findOneAndUpdate(
      { categoryName: req.body.category },
      { $inc: { noOfProducts: 1 } }
    ),
  ];
  const product = await Promise.all(promises);
  res.status(201).json(product[0]);
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  delete req.query.page;
  delete req.query.limit;

  const products = await Products.find(req.query);
  res.status(200).json(products);
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Products.findById(req.params.productId);
  console.log(product);
  res.status(200).json(product);
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Products.findByIdAndUpdate(
    req.params.productId,
    req.body,
    { new: true }
  );
  res.status(200).json(product);
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Products.findByIdAndDelete(req.params.productId);

  await Category.findOneAndUpdate(
    { categoryName: product.category },
    { $inc: { noOfProducts: -1 } }
  );

  res.status(204).json();
});
