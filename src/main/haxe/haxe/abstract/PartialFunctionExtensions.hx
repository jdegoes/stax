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
package haxe.abstract;

import Prelude;
import haxe.abstract.PartialFunction;

using Prelude;

private class PartialFunction1Impl<A, Z> implements PartialFunction1<A, Z> {
  var _def: Array<Tuple2<A -> Bool, A -> Z>>;
  
  public static function create<A, Z>(def: Array<Tuple2<A -> Bool, A -> Z>>) {
    return new PartialFunction1Impl<A, Z>(def);
  }
  
  private function new(def: Array<Tuple2<A -> Bool, A -> Z>>) {
    this._def = def;
  }
  
  public function isDefinedAt(a: A): Bool {
    for (d in _def) {
        if (d._1(a)) return true;
      }
      
      return false;
  }
  
  public function orElse(that: PartialFunction1<A, Z>): PartialFunction1<A, Z> {
    return PartialFunction1Impl.create(this._def.concat(
      [Tuple2.create(that.isDefinedAt, that.call)]
    ));
  }
  
  public function orAlways(f: A ->  Z): PartialFunction1<A, Z> {
    return PartialFunction1Impl.create(this._def.concat([
      (function(a) { return true; }).entuple(f)
    ]));
  }
  
  public function orAlwaysC(z: Thunk<Z>): PartialFunction1<A, Z> {
    return PartialFunction1Impl.create(this._def.concat([
      (function(a) { return true; }).entuple(function(a) { return z(); })
    ]));
  }
  
    public function call(a: A): Z {
      for (d in _def) {
        if (d._1(a)) return d._2(a);
      }
      
      return Stax.error("Function undefined at " + a);
    }
    
    public function toFunction(): A -> Option<Z> {
    var self = this;
    
    return function(a) {
      return if (self.isDefinedAt(a)) Some(self.call(a));
             else None;
    }
  }
}

class PartialFunction1ImplExtensions {
    public static function toPartialFunction<A, Z>(def: Array<Tuple2<A -> Bool, A -> Z>>) {
      return PartialFunction1Impl.create(def);
    }
}

private class PartialFunction2Impl<A, B, Z> implements PartialFunction2<A, B, Z> {
  var _def: Array<Tuple2<A -> B -> Bool, A -> B -> Z>>;
  
  public static function create<A, B, Z>(def: Array<Tuple2<A -> B -> Bool, A -> B -> Z>>) {
    return new PartialFunction2Impl<A, B, Z>(def);
  }
  
  private function new(def: Array<Tuple2<A -> B -> Bool, A -> B -> Z>>) {
    this._def = def;
  }
  
  public function isDefinedAt(a: A, b: B): Bool {
    for (d in _def) {
        if (d._1(a, b)) return true;
      }
      
      return false;
  }
  
  public function orElse(that: PartialFunction2<A, B, Z>): PartialFunction2<A, B, Z> {
    return PartialFunction2Impl.create(this._def.concat(
      [Tuple2.create(that.isDefinedAt, that.call)]
    ));
  }
  
  public function orAlways(f: A -> B ->  Z): PartialFunction2<A, B, Z> {
    return PartialFunction2Impl.create(this._def.concat([
      (function(a, b) { return true; }).entuple(f)
    ]));
  }
  
  public function orAlwaysC(z: Thunk<Z>): PartialFunction2<A, B, Z> {
    return PartialFunction2Impl.create(this._def.concat([
      (function(a, b) { return true; }).entuple(function(a, b) { return z(); })
    ]));
  }
  
    public function call(a: A, b: B): Z {
      for (d in _def) {
        if (d._1(a, b)) return d._2(a, b);
      }
      
      return Stax.error("Function undefined at (" + a + ", " + b + ")");
    }
    
    public function toFunction(): A -> B -> Option<Z> {
    var self = this;
    
    return function(a, b) {
      return if (self.isDefinedAt(a, b)) Some(self.call(a, b));
             else None;
    }
  }
}

