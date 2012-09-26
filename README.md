A
=
A is a nodejs module which consists of A mocking framework and A testing framework. 

A Mocking framework
===================
Mocking a function 

partial mock
------------
````javascript

var original = function() {
	return 'realValue';
}

var mock = require('a').mock;
original = mock(original);
mock.expect().return('fake');

original(); //returns 'fake'
original(); //returns 'realValue'

````

strict mock
-----------
````javascript

var original = function() {
	return 'realValue';
}

var mock = require('a').mock;
original = mock();
mock.expect().return('fake');

original(); //returns 'fake'
original(); //throws unexpected arguments

````

strict mock with arguments
--------------------------
````javascript

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

````

strict mock with multiple arguments
--------------------------
````javascript

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

````


strict mock with repeats
--------------------------
````javascript

var original = function() {
	return 'realValue';
}

var mock = require('a').mock;
original = mock();
mock.expect().return('fake').repeat(2);

original(); //returns 'fake'
original(); //returns 'fake'
original(); //throws unexpected arguments

````

strict mock ignoring arguments
--------------------------
````javascript

var original = function(arg) {
	return 'realValue';
}

var mock = require('a').mock;
original = mock();
mock.expectAnything().return('fake1');

original('someRandomValue'); //returns 'fake1'
original(); //throws unexpected arguments

````

strict mock with interceptor
--------------------------
````javascript

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

````

strict mock - advanced scenario
-------------------------------
````javascript

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

````



A Testing framework
===================