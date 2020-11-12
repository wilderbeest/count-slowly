module.exports = function getStepFromTotalDuration(oldVal, newVal, totalDuration) {
  const difference = Math.abs(oldVal - newVal);
  if (difference === 0) return 5;
  return Math.floor(totalDuration / difference);
};
