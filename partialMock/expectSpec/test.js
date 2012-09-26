var assert = require('assert');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var expectCore  = newRequireMock('./expectCore');
var newAreSameArgument = newRequireMock('./newHasSameArgument');

var sut = require('../expect');

describe('expect', function() {
	var mockContext = {};
	var areSameArgument = newMock();	
	var arg = 'arg';
	var arg2 = 'arg2';
	var index = 0;
	var nextExpect = {};
	var expected = {};

	stubAreSameArgument();
	stubExpectCore();
	stubNextExpect();

	function stubAreSameArgument() {
		newAreSameArgument.expect(arg).expect(index).return(areSameArgument);
	}

	function stubExpectCore() {
		expectCore.expect(areSameArgument).expect(index).expect(mockContext).return(nextExpect);
	}

	function stubNextExpect() {
		var expect = newMock();
		expect.expect(arg2).return(expected);
		nextExpect.expect = expect;
	}

	var returned = sut(index,mockContext,arg,arg2);

	it('should return expected',function() {
		assert.equal(expected,returned);
	});

});
