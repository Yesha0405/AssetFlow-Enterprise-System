const returnService = require('../services/return.service');

/**
 * Create a new asset return record.
 */
const createReturn = async (req, res) => {
    try {
        const result = await returnService.returnAsset(req.body);

        return res
            .status(result.success ? 201 : 400)
            .json(result);
    } catch (error) {
        console.error('Create Return Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Get return record by ID.
 */
const getReturnById = async (req, res) => {
    try {
        const result = await returnService.getReturn(req.params.id);

        if (!result.success) {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Get Return Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Get all return records.
 */
const getAllReturns = async (req, res) => {
    try {
        const result = await returnService.getAllReturns();

        return res.status(200).json(result);
    } catch (error) {
        console.error('Get All Returns Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Get return records for an employee.
 */
const getEmployeeReturns = async (req, res) => {
    try {
        const result = await returnService.getEmployeeReturns(req.params.employeeId);

        return res.status(200).json(result);
    } catch (error) {
        console.error('Get Employee Returns Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Update a return record.
 */
const updateReturn = async (req, res) => {
    try {
        const result = await returnService.updateReturn(req.params.id, req.body);

        if (!result.success) {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Update Return Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Delete a return record.
 */
const deleteReturn = async (req, res) => {
    try {
        const result = await returnService.deleteReturn(req.params.id);

        if (!result.success) {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Delete Return Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

module.exports = {
    createReturn,
    getReturnById,
    getAllReturns,
    getEmployeeReturns,
    updateReturn,
    deleteReturn
};
