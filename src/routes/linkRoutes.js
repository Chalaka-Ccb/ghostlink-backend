const express = require('express');
const router = express.Router();
const { createLink } = require('../controllers/linkController');

// Define the route
router.post('/create', createLink);
router.get('/:shortId', getLink);

module.exports = router;