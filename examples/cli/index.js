const countSlowly = require('../../lib');

const cs = countSlowly({ stepDuration: 100 });

const startWith = 1;
cs.set(startWith);
process.stdout.write(startWith.toString(), 'utf-8');
cs.onUpdate((temp) => process.stdout.write(` ${temp}`, 'utf-8'));

setTimeout(() => {
  cs.hurry();
}, 2000);
cs.update(100);
