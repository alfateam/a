function _new(expectedArray,index) {
	var array;
	function hasEqualArgumentArray(){
		array = arguments[index];		
		return (array instanceof Array) && equalArrayLength() && equalElements();
	}

	function equalArrayLength() {
		return (expectedArray.length == array.length);
	}


	function equalElements() {
		for(var i = 0; i < expectedArray.length; i++) {
			if (expectedArray[i] !== array[i])
				return false;
		}
		return true;
	}

	return hasEqualArgumentArray;
}

module.exports = _new;