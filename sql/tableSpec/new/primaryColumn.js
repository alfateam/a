var requireMock = require('../../../requireMock');
var primaryColumnName = {};

function act(c) {
	c.expected = {};
	c.addPrimaryColumn.expect(c.context).expect(primaryColumnName).return(c.expected);
	c.returned = c.sut.primaryColumn(primaryColumnName);
}

act._name = module.filename;
act.base = require('../new');
module.exports = act;