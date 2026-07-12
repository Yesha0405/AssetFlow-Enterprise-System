const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/booking.controller');
const { validateBooking } = require('../validators/booking.validator');

/**
 * @route   POST /
 * @desc    Create a resource booking
 * @access  Private
 */
router.post('/', validateBooking, bookingController.createBooking);

/**
 * @route   GET /
 * @desc    Get all bookings
 * @access  Private
 */
router.get('/', bookingController.getAllBookings);

/**
 * @route   GET /employee/:employeeId
 * @desc    Get bookings for an employee
 * @access  Private
 */
router.get('/employee/:employeeId', bookingController.getEmployeeBookings);

/**
 * @route   GET /reminders
 * @desc    Get booking reminders for the next 15 minutes
 * @access  Private
 */
router.get('/reminders', bookingController.getReminders);

/**
 * @route   GET /:id
 * @desc    Get booking by ID
 * @access  Private
 */
router.get('/:id', bookingController.getBookingById);

/**
 * @route   PUT /:id
 * @desc    Update a booking
 * @access  Private
 */
router.put('/:id', bookingController.updateBooking);

/**
 * @route   PUT /cancel/:id
 * @desc    Cancel a booking
 * @access  Private
 */
router.put('/cancel/:id', bookingController.cancelBooking);

/**
 * @route   DELETE /:id
 * @desc    Delete a booking
 * @access  Private
 */
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
