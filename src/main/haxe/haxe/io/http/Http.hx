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
import haxe.data.collections.Map;
import haxe.net.Url;
import haxe.net.HttpResponseCode;

using PreludeExtensions;

typedef HttpResponse<T> = {
  code:     HttpResponseCode,
  body:     Option<T>,
  headers:  Map<String, String>
}

/** An interface for performing HTTP requests - GET, POST, PUT, and DELETE. The
 * interface is generic in the type of the request/response data, because some
 * implementations (e.g. JSONP on the JavaScript target) can only deal with 
 * certain kinds of data.
 */
interface Http<T> {
  public function get(url: Url, ?params: QueryParameters, ?headers: Map<String, String>): Future<HttpResponse<T>>;
    
  public function post(url: Url, data: T, ?params: QueryParameters, ?headers: Map<String, String>): Future<HttpResponse<T>>;
    
  public function put(url: Url, data: T, ?params: QueryParameters, ?headers: Map<String, String>): Future<HttpResponse<T>>;
    
  public function delete(url: Url, ?params: QueryParameters, ?headers: Map<String, String>): Future<HttpResponse<T>>;
}

class HttpJValueTransformer<S, T> implements Http<T> {
  var http: Http<S>;
  var encoder: T -> S;
  var decoder: S -> T;
  
  public function new(http: Http<S>, encoder: T -> S, decoder: S -> T) {
    this.http    = http;
    this.encoder = encoder;
    this.decoder = decoder;
  }
  
  public function get(url: Url, ?params: QueryParameters, ?headers: Map<String, String>): Future<HttpResponse<T>> {
    return http.get(url, params, headers).map(transformResponse);
  }
  
  public function post(url: Url, data: T, ?params: QueryParameters, ?headers: Map<String, String>): Future<HttpResponse<T>> {
    return http.post(url, encoder(data), params, headers).map(transformResponse);
  }
  
  public function put(url: Url, data: T, ?params: QueryParameters, ?headers: Map<String, String>): Future<HttpResponse<T>> {
    return http.put(url, encoder(data), params, headers).map(transformResponse);
  }
  
  public function delete(url: Url, ?params: QueryParameters, ?headers: Map<String, String>): Future<HttpResponse<T>> {
    return http.delete(url, params, headers).map(transformResponse);
  }
  
  public function transformResponse(r: HttpResponse<S>): HttpResponse<T> {
    return {
      body:     r.body.map(decoder),
      headers:  r.headers,
      code:     r.code
    }
  }
}