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

import haxe.data.collections.Collection;

using Prelude;
using haxe.abstract.Foldable;

typedef MatchFailureMsg = String
typedef MatchSuccessMsg = String
typedef MustMatcher<T> = T -> Either<MatchFailureMsg, MatchSuccessMsg>

// assertThat(foo, Must.equal(123).or(Must.equal(34)).or(Must.beNull());
// Cause: (349 != 123) && (349 != 34) && (349 != null)
class Must {
	public static function equal<T>(expected: T, ?equal: Equal<T>): MustMatcher<T> {
	  if (equal == null) equal = DynamicExtensions.EqualT();
	  
	  return function(value: T) {
	    return if (!equal.equal(value, expected)) {
	      Left(expected + ' != ' + value);
	    }
	    else {
	      Right(expected + ' == ' + value);
	    }
	  }
	}
	
	public static function contain<C, T>(c: Collection<C, T>, element: T): MustMatcher<T> {
	  return function(value: T) {
	    return if (!c.contains(element)) {
	      Left('![' + c.mkString(', ') + '].contains(' + value + ')');
	    }
	    else {
	      Right('[' + c.mkString(', ') + '].contains(' + value + ')');
	    }
	  }
	}
	
	public static function beNull<T>(): MustMatcher<T> {
	  return function(value: T) {
	    return if (value != null) {
	      Left(value + ' != null');
	    }
	    else {
	      Right(value + ' == null');
	    }
	  }
	}
	
	public static function beNonNull<T>(): MustMatcher<T> {
	  return function(value: T) {
	    return if (value == null) {
        Left(value + ' == null');
      }
	    else {
	      Right(value + ' != null');
	    }
	  }
	}
}