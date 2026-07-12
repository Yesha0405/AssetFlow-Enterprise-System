const pool = require('../../../config/db');

/**
 * Database access methods for resource bookings.
 */
const createBooking = async (bookingData) => {
    const {
        asset_id,
        employee_id,
        booked_by,
        booking_date,
        start_time,
        end_time,
        purpose,
        booking_status
    } = bookingData;

    const query = `
        INSERT INTO resource_bookings
        (asset_id, employee_id, booked_by, booking_date, start_time, end_time, purpose, booking_status, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;

    try {
        const [result] = await pool.execute(query, [
            asset_id,
            employee_id,
            booked_by,
            booking_date,
            start_time,
            end_time,
            purpose,
            booking_status
        ]);

        return result.insertId;
    } catch (error) {
        throw new Error(`Error creating booking: ${error.message}`);
    }
};

const getBookingById = async (bookingId) => {
    const query = `SELECT * FROM resource_bookings WHERE booking_id = ?`;

    try {
        const [rows] = await pool.execute(query, [bookingId]);
        return rows[0] || null;
    } catch (error) {
        throw new Error(`Error fetching booking: ${error.message}`);
    }
};

const getAllBookings = async () => {
    const query = `SELECT * FROM resource_bookings ORDER BY booking_date DESC, start_time DESC`;

    try {
        const [rows] = await pool.execute(query);
        return rows;
    } catch (error) {
        throw new Error(`Error fetching bookings: ${error.message}`);
    }
};

const getBookingsByEmployee = async (employeeId) => {
    const query = `SELECT * FROM resource_bookings WHERE employee_id = ? ORDER BY booking_date DESC, start_time DESC`;

    try {
        const [rows] = await pool.execute(query, [employeeId]);
        return rows;
    } catch (error) {
        throw new Error(`Error fetching bookings for employee: ${error.message}`);
    }
};

const getBookingsByAsset = async (assetId) => {
    const query = `SELECT * FROM resource_bookings WHERE asset_id = ? ORDER BY booking_date DESC, start_time DESC`;

    try {
        const [rows] = await pool.execute(query, [assetId]);
        return rows;
    } catch (error) {
        throw new Error(`Error fetching bookings for asset: ${error.message}`);
    }
};

const getUpcomingBookings = async () => {
    const query = `SELECT * FROM resource_bookings WHERE booking_status = 'Upcoming' ORDER BY booking_date ASC, start_time ASC`;

    try {
        const [rows] = await pool.execute(query);
        return rows;
    } catch (error) {
        throw new Error(`Error fetching upcoming bookings: ${error.message}`);
    }
};

const checkBookingConflict = async (assetId, bookingDate, requestedStartTime, requestedEndTime, excludeBookingId = null) => {
    const query = `
        SELECT *
        FROM resource_bookings
        WHERE asset_id = ?
          AND booking_date = ?
          AND booking_status != 'Cancelled'
          AND start_time < ?
          AND end_time > ?
    `;

    try {
        const [rows] = await pool.execute(query, [
            assetId,
            bookingDate,
            requestedEndTime,
            requestedStartTime
        ]);

        if (excludeBookingId) {
            return rows.filter((booking) => booking.booking_id !== excludeBookingId);
        }

        return rows;
    } catch (error) {
        throw new Error(`Error checking booking conflict: ${error.message}`);
    }
};

const updateBooking = async (bookingId, updateData) => {
    const entries = Object.entries(updateData).filter(([, value]) => value !== undefined);

    if (entries.length === 0) {
        return false;
    }

    const setClause = entries.map(([key]) => `${key} = ?`).join(', ');
    const values = entries.map(([, value]) => value);
    const query = `UPDATE resource_bookings SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE booking_id = ?`;

    try {
        const [result] = await pool.execute(query, [...values, bookingId]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(`Error updating booking: ${error.message}`);
    }
};

const updateBookingStatus = async (bookingId, bookingStatus) => {
    const query = `
        UPDATE resource_bookings
        SET booking_status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE booking_id = ?
    `;

    try {
        const [result] = await pool.execute(query, [bookingStatus, bookingId]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(`Error updating booking status: ${error.message}`);
    }
};

const cancelBooking = async (bookingId) => {
    const query = `
        UPDATE resource_bookings
        SET booking_status = 'Cancelled', updated_at = CURRENT_TIMESTAMP
        WHERE booking_id = ?
    `;

    try {
        const [result] = await pool.execute(query, [bookingId]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(`Error cancelling booking: ${error.message}`);
    }
};

const deleteBooking = async (bookingId) => {
    const query = `DELETE FROM resource_bookings WHERE booking_id = ?`;

    try {
        const [result] = await pool.execute(query, [bookingId]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(`Error deleting booking: ${error.message}`);
    }
};

module.exports = {
    createBooking,
    getBookingById,
    getAllBookings,
    getBookingsByEmployee,
    getBookingsByAsset,
    getUpcomingBookings,
    checkBookingConflict,
    updateBooking,
    updateBookingStatus,
    cancelBooking,
    deleteBooking
};
