const express = require('express');
const router = express.Router();

const returnController = require('../controllers/return.controller');
const { validateReturn } = require('../validators/return.validator');

/**
 * @route   POST /
 * @desc    Create an asset return record
 * @access  Private
 */
router.post('/', validateReturn, returnController.createReturn);

/**
 * @route   GET /
 * @desc    Get all asset returns
 * @access  Private
 */
router.get('/', returnController.getAllReturns);

/**
 * @route   GET /employee/:employeeId
 * @desc    Get return records for an employee
 * @access  Private
 */
router.get('/employee/:employeeId', returnController.getEmployeeReturns);

/**
 * @route   GET /:id
 * @desc    Get return record by ID
 * @access  Private
 */
router.get('/:id', returnController.getReturnById);

/**
 * @route   PUT /:id
 * @desc    Update a return record
 * @access  Private
 */
router.put('/:id', returnController.updateReturn);

/**
 * @route   DELETE /:id
 * @desc    Delete a return record
 * @access  Private
 */
router.delete('/:id', returnController.deleteReturn);

module.exports = router;
