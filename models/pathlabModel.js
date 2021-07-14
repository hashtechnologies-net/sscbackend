const mongoose = require('mongoose');
const slugify = require('slugify');
const mongoosePaginate = require('mongoose-paginate');

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
    },
    type: {
      type: String,
      required: [true, 'A pathlab must have a type'],
    },
    photo: {
      type: String,
    },
    phone: {
      type: Number,
      required: [true, 'A pathlab must have a phone number'],
    },
    openTime: {
      type: String,
      required: [true, 'A pathlab must have an opening time'],
      default: 'Open 24 hours',
    },
    website: {
      type: String,
      default: 'Not available',
    },
    slug: String,
  },
  { timestamps: true }
);

pathlabSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

pathlabSchema.plugin(mongoosePaginate);
const Pathlab = mongoose.model('Pathlab', pathlabSchema);

module.exports = Pathlab;
