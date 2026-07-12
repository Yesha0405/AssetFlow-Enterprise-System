/**
 * backend/src/features/allocation-booking/services/allocation.service.js
 *
 * Business Logic Layer
 * -----------------------------------------
 * Handles all business rules related to:
 * - Asset Allocation
 * - Asset Return
 * - Employee Allocation History
 *
 * NOTE:
 * This service ONLY manages allocation business logic.
 * Integration with Asset Management (Member 2) and
 * Employee Management (Member 1) will be completed
 * during final project integration.
 */

const allocationModel = require("../models/allocation.model");
const historyService = require("./history.service");

/**
 * Allocate an asset to an employee
 */
async function allocateAsset(allocationData) {
    try {
        const {
            asset_id,
            employee_id,
            allocated_by,
            expected_return_date,
            remarks
        } = allocationData;

        // ----------------------------------------------------
        // TODO:
        // Verify asset exists using Member 2 Asset API
        // ----------------------------------------------------

        // ----------------------------------------------------
        // TODO:
        // Verify employee exists using Member 1 Employee API
        // ----------------------------------------------------

        // Check if asset already has an active allocation
        const activeAllocation =
            await allocationModel.getActiveAllocationByAssetId(asset_id);

        if (activeAllocation) {
            return {
                success: false,
                message: "Asset is already allocated."
            };
        }

        // Create allocation
        const allocationId =
            await allocationModel.createAllocation({
                asset_id,
                employee_id,
                allocated_by,
                allocation_date: new Date(),
                expected_return_date,
                allocation_status: "Allocated",
                remarks
            });

        // ----------------------------------------------------
        // TODO:
        // Update Asset Status to "Allocated"
        // Integrate with Member 2 Asset Module
        // ----------------------------------------------------

        await historyService.createHistoryEntry({
            asset_id,
            allocation_id: allocationId,
            action: "Allocated",
            employee_id,
            performed_by: allocated_by,
            remarks: remarks || "Asset allocated."
        });

        return {
            success: true,
            message: "Asset allocated successfully.",
            data: {
                allocation_id: allocationId
            }
        };

    } catch (error) {
        throw error;
    }
}

/**
 * Get Allocation by ID
 */
async function getAllocation(allocationId) {
    try {

        const allocation =
            await allocationModel.getAllocationById(allocationId);

        if (!allocation) {
            return {
                success: false,
                message: "Allocation record not found."
            };
        }

        return {
            success: true,
            data: allocation
        };

    } catch (error) {
        throw error;
    }
}

/**
 * Get all allocations
 */
async function getAllAllocations() {
    try {

        const allocations =
            await allocationModel.getAllocations();

        return {
            success: true,
            data: allocations
        };

    } catch (error) {
        throw error;
    }
}

/**
 * Get all allocations of a specific employee
 */
async function getEmployeeAllocations(employeeId) {
    try {

        const allocations =
            await allocationModel.getAllocationsByEmployee(employeeId);

        return {
            success: true,
            data: allocations
        };

    } catch (error) {
        throw error;
    }
}

/**
 * Update allocation details
 */
async function updateAllocation(allocationId, updateData) {
    try {

        const updated =
            await allocationModel.updateAllocation(
                allocationId,
                updateData
            );

        if (!updated) {
            return {
                success: false,
                message: "Failed to update allocation."
            };
        }

        const allocation =
            await allocationModel.getAllocationById(allocationId);

        return {
            success: true,
            message: "Allocation updated successfully.",
            data: allocation
        };

    } catch (error) {
        throw error;
    }
}

/**
 * Return an allocated asset
 */
async function returnAsset(allocationId) {

    try {

        const allocation =
            await allocationModel.getAllocationById(allocationId);

        if (!allocation) {
            return {
                success: false,
                message: "Allocation not found."
            };
        }

        if (allocation.allocation_status === "Returned") {
            return {
                success: false,
                message: "Asset has already been returned."
            };
        }

        // Mark asset as returned
        await allocationModel.markReturned(
            allocationId,
            new Date()
        );

        await historyService.createHistoryEntry({
            asset_id: allocation.asset_id,
            allocation_id: allocationId,
            action: "Returned",
            employee_id: allocation.employee_id,
            performed_by: allocation.allocated_by,
            remarks: "Asset returned."
        });

        // ----------------------------------------------------
        // TODO:
        // Update Asset Status to "Available"
        // Integrate with Member 2 Asset Module
        // ----------------------------------------------------

        return {
            success: true,
            message: "Asset returned successfully."
        };

    } catch (error) {
        throw error;
    }
}

/**
 * Delete allocation record
 */
async function deleteAllocation(allocationId) {

    try {

        const deleted =
            await allocationModel.deleteAllocation(allocationId);

        if (!deleted) {
            return {
                success: false,
                message:
                    "Allocation record not found or could not be deleted."
            };
        }

        return {
            success: true,
            message: "Allocation record deleted successfully."
        };

    } catch (error) {
        throw error;
    }
}

module.exports = {
    allocateAsset,
    getAllocation,
    getAllAllocations,
    getEmployeeAllocations,
    updateAllocation,
    returnAsset,
    deleteAllocation
};