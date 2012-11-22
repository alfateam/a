var reporter = require('./reporter');
var load_act = require('./load_act');

function execute(act, c) {
	var baseExecute = require('./execute_act');
	var base_act = act.base;

	if (base_act) {
		if (typeof base_act === 'function') {
			reporter.warn('deprecated: specify path to act.base instead of requiring it');
		}
		else {
			base_act = load_act(act, base_act);
		}
		c = baseExecute(base_act, c);
	}
	act(c);

	return c;
}

module.exports = execute;

