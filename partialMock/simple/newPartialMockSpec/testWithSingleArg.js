var newSut = require('../newPartialMock');
var assert = require('assert');

		var originalReturnValue = {};
		function original() {
			return originalReturnValue;
		}

		var foo ={};
		var baz = {};
		var arg1 = {};		


describe('partialMockSpec', function(){

	describe('expect return foo once.', function() {		
		
		var sut = newSut(original);
require('../newPartialMock')(function() {});
		sut.expect(arg1).return(foo);
		var s = require('../newPartialMock')(function() {});
		var firstReturned = sut({});
		var secondReturned = sut(arg1);
		var thirdReturned = sut(arg1);

		it('execute returns original when wrong argument', function(){
			assert.equal(originalReturnValue,firstReturned);
    	});

		it('execute returns foo when correct argument', function(){
			assert.equal(foo,secondReturned);
    	});

		it('execute returns original when correct argument second time', function(){
			assert.equal(originalReturnValue,thirdReturned);
    	});

	});

	describe('expect return foo twice.', function() {		
		
		var sut = newSut(original);
		sut.expect(arg1).return(foo);
		sut.expect(arg1).return(foo);

		var firstReturned = sut(arg1);
		var secondReturned = sut(arg1);
		var thirdReturned = sut(arg1);

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


	describe('expect return foo then baz', function() {		
		
		var sut = newSut(original);
		sut.expect().return(foo);
		sut.expect(arg1).return(baz);

		var firstReturned = sut();
		var secondReturned = sut(arg1);
		var thirdReturned = sut(arg1);

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

	describe('expect anything return foo, then expect arg1 return baz.', function() {		
		
		var sut = newSut(original);
		sut.expectAnything().return(foo);
		sut.expect(arg1).return(baz);

		var firstReturned = sut('abc');
		var secondReturned = sut('abc');
		var thirdReturned = sut(arg1);

		it('execute returns foo first time', function(){
			assert.equal(foo,firstReturned);
    	});

		it('execute returns original second time', function(){
			assert.equal(originalReturnValue,secondReturned);
    	});

		it('execute returns baz third time', function(){
			assert.equal(baz,thirdReturned);
    	});

	});



});
