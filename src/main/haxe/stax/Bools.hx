package stax;

/**
 * ...
 * @author 0b1kn00b
 */
import Prelude;

class Bools {
  public static function toInt(v: Bool): Float { return if (v) 1 else 0; }
  
  public static function ifTrue<T>(v: Bool, f: Thunk<T>): Option<T> {
    return if (v) Some(f()) else None;
  }
  
  public static function ifFalse<T>(v: Bool, f: Thunk<T>): Option<T> {
    return if (!v) Some(f()) else None;
  }
  
  public static function ifElse<T>(v: Bool, f1: Thunk<T>, f2: Thunk<T>): T {
    return if (v) f1() else f2();
  }  

  public static function compare(v1 : Bool, v2 : Bool) : Int {
    return if (!v1 && v2) -1 else if (v1 && !v2) 1 else 0;   
  }

  public static function equals(v1 : Bool, v2 : Bool) : Bool {
    return v1 == v2;   
  }
}