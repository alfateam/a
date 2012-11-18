var act = require('./hasMany');
var c = {};
var when = require('../../../when/when');

when(act, c).
	it('should return expected').assertEqual(c.expected,c.returned);	
