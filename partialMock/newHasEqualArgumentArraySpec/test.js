var assert = require('assert');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var newSut = require('../newHasEqualArgumentArray');


describe('newHasEqualArgumentArray', function() {
	var expectedElement1 = {};
	var expectedElement2 = {};
	var expectedArg = [expectedElement1,expectedElement2];
	var index = 1;
	
	var sut = newSut(expectedArg,index);

	describe('too few arguments.execute',function() {
		var returned = sut('arg');

		it('should return false',function() {
			assert.equal(false,returned);
		});
		
	});

	describe('incorrect argument.execute',function() {
		var returned = sut('arg',[expectedElement1,'wrongElement']);

		it('should return false',function() {
			assert.equal(false,returned);
		});

	});

	describe('incorrect arrayLength.execute',function() {
		var returned = sut('arg',[expectedElement1,expectedElement2,'off-by-one']);

		it('should return false',function() {
			assert.equal(false,returned);
		});

	});


	describe('correct argument.execute',function() {
		var returned = sut('arg',[expectedElement1,expectedElement2]);

		it('should return true',function() {
			assert.equal(true,returned);
		});

	});


});
