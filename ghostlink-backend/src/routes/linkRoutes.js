const express = require('express');
const router = express.Router();
const { createLink, getLink, getMyLinks, deleteLink } = require('../controllers/linkController');
const { protect } = require('../middleware/authMiddleware');


router.post('/create', async (req, res, next) => {
    // Custom logic: If header exists, run protect. If not, proceed as guest.
    if (req.headers.authorization) {
        return protect(req, res, next);
    }
    next();
}, createLink);


// 2. Get My Links (PROTECTED: You MUST be logged in)
router.get('/my-links', protect, getMyLinks);


// 3. Get Public Link (Open to everyone)
router.get('/:shortId', getLink);

router.delete('/:id', protect, deleteLink);

module.exports = router;