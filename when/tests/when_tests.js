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

	console.log('when called with act path');


	var suite_title = 'suite title';
	var act_path = 'act path';

	reporter.suite = mock();
	reporter.suite.expect(suite_title).return();

	var suite_name_builder = requireMock('./suite_name_builder');
	suite_name_builder.expect(act).return(suite_title);

	module.parent = {};

	var load_act = requireMock('./load_act');
	load_act.expect(module.parent, act_path).return(act);

	var execute_act = requireMock('./execute_act');
	execute_act.expect(act, c).return();

	var when = require('../when');
	var returned = when(act_path, c);

	test('it should execute loaded act with given context', function() {
		assert(execute_act.verify());
	});

	test('it returns an object with "it" function', function() {
		assert(returned.it === it);
	});

	test('it reports suite title', function() {
		assert(reporter.suite.verify());
	});

	test('it should have summary property from reporter', function() {
		assert(when.summary === summary);
	});

})();
