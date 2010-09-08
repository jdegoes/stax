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
import PreludeExtensions;

import haxe.data.collections.Collection;

using PreludeExtensions;
using haxe.functional.FoldableExtensions;

typedef MatchResult = { assertion: String, negation: String }
typedef MustMatcher<T> = T -> Either<MatchResult, MatchResult>

// Assert.that(9, Must.equal(123).or(Must.beNull());
// Expected: (x == 123) || (x == null), but found: x == 9
class Must {
  public static function equal<T>(expected: T, ?equal: EqualFunction<T>): MustMatcher<T> {
    if (equal == null) equal = Stax.getEqualFor(expected);
    
    return function(value: T) {
      var result = {
        assertion: 'x == ' + value,
        negation:  'x != ' + value
      }
      
      return if (!equal(value, expected)) {
        Left(result);
      }
      else {
        Right(result);
      }
    }
  }
  
  public static function beTrue(): MustMatcher<Bool> {
    return function(value: Bool) {
      var result = {
        assertion: 'x == true',
        negation:  'x == false'
      }
      
      return if (!value) {
        Left(result);
      }
      else {
        Right(result);
      }
    }
  }
  
  public static function beFalse(): MustMatcher<Bool> {
    return function(value: Bool) {
      var result = {
        assertion: 'x == false',
        negation:  'x == true'
      }
      
      return if (value) {
        Left(result);
      }
      else {
        Right(result);
      }
    }
  }
  
  public static function beGreaterThan(ref: Float): MustMatcher<Float> {
    return function(value: Float) {
      var result = {
        assertion: 'x > ' + ref,
        negation:  'x <= ' + ref
      }
      
      return if (value <= ref) {
        Left(result);
      }
      else {
        Right(result);
      }
    }
  }
  
  public static function beLessThan(ref: Float): MustMatcher<Float> {
    return function(value: Float) {
      var result = {
        assertion: 'x < ' + ref,
        negation:  'x >= ' + ref
      }
      
      return if (value >= ref) {
        Left(result);
      }
      else {
        Right(result);
      }
    }
  }
  
  public static function beGreaterThanInt(ref: Int): MustMatcher<Int> {
    return function(value: Int) {
      var result = {
        assertion: 'x > ' + ref,
        negation:  'x <= ' + ref
      }
      
      return if (value <= ref) {
        Left(result);
      }
      else {
        Right(result);
      }
    }
  }
  
  public static function beLessThanInt(ref: Int): MustMatcher<Int> {
    return function(value: Int) {
      var result = {
        assertion: 'x < ' + ref,
        negation:  'x >= ' + ref
      }
      
      return if (value >= ref) {
        Left(result);
      }
      else {
        Right(result);
      }
    }
  }
  
  public static function haveLength<T>(length: Int): MustMatcher<Iterable<T>> {
    return function(value: Iterable<T>) {
      var len = 0;
      
      for (e in value) ++len;
      
      var result = {
        assertion: 'x.length == ' + length,
        negation:  'x.length != ' + length
      }
      
      return if (len != length) Left(result); else Right(result);
    }
  }
  
  public static function haveClass<T>(c: Class<T>): MustMatcher<Dynamic> {
    return function(value: Dynamic) {
      var result = {
        assertion: 'x.isInstanceOf(' + Type.getClassName(c) + ')',
        negation:  '!x.isInstanceOf(' + Type.getClassName(c) + ')',
      }
      
      return if (!Std.is(value, c)) Left(result); else Right(result);
    }
  }
  
  public static function containElement<C, T>(element: T): MustMatcher<Collection<C, T>> {
    return function(c: Collection<C, T>) {
      var result = {
        assertion: 'x.contains(' + element + ')',
        negation:  '!x.contains(' + element + ')'
      }
      
      return if (!c.contains(element)) Left(result); else Right(result);
    }
  }
  
  public static function containString(sub: String): MustMatcher<String> {
    return function(value: String) {
      var result = {
        assertion: 'x.contains("' + sub + '")',
        negation:  '!x.contains("' + sub + '")'
      }
      
      return if (!value.contains(sub)) Left(result); else Right(result);
    }
  }
  
  public static function startWithString(s: String): MustMatcher<String> {
    return function(value: String) {
      var result = {
        assertion: 'x.startsWith("' + s + '")',
        negation:  '!x.startsWith("' + s + '")'
      }
      
      return if (!value.startsWith(s)) Left(result); else Right(result);
    }
  }
  
  public static function endWithString(s: String): MustMatcher<String> {
    return function(value: String) {
      var result = {
        assertion: 'x.endsWith("' + s + '")',
        negation:  '!x.endsWith("' + s + '")'
      }
      
      return if (!value.endsWith(s)) Left(result); else Right(result);
    }
  }
  
  public static function beNull<T>(): MustMatcher<T> {
    return function(value: T) {
      var result = {
        assertion: 'x == null',
        negation:  'x != null'
      }
      
      return if (value != null) Left(result); else Right(result);
    }
  }
  
  public static function beNonNull<T>(): MustMatcher<T> {
    return function(value: T) {
      var result = {
        assertion: 'x != null',
        negation:  'x == null'
      }
      
      return if (value == null) Left(result); else Right(result);
    }
  }
}