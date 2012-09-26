var assert = require('assert');

var sut = require('../verify');

describe('verifySpec',function() {

	describe('expectCount is zero.execute', function(){

		var mockContext = {};
		mockContext.expectCount = 0;
		var returned = sut(mockContext);

		it('should return true',function() {
			assert.ok(returned);
		});
	});
	
	describe('expectCount is above zero.execute', function(){

		var mockContext = {};
		mockContext.expectCount = 2;
		var msg;
		try	{
			var returned = sut(mockContext);	
		}
		catch(err) {
			msg = err;
		}
		

		it('should throw mock has 2 pending functions',function() {
			assert.equal(msg,'mock has 2 pending functions');
		});
	});



});