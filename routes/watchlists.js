const express = require('express');
const router = express.Router();
const watchlistController = require('../controllers/watchlists');
const validate = require('../middleware/validator');

const { isAuthenticated } = require("../middleware/authenticate");
// GET all watchlists
router.get('/', watchlistController.getAll);

// GET a single watchlist by ID
router.get('/:id', watchlistController.getSingle);

// POST - Create a new watchlist
router.post(
  '/',
  isAuthenticated,
  watchlistController.createWatchlist
);

// PUT - Update a watchlist by ID
router.put(
  '/:id',
  isAuthenticated,
  watchlistController.updateWatchlist
);

// DELETE - Remove a watchlist by ID
router.delete('/:id', isAuthenticated,watchlistController.deleteWatchlist);

module.exports = router;
