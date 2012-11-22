var assert = require('assert');
var test = require('./test');
var requireMock = require('../../requireMock');
var mock = require('../../strictMock');

var reporter = requireMock('./reporter');
var load_act = requireMock('./load_act');

(function() {

	console.log('when execute with no base');

	var nextExecute = requireMock('./execute_act');
	var act = mock();
	var c = {};
	var c2 = {};
	act.expect(c).return();


	var sut = require('../execute_act');
	var returned = sut(act,c);


	test('it should execute act', function() {
		assert(act.verify());
	});

	test('it should return context', function() {
		assert.equal(returned,c);
	});

})();

(function() {

	console.log('when execute with loaded base act');
	var nextExecute = requireMock('./execute_act');
	var act = mock();
	var base = function() {};
	act.base = base;
	var c = {};
	var c2 = {};
	nextExecute.expect(base,c).return(c2);
	act.expect(c2).return();

	reporter.warn = mock();
	reporter.warn.expect('deprecated: specify path to act.base instead of requiring it').return();


	var sut = require('../execute_act');
	var returned = sut(act,c);

	test('it should show deprecation warning', function() {
		assert(reporter.warn.verify());
	});

	test('it should execute act', function() {
		assert(act.verify());
	});

	test('it should return context', function() {
		assert.equal(returned,c2);
	});

})();


