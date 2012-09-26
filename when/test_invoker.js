var reporter = require('./reporter');

function test(text, fn) {
	try {
		fn();
		reporter.ok(text);
	}
	catch(err) {
		reporter.fail(text, err.stack);
	}
}

module.exports = {
	test: test
};

