// models/Footer.js
const mongoose = require('mongoose');

const FooterSchema = new mongoose.Schema({
  linkedin: { type: String, required: true },
  twitter: { type: String, required: true },
  mail: { type: String, required: true },
  instagram: { type: String, required: true },
  facebook: { type: String, required: true },
});

module.exports = mongoose.model('Footer', FooterSchema);
