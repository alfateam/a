var assert = require('assert');
var arg1 = 'a';
var arg2 = {};
var arg3 = 'c';
var errorMsg = "Unexpected arguments: a [object Object] c."
var thrownErrorMsg;

describe('throwUnexpectedArguments', function(){
	var sut = require('../throwUnexpectedArguments');
	try	{
		sut(arg1,arg2,arg3);
	}
	catch(error) {
		thrownErrorMsg = error;
	}

	it('should throw correct msg', function(){
		assert.equal(errorMsg,thrownErrorMsg);
    });

});
