function expectEmpty(mockContext) {
	var _return = require('./return');
	mockContext.whenCalledEmitter = require('../eventEmitter')();
	var hasCorrectArgument = require('./newHasNoMoreArguments')(0);
	
	var c = {};
	mockContext.compositeAreCorrectArguments.add(hasCorrectArgument);

	c.return = function(arg) {
		return _return(arg,0,mockContext);
	};

	c.whenCalled = function(callback) {
		mockContext.whenCalledEmitter.add(callback);
		return c;
	};

	return c;
}

module.exports = expectEmpty;