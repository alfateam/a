var assert = require('assert');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var _return = newRequireMock('./return');
var newWhenCalledEmitter = newRequireMock('../eventEmitter');
var newHasNoMoreArguments = newRequireMock('./newHasNoMoreArguments');

var sut = require('../expectEmpty');


describe('expectEmpty', function(){
	var mockContext = {};
	var compositeAreCorrectArguments = newMock();
	var whenCalledEmitter = {}	;
	var hasCorrectArgument = {};
	var index = 0;
	var didAdd;

	stubHasNoMoreArguments();
	stubWhenCalledEmitter();
	stubMockContext();
	stubCompositeAreCorrectArguments();

	function stubHasNoMoreArguments() {
		newHasNoMoreArguments.expect(index).return(hasCorrectArgument);		
	}

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

	var sut2 = sut(mockContext);

	it('should add hasNoMoreArguments to compositeAreCorrectArguments',function() {
		assert.ok(didAdd);
	});

	it('should set mockContext.whenCalledEmitter',function() {
		assert.equal(mockContext.whenCalledEmitter,whenCalledEmitter);
	});

	describe('return',function() {
		var expected = {};
		var arg = {};
		_return.expect(arg).expect(index).expect(mockContext).return(expected);
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
