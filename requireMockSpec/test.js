var assert = require('assert');
var newMock = require('../partialMock/simple/newMock');
var expectRequire = require('../partialMock/simple/expectRequire');

var newMockMock = newMock();
var expectRequireMock = newMock();

expectRequire('./mock').return(newMockMock);
expectRequire('./expectRequire').return(expectRequireMock);

describe('newRequireMock',function() {
	var didExpectRequireReturnMock = false;
	var mock = {};
	var moduleName = {};
	var expectation = {};
	var returnMock = newMock();
	
	newMockMock.expect().return(mock);
	expectRequireMock.expect(moduleName).return(expectation);
	expectation.return = returnMock;
	returnMock.expect(mock).whenCalled(onReturnMock).return(null);

	var returned = require('../requireMock')(moduleName);

	function onReturnMock() {
		didExpectRequireReturnMock = true;
	}

	it('should return mock', function() {
		assert.equal(mock,returned);
	});

	it('should expectRequire to return mock',function(){
		assert.ok(didExpectRequireReturnMock);
	});

});
