var assert = require('assert');
var newRequireMock = require('../../partialMock/simple/newRequireMock');

var sut = require('../tryAdd');

describe('tryAddSpec', function(){
	
	describe('execute',function() {
		var add = newRequireMock('./add');
		var didAdd;
		var callback = {};
		add.expect(context).expect(callback).whenCalled(onAdd).return(null);
		function onAdd() {
			didAdd = true;
		}

		sut(context,callback);
		
		it('should forward to add',function() {
			assert.ok(didAdd);
		});
	});

	describe('execute with missing callback',function() {
		var add = newRequireMock('./add');		
		var didAdd;
		var callback;
		add.expect(context).expect(callback).whenCalled(onAdd).return(null);
		function onAdd() {
			throw 'not allowed to forward';
		}

		sut(context,callback);
		
		it('should not forward to add',function() {
			assert.ok(true);
		});
	});

});
