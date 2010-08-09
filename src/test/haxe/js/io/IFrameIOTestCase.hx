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
package js.io;

import Dom;
import Prelude;
import haxe.test.Assert;
import haxe.test.TestCase;
import js.Env;
import js.dom.Quirks;
import js.dom.Elements;
import js.io.IFrameIO;

using PreludeExtensions;

class IFrameIOTestCase extends TestCase {
  var window1: Window;
  var window2: Window;

  var iframeIO1: IFrameIO;
  var iframeIO2: IFrameIO;
  
	override public function beforeAll(): Void {
	  var d = Env.documentHtml;
	  
	  var body = d.getElementsByTagName('body')[0];
	  
	  var iframe1: HTMLIFrameElement = Elements.iframeInvisible();
	  var iframe2: HTMLIFrameElement = Elements.iframeInvisible();
	  
	  body.appendChild(iframe1);
	  body.appendChild(iframe2);
	  
	  var doc1: HTMLDocument = cast Quirks.getIframeDocument(iframe1);
	  var doc2: HTMLDocument = cast Quirks.getIframeDocument(iframe2);
	  
	  window1 = Quirks.getIframeWindow(iframe1);
	  window2 = Quirks.getIframeWindow(iframe2);
	  
	  iframeIO1 = new IFrameIOAutoDetect(window1);
	  iframeIO2 = new IFrameIOAutoDetect(window2);
	}
	
	override public function afterAll(): Void {
	}
	
	public function testSendOfTinyStringPacketIsReceived(): Void {
	  var self = this;
	  
	  var count = 0;
	  
	  iframeIO1.receiveWhile(
	    function(data) {
	      self.assertEquals('foo', data);
	      
	      trace('Successfully tested send of tiny packet');
	      
	      self.XtestSendOfLargeStringPacketIsReceived();
	      
	      return false;
	    },
	    window2.location.href,
	    window2
	  );
	  
	  iframeIO2.send('foo', window1.location.href, window1);
	  
	  assertTrue(true);
	}
	
	public function XtestSendOfLargeStringPacketIsReceived(): Void {
	  var string = "";
	  
	  for (i in 0...1000) string += "91234";
	  
	  var self = this;
	  
	  iframeIO1.receiveWhile(
	    function(data) {
	      self.assertEquals(string, data);
	      
	      trace('Successfully tested send of large packet');
	      
	      return false;
	    },
	    window2.location.href,
	    window2
	  );
	  
	  iframeIO2.send(string, window1.location.href, window1);
	  
	  assertTrue(true);
	}
}