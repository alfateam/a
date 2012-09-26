var assert = require('assert');

var sut = require('../negotiateIncrementExpectCount');

describe('negotiateIncrementExpectCount',function() {

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

		it('should increment expectCount',function() {
			assert.equal(mockContext.expectCount,3);
		});
	});

});