const Link = require('../models/Link');

// @desc    Create a new Ghost Link
// @route   POST /api/links
const createLink = async (req, res) => {
    try {
        const { originalContent, maxClicks, expiresAt } = req.body;

        
        if (!originalContent) {
            return res.status(400).json({ error: 'Content is required' });
        }

        // Create the new link in memory
        const newLink = new Link({
            originalContent,
            maxClicks: maxClicks || 1, // Default to 1 if not sent
            expiresAt: expiresAt || null 
        });

        // Save to Database (This is the async part)
        await newLink.save();

        // Respond to the user
        res.status(201).json({
            success: true,
            shortUrl: `${process.env.BASE_URL}/${newLink.shortId}`,
            originalContent: newLink.originalContent,
            expires: newLink.expiresAt || 'Never (by time)'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};
const getLink = async (req, res) => {
    try {
        const { shortId } = req.params;

        // 1. Find the link
        const link = await Link.findOne({ shortId });

        // 2. If not found, return 404
        if (!link) {
            return res.status(404).json({ error: 'Link not found' });
        }

        // 3. Check Time Expiration
        if (link.expiresAt && new Date() > link.expiresAt) {
            await Link.deleteOne({ _id: link._id }); // Clean up dead link
            return res.status(410).json({ error: 'Link has expired' });
        }

        // 4. Check Click Limit (The "Ghost" Logic)
        // We increment first, then check.
        link.clickCount++;
        await link.save();

        // If we reached the limit, destroy the link from the DB
        if (link.clickCount >= link.maxClicks) {
            await Link.deleteOne({ _id: link._id });
        }

        // 5. Respond with the content
        res.json({
            success: true,
            originalContent: link.originalContent,
            message: link.clickCount >= link.maxClicks ? 'Link has been destroyed (Ghost Mode)' : 'Link active'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};


module.exports = { createLink, getLink };
