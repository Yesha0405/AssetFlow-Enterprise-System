/**
 * backend/src/features/allocation-booking/validators/allocation.validator.js
 */

const validateAllocation = (req, res, next) => {
    const { asset_id, employee_id, allocated_by, expected_return_date, remarks } = req.body;
    const errors = [];

    // Helper to validate positive integer
    const isPositiveInteger = (value) => {
        const number = Number(value);
        return Number.isInteger(number) && number > 0;
    };

    // Validation: asset_id
    if (asset_id === undefined || asset_id === null) {
        errors.push({ field: "asset_id", message: "Asset ID is required." });
    } else if (!isPositiveInteger(asset_id)) {
        errors.push({ field: "asset_id", message: "Asset ID must be a positive integer." });
    }

    // Validation: employee_id
    if (employee_id === undefined || employee_id === null) {
        errors.push({ field: "employee_id", message: "Employee ID is required." });
    } else if (!isPositiveInteger(employee_id)) {
        errors.push({ field: "employee_id", message: "Employee ID must be a positive integer." });
    }

    // Validation: allocated_by
    if (allocated_by === undefined || allocated_by === null) {
        errors.push({ field: "allocated_by", message: "Allocated by is required." });
    } else if (!isPositiveInteger(allocated_by)) {
        errors.push({ field: "allocated_by", message: "Allocated by must be a positive integer." });
    }

    // Validation: expected_return_date
    const returnDate = new Date(expected_return_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!expected_return_date) {
        errors.push({ field: "expected_return_date", message: "Expected return date is required." });
    } else if (isNaN(returnDate.getTime())) {
        errors.push({ field: "expected_return_date", message: "Expected return date must be a valid date." });
    } else if (returnDate < today) {
        errors.push({ field: "expected_return_date", message: "Expected return date cannot be before today." });
    }

    // Validation: remarks (optional, max 1000 chars)
    if (
        remarks !== undefined &&
        typeof remarks !== "string"
    ) {
        errors.push({
            field: "remarks",
            message: "Remarks must be a string."
        });
    }

    // Handle errors
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors
        });
    }

    next();
};

module.exports = { validateAllocation };