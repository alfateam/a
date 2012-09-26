var act = require('./mutate_one');
var when = require('when');
var c = {};
when(act, c).
  it('should set mutated_once').
    assertTrue(c.sut.mutated_once).
  it('should not set mutated_twice').
    assertEqual(false, c.sut.mutated_twice);
