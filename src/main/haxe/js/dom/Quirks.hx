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

using PreludeExtensions;
using haxe.util.StringExtensions;


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
  
  public static function getActualCssPropertyName(name: String): String {
    if (FloatPattern.matches(name)) return BrowserSupport.cssFloat() ? "cssFloat" : "styleFloat";
    
    return name;
  }
  
  public static function getCssProperty(elem: HTMLElement, name: String, force: Bool = false): String {
		var ret = '', style = elem.style, filter;
		
		var currentStyleDefined = Env.isDefined(untyped elem.currentStyle);

		// IE uses filters for opacity
		if (!BrowserSupport.opacity() && name == "opacity" && currentStyleDefined) {
		  return if (OpacityPattern.matches(untyped elem.currentStyle.filter)) {
		    (OpacityPattern.matched(1).toFloat() / 100.0).toString();
		  }
		  else "1";
		}

		if (!force && style != null && style[getActualCssPropertyName(name)] != null) return style[getActualCssPropertyName(name)];
		
		if (BrowserSupport.getComputedStyle()) {
			// Only "float" is needed here
			ret = elem.ownerDocument.defaultView.toOption().flatMap(function(defaultView) {
			  return defaultView.getComputedStyle(elem, null).toOption();
			}).map(function(computedStyle) {
			  return computedStyle.getPropertyValue(name);
			}).filter(function(style) {
			  return name != 'opacity' || style != '';
			}).getOrElseC('1');
		}
		else if (currentStyleDefined) {
			var camelCase = name.toCamelCase();

			ret = elem.currentStyle[name].toOption().orElseC(elem.currentStyle[camelCase].toOption()).getOrElseC("");

			// From the awesome hack by Dean Edwards
			// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
			
			var numberWithNonPixelUnit = NumberPattern.matches(ret) && !NumberPixelPattern.matches(ret);

			// If we're not dealing with a regular pixel number
			// but a number that has a weird ending, we need to convert it to pixels
			if (numberWithNonPixelUnit) {
				// Remember the original values
				var oldLeft   = style.left
				var oldRtLeft = elem.runtimeStyle.left;

				// Put in the new values to get a computed value out
				elem.runtimeStyle.left = elem.currentStyle.left;
				
				style.left = (camelCase == "fontSize") ? "1em" : ret;
				ret = style.pixelLeft + "px";

				// Revert the changed values
				style.left             = oldLeft;
				elem.runtimeStyle.left = oldRtLeft;
			}
		}

		return ret;
	}
  /*
  public static function getOffset(elem: HTMLElement): { top: Float, left: Float } {
    if (document.documentElement != null && document.documentElement.getBoundingClientRect != null) {
      if (elem == null || elem.ownerDocument == null) return null;

  		if (elem === elem.ownerDocument.body) {
  			return jQuery.offset.bodyOffset(elem);
  		}

  		var box = elem.getBoundingClientRect(), doc = elem.ownerDocument, body = doc.body, docElem = doc.documentElement,
  			clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0,
  			top  = box.top  + (self.pageYOffset || jQuery.support.boxModel && docElem.scrollTop  || body.scrollTop ) - clientTop,
  			left = box.left + (self.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft) - clientLeft;

  		return { top: top, left: left };
    }
    else {
      if ( !elem || !elem.ownerDocument ) {
  			return null;
  		}

  		if ( elem === elem.ownerDocument.body ) {
  			return jQuery.offset.bodyOffset( elem );
  		}

  		jQuery.offset.initialize();

  		var offsetParent = elem.offsetParent, prevOffsetParent = elem,
  			doc = elem.ownerDocument, computedStyle, docElem = doc.documentElement,
  			body = doc.body, defaultView = doc.defaultView,
  			prevComputedStyle = defaultView ? defaultView.getComputedStyle( elem, null ) : elem.currentStyle,
  			top = elem.offsetTop, left = elem.offsetLeft;

  		while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {
  			if ( BrowserSupport.positionFixed() && prevComputedStyle.position === "fixed" ) {
  				break;
  			}

  			computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
  			top  -= elem.scrollTop;
  			left -= elem.scrollLeft;

  			if ( elem === offsetParent ) {
  				top  += elem.offsetTop;
  				left += elem.offsetLeft;

  				if ( jQuery.offset.doesNotAddBorder && !(jQuery.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(elem.nodeName)) ) {
  					top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
  					left += parseFloat( computedStyle.borderLeftWidth ) || 0;
  				}

  				prevOffsetParent = offsetParent, offsetParent = elem.offsetParent;
  			}

  			if ( jQuery.offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" ) {
  				top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
  				left += parseFloat( computedStyle.borderLeftWidth ) || 0;
  			}

  			prevComputedStyle = computedStyle;
  		}

  		if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" ) {
  			top  += body.offsetTop;
  			left += body.offsetLeft;
  		}

  		if ( jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed" ) {
  			top  += Math.max( docElem.scrollTop, body.scrollTop );
  			left += Math.max( docElem.scrollLeft, body.scrollLeft );
  		}

  		return { top: top, left: left };
    }
  }
  */
  /*
  public static function getCss(name: String): String {
 		var ret, style = elem.style, filter;

		// IE uses filters for opacity
		if ( !jQuery.support.opacity && name === "opacity" && elem.currentStyle ) {
			ret = ropacity.test(elem.currentStyle.filter || "") ?
				(parseFloat(RegExp.$1) / 100) + "" :
				"";

			return ret === "" ?
				"1" :
				ret;
		}

		// Make sure we're using the right name for getting the float value
		if ( rfloat.test( name ) ) {
			name = styleFloat;
		}

		if ( !force && style && style[ name ] ) {
			ret = style[ name ];

		} else if ( getComputedStyle ) {

			// Only "float" is needed here
			if ( rfloat.test( name ) ) {
				name = "float";
			}

			name = name.replace( rupper, "-$1" ).toLowerCase();

			var defaultView = elem.ownerDocument.defaultView;

			if ( !defaultView ) {
				return null;
			}

			var computedStyle = defaultView.getComputedStyle( elem, null );

			if ( computedStyle ) {
				ret = computedStyle.getPropertyValue( name );
			}

			// We should always get a number back from opacity
			if ( name === "opacity" && ret === "" ) {
				ret = "1";
			}

		} else if ( elem.currentStyle ) {
			var camelCase = name.replace(rdashAlpha, fcamelCase);

			ret = elem.currentStyle[ name ] || elem.currentStyle[ camelCase ];

			// From the awesome hack by Dean Edwards
			// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

			// If we're not dealing with a regular pixel number
			// but a number that has a weird ending, we need to convert it to pixels
			if ( !rnumpx.test( ret ) && rnum.test( ret ) ) {
				// Remember the original values
				var left = style.left, rsLeft = elem.runtimeStyle.left;

				// Put in the new values to get a computed value out
				elem.runtimeStyle.left = elem.currentStyle.left;
				style.left = camelCase === "fontSize" ? "1em" : (ret || 0);
				ret = style.pixelLeft + "px";

				// Revert the changed values
				style.left = left;
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret;
  }
  */
/*
  public static function getComputedStyle(e: Element, pseudo: DOMString): CSSStyleDeclaration {
    if (Env.window.getComputedStyle != null) {
      return Env.window.getComputedStyle(e, pseudo);
    }
    else {
      
      public var length       (default,null): Int;
      public var parentRule   (default, null): CSSRule;

      public var cssText:     DOMString;

      public function removeProperty(propertyName: DOMString): Void;

      public function getPropertyValue(propertyName: DOMString): DOMString;

      public function getPropertyCSSValue(propertyName: DOMString): CSSValue;

      public function getPropertyPriority(propertyName: DOMString): DOMString;

      public function getPropertyShorthand(propertyName: DOMString): DOMString; //Not supported by Firefox

      public function setProperty(propertyName: DOMString, value: DOMString, priority: DOMString): Void;

      public function isPropertyImplicit(propertyName: DOMString): Bool;  //Not supported by Firefox

      public function item(index: Int): DOMString;
      
      return cast {
        length:   
              this.el = el;
        getPropertyValue: function(prop) {
            var re = ~/(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.matches(prop)) {
                prop = prop.replace(re, function () {
                    return arguments[2].toUpperCase();
                });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        }
      }
    }
  }
  
  */
}