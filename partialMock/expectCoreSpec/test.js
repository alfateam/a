var assert = require('assert');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var expect  = newRequireMock('./expect');
var expectAnything = newRequireMock('./expectAnything');
var expectArray = newRequireMock('./expectArray');
var _return = newRequireMock('./return');
var newWhenCalledEmitter = newRequireMock('../eventEmitter');

var sut = require('../expectCore');


describe('expectCore', function(){
	var mockContext = {};
	var compositeAreCorrectArguments = newMock();
	var whenCalledEmitter = {}	;
	var hasCorrectArgument = {};
	var index = 1;
	var didAdd;

	stubWhenCalledEmitter();
	stubMockContext();
	stubCompositeAreCorrectArguments();

	function stubWhenCalledEmitter() {
		newWhenCalledEmitter.expect().return(whenCalledEmitter);		
	}

	function stubMockContext() {
		mockContext.compositeAreCorrectArguments = compositeAreCorrectArguments;		
	}

	function stubCompositeAreCorrectArguments() {
		var add = newMock();
		add.expect(hasCorrectArgument).whenCalled(onAdd).return(null);
		compositeAreCorrectArguments.add = add;		
	}

	function onAdd() {
		didAdd = true;
	}

	var sut2 = sut(hasCorrectArgument,index,mockContext);

	it('should add areSameArgument to compositeAreCorrectArguments',function() {
		assert.ok(didAdd);
	});

	it('should set mockContext.whenCalledEmitter',function() {
		assert.equal(mockContext.whenCalledEmitter,whenCalledEmitter);
	});


	describe('expect',function() {
		var expected = {};
		var arg = {};
		var arg2 = {};
		expect.expect(index+1).expect(mockContext).expect(arg).expect(arg2).return(expected);
		var returned = sut2.expect(arg,arg2); 

		it('should return expected',function() {
			assert.equal(expected,returned)
		});
	});

	describe('expectAnything',function() {
		var expected = {};
		var arg = {};
		expectAnything.expect(index+1).expect(mockContext).return(expected);
		var returned = sut2.expectAnything(); 

		it('should return expected',function() {
			assert.equal(expected,returned)
		});
	});

	describe('expectArray',function() {
		var expected = {};
		var arg = {};		
		expectArray.expect(index+1).expect(mockContext).expect(arg).return(expected);
		var returned = sut2.expectArray(arg); 

		it('should return expected',function() {
			assert.equal(expected,returned)
		});
	});

	describe('return',function() {
		var expected = {};
		var arg = {};
		_return.expect(arg).expect(index+1).expect(mockContext).return(expected);
		var returned = sut2.return(arg); 

		it('should return expected',function() {
			assert.equal(expected,returned)
		});
	});

	describe('whenCalled',function() {
		var callback = {};
		var expected;
		var add = newMock();
		whenCalledEmitter.add = add;
		var didAddCallback;
		add.expect(callback).whenCalled(onAddCallback).return();

		function onAddCallback() {
			didAddCallback = true;
		}

		mockContext.whenCalledEmitter = whenCalledEmitter;
				
		var returned = sut2.whenCalled(callback); 

		it('should add callback to whenCalledEmitter',function() {
			assert.ok(didAddCallback)
		});

		it('should return self',function() {
			assert.equal(returned,sut2);
		});
	});

});
