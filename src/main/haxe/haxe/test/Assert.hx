/*
 HaXe library written by Franco Ponticelli <franco.ponticelli@gmail.com>

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the
 distribution.

 THIS SOFTWARE IS PROVIDED BY FRANCO PONTICELLI "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL SOCIAL MEDIA NETWORKS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
package haxe.test;

import Prelude;
import stax.Future;

import stax.plus.Equal;

import haxe.io.Bytes;
import haxe.test.Assertation;
import haxe.test.MustMatchers;
import haxe.PosInfos;
using stax.Options;



/**
* This class contains only static members used to perform assertations inside a test method.
* It's use is straight forward:
* <pre>
* public function testObvious() {
*   Assert.equals(1, 0); // fails
*   Assert.isFalse(1 == 1, "guess what?"); // fails and returns the passed message
*   Assert.isTrue(true); // successfull
* }
* </pre>
*/
class Assert {
  /**
  * A stack of results for the current testing workflow. It is used internally
  * by other classes of the utest library.
  */
  public static var results : List<Assertation>;
  
  /**
   * Asserts that the specified condition holds.
   * <pre>
   * Assert.that(2, Must.equal(1).or(Must.beNull())); // Fails with: 'Expected: ((x == 1) || (x == null)), Found: x == 2'
   * </pre>
   */
  public static function that<T>(obj: T, cond: MustMatcher<T>, ?msg: String, ?pos: PosInfos) {
    switch (cond(obj)) {
      case Left(result):  Assert.isTrue(false, 'Expected: ' + result.assertion + ', Found: x = ' + q(obj), pos);
      case Right(_):      Assert.isTrue(true, pos);
    }
  }
  
  /**
  * Asserts successfully when the condition is true.
  * @param cond: The condition to test
  * @param msg: An optional error message. If not passed a default one will be used
  * @param pos: Code position where the Assert call has been executed. Don't fill it
  * unless you know what you are doing.
  */
  public static function isTrue(cond : Bool, ?msg : String, ?pos : PosInfos) {
    if (results == null) throw "Assert.results is not currently bound to any assert context";
    if (null == msg)
      msg = "expected true";
    if(cond)
      results.add(Success(pos));
    else
      results.add(Failure(msg, pos));
  }
  /**
  * Asserts successfully when the condition is false.
  * @param cond: The condition to test
  * @param msg: An optional error message. If not passed a default one will be used
  * @param pos: Code position where the Assert call has been executed. Don't fill it
  * unless you know what you are doing.
  */
  public static function isFalse(value : Bool, ?msg : String, ?pos : PosInfos) {
    if (null == msg)
      msg = "expected false";
    isTrue(value == false, msg, pos);
  }
  /**
  * Asserts successfully when the value is null.
  * @param value: The value to test
  * @param msg: An optional error message. If not passed a default one will be used
  * @param pos: Code position where the Assert call has been executed. Don't fill it
  * unless you know what you are doing.
  */
  public static function isNull(value : Dynamic, ?msg : String, ?pos : PosInfos) {
    if (msg == null)
      msg = "expected null but was " + q(value);
    isTrue(value == null, msg, pos);
  }
  /**
  * Asserts successfully when the value is not null.
  * @param value: The value to test
  * @param msg: An optional error message. If not passed a default one will be used
  * @param pos: Code position where the Assert call has been executed. Don't fill it
  * unless you know what you are doing.
  */
  public static function notNull(value : Dynamic, ?msg : String, ?pos : PosInfos) {
    if (null == msg)
      msg = "expected false";
    isTrue(value != null, msg, pos);
  }
  /**
  * Asserts successfully when the 'value' parameter is of the of the passed type 'type'.
  * @param value: The value to test
  * @param type: The type to test against
  * @param msg: An optional error message. If not passed a default one will be used
  * @param pos: Code position where the Assert call has been executed. Don't fill it
  * unless you know what you are doing.
  */
  public static function is(value : Dynamic, type : Dynamic, ?msg : String , ?pos : PosInfos) {
    if (msg == null) msg = "expected type " + typeToString(type) + " but was " + typeToString(value);
    isTrue(Std.is(value, type), msg, pos);
  }
  
