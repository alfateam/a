var assert = require('assert');
var newMock = require('../partialMock/simple/newMock');
var newSut = require('../partialMock');

var fallbackValue = 'fallbackValue';


function fallback(arg,arg2)
{
	return fallbackValue;
}

describe('partialMock', function(){

	it('should return expected given stubbed twice with repeat',function() {
		var arg = 'a';
		var arg2 = 'b';
		var expected = {};
		var expected2 = expected;
		var expected3 = {};
		var sut = newSut(fallback);
		sut.expect(arg).return(expected).repeat(2);
		sut.expect(arg2).return(expected3);

		var returned = sut(arg);				
		var returned2 = sut(arg);
		var returned3 = sut(arg2);				
		var returned4 = sut(arg);

		assert.equal(returned,expected);
		assert.equal(returned2,expected2);
		assert.equal(returned3,expected3);
		assert.equal(returned4,fallbackValue);
	});


	it('should return expected given stubbed twice',function() {
		var arg = 'a';
		var arg2 = 'b';
		var expected = {};
		var expected2 = {};
		var sut = newSut(fallback);
		sut.expect(arg).return(expected);
		sut.expect(arg2).return(expected2);
		var returned = sut(arg);		
		var returned2 = sut(arg2);
		assert.equal(returned,expected);
		assert.equal(returned2,expected2);
	});

	it('should return expected given stubbed twice and called unordered',function() {
		var arg = 'a';
		var arg2 = 'b';
		var expected = {};
		var expected2 = {};
		var sut = newSut(fallback);
		sut.expect(arg).return(expected);
		sut.expect(arg2).return(expected2);
		var returned2 = sut(arg2);
		var returned = sut(arg);		
		assert.equal(returned,expected);
		assert.equal(returned2,expected2);
	});


	it('should return expected for correct arg',function() {
		var arg = 'a';
		var expected = {};
		var sut = newSut(fallback);
		sut.expect(arg).return(expected);
		var returned = sut(arg);
		var returned2 = sut(arg);
		assert.equal(returned,expected);
		assert.equal(returned2,fallbackValue);
	});

	it('should return expected for expected array',function() {
		var element1 = 'a';
		var element2 = 'b';
		var expected = {};
		var sut = newSut(fallback);
		sut.expectArray([element1,element2]).return(expected);
		var returned = sut([element1,element2]);
		var returned2 = sut([element1,element2]);
		assert.equal(returned,expected);
		assert.equal(returned2,fallbackValue);
	});


	it('should return expected for correct arg,arg2',function() {
		var arg = 'a';
		var arg2 = 'b';
		var expected = {};
		var sut = newSut(fallback);
		sut.expect(arg).expect(arg2).return(expected);
		var returned = sut(arg,arg2);
		var returned2 = sut(arg,arg2);

		assert.equal(returned,expected);
		assert.equal(returned2,fallbackValue);
		assert.ok(sut.verify());
	});

	it('should return expected for correct arg,arg2.repeat twice',function() {
		var arg = 'a';
		var arg2 = 'b';
		var expected = {};
		var repeats = 2;
		var sut = newSut(fallback);

		sut.expect(arg).expect(arg2).return(expected).repeat(repeats);
		var returned = sut(arg,arg2);
		var returned2 = sut(arg,arg2);
		var returned3 = sut(arg,arg2);

		assert.equal(returned,expected);
		assert.equal(returned2,expected);
		assert.equal(returned3,fallbackValue);
		assert.ok(sut.verify());
	});

	it('should return expected for correct arg,arg2.repeat any',function() {
		var arg = 'a';
		var arg2 = 'b';
		var expected = {};
		var sut = newSut(fallback);

		sut.expect(arg).expect(arg2).return(expected).repeatAny();
		var returned = sut(arg,arg2);		
		var returned2 = sut(arg,arg2);
		var returned3 = sut(arg,arg2);

		assert.equal(returned,expected);
		assert.equal(returned2,expected);
		assert.equal(returned3,expected);
		assert.ok(sut.verify());
	});

	it('should invoke whenCalled for correct arg,arg2.repeat twice',function() {
		var arg = 'a';
		var arg2 = 'b';
		var expected = {};
		var onWhenCalled = newMock();
		var numberOfInvokes  = 0;
		onWhenCalled.expect(arg).expect(arg2).whenCalled(onDidInvoke).return();
		onWhenCalled.expect(arg).expect(arg2).whenCalled(onDidInvoke).return();

		function onDidInvoke() {
			numberOfInvokes++;
		}

		var sut = newSut(fallback);

		sut.expect(arg).expect(arg2).whenCalled(onWhenCalled).return(expected).repeat(2);
		var returned = sut(arg,arg2);		
		var returned2 = sut(arg,arg2);
		var returned3 = sut(arg,arg2);

		assert.equal(numberOfInvokes,2);
	});

	it('should return expected for multiExpect arg,arg2',function() {
		var arg = 'a';
		var arg2 = 'b';
		var arg3 = '3';
		var expected = {};
		var sut = newSut(fallback);

		sut.expect(arg,arg2).expect(arg3).return(expected).repeat(2);
		var returned = sut(arg,arg2,arg3);		
		var returned2 = sut(arg,arg2,arg3);
		var returned3 = sut(arg,arg2,arg3);

		assert.equal(returned,expected);
		assert.equal(returned2,expected);
		assert.equal(returned3,fallbackValue);
		assert.ok(sut.verify());
	});

	it('should return expected for arg, anything',function() {
		var arg = 'a';
		var arg2 = 'b';
		var arg3;
		var expected = {};
		var sut = newSut(fallback);


		sut.expect(arg).expectAnything().expectAnything().return(expected);
		var returned = sut(arg,arg2,arg3);		
		var returned2 = sut(arg,arg2,arg3);

		assert.equal(returned,expected);
		assert.equal(returned2,fallbackValue);
		assert.ok(sut.verify());
	});


	it('should return expected for void',function() {
		var expected = {};
		var sut = newSut(fallback);

		function fallback() {
			if (arguments.length != 0)
				throw 'expected no args';
			return fallbackValue;
		}

		sut.expect().return(expected);
		var returned = sut();		
		var returned2 = sut();

		assert.equal(returned,expected);
		assert.equal(returned2,fallbackValue);
		assert.ok(sut.verify());
	});

	it('should return expected for undefined',function() {
		var expected = {};
		var sut = newSut(fallback);

		function fallback() {
			if (arguments.length != 1)
				throw 'expected no args';
			return fallbackValue;
		}

		sut.expect(undefined).return(expected);
		var returned = sut(undefined);		
		var returned2 = sut(undefined);

		assert.equal(returned,expected);
		assert.equal(returned2,fallbackValue);
		assert.ok(sut.verify());
	});


});
