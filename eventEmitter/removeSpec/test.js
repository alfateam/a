var assert = require('assert');

var sut = require('../remove');

describe('removeSpec', function(){
	

	describe('execute',function() {
		var context = {};
		var callback = {};
		var callback0 = {};
		var callback2 = {};
		var callbacks = [callback0,callback,callback2];
		context.callbacks = callbacks;
		

		sut(context,callback);
		
		it('should remove callback from callbacks',function() {			
			assert.equal(context.callbacks[0],callback0);
			assert.equal(context.callbacks[1],callback2);
			assert.equal(context.callbacks.length,2);
		});
	});

});
