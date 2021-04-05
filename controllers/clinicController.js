const Clinic = require('../models/clinicModel');
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

exports.uploadClinicPhoto = upload.single('photo');

exports.resizeClinicPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `clinic-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/clinics/${req.file.filename}`);

  req.body.photo = `${req.protocol}://${req.get('host')}/img/clinics/${
    req.file.filename
  }`;

  next();
});

exports.createClinic = catchAsync(async (req, res, next) => {
  newClinic = await Clinic.create(req.body);
  res.status(201).json({ status: 'success', data: newClinic });
});

exports.getAllClinics = catchAsync(async (req, res, next) => {
  //   const hospitals = await Hospital.find({
  //     name: { $regex: `${req.query.name}`, $options: 'i' },
  //   });
  //   return res.status(200).json({ results: hospitals.length, data: hospitals });
  // });
  // // find({ EmployeeName: { $regex: 'Gu', $options: 'i' } });

  const { name } = req.query;
  const regex = new RegExp(name, 'i');
  const features = new APIFeatures(Clinic.find(), req.query)
    .filter({ name: regex })
    .sort()
    .limitFields()
    .paginate();
  const clinics = await features.query;
  return res.status(200).json({
    status: 'success',
    results: clinics.length,
    data: clinics,
  });
});

exports.getClinic = catchAsync(async (req, res, next) => {
  const clinic = await Clinic.findById(req.params.id);

  if (!clinic) {
    return next(new AppError('No clinic found with that id', 404));
  }
  res.status(200).json({ status: 'success', data: clinic });
});

exports.updateClinic = catchAsync(async (req, res, next) => {
  const clinic = await Clinic.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: false,
    new: true,
  });

  if (!clinic) {
    return next(new AppError('No clinic found with that id', 404));
  }
  res.status(200).json({ status: 'success', data: clinic });
});

exports.deleteClinic = catchAsync(async (req, res, next) => {
  const clinic = await Clinic.findByIdAndDelete(req.params.id);

  if (!clinic) {
    return next(new AppError('No clinic found with that id', 404));
  }
  res.status(204).json({ status: 'success', data: {} });
});
