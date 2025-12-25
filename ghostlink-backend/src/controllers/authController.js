const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Secret key for signing tokens (In real apps, put this in .env!)
const JWT_SECRET = process.env.JWT_SECRET || 'ghost_super_secret_key_123';

// @desc    Register a new user
const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Check if user exists
        const exists = await User.findOne({ username });
        if (exists) return res.status(400).json({ error: 'Username taken' });

        // 2. Hash the password (Encrypt it)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create User
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc    Login user & get Token
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Find User
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        // 2. Check Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        // 3. Generate Token (This is their "ID Card" for the session)
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, username: user.username });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { registerUser, loginUser };