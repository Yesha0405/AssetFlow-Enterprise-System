/**
 * Validation middleware for transfer requests.
 */
const validateTransfer = (req, res, next) => {
    const {
        allocation_id,
        asset_id,
        current_employee_id,
        requested_employee_id,
        requested_by,
        reason
    } = req.body;

    const errors = [];

    const isPositiveInteger = (value) => {
        const number = Number(value);
        return Number.isInteger(number) && number > 0;
    };

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

    if (current_employee_id === undefined || current_employee_id === null) {
        errors.push({ field: 'current_employee_id', message: 'Current employee ID is required.' });
    } else if (!isPositiveInteger(current_employee_id)) {
        errors.push({ field: 'current_employee_id', message: 'Current employee ID must be a positive integer.' });
    }

    if (requested_employee_id === undefined || requested_employee_id === null) {
        errors.push({ field: 'requested_employee_id', message: 'Requested employee ID is required.' });
    } else if (!isPositiveInteger(requested_employee_id)) {
        errors.push({ field: 'requested_employee_id', message: 'Requested employee ID must be a positive integer.' });
    }

    if (requested_by === undefined || requested_by === null) {
        errors.push({ field: 'requested_by', message: 'Requested by is required.' });
    } else if (!isPositiveInteger(requested_by)) {
        errors.push({ field: 'requested_by', message: 'Requested by must be a positive integer.' });
    }

    if (reason === undefined || reason === null || String(reason).trim() === '') {
        errors.push({ field: 'reason', message: 'Reason is required.' });
    } else if (typeof reason !== 'string') {
        errors.push({ field: 'reason', message: 'Reason must be a string.' });
    }

    if (
        current_employee_id !== undefined &&
        requested_employee_id !== undefined &&
        Number(current_employee_id) === Number(requested_employee_id)
    ) {
        errors.push({ field: 'requested_employee_id', message: 'Cannot transfer to the same employee.' });
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

module.exports = { validateTransfer };
