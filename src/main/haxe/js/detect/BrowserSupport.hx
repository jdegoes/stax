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
package js.detect;

import Dom;
import Prelude;
import js.Env;
import js.dom.Quirks;

using PreludeExtensions;
using js.DomExtensions;
using haxe.util.ObjectExtensions;

/** Feature detection library */
class BrowserSupport {
  static var _positionFixed: Option<Bool> = None;
  
  /**
   * Determines if the browser supports "position: fixed". The document must 
   * have a body for the detection to be accurate.
   */
	public static function positionFixed(): Bool {
	  return _positionFixed.getOrElse(function() {
  	    var isSupported = false;

        if (Env.document.createElement != null) {
          var el = Env.document.createElement('div');

          if (el != null && el.style != null) {
            el.style.position = 'fixed';
            el.style.top      = '-10px';

            var root = Env.document.body;

            if (root != null) {
              root.appendChild(el);

              isSupported = (el.offsetTop == -10);
              
              _positionFixed = Some(isSupported);

              root.removeChild(el);
            }
          }
        }

        return isSupported;
	  });
  }
  
  /** Determines if the browser supports the CSS box model.
   */
  public static function boxModel(): Bool {
    return testSupportInBody('<div style="padding: 0; margin: 0; padding-left: 1px; width: 1px;"></div>', 'div', function(e) {
      return e.offsetWidth == 2;
    });
  }
  
  /**
   * Determines if the style of an attribute can be retrieved through its 
   * getAttribute() member.
   */
  public static function getAttributeStyle(): Bool {
    return testSupport('<a style="color: black;"></a>', 'a', function(e) {
      return e.getAttribute('style').contains('black');
    });
  }
  
  /**
   * Determines if the opacity property is supported.
   */
  public static function opacity(): Bool {
    return testSupport('<a style="opacity: 0.5;"></a>', 'a', function(e) {
      var opacity = e.style.opacity;
      
      return opacity != null && ~/0.5/.match(opacity.toString());
    });
  }
  
  /**
   * Determines if the CSS 'float' property (a reserved JavaScript keyword) can
   * be accessed through 'cssFloat'.
   */
  public static function cssFloat(): Bool {
    return testSupport('<div style="float:left"></div>', 'div', function(e) {
      return e.style.cssFloat != null;
    });
  }
  
  /**
   * Determines if a checkbox's value defaults to 'on'.
   */
  public static function checkboxValueDefaultsToOn(): Bool {
    return testSupport('<input type="checkbox"/>', 'input', function(e) {
      var value: String = untyped e.value;
      
      return value.toOption().map(function(s) return ~/on/i.match(s)).getOrElseC(false);
    });
  }
  
  /**
   * Determines if an option that is selected by default has a '.select' property.
   */
  public static function defaultSelectedHasSelectProperty(): Bool {
    return testSupport('<select><option></select>', 'option', function(e) {
      return untyped e.selected != null;
    });
  }
	
	/**
	 * Determines if a node added and removed has a parentNode equal to null.
	 */
	public static function removedNodeHasNullParentNode(): Bool {
	  return testSupport('<div></div>', 'div', function(e) {
	    return e.removeChild(e.appendChild(Env.document.createElement("div"))).parentNode == null;
	  });
	}
	
	/**
	 * Determines if the getComputedStyle() function is supported.
	 */
	public static function getComputedStyle(): Bool {
	  return Env.document.defaultView != null && Env.document.defaultView.getComputedStyle != null;
	}
	
  /** Determines if offset calculations fail to include the margin of the body.
   * It's not clear from W3 if this is a bug or not.
   */
  public static function offsetDoesNotIncludeMarginInBodyOffset(): Bool {
    if (Env.document != null && Env.document.body != null) {
      return Env.document.body.into(function(body) {
        var bodyMarginTop = Quirks.getComputedCssProperty(body, "margin-top").map(function(s) return s.toInt(0)).getOrElseC(0);

        return body.offsetTop != bodyMarginTop;
      });
  	}
		
    return true;
  }
	
	/**
	 * Determines if adding an empty table element also results in the addition 
	 * of spurious <tbody> elements.
	 */
  public static function spuriousTbodyInsertedBug(): Bool {
    return testBug('<table></table>', 'tbody', function(e) return true, false);
  }
  
  /**
   * Determines if leading whitespace is dropped when used to form the 
   * innerHTML of an element.
   */
  public static function whitespaceDroppedWithInnerHTMLBug(): Bool {
    return testBug('      <div></div>', 'div', function(e) {
      return e.previousSibling == null || e.previousSibling.nodeType != NodeType.TEXT_NODE;
    });
  }
  
  /**
   * Determines if link elements are dropped when used to form the
   * innerHTML of an element.
   */
  public static function linksDroppedWithInnerHTMLBug(): Bool {
    return testBug('<link/>', 'link', function(e) return false);
  }
  
