const mongoose = require('mongoose');
const validator = require('validator');
const appointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'An appointment must have a name'],
    },
    email: {
      type: String,
      required: [true, 'An appointment must have a email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    service: {
      type: String,
      required: [true, 'An appointment must have a service'],
      enum: [
        'doctorsOnCall',
        'physicotherapy',
        'nursingServices',
        'homeSample',
        'elderlyCare',
        'doctorConsultation',
      ],
    },
    phone: {
      type: Number,
      required: [true, 'An appointment must have a phone number'],
    },
    description: {
      type: String,
      required: [
        true,
        'A description is required and must have more than 10 characters',
      ],
      minLength: 10,
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
