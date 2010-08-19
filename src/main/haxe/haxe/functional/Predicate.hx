/*
 HaXe library written by John A. De Goes <john@socialmedia.com>
 Contributed by Social Media Networks

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
package haxe.functional;

import Prelude;
import PreludeExtensions;

using PreludeExtensions;

typedef Predicate<A> = Predicate1<A>

typedef Predicate1<A>             = Function<A, Bool>
typedef Predicate2<A, B>          = Function2<A, B, Bool>
typedef Predicate3<A, B, C>       = Function3<A, B, C, Bool>
typedef Predicate4<A, B, C, D>    = Function4<A, B, C, D, Bool>
typedef Predicate5<A, B, C, D, E> = Function5<A, B, C, D, E, Bool>

class P {
  public static function isNull<T>(): Predicate<T> {
    return function(value) {
      return value == null;
    }
  }
  
  public static function isNotNull<T>(): Predicate<T> {
    return function(value) {
      return value != null;
    }
  }
  
  public static function isGreaterThan(ref: Float): Predicate<Float> {
    return function(value) {
      return value > ref;
    }
  }
  
  public static function isLessThan(ref: Float): Predicate<Float> {
    return function(value) {
      return value < ref;
    }
  }
  
  public static function isGreaterThanInt(ref: Int): Predicate<Int> {
    return function(value) {
      return value > ref;
    }
  }
  
  public static function isLessThanInt(ref: Int): Predicate<Int> {
    return function(value) {
      return value < ref;
    }
  }
  
  public static function isEqualTo<T>(ref: T, ?equal: Equal<T>): Predicate<T> {
    if (equal == null) equal = DynamicExtensions.EqualT();
    
    return function(value) {
      return equal.equal(ref, value);
    }
  }
  
  public static function startsWith(s: String): Predicate<String> {
    return function(value: String) {
      return value.startsWith(s);
    }
  }
  
  public static function endsWith(s: String): Predicate<String> {
    return function(value: String) {
      return value.endsWith(s);
    }
  }
  
  public static function contains(s: String): Predicate<String> {
    return function(value: String) {
      return value.contains(s);
    }
  }
}
