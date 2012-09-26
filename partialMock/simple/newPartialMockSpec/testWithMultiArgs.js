var newSut = require('../newPartialMock');
var assert = require('assert');

		var originalReturnValue = {};
		var originalReturnValue2 = {};
		function original(actualArg1,actualArg2) {
			if (actualArg1 === arg1 && actualArg2 === arg2)
				return originalReturnValue2;
			if (actualArg1 === arg1)
				return originalReturnValue;
		}

		var foo ={};
		var baz = {};
		var arg1 = {};		
		var arg2 = {};


describe('partialMockSpec multiple args.2', function(){

	describe('expect arg1,arg2 return foo once.', function() {		
		
		var sut = newSut(original);
		var callBackCount = 0;
		function onCalled(actualArg1,actualArg2) {
			if ((actualArg1 === arg1) && (actualArg2 === arg2))
				callBackCount++;
		}

		sut.expect(arg1).expect(arg2).whenCalled(onCalled).return(foo);

		var firstReturned = sut(arg1);
		var secondReturned = sut(arg1,arg2);
		var thirdReturned = sut(arg1,arg2);

		it('execute returns original when second arg is wrong ', function(){
			assert.equal(originalReturnValue,firstReturned);
    	});

		it('execute returns foo when correct arguments', function(){
			assert.equal(foo,secondReturned);
    	});

		it('execute returns original when correct argument second time', function(){
			assert.equal(originalReturnValue2,thirdReturned);
    	});

		it('calls callBack once', function(){
			assert.equal(1,callBackCount);
    	});


	});	


});
