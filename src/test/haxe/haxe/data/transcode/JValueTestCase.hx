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

using Prelude;
using haxe.data.transcode.TranscodeJValueExtensions;
using haxe.text.json.JValueExtensions;

class JValueTestCase extends TestCase {
    public function testBool() {
      doTest(Bool.DecomposerT(), Bool.ExtractorT(), [true, false], Bool.EqualT());
    }
    
    public function testInt() {
      doTest(Int.DecomposerT(), Int.ExtractorT(), [-1234, 9231], Int.EqualT());
    }
    
    public function testFloat() {
      doTest(Float.DecomposerT(), Float.ExtractorT(), [0.25, 0.5], Float.EqualT());
    }
    
    public function testString() {
      doTest(String.DecomposerT(), String.ExtractorT(), ["boo", "baz"], String.EqualT());
    }
    
    public function testDate() {
      doTest(Date.DecomposerT(), Date.ExtractorT(), [Date.now(), Date.fromTime(0.0)], Date.EqualT());
    }
    
    public function testOption() {
      var a: Array<Option<Int>> = [Some(123), None];
      
      doTest(Option.DecomposerT(Int.DecomposerT()), Option.ExtractorT(Int.ExtractorT()), a, Option.EqualT(Int.EqualT()));
    }
    
    public function testTuple2() {
      var a = [Tuple2.create(123, "foo"), Tuple2.create(0, "bar")];
      
      doTest(Tuple2.DecomposerT(Int.DecomposerT(), String.DecomposerT()), 
             Tuple2.ExtractorT(Int.ExtractorT(), String.ExtractorT()), a, 
             Tuple2.EqualT(Int.EqualT(), String.EqualT()));
    }
    
    public function testTuple3() {
      var a = [Tuple3.create(123, "foo", true), Tuple3.create(0, "bar", false)];
      
      doTest(Tuple3.DecomposerT(Int.DecomposerT(), String.DecomposerT(), Bool.DecomposerT()), 
             Tuple3.ExtractorT(Int.ExtractorT(), String.ExtractorT(), Bool.ExtractorT()), a, 
             Tuple3.EqualT(Int.EqualT(), String.EqualT(), Bool.EqualT()));
    }
    
    public function testTuple4() {
      var a = [Tuple4.create(123, "foo", true, 0.25), Tuple4.create(0, "bar", false, 0.5)];
      
      doTest(Tuple4.DecomposerT(Int.DecomposerT(), String.DecomposerT(), Bool.DecomposerT(), Float.DecomposerT()), 
             Tuple4.ExtractorT(Int.ExtractorT(), String.ExtractorT(), Bool.ExtractorT(), Float.ExtractorT()), a, 
             Tuple4.EqualT(Int.EqualT(), String.EqualT(), Bool.EqualT(), Float.EqualT()));
    }
    
    public function testTuple5() {
      var a = [Tuple5.create(123, "foo", true, 0.25, "biz"), Tuple5.create(0, "bar", false, 0.5, "bop")];
      
      doTest(Tuple5.DecomposerT(Int.DecomposerT(), String.DecomposerT(), Bool.DecomposerT(), Float.DecomposerT(), String.DecomposerT()), 
             Tuple5.ExtractorT(Int.ExtractorT(), String.ExtractorT(), Bool.ExtractorT(), Float.ExtractorT(), String.ExtractorT()), a, 
             Tuple5.EqualT(Int.EqualT(), String.EqualT(), Bool.EqualT(), Float.EqualT(), String.EqualT()));
    }
    
    public function testArray() {
      var a: Array<Array<Int>> = [[123, 9, -23], []];
      
      doTest(Array.DecomposerT(Int.DecomposerT()), Array.ExtractorT(Int.ExtractorT()), a, Array.EqualT(Int.EqualT()));
    }
    
    public function testSet() {
      var newSet = Set.factory(Int.HasherT(), Int.EqualT());
      
      var a: Array<Set<Int>> = [newSet().addAll([123, 9, -23]), newSet()];
      
      doTest(Set.DecomposerT(Int.DecomposerT()), 
             Set.ExtractorT(Int.ExtractorT(), Int.HasherT(), Int.EqualT()), a, 
             Set.EqualT(Int.EqualT()));
    }
    
    public function testList() {
      var newList = List.factory(Int.EqualT());
      
      var a: Array<List<Int>> = [newList().addAll([123, 9, -23]), newList()];
      
      doTest(List.DecomposerT(Int.DecomposerT()), 
             List.ExtractorT(Int.ExtractorT(), Int.EqualT()), a, 
             List.EqualT(Int.EqualT()));
    }
    
    public function testMap() {
      var newMap = Map.factory(Int.HasherT(), Int.EqualT(), String.HasherT(), String.EqualT());
      
      var a: Array<Map<Int, String>> = [newMap().addAll([Tuple2.create(123, "foo"), Tuple2.create(-23, "bar"), Tuple2.create(0, "baz")]), newMap()];
      
      doTest(Map.DecomposerT(Int.DecomposerT(), String.DecomposerT()), 
             Map.ExtractorT(Int.ExtractorT(), String.ExtractorT(), Int.HasherT(), Int.EqualT(), String.HasherT(), String.EqualT()), a, 
             Map.EqualT(Int.EqualT(), String.EqualT()));
    }
    
    public function testJValue() {
      doTest(JValue.DecomposerT(), JValue.ExtractorT(), [JNull, JString("foo"), JNumber(123.0), JBool(false), JObject([JField("foo", JString("bar"))]), JArray([JNull, JString("baz")])], JValue.EqualT());
    }
    
    private function doTest<T>(decomposer: JDecomposer<T>, extractor: JExtractor<T>, values: Array<T>, eq: Equal<T>): Void {
      for (value in values) {
        var actual = extractor.extract(decomposer.decompose(value));
        
        var equal = eq.equal(value, actual);
        
        if (!equal) {
          throw "Expected " + value + " but was " + actual;
        }
        
        assertTrue(equal);
      }
    }
}