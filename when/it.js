var assert = require('assert');
var x = require('./test_invoker');

function new_it() {
	return {
		it: it
	};
}
function it(title) {
	var retval = {};

	retval.assertFail = function(message) {
		x.test(title, function() {
			assert.fail(null, null, message);
		});
		return new_it();
	};

	retval.assertOk = function(value, message) {
		x.test(title, function() {
			assert.ok(value, message);
		});
		return new_it();
	};

	retval.assert = function(value, message) {
		x.test(title, function() {
			assert(value, message);
		});
		return new_it();
	};

	retval.assertEqual = function(expected, actual, message) {
		x.test(title, function() {
			assert.equal(actual, expected, message);
		});
		return new_it();
	};

	retval.assertNotEqual = function(expected, actual, message) {
		x.test(title, function() {
			assert.notEqual(actual, expected, message);
		});
		return new_it();
	};

	retval.assertDeepEqual = function(expected, actual, message) {
		x.test(title, function() {
			assert.deepEqual(actual, expected, message);
		});
		return new_it();
	};

	retval.assertNotDeepEqual = function(expected, actual, message) {
		x.test(title, function() {
			assert.notDeepEqual(actual, expected, message);
		});
		return new_it();
	};

	retval.assertStrictEqual = function(expected, actual, message) {
		x.test(title, function() {
			assert.strictEqual(actual, expected, message);
		});
		return new_it();
	};

	retval.assertNotStrictEqual = function(expected, actual, message) {
		x.test(title, function() {
			assert.notStrictEqual(actual, expected, message);
		});
		return new_it();
	};

	retval.assertThrows = function(block, error, message) {
		x.test(title, function() {
			assert.throws(block, error, message);
		});
		return new_it();
	};

	retval.assertDoesNotThrow = function(block, error, message) {
		x.test(title, function() {
			assert.doesNotThrow(block, error, message);
		});
		return new_it();
	};

	return retval;
}

module.exports = new_it();

