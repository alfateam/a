var assert = require('assert');
var newRequireMock = require('../../partialMock/simple/newRequireMock');
var newMock = require('../../partialMock/simple/newMock');

var newBinaryAnd = newRequireMock('./newBinaryAnd');
var newSut = require('../newBinaryAnd');


describe('newBinaryAnd', function(){
	var predicate = newMock();
	var predicate2 = newMock();
	var sut = newSut(predicate,predicate2);

	describe('execute when predicate1 returns false',function() {
		var arg = {};
		predicate.expect(arg).return(false);		
		var returned = sut(arg);

		it('returns false',function() {
			assert.equal(false,returned);
		});
	});

	describe('execute when predicate1 returns true, predicate2 returns false',function() {
		var arg = {};
		predicate.expect(arg).return(true);		
		predicate2.expect(arg).return(false);		
		var returned = sut(arg);

		it('returns false',function() {
			assert.equal(false,returned);
		});
	});

	describe('execute when predicate1 returns true, predicate2 returns true',function() {
		var arg = {};
		predicate.expect(arg).return(true);		
		predicate2.expect(arg).return(true);		
		var returned = sut(arg);

		it('returns false',function() {
			assert.equal(true,returned);
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