  /**
  * Asserts successfully when the value parameter is not the same as the expected one.
  * <pre>
  * Assert.notEquals(10, age);
  * </pre>
  * @param expected: The expected value to check against
  * @param value: The value to test
  * @param msg: An optional error message. If not passed a default one will be used
  * @param pos: Code position where the Assert call has been executed. Don't fill it
  * unless you know what you are doing.
  */
  public static function notEquals(expected : Dynamic, value : Dynamic, ?msg : String , ?pos : PosInfos) {
    if(msg == null) msg = "expected " + q(expected) + " and testa value " + q(value) + " should be different";
    isFalse(expected == value, msg, pos);
  }
  
  /**
  * Asserts successfully when the value parameter is equal to the expected one.
  * <pre>
  * Assert.equals(10, age);
  * </pre>
  * @param expected: The expected value to check against
  * @param value: The value to test
  * @param msg: An optional error message. If not passed a default one will be used
  * @param pos: Code position where the Assert call has been executed. Don't fill it
  * unless you know what you are doing.
  */
  public static function equals<T>(expected: T, value: T, ?equal: EqualFunction<T>, ?msg : String , ?pos : PosInfos) {
    if (equal == null) equal = Equal.getEqualFor(expected);
    
    if(msg == null) msg = "expected " + q(expected) + " but was " + q(value);
    isTrue(equal(expected, value), msg, pos);
  }
  
  /**
  * Asserts successfully when the value parameter does match against the passed EReg instance.
  * <pre>
  * Assert.match(~/x/i, "haXe");
  * </pre>
  * @param pattern: The pattern to match against
  * @param value: The value to test
  * @param msg: An optional error message. If not passed a default one will be used
  * @param pos: Code position where the Assert call has been executed. Don't fill it
  * unless you know what you are doing.
  */
  public static function matches(pattern : EReg, value : Dynamic, ?msg : String , ?pos : PosInfos) {
    if(msg == null) msg = "the value " + q(value) + "does not match the provided pattern";
    isTrue(pattern.match(value), msg, pos);
  }

  /**
  * Same as Assert.equals but considering an approximation error.
  * <pre>
  * Assert.floatEquals(Math.PI, value);
  * </pre>
  * @param expected: The expected value to check against
  * @param value: The value to test
  * @param approx: The approximation tollerance. Default is 1e-5
  * @param msg: An optional error message. If not passed a default one will be used
  * @param pos: Code position where the Assert call has been executed. Don't fill it
  * unless you know what you are doing.
  * @todo test the approximation argument
  */
  public static function floatEquals(expected : Float, value : Float, ?approx : Float, ?msg : String , ?pos : PosInfos) : Void {
    if (msg == null) msg = "expected " + expected + " but was " + value;
    if (Math.isNaN(expected))
      if (Math.isNaN(value))
        return isTrue(true, msg, pos);
      else
        return isTrue(false, msg, pos);
    else if (Math.isNaN(value))
      return isTrue(false, msg, pos);
    if (null == approx)
      approx = 1e-5;
    return isTrue(Math.abs(value-expected) < approx, msg, pos);
  }

  static function getTypeName(v : Dynamic) {
    switch(Type.typeof(v))
    {
      case TNull    : return null;
      case TInt     : return "Int";
      case TFloat   : return "Float";
      case TBool    : return "Bool";
      case TFunction: return "function";
      case TClass(c): return Type.getClassName(c);
      case TEnum(e) : return Type.getEnumName(e);
      case TObject  : return "Object";
      case TUnknown : return "Unknown";
    }
  }

