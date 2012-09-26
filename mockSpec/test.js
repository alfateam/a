var assert = require('assert');
var newRequireMock = require('../partialMock/simple/newRequireMock');

describe('mock', function(){
	var newStrictMock = newRequireMock('./strictMock');
	var newObjectMock = newRequireMock('./mock/objectMock');
	var mockFuncProperties = newRequireMock('./mock/mockFuncProperties');
	var newPartialMock = newRequireMock('./partialMock');
	var sut = require('../mock');		

	describe('func input.new',function() {

		var input = {};
		var objectMock = {};
		var didMockFuncProperties;

		newObjectMock.expect(input).return(objectMock);
		mockFuncProperties.expect(input).expect(objectMock).whenCalled(onMockFuncProperties).return(null);

		function onMockFuncProperties() {
			didMockFuncProperties = true;
		}

		
		var returned = sut(input);
	
			it('shold return expected',function() {
				assert.equal(returned,objectMock);
			});
	
			it('should mock func properties',function() {
				assert.ok(didMockFuncProperties);
		});
	});

	describe('func input.new',function() {
		var expected = {};
		var input = function() {};
		newPartialMock.expect(input).return(expected);

		var returned = sut(input);
	
		it('shold return expected',function() {
			assert.equal(returned,expected);
		});
	
	});


	describe('empty input.new',function() {
		var expected = {};
	
		newStrictMock.expect().return(expected);

		var returned = sut();
	
		it('shold return expected',function() {
			assert.equal(returned,expected);
		});
	});





});
