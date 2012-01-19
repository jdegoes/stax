package ;

/**
 * ...
 * @author 0b1kn00b
 */

import Prelude;
using Prelude;
import stax.Tuples;

using stax.IterableOps;

import stax.ArrayOps;
using stax.ArrayOps;

import stax.BoolOps;
import stax.FloatOps;
import stax.StringOps;
using stax.StringOps;
import stax.IntOps;
import stax.DateOps;

using stax.OptionOps;

import Type;

class Stax {
	public static inline function tool<A>(?order:OrderFunction<A>,?equal:EqualFunction<A>,?hash:HashFunction<A>,?show:ShowFunction<A>):CollectionTools<A>{
		return { order : order , equal : equal , show : show , hash : hash };
	}
  static function _createOrderImpl<T>(impl : OrderFunction<Dynamic>) : OrderFunction<T> {
    return function(a, b) {
    return if(a == b || (a == null && b == null)) 0;
      else if(a == null) -1;
      else if(b == null) 1;
      else impl(a, b);
    };
  }
  /** Returns a OrderFunction (T -> T -> Int). It works for any type expect TFunction.
   *  Custom Classes must provide a compare(other : T) : Int method or an exception will be thrown.
   */
  public static function getOrderFor<T>(t : T) : OrderFunction<T> {
    return getOrderForType(Type.typeof(t));
  }
  public static function getOrderForType<T>(v: ValueType) : OrderFunction<T> {
    return switch(v) {
    case TBool:
      _createOrderImpl(BoolOps.compare);
    case TInt:
      _createOrderImpl(IntOps.compare);
    case TFloat:
      _createOrderImpl(FloatOps.compare);
    case TUnknown:
      function(a : T, b : T) return (a == b) ? 0 : ((cast a) > (cast b) ? 1 : -1);
    case TObject:
      _createOrderImpl(function(a, b){
        for(key in Reflect.fields(a)) {
          var va = Reflect.field(a, key);
          var v = getOrderFor(va)(va, Reflect.field(b, key));
          if(0 != v)
            return v;
        }
        return 0;
      });
    case TClass(c):
      switch(Type.getClassName(c)) {
      case "String":
        _createOrderImpl(StringOps.compare);
      case "Date":
        _createOrderImpl(DateOps.compare);
      case "Array":
        _createOrderImpl(ArrayOps.compare);
      default:
        if(_hasMetaDataClass(c)) {
          var i = 0;
          var fields = Type.getInstanceFields(c).map(function(v){
            var fieldMeta = _getMetaDataField(c, v);
            var weight = if (fieldMeta != null && Reflect.hasField(fieldMeta, "order"))
              Reflect.field(fieldMeta, "order");
            else
              1;
            return Tuple3.create(v, weight, if(fieldMeta != null && Reflect.hasField(fieldMeta, "index")) Reflect.field(fieldMeta, "index"); else i++);                
          }).filter(function(v){return v._2 != 0;}).sortWith(function(a, b) {
            var c = a._3 - b._3;
            if(c != 0)
              return c;
            return StringOps.compare(a._1, b._1);
          });
		      _createOrderImpl(function(a, b) {       
            var values = fields.filter(function(v) return !Reflect.isFunction(Reflect.field(a, v._1))).map(function(v){return Tuple3.create(Reflect.field(a, v._1), Reflect.field(b, v._1), v._2);});
            for (value in values) {
              var c = getOrderFor(value._1)(value._1, value._2) * value._3;
              if (c != 0) return c;
            }

            return 0;
          });
		    } else if(Type.getInstanceFields(c).remove("compare")) {
          _createOrderImpl(function(a, b) return (cast a).compare(b));
   		  } else {
          error("class "+Type.getClassName(c)+" is not comparable");
        }
      }
    case TEnum(e):
        _createOrderImpl(function(a, b) {
      var v = Type.enumIndex(a) - Type.enumIndex(b);
      if(0 != v)
        return v;
      var pa = Type.enumParameters(a);
      var pb = Type.enumParameters(b);
      for(i in 0...pa.length) {
        var v = Stax.getOrderFor(pa[i])(pa[i], pb[i]);
        if(v != 0)
          return v;
      }
      return 0;
    });
    case TNull:
      _createOrderImpl(function(a, b) return error("at least one of the arguments should be null"));
    case TFunction:
    error("unable to compare on a function");
    }
  }
  static function _hasMetaDataClass(c : Class<Dynamic>) {
    var m = haxe.rtti.Meta.getType(c); 
    return null != m && Reflect.hasField(m, "DataClass");
  }
  static function _getMetaDataField(c : Class<Dynamic>, f : String) {
    var m = haxe.rtti.Meta.getFields(c);  
    if(null == m || !Reflect.hasField(m, f)) 
      return null;
    var fm = Reflect.field(m, f);
    if(!Reflect.hasField(fm, "DataField"))
      return null;
    return Reflect.field(fm, "DataField").copy().pop();
  }              
  static function _fieldsWithMeta(c : Class<Dynamic>, name : String) {   
    var i = 0;   
    return Type.getInstanceFields(c).map(function(v){ 
      var fieldMeta = _getMetaDataField(c, v);     
      var inc = (fieldMeta == null || !Reflect.hasField(fieldMeta, name) || Reflect.field(fieldMeta, name)); 
      return Tuple3.create(v, inc, if(fieldMeta != null && Reflect.hasField(fieldMeta, "index")) Reflect.field(fieldMeta, "index"); else i++);                
    }).filter(function(v) {
      return v._2;
    }).sortWith(function(a, b) {
      var c = a._3 - b._3;
      if(c != 0)
        return c;
      return StringOps.compare(a._1, b._1);
    }).map(function(v) {
      return v._1;
    });
  }
  static function _createEqualImpl<T>(impl : EqualFunction<Dynamic>) {
    return function(a, b) {
    return if(a == b || (a == null && b == null)) true;
      else if(a == null || b == null) false;
      else impl(a, b);
    };
  }
  /** Returns an EqualFunction (T -> T -> Bool). It works for any type. Custom Classes must provide
   * an "equals(other : T) : Bool" method or a "compare(other : T) : Int" method otherwise an exception will be thrown.
   */
  public static function getEqualFor<T>(t : T) : EqualFunction<T> {
    return getEqualForType(Type.typeof(t));
  }
  public static function getEqualForType<T>(v: ValueType) : EqualFunction<T> {
    return switch(v) {
      case TBool:
        _createEqualImpl(BoolOps.equals);
      case TInt:
        _createEqualImpl(IntOps.equals);
      case TFloat:
        _createEqualImpl(FloatOps.equals);
      case TUnknown:
      function(a : T, b : T) return a == b;
      case TObject:
        _createEqualImpl(function(a, b) {
        for(key in Reflect.fields(a)) {
          var va = Reflect.field(a, key);
          if(!getEqualFor(va)(va, Reflect.field(b, key)))
            return false;
        }
        return true;
      });
    case TClass(c):
      switch(Type.getClassName(c)) {
        case "String":
          _createEqualImpl(StringOps.equals);
        case "Date":
          _createEqualImpl(DateOps.equals);
        case "Array":
          _createEqualImpl(ArrayOps.equals);
        default:    
          if(_hasMetaDataClass(c)) {  
            var fields = _fieldsWithMeta(c, "equalHash");
            _createEqualImpl(function(a, b) {         
              var values = fields.map(function(v){return Tuple2.create(Reflect.field(a, v), Reflect.field(b, v));});
              for (value in values) {
                if(Reflect.isFunction(value._1))
                  continue;
                if(!getEqualFor(value._1)(value._1, value._2))
                  return false;
              }
              return true;
            });    
          } else if(Type.getInstanceFields(c).remove("equals")) {
            _createEqualImpl(function(a, b) return (cast a).equals(b));
          } else {
            error("class "+Type.getClassName(c)+" has not equals method");
          }
      }
    case TEnum(e):
      _createEqualImpl(function(a, b) {
        if(0 != Type.enumIndex(a) - Type.enumIndex(b))
          return false;
        var pa = Type.enumParameters(a);
        var pb = Type.enumParameters(b);
        for(i in 0...pa.length) {
          if(!Stax.getEqualFor(pa[i])(pa[i], pb[i]))
            return false;
        }
        return true;
      });
    case TNull:
      _createEqualImpl(function(a, b) return error("at least one of the arguments should be null"));
    case TFunction:
      _createEqualImpl(Reflect.compareMethods);
  }
  }

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
        _createShowImpl(BoolOps.toString);
      case TInt:
        _createShowImpl(IntOps.toString);
      case TFloat:
        _createShowImpl(FloatOps.toString);
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
          _createShowImpl(StringOps.toString);
        case "Array":
          _createShowImpl(ArrayOps.toString);
        default:
            if(_hasMetaDataClass(c)) {
              var fields = _fieldsWithMeta(c, "show");
              _createShowImpl(function(v : T) { 
                var values = fields.map(function(f){return Reflect.field(v, f);}).filter(function(v) return !Reflect.isFunction(v)).map(function(v){return Stax.getShowFor(v)(v);});
                return values.mkString(Type.getClassName(c) + '(', ')', ', '); 
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
        _createHashImpl(BoolOps.hashCode);
      case TInt:
        _createHashImpl(IntOps.hashCode);
      case TFloat:
        _createHashImpl(FloatOps.hashCode);
      case TUnknown:
      _createHashImpl(function(v : T) return error("can't retrieve hascode for TUnknown: " + v));
      case TObject:
        _createHashImpl(function(v){
        var s = getShowFor(v)(v);
        return getHashFor(s)(s);
        });
      case TClass(c):
        switch(Type.getClassName(c)) {
        case "String":
          _createHashImpl(StringOps.hashCode);
        case "Date":
          _createHashImpl(DateOps.hashCode);
        case "Array":
          _createHashImpl(ArrayOps.hashCode);
        default:
          var fields = Type.getInstanceFields(c);
          if(_hasMetaDataClass(c)) {       
            var fields = _fieldsWithMeta(c, "equalHash");
            _createHashImpl(function(v : T) {
              var className = Type.getClassName(c);
              var values    = fields.map(function(f){return Reflect.field(v, f);}).filter(function(v) return !Reflect.isFunction(v));
              return values.foldl(9901 * StringOps.hashCode(className), function(v, e){return v + (333667 * (Stax.getHashFor(e)(e) + 197192));});
            });
          } else if(Type.getInstanceFields(c).remove("hashCode")) {
            _createHashImpl(function(v) return Reflect.callMethod(v, Reflect.field(v, "hashCode"), []));
          } else {
            error("class does not have a hashCode method");
          }
        }
      case TEnum(e):
        _createHashImpl(function(v : T) {
        var hash = Type.enumConstructor(v).hashCode() * 6151;
        for(i in Type.enumParameters(v))
          hash += Stax.getHashFor(i)(i) * 6151;
        return hash;
      });
      case TFunction:
        _createHashImpl(function(v : T) return error("function can't provide a hash code"));
      case TNull:
        function(v) return 0;
      default:
      function(v : T) return -1;
    }
  }

  public static function noop1<A>() {
    return function(a: A) { }
  }
  public static function noop2<A, B>() {
    return function(a: A, b: B) { }
  }
  public static function noop3<A, B, C>() {
    return function(a: A, b: B, c: C) { }
  }
  public static function noop4<A, B, C, D>() {
    return function(a: A, b: B, c: C, d: D) { }
  }
  public static function noop5<A, B, C, D, E>() {
    return function(a: A, b: B, c: C, d: D, e: E) { }
  }

  public static function identity<A>(): Function<A, A> {
    return function(a: A) { return a; }
  }

  public static function unfold<T, R>(initial: T, unfolder: T -> Option<Tuple2<T, R>>): Iterable<R> {
    return {
      iterator: function(): Iterator<R> {
        var _next: Option<R> = None;
        var _progress: T = initial;

        var precomputeNext = function() {
          switch (unfolder(_progress)) {
            case None:
              _progress = null;
              _next     = None;

            case Some(tuple):
              _progress = tuple._1;
              _next     = Some(tuple._2);
          }
        }

        precomputeNext();

        return {
          hasNext: function(): Bool {
            return !_next.isEmpty();
          },

          next: function(): R {
            var n = _next.get();

            precomputeNext();

            return n;
          }
        }
      }
    }
  }

  public static function error<T>(msg: String): T { throw msg; return null; }
}
