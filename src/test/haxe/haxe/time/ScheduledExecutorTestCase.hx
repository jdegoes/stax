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
package haxe.time;

import Prelude;
import haxe.test.Assert;
import haxe.test.TestCase;
import haxe.time.ScheduledExecutor;

using Prelude;

class ScheduledExecutorTestCase extends TestCase {
  var _executor: ScheduledExecutor;
  
  override public function beforeAll() {
    _executor = ScheduledExecutorFactory.create();
  }
  
  public function testOnce(): Void {
    var future = _executor.once(function() {
      return 12;
    }, 10);
    
    future.deliverTo(function(v) { trace("Successfully received value: " + v); });
    
    assertTrue(true);
  }
  
  public function testOnceCanBeCanceled(): Void {
    var future = _executor.once(function() {
      return 12;
    }, 10);
    
    future.deliverTo(function(v) { trace("Failed! Received value: " + v); });
    
    assertTrue(future.cancel());
  }
  
  public function testRepeat(): Void {
    var future = _executor.repeat(0, function(count) {
      return count + 1;
    }, 1, 3);
    
    assertDelivered(future,
      function(v) {
        Assert.equals(3, v);
      }
    );
  }
  
  public function testRepeatCanBeCanceled(): Void {
    var future = _executor.repeat(0, function(count) {
      return count + 1;
    }, 10, 3);
    
    future.deliverTo(function(v) { trace("Failed! Received value: " + v); });
    
    assertTrue(future.cancel());
  }
  
  public function testForeverCanBeCanceled(): Void {
    var future = _executor.forever(function() { 
      trace("Failed!");
    }, 10);
    
    assertTrue(future.cancel());
  }
  
  public function testForever(): Void {
    var future = null;
    var count = 0;
    
    future = _executor.forever(function() { 
      ++count;
      
      if (count > 1) {
        trace("Failed!");
      }
      
      future.cancel();
    }, 10);
    
    assertTrue(true);
  }
}