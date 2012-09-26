var assert = require('assert');

var sut = require('../add');

describe('addSpec', function(){
	

	describe('execute',function() {
		var context = {};
		var callbacks = [{}];
		context.callbacks = callbacks;
		var callback = {};

		sut(context,callback);
		
		it('should add callback to callbacks',function() {
			assert.equal(callbacks[1],callback);
		});
	});

});
