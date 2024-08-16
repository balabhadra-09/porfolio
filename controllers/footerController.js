// controllers/footerController.js
const Footer = require('../models/Footer');

exports.updateFooter = async (req, res) => {
  const { linkedin, twitter, mail, instagram, facebook } = req.body;

  try {
    let footer = await Footer.findOne();
    if (!footer) {
      footer = new Footer({ linkedin, twitter, mail, instagram, facebook });
    } else {
      footer.linkedin = linkedin;
      footer.twitter = twitter;
      footer.mail = mail;
      footer.instagram = instagram;
      footer.facebook = facebook;
    }

    await footer.save();
    res.json(footer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();
    res.json(footer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
