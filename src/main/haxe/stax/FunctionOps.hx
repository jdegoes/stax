package stax;

/**
 * ...
 * @author 0b1kn00b
 */
import Prelude;

using stax.DynamicOps;

class FunctionOps {
	
}
class Function0Extensions {
  public static function swallow(f: Void -> Void): Void -> Void {
    return function() {
      try {
        f();
      }
      catch (e: Dynamic) { }
    }
  }
  
  public static function thenDo(f1: Void -> Void, f2: Void -> Void): Void -> Void {
    return function() {
      f1();
      f2();
    }
  }
  public static function returning<R1, R2>(f: Void -> R1, thunk: Thunk<R2>): Void -> R2 {
    return function() {
      f();
      
      return thunk();
    }
  }
  public static function returningC<R1, R2>(f: Void -> R2, value: R2): Void -> R2 {
    return returning(f, value.toThunk());
  }
  public static function promote<A, Z>(f: Void -> Z): A -> Z {
    return function(a: A): Z {
      return f();
    }
  }
  
  public static function promoteEffect<A>(f: Void -> Void): A -> Void {
    return function(a: A): Void {
      f();
    }
  }
  
  public static function stage<Z, T>(f: Function0<Z>, before: Void -> T, after: T -> Void): Z {
    var state = before();
    
    var result = f();
    
    after(state);
    
    return result;
  }
  
