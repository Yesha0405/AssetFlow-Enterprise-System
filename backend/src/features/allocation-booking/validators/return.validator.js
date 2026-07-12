/**
 * Validation middleware for asset returns.
 */
const validateReturn = (req, res, next) => {
    const {
        allocation_id,
        asset_id,
        employee_id,
        returned_to,
        asset_condition,
        inspection_notes
    } = req.body;

    const errors = [];

    const isPositiveInteger = (value) => {
        const number = Number(value);
        return Number.isInteger(number) && number > 0;
    };

    const allowedConditions = ['Good', 'Minor Damage', 'Major Damage', 'Lost'];

    if (allocation_id === undefined || allocation_id === null) {
        errors.push({ field: 'allocation_id', message: 'Allocation ID is required.' });
    } else if (!isPositiveInteger(allocation_id)) {
        errors.push({ field: 'allocation_id', message: 'Allocation ID must be a positive integer.' });
    }

    if (asset_id === undefined || asset_id === null) {
        errors.push({ field: 'asset_id', message: 'Asset ID is required.' });
    } else if (!isPositiveInteger(asset_id)) {
        errors.push({ field: 'asset_id', message: 'Asset ID must be a positive integer.' });
    }

    if (employee_id === undefined || employee_id === null) {
        errors.push({ field: 'employee_id', message: 'Employee ID is required.' });
    } else if (!isPositiveInteger(employee_id)) {
        errors.push({ field: 'employee_id', message: 'Employee ID must be a positive integer.' });
    }

    if (returned_to === undefined || returned_to === null) {
        errors.push({ field: 'returned_to', message: 'Returned to is required.' });
    } else if (!isPositiveInteger(returned_to)) {
        errors.push({ field: 'returned_to', message: 'Returned to must be a positive integer.' });
    }

    if (!asset_condition) {
        errors.push({ field: 'asset_condition', message: 'Asset condition is required.' });
    } else if (!allowedConditions.includes(asset_condition)) {
        errors.push({ field: 'asset_condition', message: 'Asset condition must be one of: Good, Minor Damage, Major Damage, Lost.' });
    }

    if (inspection_notes !== undefined && inspection_notes !== null && typeof inspection_notes !== 'string') {
        errors.push({ field: 'inspection_notes', message: 'Inspection notes must be a string.' });
    }

    if (inspection_notes && inspection_notes.length > 1000) {
        errors.push({ field: 'inspection_notes', message: 'Inspection notes cannot exceed 1000 characters.' });
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }

    next();
};

module.exports = { validateReturn };
