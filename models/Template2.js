const mongoose = require('mongoose');

const Template2Schema = new mongoose.Schema({
  hero: {
    head: { type: String },
    roles: { type: [String] },
    buttonText: { type: String },
    buttonLink: { type: String },
    heroImg: { type: String },
  },
  about: {
    aboutHead: { type: String },
    aboutDesc: { type: String },
    aboutButtonText: { type: String },
    aboutButtonLink: { type: String },
    aboutImg: { type: String },
  },
  experience: [
    {
      company: { type: String },
      startYear: { type: Number },
      endYear: { type: Number },
      role: { type: String },
      desc: { type: String },
    },
  ],
  projects: [
    {
      projectName: { type: String },
      projectDesc: { type: String },
      projectLink: { type: String },
    },
  ],
});

module.exports = mongoose.model('Template2', Template2Schema);
