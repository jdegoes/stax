import Prelude;
import haxe.data.collections.List;
import HaXeDemoTypes;

using Prelude;
using haxe.abstract.Foldable;
using HaXeDemoExtensions;

class HaXeDemo {
  /** Creates a selector that will select data of the specified form from a
   * table.
   */
  public static function select<T>(form: T): Selector<T> {
  	return function(table: Table): List<T> {
  	  var results: Array<T> = [];
	  
  	  for (entry in table.entries) {
  	    var entryFields = Reflect.fields(entry);
	    
  	    for (fieldName in Reflect.fields(form)) {
  	      if (entryFields.contains(fieldName)) {
  	        var type1 = Type.typeof(Reflect.field(form,  fieldName));
  	        var type2 = Type.typeof(Reflect.field(entry, fieldName));
	        
  	        if (!Type.enumEq(type1, type2)) break;
  	      }
  	      else {
  	        Reflect.setField(entry, fieldName, Reflect.field(form, fieldName));
  	      }
  	    }
	    
  	    results.push(cast entry);
  	  }
	  
  	  return results.toList();
  	}
  }

  // equalTo<T>: T -> Filter<T>
  public static function equalTo<T>(t: T): Filter<T> {
    return function(v) {
      return v == t;
    }
  }
  
  // greaterThan: Int -> Filter<Int>
  public static function greaterThan(ref: Int): Filter<Int> {
    return function(v) {
      return v > ref;
    }
  }
  
  // field<T>: String -> { is: Filter<T> -> Filter<MyData> }
  public static function field<T>(name: String) {
    return {
      is: function(f: Filter<T>): Filter<MyData> {
        return function(v) {
          var value: T = cast Reflect.field(v, name);
          
          return f(value);
        }
      }
    }
  }

  public static function main(): Void {
    var table = new Table([
      {
        name: "Sarah",
        age: 92
      },
      {
        name: "John",
        age: 12
      },
      {
        name: "John",
        age: 61
      },
      {
        name: "Bob"
      }
    ]);

    // select name & age, where name == "John" && age > 40
    var selector = select({ name: "", age: 0}).where(
      field('name').is(equalTo('John')).and(field('age').is(greaterThan(40)))
    );

    var results = selector(table);

    for (result in results) {
      trace('name = ' + result.name + ', age = ' + result.age);
    }
  }
}