function _return(returnValue,index,mockContext) {
	var newHasNoMoreArguments = require('./newHasNoMoreArguments');
	var setExecute = require('./setExecute');
	var expect = require('./expect');
	var expectAnything = require('./expectAnything');
	var oneTime = 1;

	var hasNoMoreArguments = newHasNoMoreArguments(index);	
	var hasCorrectArgs = mockContext.compositeAreCorrectArguments.add(hasNoMoreArguments);
	setExecute(returnValue,hasCorrectArgs,mockContext,oneTime);	
	var c = {};

	c.expect = function(arg) {
		return expect(arg,0,mockContext);
	};


	c.expectAnything = function() {
		return expectAnything(0,mockContext);
	};

	c.repeat = function(times) {
		setExecute(returnValue,hasCorrectArgs,mockContext,times-1);	
		return c;
	};

	c.repeatAny = function() {
		setExecute(returnValue,hasCorrectArgs,mockContext);	
		return c;
	};

	return c;
}

module.exports = _return;