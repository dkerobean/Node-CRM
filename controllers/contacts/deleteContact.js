const Contact = require("../../models/contactModel");

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Only admins can delete contacts.' });
        }

        // find contact b id and delete
        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found.' });
        }

        return res.status(200).json({
            message: 'Contact deleted successfully',
            contact: deletedContact
        });
    } catch (error) {
        console.error('Error deleting contact:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = { deleteContact };