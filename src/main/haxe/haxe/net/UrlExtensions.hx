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
import haxe.net.Url;

using Prelude;

class UrlExtensions {
  // http://domain.com:80/path?foo=bar#body
  //
  // http:           //  domain.com      :  80          /  path               ?foo=bar         #body
  // (1 - protocol)      (2 - hostname)     (3 - port)     (4 - pathname)     (5 - search)     (6 - hash)
  static var UrlPattern = new EReg('^([a-zA-Z]+:)(?:[/][/])([^:?/#\\s]*)(?:[:](\\d+))?(/[^\\s?#]+)?([?][^\\s#]+)?(#.*)?$', 'i');
  
  static var Protocol = 1;
  static var Hostname = 2;
  static var Port     = 3;
  static var Pathname = 4;
  static var Search   = 5;
  static var Hash     = 6;
  
  /** Tries to parse the url, returning None if unsuccessful.
   */
  public static function toParsedUrl(s: String): Option<ParsedUrl> {
    var nonNull = function(s: String) return if (s == null) ''; else s;
    
    return if (UrlPattern.match(s)) {
      var port = nonNull(UrlPattern.matched(Port));
      
      Some({
        hash:     nonNull(UrlPattern.matched(UrlExtensions.Hash)),
        host:     nonNull(UrlPattern.matched(Hostname)) + (if (port == '') '' else ':' + port),
        hostname: nonNull(UrlPattern.matched(Hostname)),
        href:     s,
        pathname: nonNull(UrlPattern.matched(Pathname)),
        port:     port,
        protocol: nonNull(UrlPattern.matched(Protocol)),
        search:   nonNull(UrlPattern.matched(Search))
      });
    }
    else None;
  }
  
  /** Converts a parsed url into a Url in standard string form.
   */
  public static function toUrl(parsed: ParsedUrl): Url {
    return parsed.href;
  }
  
  public static function addQueryParameters(url: Url, params: QueryParameters): Url {
    var tqs = toQueryString(params);
    
    return switch (toParsedUrl(url)) {
      case None: url + tqs;
      
      case Some(parsed): 
        if (parsed.search.length == 0) url + tqs;
        else if (parsed.search.length == 1) url + tqs.substr(1);
        else url + '&' + tqs.substr(1);
    }
  }
  
  /** Converts a query string, which must begin with '?', into an anonymous 
   * object, whose fields all have string values.
   */
  public static function toQueryParameters(query: String): QueryParameters {
	  return if (!query.startsWith('?')) {};
	         else query.substr(1).split('&').flatMap(function(kv) {
             var a = kv.split('=').map(function(s) return s.urlDecode());
	    
	            return if (a.length == 0) [];
	                   else if (a.length == 1) [a[0].entuple('')];
	                   else [a[0].entuple(a[1])];
      	   }).foldl(cast {}, function(o, t) {
      	     Reflect.setField(o, t._1, t._2);
	    
      	     return o;
      	   });
	}
	
	/** Converts an anonymous object, whose fields all have string values, into a
	 * query string, beginning with the character '?'.
	 */
	public static function toQueryString(query: QueryParameters): String {
	  return Reflect.fields(query).foldl('?', function(url, fieldName) {
	    var fieldValue = Reflect.field(query, fieldName);
	    
	    var rest = StringTools.urlEncode(fieldName) + '=' + StringTools.urlEncode(fieldValue);
	    
	    return url + (if (url == '?') rest else '&' + rest);
	  });
	}
}