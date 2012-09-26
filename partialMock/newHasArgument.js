function _new(index) {
	
	function hasArgument(){
		return arguments.length-1 >= index;
	}

	return hasArgument;
}

module.exports = _new;