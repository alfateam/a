var assert = require('assert');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var newFallbackWrapper = newRequireMock('./newFallbackWrapper');
var newMutableAnd = newRequireMock('../newMutableAnd');

var newSut = require('../newMockContext');

describe('newMockContext', function() {
	var originalFallback = {};
	var fallbackWrapper = {};
	var passedContext;
	var mutableAnd = {};
	newFallbackWrapper.expect(originalFallback).return(fallbackWrapper);
	newMutableAnd.expect().return(mutableAnd);
	
	var sut = newSut(originalFallback);

	it('should set execute to fallbackWrapper',function() {
		assert.equal(sut.execute,fallbackWrapper);
	});

	it('should set originalFallback',function() {
		assert.equal(sut.originalFallback,originalFallback);
	});

	it('should set compositeAreCorrectArguments',function() {
		assert.equal(sut.compositeAreCorrectArguments,mutableAnd);
	});

	it('should set lastExecute',function() {
		assert.equal(sut.lastExecute,fallbackWrapper);
	});

	it('should set expectCount to zero',function() {
		assert.equal(sut.expectCount,0);
	});
});
