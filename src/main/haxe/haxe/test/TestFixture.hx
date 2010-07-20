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

/**
* @todo add documentation
*/
class TestFixture<T> {
	public var target(default, null): T;
	public var methodName(default, null): String;
	public var method(default, null): Void -> Void;
	public var setup(default, null): String;
	public var teardown(default, null): String;
	public var expectAssertions(default, null): Bool;
	
	public var onTested(default, null) : Dispatcher<TestHandler<T>>;
	public var onTimeout(default, null) : Dispatcher<TestHandler<T>>;
	public var onComplete(default, null) : Dispatcher<TestHandler<T>>;
	
	public function new(target : T, methodName: String, method : Void -> Void, ?setup : String, ?teardown : String, ?expectAssertions: Bool = true) {
		this.target     = target;
		this.methodName = methodName;
		this.method     = method;
		this.setup      = setup;
		this.teardown   = teardown;
		this.expectAssertions = expectAssertions;
		
		this.onTested   = new Dispatcher();
		this.onTimeout  = new Dispatcher();
		this.onComplete = new Dispatcher();
	}

	function checkMethod(name : String, arg : String) {
		var field = Reflect.field(target, name);
		if(field == null)              throw arg + " function " + name + " is not a field of target";
		if(!Reflect.isFunction(field)) throw arg + " function " + name + " is not a function";
	}
}