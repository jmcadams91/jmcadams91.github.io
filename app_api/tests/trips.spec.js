const { setup, teardown } = require('./jest.setup');
const Trip = require('../models/travlr');

beforeAll(async () => { await setup(); });
afterAll(async () => { await teardown(); });
afterEach(async () => { await Trip.deleteMany({}); });

test('create trip valid', async () => {
  const t = new Trip({ code: 'T1', name: 'Trip1', length: 4, start: new Date(), resort: 'Resort, 3 stars', perPerson: 100, location: 'Beach', rating: 4, image: 'img.jpg', description: 'desc' });
  const saved = await t.save();
  expect(saved._id).toBeDefined();
  expect(saved.length).toBe(4);
});

test('trip validation: negative perPerson fails', async () => {
  expect.assertions(1);
  try {
    const t = new Trip({ code: 'T2', name: 'Trip2', length: 3, start: new Date(), resort: 'Resort', perPerson: -10, location: 'Loc', rating: 3, image: 'img.jpg', description: 'desc' });
    await t.save();
  } catch (err) {
    expect(err).toBeTruthy();
  }
});
