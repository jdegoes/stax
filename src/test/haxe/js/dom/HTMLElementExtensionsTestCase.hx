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
import js.dom.HTMLElementExtensions;
using  js.dom.HTMLElementExtensions;

import haxe.test.TestCase;

class HTMLElementExtensionsTestCase extends TestCase {
    var _doc: Env.HTMLDocument;

    public function new():Void {
        super();
        _doc = Env.document;
    }
    
    private function testThatHTMLElementExtensionsIFrameOptionWorks(): Void {
      var iframe = _doc.getElementsByTagName('iframe')[0];
      
      assertEquals("IFRAME", iframe.asIframe().nodeName);
    }
    
    private function testThatHTMLElementExtensionsScriptOptionWorks(): Void {
      var script = _doc.getElementsByTagName('script')[0];
      
      assertEquals("SCRIPT", script.asScript().nodeName);
    }
    
    private function testThatHTMLElementExtensionsDIVOptionWorks(): Void {
      var div = _doc.getElementsByTagName('div')[0];
      
      assertEquals("DIV", div.asDiv().nodeName);
    }
    
    private function testThatHTMLElementExtensionsFORMOptionWorks(): Void {
      var form = _doc.getElementsByTagName('form')[0];
      
      assertEquals("FORM", form.asForm().nodeName);
    }
    
    private function testThatHTMLElementExtensionsBODYOptionWorks(): Void {
      var body = _doc.getElementsByTagName('body')[0];
      
      assertEquals("BODY", body.asBody().nodeName);
    }
    
    private function testThatHTMLElementExtensionsSTYLEOptionWorks(): Void {
      var style = _doc.getElementsByTagName('STYLE')[0];
      
      assertEquals("STYLE", style.asStyle().nodeName);
    }
    
