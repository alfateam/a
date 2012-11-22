function _new(predicate,predicate2) {
	var newBinaryAnd = require('./newBinaryAnd');

	function binaryAnd() {
		return predicate.apply(null,arguments) && predicate2.apply(null,arguments);
	}

	binaryAnd.add = function() {
		var currentPredicate = binaryAnd;
		for (var i = 0; i < arguments.length; i++) {
			var predicate = arguments[i];
			currentPredicate = newBinaryAnd(currentPredicate,predicate);
		};
		return currentPredicate;
	};

	return binaryAnd;
}

module.exports = _new;