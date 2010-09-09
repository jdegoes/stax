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
  public static function extractFieldValue<T>(j: JValue, n: String, e: JExtractorFunction<T>, def: JValue) {
    var fieldValue = j.getOrElse(n, def.toThunk());

    try {
      return e(fieldValue);
    }
    catch (err: Dynamic) {
      return e(def);
    }
  }
  public static function extractImplementation<T>(v : JValue, namespace: String, ?nameEncodeFunction: Function1<String, String>): T {
    var hash = v.extractHash();
    var keys = hash.keys();

    if (keys.hasNext()){
      var className = keys.next();
      var value     = hash.get(className);
      if (null != nameEncodeFunction) className = nameEncodeFunction(className);

      var clazz = Type.resolveClass(namespace + "." + className);
      return cast Reflect.callMethod(clazz, Reflect.field(clazz, "deserialize"), [value]);
    }
    else Stax.error("Implementation cannot be deserialized."); return null;
  }
}

class DecomposerHelpers {
  public static function serializeImplementation<T>(t : T, ?nameEncodeFunction: Function1<String, String>): JValue {
    var className = DecomposerHelpers.getClassShortName(t);
    if (null != nameEncodeFunction) className = nameEncodeFunction(className);
    return JObject([JField(className, DecomposerHelpers.getDecomposerFor(t)(t))]);
  }
  static function getClassShortName<T>(t : T): String{
    switch(Type.typeof(t))
    {
      case TClass(c): {
        var name  = Type.getClassName(c);
        var index = name.lastIndexOf(".");
        return if (index != -1) name.substr(index + 1);
        else name;
      }
      default: Stax.error("Value is not class. Value: " + t); return null;
    }
  }
  public static function getDecomposerFor<T>(t : T) : JDecomposerFunction<T> {
    return _createDecomposerImpl(function(v : T) {
      return if(Type.getInstanceFields(Type.getClass(v)).remove("serialize"))
        Reflect.callMethod(v, Reflect.field(v, "serialize"), []);
      else
        Stax.error("Decomposer function cannt be created. 'Serialize' method is missing. Object: " + t);
    });
  }
  static function _createDecomposerImpl<T>(impl : JDecomposerFunction<Dynamic>) : JDecomposerFunction<T> {
    return function(v) return null == v ? JNull : impl(v);
  }
}

