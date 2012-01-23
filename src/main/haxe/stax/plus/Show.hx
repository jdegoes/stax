package stax.plus;

/**
 * ...
 * @author 0b1kn00b
 */
import Prelude;
import Stax;
using Stax;

import Type;
import stax.Maths;
import stax.plus.Show;

using stax.plus.Show;

class Show {
  static function _createShowImpl<T>(impl : ShowFunction<Dynamic>) : ShowFunction<T> {
    return function(v) return null == v ? 'null' : impl(v);
  }
  /** Returns a ShowFunction (T -> String). It works for any type. For Custom Classes you must provide a toString()
   * method, otherwise the full class name is returned.
   */
  public static function getShowFor<T>(t : T) : ShowFunction<T> {
    return getShowForType(Type.typeof(t));
  }
  
  /**
   *  @todo Reflect.fields doesn't work consistenly across platforms so we may probably pass to use Type.getInstanceFields. The problem here
   *  is that we must check if the fields are functions before grabbing the value.
   */
  public static function getShowForType<T>(v : ValueType) : ShowFunction<T> {
    return switch(v) {
      case TBool:
        _createShowImpl(BoolShow.toString);
      case TInt:
        _createShowImpl(IntShow.toString);
      case TFloat:
        _createShowImpl(FloatShow.toString);
      case TUnknown:
      _createShowImpl(function(v) return '<unknown>');
      case TObject:
        _createShowImpl(function(v)
        {
        var buf = [];
        for(k in Reflect.fields(v)) {
          var i = Reflect.field(v, k);
          buf.push(k + ":" + getShowFor(i)(i));
        }
        return "{" + buf.join(",") + "}";
        });
      case TClass(c):
        switch(Type.getClassName(c)) {
        case "String":
          _createShowImpl(Strings.toString);
        case "Array":
          _createShowImpl(ArrayShow.toString);
        default:
            if(Meta._hasMetaDataClass(c)) {
              var fields = Meta._fieldsWithMeta(c, "show");
              _createShowImpl(function(v : T) { 
                var values = fields.map(function(f){return Reflect.field(v, f);}).filter(function(v) return !Reflect.isFunction(v)).map(function(v){return Show.getShowFor(v)(v);});
                return IterableShow.mkString(values,Type.getClassName(c) + '(', ')', ', '); 
              });
            } else if(Type.getInstanceFields(c).remove("toString"))
              _createShowImpl(function(v) return Reflect.callMethod(v, Reflect.field(v, "toString"), []));
            else
              _createShowImpl(function(v) return Type.getClassName(Type.getClass(v)));
        }
      case TEnum(e):
        _createShowImpl(function(v) {
          var buf = Type.enumConstructor(v);
          var params = Type.enumParameters(v);
          if(params.length == 0)
            return buf;
          else {
          buf +="(";
          for(p in params)
            buf += getShowFor(p)(p);
          return buf + ")";
          }
        });
      case TNull:
        function(v) return "null";
      case TFunction:
        _createShowImpl(function(v) return '<function>');
    }
  }
}
class ArrayShow {
	public static function toString<T>(v: Array<T>) {
    return toStringWith(v, Show.getShowFor(v[0]));
  }
  public static function toStringWith<T>(v: Array<T>, show : ShowFunction<T>) {
    return "[" + v.map(show).join(", ") + "]";  
  }

	public static function mkString<T>(arr: Array<T>, ?sep: String = ', ', ?show: T -> String): String {
    var isFirst = true;
    
    return arr.foldl('', function(a, b) {
      var prefix = if (isFirst) { isFirst = false; ''; } else sep;    
      if(null == show)
      show = Show.getShowFor(b);
      return a + prefix + show(b);
    });
  }
}
class IterableShow {
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
}
class BoolShow {
	public static function toString(v : Bool) : String {
    return if (v) "true" else "false";  
  }
}
class IntShow {
	public static function toString(v: Int) : String {
    return "" + v;
  }
}
class FloatShow {
	public static function toString(v: Int) : String {
    return "" + v;
  }
}