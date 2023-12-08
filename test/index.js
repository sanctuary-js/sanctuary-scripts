'use strict';

const assert = require ('node:assert');

const identity = require ('..');


test ('identity (42)', () => {
  assert.strictEqual (identity (42), 42);
});
