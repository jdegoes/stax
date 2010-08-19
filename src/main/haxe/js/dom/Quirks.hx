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
package js.dom;

import Prelude;

import Dom;
import js.Env;
import js.detect.BrowserSupport;
import haxe.functional.Predicate;

using PreludeExtensions;
using haxe.util.StringExtensions;
using haxe.util.ObjectExtensions;



/** 
 * Common operations that need to be performed differently across browsers.
 */
class Quirks {
  static var ExcludePattern     = ~/z-?index|font-?weight|opacity|zoom|line-?height/i;
  static var AlphaPattern       = ~/alpha\([^)]*\)/;
  static var OpacityPattern     = ~/opacity=([^)]*)/;
  static var FloatPattern       = ~/float/i;
  static var UpperCasePattern   = ~/([A-Z])/g;
  static var NumberPixelPattern = ~/^-?\d+(?:px)?$/i;
  static var NumberPattern      = ~/^-?\d/;
  	
	public static function createXMLHttpRequest(): XMLHttpRequest {
      return untyped if (window.XMLHttpRequest) {
          __new__("XMLHttpRequest");
      }
      else if (window.ActiveXObject) {
          try {
              __new__("ActiveXObject","Msxml2.XMLHTTP");
          }
          catch (e: Dynamic){
              try {
                  __new__("ActiveXObject","Microsoft.XMLHTTP");
              }
              catch (e: Dynamic){
                  throw "Unable to create XMLHttpRequest object."; null;
              }
          }
      }
      else {
          throw "Unable to create XMLHttpRequest object."; null;
      }
  }
  
  public static function getIframeDocument(iframe: HTMLIFrameElement): HTMLDocument {
    if (iframe.contentDocument != null) {
      return untyped iframe.contentDocument;
    }
    else if (iframe.contentWindow != null) {
      return untyped iframe.contentWindow.document;
    }
    else if (untyped iframe.document != null) {
      return untyped iframe.document;
    }
    else { throw "Cannot find iframe content document for " + iframe; return null; }
  }
  
  public static function getIframeWindow(iframe: HTMLIFrameElement): Window {
    if (iframe.contentWindow != null) {
      return untyped iframe.contentWindow;
    }
    else if (untyped iframe.contentDocument != null && untyped iframe.contentDocument.defaultView != null) {
      return untyped iframe.contentDocument.defaultView;
    }
    else if (untyped iframe.document != null && untyped iframe.document.window != null) {
      return untyped iframe.document.window;
    }
    else { throw "Cannot find iframe content document for " + iframe; return null; }
  }
  
  public static function addEventListener(target: EventTarget, type: DOMString, listener: EventListener<Dynamic>, useCapture: Bool): Void untyped {
    if (target.addEventListener != null) {
      target.addEventListener(type, listener, useCapture);
    }
    else if (target.attachEvent != null) {
      target.attachEvent('on' + type, listener);
    }
  }
  
  public static function removeEventListener(target: EventTarget, type: DOMString, listener: EventListener<Dynamic>, useCapture: Bool): Void untyped {
    if (target.removeEventListener != null) {
      target.removeEventListener(type, listener, useCapture);
    }
    else if (target.detachEvent != null) {
      target.detachEvent('on' + type, listener);
    }
  }
  
  /** Retrieves the actual property name for the specified css property. 
   * Because some CSS property names are reserved JavaScript keywords, not 
   * every CSS property has an identically equal JavaScript property name.
   */
  public static function getActualCssPropertyName(name: String): String {
    if (FloatPattern.match(name)) return BrowserSupport.cssFloat() ? "cssFloat" : "styleFloat";
    
    return name;
  }
  
  /** Retrieves the computed value for a particular CSS property. 
   */
  public static function getComputedCssProperty(elem: HTMLElement, name: String): Option<String> {
    return (if (BrowserSupport.getComputedStyle()) {
  		elem.ownerDocument.defaultView.toOption().flatMap(function(defaultView) {
  		  return defaultView.getComputedStyle(elem, null).toOption();
  		}).flatMap(function(computedStyle: CSSStyleDeclaration): Option<String> {
  		  return computedStyle.getPropertyValue(name).toOption().filter(function(style) return style != '');
  		}).orElse(function() {
  		  return if (name == 'opacity') Some('1'); else None;
  		}).getOrElseC('');
  	}
  	else if (Env.isDefined(untyped elem.currentStyle)) {
  		if (name == 'opacity' && !BrowserSupport.opacity()) {
  		  if (OpacityPattern.match(untyped elem.currentStyle.filter)) {
  		    (OpacityPattern.matched(1).toFloat() / 100.0).toString();
  		  }
  		  else "1";
  		}		
  		else {
  			var style = untyped elem.currentStyle[name];

  			// From the awesome hack by Dean Edwards
  			// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
  			if (NumberPattern.match(style) && !NumberPixelPattern.match(style)) {
  				// Remember the original values
  				var oldLeft   = elem.style.left;
  				var oldRtLeft = untyped elem.runtimeStyle.left;

  				// Put in the new values to get a computed value out
  				untyped elem.runtimeStyle.left = elem.currentStyle.left;
				
  				elem.style.left = (name == "font-size") ? "1em" : style;
  				
  				(untyped elem.style.pixelLeft + "px").withEffect(function() untyped {
    				// Revert the changed values
    				elem.style.left        = oldLeft;
    				elem.runtimeStyle.left = oldRtLeft;
    			});
  			}
  			else style;
  		}
  	}
		else '').into(function(computedStyle) {
		  return if (computedStyle == '') None; else computedStyle.toOption();
		});
  }
  
  /** Retrieves a particular CSS property.
   */
  public static function getCssProperty(elem: HTMLElement, name: String): Option<String> {
		return elem.style.toOption().flatMap(function(style) {
		  return style.getAny(getActualCssPropertyName(name));
		}).orElse(function() {
		  return getComputedCssProperty(elem, name);
		});
	}
	
	/** Retrieves the offset of the document's body, relative to the window origin.
	 */
	public static function getBodyOffset(doc: HTMLDocument): Option<{ top: Int, left: Int }> {
	  return Env.document.toOption().flatMap(function(document) {
	    return document.body.toOption();
	  }).map(function(body) {
	    var top  = body.offsetTop;
	    var left = body.offsetLeft;

  		if (BrowserSupport.offsetDoesNotIncludeMarginInBodyOffset()) {
  			top  += getComputedCssProperty(body, 'margin-top').map(function(s) return s.toInt(0)).getOrElseC(0);
  			left += getComputedCssProperty(body, 'margin-left').map(function(s) return s.toInt(0)).getOrElseC(0);
  		}

  		return { top: top, left: left };
	  });
	}
  
  /** Retrieves the offset of the element, relative to the window origin.
   */
  public static function getOffset(elem: HTMLElement): Option<{ top: Int, left: Int }> {
    if (elem == null || elem.ownerDocument == null) return None;
    else if (elem == untyped elem.ownerDocument.body) return getBodyOffset(cast elem.ownerDocument);
    else if (untyped Env.document.documentElement != null && untyped Env.document.documentElement.getBoundingClientRect != null) {
  		var box = untyped elem.getBoundingClientRect();
  		var doc = elem.ownerDocument;
  		var body: HTMLBodyElement = untyped doc.body;
  		var docElem = untyped doc.documentElement;
  		var clientTop  = [docElem.clientTop,  body.clientTop,  0].filter(P.isNotNull()).first();
  		var clientLeft = [docElem.clientLeft, body.clientLeft, 0].filter(P.isNotNull()).first();
  	  var top: Int  = box.top  + [Env.window.pageYOffset, if (BrowserSupport.boxModel()) docElem.scrollTop  else null, body.scrollTop ].filter(P.isNotNull()).first() - clientTop;
  		var left: Int = box.left + [Env.window.pageXOffset, if (BrowserSupport.boxModel()) docElem.scrollLeft else null, body.scrollLeft].filter(P.isNotNull()).first() - clientLeft;

  		return Some({ top: top, left: left });
    }
    else {
  		var getStyle = function(elem: HTMLElement): Dynamic {
  		  var defaultView = elem.ownerDocument.defaultView;
  		  
  		  return if (defaultView != null) defaultView.getComputedStyle(elem, null); else untyped elem.currentStyle;
  		}

  		var offsetParent = elem.offsetParent;
  		var prevOffsetParent = elem;
  		var doc = elem.ownerDocument;
  		var docElem: HTMLElement = cast doc.documentElement;
  		var body: HTMLBodyElement = untyped doc.body;
  		var defaultView = doc.defaultView;
  		var prevComputedStyle = getStyle(elem);
  		var top: Int  = elem.offsetTop;
  		var left: Int = elem.offsetLeft;

  		while (((elem = cast elem.parentNode) != null) && elem != body && elem != docElem) {
  			if (BrowserSupport.positionFixed() && prevComputedStyle.position == "fixed") {
  				break;
  			}

  			var computedStyle = getStyle(elem);
  			
  			top  -= elem.scrollTop;
  			left -= elem.scrollLeft;

  			if (elem == offsetParent) {
  				top  += elem.offsetTop;
  				left += elem.offsetLeft;

  				if (BrowserSupport.offsetDoesNotAddBorder() && !(BrowserSupport.offsetAddsBorderForTableAndCells() && ~/^t(able|d|h)$/i.match(elem.nodeName))) {
  					top  += computedStyle.borderTopWidth.toInt(0);
  					left += computedStyle.borderLeftWidth.toInt(0);
  				}

  				prevOffsetParent = offsetParent;
  				offsetParent     = elem.offsetParent;
  			}

  			if (BrowserSupport.offsetSubtractsBorderForOverflowNotVisible() && computedStyle.overflow != "visible") {
  				top  += computedStyle.borderTopWidth.toInt(0);
  				left += computedStyle.borderLeftWidth.toInt(0);
  			}

  			prevComputedStyle = computedStyle;
  		}

  		if (prevComputedStyle.position == "relative" || prevComputedStyle.position == "static") {
  			top  += body.offsetTop;
  			left += body.offsetLeft;
  		}

  		if (BrowserSupport.positionFixed() && prevComputedStyle.position == "fixed") {
  			top  += Math.max(docElem.scrollTop,  body.scrollTop).toInt();
  			left += Math.max(docElem.scrollLeft, body.scrollLeft).toInt();
  		}

  		return Some({ top: top, left: left });
    }
  }
}