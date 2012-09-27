_A_
=
_A_ is a nodejs module which consists of _A mocking framework_ and _A testing framework_. 

_A Mocking framework_
===================

Mocking a function 
------------------

__partial mock__
```javascript

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
```javascript

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
```javascript

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
```javascript

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



__strict mock with repeats__
```javascript

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



__strict mock ignoring arguments__
```javascript

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
```javascript

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



__strict mock - advanced scenario__
```javascript

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
original('testValue',foo); //throws unexpected arguments

```



_A Testing framework_
===================