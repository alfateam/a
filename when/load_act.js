var path = require('path');

function load(calling_module, act_path) {
	var calling_module_dirname = path.dirname(calling_module.filename);
	var resolved_path = path.resolve(calling_module_dirname, act_path);

	var act = require(resolved_path);
	act._name = resolved_path;
	return act;
}

module.exports = load;

