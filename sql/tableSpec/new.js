var requireMock = require('../../requireMock');
var newContext = requireMock('./newContext');
var addPrimaryColumn = requireMock('./table/addPrimaryColumn');
var addColumn = requireMock('./table/addColumn');
var addJoin = requireMock('./table/addJoin');
var addHasMany = requireMock('./table/addHasMany');
var addHasOne = requireMock('./table/addHasOne');
var getMany = requireMock('./table/getMany');
var context = {};
var tableName = 0;

function act(c) {
	tableName++;
	//console.log(tableName);
	//c.tableName = tableName;
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
		newContext.expect(1).return(1).repeat(1);		
		newContext.expect(2,3).return(2);
		console.log('one :'  + newContext(1));
		console.log('two; ' + newContext(2,3));
		newContext.expect(tableName).return(context);
	}

	function newSut() {
		c.name = tableName;
		c.sut = require('../table')(tableName);
	}
}

act._name = module.filename;
module.exports = act;