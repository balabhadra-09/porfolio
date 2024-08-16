// controllers/template2Controller.js
const Template2 = require('../models/Template2');
const path = require('path');

exports.createTemplate2 = async (req, res) => {
  try {
    
    // Folder path where files are uploaded
    const folderPath = 'uploads/';

    // Extract file information if available
    const heroImg = req.files && req.files.heroImg ? folderPath + req.files.heroImg[0].filename : '';
    const aboutImg = req.files && req.files.aboutImg ? folderPath + req.files.aboutImg[0].filename : '';

    // Parse JSON fields from request body
    const hero = JSON.parse(req.body.hero || '{}');
    const about = JSON.parse(req.body.about || '{}');
    const experience = JSON.parse(req.body.experience || '[]');
    const projects = JSON.parse(req.body.projects || '[]');

    // Include filenames if files are uploaded
    if (heroImg) hero.heroImg = heroImg;
    if (aboutImg) about.aboutImg = aboutImg;

    // Create a new Template2 instance
    const newTemplate2 = new Template2({
      hero,
      about,
      experience,
      projects 
    });

    // Save the new Template2 document
    const template2 = await newTemplate2.save();
    res.status(201).json(template2);
  } catch (err) {
    console.error('Error in createTemplate2:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getTemplate2 = async (req, res) => {
  try {
    const template2 = await Template2.findById(req.params.id);
    if (!template2) return res.status(404).json({ msg: 'Template not found' });
    res.json(template2);
  } catch (err) {
    console.error('Error in getTemplate2:', err.message);
    res.status(500).send('Server error');
  }
};

exports.updateTemplate2 = async (req, res) => {
  try {
    // Folder path where files are uploaded
    const folderPath = 'uploads/';

    // Parse JSON data from request body
    const hero = req.body.hero ? JSON.parse(req.body.hero) : {};
    const about = req.body.about ? JSON.parse(req.body.about) : {};
    const experience = req.body.experience ? JSON.parse(req.body.experience) : [];
    const projects = req.body.projects ? JSON.parse(req.body.projects) : [];

    // Log parsed data for debugging
    console.log('Parsed data:', { hero, about, experience, projects });

    // Initialize the update object
    const updates = {};

    // Update image filenames if files are uploaded
    if (req.files && req.files.heroImg) {
      updates['hero.heroImg'] = folderPath + req.files.heroImg[0].filename;
    }
    if (req.files && req.files.aboutImg) {
      updates['about.aboutImg'] = folderPath + req.files.aboutImg[0].filename;
    }

    // Update other fields
    if (hero) {
      // Spread the hero fields into the update object
      Object.assign(updates, { 'hero.head': hero.head, 'hero.roles': hero.roles, 'hero.buttonText': hero.buttonText, 'hero.buttonLink': hero.buttonLink });
    }
    if (about) {
      // Spread the about fields into the update object
      Object.assign(updates, { 'about.aboutHead': about.aboutHead, 'about.aboutDesc': about.aboutDesc, 'about.aboutButtonText': about.aboutButtonText, 'about.aboutButtonLink': about.aboutButtonLink });
    }
    if (experience.length > 0) updates.experience = experience;
    if (projects.length > 0) updates.projects = projects;

    // Perform the update
    const template2 = await Template2.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true });
    if (!template2) return res.status(404).json({ msg: 'Template not found' });

    // Return the updated document
    res.json(template2);
  } catch (err) {
    console.error('Error in updateTemplate2:', err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteTemplate2 = async (req, res) => {
  try {
    const template2 = await Template2.findById(req.params.id);
    if (!template2) return res.status(404).json({ msg: 'Template not found' });
    await template2.remove();
    res.json({ msg: 'Template removed' });
  } catch (err) {
    console.error('Error in deleteTemplate2:', err.message);
    res.status(500).send('Server error');
  }
};
