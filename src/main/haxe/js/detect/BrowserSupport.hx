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
import haxe.data.collections.Map;
import PreludeExtensions;

using PreludeExtensions;
using js.dom.DomExtensions;
using haxe.util.ObjectExtensions;


/** Feature detection library */
// windowEvalEvaluatesInGlobalScope
class BrowserSupport {
  static var memorized = Map.create(String.HasherT(), String.EqualT(), Bool.HasherT(), Bool.EqualT());

  /**
   * Determines if the browser supports "css transformation".
   */
	public static function cssTransformationSupported(): Bool {
    return testFeatureAndMemorize("cssTransformationSupported", function(v){
      var isSupported = None;
      var docEl = Env.document.documentElement;
      if (docEl != null ) {
        var s = docEl.style;
        isSupported = Some(Env.isDefined(untyped s.WebkitTransform) || Env.isDefined(untyped s.MozTransform));
      }
      return isSupported;
    });
  }
  /**
   * Determines if the browser supports "element tagname" is uppercased. The document must
   * have a body for the detection to be accurate.
   */
	public static function elementTagnameUppercased(): Bool {
	  return testFeatureAndMemorize("elementTagnameUppercased", function(v) {
      var isUppercased = None;
      var docEl = Env.document.documentElement;
      if (docEl != null) {
        isUppercased = Some('HTML' == docEl.nodeName);
      }

      return isUppercased;
	  });
  }
  /**
   * Determines if the browser supports "element tagname" is uppercased. The document must
   * have a body for the detection to be accurate.
   */
	public static function querySelectorIgnoresCapitalizedValuesBug(): Bool {
    return testBugAndMemorize("querySelectorIgnoresCapitalizedValuesBug", function(v){
      var result = None;
      if (Env.document.createElement != null && (Env.document.compatMode == 'BackCompat')) {
        var el  = Env.document.createElement('div');
        var el2 = Env.document.createElement('span');
        if (el != null && el2 != null && untyped el.querySelector != null) {
          el2.className = 'Test';
          el.appendChild(el2);
          result = untyped Some((el.querySelector('.Test') != null));
        }
      }
      return result;
    });
  }

  /**
   * Determines if the event has property  "srcElement". The document must
   * have a body for the detection to be accurate.
   */
	public static function isEventSrcelementPresent(): Bool {
    return testFeatureAndMemorize("isEventSrcelementPresent", function(v) {
        var isSupported = None;
        if (Env.document.createElement != null) {
        var i    = Env.document.createElement('input');
        var root = Env.document.documentElement;
        if (i != null && i.style != null && i.click != null && root != null && root.appendChild != null && root.removeChild != null ) {
          untyped i.type = 'checkbox';
          i.style.display = 'none';
          i.onclick = function(e) {
            if (Env.typeOf(e) == 'object') {
						  isSupported = Some(Env.isDefined(untyped e.srcElement));
					  }
					  else{
						  isSupported = Some(false);
					  }
          };
          root.appendChild(i);
          i.click();
          root.removeChild(i);
          i.onclick = null;
          i = null;
        }
      }
      return isSupported;
    });
  }
  /**
   * Determines if the document element has property "hasAttribute". The document must
   * have a body for the detection to be accurate.
   */
	public static function isNativeHasAttributePresent(): Bool {
    return testFeatureAndMemorize("isNativeHasAttributePresent", function(v) {
      var isSupported = None;
      if (Env.document.createElement != null) {
        var i       = Env.document.createElement('iframe');
        var root    = Env.document.documentElement;
        var frames  = Env.window.frames;
        if (root != null && root.appendChild != null && root.removeChild != null ) {
          i.style.display = 'none';
          root.appendChild(i);
          // some clients (e.g. Blackberry 9000 (Bold)) throw error when accesing frame's document
          try {
            var frame = frames[frames.length-1];
            if (frame != null) {
              var doc: HTMLDocument = cast frame.document;
              if (doc != null && doc.write != null ) {
                doc.write('<html><head><title></title></head><body></body></html>');
                if (doc.documentElement != null){
                  isSupported = Some(Env.isDefined(untyped doc.documentElement.hasAttribute));
                }
                else{
                  isSupported = Some(false);
                }
                root.removeChild(i);
                i = null;
              }
            }
          } catch(e: Dynamic) {
            isSupported = Some(false);
          }
        }
      }
      return isSupported;
    });
  }
  /**
   * Determines if the document element supports "context menu". The document must
   * have a body for the detection to be accurate.
   */
	public static function isContextMenuEventSupported(): Bool {
    return testFeatureAndMemorize("isContextMenuEventSupported", function(v) {
      var isPresent = None;
      if (Env.document.createElement != null) {
        var el = Env.document.createElement('p');
        if (el != null && el.setAttribute != null) {
          el.setAttribute('oncontextmenu', '');
          isPresent = Some(Env.isDefined(el.oncontextmenu));
        }
      }
      return isPresent;
    });
  }

