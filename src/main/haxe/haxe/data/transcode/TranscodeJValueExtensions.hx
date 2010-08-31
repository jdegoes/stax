/*
 HaXe library written by John A. De Goes <john@socialmedia.com>
 Contributed by Social Media Networks

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
package haxe.data.transcode;

import Prelude;
import haxe.data.collections.List;
import haxe.data.collections.Set;
import haxe.data.collections.Map;
import haxe.data.transcode.Transcode;
import haxe.data.transcode.TranscodeJValue;
import haxe.text.json.JValue;

using PreludeExtensions;
using haxe.data.transcode.TranscodeJValueExtensions;
using haxe.functional.FoldableExtensions;
using haxe.text.json.JValueExtensions;

class ExtractorHelpers {
  public static function extractFieldValue<T>(j: JValue, n: String, e: JExtractor<T>, def: JValue) {
    var fieldValue = j.getOrElse(n, def.toThunk());
    
    try {
      return e.extract(fieldValue);
    }
    catch (err: Dynamic) {
      return e.extract(def);
    }
  }
}

class BoolExtensions {
    public static function DecomposerT(c: Enum<Bool>): JDecomposer<Bool> {
      return DecomposerTypeclass.create({
        decompose: function(v) { return JBool(v); }
      });
    }
    public static function ExtractorT(c: Enum<Bool>): JExtractor<Bool> {
      return ExtractorTypeclass.create({
        extract: function(v: JValue) { 
          return switch(v) {
            case JBool(v): v;
            case JNumber(v): if (v == 0.0) false; else true;
            case JString(v): v.toBool();
            
            default: Stax.error("Expected Bool but found: " + v);
          }
        }
      });
    }
}
class IntExtensions {
    public static function DecomposerT(c: Class<Int>): JDecomposer<Int> {
      return DecomposerTypeclass.create({
        decompose: function(v: Int) { return JNumber(v); }
      });
    }
    public static function ExtractorT(c: Class<Int>): JExtractor<Int> {
      return ExtractorTypeclass.create({
        extract: function(v: JValue) { 
          return switch(v) {
            case JNumber(v): v.toInt();
            case JString(v): v.toInt();
            
            default: Stax.error("Expected Int but found: " + v);
          }
        }
      });
    }
}
class FloatExtensions {
    public static function DecomposerT(c: Class<Float>): JDecomposer<Float> {
      return DecomposerTypeclass.create({
        decompose: function(v: Float) { return JNumber(v); }
      });
    }
    public static function ExtractorT(c: Class<Float>): JExtractor<Float> {
      return ExtractorTypeclass.create({
        extract: function(v: JValue) { 
          return switch(v) {
            case JNumber(v): v;
            case JString(v): v.toFloat();
            
            default: Stax.error("Expected Float but found: " + v);
          }
        }
      });
    }
}
class StringExtensions {
    public static function DecomposerT(c: Class<String>): JDecomposer<String> {
      return DecomposerTypeclass.create({
        decompose: function(v: String) { return JString(v); }
      });
    }
    public static function ExtractorT(c: Class<String>): JExtractor<String> {
      return ExtractorTypeclass.create({
        extract: function(v: JValue) { 
          return switch(v) {
            case JNumber(v): v.toString();
            case JBool(v): v.toString();
            case JString(v): v;
            
            default: Stax.error("Expected String but found: " + v);
          }
        }
      });
    }
}
class DateExtensions {
    public static function DecomposerT(c: Class<Date>): JDecomposer<Date> {
      return DecomposerTypeclass.create({
        decompose: function(v: Date) { return JNumber(v.getTime()); }
      });
    }
    public static function ExtractorT(c: Class<Date>): JExtractor<Date> {
      return ExtractorTypeclass.create({
        extract: function(v: JValue) { 
          return switch(v) {
            case JNumber(v): Date.fromTime(v);
            case JString(v): Date.fromTime(v.toFloat());
            
            default: Stax.error("Expected Number but found: " + v);
          }
        }
      });
    }
}
class OptionExtensions {
  public static function DecomposerT<T>(c: Enum<Option<Dynamic>>, d: JDecomposer<T>): JDecomposer<Option<T>> {
      return DecomposerTypeclass.create({
        decompose: function(v: Option<T>): JValue { return v.map(d.decompose).getOrElse(JNull.toThunk()); }
      });
    }
    public static function ExtractorT<T>(c: Enum<Option<Dynamic>>, e: JExtractor<T>): JExtractor<Option<T>> {
      return ExtractorTypeclass.create({
        extract: function(v: JValue) { 
          return switch(v) {
            case JNull: None;
            
            default: Some(e.extract(v));
          }
        }
      });
    }
}
class Tuple2Extensions {
  public static function DecomposerT<T1, T2>(c: Class<Tuple2<Dynamic, Dynamic>>, d1: JDecomposer<T1>, d2: JDecomposer<T2>): JDecomposer<Tuple2<T1, T2>> {
      return DecomposerTypeclass.create({
        decompose: function(v: Tuple2<T1, T2>) { 
          return JArray([d1.decompose(v._1), d2.decompose(v._2)]);
        }
      });
    }
    public static function ExtractorT<T1, T2>(c: Class<Tuple2<Dynamic, Dynamic>>, e1: JExtractor<T1>, e2: JExtractor<T2>): JExtractor<Tuple2<T1, T2>> {
      return ExtractorTypeclass.create({
        extract: function(v: JValue) { 
          return switch(v) {
            case JArray(v): Tuple2.create(e1.extract(v[0]), e2.extract(v[1]));
            
            default: Stax.error("Expected Array but was: " + v);
          }
        }
      });
    }
}
class Tuple3Extensions {
  public static function DecomposerT<T1, T2, T3>(c: Class<Tuple3<Dynamic, Dynamic, Dynamic>>, d1: JDecomposer<T1>, d2: JDecomposer<T2>, d3: JDecomposer<T3>): JDecomposer<Tuple3<T1, T2, T3>> {
      return DecomposerTypeclass.create({
        decompose: function(v: Tuple3<T1, T2, T3>) { 
          return JArray([d1.decompose(v._1), d2.decompose(v._2), d3.decompose(v._3)]);
        }
      });
    }
    public static function ExtractorT<T1, T2, T3>(c: Class<Tuple3<Dynamic, Dynamic, Dynamic>>, e1: JExtractor<T1>, e2: JExtractor<T2>, e3: JExtractor<T3>): JExtractor<Tuple3<T1, T2, T3>> {
      return ExtractorTypeclass.create({
        extract: function(v: JValue) { 
          return switch(v) {
            case JArray(v): Tuple3.create(e1.extract(v[0]), e2.extract(v[1]), e3.extract(v[2]));
            
            default: Stax.error("Expected Array but was: " + v);
          }
        }
      });
    }
}
class Tuple4Extensions {
  public static function DecomposerT<T1, T2, T3, T4>(c: Class<Tuple4<Dynamic, Dynamic, Dynamic, Dynamic>>, d1: JDecomposer<T1>, d2: JDecomposer<T2>, d3: JDecomposer<T3>, d4: JDecomposer<T4>): JDecomposer<Tuple4<T1, T2, T3, T4>> {
      return DecomposerTypeclass.create({
        decompose: function(v: Tuple4<T1, T2, T3, T4>) { 
          return JArray([d1.decompose(v._1), d2.decompose(v._2), d3.decompose(v._3), d4.decompose(v._4)]);
        }
      });
    }
    public static function ExtractorT<T1, T2, T3, T4>(c: Class<Tuple4<Dynamic, Dynamic, Dynamic, Dynamic>>, e1: JExtractor<T1>, e2: JExtractor<T2>, e3: JExtractor<T3>, e4: JExtractor<T4>): JExtractor<Tuple4<T1, T2, T3, T4>> {
      return ExtractorTypeclass.create({
        extract: function(v: JValue) { 
          return switch(v) {
            case JArray(v): Tuple4.create(e1.extract(v[0]), e2.extract(v[1]), e3.extract(v[2]), e4.extract(v[3]));
            
            default: Stax.error("Expected Array but was: " + v);
          }
        }
      });
    }
}
class Tuple5Extensions {
  public static function DecomposerT<T1, T2, T3, T4, T5>(c: Class<Tuple5<Dynamic, Dynamic, Dynamic, Dynamic, Dynamic>>, d1: JDecomposer<T1>, d2: JDecomposer<T2>, d3: JDecomposer<T3>, d4: JDecomposer<T4>, d5: JDecomposer<T5>): JDecomposer<Tuple5<T1, T2, T3, T4, T5>> {
      return DecomposerTypeclass.create({
        decompose: function(v: Tuple5<T1, T2, T3, T4, T5>) { 
          return JArray([d1.decompose(v._1), d2.decompose(v._2), d3.decompose(v._3), d4.decompose(v._4), d5.decompose(v._5)]);
        }
      });
    }
    public static function ExtractorT<T1, T2, T3, T4, T5>(c: Class<Tuple5<Dynamic, Dynamic, Dynamic, Dynamic, Dynamic>>, e1: JExtractor<T1>, e2: JExtractor<T2>, e3: JExtractor<T3>, e4: JExtractor<T4>, e5: JExtractor<T5>): JExtractor<Tuple5<T1, T2, T3, T4, T5>> {
      return ExtractorTypeclass.create({
        extract: function(v: JValue) { 
          return switch(v) {
            case JArray(v): Tuple5.create(e1.extract(v[0]), e2.extract(v[1]), e3.extract(v[2]), e4.extract(v[3]), e5.extract(v[4]));
            
            default: Stax.error("Expected Array but was: " + v);
          }
        }
      });
    }
}
class ArrayExtensions {
    public static function DecomposerT<T>(c: Class<Array<Dynamic>>, d: JDecomposer<T>): JDecomposer<Array<T>> {
      return DecomposerTypeclass.create({
        decompose: function(v: Array<T>) { return JArray(v.map(d.decompose)); }
      });
    }
    public static function ExtractorT<T>(c: Class<Array<Dynamic>>, e: JExtractor<T>): JExtractor<Array<T>> {
      return ExtractorTypeclass.create({
        extract: function(v: JValue) { 
          return switch(v) {
            case JArray(v): v.map(e.extract);
            
            default: Stax.error("Expected Array but was: " + v);
          }
        }
      });
    }
}
class ListExtensions {
  public static function DecomposerT<T>(c: Class<List<Dynamic>>, d: JDecomposer<T>): JDecomposer<List<T>> {
      return DecomposerTypeclass.create({
        decompose: function(v: List<T>): JValue { return JArray(v.toArray().map(d.decompose)); }
      });
    }
    public static function ExtractorT<T>(c: Class<List<Dynamic>>, e: JExtractor<T>, ?eq: EqualFunction<T>): JExtractor<List<T>> {
      return ExtractorTypeclass.create({
        extract: function(v: JValue) { 
          return switch(v) {
            case JArray(v): List.create(eq).addAll(v.map(e.extract));
            
            default: Stax.error("Expected Array but was: " + v);
          }
        }
      });
    }
}
class SetExtensions {
  public static function DecomposerT<T>(c: Class<Set<Dynamic>>, d: JDecomposer<T>): JDecomposer<Set<T>> {
      return DecomposerTypeclass.create({
        decompose: function(v: Set<T>): JValue { return JArray(v.toArray().map(d.decompose)); }
      });
    }
    public static function ExtractorT<T>(c: Class<Set<Dynamic>>, e: JExtractor<T>, ?h: HasherFunction<T>, ?eq: EqualFunction<T>): JExtractor<Set<T>> {
      return ExtractorTypeclass.create({
        extract: function(v: JValue) { 
          return switch(v) {
            case JArray(v): Set.create(h, eq).addAll(v.map(e.extract));
            
            default: Stax.error("Expected Array but was: " + v);
          }
        }
      });
    }
}
class MapExtensions {
  public static function DecomposerT<K, V>(c: Class<Map<Dynamic, Dynamic>>, dk: JDecomposer<K>, dv: JDecomposer<V>): JDecomposer<Map<K, V>> {
    var td = Tuple2.DecomposerT(dk, dv);
    
      return DecomposerTypeclass.create({
        decompose: function(v: Map<K, V>): JValue {
          return JArray(v.toArray().map(td.decompose));
        }
      });
    }
    public static function ExtractorT<K, V>(c: Class<Map<Dynamic, Dynamic>>, ke: JExtractor<K>, ve: JExtractor<V>, ?kh: HasherFunction<K>, ?keq: EqualFunction<K>, ?vh: HasherFunction<V>, ?veq: EqualFunction<V>): JExtractor<Map<K, V>> {
      var te = Tuple2.ExtractorT(ke, ve);
      
      return ExtractorTypeclass.create({
        extract: function(v: JValue) { 
          return switch(v) {
            case JArray(v): Map.create(kh, keq, vh, veq).addAll(v.map(te.extract));
            
            default: Stax.error("Expected Array but was: " + v);
          }
        }
      });
    }
    
    public static function StringKeyDecomposerT<V>(c: Class<Map<Dynamic, Dynamic>>, dv: JDecomposer<V>): JDecomposer<Map<String, V>> {
      return DecomposerTypeclass.create({
        decompose: function(v: Map<String, V>): JValue {
          return JObject(v.toArray().map(function(t) {
            return JField(t._1, dv.decompose(t._2));
          }));
        }
      });
    }
    public static function StringKeyExtractorT<V>(c: Class<Map<Dynamic, Dynamic>>, ve: JExtractor<V>, ?vh: HasherFunction<V>, ?veq: EqualFunction<V>): JExtractor<Map<String, V>> {
      var te = Tuple2.ExtractorT(StringExtensions.ExtractorT(String), ve);
      
      return ExtractorTypeclass.create({
        extract: function(v: JValue) { 
          return switch(v) {
            case JObject(v): Map.create(String.HasherF(), String.EqualF(), vh, veq).addAll(v.map(function(j) {
              return switch(j) {
                case JField(k, v): Tuple2.create(k, ve.extract(v));
                
                default: Stax.error("Expected field but was: " + v);
              }
            }));
            
            default: Stax.error("Expected Array but was: " + v);
          }
        }
      });
    }
}
class JValueExtensions {
  public static function DecomposerT<T>(c: Enum<JValue>): JDecomposer<JValue> {
      return DecomposerTypeclass.create({
        decompose: function(v: JValue) { return v; }
      });
    }
    public static function ExtractorT(c: Enum<JValue>): JExtractor<JValue> {
      return ExtractorTypeclass.create({
        extract: function(v: JValue) { return v; }
      });
    }
}