  /**
   * Determines if href's are altered by the browser (this is a bug in some versions of IE).
   */
  public static function hrefIsNormalizedBug(): Bool {
    return testBug('<a href="/a" style="color: black;"></a>', 'a', function(e) {
      return e.getAttribute('href') != '/a';
    });
  }
  
  /** Determines if offset calculations fail to include border. It's not clear 
   * from W3 if this is a bug or not.
   */
  public static function offsetDoesNotAddBorder(): Bool {
    if (Env.document != null && Env.document.body != null) {
      var container = Env.document.createElement("div").withEffect(function(container) {
        container.style.extendWith({
    		  position: "absolute", top: 0, left: 0, margin: 0, border: 0, width: "1px", height: "1px", visibility: "hidden"
    		});

    		container.innerHTML = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div>";
      });
      
      return Env.document.body.into(function(body) {
  		  body.insertBefore(container, body.firstChild);
  		  
  		  var checkDiv: HTMLElement = cast container.firstChild.firstChild;

    		return (checkDiv.offsetTop != 5).withEffect(function(_) {
    		  body.removeChild(container);
    		});
  		});
  	}
		
    return true;
  }
  
  /** Determines if offset calculations includes border for table and cells.
   * It's not clear from W3 if this is a bug or not.
   */
  public static function offsetAddsBorderForTableAndCells(): Bool {
    if (Env.document != null && Env.document.body != null) {
      var container = Env.document.createElement("div").withEffect(function(container) {
        container.style.extendWith({
    		  position: "absolute", top: 0, left: 0, margin: 0, border: 0, width: "1px", height: "1px", visibility: "hidden"
    		});

    		container.innerHTML = "<table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
      });
      
  		return Env.document.body.into(function(body) {
  		  body.insertBefore(container, body.firstChild);
  		  
  		  var td: HTMLElement = cast container.getElementsByTagName('td')[0];

    		return (td.offsetTop == 5).withEffect(function(_) {
    		  body.removeChild(container);
    		});
  		});
  	}
		
    return true;
  }
  
  /** Determines if offset calculations fail to include border when overlay is
   * set to some other value than 'visible'.
   */
  public static function offsetSubtractsBorderForOverflowNotVisible(): Bool {
    if (Env.document != null && Env.document.body != null) {
      var container = Env.document.createElement("div").withEffect(function(container) {
        container.style.extendWith({
    		  position: "absolute", top: 0, left: 0, margin: 0, border: 0, width: "1px", height: "1px", visibility: "hidden"
    		});

    		container.innerHTML = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div>";
      });
      
      return Env.document.body.into(function(body) {
  		  body.insertBefore(container, body.firstChild);
  		  
  		  var innerDiv: HTMLElement = cast container.firstChild;

    		innerDiv.style.extendWith({
    		  overflow: "hidden",
    		  position: "relative"
    		});
    		
    		var checkDiv: HTMLElement = cast innerDiv.firstChild;

    		return (checkDiv.offsetTop == -5).withEffect(function(_) {
    		  body.removeChild(container);
    		});
  		});
  	}
		
    return true;
  }
  
  private static function testSupport(contents: String, tagName: String, f: HTMLElement -> Bool, def: Bool = false): Bool {
	  return test(contents, tagName, f, true, def);
	}
	
	private static function testSupportInBody(contents: String, tagName: String, f: HTMLElement -> Bool, def: Bool = false): Bool {
	  return testInBody(contents, tagName, f, true, def);
	}
	
	private static function testBug(contents: String, tagName: String, f: HTMLElement -> Bool, def: Bool = true): Bool {
	  return test(contents, tagName, f, false, def);
	}
	
	private static function testBugInBody(contents: String, tagName: String, f: HTMLElement -> Bool, def: Bool = true): Bool {
	  return testInBody(contents, tagName, f, false, def);
	}
	
	private static function test(contents: String, tagName: String, f: HTMLElement -> Bool, def1: Bool, def2: Bool): Bool {
	  return if (Env.document == null) def1;
	  else {
	    var div = Env.document.createElement('div');
	    
	    div.style.display = 'none';
	    div.innerHTML = contents;
	    
	    div.getElementsByTagName(tagName).toArray().firstOption().map(f).getOrElseC(def2);
	  }
	}
	
	private static function testInBody(contents: String, tagName: String, f: HTMLElement -> Bool, def1: Bool, def2: Bool): Bool {
	  return if (Env.document == null || Env.document.body == null) def1;
	  else {
	    var div = Env.document.createElement('div');
	    
	    //div.style.display = 'none';
	    div.innerHTML = contents;
	    
	    Env.document.body.insertBefore(div, Env.document.body.firstChild);
	    
	    div.getElementsByTagName(tagName).toArray().firstOption().map(f).getOrElseC(def2).withEffect(function(_) {
	      Env.document.body.removeChild(div);
	      
	      div.style.display = 'none';
	    });
	  }
	}
}