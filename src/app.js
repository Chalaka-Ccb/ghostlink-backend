const express = require('express');
const cors = require('cors');
const linkRoutes = require('./routes/linkRoutes');
const app = express();

// Middleware
app.use(cors()); // Allows your React frontend to talk to this backend
app.use(express.json()); // Allows us to parse JSON bodies (req.body)
app.use('/api/links', linkRoutes);
// Simple Health Check Route (To test if it works)
app.get('/', (req, res) => {
    res.json({ message: 'GhostLink Backend is Active 👻' });
});

module.exports = app;