const bookingModel = require('../models/booking.model');
const historyService = require('./history.service');

const getBookingStatus = (booking, currentTime = new Date()) => {
    const startDateTime = new Date(`${booking.booking_date}T${booking.start_time}`);
    const endDateTime = new Date(`${booking.booking_date}T${booking.end_time}`);

    if (currentTime < startDateTime) {
        return 'Upcoming';
    }

    if (currentTime >= startDateTime && currentTime < endDateTime) {
        return 'Ongoing';
    }

    return 'Completed';
};

const syncBookingStatus = async (booking) => {
    if (!booking || booking.booking_status === 'Cancelled') {
        return booking;
    }

    const latestStatus = getBookingStatus(booking);

    if (latestStatus !== booking.booking_status) {
        await bookingModel.updateBookingStatus(booking.booking_id, latestStatus);
        booking.booking_status = latestStatus;
    }

    return booking;
};

const syncBookingsStatus = async (bookings) => {
    const refreshedBookings = [];

    for (const booking of bookings || []) {
        refreshedBookings.push(await syncBookingStatus(booking));
    }

    return refreshedBookings;
};

/**
 * Create a new resource booking.
 */
async function createBooking(bookingData) {
    try {
        const {
            asset_id,
            employee_id,
            booked_by,
            booking_date,
            start_time,
            end_time,
            purpose
        } = bookingData;

        const conflicts = await bookingModel.checkBookingConflict(
            asset_id,
            booking_date,
            start_time,
            end_time
        );

        if (conflicts.length > 0) {
            return {
                success: false,
                message: 'Resource is already booked during the selected time slot.'
            };
        }

        const bookingStatus = getBookingStatus({ booking_date, start_time, end_time });

        const bookingId = await bookingModel.createBooking({
            asset_id,
            employee_id,
            booked_by,
            booking_date,
            start_time,
            end_time,
            purpose,
            booking_status: bookingStatus
        });

        const booking = await bookingModel.getBookingById(bookingId);
        await syncBookingStatus(booking);
        await historyService.createHistoryEntry({
            asset_id,
            allocation_id: null,
            action: 'Booked',
            employee_id,
            performed_by: booked_by,
            remarks: purpose
        });

        return {
            success: true,
            message: 'Booking created successfully.',
            data: booking
        };
    } catch (error) {
        throw error;
    }
}

/**
 * Get booking by ID.
 */
async function getBooking(bookingId) {
    try {
        const booking = await bookingModel.getBookingById(bookingId);

        if (!booking) {
            return {
                success: false,
                message: 'Booking not found.'
            };
        }

        const refreshedBooking = await syncBookingStatus(booking);

        return {
            success: true,
            data: refreshedBooking
        };
    } catch (error) {
        throw error;
    }
}

/**
 * Get all bookings.
 */
async function getAllBookings() {
    try {
        const bookings = await bookingModel.getAllBookings();
        const refreshedBookings = await syncBookingsStatus(bookings);

        return {
            success: true,
            data: refreshedBookings
        };
    } catch (error) {
        throw error;
    }
}

/**
 * Get bookings for a specific employee.
 */
async function getEmployeeBookings(employeeId) {
    try {
        const bookings = await bookingModel.getBookingsByEmployee(employeeId);
        const refreshedBookings = await syncBookingsStatus(bookings);

        return {
            success: true,
            data: refreshedBookings
        };
    } catch (error) {
        throw error;
    }
}

/**
 * Update a booking.
 */
async function updateBooking(bookingId, updateData) {
    try {
        const existingBooking = await bookingModel.getBookingById(bookingId);

        if (!existingBooking) {
            return {
                success: false,
                message: 'Booking not found.'
            };
        }

        if (existingBooking.booking_status === 'Cancelled') {
            return {
                success: false,
                message: 'Cancelled bookings cannot be updated.'
            };
        }

        const updated = await bookingModel.updateBooking(bookingId, updateData);

        if (!updated) {
            return {
                success: false,
                message: 'Booking could not be updated.'
            };
        }

        const booking = await bookingModel.getBookingById(bookingId);
        const refreshedBooking = await syncBookingStatus(booking);

        return {
            success: true,
            message: 'Booking updated successfully.',
            data: refreshedBooking
        };
    } catch (error) {
        throw error;
    }
}

/**
 * Cancel a booking.
 */
async function cancelBooking(bookingId) {
    try {
        const existingBooking = await bookingModel.getBookingById(bookingId);

        if (!existingBooking) {
            return {
                success: false,
                message: 'Booking not found.'
            };
        }

        if (existingBooking.booking_status === 'Cancelled') {
            return {
                success: false,
                message: 'Booking is already cancelled.'
            };
        }

        const cancelled = await bookingModel.cancelBooking(bookingId);

        if (!cancelled) {
            return {
                success: false,
                message: 'Booking could not be cancelled.'
            };
        }

        const booking = await bookingModel.getBookingById(bookingId);
        await historyService.createHistoryEntry({
            asset_id: booking.asset_id,
            allocation_id: null,
            action: 'Booking Cancelled',
            employee_id: booking.employee_id,
            performed_by: booking.booked_by,
            remarks: 'Booking cancelled.'
        });

        return {
            success: true,
            message: 'Booking cancelled successfully.',
            data: booking
        };
    } catch (error) {
        throw error;
    }
}

/**
 * Delete a booking.
 */
async function deleteBooking(bookingId) {
    try {
        const deleted = await bookingModel.deleteBooking(bookingId);

        if (!deleted) {
            return {
                success: false,
                message: 'Booking not found or could not be deleted.'
            };
        }

        return {
            success: true,
            message: 'Booking deleted successfully.'
        };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createBooking,
    getBooking,
    getAllBookings,
    getEmployeeBookings,
    updateBooking,
    cancelBooking,
    deleteBooking
};
