const jwt = require('jsonwebtoken'); // Ensure you have this package installed

const auth = (req, res, next) => {
    // Get the token from the request headers
    const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is set in your environment variables
        req.user = decoded; // Save the decoded user data in the request object
        next(); // Move to the next middleware or route handler
    } catch (error) {
        console.error('Token is not valid:', error);
        return res.status(401).json({ message: 'Token is not valid, authorization denied.' });
    }
};

module.exports = auth;
