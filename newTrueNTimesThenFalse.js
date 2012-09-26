function _new(times) {
	if (typeof times == 'undefined')
		return returnTrue;
	
	function returnTrue() {
		return true;
	}

	var delegate = returnTrueNTimes;

	function execute() {
		return delegate();
	}

	function returnTrueNTimes() {
		times--;
		if (times === 0)
			delegate = returnFalse;
		return true;
	}

	function returnFalse() {
		return false;
	}

	return execute;

}

module.exports = _new;