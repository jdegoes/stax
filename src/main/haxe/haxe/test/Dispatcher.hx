/*
 HaXe library written by Franco Ponticelli <franco.ponticelli@gmail.com>

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the
 distribution.

 THIS SOFTWARE IS PROVIDED BY FRANCO PONTICELLI "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL SOCIAL MEDIA NETWORKS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
package haxe.test;

private enum EventException {
  StopPropagation;
}

/**
* @todo add documentation
*/
class Dispatcher<T> {

  private var handlers : Array<T -> Void>;

  public function new() {
    handlers = new Array();
  }

  public function add(h : T -> Void) : T -> Void {
    handlers.push(h);
    return h;
  }

  public function remove(h : T -> Void) : T -> Void {
    for(i in 0...handlers.length)
      if(Reflect.compareMethods(handlers[i], h))
        return handlers.splice(i, 1)[0];
    return null;
  }

  public function clear() {
    handlers = new Array();
  }

  public function dispatch(e) {
    try {
      // prevents problems with self removing events
      var list = handlers.copy();
      for( l in list )
        l(e);
      return true;
    } catch( exc : EventException ) {
      return false;
    }
  }

  public function has() {
    return handlers.length > 0;
  }

  public static function stop() {
    throw StopPropagation;
  }
}

class Notifier {

  private var handlers : Array<Void -> Void>;

  public function new() {
    handlers = new Array();
  }

  public function add(h : Void -> Void) : Void -> Void {
    handlers.push(h);
    return h;
  }

  public function remove(h : Void -> Void) : Void -> Void {
    for(i in 0...handlers.length)
      if(Reflect.compareMethods(handlers[i], h))
        return handlers.splice(i, 1)[0];
    return null;
  }

  public function clear() {
    handlers = new Array();
  }

  public function dispatch() {
    try {
      // prevents problems with self removing events
      var list = handlers.copy();
      for( l in list )
        l();
      return true;
    } catch( exc : EventException ) {
      return false;
    }
  }

  public function has() {
    return handlers.length > 0;
  }

  public static function stop() {
    throw StopPropagation;
  }
}