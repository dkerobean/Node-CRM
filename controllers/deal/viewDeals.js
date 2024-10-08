const Deal = require("../../models/dealModel");

const getAllDeals = async (req, res) => {
    try {
        const deals = await Deal.find();
        return res.status(200).json({
            message: 'Deals retrieved successfully',
            deals
        });
    } catch (error) {
        console.error('Error viewing deals:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = { getAllDeals };
