const express = require('express');
const { addDeal } = require('../controllers/deal/createDeal');
const { getAllDeals } = require('../controllers/deal/viewDeals');
const { editDeal } = require('../controllers/deal/editDeal');

upload = require('../middleware/uploadMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Deals
 *   description: API for managing deals
 */

/**
 * @swagger
 * /api/deals/add:
 *   post:
 *     summary: Add a new deal
 *     tags: [Deals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the deal
 *               description:
 *                 type: string
 *                 description: A detailed description of the deal
 *               value:
 *                 type: number
 *                 description: The value of the deal
 *               organization:
 *                 type: string
 *                 description: The ID of the organization the deal is associated with
 *             required:
 *               - title
 *               - value
 *     responses:
 *       201:
 *         description: Deal created successfully
 *       400:
 *         description: Bad request, validation error
 *       500:
 *         description: Internal server error
 */
router.post('/add', upload.array('files'), addDeal);

/**
 * @swagger
 * /api/deals/view:
 *   get:
 *     summary: View all deals
 *     tags: [Deals]
 *     responses:
 *       200:
 *         description: Successfully retrieved all deals
 *       500:
 *         description: Internal server error
 */
router.get('/view', getAllDeals);

/**
 * @swagger
 * /api/deals/edit/{dealId}:
 *   put:
 *     summary: Edit an existing deal
 *     tags: [Deals]
 *     parameters:
 *       - in: path
 *         name: dealId
 *         required: true
 *         description: The ID of the deal to edit
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the deal
 *               description:
 *                 type: string
 *                 description: A detailed description of the deal
 *               value:
 *                 type: number
 *                 description: The value of the deal
 *             required:
 *               - title
 *               - value
 *     responses:
 *       200:
 *         description: Deal edited successfully
 *       404:
 *         description: Deal not found
 *       400:
 *         description: Bad request, validation error
 *       500:
 *         description: Internal server error
 */
router.put('/edit/:dealId', editDeal);

module.exports = router;
