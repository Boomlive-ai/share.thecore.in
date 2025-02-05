const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const {  fetchLinks } = require("./src/api/dynamicLinks"); // Import the summarizeNews function

const PORT = process.env.PORT || 5000;
const corsOptions = {
    // origin: function (origin, callback) {
    //   if (!origin || allowedOrigins.some((allowedOrigin) => allowedOrigin instanceof RegExp ? allowedOrigin.test(origin) : allowedOrigin === origin)) {
    //     callback(null, true);
    //   } else {
    //     callback(new Error('Not allowed by CORS'));
    //   }
    // },
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], // Add any other headers if needed
  };

  // Use CORS with options and handle preflight requests
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Example API route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Express API!' });
});
// API to get User-Agent
app.get('/user-agent', (req, res) => {
    const userAgent = req.headers['user-agent'];
    res.json({ userAgent });
  });
  
app.get('/:id', fetchLinks);

// Catch-all route to serve the React app for unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