  /**
   * Determines if the computed style returns values for staticly positioned elements. The document must
   * have a body for the detection to be accurate.
   */
	public static function computedStyleReturnsValuesForStaticlyPositionedElements(): Bool {
    return testFeatureAndMemorize("computedStyleReturnsValuesForStaticlyPositionedElements", function(v) {
      var result = None;
      var view = Env.document.defaultView;
      if (view != null && view.getComputedStyle != null) {
        var docEl = Env.document.documentElement;
        var position = null;
        var positionPriority = null;
        var style: CSSInlineStyleDeclaration = cast view.getComputedStyle(docEl, null);
        // if element is not statically positioned, make it as such, then restore
        if (style.position != 'static') {
          position = style.position;
          var docElStyle: CSSInlineStyleDeclaration = cast docEl.style;
          docElStyle.position = '';
        }
        var computedStyle: CSSInlineStyleDeclaration = cast view.getComputedStyle(docEl, null);
        result = Some(computedStyle.left != 'auto');
        if (position != null) {
          var docElStyle: CSSInlineStyleDeclaration = cast docEl.style;
          docElStyle.position = position;
        }
      }

      return result;
    });
  }

	public static function isRgbaSupported(): Bool {
    return testFeatureAndMemorize("isRgbaSupported", function(v) {
      var result = None;
      if (Env.document.createElement != null) {
        var value = 'rgba(1,1,1,0.5)';
        var el = Env.document.createElement('p');
        var re = untyped __js__('/^rgba/');
        if (el != null && el.style != null && Env.typeOf(untyped re.test) == 'function') {
          try {
            el.style.color = value;
            result = Some(re.test(el.style.color));
          }
          catch(e: Dynamic) {
            result = Some(false);
          }
        }
      }
      return result;
    });
  }
	public static function isCssBorderRadiusSupported(): Bool {
    return testFeatureAndMemorize("isCssBorderRadiusSupported", function(v) {
      var result = None;
      var docEl = Env.document.documentElement;
      if (docEl != null ) {
        var s = docEl.style;
        result = Some((Env.typeOf(untyped s.borderRadius) == 'string'
          || Env.typeOf(untyped s.MozBorderRadius) == 'string'
          || Env.typeOf(untyped s.WebkitBorderRadius) == 'string'
          || Env.typeOf(untyped s.KhtmlBorderRadius) == 'string'));
      }
      return result;
    });
  }

	public static function elemenChildrenReturnsElementNodes(): Bool {
    return testFeatureAndMemorize("elemenChildrenReturnsElementNodes", function(v) {
      var isSupported = None;
      var docEl = Env.document.documentElement;
      if (Env.document.createElement != null && Env.isDefined(untyped docEl.children)) {
        var el = Env.document.createElement('div');
        el.innerHTML = '<div><p>a</p></div>b<!-- x -->';
        // Safari 2.x returns ALL elements in `children`
        // We check that first element is a DIV and that it's the only one element returned
        isSupported = untyped Some((el.children &&
          el.children.length == 1 &&
          el.children[0] &&
          el.children[0].tagName &&
          el.children[0].tagName.toUpperCase() == 'DIV'));
      }
      return isSupported;
    });
  }

	public static function isCanvasSupported(): Bool {
    return testFeatureAndMemorize("isCanvasSupported", function(v) {
      var result = None;
      if (Env.document.createElement != null) {
        var elCanvas = Env.document.createElement('canvas');
        result = Some(!!(elCanvas != null && untyped elCanvas.getContext != null && untyped elCanvas.getContext('2d') != null));
      }
      return result;
    });
  }

   /**
   * Determines if the browser supports "position: fixed". The document must
   * have a body for the detection to be accurate.
   */
	public static function positionFixed(): Bool {
	  return testFeatureAndMemorize("positionFixed", function(v) {
  	    var isSupported = None;

        if (Env.document.createElement != null) {
          var el = Env.document.createElement('div');

          if (el != null && el.style != null) {
            el.style.position = 'fixed';
            el.style.top      = '-10px';

            var root = Env.document.body;

            if (root != null) {
              root.appendChild(el);

              isSupported = Some(el.offsetTop == -10);

              root.removeChild(el);
            }
          }
        }

        return isSupported;
	  });
  }

  public static function isCssEnabled(): Bool {
    return testFeatureAndMemorize("isCssEnabled", function(v) {
      var isSupported = None;
      var body = Env.document.body;
      if (Env.document.createElement != null &&
              body != null &&
              body.appendChild != null &&
              body.removeChild != null) {
            var el = Env.document.createElement('div');
            if (el != null && el.style != null) {
              untyped el.style.display = 'none';
              body.appendChild(el);
              isSupported = Some(el.offsetWidth == 0);
              body.removeChild(el);
            }
          }
      return isSupported;
    });
  }

