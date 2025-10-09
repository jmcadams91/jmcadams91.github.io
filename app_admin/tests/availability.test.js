const { isAvailable } = require('../utils/availability');

describe('isAvailable', () => {
  test('returns true when trip is after requested date', () => {
    expect(isAvailable('2025-10-01', '2025-09-28')).toBe(true);
  });

  test('returns false when trip is before requested date', () => {
    expect(isAvailable('2025-09-01', '2025-09-28')).toBe(false);
  });

  test('returns true when trip is on the same day', () => {
    expect(isAvailable('2025-09-28', '2025-09-28')).toBe(true);
  });

  test('returns false for invalid trip date', () => {
    expect(isAvailable('invalid-date', '2025-09-28')).toBe(false);
  });

  test('returns false for invalid requested date', () => {
    expect(isAvailable('2025-09-28', 'not-a-date')).toBe(false);
  });
});
