var requireMock = require('../../../requireMock');
var filter = {};
var expected = {};

function act(c) {
	c.expected = expected;
	c.getMany.expect(c.context).expect(filter).return(c.expected);
	c.returned = c.sut.getMany(filter);
}

act._name = module.filename;
act.base = require('../new');
module.exports = act;