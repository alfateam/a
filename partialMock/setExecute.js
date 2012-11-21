function setExecute(returnValue,hasCorrectArguments,mockContext,times) {	
	var and  = require('../and');
	var trueNTimesThenFalse = require('../newTrueNTimesThenFalse')(times);
	var newExecute = require('./newExecute');
	var negotiateIncrementExpectCount = require('./negotiateIncrementExpectCount');
	var emptyAnd = require('../newMutableAnd')();
	
	and = and.add(mockContext.compositeAreCorrectArguments);
	and = and.add(trueNTimesThenFalse);
	var lastExecute = mockContext.lastExecute;
	var execute = newExecute(returnValue,and,mockContext,times);
	mockContext.lastExecute = execute;
	lastExecute.setFallback(execute);
	negotiateIncrementExpectCount(times,mockContext);
	mockContext.compositeAreCorrectArguments = emptyAnd;
}

module.exports = setExecute;