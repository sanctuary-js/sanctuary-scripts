'use strict';

var assert = require ('assert');

var identity = require ('..');


test ('identity (42)', function() {
  assert.strictEqual (identity (42), 42);
});
