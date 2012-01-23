/*
 HaXe library written by Paul M. De Goes <paul@socialmedia.com> and John A. De Goes <john@socialmedia.com>

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
import Prelude;
import stax.Tuples;

using stax.Maths;
import stax.Options;
using stax.Options;


/** 
 * Comm]on elements.
 */
class HTMLDocumentExtensions {
  public static function newElement(document: HTMLDocument, eType: String, ?atts: Array<Tuple2<String, String>> = null,  ?style: String = ""): HTMLElement {
    var element = document.createElement(eType);
    if (atts != null) {
			for (i in 0...atts.length) {
				element.setAttribute(atts[i]._1, atts[i]._2);
			}			
		}
    if (style != null) {
			element.style.cssText = style;			
		}
    return element;
  }
  
  public static function newImage(doc: HTMLDocument): HTMLImageElement {
    return cast doc.createElement('IMG');
  }
  
  public static function newDiv(doc: HTMLDocument): HTMLDivElement {
    return cast doc.createElement('DIV');
  }
  
  public static function newIframe(doc: HTMLDocument, ?width: Int, ?height: Int): HTMLIFrameElement {
    var iframe: HTMLIFrameElement = cast doc.createElement('IFRAME');
    
    width.toOption().zip(height.toOption()).map(function(t) {
      iframe.setAttribute('width',   width.toString());
      iframe.setAttribute('height',  height.toString());
    });
    
    return iframe;
  }
  
  /** Creates a new iframe intended to be used as a window. This iframe will 
   * not have borders, will not allow resizing, will not have any margin or
   * padding, and will be transparent (depending on the body).
   */
  public static function newIframeWindow(doc: HTMLDocument, width: Int, height: Int): HTMLIFrameElement {
    var iframe = newIframe(doc, width, height);
    
    iframe.setAttribute('frameBorder',   '0');
    iframe.setAttribute('marginWidth',   '0');
    iframe.setAttribute('marginHeight',  '0');
    iframe.setAttribute('vspace',        '0');
    iframe.setAttribute('hspace',        '0');
    iframe.setAttribute('scrolling',     'no');
    iframe.setAttribute('noResize',      'noResize');
    iframe.setAttribute('allowTransparency', 'true');
    
    iframe.style.margin            = '0';
    iframe.style.padding           = '0';
    iframe.style.border            = 'none';
    iframe.style.borderLeftStyle   = 'none';
    iframe.style.borderRightStyle  = 'none';
    iframe.style.borderTopStyle    = 'none';
    iframe.style.borderBottomStyle = 'none';
    iframe.style.backgroundColor   = 'transparent';
    
    return iframe;
  }
  
  public static function newIframeInvisible(doc: HTMLDocument): HTMLIFrameElement {
    return newIframeWindow(doc, 0, 0);
  }
  
  public static function getId(doc: HTMLDocument, s: String): HTMLElement {
    return doc.getElementById(s);
  }
  
  public static function getIds(doc: HTMLDocument, a: Array<String>): Array<HTMLElement> {
    var result: Array<HTMLElement> = [];
    
    for (i in 0...a.length) {
      result.push(getId(doc, a[i]));
    }
    
    return result;
  }
  
  public static function getTags(doc: HTMLDocument, s: String): Array<HTMLElement> {
    return Options.getOrElseC(Options.toOption( cast doc.getElementsByTagName(s)), []);
  }
  
  public static function getClasses(doc: HTMLDocument, s: String): Array<HTMLElement> {
    return Options.getOrElseC(Options.toOption(Env.getElementsByClass(s)), []);
  }
}