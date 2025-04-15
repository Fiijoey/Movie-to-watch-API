const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const validate = require('../middleware/validator');
const { isAuthenticated } = require("../middleware/authenticate");

// Removed isAuthenticated to allow unauthenticated access

// GET all users
router.get('/', usersController.getAll);

// GET a single user by ID
router.get('/:id', usersController.getSingle);

// POST - Create a user with validation (no auth)
router.post(
  '/',
  isAuthenticated,
  validate.userRules(),           // Validate request body
  validate.checkData,              // Check for validation errors
  usersController.createUser      // Create the user if validation passes
);

// PUT - Update a user by ID with validation (no auth)
router.put(
  '/:id',
  isAuthenticated,
  validate.userRules(),           // Validate request body
  validate.checkData,              // Check for validation errors
  usersController.updateUser      // Update the user if validation passes
);

// DELETE - Remove a user by ID (no auth)
router.delete('/:id',  isAuthenticated,usersController.deleteUser);

module.exports = router;
