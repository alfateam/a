var requireMock = require('../../../requireMock');
var table = {};
var expected = {};

function act(c) {
	c.expected = expected;
	c.addHasMany.expect(c.context,table).return(c.expected);
	c.returned = c.sut.hasMany(table);
}

act._name = module.filename;
act.base = require('../new');
module.exports = act;