    private function testThatHTMLElementExtensionsTEXTOptionWorks(): Void {
      var p = createTestElement('P', 'test');
      var appendText = _doc.createTextNode('foo');
      
      p.appendChild(appendText);
      
      var text: HTMLElement = p.firstChild;

      assertEquals("foo", text.nodeValue);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsVideoOptionWorks(): Void {
      var video = createTestElement('video', 'test');
            
      assertEquals("VIDEO", video.asVideo().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsAUDIOOptionWorks(): Void {
      var audio = createTestElement('audio', 'test');
            
      assertEquals("AUDIO", audio.asAudio().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsHEADOptionWorks(): Void {
      var head = createTestElement('HEAD', 'test');
      
      assertEquals("HEAD", head.asHead().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsLINKOptionWorks(): Void {
      var link = createTestElement('link', 'test');
            
      assertEquals("LINK", link.asLink().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsTITLEOptionWorks(): Void {
      var title = createTestElement('title', 'test');
            
      assertEquals("TITLE", title.asTitle().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsMETAOptionWorks(): Void {
      var meta = createTestElement('meta', 'test');
            
      assertEquals("META", meta.asMeta().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsBASEOptionWorks(): Void {
      var base = createTestElement('base', 'test');
            
      assertEquals("BASE", base.asBase().nodeName);
      removeTestElement('test');
    }
    
    
    private function testThatHTMLElementExtensionsISINDEXOptionWorks(): Void {
      var isIndex = createTestElement('isIndex', 'test');
            
      assertEquals("ISINDEX", isIndex.asIsIndex().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsSELECTOptionWorks(): Void {
      var select = createTestElement('select', 'test');
            
      assertEquals("SELECT", select.asSelect().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsCANVASOptionWorks(): Void {
      var canvas = createTestElement('canvas', 'test');
            
      assertEquals("CANVAS", canvas.asCanvas().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsOPTGROUPOptionWorks(): Void {
      var optGroup = createTestElement('optGroup', 'test');
            
      assertEquals("OPTGROUP", optGroup.asOptGroup().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsOPTIONOptionWorks(): Void {
      var option = createTestElement('option', 'test');
            
      assertEquals("OPTION", option.asOption().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsINPUTInputWorks(): Void {
      var input = createTestElement('input', 'test');
            
      assertEquals("INPUT", input.asInput().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsTEXTAREATextAreaWorks(): Void {
      var textArea = createTestElement('textArea', 'test');
            
      assertEquals("TEXTAREA", textArea.asTextArea().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsBUTTONButtonWorks(): Void {
      var button = createTestElement('button', 'test');
            
      assertEquals("BUTTON", button.asButton().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsLABELLabelWorks(): Void {
      var label = createTestElement('label', 'test');
            
      assertEquals("LABEL", label.asLabel().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsFIELDSETWorks(): Void {
      var fieldSet = createTestElement('fieldset', 'test');
            
      assertEquals("FIELDSET", fieldSet.asFieldSet().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsLEGENDWorks(): Void {
      var legend = createTestElement('legend', 'test');
            
      assertEquals("LEGEND", legend.asLegend().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsULWorks(): Void {
      var ul = createTestElement('ul', 'test');
            
      assertEquals("UL", ul.asUList().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsOLWorks(): Void {
      var ol = createTestElement('ol', 'test');
            
      assertEquals("OL", ol.asOList().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsDLWorks(): Void {
      var dl = createTestElement('dl', 'test');
            
      assertEquals("DL", dl.asDList().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsDIRWorks(): Void {
      var dir = createTestElement('dir', 'test');
            
      assertEquals("DIR", dir.asDir().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsMENUWorks(): Void {
      var menu = createTestElement('menu', 'test');
            
      assertEquals("MENU", menu.asMenu().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsLIWorks(): Void {
      var li = createTestElement('li', 'test');
            
      assertEquals("LI", li.asLI().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsPWorks(): Void {
      var p = createTestElement('p', 'test');
            
      assertEquals("P", p.asP().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsHWorks(): Void {
      var h = createTestElement('h', 'test');
            
      assertEquals("H", h.asH().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsQUOTEWorks(): Void {
      var quote = createTestElement('quote', 'test');
            
      assertEquals("QUOTE", quote.asQuote().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsPREWorks(): Void {
      var pre = createTestElement('pre', 'test');
            
      assertEquals("PRE", pre.asPre().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsBRWorks(): Void {
      var br = createTestElement('br', 'test');
            
      assertEquals("BR", br.asBR().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsBASEFONTWorks(): Void {
      var baseFont = createTestElement('baseFont', 'test');
            
      assertEquals("BASEFONT", baseFont.asBaseFont().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsFONTWorks(): Void {
      var Font = createTestElement('Font', 'test');
            
      assertEquals("FONT", Font.asFont().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsHRWorks(): Void {
      var hr = createTestElement('HR', 'test');
            
      assertEquals("HR", hr.asHR().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsMODWorks(): Void {
      var mod = createTestElement('MOD', 'test');
            
      assertEquals("MOD", mod.asMod().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsAWorks(): Void {
      var a = createTestElement('A', 'test');
            
      assertEquals("A", a.asA().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsIMGWorks(): Void {
      var image = createTestElement('IMG', 'test');
            
      assertEquals("IMG", image.asImage().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsOBJECTWorks(): Void {
      var object = createTestElement('OBJECT', 'test');
            
      assertEquals("OBJECT", object.asObject().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsPARAMWorks(): Void {
      var param = createTestElement('PARAM', 'test');
            
      assertEquals("PARAM", param.asParam().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsAPPLETWorks(): Void {
      var applet = createTestElement('APPLET', 'test');
            
      assertEquals("APPLET", applet.asApplet().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsMAPWorks(): Void {
      var map = createTestElement('MAP', 'test');
            
      assertEquals("MAP", map.asMap().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsAREAWorks(): Void {
      var area = createTestElement('AREA', 'test');
            
      assertEquals("AREA", area.asArea().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsTABLEWorks(): Void {
      var table = createTestElement('TABLE', 'test');
            
      assertEquals("TABLE", table.asTable().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsTABLECAPTIONWorks(): Void {
      var caption = createTestElement('CAPTION', 'test');
            
      assertEquals("CAPTION", caption.asCaption().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsTABLETDWorks(): Void {
      var td = createTestElement('TD', 'test');
            
      assertEquals("TD", td.asTD().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsTABLEHEADWorks(): Void {
      var table = newTable('table');
      
      assertEquals("THEAD", table.tHead.asTHead().nodeName);
      removeTestElement('table');
    }
    
    private function testThatHTMLElementExtensionsTABLEBODYWorks(): Void {
      var table = newTable('table');
      
      assertEquals("TBODY", table.tBodies[0].asTBody().nodeName);
      removeTestElement('table');
    }
    
    private function testThatHTMLElementExtensionsTABLEFOOTWorks(): Void {
      var table = newTable('table');
      
      assertEquals("TFOOT", table.tFoot.asTFoot().nodeName);
      removeTestElement('table');
    }
    
    private function testThatHTMLElementExtensionsTABLETRWorks(): Void {
      var table = newTable('table');
      
      assertEquals("TR", table.rows[0].asTR().nodeName);
      removeTestElement('table');
    }
    
    private function testThatHTMLElementExtensionsFRAMESETWorks(): Void {
      var frameset = createTestElement('frameset', 'test');
      
      assertEquals("FRAMESET", frameset.asFrameSet().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsFRAMEWorks(): Void {
      var frame = createTestElement('frame', 'test');
      
      assertEquals("FRAME", frame.asFrame().nodeName);
      removeTestElement('test');
    }
    
    private function testThatHTMLElementExtensionsIFRAMEWorks(): Void {
      var iFrame = createTestElement('iFrame', 'test');
      
      assertEquals("IFRAME", iFrame.asIFrame().nodeName);
      removeTestElement('test');
    }
    
    
    
    
    
    
    
    
    










    private function newTable(?id: String = 'test'): HTMLTableElement {
      var table = createTestElement('TABLE', 'table');
      
      table.setAttribute('id', id);
      
      var th    = _doc.createElement('th');
      var cap   = _doc.createElement('caption');
      var thead = _doc.createElement('thead');
      var text  = _doc.createTextNode('foo');
      var tr    = _doc.createElement('tr');
      var tbody = _doc.createElement('tbody');
      var td1   = _doc.createElement('td');
      var td2   = _doc.createElement('td');
      var tfoot = _doc.createElement('tfoot');
      
      table.appendChild(cap);
      table.appendChild(thead);
      table.appendChild(tbody);
      
      thead.appendChild(tr);
      
      tr.appendChild(th);
      th.appendChild(text);
      tr.appendChild(td1);
      tr.appendChild(td2);
      
      tbody.appendChild(tr);
      
      table.appendChild(tfoot);
      
      return table.asTable();
    }

    private function alertObject(obj) {
        untyped __js__('
        (function(){for (key in obj) {
            alert(key);
        }})')();
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