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

exports.uploadPharmacyPhoto = upload.single('photo');

exports.resizePharmacyPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `pharmacy-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/pharmacies/${req.file.filename}`);

  req.body.photo = `${req.protocol}://${req.get('host')}/img/pharmacies/${
    req.file.filename
  }`;

  next();
});

exports.createPolicy = catchAsync(async (req, res, next) => {
  newPolicy = await Policy.create(req.body);
  res.status(201).json({ status: 'success', data: newPolicy });
});

exports.getAllPolicy = catchAsync(async (req, res, next) => {
  const { first_name, middle_name, last_name } = req.query;
  if (first_name || middle_name || last_name) {
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
  } else {
    const { page, limit } = req.query;

    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 100,
    };

    const paginate = await Policy.paginate({}, options);

    return res.status(200).json({
      status: 'success',
      data: paginate.docs,
      paginate: {
        total: paginate.total,
        limit: paginate.limit,
        page: paginate.page,
        pages: paginate.pages,
      },
    });
  }
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
