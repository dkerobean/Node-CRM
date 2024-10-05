const Contact = require("../../models/contactModel");
const User = require("../../models/userModel");

const addContact = async (req, res) => {
    try {
        const { name, email, phone, company, position, notes, status, leadDetails, assignedTo } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'Name, email, and phone are required fields.' });
        }

        // Check if assigned user exists
        if (assignedTo) {
            const userExists = await User.findById(assignedTo);
            if (!userExists) {
                return res.status(404).json({ message: 'Assigned user not found.' });
            }
        }

        // Create new contact
        const newContact = new Contact({
            name,
            email,
            phone,
            company,
            position,
            notes,
            status: status || 'prospect',
            leadDetails: status === 'lead' ? leadDetails : undefined, // Only include lead details if status is 'lead'
            assignedTo: assignedTo || null
        });

        const savedContact = await newContact.save();
        return res.status(201).json({
            message: 'Contact saved successfully',
            contact: savedContact
        });

    } catch (error) {
        console.error('Error adding contact:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};


module.exports = { addContact };