const express = require('express');
const cors = require('cors');
const linkRoutes = require('./routes/linkRoutes');
const { getLink } = require('./controllers/linkController');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Health Check
app.get('/', (req, res) => {
    res.json({ message: 'GhostLink Backend is Active 👻' });
});

// API Routes (For creating links)
app.use('/api/links', linkRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/links', linkRoutes);
app.get('/:shortId', getLink); 


module.exports = app;

