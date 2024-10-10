const mongoose = require('mongoose');

const metricsSchema = new mongoose.Schema({
    totalLeads: Number,
    totalClients: Number,
    totalProspects: Number,
    dealsStatusDistribution: {
        prospect: Number,
        negotiation: Number,
        closedWon: Number,
        closedLost: Number,
    },
    totalRevenue: Number,
    avgDealValue: Number,
    winRate: Number,
    conversionRate: Number,
    totalTasks: Number,
    completedTasks: Number,
    pendingTasks: Number,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Metrics = mongoose.model('Metrics', metricsSchema);
module.exports = Metrics;