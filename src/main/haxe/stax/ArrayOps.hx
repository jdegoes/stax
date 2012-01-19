package stax;

/**
 * ...
 * @author 0b1kn00b
 */
import Prelude;
import stax.Tuples;

using stax.ArrayOps;
using stax.IntOps;

class ArrayOps {
  public static function sort<T>(v : Array<T>) : Array<T> {
    return sortWith(v, Stax.getOrderFor(v[0]));
  }
  
  public static function sortWith<T>(v : Array<T>, order : OrderFunction<T>) : Array<T> {
    var r = v.copy();
    r.sort(order);
    return r;
  }
  
  public static function mapper < A, B > (src: Array<A>, f: A -> B): Array<B>
		return src.map(f)

  public static function proj < A, B > (f: A -> B) return function (src: Array<A>): Array<B>
		return src.map(f)

  public static function compare<T>(v1: Array<T>, v2: Array<T>) {
      return compareWith(v1, v2, Stax.getOrderFor(v1[0]));
  } 
  
  public static function compareWith<T>(v1: Array<T>, v2: Array<T>, order : OrderFunction<T>) {  
    var c = v1.length - v2.length;
    if(c != 0)
      return c; 
    if(v1.length == 0)
      return 0;                       
      for (i in 0...v1.length) {
        var c = order(v1[i], v2[i]);   
        if (c != 0) return c;
      }
      return 0;
  }

  public static function equals<T>(v1: Array<T>, v2: Array<T>) {
    return equalsWith(v1, v2, Stax.getEqualFor(v1[0]));
  }
  
  public static function equalsWith<T>(v1: Array<T>, v2: Array<T>, equal : EqualFunction<T>) { 
    if (v1.length != v2.length) return false;
    if (v1.length == 0) return true;
    for (i in 0...v1.length) {
      if (!equal(v1[i], v2[i])) return false;
    }
    
    return true;
  }
  
  public static function toString<T>(v: Array<T>) {
    return toStringWith(v, Stax.getShowFor(v[0]));
  }
  public static function toStringWith<T>(v: Array<T>, show : ShowFunction<T>) {
    return "[" + v.map(show).join(", ") + "]";  
  }
  public static function hashCode<T>(v: Array<T>) {
    return hashCodeWith(v, Stax.getHashFor(v[0]));
  }
  public static function hashCodeWith<T>(v: Array<T>, hash : HashFunction<T>) {
    var h = 12289;
    if(v.length == 0) return h;
    for (i in 0...v.length) {
      h += hash(v[i]) * 12289;
    }
    
    return h;
  }
}
class ArrayLambdas {
	  public static function filter<T>(a: Array<T>, f: T -> Bool): Array<T> {
    var n: Array<T> = [];
    
    for (e in a)
      if (f(e)) n.push(e);
    
    return n;
  }
  
  public static function size<T>(a: Array<T>): Int {
    return a.length;
  }
  
  public static function indexOf<T>(a: Array<T>, t: T): Int {
    var index = 0;
    
    for (e in a) { 
      if (e == t) return index;
      
      ++index;
    }
    
    return -1;
  }
  
  inline public static function map<T, S>(a: Array<T>, f: T -> S): Array<S> {
    var n: Array<S> = [];
    
    for (e in a) n.push(f(e));
    
    return n;
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
  
  public static function flatMap<T, S>(a: Array<T>, f: T -> Iterable<S>): Array<S> {
    var n: Array<S> = [];
    
    for (e1 in a) {
      for (e2 in f(e1)) n.push(e2);
    }
    
    return n;
  }
  
  public static function foldl<T, Z>(a: Array<T>, z: Z, f: Z -> T -> Z): Z {
    var r = z;
    
    for (e in a) { r = f(r, e); }
    
    return r;
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
    var copy = snapshot(a);
    
    copy.push(t);
    
    return copy;
  }
  
  public static function snapshot<T>(a: Array<T>): Array<T> {
    return [].concat(a);
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
  public static function foreachWithIndex<T>(a: Array<T>, f: T -> Int -> Void): Array<T> {
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