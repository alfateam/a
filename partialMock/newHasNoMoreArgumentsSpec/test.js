var assert = require('assert');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var newSut = require('../newHasNoMoreArguments');


describe('newHasNoMoreArguments', function() {
	var length = 1;

	var sut = newSut(length);

	describe('two arguments too much.execute',function() {
		var returned = sut('somearg','c','d');

		it('should return false',function() {
			assert.equal(false,returned);
		});
		
	});

	describe('one argument too much.execute',function() {
		var returned = sut('somearg','c');

		it('should return false',function() {
			assert.equal(false,returned);
		});
		
	});

	describe('correct number of arguments.execute',function() {
		var returned = sut('a');

		it('should return true',function() {
			assert.equal(true,returned);
		});
		
	});



});
