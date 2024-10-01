const Organization = require('../models/organizationModel');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register Organization and Owner with JWT

const registerOrganization = async (req, res) => {
    const { ownerName, email, password, orgName, country} = req.body;

    try {
        const orgExists = await Organization.findOne({ email});
        // check if org exists
        if (orgExists) {
            return res.status(400).json({ message: 'Organization already exists' });
        }

        // create hashed password for owner
        const hashedPassword = await bcrypt.hash(password, 10);

        // create org owner
        const owner = new User({
            name: ownerName,
            email,
            password: hashedPassword,
            role: 'owner',
        });

        await owner.save();

        // create the org

        const organization = new Organization({
            name: orgName,
            email,
            owner: owner._id,
        });

        await organization.save();

        // Generate JWT for the owner
        const token = jwt.sign({ userId: owner._id, organizationId: organization._id, role: owner.role}, process.env.JWT_SECRET,{
            expiresIn: '2h'
        });

        res.status(201).json({
            message: 'Registration success',
            organization,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id, organizationId: user.organization, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerOrganization, loginUser };