function newExecute(returnValue,hasCorrectArguments,mockContext,shouldDecrementExpectCount) {	
	var _execute  = require('./execute');
	var _fallback = mockContext.originalFallback;
	var whenCalledEmitter = mockContext.whenCalledEmitter;

	function execute() {
		var args = [returnValue,_fallback,hasCorrectArguments,mockContext,shouldDecrementExpectCount,whenCalledEmitter];
		for(var index = 0; index < arguments.length; index++) {
			args.push(arguments[index]);
		}
		return _execute.apply(null,args);
		returnValue,fallback,hasCorrectArguments
	}

	execute.setFallback = function(fallback) {
		_fallback = fallback;
	};

	return execute;
}

module.exports = newExecute;