package stax;

/**
 * ...
 * @author 0b1kn00b
 */
import Prelude;

class Dynamics {
  public static function withEffect<T>(t: T, f: Function<T, Void>): T {
    f(t);
    
    return t;
  }
  public static function withEffectP<A, B>(a: A, f: Function<A, B>): A {
    f(a);
    
    return a;
  }
  public static function into<A, B>(a: A, f: A -> B): B {
    return f(a);
  }
  public static inline function isInstanceOf(o: Dynamic, c: Dynamic): Bool {
    return Std.is(o, c);
  }
  public static function memoize<T>(t: Thunk<T>): Thunk<T> {
    var evaled = false;
    var result = null;
    
    return function() {
      if (!evaled) { evaled = true; result = t(); }
      
      return result;
    }
  }
  public static function toThunk<T>(t: T): Thunk<T> {
    return function() {
      return t;
    }
  }  
  public static function toConstantFunction<S, T>(t: T): Function<S, T> {
    return function(s: S) {
      return t;
    }
  }
}