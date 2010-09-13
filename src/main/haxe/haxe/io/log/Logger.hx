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
package haxe.io.log;

import Prelude;
import haxe.PosInfos;

using PreludeExtensions;

typedef LogHandler = LogLevel -> String -> PosInfos -> Void

interface LoggerFacade {
  public function trace<T>(t: T, ?p: PosInfos): T;
  
  public function debug(s: String, ?p: PosInfos): Void;
  public function info(s: String, ?p: PosInfos): Void;
  public function warning(s: String, ?p: PosInfos): Void;
  public function error(s: String, ?p: PosInfos): Void;
  public function fatal(s: String, ?p: PosInfos): Void;
}

enum LogLevel { All; Debug; Info; Warning; Error; Fatal; None; }

class Logger {
  /** The default handlers used for all loggers created using get() */
  public static var defaultHandlers: Array<LogHandler> = [];
  
  /** The default filtering level for all loggers created using get() */
  public static var defaultLevel: LogLevel = Warning;
  
  /** Convenience function that constructs a logger whose handlers are formed
   * from the 'defaultHandlers' field of this class, and whose messages are
   * filtered to include only those messages logged at the level of the
   * 'defaultLevel' field of this class, or higher.
   */
  public static function get(): LoggerFacade {
    return Logger.create({
      level:    function() { return defaultLevel; },
      handlers: defaultHandlers
    });
  }
  
  /** Convenience function that constructs a logger with the specified handlers
   * and log message cutoff level.
   */
  public static function create(config: {level: Thunk<LogLevel>, handlers: Array<LogHandler>}): LoggerFacade {
    return new LoggerBridge(LogHandlers.filter(LogHandlers.composite(config.handlers), config.level));
  }
  
  /** Convenience function that constructs a logger that will not log anything
   * to anywhere (useful for production code).
   */
  public static function none(): LoggerFacade {
    return Logger.create({
      level:    None.toThunk(),
      handlers: []
    });
  }
  
  /** Convenience function that creates a debug logger facade that traces all
   * information using HaXe's built-in trace function (and the browser console, 
   * if the target is JavaScript or Flash).
   */
  public static function debug(): LoggerFacade {
    return Logger.create({
      level:    Debug.toThunk(),
      handlers: [
        LogHandlers.Trace 
        #if (js || flash)
        , LogHandlers.Console
        #end
      ]
    });
  }
}

/** Converts all the facade methods to log handler invocations */
class LoggerBridge implements LoggerFacade {
  var _handler: LogHandler;
  
  public function new(h: LogHandler) {
    _handler = h;
  }
  
  public function trace<T>(t: T, ?p: PosInfos): T { debug(Std.string(t), p); return t; }
  
  public function debug(s: String, ?p: PosInfos) { _handler(Debug, s, p); }
  
  public function info(s: String, ?p: PosInfos) { _handler(Info, s, p); }
  
  public function warning(s: String, ?p: PosInfos) { _handler(Warning, s, p); }
  
  public function error(s: String, ?p: PosInfos) { _handler(Error, s, p); }
  
  public function fatal(s: String, ?p: PosInfos) { _handler(Fatal, s, p); }
}

/** Standard log handlers */
class LogHandlers {
  public static var Trace = function(level: LogLevel, text: String, p: PosInfos): Void {
    trace(textLevel(level).toUpperCase() + ": " + format(text, p));
  }
  
  #if js
  public static var Console = function(level: LogLevel, text: String, p: PosInfos): Void {
    (function(text) {
      var c = untyped __js__('(typeof console != "undefined") ? console : null');
      
      if (c != null) {      
        switch (level) {
          case All, Debug:          if (c.debug != null) c.debug(text);
          case Info:                if (c.info != null) c.info(text);
          case Warning:             if (c.warn != null) c.warn(text);
          case Error, Fatal, None:  if (c.error != null) c.error(text);
        }
      }
    })(format(text, p));
  }
  #elseif flash  

  public static var Console = function(level: LogLevel, text: String, p: PosInfos): Void {
    (function(text) {
      if (flash.external.ExternalInterface.available) {
        switch (level) {
          case All, Debug:          flash.external.ExternalInterface.call('(function(text){if (console != null && console.debug) console.debug(text);})', text);
          case Info:                flash.external.ExternalInterface.call('(function(text){if (console != null && console.warn) console.warn(text);})', text);
          case Warning:             flash.external.ExternalInterface.call('(function(text){if (console != null && console.warn) console.warn(text);})', text);
          case Error, Fatal, None:  flash.external.ExternalInterface.call('(function(text){if (console != null && console.error) console.error(text);})', text);
        }
      }
    })(format(text, p));
  }
  #end
  
  public static function composite(fns: Array<LogHandler>): LogHandler {
    return function(l, t, p) {
      for (f in fns) f(l, t, p);
    }
  }
  
  public static function filter(input: LogHandler, cutoff: Thunk<LogLevel>): LogHandler {
    return function(l, t, p) {
      if (intLevel(l) >= intLevel(cutoff())) {
        input(l, t, p);
      }
    }
  }
  
  private static function format(text: String, p: PosInfos) {
    return p.fileName + ":" + p.lineNumber + " (" + p.className + "." + p.methodName + "): " + text;
  }
  
  private static function textLevel(level: LogLevel) {
    return switch (level) {
      case All: "All";
      case Debug: "Debug";
      case Info: "Info";
      case Warning: "Warning";
      case Error: "Error";
      case Fatal: "Fatal";
      case None: "None";
    }
  }
  
  private static function intLevel(level: LogLevel) {
    return switch (level) {
      case All: 0;
      case Debug: 1;
      case Info: 2;
      case Warning: 3;
      case Error: 4;
      case Fatal: 5;
      case None: 6;
    }
  }
}