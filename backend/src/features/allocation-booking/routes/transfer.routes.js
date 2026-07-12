const express = require('express');
const router = express.Router();

const transferController = require('../controllers/transfer.controller');
const { validateTransfer } = require('../validators/transfer.validator');

/**
 * @route   POST /
 * @desc    Create a transfer request
 * @access  Private
 */
router.post('/', validateTransfer, transferController.createTransfer);

/**
 * @route   GET /
 * @desc    Get all transfer requests
 * @access  Private
 */
router.get('/', transferController.getAllTransfers);

/**
 * @route   GET /employee/:employeeId
 * @desc    Get transfer requests for an employee
 * @access  Private
 */
router.get('/employee/:employeeId', transferController.getTransfersByEmployee);

/**
 * @route   PUT /approve/:id
 * @desc    Approve a transfer request
 * @access  Private
 */
router.put('/approve/:id', transferController.approveTransfer);

/**
 * @route   PUT /reject/:id
 * @desc    Reject a transfer request
 * @access  Private
 */
router.put('/reject/:id', transferController.rejectTransfer);

/**
 * @route   PUT /complete/:id
 * @desc    Complete an approved transfer request
 * @access  Private
 */
router.put('/complete/:id', transferController.completeTransfer);

/**
 * @route   GET /:id
 * @desc    Get transfer request by ID
 * @access  Private
 */
router.get('/:id', transferController.getTransferById);

/**
 * @route   PUT /:id
 * @desc    Update a transfer request
 * @access  Private
 */
router.put('/:id', transferController.updateTransfer);

/**
 * @route   DELETE /:id
 * @desc    Delete a transfer request
 * @access  Private
 */
router.delete('/:id', transferController.deleteTransfer);

module.exports = router;
