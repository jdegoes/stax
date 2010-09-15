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
import PreludeExtensions;

import Dom;
import js.Env;
import js.detect.BrowserSupport;
import haxe.functional.Predicate;
import haxe.data.collections.Map;
import haxe.util.Guid;

import PreludeExtensions;
using PreludeExtensions;
using js.dom.DomExtensions;
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
  static var RootPattern        = ~/^body|html$/i;

  static var cssWidth = [ "left", "right" ];
  static var cssHeight = [ "top", "bottom" ];
  static var cssShow = Map.create().set('position', 'absolute').set('visibility', 'hidden').set('display', 'block');
  static var border = "border";
  static var margin = "margin";


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

  public static function getOverrideStyle(doc: HTMLDocument, el: HTMLElement, pseudo: DOMString): CSSStyleDeclaration {
    if (doc.getOverrideStyle != null && doc.getOverrideStyle(el, pseudo) != null) {
      return doc.getOverrideStyle(el, pseudo);
    }
    else if (untyped el.runtimeStyle != null) {
      return untyped el.runtimeStyle;
    }
    else {
      return cast {};
    }
  }

  /** Deletes the specified css rule.
   */
  public static function deleteCssRule(doc: HTMLDocument, rule: CSSRule): CSSRule {
    var deleteFromSheet = function(sheet: CSSStyleSheet): Bool {
      var index = getCssRules(sheet).toArray().indexOf(rule);

      if (index > 0) {
        if (sheet.deleteRule != null) {
          sheet.deleteRule(index);

          return true;
        }
        else if (untyped sheet.removeRule != null) {
          untyped sheet.removeRule(index);

          return true;
        }
      }

      return false;
    }

    if (rule.parentStyleSheet != null) {
      deleteFromSheet(rule.parentStyleSheet);
    }
    else {
      var stylesheets = doc.styleSheets;

      for (i in 0...stylesheets.length) {
        if (deleteFromSheet(cast stylesheets[i])) break;
      }
    }

    return rule;
  }

  /** Adds an overriding style to the specified element. These styles will not
   * override inline styles unless "!important" is specified.
   */
  public static function addOverridingCssRule(el: HTMLElement, style: String = ''): CSSStyleRule {
    var doc: HTMLDocument = cast el.ownerDocument;

    var id = el.getAttribute('id').toOption().filter(function(id) return id != '').getOrElse(function() {
      return Guid.generate().withEffect(function(guid) {
        el.setAttribute('id', guid);
      });
    });

    if (doc.styleSheets.length < 0) {
      addCssStylesheet(doc, '');
    }

    var lastStyleSheet: CSSStyleSheet = cast doc.styleSheets[doc.styleSheets.length - 1];

    return cast insertCssRule(lastStyleSheet, '#' + id + ' {' + style + '}');
  }

  /** Adds a new style sheet to the document with the specified content.
   */
  public static function addCssStylesheet(doc: HTMLDocument, content: String): CSSStyleSheet {
    var head = doc.getElementsByTagName('HEAD')[0].toOption().getOrElse(function() {
      return doc.createElement('HEAD').withEffect(function(newHead) {
        doc.documentElement.appendChild(newHead);
      });
    });

    var style = doc.createElement('STYLE');

    style.setAttribute('type', 'text/css');

    try {
      if (untyped style.innerText != null) {
        untyped style.innerText = content;
      }
      else if (untyped style.innerHTML != null) {
        untyped style.innerHTML = content;
      }

      head.appendChild(style);
    }
    catch (e: Dynamic) {
      head.appendChild(style);

      untyped doc.styleSheets[doc.styleSheets.length - 1].cssText = content;
    }

    return cast doc.styleSheets[doc.styleSheets.length - 1];
  }

  /** Retrieves the rules comprising the specified CSS sheet.
   */
  public static function getCssRules(sheet: CSSStyleSheet): DomCollection<CSSRule> {
    return if (untyped sheet.cssRules != null) sheet.cssRules;
           else untyped sheet.rules;
  }

  /** Inserts the specified rule into the specified CSS sheet.
   */
  public static function insertCssRule(sheet: CSSStyleSheet, rule: String, ?index_: Int): CSSRule {
    if (sheet.insertRule != null) {
      var rules = getCssRules(sheet);

      var index = if (index_ == null) rules.length else index_;

      sheet.insertRule(rule, index);

      return rules[index];
    }
    else if (untyped sheet.addRule != null) {
      var addRule: String -> String -> Int -> Int = untyped sheet.addRule;

      var Pattern = ~/^([^{]+)\{([^}]*)\}$/;

      if (Pattern.match(rule)) {
        var index = if (index_ == null) -1 else index_;

        addRule(Pattern.matched(1).trim(), Pattern.matched(2).trim(), index);

        var rules = getCssRules(sheet);

        var newIndex = if (index == -1) rules.length - 1 else index;

        return rules[newIndex];
      }
    }

    return Stax.error('Invalid rule: ' + rule);
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
    else if (untyped elem.currentStyle != null) {
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

  public static function getCssPropertyIfSet(elem: HTMLElement, name: String): Option<String> {
    return getCssProperty(elem, name).filter(function(style) return style != '');
  }
  /** Retrieves the dimensions of the viewport (inner window of the browser,
   * for top-level windows).
   */
  public static function getViewportSize(): { dx: Int, dy: Int } {
    return if (Env.window.innerWidth != null) {
      dx: Env.window.innerWidth,
      dy: Env.window.innerHeight
    }
    else if (untyped Env.document.documentElement != null && untyped Env.document.documentElement.clientWidth != null && untyped Env.document.documentElement.clientWidth != 0) {
      dx: untyped Env.document.documentElement.clientWidth,
      dy: untyped Env.document.documentElement.clientHeight
    }
    else {
      dx: untyped Env.document.body.clientWidth,
      dy: untyped Env.document.body.clientHeight
    }
  }

  /** Retrieves the scroll of the page, in pixels. */
  public static function getPageScroll(): { x: Int, y: Int } {
    var xScroll: Int = 0;
    var yScroll: Int = 0;

    if (untyped Env.window.pageYOffset != null) {
      yScroll = untyped Env.window.pageYOffset;
      xScroll = untyped Env.window.pageXOffset;
    }
    else if (untyped Env.document.documentElement != null && untyped Env.document.documentElement.scrollTop != null) {
      yScroll = untyped Env.document.documentElement.scrollTop;
      xScroll = untyped Env.document.documentElement.scrollLeft;
    }
    else if (Env.document.body != null) {
      yScroll = untyped Env.document.body.scrollTop;
      xScroll = untyped Env.document.body.scrollLeft;
    }

    return { x: xScroll, y: yScroll };
  }

  /** Retrieves the height of the page, in pixels. */
  public static function getPageHeight(): Int {
    var windowHeight: Int = 0;

    if (untyped Env.window.innerHeight != null) {
      windowHeight = untyped Env.window.innerHeight;
    }
    else if (untyped Env.document.documentElement != null && untyped Env.document.documentElement.clientHeight != null) {
      windowHeight = untyped Env.document.documentElement.clientHeight;
    }
    else if (Env.document.body != null) {
      windowHeight = untyped Env.document.body.clientHeight;
    }

    return windowHeight;
  }

  /** Determines if the specified element has the specified attribute.
   */
  public static function hasAttribute(e: HTMLElement, attr: String): Bool {
    if (e.hasAttribute != null) {
      return e.hasAttribute(attr);
    }
    else {
      var value = e.getAttribute(attr);

      return if (Env.eq(value, null) || Env.eq(value, '')) false else true;
    }
  }

  /** Retrieves the offset of the document's body, relative to the window origin.
   */
  public static function getBodyOffset(doc: HTMLDocument): Option<{ x: Int, y: Int }> {
    return Env.document.toOption().flatMap(function(document) {
      return document.body.toOption();
    }).map(function(body) {
      var top  = body.offsetTop;
      var left = body.offsetLeft;

      if (BrowserSupport.offsetDoesNotIncludeMarginInBodyOffset()) {
        top  += getComputedCssProperty(body, 'margin-top').map(function(s) return s.toInt(0)).getOrElseC(0);
        left += getComputedCssProperty(body, 'margin-left').map(function(s) return s.toInt(0)).getOrElseC(0);
      }

      return { x: left, y: top };
    });
  }
  /**
  *   Set the current coordinates of the element, relative to the document.
  */
  public static function setOffset(elem: HTMLElement, offset: { x: Int, y: Int }): HTMLElement{
    if (elem == null || elem.ownerDocument == null) return elem;
    else{
      var position = getComputedCssProperty( elem, 'position' );
      position.foreach(function(v){
        if ( v == 'static' ) elem.style.position = 'relative';
      });

      var curOffset = getOffset(elem).getOrElseC({ x: 0, y: 0});
      var curTop    = getComputedCssProperty( elem, 'top' ).map(function(s) return s.toInt(0)).getOrElseC(0);
      var curLeft   = getComputedCssProperty( elem, 'left').map(function(s) return s.toInt(0)).getOrElseC(0);

      elem.style.top  = ((offset.y - curOffset.y) + curTop).toString() + "px";
      elem.style.left = ((offset.x - curOffset.x) + curLeft).toString() + "px";

      return elem;
    }
  }

  /**
   * Adds the specified class the element.
   */
  public static function addClass(element: HTMLElement, value: String){
    if (!hasClass(element, value))
      element.className += (if (element.className != null && element.className != "") ' ' else '') + value;
  }
  /**
   * Remove a single the element.
   */
  public static function removeClass(element: HTMLElement, value: String){
    var result        = new EReg('(^|\\s)' + value + '(\\s|$)', 'g').replace(element.className,"$2");
    element.className = new EReg('/^\\s|\\s$/', "").replace(result, '');
  }

  /**
   * Determine whether the element is assigned the given class.
   */
  public static function hasClass(element: HTMLElement, value: String){
    var r = new EReg('(^|\\s)' + value + '(\\s|$)', "");
    return if (element.className != null) r.match(element.className); else false;
  }

  public static function setWidth(elem: HTMLElement, width: Int): HTMLElement{
    return setCssProperty(elem, "width", width.toString() + "px");
  }
  public static function setHeight(elem: HTMLElement, hight: Int): HTMLElement{
    return setCssProperty(elem, "height", hight.toString() + "px");
  }

  /**
   *  Sets new value of the css property.
   */
  public static function setCssProperty(elem: HTMLElement, name: String, value: String): HTMLElement{
    trace("setting CSS property");
    if (elem == null || elem.nodeType == 3 || elem.nodeType == 8) { trace('elem is null'); return elem; }
    else{
      // ignore negative width and height values #1599
      if ( (name == "width" || name == "height") && value.toFloat() < 0 ) {
        return elem;
      }
      else{
        var style = elem.style;
        // IE uses filters for opacity
        if (name == "opacity" && !BrowserSupport.opacity()) {
          //trace('IE supports opacity');
          // IE has trouble with opacity if it does not have layout
          // Force it by setting the zoom level
          untyped style.zoom = 1;

          // Set the alpha filter to set the opacity
          var opacity = "alpha(opacity=" + value.toInt() * 100 + ")";
          
          var filter = if (untyped style.filter != null) getComputedCssProperty(elem, "filter").getOrElseC("") else "";
          
          var newFilter = if (AlphaPattern.match(filter)) AlphaPattern.replace(filter, opacity) else opacity;
          
          untyped style.filter = newFilter;
        }
        else {
          var propertyName = getActualCssPropertyName(name).toCamelCase();

          untyped elem.style[propertyName] = value;
        }

        return elem;
      }
    }
  }

   /**
 * Get the current computed height for the  element , including padding but not border.
 */
  public static function getInnerHeight(elem: HTMLElement): Option<Int>{
    return getWidthOrHeight(elem, "offsetHeight", cssHeight, "padding");
  }
 /**
 * Get the current computed height for the element, including padding, border, and optionally margin.
 */
  public static function getOuterHeight(elem: HTMLElement, includeMargin: Bool): Option<Int>{
    return getWidthOrHeight(elem, "offsetHeight", cssHeight, if (includeMargin) "margin" else "border");
  }

  /**
  * Get the current computed width for the element, including padding but not border.
  */
  public static function getInnerWidth(elem: HTMLElement): Option<Int>{
    return getWidthOrHeight(elem, "offsetWidth", cssWidth, "padding");
  }
  /**
  * Get the current computed width for the element, including padding and border.
  */
  public static function getOuterWidth(elem: HTMLElement, includeMargin: Bool): Option<Int>{
    return getWidthOrHeight(elem, "offsetWidth", cssWidth, if (includeMargin) "margin" else "border");
  }


  public static function getHeight(elem: HTMLElement): Option<Int>{
    return getWidthOrHeight(elem, "offsetHeight", cssHeight, "");
  }

  public static function getWidth(elem: HTMLElement): Option<Int>{
    return getWidthOrHeight(elem, "offsetWidth", cssWidth, "");
  }

  private static function getWidthOrHeight(elem: HTMLElement, offsetValueExtract: String, which: Array<String>, extra: String): Option<Int>{
    if (elem == null || elem.ownerDocument == null) return None;
    else{
      var val = 0;
      if ( elem.offsetWidth != 0 ) {
        val = getWH(elem, offsetValueExtract, which, extra);
      } else {
        val = swap(elem, cssShow, function(value){
          return getWH(elem, offsetValueExtract, which, extra);
        });
      }
      return Some(Math.max(0, Math.round(val)).toInt());
    }
  }
  private static function swap<T>(elem: HTMLElement, values: Map<String, String>, functionCallback: Function<HTMLElement, T>): T{
    var elemStyle = setAndStore(elem, values);
    var result = untyped functionCallback.call(elem);
    setAndStore(elem, elemStyle);
    return result;
  }
  private static function setAndStore(elem: HTMLElement, styles: Map<String, String>){
    var values : Map<String, String> = Map.create();
    for (k in styles.iterator()) {
      values = values.set(k._1, untyped elem.style[ k._1 ]);
      untyped elem.style[ k._1 ] = k._2;
    }
    return values;
  }

  private static function getWH(elem: HTMLElement, offsetValueExtract: String, which: Array<String>, extra: String): Int{
    var val: Int = untyped elem[offsetValueExtract];

    if (extra != "border"){
      which.foreach(function(v) {
        if (extra != ""){
           val -= getCssPropertyIfSet( elem, 'padding-' + v).map(function(s) return s.toInt(0)).getOrElseC(0);
        }
        if (extra == "margin"){
          val += getCssPropertyIfSet( elem, 'margin-' + v).map(function(s) return s.toInt(0)).getOrElseC(0);
        }
        else{
          val -= getCssPropertyIfSet( elem, 'border-' + v + '-width').map(function(s) return s.toInt(0)).getOrElseC(0);
        }
      });
    }
    return val;
  }

  /** Retrieves the offset of the element, relative to the window origin.
   */
  public static function getOffset(elem: HTMLElement): Option<{ x: Int, y: Int }> {
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

      return Some({ x: left, y: top });
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

      return Some({ x: left, y: top });
    }
  }

  public static function getPosition(elem: HTMLElement): Option<{ x: Int, y: Int }> {
    if (elem == null || elem.ownerDocument == null) return None;

    var offsetParent = offsetParent(elem);
    var offset       = getOffset(elem).getOrElseC({ x: 0, y: 0 });

    var parentOffset = if (RootPattern.match(offsetParent.nodeName)) { x: 0, y: 0 } else getOffset(offsetParent).getOrElseC({ x: 0, y: 0 });

    offset.x -= getCssPropertyIfSet(elem, "marginTop").getOrElseC("0").toInt();
    offset.y -= getCssPropertyIfSet(elem, "marginLeft").getOrElseC("0").toInt();


    // Add offsetParent borders
    parentOffset.x += getCssPropertyIfSet(offsetParent, "borderTopWidth").getOrElseC("0").toInt();
    parentOffset.y += getCssPropertyIfSet(offsetParent, "borderLeftWidth").getOrElseC("0").toInt();

    // Subtract the two offsets
    return Some({
      x: offset.x  - parentOffset.x,
      y: offset.y - parentOffset.y
    });
  }

  public static function offsetParent(elem: HTMLElement) {
    var offsetParent = if (elem.offsetParent != null) elem.offsetParent; else Env.document.body;

    while ( offsetParent != null && (!RootPattern.match(offsetParent.nodeName) && getCssProperty(offsetParent, "position").getOrElseC("") == "static") ) {
      offsetParent = offsetParent.offsetParent;
    }
    return offsetParent;
  }
}