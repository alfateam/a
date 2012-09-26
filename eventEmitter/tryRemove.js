function tryremove(context,callback) {
	var remove = require('./remove');
	if (callback)	
		remove(context,callback);
}

module.exports = tryremove;
