const express = require('express');
const { getEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployeeById } = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
    .get(protect, getEmployees)
    .post(protect, createEmployee);

router.route('/:id')
    .get(protect, getEmployeeById)
    .put(protect, updateEmployee)
    .delete(protect, deleteEmployee);

module.exports = router;
