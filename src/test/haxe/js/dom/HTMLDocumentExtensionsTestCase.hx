/*
 HaXe library written by Paul M. De Goes <paul@socialmedia.com>
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
import stax.Tuples;
import js.Env;
import js.dom.Quirks;
import js.dom.HTMLElementExtensions;
import Prelude;
using  js.dom.HTMLElementExtensions;
using  js.dom.HTMLDocumentExtensions;


import haxe.test.TestCase;

class HTMLDocumentExtensionsTestCase extends TestCase {
    var _doc:           Dom.HTMLDocument;
    var _testElements:  HTMLElement;

    public function new():Void {
        super();
        _doc = Env.document;
        _testElements = _doc.newElement("div", [Tuple2.create("id", "testElements")]);
        _doc.getElementsByTagName("body")[0].appendChild(_testElements);
    }
    
    public function testThatNewElementWorks(): Void {
      var e = _doc.newElement("img", [ Tuple2.create("id", "foo"), Tuple2.create("src", "http://thenextweb.com/apps/files/2010/03/google_logo.jpg")], "width: 300px; height: 100px; position: relative;");
      
      asTestElement(e);
      
      assertTrue(e != null);
      assertEquals(e.getAttribute("src"), "http://thenextweb.com/apps/files/2010/03/google_logo.jpg");
      assertEquals(e.getAttribute("id"), "foo"); 
      
      clearTestElements();
    }
    
    public function testThatGetIdWorks(): Void {
      var e = asTestElement(_doc.newElement("div", [Tuple2.create("id", "getIdElem")]));
      
      assertTrue(_doc.getId("getIdElem") != null);
    }
    
    public function testThatGetTagsWorks(): Void {
      var e = _doc.getTags("body")[0];
      
      assertEquals(e.nodeName.toLowerCase(), "body");
    }
    
    public function testThatGetClassesWorks(): Void {
      var e1 = asTestElement(_doc.newElement("div", [Tuple2.create("class", "test-elem bob")]));
      var e2 = asTestElement(_doc.newElement("div", [Tuple2.create("class", "test-elem foo fang")]));
      var e3 = asTestElement(_doc.newElement("div", [Tuple2.create("class", "foo test-elem")]));
      
      var body = _doc.getTags("body")[0];
      
      e1.appendChild(e2);
      e2.appendChild(e3);
      
      asTestElement(e1);
      
      
      assertEquals(_doc.getClasses("bob").length, 1);
      assertEquals(_doc.getClasses("test-elem").length, 3);
      assertEquals(_doc.getClasses("foo").length, 2);
      assertEquals(_doc.getClasses("blat").length, 0);
      
      clearTestElements();
    }
    
    
    
    
    
    
    
    private function asTestElement(e: HTMLElement): HTMLElement {
      _testElements.appendChild(e);
      return e;
    }
    
    private function clearTestElements() {
      
      _testElements.innerHTML = "";
    }

}