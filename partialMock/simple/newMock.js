var newPartialMock = require('./newPartialMock');
var throwUnexpected = require('./newMock/throwUnexpectedArguments');

function create() {
	return newPartialMock(throwUnexpected);	
}

module.exports  = create;


