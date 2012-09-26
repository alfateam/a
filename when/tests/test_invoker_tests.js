var assert = require('assert');
var test = require('./test');
var expect_require = require('../../expectRequire');
var reporter = {};
expect_require('./reporter').
return (reporter);

var sut = require('../test_invoker');

(function() {
	console.log('when test fails');

	var fail_text, fail_stack;

	reporter.fail = function(text, stack) {
		fail_text = text;
		fail_stack = stack;
	}
	var expected_text = 'expected_text';
	var expected_stack = {};
	var expected_error = {stack: expected_stack};
	
	sut.test(expected_text, function() {
		throw expected_error;
	});

	test('it should report fail', function() {
		assert.equal(fail_text, expected_text);
	});

	test('it should report stack', function() {
		assert.equal(fail_stack, expected_stack);
	})
})();

(function() {
	console.log('when test succeeds');

	var success_text;
	reporter.ok = function(text) {
		success_text = text;
	}
	var expected_text = 'expected_text';
	sut.test(expected_text, function() {});

	test('it should report success', function() {
		assert.equal(success_text, expected_text);
	});
})();

