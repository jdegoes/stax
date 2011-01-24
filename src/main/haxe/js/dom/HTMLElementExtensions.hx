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

import Prelude;
import Dom;

using haxe.data.collections.ArrayExtensions;
using PreludeExtensions;
using js.dom.HTMLDocumentExtensions;

class HTMLElementExtensions {
  
  public static function hasClass(e: HTMLElement, name: String): Bool {
    return e.getAttribute('class').split(" ").exists(function(e) { return e == name; });
  }
  

// ************************  As Element Functions
  
  public static inline function asIframe(e: HTMLElement): HTMLIFrameElement {
    return asIframeOption(e).get();
  }
  
  public static inline function asScript(e: HTMLElement): HTMLScriptElement {
    return asScriptOption(e).get();
  }
  
  public static inline function asDiv(e: HTMLElement): HTMLDivElement {
    return asDivOption(e).get();
  }
  
  public static inline function asForm(e: HTMLElement): HTMLFormElement {
    return asFormOption(e).get();
  }
  
  public static inline function asBody(e: HTMLElement): HTMLBodyElement {
    return asBodyOption(e).get();
  }
  
  public static inline function asStyle(e: HTMLElement): HTMLStyleElement {
    return asStyleOption(e).get();
  }

  public static inline function asText(e: HTMLElement): HTMLTextElement {
    return asTextOption(e).get();
  }
  
  public static inline function asVideo(e: HTMLElement): HTMLVideoElement {
    return asVideoOption(e).get();
  }
  
  public static inline function asAudio(e: HTMLElement): HTMLAudioElement {
    return asAudioOption(e).get();
  }
  
  public static inline function asHead(e: HTMLElement): HTMLHeadElement {
    return asHeadOption(e).get();
  }
  
  public static inline function asLink(e: HTMLElement): HTMLLinkElement {
    return asLinkOption(e).get();
  }
  
  public static inline function asTitle(e: HTMLElement): HTMLTitleElement {
    return asTitleOption(e).get();
  }
  
  public static inline function asMeta(e: HTMLElement): HTMLMetaElement {
    return asMetaOption(e).get();
  }
  
  public static inline function asBase(e: HTMLElement): HTMLBaseElement {
    return asBaseOption(e).get();
  }
  
  public static inline function asIsIndex(e: HTMLElement): HTMLIsIndexElement {
    return asIsIndexOption(e).get();
  }
  
  public static inline function asSelect(e: HTMLElement): HTMLSelectElement {
    return asSelectOption(e).get();
  }
  
  public static inline function asCanvas(e: HTMLElement): HTMLCanvasElement {
    return asCanvasOption(e).get();
  }
  
  public static inline function asOptGroup(e: HTMLElement): HTMLOptGroupElement {
    return asOptGroupOption(e).get();
  }
  
  public static inline function asOption(e: HTMLElement): HTMLOptionElement {
    return asOptionOption(e).get();
  }
  
  public static inline function asInput(e: HTMLElement): HTMLInputElement {
    return asInputOption(e).get();
  }
  
  public static inline function asTextArea(e: HTMLElement): HTMLTextAreaElement {
    return asTextAreaOption(e).get();
  }
  
  public static inline function asButton(e: HTMLElement): HTMLButtonElement {
    return asButtonOption(e).get();
  }
  
  public static inline function asLabel(e: HTMLElement): HTMLLabelElement {
    return asLabelOption(e).get();
  }
  
  public static inline function asFieldSet(e: HTMLElement): HTMLFieldSetElement {
    return asFieldSetOption(e).get();
  }
  
  public static inline function asLegend(e: HTMLElement): HTMLLegendElement {
    return asLegendOption(e).get();
  }
  
  public static inline function asUList(e: HTMLElement): HTMLUListElement {
    return asUListOption(e).get();
  }
  
  public static inline function asOList(e: HTMLElement): HTMLOListElement {
    return asOListOption(e).get();
  }
  
  public static inline function asDList(e: HTMLElement): HTMLDListElement {
    return asDListOption(e).get();
  }
  
  public static inline function asDir(e: HTMLElement): HTMLDirectoryElement {
    return asDirOption(e).get();
  }
  
  public static inline function asMenu(e: HTMLElement): HTMLMenuElement {
    return asMenuOption(e).get();
  }
  
  public static inline function asLI(e: HTMLElement): HTMLLIElement {
    return asLIOption(e).get();
  }
  
