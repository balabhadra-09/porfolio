// models/Template1.js
const mongoose = require('mongoose');

const Template1Schema = new mongoose.Schema({
  hero: {
    head: { type: String, required: true },
    roles: { type: [String], required: true },
    buttonText: { type: String, required: true },
    buttonLink: { type: String, required: true },
  },
  about: {
    aboutHead: { type: String, required: true },
    aboutDesc: { type: String, required: true },
    skills: [{ skill: String, level: Number }],
  },
  services: {
    serviceHead: { type: String, required: true },
    services: [{ title: String, desc: String }],
  },
  portfolio: {
    portfolioHead: { type: String, required: true },
    projects: [{ img: String, projectName: String, projectLink: String }],
  },
  experience: [
    {
      role: { type: String, required: true },
      company: { type: String, required: true },
      desc: { type: String, required: true },
      startYear: { type: Number, required: true },
      endYear: { type: Number },
    },
  ],
  education: [
    {
      course: { type: String, required: true },
      institute: { type: String, required: true },
      desc: { type: String, required: true },
      startYear: { type: Number, required: true },
      endYear: { type: Number },
    },
  ],
  blogs: { blogHead: String },
});

module.exports = mongoose.model('Template1', Template1Schema);
