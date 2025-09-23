const mongoose = require('mongoose');
const Trip = require('../../app_api/models/travlr'); 

const tripService = require('../services/tripService');

const tripsList = async (req, res) => {
  try {
    console.log('TripsList triggered');
    const q = await Trip.find({}).exec();
    console.log('Query result:', q);
    return res.status(200).json(q);
  } catch (err) {
    console.error('Error in tripsList:', err.message);
    console.error('Full error object:', err);
    return res.status(500).json({ message: "Error retrieving trips", error: err.message });
  }
};


const tripsFindByCode = async (req, res) => {
  try {
    const trip = await tripService.getTripByCode(req.params.tripCode);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving trip", error: err });
  }
};

const tripsAddTrip = async (req, res) => {
  try {
    const trip = await tripService.createTrip(req.body);
    res.status(201).json(trip);
  } catch (err) {
    res.status(400).json({ message: "Trip creation failed", error: err });
  }
};

const tripsUpdateTrip = async (req, res) => {
  try {
    const trip = await tripService.updateTrip(req.params.tripCode, req.body);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.status(200).json(trip);
  } catch (err) {
    res.status(400).json({ message: "Trip update failed", error: err });
  }
};

const tripsDeleteTrip = async (req, res) => {
  try {
    const trip = await tripService.deleteTrip(req.params.tripCode);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.status(200).json({ message: "Trip deleted", trip });
  } catch (err) {
    res.status(400).json({ message: "Trip deletion failed", error: err });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};
