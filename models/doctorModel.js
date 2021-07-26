const mongoose = require('mongoose');
const slugify = require('slugify');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A doctor must have a name'],
    },
    city: {
        type: String,
        required: [true, 'Please provide a city of the doctor'],
    },
    province: {
        type: String,
        required: [true, 'Please provide a province of the doctor'],
    },
    district: {
        type: String,
        required: [true, 'Please provide a district of the doctor'],
    },
    country: {
        type: String,
        default: 'Nepal',
        required: [true, 'Please provide a country of the doctor'],
    },
    degree: {
        type: String,
        required: [true, 'A doctor must have a degree'],
    },
    photo: {
        type: String,
    },
    nmc_number: {
        type: String,
        required: [true, 'Please provide the nmc number of the doctor'],
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
        required: [true, 'Please provide an email or phone number of the doctor'],
    },
    slug: String,
}, { timestamps: true });

doctorSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;