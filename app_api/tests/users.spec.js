const { setup, teardown } = require('./jest.setup');
const User = require('../models/user');

beforeAll(async () => { await setup(); });
afterAll(async () => { await teardown(); });
afterEach(async () => { await User.deleteMany({}); });

test('user setPassword and validPassword work', async () => {
  const u = new User({ name: 'Test', email: 'test@example.com' });
  u.setPassword('hello123');
  await u.save();
  const found = await User.findOne({ email: 'test@example.com' });
  expect(found.validPassword('hello123')).toBe(true);
});

test('unique email validation fails', async () => {
  expect.assertions(1);
  try {
    const u1 = new User({ name: 'A', email: 'dup@example.com' });
    u1.setPassword('p');
    await u1.save();
    const u2 = new User({ name: 'B', email: 'dup@example.com' });
    u2.setPassword('p');
    await u2.save();
  } catch (err) {
    expect(err).toBeTruthy();
  }
});
