var assert = require('assert');
var it = require('./it').it;
var reporter = require('./reporter');
var suite_name_builder = require('./suite_name_builder');
var execute_act = require('./execute_act');

function when(act, c) {
  var suite_name = suite_name_builder(act);
  reporter.suite(suite_name);
  execute_act(act, c);
  
	return {
		it: it
	};
}

when.summary = reporter.summary;
module.exports = when;

