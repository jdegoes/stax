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

import haxe.functional.Foldable;
import haxe.test.TestCase;
import haxe.data.collections.List;

import PreludeExtensions;  
using PreludeExtensions;
using haxe.functional.FoldableExtensions;

class ListTestCase extends TestCase {
  public function testSizeGrowsWhenAddingUniqueElements(): Void {
    var l = newList();
    
    for (i in 0...100) {
      assertEquals(i, l.size());
      
      l = l.add(i);
    }
    
    assertEquals(100, l.size());
  }
  
  public function testSizeGrowsWhenAddingDuplicateElements(): Void {
    var l = newList().add(0);
    
    for (i in 0...100) l = l.add(0);
    
    assertEquals(101, l.size());
  }
  
  public function testSizeShrinksWhenRemovingElements(): Void {
    var l = defaultList();
    
    for (i in 0...100) {
      assertEquals(100 - i, l.size());
      
      l = l.remove(i);
    }
    
    assertEquals(0, l.size());
  }
  
  public function testContainsElements(): Void {
    var l = newList();
    
    for (i in 0...100) {
      assertFalse(l.contains(i));
      
      l = l.add(i);
      
      assertTrue(l.contains(i));
    }
  }
  
  public function testCanIterateThroughElements(): Void {
    var l = defaultList();
    
    var count = 4950;
    var iterated = 0;
    
    for (k in l) {
      count -= k;
      
      ++iterated;
    }

    assertEquals(100, iterated);
    assertEquals(0,   count);
  }
  
  public function testFilter(): Void {
    var l = defaultList().filter(function(e) { return e < 50; });
    
    assertEquals(50, l.size());
  }
  
  public function testSort(): Void {
    var ul = newList().addAll([9, 2, 1, 100]);
    var ol = newList().addAll([1, 2, 9, 100]);
    
    assertListEquals(ol, ul.sort());
  }  
  
  public function testSortWith(): Void {
     var ul = newList().addAll([9, 2, 1, 100]);
     var ol = newList().addAll([1, 9, 2, 100]);
     
     var oddsfirst = function(a, b) {
       if(a == b)
         return 0;
       var aeven = a % 2 == 0;
       var beven = b % 2 == 0;   
       if((aeven && beven) || (!aeven && !beven))
         return a - b;
       else if(aeven)
         return 1;
       else
         return -1;
     };
     assertListEquals(ol, ul.withOrderFunction(oddsfirst).sort());
  }
  
  public function testReverse(): Void {
    var l = newList().addAll([9, 2, 1, 100]);
    var rl = newList().addAll([100, 1, 2, 9]);
    
    assertListEquals(rl, l.reverse());
  }
  
  public function testFoldr(): Void {
    assertEquals(4950, defaultList().foldr(0, function(b, a) {
      return a + b;
    }));
  }
  
  public function testLast(): Void {
    assertEquals(99, defaultList().last);
  }
  
  public function testLastOption(): Void {
    switch (defaultList().lastOption) {
      case Some(v): assertEquals(99, v);
      
      default: assertTrue(false);
    }
  }
  
  public function testHead(): Void {
    assertEquals(0, defaultList().head);
  }
  
  public function testHeadOption(): Void {
    switch (defaultList().headOption) {
      case Some(v): assertEquals(0, v);
      
      default: assertTrue(false);
    }
  }
  
  public function testZip(): Void {
    var l = defaultList().zip(defaultList().drop(1));
    
    var i1 = 0, i2 = 1;

    for (z in l) {
      assertEquals(z, i1.entuple(i2));
      
      ++i1; ++i2;
    }
    
    assertEquals(99, l.size());
  }    

  public function testEquals() { 
  assertTrue (newList().equals(newList())); 
    assertTrue (newList([1,2,3]).equals(newList([1,2,3])));
    assertFalse(newList([1,2,3]).equals(newList([2,2,3])));
    assertFalse(newList([1,2,3]).equals(newList([1])));  
    
    var list = List.create(function(a : Float, b : Float) return Math.abs(a-b) < 0.25).addAll([1.0, 2.1]);

    assertTrue (list.equals(newList([0.9, 2.0])));
  assertFalse(list.equals(newList([0.9, 2.4]))); 
  assertFalse(list.equals(newList([0.7, 2.0]))); 
  }

  public function testCompare() {  
    assertTrue(newList().compare(newList()) == 0);
  assertTrue(newList([1,2,3]).compare(newList([1,2,3])) == 0);  

    assertTrue(newList([1,2,3]).compare(newList([2,2,3])) < 0);
    assertTrue(newList([1,2,3]).compare(newList([1])) > 0);  
    
    var list = List.create(function(a : Float, b : Float) return Math.abs(a-b) < 0.25 ? 0 : (a > b ? 1 : -1)).addAll([1.0, 2.1]);

    assertTrue(list.compare(newList([0.9, 2.0])) == 0);
  assertTrue(list.compare(newList([0.9, 2.4])) < 0); 
  assertTrue(list.compare(newList([0.7, 2.0])) > 0); 
  }

  public function testToString() { 
  assertEquals("List []", newList().toString()); 
    assertEquals("List [a, b]", newList(["a", "b"]).toString());

    var list = List.create(function(a : String) return '"' + a +'"').addAll(["a", "b"]);

    assertEquals('List ["a", "b"]', list.toString());
  }     

  public function testHashCode() {
  assertNotEquals(0, newList().hashCode());
  assertNotEquals(0, newList([1,2]).hashCode());
  }
     

  function newList<T>(?values : Array<T>) : List<T> {
    var list = List.create();
    if(null != values)
      return list.addAll(values);  
    else
      return list;
  }
  
  function assertListEquals(l1: List<Int>, l2: List<Int>, ?pos : haxe.PosInfos) {
    assertTrue(l1.equals(l2), pos); 
    assertTrue(Stax.getEqualFor(l1)(l1, l2), pos); 
  }
  
  function defaultList(): List<Int> {
    var l = newList();
    
    for (i in 0...100) l = l.add(i);
    
    return l;
  }
}