const Appointment = require('../models/appointmentModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');

exports.createAppointment = catchAsync(async (req, res, next) => {
  newAppointment = await Appointment.create(req.body);
  res.status(201).json({ status: 'success', data: newAppointment });
});

exports.getAllAppointments = catchAsync(async (req, res, next) => {
  const { name } = req.query;
  const regex = new RegExp(name, 'i');

  const features = new APIFeatures(Appointment.find(), req.query)
    .filter({ name: regex })
    .sort()
    .limitFields()
    .paginate();
  const appointments = await features.query;

  return res.status(200).json({
    status: 'success',
    results: appointments.length,
    data: appointments,
  });
});

exports.getAppointment = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(new AppError('No appointment found with that id', 404));
  }
  res.status(200).json({ status: 'success', data: appointment });
});

exports.updateAppointment = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      runValidators: false,
      new: true,
    }
  );

  if (!appointment) {
    return next(new AppError('No appointment found with that id', 404));
  }
  res.status(200).json({ status: 'success', data: appointment });
});

exports.deleteAppointment = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findByIdAndDelete(req.params.id);

  if (!appointment) {
    return next(new AppError('No appointment found with that id', 404));
  }
  res.status(204).json({ status: 'success', data: {} });
});
