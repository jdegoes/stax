package ;

/**
 * ...
 * @author 0b1kn00b
 */

import Prelude;

import Type;

import stax.Tuples;
import stax.Maths;
import stax.plus.Show;


using Prelude;
using Stax;
using stax.Options;
using stax.Strings;
using stax.plus.Show;



class Stax {
	public static inline function tool<A>(?order:OrderFunction<A>,?equal:EqualFunction<A>,?hash:HashFunction<A>,?show:ShowFunction<A>):CollectionTools<A>{
		return { order : order , equal : equal , show : show , hash : hash };
	}
  
  public static function noop1<A>() {
    return function(a: A) { }
  }
  public static function noop2<A, B>() {
    return function(a: A, b: B) { }
  }
  public static function noop3<A, B, C>() {
    return function(a: A, b: B, c: C) { }
  }
  public static function noop4<A, B, C, D>() {
    return function(a: A, b: B, c: C, d: D) { }
  }
  public static function noop5<A, B, C, D, E>() {
    return function(a: A, b: B, c: C, d: D, e: E) { }
  }

  public static function identity<A>(): Function<A, A> {
    return function(a: A) { return a; }
  }

  public static function unfold<T, R>(initial: T, unfolder: T -> Option<Tuple2<T, R>>): Iterable<R> {
    return {
      iterator: function(): Iterator<R> {
        var _next: Option<R> = None;
        var _progress: T = initial;

        var precomputeNext = function() {
          switch (unfolder(_progress)) {
            case None:
              _progress = null;
              _next     = None;

            case Some(tuple):
              _progress = tuple._1;
              _next     = Some(tuple._2);
          }
        }

        precomputeNext();

        return {
          hasNext: function(): Bool {
            return !_next.isEmpty();
          },

          next: function(): R {
            var n = _next.get();

            precomputeNext();

            return n;
          }
        }
      }
    }
  }

  public static function error<T>(msg: String): T { throw msg; return null; }
}
class ArrayLamda {
	inline public static function map<T, S>(a: Array<T>, f: T -> S): Array<S> {
    var n: Array<S> = [];
    
    for (e in a) n.push(f(e));
    
    return n;
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
	public static function filter<T>(a: Array<T>, f: T -> Bool): Array<T> {
    var n: Array<T> = [];
    
    for (e in a)
      if (f(e)) n.push(e);
    
    return n;
  }
	
	public static function size<T>(a: Array<T>): Int {
    return a.length;
  }
	public static function snapshot<T>(a: Array<T>): Array<T> {
    return [].concat(a);
  }
}
class IterableLambda {
	public static function toArray<T>(i: Iterable<T>) {
    var a = [];
    for (e in i) a.push(e);
    return a;
  }
	public static function map<T, Z>(iter: Iterable<T>, f: T -> Z): Iterable<Z> {
    return foldl(iter, [], function(a, b) {
      a.push(f(b));
      return a;
    });
  }
  
  public static function flatMap<T, Z>(iter: Iterable<T>, f: T -> Iterable<Z>): Iterable<Z> {
    return foldl(iter, [], function(a, b) {
      for (e in f(b)) a.push(e);
      return a;
    });
  }  
	public static function foldl<T, Z>(iter: Iterable<T>, seed: Z, mapper: Z -> T -> Z): Z {
    var folded = seed;
    
    for (e in iter) { folded = mapper(folded, e); }
    
    return folded;
  }   
  public static function filter<T>(iter: Iterable<T>, f: T -> Bool): Iterable<T> {
    return ArrayLamda.filter(iter.toArray(), f);
  }
	public static function size<T>(iterable: Iterable<T>): Int {
    var size = 0;
    
    for (e in iterable) ++size;
    
    return size;
  }
}