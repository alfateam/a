function mutableAnd() {
	var and = require('./and');

	function execute() {
		return and.apply(null,arguments);
	}

	execute.add = function() {
		and = and.add.apply(null,arguments);
	};

	return execute;
	
}

module.exports  = mutableAnd;


