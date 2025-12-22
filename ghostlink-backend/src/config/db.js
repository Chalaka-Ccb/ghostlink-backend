const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Attempt to connect to the database using the URI from our .env file
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        // Log success. conn.connection.host tells us exactly where we connected.
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // If connection fails, log the error and kill the process.
        // process.exit(1) means "exit with failure".
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;