var newMock = require('./newMock');
var expectRequire = require('./expectRequire');

function create(moduleName) {
	var mock = newMock();
	expectRequire(moduleName).return(mock);
	return mock;
}

module.exports  = create;


