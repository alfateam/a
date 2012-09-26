function _new(originalFallback) {
	var newFallbackWrapper = require('./newFallbackWrapper');
	var and = require('../newMutableAnd')();
	var mockContext = {};	
	mockContext.execute = newFallbackWrapper(originalFallback);
	mockContext.originalFallback = originalFallback;
	mockContext.lastExecute = mockContext.execute;
	mockContext.compositeAreCorrectArguments = and;
	mockContext.expectCount = 0;

	return mockContext;
}

module.exports = _new;