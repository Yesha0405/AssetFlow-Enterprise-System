/**
 * backend/src/features/allocation-booking/controllers/allocation.controller.js
 *
 * Controller Layer
 * ---------------------------------------------------
 * Handles HTTP Requests & Responses
 * Delegates business logic to the Service Layer
 */

const allocationService = require("../services/allocation.service");

/**
 * Create a new asset allocation
 */
const createAllocation = async (req, res) => {
    try {
        const result = await allocationService.allocateAsset(req.body);

        return res
            .status(result.success ? 201 : 400)
            .json(result);

    } catch (error) {
        console.error("Create Allocation Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

/**
 * Get allocation by ID
 */
const getAllocationById = async (req, res) => {
    try {
        const result = await allocationService.getAllocation(req.params.id);

        if (!result.success) {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);

    } catch (error) {
        console.error("Get Allocation Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

/**
 * Get all allocations
 */
const getAllAllocations = async (req, res) => {
    try {
        const result = await allocationService.getAllAllocations();

        return res.status(200).json(result);

    } catch (error) {
        console.error("Get All Allocations Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

/**
 * Get allocations for a specific employee
 */
const getEmployeeAllocations = async (req, res) => {
    try {
        const result = await allocationService.getEmployeeAllocations(
            req.params.employeeId
        );

        return res.status(200).json(result);

    } catch (error) {
        console.error("Get Employee Allocations Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

/**
 * Update an allocation
 */
const updateAllocation = async (req, res) => {
    try {
        const result = await allocationService.updateAllocation(
            req.params.id,
            req.body
        );

        if (!result.success) {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);

    } catch (error) {
        console.error("Update Allocation Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

/**
 * Return an allocated asset
 */
const returnAsset = async (req, res) => {
    try {
        const result = await allocationService.returnAsset(req.params.id);

        if (!result.success) {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);

    } catch (error) {
        console.error("Return Asset Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

/**
 * Delete an allocation
 */
const deleteAllocation = async (req, res) => {
    try {
        const result = await allocationService.deleteAllocation(req.params.id);

        if (!result.success) {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);

    } catch (error) {
        console.error("Delete Allocation Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    createAllocation,
    getAllocationById,
    getAllAllocations,
    getEmployeeAllocations,
    updateAllocation,
    returnAsset,
    deleteAllocation
};