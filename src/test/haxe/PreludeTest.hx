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
import Prelude;

import haxe.unit.TestCase;
import haxe.unit.TestRunner;

using Prelude;

class PreludeTestCase extends TestCase {
    public function new() {
      super();
    }
    
    public function testCompose() {
      var f1 = function(i) { return i * 2; }
      var f2 = function(i) { return i - 1; }
      
      assertEquals(2, f1.compose(f2)(2));
    }
    
    public function testCurry2() {
      var f = function(i1, i2, i3) { return i1 + i2 + i3; }
      
      assertEquals(3, f.curry()(2)(-2)(3));
    }
    
    public function testFutureChaining() {
      var f1: Future<Int> = Future.create();
      
      var f2 = f1.map(function(i) { return Std.string(i); }).flatMap(function(s): Future<Bool> { return Future.create().deliver(s.length < 2); });
      
      f1.deliver(9);
      
      assertEquals(true, f2.value().get());
    }
}
