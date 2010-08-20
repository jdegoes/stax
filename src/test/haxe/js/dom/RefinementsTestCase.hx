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
    
    private function testThatRefinementsHEADOptionWorks(): Void {
      var head = createTestElement('HEAD', 'test');
      
      assertEquals("HEAD", head.asHead().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsLINKOptionWorks(): Void {
      var link = createTestElement('link', 'test');
            
      assertEquals("LINK", link.asLink().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsTITLEOptionWorks(): Void {
      var title = createTestElement('title', 'test');
            
      assertEquals("TITLE", title.asTitle().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsMETAOptionWorks(): Void {
      var meta = createTestElement('meta', 'test');
            
      assertEquals("META", meta.asMeta().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsBASEOptionWorks(): Void {
      var base = createTestElement('base', 'test');
            
      assertEquals("BASE", base.asBase().nodeName);
      removeTestElement('test');
    }
    
    
    private function testThatRefinementsISINDEXOptionWorks(): Void {
      var isIndex = createTestElement('isIndex', 'test');
            
      assertEquals("ISINDEX", isIndex.asIsIndex().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsSELECTOptionWorks(): Void {
      var select = createTestElement('select', 'test');
            
      assertEquals("SELECT", select.asSelect().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsCANVASOptionWorks(): Void {
      var canvas = createTestElement('canvas', 'test');
            
      assertEquals("CANVAS", canvas.asCanvas().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsOPTGROUPOptionWorks(): Void {
      var optGroup = createTestElement('optGroup', 'test');
            
      assertEquals("OPTGROUP", optGroup.asOptGroup().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsOPTIONOptionWorks(): Void {
      var option = createTestElement('option', 'test');
            
      assertEquals("OPTION", option.asOption().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsINPUTInputWorks(): Void {
      var input = createTestElement('input', 'test');
            
      assertEquals("INPUT", input.asInput().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsTEXTAREATextAreaWorks(): Void {
      var textArea = createTestElement('textArea', 'test');
            
      assertEquals("TEXTAREA", textArea.asTextArea().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsBUTTONButtonWorks(): Void {
      var button = createTestElement('button', 'test');
            
      assertEquals("BUTTON", button.asButton().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsLABELLabelWorks(): Void {
      var label = createTestElement('label', 'test');
            
      assertEquals("LABEL", label.asLabel().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsFIELDSETWorks(): Void {
      var fieldSet = createTestElement('fieldset', 'test');
            
      assertEquals("FIELDSET", fieldSet.asFieldSet().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsLEGENDWorks(): Void {
      var legend = createTestElement('legend', 'test');
            
      assertEquals("LEGEND", legend.asLegend().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsULWorks(): Void {
      var ul = createTestElement('ul', 'test');
            
      assertEquals("UL", ul.asUList().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsOLWorks(): Void {
      var ol = createTestElement('ol', 'test');
            
      assertEquals("OL", ol.asOList().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsDLWorks(): Void {
      var dl = createTestElement('dl', 'test');
            
      assertEquals("DL", dl.asDList().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsDIRWorks(): Void {
      var dir = createTestElement('dir', 'test');
            
      assertEquals("DIR", dir.asDir().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsMENUWorks(): Void {
      var menu = createTestElement('menu', 'test');
            
      assertEquals("MENU", menu.asMenu().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsLIWorks(): Void {
      var li = createTestElement('li', 'test');
            
      assertEquals("LI", li.asLI().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsPWorks(): Void {
      var p = createTestElement('p', 'test');
            
      assertEquals("P", p.asP().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsHWorks(): Void {
      var h = createTestElement('h', 'test');
            
      assertEquals("H", h.asH().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsQUOTEWorks(): Void {
      var quote = createTestElement('quote', 'test');
            
      assertEquals("QUOTE", quote.asQuote().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsPREWorks(): Void {
      var pre = createTestElement('pre', 'test');
            
      assertEquals("PRE", pre.asPre().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsBRWorks(): Void {
      var br = createTestElement('br', 'test');
            
      assertEquals("BR", br.asBR().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsBASEFONTWorks(): Void {
      var baseFont = createTestElement('baseFont', 'test');
            
      assertEquals("BASEFONT", baseFont.asBaseFont().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsFONTWorks(): Void {
      var Font = createTestElement('Font', 'test');
            
      assertEquals("FONT", Font.asFont().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsHRWorks(): Void {
      var hr = createTestElement('HR', 'test');
            
      assertEquals("HR", hr.asHR().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsMODWorks(): Void {
      var mod = createTestElement('MOD', 'test');
            
      assertEquals("MOD", mod.asMod().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsAWorks(): Void {
      var a = createTestElement('A', 'test');
            
      assertEquals("A", a.asA().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsIMGWorks(): Void {
      var image = createTestElement('IMG', 'test');
            
      assertEquals("IMG", image.asImage().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsOBJECTWorks(): Void {
      var object = createTestElement('OBJECT', 'test');
            
      assertEquals("OBJECT", object.asObject().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsPARAMWorks(): Void {
      var param = createTestElement('PARAM', 'test');
            
      assertEquals("PARAM", param.asParam().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsAPPLETWorks(): Void {
      var applet = createTestElement('APPLET', 'test');
            
      assertEquals("APPLET", applet.asApplet().nodeName);
      removeTestElement('test');
    }
    
    private function testThatRefinementsMAPWorks(): Void {
      var map = createTestElement('MAP', 'test');
            
      assertEquals("MAP", map.asMap().nodeName);
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