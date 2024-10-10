const express= require('express');
const router = express.Router();
const metricsController = require('.././controllers/metricsController');

// Route to update global metrics (could be triggered manually or by a cron job)
router.put('/update/:userId', metricsController.updateMetrics);

// Route to get global metrics
router.get('/all/:userId', metricsController.getMetrics);

module.exports = router;