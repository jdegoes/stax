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

import haxe.functional.Predicate;

using PreludeExtensions;

class Predicate1Extensions {
  public static function and<T>(p1: Predicate<T>, p2: Predicate<T>): Predicate<T> {
    return function(value) {
      return p1(value) && p2(value);
    }
  }
  
  public static function andAll<T>(p1: Predicate<T>, ps: Iterable<Predicate<T>>): Predicate<T> {
    return function(value) {
      var result = p1(value);
      
      for (p in ps) {
        if (!result) break;
        
        result = result && p(value);
      }
      
      return result;
    }
  }
  
  public static function or<T>(p1: Predicate<T>, p2: Predicate<T>): Predicate<T> {
    return function(value) {
      return p1(value) || p2(value);
    }
  }
  
  public static function orAny<T>(p1: Predicate<T>, ps: Iterable<Predicate<T>>): Predicate<T> {
    return function(value) {
      var result = p1(value);
      
      for (p in ps) {
        if (result) break;
        
        result = result || p(value);
      }
      
      return result;
    }
  }
  
  public static function negate<T>(p: Predicate<T>): Predicate<T> {
    return function(value) {
      return !p(value);
    }
  }
}
