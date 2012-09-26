var newStrictMock = require('./strictMock');
var newObjectMock = require('./mock/objectMock');
var newPartialMock = require('./partialMock')
var mockFuncProperties = require('./mock/mockFuncProperties')

function create(subject) {
	if (subject == undefined)
		return newStrictMock();
	if (subject instanceof Function)
		return newPartialMock(subject);
	var mock = newObjectMock(subject);
	mockFuncProperties(subject,mock);
	return mock;

}

module.exports  = create;


