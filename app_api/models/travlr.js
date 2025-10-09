const mongoose = require('mongoose');

// small helper to ensure date fields are valid
function isValidDate(value) {
    return value instanceof Date && !isNaN(value.getTime());
}

// Define the trip schema
const tripSchema = new mongoose.Schema({
    code: { type: String, required: [true, 'Code is required'], index: true, trim: true },
    name: { type: String, required: [true, 'Name is required'], index: true, trim: true },
    length: { type: Number, required: [true, 'Length is required'], min: [0, 'Length must be >= 0'] },
    start: { type: Date, required: [true, 'Start date is required'], validate: { validator: isValidDate, message: 'Invalid start date' } },
    resort: { type: String, required: [true, 'Resort is required'], trim: true },
    perPerson: { type: Number, required: [true, 'Price per person is required'], min: [0, 'perPerson must be >= 0'] },
    location: { type: String, required: [true, 'Location is required'], trim: true },
    rating: { type: Number, required: [true, 'Rating is required'], min: [0, 'Rating must be >= 0'], max: [5, 'Rating must be <= 5'] },
    image: { type: String, required: [true, 'Image is required'], trim: true },
    description: { type: String, required: [true, 'Description is required'], trim: true }
});
const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
