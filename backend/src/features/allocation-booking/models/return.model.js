const pool = require('../../../config/db');

/**
 * Database access methods for asset returns.
 */
const createReturn = async (returnData) => {
    const {
        allocation_id,
        asset_id,
        employee_id,
        returned_to,
        return_date,
        asset_condition,
        inspection_notes,
        return_status
    } = returnData;

    const query = `
        INSERT INTO asset_returns
        (allocation_id, asset_id, employee_id, returned_to, return_date, asset_condition, inspection_notes, return_status, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;

    try {
        const [result] = await pool.execute(query, [
            allocation_id,
            asset_id,
            employee_id,
            returned_to,
            return_date,
            asset_condition,
            inspection_notes,
            return_status
        ]);

        return result.insertId;
    } catch (error) {
        throw new Error(`Error creating return record: ${error.message}`);
    }
};

const getReturnById = async (returnId) => {
    const query = `SELECT * FROM asset_returns WHERE return_id = ?`;

    try {
        const [rows] = await pool.execute(query, [returnId]);
        return rows[0] || null;
    } catch (error) {
        throw new Error(`Error fetching return record: ${error.message}`);
    }
};

const getAllReturns = async () => {
    const query = `SELECT * FROM asset_returns ORDER BY return_date DESC`;

    try {
        const [rows] = await pool.execute(query);
        return rows;
    } catch (error) {
        throw new Error(`Error fetching return records: ${error.message}`);
    }
};

const getReturnsByEmployee = async (employeeId) => {
    const query = `SELECT * FROM asset_returns WHERE employee_id = ? ORDER BY return_date DESC`;

    try {
        const [rows] = await pool.execute(query, [employeeId]);
        return rows;
    } catch (error) {
        throw new Error(`Error fetching return records for employee: ${error.message}`);
    }
};

const updateReturn = async (returnId, updateData) => {
    const entries = Object.entries(updateData).filter(([, value]) => value !== undefined);

    if (entries.length === 0) {
        return false;
    }

    const setClause = entries.map(([key]) => `${key} = ?`).join(', ');
    const values = entries.map(([, value]) => value);
    const query = `UPDATE asset_returns SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE return_id = ?`;

    try {
        const [result] = await pool.execute(query, [...values, returnId]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(`Error updating return record: ${error.message}`);
    }
};

const deleteReturn = async (returnId) => {
    const query = `DELETE FROM asset_returns WHERE return_id = ?`;

    try {
        const [result] = await pool.execute(query, [returnId]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(`Error deleting return record: ${error.message}`);
    }
};

module.exports = {
    createReturn,
    getReturnById,
    getAllReturns,
    getReturnsByEmployee,
    updateReturn,
    deleteReturn
};
