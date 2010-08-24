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

typedef Object = {};

class ObjectExtensions {
	public static function copy(d: Object, shallow: Bool = true): Object {
	  return copyTo(d, {}, shallow);
	}
	
	public static function copyTo(src: Object, dest: Object, shallow: Bool = true): Object {
	  var safecopy = function(d: Dynamic): Dynamic {
	    return switch (Type.typeof(d)) {
	      case TObject: copy(d, shallow);
	      
	      default: d;
	    }
	  }
	  
	  for (field in Reflect.fields(src)) {
	    var value = Reflect.field(src, field);
	    
	    Reflect.setField(dest, field, if (shallow) value else safecopy(value));
	  }
	  
	  return src;
	}
	
	public static function extendWith(dest: Object, src: Object, shallow: Bool = true): Object {
	  copyTo(src, dest);
	  
	  return dest;
	}
	
	public static function fields(d: Object): Array<String> {
	  return Reflect.fields(d);
	}
	
	public static function mapValues<T, S>(d: Dynamic<T>, f: T -> S): Dynamic<S> {
	  return setAll({}, Reflect.fields(d).map(function(name) {
	    return name.entuple(f(Reflect.field(d, name)));
	  }));
	}
	
	public static function set<T>(d: Dynamic<T>, k: String, v: T): Dynamic<T> {
	  Reflect.setField(d, k, v);
	  
	  return d;
	}
	
	public static function setAny(d: Object, k: String, v: Dynamic): Object {
	  Reflect.setField(d, k, v);
	  
	  return d;
	}
	
	public static function setAll<T>(d: Dynamic<T>, fields: Iterable<Tuple2<String, T>>): Dynamic<T> {
	  for (field in fields) {
	    Reflect.setField(d, field._1, field._2);
	  }
	  
	  return d;
	}
	
	public static function setAllAny(d: Object, fields: Iterable<Tuple2<String, Dynamic>>): Object {
	  for (field in fields) {
	    Reflect.setField(d, field._1, field._2);
	  }
	  
	  return d;
	}
	
	public static function get<T>(d: Dynamic<T>, k: String): Option<T> {
	  return if (Reflect.hasField(d, k)) Some(Reflect.field(d, k)); else None;
	}
	
	public static function getAny(d: Object, k: String): Option<Dynamic> {
	  return if (Reflect.hasField(d, k)) Some(Reflect.field(d, k)); else None;
	}
	
	public static function getAll<T>(d: Dynamic<T>): Array<Tuple2<String, T>> {
	  return Reflect.fields(d).map(function(name) return name.entuple(Reflect.field(d, name)));
	}
	
	public static function getAllAny(d: Object): Array<Tuple2<String, Dynamic>> {
	  return getAll(d);
	}
	
	public static function extractValuesAny(d: Object, names: Iterable<String>, def: Dynamic): Array<Dynamic> {
	  return extractValues(d, names, def);
	}
	
	public static function extractValues<T>(d: Dynamic<T>, names: Iterable<String>, def: T): Array<T> {
	  var result: Array<T> = [];
	  
	  for (field in names) {
	    var value = Reflect.field(d, field);
	    
	    result.push(if (value != null) cast value else def);
	  }
	  
	  return result;
	}
	
	public static function iterator(d: Object): Iterator<String> {
	  return Reflect.fields(d).iterator();
	}
}