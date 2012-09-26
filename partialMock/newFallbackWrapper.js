function _new(originalFallback) {

	var fallback = originalFallback;

	function execute() {
		return fallback.apply(null,arguments);
	}

	execute.setFallback = function(fallback2) {
		fallback = fallback2;
	};

	return execute;
}

module.exports = _new;