const historyModel = require('../models/history.model');

/**
 * Create a reusable history entry for asset lifecycle actions.
 */
async function createHistoryEntry(historyData) {
    try {
        if (!historyData || !historyData.action) {
            return {
                success: false,
                message: 'History action is required.'
            };
        }

        const historyId = await historyModel.createHistoryEntry(historyData);

        return {
            success: true,
            message: 'History entry created successfully.',
            data: { history_id: historyId }
        };
    } catch (error) {
        throw error;
    }
}

/**
 * Get asset history timeline.
 */
async function getAssetHistory(assetId) {
    try {
        const history = await historyModel.getHistoryByAssetId(assetId);

        return {
            success: true,
            data: history
        };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createHistoryEntry,
    getAssetHistory
};
