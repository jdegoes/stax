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
import haxe.functional.FoldableExtensionsTestCase;

import Prelude;

import haxe.test.Runner;
import haxe.test.ui.Report;
                   
import haxe.text.json.JsonTestCase;
import haxe.io.log.LoggerTestCase;        
import haxe.data.collections.ArrayExtensionsTestCase;
import haxe.data.collections.MapTestCase;
import haxe.data.collections.SetTestCase;
import haxe.data.collections.ListTestCase;
import haxe.data.transcode.JValueTestCase;
import haxe.functional.PartialFunctionTestCase;         
import haxe.functional.FoldableExtensionsTestCase;
import haxe.time.ScheduledExecutorTestCase;
import haxe.net.UrlExtensionsTestCase;
import haxe.net.HttpHeaderExtensionsTestCase;
import haxe.reactive.ReactiveTestCase;
import haxe.util.StringExtensionsTestCase;
import haxe.util.GuidTestCase;
import haxe.util.ObjectExtensionsTestCase;
import haxe.util.OrderExtensionsTestCase;
import haxe.framework.InjectorTestCase;
import haxe.math.geom.PointTestCase;
import haxe.math.tween.TweenTestCase;
import haxe.data.transcode.TranscodeJValueExtensionsTestCase;

import haxe.time.ScheduledExecutor;
import haxe.framework.Injector;

#if js
import haxe.io.http.HttpStringTestCase;

import js.dom.HTMLElementExtensionsTestCase;
import js.dom.QuirksTestCase;
import js.io.IFrameIOTestCase;
import haxe.io.http.HttpJValueJsonpTestCase;
#end

class StaxTestSuite {
  public static function main (): Void {
    Injector.forever(
      function(c) {
        var runner = (new Runner()).addAll([   
          new PreludeTestCase(),    
          new JValueTestCase(),   
          new ArrayExtensionsTestCase(),
          new MapTestCase(),
          new SetTestCase(),
          new ListTestCase(),
          new LoggerTestCase(),
          new JsonTestCase(),   
          new FoldableExtensionsTestCase(),
          new PartialFunctionTestCase(),   
          new TweenTestCase(),
#if !(neko || php || cpp)  
          new ScheduledExecutorTestCase(),
#end
          new UrlExtensionsTestCase(),   
          new ReactiveTestCase(),
          new StringExtensionsTestCase(),
          new InjectorTestCase(),
          new HttpHeaderExtensionsTestCase(),
          new PointTestCase(),
          new OrderExtensionsTestCase(),
          new GuidTestCase()
          #if js
          , new HttpStringTestCase() // This one should be cross-platform, eventually
          , new IFrameIOTestCase()      
          , new HttpJValueJsonpTestCase()
          , new HTMLElementExtensionsTestCase()
          , new QuirksTestCase()
          , new ObjectExtensionsTestCase()
          , new TranscodeJValueExtensionsTestCase()
          #end
  
        ]);

        Report.create(runner);

        runner.run();
        
        return Unit;
      }
    );
  }
}