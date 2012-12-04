(function avoid_caching() {
	delete require.cache[module.id];
})();

var _when = require('a_test').when;
_when.parentCount++;

var a_mock = require('a_mock');


module.exports = {
	when: _when,
	mock: a_mock.mock,
	expectRequire: a_mock.expectRequire,
	requireMock: a_mock.requireMock
};

