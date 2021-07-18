const mongoose = require('mongoose');
const slugify = require('slugify');

const policySchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'A policy holder must have a first name'],
    },
    middle_name: {
      type: String,
    },
    last_name: {
      type: String,
      required: [true, 'A policy holder must have a last name'],
    },
    phone: {
      type: Number,
      required: [true, 'A policy holder must have a phone number'],
    },
    email: {
      type: String,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
    },
    marital_status: {
      type: String,
    },
    province: {
      type: String,
    },
    district: {
      type: String,
    },
    gaupalika_nagarpalika: {
      type: String,
    },
    ward_no: {
      type: Number,
    },
    citizenship_front: {
      type: String,
    },
    citizenship_back: {
      type: String,
    },
    issued_date: {
      type: Date,
    },
    issued_from: {
      type: String,
    },
    occupation: {
      type: String,
    },
    pan_no: {
      type: String,
    },
    father_name: {
      type: String,
    },
    mother_name: {
      type: String,
    },
    grand_father_name: {
      type: String,
    },
    grand_mother_name: {
      type: String,
    },
    husband_wife_name: {
      type: String,
    },
    spouse_name: {
      type: String,
    },
    amount: { type: Number },
    isPaid: {
      type: Boolean,
      default: false,
    },

    slug: { type: String },
  },
  { timestamps: true }
);

policySchema.pre('save', function (next) {
  this.slug = slugify(this.first_name + this.middle_name + this.last_name, {
    lower: true,
  });
  next();
});

const Policy = mongoose.model('Policy', policySchema);

module.exports = Policy;
