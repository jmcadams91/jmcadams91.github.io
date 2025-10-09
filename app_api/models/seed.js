// Bring in the DB connection and the Trip/User/Booking schemas
const Mongoose = require('./db');
const Trip = require('./travlr');
const User = require('./user');
const Booking = require('./booking');

// Read seed data from JSON file
const fs = require('fs');
const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// Example users to seed
const users = [
  { name: 'Alice Example', email: 'alice@example.com', password: 'password123' },
  { name: 'Bob Example', email: 'bob@example.com', password: 'password123' }
];

// Delete any existing records, then insert seed data
const seedDB = async () => {
    // Clear existing collections used for seed
    await Booking.deleteMany({}).catch(() => {});
    await Trip.deleteMany({}).catch(() => {});
    await User.deleteMany({}).catch(() => {});

    // Normalize and insert trips
    const normalizedTrips = trips.map(t => {
        // length: extract first number (nights)
        let lengthNum = 0;
        if (typeof t.length === 'number') lengthNum = t.length;
        else if (typeof t.length === 'string') {
            const m = t.length.match(/(\d+)/);
            lengthNum = m ? parseInt(m[1], 10) : 0;
        }

        // perPerson: parse float
        let perPersonNum = 0;
        if (typeof t.perPerson === 'number') perPersonNum = t.perPerson;
        else if (typeof t.perPerson === 'string') {
            const v = parseFloat(t.perPerson.replace(/[^0-9.\-]/g, ''));
            perPersonNum = isNaN(v) ? 0 : v;
        }

        // start: convert to Date
        const startDate = t.start ? new Date(t.start) : new Date();

        // location: try to extract from resort before comma, else fallback to 'Unknown'
        let location = 'Unknown';
        if (t.resort && typeof t.resort === 'string') {
            const parts = t.resort.split(',');
            location = parts[0].trim();
        }

        // rating: try to extract number like '3 stars' from resort string
        let rating = 3;
        if (t.resort && typeof t.resort === 'string') {
            const r = t.resort.match(/(\d+)\s*stars?/i);
            if (r) rating = parseInt(r[1], 10);
        }

        return {
            code: t.code,
            name: t.name,
            length: lengthNum,
            start: startDate,
            resort: t.resort || '',
            perPerson: perPersonNum,
            location: location,
            rating: rating,
            image: t.image || '',
            description: t.description || ''
        };
    });

    const insertedTrips = await Trip.insertMany(normalizedTrips);

    // Create users and set passwords
    const createdUsers = [];
    for (const u of users) {
        const user = new User({ name: u.name, email: u.email });
        user.setPassword(u.password);
        await user.save();
        createdUsers.push(user);
    }

    // Create a couple of bookings referencing first user and first two trips (if available)
    if (insertedTrips.length > 0 && createdUsers.length > 0) {
        const bookingDocs = [];
        bookingDocs.push({ user: createdUsers[0]._id, trip: insertedTrips[0]._id, guests: 2, totalPrice: (insertedTrips[0].perPerson || 0) * 2 });
        if (insertedTrips.length > 1) {
            bookingDocs.push({ user: createdUsers[1 % createdUsers.length]._id, trip: insertedTrips[1]._id, guests: 1, totalPrice: (insertedTrips[1].perPerson || 0) * 1 });
        }
        await Booking.insertMany(bookingDocs);
    }
};

// Close the MongoDB connection and exit
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
}).catch(async (err) => {
    console.error('Seeding failed:', err);
    await Mongoose.connection.close();
    process.exit(1);
});
