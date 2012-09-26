function _new(maxLength) {
	
	function hasNoMoreArguments(){
		return (arguments.length == maxLength);
	}

	return hasNoMoreArguments;
}

module.exports = _new;