  public static function isQuirksMode(): Bool {
    return testFeatureAndMemorize("isQuirksMode", function(v) {
      var result = None;
      if (Env.document.createElement != null) {
        var el = Env.document.createElement('div');
        if (el != null && el.style != null) {
          var style: CSSInlineStyleDeclaration = cast el.style;
          style.width = '1';
        }
        var style: CSSInlineStyleDeclaration = cast el.style;
        result = Some(style.width == '1px');
      }
      return result;
    });
  }

  public static function isContainsBuggy(): Bool {
    return testBugAndMemorize("isContainsBuggy", function(v) {
      var result = None;
      if (Env.document.createElement != null) {
        var el1 = Env.document.createElement('div'),
            el2 = Env.document.createElement('div');
        if (el1 != null && el2 != null && Env.isDefined(untyped el1.contains)) {
          result = untyped Some(el1.contains(el2));
        }
      }
      return result;
    });
  }

  public static function isActivexEnabled(): Bool {
    return testFeatureAndMemorize("isActivexEnabled", function(v) {
      var result = Some(false);
      untyped if (window.ActiveXObject){
        var xmlVersions = [
          'Microsoft.XMLHTTP',
          'Msxml2.XMLHTTP.3.0',
          'Msxml2.XMLHTTP.4.0',
          'Msxml2.XMLHTTP.5.0',
          'Msxml2.XMLHTTP.6.0'
        ];
        for (value in xmlVersions) {
          try {
            if (untyped __new__("ActiveXObject",value) != null) {
              result = Some(true);
            }
          }
          catch(ex: Dynamic ) {  }
        }
        result = Some(result.getOrElseC(false));
      }
      return result;
    });
  }

  public static function typeofNodelistIsFunctionBug(): Bool {
    return testBugAndMemorize("typeofNodelistIsFunctionBug", function(v) {
      var result = None;
      if (Env.document.forms != null) {
        result = Some(Env.typeOf(Env.document.forms) == 'function');
      }
      return result;
    });
  }
  public static function getElementsByTagNameReturnsCommentNodesBug(): Bool {
    return testBugAndMemorize("getElementsByTagNameReturnsCommentNodesBug", function(v) {
      var result = None;
      if (Env.document.createElement != null) {
        var el = Env.document.createElement('div');
        if (el != null && el.getElementsByTagName != null) {
          el.innerHTML = '<span>a</span><!--b-->';
          var all = el.getElementsByTagName('*');
          // IE5.5 returns a 0-length collection when calling getElementsByTagName with wildcard
          if (all.length != null) {
            var lastNode = el.getElementsByTagName('*')[1];
            result = Some(!!(lastNode != null && lastNode.nodeType == 8));
          }
        }
      }
      return result;
    });
  }
  public static function setAttributeIgnoresNameAttributeBug(): Bool {
    return testBugAndMemorize("setAttributeIgnoresNameAttributeBug", function(v) {
      var result = None;
      if (Env.document.createElement != null) {
            var elForm = Env.document.createElement('form');
            var elInput = Env.document.createElement('input');
            var root = Env.document.documentElement;
            if (elForm != null &&
                elInput != null &&
                elInput.setAttribute != null &&
                elForm.appendChild != null &&
                root != null &&
                root.appendChild != null &&
                root.removeChild != null) {
              elInput.setAttribute('name', 'test');
              elForm.appendChild(elInput);
              // Older Safari (e.g. 2.0.2) populates "elements" collection only when form is within a document
              root.appendChild(elForm);
              untyped if (elForm.elements != null ){
                result = Some(Env.typeOf(untyped elForm.elements['test']) == 'undefined');
              }
              else {result = Some(true);}
              root.removeChild(elForm);
            }
          }
      return result;
    });
  }

  public static function elementPropertiesAreAttributesBug(): Bool {
    return testBugAndMemorize("elementPropertiesAreAttributesBug", function(v) {
      var result = None;
      if (Env.document.createElement != null) {
        var el = Env.document.createElement('div');
        if (el != null && el.getAttribute != null) {
          untyped __js__("el.__foo = 'bar'");
          result = Some(el.getAttribute('__foo') == 'bar');
          el = null;
        }
      }
      return result;
    });
  }

  public static function isRegexpWhitespaceCharacterClassBug(): Bool {
    return testBugAndMemorize("isRegexpWhitespaceCharacterClassBug", function(v) {
      var result = None;
      untyped __js__("var str = '\\u0009\\u000A\\u000B\\u000C\\u000D\\u0020\\u00A0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029'");
      result = untyped Some(__js__("!/^\\s+$/.test(str)"));
      return result;
    });
  }

  public static function isStringPrototypeSplitRegexpBug(): Bool {
    return testBugAndMemorize("isStringPrototypeSplitRegexpBug", function(v) {
      var s = 'a_b';
      return untyped Some(__js__("s.split(/(_)/).length != 3"));
    });
  }

