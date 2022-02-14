const mongoose = require('mongoose');
const slugify = require('slugify');

const clinicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A clinic must have a name'],
    },
    city: {
      type: String,
      required: [true, 'A clinic must have a city'],
    },
    province: {
      type: String,
      required: [true, 'A clinic must have a province'],
    },
    district: {
      type: String,
      required: [true, 'A clinic must have a district'],
    },
    country: {
      type: String,
      default: 'Nepal',
    },
    type: {
      type: String,
      required: [true, 'A clinic must have a type'],
    },
    photo: {
      type: String,
    },
    phone: {
      type: Number,
      required: [true, 'A clinic must have a phone number'],
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

clinicSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
const Clinic = mongoose.model('Clinic', clinicSchema);

module.exports = Clinic;
