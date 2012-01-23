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

package stax;

import Prelude;
using Stax;
import Stax;

import stax.Tuples;
using stax.Tuples;

using stax.Iterables;

class Iterables {
	 public static function foldl1<T, T>(iter: Iterable<T>, mapper: T -> T -> T): T {
    var folded = iter.head();
    iter = iter.tail();
		
    for (e in iter) { folded = mapper(folded, e); }
    
    return folded;
  }

  public static function concat<T>(iter1: Iterable<T>, iter2: Iterable<T>): Iterable<T>
    return iter1.toArray().concat(iter2.toArray())
  
  public static function foldr<T, Z>(iterable: Iterable<T>, z: Z, f: T -> Z -> Z): Z {
    return Arrays.foldr(iterable.toArray(), z, f);
  }
  
  public static function headOption<T>(iter: Iterable<T>): Option<T> {
    var iterator = iter.iterator();
    return if (iterator.hasNext()) Some(iterator.next());
           else None;
  }
  
  public static function head<T>(iter: Iterable<T>): T {
    return switch(headOption(iter)) {
      case None: Stax.error('Iterable has no head');
      case Some(h): h;
    }
  }
  
  public static function tailOption<T>(iter: Iterable<T>): Option<Iterable<T>> {
    var iterator = iter.iterator();
    
    return if (!iterator.hasNext()) None;
           else Some(drop(iter, 1));
  }
  
  public static function drop<T>(iter: Iterable<T>, n: Int): Iterable<T> {
    var iterator = iter.iterator();
    
    while (iterator.hasNext() && n > 0) {
      iterator.next();
      --n;
    }
    
    var result = [];
    
    while (iterator.hasNext()) result.push(iterator.next());
    
    return result;
  }
  
  public static function take<T>(iter: Iterable<T>, n: Int): Iterable<T> {
    var iterator = iter.iterator();
    var result = [];
    
    for (i in 0...(n)) {
      if (iterator.hasNext()) { result.push(iterator.next()); };
    }
    
    return result;
  }
  
  
  public static function tail<T>(iter: Iterable<T>): Iterable<T> {
    return switch (tailOption(iter)) {
      case None: Stax.error('Iterable has no tail');
      
      case Some(t): t;
    }
  }
  
  public static function exists<T>(iter: Iterable<T>, eq: T -> T -> Bool, value: T): Bool {
    for (element in iter)
      if (eq(element, value)) { return true; };
    return false;
  }
  
  public static function nub<T>(iter: Iterable<T>): Iterable<T> {
    var result = [];

    for (element in iter)
      if (!exists(result, function(a, b) { return a == b; }, element)) { result.push(element); };
    
    return result;
  }
  
  public static function at<T>(iter: Iterable<T>, index: Int): T {
    var result: T = null;
    
    if (index < 0) index = IterableLambda.size(iter) - (-1 * index);
    
    var curIndex  = 0;
    for (e in iter) {
      if (index == curIndex) {
        return e;
      }
      else ++curIndex;
    }
    return Stax.error('Index not found');
  }
  public static function flatten<T>(iter: Iterable<Iterable<T>>): Iterable<T> {
		var empty : Iterable<T> = [];
		return IterableLambda.foldl(iter, empty, concat);
  }
  public static function interleave<T>(iter: Iterable<Iterable<T>>): Iterable<T> {
		var alls = iter.map(function (it) return it.iterator()).toArray();
		var res = [];		
		while (stax.Arrays.forAll(alls, function (iter) return iter.hasNext())) { //alls.forAll(function (iter) return iter.hasNext()))  <- stack overflow!!
			alls.forEach(function (iter) res.push(iter.next()));
		}
		return res;
  }

  public static function zip<T1, T2>(iter1: Iterable<T1>, iter2: Iterable<T2>): Iterable<Tuple2<T1, T2>> {
    var i1 = iter1.iterator();
    var i2 = iter2.iterator();
    
    var result = [];
    
    while (i1.hasNext() && i2.hasNext()) {
      var t1 = i1.next();
      var t2 = i2.next();
      
      result.push(t1.entuple(t2));
    }
    
    return result;
  }
  
  public static function append<T>(iter: Iterable<T>, e: T): Iterable<T> {
    return foldr(iter, [e], function(a, b) {
      b.unshift(a);
      
      return b;
    });
  }
  
  public static function cons<T>(iter: Iterable<T>, e: T): Iterable<T> {
    return IterableLambda.foldl(iter, [e], function(b, a) {
      b.push(a);
      
      return b;
    });
  }
  public static function reversed<T>(iter: Iterable<T>): Iterable<T> {
    return IterableLambda.foldl(iter, [], function(a, b) {
      a.unshift(b);
      
      return a;
    });
  }
  
