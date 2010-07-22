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

import haxe.net.HttpResponseCode;

class HttpResponseCodeExtensions {
  public static function toHttpResponseCode(code: Int): HttpResponseCode {
    return switch(code) {
      case 100: Normal(Informational(Continue));
      case 101: Normal(Informational(SwitchingProtocols));
      case 102: Normal(Informational(Processing));  
      case 200: Normal(Success(OK));
      
      case 201: Normal(Success(Created));
      case 202: Normal(Success(Accepted));
      case 203: Normal(Success(Non));
      case 204: Normal(Success(NoContent));
      case 205: Normal(Success(ResetContent));
      case 206: Normal(Success(PartialContent));
      case 207: Normal(Success(Multi));
      
      case 300: Normal(Redirection(MultipleChoices));
      case 301: Normal(Redirection(MovedPermanently));
      case 302: Normal(Redirection(Found));
      case 303: Normal(Redirection(SeeOther));
      case 304: Normal(Redirection(NotModified));
      case 305: Normal(Redirection(UseProxy));
      case 307: Normal(Redirection(TemporaryRedirect));
      
      case 400: Error(Client(BadRequest));
      case 401: Error(Client(Unauthorized));
      case 402: Error(Client(PaymentRequired));
      case 403: Error(Client(Forbidden));
      case 404: Error(Client(NotFound));
      case 405: Error(Client(MethodNotAllowed));
      case 406: Error(Client(NotAcceptable));
      case 407: Error(Client(ProxyAuthenticationRequired));
      case 408: Error(Client(RequestTimeout));
      case 409: Error(Client(Conflict));
      case 410: Error(Client(Gone));
      case 411: Error(Client(LengthRequired));
      case 412: Error(Client(PreconditionFailed));
      case 413: Error(Client(RequestEntityTooLarge));
      case 414: Error(Client(Request));
      case 415: Error(Client(UnsupportedMediaType));
      case 416: Error(Client(RequestedRangeNotSatisfiable));
      case 417: Error(Client(ExpectationFailed));
      case 421: Error(Client(TooManyConnections));
      case 422: Error(Client(UnprocessableEntity));
      case 423: Error(Client(Locked));
      case 424: Error(Client(FailedDependency));
      case 425: Error(Client(UnorderedCollection));
      case 426: Error(Client(UpgradeRequired));
      case 449: Error(Client(RetryWith));
      
      case 500: Error(Server(InternalServerError));
      case 501: Error(Server(NotImplemented));
      case 502: Error(Server(BadGateway));
      case 503: Error(Server(ServiceUnavailable));
      case 504: Error(Server(GatewayTimeout));
      case 505: Error(Server(HTTPVersionNotSupported));
      case 506: Error(Server(VariantAlsoNegotiates));
      case 507: Error(Server(InsufficientStorage));
      case 509: Error(Server(BandwidthLimitExceeded));
      case 510: Error(Server(NotExtended));
      case 530: Error(Server(UserAccessDenied));
      
      default: Normal(Success(OK));
    }
  }
  
  public static function isNormal(response: HttpResponseCode): Bool {
    return switch(response) { 
      case Normal(v): true;
      
      default: false;
    }
  }
  
  public static function isInformational(response: HttpResponseCode): Bool {
    return switch(response) { 
      case Normal(v): switch (v) {
        case Informational(v): true;
        
        default: false;
      }
      
      default: false;
    }
  }
  
  public static function isSuccess(response: HttpResponseCode): Bool {
    return switch(response) { 
      case Normal(v): switch (v) {
        case Success(v): true;
        
        default: false;
      }
      
      default: false;
    }
  }
  
  public static function isRedirection(response: HttpResponseCode): Bool {
    return switch(response) { 
      case Normal(v): switch (v) {
        case Redirection(v): true;
        
        default: false;
      }
      
      default: false;
    }
  }
  
  public static function isError(response: HttpResponseCode): Bool {
    return switch(response) { 
      case Error(v): true;
      
      default: false;
    }
  }
  
  public static function isClientError(response: HttpResponseCode): Bool {
    return switch(response) { 
      case Error(v): switch (v) {
        case Client(v): true;
        
        default: false;
      }
      
      default: false;
    }
  }
  
  public static function isServerError(response: HttpResponseCode): Bool {
    return switch(response) { 
      case Error(v): switch (v) {
        case Server(v): true;
        
        default: false;
      }
      
      default: false;
    }
  }
  
  public static function toStatusCode(response: HttpResponseCode): Int {
    return switch(response) { 
      case Normal(v): switch (v) {
        case Informational(v): switch(v) {
          case Continue: 100;
          case SwitchingProtocols: 101;
          case Processing: 102;
        }
        
        case Success(v): switch(v) {
          case OK: 200;
          case Created: 201;
          case Accepted: 202;
          case Non: 203;
          case NoContent: 204;
          case ResetContent: 205;
          case PartialContent: 206;
          case Multi: 207;
        }
        
        case Redirection(v): switch(v) {
          case MultipleChoices: 300;
          case MovedPermanently: 301;
          case Found: 302;
          case SeeOther: 303;
          case NotModified: 304;
          case UseProxy: 305;
          case TemporaryRedirect: 307;
        }
      }
      
      case Error(v): switch(v) {
        case Client(v): switch(v) {
          case BadRequest: 400;
          case Unauthorized: 401;
          case PaymentRequired: 402;
          case Forbidden: 403;
          case NotFound: 404;
          case MethodNotAllowed: 405;
          case NotAcceptable: 406;
          case ProxyAuthenticationRequired: 407;
          case RequestTimeout: 408;
          case Conflict: 409;
          case Gone: 410;
          case LengthRequired: 411;
          case PreconditionFailed: 412;
          case RequestEntityTooLarge: 413;
          case Request: 414;
          case UnsupportedMediaType: 415;
          case RequestedRangeNotSatisfiable: 416;
          case ExpectationFailed: 417;
          case TooManyConnections: 421;
          case UnprocessableEntity: 422;
          case Locked: 423;
          case FailedDependency: 424;
          case UnorderedCollection: 425;
          case UpgradeRequired: 426;
          case RetryWith: 449;
        }
        
        case Server(v): switch(v) {
          case InternalServerError: 500;
          case NotImplemented: 501;
          case BadGateway: 502;
          case ServiceUnavailable: 503;
          case GatewayTimeout: 504;
          case HTTPVersionNotSupported: 505;
          case VariantAlsoNegotiates: 506;
          case InsufficientStorage: 507;
          case BandwidthLimitExceeded: 509;
          case NotExtended: 510;
          case UserAccessDenied: 530;
        }
      }
    }
  }
}