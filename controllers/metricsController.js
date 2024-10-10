const Metrics = require('../models/metricsModel');
const Contact = require('../models/contactModel');
const Deal = require('../models/dealModel');
const Task = require('../models/taskModel');

// Function to update metrics for the entire CRM
exports.updateMetrics = async (req, res) => {
    try {
        // Compute metrics for all contacts
        const totalLeads = await Contact.countDocuments({ status: 'lead' });
        const totalClients = await Contact.countDocuments({ status: 'client' });
        const totalProspects = await Contact.countDocuments({ status: 'prospect' });

        // Compute deal-related metrics
        const closedWonCount = await Deal.countDocuments({ status: 'Closed Won' });
        const totalClosedDeals = await Deal.countDocuments({
            status: { $in: ['Closed Won', 'Closed Lost'] }
        });
        const winRate = totalClosedDeals > 0 ? (closedWonCount / totalClosedDeals) * 100 : 0;

        // Calculate total revenue and average deal value from closed won deals
        const deals = await Deal.find({ status: 'Closed Won' });
        const totalRevenue = deals.reduce((sum, deal) => sum + deal.value, 0);
        const avgDealValue = deals.length > 0 ? totalRevenue / deals.length : 0;

        // Compute task completion metrics
        const totalTasks = await Task.countDocuments();
        const completedTasks = await Task.countDocuments({ status: 'Completed' });
        const taskCompletionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

        // Update or create global metrics
        const metrics = await Metrics.findOneAndUpdate(
            { scope: 'global' }, // Assuming 'scope' indicates that these are global metrics
            {
                totalLeads,
                totalClients,
                totalProspects,
                dealsStatusDistribution: {
                    prospect: await Deal.countDocuments({ status: 'Prospect' }),
                    negotiation: await Deal.countDocuments({ status: 'Negotiation' }),
                    closedWon: closedWonCount,
                    closedLost: await Deal.countDocuments({ status: 'Closed Lost' }),
                },
                totalRevenue,
                avgDealValue,
                winRate,
                taskCompletionRate,
                updatedAt: Date.now()
            },
            { new: true, upsert: true } // Create a new record if one doesn't exist
        );

        res.status(200).json(metrics);
    } catch (error) {
        console.error('Error updating metrics:', error);
        res.status(500).json({ error: 'Failed to update metrics' });
    }
};

// Function to get global metrics
exports.getMetrics = async (req, res) => {
    try {
        const metrics = await Metrics.findOne({ scope: 'global' });

        if (!metrics) {
            return res.status(404).json({ error: 'Metrics not found' });
        }

        res.status(200).json(metrics);
    } catch (error) {
        console.error('Error fetching metrics:', error);
        res.status(500).json({ error: 'Failed to fetch metrics' });
    }
};