const getStepFromTotalDuration = require('./getStepFromTotalDuration');

describe('getStepFromTotalDuration', () => {
  it('should handle increases', () => {
    const stepDuration = getStepFromTotalDuration(1, 5, 1000);
    expect(stepDuration).toBe(250);
  });

  it('should handle decreases', () => {
    const stepDuration = getStepFromTotalDuration(5, 1, 1000);
    expect(stepDuration).toBe(250);
  });

  it('should return a finite number less than or equal to totalDuration if the values are equal', () => {
    const result = getStepFromTotalDuration(5, 5, 1000);
    expect(Number.isFinite(result)).toBe(true);
    expect(result).toBeLessThanOrEqual(1000);
  });
});