  public static function preElementsIgnoreNewLinesBug(): Bool {
    return testBugAndMemorize("preElementsIgnoreNewLinesBug", function(v) {
      var result = None;
      if (Env.document.createElement != null && Env.document.createTextNode != null) {
        var el = Env.document.createElement('pre');
        var txt = Env.document.createTextNode('xx');
        var root = Env.document.documentElement;
        if (el != null &&
            el.appendChild != null &&
            txt != null &&
            root != null &&
            root.appendChild != null &&
            root.removeChild != null) {
          el.appendChild(txt);
          root.appendChild(el);
          var initialHeight = el.offsetHeight;
          el.firstChild.nodeValue = 'x\nx';
          // check if `offsetHeight` changed after adding '\n' to the value
          var isIgnored = (el.offsetHeight == initialHeight);
          root.removeChild(el);
          el = txt = null;
          result = Some(isIgnored);
        }
      }
      return result;
    });
  }

  public static function selectElementInnerHtmlBug(): Bool {
    return testBugAndMemorize("selectElementInnerHtmlBug", function(v) {
      var result = None;
      if (Env.document.createElement != null) {
        var el = Env.document.createElement('select');
        if (el != null) {
          el.innerHTML = '<option value="test">test</option>';
          untyped if (el.options != null && el.options[0] != null) {
            result = Some(el.options[0].nodeName.toUpperCase() != 'OPTION');
          }
          el = null;
        }
      }
      return result;
    });
  }

  public static function tableElementInnerHtmlBug(): Bool {
    return testBugAndMemorize("tableElementInnerHtmlBug", function(v) {
      var result = None;
      if (Env.document.createElement != null) {
        try {
          var el = Env.document.createElement('table');
          if (el != null && untyped el.tBodies != null) {
            el.innerHTML = '<tbody><tr><td>test</td></tr></tbody>';
            result = Some(Env.typeOf(untyped el.tBodies[0]) == 'undefined');
            el = null;
          }
        } catch(e: Dynamic) {
          result = Some(true);
        }
      }
      return result;
    });
  }

  public static function scriptElementRejectsTextNodeAppendingBug(): Bool {
    return testBugAndMemorize("scriptElementRejectsTextNodeAppendingBug", function(v) {
      var result = None;
      if (Env.document.createElement != null && Env.document.createTextNode != null) {
        var s = Env.document.createElement('script');
        if (s != null && s.appendChild != null) {
          try {
            s.appendChild(Env.document.createTextNode(''));
            result = Some((s.firstChild == null) || (s.firstChild != null && s.firstChild.nodeType != 3));
          } catch(e: Dynamic) {
            result = Some(true);
          }
          s = null;
        }
      }
      return result;
    });
  }

  public static function documentGetElementByIdConfusesIdsWithNamesBug(): Bool {
    return testBugAndMemorize("documentGetElementByIdConfusesIdsWithNamesBug", function(v) {
      var result = Some(false);
      if (Env.document.getElementsByTagName != null && Env.document.createElement != null) {
        // need to feature test all these DOM methods before calling them
        var num = Date.now().getTime();
        var name = '__test_' + num;
        var head = Env.document.getElementsByTagName('head')[0];
        var el;
        try {
          el = Env.document.createElement('<input name="'+ name +'">');
        } catch(e: Dynamic) {
          el = Env.document.createElement('input');
          untyped el.name = name;
        }
        if (head.appendChild != null && head.removeChild != null) {
          head.appendChild(el);
          var testElement = Env.document.getElementById(name);
          result = Some(!!((testElement != null) && (testElement.nodeName.toUpperCase() == 'INPUT')));
          head.removeChild(el);
          el = null;
        }
      }
      return result;
    });
  }

  public static function documentGetElementByIdIgnoresCaseBug(): Bool {
    return testBugAndMemorize("documentGetElementByIdIgnoresCaseBug", function(v) {
      var result = None;
      if (Env.document.createElement != null && Env.document.getElementsByTagName != null && Env.document.getElementById != null) {
        var el = Env.document.createElement('script');
        var head = Env.document.getElementsByTagName('head')[0];
        if (el != null && head != null && head.appendChild != null && head.removeChild != null) {
          untyped el.type = 'text/javascript';
          el.id = 'A';
          head.appendChild(el);
          result = Some(!!(Env.document.getElementById('a') != null));
          head.removeChild(el);
          el = null;
        }
      }
      return result;
    });
  }

