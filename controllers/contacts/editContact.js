const Contact = require("../../models/contactModel");
const User = require("../../models/userModel");

const editContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, company, position, notes, status, assignedTo } = req.body;

        // Validate required fields
        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'Name, email, and phone are required fields.' });
        }

        // Check if assigned user exists (if provided)
        if (assignedTo) {
            const userExists = await User.findById(assignedTo);
            if (!userExists) {
                return res.status(404).json({ message: 'Assigned user not found.' });
            }
        }

        const updatedContact = await Contact.findByIdAndUpdate(
            id, {
                    name,
                    email,
                    phone,
                    company,
                    position,
                    notes,
                    status: status || 'prospect',
                    assignedTo: assignedTo || null
            },
            { new: true } // Return the updated contact
        );

        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found.' });
        }

        return res.status(200).json({
            message: 'Contact updated successfully',
            contact: updatedContact
        });

    } catch (error) {
        console.error('Error editing contact:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = { editContact }; 