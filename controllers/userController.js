const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserWithToken = async (req, res) => {
    try {
        // get token from headers
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // verify token and decode user id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;


        // find user by id
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // pass user data

        res.status(200).json(user);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUsers, getUserWithToken };