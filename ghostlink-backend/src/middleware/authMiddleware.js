const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    // 1. Check if the header has "Bearer <token>"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get the token from the header
            token = req.headers.authorization.split(' ')[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ghost_super_secret_key_123');

            // Add the User ID to the request object so controllers can use it
            req.user = { _id: decoded.id };

            next(); // Move to the next step (The Controller)
        } catch (error) {
            console.error(error);
            res.status(401).json({ error: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ error: 'Not authorized, no token' });
    }
};

module.exports = { protect };