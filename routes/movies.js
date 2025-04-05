const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');

const validate = require('../middleware/validator');
const {isAuthenticated} = require("../middleware/authenticate")



router.get('/', moviesController.getAll);

router.get('/:id', moviesController.getSingle);

// POST - Create a movie with validation and authentication
router.post(
    '/',
    isAuthenticated,                   // Ensure the user is authenticated
    validate.movieRules(),            // Validate request body
    validate.checkData,                // Check for validation errors
    moviesController.createMovie     // Create the movie if validation passes
  );
  
  // PUT - Update a movie with validation and authentication
  router.put(
    '/:id',
    isAuthenticated,                   // Ensure the user is authenticated
    validate.movieRules(),            // Validate request body
    validate.checkData,                // Check for validation errors
    moviesController.updateMovie    // Update the student if validation passes
  );
  
  // DELETE student by ID with authentication
  router.delete('/:id', isAuthenticated, moviesController.deleteMovie);
      
    
    
  module.exports = router;













module.exports = router;