  public static inline function asP(e: HTMLElement): HTMLParagraphElement {
    return asPOption(e).get();
  }
  
  public static inline function asH(e: HTMLElement): HTMLHeadingElement {
    return asHOption(e).get();
  }
  
  public static inline function asQuote(e: HTMLElement): HTMLQuoteElement {
    return asQuoteOption(e).get();
  }
  
  public static inline function asPre(e: HTMLElement): HTMLPreElement {
    return asPreOption(e).get();
  }
  
  public static inline function asBR(e: HTMLElement): HTMLBRElement {
    return asBROption(e).get();
  }
  
  public static inline function asBaseFont(e: HTMLElement): HTMLBaseFontElement {
    return asBaseFontOption(e).get();
  }
  
  public static inline function asFont(e: HTMLElement): HTMLFontElement {
    return asFontOption(e).get();
  }
  
  public static inline function asHR(e: HTMLElement): HTMLHRElement {
    return asHROption(e).get();
  }
  
  public static inline function asMod(e: HTMLElement): HTMLModElement {
    return asModOption(e).get();
  }
  
  public static inline function asA(e: HTMLElement): HTMLAnchorElement {
    return asAOption(e).get();
  }
  
  public static inline function asImage(e: HTMLElement): HTMLImageElement {
    return asImageOption(e).get();
  }
  
  public static inline function asObject(e: HTMLElement): HTMLObjectElement {
    return asObjectOption(e).get();
  }
  
  public static inline function asParam(e: HTMLElement): HTMLParamElement {
    return asParamOption(e).get();
  }
  
  public static inline function asApplet(e: HTMLElement): HTMLAppletElement {
    return asAppletOption(e).get();
  }
  
  public static inline function asMap(e: HTMLElement): HTMLMapElement {
    return asMapOption(e).get();
  }
  
  public static inline function asArea(e: HTMLElement): HTMLAreaElement {
    return asAreaOption(e).get();
  }
  
  public static inline function asTable(e: HTMLElement): HTMLTableElement {
    return asTableOption(e).get();
  }
  
  public static inline function asCaption(e: HTMLElement): HTMLTableCaptionElement {
    return asCaptionOption(e).get();
  }
  
  public static inline function asTD(e: HTMLElement): HTMLTableColElement {
    return asTDOption(e).get();
  }
  
  public static inline function asTHead(e: HTMLElement): HTMLTableSectionElement {
    return asTHeadOption(e).get();
  }
  
  public static inline function asTBody(e: HTMLElement): HTMLTableSectionElement {
    return asTBodyOption(e).get();
  }
  
  public static inline function asTFoot(e: HTMLElement): HTMLTableSectionElement {
    return asTFootOption(e).get();
  }
  
  public static inline function asTR(e: HTMLElement): HTMLTableRowElement {
    return asTROption(e).get();
  }
  
  public static inline function asFrameSet(e: HTMLElement): HTMLFrameSetElement {
    return asFrameSetOption(e).get();
  }
  
  public static inline function asFrame(e: HTMLElement): HTMLFrameElement {
    return asFrameOption(e).get();
  }
  
  public static inline function asIFrame(e: HTMLElement): HTMLIFrameElement {
    return asIFrameOption(e).get();
  }
  
  
  
// ************************ As Element Option Functions

  public static inline function asIframeOption(e: HTMLElement): Option<HTMLIFrameElement> {
    return if (e.nodeName == 'IFRAME') Some(cast e); else None;
  }
  
  public static inline function asScriptOption(e: HTMLElement): Option<HTMLScriptElement> {
    return if (e.nodeName == 'SCRIPT') Some(cast e); else None;
  }
  
  public static inline function asDivOption(e: HTMLElement): Option<HTMLDivElement> {
    return if (e.nodeName == 'DIV') Some(cast e); else None;
  }
  
  public static inline function asFormOption(e: HTMLElement): Option<HTMLFormElement> {
    return if (e.nodeName == 'FORM') Some(cast e); else None;
  }
  
  public static inline function asBodyOption(e: HTMLElement): Option<HTMLBodyElement> {
    return if (e.nodeName == 'BODY') Some(cast e); else None;
  }
  
  public static inline function asStyleOption(e: HTMLElement): Option<HTMLStyleElement> {
    return if (e.nodeName == 'STYLE') Some(cast e); else None;
  }

  public static inline function asTextOption(e: HTMLElement): Option<HTMLTextElement> {
    return if (e.nodeName == 'TEXT') Some(cast e); else None;
  }
  
