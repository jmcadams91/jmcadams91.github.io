const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model

// GET: /trips - lists all the trips 
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async (req, res) => {
    try {
        const q = await Trip.find({}).exec();  // No filter, return all records
        return res.status(200).json(q);
       } catch (err) {
        console.error('Error in tripsList:', err);
        return res.status(500).json({ message: "Error retrieving trips", error: err });
    }
};

// GET: /trips/:tripCode - lists a single trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Trip
        .findOne({'code' : req.params.tripCode }) // Return single record
        .exec(); 

        // Uncomment the following line to show results of query
        // on the console
        // console.log(q);

    if(!q)
    { // Database returned no data
        return res
                .status(404)
                .json({ message: "Trip not found" });
    } else { // Return resulting trip list
        return res
                .status(200)
                .json(q);
    }
};

// POST: /trips - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async (req, res) => {
  const { code, name, length, start, resort, perPerson, image, description } = req.body;

  // Basic field validation
  if (!code || !name || !start) {
    return res.status(400).json({ message: "Missing required fields: code, name, or start" });
  }

  const newTrip = new Trip({ code, name, length, start, resort, perPerson, image, description });

  try {
    const q = await newTrip.save();
    return res.status(201).json(q);
  } catch (err) {
    console.error('Error in tripsAddTrip:', err);
    return res.status(400).json({ message: "Trip creation failed", error: err });
  }
};

// PUT: /trips/:tripCode - Updates an existing Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
    try {
        const updatedTrip = await Trip.findOneAndUpdate(
            { code: req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true } // Return the updated document
        ).exec();

        if (!updatedTrip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        return res.status(200).json(updatedTrip);
    } catch (err) {
        console.error('Error in tripsUpdateTrip:', err);
        return res.status(400).json({ message: "Trip update failed", error: err });
    }
};
    
// DELETE: /trips/:tripCode - Deletes a trip
const tripsDeleteTrip = async (req, res) => {
    try {
        const deletedTrip = await Trip.findOneAndDelete({ code: req.params.tripCode }).exec();

        if (!deletedTrip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        return res.status(200).json({ message: "Trip deleted successfully", deletedTrip });
    } catch (err) {
        console.error('Error in tripsDeleteTrip:', err);
        return res.status(400).json({ message: "Trip deletion failed", error: err });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};
