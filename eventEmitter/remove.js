function remove(context,callback) {
	var callbacks = context.callbacks;
	for(var i = 0; i< callbacks.length;i++){
		if (callbacks[i] === callback) {
			callbacks.splice(i,1);
			return;
		}
	}
}

module.exports = remove;
