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

import haxe.abstract.Foldable;
import haxe.unit.TestCase;
import haxe.data.collections.List;

using Prelude;
using haxe.abstract.Foldable;

class ListTestCase extends TestCase {
    public function testSizeGrowsWhenAddingUniqueElements(): Void {
      var l = newList();
      
      for (i in 0...100) {
        assertEquals(i, l.size);
        
        l = l.add(i);
      }
      
      assertEquals(100, l.size);
    }
    
    public function testSizeGrowsWhenAddingDuplicateElements(): Void {
      var l = newList().add(0);
      
      for (i in 0...100) l = l.add(0);
      
      assertEquals(101, l.size);
    }
    
    public function testSizeShrinksWhenRemovingElements(): Void {
      var l = defaultList();
      
      for (i in 0...100) {
        assertEquals(100 - i, l.size);
        
        l = l.remove(i);
      }
      
      assertEquals(0, l.size);
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
      
      assertEquals(50, l.size);
    }
    
    public function testSort(): Void {
      var ul = newList().addAll([9, 2, 1, 100]);
      var ol = newList().addAll([1, 2, 9, 100]);
      
      assertListEquals(ol, ul.sort(Int.OrderT()));
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
    
    function assertListEquals(l1: List<Int>, l2: List<Int>) {
      assertTrue(List.EqualT(Int.EqualT()).equal(l1, l2));
    }
    
    function newList(): List<Int> {
      return List.create(Int.EqualT());
    }
    
    function defaultList(): List<Int> {
      var l = newList();
      
      for (i in 0...100) l = l.add(i);
      
      return l;
    }
}