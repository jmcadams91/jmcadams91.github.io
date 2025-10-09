// Enhancement: Modular service layer for trip-related database operations
const Trip = require('../../app_api/models/travlr');

// Service: Fetch all trips from database
const getAllTrips = async () => Trip.find({}).exec();

// Service: Fetch a single trip by its code
const getTripByCode = async (code) => Trip.find({ code }).exec();

// Service: Create a new trip document
const createTrip = async (tripData) => {
  const newTrip = new Trip(tripData);
  return await newTrip.save();
};

// Service: Update an existing trip by code
const updateTrip = async (code, updateData) =>
  Trip.findOneAndUpdate({ code }, updateData, { new: true }).exec();

// Service: Delete a trip by its code
const deleteTrip = async (code) =>
  Trip.findOneAndDelete({ code }).exec();

// Export all service functions for use in controllers
module.exports = {
  getAllTrips,
  getTripByCode,
  createTrip,
  updateTrip,
  deleteTrip
};
