package stax.plus;

/**
 * ...
 * @author 0b1kn00b
 */
import Type;

import Prelude;
import Stax;
import stax.Tuples;
import stax.Maths;

using Stax;
using stax.plus.Order;

class Order {

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
      _createOrderImpl(Bools.compare);
    case TInt:
      _createOrderImpl(Ints.compare);
    case TFloat:
      _createOrderImpl(Floats.compare);
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
        _createOrderImpl(Strings.compare);
      case "Date":
        _createOrderImpl(Dates.compare);
      case "Array":
        _createOrderImpl(ArrayOrder.compare);
      default:
        if(Meta._hasMetaDataClass(c)) {
          var i = 0;
          var fields = Type.getInstanceFields(c).map(function(v){
            var fieldMeta = Meta._getMetaDataField(c, v);
            var weight = if (fieldMeta != null && Reflect.hasField(fieldMeta, "order"))
              Reflect.field(fieldMeta, "order");
            else
              1;
            return Tuple3.create(v, weight, if(fieldMeta != null && Reflect.hasField(fieldMeta, "index")) Reflect.field(fieldMeta, "index"); else i++);                
          }).filter(function(v){return v._2 != 0;}).sortWith(function(a, b) {
            var c = a._3 - b._3;
            if(c != 0)
              return c;
            return Strings.compare(a._1, b._1);
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
          Stax.error("class "+Type.getClassName(c)+" is not comparable");
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
        var v = Order.getOrderFor(pa[i])(pa[i], pb[i]);
        if(v != 0)
          return v;
      }
      return 0;
    });
    case TNull:
      _createOrderImpl(function(a, b) return Stax.error("at least one of the arguments should be null"));
    case TFunction:
    Stax.error("unable to compare on a function");
    }
  }
}
class ArrayOrder {
	public static function sort<T>(v : Array<T>) : Array<T> {
    return sortWith(v, Order.getOrderFor(v[0]));
  }
  
  public static function sortWith<T>(v : Array<T>, order : OrderFunction<T>) : Array<T> {
    var r = v.copy();
    r.sort(order);
    return r;
  }
  public static function compare<T>(v1: Array<T>, v2: Array<T>) {
      return compareWith(v1, v2, Order.getOrderFor(v1[0]));
  } 
  
  public static function compareWith<T>(v1: Array<T>, v2: Array<T>, order : OrderFunction<T>) {  
    var c = v1.length - v2.length;
    if(c != 0)
      return c; 
    if(v1.length == 0)
      return 0;                       
      for (i in 0...v1.length) {
        var c = order(v1[i], v2[i]);   
        if (c != 0) return c;
      }
      return 0;
  }
}