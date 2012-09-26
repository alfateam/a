var newMockContext = require('./mockContext');
var newPartialMock = require('../partialMock');

function _new(subject,mockContext) {
	var newObjectMock = require('./objectMock');

	var mockContext = newMockContext(mockContext);
	var mock = {};
	mock.verify = mockContext.verify;
	if (subject instanceof Function) {
		mock = newPartialMock(subject);		
		mockContext.verify.add(mock.verify);
	}
	if (!(subject instanceof Object))
		return mock;
	for(var propertyName in subject) {
		var property = subject[propertyName];
		mock[propertyName] = newObjectMock(property,mockContext);
	}
	return mock;
}

module.exports  = _new
