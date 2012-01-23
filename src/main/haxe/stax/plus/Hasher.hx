package stax.plus;

/**
 * ...
 * @author 0b1kn00b
 */
import Prelude;
import Stax;
using Stax;

import Type;
import stax.plus.Show;

using stax.plus.Hasher;

class Hasher {
	static function _createHashImpl<T>(impl : HashFunction<Dynamic>) return function(v : T) if(null == v) return 0 else return impl(v)

  /** Returns a HashFunction (T -> Int). It works for any type. For Custom Classes you must provide a hashCode()
   * method, otherwise the full class name is returned.
   */
  public static function getHashFor<T>(t : T) : HashFunction<T> {
    return getHashForType(Type.typeof(t));
  }
  public static function getHashForType<T>(v: ValueType) : HashFunction<T> {
    return switch(v) {
      case TBool:
        _createHashImpl(BoolHasher.hashCode);
      case TInt:
        _createHashImpl(IntHasher.hashCode);
      case TFloat:
        _createHashImpl(FloatHasher.hashCode);
      case TUnknown:
      _createHashImpl(function(v : T) return Stax.error("can't retrieve hascode for TUnknown: " + v));
      case TObject:
        _createHashImpl(function(v){
        var s = Show.getShowFor(v)(v);
        return getHashFor(s)(s);
        });
      case TClass(c):
        switch(Type.getClassName(c)) {
        case "String":
          _createHashImpl(StringHasher.hashCode);
        case "Date":
          _createHashImpl(DateHasher.hashCode);
        case "Array":
          _createHashImpl(ArrayHasher.hashCode);
        default:
          var fields = Type.getInstanceFields(c);
          if(Meta._hasMetaDataClass(c)) {       
            var fields = Meta._fieldsWithMeta(c, "equalHash");
            _createHashImpl(function(v : T) {
              var className = Type.getClassName(c);
              var values    = fields.map(function(f){return Reflect.field(v, f);}).filter(function(v) return !Reflect.isFunction(v));
              return values.foldl(9901 * StringHasher.hashCode(className), function(v, e){return v + (333667 * (Hasher.getHashFor(e)(e) + 197192));});
            });
          } else if(Type.getInstanceFields(c).remove("hashCode")) {
            _createHashImpl(function(v) return Reflect.callMethod(v, Reflect.field(v, "hashCode"), []));
          } else {
            Stax.error("class does not have a hashCode method");
          }
        }
      case TEnum(e):
        _createHashImpl(function(v : T) {
        var hash = Type.enumConstructor(v).hashCode() * 6151;
        for(i in Type.enumParameters(v))
          hash += Hasher.getHashFor(i)(i) * 6151;
        return hash;
      });
      case TFunction:
        _createHashImpl(function(v : T) return Stax.error("function can't provide a hash code"));
      case TNull:
        function(v) return 0;
      default:
      function(v : T) return -1;
    }
	}
}
class ArrayHasher {
	public static function hashCode<T>(v: Array<T>) {
    return hashCodeWith(v, Hasher.getHashFor(v[0]));
  }
	public static function hashCodeWith<T>(v: Array<T>, hash : HashFunction<T>) {
    var h = 12289;
    if(v.length == 0) return h;
    for (i in 0...v.length) {
      h += hash(v[i]) * 12289;
    }
    
    return h;
  }  
}
class StringHasher {
	  public static function hashCode(v: String) {
    var hash = 49157;
    
    for (i in 0...v.length) {       
#if neko
      hash += (24593 + v.charCodeAt(i)) * 49157;
#else
      hash += (24593 + untyped v.cca(i)) * 49157;
#end
    }   
    return hash;
  }
}
class DateHasher {
	  public static function hashCode(v: Date) {
    return Math.round(v.getTime() * 49157);
  }
}
class FloatHasher {
	public static function hashCode(v: Float) {
    return Std.int(v * 98317); 
	}
}
class IntHasher {
	public static function hashCode(v: Int) : Int {
    return v * 196613;
  }
}
class BoolHasher {
	public static function hashCode(v : Bool) : Int {
    return if (v) 786433 else 393241;  
  }
}