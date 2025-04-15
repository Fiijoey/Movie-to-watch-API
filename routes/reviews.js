const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/reviews');
const validate = require('../middleware/validator');

const { isAuthenticated } = require("../middleware/authenticate");

// Removed isAuthenticated to allow unauthenticated access

// GET all reviews
router.get('/', reviewController.getAll);

// GET a single review by ID
router.get('/:id', reviewController.getSingle);

// POST - Create a review with validation (no auth)
router.post(
  '/',
  isAuthenticated,
  reviewController.createReview,
  validate.reviewRules(),
  validate.checkData,
);

// PUT - Update a review by ID with validation (no auth)
router.put(
  '/:id', isAuthenticated,
  reviewController.updateReview
);

// DELETE - Remove a review by ID (no auth)
router.delete('/:id', isAuthenticated,reviewController.deleteReview);

module.exports = router;
