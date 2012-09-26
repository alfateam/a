var mod = require('module');
var partialMock = require('./newPartialMock')(mod._load);
mod._load = loadHook;

function loadHook(request,parent,isMain) {
	return partialMock(request,parent,isMain);
}

function expect(request) {
	return partialMock.expect(request).expectAnything().expectAnything();
}

module.exports = expect;