package stax;

/**
 * ...
 * @author 0b1kn00b
 */

class FloatOps {
  public static function round(v: Float): Int { return Math.round(v); }
  public static function ceil(v: Float): Int { return Math.ceil(v); }
  public static function floor(v: Float): Int { return Math.floor(v); }
  public static function max(v1: Float, v2: Float): Float { return if (v2 > v1) v2; else v1; }
  public static function min(v1: Float, v2: Float): Float { return if (v2 < v1) v2; else v1; }
  public static function toInt(v: Float): Int { return Std.int(v); } 
  public static function compare(v1: Float, v2: Float) {   
    return if (v1 < v2) -1 else if (v1 > v2) 1 else 0;
  }
  public static function equals(v1: Float, v2: Float) {
    return v1 == v2;
  }
  public static function toString(v: Float): String {
    return "" + v;
  }
  public static function hashCode(v: Float) {
    return Std.int(v * 98317); 
  }
}