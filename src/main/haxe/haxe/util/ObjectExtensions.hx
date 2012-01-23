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
using Stax;

import stax.Tuples;
using stax.Tuples;
using stax.Arrays;

import Type;

typedef Object = {};

class ObjectExtensions {
  
  inline public static function copyDeep(d: Object): Object return 
    copy(d, false)
    
  public static function copy(d: Object, shallow: Bool = true): Object {
    var res = { };
    copyTo(d, res, shallow);
    return res;
  }

  inline public static function copyTypedDeep<T>(d: T): T return 
    untyped copy(d, false)
    
  inline public static function copyTyped<T>(d: T, shallow: Bool = true): T return
    untyped copy(d, shallow)
  
  public static function copyTo(src: Object, dest: Object, shallow: Bool = true): Object {
    function safecopy(d: Dynamic): Dynamic
      return switch (Type.typeof(d)) {
        case TObject: copy(d, shallow);
        
        default: d;
      }
    
    for (field in Reflect.fields(src)) {
      var value = Reflect.field(src, field);
      
      Reflect.setField(dest, field, if (shallow) value else safecopy(value));
    }
    
    return src;
  }
  
  public static function extendWith(dest: Object, src: Object, shallow: Bool = true): Object {
    copyTo(src, dest, shallow);    
    return dest;
  }
  public static function copyExtendedWith(a: Object, b: Object, shallow: Bool = true): Object {
    var res = copy(a, shallow);
    copyTo(b, res, shallow);    
    return res;
  }

  public static function extendWithDeep(dest: Object, src: Object): Object {
    copyTo(src, dest, false);    
    return dest;
  }

  public static function copyExtendedWithDeep(a: Object, b: Object): Object {
    var res = copy(a, false);
    copyTo(b, res, false);    
    return res;
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
  
  public static function replaceAll<T>(d1: Dynamic<T>, d2: Dynamic<T>, def: T): Object {
    var names: Array<String> = Reflect.fields(d2);
    
    var oldValues = extractValues(d1, names, def);
    
    extendWith(cast d1, cast d2);
    
    return names.zip(oldValues).foldl({}, function(o, t) {
      Reflect.setField(o, t._1, t._2);
      
      return o;
    });
  }
  
  public static function setAllAny(d: Object, fields: Iterable<Tuple2<String, Dynamic>>): Object {
    for (field in fields) {
      Reflect.setField(d, field._1, field._2);
    }
    
    return d;
  }
  
  public static function replaceAllAny(d1: Object, d2: Object, def: Dynamic): Object {
    var names: Array<String> = Reflect.fields(d2);
    
    var oldValues = extractValues(d1, names, def);
    
    extendWith(d1, d2);
    
    return names.zip(oldValues).foldl({}, function(o, t) {
      Reflect.setField(o, t._1, t._2);
      
      return o;
    });
  }
  
  public static function get<T>(d: Dynamic<T>, k: String): Option<T> {
    return if (Reflect.hasField(d, k)) Some(Reflect.field(d, k)); else None;
  }
  
  public static function getAny(d: Object, k: String): Option<Dynamic> {
    return if (Reflect.hasField(d, k)) Some(Reflect.field(d, k)); else None;
  }
  
  public static function extractFieldValues(obj: Dynamic, field: String): Array<Dynamic> {
    return Reflect.fields(obj).foldl([], function(a, fieldName): Array<Dynamic> {
      var value = Reflect.field(obj, fieldName);
      return if (fieldName == field) {
        a.append(value);
      } else if (Type.typeof(value) == TObject) {
        a.concat(ObjectExtensions.extractFieldValues(value, field));
      } else a;
    });
  }
  
  public static function extractAll<T>(d: Dynamic<T>): Array<Tuple2<String, T>> {
    return Reflect.fields(d).map(function(name) return name.entuple(Reflect.field(d, name)));
  }
  
  public static function extractAllAny(d: Object): Array<Tuple2<String, Dynamic>> {
    return extractAll(d);
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