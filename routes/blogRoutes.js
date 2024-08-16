// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const upload = require("../middlewares/upload")
const {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
} = require('../controllers/blogController');

// @route   POST api/blogs
// @desc    Create a blog
// @access  Private
router.post('/', auth,upload.single("image"), createBlog);

// @route   GET api/blogs
// @desc    Get all blogs
// @access  Public
router.get('/', getAllBlogs);

// @route   GET api/blogs/:id
// @desc    Get blog by ID
// @access  Public
router.get('/:id', getBlogById);

// @route   PUT api/blogs/:id
// @desc    Update blog by ID
// @access  Private
router.put('/:id', auth, upload.single("image"),updateBlog);

// @route   DELETE api/blogs/:id
// @desc    Delete blog by ID
// @access  Private
router.delete('/:id', auth, deleteBlog);

module.exports = router;
