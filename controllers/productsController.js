const multer = require('multer');
const sharp = require('sharp');
const Products = require('../models/productsModel');
const Category = require('../models/categoryModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  fileFilter: multerFilter,
});

exports.readImage = upload.array('imageUrl');

exports.resizeImage = catchAsync(async (req, res, next) => {
  if (!req.files || req.files.length == 0) return next();

  req.body.imageUrl = [];
  await Promise.all(
    req.files.map(async (file) => {
      const filename = `${file.fieldname}-${Date.now()}-${file.originalname}`;
      await sharp(file.buffer)
        .resize(800, 450)
        .jpeg({ quality: 90 })
        .toFile(`public/img/products/${filename}`);

      req.body.imageUrl.push(
        `${req.protocol}://${req.get('host')}/img/products/${filename}`
      );
    })
  );

  next();
});

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
