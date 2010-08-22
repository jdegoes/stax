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
using js.dom.DomExtensions;
using haxe.util.ObjectExtensions;


/** Feature detection library */
// windowEvalEvaluatesInGlobalScope
class BrowserSupport {
  static var _positionFixed: Option<Bool> = None;
  static var _cssTransformationSupported:  Option<Bool> = None;
  static var _elementTagnameUppercased:    Option<Bool> = None;
  static var _isEventSrcelementPresent:    Option<Bool> = None;
  static var _isNativeHasAttributePresent: Option<Bool> = None;
  static var _isContextMenuEventSupported: Option<Bool> = None;
  static var _computedStyleReturnsValuesForStaticlyPositionedElements: Option<Bool> = None;
  static var _isRgbaSupported: Option<Bool> = None;
  static var _isCssBorderRadiusSupported: Option<Bool> = None;
  static var _isCanvasSupported: Option<Bool> = None;
  static var _elemenChildrenReturnsElementNodes: Option<Bool> = None;
  static var _isCssEnabled: Option<Bool> = None;
  static var _isQuirksMode: Option<Bool> = None;
  static var _isContainsBuggy: Option<Bool> = None;
  static var _isActivexEnabled: Option<Bool> = None;
  static var _typeofNodelistIsFunctionBug: Option<Bool> = None;
  static var _getElementsByTagNameReturnsCommentNodesBug: Option<Bool> = None;
  static var _setAttributeIgnoresNameAttributeBug: Option<Bool> = None;
  static var _elementPropertiesAreAttributesBug: Option<Bool> = None;
  static var _stringPrototypeReplaceIgnoresFunctionsBug: Option<Bool> = None;
  static var _isRegexpWhitespaceCharacterClassBug: Option<Bool> = None;
  static var _isStringPrototypeSplitRegexpBug: Option<Bool> = None;
  static var _preElementsIgnoreNewLinesBug: Option<Bool> = None;
  static var _selectElementInnerhtmlBug: Option<Bool> = None;
  static var _tableElementInnerHtmlBug: Option<Bool> = None;
  static var _scriptElementRejectsTextNodeAppendingBug: Option<Bool> = None;
  static var _documentGetElementByIdConfusesIdsWithNamesBug: Option<Bool> = None;
  static var _documentGetElementByIdIgnoresCaseBug: Option<Bool> = None;
  static var _offsetValuesForStaticElementsInsidePositionedOnesBug: Option<Bool> = None;
  static var _isDocumentGetElementsByNameBug: Option<Bool> = None;
  static var _namedFunctionExpressionIdentifierLeaksOntoEnclosingScopeBug: Option<Bool> = None;
  static var _isOverflowStyleBug: Option<Bool> = None;
  static var _isQuerySelectorAllBug: Option<Bool> = None;
  static var _html5Audio: Option<Bool> = None;
  static var _html5AudioInMP3Format: Option<Bool> = None;
  static var _html5AudioInVorbisFormat: Option<Bool> = None;
  static var _html5AudioInWavFormat: Option<Bool> = None;
  static var _html5AudioInAACFormat: Option<Bool> = None;
  static var _html5Canvas: Option<Bool> = None;
  static var _html5CanvasTextAPI: Option<Bool> = None;
  static var _html5Command: Option<Bool> = None;
  static var _html5Datalist: Option<Bool> = None;
  static var _html5Details: Option<Bool> = None;
  static var _html5Device: Option<Bool> = None;
  static var _html5FormConstraintValidation: Option<Bool> = None;
  static var _html5IframeSandbox: Option<Bool> = None;
  static var _html5IframeSrcdoc: Option<Bool> = None;
  static var _html5InputAutofocus: Option<Bool> = None;
  static var _html5InputPlaceholder: Option<Bool> = None;
  static var _html5InputTypeColor: Option<Bool> = None;
  static var _html5InputTypeEmail: Option<Bool> = None;
  static var _html5InputTypeNumber: Option<Bool> = None;
  static var _html5InputTypeRange: Option<Bool> = None;
  static var _html5InputTypeSearch: Option<Bool> = None;
  static var _html5InputTypeTel: Option<Bool> = None;
  static var _html5InputTypeUrl: Option<Bool> = None;
  static var _html5InputTypeDate: Option<Bool> = None;
  static var _html5InputTypeTime: Option<Bool> = None;
  static var _html5InputTypeDatetime: Option<Bool> = None;
  static var _html5InputTypeDatetimeLocal: Option<Bool> = None;
  static var _html5InputTypeMonth: Option<Bool> = None;
  static var _html5InputTypeWeek: Option<Bool> = None;
  static var _html5Meter: Option<Bool> = None;
  static var _html5Output: Option<Bool> = None;
  static var _html5Progress: Option<Bool> = None;
  static var _html5Time: Option<Bool> = None;
  static var _html5Video: Option<Bool> = None;
  static var _html5VideoCaptions: Option<Bool> = None;
  static var _html5VideoPoster: Option<Bool> = None;
  static var _html5VidouInWebMFormat: Option<Bool> = None;
  static var _html5VidouInH264Format: Option<Bool> = None;
  static var _html5VidouInTheoraFormat: Option<Bool> = None;
  static var _html5ContentEditable: Option<Bool> = None;
  static var _html5DragAndDrop: Option<Bool> = None;
  static var _html5SVGInTextHtml: Option<Bool> = None;

