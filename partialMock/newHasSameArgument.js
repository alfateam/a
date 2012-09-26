function _new(expectedArg,index) {
	function hasSameArgument(){
		return arguments[index] === expectedArg;
	}

	return hasSameArgument;
}

module.exports = _new;