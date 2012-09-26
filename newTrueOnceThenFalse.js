function _new() {

	var delegate = trueOnce;

	function execute() {
		return delegate();
	}

	function trueOnce() {		
		delegate = returnFalse;
		return true;
	}

	function returnFalse() {
		return false;
	}

	return execute;

}

module.exports = _new;