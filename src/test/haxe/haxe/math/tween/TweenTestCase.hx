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
package haxe.math.tween;

import Prelude;
import haxe.test.TestCase;
import haxe.test.Assert;
import haxe.math.tween.Tween;
import haxe.math.tween.Easing;

using PreludeExtensions;
using haxe.math.tween.TweenExtensions;

class TweenTestCase extends TestCase {
  static var Start = {
    x: 0.0,
    y: 2.0
  }
  static var End = {
    x: 6.0,
    y: 12.0
  }
  static var Linear = Tween.linear(Start, End);
  
  public function new() {
    super();
  }
  
  public function testLinearTweenAt0() {
    assertFloatEquals(0.0, Linear(0).x);
    assertFloatEquals(2.0, Linear(0).y);
  }
  
  public function testLinearTweenAt1() {
    assertFloatEquals(6.0, Linear(1).x);
    assertFloatEquals(12.0, Linear(1).y);
  }
  
  public function testLinearTweenAt0_5() {
    assertFloatEquals(3.0, Linear(0.5).x);
    assertFloatEquals(7.0, Linear(0.5).y);
  }
}