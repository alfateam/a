function _new(predicate) {
	var newBinaryAnd = require('./newBinaryAnd');

	function monadicAnd() {
		return predicate.apply(null,arguments);
	}

	monadicAnd.add = function() {
		var currentPredicate = monadicAnd;
		for (var i = 0; i < arguments.length; i++) {
			var predicate = arguments[i];
			currentPredicate = newBinaryAnd(currentPredicate,predicate);
		};
		return currentPredicate;
	};

	return monadicAnd;
}

module.exports = _new;