var test = require('./test');
var assert = require('assert');
var sut = require('../suite_name_builder');

function act(c) {}
act._name = '/path/spec/givenA/givenB/act.js';

var returned = sut(act);

(function() {

	console.log('when building');
	test('returns folder names separated with right_quotes up to spec folder', function() {
		assert.equal('spec » givenA » givenB » act', returned);
	});

})();

