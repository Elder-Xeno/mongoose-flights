const Ticket = require('../models/tickets');
const Flight = require('../models/flights');

async function createTicket(req, res) {
  try {
    const { seat, price, flightId } = req.body;
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).render('error', { message: 'Flight not found' });
    }
    const newTicket = new Ticket({ seat, price, flight: flightId });
    await newTicket.save();
    flight.tickets.push(newTicket._id);
    await flight.save();
    res.redirect(`/flights/${flightId}`);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).render('error', { message: 'Error creating ticket. Please try again later.' });
  }
}

function showForm(req, res) {
  try {
    res.render('tickets/new', { flightId: req.params.id });
  } catch (error) {
    console.error('Error rendering ticket form:', error);
    res.status(500).render('error', { message: 'Error rendering ticket form. Please try again later.' });
  }
}

module.exports = {
  create: createTicket,
  show: showForm,
};