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
// Helper to check if string is a URL
const isUrl = (string) => {
    try { return Boolean(new URL(string)); } 
    catch (e) { return false; }
};

// @desc    Get a link (Smart Handle: Redirect or JSON)
const getLink = async (req, res) => {
    try {
        const { shortId } = req.params;
        const link = await Link.findOne({ shortId });

        // 1. Check if Link Exists
        if (!link) {
            return res.status(404).json({ error: 'Link not found or already burnt 🔥' });
        }

        // 2. Check Expiration (Time)
        if (link.expiresAt && new Date() > link.expiresAt) {
            await Link.deleteOne({ _id: link._id });
            return res.status(410).json({ error: 'Link has expired' });
        }

        // 3. Increment Clicks
        link.clickCount++;
        await link.save();

        // 4. Ghost Logic: If limit reached, delete AFTER this response
        const isGhost = link.clickCount >= link.maxClicks;
        if (isGhost) {
            await Link.deleteOne({ _id: link._id });
        }

        // 5. SMART RESPONSE LOGIC
        // If it's a URL, REDIRECT the user
        if (isUrl(link.originalContent)) {
             return res.redirect(link.originalContent);
        }

        // If it's Text/Password, send JSON (Frontend will display it)
        res.json({
            success: true,
            originalContent: link.originalContent,
            isGhost: isGhost,
            message: 'Secret fetched successfully'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};


module.exports = { createLink, getLink };
