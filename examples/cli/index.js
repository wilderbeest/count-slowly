const countSlowly = require('../../lib');

const cs = countSlowly({ stepDuration: 100 });

const startWith = 1;
cs.set(startWith);
process.stdout.write(startWith.toString(), 'utf-8');
cs.onUpdate(temp => process.stdout.write(temp.toString(), 'utf-8'));
cs.update(9);