  /**
   * Determines if the browser supports "css transformation".
   */
	public static function cssTransformationSupported(): Bool {
	  return _cssTransformationSupported.getOrElse(function() {
      var isSupported = false;
      var docEl = Env.document.documentElement;
      if (docEl != null ) {
        var s = docEl.style;
        isSupported = Env.isDefined(untyped s.WebkitTransform) || Env.isDefined(untyped s.MozTransform);
        _cssTransformationSupported = Some(isSupported);
      }
      return isSupported;
	  });
  }
  /**
   * Determines if the browser supports "element tagname" is uppercased. The document must
   * have a body for the detection to be accurate.
   */
	public static function elementTagnameUppercased(): Bool {
	  return _elementTagnameUppercased.getOrElse(function() {
      var isUppercased = false;
      var docEl = Env.document.documentElement;
      if (docEl != null) {
        isUppercased = 'HTML' == docEl.nodeName;
        _elementTagnameUppercased = Some(isUppercased);
      }

      return isUppercased;
	  });
  }
  /**
   * Determines if the browser supports "element tagname" is uppercased. The document must
   * have a body for the detection to be accurate.
   */
	public static function querySelectorIgnoresCapitalizedValuesBug(): Bool {
    var result = false;
    if (Env.document.createElement != null && (Env.document.compatMode == 'BackCompat')) {
      var el  = Env.document.createElement('div');
      var el2 = Env.document.createElement('span');
      if (el != null && el2 != null && untyped el.querySelector != null) {
        el2.className = 'Test';
        el.appendChild(el2);
        result = untyped (el.querySelector('.Test') != null);
      }
    }
    return false;
  }

