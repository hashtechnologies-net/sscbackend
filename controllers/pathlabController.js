const Pathlab = require('../models/pathlabModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');
const multer = require('multer');
const sharp = require('sharp');

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

exports.uploadPathlabPhoto = upload.single('photo');

exports.resizePathlabPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `pathlab-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/pathlabs/${req.file.filename}`);

  req.body.photo = `${req.protocol}://${req.get('host')}/img/pathlabs/${
    req.file.filename
  }`;

  next();
});

exports.createPathlab = catchAsync(async (req, res, next) => {
  newPathlab = await Pathlab.create(req.body);
  res.status(201).json({ status: 'success', data: newPathlab });
});

exports.getAllPathlabs = catchAsync(async (req, res, next) => {
  //   const hospitals = await Hospital.find({
  //     name: { $regex: `${req.query.name}`, $options: 'i' },
  //   });
  //   return res.status(200).json({ results: hospitals.length, data: hospitals });
  // });
  // // find({ EmployeeName: { $regex: 'Gu', $options: 'i' } });
  const { name } = req.query;
  const regex = new RegExp(name, 'i');
  const features = new APIFeatures(Pathlab.find(), req.query)
    .filter({ name: regex })
    .sort()
    .limitFields()
    .paginate();
  const pathlabs = await features.query;
  return res.status(200).json({
    status: 'success',
    results: pathlabs.length,
    data: pathlabs,
  });
});

exports.getPathlab = catchAsync(async (req, res, next) => {
  const pathlab = await Pathlab.findById(req.params.id);

  if (!pathlab) {
    return next(new AppError('No pathlab found with that id', 404));
  }
  res.status(200).json({ status: 'success', data: pathlab });
});

exports.updatePathlab = catchAsync(async (req, res, next) => {
  const pathlab = await Pathlab.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: false,
    new: true,
  });

  if (!pathlab) {
    return next(new AppError('No pathlab found with that id', 404));
  }
  res.status(200).json({ status: 'success', data: pathlab });
});

exports.deletePathlab = catchAsync(async (req, res, next) => {
  const pathlab = await Pathlab.findByIdAndDelete(req.params.id);

  if (!pathlab) {
    return next(new AppError('No pathlab found with that id', 404));
  }
  res.status(204).json({ status: 'success', data: {} });
});
