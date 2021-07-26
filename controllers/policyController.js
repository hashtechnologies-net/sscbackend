const Policy = require('../models/policyModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

const path = require('path');
sscCardNumberGenerator = require('creditcard-generator');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "citizenship_front") {
      cb(null, 'public/img/policies/')
    }
    else if (file.fieldname === "citizenship_back") {
      cb(null, 'public/img/policies/');
    }
    else if (file.fieldname === "nominee_photo") {
      cb(null, 'public/img/policies/')
    }
  },
  filename: (req, file, cb) => {
    if (file.fieldname === "citizenship_front") {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
    else if (file.fieldname === "citizenship_back") {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
    else if (file.fieldname === "nominee_photo") {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
  }
});


function checkFileType(file, cb) {
  if (file.fieldname === "citizenship_front") {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      fiel.mimetype === 'image/gif'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
  else if (file.fieldname === "citizenship_back" || file.fieldname === "nominee_photo") {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      fiel.mimetype === 'image/gif'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
}


exports.uploadPolicyPhoto = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).fields(
  [
    {
      name: 'citizenship_front',
      maxCount: 1
    },
    {
      name: 'citizenship_back', maxCount: 1
    },
    {
      name: 'nominee_photo', maxCount: 1
    }
  ]
);






exports.createPolicy = catchAsync(async (req, res, next) => {
  console.log(req.files)

  req.body.citizenship_front = `${req.files.citizenship_front[0].destination}${req.files.citizenship_front[0].filename}`;
  req.body.citizenship_back = `${req.files.citizenship_back[0].destination}${req.files.citizenship_back[0].filename}`;
  req.body.nominee_photo = `${req.files.nominee_photo[0].destination}${req.files.nominee_photo[0].filename}`;

  req.body.card_number = sscCardNumberGenerator.GenCC().toString();

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
