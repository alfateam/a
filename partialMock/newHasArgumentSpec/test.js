var assert = require('assert');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var newSut = require('../newHasArgument');


describe('newHasArgument', function() {
	var index = 1;
	
	var sut = newSut(index);

	describe('no arg.execute',function() {
		var returned = sut('a');

		it('should return false',function() {
			assert.equal(false,returned);
		});
		
	});


	describe('correct argument.execute',function() {
		var returned = sut('a','b');

		it('should return true',function() {
			assert.equal(true,returned);
		});

	});


});
