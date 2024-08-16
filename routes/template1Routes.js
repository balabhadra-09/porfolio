// routes/template1Routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');
const {
  createTemplate1,
  getTemplate1,
  updateTemplate1,
  deleteTemplate1,
} = require('../controllers/template1Controller');

// @route   POST api/template1
// @desc    Create template1
// @access  Private
router.post('/', auth, upload.array('portfolioImages', 10), createTemplate1);

// @route   GET api/template1/:id
// @desc    Get template1 by ID
// @access  Public
router.get('/:id', getTemplate1);

// @route   PUT api/template1/:id
// @desc    Update template1 by ID
// @access  Private
router.put('/:id', auth, upload.array('portfolioImages', 10), updateTemplate1);

// @route   DELETE api/template1/:id
// @desc    Delete template1 by ID
// @access  Private
router.delete('/:id', auth, deleteTemplate1);

module.exports = router;
