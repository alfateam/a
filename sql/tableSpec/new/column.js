var requireMock = require('../../../requireMock');
var columnName = {};
var expected = {};

function act(c) {
	c.expected = expected;
	c.addColumn.expect(c.context).expect(columnName).return(c.expected);
	c.returned = c.sut.column(columnName);
}

act._name = module.filename;
act.base = require('../new');
module.exports = act;