package stax;

/**
 * ...
 * @author 0b1kn00b
 */

class Dates {
  public static function compare(v1: Date, v2: Date) {  
    var diff = v1.getTime() - v2.getTime();
      
    return if (diff < 0) -1; else if (diff > 0) 1; else 0;
  }
  public static function equals(v1: Date, v2: Date) {
    return v1.getTime() == v2.getTime();
  }
  public static function toString(v: Date): String {
    return v.toString();
  }
}