_a_
===
_Mocking framework_ + _testing framework_.


The mocking framework can be used in any JavaScript testing framework.

The testing framework has a short and concise bdd syntax with reusable contexts.

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
mock.expect(['a','b').return('fake2');
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
mock.expectAnything().return('fake1'); //same as expectAnything

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

Mocking promises
-----------------
__Mocking resolve__

```js
var a = require('a');

var promise = a.then(); //mocked promise

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

var promise = a.then(); //mocked promise

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

var promise = a.then();

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

var promise = a.then();

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

Release Notes
---------------
__3.0.0__  
 - The the testing framework is moved to separate repo: [npmjs.com/package/a_test](https://npmjs.com/package/a_test)  
 
__2.1.2__  
 - [typo in docs](https://github.com/alfateam/a/pull/4)

__2.1.0__  
 - short hand syntax for returning promises (sync)

__2.0.13__  
 - a_mock 1.0.4, implements promise mock which is synchronous

__2.0.12__  
 - assertOk(falsy) would not throw (#21)
 - report suites that cannot be loaded as unrunnable (#20)
 - fix async test result reporting order

__2.0.11__  
 - README update

__2.0.10__  
 - disable runtime babel transpiling by default, set A_TEST_BABEL_REGISTER environment variable to enable it.

__2.0.9__  
 - replace dependency for coloured console output in test runner.

__2.0.8__  
- update README

__2.0.7__  
- test runner is able to load modules exporting a default function.

__2.0.6__  
- test runner reports when a file with tests is not runnable

__2.0.5__  
- test runner uses _node_ instead of _nodejs_

__2.0.4__
- correct reporting of aborted promise mocks

__2.0.3__  
- abort Unfulfilled promise mocks after 10secs.  

__2.0.2__  
- forgotten dependency version

__2.0.1__  
- Fix bin section in package.json.
- Fix memory leak in the test runner

__2.0.0__   
BREAKING CHANGE: Support async testing.
- Tests relying on ability of [deferred][2] to resolve synchronously expected to cause problems.
- Unfulfilled promises will prevent runner from exiting.
- Runner uses babel-runtime which implies strict mode.

__1.0.1__  
ExpectAnything() can be nested - for backwards compatability only.  
__1.0.0__  
ExpectAnything() no longer expects only one argument, but arbitary number of arguments. Use ignore() if you want to ignore a single argument.  
__0.4.8__  
Executable test runner "when" is deprecated. Use "a" instead.  
__0.4.7__  
Inconclusive tests are accounted as failed in exit code.  
__0.4.6__  
Fixed memory leak in test runner.  
__0.4.5__  
Display stack trace of inconclusive suites.  
Use dependency [deferred][2] instead of [promise][3].  
__0.4.4__  
Introduced promise mocks.  
Tests with failing setup are reported as inconclusive.  
Bugfix: Test names no longer converted to lowercase.  
__0.4.3__  
Can reset expectations on mocks by mock.reset.  
Renamed expectRequire.clear to expectRequire.reset. Same goes for for requireMock.  
__0.4.2__  
Can clear expectations on require by using expectRequire.clear.  
__0.4.1__  
"When" can accept function instead of separate act file. See example in [demo][1] repo.  
__0.4.0__  
Cleaner output on failed assertions.  
__0.3.9__   
Can inherit act by convention. See examples in [demo][0] repo.  
__0.3.8__  
Cleaner stack trace on mock errors.  
__0.3.7__  
Test path can be sent as argument to test runner.  
If no path is specified, the test runner will run from current directory.  
Example: ```when c:/devel/foo/testFolder```  
__0.3.6__  
Exit code is equal to number of failing tests.  
__0.3.5__  
Tests files are run in hierarchical order from top to bottom.  
__0.3.4__  
Cache was cleared at wrong time. This could lead to overflow when running large amount of tests.  
Make sure you update globally (npm update a -g) to get this fix, not only the local dependency.  
__0.3.3__  
Error in documentation about structs.  
__0.3.2__  
Mocks can be set up to throw.  
__0.3.1__  
"when" deletes all cached modules before executing. This ensures tests are isolated.  
ignore is alias for expectAnything.  
"When" can resolve act by camcelCase convention. If test class is named "whenFoo.js", it will assume "foo.js" is the act.  

__0.3.0__  
expectArray is deprecated, use expect instead.  
expect now handles structs - equality is acheived when same propertyNames and equal leaf properties.

__0.2.9__   
"When" can resolve act by convention. If test class is named "when_foo.js", it will assume "foo.js" is the act.  
Example, given when_foo.js:  
```js
var c = {};
var when = require('a').when;

when(c). //equivalent to: when('./foo',c)....
	it('should have value equal to 1').
		assertEqual(1, c.sut.value);

```
[0]:https://github.com/alfateam/a_demo
[1]:https://github.com/alfateam/a_demo/blob/master/assert_specs/when_assertions.js
[2]:https://www.npmjs.org/package/deferred
[3]:https://www.npmjs.org/package/promise