  static function isIterable(v : Dynamic, isAnonym : Bool) {
    var fields = isAnonym ? Reflect.fields(v) : Type.getInstanceFields(Type.getClass(v));
    if(!Lambda.has(fields, "iterator")) return false;
    return Reflect.isFunction(Reflect.field(v, "iterator"));
  }

  static function isIterator(v : Dynamic, isAnonym : Bool) {
    var fields = isAnonym ? Reflect.fields(v) : Type.getInstanceFields(Type.getClass(v));
    if(!Lambda.has(fields, "next") || !Lambda.has(fields, "hasNext")) return false;
    return Reflect.isFunction(Reflect.field(v, "next")) && Reflect.isFunction(Reflect.field(v, "hasNext"));
  }

  static function sameAs(expected : Dynamic, value : Dynamic, status : LikeStatus) {
    var texpected = getTypeName(expected);
    var tvalue = getTypeName(value);
    var isanonym = texpected == 'Object';

    if(texpected != tvalue) {
      status.error = "expected type " + texpected + " but it is " + tvalue + (status.path == '' ? '' : ' for field ' + status.path);
      return false;
    }
    switch(Type.typeof(expected))
    {
      case TNull, TInt, TFloat, TBool:
        if(expected != value) {
          status.error = "expected " + expected + " but it is " + value + (status.path == '' ? '' : ' for field '+status.path);
          return false;
        }
        return true;
      case TFunction:
        if (!Reflect.compareMethods(expected, value))
        {
          status.error = "expected same function reference" + (status.path == '' ? '' : ' for field '+status.path);
          return false;
        }
        return true;
      case TClass(c):
        var cexpected = Type.getClassName(c);
        var cvalue = Type.getClassName(Type.getClass(value));
        if (cexpected != cvalue)
        {
          status.error = "expected instance of " + cexpected + " but it is " + cvalue + (status.path == '' ? '' : ' for field '+status.path);
          return false;
        }
        
        // arrays
        if(Std.is(expected, Array)) {
          if(status.recursive || status.path == '') {
            if(expected.length != value.length) {
              status.error = "expected "+expected.length+" elements but they were "+value.length + (status.path == '' ? '' : ' for field '+status.path);
              return false;
            }
            var path = status.path;
            for(i in 0...expected.length) {
              status.path = path == '' ? 'array['+i+']' : path + '['+i+']';
              if (!sameAs(expected[i], value[i], status))
              {
                status.error = "expected " + q(expected) + " but it is " + q(value) + (status.path == '' ? '' : ' for field '+status.path);
                return false;
              }
            }
          }
          return true;
        }

        // date
        if(Std.is(expected, Date)) {
          if(expected.getTime() != value.getTime()) {
            status.error = "expected " + q(expected) + " but it is " + q(value) + (status.path == '' ? '' : ' for field '+status.path);
            return false;
          }
          return true;
        }
        
        // bytes
        if(Std.is(expected, Bytes)) {
          if(status.recursive || status.path == '') {
            var ebytes : Bytes = expected;
            var vbytes : Bytes = value;
            if (ebytes.length != vbytes.length) return false;
            for (i in 0...ebytes.length)
              if (ebytes.get(i) != vbytes.get(i))
              {
                status.error = "expected byte " + ebytes.get(i) + " but wss " + ebytes.get(i) + (status.path == '' ? '' : ' for field '+status.path);
                return false;
              }
          }
          return true;
        }

        // hash, inthash
        if(Std.is(expected, Hash) || Std.is(expected, IntHash)) {
          if(status.recursive || status.path == '') {
            var keys  = Lambda.array({ iterator : function() return expected.keys() });
            var vkeys = Lambda.array({ iterator : function() return value.keys() });
            if(keys.length != vkeys.length) {
              status.error = "expected "+keys.length+" keys but they were "+vkeys.length + (status.path == '' ? '' : ' for field '+status.path);
              return false;
            }
            var path = status.path;
            for(key in keys) {
              status.path = path == '' ? 'hash['+key+']' : path + '['+key+']';
              if (!sameAs(expected.get(key), value.get(key), status))
              {
                status.error = "expected " + q(expected) + " but it is " + q(value) + (status.path == '' ? '' : ' for field '+status.path);
                return false;
              }
            }
          }
          return true;
        }
        
        // iterator
        if(isIterator(expected, false)) {
          if(status.recursive || status.path == '') {
            var evalues = Lambda.array({ iterator : function() return expected });
            var vvalues = Lambda.array({ iterator : function() return value });
            if(evalues.length != vvalues.length) {
              status.error = "expected "+evalues.length+" values in Iterator but they were "+vvalues.length + (status.path == '' ? '' : ' for field '+status.path);
              return false;
            }
            var path = status.path;
            for(i in 0...evalues.length) {
              status.path = path == '' ? 'iterator['+i+']' : path + '['+i+']';
              if (!sameAs(evalues[i], vvalues[i], status))
              {
                status.error = "expected " + q(expected) + " but it is " + q(value) + (status.path == '' ? '' : ' for field '+status.path);
                return false;
              }
            }
          }
          return true;
        }

        // iterable
        if(isIterable(expected, false)) {
          if(status.recursive || status.path == '') {
            var evalues = Lambda.array(expected);
            var vvalues = Lambda.array(value);
            if(evalues.length != vvalues.length) {
              status.error = "expected "+evalues.length+" values in Iterable but they were "+vvalues.length + (status.path == '' ? '' : ' for field '+status.path);
              return false;
            }
            var path = status.path;
            for(i in 0...evalues.length) {
              status.path = path == '' ? 'iterable['+i+']' : path + '['+i+']';
              if(!sameAs(evalues[i], vvalues[i], status))
                return false;
            }
          }
          return true;
        }
        
        if(status.recursive || status.path == '') {
          var fields = Type.getInstanceFields(Type.getClass(expected));
          var path = status.path;
          for(field in fields) {
            status.path = path == '' ? field : path+'.'+field;
            var e = Reflect.field(expected, field);
            if(Reflect.isFunction(e)) continue;
            var v = Reflect.field(value, field);
            if(!sameAs(e, v, status))
              return false;
          }
        }
        
        return true;
      case TEnum(e) :
        var eexpected = Type.getEnumName(e);
        var evalue = Type.getEnumName(Type.getEnum(value));
        if (eexpected != evalue)
        {
          status.error = "expected enumeration of " + eexpected + " but it is " + evalue + (status.path == '' ? '' : ' for field '+status.path);
          return false;
        }
        
        if(status.recursive || status.path == '') {
          if(Type.enumIndex(expected) != Type.enumIndex(value)) {
            status.error = 'expected ' + q(Type.enumConstructor(expected)) + ' but is ' + q(Type.enumConstructor(value)) + (status.path == '' ? '' : ' for field '+status.path);
            return false;
          }
          var eparams = Type.enumParameters(expected);
          var vparams = Type.enumParameters(value);
          var path = status.path;
          for(i in 0...eparams.length) {
            status.path = path == '' ? 'enum['+i+']' : path + '['+i+']';
            if (!sameAs(eparams[i], vparams[i], status)) {
              status.error = "expected " + q(expected) + " but it is " + q(value) + (status.path == '' ? '' : ' for field '+status.path);
              return false;
            }
          }
        }
        return true;
      case TObject  :
        if(status.recursive || status.path == '') {
          var fields = Reflect.fields(expected);
          var path = status.path;
          for(field in fields) {
            status.path = path == '' ? field : path+'.'+field;
            if(!Reflect.hasField(value, field)) {
              status.error = "expected field " + status.path + " does not exist in " + value;
              return false;
            }
            var e = Reflect.field(expected, field);
            if(Reflect.isFunction(e)) continue;
            var v = Reflect.field(value, field);
            if(!sameAs(e, v, status))
              return false;
          }
        }
        
        // iterator
        if(isIterator(expected, true)) {
          if(!(isIterator(value, true))) {
            status.error = "expected Iterable but it is not " + (status.path == '' ? '' : ' for field '+status.path);
            return false;
          }
          if(status.recursive || status.path == '') {
            var evalues = Lambda.array({ iterator : function() return expected });
            var vvalues = Lambda.array({ iterator : function() return value });
            if(evalues.length != vvalues.length) {
              status.error = "expected "+evalues.length+" values in Iterator but they were "+vvalues.length + (status.path == '' ? '' : ' for field '+status.path);
              return false;
            }
            var path = status.path;
            for(i in 0...evalues.length) {
              status.path = path == '' ? 'iterator['+i+']' : path + '['+i+']';
              if (!sameAs(evalues[i], vvalues[i], status))
              {
                status.error = "expected " + q(expected) + " but it is " + q(value) + (status.path == '' ? '' : ' for field '+status.path);
                return false;
              }
            }
          }
          return true;
        }

        // iterable
        if(isIterable(expected, true)) {
          if(!(isIterable(value, true))) {
            status.error = "expected Iterator but it is not " + (status.path == '' ? '' : ' for field '+status.path);
            return false;
          }
          if(status.recursive || status.path == '') {
            var evalues = Lambda.array(expected);
            var vvalues = Lambda.array(value);
            if(evalues.length != vvalues.length) {
              status.error = "expected "+evalues.length+" values in Iterable but they were "+vvalues.length + (status.path == '' ? '' : ' for field '+status.path);
              return false;
            }
            var path = status.path;
            for(i in 0...evalues.length) {
              status.path = path == '' ? 'iterable['+i+']' : path + '['+i+']';
              if(!sameAs(evalues[i], vvalues[i], status))
                return false;
            }
          }
          return true;
        }
        return true;
      case TUnknown :
        return throw "Unable to compare  two unknown types";
    }
    return throw "Unable to compare values: " + q(expected) + " and " + q(value);
  }
  
