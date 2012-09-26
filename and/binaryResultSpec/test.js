var assert = require('assert');

var sut = require('../binaryResult');

describe('binaryResult', function(){
	

	describe('false false',function() {

		var returned = sut(false,false);
		
		it('returns false',function() {
			assert.equal(returned,false);
		});
	});


	describe('false true',function() {

		var returned = sut(false,true);
		
		it('returns false',function() {
			assert.equal(returned,false);	
		});
	});


	describe('true false',function() {

		var returned = sut(true,false);
		
		it('returns false',function() {
			assert.equal(returned,false);
		});
	});


	describe('true true',function() {

		var returned = sut(true,true);
		
		it('returns true',function() {
			assert.ok(returned);
		});
	});



});
