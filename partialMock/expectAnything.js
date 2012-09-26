function expectAnything(index,mockContext) {
	var newHasArgument = require('./newHasArgument');
	var expectCore = require('./expectCore');

	var hasArgument = newHasArgument(index);
	return expectCore(hasArgument,index,mockContext);
}

module.exports = expectAnything;