  static function q(v : Dynamic)
  {
    if (null == v)
      return "null";
    else if (Std.is(v, String))
      return '"' + StringTools.replace(v, '"', '\\"') + '"';
    else
      return "" + v;
  }

  /**
  * Check that value is an object with the same fields and values found in expected.
  * The default behavior is to check nested objects in fields recursively.
  * <pre>
  * Assert.same({ name : "utest"}, ob);
  * </pre>
  * @param expected: The expected value to check against
  * @param value: The value to test
  * @param recursive: States whether or not the test will apply also to sub-objects.
  * Defaults to true
  * @param msg: An optional error message. If not passed a default one will be used
  * @param pos: Code position where the Assert call has been executed. Don't fill it
  * unless you know what you are doing.
  */
  public static function looksLike(expected : Dynamic, value : Dynamic, ?recursive : Bool, ?msg : String, ?pos : PosInfos) {
    if (null == recursive)
      recursive = true;
    var status = { recursive : recursive, path : '', error : null };
    if(sameAs(expected, value, status)) {
      Assert.isTrue(true, msg, pos);
    } else {
      Assert.fail(msg == null ? status.error : msg, pos);
    }
  }

  /**
  * It is used to test an application that under certain circumstances must
  * react throwing an error. This assert guarantees that the error is of the
  * correct type (or Dynamic if non is specified).
  * <pre>
  * Assert.throwsException(function() { throw "Error!"; }, String);
  * </pre>
  * @param method: A method that generates the exception.
  * @param type: The type of the expected error. Defaults to Dynamic (catch all).
  * @param msg: An optional error message. If not passed a default one will be used
  * @param pos: Code position where the Assert call has been executed. Don't fill it
  * unless you know what you are doing.
  * @todo test the optional type parameter
  */
  public static function throwsException(method:Void -> Void, ?type:Class<Dynamic>, ?msg : String , ?pos : PosInfos) {
    if(type == null)
      type = String;
    try {
      method();
      var name = Type.getClassName(type);
      if (name == null) name = ""+type;
      fail("exception of type " + name + " not raised", pos);
    } catch (ex : Dynamic) {
      var name = Type.getClassName(type);
      if (name == null) name = ""+type;
      isTrue(Std.is(ex, type), "expected throw of type " + name + " but was "  + ex, pos);
    }
  }
  /**
  * Checks that the test value matches at least one of the possibilities.
  * @param possibility: An array of mossible matches
  * @param value: The value to test
  * @param msg: An optional error message. If not passed a default one will be used
  * @param pos: Code position where the Assert call has been executed. Don't fill it
  * unless you know what you are doing.
  */
  public static function equalsOneOf<T>(value : T, possibilities : Array<T>, ?msg : String , ?pos : PosInfos) {
    if(Lambda.has(possibilities, value)) {
      isTrue(true, msg, pos);
    } else {
      fail(msg == null ? "value " + q(value) + " not found in the expected possibilities " + possibilities : msg, pos);
    }
  }
  /**
  * Checks that the test array contains the match parameter.
  * @param match: The element that must be included in the tested array
  * @param values: The values to test
  * @param msg: An optional error message. If not passed a default one will be used
  * @param pos: Code position where the Assert call has been executed. Don't fill it
  * unless you know what you are doing.
  */
  public static function contains<T>(values : Iterable<T>, match : T, ?msg : String , ?pos : PosInfos) {
    if(Lambda.has(values, match)) {
      isTrue(true, msg, pos);
    } else {
      fail(msg == null ? "values " + values + " do not contain "+match: msg, pos);
    }
  }
  
