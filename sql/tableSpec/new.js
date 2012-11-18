var requireMock = require('../../requireMock');
var newContext = requireMock('./newContext');
var addPrimaryColumn = requireMock('./table/addPrimaryColumn');
var addColumn = requireMock('./table/addColumn');
var addJoin = requireMock('./table/addJoin');
var context = {};
var tableName = {};

function act(c) {
	c.addJoin = addJoin;
	c.addPrimaryColumn = addPrimaryColumn;		
	c.addColumn = addColumn;
	stubContext();		
	newSut();

	function stubContext() {
		c.context = context;
		newContext.expect(tableName).return(context);
	}

	function newSut() {
		c.name = tableName;
		c.sut = require('../table')(tableName);
	}
}

act._name = module.filename;
module.exports = act;