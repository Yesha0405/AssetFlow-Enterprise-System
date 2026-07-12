const express = require('express');
const router = express.Router();

const historyController = require('../controllers/history.controller');

/**
 * @route   GET /history/:assetId
 * @desc    Get asset lifecycle history timeline
 * @access  Private
 */
router.get('/:assetId', historyController.getAssetHistory);

module.exports = router;
