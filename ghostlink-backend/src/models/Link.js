const mongoose = require('mongoose');
const crypto = require('crypto');

// 1. Define the Schema
const LinkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Links this to the User collection
        required: false // It's false because "Guest" users can still create links
    },
    // -----------------
    originalContent: {
        type: String,
        required: true,
    },
    shortId: {
        type: String,
        required: true,
        unique: true,
        default: () => crypto.randomBytes(4).toString('hex') // Generates a random 8-char string (e.g., 'a1b2c3d4')
    },
    clickCount: {
        type: Number,
        default: 0
    },
    maxClicks: {
        type: Number,
        default: 1 // By default, it's a "Ghost" link (1 view only)
    },
    expiresAt: {
        type: Date,
        default: null // If null, it never expires by time (only by clicks)
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// 2. Compile the Schema into a Model
// This 'Link' object is what we will use to find(), save(), and delete() data.
module.exports = mongoose.model('Link', LinkSchema);