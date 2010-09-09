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

import haxe.test.TestCase;
import haxe.text.json.JValue;
import haxe.data.collections.Set;
import haxe.data.collections.Map;
import haxe.data.collections.List;
import haxe.data.transcode.TranscodeJValue;

import PreludeExtensions; 
using PreludeExtensions;
using haxe.data.transcode.TranscodeJValueExtensions;
using haxe.text.json.JValueExtensions;

class JValueTestCase extends TestCase {
  public function testBool() {
    doTest(Bool.DecomposerF(), Bool.ExtractorF(), [true, false]);
  }

  public function testInt() {
    doTest(Int.DecomposerF(), Int.ExtractorF(), [-1234, 9231]);
  }

  public function testFloat() {
    doTest(Float.DecomposerF(), Float.ExtractorF(), [0.25, 0.5]);
  }

  public function testString() {
    doTest(String.DecomposerF(), String.ExtractorF(), ["boo", "baz"]);
  }

  public function testDate() {
    doTest(Date.DecomposerF(), Date.ExtractorF(), [Date.now(), Date.fromTime(0.0)]);
  }

  public function testOption() {
    var a: Array<Option<Int>> = [Some(123), None];

    doTest(Option.DecomposerF(Int.DecomposerF()), Option.ExtractorF(Int.ExtractorF()), a);
  }

  public function testTuple2() {
    var a = [Tuple2.create(123, "foo"), Tuple2.create(0, "bar")];

    doTest(Tuple2.DecomposerF(Int.DecomposerF(), String.DecomposerF()),
           Tuple2.ExtractorF(Int.ExtractorF(), String.ExtractorF()), a);
  }

  public function testTuple3() {
    var a = [Tuple3.create(123, "foo", true), Tuple3.create(0, "bar", false)];

    doTest(Tuple3.DecomposerF(Int.DecomposerF(), String.DecomposerF(), Bool.DecomposerF()),
           Tuple3.ExtractorF(Int.ExtractorF(), String.ExtractorF(), Bool.ExtractorF()), a);
  }

  public function testTuple4() {
    var a = [Tuple4.create(123, "foo", true, 0.25), Tuple4.create(0, "bar", false, 0.5)];

    doTest(Tuple4.DecomposerF(Int.DecomposerF(), String.DecomposerF(), Bool.DecomposerF(), Float.DecomposerF()),
           Tuple4.ExtractorF(Int.ExtractorF(), String.ExtractorF(), Bool.ExtractorF(), Float.ExtractorF()), a);
  }

  public function testTuple5() {
    var a = [Tuple5.create(123, "foo", true, 0.25, "biz"), Tuple5.create(0, "bar", false, 0.5, "bop")];

    doTest(Tuple5.DecomposerF(Int.DecomposerF(), String.DecomposerF(), Bool.DecomposerF(), Float.DecomposerF(), String.DecomposerF()),
           Tuple5.ExtractorF(Int.ExtractorF(), String.ExtractorF(), Bool.ExtractorF(), Float.ExtractorF(), String.ExtractorF()), a);
  }

  public function testArray() {
    var a: Array<Array<Int>> = [[123, 9, -23], []];

    doTest(Array.DecomposerF(Int.DecomposerF()), Array.ExtractorF(Int.ExtractorF()), a);
  }

  public function testSet() {
    var newSet = Set.factory(IntExtensions.equals, IntExtensions.hashCode);

    var a: Array<Set<Int>> = [newSet().addAll([123, 9, -23]), newSet()];

    doTest(Set.DecomposerF(Int.DecomposerF()),
           Set.ExtractorF(Int.ExtractorF(), IntExtensions.hashCode, IntExtensions.equals), a);
  }

  public function testList() {
    var newList = List.factory(IntExtensions.equals);

    var a: Array<List<Int>> = [newList().addAll([123, 9, -23]), newList()];

    doTest(List.DecomposerF(Int.DecomposerF()),
           List.ExtractorF(Int.ExtractorF(), IntExtensions.equals), a);
  }

  public function testMap() {
    var newMap = Map.factory(IntExtensions.equals, IntExtensions.hashCode, StringExtensions.equals, StringExtensions.hashCode);

    var a: Array<Map<Int, String>> = [newMap().addAll([Tuple2.create(123, "foo"), Tuple2.create(-23, "bar"), Tuple2.create(0, "baz")]), newMap()];

    doTest(Map.DecomposerF(Int.DecomposerF(), String.DecomposerF()),
           Map.ExtractorF(Int.ExtractorF(), String.ExtractorF(), IntExtensions.hashCode, IntExtensions.equals, StringExtensions.hashCode, StringExtensions.equals), a);
  }

  public function testJValue() {
    doTest(
      JValue.DecomposerF(),
      JValue.ExtractorF(),
    [JNull, JString("foo"), JNumber(123.0), JBool(false), JObject([JField("foo", JString("bar"))]), JArray([JNull, JString("baz")])]);
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