class BoolExtensions {
  public static function DecomposerF(c: Enum<Bool>): JDecomposerFunction<Bool> {
    return function(v) { return JBool(v); }
  }
  public static function ExtractorF(c: Enum<Bool>): JExtractorFunction<Bool> {
    return function(v: JValue) {
      return switch(v) {
        case JBool(v): v;
        case JNumber(v): if (v == 0.0) false; else true;
        case JString(v): v.toBool();

        default: Stax.error("Expected Bool but found: " + v);
      }
    }
  }
}
class IntExtensions {
  public static function DecomposerF(c: Class<Int>): JDecomposerFunction<Int> {
    return function(v: Int) { return JNumber(v); }
  }
  public static function ExtractorF(c: Class<Int>): JExtractorFunction<Int> {
    return function(v: JValue) {
      return switch(v) {
        case JNumber(v): v.toInt();
        case JString(v): v.toInt();

        default: Stax.error("Expected Int but found: " + v);
      }
    }
  }
}
class FloatExtensions {
  public static function DecomposerF(c: Class<Float>): JDecomposerFunction<Float> {
    return function(v: Float) { return JNumber(v); }
  }
  public static function ExtractorF(c: Class<Float>): JExtractorFunction<Float> {
    return function(v: JValue) {
      return switch(v) {
        case JNumber(v): v;
        case JString(v): v.toFloat();

        default: Stax.error("Expected Float but found: " + v);
      }
    }
  }
}
class StringExtensions {
  public static function DecomposerF(c: Class<String>): JDecomposerFunction<String> {
    return function(v: String) { return JString(v); }
  }
  public static function ExtractorF(c: Class<String>): JExtractorFunction<String> {
    return function(v: JValue) {
      return switch(v) {
        case JNumber(v): v.toString();
        case JBool(v): v.toString();
        case JString(v): v;

        default: Stax.error("Expected String but found: " + v);
      }
    }
  }
}
class DateExtensions {
  public static function DecomposerF(c: Class<Date>): JDecomposerFunction<Date> {
    return function(v: Date) { return JNumber(v.getTime()); }
  }
  public static function ExtractorF(c: Class<Date>): JExtractorFunction<Date> {
    return function(v: JValue) {
      return switch(v) {
        case JNumber(v): Date.fromTime(v);
        case JString(v): Date.fromTime(v.toFloat());

        default: Stax.error("Expected Number but found: " + v);
      }
    }
  }
}
class OptionExtensions {
  public static function DecomposerF<T>(c: Enum<Option<Dynamic>>, d: JDecomposerFunction<T>): JDecomposerFunction<Option<T>> {
    return function(v: Option<T>): JValue { return v.map(d).getOrElse(JNull.toThunk()); }
  }
  public static function ExtractorF<T>(c: Enum<Option<Dynamic>>, e: JExtractorFunction<T>): JExtractorFunction<Option<T>> {
  return function(v: JValue) {
      return switch(v) {
        case JNull: None;

        default: Some(e(v));
      }
    }
  }
}
class Tuple2Extensions {
  public static function DecomposerF<T1, T2>(c: Class<Tuple2<Dynamic, Dynamic>>, d1: JDecomposerFunction<T1>, d2: JDecomposerFunction<T2>): JDecomposerFunction<Tuple2<T1, T2>> {
    return function(v: Tuple2<T1, T2>) {
      return JArray([d1(v._1), d2(v._2)]);
    }
  }
  public static function ExtractorF<T1, T2>(c: Class<Tuple2<Dynamic, Dynamic>>, e1: JExtractorFunction<T1>, e2: JExtractorFunction<T2>): JExtractorFunction<Tuple2<T1, T2>> {
    return function(v: JValue) {
      return switch(v) {
        case JArray(v): Tuple2.create(e1(v[0]), e2(v[1]));
 
        default: Stax.error("Expected Array but was: " + v);
      }
    }
  }
}
class Tuple3Extensions {
  public static function DecomposerF<T1, T2, T3>(c: Class<Tuple3<Dynamic, Dynamic, Dynamic>>, d1: JDecomposerFunction<T1>, d2: JDecomposerFunction<T2>, d3: JDecomposerFunction<T3>): JDecomposerFunction<Tuple3<T1, T2, T3>> {
    return function(v: Tuple3<T1, T2, T3>) {
      return JArray([d1(v._1), d2(v._2), d3(v._3)]);
    }
  }
  public static function ExtractorF<T1, T2, T3>(c: Class<Tuple3<Dynamic, Dynamic, Dynamic>>, e1: JExtractorFunction<T1>, e2: JExtractorFunction<T2>, e3: JExtractorFunction<T3>): JExtractorFunction<Tuple3<T1, T2, T3>> {
    return function(v: JValue) {
      return switch(v) {
        case JArray(v): Tuple3.create(e1(v[0]), e2(v[1]), e3(v[2]));

        default: Stax.error("Expected Array but was: " + v);
      }
    }
  }
}
class Tuple4Extensions {
  public static function DecomposerF<T1, T2, T3, T4>(c: Class<Tuple4<Dynamic, Dynamic, Dynamic, Dynamic>>, d1: JDecomposerFunction<T1>, d2: JDecomposerFunction<T2>, d3: JDecomposerFunction<T3>, d4: JDecomposerFunction<T4>): JDecomposerFunction<Tuple4<T1, T2, T3, T4>> {
    return function(v: Tuple4<T1, T2, T3, T4>) {
      return JArray([d1(v._1), d2(v._2), d3(v._3), d4(v._4)]);
    }
  }
  public static function ExtractorF<T1, T2, T3, T4>(c: Class<Tuple4<Dynamic, Dynamic, Dynamic, Dynamic>>, e1: JExtractorFunction<T1>, e2: JExtractorFunction<T2>, e3: JExtractorFunction<T3>, e4: JExtractorFunction<T4>): JExtractorFunction<Tuple4<T1, T2, T3, T4>> {
    return function(v: JValue) {
      return switch(v) {
        case JArray(v): Tuple4.create(e1(v[0]), e2(v[1]), e3(v[2]), e4(v[3]));

        default: Stax.error("Expected Array but was: " + v);
      }
    }
  }
}
class Tuple5Extensions {
  public static function DecomposerF<T1, T2, T3, T4, T5>(c: Class<Tuple5<Dynamic, Dynamic, Dynamic, Dynamic, Dynamic>>, d1: JDecomposerFunction<T1>, d2: JDecomposerFunction<T2>, d3: JDecomposerFunction<T3>, d4: JDecomposerFunction<T4>, d5: JDecomposerFunction<T5>): JDecomposerFunction<Tuple5<T1, T2, T3, T4, T5>> {
    return function(v: Tuple5<T1, T2, T3, T4, T5>) {
      return JArray([d1(v._1), d2(v._2), d3(v._3), d4(v._4), d5(v._5)]);
    }
  }
  public static function ExtractorF<T1, T2, T3, T4, T5>(c: Class<Tuple5<Dynamic, Dynamic, Dynamic, Dynamic, Dynamic>>, e1: JExtractorFunction<T1>, e2: JExtractorFunction<T2>, e3: JExtractorFunction<T3>, e4: JExtractorFunction<T4>, e5: JExtractorFunction<T5>): JExtractorFunction<Tuple5<T1, T2, T3, T4, T5>> {
    return function(v: JValue) {
      return switch(v) {
        case JArray(v): Tuple5.create(e1(v[0]), e2(v[1]), e3(v[2]), e4(v[3]), e5(v[4]));
 
        default: Stax.error("Expected Array but was: " + v);
      }
    }
  }
}
class ArrayExtensions {
  public static function DecomposerF<T>(c: Class<Array<Dynamic>>, d: JDecomposerFunction<T>): JDecomposerFunction<Array<T>> {
    return function(v: Array<T>) {
      return JArray(v.map(d));
    }
  }
  public static function ExtractorF<T>(c: Class<Array<Dynamic>>, e: JExtractorFunction<T>): JExtractorFunction<Array<T>> {
    return function(v: JValue) {
      return switch(v) {
        case JArray(v): v.map(e);

        default: Stax.error("Expected Array but was: " + v);
      }
    }
  }
}
class ListExtensions {
  public static function DecomposerF<T>(c: Class<List<Dynamic>>, d: JDecomposerFunction<T>): JDecomposerFunction<List<T>> {
    return function(v: List<T>): JValue { return JArray(v.toArray().map(d)); }
  }
  public static function ExtractorF<T>(c: Class<List<Dynamic>>, e: JExtractorFunction<T>, ?eq: EqualFunction<T>): JExtractorFunction<List<T>> {
    return function(v: JValue) {
      return switch(v) {
        case JArray(v): List.create(eq).addAll(v.map(e));

        default: Stax.error("Expected Array but was: " + v);
      }
    }
  }
}
class SetExtensions {
  public static function DecomposerF<T>(c: Class<Set<Dynamic>>, d: JDecomposerFunction<T>): JDecomposerFunction<Set<T>> {
    return function(v: Set<T>): JValue { return JArray(v.toArray().map(d)); }
  }
  public static function ExtractorF<T>(c: Class<Set<Dynamic>>, e: JExtractorFunction<T>, ?h: HashFunction<T>, ?eq: EqualFunction<T>): JExtractorFunction<Set<T>> {
    return function(v: JValue) {
      return switch(v) {
        case JArray(v): Set.create(eq, h).addAll(v.map(e));

        default: Stax.error("Expected Array but was: " + v);
      }
    }
  }
}
class MapExtensions {
  public static function DecomposerF<K, V>(c: Class<Map<Dynamic, Dynamic>>, dk: JDecomposerFunction<K>, dv: JDecomposerFunction<V>): JDecomposerFunction<Map<K, V>> {
    var td = Tuple2.DecomposerF(dk, dv);

      return function(v: Map<K, V>): JValue {
          return JArray(v.toArray().map(td));
        }
  }
  public static function ExtractorF<K, V>(c: Class<Map<Dynamic, Dynamic>>, ke: JExtractorFunction<K>, ve: JExtractorFunction<V>, ?kh: HashFunction<K>, ?keq: EqualFunction<K>, ?vh: HashFunction<V>, ?veq: EqualFunction<V>): JExtractorFunction<Map<K, V>> {
    var te = Tuple2.ExtractorF(ke, ve);

    return function(v: JValue) {
      return switch(v) {
        case JArray(v): Map.create(keq, kh, veq, vh).addAll(v.map(te));

        default: Stax.error("Expected Array but was: " + v);
      }
    }
  }

