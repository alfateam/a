(function avoid_caching() {
	delete require.cache[module.id];
})();

var a_mock = require('a_mock');


module.exports = {
	mock: a_mock.mock,
	expectRequire: a_mock.expectRequire,
	requireMock: a_mock.requireMock,
	then: a_mock.then
};

