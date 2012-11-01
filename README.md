_a_
===
_Mocking framework_ + _testing framework_. 


The mocking framework can be used in any JavaScript testing framework.

The testing framework has a short and concise bdd syntax - with reusable contexts.

__how to install__

```
npm install a
```



__if you want the test framework, install it globally too__

```
npm install a -g
```



_Mocking_
===================

Mocking a function 
------------------

__partial mock__

```
var original = function() {
	return 'realValue';
}

var mock = require('a').mock(original);
original = mock;
mock.expect().return('fake');

original(); //returns 'fake'
original(); //returns 'realValue'
```



__strict mock__

```
var original = function() {
	return 'realValue';
}

var mock = require('a').mock();
original = mock;
mock.expect().return('fake');

original(); //returns 'fake'
original(); //throws unexpected arguments
```



__strict mock with arguments__

```
var original = function(arg) {
	return 'realValue';
}

var mock = require('a').mock();
original = mock;
mock.expect('testValue1').return('fake1');
mock.expect('testValue2').return('fake2');

original('testValue1'); //returns 'fake1'
original('testValue2'); //returns 'fake2'
original(); //throws unexpected arguments
original('foo'); //throws unexpected arguments
```



__strict mock with multiple arguments__

```
var original = function(arg1, arg2) {
	return 'realValue';
}

var mock = require('a').mock();
original = mock;
mock.expect('firstArg1', 'secondArg1').return('fake1');
mock.expect('firstArg2', 'secondArg2').return('fake2');


original('firstArg1', 'secondArg1'); //returns 'fake1'
original('firstArg2', 'secondArg2'); //returns 'fake2'
original('foo'); //throws unexpected arguments
original('foo', 'bar'); //throws unexpected arguments
```

__strict mock expecting array__

```
var original = function(array) {
	return 'realValue';
}

var mock = require('a').mock();
original = mock;
mock.expectArray(['a','b']).return('fake1');
mock.expectArray(['a','b').return('fake2');
mock.expectArray(['c','d').return('fake3');

original(['a','b']); //returns 'fake1'
original(['a','b']); //returns 'fake2'
original(['c','d']); //returns 'fake3'
original(['a','b']); //throws unexpected arguments
original(['foo', 'bar']); //throws unexpected arguments
```


__strict mock with repeats__

```
var original = function() {
	return 'realValue';
}

var mock = require('a').mock();
original = mock;
mock.expect().return('fake').repeat(2);

original(); //returns 'fake'
original(); //returns 'fake'
original(); //throws unexpected arguments
```

__strict mock with infinite repeats__

```
var original = function() {
	return 'realValue';
}

var mock = require('a').mock();
original = mock;
mock.expect().return('fake').repeatAny();

original(); //returns 'fake'
original(); //returns 'fake'
original(); //returns 'fake'...
```


__strict mock ignoring arguments__

```
var original = function(arg) {
	return 'realValue';
}

var mock = require('a').mock();
original = mock;
mock.expectAnything().return('fake1');

original('someRandomValue'); //returns 'fake1'
original(); //throws unexpected arguments
```



__strict mock with interceptor__

```
var original = function(arg) {
	return 'realValue';
}

var mock = require('a').mock();
original = mock;
mock.expect('testValue').whenCalled(onCalled).return('fake1');

function onCalled(arg) {
	//arg == 'testValue'
}

original('testValue'); //returns 'fake1'
original(); //throws unexpected arguments
```

__strict mock - verify (fail)__

```
var original = function(arg) {
	return 'realValue';
}

var mock = require('a').mock();
original = mock;
mock.expect('testValue1').return('fake1');
mock.expect('testValue2').return('fake2');

original('testValue1'); //returns 'fake1'
mock.verify(); //throws mock has 1 pending functions
```

__strict mock - verify (success)__

```
var original = function(arg) {
	return 'realValue';
}

var mock = require('a').mock();
original = mock;
mock.expect('testValue1').return('fake1');
mock.expect('testValue2').return('fake2');

original('testValue1'); //returns 'fake1'
original('testValue2'); //returns 'fake2'
mock.verify(); //returns true
```


