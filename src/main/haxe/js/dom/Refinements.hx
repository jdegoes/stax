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

using PreludeExtensions;

class Refinements {
	public static inline function asIframe(e: HTMLElement): HTMLIFrameElement {
	  return iframeOption(e).get();
	}
	
	public static inline function asScript(e: HTMLElement): HTMLScriptElement {
	  return scriptOption(e).get();
	}
	
	public static inline function asDiv(e: HTMLElement): HTMLDivElement {
	  return divOption(e).get();
	}
	
	public static inline function asForm(e: HTMLElement): HTMLFormElement {
	  return formOption(e).get();
	}
	
	public static inline function asBody(e: HTMLElement): HTMLBodyElement {
	  return bodyOption(e).get();
	}
	
	public static inline function asStyle(e: HTMLElement): HTMLStyleElement {
	  return styleOption(e).get();
	}

	public static inline function asText(e: HTMLElement): HTMLTextElement {
	  return textOption(e).get();
	}
	
	public static inline function asVideo(e: HTMLElement): HTMLVideoElement {
	  return videoOption(e).get();
	}
	
	public static inline function asAudio(e: HTMLElement): HTMLAudioElement {
	  return audioOption(e).get();
	}
	
	
	
	
	
	// ************************
	public static inline function iframeOption(e: HTMLElement): Option<HTMLIFrameElement> {
	  return if (e.nodeName == 'IFRAME') Some(cast e); else None;
	}
	
	public static inline function scriptOption(e: HTMLElement): Option<HTMLScriptElement> {
	  return if (e.nodeName == 'SCRIPT') Some(cast e); else None;
	}
	
	public static inline function divOption(e: HTMLElement): Option<HTMLDivElement> {
	  return if (e.nodeName == 'DIV') Some(cast e); else None;
	}
	
	public static inline function formOption(e: HTMLElement): Option<HTMLFormElement> {
	  return if (e.nodeName == 'FORM') Some(cast e); else None;
	}
	
	public static inline function bodyOption(e: HTMLElement): Option<HTMLBodyElement> {
	  return if (e.nodeName == 'BODY') Some(cast e); else None;
	}
	
	public static inline function styleOption(e: HTMLElement): Option<HTMLStyleElement> {
	  return if (e.nodeName == 'STYLE') Some(cast e); else None;
	}

	public static inline function textOption(e: HTMLElement): Option<HTMLTextElement> {
	  return if (e.nodeName == 'TEXT') Some(cast e); else None;
	}
	
	public static inline function videoOption(e: HTMLElement): Option<HTMLVideoElement> {
	  return if (e.nodeName == 'VIDEO') Some(cast e); else None;
	}
	
	public static inline function audioOption(e: HTMLElement): Option<HTMLAudioElement> {
	  return if (e.nodeName == 'AUDIO') Some(cast e); else None;
	}
	
	
	
	
	
	
	
}