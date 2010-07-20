/*
 HaXe library written by John A. De Goes <john@socialmedia.com>

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the
 distribution.

 THIS SOFTWARE IS PROVIDED BY SOCIAL MEDIA NETWORKS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL SOCIAL MEDIA NETWORKS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
package haxe.test;

import Prelude;
import haxe.test.Assert;
import haxe.test.MustMatchers;
import haxe.test.MustMatcherExtensions;
import haxe.PosInfos;

using Prelude;

class TestCase {
  public function new() {
  }
  
  public function before() {
  }
  
  public function after() {
  }
  
  public function beforeAll() {
  }
  
  public function afterAll() {
  }
  
  public function not<T>(c: MustMatcher<T>): MustMatcher<T> {
    return MustMatcherExtensions.negate(c);
  }
  
  public function assertThat<T>(obj: T, cond: MustMatcher<T>, ?msg: String, ?pos: PosInfos) {
    Assert.that(obj, cond, msg, pos);
  }
  
  public function assertTrue(cond : Bool, ?msg : String, ?pos : PosInfos) {
    Assert.isTrue(cond, msg, pos);
	}
	
	public function assertFalse(value : Bool, ?msg : String, ?pos : PosInfos) {
		Assert.isFalse(value, msg, pos);
	}

	public function assertNull(value : Dynamic, ?msg : String, ?pos : PosInfos) {
		Assert.isNull(value, msg, pos);
	}

	public function assertNotNull(value : Dynamic, ?msg : String, ?pos : PosInfos) {
	  Assert.notNull(value, msg, pos);
	}

	public function assertIs(value : Dynamic, type : Dynamic, ?msg : String , ?pos : PosInfos) {
		Assert.is(value, type, msg, pos);
	}
	
	public function assertNotEquals(expected : Dynamic, value : Dynamic, ?msg : String , ?pos : PosInfos) {
		Assert.notEquals(expected, value, msg, pos);
	}
	
	public function assertEquals<T>(expected : T, value : T, ?equal: Equal<T>, ?msg : String , ?pos : PosInfos) {
	  if (equal != null) {
	    Assert.isTrue(equal.equal(expected, value), (if (msg != null) msg else 'expected ' + expected + ' but found ' + value), pos);
	  }
	  else {
	    Assert.equals(expected, value, msg, pos);
	  }
	}
	
	public function assertMatches(pattern : EReg, value : Dynamic, ?msg : String , ?pos : PosInfos) {
	  Assert.matches(pattern, value, msg, pos);
	}

	public function assertFloatEquals(expected : Float, value : Float, ?approx : Float, ?msg : String , ?pos : PosInfos) : Void {
	  Assert.floatEquals(expected, value, approx, msg, pos);
	}
	
	public function assertLooksLike(expected : {}, value : {}, ?recursive : Bool, ?msg : String, ?pos : PosInfos) {
	  Assert.looksLike(expected, value, recursive, msg, pos);
	}

	public function assertThrowsException(method:Void -> Void, ?type:Class<Dynamic>, ?msg : String , ?pos : PosInfos) {
	  Assert.raises(method, type, msg, pos);
	}

	public function assertEqualsOneOf<T>(value : T, possibilities : Array<T>, ?msg : String , ?pos : PosInfos) {
	  Assert.equalsOneOf(value, possibilities, msg, pos);
	}

	public function assertContains<T>(values : Iterable<T>, match : T, ?msg : String , ?pos : PosInfos) {
	  Assert.contains(values, match, msg, pos);
	}
	
	public function assertNotContains<T>(values : Iterable<T>, match : T, ?msg : String , ?pos : PosInfos) {
	  Assert.notContains(values, match, msg, pos);
	}
	
	public function assertStringContains(match : String, value : String, ?msg : String , ?pos : PosInfos) {
	  Assert.stringContains(match, value, msg, pos);
	}
	
	public function assertStringSequence(sequence : Array<String>, value : String, ?msg : String , ?pos : PosInfos) {
		Assert.stringSequence(sequence, value, msg, pos);
	}
	
	public function assertDelivered<T>(future: Future<T>, assertions: T -> Void, ?timeout : Int) {
		return Assert.delivered(future, assertions, timeout);
	}
	
	public static function fail(msg = "failure expected", ?pos : PosInfos) {
		Assert.fail(msg, pos);
	}

	public static function warn(msg) {
		Assert.warn(msg);
	}
}
