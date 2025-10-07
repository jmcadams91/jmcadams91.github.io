// Enhancement: Utility function to check trip availability based on start date
// Time Complexity: O(1)
// Edge Case: Invalid date format returns false

function isAvailable(tripStartDate, requestedDate) {
  const tripDate = new Date(tripStartDate);
  const reqDate = new Date(requestedDate);

  if (isNaN(tripDate) || isNaN(reqDate)) return false;

  return tripDate >= reqDate;
}

module.exports = { isAvailable };
