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
package haxe.test.mock;

import haxe.test.TestCase;

class Mock<T> extends Dynamic {
  var _expects: Hash<String, Array<Dynamic>>;
  
    private function new() {
      _expects = new Hash<String, Array<Dynamic>>();
    }
    
    public function expect1<P1, R>(name: String, f: Function<P1, R>, times: Int = 1): Void {
      var self = this;
      
      for (i in 0...times) {
        internal_add(name, function(p: P1): R {
          self.internal_remove(name);
        
          return f(p);
        });
      }
  }
  
  public function expect2<P1, P2, R>(name: String, f: Function2<P1, P2, R>, times: Int = 1): Void {
    var self = this;
    
    for (i in 0...times) {
        internal_add(name, function(p1: P1, p2: P2): R {
          self.internal_remove(name);
        
          return f(p1, p2);
        });
      }
  }
  
  public function expect3<P1, P2, P3, R>(name: String, f: Function3<P1, P2, P3, R>, times: Int = 1): Void {
    var self = this;
    
    for (i in 0...times) {
        internal_add(name, function(p1: P1, p2: P2, p3: P3): R {
          self.internal_remove(name);
        
          return f(p1, p2, p3);
        });
      }
  }
  
  public function expect4<P1, P2, P3, P4, R>(name: String, f: Function4<P1, P2, P3, P4, R>, times: Int = 1): Void {
    var self = this;
    
    for (i in 0...times) {
        internal_add(name, function(p1: P1, p2: P2, p3: P3, p4: P4): R {
          self.internal_remove(name);
        
          return f(p1, p2, p3, p4);
        });
      }
  }
  
  public function expect5<P1, P2, P3, P4, P5, R>(name: String, f: Function5<P1, P2, P3, P4, P5, R>, times: Int = 1): Void {
    var self = this;
    
    for (i in 0...times) {
        internal_add(name, function(p1: P1, p2: P2, p3: P3, p4: P4, p5: P5): R {
          self.internal_remove(name);
        
          return f(p1, p2, p3, p4, p5);
        });
      }
  }
  
  public function allow1<P1, R>(name: String, f: Function<P1, R>): Void {
      Reflect.setField(this, name, f);
  }
  
  public function allow2<P1, P2, R>(name: String, f: Function2<P1, P2, R>): Void {
    Reflect.setField(this, name, f);
  }
  
  public function allow3<P1, P2, P3, R>(name: String, f: Function3<P1, P2, P3, R>): Void {
    Reflect.setField(this, name, f);
  }
  
  public function allow4<P1, P2, P3, P4, R>(name: String, f: Function4<P1, P2, P3, P4, R>): Void {
    Reflect.setField(this, name, f);
  }
  
  public function allow5<P1, P2, P3, P4, P5, R>(name: String, f: Function5<P1, P2, P3, P4, P5, R>): Void {
    Reflect.setField(this, name, f);
  }
    
  public function verifyAllExpectations(): Void {
    for (key in _expects.keys()) {
      var array = _expects.get(key);
      
      if (array.length > 0) {
        throw "Expected function " + name + " to be invoked " + array.length + " more time" + (if (array.length == 1) "" else "s");
      }
    }
  }
  
  public function asTarget(): T {
    return cast this;
  }
  
  private function internal_add(name: String, f: Dynamic): Void {
    var a = _expects.get(name);
    
    if (a == null) { a = []; _expects.set(name, a); }
    
    a.push(f);
    
    Reflect.setField(this, name, f);
  }
  
  private function internal_remove(name: String): Void {
    var array = _expects.get(name);
    
    array.shift();
    
    if (array.length > 0) {
      Reflect.setField(this, name, array[0]);
    }
  }
  
  private static function internal_create(): Mock {
    return new Mock();
  }
}

class MockTestCase extends TestCase {
  var _localMocks: Array<Mock<Dynamic>>;
  var _globalMocks: Array<Mock<Dynamic>>;
  var _runningTest: Bool;
  
  public function new() {
    _runningTest = false;
  }
  
  override public function before(): Void {
    _localMocks = [];
    _runningTest = true;
  }
  
  public function newMock<T>(): Mock<T> {
    var mock = Mock.internal_create();
    
    if (_runningTest) {
      _localMocks.push(mock);
    }
    else {
      _globalMocks.push(mock);
    }
    
    return mock;
  }
  
  override public function after(): Void {
    try {
      for (mock in _localMocks) {
        mock.verifyAllExpectations();
      }
    
      _localMocks = [];
      
      _runningTest = false;
    }
    catch (e: Dynamic) {
      _runningTest = false;
      
      throw e;
    }
  }
  
  override public function afterAll(): Void {
    for (mock in _globalMocks) {
      mock.verifyAllExpectations();
    }
  
    _globalMocks = [];
  }
}