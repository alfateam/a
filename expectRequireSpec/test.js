var sut = require('../expectRequire');
var assert = require('assert');

var fooFake = {};
var bazFake = {};
	

describe('expectRequire.', function(){

	describe('require.', function() {		
		sut('./foo').return(fooFake);
			sut('./baz').return(bazFake);

		var firstReturned = require('./foo');
		var secondReturned = require('./baz');
		var thirdReturned = require('./foo')
		var fourthReturned = require('./baz');
		
		it('execute returns fooFake first time', function(){
			assert.equal(fooFake,firstReturned);
    	});

		it('execute returns bazFake second time', function(){
			assert.equal(bazFake,secondReturned);
    	});

    	it('execute returns real foo third time', function(){
			assert.notEqual(bazFake,thirdReturned);
			assert.notEqual(fooFake,thirdReturned);
    	});

    	it('execute returns real foo fourth time', function(){
			assert.notEqual(bazFake,fourthReturned);
			assert.notEqual(fooFake,fourthReturned);
    	});

	});


});