__strict mock - advanced scenario__

```
var original = function(arg, callback) {
	return 'realValue';
}

var mock = require('a').mock();
original = mock;
mock.expect('testValue').expectAnything().whenCalled(onCalled).return('fake1');

function onCalled(arg,callback) {
	//arg == 'testValue'
	//callback == foo
}

function foo() {	
}


original('testValue', foo); //returns 'fake1'
mock.verify() //returns true
original('testValue',foo); //throws unexpected arguments
```

Mocking require 
----------------

__expectRequire__

```
var fakeDep = {};

var expectRequire = require('a').expectRequire;
expectRequire('./realDep').return(fakeDep);

require('./realDep'); //returns fakeDep
require('./realDep'); //returns realDep (behaves like a partial mock)
```

__requireMock (compact syntax)__

```
var requireMock = require('a').requireMock;
var fakeDep = requireMock('./realDep'); //returns a strict mock

require('./realDep'); //returns fakeDep
require('./realDep'); //returns realDep
```

__..is equivalent to ..__

```
var mock = require('a').mock();
var expectRequire = require('a').expectRequire;

var fakeDep = mock; 
expectRequire('./realDep').return(fakeDep);

require('./realDep'); //returns fakeDep
require('./realDep'); //returns realDep
```

Mocking an object
-----------------
__partial object mock__

```
function newCustomer(_name) {
	var c = {};
	
	c.getName = function () 
	{
		return _name;
	};

	return c;
}

var customer = newCustomer('Alfonzo The Real');
var customerMock = mock(customer);

customerMock.getName.expect().return('Johnny Fake');

customer.getName(); //returns Johnny Fake
customer.getName(); //returns Alfonzo The Real
customerMock.verify(); //returns true
```


_A test framework_
===================
_A_ test framework is a simplistic, magic-free library providing unit-testing facilities with a compact, bdd-style syntax. 

In contrast to other bdd-style test frameworks, however, it doesn't allow nesting suites in each other in order to test the SUT(subject under test) in different states. Instead, the framework relies on folder structure to describe the state which the SUT currently is. Suite names are generated based on their filenames. As a result there will be many small test files instead of few big ones with test suites nested in each other.

Test setup -- the "Arrange-Act" part of suites, is separated from the "Assert" part. This way the same setup can be used across different suites. Test setups can, of course, be chained.


Examples below can be found here: https://bitbucket.org/pure/a_demo

Example 1
---------
Given the following file structure
- demo/	
	- counter.js
	- counter_specs/
		- new/
			- increment.js
			- when_incremented.js
		- new.js
		- when_new.js
	
__counter.js__

```
module.exports = function () {
	var counter = {
		value: 0,
		increment: function() { this.value++; }
	};
	
	return counter;
}
```

__counter_specs/new.js__

```
function act(c) {
	var createCounter = require('../counter');
	c.sut = createCounter();
}
act._name = module.filename;
module.exports = act;
```

__counter_specs/when_new.js__

```
var act = require('./new');
var c = {}; //test context object
var when = require('a').when;

when(act, c). //set up
	it('should be an object').
		assertTrue(typeof c.sut == 'object')
	it('should have value equal to zero').
		assertEqual(0, c.sut.value);

```

__counter_specs/new/increment.js__

```
function act(c) {
	c.sut.increment();
}
act._name = module.filename;
act.base = require('../new');
module.exports = act;
```

__counter_specs/new/when_incremented.js__

```
var act = require('./increment');
var c = {};
var when = require('a').when;

when(act, c).
	it('should have value equal to 1').
		assertEqual(1, c.sut.value);

```

In demo directory run _when_
	
	user@localhost:~/a_demo $ when

	 » counter_specs » new
	
	  ✓ should be an object
	  ✓ should have value equal to zero
	
	 » counter_specs » new » increment
	
	  ✓ should have value equal to 1
	
	========== Summary =============
	
	
	suites: 2, passed: 3, failed: 0


