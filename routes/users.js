const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

const validate = require('../middleware/validator');
const {isAuthenticated} = require("../middleware/authenticate")



router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

// POST - Create a movie with validation and authentication
router.post(
    '/',
    isAuthenticated,                   // Ensure the user is authenticated
    validate.movieRules(),            // Validate request body
    validate.checkData,                // Check for validation errors
    usersController.createUser     // Create the user if validation passes
  );
  
  // PUT - Update a user with validation and authentication
  router.put(
    '/:id',
    isAuthenticated,                   // Ensure the user is authenticated
    validate.userRules(),            // Validate request body
    validate.checkData,                // Check for validation errors
    usersController.updateUser    // Update the user if validation passes
  );
  
  // DELETE user by ID with authentication
  router.delete('/:id', isAuthenticated, usersController.deleteUser);
      
    
    
  module.exports = router;

