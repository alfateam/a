var assert = require('assert');
var newRequireMock = require('../../partialMock/simple/newRequireMock');
var newMock = require('../../partialMock/simple/newMock');

describe('mockFuncProperties', function(){
	var newPropertyMock = newRequireMock('./propertyMock');
	var mockFuncProperties = newRequireMock('./mockFuncProperties');
	var sut = require('../mockFuncProperties');

	describe('subject is non-primitive',function() {
		var subject = {};
		var a2 = {};
		var a = function() {};
		var b = {};
		subject.a = a;
		subject.b = b;

		var mockObject = {};
		var aMock  = {};
		var b2Mock = {};
		var bMock  = {};
		mockObject.a = aMock;
		mockObject.b = bMock;

		var expectedA = {};
		newPropertyMock.expect(subject).expect('a').expect(aMock).return(expectedA);
		mockFuncProperties.expect(a).expect(aMock).whenCalled(onMockSubProperties).return();
		mockFuncProperties.expect(b).expect(bMock).whenCalled(onMockSubProperties).return();

		var mockSubPropertiesCount = 0;
		var didMockSubProperties = false;

		function onMockSubProperties() {
			mockSubPropertiesCount++;		
			didMockSubProperties = (mockSubPropertiesCount == 2);
		}

		sut(subject,mockObject);
		
		it('should mock property a',function() {
			assert.equal(subject.a,expectedA);
		});
	
		it('should mock subProperties',function() {
			assert.ok(didMockSubProperties);
		});

		it('should not change property b',function() {
			assert.equal(subject.b,b);
		});
	});

	describe('subject is primitive',function() {
		var subject = 'a';
		var mockObject = 'a';

		sut(subject,mockObject);
		
		it('should not throw',function() {
			assert(true);
		});	
	});


});
