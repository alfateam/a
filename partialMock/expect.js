function expect(index,mockContext) {	
	var newAreSameArgument = require('./newHasSameArgument');
	var expectCore = require('./expectCore');
	var arg = arguments[2];
	var areSameArgument = newAreSameArgument(arg,index);	
	var nextExpect =  expectCore(areSameArgument,index,mockContext);
	for (var i = 3; i < arguments.length; i++) {
		var argument = arguments[i];
		nextExpect = nextExpect.expect(argument);
	};
	return nextExpect;
}

module.exports = expect;