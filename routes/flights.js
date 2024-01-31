const express = require('express');
const router = express.Router();
const flightsController = require('../controllers/flightsController');

router.get('/', flightsController.getFlights);

router.get('/new', flightsController.showFlightForm);

router.post('/', flightsController.createFlight);

router.get('/flights/:id', flightsController.showFlightDetails);

module.exports = router;