  public static function toEffect<T>(f: Function0<T>): Void -> Void {
    return function() {
      f();
    }
  }
}
class Function1Extensions {
  public static function swallow<A>(f: Function<A, Void>): Function<A, Void> {
    return toEffect(swallowWith(f, null));
  }
  public static function swallowWith<P1, R>(f: Function<P1, R>, d: R): Function<P1, R> {
    return function(a) {
      try {
        return f(a);
      }
      catch (e: Dynamic) { }
      return d;
    }
  }
  public static function thenDo<P1>(f1: P1 -> Void, f2: P1 -> Void): P1 -> Void {
    return function(p1) {
      f1(p1);
      f2(p1);
    }
  }
  public static function returning<P1, R1, R2>(f: Function<P1, R1>, thunk: Thunk<R2>): Function<P1, R2> {
    return function(p1) {
      f(p1);
      
      return thunk();
    }
  }
  public static function returningC<P1, R1, R2>(f: Function<P1, R2>, value: R2): Function<P1, R2> {
    return returning(f, value.toThunk());
  }
  public static function compose<U, V, W>(f1: Function<V, W>, f2: Function<U, V>): Function<U, W> {
    return function(u: U): W {
      return f1(f2(u));
    }
  }
  public static function andThen<U, V, W>(f1: Function<U, V>, f2: Function<V, W>): Function<U, W> {
    return compose(f2, f1);
  }
  public static function lazy<P1, R>(f: Function<P1, R>, p1: P1): Thunk<R> {
    var r = null;
    
    return function() {
      return if (r == null) { r = f(p1); r; } else r;
    }
  }
  public static function toEffect<P1, R>(f: Function<P1, R>): P1 -> Void {
    return function(p1) {
      f(p1);
    }
  }
}
class Function2Extensions {  
  public static function swallow<P1, P2>(f: Function2<P1, P2, Void>): Function2<P1, P2, Void> {
    return toEffect(swallowWith(f, null));
  }
  public static function swallowWith<P1, P2, R>(f: Function2<P1, P2, R>, d: R): Function2<P1, P2, R> {
    return function(p1, p2) {
      try {
        return f(p1, p2);
      }
      catch (e: Dynamic) { }
      return d;
    }
  }
  public static function thenDo<P1, P2>(f1: P1 -> P2 -> Void, f2: P1 -> P2 -> Void): P1 -> P2 -> Void {
    return function(p1, p2) {
      f1(p1, p2);
      f2(p1, p2);
    }
  }
  public static function returning<P1, P2, R1, R2>(f: Function2<P1, P2, R1>, thunk: Thunk<R2>): Function2<P1, P2, R2> {
    return function(p1, p2) {
      f(p1, p2);
      
      return thunk();
    }
  }
  public static function returningC(f, value) {
    return returning(f, value.toThunk());
  }
  public static function flip<P1, P2, R>(f: Function2<P1, P2, R>): Function2<P2, P1, R> {
    return function(p2, p1) {
      return f(p1, p2);
    }
  }
  public static function curry<P1, P2, R>(f: Function2<P1, P2, R>): Function<P1, Function<P2, R>> {
    return function(p1: P1) {
      return function(p2: P2) {
        return f(p1, p2);
      }
    }
  }
  public static function uncurry<P1, P2, R>(f: Function<P1, Function<P2, R>>): Function2<P1, P2, R> {
    return function(p1: P1, p2: P2) {
      return f(p1)(p2);
    }
  }
  public static function lazy<P1, P2, R>(f: Function2<P1, P2, R>, p1: P1, p2: P2): Thunk<R> {
    var r = null;
    
    return function() {
      return if (r == null) { r = f(p1, p2); r; } else r;
    }
  }
  public static function toEffect<P1, P2, R>(f: Function2<P1, P2, R>): P1 -> P2 -> Void {
    return function(p1, p2) {
      f(p1, p2);
    }
  }
}
class Function3Extensions {  
  public static function swallow<A, B, C>(f: Function3<A, B, C, Void>): Function3<A, B, C, Void> {
    return toEffect(swallowWith(f, null));
  }
  public static function swallowWith<A, B, C, R>(f: Function3<A, B, C, R>, d: R): Function3<A, B, C, R> {
    return function(a, b, c) {
      try {
        return f(a, b, c);
      }
      catch (e: Dynamic) { }
      return d;
    }
  }
  public static function thenDo<P1, P2, P3>(f1: P1 -> P2 -> P3 -> Void, f2: P1 -> P2 -> P3 -> Void): P1 -> P2 -> P3 -> Void {
    return function(p1, p2, p3) {
      f1(p1, p2, p3);
      f2(p1, p2, p3);
    }
  }
  public static function returning<P1, P2, P3, R1, R2>(f: Function3<P1, P2, P3, R1>, thunk: Thunk<R2>): Function3<P1, P2, P3, R2> {
    return function(p1, p2, p3) {
      f(p1, p2, p3);
      
      return thunk();
    }
  }
  public static function returningC(f, value) {
    return returning(f, value.toThunk());
  }
  public static function curry<P1, P2, P3, R>(f: Function3<P1, P2, P3, R>): Function<P1, Function<P2, Function<P3, R>>> {
    return function(p1: P1) {
      return function(p2: P2) {
        return function(p3: P3) {
          return f(p1, p2, p3);
        }
      }
    }
  }
  public static function uncurry<P1, P2, P3, R>(f: Function<P1, Function<P2, Function<P3, R>>>): Function3<P1, P2, P3, R> {
    return function(p1: P1, p2: P2, p3: P3) {
      return f(p1)(p2)(p3);
    }
  }
  public static function lazy<P1, P2, P3, R>(f: Function3<P1, P2, P3, R>, p1: P1, p2: P2, p3: P3): Thunk<R> {
    var r = null;
    
    return function() {
      return if (r == null) { r = f(p1, p2, p3); r; } else r;
    }
  }
  public static function toEffect<P1, P2, P3, R>(f: Function3<P1, P2, P3, R>): P1 -> P2 -> P3 -> Void {
    return function(p1, p2, p3) {
      f(p1, p2, p3);
    }
  }
}
class Function4Extensions {  
  public static function swallow<A, B, C, D>(f: Function4<A, B, C, D, Void>): Function4<A, B, C, D, Void> {
    return toEffect(swallowWith(f, null));
  }
  public static function swallowWith<A, B, C, D, R>(f: Function4<A, B, C, D, R>, def: R): Function4<A, B, C, D, R> {
    return function(a, b, c, d) {
      try {
        return f(a, b, c, d);
      }
      catch (e: Dynamic) { }
      return def;
    }
  }
  public static function thenDo<P1, P2, P3, P4>(f1: P1 -> P2 -> P3 -> P4 -> Void, f2: P1 -> P2 -> P3 -> P4 -> Void): P1 -> P2 -> P3 -> P4 -> Void {
    return function(p1, p2, p3, p4) {
      f1(p1, p2, p3, p4);
      f2(p1, p2, p3, p4);
    }
  }
  public static function returning<P1, P2, P3, P4, R1, R2>(f: Function4<P1, P2, P3, P4, R1>, thunk: Thunk<R2>): Function4<P1, P2, P3, P4, R2> {
    return function(p1, p2, p3, p4) {
      f(p1, p2, p3, p4);
      
      return thunk();
    }
  }
  public static function returningC(f, value) {
    return returning(f, value.toThunk());
  }
  public static function curry<P1, P2, P3, P4, R>(f: Function4<P1, P2, P3, P4, R>): Function<P1, Function<P2, Function<P3, Function<P4, R>>>> {
    return function(p1: P1) {
      return function(p2: P2) {
        return function(p3: P3) {
          return function(p4: P4) {
            return f(p1, p2, p3, p4);
          }
        }
      }
    }
  }
  public static function uncurry<P1, P2, P3, P4, R>(f: Function<P1, Function<P2, Function<P3, Function<P4, R>>>>): Function4<P1, P2, P3, P4, R> {
    return function(p1: P1, p2: P2, p3: P3, p4: P4) {
      return f(p1)(p2)(p3)(p4);
    }
  }
  public static function lazy<P1, P2, P3, P4, R>(f: Function4<P1, P2, P3, P4, R>, p1: P1, p2: P2, p3: P3, p4: P4): Thunk<R> {
    var r = null;
    
    return function() {
      return if (r == null) { r = f(p1, p2, p3, p4); r; } else r;
    }
  }
  public static function toEffect<P1, P2, P3, P4, R>(f: Function4<P1, P2, P3, P4, R>): P1 -> P2 -> P3 -> P4 -> Void {
    return function(p1, p2, p3, p4) {
      f(p1, p2, p3, p4);
    }
  }
}
class Function5Extensions {  
  public static function swallow<A, B, C, D, E>(f: Function5<A, B, C, D, E, Void>): Function5<A, B, C, D, E, Void> {
    return toEffect(swallowWith(f, null));
  }
  public static function swallowWith<A, B, C, D, E, R>(f: Function5<A, B, C, D, E, R>, def: R): Function5<A, B, C, D, E, R> {
    return function(a, b, c, d, e) {
      try {
        return f(a, b, c, d, e);
      }
      catch (e: Dynamic) { }
      return def;
    }
  }
  public static function thenDo<P1, P2, P3, P4, P5>(f1: P1 -> P2 -> P3 -> P4 -> P5 -> Void, f2: P1 -> P2 -> P3 -> P4 -> P5 -> Void): P1 -> P2 -> P3 -> P4 -> P5 -> Void {
    return function(p1, p2, p3, p4, p5) {
      f1(p1, p2, p3, p4, p5);
      f2(p1, p2, p3, p4, p5);
    }
  }
  public static function returning<P1, P2, P3, P4, P5, R1, R2>(f: Function5<P1, P2, P3, P4, P5, R1>, thunk: Thunk<R2>): Function5<P1, P2, P3, P4, P5, R2> {
    return function(p1, p2, p3, p4, p5) {
      f(p1, p2, p3, p4, p5);
      
      return thunk();
    }
  }
  public static function returningC(f, value) {
    return returning(f, value.toThunk());
  }
  public static function curry<P1, P2, P3, P4, P5, R>(f: Function5<P1, P2, P3, P4, P5, R>): Function<P1, Function<P2, Function<P3, Function<P4, Function<P5, R>>>>> {
    return function(p1: P1) {
      return function(p2: P2) {
        return function(p3: P3) {
          return function(p4: P4) {
            return function(p5: P5) {
              return f(p1, p2, p3, p4, p5);
            }
          }
        }
      }
    }
  }
  public static function uncurry<P1, P2, P3, P4, P5, R>(f: Function<P1, Function<P2, Function<P3, Function<P4, Function<P5, R>>>>>): Function5<P1, P2, P3, P4, P5, R> {
    return function(p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) {
      return f(p1)(p2)(p3)(p4)(p5);
    }
  }
  public static function lazy<P1, P2, P3, P4, P5, R>(f: Function5<P1, P2, P3, P4, P5, R>, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5): Thunk<R> {
    var r = null;
    
    return function() {
      return if (r == null) { r = f(p1, p2, p3, p4, p5); r; } else r;
    }
  }
  public static function toEffect<P1, P2, P3, P4, P5, R>(f: Function5<P1, P2, P3, P4, P5, R>): P1 -> P2 -> P3 -> P4 -> P5 -> Void {
    return function(p1, p2, p3, p4, p5) {
      f(p1, p2, p3, p4, p5);
    }
  }
}
