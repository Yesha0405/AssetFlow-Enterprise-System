// backend/src/features/allocation-booking/models/allocation.model.js
const pool = require('../../../config/db');

/**
 * Database access methods for Asset Allocations
 */

const createAllocation = async (allocationData) => {
    const {
        asset_id,
        employee_id,
        allocated_by,
        allocation_date,
        expected_return_date,
        allocation_status,
        remarks
    } = allocationData;

    const query = `
    INSERT INTO asset_allocations 
    (asset_id, employee_id, allocated_by, allocation_date, expected_return_date, allocation_status, remarks)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

    try {
        const [result] = await pool.execute(query, [
            asset_id, employee_id, allocated_by, allocation_date, expected_return_date, allocation_status, remarks
        ]);
        return result.insertId;
    } catch (error) {
        throw new Error(`Error creating allocation: ${error.message}`);
    }
};

const getAllocationById = async (allocationId) => {
    const query = `SELECT * FROM asset_allocations WHERE allocation_id = ?`;
    try {
        const [rows] = await pool.execute(query, [allocationId]);
        return rows[0] || null;
    } catch (error) {
        throw new Error(`Error fetching allocation: ${error.message}`);
    }
};

const getActiveAllocationByAssetId = async (assetId) => {
    const query = `
    SELECT * FROM asset_allocations 
    WHERE asset_id = ?
    AND allocation_status = 'Allocated'
    LIMIT 1
  `;
    try {
        const [rows] = await pool.execute(query, [assetId]);
        return rows[0] || null;
    } catch (error) {
        throw new Error(`Error fetching active allocation for asset: ${error.message}`);
    }
};

const getAllocations = async () => {
    const query = `SELECT * FROM asset_allocations ORDER BY created_at DESC`;
    try {
        const [rows] = await pool.execute(query);
        return rows;
    } catch (error) {
        throw new Error(`Error fetching allocations: ${error.message}`);
    }
};

const getAllocationsByEmployee = async (employeeId) => {
    const query = `SELECT * FROM asset_allocations WHERE employee_id = ? ORDER BY allocation_date DESC`;
    try {
        const [rows] = await pool.execute(query, [employeeId]);
        return rows;
    } catch (error) {
        throw new Error(`Error fetching allocations for employee: ${error.message}`);
    }
};

const updateAllocation = async (allocationId, updateData) => {
    const { expected_return_date, allocation_status, remarks } = updateData;
    const query = `
    UPDATE asset_allocations 
    SET expected_return_date = ?, allocation_status = ?, remarks = ?, updated_at = CURRENT_TIMESTAMP
    WHERE allocation_id = ?
  `;
    try {
        const [result] = await pool.execute(query, [expected_return_date, allocation_status, remarks, allocationId]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(`Error updating allocation: ${error.message}`);
    }
};

const markReturned = async (allocationId, actualReturnDate) => {
    const query = `
    UPDATE asset_allocations 
    SET actual_return_date = ?, allocation_status = 'Returned', updated_at = CURRENT_TIMESTAMP
    WHERE allocation_id = ?
  `;
    try {
        const [result] = await pool.execute(query, [actualReturnDate, allocationId]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(`Error marking allocation as returned: ${error.message}`);
    }
};

const deleteAllocation = async (allocationId) => {
    const query = `DELETE FROM asset_allocations WHERE allocation_id = ?`;
    try {
        const [result] = await pool.execute(query, [allocationId]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(`Error deleting allocation: ${error.message}`);
    }
};

module.exports = {
    createAllocation,
    getAllocationById,
    getActiveAllocationByAssetId,
    getAllocations,
    getAllocationsByEmployee,
    updateAllocation,
    markReturned,
    deleteAllocation
};