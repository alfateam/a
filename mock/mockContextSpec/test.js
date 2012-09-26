var assert = require('assert');
var newRequireMock = require('../../partialMock/simple/newRequireMock');

describe('mockContext', function(){
	var newVerify = newRequireMock('../newMutableAnd');
	var sut = require('../mockContext');

	describe('empty input.new',	function() {
		var verify = {};
		newVerify.expect().return(verify);	
		var returned = sut();

		it('should set verify', function(){
			assert.equal(returned.verify,verify);
    	});
	});

	describe('nonEmpty input.new',	function() {
		var input = {};
		var returned = sut(input);

		it('should return same', function(){
			assert.equal(returned,input);
    	});
	});

});
