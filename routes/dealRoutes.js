const express = require('express');
const { addDeal } = require('../controllers/deal/createDeal');
const { getAllDeals } = require('../controllers/deal/viewDeals');

const router = express.Router();

// add Deal
router.post('/add', addDeal);

// view Deals
router.get('/view', getAllDeals);


module.exports = router;
