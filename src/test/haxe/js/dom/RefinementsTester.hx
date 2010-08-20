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

package js.dom;

import Dom;
import js.Env;
import js.dom.Quirks;
import js.dom.Refinements;
using  js.dom.Refinements;

import haxe.test.TestCase;

class RefinementsTestCase extends TestCase {
    var _doc: Env.HTMLDocument;

    public function new():Void {
        super();
        _doc = Env.document;
    }
    
    private function testThatRefinementsIFrameOptionWorks(): Void {
      var iframe = _doc.getElementsByTagName('iframe')[0];
      
      assertEquals("IFRAME", iframe.asIframe().nodeName);
    }
    
    private function testThatRefinementsScriptOptionWorks(): Void {
      var script = _doc.getElementsByTagName('script')[0];
      
      assertEquals("SCRIPT", script.asScript().nodeName);
    }
    
    private function testThatRefinementsDIVOptionWorks(): Void {
      var div = _doc.getElementsByTagName('div')[0];
      
      assertEquals("DIV", div.asDiv().nodeName);
    }
    
    private function testThatRefinementsFORMOptionWorks(): Void {
      var form = _doc.getElementsByTagName('form')[0];
      
      assertEquals("FORM", form.asForm().nodeName);
    }
    
    private function testThatRefinementsBODYOptionWorks(): Void {
      var body = _doc.getElementsByTagName('body')[0];
      
      assertEquals("BODY", body.asBody().nodeName);
    }
    
    private function testThatRefinementsSTYLEOptionWorks(): Void {
      var style = _doc.getElementsByTagName('STYLE')[0];
      
      assertEquals("STYLE", style.asStyle().nodeName);
    }
    
    private function testThatRefinementsTEXTOptionWorks(): Void {
      var p = createTestElement('P', 'test');
      var appendText = _doc.createTextNode('foo');
      
      p.appendChild(appendText);
      
      var text: HTMLElement = p.firstChild;

      assertEquals("foo", text.nodeValue);
      removeTestElement('test');
    }
    
    private function testThatRefinementsVideoOptionWorks(): Void {
      var video = createTestElement('video', 'test');
            
      assertEquals("VIDEO", video.asVideo().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsAUDIOOptionWorks(): Void {
      var audio = createTestElement('audio', 'test');
            
      assertEquals("AUDIO", audio.asAudio().nodeName);
      removeTestElement('test');
    }
    
    
    














    private function createTestElement(name:String, id: String): HTMLElement {
      var body = _doc.getElementsByTagName('body')[0];
      
      var newChild = _doc.createElement(name);
      
      newChild.setAttribute('id', id);
      newChild.setAttribute('style', 'position:relative; height:1; width:1; left: -1000000000;');
      
      body.appendChild(newChild);
      
      return newChild;
    }
    
    private function removeTestElement(id: String): Void {
      var body = _doc.getElementsByTagName('body')[0];
      
      var delChild = _doc.getElementById(id);
      body.removeChild(delChild);
      
      if (_doc.getElementById(id) != null) throw 'Element still exists after attempting to delete: ' + delChild.nodeName ;
    }



}