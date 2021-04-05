const mongoose = require('mongoose');
const slugify = require('slugify');

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A doctor must have a name'],
    },
    city: {
      type: String,
      required: [true, 'A doctor must have a city'],
    },
    province: {
      type: String,
      required: [true, 'A doctor must have a province'],
    },
    district: {
      type: String,
      required: [true, 'A doctor must have a district'],
    },
    country: {
      type: String,
      default: 'Nepal',
    },
    type: {
      type: String,
      required: [true, 'A doctor must have a type'],
    },
    photo: {
      type: String,
    },

    website: {
      type: String,
      default: 'Not available',
    },
    slug: String,
  },
  { timestamps: true }
);

doctorSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