  public static inline function asVideoOption(e: HTMLElement): Option<HTMLVideoElement> {
    return if (e.nodeName == 'VIDEO') Some(cast e); else None;
  }
  
  public static inline function asAudioOption(e: HTMLElement): Option<HTMLAudioElement> {
    return if (e.nodeName == 'AUDIO') Some(cast e); else None;
  }
  
  public static inline function asHeadOption(e: HTMLElement): Option<HTMLHeadElement> {
    return if (e.nodeName == 'HEAD') Some(cast e); else None;
  }
  
  public static inline function asLinkOption(e: HTMLElement): Option<HTMLLinkElement> {
    return if (e.nodeName == 'LINK') Some(cast e); else None;
  }
  
  public static inline function asTitleOption(e: HTMLElement): Option<HTMLTitleElement> {
    return if (e.nodeName == 'TITLE') Some(cast e); else None;
  }
  
  public static inline function asMetaOption(e: HTMLElement): Option<HTMLMetaElement> {
    return if (e.nodeName == 'META') Some(cast e); else None;
  }
  
  public static inline function asBaseOption(e: HTMLElement): Option<HTMLBaseElement> {
    return if (e.nodeName == 'BASE') Some(cast e); else None;
  }
  
  public static inline function asIsIndexOption(e: HTMLElement): Option<HTMLIsIndexElement> {
    return if (e.nodeName == 'ISINDEX') Some(cast e); else None;
  }
  
  public static inline function asSelectOption(e: HTMLElement): Option<HTMLSelectElement> {
    return if (e.nodeName == 'SELECT') Some(cast e); else None;
  }
  
  public static inline function asCanvasOption(e: HTMLElement): Option<HTMLCanvasElement> {
    return if (e.nodeName == 'CANVAS') Some(cast e); else None;
  }
  
  public static inline function asOptGroupOption(e: HTMLElement): Option<HTMLOptGroupElement> {
    return if (e.nodeName == 'OPTGROUP') Some(cast e); else None;
  }
  
  public static inline function asOptionOption(e: HTMLElement): Option<HTMLOptionElement> {
    return if (e.nodeName == 'OPTION') Some(cast e); else None;
  }
  
  public static inline function asInputOption(e: HTMLElement): Option<HTMLInputElement> {
    return if (e.nodeName == 'INPUT') Some(cast e); else None;
  }
  
  public static inline function asTextAreaOption(e: HTMLElement): Option<HTMLTextAreaElement> {
    return if (e.nodeName == 'TEXTAREA') Some(cast e); else None;
  }
  
  public static inline function asButtonOption(e: HTMLElement): Option<HTMLButtonElement> {
    return if (e.nodeName == 'BUTTON') Some(cast e); else None;
  }
  
  public static inline function asLabelOption(e: HTMLElement): Option<HTMLLabelElement> {
    return if (e.nodeName == 'LABEL') Some(cast e); else None;
  }
  
  public static inline function asFieldSetOption(e: HTMLElement): Option<HTMLFieldSetElement> {
    return if (e.nodeName == 'FIELDSET') Some(cast e); else None;
  }
  
  public static inline function asLegendOption(e: HTMLElement): Option<HTMLLegendElement> {
    return if (e.nodeName == 'LEGEND') Some(cast e); else None;
  }
  
  public static inline function asUListOption(e: HTMLElement): Option<HTMLUListElement> {
    return if (e.nodeName == 'UL') Some(cast e); else None;
  }
  
  public static inline function asOListOption(e: HTMLElement): Option<HTMLOListElement> {
    return if (e.nodeName == 'OL') Some(cast e); else None;
  }
  
  public static inline function asDListOption(e: HTMLElement): Option<HTMLDListElement> {
    return if (e.nodeName == 'DL') Some(cast e); else None;
  }
  
  public static inline function asDirOption(e: HTMLElement): Option<HTMLDirectoryElement> {
    return if (e.nodeName == 'DIR') Some(cast e); else None;
  }
  
  public static inline function asMenuOption(e: HTMLElement): Option<HTMLMenuElement> {
    return if (e.nodeName == 'MENU') Some(cast e); else None;
  }
  
  public static inline function asLIOption(e: HTMLElement): Option<HTMLLIElement> {
    return if (e.nodeName == 'LI') Some(cast e); else None;
  }
  
  public static inline function asPOption(e: HTMLElement): Option<HTMLParagraphElement> {
    return if (e.nodeName == 'P') Some(cast e); else None;
  }
  
