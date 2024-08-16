// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { changePassword, changeName } = require('../controllers/profileController');

// @route   PUT api/profile/password
// @desc    Change password
// @access  Private
router.put('/password', auth, changePassword);

// @route   PUT api/profile/name
// @desc    Change name
// @access  Private
router.put('/name', auth, changeName);

module.exports = router;
