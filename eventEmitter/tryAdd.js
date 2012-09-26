function tryAdd(context,callback) {
	var add = require('./add');
	if (callback)	
		add(context,callback);
}

module.exports = tryAdd;