  public static function and<T>(iter: Iterable<Bool>): Bool {
    var iterator = iter.iterator();
    
    while (iterator.hasNext()) {
      var element = iterator.next();
      if (element == false) { return false; }; 
    }
    return true;
  }
  
  public static function or<T>(iter: Iterable<Bool>): Bool {
    var iterator = iter.iterator();
    
    while (iterator.hasNext()) {
      if (iterator.next() == true) { return true; }; 
    }
    return false;
  }
  
  public static function scanl<T>(iter:Iterable<T>, init: T, f: T -> T -> T): Iterable<T> {
    var result = [init];
    
    for (e in iter) {
      result.push(f(e, init));
    }
    
    return result;
  }
  
  public static function scanr<T>(iter:Iterable<T>, init: T, f: T -> T -> T): Iterable<T> {
    return scanl(reversed(iter), init, f);
  }
  
  public static function scanl1<T>(iter:Iterable<T>, f: T -> T -> T): Iterable<T> {
    var iterator = iter.iterator();
    var result = [];
    if(!iterator.hasNext())
      return result;
    var accum = iterator.next();
    result.push(accum);
    while (iterator.hasNext())
      result.push(f(iterator.next(), accum));
    
    return cast result;
  }
  
  public static function scanr1<T>(iter:Iterable<T>, f: T -> T -> T): Iterable<T> {
    return scanl1(reversed(iter), f);
  }
  
  public static function existsP<T>(iter:Iterable<T>, ref: T, f: T -> T -> Bool): Bool {
    var result:Bool = false;
    
    for (e in iter) {
      if (f(ref, e)) result = true;
    }
    
    return result;
  }

  public static function nubBy<T>(iter:Iterable<T>, f: T -> T -> Bool): Iterable<T> {
    return IterableLambda.foldl(iter, [], function(a, b) {
      return if(existsP(a, b, f)) {
        a;
      }
      else {
        a.push(b);
        a;
      }
    });
  }
  
  public static function intersectBy<T>(iter1: Iterable<T>, iter2: Iterable<T>, f: T -> T -> Bool): Iterable<T> {
    return IterableLambda.foldl(iter1, cast [], function(a: Iterable<T>, b: T): Iterable<T> {
      return if (existsP(iter2, b, f)) append(a, b); else a;
    });
  }
  
  public static function intersect<T>(iter1: Iterable<T>, iter2: Iterable<T>): Iterable<T> {
    return IterableLambda.foldl(iter1, cast [], function(a: Iterable<T>, b: T): Iterable<T> {
      return if (existsP(iter2, b, function(a, b) { return a == b; })) append(a, b); else a;
    });
  }
  
  public static function unionBy<T>(iter1: Iterable<T>, iter2: Iterable<T>, f: T -> T -> Bool): Iterable<T> {
    var result = iter1;
    
    for (e in iter2) {
      var exists = false;
      
      for (i in iter1) {
        if (f(i, e)) {
          exists = true;
        }
      }
      if (!exists) {
        result = append(result, e);
      }
    }
    
    return result;
  }
  	
  public static function union<T>(iter1: Iterable<T>, iter2: Iterable<T>): Iterable<T> {
    return unionBy(iter1, iter2, function(a, b) { return a == b; });
  }
   
  public static function partition<T>(iter: Iterable<T>, f: T -> Bool): Tuple2<Iterable<T>, Iterable<T>> {
    return cast iter.toArray().partition(f);
  }
  
  public static function partitionWhile<T>(iter: Iterable<T>, f: T -> Bool): Tuple2<Iterable<T>, Iterable<T>> { 
    return cast iter.toArray().partitionWhile(f);
  }

  public static function count<T>(iter: Iterable<T>, f: T -> Bool): Int {
    return iter.toArray().count(f);
  } 
  
  public static function countWhile<T>(iter: Iterable<T>, f: T -> Bool): Int {
    return iter.toArray().countWhile(f);
  }
  
  public static function elements<T>(iter: Iterable<T>): Iterable<T> {
    return iter.toArray();
  }
  
  public static function appendAll<T>(iter: Iterable<T>, i: Iterable<T>): Iterable<T> {
    return iter.toArray().appendAll(i);
  }
  
  public static function isEmpty<T>(iter: Iterable<T>): Bool {
    return !iter.iterator().hasNext();
  }
   
  public static function find<T>(iter: Iterable<T>, f: T -> Bool): Option<T> {
    return iter.toArray().find(f);
  }
  public static function forEach<T>(iter : Iterable<T>, f : T-> Void ):Void {
    for (e in iter) f(e);
	}
  public static function forAll<T>(iter: Iterable<T>, f: T -> Bool): Bool {
    return iter.toArray().forAll(f);
  }
  
  public static function forAny<T>(iter: Iterable<T>, f: T -> Bool): Bool {
    return iter.toArray().forAny(f);
  }
	public static inline function first<T>(iter:Iterable<T>):T{
		return iter.head();
	}
}