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
package stax;

using Stax;
import Stax;

import Prelude; 
import stax.Tuples;
using stax.Tuples;

import stax.plus.Equal;

using stax.Maths;
using stax.Options;

using stax.Arrays;

class Arrays { 
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

  public static function flatten<T>(arrs: Array<Array<T>>): Array<T> {
		var res : Array<T> = [];
		for (arr in arrs) {
			for (e in arr) {
				res.push(e);
			}
		}
		return res;
	}
  
	public static function interleave<T>(alls: Array<Array<T>>): Array<T> {
		var res = [];		
		if (alls.length > 0) {
			var length = {
				var minLength = alls[0].length.toFloat();
				for (e in alls)
					minLength = Math.min(minLength, e.length.toFloat());
				minLength.toInt();
			}
			var i = 0;
			while (i < length) {
				for (arr in alls)
					res.push(arr[i]);
				i++;
			}
		}
		return res;
	}
	
  public static function flatMapTo<A, B>(src: Array<A>, dest: Array<B>, f: A -> Array<B>): Array<B> {
    return src.foldl(dest, function(a, b) {
			for (e  in f(b))
				a.push(e);
			return a;
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
    
    return result;
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
   
  public static function find<T>(arr: Array<T>, f: T -> Bool): Option<T>
    return arr.foldl(
		None,
		function(a, b) return
			switch (a) {
				case None: b.toOption().filter(f);
				default: a;
		  }
    )

  public static function findIndexOf<T>(arr: Array<T>, obj: T): Option<Int> {
	var index = arr.indexOf(obj);
	return if (index == -1) None else Some(index);
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
    return nubBy(arr, Equal.getEqualFor(arr[0]));
  }
  
  public static function intersectBy<T>(arr1: Array<T>, arr2: Array<T>, f: T -> T -> Bool): Array<T> {
    return arr1.foldl([], function(a: Array<T>, b: T): Array<T> {
      return if (existsP(arr2, b, f)) a.append(b); else a;
    });
  }
  
  public static function intersect<T>(arr1: Array<T>, arr2: Array<T>): Array<T> {
    return intersectBy(arr1, arr2, Equal.getEqualFor(arr1[0]));
  }
	public static function splitAt<T>(srcArr : Array<T>, index : Int) : Tuple2 < Array<T>, Array<T> > return
		srcArr.slice(0, index).entuple(srcArr.slice(index))   
  
  public static function indexOf<T>(a: Array<T>, t: T): Int {
    var index = 0;
    
    for (e in a) { 
      if (e == t) return index;
      
      ++index;
    }
    
    return -1;
  } 
  public static function mapWithIndex<T, S>(a: Array<T>, f: T -> Int -> S): Array<S> {
    var n: Array<S> = [];
    var i = 0;
    for (e in a) n.push(f(e, i++));
    
    return n;
  }
  public static function then<T, S>(a1: Array<T>, a2: Array<S>): Array<S> {
    return a2;
  }
  
  public static function foldr<T, Z>(a: Array<T>, z: Z, f: T -> Z -> Z): Z {
    var r = z;
    
    for (i in 0...a.length) { 
      var e = a[a.length - 1 - i];
      
      r = f(e, r);
    }
    
    return r;
  }
  
  public static function zip<A, B>(a: Array<A>, b: Array<B>): Array<Tuple2<A, B>> {
		return zipWith(a, b, Tuple2.create);
  }

  public static function zipWith<A, B, C>(a: Array<A>, b: Array<B>, f : A -> B -> C): Array<C> {
    var len = Math.floor(Math.min(a.length, b.length));
    
    var r: Array<C> = [];
    
    for (i in 0...len) {
      r.push(f(a[i], b[i]));
    }
    
    return r;
  }

  public static function zipWithIndex<A>(a: Array<A>): Array<Tuple2<A, Int>> {
		return zipWithIndexWith(a, Tuple2.create);
  }

  public static function zipWithIndexWith<A, B>(a: Array<A>, f : A -> Int -> B): Array<B> {
    var len = a.length;
    
    var r: Array<B> = [];
    
    for (i in 0...len) {
      r.push(f(a[i], i));
    }
    
    return r;
  }
	
  public static function append<T>(a: Array<T>, t: T): Array<T> {
    var copy = ArrayLamda.snapshot(a);
    
    copy.push(t);
    
    return copy;
  }  
  public static function first<T>(a: Array<T>): T {
    return a[0];
  }
  
  public static function firstOption<T>(a: Array<T>): Option<T> {
    return if (a.length == 0) None; else Some(a[0]);
  }
  
  public static function last<T>(a: Array<T>): T {
    return a[a.length - 1];
  }
  
  public static function lastOption<T>(a: Array<T>): Option<T> {
    return if (a.length == 0) None; else Some(a[a.length - 1]);
  }
  
  public static function contains<T>(a: Array<T>, t: T): Bool {
    for (e in a) if (t == e) return true;
    
    return false;
  }
  
  public static function forEach<T>(a: Array<T>, f: T -> Void): Array<T> {
    for (e in a) f(e);
    
    return a;
  }  
  public static function forEachWithIndex<T>(a: Array<T>, f: T -> Int -> Void): Array<T> {
    var i = 0;
		for (e in a) f(e, i++);
    
    return a;
  }  
  public static function take<T>(a: Array<T>, n: Int): Array<T> {
    return a.slice(0, n.min(a.length));
  }
  public static function takeWhile<T>(a: Array<T>, p: T -> Bool): Array<T> {
    var r = [];
    
    for (e in a) {
      if (p(e)) r.push(e); else break;
    }
    
    return r;
  }
  public static function drop<T>(a: Array<T>, n: Int): Array<T> {
    return if (n >= a.length) [] else a.slice(n);
  }
  public static function dropWhile<T>(a: Array<T>, p: T -> Bool): Array<T> {
    var r = [].concat(a);
    
    for (e in a) {
      if (p(e)) r.shift(); else break;
    }
    
    return r;
  }

	public static function sliceBy<T>(srcArr : Array<T>, sizeSrc : Array<Int>) : Array<Array<T>> return {
		var slices = [];		
		var restIndex = 0;
		for (size in sizeSrc) {
			var newRestIndex = restIndex + size;
			var slice = srcArr.slice(restIndex, newRestIndex);
			slices.push(slice);
			restIndex = newRestIndex;
		}
		slices;
	}
}