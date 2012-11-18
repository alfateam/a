var newContext = require('./newContext');
var addPrimaryColumn = require('./table/addPrimaryColumn');
var addColumn = require('./table/addColumn');
var addJoin = require('./table/addJoin');
var addHasMany = require('./table/addHasMany');
var addHasOne = require('./table/addHasOne');
var getMany = require('./table/getMany');

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

	c.hasMany = function(table) {
		return addHasMany(context,table);
	};

	c.hasOne = function(table) {
		return addHasOne(context,table);
	};

	c.getMany = function(filter) {
		return getMany(context,filter);
	};

	return c;	
}

module.exports = _new;