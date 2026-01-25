cd_a_
===
_Mocking framework_ 


The mocking framework can be used in any JavaScript testing framework.


__To install:__

```
npm install a
```



__If you want the test framework, install it globally too:__

```
npm install a -g
```



_Mocking_
===================

Mocking a function
------------------

__Partial mock__

```js
var original = function() {
	return 'realValue';
}

var mock = require('a').mock(original);
original = mock;
mock.expect().return('fake');

original(); //returns 'fake'
original(); //returns 'realValue'
```

Note: Consumers do not need to provide a `thisArg`. It is optional and only used to force a specific `this` when the original fallback is called (low-level partial mock usage).
Mocking an object

-----------------
__Partial object mock__

```js
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



__Strict mock__

```js
var mock = require('a').mock();
mock.expect().return('fake');

mock(); //returns 'fake'
mock(); //throws unexpected arguments
```



__Expecting arguments__

```js
var mock = require('a').mock();
mock.expect('testValue1').return('fake1');
mock.expect('testValue2').return('fake2');

mock('testValue1'); //returns 'fake1'
mock('testValue2'); //returns 'fake2'
mock(); //throws unexpected arguments
mock('foo'); //throws unexpected arguments
```



__Expecting multiple arguments__

```js
var mock = require('a').mock();
mock.expect('firstArg1', 'secondArg1').return('fake1');
mock.expect('firstArg2', 'secondArg2').return('fake2');


