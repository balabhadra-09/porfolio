// routes/template2Routes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');
const {
  createTemplate2,
  getTemplate2,
  updateTemplate2,
  deleteTemplate2,
} = require('../controllers/template2Controller');

// @route   POST api/template2
// @desc    Create template2
// @access  Private
router.post('/', auth, upload.fields([{ name: 'heroImg', maxCount: 1 }, { name: 'aboutImg', maxCount: 1 }]), createTemplate2);

// @route   GET api/template2/:id
// @desc    Get template2 by ID
// @access  Public
router.get('/:id', getTemplate2);

// @route   PUT api/template2/:id
// @desc    Update template2 by ID
// @access  Private
router.put('/:id', auth, upload.fields([{ name: 'heroImg', maxCount: 1 }, { name: 'aboutImg', maxCount: 1 }]), updateTemplate2);

// @route   DELETE api/template2/:id
// @desc    Delete template2 by ID
// @access  Private
router.delete('/:id', auth, deleteTemplate2);

module.exports = router;
