import assert from 'node:assert';

import test from 'oletus';

import {identity} from '../index.js';


test ('identity (42)', () => {
  assert.strictEqual (identity (42), 42);
});
