const Deal = require("../../models/dealModel");
const User = require("../../models/userModel");
const Contact = require("../../models/contactModel");
const Organization = require("../../models/organizationModel");


const addDeal = async (req, res) => {
    try {
        const {
            name,
            description,
            value,
            status,
            contact,
            assignedTo,
            closeDate,
            stage,
            notes,
            organization,
        } = req.body;
        const createdBy = req.user._id;

        // Check if the assigned user exists
        const assignedUser = await User.findById(assignedTo);
        if (!assignedUser) {
            return res.status(404).json({ message: 'Assigned user not found' });
        }

        // Check if the contact exists
        const contactExists = await Contact.findById(contact);
        if (!contactExists) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        // Check if the organization exists
        const organizationExists = await Organization.findById(organization);
        if (!organizationExists) {
            return res.status(404).json({ message: 'Organization not found' });
        }

        // Prepare files for saving
        const files = req.files ? req.files.map(file => ({
            fileName: file.originalname,
            filePath: file.path,
            uploadedAt: Date.now()
        })) : []; // Default to an empty array if req.files is undefined

        // Create a new deal
        const newDeal = new Deal({
            name,
            description,
            value,
            status: status || 'Prospect', // Default status if not provided
            contact,
            assignedTo,
            closeDate,
            stage: stage || 'Initial Contact', // Default stage if not provided
            createdBy,
            notes,
            organization,
            files
        });

        // Save the deal to the database
        await newDeal.save();

        return res.status(201).json({
            message: 'Deal added successfully',
            deal: newDeal
        });
    } catch (error) {
        console.error('Error adding deal:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};


module.exports = { addDeal };