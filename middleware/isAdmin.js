
// middleware/isAdmin.js

const User = require("../models/userModel");

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user || (user.role !== 'admin' && user.role !== 'manager')) {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        next(); // User is admin, proceed to the next middleware/controller
    } catch (error) {
        console.error('Error checking admin status:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = isAdmin;