class PartialFunction2ImplExtensions {
    public static function toPartialFunction<A, B, Z>(def: Array<Tuple2<A -> B -> Bool, A -> B -> Z>>) {
      return PartialFunction2Impl.create(def);
    }
}

private class PartialFunction3Impl<A, B, C, Z> implements PartialFunction3<A, B, C, Z> {
  var _def: Array<Tuple2<A -> B -> C -> Bool, A -> B -> C -> Z>>;
  
  public static function create<A, B, C, Z>(def: Array<Tuple2<A -> B -> C -> Bool, A -> B -> C -> Z>>) {
    return new PartialFunction3Impl<A, B, C, Z>(def);
  }
  
  private function new(def: Array<Tuple2<A -> B -> C -> Bool, A -> B -> C -> Z>>) {
    this._def = def;
  }
  
  public function isDefinedAt(a: A, b: B, c: C): Bool {
    for (d in _def) {
        if (d._1(a, b, c)) return true;
      }
      
      return false;
  }
  
  public function orElse(that: PartialFunction3<A, B, C, Z>): PartialFunction3<A, B, C, Z> {
    return PartialFunction3Impl.create(this._def.concat(
      [Tuple2.create(that.isDefinedAt, that.call)]
    ));
  }
  
  public function orAlways(f: A -> B -> C ->  Z): PartialFunction3<A, B, C, Z> {
    return PartialFunction3Impl.create(this._def.concat([
      (function(a, b, c) { return true; }).entuple(f)
    ]));
  }
  
  public function orAlwaysC(z: Thunk<Z>): PartialFunction3<A, B, C, Z> {
    return PartialFunction3Impl.create(this._def.concat([
      (function(a, b, c) { return true; }).entuple(function(a, b, c) { return z(); })
    ]));
  }
  
    public function call(a: A, b: B, c: C): Z {
      for (d in _def) {
        if (d._1(a, b, c)) return d._2(a, b, c);
      }
      
      return Stax.error("Function undefined at (" + a + ", " + b + ", " + c + ")");
    }
    
    public function toFunction(): A -> B -> C -> Option<Z> {
    var self = this;
    
    return function(a, b, c) {
      return if (self.isDefinedAt(a, b, c)) Some(self.call(a, b, c));
             else None;
    }
  }
}

class PartialFunction3ImplExtensions {
    public static function toPartialFunction<A, B, C, Z>(def: Array<Tuple2<A -> B -> C -> Bool, A -> B -> C -> Z>>) {
      return PartialFunction3Impl.create(def);
    }
}

private class PartialFunction4Impl<A, B, C, D, Z> implements PartialFunction4<A, B, C, D, Z> {
  var _def: Array<Tuple2<A -> B -> C -> D -> Bool, A -> B -> C -> D -> Z>>;
  
  public static function create<A, B, C, D, Z>(def: Array<Tuple2<A -> B -> C -> D -> Bool, A -> B -> C -> D -> Z>>) {
    return new PartialFunction4Impl<A, B, C, D, Z>(def);
  }
  
  private function new(def: Array<Tuple2<A -> B -> C -> D -> Bool, A -> B -> C -> D -> Z>>) {
    this._def = def;
  }
  
  public function isDefinedAt(a: A, b: B, c: C, d: D): Bool {
    for (def in _def) {
        if (def._1(a, b, c, d)) return true;
      }
      
      return false;
  }
  
  public function orElse(that: PartialFunction4<A, B, C, D, Z>): PartialFunction4<A, B, C, D, Z> {
    return PartialFunction4Impl.create(this._def.concat(
      [Tuple2.create(that.isDefinedAt, that.call)]
    ));
  }
  
  public function orAlways(f: A -> B -> C -> D -> Z): PartialFunction4<A, B, C, D, Z> {
    return PartialFunction4Impl.create(this._def.concat([
      (function(a, b, c, d) { return true; }).entuple(f)
    ]));
  }
  
