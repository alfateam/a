function execute(act, c) {
	var baseExecute = require('./execute_act');

	if (act.base)
		c = baseExecute(act.base,c);
	act(c);
	
	return c;	
}

module.exports = execute;