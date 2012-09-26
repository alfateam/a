function _new(predicate,predicate2) {
	var newBinaryAnd = require('./newBinaryAnd');
	var binaryResult = require('./binaryResult');

	function binaryAnd() {
		var result1 = predicate.apply(null,arguments);
		var result2 = predicate2.apply(null,arguments);
		return binaryResult(result1,result2);s
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