var test = require('./test');
var assert = require('assert');

var expect_require = require('../../expectRequire');
var test_invoker = {
	test: function() {}
};

expect_require('./test_invoker').
return (test_invoker);

(function() {

	console.log('when called it()');

	var it = require('../it').it();
	test('it should return object containing assertFail function', function() {
		assert(typeof it.assertFail == 'function');
	});

	test('it should return object containing assertOk function', function() {
		assert(typeof it.assertOk == 'function');
	});

	test('it should return object containing assert function', function() {
		assert(typeof it.assert == 'function');
	});
	test('it should return object containing assertEqual function', function() {
		assert(typeof it.assertEqual == 'function');
	});

	test('it should return object containing assertNotEqual function', function() {
		assert(typeof it.assertNotEqual == 'function');
	});

	test('it should return object containing assertDeepEqual function', function() {
		assert(typeof it.assertDeepEqual == 'function');
	});

	test('it should return object containing assertNotDeepEqual function', function() {
		assert(typeof it.assertNotDeepEqual == 'function');
	});

	test('it should return object containing assertStrictEqual function', function() {
		assert(typeof it.assertStrictEqual == 'function');
	});

	test('it should return object containing assertNotStrictEqual function', function() {
		assert(typeof it.assertNotStrictEqual == 'function');
	});

	test('it should return object containing assertThrows function', function() {
		assert(typeof it.assertThrows == 'function');
	});

	test('it should return object containing assertDoesNotThrow function', function() {
		assert(typeof it.assertDoesNotThrow == 'function');
	});

})();

(function() {

	console.log('when asserted');

	var it = require('../it').it();

	test('assertFail should return object containing "it" function', function() {
		var retval = it.assertFail();
		assert(typeof retval.it == 'function');
	});

	test('assertFail should invoke test', function() {
		var invoked;
		test_invoker.test = function() {
			invoked = true;
		}
		it.assertFail();
		assert(invoked);
	});

	test('assertOk should return object containing "it" function', function() {
		var retval = it.assertOk();
		assert(typeof retval.it == 'function');
	});

	test('assertOk should invoke test', function() {
		var invoked;
		test_invoker.test = function() {
			invoked = true;
		}
		it.assertOk();
		assert(invoked);
	});

	test('assert should return object containing "it" function', function() {
		var retval = it.assert();
		assert(typeof retval.it == 'function');
	});

	test('assert should invoke test', function() {
		var invoked;
		test_invoker.test = function() {
			invoked = true;
		}
		it.assert();
		assert(invoked);
	});

	test('assertEqual should return object containing "it" function', function() {
		var retval = it.assertEqual();
		assert(typeof retval.it == 'function');
	});

	test('assertEqual should invoke test', function() {
		var invoked;
		test_invoker.test = function() {
			invoked = true;
		}
		it.assertEqual();
		assert(invoked);
	});

	test('assertNotEqual should return object containing "it" function', function() {
		var retval = it.assertNotEqual();
		assert(typeof retval.it == 'function');
	});

	test('assertNotEqual should invoke test', function() {
		var invoked;
		test_invoker.test = function() {
			invoked = true;
		}
		it.assertNotEqual();
		assert(invoked);
	});

	test('assertDeepEqual should return object containing "it" function', function() {
		var retval = it.assertDeepEqual();
		assert(typeof retval.it == 'function');
	});

	test('assertDeepEqual should invoke test', function() {
		var invoked;
		test_invoker.test = function() {
			invoked = true;
		}
		it.assertDeepEqual();
		assert(invoked);
	});

	test('assertNotDeepEqual should return object containing "it" function', function() {
		var retval = it.assertNotDeepEqual();
		assert(typeof retval.it == 'function');
	});

	test('assertNotDeepEqual should invoke test', function() {
		var invoked;
		test_invoker.test = function() {
			invoked = true;
		}
		it.assertNotDeepEqual();
		assert(invoked);
	});

	test('assertStrictEqual should return object containing "it" function', function() {
		var retval = it.assertStrictEqual();
		assert(typeof retval.it == 'function');
	});

	test('assertStrictEqual should invoke test', function() {
		var invoked;
		test_invoker.test = function() {
			invoked = true;
		}
		it.assertStrictEqual();
		assert(invoked);
	});

	test('assertNotStrictEqual should return object containing "it" function', function() {
		var retval = it.assertNotStrictEqual();
		assert(typeof retval.it == 'function');
	});

	test('assertNotStrictEqual should invoke test', function() {
		var invoked;
		test_invoker.test = function() {
			invoked = true;
		}
		it.assertNotStrictEqual();
		assert(invoked);
	});

	test('assertThrows should return object containing "it" function', function() {
		var retval = it.assertThrows();
		assert(typeof retval.it == 'function');

	});

	test('assertThrows should invoke test', function() {
		var invoked;
		test_invoker.test = function() {
			invoked = true;
		}
		it.assertThrows();
		assert(invoked);
	});

	test('assertDoesNotThrow should return object containing "it" function', function() {
		var retval = it.assertDoesNotThrow();
		assert(typeof retval.it == 'function');
	});

	test('assertDoesNotThrow should invoke test', function() {
		var invoked;
		test_invoker.test = function() {
			invoked = true;
		}
		it.assertDoesNotThrow();
		assert(invoked);
	});

})();

