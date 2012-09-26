var assert = require('assert');

var newSut = require('../newTrueNTimesThenFalse');

describe('newTrueNTimesThenFalse', function(){

	describe('two times',function() {
		var times = 2;
		var sut = newSut(times);

		describe('execute three times',function(){
			var returned = sut();
			var returned2 = sut();
			var returned3 = sut();

			it('should return true first time',function() {
				assert.ok(returned);
			});

			it('should return true second time',function() {
				assert.ok(returned2);
			});

			it('should return false third time',function() {
				assert.equal(false,returned3);
			});

		});

	});

	describe ('undefined times',function() {
		var sut = newSut();		
		
		describe('execute n times',function(){
			var returned = sut();
			var returned2 = sut();
			var returned3 = sut();

			it('should return true first time',function() {
				assert.ok(returned);
			});

			it('should return true second time',function() {
				assert.ok(returned2);
			});

			it('should return true nth time',function() {
				assert.ok(returned3);
			});


		});

	});
});
