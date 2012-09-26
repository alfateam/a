function create(originalFunc) {
	
	var candidateMock;
	var mockArray  = [];
	var curMock = {};
	var expectedArguments = [];
	curMock.whenCalledEmitter = emitter();
	var _arguments;

	function emitter() {
		var callback = function() {};
		var c = {};
		
		c.setSubscriber = function(subscriber) {
			callback = subscriber;
		}

		c.emit = function() {
			callback.apply(null,_arguments);	
		}
		return c;
	}

	function mock() {
		_arguments = arguments;
		for(var index = 0;index < mockArray.length;index++) {		
			candidateMock = mockArray[index];
			if (correctArgs()) {
				candidateMock.whenCalledEmitter.emit();
				negotiateRemove(index);
				return candidateMock.returnValue;
			}
		}
		return originalFunc.apply(null,_arguments);
	};

	function negotiateRemove(indexOfMock) {
		if (candidateMock.repeatAny)
			return;
		candidateMock.repeat--;
		if (candidateMock.repeat == 0)
			mockArray.splice(indexOfMock,1);
	}

	function correctArgs() {
		var expectedArguments = candidateMock.args;

		var length = expectedArguments.length;
		if (_arguments.length !== length)
			return false;
		for(var index = 0; index < length; index++) {
			if (!expectedArguments[index](_arguments[index])) {
				return false;
			}
		}
		return true;
	}
		
	mock.expect = function(argument) { 	
		if (typeof argument === 'undefined')
			return mock;
 		var argumentVerifier = sameArgumentVerifier(argument);		
		expectedArguments.push(argumentVerifier);
		return mock;
	};

	function sameArgumentVerifier(argument) {
		function verifyArgument(actualArgument) 
		{
			return actualArgument === argument;
		}
		return verifyArgument;
	}

	mock.expectAnything = function() {
		expectedArguments.push(verifyAnyArgument);
		return mock;
	}

	function verifyAnyArgument(arg) 
	{
		return true;
	}	

	mock.return = function(returnValue) {
		curMock.returnValue = returnValue;
		curMock.args = expectedArguments;
		curMock.repeat = 1;
		mockArray.push(curMock);
		curMock = {};		
		curMock.whenCalledEmitter = emitter();
		expectedArguments = [];

		return mock;		
	};

	mock.repeat = function(times) {
		lastMock().repeat = times-1;
	}

	mock.repeatAny = function() {
		lastMock().repeatAny = true;
	}

	mock.whenCalled = function(subscriber) {
		curMock.whenCalledEmitter.setSubscriber(subscriber);
		return mock;
	}

	function lastMock() {
		var length = mockArray.length;
		return mockArray[length-1];
	}

	return mock;
}

module.exports = create;


