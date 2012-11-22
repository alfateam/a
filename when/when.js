var assert = require('assert');
var it = require('./it').it;
var suite_name_builder = require('./suite_name_builder');
var execute_act = require('./execute_act');
var load_act = require('./load_act');
var reporter = require('./reporter');

function when(act, c) {

	act = load_act(module.parent.parent, act);

	var suite_name = suite_name_builder(act);
	reporter.suite(suite_name);
	execute_act(act, c);

	return {
		it: it
	};
}

when.summary = reporter.summary;
module.exports = when;

