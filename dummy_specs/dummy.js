module.exports = function() {
	return {
		mutated_once: false,
		mutated_twice: false,
		mutate_one: function() {
			this.mutated_once = true;
		},
		mutate_two: function() {
			this.mutated_twice = true;
		}
	};
};

