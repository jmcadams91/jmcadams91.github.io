// Enhancement: Modular Express route file for trip-related endpoints
const express = require('express');
const router = express.Router();

// Enhancement: Delegates route logic to controller layer
const controller = require('../controllers/trips');

// Enhancement: Applies JWT middleware to protect sensitive routes
const { requireAuth } = require('../middleware/auth');

// Route: Get all trips (public)
router.get('/', controller.tripsList);

// Route: Get a single trip by code (public)
router.get('/:tripCode', controller.tripsFindByCode);

// Route: Create a new trip (protected)
router.post('/', requireAuth, controller.tripsAddTrip);

// Route: Update an existing trip (protected)
router.put('/:tripCode', requireAuth, controller.tripsUpdateTrip);

// Route: Delete a trip (protected)
router.delete('/:tripCode', requireAuth, controller.tripsDeleteTrip);

// Export router for use in app.js
module.exports = router;
