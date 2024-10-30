const Metrics = require('../models/metricsModel');
const Contact = require('../models/contactModel');
const Deal = require('../models/dealModel');
const Task = require('../models/taskModel');
const User = require('../models/userModel');

// Function to update metrics for the entire CRM
exports.updateMetrics = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Get the organization of the user
        const user = await User.findById(userId).populate('organization');
        const organizationId = user.organization;

        if (!organizationId) {
            return res.status(404).json({ error: 'Organization not found for user' });
        }

        // Compute metrics for contacts belonging to the user's organization
        const totalLeads = await Contact.countDocuments({ status: 'lead', organization: organizationId });
        const totalClients = await Contact.countDocuments({ status: 'client', organization: organizationId });
        const totalProspects = await Contact.countDocuments({ status: 'prospect', organization: organizationId });

        // Compute deal-related metrics
        const closedWonCount = await Deal.countDocuments({ status: 'Closed Won', organization: organizationId });
        const closedLostCount = await Deal.countDocuments({ status: 'Closed Lost', organization: organizationId });
        const totalClosedDeals = closedWonCount + closedLostCount;
        const winRate = totalClosedDeals > 0 ? (closedWonCount / totalClosedDeals) * 100 : 0;

        console.log(`Closed Won Count: ${closedWonCount}, Closed Lost Count: ${closedLostCount}`);

        // Calculate total revenue and average deal value from closed won deals
        const deals = await Deal.find({ status: 'Closed Won', organization: organizationId });
        const totalRevenue = deals.reduce((sum, deal) => sum + deal.value, 0);
        const avgDealValue = deals.length > 0 ? totalRevenue / deals.length : 0;

        console.log(`Total Revenue: ${totalRevenue}, Avg Deal Value: ${avgDealValue}`);

        // Compute task completion metrics
        const totalTasks = await Task.countDocuments({ organization: organizationId });
        const completedTasks = await Task.countDocuments({ status: 'Completed', organization: organizationId });
        const taskCompletionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

        console.log(`Total Tasks: ${totalTasks}, Completed Tasks: ${completedTasks}, Task Completion Rate: ${taskCompletionRate}`);

        // Update or create metrics for the organization
        const metrics = await Metrics.findOneAndUpdate(
            { organizationId },
            {
                totalLeads,
                totalClients,
                totalProspects,
                dealsStatusDistribution: {
                    prospect: await Deal.countDocuments({ status: 'Prospect', organization: organizationId }),
                    negotiation: await Deal.countDocuments({ status: 'Negotiation', organization: organizationId }),
                    closedWon: closedWonCount,
                    closedLost: closedLostCount,
                },
                totalRevenue,
                avgDealValue,
                winRate,
                totalTasks,
                completedTasks,
                taskCompletionRate,
                updatedAt: Date.now()
            },
            { new: true, upsert: true }
        );

        console.log(`Metrics Updated: ${metrics}`);

        res.status(200).json(metrics);
    } catch (error) {
        console.error('Error updating metrics:', error);
        res.status(500).json({ error: 'Failed to update metrics' });
    }
};


exports.getMetrics = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Get the user's organization
        const user = await User.findById(userId).populate('organization');
        const organizationId = user.organization;
        console.log(organizationId);

        const metrics = await Metrics.findOne({ organizationId });

        if (!metrics) {
            return res.status(404).json({ error: 'Metrics not found' });
        }

        res.status(200).json(metrics);
    } catch (error) {
        console.error('Error fetching metrics:', error);
        res.status(500).json({ error: 'Failed to fetch metrics' });
    }
};

exports.getMonthlyData = async (req, res) => {
    try {
        // Current year to filter data
        const currentYear = new Date().getFullYear();

        // Aggregate closed won data
        const closedWonData = await Deal.aggregate([
            {
                $match: {
                    closedWonDate: { $gte: new Date(`${currentYear}-01-01`), $lt: new Date(`${currentYear + 1}-01-01`) }
                }
            },
            {
                $group: {
                    _id: { $month: "$closedWonDate" }, // Group by month
                    totalWon: { $sum: 1 }, // Count of deals won
                    totalRevenue: { $sum: "$value" } // Sum of deal values
                }
            },
            {
                $project: {
                    month: "$_id",
                    totalWon: 1,
                    totalRevenue: 1,
                    _id: 0 // Exclude the default _id field
                }
            },
            {
                $sort: { month: 1 } // Sort by month
            }
        ]);

        // Aggregate closed lost data
        const closedLostData = await Deal.aggregate([
            {
                $match: {
                    closedLostDate: { $gte: new Date(`${currentYear}-01-01`), $lt: new Date(`${currentYear + 1}-01-01`) }
                }
            },
            {
                $group: {
                    _id: { $month: "$closedLostDate" }, // Group by month
                    totalLost: { $sum: 1 } // Count of deals lost
                }
            },
            {
                $project: {
                    month: "$_id",
                    totalLost: 1,
                    _id: 0 // Exclude the default _id field
                }
            },
            {
                $sort: { month: 1 } // Sort by month
            }
        ]);

        return res.status(200).json({
            message: 'Monthly data retrieved successfully',
            closedWonData,
            closedLostData,
        });
    } catch (error) {
        console.error('Error retrieving monthly data:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

