const Deal = require("../../models/dealModel");
const Metrics = require("../../models/metricsModel"); // Import the Metrics model
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

        // Check if the assigned user exists
        if (assignedTo) {
            const assignedUser = await User.findById(assignedTo);
            if (!assignedUser) {
                return res.status(404).json({ message: 'Assigned user not found.' });
            }
        }

        // Check if the contact exists
        if (contact) {
            const contactExists = await Contact.findById(contact);
            if (!contactExists) {
                return res.status(404).json({ message: 'Contact not found.' });
            }
        }

        // Check if the organization exists
        if (organization) {
            const organizationExists = await Organization.findById(organization);
            if (!organizationExists) {
                return res.status(404).json({ message: 'Organization not found.' });
            }
        }

        // Fetch the existing deal to check the previous status
        const existingDeal = await Deal.findById(dealId);
        if (!existingDeal) {
            return res.status(404).json({ message: 'Deal not found.' });
        }

        // Update the closed dates based on the new status
        const updatedDealData = {
            name,
            description,
            value,
            status: status || existingDeal.status, // Keep previous status if not provided
            contact: contact || existingDeal.contact,
            assignedTo: assignedTo || existingDeal.assignedTo,
            closeDate,
            stage: stage || existingDeal.stage,
            notes,
            organization: organization || existingDeal.organization
        };

        // Set the closed dates if the status is changed
        if (status === 'Closed Won' && existingDeal.status !== 'Closed Won') {
            updatedDealData.closedWonDate = new Date(); // Set to current date if status is now closed won
            updatedDealData.closedLostDate = null; // Clear closed lost date if status is now closed won
        } else if (status === 'Closed Lost' && existingDeal.status !== 'Closed Lost') {
            updatedDealData.closedLostDate = new Date(); // Set to current date if status is now closed lost
            updatedDealData.closedWonDate = null; // Clear closed won date if status is now closed lost
        }

        // Update the deal
        const updatedDeal = await Deal.findByIdAndUpdate(dealId, updatedDealData, { new: true });

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
