const Pharmacy = require('../models/pharmacyModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');
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

  req.file.filename = `pharmacy-${req.body.name}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(800)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/pharmacies/${req.file.filename}`);

    console.log(req.protocol);
  req.body.photo = `${req.protocol}://${req.get('host')}/img/pharmacies/${
    req.file.filename
  }`;

  next();
});

exports.createPharmacy = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const pharmacy = await Pharmacy.findOne({ name });

  if (pharmacy) {
    return res.status(400).json({
      status: 'fail',
      message: `Pharmacy with that name ${name} already exists.`,
    });
  }
  newPharmacy = await Pharmacy.create(req.body);
  res.status(201).json({ status: 'success', data: newPharmacy });
});

exports.getAllPharmacy = catchAsync(async (req, res, next) => {
  const { name } = req.query;

  const regex = new RegExp(name, 'i');
  const features = new APIFeatures(Pharmacy.find(), req.query)
    .filter({ name: regex })
    .sort()
    .limitFields()
    .paginate();
  const pharmacy = await features.query;

  const options = {};
  if (req.query.hasOwnProperty('isVisible'))
    options.isVisible = req.query.isVisible;
  const pharmacyCount = await Pharmacy.countDocuments(options);

  return res.status(200).json({
    status: 'success',
    data: pharmacy,
    pharmacyCount,
  });
});

exports.getPharmacy = catchAsync(async (req, res, next) => {
  const pharmacy = await Pharmacy.findById(req.params.id);

  if (!pharmacy) {
    return next(new AppError('No Pharmacy found with that id', 404));
  }
  res.status(200).json({ status: 'success', data: pharmacy });
});

exports.updatePharmacy = catchAsync(async (req, res, next) => {
  const pharmacy = await Pharmacy.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  if (!pharmacy) {
    return next(new AppError('No pharmacy found with that id', 404));
  }
  res.status(200).json({ status: 'success', data: pharmacy });
});

exports.deletePharmacy = catchAsync(async (req, res, next) => {
  const pharmacy = await Pharmacy.findByIdAndDelete(req.params.id);

  if (!pharmacy) {
    return next(new AppError('No pharmacy found with that id', 404));
  }
  res.status(204).json({ status: 'success', data: {} });
});
