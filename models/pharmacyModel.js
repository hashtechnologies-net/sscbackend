const mongoose = require('mongoose');
const slugify = require('slugify');
const mongoosePaginate = require('mongoose-paginate');

const pharmacySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A pharmacy must have a name'],
    },
    city: {
      type: String,
      required: [true, 'A pharmacy must have a city'],
    },
    province: {
      type: String,
      required: [true, 'A pharmacy must have a province'],
    },
    district: {
      type: String,
      required: [true, 'A pharmacy must have a district'],
    },
    country: {
      type: String,
      default: 'Nepal',
    },
    type: {
      type: String,
      required: [true, 'A pharmacy must have a type'],
    },
    photo: {
      type: String,
    },
    phone: {
      type: Number,
      required: [true, 'A pharmacy must have a phone number'],
    },
    openTime: {
      type: String,
      default: 'Open 24 hours',
    },
    website: {
      type: String,
      default: 'Not available',
    },
    slug: { type: String },
  },
  { timestamps: true }
);

pharmacySchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
pharmacySchema.plugin(mongoosePaginate);
const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);

module.exports = Pharmacy;