  /**
  * Checks that the test array does not contain the match parameter.
  * @param match: The element that must NOT be included in the tested array
  * @param values: The values to test
  * @param msg: An optional error message. If not passed a default one will be used
  * @param pos: Code position where the Assert call has been executed. Don't fill it
  * unless you know what you are doing.
  */
  public static function notContains<T>(values : Iterable<T>, match : T, ?msg : String , ?pos : PosInfos) {
    if(!Lambda.has(values, match)) {
      isTrue(true, msg, pos);
    } else {
      fail(msg == null ? "values " + values + " do contain "+match: msg, pos);
    }
  }
  
  /**
   * Checks that the expected values is contained in value.
   * @param match: the string value that must be contained in value
   * @param value: the value to test
   * @param msg: An optional error message. If not passed a default one will be used
  * @param pos: Code position where the Assert call has been executed. Don't fill it
   */
  public static function stringContains(match : String, value : String, ?msg : String , ?pos : PosInfos) {
    if (value != null && value.indexOf(match) >= 0) {
      isTrue(true, msg, pos);
    } else {
      fail(msg == null ? "value " + q(value) + " does not contain " + q(match) : msg, pos);
    }
  }
  
  public static function stringSequence(sequence : Array<String>, value : String, ?msg : String , ?pos : PosInfos) {
    if (null == value)
    {
      fail(msg == null ? "null argument value" : msg, pos);
      return;
    }
    var p = 0;
    for (s in sequence)
    {
      var p2 = value.indexOf(s, p);
      if (p2 < 0)
      {
        if (msg == null)
        {
          msg = "expected '" + s + "' after ";
          if (p > 0)
          {
            var cut = value.substr(0, p);
            if (cut.length > 30)
              cut = '...' + cut.substr( -27);
            msg += " '" + cut + "'" ;
          } else
            msg += " begin";
        }
        fail(msg, pos);
        return;
      }
      p = p2 + s.length;
    }
    isTrue(true, msg, pos);
  }
  
