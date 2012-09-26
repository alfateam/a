var assert = require('assert');
var newRequireMock = require('../partialMock/simple/newRequireMock');
var newMock = require('../partialMock/simple/newMock');


describe('and', function(){
	var sut = require('../and');

	describe('execute',function() {
		var returned = sut();

		it('returns true',function() {
			assert.ok(returned)
		});
	});

	describe('add',function() {
		var newMonadicAnd = newRequireMock('./and/newMonadicAnd');
		var monadicAnd = {};
		var predicate = {};
		newMonadicAnd.expect(predicate).return(monadicAnd);
		
		var returned = sut.add(predicate);

		it('returns monadicAnd',function() {
			assert.equal(monadicAnd,returned);
		});
	});

});

