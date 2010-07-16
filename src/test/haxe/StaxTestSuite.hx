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
import PreludeTest;

import haxe.test.TestRunner;

import haxe.text.json.JsonTestCase;
import haxe.io.log.LoggerTestCase;
import haxe.data.collections.MapTestCase;
import haxe.data.collections.SetTestCase;
import haxe.data.collections.ListTestCase;
import haxe.data.transcode.JValueTestCase;
import haxe.abstract.PartialFunctionTestCase;
import haxe.time.ScheduledExecutorTestCase;
import haxe.net.UrlTestCase;
import haxe.util.StringExtensionsTestCase;

#if js
import js.io.IFrameIOTestCase;
#end

class StaxTestSuite {
  public static function main (): Void {
    (new TestRunner()).addAll([
      new PreludeTestCase(),
      new JValueTestCase(),
      new MapTestCase(),
      new SetTestCase(),
      new ListTestCase(),
      new LoggerTestCase(),
      new JsonTestCase(),
      new PartialFunctionTestCase(),
      new ScheduledExecutorTestCase(),
      new UrlTestCase(),
      new StringExtensionsTestCase()
      #if js
      , new IFrameIOTestCase()
      #end
    ]).run();
  }
}
