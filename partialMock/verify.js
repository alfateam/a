function verify(mockContext) {	
	var count = mockContext.expectCount;
	if (count > 0)
		throw 'mock has ' + count + ' pending functions';
	return true;
}

module.exports = verify;