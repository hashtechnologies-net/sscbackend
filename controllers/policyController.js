const Policy = require('../models/policyModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');
const sharp = require('sharp');
const path = require('path');

const multer = require('multer');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadFiles = upload.array('citizenships', 2);

exports.uploadImages = (req, res, next) => {
  uploadFiles(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return new AppError(`A Multer error occurred when uploading.`, 400);

      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        // Too many images exceeding the allowed limit
        return new AppError(`Too many images exceeding the allowed limit`, 500);
      }
    } else if (err) {
      return new AppError(`Something went wrong while uploading`, 500);
      // handle other errors
    }

    // Everything is ok.
    next();
  });
};
exports.resizePolicyPhoto = catchAsync(async (req, res, next) => {
  if (!req.files) return next();
  req.body.images = [];

  await Promise.all(
    req.files.map(async (file) => {
      const newFilename = `citizenship-${
        req.body.first_name
      }-${Date.now()}.jpeg`;

      await sharp(file.buffer)
        .resize(800)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/citizenships/${newFilename}`);

      req.body.images.push(newFilename);
    })
  );
  next();
});

exports.createPolicy = catchAsync(async (req, res, next) => {
  const images = [...req.body.images];
  
  req.body.citizenship_front = `${req.protocol}://${req.get(
    'host'
  )}/img/citizenships/${images[0]}`;
  req.body.citizenship_back = `${req.protocol}://${req.get(
    'host'
  )}/img/citizenships/${images[1]}`;

  newPolicy = await Policy.create(req.body);
  res.status(201).json({ status: 'success', data: newPolicy });
});

exports.getAllPolicy = catchAsync(async (req, res, next) => {
  const { first_name, middle_name, last_name } = req.query;

  const regex = new RegExp(first_name, 'i');
  const regex2 = new RegExp(middle_name, 'i');
  const regex3 = new RegExp(last_name, 'i');
  const features = new APIFeatures(Policy.find(), req.query)
    .filter({ first_name: regex, middle_name: regex2, last_name: regex3 })
    .sort()
    .limitFields()
    .paginate();
  const policy = await features.query;
  const policyCount = await Policy.countDocuments();

  return res.status(200).json({
    status: 'success',
    data: policy,
    policyCount,
  });
});

exports.getPolicy = catchAsync(async (req, res, next) => {
  const policy = await Policy.findById(req.params.id);

  if (!policy) {
    return next(new AppError('No Policy found with that id', 404));
  }
  res.status(200).json({ status: 'success', data: policy });
});

exports.updatePolicy = catchAsync(async (req, res, next) => {
  const policy = await Policy.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  if (!policy) {
    return next(new AppError('No policy found with that id', 404));
  }
  res.status(200).json({ status: 'success', data: policy });
});

exports.deletePolicy = catchAsync(async (req, res, next) => {
  const policy = await Policy.findByIdAndDelete(req.params.id);

  if (!policy) {
    return next(new AppError('No policy found with that id', 404));
  }
  res.status(204).json({ status: 'success', data: {} });
});
