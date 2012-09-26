var test = require('./test');
var assert = require('assert');
var sut = require('../suite_name_builder');

function act(c) {}
act._name = '/path/fooSpec/givenA/givenB/act.js';

var returned = sut(act);

(function() {

	console.log('when building');
	test('returns folder names separated with right_quotes up to spec folder', function() {
		assert.equal('fooSpec » givenA » givenB » act', returned);
	});

})();

