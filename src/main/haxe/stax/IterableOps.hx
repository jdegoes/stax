package stax;

/**
 * ...
 * @author 0b1kn00b
 */

class IterableOps {
  public static function toString<T>(i: Iterable<T>, ?show: T -> String, ?prefix: String = '(', ?suffix: String = ')', ?sep = ', ') {
    return mkString(i, show, prefix, suffix, sep);
  }
  
  public static function mkString<T>(i: Iterable<T>, ?show: T -> String, ?prefix: String = '(', ?suffix: String = ')', ?sep = ', ') {
    if (show == null) show = Std.string;
    
    var s = prefix;
    
    var isFirst = true;

    for (t in i) {
      if (isFirst) isFirst = false; else s += sep;
      
      s += show(t);
    }
    
    return s + suffix;
  }
  public static function toArray<T>(i: Iterable<T>) {
    var a = [];
    for (e in i) a.push(e);
    return a;
  }
}