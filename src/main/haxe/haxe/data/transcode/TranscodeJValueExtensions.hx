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

import Type;

import Prelude;
import PreludeExtensions;

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
}

class DecomposerHelpers {
    public static function getDecomposerFor<T>(t : T) : JDecomposerFunction<T> {
      return _createDecomposerImpl(function(v : T) {
        return if(Type.getInstanceFields(Type.getClass(v)).remove("decompose"))
          Reflect.callMethod(v, Reflect.field(v, "decompose"), []);
        else
          Stax.error("Decomposer function cannt be created. 'Serialize' method is missing. Object: " + t);
      });
    }
    static function _createDecomposerImpl<T>(impl : JDecomposerFunction<Dynamic>) : JDecomposerFunction<T> {
      return function(v) return null == v ? JNull : impl(v);
    }
}

class MapExtensions {
  public static function stringKeyDecompose<V>(v: Map<String, V>): JValue {
    var it = v.iterator();
    if(!it.hasNext()) {
      var dv = TranscodeJValue.getDecomposerFor(Type.typeof(it.next()._2));
      return JObject(v.toArray().map(function(t) {return JField(t._1, dv(t._2));}));
    }
    else{
      return JObject([]);
    }
  }

  public static function stringKeyExtract<V>(v: JValue, ve: JExtractorFunction<V>): Map<String, V> {
    var extract0 = function(v: Array<JValue>){
      return Map.create().addAll(v.map(function(j) {
        return switch(j) {
          case JField(k, v): Tuple2.create(k, ve(v));

          default: Stax.error("Expected field but was: " + v);
        }
      }));
    }

    return switch(v) {
      case JObject(v): extract0(v);
      case JArray(v) : extract0(v);

      default: Stax.error("Expected either Array or Object but was: " + v);
    }
  }
}

class TranscodeJValue{
  static function _createDecomposeImpl<T>(impl : JDecomposerFunction<Dynamic>) return function(v : T) if(null == v) return JNull else return impl(v)

  public static function getDecomposerFor<T>(v: ValueType): JDecomposerFunction<T>{
    return switch (v){
      case TBool:
        _createDecomposeImpl(BoolExtensions.decompose);
      case TInt:
        _createDecomposeImpl(IntExtensions.decompose);
      case TFloat:
        _createDecomposeImpl(FloatExtensions.decompose);
      case TUnknown:
        _createDecomposeImpl(function(v) return Stax.error("Can't decompose TUnknown: " + v));
      case TObject:
        _createDecomposeImpl(function(v) return Stax.error("Can't decompose TObject: " + v));
      case TClass(c):
        switch(Type.getClassName(c)) {
        case "String":
          _createDecomposeImpl(StringExtensions.decompose);
        case "Date":
          _createDecomposeImpl(DateExtensions.decompose);
        case "Array":
          _createDecomposeImpl(ArrayExtensions.decompose);
        default:
          _createDecomposeImpl(function(v) {
          return if(Type.getInstanceFields(Type.getClass(v)).remove("decompose"))
            Reflect.callMethod(v, Reflect.field(v, "decompose"), []);
          else
            Stax.error("class does not have a hashCode method");
        });
        }
      case TEnum(e):
         switch (Type.getEnumName(e)){
           case "Option": _createDecomposeImpl(OptionExtensions.decompose);
           case "haxe.text.json.JValue" : _createDecomposeImpl(JValueExtensions.decompose);
           default: _createDecomposeImpl(function(v){
              var constructor = Type.enumConstructor(v);
              var decomposed  = JField(Type.enumConstructor(v), JArray(Type.enumParameters(v).map(function(v){return TranscodeJValue.getDecomposerFor(Type.typeof(v))(v);})));
              return JObject([decomposed]);
           });
         }
      case TFunction:
        _createDecomposeImpl(function(v) {Stax.error("Can't decompose function."); return JNull;});
      case TNull:
        function(v) return JNull;
      default:
        _createDecomposeImpl(function(v) {Stax.error("Can't decompose unknown type."); return JNull;});
    }
  }
}