const Deal = require("../../models/dealModel");
const User = require("../../models/userModel");
const Contact = require("../../models/contactModel");
const Organization = require("../../models/organizationModel");

const editDeal = async (req, res) => {
    try {
        const { dealId } = req.params; // Get the deal ID from the request parameters
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
            organization
        } = req.body;

        // Validate required fields
        if (!name || !description || value === undefined || !stage) {
            return res.status(400).json({ message: 'Name, description, value, and stage are required fields.' });
        }

        // Check if the assigned user exists, if it's being updated
        if (assignedTo) {
            const assignedUser = await User.findById(assignedTo);
            if (!assignedUser) {
                return res.status(404).json({ message: 'Assigned user not found.' });
            }
        }

        // Check if the contact exists, if it's being updated
        if (contact) {
            const contactExists = await Contact.findById(contact);
            if (!contactExists) {
                return res.status(404).json({ message: 'Contact not found.' });
            }
        }

        // Check if the organization exists, if it's being updated
        if (organization) {
            const organizationExists = await Organization.findById(organization);
            if (!organizationExists) {
                return res.status(404).json({ message: 'Organization not found.' });
            }
        }

        // Update the deal
        const updatedDeal = await Deal.findByIdAndUpdate(
            dealId,
            {
                name,
                description,
                value,
                status: status || 'Prospect', // Default to 'Prospect' if not provided
                contact: contact || null, // Set to null if no contact is provided
                assignedTo: assignedTo || null, // Set to null if no assigned user is provided
                closeDate,
                stage: stage || 'Initial Contact', // Default to 'Initial Contact' if not provided
                notes,
                organization: organization || null // Set to null if no organization is provided
            },
            { new: true } // Return the updated deal
        );

        if (!updatedDeal) {
            return res.status(404).json({ message: 'Deal not found.' });
        }

        return res.status(200).json({
            message: 'Deal updated successfully',
            deal: updatedDeal
        });

    } catch (error) {
        console.error('Error editing deal:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = { editDeal };
