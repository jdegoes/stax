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
import stax.Tuples;

import stax.Strings;
import stax.plus.Hasher;


using stax.Dynamics;

import Prelude;
using Stax;
import stax.Arrays;
import haxe.data.collections.Map;
import haxe.data.transcode.Transcode;
import haxe.data.transcode.TranscodeJValue;

import haxe.text.json.JValue;
import haxe.text.json.PrimitivesJValue;
import haxe.text.json.CollectionsJValue;
import haxe.text.json.JValueExtensions;


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

class MapOps {
  public static function stringKeyDecompose<V>(v: Map<String, V>): JValue {
    var it = v.iterator();
    if(it.hasNext()) {
      var dv = TranscodeJValue.getDecomposerFor(Type.typeof(it.next()._2));
      return JObject(v.toArray().map(function(t) {return JField(t._1, dv(t._2));}));
    }
    else{
      return JObject([]);
    }
  }

  public static function stringKeyExtract<V>(v: JValue, ve: JExtractorFunction<V>, ?vorder : OrderFunction<V>, ?vequal: EqualFunction<V>, ?vhash: HashFunction<V>, ?vshow : ShowFunction<V>): Map<String, V> {
    var extract0 = function(v: Array<JValue>){
      return Map.create(Strings.compare, Strings.equals, StringHasher.hashCode, Strings.toString, vorder, vequal, vhash, vshow).addAll(v.map(function(j) {
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
  static function _createDecomposeImpl<T>(impl : JDecomposerFunction<Dynamic>) {
		return function(v : T) {
				return 
					if (null == v) {					
						JNull; 
					}else{
						impl(v);
					}
		}
	}

  public static function getDecomposerFor<T>(v: ValueType): JDecomposerFunction<T>{
    return switch (v){
      case TBool:
        _createDecomposeImpl(BoolJValue.decompose);
      case TInt:
        _createDecomposeImpl(IntJValue.decompose);
      case TFloat:
        _createDecomposeImpl(FloatJValue.decompose);
      case TUnknown:
        _createDecomposeImpl(function(v) return Stax.error("Can't decompose TUnknown: " + v));
      case TObject:
        _createDecomposeImpl(function(v) return Stax.error("Can't decompose TObject: " + v));
      case TClass(c):
        switch(Type.getClassName(c)) {
        case "String":
          _createDecomposeImpl(StringJValue.decompose);
        case "Date":
          _createDecomposeImpl(DateJValue.decompose);
        case "Array":
          _createDecomposeImpl(ArrayJValue.decompose);
				case "haxe.data.collections.List":
					_createDecomposeImpl(ListJValue.decompose);
				case "haxe.data.collections.Map":
					_createDecomposeImpl(MapJValue.decompose);
				case "haxe.data.collections.Set":
					_createDecomposeImpl(SetJValue.decompose);
				case "stax.Tuple2":
					_createDecomposeImpl(Tuple2JValue.decompose);
				case "stax.Tuple3":
					_createDecomposeImpl(Tuple3JValue.decompose);
				case "stax.Tuple4":
					_createDecomposeImpl(Tuple4JValue.decompose);
				case "stax.Tuple5":
					_createDecomposeImpl(Tuple5JValue.decompose);
        default:
						//TODO make open to subclasses.
            Stax.error("Decompose function cannot be created. " + v);
				};
      case TEnum(e):
         switch (Type.getEnumName(e)){
           case "Option": _createDecomposeImpl(OptionJValue.decompose);
           case "haxe.text.json.JValue" : _createDecomposeImpl(JValueExtensions.decompose);
           default: _createDecomposeImpl(function(v) {
             var name        = StringJValue.decompose(Type.getEnumName(e));
             var constructor = StringJValue.decompose(Type.enumConstructor(v));
						  
             var parameters  = JArray(Type.enumParameters(v).map(function(v) { return TranscodeJValue.getDecomposerFor(Type.typeof(v))(v); } ));
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

  public static function getExtractorFor<T>(valueType: ValueType, ?args: Array<Dynamic>): JExtractorFunction<T> {
    return switch (valueType){
      case TBool:
        _createExtractorImpl(function(v){return BoolJValue.extract(Bool, v);});
      case TInt:
        _createExtractorImpl(function(v){return IntJValue.extract(Int, v);});
      case TFloat:
        _createExtractorImpl(function(v){return FloatJValue.extract(Float, v);});
      case TUnknown:
        _createExtractorImpl(function(v) return Stax.error("Can't extract TUnknown: " + v));
      case TObject:
        _createExtractorImpl(function(v) return Stax.error("Can't extract TObject: " + v));
      case TClass(c):
					var t : Class<Dynamic> = c;
					var cname = Type.getClassName(c);
        switch(cname) {
        case "String":
          _createExtractorImpl(function(v){return StringJValue.extract(String, v);});
        case "Date":
          _createExtractorImpl(function(v){return DateJValue.extract(Date, v);});
        case "Array":
          _createExtractorImpl(function(v) { return ArrayJValue.extract(Array, v, args[0]); } );
				case 'haxe.data.collections.List':
					_createExtractorImpl(function(v) { return ListJValue.extract(v, args[0] , args[1]); } );
				case 'haxe.data.collections.Map':
					_createExtractorImpl(function(v) { return MapJValue.extract(v, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]); } );
				case 'haxe.data.collections.Set':
					_createExtractorImpl(function(v) { return SetJValue.extract(v, args[0], args[1]); } );
				case 'stax.Tuple2'	: 
					_createExtractorImpl(function(v) { return Tuple2JValue.extract( v, args[0], args[1]); } );
				case 'stax.Tuple3' 	:	
						_createExtractorImpl(function(v) { return Tuple3JValue.extract( v, args[0], args[1], args[2]); });
				case 'stax.Tuple4' 	: 
						_createExtractorImpl(function(v) { return Tuple4JValue.extract( v, args[0], args[1], args[2], args[3]); } );
				case 'stax.Tuple5'	: 
						_createExtractorImpl(function(v) { return Tuple5JValue.extract( v, args[0], args[1], args[2], args[3], args[4]); } );
        default							:	
						Stax.error("Extract function cannot be created. 'extract' method is missing. Type: " + valueType);
			}
      case TEnum(e)					:
         switch (Type.getEnumName(e)){
           case "Option": _createExtractorImpl(function(v){return OptionJValue.extract(Option, v, args[0]);});
           case "haxe.text.json.JValue" : _createExtractorImpl(function(v){return JValueExtensions.extract(JValue, v);});
           default: _createExtractorImpl(function(v){
              switch(v){
                case JArray(arr): {
                  var name        = StringJValue.extract(String, arr[0]);
                  var constructor = StringJValue.extract(String, arr[1]);
                  var parameters  = switch (arr[2]){
                      case JArray(a):
                        if (args == null)
                          args = [];
                        Arrays.zip(a, args).map(function(t){return t._2(t._1);});
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
