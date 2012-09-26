function throwUnexpectedArguments() {
	var msg = 'Unexpected arguments:'
	for(var i = 0; i < arguments.length ; i++ )
	{
		msg = msg + ' ' + arguments[i];
	}
	throw msg + '.';
}

module.exports = throwUnexpectedArguments;