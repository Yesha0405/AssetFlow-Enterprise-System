/**
 * Validation middleware for resource bookings.
 */
const validateBooking = (req, res, next) => {
    const {
        asset_id,
        employee_id,
        booked_by,
        booking_date,
        start_time,
        end_time,
        purpose
    } = req.body;

    const errors = [];

    const isPositiveInteger = (value) => {
        const number = Number(value);
        return Number.isInteger(number) && number > 0;
    };

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

    if (booked_by === undefined || booked_by === null) {
        errors.push({ field: 'booked_by', message: 'Booked by is required.' });
    } else if (!isPositiveInteger(booked_by)) {
        errors.push({ field: 'booked_by', message: 'Booked by must be a positive integer.' });
    }

    if (!booking_date) {
        errors.push({ field: 'booking_date', message: 'Booking date is required.' });
    }

    if (!start_time) {
        errors.push({ field: 'start_time', message: 'Start time is required.' });
    }

    if (!end_time) {
        errors.push({ field: 'end_time', message: 'End time is required.' });
    }

    if (start_time && end_time && end_time <= start_time) {
        errors.push({ field: 'end_time', message: 'End time must be greater than start time.' });
    }

    if (purpose === undefined || purpose === null || String(purpose).trim() === '') {
        errors.push({ field: 'purpose', message: 'Purpose is required.' });
    } else if (typeof purpose !== 'string') {
        errors.push({ field: 'purpose', message: 'Purpose must be a string.' });
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

module.exports = { validateBooking };
