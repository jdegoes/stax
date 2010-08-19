/*
 HaXe library written by John A. De Goes <john@socialmedia.com>

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the
 distribution.

 THIS SOFTWARE IS PROVIDED BY SOCIAL MEDIA NETWORKS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL SOCIAL MEDIA NETWORKS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
package haxe.util;

import Prelude;

using PreludeExtensions;

class ObjectExtensions {
	public static function copy(d: Dynamic, shallow: Bool = true): Dynamic {
	  return copyTo(d, {}, shallow);
	}
	
	public static function copyTo(src: Dynamic, dest: Dynamic, shallow: Bool = true): Dynamic {
	  var safecopy = function(d: Dynamic) {
	    return switch (Type.typeof(d)) {
	      case TObject: copy(d);
	      
	      default: d;
	    }
	  }
	  
	  for (field in Reflect.fields(src)) {
	    var value = Reflect.field(src, field);
	    
	    Reflect.setField(dest, field, if (shallow) value else safecopy(value));
	  }
	  
	  return src;
	}
	
	public static function extendWith(dest: Dynamic, src: Dynamic, shallow: Bool = true): Dynamic {
	  copyTo(src, dest);
	  
	  return dest;
	}
	
	public static function fields(d: Dynamic): Array<String> {
	  return Reflect.fields(d);
	}
	
	public static function map<T, S>(d: Dynamic<T>, f: T -> S): Dynamic<S> {
	  return setAll({}, fields(d).map(function(name) return name.entuple(f(Reflect.field(d, name)))));
	}
	
	public static function set<T>(d: Dynamic<T>, k: String, v: T): Dynamic<T> {
	  Reflect.setField(d, k, v);
	  
	  return d;
	}
	
	public static function setAny(d: Dynamic, k: String, v: Dynamic): Dynamic {
	  return set(d, k, v);
	}
	
	public static function setAll<T>(d: Dynamic<T>, fields: Iterable<Tuple2<String, T>>): Dynamic<T> {
	  for (field in fields) {
	    Reflect.setField(d, field._1, field._2);
	  }
	  
	  return d;
	}
	
	public static function get<T>(d: Dynamic<T>, k: String): Option<T> {
	  return if (Reflect.hasField(d, k)) Some(Reflect.field(d, k)); else None;
	}
	
	public static function getAny(d: Dynamic, k: String): Option<Dynamic> {
	  return get(d, k);
	}
	
	public static function getAll<T>(d: Dynamic<T>): Array<Tuple2<String, T>> {
	  return fields(d).map(function(name) return name.entuple(Reflect.field(d, name)));
	}
	
	public static function getAllAny(d: Dynamic): Array<Tuple2<String, Dynamic>> {
	  return getAll(d);
	}
	
	public static function extractValuesAny(d: Dynamic, names: Iterable<String>): Array<Dynamic> {
	  return extractValues(d, names);
	}
	
	public static function extractValues<T>(d: Dynamic<T>, names: Iterable<String>): Array<T> {
	  var contains = function(s: String) {
	    for (e in names) if (e == s) return true;
	    
	    return false;
	  }
	  
	  var result: Array<T> = [];
	  
	  for (field in fields(d)) {
	    if (contains(field)) result.push(cast Reflect.field(d, field));
	  }
	  
	  return result;
	}
	
	public static function iterator(d: Dynamic): Iterator<String> {
	  return Reflect.fields(d).iterator();
	}
}