  /**
  * Forces a failure.
  * @param msg: An optional error message. If not passed a default one will be used
  * @param pos: Code position where the Assert call has been executed. Don't fill it
  * unless you know what you are doing.
  */
  public static function fail(msg = "failure expected", ?pos : PosInfos) {
    isTrue(false, msg, pos);
  }
  /**
  * Creates a warning message.
  * @param msg: A mandatory message that justifies the warning.
  * @param pos: Code position where the Assert call has been executed. Don't fill it
  * unless you know what you are doing.
  */
  public static function warn(msg) {
    results.add(Warning(msg));
  }

  /**
  * Creates an asynchronous context for test execution. Assertions should be included
  * in the passed function.
  * <pre>
  * public function assertAsync() {
  *   var async = Assert.createAsync(function() Assert.isTrue(true));
  *   haxe.Timer.delay(async, 50);
  * }
  * @param f: A function that contains other Assert tests
  * @param timeout: Optional timeout value in milliseconds.
  */
  public static dynamic function createAsync(f : Void->Void, ?timeout : Int) {
    return function(){};
  }
  
  
  /** Asserts the future is delivered within the specified time frame. All 
   * assertions relating to the deliverable should be contained within the 
   * passed in function.
   */
  public static function delivered<T>(future: Future<T>, assertions: T -> Void, ?timeout: Int) {
    var f = createAsync(function() {
      if (future.isCanceled()) {
        fail('expected delivery of future ' + q(future) + ', but it was canceled');
      }
      else {
        assertions(future.value().get());
      }
    }, timeout);
    
    future.deliverTo(function(value) { f(); });
    
    future.ifCanceled(f);
  }
  
