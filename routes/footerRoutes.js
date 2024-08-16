// routes/footerRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { updateFooter, getFooter } = require('../controllers/footerController');

// @route   PUT api/footer
// @desc    Update footer
// @access  Private
router.put('/', auth, updateFooter);

// @route   GET api/footer
// @desc    Get footer
// @access  Public
router.get('/', getFooter);

module.exports = router;
