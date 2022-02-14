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

  req.file.filename = `pathlab-${req.body.name}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(800)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/pathlabs/${req.file.filename}`);

  req.body.photo = `${req.protocol}://${req.get('host')}/img/pathlabs/${
    req.file.filename
  }`;

  next();
});

exports.createPathlab = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const pathlabExists = await Pathlab.findOne({ name });

  if (pathlabExists) {
    return res.status(400).json({
      status: 'fail',
      message: `Pathlab with that name ${name} already exists.`,
    });
  }
  newPathlab = await Pathlab.create(req.body);
  res.status(201).json({ status: 'success', data: newPathlab });
});

exports.getAllPathlabs = catchAsync(async (req, res, next) => {
  const { name } = req.query;

  const regex = new RegExp(name, 'i');
  const features = new APIFeatures(Pathlab.find(), req.query)
    .filter({ name: regex })
    .sort()
    .limitFields()
    .paginate();
  const pathlabs = await features.query;

  const options = {};
  if (req.query.hasOwnProperty('isVisible'))
    options.isVisible = req.query.isVisible;
  const pathlabsCount = await Pathlab.countDocuments(options);

  return res.status(200).json({
    status: 'success',
    data: pathlabs,
    pathlabsCount,
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
