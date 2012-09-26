var red, green, reset;
red   = '\u001b[31m';
green = '\u001b[32m';
reset = '\u001b[0m';

function test(message, fn) {
	try {
		fn();
		console.log(green + '  OK   ' + reset + message);
	}
	catch(err) {
		console.log(red + '  FAIL ' + reset + message);
		console.log(err);
	}
}

module.exports = test;
