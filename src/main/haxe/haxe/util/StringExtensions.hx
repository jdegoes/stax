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
using stax.Maths;

//BREAKING CHANGE: chars returns an Array.



using haxe.functional.FoldableExtensions;

class StringExtensions {
  static var SepAlphaPattern        = ~/(-|_)([a-z])/g;
  static var AlphaUpperAlphaPattern = ~/-([a-z])([A-Z])/g;

  public static function chunk(str: String, len: Int): Array<String> {
    var start = 0;
    var end   = (start + len).min(str.length);
    
    return if (end == 0) [];
     else {
       var prefix = str.substr(start, end);
       var rest   = str.substr(end);

			 [prefix].concat(chunk(rest, len));
     }
  }

  public static function chars(str: String): Array<String> {
    var a = [];
    
    for (i in 0...str.length) {
      a.push(str.charAt(i));
    }
    
    return a;
  }
  
  public static function string(l: Iterable<String>): String {
		var o = '';
		for ( val in l) {
			o += val;
		}
		return o;
  }
  
  public static function toCamelCase(str: String): String {
    return SepAlphaPattern.customReplace(str, function(e) { return e.matched(2).toUpperCase(); });
  }
  
  public static function fromCamelCase(str: String, sep: String): String {
    return AlphaUpperAlphaPattern.customReplace(str, function(e) { return e.matched(1) + sep + e.matched(2).toLowerCase(); });
  }
}