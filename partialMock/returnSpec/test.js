var assert = require('assert');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var setExecute = newRequireMock('./setExecute');
var expect  = newRequireMock('./expect');
var expectAnything  = newRequireMock('./expectAnything');
var newHasNoMoreArguments = newRequireMock('./newHasNoMoreArguments');

var sut = require('../return');

describe('return', function(){
	var mockContext = {};
	var hasNoMoreArguments = {};
	var returnValue = 'returnValue';
	var index = 'index';
	var expected = {};
	var didSetExecute;
	var compositeAreCorrectArguments  = 'compositeAreCorrectArguments';
	var oneTime = 1;

	stubHasNoMoreArguments();
	stubMockContext();
	stubSetExecute();

	function stubHasNoMoreArguments() {
		newHasNoMoreArguments.expect(index).return(hasNoMoreArguments);
	}

	function stubMockContext() {
		var compositeTemp = {};
		mockContext.compositeAreCorrectArguments = compositeTemp;
		var add = newMock();
		compositeTemp.add = add;
		add.expect(hasNoMoreArguments).return(compositeAreCorrectArguments);
	}

	function stubSetExecute() {
		setExecute.expect(returnValue).expect(compositeAreCorrectArguments).expect(mockContext).expect(oneTime).whenCalled(onSetExecute).return(null);
	}

	function onSetExecute() {
		didSetExecute = true;
	}

	var sut2 = sut(returnValue,index,mockContext);
	
	it('should set execute',function() {
		assert.ok(didSetExecute);
	});

	describe('expect',function() {
		var arg = {};
		var expected = {};
		expect.expect(arg).expect(0).expect(mockContext).return(expected);

		var returned = sut2.expect(arg);

		it('should return expected',function(){
			assert.equal(expected,returned);
		});
	});

	describe('expectAnything',function() {
		var expected = {};
		expectAnything.expect(0).expect(mockContext).return(expected);

		var returned = sut2.expectAnything();

		it('should return expected',function(){
			assert.equal(expected,returned);
		});
	});

	describe('repeat',function() {
		var didSetExecute;
		var expected = {};
		var times = 2;		
		setExecute.expect(returnValue).expect(compositeAreCorrectArguments).expect(mockContext).expect(times-1).whenCalled(onSetExecuteNTimes).return(null);

		function onSetExecuteNTimes() {
			didSetExecute = true;
		};

		var returned = sut2.repeat(times);

		it('should set execute',function() {
			assert.ok(didSetExecute);
		});

		it('should return self',function() {
			assert.equal(returned,sut2);
		});

	});


	describe('repeatAny',function() {
		var didSetExecute;
		var expected = {};
		setExecute.expect(returnValue).expect(compositeAreCorrectArguments).expect(mockContext).whenCalled(onSetExecuteNTimes).return(null);

		function onSetExecuteNTimes() {
			didSetExecute = true;
		};

		var returned = sut2.repeatAny();

		it('should set execute',function() {
			assert.ok(didSetExecute);
		});

		it('should return self',function() {
			assert.equal(returned,sut2);
		});

	});



});
