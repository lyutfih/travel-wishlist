const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  alpha2Code: { type: String, required: true },
  alpha3Code: { type: String, required: true },
  visited: { type: Boolean, default: false }
});

module.exports = mongoose.model('Country', countrySchema);