  public static function offsetValuesForStaticElementsInsidePositionedOnesBug(): Bool {
    return testBugAndMemorize("offsetValuesForStaticElementsInsidePositionedOnesBug", function(v) {
      var result = None;
      var body = Env.document.body;
      if (body != null &&
          body.insertBefore != null &&
          Env.document.createElement != null &&
          Env.document.getElementById != null) {
        var id = 'x' + (Math.random() + '').substr(2);
        var clearance = "margin:0;padding:0;border:0;visibility:hidden;";
        var payload = '<div style="position:absolute;top:10px;' + clearance + '">'+
          '<div style="position:relative;top:10px;' + clearance + '">'+
            '<div style="height:10px;font-size:1px;' + clearance + '"></div>'+
            '<div id="'+id+'">x</div>'+
          '</div>'+
        '</div>';
        var wrapper = Env.document.createElement('div');
        if (wrapper != null) {
          wrapper.innerHTML = payload;
          body.insertBefore(wrapper, body.firstChild);
          var el = Env.document.getElementById(id);
          if (el != null && el.style != null) {
            if (el.offsetTop != 10) {
              // buggy, set position to relative and check if it fixes it
              el.style.position = 'relative';
              if (el.offsetTop == 10) {
                result = Some(true);
              }
            }
            else {
              result = Some(false);
            }
          }
          body.removeChild(wrapper);
        }
        wrapper = null;
      }
      return result;
    });
  }

  public static function isDocumentGetElementsByNameBug(): Bool {
    return testBugAndMemorize("isDocumentGetElementsByNameBug", function(v) {
      var result = None;
      var docEl = Env.document.documentElement;
      if (docEl != null &&
          docEl.appendChild != null &&
          docEl.removeChild != null &&
          Env.document.getElementsByName != null &&
          Env.document.createElement != null) {
        var el = Env.document.createElement('div');
        if (el != null) {
          var uid = 'x' + (Math.random() + '').substr(2);
          el.id = uid;
          docEl.appendChild(el);
          result = Some(Env.document.getElementsByName(uid)[0] == el);
          docEl.removeChild(el);
        }
      }
      return result;
    });
  }

  public static function isOverflowStyleBug(): Bool {
    return testBugAndMemorize("isOverflowStyleBug", function(v) {
      var result = None;
      if (Env.document.createElement != null) {
        var el = Env.document.createElement('div');
        el.innerHTML = '<p style="overflow: visible;">x</p>';
        var firstChild = el.firstChild;
        if (firstChild != null && firstChild.style != null) {
          var style: CSSInlineStyleDeclaration = cast firstChild.style;
          style.overflow = 'hidden';
          result = Some(style.overflow != 'hidden');
        }
        el = null;
        firstChild = null;
      }
      return result;
    });
  }

  public static function isQuerySelectorAllBug(): Bool {
    return testBugAndMemorize("isQuerySelectorAllBug", function(v) {
      var result = None;
      if (Env.document.createElement != null) {
        var el = Env.document.createElement('div');
        if (el != null && untyped (el.querySelectorAll != null)) {
          el.innerHTML = '<object><param name=""></object>';
          untyped result = Some(el.querySelectorAll("param").length != 1);
        }
        el = null;
      }
      return result;
    });
  }
  public static function html5Audio(): Bool {
    return testFeatureAndMemorize("html5Audio", function(v) {
      var result = None;
      if (Env.document.createElement != null) {
        var el = Env.document.createElement('audio');
        result = untyped Some(!!el.canPlayType);
        el = null;
      }
      return result;
    });
  }

