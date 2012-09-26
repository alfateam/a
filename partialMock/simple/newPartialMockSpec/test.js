var newSut = require('../newPartialMock');
var assert = require('assert');

		var originalReturnValue = {orig:''};
		function original() {
			return originalReturnValue;
		}

		var foo ={foo:''};
		var baz = {baz:''};		


describe('partialMockSpec', function(){

	describe('expect return foo once.', function() {		
		
		var sut = newSut(original);

		sut.expect().return(foo);

		var firstReturned = sut();
		var secondReturned = sut();
		var thirdReturned = sut();

		it('execute returns foo first time', function(){
			assert.equal(foo,firstReturned);
    	});

		it('execute returns original second time', function(){
			assert.equal(originalReturnValue,secondReturned);
    	});

		it('execute returns original third time', function(){
			assert.equal(originalReturnValue,thirdReturned);
    	});

	});

	describe('expect return foo twice.', function() {		
		
		var sut = newSut(original);
		sut.expect().return(foo);
		sut.expect().return(foo);

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


	describe('expect return foo then baz.', function() {		
		
		var sut = newSut(original);
		sut.expect().return(foo);
		sut.expect().return(baz);

		var firstReturned = sut();
		var secondReturned = sut();
		var thirdReturned = sut();

		it('execute returns foo first time', function(){
			assert.equal(foo,firstReturned);
    	});

		it('execute returns baz second time', function(){
			assert.equal(baz,secondReturned);
    	});

		it('execute returns original third time', function(){
			assert.equal(originalReturnValue,thirdReturned);
    	});

	});

	describe('expect return when argument is undefined.', function() {		
				
		var sut = newSut(original);
		var arg = {};
		var someUndefined;
		sut.expect(arg).expectAnything().return(foo);
		sut.expect().return(baz);

		var firstReturned = sut(arg);
		var secondReturned = sut(arg,someUndefined);
		var thirdReturned = sut(arg,someUndefined);

		it('execute returns original first time', function(){
			assert.equal(originalReturnValue,firstReturned);
    	});

		it('execute returns foo second time', function(){
			assert.equal(foo,secondReturned);
    	});

		it('execute returns original third time', function(){
			assert.equal(originalReturnValue,thirdReturned);
    	});

	});


});
