const jwt = require('jsonwebtoken'); // Ensure you have this package installed
const User = require('../models/userModel');


const auth = async (req, res, next) => {
    // Get the token from the request headers
    const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch the user from the database using the ID from the token
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'User not found, authorization denied.' });
        }

        // Attach the user object to the request
        req.user = user;

        next(); // Move to the next middleware or route handler
    } catch (error) {
        console.error('Token is not valid:', error);
        return res.status(401).json({ message: 'Token is not valid, authorization denied.' });
    }
};

module.exports = auth;
