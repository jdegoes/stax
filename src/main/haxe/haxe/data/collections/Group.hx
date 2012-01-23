package haxe.data.collections;

/**
 * ...
 * @author 0b1kn00b
 */
import haxe.functional.Foldable;


using Stax;
using stax.Iterables;
using stax.Arrays;
using haxe.data.collections.Group;

class Group {

	public function new() {
		
	}
	
}
class ArrayGroup {
	public static function groupBy<T, K>(arr: Array<T>, grouper: T -> K) : Map<K, Array<T>> { 
    return arr.foldl(Map.create(), function(map, e) {
      var key = grouper(e);
      var result = map.getOrElse(key, function() return []);
      result.push(e);
      return map.set(key, result);
    });
  }
}
class IterableGroup {
	public static function groupBy<T, K>(iter: Iterable<T>, grouper: T -> K) : Map<K, Iterable<T>> { 
    return cast iter.toArray().groupBy(grouper);
  }
}

class FoldableGroup {
	public static function groupBy<C, T, K>(foldable: Foldable<C, T>, grouper: T -> K) : Map<K, C> { 
    var def = foldable.empty();
    return cast foldable.foldl(Map.create(), function(map, e) {
      var key = grouper(e);
      var result = map.getOrElseC(key, def);
      return map.set(key, cast result.append(e));
    });
  }
}