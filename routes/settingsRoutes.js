// routes/settingsRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const upload = require("../middlewares/upload")
const { updateSettings, getSettings } = require('../controllers/settingsController');

// @route   PUT api/settings
// @desc    Update settings
// @access  Private
router.put('/', auth, upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'favicon', maxCount: 1 }
  ]), updateSettings);

// @route   GET api/settings
// @desc    Get settings
// @access  Public
router.get('/', getSettings);

module.exports = router;
