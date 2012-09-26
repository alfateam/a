var act = require('./mutate_two');
var when = require('when');
var c = {};
when(act, c).
  it('should set mutated_once').
    assertTrue(c.sut.mutated_once).
  it('should set mutated_twice').
    assertTrue(c.sut.mutated_twice).
  it('should fail just for fun').
    assertFail('failure');
