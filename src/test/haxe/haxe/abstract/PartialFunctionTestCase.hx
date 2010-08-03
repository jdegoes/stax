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
package haxe.abstract;

import Prelude;
import haxe.test.TestCase;
import haxe.abstract.PartialFunction;

using PreludeExtensions;
using haxe.abstract.PartialFunctionExtensions;

class PartialFunctionTestCase extends TestCase {
    public function testIsDefinedAtForPartialFunction1() {
      var f = [Tuple2.create(function(i: Int) return i > 0, function(i: Int) return i * i)].toPartialFunction();
      
      assertTrue(f.isDefinedAt(2));
      assertFalse(f.isDefinedAt(-2));
    }
    
    public function testCallForPartialFunction1() {
      var f = [Tuple2.create(function(i: Int) return i > 0, function(i: Int) return i * i)].toPartialFunction();
      
      assertEquals(4, f.call(2));
    }
    
    public function testOrElseForPartialFunction1() {
      var f1 = [Tuple2.create(function(i: Int) return i > 0, function(i: Int) return i * i)].toPartialFunction();
      var f2 = [Tuple2.create(function(i: Int) return i < 0, function(i: Int) return i * i)].toPartialFunction();
      
      var f = f1.orElse(f2);
      
      assertTrue(f.isDefinedAt(-2));
      
      assertEquals(4, f.call(-2));
      assertEquals(4, f.call(2));
    }
    
    public function testOrAlwaysCForPartialFunction1() {
      var f = [Tuple2.create(function(i: Int) return i > 0, function(i: Int) return i * i)].toPartialFunction();
      
      assertTrue(f.orAlwaysC(9.toThunk()).isDefinedAt(-2));
    }
}