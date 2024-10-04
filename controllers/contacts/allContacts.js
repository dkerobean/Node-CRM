const Contact = require("../../models/contactModel");


const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        return res.status(200).json({
            message: 'Contacts retrieved successfully',
            contacts
        });
    } catch (error) {
        console.error('Error retrieving contacts:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = { getAllContacts };