// controllers/settingsController.js
const Settings = require('../models/Settings');
const path = require("path") 


exports.updateSettings = async (req, res) => {
  try {
    

    const folderPath = 'uploads/';

    // Initialize variables for file paths
    let logoPath = '';
    let faviconPath = '';

    // Check if files are uploaded and construct their paths
    if (req.files) {
      if (req.files.logo) {
        logoPath = path.join(folderPath, req.files.logo[0].filename);
      }
      if (req.files.favicon) {
        faviconPath = path.join(folderPath, req.files.favicon[0].filename);
      }
    }

    // Parse other body fields
    const metaDescription = req.body.metaDescription ? req.body.metaDescription : '';
    const metaKeyword = req.body.metaKeyword ? req.body.metaKeyword : '';
    const title = req.body.title ? req.body.title : '';

    // Validate required fields
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    // Find or create settings
    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings({
        logo: logoPath,  
        favicon: faviconPath, 
        metaDescription,
        metaKeyword,
        title,
      });
    } else {
      settings.logo = logoPath || settings.logo; // Update if a new file path is provided
      settings.favicon = faviconPath || settings.favicon; // Update if a new file path is provided
      settings.metaDescription = metaDescription || settings.metaDescription;
      settings.metaKeyword = metaKeyword || settings.metaKeyword;
      settings.title = title || settings.title;
    }

    // Save settings
    await settings.save();
    res.json(settings);
  } catch (err) {
    console.error('Error updating settings:', err.message);
    res.status(500).send('Server error');
  }
};


exports.getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.json(settings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
