const historyService = require('../services/history.service');

/**
 * Get complete asset history timeline.
 */
const getAssetHistory = async (req, res) => {
    try {
        const result = await historyService.getAssetHistory(req.params.assetId);

        return res.status(200).json(result);
    } catch (error) {
        console.error('Get Asset History Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

module.exports = {
    getAssetHistory
};
