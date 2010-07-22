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
package haxe.net;

import Prelude;

import haxe.test.TestCase;

import haxe.net.Url;

using haxe.net.UrlExtensions;

using Prelude;

class UrlExtensionsTestCase extends TestCase {
	public function testParseUrl1() {
	  var p = 'ftp://eau.ww.eesd.gov.calgary/home/smith/budget.wk1?foo=bar#top'.toParsedUrl().get();

	  assertEquals('#top', p.hash);
	  assertEquals('eau.ww.eesd.gov.calgary', p.host);
	  assertEquals('eau.ww.eesd.gov.calgary', p.hostname);
	  assertEquals('ftp://eau.ww.eesd.gov.calgary/home/smith/budget.wk1?foo=bar#top', p.href);
	  assertEquals('/home/smith/budget.wk1', p.pathname);
	  assertEquals('', p.port);
	  assertEquals('ftp:', p.protocol);
	  assertEquals('?foo=bar', p.search);
	}
	
	public function testParseUrl2() {
	  var p = 'ftp://eau.ww.eesd.gov.calgary:923/home/smith/budget.wk1?foo=bar#top'.toParsedUrl().get();

	  assertEquals('#top', p.hash);
	  assertEquals('eau.ww.eesd.gov.calgary:923', p.host);
	  assertEquals('eau.ww.eesd.gov.calgary', p.hostname);
	  assertEquals('ftp://eau.ww.eesd.gov.calgary:923/home/smith/budget.wk1?foo=bar#top', p.href);
	  assertEquals('/home/smith/budget.wk1', p.pathname);
	  assertEquals('923', p.port);
	  assertEquals('ftp:', p.protocol);
	  assertEquals('?foo=bar', p.search);
	}
	
	
	public function testQueryStringBijection() {
	  var self = this;
	  
	  var identity = UrlExtensions.toQueryString.compose(UrlExtensions.toQueryParameters);
	  var test = function(s) self.assertEquals(s, identity(s));
	  
	  test('?foo=bar');
    test('?foo=');
	}
}