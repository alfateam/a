var assert = require('assert');
var expectRequire = require('../expectRequire');
var newMockCore = require('../newPartialMock');

function newMock() {
	return newMockCore(empty);
}

function empty() {}

var throwUnexpectedArguments = {};
var newPartialMock = newMock();

expectRequire('./newPartialMock').return(newPartialMock);
expectRequire('./newMock/throwUnexpectedArguments').return(throwUnexpectedArguments);

describe('newMock', function(){
	var partialMock = {};
	newPartialMock.expect(throwUnexpectedArguments).return(partialMock);
	var returned = require('../newMock')();

	it('should return partialMock', function(){
		assert.equal(partialMock,returned);
    });

});
