/*
 HaXe JSON library written by Spencer Tipping <spencer@socialmedia.com>
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

package haxe.text.json;

import haxe.unit.TestCase;
import haxe.unit.TestRunner;

import haxe.text.json.JValue;
import haxe.text.json.Json;
import haxe.text.json.JsonGenerator;

using haxe.text.json.JValueBehavior;

class JsonBenchmarkCase extends TestCase {
  public static function timed<T> (name: String, f: T -> Void): T -> Float {
    return function (x: T) {
      var start = Date.now ().getTime ();
      f (x);
      return Date.now ().getTime () - start;
    };
  }

  public static function linear    (x: Int): Float {return x;}
  public static function nLogN     (x: Int): Float {return x * Math.log (x);}
  public static function quadratic (x: Int): Float {return x * x;}

  public function assertComplexity (growth: Int -> Float, ?s1: Int = 100, ?s2: Int = 1000, f: Int -> Float): Void {
    var r1 = f (s1) / growth (s1);
    var r2 = f (s2) / growth (s2);

    // Within 10% of whatever complexity we're shooting for is OK.
    if (r2 / r1 > 1.1) throw "Algorithmic complexity check failed; expected at most " + r1 * 110.0 + "% but got " + r2 * 100.0 + "% instead";
    else               assertTrue (true);       // Just to satisfy the test library
  }

  public static function shallowArrayDecode (n: Int): Float {
    var array = "[";
    for (i in 1 ... n) array += i + ",";
    array += "0]";
    return timed ("shallow array decode", function (s) {Json.decode (s);}) (array);
  }

  public static function deepArrayDecode (n: Int): Float {
    var array = "";
    for (i in 1 ... n) array = "[" + array + "]";
    return timed ("deep array decode", function (s) {Json.decode (s);}) (array);
  }

  public static function shallowObjectDecode (n: Int): Float {
    var object = "{";
    for (i in 1 ... n) object += "\"" + i + "\":" + i + ",";
    object += "\"0\":0}";
    return timed ("shallow object decode", function (s) {Json.decode (s);}) (object);
  }

  public static function deepObjectDecode (n: Int): Float {
    var object = "{}";
    for (i in 1 ... n) object = "{\"" + i + "\":" + object + "}";
    return timed ("deep object decode", function (s) {Json.decode (s);}) (object);
  }

  public static function stringDecode (n: Int): Float {
    var s = Json.encode (JsonGenerator.generateString (n));
    return timed ("string decode", function (s) {Json.decode (s);}) (s);
  }

  public function testShallowArrayDecodeTimings (): Void {
    assertComplexity (linear, 1000, 10000, shallowArrayDecode);
  }

  public function testDeepArrayDecodeTimings (): Void {
    assertComplexity (linear, 1000, 10000, deepArrayDecode);
  }

  public function testShallowObjectDecodeTimings (): Void {
    assertComplexity (linear, 1000, 10000, shallowObjectDecode);
  }

  public function testDeepObjectDecodeTimings (): Void {
    assertComplexity (linear, 1000, 10000, deepObjectDecode);
  }

  public function testStringDecodeTimings (): Void {
    assertComplexity (linear, 1000, 10000, stringDecode);
  }
}

class JsonBenchmark {
  public static function main (): Void {
    var r = new TestRunner ();
    r.add (new JsonBenchmarkCase ());
    r.run ();
  }
}
