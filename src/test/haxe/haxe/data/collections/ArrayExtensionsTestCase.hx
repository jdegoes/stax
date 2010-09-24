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
package haxe.data.collections;

import Prelude;

import haxe.test.TestCase;
using haxe.data.collections.ArrayExtensions;

import PreludeExtensions;  
using PreludeExtensions;

class ArrayExtensionsTestCase extends TestCase {
  public function testPartition() {
    var t = [1,2,3,4,5,6].partition(function(v) return v % 2 != 0);  
    assertEquals(Tuple2.create([1,3,5], [2,4,6]), t);
  }
  
  public function testPartitionWhile() {
    var t = [1,2,3,4,5,6].partitionWhile(function(v) return v < 4);
    assertEquals(Tuple2.create([1,2,3], [4,5,6]), t);
  } 
  
  public function testMapTo() { 
    var r = [2, 3].mapTo(["1"], function(v : Int) return "" + v);
    assertEquals(["1","2","3"], r);
  }
  
  public function testFlatMapTo() {
    var r = ["2","3,4,5","6,7"].flatMapTo([1], function(v) {
      return v.split(",").map(function(i) return Std.parseInt(i));
    });
    assertEquals([1,2,3,4,5,6,7], r);                 
  }
  
  public function testCount() {
    assertEquals(3, [1,2,3,4,5].count(function(v) return v % 2 != 0));
  }
  
  public function testCountWhile() {
    assertEquals(2, [1,2,3,4,5].count(function(v) return v < 3));
  }
  
  public function testScanl() {
    var r = [1,2,3,4,5].scanl(1, function(a, b) return a + b);
    assertEquals([1,2,3,4,5,6], r);
  }
  
  public function testScanr() {
    var r = [1,2,3,4,5].scanr(1, function(a, b) return a + b);
    assertEquals([1,6,5,4,3,2], r);

  }
  
  public function testScanl1() {
    var r = [1,2,3,4,5].scanl1(function(a, b) return a + b);
    assertEquals([1,3,4,5,6], r);
  }
  
  public function testScanr1() {
    var r = [1,2,3,4,5].scanr1(function(a, b) return a + b);
    assertEquals([5,9,8,7,6], r);
  }
  
  public function testAppendAll() {
    assertEquals([1,2,3], [1].appendAll([2,3]));
  }
  
  public function testIsEmpty() {
    assertTrue([].isEmpty());
    assertFalse([1].isEmpty());
  }
  
  public function testFind() {
    assertEquals(None, [1,2,3].find(function(v) return v == 4));
    assertEquals(Some(2), [1,2,3].find(function(v) return v == 2));
  }
  
  public function testForAll() {
    assertTrue([1,2,3].forAll(function(v) return v < 4));
    assertFalse([1,2,3].forAll(function(v) return v < 2));
  }
  
  public function testForAny() {
    assertFalse([1,2,3].forAny(function(v) return v > 3));
    assertTrue([1,2,3].forAny(function(v) return v < 2));
  } 
  
  public function testExists() {
    assertFalse([1,2,3].exists(function(v) return v == 4));
    assertTrue([1,2,3].exists(function(v) return v == 2));
  }
  
  public function testExistsP() {
    var f = function(v, ref) return v == ref;
    assertFalse([1,2,3].existsP(4, f));
    assertTrue([1,2,3].existsP(2, f));
  }
  
  public function testNubBy() {
    assertEquals([1,2,3], [1,2,2,3,1].nub());
  }                        
  
  public function testNub() {
    assertEquals([1,2,3], [1,2,2,3,1].nubBy(function(a,b) return a == b));
  }
  
  public function testIntersectBy() {
    assertEquals([2,3], [1,2,3].intersectBy([2,3,4,5], function(a,b) return a == b));
  }
  
  public function testIntersect() {
    assertEquals([2,3], [1,2,3].intersect([2,3,4,5]));  
  }
  
  public function testMkString() {
    assertEquals("A-B-C", ["a","b","c"].mkString("-", function(s) return s.toUpperCase()));
  }
  
  public function testToMap() {
    var map = [Tuple2.create("a", 1), Tuple2.create("b", 2)].toMap();
    assertIs(map, haxe.data.collections.Map);
    assertEquals(2, map.size());
  }
  
  public function testToList() {
    var list = [1,2,3].toList();
    assertIs(list, haxe.data.collections.List);
    assertEquals(3, list.size());
  }
  
  public function testToSet() {
    var set = [1,2,2,3,1].toSet();
    assertIs(set, haxe.data.collections.Set);
    assertEquals(3, set.size());
  }
}