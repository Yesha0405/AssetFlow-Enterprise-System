const allocationModel = require('../models/allocation.model');
const transferModel = require('../models/transfer.model');
const historyService = require('./history.service');

/**
 * Create a new transfer request for an asset.
 */
async function createTransfer(transferData) {
    try {
        const {
            allocation_id,
            asset_id,
            current_employee_id,
            requested_employee_id,
            requested_by,
            reason
        } = transferData;

        const allocation = await allocationModel.getAllocationById(allocation_id);

        if (!allocation) {
            return {
                success: false,
                message: 'Allocation record not found.'
            };
        }

        if (Number(allocation.asset_id) !== Number(asset_id)) {
            return {
                success: false,
                message: 'Allocation does not match the provided asset.'
            };
        }

        if (allocation.allocation_status !== 'Allocated') {
            return {
                success: false,
                message: 'Asset is not currently allocated.'
            };
        }

        if (Number(current_employee_id) === Number(requested_employee_id)) {
            return {
                success: false,
                message: 'Cannot transfer to the same employee.'
            };
        }

        if (!reason || String(reason).trim() === '') {
            return {
                success: false,
                message: 'Reason is mandatory.'
            };
        }

        const transferId = await transferModel.createTransfer({
            allocation_id,
            asset_id,
            current_employee_id,
            requested_employee_id,
            requested_by,
            request_reason: reason
        });

        const transfer = await transferModel.getTransferById(transferId);

        return {
            success: true,
            message: 'Transfer request created successfully.',
            data: transfer
        };
    } catch (error) {
        throw error;
    }
}

/**
 * Get transfer request by ID.
 */
async function getTransferById(transferId) {
    try {
        const transfer = await transferModel.getTransferById(transferId);

        if (!transfer) {
            return {
                success: false,
                message: 'Transfer request not found.'
            };
        }

        return {
            success: true,
            data: transfer
        };
    } catch (error) {
        throw error;
    }
}

/**
 * Get all transfer requests.
 */
async function getAllTransfers() {
    try {
        const transfers = await transferModel.getAllTransfers();

        return {
            success: true,
            data: transfers
        };
    } catch (error) {
        throw error;
    }
}

/**
 * Get transfer requests for a specific employee.
 */
async function getTransfersByEmployee(employeeId) {
    try {
        const transfers = await transferModel.getTransfersByEmployee(employeeId);

        return {
            success: true,
            data: transfers
        };
    } catch (error) {
        throw error;
    }
}

/**
 * Update transfer request details.
 */
async function updateTransfer(transferId, updateData) {
    try {
        const updated = await transferModel.updateTransfer(transferId, updateData);

        if (!updated) {
            return {
                success: false,
                message: 'Transfer request not found or could not be updated.'
            };
        }

        const transfer = await transferModel.getTransferById(transferId);

        return {
            success: true,
            message: 'Transfer request updated successfully.',
            data: transfer
        };
    } catch (error) {
        throw error;
    }
}

/**
 * Approve a transfer request.
 */
async function approveTransfer(transferId, approvalType = 'manager') {
    try {
        const transfer = await transferModel.getTransferById(transferId);

        if (!transfer) {
            return {
                success: false,
                message: 'Transfer request not found.'
            };
        }

        if (transfer.request_status === 'Rejected' || transfer.request_status === 'Completed') {
            return {
                success: false,
                message: 'Transfer request is no longer pending approval.'
            };
        }

        const updated = await transferModel.approveTransfer(transferId, approvalType);

        if (!updated) {
            return {
                success: false,
                message: 'Transfer request could not be approved.'
            };
        }

        const refreshedTransfer = await transferModel.getTransferById(transferId);

        if (refreshedTransfer.manager_approval === 'Approved' && refreshedTransfer.department_approval === 'Approved') {
            await transferModel.updateTransfer(transferId, {
                request_status: 'Approved',
                approved_at: new Date()
            });

            const approvedTransfer = await transferModel.getTransferById(transferId);

            return {
                success: true,
                message: 'Transfer request approved successfully.',
                data: approvedTransfer
            };
        }

        return {
            success: true,
            message: `${approvalType === 'department' ? 'Department' : 'Manager'} approval recorded successfully.`,
            data: refreshedTransfer
        };
    } catch (error) {
        throw error;
    }
}

/**
 * Reject a transfer request.
 */
async function rejectTransfer(transferId, approvalType = 'manager') {
    try {
        const transfer = await transferModel.getTransferById(transferId);

        if (!transfer) {
            return {
                success: false,
                message: 'Transfer request not found.'
            };
        }

        if (transfer.request_status === 'Completed') {
            return {
                success: false,
                message: 'Completed transfer requests cannot be rejected.'
            };
        }

        const rejected = await transferModel.rejectTransfer(transferId, approvalType);

        if (!rejected) {
            return {
                success: false,
                message: 'Transfer request could not be rejected.'
            };
        }

        const updatedTransfer = await transferModel.getTransferById(transferId);

        return {
            success: true,
            message: 'Transfer request rejected successfully.',
            data: updatedTransfer
        };
    } catch (error) {
        throw error;
    }
}

/**
 * Complete an approved transfer request.
 */
async function completeTransfer(transferId) {
    try {
        const transfer = await transferModel.getTransferById(transferId);

        if (!transfer) {
            return {
                success: false,
                message: 'Transfer request not found.'
            };
        }

        if (transfer.request_status !== 'Approved') {
            return {
                success: false,
                message: 'Transfer can only be completed after both approvals are granted.'
            };
        }

        const completed = await transferModel.completeTransfer(transferId);

        if (!completed) {
            return {
                success: false,
                message: 'Transfer request could not be completed.'
            };
        }

        const updatedTransfer = await transferModel.getTransferById(transferId);

        await historyService.createHistoryEntry({
            asset_id: transfer.asset_id,
            allocation_id: transfer.allocation_id,
            action: 'Transferred',
            employee_id: transfer.requested_employee_id,
            performed_by: transfer.requested_by,
            remarks: 'Asset transferred.'
        });

        return {
            success: true,
            message: 'Transfer request completed successfully.',
            data: updatedTransfer
        };
    } catch (error) {
        throw error;
    }
}

/**
 * Delete a transfer request.
 */
async function deleteTransfer(transferId) {
    try {
        const deleted = await transferModel.deleteTransfer(transferId);

        if (!deleted) {
            return {
                success: false,
                message: 'Transfer request not found or could not be deleted.'
            };
        }

        return {
            success: true,
            message: 'Transfer request deleted successfully.'
        };
    } catch (error) {
        throw error;
    }
}

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
