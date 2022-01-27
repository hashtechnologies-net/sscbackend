const Category = require('../models/categoryModel');
const Products = require('../models/productsModel');
const catchAsync = require('../utils/catchAsync');

exports.createCategory = catchAsync(async (req, res, next) => {
  const category = await Category.create({
    categoryName: req.body.categoryName,
  });
  res.status(201).json(category);
});

exports.getAllCategory = catchAsync(async (req, res, next) => {
  const category = await Category.find(req.query);
  res.status(200).json(category);
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findOne(req.params.categoryName);
  console.log(category);
  res.status(200).json(category);
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const promises = [
    Category.findOneAndUpdate(
      req.params.categoryName,
      { categoryName: req.body.categoryName },
      { new: true }
    ),
    Products.updateMany(
      { category: req.params.categoryName },
      { category: req.body.categoryName },
      { new: true }
    ),
  ];

  const category = await Promise.all(promises);
  res.status(200).json(category[0]);
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const promises = [
    Category.findOneAndDelete(req.params.categoryName),
    Products.updateMany(
      { category: req.params.categoryName },
      { category: null }
    ),
  ];

  await Promise.all(promises);
  res.status(204).json();
});
