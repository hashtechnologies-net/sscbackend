const Rental = require('../models/RentalModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');

exports.createRental = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;
  console.log(req.user);
  newRental = await Rental.create(req.body);
  res.status(201).json({ status: 'success', data: newRental });
});

exports.getAllRentals = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Rental.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const rentals = await features.query;
  return res.status(200).json({
    status: 'success',
    results: rentals.length,
    data: rentals,
  });
});

exports.getRental = catchAsync(async (req, res, next) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) {
    return next(new AppError('No rental found with that id', 404));
  }
  res.status(200).json({ status: 'success', data: rental });
});

exports.updateRental = catchAsync(async (req, res, next) => {
  const rental = await Rental.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });

  if (!rental) {
    return next(new AppError('No rental found with that id', 404));
  }
  res.status(200).json({ status: 'success', data: rental });
});

exports.deleteRental = catchAsync(async (req, res, next) => {
  const rental = await Rental.findByIdAndDelete(req.params.id);

  if (!rental) {
    return next(new AppError('No rental found with that id', 404));
  }
  res.status(204).json({ status: 'success', data: {} });
});
