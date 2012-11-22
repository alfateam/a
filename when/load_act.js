var path = require('path');
var reporter = require('./reporter');

function load(calling_module, act_path) {
	var resolved_path;
	if(typeof act_path === 'function') {
		reporter.warn('specify path to act instead of requiring it');
		resolved_path = act_path._name;
	}
	else {
		var calling_module_dirname = path.dirname(calling_module.filename);
		resolved_path = path.resolve(calling_module_dirname, act_path);
	}

	var act = require(resolved_path);
	act.filename= resolved_path;
	return act;
}

module.exports = load;

