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
import Tuples;
import haxe.test.TestCase;
import haxe.text.json.JValue;
import haxe.data.collections.Set;
import haxe.data.collections.Map;
import haxe.data.collections.List;
import haxe.data.transcode.TranscodeJValue;
import haxe.data.transcode.TranscodeJValueExtensions;

import PreludeExtensions;
using PreludeExtensions;
using haxe.data.transcode.TranscodeJValueExtensions;
using haxe.text.json.JValueExtensions;

class JValueTestCase extends TestCase {
  public function testBool() {
    doTest(BoolExtensions.decompose, function(v){return BoolExtensions.extract(Bool, v);}, [true, false]);
  }

  public function testInt() {
    doTest(IntExtensions.decompose, function(v){return IntExtensions.extract(Int, v);}, [-1234, 9231]);
  }

  public function testFloat() {
    doTest(FloatExtensions.decompose, function(v){return FloatExtensions.extract(Float, v);}, [0.25, 0.5]);
  }

  public function testString() {
    doTest(StringExtensions.decompose, function(v){return StringExtensions.extract(String, v);}, ["boo", "baz"]);
  }

  public function testDate() {
    doTest(DateExtensions.decompose, function(v){return DateExtensions.extract(Date, v);}, [Date.now(), Date.fromTime(0.0)]);
  }

  public function testOption() {
    var a: Array<Option<Int>> = [Some(123), None];

    doTest(OptionExtensions.decompose, function(v){return OptionExtensions.extract(Option, v, function(v){return IntExtensions.extract(Int, v);});}, a);
  }

  public function testTuple2() {
    var a = [Tuple2.create(123, "foo"), Tuple2.create(0, "bar")];

    doTest(instanceDecompose,
          function(v){return Tuple2.extract(v, function(v){return IntExtensions.extract(Int, v);}, function(v){return StringExtensions.extract(String, v);});},
          a);
  }

  public function testTuple3() {
    var a = [Tuple3.create(123, "foo", true), Tuple3.create(0, "bar", false)];

    doTest(instanceDecompose,
          function(v){return Tuple3.extract(v, function(v){return IntExtensions.extract(Int, v);}, function(v){return StringExtensions.extract(String, v);}, function(v){return BoolExtensions.extract(Bool, v);});},
          a);

  }

  public function testTuple4() {
    var a = [Tuple4.create(123, "foo", true, 0.25), Tuple4.create(0, "bar", false, 0.5)];

    doTest(instanceDecompose,
          function(v){return Tuple4.extract(v, function(v){return IntExtensions.extract(Int, v);}, function(v){return StringExtensions.extract(String, v);}, function(v){return BoolExtensions.extract(Bool, v);}, function(v){return FloatExtensions.extract(Float, v);});},
          a);
  }

  public function testTuple5() {
    var a = [Tuple5.create(123, "foo", true, 0.25, "biz"), Tuple5.create(0, "bar", false, 0.5, "bop")];

    doTest(instanceDecompose,
          function(v){return Tuple5.extract(v, function(v){return IntExtensions.extract(Int, v);}, function(v){return StringExtensions.extract(String, v);}, function(v){return BoolExtensions.extract(Bool, v);}, function(v){return FloatExtensions.extract(Float, v);}, function(v){return StringExtensions.extract(String, v);});},
          a);
  }

  public function testArray() {
    var a: Array<Array<Int>> = [[123, 9, -23], []];

    doTest(ArrayExtensions.decompose, function(v){return ArrayExtensions.extract(Array, v, function(v){return IntExtensions.extract(Int, v);});}, a);
  }

  public function testSet() {
    var a: Array<Set<Int>> = [Set.create().addAll([123, 9, -23]), Set.create()];

    doTest(instanceDecompose, function(v){return Set.extract(v, function(v){return IntExtensions.extract(Int, v);});}, a);
  }

  public function testList() {
    var a: Array<List<Int>> = [List.create().addAll([123, 9, -23]), List.create()];

    doTest(instanceDecompose, function(v){return List.extract(v, function(v){return IntExtensions.extract(Int, v);});}, a);
  }

  public function testMap() {
    var a: Array<Map<Int, String>> = [Map.create().addAll([Tuple2.create(123, "foo"), Tuple2.create(-23, "bar"), Tuple2.create(0, "baz")]), Map.create()];

    doTest(instanceDecompose,
           function(v){return Map.extract(v, function(v){return IntExtensions.extract(Int, v);}, function(v){return StringExtensions.extract(String, v);});}, a);
  }

  public function testJValue() {
    doTest(JValueExtensions.decompose,
        function(v){return JValueExtensions.extract(JValue, v);},
        [JNull, JString("foo"), JNumber(123.0), JBool(false), JObject([JField("foo", JString("bar"))]), JArray([JNull, JString("baz")])]);
  }

  private function instanceDecompose(v: Dynamic): JValue{
    return cast Reflect.callMethod(v, Reflect.field(v, "decompose"), []);
  }

  private function doTest<T>(decomposer: JDecomposerFunction<T>, extractor: JExtractorFunction<T>, values: Array<T>): Void {
    var eq = Stax.getEqualFor(values[0]);
    for (value in values) {
      var actual = extractor(decomposer(value));

      var equal = eq(value, actual);

      if (!equal) {
        throw "Expected " + value + " but was " + actual;
      }

      assertTrue(equal);
    }
  }
}