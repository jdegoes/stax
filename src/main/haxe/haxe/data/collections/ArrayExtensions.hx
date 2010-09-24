/*
 HaXe library written by John A. De Goes <john@socialmedia.com>
 Contributed by Social Media Networks

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 Redistributions of source code must retain the above snapshotright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above snapshotright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the
 distribution.

 THIS SOFTWARE IS PROVIDED BY SOCIAL MEDIA NETWORKS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL SOCIAL MEDIA NETWORKS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
package haxe.data.collections;

import Prelude; 
using PreludeExtensions;

class ArrayExtensions { 
  public static function partition<T>(arr: Array<T>, f: T -> Bool): Tuple2<Array<T>, Array<T>> {
    return arr.foldl(Tuple2.create([], []), function(a, b) {
      if(f(b))
        a._1.push(b);
      else
        a._2.push(b);
      return a;
    });
  }
  
  public static function partitionWhile<T>(arr: Array<T>, f: T -> Bool): Tuple2<Array<T>, Array<T>> {
    var partitioning = true;
    
    return arr.foldl(Tuple2.create([], []), function(a, b) {
      if (partitioning) {
        if (f(b))
          a._1.push(b);
        else {
          partitioning = false;
          a._2.push(b);
        }
      }
      else
        a._2.push(b);
      return a;
    });
  }

  public static function mapTo<A, B>(src: Array<A>, dest: Array<B>, f: A -> B): Array<B> {
    return src.foldl(dest.snapshot(), function(a, b) {
      a.push(f(b));
      return a;
    });
  }

  public static function flatMapTo<A, B>(src: Array<A>, dest: Array<B>, f: A -> Array<B>): Array<B> {
    return src.foldl(dest, function(a, b) {
      return f(b).foldl(a, function(a, b) {
        a.push(b);
        return a;
      });
    });
  }      

  public static function count<T>(arr: Array<T>, f: T -> Bool): Int {
    return arr.foldl(0, function(a, b) {
      return a + (if (f(b)) 1 else 0);
    });
  }
  
  public static function countWhile<T>(arr: Array<T>, f: T -> Bool): Int {
    var counting = true;
    
    return arr.foldl(0, function(a, b) {
      return if (!counting) a;
      else {
        if (f(b)) a + 1;
        else {
          counting = false;
          
          a;
        }
      }
    });
  }
  
  public static function scanl<T>(arr:Array<T>, init: T, f: T -> T -> T): Array<T> {
    var accum = init;
    var result = [init];
    
    for (e in arr)
      result.push(f(e, accum));
    
    return result;
  }
  
  public static function scanr<T>(arr:Array<T>, init: T, f: T -> T -> T): Array<T> {
    var a = arr.snapshot();
    a.reverse();
    return scanl(a, init, f);
  }
  
  public static function scanl1<T>(arr:Array<T>, f: T -> T -> T): Array<T> {   
    var result = [];              
    if(0 == arr.length)
      return result;
    var accum = arr[0];
    result.push(accum);
    for(i in 1...arr.length)
      result.push(f(arr[i], accum));
    
    return cast result;
  }
  
  public static function scanr1<T>(arr:Array<T>, f: T -> T -> T): Array<T> {
    var a = arr.snapshot();
    a.reverse();    
    return scanl1(a, f);
  }
  
  public static function elements<T>(arr: Array<T>): Iterable<T> {
    return arr.snapshot();
  }
  
  public static function appendAll<T>(arr: Array<T>, i: Iterable<T>): Array<T> {
    var acc = arr.snapshot();
    
    for (e in i) 
      acc.push(e);
    
    return acc;
  }
  
  public static function isEmpty<T>(arr: Array<T>): Bool {
    return arr.length == 0;
  }
   
  public static function find<T>(arr: Array<T>, f: T -> Bool): Option<T> {
    return arr.foldl(None, function(a, b) {
      return switch (a) {
        case None: b.toOption().filter(f);
        default: a;
      }
    });
  }
  
  public static function forAll<T>(arr: Array<T>, f: T -> Bool): Bool {
    return arr.foldl(true, function(a, b) {
      return switch (a) {
        case true:  f(b);
        case false: false;
      }
    });
  }
  
  public static function forAny<T>(arr: Array<T>, f: T -> Bool): Bool {
    return arr.foldl(false, function(a, b) {
      return switch (a) {
        case false: f(b);
        case true:  true;
      }
    });
  }
  
  public static function exists<T>(arr: Array<T>, f: T -> Bool): Bool {
    return switch (find(arr, f)) {
      case Some(v): true;
      case None:    false;
    }
  }

  public static function existsP<T>(arr:Array<T>, ref: T, f: T -> T -> Bool): Bool {
    var result = false;

    for (e in arr) {
      if (f(e, ref)) 
        return true;
    }
  
    return false;
  }

  public static function nubBy<T>(arr:Array<T>, f: T -> T -> Bool): Array<T> {
    return arr.foldl([], function(a: Array<T>, b: T): Array<T> {
      return if (existsP(a, b, f)) {
        a;
      }
      else {
        a.append(b);
      }
    });
  }
  
  public static function nub<T>(arr:Array<T>): Array<T> {
    return nubBy(arr, function (a, b) { return a == b; });
  }
  
  public static function intersectBy<T>(arr1: Array<T>, arr2: Array<T>, f: T -> T -> Bool): Array<T> {
    return arr1.foldl([], function(a: Array<T>, b: T): Array<T> {
      return if (existsP(arr2, b, f)) a.append(b); else a;
    });
  }
  
  public static function intersect<T>(arr1: Array<T>, arr2: Array<T>): Array<T> {
    return intersectBy(arr1, arr2, function(a, b) return a == b);
  }
  
  public static function mkString<T>(arr: Array<T>, ?sep: String = ', ', ?show: T -> String): String {
    var isFirst = true;
    
    return arr.foldl('', function(a, b) {
      var prefix = if (isFirst) { isFirst = false; ''; } else sep;    
      if(null == show)
      show = Stax.getShowFor(b);
      return a + prefix + show(b);
    });
  }
  
  public static function toMap<K, V>(arr : Array<Tuple2<K, V>>) : Map<K, V> {  
    var dest = Map.create();
    return arr.foldl(dest, function(a, b) {
      return dest.append(a, b);
    });
  }
  
  public static function toList<T>(arr : Array<T>) : List<T> {  
    var dest = List.create();
    return arr.foldl(dest, function(a, b) {
      return dest.append(a, b);
    });
  }
  
  public static function toSet<T>(arr : Array<T>) : Set<T> {  
    var dest = Set.create();
    return arr.foldl(dest, function(a, b) {
      return dest.append(a, b);
    });
  }
   
}