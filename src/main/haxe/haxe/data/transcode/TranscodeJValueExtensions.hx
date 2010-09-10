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
            Stax.error("Decompose function cannot be created. 'decompose' method is missing. Object: " + v);
        });
        }
      case TEnum(e):
         switch (Type.getEnumName(e)){
           case "Option": _createDecomposeImpl(OptionExtensions.decompose);
           case "haxe.text.json.JValue" : _createDecomposeImpl(JValueExtensions.decompose);
           default: _createDecomposeImpl(function(v){
             var name        = StringExtensions.decompose(Type.getEnumName(e));
             var constructor = StringExtensions.decompose(Type.enumConstructor(v));
             var parameters  = JArray(Type.enumParameters(v).map(function(v){return TranscodeJValue.getDecomposerFor(Type.typeof(v))(v);}));
             return JArray([name, constructor, parameters]);
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

  static function _createExtractorImpl<T>(impl : JExtractorFunction<Dynamic>) return function(v : JValue) if(null == v) return null else return impl(v)

  public static function getExtractorFor<T>(valueType: ValueType, ?extractors: Array<JExtractorFunction<T>>): JExtractorFunction<T>{
    return switch (valueType){
      case TBool:
        _createExtractorImpl(function(v){return BoolExtensions.extract(Bool, v);});
      case TInt:
        _createExtractorImpl(function(v){return IntExtensions.extract(Int, v);});
      case TFloat:
        _createExtractorImpl(function(v){return FloatExtensions.extract(Float, v);});
      case TUnknown:
        _createExtractorImpl(function(v) return Stax.error("Can't extract TUnknown: " + v));
      case TObject:
        _createExtractorImpl(function(v) return Stax.error("Can't extract TObject: " + v));
      case TClass(c):
        switch(Type.getClassName(c)) {
        case "String":
          _createExtractorImpl(function(v){return StringExtensions.extract(String, v);});
        case "Date":
          _createExtractorImpl(function(v){return DateExtensions.extract(Date, v);});
        case "Array":
          _createExtractorImpl(function(v){return ArrayExtensions.extract(Array, v, extractors[0]);});
        default:
          _createExtractorImpl(function(v) {
            return if(Type.getClassFields(c).remove("extract")){
              var args: Array<Dynamic> = [cast v];
              if (extractors != null){
                for (e in extractors){
                  args.push(e);
                }
              }
              Reflect.callMethod(c, Reflect.field(c, "extract"), args);
            }
            else
              Stax.error("Extract function cannot be created. 'extract' method is missing. Type: " + valueType);
        });
        }
      case TEnum(e):
         switch (Type.getEnumName(e)){
           case "Option": _createExtractorImpl(function(v){return OptionExtensions.extract(Option, v, extractors[0]);});
           case "haxe.text.json.JValue" : _createExtractorImpl(function(v){return JValueExtensions.extract(JValue, v);});
           default: _createExtractorImpl(function(v){
              switch(v){
                case JArray(arr): {
                  var name        = StringExtensions.extract(String, arr[0]);
                  var constructor = StringExtensions.extract(String, arr[1]);
                  var parameters  = switch (arr[2]){
                      case JArray(a):
                        if (extractors == null)
                          extractors = [];
                        ArrayExtensions.zip(a, extractors).map(function(t){return t._2(t._1);});
                      default: Stax.error("Expected JArray but was: " + v);
                    }
                  return Type.createEnum(Type.resolveEnum(name), constructor, parameters);
                };
                default: Stax.error("Expected JArray but was: " + v); return null;
              }
           });
         }
      case TFunction:
        _createExtractorImpl(function(v) {Stax.error("Can't extract function."); return JNull;});
      case TNull:
        function(v) return null;
      default:
        _createExtractorImpl(function(v) {Stax.error("Can't extract unknown type."); return JNull;});
    }
  }
}
