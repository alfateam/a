var assert = require('assert');
var newRequireMock = require('../../partialMock/simple/newRequireMock');
var newMock = require('../../partialMock/simple/newMock');

var newBinaryAnd = newRequireMock('./newBinaryAnd');
var binaryResult = newRequireMock('./binaryResult');
var newSut = require('../newBinaryAnd');


describe('newBinaryAnd', function(){
	var predicate = newMock();
	var predicate2 = newMock();
	var sut = newSut(predicate,predicate2);

	describe('execute',function() {
		var arg = {};
		var expected = {};
		var predicate1Result = {};
		var predicate2Result = {};
		predicate.expect(arg).return(predicate1Result);
		predicate2.expect(arg).return(predicate2Result)
		binaryResult.expect(predicate1Result).expect(predicate2Result).return(expected);
		
		var returned = sut(arg);

		it('returns expected',function() {
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

