var assert = require('assert');

var newSut = require('../emitterContext');

describe('newEmitterContext', function(){
	var returned = newSut();

	it('should set callbacks to empty array',function() {
		assert.equal(returned.callbacks.length,0);
	});
});
