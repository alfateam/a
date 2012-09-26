var when = require('when');
var act = require('./new');
var c = {};

when(act, c).
  it('should have mutated_once set to false').
    assertEqual(false, c.sut.mutated_once).
  it('should have mutated_twice set to false').
    assertEqual(false, c.sut.mutated_twice).
  it('should fail').
  	assertFail();
