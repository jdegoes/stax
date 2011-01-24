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
import PreludeExtensions;

using PreludeExtensions;

class HTMLEventExtensions {
  public function cancelBubbling(e: EventListener<Dynamic>): Void {
    var cancelBubble = untyped e.cancelBubble;
    if (cancelBubble != null) {
      untyped e.cancelBubble = true;
    }
    else {
      untyped e.stopPropagation();
    }
  }
  
  private function getRelatedTarget(event: EventListener<Dynamic>): HTMLElement {
    var ms: HTMLElement  = untyped event.toElement;
    var net: HTMLElement = untyped event.relatedTarget;
    return if (ms != null) { 
      ms; 
    } else if (net != null) {
      net;
    } else null;
  }
}