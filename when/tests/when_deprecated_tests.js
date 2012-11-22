var assert = require('assert');
var test = require('./test');

var requireMock = require('../../requireMock');
var mock = require('../../mock');

var it = function(title) {};
var summary = function() {};
var c = {};
function act() {}

var reporter = requireMock('./reporter');
reporter.summary = summary;


var it_module = requireMock('./it');
it_module.it = it;


(function() {

	console.log('when called');


	var suite_title = 'suite title';

	reporter.suite = mock();
	reporter.suite.expect(suite_title).return();

	reporter.warn = mock();
	reporter.warn.expect('deprecated: use path to act instead of loading it yourself').return();

	var suite_name_builder = requireMock('./suite_name_builder');
	suite_name_builder.expect(act).return(suite_title);

	var execute_act  = requireMock('./execute_act');
	execute_act.expect(act, c).return();

	var when = require('../when');
	var returned = when(act, c);


	test('it should execute act with given context', function() {
		assert(execute_act.verify());
	});

	test('it returns an object with "it" function', function() {
		assert(returned.it === it);
	});

	test('it reports suite title', function() {
		assert(reporter.suite.verify());
	});

	test('it should show deprecation message', function() {
		assert(reporter.warn.verify());
	});

	test('it should have summary property from reporter', function() {
		assert(when.summary === summary);
	});

})();

