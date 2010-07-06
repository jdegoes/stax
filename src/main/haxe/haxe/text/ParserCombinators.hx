/*
 HaXe library written by John A. De Goes <john@socialmedia.com>
 Contributed by Social Media Networks

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

package haxe.text;

class ParserCombinators<T> {
	public function new() {		
	}
	
	public function literal(s: String): Parser<ParseInput<T>, ParseFailure> {
	  return function(i: ParseInput<T>) {
	    return if (i.rest.startsWith(s)) i.consume(s.length);
	           else i.fail("Expected '" + s + "' but found '" + i.rest.substr(0, Math.min(i.rest.length, s.length)) + "'");
	  }
	}
	
	public function whitespaceChar(): Parser<ParseInput<T>, ParseFailure> {
	  return function(i: ParseInput<T>) {
	    var s = i.rest.substr(0, 1);
	    
	    return if (s == " " || s == "\t" || s == "\r" || s == "\n") i.consume(1);
	           else i.fail("Expected whitespace but found '" + i.rest.substr(0, Math.min(i.rest.length, s.length)) + "'");
	  };
	}
	
	public function digitChar(): Parser<ParseInput<T>, ParseFailure> {
	  return function(i: ParseInput<T>) {
	    var s = i.rest.substr(0, 1);
	    
	    return if (~/^[0-9]$/.match(s)) i.consume(1);
	           else i.fail("Expected digit but found '" + s + "'");
	  }
	}
}