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
package haxe.util;

import Prelude;
import haxe.data.collections.List;

using PreludeExtensions;
using haxe.abstract.FoldableExtensions;

class StringExtensions {
	public static function chunk(str: String, len: Int): List<String> {
	  var start = 0;
	  var end   = (start + len).min(str.length);
	  
	  return if (end == 0) List.nil(String.EqualT());
	         else {
	           var prefix = str.substr(start, end);
	           var rest   = str.substr(end);
	    
	           chunk(rest, len).prepend(prefix);
	         }
	}
	
	public static function chars(str: String): List<String> {
	  var a = [];
	  
	  for (i in 0...str.length) {
	    a.push(str.charAt(i));
	  }
	  
	  return a.toList(String.EqualT());
	}
	
	public static function string(l: List<String>): String {
	  return l.foldr('', function(b, a) return b + a);
	}
}