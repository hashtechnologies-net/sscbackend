const Doctor = require('../models/doctorModel');
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

exports.uploadDoctorPhoto = upload.single('photo');

exports.resizeDoctorPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `doctor-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/doctors/${req.file.filename}`);

  req.body.photo = `${req.protocol}://${req.get('host')}/img/doctors/${
    req.file.filename
  }`;

  next();
});

exports.createDoctor = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const doctorExists = await Doctor.findOne({ name });

  if (doctorExists) {
    return res.status(400).json({
      status: 'fail',
      message: `Doctor with that name ${name} already exists.`,
    });
  }

  newDoctor = await Doctor.create(req.body);
  res.status(201).json({ status: 'success', data: newDoctor });
});

exports.getAllDoctors = catchAsync(async (req, res, next) => {
  const { name } = req.query;
  if (name) {
    const regex = new RegExp(name, 'i');
    // const pathlabs = await Pathlab.find({ name: regex });
    const features = new APIFeatures(Doctor.find(), req.query)
      .filter({ name: regex })
      .sort()
      .limitFields()
      .paginate();
    const doctors = await features.query;
    const doctorsCount = await Doctor.countDocuments();

    return res.status(200).json({
      status: 'success',
      data: doctors,
      doctorsCount,
    });
  } else {
    const { page, limit } = req.query;

    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 100,
    };

    const paginate = await Doctor.paginate({}, options);

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

exports.getDoctor = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return next(new AppError('No doctor found with that id', 404));
  }
  res.status(200).json({ status: 'success', data: doctor });
});

exports.updateDoctor = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: false,
    new: true,
  });

  if (!doctor) {
    return next(new AppError('No doctor found with that id', 404));
  }
  res.status(200).json({ status: 'success', data: doctor });
});

exports.deleteDoctor = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findByIdAndDelete(req.params.id);

  if (!doctor) {
    return next(new AppError('No doctor found with that id', 404));
  }
  res.status(204).json({ status: 'success', data: {} });
});
