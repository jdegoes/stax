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
import haxe.data.collections.Set;

using PreludeExtensions;
using haxe.functional.FoldableExtensions;

class SetTestCase extends TestCase {
  public function testSizeGrowsWhenAddingUniqueElements(): Void {
    var s = set();
    
    for (i in 0...100) {
      assertEquals(i, s.size);
      
      s = s.add(i);
    }
    
    assertEquals(100, s.size);
  }
  
  public function testSizeDoesNotGrowWhenAddingDuplicateElements(): Void {
    var s = set().add(0);
    
    for (i in 0...100) s = s.add(0);
    
    assertEquals(1, s.size);
  }
  
  public function testSizeShrinksWhenRemovingElements(): Void {
    var s = defaultSet();
    
    for (i in 0...100) {
      assertEquals(100 - i, s.size);
      
      s = s.remove(i);
    }
    
    assertEquals(0, s.size);
  }
  
  public function testContainsElements(): Void {
    var s = set();
    
    for (i in 0...100) {
      assertFalse(s.contains(i));
      
      s = s.add(i);
      
      assertTrue(s.contains(i));
    }
  }
  
  public function testAddingSameElementDoesNotChangeSet(): Void {
    var s = defaultSet();
    
    for (i in 0...100) {
      var oldM = s;
      
      s = s.add(i);
      
      assertEquals(oldM, s);
      assertEquals(100, s.size);
    }
  }
  
  public function testCanIterateThroughElements(): Void {
    var s = defaultSet();
    
    var count = 4950;
    var iterated = 0;
    
    for (k in s) {
      count -= k;
      
      ++iterated;
    }

    assertEquals(100, iterated);
    assertEquals(0,   count);
  }
  
  public function testFilter(): Void {
    var s = defaultSet().filter(function(e) { return e < 50; });
    
    assertEquals(50, s.size);
  } 

  public function testEquals() {  
  assertTrue (set().equals(set()));
  assertTrue (set([1,2,3]).equals(set([1,2,3])));
  assertFalse(set().equals(set([1])));
  assertFalse(set([2]).equals(set([1])));
  assertFalse(set([1,2]).equals(set([1,3])));
  }

  public function testCompare() {                
  assertTrue(set().compare(set()) == 0);
  assertTrue(set([1,2,3]).compare(set([1,2,3])) == 0);
  assertTrue(set().compare(set([1])) < 0);
  assertTrue(set([2]).compare(set([1])) > 0);
  assertTrue(set([1,2]).compare(set([1,3])) < 0);          
  }

  public function testToString() {           
  assertEquals("Set []", set().toString());
  assertEquals("Set [1, 2, 3]", set([1,2,3]).toString()); 
  }     

  public function testHashCode() {       
  assertNotEquals(0, set().hashCode());
  assertNotEquals(0, set([1,2]).hashCode());            
  }
    
  function defaultSet(): Set<Int> {
    var s = set();
    
    for (i in 0...100) s = s.add(i);
    
    return s;
  }
  
  function set<T>(?values : Array<T>): Set<T> {
    var s = Set.create();
    if(null != values)
      s = s.addAll(values);
    return s;
  }
}