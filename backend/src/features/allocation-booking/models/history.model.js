const pool = require('../../../config/db');

/**
 * Database access methods for asset history.
 */
const createHistoryEntry = async (historyData) => {
    const {
        asset_id,
        allocation_id,
        action,
        employee_id,
        performed_by,
        remarks
    } = historyData;

    const query = `
        INSERT INTO asset_history
        (asset_id, allocation_id, action, employee_id, performed_by, remarks, created_at)
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    try {
        const [result] = await pool.execute(query, [
            asset_id,
            allocation_id,
            action,
            employee_id,
            performed_by,
            remarks
        ]);

        return result.insertId;
    } catch (error) {
        throw new Error(`Error creating history entry: ${error.message}`);
    }
};

const getHistoryByAssetId = async (assetId) => {
    const query = `
        SELECT *
        FROM asset_history
        WHERE asset_id = ?
        ORDER BY created_at DESC
    `;

    try {
        const [rows] = await pool.execute(query, [assetId]);
        return rows;
    } catch (error) {
        throw new Error(`Error fetching asset history: ${error.message}`);
    }
};

module.exports = {
    createHistoryEntry,
    getHistoryByAssetId
};
