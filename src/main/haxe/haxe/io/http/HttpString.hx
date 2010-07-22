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
package haxe.io.http;

import Prelude;
import haxe.io.http.Http;
import haxe.net.Url;
import haxe.net.HttpResponseCode;
import haxe.data.collections.Map;

#if js
import Dom;
import js.Env;
import js.dom.Quirks;
#end

using Prelude;
using haxe.abstract.Foldable;
using haxe.net.HttpResponseCodeExtensions;
using haxe.net.UrlExtensions;
using haxe.net.HttpHeaderExtensions;

interface HttpString implements Http<String> {
}

#if js

class AsynchronousHttpString implements HttpString {
  public function new() { }
  
  public function get(url: Url, ?params: QueryParameters, ?headers: Map<String, String>): Future<HttpResponse<String>> {
    return doRequest('GET', url, params, headers);
  }
  
  public function post(url: Url, data: String, ?params: QueryParameters, ?headers: Map<String, String>): Future<HttpResponse<String>> {
    return doRequest('POST', url, params, headers);
  }
  
  public function put(url: Url, data: String, ?params: QueryParameters, ?headers: Map<String, String>): Future<HttpResponse<String>> {
    return doRequest('PUT', url, params, headers);
  }
  
  public function delete(url: Url, ?params: QueryParameters, ?headers: Map<String, String>): Future<HttpResponse<String>> {
    return doRequest('DELETE', url, params, headers);
  }
  
  private function doRequest(method: String, _url: Url, ?_params: QueryParameters, ?_headers: Map<String, String>): Future<HttpResponse<String>> {
    var url = _url.addQueryParameters(OptionExtensions.toOption(_params).getOrElseC({}));
    
    //untyped alert(url);
    
    var future: Future<HttpResponse<String>> = new Future();
    
    var request = Quirks.createXMLHttpRequest();
    
    future.ifCanceled(request.abort.swallow());
    
    request.onreadystatechange = function() {
      var toBody = function(text: String): Option<String> { return if (text == null || text.length == 0) None; else Some(text); }
      
      if (request.readyState == XmlHttpRequestState.DONE) {
        future.deliver({
          body:     toBody(request.responseText),
          headers:  request.getAllResponseHeaders().toHttpHeaders(),
          code:     request.status.toHttpResponseCode()
        });
      }
    }
    
    var setHeaders = _headers.toOption().map(function(headers) {
      return function(request: XMLHttpRequest): Void {
        headers.foreach(function(header) {
          request.setRequestHeader(header._1, header._2);
        });
      }
    }).getOrElseC(function(request: XMLHttpRequest): Void { });
    
    setHeaders(request);
    
    try {
      request.open(method, url, true);
    }
    catch (e: Dynamic) {
      future.cancel();
    }
    
    return future;
  }
}

#end