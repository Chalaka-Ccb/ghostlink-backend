const Link = require('../models/Link');
const crypto = require('crypto');

// Helper: Check if string is a URL
const isUrl = (string) => {
    try { return Boolean(new URL(string)); } 
    catch (e) { return false; }
};

// @desc    Create a new Ghost Link
// @route   POST /api/links/create
const createLink = async (req, res) => {
    try {
        const { originalContent, maxClicks, expiresAt, customSlug } = req.body;

        if (!originalContent) {
            return res.status(400).json({ error: 'Content is required' });
        }

        let shortId;

        // 1. Determine the Short ID (Custom or Random)
        if (customSlug) {
            const slug = customSlug.trim().replace(/\s+/g, '-');
            const existingLink = await Link.findOne({ shortId: slug });
            if (existingLink) {
                return res.status(400).json({ error: 'Custom name already taken' });
            }
            shortId = slug;
        } else {
            shortId = crypto.randomBytes(4).toString('hex');
        }

        // 2. Save to Database (CRITICAL: Save the User ID if logged in)
        const newLink = new Link({
            user: req.user ? req.user._id : null, // <--- This fixes the Dashboard!
            originalContent,
            shortId,
            maxClicks: maxClicks || 1,
            expiresAt: expiresAt || null
        });

        await newLink.save();

        res.status(201).json({
            success: true,
            shortUrl: `${process.env.BASE_URL || 'http://localhost:5000'}/${shortId}`,
            originalContent: newLink.originalContent
        });

    } catch (error) {
        console.error("Create Error:", error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// @desc    Get a link (Redirect or Show Secret)
// @route   GET /:shortId
const getLink = async (req, res) => {
    try {
        const { shortId } = req.params;
        
        // Find link by the Short ID
        const link = await Link.findOne({ shortId });

        // 1. Not Found Check
        if (!link) {
            return res.status(404).json({ error: 'Link not found or already burnt 🔥' });
        }

        // 2. Expiration Check (Time)
        if (link.expiresAt && new Date() > link.expiresAt) {
            await Link.deleteOne({ _id: link._id });
            return res.status(410).json({ error: 'Link has expired' });
        }

        // 3. Increment Clicks & Save
        link.clickCount++;
        await link.save();

        // 4. Ghost Logic (Delete if limit reached)
        const isGhost = link.clickCount >= link.maxClicks;
        if (isGhost) {
            await Link.deleteOne({ _id: link._id });
        }

        // 5. Response Logic
        if (isUrl(link.originalContent)) {
             return res.redirect(link.originalContent); // Redirect for URLs
        }

        res.json({
            success: true,
            originalContent: link.originalContent,
            isGhost: isGhost,
            message: 'Secret fetched'
        });

    } catch (error) {
        console.error("Get Error:", error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// @desc    Get User's Links (For Dashboard)
// @route   GET /api/links/my-links
const getMyLinks = async (req, res) => {
    try {
        // Ensure user is logged in
        if (!req.user) {
             return res.status(401).json({ error: 'Not authorized' });
        }
        
        const links = await Link.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(links);
    } catch (error) {
        console.error("Dashboard Error:", error);
        res.status(500).json({ error: 'Server Error' });
    }
};
const deleteLink = async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);

        if (!link) {
            return res.status(404).json({ error: 'Link not found' });
        }

        // Check ownership (Security)
        if (link.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: 'Not authorized' });
        }

        await link.deleteOne();
        res.json({ message: 'Link removed' });

    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};


module.exports = { createLink, getLink, getMyLinks, deleteLink };

