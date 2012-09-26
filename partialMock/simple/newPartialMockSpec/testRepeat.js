var newSut = require('../newPartialMock');
var assert = require('assert');

		var originalReturnValue = {orig:''};
		function original() {
			return originalReturnValue;
		}

		var foo ={foo:''};
		var baz = {baz:''};		


describe('partialMockSpec.repeat.', function(){

	describe('expect return foo three times.', function() {		
		
		var sut = newSut(original);

		sut.expect().return(foo).repeat(3);

		var firstReturned = sut();
		var secondReturned = sut();
		var thirdReturned = sut();

		it('execute returns foo first time', function(){
			assert.equal(foo,firstReturned);
    	});

		it('execute returns foo second time', function(){
			assert.equal(foo,secondReturned);
    	});

		it('execute returns original third time', function(){
			assert.equal(originalReturnValue,thirdReturned);
    	});

	});

	describe('expect return foo any.', function() {		
		
		var sut = newSut(original);

		sut.expect().return(foo).repeatAny();

		var firstReturned = sut();
		var secondReturned = sut();
		var thirdReturned = sut();

		it('execute returns foo first time', function(){
			assert.equal(foo,firstReturned);
    	});

		it('execute returns foo second time', function(){
			assert.equal(foo,secondReturned);
    	});

		it('execute returns foo third time', function(){
			assert.equal(foo,thirdReturned);
    	});

	});



});
