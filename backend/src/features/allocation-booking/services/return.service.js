const allocationModel = require('../models/allocation.model');
const returnModel = require('../models/return.model');
const historyService = require('./history.service');

/**
 * Record an asset return and determine resulting asset status.
 */
async function returnAsset(returnData) {
    try {
        const {
            allocation_id,
            asset_id,
            employee_id,
            returned_to,
            asset_condition,
            inspection_notes
        } = returnData;

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

        const existingReturn = await returnModel.getAllReturns();
        const duplicate = existingReturn.find((record) => Number(record.allocation_id) === Number(allocation_id));

        if (duplicate) {
            return {
                success: false,
                message: 'Return already recorded for this allocation.'
            };
        }

        let nextAssetStatus = 'Available';
        let returnStatus = 'Completed';

        if (asset_condition === 'Minor Damage' || asset_condition === 'Major Damage') {
            nextAssetStatus = 'Maintenance';
            returnStatus = 'Completed';
        } else if (asset_condition === 'Lost') {
            nextAssetStatus = 'Lost';
            returnStatus = 'Completed';
        }

        const returnId = await returnModel.createReturn({
            allocation_id,
            asset_id,
            employee_id,
            returned_to,
            return_date: new Date(),
            asset_condition,
            inspection_notes: inspection_notes || null,
            return_status: returnStatus
        });

        const returnRecord = await returnModel.getReturnById(returnId);

        return {
            success: true,
            message: 'Asset return recorded successfully.',
            data: {
                ...returnRecord,
                next_asset_status: nextAssetStatus
            }
        };
    } catch (error) {
        throw error;
    }
}

/**
 * Get return record by ID.
 */
async function getReturn(returnId) {
    try {
        const returnRecord = await returnModel.getReturnById(returnId);

        if (!returnRecord) {
            return {
                success: false,
                message: 'Return record not found.'
            };
        }

        return {
            success: true,
            data: returnRecord
        };
    } catch (error) {
        throw error;
    }
}

/**
 * Get all return records.
 */
async function getAllReturns() {
    try {
        const returns = await returnModel.getAllReturns();

        return {
            success: true,
            data: returns
        };
    } catch (error) {
        throw error;
    }
}

/**
 * Get return records for an employee.
 */
async function getEmployeeReturns(employeeId) {
    try {
        const returns = await returnModel.getReturnsByEmployee(employeeId);

        return {
            success: true,
            data: returns
        };
    } catch (error) {
        throw error;
    }
}

/**
 * Update a return record.
 */
async function updateReturn(returnId, updateData) {
    try {
        const existingReturn = await returnModel.getReturnById(returnId);

        if (!existingReturn) {
            return {
                success: false,
                message: 'Return record not found.'
            };
        }

        const updated = await returnModel.updateReturn(returnId, updateData);

        if (!updated) {
            return {
                success: false,
                message: 'Return record could not be updated.'
            };
        }

        const returnRecord = await returnModel.getReturnById(returnId);

        return {
            success: true,
            message: 'Return record updated successfully.',
            data: returnRecord
        };
    } catch (error) {
        throw error;
    }
}

/**
 * Delete a return record.
 */
async function deleteReturn(returnId) {
    try {
        const deleted = await returnModel.deleteReturn(returnId);

        if (!deleted) {
            return {
                success: false,
                message: 'Return record not found or could not be deleted.'
            };
        }

        return {
            success: true,
            message: 'Return record deleted successfully.'
        };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    returnAsset,
    getReturn,
    getAllReturns,
    getEmployeeReturns,
    updateReturn,
    deleteReturn
};
