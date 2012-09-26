var assert = require('assert');

var newSut = require('../newTrueOnceThenFalse');

describe('newTrueOnceThenFalse', function(){

	var sut = newSut();

	describe('execute',function() {

		var returned = sut();
		
		it('should return true',function() {
			assert.equal(true,returned);
		});

		describe('execute',function() {

			var returned = sut();
			it('should return false',function() {
				assert.equal(false,returned);
			});
		});
	});
});
