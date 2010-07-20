/*
 HaXe library written by Franco Ponticelli <franco.ponticelli@gmail.com>

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the
 distribution.

 THIS SOFTWARE IS PROVIDED BY FRANCO PONTICELLI "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL SOCIAL MEDIA NETWORKS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
package haxe.test;

import haxe.test.Assertation;

/**
* @todo add documentation
*/
class TestHandler<T> {
	private static inline var POLLING_TIME = 10;
	public var results(default, null) : List<Assertation>;
	public var fixture(default, null) : TestFixture<T>;
	var asyncStack : List<Dynamic>;

	public var onTested(default, null) : Dispatcher<TestHandler<T>>;
	public var onTimeout(default, null) : Dispatcher<TestHandler<T>>;
	public var onComplete(default, null) : Dispatcher<TestHandler<T>>;

	public function new(fixture : TestFixture<T>) {
		if(fixture == null) throw "fixture argument is null";
		this.fixture    = fixture;
		this.results    = new List();
		this.asyncStack = new List();
		this.onTested   = fixture.onTested;
		this.onTimeout  = fixture.onTimeout;
		this.onComplete = fixture.onComplete;
	}

	public function execute() {
		try {
			executeMethodByName(fixture.setup);
			try {
				executeMethod(fixture.method);
			} catch (e : Dynamic) {
				results.add(Error(e, exceptionStack()));
			}
		} catch(e : Dynamic) {
			results.add(SetupError(e, exceptionStack()));
		}
		checkTested();
	}
	
	static function exceptionStack(pops = 2)
	{
		var stack = haxe.Stack.exceptionStack();
		while (pops-- > 0)
		{
			stack.pop();
		}
		return stack;
	}

	function checkTested() {
#if (flash || js)
		if(expireson == null || asyncStack.length == 0) {
			tested();
		} else if(haxe.Timer.stamp() > expireson) {
			timeout();
		} else {
			haxe.Timer.delay(checkTested, POLLING_TIME);
		}
#else
		if(asyncStack.length == 0)
			tested();
		else
			timeout();
#end
	}

	public var expireson(default, null) : Null<Float>;
	public function setTimeout(timeout : Int) {
		var newexpire = haxe.Timer.stamp() + timeout/1000;
		expireson = (expireson == null) ? newexpire : (newexpire > expireson ? newexpire : expireson);
	}

	function bindHandler() {
		Assert.results     = this.results;
		Assert.createAsync = this.addAsync;
		Assert.createEvent = this.addEvent;
	}

	function unbindHandler() {
		Assert.results     = null;
		Assert.createAsync = function(f, ?t){ return function(){}};
		Assert.createEvent = function(f, ?t){ return function(e){}};
	}

	/**
	* Adds a function that is called asynchronously.
	*
	* Example:
	* <pre>
	* var fixture = new TestFixture(new TestClass(), "test");
	* var handler = new TestHandler(fixture);
	* var flag = false;
	* var async = handler.addAsync(function() {
	*   flag = true;
	* }, 50);
	* handler.onTimeout.add(function(h) {
	*   trace("TIMEOUT");
	* });
	* handler.onTested.add(function(h) {
	*   trace(flag ? "OK" : "FAILED");
	* });
	* haxe.Timer.delay(function() async(), 10);
	* handler.execute();
	* </pre>
	* @param	f, the function that is called asynchrnously
	* @param	timeout, the maximum time to wait for f() (default is 250)
	* @return	returns a function closure that must be executed asynchrnously
	*/
	public function addAsync(f : Void->Void, timeout = 250) {
		asyncStack.add(f);
		var handler = this;
		setTimeout(timeout);
		return function() {
			if(!handler.asyncStack.remove(f)) {
				handler.results.add(AsyncError("method already executed", []));
				return;
			}
			try {
				handler.bindHandler();
				f();
			} catch(e : Dynamic) {
				handler.results.add(AsyncError(e, exceptionStack(0))); // TODO check the correct number of functions is popped from the stack
			}
		};
	}

	public function addEvent<EventArg>(f : EventArg->Void, timeout = 250) {
		asyncStack.add(f);
		var handler = this;
		setTimeout(timeout);
		return function(e : EventArg) {
			if(!handler.asyncStack.remove(f)) {
				handler.results.add(AsyncError("event already executed", []));
				return;
			}
			try {
				handler.bindHandler();
				f(e);
			} catch(e : Dynamic) {
				handler.results.add(AsyncError(e, exceptionStack(0))); // TODO check the correct number of functions is popped from the stack
			}
		};
	}

	function executeMethodByName(name : String) {
		if(name == null) return;
		var method = Reflect.field(fixture.target, name);
		if (method != null) {
		  bindHandler();
		  Reflect.callMethod(fixture.target, method, []);
		}
	}
	
	function executeMethod(f : Void -> Void) {
	  if (f != null) {
		  bindHandler();
		  f();
		}
	}

	function tested() {
		if(results.length == 0)
			results.add(Warning("no assertions"));
		onTested.dispatch(this);
		completed();
	}

	function timeout() {
		results.add(TimeoutError(asyncStack.length, []));
		onTimeout.dispatch(this);
		completed();
	}

	function completed() {
		try {
			executeMethodByName(fixture.teardown);
		} catch(e : Dynamic) {
			results.add(TeardownError(e, exceptionStack(2))); // TODO check the correct number of functions is popped from the stack
		}
		unbindHandler();
		onComplete.dispatch(this);
	}
}