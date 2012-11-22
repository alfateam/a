var assert = require('assert');
var newMock = require('../partialMock/simple/newMock');
var newRequireMock = require('../partialMock/simple/newRequireMock');

var expectAnything = newRequireMock('./partialMock/expectAnything');
var expect = newRequireMock('./partialMock/expect');
var newMockContext = newRequireMock('./partialMock/newMockContext');
var verify = newRequireMock('./partialMock/verify');
var expectEmpty = newRequireMock('./partialMock/expectEmpty');
var expectArray = newRequireMock('./partialMock/expectArray');
var newMutableAnd = newRequireMock('./newMutableAnd')
var newSut = require('../partialMock');
var mutableAnd = {};

function fallback() {}

describe('partialMock', function(){
	var sut;
	var fallbackMock;
	var mockContext;
	function createSut() {
		stubMockContext();

		function stubMockContext() {
			mockContext = {};
			newMockContext.expect(fallback).return(mockContext);
		}

		sut = newSut(fallback);
	}
	createSut();

	describe('execute',function() {
		var arg = {};
		var expected = {};		
		var execute = newMock();
		execute.expect(arg).return(expected);
		mockContext.execute = execute;
		var returned = sut(arg);

		it('should return expected',function() {
			assert.equal(expected,returned);
		});

	});
	

	describe('expect',function() {
		var expected = {};
		mockContext.compositeAreCorrectArguments = null;
		var arg = 'arg';
		var arg2 = 'arg2';
		newMutableAnd.expect().return(mutableAnd);
		expect.expect(0).expect(mockContext).expect(arg).expect(arg2).return(expected);
		var returned = sut.expect(arg,arg2); 

		it('should set mockContext.compositeAreCorrectArguments to mutableAnd',function() {
			assert.equal(mutableAnd,mockContext.compositeAreCorrectArguments);
		});

		it('should return expected',function() {
			assert.equal(expected,returned)
		});


	});

	describe('expect empty',function() {
		var expected = {};
		mockContext.compositeAreCorrectArguments = null;
		newMutableAnd.expect().return(mutableAnd);
		expectEmpty.expect(mockContext).return(expected);
		var returned = sut.expect(); 
		
		it('should set mockContext.compositeAreCorrectArguments to mutableAnd',function() {
			assert.equal(mutableAnd,mockContext.compositeAreCorrectArguments);
		});

		it('should return expected',function() {
			assert.equal(expected,returned)			
		});

	});


	describe('expectAnything',function() {
		var expected = {};
		mockContext.compositeAreCorrectArguments = null;
		newMutableAnd.expect().return(mutableAnd);
		expectAnything.expect(0).expect(mockContext).return(expected);
		var returned = sut.expectAnything(); 

		it('should set mockContext.compositeAreCorrectArguments to mutableAnd',function() {
			assert.equal(mutableAnd,mockContext.compositeAreCorrectArguments);
		});

		it('should return expected',function() {
			assert.equal(expected,returned)
		});
	});

	describe('verify',function() {
		var expected = {};
		verify.expect(mockContext).return(expected);
		var returned = sut.verify();

		it('should return expected',function() {
			assert.equal(expected,returned)
		});
	});

	describe('expectArray',function() {
		var expected = {};		
		mockContext.compositeAreCorrectArguments = null;
		var array = [];		
		newMutableAnd.expect().return(mutableAnd);
		expectArray.expect(0).expect(mockContext).expect(array).return(expected);
		var returned = sut.expectArray(array); 

		it('should set mockContext.compositeAreCorrectArguments to mutableAnd',function() {
			assert.equal(mutableAnd,mockContext.compositeAreCorrectArguments);
		});

		it('should return expected',function() {
			assert.equal(expected,returned)
		});
	});


});