  public static function html5AudioInMP3Format(): Bool {
    return testFeatureAndMemorize("html5AudioInMP3Format", function(v) {
      return canPlayType('audio', 'audio/mpeg;');
    });
  }
  public static function html5AudioInVorbisFormat(): Bool {
    return testFeatureAndMemorize("html5AudioInVorbisFormat", function(v) {
      return canPlayType('audio', 'audio/ogg; codecs="vorbis"');
    });
  }
  public static function html5AudioInWavFormat(): Bool {
    return testFeatureAndMemorize("html5AudioInWavFormat", function(v) {
      return  canPlayType('audio', 'audio/wav; codecs="1"');
    });
  }
  public static function html5AudioInAACFormat(): Bool {
    return testFeatureAndMemorize("html5AudioInAACFormat", function(v) {
      return canPlayType('audio', 'audio/mp4; codecs="mp4a.40.2"');
    });
  }
  private static function canPlayType(element: String, format: String): Option<Bool> {
    var result = None;
    if (Env.document.createElement != null) {
      var a = Env.document.createElement(element);
      result = untyped Some(!!(a.canPlayType && a.canPlayType(format).replace('no', '') != ""));
      a = null;
    }
    return result;
  }
  public static function html5Canvas(): Bool {
    return testFeatureAndMemorize("html5Canvas", function(v) {
      var result = None;
      if (Env.document.createElement != null) {
        var a = Env.document.createElement('canvas');
        result = untyped Some(!!a.getContext);
        a = null;
      }
      return result;
    });
  }
  public static function html5CanvasTextAPI(): Bool {
    return testFeatureAndMemorize("html5CanvasTextAPI", function(v) {
      var result = None;
      if (Env.document.createElement != null) {
        var c = Env.document.createElement('canvas');
        result = untyped Some(c.getContext && Env.typeOf(c.getContext('2d').fillText) == 'function');
        c = null;
      }
      return result;
    });
  }
  public static function html5Command(): Bool {
    return testFeatureAndMemorize("html5Command", function(v) {
      return checIfExist('command', 'type');
    });
  }
  public static function html5Datalist(): Bool {
    return testFeatureAndMemorize("html5Datalist", function(v) {
      return checIfExist('datalist', 'options');
    });
  }
  public static function html5Details(): Bool {
    return testFeatureAndMemorize("html5Details", function(v) {
      return checIfExist('details', 'open');
    });
  }
  public static function html5Device(): Bool {
    return testFeatureAndMemorize("html5Device", function(v) {
      return checIfExist('device', 'type');
    });
  }
  public static function html5FormConstraintValidation(): Bool {
    return testFeatureAndMemorize("html5FormConstraintValidation", function(v) {
      return checIfExist('form', 'noValidate');
    });
  }
  public static function html5IframeSandbox(): Bool {
    return testFeatureAndMemorize("html5IframeSandbox", function(v) {
      return checIfExist('iframe', 'sandbox');
    });
  }
  public static function html5IframeSrcdoc(): Bool {
    return testFeatureAndMemorize("html5IframeSrcdoc", function(v) {
      return checIfExist('iframe', 'srcdoc');
    });
  }
  public static function html5InputAutofocus(): Bool {
    return testFeatureAndMemorize("html5InputAutofocus", function(v) {
      return checIfExist('input', 'autofocus');
    });
  }
  public static function html5InputPlaceholder(): Bool {
    return testFeatureAndMemorize("html5InputPlaceholder", function(v) {
      return checIfExist('input', 'placeholder');
    });
  }
  public static function html5InputTypeColor(): Bool {
    return testFeatureAndMemorize("html5InputTypeColor", function(v) {
      return checIputTypeProperty('color');
    });
  }
  public static function html5InputTypeEmail(): Bool {
    return testFeatureAndMemorize("html5InputTypeEmail", function(v) {
      return checIputTypeProperty('email');
    });
  }
  public static function html5InputTypeNumber(): Bool {
    return testFeatureAndMemorize("html5InputTypeNumber", function(v) {
      return checIputTypeProperty('range');
    });
  }
  public static function html5InputTypeRange(): Bool {
    return testFeatureAndMemorize("html5InputTypeRange", function(v) {
      return checIputTypeProperty('color');
    });
  }
  public static function html5InputTypeSearch(): Bool {
    return testFeatureAndMemorize("html5InputTypeSearch", function(v) {
      return checIputTypeProperty('search');
    });
  }
  public static function html5InputTypeTel(): Bool {
    return testFeatureAndMemorize("html5InputTypeTel", function(v) {
      return checIputTypeProperty('tel');
    });
  }
  public static function html5InputTypeUrl(): Bool {
    return testFeatureAndMemorize("html5InputTypeUrl", function(v) {
      return checIputTypeProperty('url');
    });
  }
  public static function html5InputTypeDate(): Bool {
    return testFeatureAndMemorize("html5InputTypeDate", function(v) {
      return checIputTypeProperty('date');
    });
  }
  public static function html5InputTypeTime(): Bool {
    return testFeatureAndMemorize("html5InputTypeTime", function(v) {
      return checIputTypeProperty('time');
    });
  }
  public static function html5InputTypeDatetime(): Bool {
    return testFeatureAndMemorize("html5InputTypeDatetime", function(v) {
      return checIputTypeProperty('datetime');
    });
  }
  public static function html5InputTypeDatetimeLocal(): Bool {
    return testFeatureAndMemorize("html5InputTypeDatetimeLocal", function(v) {
      return checIputTypeProperty('datetime-local');
    });
  }
  public static function html5InputTypeWeek(): Bool {
    return testFeatureAndMemorize("html5InputTypeWeek", function(v) {
      return checIputTypeProperty('week');
    });
  }
  public static function html5InputTypeMonth(): Bool {
    return testFeatureAndMemorize("html5InputTypeMonth", function(v) {
      return checIputTypeProperty('month');
    });
  }

  public static function html5Meter(): Bool {
    return testFeatureAndMemorize("html5Meter", function(v) {
      return checIfExist('meter', 'value');
    });
  }
  public static function html5Output(): Bool {
    return testFeatureAndMemorize("html5Output", function(v) {
      return checIfExist('output', 'value');
    });
  }
  public static function html5Progress(): Bool {
    return testFeatureAndMemorize("html5Progress", function(v) {
      return checIfExist('value', 'progress');
    });
  }
  public static function html5Time(): Bool {
    return testFeatureAndMemorize("html5Time", function(v) {
      return checIfExist('time', 'valueAsDate');
    });
  }

  public static function html5Video(): Bool {
    return testFeatureAndMemorize("html5Video", function(v) {
      var result = None;
      if (Env.document.createElement != null) {
        var el = Env.document.createElement('video');
        result = Some(untyped !!el.canPlayType);
        el = null;
      }
      return result;
    });
  }

