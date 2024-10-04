const Contact = require("../../models/contactModel");
const User = require("../../models/userModel");

const addContact = async (req, res) => {
    try {
        const { name, email, phone, company, position, notes, status, assignedTo } = req.query

        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'Name, email, and phone are required fields.' });
        }

        // Check is user asigned to exist
        if (assignedTo) {
            const userExists = await User.findById(assignedTo);
            if (!userExists) {
                return res.status(404).json({ message: 'Assigned user not found.' });
            }
        }

        // create new contact instance
        const newContact = new Contact({
            name,
            email,
            phone,
            company,
            position,
            notes,
            status: status || 'prospect',
            assignedTo: assignedTo || null
        });

        // save contact to db

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