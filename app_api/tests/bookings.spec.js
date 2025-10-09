const { setup, teardown } = require('./jest.setup');
const Trip = require('../models/travlr');
const User = require('../models/user');
const Booking = require('../models/booking');

beforeAll(async () => { await setup(); });
afterAll(async () => { await teardown(); });
afterEach(async () => { await Booking.deleteMany({}); await Trip.deleteMany({}); await User.deleteMany({}); });

test('create booking references user and trip', async () => {
  const trip = await new Trip({ code: 'B1', name: 'T', length: 3, start: new Date(), resort: 'Res', perPerson: 100, location: 'L', rating: 4, image: 'i', description: 'd' }).save();
  const user = new User({ name: 'U', email: 'u@example.com' }); user.setPassword('p'); await user.save();
  const b = await new Booking({ user: user._id, trip: trip._id, guests: 2, totalPrice: 200 }).save();
  const found = await Booking.findById(b._id).populate('user').populate('trip');
  expect(found.user.email).toBe('u@example.com');
  expect(found.trip.code).toBe('B1');
});
