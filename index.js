(function avoid_caching() {
	delete require.cache[module.id];
})();
var calling_module = module.parent;
var _when = require('a_test').load(calling_module);

var a_mock = require('a_mock');


module.exports = {
	when: _when,
	mock: a_mock.mock,
	expectRequire: a_mock.expectRequire,
	requireMock: a_mock.requireMock,
	then: a_mock.then
};