  /** Asserts the future is canceled within the specified time frame. All 
   * assertions should be contained within the passed in function.
   */
  public static function canceled<T>(future: Future<T>, assertions: Void -> Void, ?timeout: Int) {
    future.ifCanceled(createAsync(assertions, timeout));
  }
  
  /** Asserts the future is not delivered within the specified time frame.
   */
  public static function notDelivered<T>(future: Future<T>, ?timeout: Int, ?pos: PosInfos) {
    var f = createAsync(function() {
      if (future.isDelivered()) {
        Assert.fail('Did not expect delivery of: ' + future.value().get(), pos);
      }
      else {
        Assert.isTrue(true);
      }
    }, timeout + 10);
#if (php || neko || cpp)
      f();
#else    
    haxe.Timer.delay(f, timeout);
#end    
    future.deliverTo(function(value) { f(); });
  }
  
  /*
  public static function produces<T>(stream: Stream<T>, assertions: Array<T> -> Void, ?timeout: Int) {
    
  }
  public static function doesNotProduce<T>(stream: Stream<T>, ?timeout: Int, ?pos: PosInfos) {
    
  }
  */
  
  /**
  * Creates an asynchronous context for test execution of an event like method.
  * Assertions should be included in the passed function.
  * It works the same way as Assert.assertAsync() but accepts a function with one
  * argument (usually some event data) instead of a function with no arguments
  * @param f: A function that contains other Assert tests
  * @param timeout: Optional timeout value in milliseconds.
  */
  public static dynamic function createEvent<EventArg>(f : EventArg->Void, ?timeout : Int) {
    return function(e:EventArg){};
  }
  
  static function typeToString(t : Dynamic)
  {
    try {
      var _t = Type.getClass(t);
      if (_t != null)
        t = _t;
    } catch(e : Dynamic) { }
    try return Type.getClassName(t) catch (e : Dynamic) { }
    try {
      var _t = Type.getEnum(t);
      if (_t != null)
        t = _t;
    } catch(e : Dynamic) { }
    try return Type.getEnumName(t) catch(e : Dynamic) {}
    try return Std.string(Type.typeof(t)) catch (e : Dynamic) { }
    try return Std.string(t) catch (e : Dynamic) { }
    return '<unable to retrieve type name>';
  }
}

private typedef LikeStatus = {
  recursive : Bool,
  path : String,
  error : String
};