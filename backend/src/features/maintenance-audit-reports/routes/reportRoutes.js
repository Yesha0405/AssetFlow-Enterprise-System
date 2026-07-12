const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// GET /api/reports/maintenance-requests
// Retrieve all maintenance requests
router.get('/maintenance-requests', reportController.getAllRequests);

// POST /api/reports/maintenance-requests
// Create a new maintenance request
router.post('/maintenance-requests', reportController.createRequest);

// PATCH /api/reports/maintenance-requests/:id/status
// Update a maintenance request status
router.patch('/maintenance-requests/:id/status', reportController.updateStatus);

module.exports = router;
