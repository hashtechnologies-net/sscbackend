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
    citizenship_no: {
      type: String,
      required: [true, 'A policy holder must have a citizenship'],
    },
    email: {
      type: String,
    },
    dob_ad: {
      type: Date,
    },
    dob_bs: {
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
      required: [
        true,
        'A policy holder must enter citizenship front size photo',
      ],
    },
    citizenship_back: {
      type: String,
      required: [
        true,
        'A policy holder must enter citizenship back size photo',
      ],
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
    amount: {
      type: String,
      required: [true, 'A policy holder must select an amount'],
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    card_number: {
      type: String,
    },
    nominee_name: {
      type: String,
      required: [true, 'A policy holder must have a nominee name'],
    },
    nominee_photo: {
      type: String,
      required: [
        true,
        'A policy holder must upload passport size nominee photo',
      ],
    },
    nominee_relation: {
      type: String,
      required: [
        true,
        'A policy holder must insert a relation with the nominee',
      ],
    },
    nominee_son_wife_daughter_of: {
      type: String,
      required: [
        true,
        "A policy holder must insert a name of the nominee's son/wife/daughter.",
      ],
    },
    nominee_dob: {
      type: String,
      required: [true, "Please check nominee's date of birth"],
    },
    nominee_identity_card: {
      type: String,
      required: [true, "Please check nominee's ID card"],
    },
    nominee_card_no: {
      type: String,
      required: [true, "Please check nominee's ID card number"],
    },
    nominee_card_issue_authority: {
      type: String,
      required: [true, "Please check nominee's ID card's issue authority"],
    },
    nominee_card_date_of_issue: {
      type: String,
      required: [true, "Please check nominee's ID card's date of issue"],
    },
    nominee_card_place_of_issue: {
      type: String,
      required: [true, "Please check nominee's ID card's place of issue"],
    },
    nominee_permanent_address: {
      type: String,
      required: [true, "Please check nominee's permanent address"],
    },
    nominee_temporary_address: {
      type: String,
      required: [true, "Please check nominee's temporary address"],
    },
    nominee_phone: {
      type: String,
      required: [true, "Please check nominee's phone number"],
    },
    nominee_email: {
      type: String,
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
