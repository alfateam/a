var assert = require('assert');
var newRequireMock = require('../partialMock/simple/newRequireMock');
var newMock = require('../partialMock/simple/newMock');

var and = newRequireMock('./and');
var newSut = require('../newMutableAnd');

describe('mutableAnd', function(){
	
	var sut = newSut();

	describe('execute',function() {
		var arg = {};
		var expected = {};
		and.expect(arg).return(expected);
		var returned = sut(arg);

		it('returns expected',function() {
			assert.equal(returned,expected);
		});

	});

		describe('add',function() {
		var predicate = {};
		var add = newMock();			
		var and2 = newMock();
		and.add = add;
		add.expect(predicate).return(and2);
		sut.add(predicate);

			describe('execute',function() {
				var arg = {};
				var expected = {};
				and2.expect(arg).return(expected);
				var returned = sut(arg);
		
				it('returns expected',function() {
					assert.equal(returned,expected);
				});				
			});


		});



});

