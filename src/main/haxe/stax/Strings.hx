package stax;

/**
 * ...
 * @author 0b1kn00b
 */
using stax.Maths;
using stax.Options;

import Prelude;

class Strings {
  public static function toBool(v: String, ?d: Bool): Bool {
    if (v == null) return d;
    
    var vLower = v.toLowerCase();
    
    return (if (vLower == 'false' || v == '0') Some(false) else if (vLower == 'true' || v == '1') Some(true) else None).getOrElseC(d);
  }
  public static function toInt(v: String, ?d: Null<Int>): Int {
    if (v == null) return d;
    
    return Std.parseInt(v).toOption().filter(function(i) return !Math.isNaN(i)).getOrElseC(d);
  }
  public static function toFloat(v: String, ?d: Null<Float>): Float { 
    if (v == null) return d;
    
    return Std.parseFloat(v).toOption().filter(function(i) return !Math.isNaN(i)).getOrElseC(d);
  }
  public static function startsWith(v: String, frag: String): Bool {
    return if (v.length >= frag.length && frag == v.substr(0, frag.length)) true else false;
  }
  public static function endsWith(v: String, frag: String): Bool {
    return if (v.length >= frag.length && frag == v.substr(v.length - frag.length)) true else false;
  }
  public static function urlEncode(v: String): String {
    return StringTools.urlEncode(v);
  }
  public static function urlDecode(v: String): String {
    return StringTools.urlDecode(v);
  }  
  public static function htmlEscape(v: String): String {
    return StringTools.htmlEscape(v);
  }
  public static function htmlUnescape(v: String): String {
    return StringTools.htmlUnescape(v);
  }
  public static function trim(v: String): String {
    return StringTools.trim(v);
  }
  public static function contains(v: String, s: String): Bool {
    return v.indexOf(s) != -1;
  }
  public static function replace( s : String, sub : String, by : String ) : String {
    return StringTools.replace(s, sub, by);
  }    
  public static function compare(v1: String, v2: String) { 
  return (v1 == v2) ? 0 : (v1 > v2 ? 1 : -1);
  }
  public static function equals(v1: String, v2: String) {
    return v1 == v2;
  }
  public static function toString(v: String): String {
    return v;
  }
}