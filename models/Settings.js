// models/Settings.js
const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  logo: { type: String, required: true },
  favicon: { type: String, required: true },
  metaDescription: { type: String, required: true },
  metaKeyword: { type: String, required: true },
  title: { type: String, required: true },
});

module.exports = mongoose.model('Settings', SettingsSchema);