  public function orAlwaysC(z: Thunk<Z>): PartialFunction4<A, B, C, D, Z> {
    return PartialFunction4Impl.create(this._def.concat([
      (function(a, b, c, d) { return true; }).entuple(function(a, b, c, d) { return z(); })
    ]));
  }
  
    public function call(a: A, b: B, c: C, d: D): Z {
      for (def in _def) {
        if (def._1(a, b, c, d)) return def._2(a, b, c, d);
      }
      
      return Stax.error("Function undefined at (" + a + ", " + b + ", " + c + ", " + d + ")");
    }
    
    public function toFunction(): A -> B -> C -> D -> Option<Z> {
    var self = this;
    
    return function(a, b, c, d) {
      return if (self.isDefinedAt(a, b, c, d)) Some(self.call(a, b, c, d));
             else None;
    }
  }
}

class PartialFunction4ImplExtensions {
    public static function toPartialFunction<A, B, C, D, Z>(def: Array<Tuple2<A -> B -> C -> D -> Bool, A -> B -> C -> D -> Z>>) {
      return PartialFunction4Impl.create(def);
    }
}

private class PartialFunction5Impl<A, B, C, D, E, Z> implements PartialFunction5<A, B, C, D, E, Z> {
  var _def: Array<Tuple2<A -> B -> C -> D -> E -> Bool, A -> B -> C -> D -> E -> Z>>;
  
  public static function create<A, B, C, D, E, Z>(def: Array<Tuple2<A -> B -> C -> D -> E -> Bool, A -> B -> C -> D -> E -> Z>>) {
    return new PartialFunction5Impl<A, B, C, D, E, Z>(def);
  }
  
  private function new(def: Array<Tuple2<A -> B -> C -> D -> E -> Bool, A -> B -> C -> D -> E -> Z>>) {
    this._def = def;
  }
  
  public function isDefinedAt(a: A, b: B, c: C, d: D, e: E): Bool {
    for (def in _def) {
        if (def._1(a, b, c, d, e)) return true;
      }
      
      return false;
  }
  
  public function orElse(that: PartialFunction5<A, B, C, D, E, Z>): PartialFunction5<A, B, C, D, E, Z> {
    return PartialFunction5Impl.create(this._def.concat(
      [Tuple2.create(that.isDefinedAt, that.call)]
    ));
  }
  
  public function orAlways(f: A -> B -> C -> D -> E -> Z): PartialFunction5<A, B, C, D, E, Z> {
    return PartialFunction5Impl.create(this._def.concat([
      (function(a, b, c, d, e) { return true; }).entuple(f)
    ]));
  }
  
  public function orAlwaysC(z: Thunk<Z>): PartialFunction5<A, B, C, D, E, Z> {
    return PartialFunction5Impl.create(this._def.concat([
      (function(a, b, c, d, e) { return true; }).entuple(function(a, b, c, d, e) { return z(); })
    ]));
  }
  
    public function call(a: A, b: B, c: C, d: D, e: E): Z {
      for (def in _def) {
        if (def._1(a, b, c, d, e)) return def._2(a, b, c, d, e);
      }
      
      return Stax.error("Function undefined at (" + a + ", " + b + ", " + c + ", " + d + ")");
    }
    
    public function toFunction(): A -> B -> C -> D -> E -> Option<Z> {
    var self = this;
    
    return function(a, b, c, d, e) {
      return if (self.isDefinedAt(a, b, c, d, e)) Some(self.call(a, b, c, d, e));
             else None;
    }
  }
}

class PartialFunction5ImplExtensions {
    public static function toPartialFunction<A, B, C, D, E, Z>(def: Array<Tuple2<A -> B -> C -> D -> E -> Bool, A -> B -> C -> D -> E -> Z>>) {
      return PartialFunction5Impl.create(def);
    }
}