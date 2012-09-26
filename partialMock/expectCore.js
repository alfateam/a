function expect(hasCorrectArgument,index,mockContext) {
	var expect = require('./expect');
	var expectAnything = require('./expectAnything');
	var _return = require('./return');
	mockContext.whenCalledEmitter = require('../eventEmitter')();


	var c = {};
	mockContext.compositeAreCorrectArguments.add(hasCorrectArgument);

	c.expect = function() {
		var args = [index+1,mockContext];
		for (var i = 0; i < arguments.length; i++) {
			args.push(arguments[i]);
		};
		return expect.apply(null,args);
	};

	c.expectAnything = function() {
		return expectAnything(index+1,mockContext);
	};

	c.return = function(arg) {
		return _return(arg,index+1,mockContext);
	};

	c.whenCalled = function(callback) {
		mockContext.whenCalledEmitter.add(callback);
		return c;
	};

	return c;
}

module.exports = expect;