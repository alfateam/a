var newContext = require('./newContext');
var addPrimaryColumn = require('./table/addPrimaryColumn');
var addColumn = require('./table/addColumn');
var addJoin = require('./table/addJoin');

function _new(tableName) {
	var c = {};	
	var context = newContext(tableName);
	c.name = tableName;
	
	c.primaryColumn = function(columnName) {
		return addPrimaryColumn(context,columnName);
	};

	c.column = function(columnName) {
		return addColumn(context,columnName);
	};

	c.join = function(table) {
		return addJoin(context,table);
	};

	return c;	
}

module.exports = _new;