_a_
===
_Mocking framework_ + _testing framework_. 
The mocking framework can be used in any JavaScript testing framework.
The testing framework has a short and concise bdd syntax - with reusable contexts.

__how to install__

```
npm install a
```
__..if you want the recursive test runner ('when'), install globally too..__
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

var mock = require('a').mock;
original = mock(original);
mock.expect().return('fake');

original(); //returns 'fake'
original(); //returns 'realValue'
```



__strict mock__

```
var original = function() {
	return 'realValue';
}

var mock = require('a').mock;
original = mock();
mock.expect().return('fake');

original(); //returns 'fake'
original(); //throws unexpected arguments
```



__strict mock with arguments__

```
var original = function(arg) {
	return 'realValue';
}

var mock = require('a').mock;
original = mock();
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

var mock = require('a').mock;
original = mock();
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

var mock = require('a').mock;
original = mock();
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

var mock = require('a').mock;
original = mock();
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

var mock = require('a').mock;
original = mock();
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

var mock = require('a').mock;
original = mock();
mock.expectAnything().return('fake1');

original('someRandomValue'); //returns 'fake1'
original(); //throws unexpected arguments
```



__strict mock with interceptor__
```
var original = function(arg) {
	return 'realValue';
}

var mock = require('a').mock;
original = mock();
mock.expect('testValue').whenCalled(onCalled).return('fake1');

function onCalled(arg) {
	//arg == 'testValue'
}

original('someRandomValue'); //returns 'fake1'
original(); //throws unexpected arguments
```

__strict mock - verify (fail)__

```
var original = function(arg) {
	return 'realValue';
}

var mock = require('a').mock;
original = mock();
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

var mock = require('a').mock;
original = mock();
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

var mock = require('a').mock;
original = mock();
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
var mock = require('a').mock;
var expectRequire = require('a').expectRequire;

var fakeDep = mock(); 
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

customer.getName(); //returns Alfonzo The Real
customer.getName(); //returns Johnny Fake
customerMock.verify(); //returns true
```


_A Testing framework_
===================
Not fully documented yet. See dummy_specs.