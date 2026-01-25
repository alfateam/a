const test = require('node:test');
const assert = require('node:assert/strict');

const a = require('../index');

test('exports expected API surface', () => {
  assert.equal(typeof a.mock, 'function');
  assert.equal(typeof a.expectRequire, 'function');
  assert.equal(typeof a.requireMock, 'function');
  assert.equal(typeof a.promise, 'function');
});
