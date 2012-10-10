var assert = require('assert');
var test = require('./test');
var requireMock = require('../../requireMock');
var sut = require('../execute_act');
var mock = require('../../strictMock');

(function() {

	console.log('when execute with no base');
	var nextExecute = requireMock('./execute_act');
	var act = mock();
	var c = {};
	var c2 = {};
	act.expect(c).return();	
	var returned = sut(act,c);

	test('it should execute act', function() {
		assert(act.verify());
	});

	test('it should return context', function() {
		assert.equal(returned,c);
	});

})();

(function() {

	console.log('when execute with base');
	var nextExecute = requireMock('./execute_act');
	var act = mock();
	var base = {};
	act.base = base;
	var c = {};
	var c2 = {};
	nextExecute.expect(base,c).return(c2);
	act.expect(c2).return();	
	var returned = sut(act,c);

	test('it should execute act', function() {
		assert(act.verify());
	});

	test('it should return context', function() {
		assert.equal(returned,c2);
	});

})();