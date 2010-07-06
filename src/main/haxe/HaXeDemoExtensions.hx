import Prelude;
import haxe.data.collections.List;
import HaXeDemoTypes;

using Prelude;
using haxe.abstract.Foldable;

class HaXeDemoExtensions {
  // where<T>: Selector<T> -> Filter<T> -> Selector<T>
  public static function where<T>(s: Selector<T>, f: Filter<T>): Selector<T> {
    return function(table) {
      return s(table).filter(f);
    }
  }
  
  // and<T>: Filter<T> -> Filter<T> -> Filter<T>
  public static function and<T>(f1: Filter<T>, f2: Filter<T>): Filter<T> {
    return function(v) {
      return f1(v) && f2(v);
    }
  }

  // or<T>: Filter<T> -> Filter<T> -> Filter<T>
  public static function or<T>(f1: Filter<T>, f2: Filter<T>): Filter<T> {
    return function(v) {
      return f1(v) || f2(v);
    }
  }
  
  public static function not<T>(f: Filter<T>): Filter<T> {
    return function(v) {
      return !f(v);
    }
  }
  
}