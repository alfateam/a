var assert = require('assert');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var newTrueNTimesThenFalse = newRequireMock('../newTrueNTimesThenFalse');
var and = newRequireMock('../and');
var newExecute = newRequireMock('./newExecute');
var negotiateIncrementExpectCount = newRequireMock('./negotiateIncrementExpectCount');

var sut = require('../setExecute');

describe('setExecute', function(){
	var mockContext = {};
	var returnValue = {};
	var hasCorrectArguments = {};
	var lastExecute = newMock();
	var compositeAreCorrectArguments = newMock();
	var finalHasCorrectArguments = {};
	var execute = {};
	var didSetFallback;
	var trueNTimesThenFalse = {};
	var times = {};
	var didNegotiateIncrementExpectCount;

	stubMockContext();
	stubTrueNTimesThenFalse();
	stubAnd();
	stubNewExecute();
	stubLastExecute();
	stubNegotiateIncrementExpectCount();

	function stubMockContext() {
		mockContext.lastExecute = lastExecute;
		mockContext.compositeAreCorrectArguments = compositeAreCorrectArguments;
	}

	function stubTrueNTimesThenFalse() {
		newTrueNTimesThenFalse.expect(times).return(trueNTimesThenFalse);
	}

	function stubAnd() {
		and.add = newMock();
		var and2 = newMock();
		and2.add = newMock();
		and2.add.expect(trueNTimesThenFalse).return(finalHasCorrectArguments);
		and.add.expect(compositeAreCorrectArguments).return(and2);
	}

	function stubNewExecute() {
		newExecute.expect(returnValue).expect(finalHasCorrectArguments).expect(mockContext).expect(times).return(execute);
	}

	function stubLastExecute() {
		var setFallback = newMock();
		setFallback.expect(execute).whenCalled(onSetFallback).return();
		lastExecute.setFallback = setFallback;
	}

	function stubNegotiateIncrementExpectCount() {
		negotiateIncrementExpectCount.expect(times).expect(mockContext).whenCalled(onNegotiateIncrementExpectCount).return(null);
	}

	function onNegotiateIncrementExpectCount() {
		didNegotiateIncrementExpectCount = true;
	}

	function onSetFallback() {
		didSetFallback = true;
	}

	sut(returnValue,hasCorrectArguments,mockContext,times);

	it('should set lastExecute',function() {
		assert.equal(execute,mockContext.lastExecute);
	});

	it('should set fallback on previousExecute',function() {
		assert.ok(didSetFallback);
	});

	it('should negotiateIncrementExpectCount',function() {
		assert.ok(didNegotiateIncrementExpectCount);
	});

});
