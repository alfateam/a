var assert = require('assert');
var newRequireMock = require('../../partialMock/simple/newRequireMock');

var sut = require('../tryRemove');

describe('tryRemoveSpec', function(){
	
	describe('execute',function() {
		var remove = newRequireMock('./remove');
		var didremove;
		var callback = {};
		remove.expect(context).expect(callback).whenCalled(onRemove).return(null);
		function onRemove() {
			didremove = true;
		}

		sut(context,callback);
		
		it('should forward to remove',function() {
			assert.ok(didremove);
		});
	});

	describe('execute with missing callback',function() {
		var remove = newRequireMock('./remove');		
		var didremove;
		var callback;
		remove.expect(context).expect(callback).whenCalled(onRemove).return(null);
		function onRemove() {
			throw 'not allowed to forward';
		}

		sut(context,callback);
		
		it('should not forward to remove',function() {
			assert.ok(true);
		});
	});

});
