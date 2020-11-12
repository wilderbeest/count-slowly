const getStepFromTotalDuration = require('./getStepFromTotalDuration');

module.exports = function countSlowly({
  // // In ms. If you want to delay the beginning of a transition.
  // delay = 0,
  // In ms. Do not use if setting totalDuration. Defaults to 100.
  stepDuration,
  // In ms. Do not use if setting stepDuration.
  totalDuration,
  // Options: 'standard', 'ease-in', 'ease-out', 'ease-in-out'.
  transition = 'standard',
} = {}, startingValue = 0) {
  // TODO: Throw error f both stepDuration and totalDuration are set
  // TODO: Throw error if stepDuration is less than 1
  // TODO: Throw error if totalDuration is defined and less than 1
  const defaultStepDuration = 50;

  let count = startingValue;

  let updateCb;
  function handleUpdate(tempCount) {
    if (updateCb) {
      updateCb(tempCount);
    }
  }
  function onUpdate(cb) {
    updateCb = cb;
  }
  // Just set the number
  function hurry() {
    stop();
    handleUpdate(count);
  }

  function set(newCount) {
    count = newCount;
    hurry();
  }

  let handleStop;
  function stop() {
    if (handleStop) handleStop();
  }
  function update(newCount, {
    // overrideDelay,
    overrideStepDuration,
    overrideTotalDuration,
  } = {}) {
    const actualDelay = 0;

    // TODO: Throw an error if overrideStepDuration and overrideTotalDuration are both set
    let actualStepDuration = overrideStepDuration;
    // Fallback to overrideTotalDuration
    if (!actualStepDuration) {
      if (overrideTotalDuration) {
        actualStepDuration = getStepFromTotalDuration(count, newCount, overrideTotalDuration);
      }
    }
    // Fallback to stepDuration
    if (!actualStepDuration) {
      if (stepDuration) {
        actualStepDuration = stepDuration;
      }
    }
    // Fallback to totalDuration
    if (!actualStepDuration) {
      if (totalDuration) {
        actualStepDuration = getStepFromTotalDuration(count, newCount, totalDuration);
      }
    }
    // Fallback to defaultStepDurations
    if (!actualStepDuration) {
      actualStepDuration = defaultStepDuration;
    }

    let isPositiveChange = newCount - count > 0;
    let tempValue = count;

    setTimeout(() => {
      stop();
      count = newCount;

      const stepFn = setInterval(() => {
        tempValue = isPositiveChange ? tempValue + 1 : tempValue - 1;
        // console.log('stepFn', tempValue);
        handleUpdate(tempValue);
        if (isPositiveChange ? tempValue >= count : tempValue <= count) {
          stop();
        }
      }, actualStepDuration);
      handleStop = () => clearInterval(stepFn);
    }, actualDelay);
  }

  return {
    hurry,
    onUpdate,
    set,
    stop,
    update,
  }
};
