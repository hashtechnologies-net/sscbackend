const mongoose = require('mongoose');
const slugify = require('slugify');

const pathlabSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A pathlab must have a name'],
    },
    city: {
      type: String,
      required: [true, 'A pathlab must have a city'],
    },
    province: {
      type: String,
      required: [true, 'A pathlab must have a province'],
    },
    district: {
      type: String,
      required: [true, 'A pathlab must have a district'],
    },
    country: {
      type: String,
      default: 'Nepal',
      required: [true, 'A pathlab must have a country'],
    },
    type: {
      type: String,
      required: [true, 'A pathlab must have a type'],
    },
    photo: {
      type: String,
    },
    phone_email: {
      type: String,
      required: [true, 'A pathlab must have a phone number or an email'],
    },
    openTime: {
      type: String,
      default: 'Open 24 hours',
    },
    website: {
      type: String,
      default: 'Not available',
    },
    slug: String,
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

pathlabSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Pathlab = mongoose.model('Pathlab', pathlabSchema);

module.exports = Pathlab;
