function _new(subject,propertyName,mock) {
	
	function propertyMock() {
		return mock.apply(null,arguments);
	}

	for(var propertyName in subject) {
		propertyMock[propertyName] = subject[propertyName];
	}

	return propertyMock;
}

module.exports = _new;