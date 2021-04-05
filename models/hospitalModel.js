const mongoose = require('mongoose');
const slugify = require('slugify');

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A hospital must have a name'],
    },
    city: {
      type: String,
      required: [true, 'A hospital must have a city'],
    },
    province: {
      type: String,
      required: [true, 'A hospital must have a province'],
    },
    district: {
      type: String,
      required: [true, 'A hospital must have a district'],
    },
    country: {
      type: String,
      default: 'Nepal',
    },
    type: {
      type: String,
      required: [true, 'A hospital must have a type'],
    },
    photo: {
      type: String,
    },
    phone: {
      type: Number,
      required: [true, 'A hospital must have a phone number'],
    },
    openTime: {
      type: String,
      required: [true, 'A hospital must have an opening time'],
      default: 'Open 24 hours',
    },
    website: {
      type: String,
      default: 'Not available',
    },
    slug: String,
    description: { type: String, minLength: 500 },
  },
  { timestamps: true }
);

hospitalSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