  public static inline function asHOption(e: HTMLElement): Option<HTMLHeadingElement> {
    return if (e.nodeName == 'H') Some(cast e); else None;
  }
  
  public static inline function asQuoteOption(e: HTMLElement): Option<HTMLQuoteElement> {
    return if (e.nodeName == 'QUOTE') Some(cast e); else None;
  }
  
  public static inline function asPreOption(e: HTMLElement): Option<HTMLPreElement> {
    return if (e.nodeName == 'PRE') Some(cast e); else None;
  }
  
  public static inline function asBROption(e: HTMLElement): Option<HTMLBRElement> {
    return if (e.nodeName == 'BR') Some(cast e); else None;
  }
  
  public static inline function asBaseFontOption(e: HTMLElement): Option<HTMLBaseFontElement> {
    return if (e.nodeName == 'BASEFONT') Some(cast e); else None;
  }
  
  public static inline function asFontOption(e: HTMLElement): Option<HTMLFontElement> {
    return if (e.nodeName == 'FONT') Some(cast e); else None;
  }
  
  public static inline function asHROption(e: HTMLElement): Option<HTMLHRElement> {
    return if (e.nodeName == 'HR') Some(cast e); else None;
  }
  
  public static inline function asModOption(e: HTMLElement): Option<HTMLModElement> {
    return if (e.nodeName == 'MOD') Some(cast e); else None;
  }
  
  public static inline function asAOption(e: HTMLElement): Option<HTMLAnchorElement> {
    return if (e.nodeName == 'A') Some(cast e); else None;
  }
  
  public static inline function asImageOption(e: HTMLElement): Option<HTMLImageElement> {
    return if (e.nodeName == 'IMG') Some(cast e); else None;
  }
  
  public static inline function asObjectOption(e: HTMLElement): Option<HTMLObjectElement> {
    return if (e.nodeName == 'OBJECT') Some(cast e); else None;
  }
  
  public static inline function asParamOption(e: HTMLElement): Option<HTMLParamElement> {
    return if (e.nodeName == 'PARAM') Some(cast e); else None;
  }
  
  public static inline function asAppletOption(e: HTMLElement): Option<HTMLAppletElement> {
    return if (e.nodeName == 'APPLET') Some(cast e); else None;
  }
  
  public static inline function asMapOption(e: HTMLElement): Option<HTMLMapElement> {
    return if (e.nodeName == 'MAP') Some(cast e); else None;
  }
  
  public static inline function asAreaOption(e: HTMLElement): Option<HTMLAreaElement> {
    return if (e.nodeName == 'AREA') Some(cast e); else None;
  }
  
  public static inline function asTableOption(e: HTMLElement): Option<HTMLTableElement> {
    return if (e.nodeName == 'TABLE') Some(cast e); else None;
  }
  
  public static inline function asCaptionOption(e: HTMLElement): Option<HTMLTableCaptionElement> {
    return if (e.nodeName == 'CAPTION') Some(cast e); else None;
  }
  
  public static inline function asTDOption(e: HTMLElement): Option<HTMLTableColElement> {
    return if (e.nodeName == 'TD') Some(cast e); else None;
  }
  
  public static inline function asTHeadOption(e: HTMLElement): Option<HTMLTableSectionElement> {
    return if (e.nodeName == 'THEAD') Some(cast e); else None;
  }
  
  public static inline function asTBodyOption(e: HTMLElement): Option<HTMLTableSectionElement> {
    return if (e.nodeName == 'TBODY') Some(cast e); else None;
  }
  
  public static inline function asTFootOption(e: HTMLElement): Option<HTMLTableSectionElement> {
    return if (e.nodeName == 'TFOOT') Some(cast e); else None;
  }
  
  public static inline function asTROption(e: HTMLElement): Option<HTMLTableRowElement> {
    return if (e.nodeName == 'TR') Some(cast e); else None;
  }
  
  public static inline function asFrameSetOption(e: HTMLElement): Option<HTMLFrameSetElement> {
    return if (e.nodeName == 'FRAMESET') Some(cast e); else None;
  }
  
  public static inline function asFrameOption(e: HTMLElement): Option<HTMLFrameElement> {
    return if (e.nodeName == 'FRAME') Some(cast e); else None;
  }
  
  public static inline function asIFrameOption(e: HTMLElement): Option<HTMLIFrameElement> {
    return if (e.nodeName == 'IFRAME') Some(cast e); else None;
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
}