var assert = require('assert');

var sut = require('../negotiateDecrementExpectCount');

describe('negotiateDecrementExpectCount',function() {

	describe('times is undefined.execute', function(){

		var mockContext = {};		
		mockContext.expectCount = 2;
		var times;
		sut(times,mockContext);

		it('should not change expectCount',function() {
			assert.ok(mockContext.expectCount,2);
		});
	});
	
	describe('times is set.execute', function(){
		var mockContext = {};		
		mockContext.expectCount = 2;
		var times = 5;
		sut(times,mockContext);

		it('should decrement expectCount',function() {
			assert.equal(mockContext.expectCount,1);
		});
	});

});