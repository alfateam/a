var assert = require('assert');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var newSut = require('../newHasSameArgument');


describe('newHasSameArgument', function() {
	var expectedArg = {};
	var index = 1;
	
	var sut = newSut(expectedArg,index);

	describe('too few arguments.execute',function() {
		var returned = sut('somearg');

		it('should return false',function() {
			assert.equal(false,returned);
		});
		
	});

	describe('incorrect argument.execute',function() {
		var returned = sut('arg','arg2');

		it('should return false',function() {
			assert.equal(false,returned);
		});

	});

	describe('correct argument.execute',function() {
		var returned = sut('arg',expectedArg);

		it('should return true',function() {
			assert.equal(true,returned);
		});

	});


});
