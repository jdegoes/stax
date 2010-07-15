package haxe.abstract;

import Prelude;

using Prelude;

typedef Filter<T> = T -> Bool;

class Is {
	public static function equalTo<T>(t: T, ?equal: Equal<T>): Filter<T> {
    return function(v) {
      return safe(equal).equal(v, t);
    }
	}
	
	public static function greaterThan(ref: Int): Filter<Int> {
	  return function(v) {
	    return v > ref;
	  }
	}
	
	private static function safe<T>(equal: Equal<T>): Equal<T> {
	  return if (equal == null) DynamicExtensions.EqualT();
	         equal;
	}
}

// list.filter(Is.equalTo(4));
// list.filter(Is.greaterThan(5));