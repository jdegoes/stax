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
package haxe.math.geom;

import Prelude;
import haxe.test.TestCase;
import haxe.test.Assert;
import haxe.math.geom.Point;


using haxe.math.geom.PointExtensions;

class PointTestCase extends TestCase {
  static var cmpInt = function(p1: Point2d<Int>, p2: Point2d<Int>) {
    return p1.x == p2.x && p1.y == p2.y;
  }
  
  public function new() {
    super();
  }
  
  public function testMinusPlusLeavesUnchanged() {
    var p1 = { x: 23, y: 92 };
    var p2 = { x: -85, y: -39 };
    
    assertEquals(p2, p1.plus(p2.minus(p1)), cmpInt);
  }
  
  public function testMap() {
    assertEquals({x: 2, y: 9}, {x: 1, y: 3}.map(function(x) return x * 2, function(y) return y * 3), cmpInt);
  }
  
}