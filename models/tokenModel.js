const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  token: { type: String, required: true },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expireAfterSeconds: 60 },
  },
});

const token = mongoose.model('token', tokenSchema);

module.exports = token;

