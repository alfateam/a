var requireMock = require('../../requireMock');
var newContext = requireMock('./newContext');
var addPrimaryColumn = requireMock('./table/addPrimaryColumn');
var addColumn = requireMock('./table/addColumn');
var addJoin = requireMock('./table/addJoin');
var addHasMany = requireMock('./table/addHasMany');
var addHasOne = requireMock('./table/addHasOne');
var getMany = requireMock('./table/getMany');
var context = {};
var tableName = {};

function act(c) {
	c.getMany = getMany;
	c.addHasOne = addHasOne;
	c.addHasMany = addHasMany;
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