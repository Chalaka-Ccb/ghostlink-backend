const express = require('express');
const cors = require('cors');
const linkRoutes = require('./routes/linkRoutes');
const { getLink } = require('./controllers/linkController'); // <--- 1. Import the controller directly

const app = express();

app.use(cors());
app.use(express.json());

// Health Check
app.get('/', (req, res) => {
    res.json({ message: 'GhostLink Backend is Active 👻' });
});

// API Routes (For creating links)
app.use('/api/links', linkRoutes);

// Redirection Route (For visiting links)
// This must be AFTER the other routes so it doesn't block them
app.get('/:shortId', getLink); // <--- 2. Add this line!


module.exports = app;

