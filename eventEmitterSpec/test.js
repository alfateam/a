var assert = require('assert');
var newRequireMock = require('../partialMock/simple/newRequireMock');
var newMock = require('../partialMock/simple/newMock');

var newEmitterContext = newRequireMock('./eventEmitter/emitterContext');
var emit = newRequireMock('./eventEmitter/emit');
var tryAdd = newRequireMock('./eventEmitter/tryAdd');
var add = newRequireMock('./eventEmitter/add');
var remove = newRequireMock('./eventEmitter/remove');
var tryRemove = newRequireMock('./eventEmitter/tryRemove');

var newSut = require('../eventEmitter');

describe('newEventEmitter', function(){
	var context = {};
	newEmitterContext.expect().return(context);
	var sut = newSut();

	describe('add',function() {
		var callback = {};
		var didAdd;
		add.expect(context).expect(callback).whenCalled(onAdd).return();
		var returned = sut.add(callback);

		function onAdd() {
			didAdd = true;
		}

		it('it forwards to add',function() {
			assert.ok(didAdd);
		});

		it('returns self',function() {
			assert.equal(returned,sut);
		});

	});

	describe('tryAdd',function() {
		var callback = {};
		var didAdd;
		tryAdd.expect(context).expect(callback).whenCalled(onAdd).return();
		var returned = sut.tryAdd(callback);

		function onAdd() {
			didAdd = true;
		}

		it('it forwards to tryAdd',function() {
			assert.ok(didAdd);
		});

		it('returns self',function() {
			assert.equal(returned,sut);
		});

	});

	describe('remove',function() {
		var callback = {};
		var didRemove;
		remove.expect(context).expect(callback).whenCalled(onRemove).return();
		var returned = sut.remove(callback);

		function onRemove() {
			didRemove = true;
		}

		it('it forwards to remove',function() {
			assert.ok(didRemove);
		});

		it('returns self',function() {
			assert.equal(returned,sut);
		});

	});

	describe('tryRemove',function() {
		var callback = {};
		var didtryRemove;
		tryRemove.expect(context).expect(callback).whenCalled(ontryRemove).return();
		var returned = sut.tryRemove(callback);

		function ontryRemove() {
			didtryRemove = true;
		}

		it('it forwards to tryRemove',function() {
			assert.ok(didtryRemove);
		});

		it('returns self',function() {
			assert.equal(returned,sut);
		});

	});

	describe('emit',function() {
		var callback = {};
		var didemit;
		var callback = newMock();
		var callback2 = newMock();
		var didInvokeCallback;
		var didInvokeCallback2;
		var arg = {};
		context.callbacks = [callback,callback2]		
		callback.expect(arg).whenCalled(onInvoke).return();
		callback2.expect(arg).whenCalled(onInvoke2).return();
		
		function onInvoke() {
			didInvokeCallback = true;
		}

		function onInvoke2() {
			didInvokeCallback2 = true;
		}
		var returned = sut.emit(arg);

		it('it should invoke callback',function() {
			assert.ok(didInvokeCallback);
		});

		it('it should invoke callback2',function() {
			assert.ok(didInvokeCallback2);
		});

		it('returns self',function() {
			assert.equal(returned,sut);
		});

	});

});

