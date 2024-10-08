const express = require('express');
const { addDeal } = require('../controllers/deal/createDeal');
const { getAllDeals } = require('../controllers/deal/viewDeals');
const { editDeal } = require('../controllers/deal/editDeal');

const router = express.Router();

// add Deal
router.post('/add', addDeal);

// view Deals
router.get('/view', getAllDeals);

// edit Deal
router.put('/edit/:dealId', editDeal);


module.exports = router;
