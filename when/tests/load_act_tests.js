var assert = require('assert');
var test = require('./test');

var requireMock = require('../../requireMock');
var mock = require('../../mock');
var path = requireMock('path');
var reporter = requireMock('./reporter');

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


(function() {
	console.log('when loaded using act function');

	var act_func = function() {};
	var act_func_name = 'name';
	act_func._name = act_func_name;

	var act = requireMock(act_func_name);

	reporter.warn = mock();
	reporter.warn.expect('specify path to act instead of requiring it').return();

	var calling_module = mock();

	var returned = load_act(calling_module, act_func);

	test('it should load act module using _name property of act function', function() {
		assert.strictEqual(returned, act);
	});

	test('it should set filename property to _name property of the func', function() {
		assert(returned.filename === act_func_name);
	});


	test('it should show deprecation message', function() {
		assert(reporter.warn.verify());
	});
})();
