function add(context,callback) {
	context.callbacks.push(callback);
}

module.exports = add;
