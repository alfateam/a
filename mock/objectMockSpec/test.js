var assert = require('assert');
var newRequireMock = require('../../partialMock/simple/newRequireMock');
var newMock = require('../../partialMock/simple/newMock');

describe('objectMock', function(){
	var newMockContext = newRequireMock('./mockContext');
	var newPartialMock = newRequireMock('../partialMock');
	var newSut =  require('../objectMock');
	

	describe('subject is object.new',function() {
		var newObjectMock = newRequireMock('./objectMock');
		var initialMockContext = {}
		var mockContext = {};
		var verify = {};
		mockContext.verify = verify;
		var subject = {};
		var a = {};
		var b = {};
		subject.a = a;
		subject.b = b;
		var aMock = {};
		var bMock = {};

		newMockContext.expect(initialMockContext).return(mockContext);
		newObjectMock.expect(a).expect(mockContext).return(aMock);
		newObjectMock.expect(b).expect(mockContext).return(bMock);

		var returned = newSut(subject,initialMockContext);

		it('should not return subject', function(){
			assert.notEqual(returned,subject);
	    });

	    it('should mock property a',function() {
	    	assert.equal(returned.a,aMock);
	    });

	    it('should mock property b',function() {
	    	assert.equal(returned.a,aMock);
	    });

	    it('should set verify',function() {
	    	assert.equal(returned.verify,verify);
	    });

	});

	describe('subject is func.new',function() {
		var newObjectMock = newRequireMock('./objectMock');
		var initialMockContext = {}
		var mockContext = {};
		var compositeVerify = {};
		compositeVerify.add = newMock();
		mockContext.verify = compositeVerify;
		var subject = function() {};
		var a = {};
		var b = {};
		subject.a = a;
		subject.b = b;
		var aMock = {};
		var bMock = {};
		var partialMock = {};
		var verify = {};
		partialMock.verify = verify;
		var didAddVerifyToComposite;

		newMockContext.expect(initialMockContext).return(mockContext);
		newObjectMock.expect(a).expect(mockContext).return(aMock);
		newObjectMock.expect(b).expect(mockContext).return(bMock);
		newPartialMock.expect(subject).return(partialMock);
		compositeVerify.add.expect(verify).whenCalled(onAddVerify).return(null);

		function onAddVerify() {
			didAddVerifyToComposite = true;
		}

		var returned = newSut(subject,initialMockContext);

		it('should return partialMock', function(){
			assert.equal(returned,partialMock);
	    });

	    it('should mock property a',function() {
	    	assert.equal(returned.a,aMock);
	    });

	    it('should mock property b',function() {
	    	assert.equal(returned.a,aMock);
	    });

	    it('should add verify to mockContext.verify',function() {
	    	assert.ok(didAddVerifyToComposite);
	    });

	});


	describe('subject is primitive',function() {
		var newObjectMock = newRequireMock('./objectMock');
		var initialMockContext = {}
		var mockContext = {};
		var verify = {};
		mockContext.verify = verify;

		var subject = 12;

		newMockContext.expect(initialMockContext).return(mockContext);

		var returned = newSut(subject,initialMockContext);

		it('should return object', function(){
			assert.ok(returned instanceof Object);
	    });

   	    it('should set verify',function() {
	    	assert.equal(returned.verify,verify);
	    });


	});


	


});
