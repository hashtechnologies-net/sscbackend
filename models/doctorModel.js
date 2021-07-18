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
    },
    province: {
      type: String,
    },
    district: {
      type: String,
    },
    country: {
      type: String,
      default: 'Nepal',
    },
    degree: {
      type: String,
      required: [true, 'A doctor must have a degree'],
    },
    photo: {
      type: String,
    },

    specialities: {
      type: String,
      required: [true, 'A doctor must have a specialization'],
    },
    hospital: {
      type: String,
    },
    email_phone: {
      type: String,
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
