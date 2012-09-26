var assert = require('assert');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');



describe('requireExecute',function() {

	describe('correct arguments.execute', function(){
		var sut = require('../execute');
		var returnValue = {};
		var fallback = newMock();
		var hasCorrectArguments =  newMock();
		var mockContext = {};
		var didEmitWhenCalled;		
		var negotiateDecrementExpectCount = newRequireMock('./negotiateDecrementExpectCount');		
		var shouldDecrement = {};
		var didDecrement;
		var whenCalledEmitter = {};
		negotiateDecrementExpectCount.expect(shouldDecrement).expect(mockContext).whenCalled(onDecrement).return(null);				

		function onDecrement() {
			didDecrement = true;
		}		

		var arg = {};
		var arg2 = {};
		hasCorrectArguments.expect(arg).expect(arg2).return(true);
		mockContext.expectCount = 2;
		stubWhenCalledEmitter()

		function stubWhenCalledEmitter() {			
			var emit = newMock();
			whenCalledEmitter.emit = emit;
			mockContext.whenCalled = whenCalledEmitter;
			emit.expect(arg).expect(arg2).whenCalled(onWhenCalled).return();
		}

		function onWhenCalled() {
			didEmitWhenCalled = true;
		}

		var returned =  sut(returnValue,fallback,hasCorrectArguments,mockContext,shouldDecrement,whenCalledEmitter,arg,arg2);

		it('should emit whenCalled',function() {
			assert.ok(didEmitWhenCalled);
		});	
		
		it('should negotiate DecrementExpectCount',function() {
			assert.ok(didDecrement);
		});	

		it('should return returnValue',function() {
			assert.equal(returnValue,returned);
		});

	});
	
	describe('incorrect arguments.execute', function(){

		var sut = require('../execute');
		var returnValue = {};
		var whenCalledEmitter = {};
		var fallback = newMock();
		var hasCorrectArguments =  newMock();
		var mockContext = {};
		var negotiateDecrementExpectCount = newRequireMock('./negotiateDecrementExpectCount');		
		var shouldDecrement;

		var arg = {};
		var arg2 = {};
		hasCorrectArguments.expect(arg).expect(arg2).return(false);
		var expected = {};		
		fallback.expect(arg).expect(arg2).return(expected);
		mockContext.expectCount = 2;
	
		var returned =  sut(returnValue,fallback,hasCorrectArguments,mockContext,shouldDecrement,whenCalledEmitter,arg,arg2);
		
		it('should return result from fallback',function() {
			assert.equal(expected,returned);
		});


	});

});