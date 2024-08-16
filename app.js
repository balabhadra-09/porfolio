// app.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const path = require("path")
const fs = require('fs');
const http = require('http');
const cors = require('cors'); // Importing CORS

dotenv.config();



// Connect Database
connectDB();

const app = express();

app.use(express.json());


// Enable CORS
app.use(cors()); // Using CORS middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));
app.use('/api/template1', require('./routes/template1Routes'));
app.use('/api/template2', require('./routes/template2Routes'));
app.use('/api/footer', require('./routes/footerRoutes'));

const PORT = process.env.PORT || 5000;

// HTTPS server
// const httpsOptions = {
//     key: fs.readFileSync('/etc/letsencrypt/live/app.leadssea.com/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/app.leadssea.com/fullchain.pem')
// };

http.createServer(app).listen(PORT, () => {
    console.log(`HTTP Server is running on port ${PORT}`);
});
