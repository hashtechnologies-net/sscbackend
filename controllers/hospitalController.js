const Hospital = require('../models/hospitalModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');
const multer = require('multer');
const sharp = require('sharp');

const path = require('path');

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

exports.uploadHospitalPhoto = upload.single('photo');

exports.resizeHospitalPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `hospital-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/hospitals/${req.file.filename}`);

  req.body.photo = `${req.protocol}://${req.get('host')}/img/hospitals/${
    req.file.filename
  }`;

  next();
});

exports.createHospital = catchAsync(async (req, res, next) => {
  newHospital = await Hospital.create(req.body);
  res.status(201).json({ status: 'success', data: newHospital });
});

exports.getAllHospitals = catchAsync(async (req, res, next) => {
  //   const hospitals = await Hospital.find({
  //     name: { $regex: `${req.query.name}`, $options: 'i' },
  //   });
  //   return res.status(200).json({ results: hospitals.length, data: hospitals });
  // });
  // // find({ EmployeeName: { $regex: 'Gu', $options: 'i' } });

  // const { name } = req.query;
  // const regex = new RegExp(name, i);
  // const hospitals = await Hospital.find({ name: regex });

  // const { name } = req.query;
  // const regex = new RegExp(name, 'i');
  // // const hospitals = await Hospital.find({ name: regex });
  // const features = new APIFeatures(Hospital.find(), req.query)
  //   .filter({ name: regex })
  //   .sort()
  //   .limitFields()
  //   .paginate();
  const hospitals = await Hospital.find();

  return res.status(200).json({
    status: 'success',
    results: hospitals.length,
    data: hospitals,
  });
});

exports.getHospital = catchAsync(async (req, res, next) => {
  const hospital = await Hospital.findById(req.params.id);

  if (!hospital) {
    return next(new AppError('No hospital found with that id', 404));
  }
  res.status(200).json({ status: 'success', data: hospital });
});

exports.updateHospital = catchAsync(async (req, res, next) => {
  const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: false,
    new: true,
  });

  if (!hospital) {
    return next(new AppError('No hospital found with that id', 404));
  }
  res.status(200).json({ status: 'success', data: hospital });
});

exports.deleteHospital = catchAsync(async (req, res, next) => {
  const hospital = await Hospital.findByIdAndDelete(req.params.id);

  if (!hospital) {
    return next(new AppError('No hospital found with that id', 404));
  }
  res.status(204).json({ status: 'success', data: {} });
});
