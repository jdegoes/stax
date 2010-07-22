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
package haxe.net;

import Prelude;
import haxe.test.TestCase;
import haxe.test.Assert;
import haxe.net.HttpHeader;

using Prelude;
using haxe.net.HttpHeaderExtensions;

class HttpHeaderExtensionsTestCase extends TestCase {
  static var headerEq = Tuple2.EqualT(String.EqualT(), String.EqualT());
  
	public function new() {
	  super();
	}
	
	public function testThatValidHeaderCanBeParsed() {
	  var header  = " Mime-type : text/html ";
	  var headerP = "Mime-type".entuple("text/html");
	  
	  Assert.equals(headerP, header.toHttpHeader().get(), headerEq);
	}
	
	public function testThatValidHeaderCanBeIdentified() {
	  var header = " Mime-type text/html ";
	  
	  Assert.isTrue(header.toHttpHeader().isEmpty());
	}
	
	public function testThatHeadersCanBeParsedWithCrLf() {
	  var headers = " mime-type: text/html\r\n cache-expire : 0 \r\n";
	  
	  var headersP = headers.toHttpHeaders();
	  
	  Assert.equals('text/html', headersP.get('mime-type').get());
	  Assert.equals('0', headersP.get('cache-expire').get());
	}
	
	public function testThatHeadersCanBeParsedWithLf() {
	  var headers = " mime-type: text/html\n cache-expire : 0 \n";
	  
	  var headersP = headers.toHttpHeaders();
	  
	  Assert.equals('text/html', headersP.get('mime-type').get());
	  Assert.equals('0', headersP.get('cache-expire').get());
	}
}