  /**
   * Determines if the event has property  "srcElement". The document must
   * have a body for the detection to be accurate.
   */
	public static function isEventSrcelementPresent(): Bool {
    return _isEventSrcelementPresent.getOrElse(function() {
        var isSupported = false;
        if (Env.document.createElement != null) {
        var i    = Env.document.createElement('input');
        var root = Env.document.documentElement;
        if (i != null && i.style != null && i.click != null && root != null && root.appendChild != null && root.removeChild != null ) {
          untyped i.type = 'checkbox';
          i.style.display = 'none';
          i.onclick = function(e) {
            isSupported = Env.isDefined(untyped e.srcElement);
            _isEventSrcelementPresent = Some(isSupported);
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
    return _isNativeHasAttributePresent.getOrElse(function() {
      var isSupported = false;
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
                  isSupported = Env.isDefined(untyped doc.documentElement.hasAttribute);
                }
                else{
                  isSupported = false;
                }
                root.removeChild(i);
                i = null;
              }
            }
          } catch(e: Dynamic) {
          }
        }
      }
      _isNativeHasAttributePresent = Some(isSupported);
      return isSupported;
    });
  }
  /**
   * Determines if the document element supports "context menu". The document must
   * have a body for the detection to be accurate.
   */
	public static function isContextMenuEventSupported(): Bool {
    return _isContextMenuEventSupported.getOrElse(function() {
      var isPresent = false;
      if (Env.document.createElement != null) {
        var el = Env.document.createElement('p');
        if (el != null && el.setAttribute != null) {
          el.setAttribute('oncontextmenu', '');
          isPresent = Env.isDefined(el.oncontextmenu);
        }
      }
      _isContextMenuEventSupported = Some(isPresent);
      return isPresent;
    });
  }

  /**
   * Determines if the computed style returns values for staticly positioned elements. The document must
   * have a body for the detection to be accurate.
   */
	public static function computedStyleReturnsValuesForStaticlyPositionedElements(): Bool {
    return _computedStyleReturnsValuesForStaticlyPositionedElements.getOrElse(function() {
      var result = false;
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
        var result = computedStyle.left != 'auto';
        if (position != null) {
          var docElStyle: CSSInlineStyleDeclaration = cast docEl.style;
          docElStyle.position = position;
        }
      }
      _computedStyleReturnsValuesForStaticlyPositionedElements = Some(result);
      return result;
    });
  }

	public static function isRgbaSupported(): Bool {
    return _isRgbaSupported.getOrElse(function() {
      var result = false;
      if (Env.document.createElement != null) {
        var value = 'rgba(1,1,1,0.5)';
        var el = Env.document.createElement('p');
        var re = untyped __js__('/^rgba/');
        if (el != null && el.style != null && Env.typeOf(untyped re.test) == 'function') {
          try {
            el.style.color = value;
            result = re.test(el.style.color);
          }
          catch(e: Dynamic) {
            result = false;
          }
        }
      }
      _isRgbaSupported = Some(result);
      return result;
    });
  }
	public static function isCssBorderRadiusSupported(): Bool {
    return _isCssBorderRadiusSupported.getOrElse(function() {
      var result = false;
      var docEl = Env.document.documentElement;
      if (docEl != null ) {
        var s = docEl.style;
        result = (Env.typeOf(untyped s.borderRadius) == 'string'
          || Env.typeOf(untyped s.MozBorderRadius) == 'string'
          || Env.typeOf(untyped s.WebkitBorderRadius) == 'string'
          || Env.typeOf(untyped s.KhtmlBorderRadius) == 'string');
      }
      _isCssBorderRadiusSupported = Some(result);
      return result;
    });
  }

	public static function elemenChildrenReturnsElementNodes(): Bool {
    return _elemenChildrenReturnsElementNodes.getOrElse(function() {
      var isSupported = false;
      var docEl = Env.document.documentElement;
      if (Env.document.createElement != null && Env.isDefined(untyped docEl.children)) {
        var el = Env.document.createElement('div');
        el.innerHTML = '<div><p>a</p></div>b<!-- x -->';
        // Safari 2.x returns ALL elements in `children`
        // We check that first element is a DIV and that it's the only one element returned
        isSupported = untyped (el.children &&
          el.children.length == 1 &&
          el.children[0] &&
          el.children[0].tagName &&
          el.children[0].tagName.toUpperCase() == 'DIV');
      }
      _elemenChildrenReturnsElementNodes = Some(isSupported);
      return isSupported;
    });
  }

	public static function isCanvasSupported(): Bool {
    return _isCanvasSupported.getOrElse(function() {
      var result = false;
      if (Env.document.createElement != null) {
        var elCanvas = Env.document.createElement('canvas');
        result = !!(elCanvas != null && untyped elCanvas.getContext != null && untyped elCanvas.getContext('2d') != null);
      }
      _isCanvasSupported = Some(result);
      return result;
    });
  }

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

  public static function isCssEnabled(): Bool {
    return _isCssEnabled.getOrElse(function() {
      var isSupported = false;
      var body = Env.document.body;
      if (Env.document.createElement != null &&
              body != null &&
              body.appendChild != null &&
              body.removeChild != null) {
            var el = Env.document.createElement('div');
            if (el != null && el.style != null) {
              untyped el.style.display = 'none';
              body.appendChild(el);
              isSupported = (el.offsetWidth == 0);
              body.removeChild(el);
            }
          }
      _isCssEnabled = Some(isSupported);
      return isSupported;
    });
  }

  public static function isQuirksMode(): Bool {
    return _isQuirksMode.getOrElse(function() {
      var result = false;
      if (Env.document.createElement != null) {
        var el = Env.document.createElement('div');
        if (el != null && el.style != null) {
          var style: CSSInlineStyleDeclaration = cast el.style;
          style.width = '1';
        }
        var style: CSSInlineStyleDeclaration = cast el.style;
        result = (style.width == '1px');
      }
      _isQuirksMode = Some(result);
      return result;
    });
  }

  public static function isContainsBuggy(): Bool {
    return _isContainsBuggy.getOrElse(function() {
      var result = false;
      if (Env.document.createElement != null) {
        var el1 = Env.document.createElement('div'),
            el2 = Env.document.createElement('div');
        if (el1 != null && el2 != null && Env.isDefined(untyped el1.contains)) {
          result = untyped el1.contains(el2);
        }
      }
      _isContainsBuggy = Some(result);
      return result;
    });
  }

  public static function isActivexEnabled(): Bool {
    return _isActivexEnabled.getOrElse(function() {
      var result = false;
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
              result = true;
            }
          }
          catch(ex: Dynamic ) { trace(ex); }
        }
      }
      _isActivexEnabled = Some(result);
      return result;
    });
  }

  public static function typeofNodelistIsFunctionBug(): Bool {
    return _typeofNodelistIsFunctionBug.getOrElse(function() {
      var result = false;
      if (Env.document.forms != null) {
        result = (Env.typeOf(Env.document.forms) == 'function');
      }
      _typeofNodelistIsFunctionBug = Some(result);
      return result;
    });
  }
  public static function getElementsByTagNameReturnsCommentNodesBug(): Bool {
    return _getElementsByTagNameReturnsCommentNodesBug.getOrElse(function() {
      var result = false;
      if (Env.document.createElement != null) {
        var el = Env.document.createElement('div');
        if (el != null && el.getElementsByTagName != null) {
          el.innerHTML = '<span>a</span><!--b-->';
          var all = el.getElementsByTagName('*');
          // IE5.5 returns a 0-length collection when calling getElementsByTagName with wildcard
          if (all.length != null) {
            var lastNode = el.getElementsByTagName('*')[1];
            result = !!(lastNode != null && lastNode.nodeType == 8);
          }
        }
      }
      return result;
    });
  }
  public static function setAttributeIgnoresNameAttributeBug(): Bool {
    return _setAttributeIgnoresNameAttributeBug.getOrElse(function() {
      var result = false;
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
                result = (Env.typeOf(untyped elForm.elements['test']) == 'undefined');
              }
              root.removeChild(elForm);
            }
          }
      _setAttributeIgnoresNameAttributeBug = Some(result);
      return result;
    });
  }

  public static function elementPropertiesAreAttributesBug(): Bool {
    return _elementPropertiesAreAttributesBug.getOrElse(function() {
      var result = false;
      if (Env.document.createElement != null) {
        var el = Env.document.createElement('div');
        if (el != null && el.getAttribute != null) {
          untyped __js__("el.__foo = 'bar'");
          result = (el.getAttribute('__foo') == 'bar');
          el = null;
        }
      }
      _elementPropertiesAreAttributesBug = Some(result);
      return result;
    });
  }

  public static function isRegexpWhitespaceCharacterClassBug(): Bool {
    return _isRegexpWhitespaceCharacterClassBug.getOrElse(function() {
      var result = false;
      var str = untyped"\\u0009\\u000A\\u000B\\u000C\\u000D\\u0020\\u00A0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029";
      result = (~/^\s+$/.match(str));
      _isRegexpWhitespaceCharacterClassBug = Some(result);
      return result;
    });
  }

  public static function isStringPrototypeSplitRegexpBug(): Bool {
    return _isStringPrototypeSplitRegexpBug.getOrElse(function() {
      var result = false;
      var s = 'a_b';
       result = untyped __js__("s.split(/(_)/).length != 3");
      _isStringPrototypeSplitRegexpBug = Some(result);
      return result;
    });
  }

  public static function preElementsIgnoreNewLinesBug(): Bool {
    return _preElementsIgnoreNewLinesBug.getOrElse(function() {
      var result = false;
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
          result = isIgnored;
        }
      }
      _preElementsIgnoreNewLinesBug = Some(result);
      return result;
    });
  }

  public static function selectElementInnerHtmlBug(): Bool {
    return _selectElementInnerhtmlBug.getOrElse(function() {
      var result = false;
      if (Env.document.createElement != null) {
        var el = Env.document.createElement('select');
        if (el != null) {
          el.innerHTML = '<option value="test">test</option>';
          untyped if (el.options != null && el.options[0] != null) {
            result = (el.options[0].nodeName.toUpperCase() != 'OPTION');
          }
          el = null;
        }
      }
      _selectElementInnerhtmlBug = Some(result);
      return result;
    });
  }

  public static function tableElementInnerHtmlBug(): Bool {
    return _tableElementInnerHtmlBug.getOrElse(function() {
      var result = false;
      if (Env.document.createElement != null) {
        try {
          var el = Env.document.createElement('table');
          if (el != null && untyped el.tBodies != null) {
            el.innerHTML = '<tbody><tr><td>test</td></tr></tbody>';
            result = (Env.typeOf(untyped el.tBodies[0]) == 'undefined');
            el = null;
          }
        } catch(e: Dynamic) {
          result = true;
        }
      }
      _tableElementInnerHtmlBug = Some(result);
      return result;
    });
  }

  public static function scriptElementRejectsTextNodeAppendingBug(): Bool {
    return _scriptElementRejectsTextNodeAppendingBug.getOrElse(function() {
      var result = false;
      if (Env.document.createElement != null && Env.document.createTextNode != null) {
        var s = Env.document.createElement('script');
        if (s != null && s.appendChild != null) {
          try {
            s.appendChild(Env.document.createTextNode(''));
            result = ((s.firstChild == null) || (s.firstChild != null && s.firstChild.nodeType != 3));
          } catch(e: Dynamic) {
            result = true;
          }
          s = null;
        }
      }
      _scriptElementRejectsTextNodeAppendingBug = Some(result);
      return result;
    });
  }

  public static function documentGetElementByIdConfusesIdsWithNamesBug(): Bool {
    return _documentGetElementByIdConfusesIdsWithNamesBug.getOrElse(function() {
      var result = false;
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
          result = !!((testElement != null) && (testElement.nodeName.toUpperCase() == 'INPUT'));
          head.removeChild(el);
          el = null;
        }
      }
      _documentGetElementByIdConfusesIdsWithNamesBug = Some(result);
      return result;
    });
  }

  public static function documentGetElementByIdIgnoresCaseBug(): Bool {
    return _documentGetElementByIdIgnoresCaseBug.getOrElse(function() {
      var result = false;
      if (Env.document.createElement != null && Env.document.getElementsByTagName != null && Env.document.getElementById != null) {
        var el = Env.document.createElement('script');
        var head = Env.document.getElementsByTagName('head')[0];
        if (el != null && head != null && head.appendChild != null && head.removeChild != null) {
          untyped el.type = 'text/javascript';
          el.id = 'A';
          head.appendChild(el);
          result = !!(Env.document.getElementById('a') != null);
          head.removeChild(el);
          el = null;
        }
      }
      _documentGetElementByIdIgnoresCaseBug = Some(result);
      return result;
    });
  }

  public static function offsetValuesForStaticElementsInsidePositionedOnesBug(): Bool {
    return _offsetValuesForStaticElementsInsidePositionedOnesBug.getOrElse(function() {
      var result = false;
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
                result = true;
              }
            }
            else {
              result = false;
            }
          }
          body.removeChild(wrapper);
        }
        wrapper = null;
      }
      _offsetValuesForStaticElementsInsidePositionedOnesBug = Some(result);
      return result;
    });
  }

  public static function isDocumentGetElementsByNameBug(): Bool {
    return _isDocumentGetElementsByNameBug.getOrElse(function() {
      var result = false;
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
          result = (Env.document.getElementsByName(uid)[0] == el);
          docEl.removeChild(el);
        }
      }
      _isDocumentGetElementsByNameBug= Some(result);
      return result;
    });
  }

  public static function isOverflowStyleBug(): Bool {
    return _isOverflowStyleBug.getOrElse(function() {
      var result = false;
      if (Env.document.createElement != null) {
        var el = Env.document.createElement('div');
        el.innerHTML = '<p style="overflow: visible;">x</p>';
        var firstChild = el.firstChild;
        if (firstChild != null && firstChild.style != null) {
          var style: CSSInlineStyleDeclaration = cast firstChild.style;
          style.overflow = 'hidden';
          result = (style.overflow != 'hidden');
        }
        el = null;
        firstChild = null;
      }
      _isOverflowStyleBug = Some(result);
      return result;
    });
  }

  public static function isQuerySelectorAllBug(): Bool {
    return _isQuerySelectorAllBug.getOrElse(function() {
      var result = false;
      if (Env.document.createElement != null) {
        var el = Env.document.createElement('div');
        if (el != null && untyped (el.querySelectorAll != null)) {
          el.innerHTML = '<object><param name=""></object>';
          untyped result = (el.querySelectorAll("param").length != 1);
        }
        el = null;
      }
      _isQuerySelectorAllBug = Some(result);
      return result;
    });
  }
  public static function html5Audio(): Bool {
    return _html5Audio.getOrElse(function() {
      var result = false;
      if (Env.document.createElement != null) {
        var el = Env.document.createElement('audio');
        result = untyped !!el.canPlayType;
        el = null;
      }
      _html5Audio = Some(result);
      return result;
    });
  }

  public static function html5AudioInMP3Format(): Bool {
    return _html5AudioInMP3Format.getOrElse(function() {
      var result = canPlayType('audio', 'audio/mpeg;');
      _html5AudioInMP3Format = Some(result);
      return result;
    });
  }
  public static function html5AudioInVorbisFormat(): Bool {
    return _html5AudioInVorbisFormat.getOrElse(function() {
      var result = canPlayType('audio', 'audio/ogg; codecs="vorbis"');
      _html5AudioInVorbisFormat = Some(result);
      return result;
    });
  }
  public static function html5AudioInWavFormat(): Bool {
    return _html5AudioInWavFormat.getOrElse(function() {
      var result = canPlayType('audio', 'audio/wav; codecs="1"');
      _html5AudioInWavFormat = Some(result);
      return result;
    });
  }
  public static function html5AudioInAACFormat(): Bool {
    return _html5AudioInAACFormat.getOrElse(function() {
      var result = canPlayType('audio', 'audio/mp4; codecs="mp4a.40.2"');
      _html5AudioInAACFormat = Some(result);
      return result;
    });
  }
  private static function canPlayType(element: String, format: String): Bool {
      var result = false;
      if (Env.document.createElement != null) {
        var a = Env.document.createElement(element);
        result = untyped !!(a.canPlayType && a.canPlayType(format).replace('no', '') != "");
        a = null;
      }
      return result;
  }
  public static function html5Canvas(): Bool {
    return _html5Canvas.getOrElse(function() {
      var result = false;
      if (Env.document.createElement != null) {
        var a = Env.document.createElement('canvas');
        result = untyped !!a.getContext;
        a = null;
      }
      _html5Canvas = Some(result);
      return result;
    });
  }
  public static function html5CanvasTextAPI(): Bool {
    return _html5CanvasTextAPI.getOrElse(function() {
      var result = false;
      if (Env.document.createElement != null) {
        var c = Env.document.createElement('canvas');
        result = untyped c.getContext && Env.typeOf(c.getContext('2d').fillText) == 'function';
        c = null;
      }
      _html5CanvasTextAPI = Some(result);
      return result;
    });
  }
  public static function html5Command(): Bool {
    return _html5Command.getOrElse(function() {
      var result = checIfExist('command', 'type');
      _html5Command = Some(result);
      return result;
    });
  }
  public static function html5Datalist(): Bool {
    return _html5Datalist.getOrElse(function() {
      var result = checIfExist('datalist', 'options');
      _html5Datalist = Some(result);
      return result;
    });
  }
  public static function html5Details(): Bool {
    return _html5Details.getOrElse(function() {
      var result = checIfExist('details', 'open');
      _html5Details = Some(result);
      return result;
    });
  }
  public static function html5Device(): Bool {
    return _html5Device.getOrElse(function() {
      var result = checIfExist('device', 'type');
      _html5Device = Some(result);
      return result;
    });
  }
  public static function html5FormConstraintValidation(): Bool {
    return _html5FormConstraintValidation.getOrElse(function() {
      var result = checIfExist('form', 'noValidate');
      _html5FormConstraintValidation = Some(result);
      return result;
    });
  }
  public static function html5IframeSandbox(): Bool {
    return _html5IframeSandbox.getOrElse(function() {
      var result = checIfExist('iframe', 'sandbox');
      _html5IframeSandbox = Some(result);
      return result;
    });
  }
  public static function html5IframeSrcdoc(): Bool {
    return _html5IframeSrcdoc.getOrElse(function() {
      var result = checIfExist('iframe', 'srcdoc');
      _html5IframeSrcdoc = Some(result);
      return result;
    });
  }
  public static function html5InputAutofocus(): Bool {
    return _html5InputAutofocus.getOrElse(function() {
      var result = checIfExist('input', 'autofocus');
      _html5InputAutofocus = Some(result);
      return result;
    });
  }
  public static function html5InputPlaceholder(): Bool {
    return _html5InputPlaceholder.getOrElse(function() {
      var result = checIfExist('input', 'placeholder');
      _html5InputPlaceholder = Some(result);
      return result;
    });
  }
  public static function html5InputTypeColor(): Bool {
    return _html5InputTypeColor.getOrElse(function() {
      var result = checIputTypeProperty('color');
      _html5InputTypeColor = Some(result);
      return result;
    });
  }
  public static function html5InputTypeEmail(): Bool {
    return _html5InputTypeEmail.getOrElse(function() {
      var result = checIputTypeProperty('email');
      _html5InputTypeEmail = Some(result);
      return result;
    });
  }
  public static function html5InputTypeNumber(): Bool {
    return _html5InputTypeNumber.getOrElse(function() {
      var result = checIputTypeProperty('range');
      _html5InputTypeNumber = Some(result);
      return result;
    });
  }
  public static function html5InputTypeRange(): Bool {
    return _html5InputTypeRange.getOrElse(function() {
      var result = checIputTypeProperty('color');
      _html5InputTypeRange = Some(result);
      return result;
    });
  }
  public static function html5InputTypeSearch(): Bool {
    return _html5InputTypeSearch.getOrElse(function() {
      var result = checIputTypeProperty('search');
      _html5InputTypeSearch = Some(result);
      return result;
    });
  }
  public static function html5InputTypeTel(): Bool {
    return _html5InputTypeTel.getOrElse(function() {
      var result = checIputTypeProperty('tel');
      _html5InputTypeTel = Some(result);
      return result;
    });
  }
  public static function html5InputTypeUrl(): Bool {
    return _html5InputTypeUrl.getOrElse(function() {
      var result = checIputTypeProperty('url');
      _html5InputTypeUrl = Some(result);
      return result;
    });
  }
  public static function html5InputTypeDate(): Bool {
    return _html5InputTypeDate.getOrElse(function() {
      var result = checIputTypeProperty('date');
      _html5InputTypeDate = Some(result);
      return result;
    });
  }
  public static function html5InputTypeTime(): Bool {
    return _html5InputTypeTime.getOrElse(function() {
      var result = checIputTypeProperty('time');
      _html5InputTypeTime = Some(result);
      return result;
    });
  }
  public static function html5InputTypeDatetime(): Bool {
    return _html5InputTypeDatetime.getOrElse(function() {
      var result = checIputTypeProperty('datetime');
      _html5InputTypeDatetime = Some(result);
      return result;
    });
  }
  public static function html5InputTypeDatetimeLocal(): Bool {
    return _html5InputTypeDatetimeLocal.getOrElse(function() {
      var result = checIputTypeProperty('datetime-local');
      _html5InputTypeDatetimeLocal = Some(result);
      return result;
    });
  }
  public static function html5InputTypeWeek(): Bool {
    return _html5InputTypeWeek.getOrElse(function() {
      var result = checIputTypeProperty('week');
      _html5InputTypeWeek = Some(result);
      return result;
    });
  }
  public static function html5InputTypeMonth(): Bool {
    return _html5InputTypeMonth.getOrElse(function() {
      var result = checIputTypeProperty('month');
      _html5InputTypeMonth = Some(result);
      return result;
    });
  }

  public static function html5Meter(): Bool {
    return _html5Meter.getOrElse(function() {
      var result = checIfExist('meter', 'value');
      _html5Meter = Some(result);
      return result;
    });
  }
  public static function html5Output(): Bool {
    return _html5Output.getOrElse(function() {
      var result = checIfExist('output', 'value');
      _html5Output = Some(result);
      return result;
    });
  }
  public static function html5Progress(): Bool {
    return _html5Progress.getOrElse(function() {
      var result = checIfExist('value', 'progress');
      _html5Progress = Some(result);
      return result;
    });
  }
  public static function html5Time(): Bool {
    return _html5Time.getOrElse(function() {
      var result = checIfExist('time', 'valueAsDate');
      _html5Time = Some(result);
      return result;
    });
  }

  public static function html5Video(): Bool {
    return _html5Video.getOrElse(function() {
      var result = false;
      if (Env.document.createElement != null) {
        var el = Env.document.createElement('video');
        result = untyped !!el.canPlayType;
        el = null;
      }
      _html5Video = Some(result);
      return result;
    });
  }

  public static function html5VideoCaptions(): Bool {
    return _html5VideoCaptions.getOrElse(function() {
      var result = checIfExist('track', 'track');
      _html5VideoCaptions = Some(result);
      return result;
    });
  }

  public static function html5VideoPoster(): Bool {
    return _html5VideoPoster.getOrElse(function() {
      var result = checIfExist('track', 'poster');
      _html5VideoPoster = Some(result);
      return result;
    });
  }

  private static function checIfExist(elementName: String, property: String): Bool{
    var result = false;
    if (Env.document.createElement != null) {
      var c = Env.document.createElement(elementName);
      result = (Env.typeOf(untyped c[property]) != 'undefined');
      c = null;
    }
    return result;
  }
  private static function checIputTypeProperty(type: String): Bool{
    var result = false;
    if (Env.document.createElement != null) {
      var i = Env.document.createElement("input");
      i.setAttribute('type', type);
      result = untyped (i.type != 'text');
      i = null;
    }
    return result;
  }
  public static function html5VidouInWebMFormat(): Bool {
    return _html5VidouInWebMFormat.getOrElse(function() {
      var result = canPlayType('video', 'video/webm; codecs="vp8, vorbis"');
      _html5VidouInWebMFormat = Some(result);
      return result;
    });
  }
  public static function html5VidouInH264Format(): Bool {
    return _html5VidouInH264Format.getOrElse(function() {
      var result = canPlayType('video', 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
      _html5VidouInH264Format = Some(result);
      return result;
    });
  }
  public static function html5VidouInTheoraFormat(): Bool {
    return _html5VidouInTheoraFormat.getOrElse(function() {
      var result = canPlayType('video', 'video/ogg; codecs="theora, vorbis"');
      _html5VidouInTheoraFormat = Some(result);
      return result;
    });
  }
  public static function html5ContentEditable(): Bool {
    return _html5ContentEditable.getOrElse(function() {
      var result = checIfExist('span', 'isContentEditable');
      _html5ContentEditable = Some(result);
      return result;
    });
  }
  public static function html5CrossDocumentMessaging(): Bool {
    return Env.isDefined(Env.window.postMessage);
  }
  public static function html5DragAndDrop(): Bool {
    return _html5DragAndDrop.getOrElse(function() {
      var result = checIfExist('span', 'draggable');
      _html5DragAndDrop = Some(result);
      return result;
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
        return _html5SVGInTextHtml.getOrElse(function() {
      var result = false;
      if (Env.document.createElement != null) {
        var e = Env.document.createElement("div");
        e.innerHTML = '<svg></svg>';
        result = untyped !!((Env.window.SVGSVGElement != null) && (Std.is(e.firstChild, Env.window.SVGSVGElement)));
        e = null;
      }
      _html5SVGInTextHtml = Some(result);
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