  public static function html5VideoCaptions(): Bool {
    return testFeatureAndMemorize("html5VideoCaptions", function(v) {
      return checIfExist('track', 'track');
    });
  }

  public static function html5VideoPoster(): Bool {
    return testFeatureAndMemorize("html5VideoPoster", function(v) {
      return checIfExist('track', 'poster');
    });
  }

  private static function checIfExist(elementName: String, property: String): Option<Bool>{
    var result = None;
    if (Env.document.createElement != null) {
      var c = Env.document.createElement(elementName);
      result = Some(Env.typeOf(untyped c[property]) != 'undefined');
      c = null;
    }
    return result;
  }
  private static function checIputTypeProperty(type: String): Option<Bool>{
    var result = None;
    if (Env.document.createElement != null) {
      var i = Env.document.createElement("input");
      i.setAttribute('type', type);
      result = untyped Some(i.type != 'text');
      i = null;
    }
    return result;
  }
  public static function html5VidouInWebMFormat(): Bool {
    return testFeatureAndMemorize("html5VidouInWebMFormat", function(v) {
      return canPlayType('video', 'video/webm; codecs="vp8, vorbis"');
    });
  }
  public static function html5VidouInH264Format(): Bool {
    return testFeatureAndMemorize("html5VidouInH264Format", function(v) {
      return canPlayType('video', 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
    });
  }
  public static function html5VidouInTheoraFormat(): Bool {
    return testFeatureAndMemorize("html5VidouInTheoraFormat", function(v) {
      return canPlayType('video', 'video/ogg; codecs="theora, vorbis"');
    });
  }
  public static function html5ContentEditable(): Bool {
    return testFeatureAndMemorize("html5ContentEditable", function(v) {
      return checIfExist('span', 'isContentEditable');
    });
  }
  public static function html5CrossDocumentMessaging(): Bool {
    return Env.isDefined(Env.window.postMessage);
  }
  public static function html5DragAndDrop(): Bool {
    return testFeatureAndMemorize("html5DragAndDrop", function(v) {
      return checIfExist('span', 'draggable');
    });
  }
  public static function html5FileApi(): Bool {
    try{
      return Env.isDefined(untyped FileReader);
    }
    catch (e: Dynamic){
      return false;
    }
  }
  public static function html5Geolocation(): Bool {
    return Env.isDefined(Env.navigator.geolocation);
  }
  public static function html5History(): Bool {
    return (Env.isDefined(Env.window.history) && Env.isDefined(Env.window.history.pushState) && Env.isDefined(untyped Env.window.history.popState));
  }
  public static function html5LocalStorage(): Bool {
    return untyped ((Env.typeOf(Env.window["localStorage"]) != 'undefined') && Env.window["localStorage"] != null);
  }
  public static function html5Microdata(): Bool {
    return Env.isDefined(untyped Env.document.getItems);
  }
  public static function html5OfflineWebApplications(): Bool {
    return Env.isDefined(untyped Env.window.applicationCache);
  }
  public static function html5ServerSentEvents(): Bool {
    try{
      return Env.isDefined(untyped __js__("EventSource"));
    }
    catch (e: Dynamic){
      return false;
    }
  }
  public static function html5SessionStorage(): Bool {
    try{
      return untyped ((Env.typeOf(untyped Env.window["sessionStorage"]) != 'undefined') && Env.window["sessionStorage"] != null);
    }
    catch (e: Dynamic){
      return false;
    }
  }
  public static function html5SVG(): Bool {
    return (Env.document.createElementNS != null) && (untyped Env.document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect != null);
  }
  public static function html5SVGInTextHtml(): Bool {
      return testFeatureAndMemorize("html5SVGInTextHtml", function(v) {
      var result = None;
      if (Env.document.createElement != null) {
        var e = Env.document.createElement("div");
        e.innerHTML = '<svg></svg>';
        result = untyped Some(!!((Env.window.SVGSVGElement != null) && (Std.is(e.firstChild, Env.window.SVGSVGElement))));
        e = null;
      }
      return result;
    });
  }
  public static function html5WebSimpleDB(): Bool {
    return Env.isDefined(untyped Env.window.indexedDB);
  }
  public static function html5WebSocket(): Bool {
    return Env.isDefined(untyped Env.window.WebSocket);
  }
  public static function html5WebSQLDatabase(): Bool {
    return Env.isDefined(untyped Env.window.openDatabase);
  }
  public static function html5WebWorkers(): Bool {
    return Env.isDefined(untyped Env.window.Worker);
  }
  public static function html5Widgets(): Bool {
    try{
      return Env.isDefined(untyped __js__("widget"));
    }
    catch (e: Dynamic){
      return false;
    }
  }
  public static function html5Undo(): Bool {
    try{
      return Env.isDefined(untyped __js__("UndoManager"));
    }
    catch (e: Dynamic){
      return false;
    }
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
      var styleAttribute =  e.getAttribute('style');
      if (Env.typeOf(styleAttribute) == 'string'){
        return styleAttribute.contains("black");
      }
      else if (Env.typeOf(styleAttribute) == 'object'){
        return untyped styleAttribute.cssText.contains("black");
      }
      else{return false;}
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
    return testFeatureAndMemorize("offsetDoesNotIncludeMarginInBodyOffset", function(v) {
      if (Env.document != null && Env.document.body != null) {
        return Env.document.body.into(function(body) {
          var bodyMarginTop = Quirks.getComputedCssProperty(body, "margin-top").map(function(s) return s.toInt(0)).getOrElseC(0);

          return Some(body.offsetTop != bodyMarginTop);
        });
      }

      return None;
    });
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
    return testFeatureAndMemorize("offsetDoesNotAddBorder", function(v) {
      if (Env.document != null && Env.document.body != null) {
        var container = Env.document.createElement("div").withEffect(function(container) {
          container.style.extendWith({
            position: "absolute", top: 0, left: 0, margin: 0, border: 0, width: "1px", height: "1px", visibility: "hidden"
          });

          container.innerHTML = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div>";
        });

        return Some(Env.document.body.into(function(body) {
          body.insertBefore(container, body.firstChild);

          var checkDiv: HTMLElement = cast container.firstChild.firstChild;

          return (checkDiv.offsetTop != 5).withEffect(function(_) {
            body.removeChild(container);
          });
        }));
      }

      return None;
    });
  }

  /** Determines if offset calculations includes border for table and cells.
   * It's not clear from W3 if this is a bug or not.
   */
  public static function offsetAddsBorderForTableAndCells(): Bool {
    return testFeatureAndMemorize("offsetAddsBorderForTableAndCells", function(v) {
      if (Env.document != null && Env.document.body != null) {
        var container = Env.document.createElement("div").withEffect(function(container) {
          container.style.extendWith({
            position: "absolute", top: 0, left: 0, margin: 0, border: 0, width: "1px", height: "1px", visibility: "hidden"
          });

          container.innerHTML = "<table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
        });

        return Some(Env.document.body.into(function(body) {
          body.insertBefore(container, body.firstChild);

          var td: HTMLElement = cast container.getElementsByTagName('td')[0];

          return (td.offsetTop == 5).withEffect(function(_) {
            body.removeChild(container);
          });
        }));
      }
      return None;
    });
  }

  /** Determines if offset calculations fail to include border when overlay is
   * set to some other value than 'visible'.
   */
  public static function offsetSubtractsBorderForOverflowNotVisible(): Bool {
    return testFeatureAndMemorize("offsetSubtractsBorderForOverflowNotVisible", function(v) {
      if (Env.document != null && Env.document.body != null) {
        var container = Env.document.createElement("div").withEffect(function(container) {
          container.style.extendWith({
            position: "absolute", top: 0, left: 0, margin: 0, border: 0, width: "1px", height: "1px", visibility: "hidden"
          });

          container.innerHTML = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div>";
        });

        return Some(Env.document.body.into(function(body) {
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
        }));
      }

      return None;
    });
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
  return testAndMemorize("testInBody" + contents + tagName, def1, function(v) {
      return if (Env.document == null) None;
      else {
        var div = Env.document.createElement('div');

        div.style.display = 'none';
        div.innerHTML = contents;

        Some(div.getElementsByTagName(tagName).toArray().firstOption().map(f).getOrElseC(def2));
      }
    });
	}

	private static function testInBody(contents: String, tagName: String, f: HTMLElement -> Bool, def1: Bool, def2: Bool): Bool {
    return testAndMemorize("testInBody" + contents + tagName, def1, function(v) {
      return if (Env.document == null || Env.document.body == null) None;
      else {
        var div = Env.document.createElement('div');

        //div.style.display = 'none';
        div.innerHTML = contents;

        Env.document.body.insertBefore(div, Env.document.body.firstChild);

        Some(div.getElementsByTagName(tagName).toArray().firstOption().map(f).getOrElseC(def2).withEffect(function(_) {
          Env.document.body.removeChild(div);

          div.style.display = 'none';
        }));
      }
    });
	}
  private static function testFeatureAndMemorize(key: String, testFunction: Function<Void, Option<Bool>>): Bool{
    return testAndMemorize(key, true, testFunction);
  }
  private static function testBugAndMemorize(key: String, testFunction: Function<Void, Option<Bool>>): Bool{
    return testAndMemorize(key, false, testFunction);
  }
  private static function testAndMemorize(key: String, defaultValue: Bool, testFunction: Function<Void, Option<Bool>>): Bool{
    return memorized.get(key).getOrElse(function(){
      var result: Option<Bool> = untyped testFunction.call();
      result.foreach(function(v){
        memorized = memorized.set(key, v);
      });
      return result.getOrElseC(defaultValue);
    });
  }
}