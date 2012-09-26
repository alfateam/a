function and() {
	return true;
}

and.add = function(predicate) {
	return require('./and/newMonadicAnd')(predicate);
};

module.exports  = and;