mock('firstArg1', 'secondArg1'); //returns 'fake1'
mock('firstArg2', 'secondArg2'); //returns 'fake2'
mock('foo'); //throws unexpected arguments
mock('foo', 'bar'); //throws unexpected arguments
```

__Expecting array__

```js
var mock = require('a').mock();
mock.expect(['a','b']).return('fake1');
mock.expect(['a','b']).return('fake2');
mock.expect(['c','d').return('fake3');

mock(['a','b']); //returns 'fake1'
mock(['a','b']); //returns 'fake2'
mock(['c','d']); //returns 'fake3'
mock(['a','b']); //throws unexpected arguments
mock(['foo', 'bar']); //throws unexpected arguments
```

__Expecting struct__

```js
var mock = require('a').mock();
var obj = {};
mock.expect({a : 1}).return('fake1');
mock.expect({a : 2}).return('fake2');
mock.expect({a : 2, b : {c : 'foo', d : ['me', 'too']}}).return('fake3');
mock.expect(obj).return('fake4');
mock.expect({}).return('will never happen');

mock({a : 'x'}); //throws unexpected arguments
mock({a : 1}); //returns 'fake1'
mock({a : 2}); //returns 'fake2'
mock({a : 2, b : {c : 'foo', d : ['me', 'too']}}); //returns 'fake3'
mock(obj);  //returns 'fake4'
mock({});  //throws unexpected arguments
```
Note: Struct matching is strict on leaf properties. All leaf property values must be equal to match, and an empty object does not match a non-empty expected struct.

__Repeats__

```js
var mock = require('a').mock();
mock.expect().return('fake').repeat(2);

mock(); //returns 'fake'
mock(); //returns 'fake'
mock(); //throws unexpected arguments
```

__Infinite repeats__

```js
var mock = require('a').mock();
mock.expect().return('fake').repeatAny();

mock(); //returns 'fake'
mock(); //returns 'fake'
mock(); //returns 'fake'...
```


__Ignoring a single argument__

```js
var mock = require('a').mock();
mock.ignore().expect('foo').return('fake1');

mock('ignore me', 'foo'); //returns 'fake1'
mock(); //throws unexpected arguments
```

__Ignoring all arguments__

```js
var mock = require('a').mock();
mock.ignoreAll().return('fake1'); //same as expectAnything

mock('someRandomValue', 'whatever'); //returns 'fake1'
mock(); //throws unexpected arguments
```


__Throwing exceptions__

```js
var mock = require('a').mock();
var error = new Error('invalid operation');
mock.expect().throw(error);
mock.expect().return('fake');

mock(); //throws error
mock(); //returns 'fake'
```

__Intercepting__

```js
var mock = require('a').mock();
mock.expect('testValue').whenCalled(onCalled).return('fake1');

function onCalled(arg) {
	//arg == 'testValue'
}

mock('testValue'); //returns 'fake1'
mock(); //throws unexpected arguments
```

__Verify (fail)__

```js
var mock = require('a').mock();
mock.expect('testValue1').return('fake1');
mock.expect('testValue2').return('fake2');

mock('testValue1'); //returns 'fake1'
mock.verify(); //throws mock has 1 pending functions
```

__Verify (success)__

```js
var mock = require('a').mock();
mock.expect('testValue1').return('fake1');
mock.expect('testValue2').return('fake2');

mock('testValue1'); //returns 'fake1'
mock('testValue2'); //returns 'fake2'
mock.verify(); //returns true
```

__returning void (compact syntax)__

```js
var mock = require('a').mock();
mock.expect('testValue1');
mock.expect('testValue2').repeat(2);

mock('testValue1'); //returns undefined
mock('testValue2'); //returns undefined
mock('testValue2'); //returns undefined
mock.verify(); //returns true
```

__..is equivalent to ..__
```js
var mock = require('a').mock();
mock.expect('testValue1').return();
mock.expect('testValue2').return().repeat(2);

mock('testValue1'); //returns undefined
mock('testValue2'); //returns undefined
mock('testValue2'); //returns undefined
mock.verify(); //returns true
```

__Reset mock__
```js
var original = function() {
	return 'realValue';
}

var mock = require('a').mock(original);
original = mock;
mock.expect().return('fake');
mock.reset();

original(); //returns 'realValue'
```

__Returning resolved promise__
```js
var mock = require('a').mock();
mock.expect('foo').resolve('fake');

mock('foo').then(function(returned){
	//returned == 'fake'
}); 
```

__Returning rejected promise__
```js
var mock = require('a').mock();
mock.expect('foo').reject('fake');

mock('foo').then(null, function(returned){
	//returned == 'fake'
}); 
```

__Strict mock - advanced scenario__

```js
var mock = require('a').mock();
mock.expect('testValue').ignore().whenCalled(onCalled).return('fake1');

function onCalled(arg,callback) {
	//arg == 'testValue'
	//callback == foo
}

function foo() {
}


mock('testValue', foo); //returns 'fake1'
mock.verify() //returns true
mock('testValue',foo); //throws unexpected arguments
```

Mocking require
----------------

__expectRequire__

```js
var fakeDep = {};

var expectRequire = require('a').expectRequire;
expectRequire('./realDep').return(fakeDep);

require('./realDep'); //returns fakeDep
require('./realDep'); //returns realDep (behaves like a partial mock)
```

__requireMock (compact syntax)__

```js
var requireMock = require('a').requireMock;
var fakeDep = requireMock('./realDep'); //returns a strict mock

require('./realDep'); //returns fakeDep
require('./realDep'); //returns realDep
```

__..is equivalent to ..__

```js
var mock = require('a').mock();
var expectRequire = require('a').expectRequire;

var fakeDep = mock;
expectRequire('./realDep').return(fakeDep);

require('./realDep'); //returns fakeDep
require('./realDep'); //returns realDep
```

__Reset mocks for require__

```js
var fakeDep = {};

var expectRequire = require('a').expectRequire;
expectRequire('./realDep').return(fakeDep);
expectRequire.reset();

require('./realDep'); //returns realDep
```

__..is equivalent to ..__

```js
var requireMock = require('a').requireMock;
var fakeDep = requireMock('./realDep'); //returns a strict mock
requireMock.reset(); //is an alias for expectRequire.reset()

require('./realDep'); //returns realDep

```
Mocking promises
-----------------
__Mocking resolve__

```js
var a = require('a');

var promise = a.promise(); //mocked promise

promise.then(success,error);
promise.resolve('success');

function success(arg) {
	console.log(arg);//success
}

function error(e) {
	//will not happen
}
```

__Mocking resolve (alternative syntax)__

```js
var a = require('a');

var promise = a.promise(); //mocked promise

promise.then(success,error);
promise('success');

function success(arg) {
	console.log(arg);//success
}

function error(e) {
	//will not happen
}
```

__Mocking reject__

```js
var a = require('a');

var promise = a.promise();

promise.then(success,error);
promise.reject(new Error('error'));

function success(arg) {
	//will not happen
}

function error(e) {
	console.log(e.stack);//will happen
}
```

__Mocking reject (alternative syntax)__

```js
var a = require('a');

var promise = a.promise();

promise.then(success,error);
promise(null,new Error('error'));

function success(arg) {
	//will not happen
}

function error(e) {
	console.log(e.stack);//will happen
}
```

_A test framework_
===================
<b>From version 3.0.0 this is in a separate package: [npmjs.com/package/a_test](https://npmjs.com/package/a_test)</b>  
_A_ test framework is a simplistic, magic-free library providing unit-testing facilities with a compact, bdd-style syntax.

In contrast to other bdd-style test frameworks, it doesn't allow nesting suites in each other in order to test the SUT(subject under test) in different states. Instead, the framework relies on folder structure to describe the state. The SUT currently has that folder structure. Suite names are generated based on their filenames. As a result, there will be many small test files without nested test suites instead of a few big test files with nested test suites.

Test setup, the "Arrange-Act" part of suites, is separated from the "Assert" part. This way the same setup can be used across different suites. Test setups can be chained.


Examples below can be found here: https://github.com/alfateam/a_demo

Example
---------
The test runner ( _a_ ) will search for all files named 'when*.js' in the current and sub-directories.

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

```js
module.exports = function () {
	var counter = {
		value: 0,
		increment: function() { value++; }
	};

	return counter;
}
```

__counter_specs/new.js__

```js
function act(c) {
	var createCounter = require('../counter');
	c.sut = createCounter();
}
module.exports = act;
```

__counter_specs/when_new.js__

```js
var c = {}; //test context object
var when = require('a').when;

when('./new', c). //set up
	it('should be an object').
		assertEqual('object', typeof c.sut)
	it('should have value equal to zero').
		assertEqual(0, c.sut.value).
	it('should fail just for fun').
		assertFail('error message');

```

__counter_specs/new/increment.js__

```js
function act(c) {
	c.sut.increment();
}
act.base = '../new';
module.exports = act;
```

__counter_specs/new/when_incremented.js__

```js
var c = {};
var when = require('a').when;

when('./increment', c).
	it('should have value equal to 1').
		assertEqual(1, c.sut.value);

```

__In demo directory, run _a_ __

	user@localhost:~/a_demo $ a

	 » counter_specs » new

	  ✓ should be an object
	  ✓ should have value equal to zero
	  ✘ should fail just for fun

	 » counter_specs » new » increment

	  ✓ should have value equal to 1

	========== Summary =============

	counter_specs » new
	  ✘ should fail just for fun

	AssertionError: error message
    	at retval.assertFail (/home/user/a_demo/node_modules/a/when/it.js:14:11)
    	at Object.test (/home/user/a_demo/node_modules/a/when/test_invoker.js:5:3)
    	at Object.retval.assertFail (/home/user/a_demo/node_modules/a/when/it.js:13:5)
    	at Object.<anonymous> (/home/user/a_demo/counter_specs/when_new.js:11:3)
    	at Module._compile (module.js:449:26)
    	at Object.Module._extensions..js (module.js:467:10)
    	at Module.load (module.js:356:32)
    	at Function.Module._load (module.js:312:12)
    	at Module.require (module.js:362:17)
    	at require (module.js:378:17)
	------------

	suites: 2, passed: 3, failed: 1

Async test support
------------------
Modified act files should look like this:

```js

function act(c) {
	...
	return c.sut(c.arguments); //returns promise
}

```

or

```js

async function act(c) {
	...
	await c.sut(c.arguments);
}

```
Test file should look like this:
```js
var when = require('a').when;
var c = {};

when(c).then(it => {
	it('....').assertXXXX();
});

```