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
import haxe.text.json.JValue;
import haxe.text.json.Json;
import haxe.data.collections.Map;
import haxe.data.collections.Maps;

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

interface HttpJValue implements Http<JValue> {
}

#if js

class HttpJValueJsonp implements HttpJValue {
  static var Responders   = {};
  static var RequestMod   = Math.round(Math.random() * 2147483647);
  static var RequestCount = 0;
  
  var callbackParameterName: String;
  
  public function new(?callbackParameterName = 'callback') {
    this.callbackParameterName = callbackParameterName;
  }
  
  public function get(_url: Url, ?_params: QueryParameters, ?headers: Map<String, String>): Future<HttpResponse<JValue>> {
    var future: Future<HttpResponse<JValue>> = new Future();
    
    // Ignore headers or throw exception???
    var requestId = Math.round(RequestMod * (++RequestCount));
    
    var callbackName     = 'stax_jsonp_callback_' + requestId;
    var callbackFullName = 'haxe.io.http.HttpJValueJsonp.Responders.' + callbackName;
    
    var params = OptionExtensions.toOption(_params).getOrElseC({});
    
    Reflect.setField(params, callbackParameterName, callbackFullName);
    
    var url = _url.addQueryParameters(params);
    
    var doCleanup = function() {
      // Cleanup DOM & delete function:    
      Env.document.getElementsByTagName('HEAD')[0].removeChild(Env.document.getElementById(callbackName));
    
      Reflect.deleteField(Responders, callbackName);
    }
    
    future.ifCanceled(doCleanup);
    
    Reflect.setField(Responders, callbackName, function(data) {
      doCleanup();
      
      var code: HttpResponseCode;
      var response: Option<JValue>;
      
      try {
        response = Some(Json.fromObject(data));
        code     = Normal(Success(OK));
      }
      catch (e: Dynamic) {
        untyped alert(e);
        
        response = None;
        code     = Normal(Success(NoContent));
      }
      
      // Deliver future:
      future.deliver({
        body:     response,
        headers:  Maps.StringString,
        code:     code
      });
    });
    
    var script = Env.document.createElement('SCRIPT');
    
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src',  url);
    script.setAttribute('id',   callbackName);
    
    Env.document.getElementsByTagName('HEAD')[0].appendChild(script);
    
    return future;
  }
  
  public function post(url: Url, data: JValue, ?params: QueryParameters, ?headers: Map<String, String>): Future<HttpResponse<JValue>> {
    return Stax.error('JSONP does not support POST');
  }
  
  public function put(url: Url, data: JValue, ?params: QueryParameters, ?headers: Map<String, String>): Future<HttpResponse<JValue>> {
    return Stax.error('JSONP does not support PUT');
  }
  
  public function delete(url: Url, ?params: QueryParameters, ?headers: Map<String, String>): Future<HttpResponse<JValue>> {
    return Stax.error('JSONP does not support DELETE');
  }
}

#end