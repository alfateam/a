(function avoid_caching_when_module() {
	delete require.cache[module.id];
	delete require.cache[require.resolve('./when/when')];
})();

module.exports = {
	when: require('./when/when'),
	mock: require('./mock'),
	expectRequire: require('./expectRequire'),
	requireMock: require('./requireMock')
};

