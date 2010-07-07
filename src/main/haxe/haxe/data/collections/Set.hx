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

import haxe.abstract.Foldable;
import haxe.data.collections.Collection;

using Prelude;
using haxe.abstract.Foldable;

/** A cross-platform, immutable Set built on Map. */
class Set<T> implements Collection<Set<T>, T> {
  public static function OrderT<T>(order: Order<T>): Order<Set<T>> {
    return OrderTypeclass.create({
      compare: function(v1: Set<T>, v2: Set<T>) {
        var a1 = v1.toArray();
        var a2 = v2.toArray();
        
        a1.sort(order.compare);
        a2.sort(order.compare);
        
        return Array.OrderT(order).compare(a1, a2);
      }
    });
  }
  public static function EqualT<T>(equal: Equal<T>): Equal<Set<T>> {
    return EqualTypeclass.create({
      equal: function(v1: Set<T>, v2: Set<T>) {
        var all = v1.concat(v2);
        
        return all.size == v1.size && all.size == v2.size;
      }
    });
  }
  public static function ShowT<T>(show: Show<T>): Show<Set<T>> {
    return ShowTypeclass.create({
      show: function(v: Set<T>) {
        return "Set" + v.elements().toString(show.show);
      }
    });
  }
  public static function HasherT<T>(hasher: Hasher<T>): Hasher<Set<T>> {
    return HasherTypeclass.create({
      hash: function(v: Set<T>) {
        return v.foldl(393241, function(a, b) {
          return a + (hasher.hash(b) * 6151);
        });
      }
    });
  }
  
  public var size (getSize, null): Int;
  public var hasher (default, null): Hasher<T>;
  public var equal (default, null): Equal<T>;
  
  var _map: Map<T, T>;
  
  public static function create<T>(?hasher: Hasher<T>, ?equal: Equal<T>): Set<T> {
    hasher = if (hasher == null) DynamicExtensions.HasherT(); else hasher;
    equal  = if (equal == null) DynamicExtensions.EqualT(); else equal;
    
    return new Set<T>(hasher, equal, Map.create(hasher, equal, hasher, equal));
  }
  
  /** Creates a factory for sets of the specified type. */
  public static function factory<T>(?hasher: Hasher<T>, ?equal: Equal<T>): Factory<Set<T>> {
    return function() {
      return Set.create(hasher, equal);
    }
  }

    private function new(hasher: Hasher<T>, equal: Equal<T>, map: Map<T, T>) {
      this.hasher = hasher; this.equal = equal; _map = map;
    }
    
    public function contains(e: T): Bool {
      return _map.containsKey(e);
    }
    
    public function empty(): Set<T> {
      return if (size == 0) this; else Set.create(hasher, equal);
    }
    
    public function append(s: Set<T>, t: T): Set<T> {
      return s.copyWithMod(s._map.set(t, t));
    }
    
    public function foldl<Z>(z: Z, f: Z -> T -> Z): Z {
      var acc = z;
      
      for (e in _map) {
        acc = f(acc, e._1);
      }
      
      return acc;
    }
    
    public function add(t: T): Set<T> {
      return if (contains(t)) this; else copyWithMod(_map.set(t, t));
    }
    
    public function addAll(it: Iterable<T>): Set<T> {
      var set = this;
      
      for (e in it) set = set.add(e);
      
      return set;
    }
    
    public function remove(t: T): Set<T> {
      return copyWithMod(_map.removeByKey(t));
    }
    
    public function removeAll(it: Iterable<T>): Set<T> {
      var set = this;
      
      for (e in it) set = set.remove(e);
      
      return set;
    }
    
    public function iterator(): Iterator<T> {
      return FoldableExtensions.iterator(this);
    }
    
    public function toString(): String {
      return Set.ShowT(DynamicExtensions.ShowT()).show(this);
    }
    
    private function copyWithMod(newMap: Map<T, T>): Set<T> {
      return new Set<T>(hasher, equal, newMap);
    }
    
    private function getSize(): Int {
      return _map.size;
    }
}