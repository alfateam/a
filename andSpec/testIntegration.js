var assert = require('assert');
var newRequireMock = require('../partialMock/simple/newRequireMock');
var newMock = require('../partialMock/simple/newMock');

var and = require('../and');

describe('and', function(){

	var arg = {};
	var arg2 = {};
	var predicate1 = newMock();
	var predicate2 = newMock();
	var predicate3 = newMock();
	predicate1.expect(arg).expect(arg2).return(true);
	predicate2.expect(arg).expect(arg2).return(true);
	predicate3.expect(arg).expect(arg2).return(true);
	var and2 = and.add(predicate1,predicate2).add(predicate3);
	var returned = and2(arg,arg2);

	it('should return true',function() {

		assert.ok(returned);
	});
});
