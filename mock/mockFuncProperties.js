var propertyMock = require('./propertyMock');

function execute(subject,mockObject) {
	if (!(subject instanceof Object))
		return;
	var mockFuncProperties = require('./mockFuncProperties');
	for(var propertyName in subject) {
		var property = subject[propertyName];
		var mockProperty = mockObject[propertyName];
		if (property instanceof Function)
			subject[propertyName] = propertyMock(subject,propertyName,mockProperty);
		mockFuncProperties(property,mockProperty);
	}
}

module.exports  = execute;
