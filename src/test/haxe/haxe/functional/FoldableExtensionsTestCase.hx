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
package haxe.functional;
import haxe.data.collections.List; 
import haxe.data.collections.Map;
import haxe.data.collections.Set;

import Prelude;
import haxe.test.TestCase;
import haxe.functional.FoldableExtensions;

using PreludeExtensions;
using haxe.functional.FoldableExtensions;

class FoldableExtensionsTestCase extends TestCase {
  public function testIntSetMapToString() {
    var seta = Set.create().addAll([1,2,3]);
    var setb = seta.map(function(i) return i.toString());
    assertEquals(["1", "2", "3"], setb.toArray()); 
  }
  
  public function testMapToList() {
    var list = Map.create().set("a", "A").set("b", "B").toList();
    assertIs(list, List);
    assertEquals(2, list.size());
  }
  
  public function testListToSet() {
    var set = List.create().addAll([1, 2, 2, 3]).toSet();
    assertIs(set, Set);
    assertEquals(3, set.size());
  }
  
  public function testSetToList() {
    var list = Set.create().addAll([1, 2, 3]).toList();
    assertIs(list, List);
    assertEquals(3, list.size());
  }
}