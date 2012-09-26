var assert = require('assert');
var expectRequire = require('../partialMock/simple/expectRequire');
var newMockCore = require('../partialMock/simple/newPartialMock');

function newMock() {
	return newMockCore(empty);
}

function empty() {}

var throwUnexpectedArguments = {};
var newPartialMock = newMock();

expectRequire('./partialMock').return(newPartialMock);
expectRequire('./mock/throwUnexpectedArguments').return(throwUnexpectedArguments);

describe('newMock', function(){
	var partialMock = {};
	newPartialMock.expect(throwUnexpectedArguments).return(partialMock);
	var returned = require('../strictMock')();

	it('should return partialMock', function(){
		assert.equal(partialMock,returned);
    });

});
