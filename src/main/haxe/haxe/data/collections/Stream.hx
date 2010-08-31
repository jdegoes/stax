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
package haxe.data.collections;

import Prelude;

import haxe.functional.Foldable;
import haxe.data.collections.Collection;

using PreludeExtensions;
using haxe.functional.FoldableExtensions;

/*
class Stream<T> implements Collection<Stream<T>, T> {
  var _head: T;
  var _tail: Thunk<Stream<T>>;
  var _equal: Equal<T>;
  
  private function new(head: T, tail: Thunk<Stream<T>>, equal: Equal<T>) {
        this._head  = head;
      this._thunk = tail.memoize();
      this._equal = equal;
    }
    
    public static function cons<T>(head: T, tail: Thunk<Stream<T>>, ?equal: Equal<T>): Stream<T> {
      equal = if (equal == null) DynamicExtensions.EqualF(); else equal;
      
      return new Stream(head, tail, equal);
    }
    
    public function empty(): Set<T> {
      return if (size == 0) this; else Set.create(_hasher, _equal);
    }
    
    public function append(s: Stream<T>, t: T): Stream<T> {
      return cons(t, s);
    }
    
    public function foldl<Z>(z: Z, f: Z -> T -> Z): Z {
      var acc = z;
      
      for (e in _map) {
        acc = f(acc, e._1);
      }
      
      return acc;
    }
    
    public function add(t: T): Stream<T> {
      return if (contains(t)) this; else copyWithMod(_map.set(t, t));
    }
    
    public function addAll(it: Iterable<T>): Stream<T> {
      var set = this;
      
      for (e in it) set = set.add(e);
      
      return set;
    }
    
    public function remove(t: T): Stream<T> {
      return copyWithMod(_map.removeByKey(t));
    }
    
    public function removeAll(it: Iterable<T>): Stream<T> {
      var set = this;
      
      for (e in it) set = set.remove(e);
      
      return set;
    }
    
    public function iterator(): Iterator<T> {
      return FoldableExtensions.iterator(this);
    }
    
    public function toString(): String {
      return Stream.ShowF(DynamicExtensions.ShowF()).show(this);
    }
}
*/