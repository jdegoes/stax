package stax;

/**
 * ...
 * @author 0b1kn00b
 */

class Maths {

}
class Ints {
	public static function max(v1: Int, v2: Int): Int { return if (v2 > v1) v2; else v1; }
  public static function min(v1: Int, v2: Int): Int { return if (v2 < v1) v2; else v1; }
  public static function toBool(v: Int): Bool { return if (v == 0) false else true; }
  public static function toFloat(v: Int): Float { return v; }
  
  public static function to(start: Int, end: Int): Iterable<Int> {
    return {
      iterator: function() {
        var cur = start;
    
        return {
          hasNext: function(): Bool { return cur <= end; },      
          next:    function(): Int  { var next = cur; ++cur; return next; }
        }
      }
    }
  }
  
  public static function until(start: Int, end: Int): Iterable<Int> {
    return to(start, end - 1);
  }  
  public static function compare(v1: Int, v2: Int) : Int {
    return v1 - v2;
  }
  public static function equals(v1: Int, v2: Int) : Bool {
    return v1 == v2;
  }


}
class Floats {
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
}