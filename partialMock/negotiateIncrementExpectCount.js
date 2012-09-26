function negotiate(times,mockContext) {	
	if (times)
		mockContext.expectCount++;	
}

module.exports = negotiate;