const bookingService = require('../services/booking.service');

/**
 * Create a new booking.
 */
const createBooking = async (req, res) => {
    try {
        const result = await bookingService.createBooking(req.body);

        const statusCode = result.success ? 201 : (result.message.includes('already booked') ? 409 : 400);

        return res.status(statusCode).json(result);
    } catch (error) {
        console.error('Create Booking Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Get booking by ID.
 */
const getBookingById = async (req, res) => {
    try {
        const result = await bookingService.getBooking(req.params.id);

        if (!result.success) {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Get Booking Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Get all bookings.
 */
const getAllBookings = async (req, res) => {
    try {
        const result = await bookingService.getAllBookings();

        return res.status(200).json(result);
    } catch (error) {
        console.error('Get All Bookings Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Get bookings for a specific employee.
 */
const getEmployeeBookings = async (req, res) => {
    try {
        const result = await bookingService.getEmployeeBookings(req.params.employeeId);

        return res.status(200).json(result);
    } catch (error) {
        console.error('Get Employee Bookings Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Update a booking.
 */
const updateBooking = async (req, res) => {
    try {
        const result = await bookingService.updateBooking(req.params.id, req.body);

        if (!result.success) {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Update Booking Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Cancel a booking.
 */
const cancelBooking = async (req, res) => {
    try {
        const result = await bookingService.cancelBooking(req.params.id);

        if (!result.success) {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Cancel Booking Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Delete a booking.
 */
const deleteBooking = async (req, res) => {
    try {
        const result = await bookingService.deleteBooking(req.params.id);

        if (!result.success) {
            return res.status(404).json(result);
        }

        return res.status(200).json(result);
    } catch (error) {
        console.error('Delete Booking Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

/**
 * Get booking reminders.
 */
const getReminders = async (req, res) => {
    try {
        const result = await bookingService.getReminders();

        return res.status(200).json(result);
    } catch (error) {
        console.error('Get Booking Reminders Error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

module.exports = {
    createBooking,
    getBookingById,
    getAllBookings,
    getEmployeeBookings,
    updateBooking,
    cancelBooking,
    deleteBooking,
    getReminders
};
