var newPartialMock = require('./partialMock');
var throwUnexpected = require('./mock/throwUnexpectedArguments');

function create() {
	return newPartialMock(throwUnexpected);	
}

module.exports  = create;


