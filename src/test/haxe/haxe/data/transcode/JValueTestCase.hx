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

using PreludeExtensions;
using haxe.data.transcode.TranscodeJValueExtensions;
using haxe.text.json.JValueExtensions;

class JValueTestCase extends TestCase {
    public function testBool() {
      doTest(Bool.DecomposerT(), Bool.ExtractorT(), [true, false], Bool.EqualF());
    }
    
    public function testInt() {
      doTest(Int.DecomposerT(), Int.ExtractorT(), [-1234, 9231], Int.EqualF());
    }
    
    public function testFloat() {
      doTest(Float.DecomposerT(), Float.ExtractorT(), [0.25, 0.5], Float.EqualF());
    }
    
    public function testString() {
      doTest(String.DecomposerT(), String.ExtractorT(), ["boo", "baz"], String.EqualF());
    }
    
    public function testDate() {
      doTest(Date.DecomposerT(), Date.ExtractorT(), [Date.now(), Date.fromTime(0.0)], Date.EqualF());
    }
    
    public function testOption() {
      var a: Array<Option<Int>> = [Some(123), None];
      
      doTest(Option.DecomposerT(Int.DecomposerT()), Option.ExtractorT(Int.ExtractorT()), a);
    }
    
    public function testTuple2() {
      var a = [Tuple2.create(123, "foo"), Tuple2.create(0, "bar")];
      
      doTest(Tuple2.DecomposerT(Int.DecomposerT(), String.DecomposerT()), 
             Tuple2.ExtractorT(Int.ExtractorT(), String.ExtractorT()), a, 
             Tuple2.EqualF(Int.EqualF(), String.EqualF()));
    }
    
    public function testTuple3() {
      var a = [Tuple3.create(123, "foo", true), Tuple3.create(0, "bar", false)];
      
      doTest(Tuple3.DecomposerT(Int.DecomposerT(), String.DecomposerT(), Bool.DecomposerT()), 
             Tuple3.ExtractorT(Int.ExtractorT(), String.ExtractorT(), Bool.ExtractorT()), a, 
             Tuple3.EqualF(Int.EqualF(), String.EqualF(), Bool.EqualF()));
    }
    
    public function testTuple4() {
      var a = [Tuple4.create(123, "foo", true, 0.25), Tuple4.create(0, "bar", false, 0.5)];
      
      doTest(Tuple4.DecomposerT(Int.DecomposerT(), String.DecomposerT(), Bool.DecomposerT(), Float.DecomposerT()), 
             Tuple4.ExtractorT(Int.ExtractorT(), String.ExtractorT(), Bool.ExtractorT(), Float.ExtractorT()), a, 
             Tuple4.EqualF(Int.EqualF(), String.EqualF(), Bool.EqualF(), Float.EqualF()));
    }
    
    public function testTuple5() {
      var a = [Tuple5.create(123, "foo", true, 0.25, "biz"), Tuple5.create(0, "bar", false, 0.5, "bop")];
      
      doTest(Tuple5.DecomposerT(Int.DecomposerT(), String.DecomposerT(), Bool.DecomposerT(), Float.DecomposerT(), String.DecomposerT()), 
             Tuple5.ExtractorT(Int.ExtractorT(), String.ExtractorT(), Bool.ExtractorT(), Float.ExtractorT(), String.ExtractorT()), a, 
             Tuple5.EqualF(Int.EqualF(), String.EqualF(), Bool.EqualF(), Float.EqualF(), String.EqualF()));
    }
    
    public function testArray() {
      var a: Array<Array<Int>> = [[123, 9, -23], []];
      
      doTest(Array.DecomposerT(Int.DecomposerT()), Array.ExtractorT(Int.ExtractorT()), a, Array.EqualF(Int.EqualF()));
    }
    
    public function testSet() {
      var newSet = Set.factory(Int.HasherF(), Int.EqualF());
      
      var a: Array<Set<Int>> = [newSet().addAll([123, 9, -23]), newSet()];
      
      doTest(Set.DecomposerT(Int.DecomposerT()), 
             Set.ExtractorT(Int.ExtractorT(), Int.HasherF(), Int.EqualF()), a, 
             Set.EqualF(Int.EqualF()));
    }
    
    public function testList() {
      var newList = List.factory(Int.EqualF());
      
      var a: Array<List<Int>> = [newList().addAll([123, 9, -23]), newList()];
      
      doTest(List.DecomposerT(Int.DecomposerT()), 
             List.ExtractorT(Int.ExtractorT(), Int.EqualF()), a, 
             List.EqualF(Int.EqualF()));
    }
    
    public function testMap() {
      var newMap = Map.factory(Int.HasherF(), Int.EqualF(), String.HasherF(), String.EqualF());
      
      var a: Array<Map<Int, String>> = [newMap().addAll([Tuple2.create(123, "foo"), Tuple2.create(-23, "bar"), Tuple2.create(0, "baz")]), newMap()];
      
      doTest(Map.DecomposerT(Int.DecomposerT(), String.DecomposerT()), 
             Map.ExtractorT(Int.ExtractorT(), String.ExtractorT(), Int.HasherF(), Int.EqualF(), String.HasherF(), String.EqualF()), a, 
             Map.EqualF(Int.EqualF(), String.EqualF()));
    }
    
    public function testJValue() {
      doTest(
	    JValue.DecomposerT(), 
	    JValue.ExtractorT(), 
		[JNull, JString("foo"), JNumber(123.0), JBool(false), JObject([JField("foo", JString("bar"))]), JArray([JNull, JString("baz")])]);
    }

    private function doTest<T>(decomposer: JDecomposer<T>, extractor: JExtractor<T>, values: Array<T>, ?eq : EqualFunction<T>): Void {  
	  if(null == eq)
 	    eq = Stax.getEqualFor(values[0]);
      for (value in values) {
        var actual = extractor.extract(decomposer.decompose(value));
        
        var equal = eq(value, actual);
        
        if (!equal) {
          throw "Expected " + value + " but was " + actual;
        }
        
        assertTrue(equal);
      }
    }
}