var act = require('./hasOne');
var c = {};
var when = require('../../../when/when');

when(act, c).
	it('should return expected').assertEqual(c.expected,c.returned);	
