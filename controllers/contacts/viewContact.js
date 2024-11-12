const Contact = require("../../models/contactModel");

// Get a single contact by ID
const getContactById = async (req, res) => {
    const { id } = req.params; // Get the contact ID from the request parameters
    try {
        const contact = await Contact.findById(id); // Find the contact by its ID
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' }); // Handle case where contact is not found
        }
        return res.status(200).json({
            message: 'Contact retrieved successfully',
            contact
        });
    } catch (error) {
        console.error('Error retrieving contact:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = { getContactById };
