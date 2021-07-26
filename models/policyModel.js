const mongoose = require('mongoose');
const slugify = require('slugify');

const policySchema = new mongoose.Schema({
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
        type: String,
        required: [true, 'A policy holder must have a date of birth in AD'],
    },
    dob_bs: {
        type: String,
        required: [true, 'A policy holder must have a date of birth in BS'],
    },
    gender: {
        type: String,
        required: [true, 'A policy holder must have his gender provided'],
    },
    marital_status: {
        type: String,
        required: [true, 'A policy holder must have a marital status'],
    },
    province: {
        type: String,
        required: [true, 'A policy holder must have a province'],
    },
    district: {
        type: String,
        required: [true, 'A policy holder must have a district'],
    },
    gaupalika_nagarpalika: {
        type: String,
        required: [true, 'A policy holder must have a gaupalika or nagarpalika'],
    },
    ward_no: {
        type: Number,
        required: [true, 'A policy holder must have a ward no. provided'],
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
        required: [true, 'A policy holder must enter citizenship issued date.'],
    },
    issued_from: {
        type: String,
        required: [
            true,
            'A policy holder must enter where the citizenship is issued from',
        ],
    },
    occupation: {
        type: String,
        required: [
            true,
            'A policy holder must enter an occupation like job,business.....',
        ],
    },
    pan_no: {
        type: String,
    },
    father_name: {
        type: String,
        required: [true, "A policy holder must enter their father's name "],
    },
    mother_name: {
        type: String,
        required: [true, "A policy holder must enter their mother's name "],
    },
    grand_father_name: {
        type: String,
        required: [true, "A policy holder must enter their grand father's name "],
    },
    grand_mother_name: {
        type: String,
        required: [true, "A policy holder must enter their grand mother's name "],
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
        required: [
            true,
            'Problem generating a card number for the policy holder',
        ],
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
        required: [
            true,
            "Please check nominee's date of birth and provide in the format YYYY-MM-DD , YYYY/MM/DD....",
        ],
    },
    nominee_identity_card: {
        type: String,
        required: [
            true,
            "Please check nominee's ID card like citizenship/passport....",
        ],
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
}, { timestamps: true });

policySchema.pre('save', function(next) {
    this.slug = slugify(this.first_name + this.middle_name + this.last_name, {
        lower: true,
    });
    next();
});

const Policy = mongoose.model('Policy', policySchema);

module.exports = Policy;