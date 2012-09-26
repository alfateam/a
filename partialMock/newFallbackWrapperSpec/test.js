var assert = require('assert');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var newSut = require('../newFallbackWrapper');

describe('newFallbackWrapper', function() {
	var originalFallback = newMock();
	var sut = newSut(originalFallback);

	describe('execute',function() {
		var arg = {};		
		var expected = {};
		originalFallback.expect(arg).return(expected);
		var returned = sut(arg);

		it('should result from originalFallback',function() {
			assert.equal(returned,expected);
		});

		describe('setFallback',function() {
			var fallback = newMock();			
			sut.setFallback(fallback);

			describe('execute',function() {
				var expected = {};
				fallback.expect(arg).return(expected);
				var returned = sut(arg);

				it('should return result from new fallback',function() {
					assert.equal(returned,expected);
				});
			})
		});
	});

});
