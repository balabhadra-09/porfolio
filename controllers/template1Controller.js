// controllers/template1Controller.js
const Template1 = require('../models/Template1');
const path = require('path');


 
exports.createTemplate1 = async (req, res) => {
  try {

    const folderPath = 'uploads/';


    // Parse JSON fields
    const hero = JSON.parse(req.body.hero || '{}');
    const about = JSON.parse(req.body.about || '{}');
    const services = JSON.parse(req.body.services || '{}');
    const experience = JSON.parse(req.body.experience || '[]');
    const education = JSON.parse(req.body.education || '[]');
    const blogs = JSON.parse(req.body.blogs || '[]');
    const portfolio = JSON.parse(req.body.portfolio || '{}');
     
    
    // Validate portfolio and projects array
    if (!portfolio || !portfolio.projects || !Array.isArray(portfolio.projects)) {
      return res.status(400).json({ error: 'Missing portfolio data or invalid projects array' });
    }

    const portfolioImgs = [];
    for (let i = 0; i < portfolio.projects.length; i++) {
      const fieldName = `portfolioImages_${i}`;
      if (req.files && req.files[fieldName]) {
        portfolioImgs[i] = folderPath + req.files[fieldName][0].filename;
      } else {
        portfolioImgs[i] = ''; // Or a default value
      }
    }

    // Map uploaded files to portfolio projects
    const portfolioProjects = portfolio.projects.map((project, index) => ({
      img: portfolioImgs[index] || '', // Map the image path to the project
      projectName: project.projectName || '',
      projectLink: project.projectLink || ''
    }));

    const portfolioData = {
      portfolioHead: portfolio.portfolioHead || '',
      projects: portfolioProjects
    };
 
    // Create new Template1 document
    const newTemplate1 = new Template1({
      hero,
      about,
      services,
      portfolio: portfolioData,
      experience,
      education,
      blogs,
    });

    // Save the new Template1 document
    const template1 = await newTemplate1.save();
    res.status(201).json(template1); // Send success response with created document
  } catch (err) {
    console.error('Error in createTemplate1:', err.message);
    res.status(500).send('Server error'); // Send server error response
  }
};




exports.getTemplate1 = async (req, res) => {
  try {
    const template1 = await Template1.findById(req.params.id);
    if (!template1) return res.status(404).json({ msg: 'Template not found' });
    res.json(template1);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

 

 

 

exports.updateTemplate1 = async (req, res) => {
  try {
    const folderPath = 'uploads/'; // Define the folder path for storing images

    // Parse JSON fields
    const hero = JSON.parse(req.body.hero || '{}');
    const about = JSON.parse(req.body.about || '{}');
    const services = JSON.parse(req.body.services || '{}');
    const experience = JSON.parse(req.body.experience || '[]');
    const education = JSON.parse(req.body.education || '[]');
    const blogs = JSON.parse(req.body.blogs || '[]');
    const portfolio = JSON.parse(req.body.portfolio || '{}');

    // Validate portfolio and projects array
    if (!portfolio || !portfolio.projects || !Array.isArray(portfolio.projects)) {
      return res.status(400).json({ error: 'Missing portfolio data or invalid projects array' });
    }

    // Retrieve files uploaded with the key 'portfolioImages

    const uploadedFiles = req.files;
    const portfolioProjects = portfolio.projects.map((project) => {
          const returnPath = () =>{
            const removedItem = uploadedFiles.shift();
            return  removedItem.path ;
          }
          return {
            img: typeof project.img === 'string' ? project.img : returnPath() ,
            projectName: project.projectName || '',
            projectLink: project.projectLink || ''
          };
        });

    const portfolioData = {
      portfolioHead: portfolio.portfolioHead || '',
      projects: portfolioProjects
    };

    // Find and update Template1 document
    let template1 = await Template1.findById(req.params.id);
    if (!template1) return res.status(404).json({ msg: 'Template not found' });

    template1.hero = hero;
    template1.about = about;
    template1.services = services;
    template1.portfolio = portfolioData;
    template1.experience = experience;
    template1.education = education;
    template1.blogs = blogs;

    // Save the updated document
    await template1.save();
    console.log('Updated Template1:', template1);
    res.json(template1);
  } catch (err) {
    console.error('Error updating template:', err.message);
    res.status(500).send('Server error');
  }
};



exports.deleteTemplate1 = async (req, res) => {
  try {
    const template1 = await Template1.findByIdAndDelete(req.params.id);
    if (!template1) return res.status(404).json({ msg: 'Template not found' });
    res.json({ msg: 'Template removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


 