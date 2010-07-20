/*
 HaXe library written by John A. De Goes <john@socialmedia.com>

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

import Prelude;

import haxe.test.MustMatchers;

using Prelude;

class MustMatcherExtensions {
	public static function negate<T>(c: MustMatcher<T>): MustMatcher<T> {
	  return function(value) {
	    return c(value).map(
  	    function(err) { return err; },
  	    function(suc) { return '!(' + suc + ')'; }
  	  );
  	}
	}
	
	public static function or<T>(c1: MustMatcher<T>, c2: MustMatcher<T>): MustMatcher<T> {
	  return function(value) {
	    return c1(value).composeRight(c2(value),
	      function(err1, err2) { return '(' + err1 + ') && (' + err2 + ')'; },
	      function(suc1, suc2) { return '(' + suc1 + ') || (' + suc2 + ')'; }
	    );
	  }
	}
	
	public static function and<T>(c1: MustMatcher<T>, c2: MustMatcher<T>): MustMatcher<T> {
	  return function(value) {
	    return c1(value).composeLeft(c2(value),
	      function(err1, err2) { return '(' + err1 + ') || (' + err2 + ')'; },
  	    function(suc1, suc2) { return '(' + suc1 + ') && (' + suc2 + ')'; }
  	  );
  	}
	}
}