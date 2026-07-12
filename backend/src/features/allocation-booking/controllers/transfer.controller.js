const transferService = require('../services/transfer.service');

/**
 * Create a new transfer request.
 */
const createTransfer = async (req, res) => {
    try {
        const result = await transferService.createTransfer(req.body);

        return res
            .status(result.success ? 201 : 400)
            .json(result);
    } catch (error) {
        console.error('Create Transfer Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Get transfer request by ID.
 */
const getTransferById = async (req, res) => {
    try {
        const result = await transferService.getTransferById(req.params.id);

        if (!result.success) {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Get Transfer Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Get all transfer requests.
 */
const getAllTransfers = async (req, res) => {
    try {
        const result = await transferService.getAllTransfers();

        return res.status(200).json(result);
    } catch (error) {
        console.error('Get All Transfers Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Get transfer requests for a specific employee.
 */
const getTransfersByEmployee = async (req, res) => {
    try {
        const result = await transferService.getTransfersByEmployee(req.params.employeeId);

        return res.status(200).json(result);
    } catch (error) {
        console.error('Get Employee Transfers Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Update a transfer request.
 */
const updateTransfer = async (req, res) => {
    try {
        const result = await transferService.updateTransfer(req.params.id, req.body);

        if (!result.success) {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Update Transfer Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Approve a transfer request.
 */
const approveTransfer = async (req, res) => {
    try {
        const approvalType = req.body.approvalType || 'manager';
        const result = await transferService.approveTransfer(req.params.id, approvalType);

        if (!result.success) {
            return res.status(result.message.includes('not found') ? 404 : 400).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Approve Transfer Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Reject a transfer request.
 */
const rejectTransfer = async (req, res) => {
    try {
        const approvalType = req.body.approvalType || 'manager';
        const result = await transferService.rejectTransfer(req.params.id, approvalType);

        if (!result.success) {
            return res.status(result.message.includes('not found') ? 404 : 400).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Reject Transfer Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Complete an approved transfer request.
 */
const completeTransfer = async (req, res) => {
    try {
        const result = await transferService.completeTransfer(req.params.id);

        if (!result.success) {
            return res.status(result.message.includes('not found') ? 404 : 400).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Complete Transfer Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Delete a transfer request.
 */
const deleteTransfer = async (req, res) => {
    try {
        const result = await transferService.deleteTransfer(req.params.id);

        if (!result.success) {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Delete Transfer Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
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
