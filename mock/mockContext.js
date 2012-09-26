function _new(context) {
	if (context)
		return context;
	var verify = require('../newMutableAnd')();
	c = {};
	c.verify = verify;
	return c;
}

module.exports = _new;