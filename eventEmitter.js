function _new() {
	var context = require('./eventEmitter/emitterContext')();
	var add = require('./eventEmitter/add');
	var tryAdd = require('./eventEmitter/tryAdd');
	var remove = require('./eventEmitter/remove');
	var tryRemove = require('./eventEmitter/tryRemove');
	var c = {};
	
	c.add = function(callback) {
		add(context,callback);
		return c;
	} 	

	c.tryAdd = function(callback) {
		tryAdd(context,callback);
		return c;
	} 	

	c.remove = function(callback) {
		remove(context,callback);
		return c;
	} 	

	c.tryRemove = function(callback) {
		tryRemove(context,callback);
		return c;
	} 	

	c.emit = function() {	
		var callbacks = context.callbacks;	
		for(var index = 0;index < callbacks.length;index++) {
			callbacks[index].apply(null,arguments);
		}
		return c;
	}

	return c;
}

module.exports  = _new;


