var act = require('./new');
var c = {};
var when = require('../../when/when');

when(act, c).
	it('should set name').assertEqual(c.name,c.sut.name);
