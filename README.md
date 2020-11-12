# count-slowly

- [Usage](#usage)
  - [factory function](#factory-function)
  - [.set()](#set)
  - [.onUpdate()](#onupdate)
  - [.update()](#update)
  - [.hurry()](#hurry)
  - [.stop()](#stop)

## Usage

```js
const countSlowly = require('count-slowly');

const cs = countSlowly({ stepDuration: 100 });

// Set the initial value
cs.set(1);
// Handle values between your final value
cs.onUpdate((tempValue) => {
  // Handle the temp value
});

// Update value when needed
cs.update(100);

// Skip directly to the new value. Calls onUpdate callback with final value then stops.
cs.hurry();

// Stops the onUpdate callbacks without skipping to new value.
cs.stop();
```

### factory function

Rely on the [.update()](#update) method to determine the values.

```js
const cs = countSlowly();
```

Set the starting value straight-away.

```js
const cs = countSlowly({}, 50);
```

Set a default duration to stay on each step

```js
const cs = countSlowly({ stepDuration: 100 });
```

Set the default length of time to arrive at the new count

```js
const cs = countSlowly({ totalDuration: 2000 });
```

### .set()

Set an initial integer value. This will call the [.onUpdate() callback](#onupdate) once if it has been set.

```js
cs.set(1);
```

### .onUpdate()

Set the callback from each integer between the old value and the new value.

```js
cs.onUpdate((tempValue) => {
  console.log(`Called with ${tempValue}`);
});
```

### .update()

Set a new value. This will call the [.onUpdate() callback](#onupdate) for each integer between the old integer and the new integer according to either the [factory function](#factory-function)'s `stepDuration` or `totalDuration` value.

```js
cs.update(100);
```

Set a new value, calling the [.onUpdate() callback](#onupdate) every 50ms regardless of the [factory function](#factory-function)'s `stepDuration` or `totalDuration` value.

```js
cs.update(100, {
  overrideStepDuration: 50,
});
```

Set a new value, calling the [.onUpdate() callback](#onupdate) as often as needed in order to invoke the callback with `100` after 1200ms regardless of the [factory function](#factory-function)'s `stepDuration` or `totalDuration` value.

```js
cs.update(100, {
  overrideTotalDuration: 1200,
});
```

### .hurry()

Skip directly to the new value. Calls the [.onUpdate() callback](#onupdate) with final value then stops.

```js
cs.hurry();
```

### .stop()

Stop the [.onUpdate() callbacks](#onupdate) without skipping to the new value.

```js
cs.stop();
```

## Examples

* [CLI Example](#examples/cli/index.js)
