// controllers/blogController.js
const Blog = require('../models/Blog');
const path = require('path');


exports.createBlog = async (req, res) => {
  try {
    // Ensure the folder path is correct
    const folderPath = 'uploads/';
    let imagePath = '';

    // Check if image is uploaded and construct its path
    if (req.file) {
      imagePath = path.join(folderPath, req.file.filename);
    }

    // Parse fields from the request body
    const title = req.body.title || '';
    const richtext = req.body.richtext || '';
    const description = req.body.description || '';
    let date = req.body.date || '';

    // Validate and parse the date field
    if (date) {
      date = new Date(date);
      if (isNaN(date.getTime())) {
        return res.status(400).json({ error: 'Invalid date format' });
      }
    } else {
      return res.status(400).json({ error: 'Date is required' });
    }

    // Validate other required fields
    if (!title || !description || !richtext) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new blog entry
    const newBlog = new Blog({
      title,
      image: imagePath,
      richtext,
      description,
      date
    });

    // Save the new blog entry to the database
    const blog = await newBlog.save();
    res.json(blog);
  } catch (err) {
    console.error('Error creating blog:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    console.error('Error fetching blogs:', err.message);
    res.status(500).send('Server error');
  }
};


exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    console.error('Error fetching blog:', err.message);
    res.status(500).send('Server error');
  }
};


exports.updateBlog = async (req, res) => {
  try {
   
    const title = req.body.title || '';
    const richtext = req.body.richtext || '';
    const description = req.body.description || '';
    let date = req.body.date || '';

    // Find the blog entry by ID
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Validate required fields
    if (!title || !richtext || !description) {
      return res.status(400).json({ error: 'All fields (title, richtext, description) are required' });
    }

    // Define the folder path for images
    const folderPath = 'uploads/blog/'
    let imagePath = blog.image;

    // Check if a new image is uploaded and construct its path
    if (req.file) {
      imagePath = path.join(folderPath, req.file.filename);
    }

    // Validate and parse the date field
    if (date) {
      date = new Date(date);
      if (isNaN(date.getTime())) {
        return res.status(400).json({ error: 'Invalid date format' });
      }
    } else {
      date = blog.date; // Retain existing date if not updated
    }

    // Update the blog fields
    blog.title = title;
    blog.richtext = richtext;
    blog.description = description;
    blog.date = date;
    blog.image = imagePath;

   

    // Save the updated blog entry to the database
    blog = await blog.save();
    
    res.json(blog);
  } catch (err) {
    console.error('Error updating blog:', err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    await blog.remove();
    res.json({ message: 'Blog removed' });
  } catch (err) {
    console.error('Error deleting blog:', err.message);
    res.status(500).send('Server error');
  }
};
