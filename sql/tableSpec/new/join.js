var requireMock = require('../../../requireMock');
var table = {};
var expected = {};

function act(c) {
	c.expected = expected;	
	c.addJoin.expect(c.context,table).return(expected);
	c.returned = c.sut.join(table);
}

act.base = require('../new');
act._name = module.filename;
module.exports = act;