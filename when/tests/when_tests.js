var assert = require('assert');
var test = require('./test');
var newRequireMock = require('../../requireMock');
var expect_require = require('../../expectRequire');

var it = function(title) {};
var summary = function() {};

var execute_act  = newRequireMock('./execute_act');
var reporter = newRequireMock('./reporter');
reporter.summary = summary;

var it_module = newRequireMock('./it');
it_module.it = it;

(function() {

	console.log('when called');

	var suite_title = 'suite title';
  	var act_name = 'act_name';

	var reported_title;
	reporter.suite = function(title) {
		reported_title = title;
	};

	var c = {};
	function act() {}

	var suite_name_builder = function(act_func) {

    if(act_func === act)
      return suite_title;
    return undefined;
	}

  expect_require('./suite_name_builder').return(suite_name_builder);
	act._name = act_name;

	var when = require('../when');
	execute_act.expect(act, c).return();

	var returned = when(act, c);


	test('it should execute act with given context', function() {
		assert(execute_act.verify());
	});

	test('it returns an object with "it" function', function() {
		assert(returned.it === it);
	});

	test('it reports suite title', function() {
		assert.equal(reported_title, suite_title);
	});

  test('it should have summary property from reporter', function() {
    assert(when.summary === summary);
  });

})();

