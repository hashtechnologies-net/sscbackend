const mongoose = require('mongoose');
var ttl = require('mongoose-ttl');

const tokenSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    token: { type: String, required: true },
  },
  { timestamps: true }
);
tokenSchema.plugin(ttl, { ttl: '2m' });
tokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 120 });
const token = mongoose.model('token', tokenSchema);

module.exports = token;
