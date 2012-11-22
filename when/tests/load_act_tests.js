var assert = require('assert');
var test = require('./test');

var requireMock = require('../../requireMock');
var mock = require('../../mock');
var path = requireMock('path');

var load_act = require('../load_act');


(function() {
	console.log('when loaded');

	var act_path = 'act_path';

	var resolved_act_path = 'resolved_act_path';
	var act = requireMock('resolved_act_path');

	var calling_module_filename = 'filename';
	var calling_module_dirname = 'dirname';

	var calling_module = {
		filename: calling_module_filename
	};

	path.dirname = mock();
	path.resolve = mock();

	path.dirname.expect(calling_module_filename).return(calling_module_dirname);
	path.resolve.expect(calling_module_dirname, act_path).return(resolved_act_path);


	var returned = load_act(calling_module, act_path);

	test('it should load act module using given path relative to calling module', function() {
		assert.strictEqual(returned, act);
	});

	test('it should set filename property to resolved path', function() {
		assert(returned.filename === resolved_act_path);
	});
})();
