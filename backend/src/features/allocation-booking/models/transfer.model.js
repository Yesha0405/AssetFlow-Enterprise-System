const pool = require('../../../config/db');

/**
 * Database access methods for transfer requests.
 */
const createTransfer = async (transferData) => {
    const {
        allocation_id,
        asset_id,
        current_employee_id,
        requested_employee_id,
        requested_by,
        request_reason
    } = transferData;

    const query = `
        INSERT INTO transfer_requests
        (
            allocation_id,
            asset_id,
            current_employee_id,
            requested_employee_id,
            requested_by,
            request_reason,
            manager_approval,
            department_approval,
            request_status,
            created_at,
            updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, 'Pending', 'Pending', 'Requested', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;

    try {
        const [result] = await pool.execute(query, [
            allocation_id,
            asset_id,
            current_employee_id,
            requested_employee_id,
            requested_by,
            request_reason
        ]);

        return result.insertId;
    } catch (error) {
        throw new Error(`Error creating transfer request: ${error.message}`);
    }
};

const getTransferById = async (transferId) => {
    const query = `SELECT * FROM transfer_requests WHERE transfer_id = ?`;

    try {
        const [rows] = await pool.execute(query, [transferId]);
        return rows[0] || null;
    } catch (error) {
        throw new Error(`Error fetching transfer request: ${error.message}`);
    }
};

const getAllTransfers = async () => {
    const query = `SELECT * FROM transfer_requests ORDER BY created_at DESC`;

    try {
        const [rows] = await pool.execute(query);
        return rows;
    } catch (error) {
        throw new Error(`Error fetching transfer requests: ${error.message}`);
    }
};

const getTransfersByEmployee = async (employeeId) => {
    const query = `
        SELECT *
        FROM transfer_requests
        WHERE current_employee_id = ?
           OR requested_employee_id = ?
           OR requested_by = ?
        ORDER BY created_at DESC
    `;

    try {
        const [rows] = await pool.execute(query, [employeeId, employeeId, employeeId]);
        return rows;
    } catch (error) {
        throw new Error(`Error fetching transfer requests for employee: ${error.message}`);
    }
};

const updateTransfer = async (transferId, updateData) => {
    const entries = Object.entries(updateData).filter(([, value]) => value !== undefined);

    if (entries.length === 0) {
        return false;
    }

    const setClause = entries.map(([key]) => `${key} = ?`).join(', ');
    const values = entries.map(([, value]) => value);
    const query = `UPDATE transfer_requests SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE transfer_id = ?`;

    try {
        const [result] = await pool.execute(query, [...values, transferId]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(`Error updating transfer request: ${error.message}`);
    }
};

const approveTransfer = async (transferId, approvalType = 'manager') => {
    const approvalField = approvalType === 'department' ? 'department_approval' : 'manager_approval';
    const query = `
        UPDATE transfer_requests
        SET ${approvalField} = 'Approved', updated_at = CURRENT_TIMESTAMP
        WHERE transfer_id = ?
    `;

    try {
        const [result] = await pool.execute(query, [transferId]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(`Error approving transfer request: ${error.message}`);
    }
};

const rejectTransfer = async (transferId, approvalType = 'manager') => {
    const approvalField = approvalType === 'department' ? 'department_approval' : 'manager_approval';
    const query = `
        UPDATE transfer_requests
        SET ${approvalField} = 'Rejected', request_status = 'Rejected', updated_at = CURRENT_TIMESTAMP
        WHERE transfer_id = ?
    `;

    try {
        const [result] = await pool.execute(query, [transferId]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(`Error rejecting transfer request: ${error.message}`);
    }
};

const completeTransfer = async (transferId) => {
    const query = `
        UPDATE transfer_requests
        SET request_status = 'Completed', completed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
        WHERE transfer_id = ?
    `;

    try {
        const [result] = await pool.execute(query, [transferId]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(`Error completing transfer request: ${error.message}`);
    }
};

const deleteTransfer = async (transferId) => {
    const query = `DELETE FROM transfer_requests WHERE transfer_id = ?`;

    try {
        const [result] = await pool.execute(query, [transferId]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(`Error deleting transfer request: ${error.message}`);
    }
};

module.exports = {
    createTransfer,
    getTransferById,
    getAllTransfers,
    getTransfersByEmployee,
    updateTransfer,
    approveTransfer,
    rejectTransfer,
    completeTransfer,
    deleteTransfer
};
