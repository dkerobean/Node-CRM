const mongoose = require('mongoose');

const monthlyDataSchema = new mongoose.Schema({
    month: { type: String, required: true },
    year: { type: Number, required: true },
    revenue: { type: Number, default: 0 },
    closedWon: { type: Number, default: 0 },
    closedLost: { type: Number, default: 0 },
    closedWonDate: { type: Date },
    closedLostDate: { type: Date }  
});

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
    },
    monthlyData: [monthlyDataSchema] // Array to hold monthly metrics
});

const Metrics = mongoose.model('Metrics', metricsSchema);
module.exports = Metrics;