  public static function StringKeyDecomposerF<V>(c: Class<Map<Dynamic, Dynamic>>, dv: JDecomposerFunction<V>): JDecomposerFunction<Map<String, V>> {
    return function(v: Map<String, V>): JValue {
      return JObject(v.toArray().map(function(t) {
        return JField(t._1, dv(t._2));
      }));
    }
  }

  public static function StringKeyExtractorF<V>(c: Class<Map<Dynamic, Dynamic>>, ve: JExtractorFunction<V>, ?vh: HashFunction<V>, ?veq: EqualFunction<V>): JExtractorFunction<Map<String, V>> {
    var te = Tuple2.ExtractorF(StringExtensions.ExtractorF(String), ve);

    var extract0 = function(v: Array<JValue>){
      return Map.create(null, null, veq, vh).addAll(v.map(function(j) {
        return switch(j) {
          case JField(k, v): Tuple2.create(k, ve(v));

          default: Stax.error("Expected field but was: " + v);
        }
      }));
    }

    return function(v: JValue) {
      return switch(v) {
        case JObject(v): extract0(v);
        case JArray(v) : extract0(v);

        default: Stax.error("Expected either Array or Object but was: " + v);
      }
    }
  }
}
class JValueExtensions {
  public static function DecomposerF<T>(c: Enum<JValue>): JDecomposerFunction<JValue> {
    return function(v: JValue) { return v; }
  }
  public static function ExtractorF(c: Enum<JValue>): JExtractorFunction<JValue> {
    return function(v: JValue) { return v; }
  }
}