function expectArray(index,mockContext,array) {	
	var newHasEqualArgumentArray = require('./newHasEqualArgumentArray');
	var expectCore = require('./expectCore');
	var isCorrectArgument = newHasEqualArgumentArray(array,index);	
	return expectCore(isCorrectArgument,index,mockContext);
}

module.exports = expectArray;