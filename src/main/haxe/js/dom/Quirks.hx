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

import Dom;

/** 
 * Common operations that need to be performed differently across browsers.
 */
class Quirks {
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
              this.getPropertyValue = function(prop) {
                  var re = /(\-([a-z]){1})/g;
                  if (prop == 'float') prop = 'styleFloat';
                  if (re.test(prop)) {
                      prop = prop.replace(re, function () {
                          return arguments[2].toUpperCase();
                      });
                  }
                  return el.currentStyle[prop] ? el.currentStyle[prop] : null;
              }
              return this;
      }
    }
  }
  
  */
}