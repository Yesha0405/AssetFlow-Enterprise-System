const express = require("express");
const router = express.Router();

const allocationController = require("../controllers/allocation.controller");
const { validateAllocation } = require("../validators/allocation.validator");

/* @route   POST /
* @desc    Create a new asset allocation
* @access  Private
*/

router.post("/", validateAllocation, allocationController.createAllocation);

/* @route   GET /
* @desc    Get all asset allocations
* @access  Private
*/

router.get("/", allocationController.getAllAllocations);

/* @route   GET /employee/:employeeId
* @desc    Get all allocations of one employee
* @access  Private
*/

router.get("/employee/:employeeId", allocationController.getEmployeeAllocations);

/* @route   GET /:id
* @desc    Get allocation by allocation ID
* @access  Private
*/

router.get("/:id", allocationController.getAllocationById);

/* @route   PUT /:id
* @desc    Update an existing allocation
* @access  Private
*/

router.put("/:id", allocationController.updateAllocation);

/* @route   PUT /return/:id
* @desc    Return an allocated asset by ID
* @access  Private
*/

router.put("/return/:id", allocationController.returnAsset);

/* @route   DELETE /:id
* @desc    Delete an allocation record
* @access  Private
*/

router.delete("/:id", allocationController.deleteAllocation);

module.exports = router;