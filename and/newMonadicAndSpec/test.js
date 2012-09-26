var assert = require('assert');
var newRequireMock = require('../../partialMock/simple/newRequireMock');
var newMock = require('../../partialMock/simple/newMock');

var newBinaryAnd = newRequireMock('./newBinaryAnd');
var newSut = require('../newMonadicAnd');


describe('newMonadicAnd', function(){
	var predicate = newMock();	
	var sut = newSut(predicate);


	describe('execute',function() {
		var arg = {};
		var expected = {};
		predicate.expect(arg).return(expected);
		
		var returned = sut(arg);

		it('returns expected from predicate',function() {
			assert.equal(expected,returned);
		});
	});


	describe('add',function() {
		
		var binaryAnd = {};
		var predicate = {};
		var predicate2 = {};
		var expected = {};
		newBinaryAnd.expect(sut).expect(predicate).return(binaryAnd);
		newBinaryAnd.expect(binaryAnd).expect(predicate2).return(expected);
		
		var returned = sut.add(predicate,predicate2);

		it('returns expected',function() {
			assert.equal(expected,returned);
		});
	});

});

