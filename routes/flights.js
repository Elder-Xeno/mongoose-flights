var express = require('express');
var router = express.Router();
const Flight = require('../models/flights');

router.get('/flights', (req, res) => {
  Flight.find({})
    .then((flights) => {
      res.render('flights/index', { flights });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});

router.get('/flights/new', (req, res) => {
  res.render('flights/new');
});

router.post('/flights', (req, res) => {
  const newFlight = new Flight(req.body);
  newFlight.save()
    .then(() => {
      res.redirect('/flights');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});


module.exports = router;
