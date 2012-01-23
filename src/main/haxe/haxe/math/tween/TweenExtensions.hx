/*
 HaXe library written by John A. De Goes <john@socialmedia.com>

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
import haxe.math.tween.Tween;
import haxe.math.tween.Easing;
import haxe.time.ScheduledExecutor;

import stax.Future;
using stax.Maths;

using haxe.framework.Injector;

class TweenerExtensions {
  static var DefaultFrequency = (1000.0 / 24.0).round();
  
  /** Starts the tween with the specified easment.
   */
  public static function startWith(tweener: Tweener, easing: Easing): Tweener {
    return function(t) {
      return tweener(easing(t));
    };
  }
  
  /** Ends the tween with the specified easment.
   */
  public static function endWith(tweener: Tweener, easing: Easing): Tweener {
    return startWith(tweener, function(t) {
      return 1.0 - easing(1.0 - t);
    });
  }
  
  /**
   * Tween.linear({x: 0}, {x: 1}).animate(1000, 10, function(intermediate) {
   *   trace(intermediate.x);
   * });
   */
  public static function animate(tweener: Tweener, duration: Int, ?frequency_ = 0, cb: Dynamic<Float> -> Void): Future<Int> {
    var executor = ScheduledExecutor.inject();
    
    var frequency = if (frequency_ > 0) frequency_ else DefaultFrequency;
    
    return executor.repeat(frequency, function(millis) {
      var t = millis / duration;
      
      cb(tweener(t));
      
      return millis + frequency;
    }, frequency, (duration / frequency).ceil());
  }
}