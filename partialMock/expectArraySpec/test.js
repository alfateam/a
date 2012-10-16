var assert = require('assert');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var expectCore  = newRequireMock('./expectCore');
var newHasEqualArgumentArray = newRequireMock('./newHasEqualArgumentArray');

var sut = require('../expectArray');

describe('expect', function() {
	var mockContext = {};
	var isCorrectArgument = newMock();	
	var argArray = []; 
	var index = 0;
	var expected = {};

	stubHasEqualArgumentArray();
	stubExpectCore();

	function stubHasEqualArgumentArray() {
		newHasEqualArgumentArray.expect(argArray).expect(index).return(isCorrectArgument);
	}

	function stubExpectCore() {
		expectCore.expect(isCorrectArgument).expect(index).expect(mockContext).return(expected);
	}

	var returned = sut(index,mockContext,argArray);

	it('should return expected',function() {
		assert.equal(expected,returned);
	});

});
