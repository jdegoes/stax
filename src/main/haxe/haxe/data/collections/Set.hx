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
import PreludeExtensions;

import haxe.functional.Foldable;
import haxe.data.collections.Collection;
import haxe.functional.FoldableExtensions;

using PreludeExtensions;
using haxe.functional.FoldableExtensions;

/** A cross-platform, immutable Set built on Map. */
class Set<T> implements Collection<Set<T>, T> {
  public static function OrderF<T>(order: OrderFunction<T>): OrderFunction<Set<T>> {
    return function(v1: Set<T>, v2: Set<T>) {
      var a1 = v1.toArray();
      var a2 = v2.toArray();
    
      a1.sort(order);
      a2.sort(order);

      return Array.OrderF(order)(a1, a2);
    };
  }
  public static function EqualF<T>(equal: EqualFunction<T>): EqualFunction<Set<T>> {
    return function(v1: Set<T>, v2: Set<T>) {
      var all = v1.concat(v2);
      
      return all.size == v1.size && all.size == v2.size;
    };
  }
  public static function ShowF<T>(show: ShowFunction<T>): ShowFunction<Set<T>> {
    return function(v: Set<T>) {
      return "Set" + v.elements().toString(show);
    };
  }
  public static function HasherF<T>(hasher: HasherFunction<T>): HasherFunction<Set<T>> {
    return function(v: Set<T>) {
      return v.foldl(393241, function(a, b) {
        return a + (hasher(b) * 6151);
      });
    };
  }
  
  public var size (getSize, null): Int;
  public var equal (default, null): EqualFunction<T>;
  public var order (default, null) : OrderFunction<T>;
  public var hasher (default, null) : HasherFunction<T>;
  public var show (default, null) : ShowFunction<T>;
  
  var _map: Map<T, T>;
  
  public static function create<T>(?hasher: HasherFunction<T>, ?equal: EqualFunction<T>, ?order: OrderFunction<T>, ?show: ShowFunction<T>): Set<T> {
    hasher = if (hasher == null) DynamicExtensions.HasherF(); else hasher;
    equal  = if (equal == null)  DynamicExtensions.EqualF(); else equal;
	order  = if (order == null)  DynamicExtensions.OrderF(); else order;
    show   = if (show == null)   DynamicExtensions.ShowF(); else show;
    
    return new Set<T>(order, equal, hasher, show, Map.create(hasher, equal, order, show, hasher, equal, order, show));
  }
  
  /** Creates a factory for sets of the specified type. */
  public static function factory<T>(?hasher: HasherFunction<T>, ?equal: EqualFunction<T>, ?order: OrderFunction<T>, ?show: ShowFunction<T>): Factory<Set<T>> {
    return function() {
      return Set.create(hasher, equal, order, show);
    }
  }

  private function new(order : OrderFunction<T>, equal: EqualFunction<T>, hasher: HasherFunction<T>, show : ShowFunction<T>, map: Map<T, T>) {
    this.order = order; this.equal = equal; this.hasher = hasher; this.show = show; _map = map;
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
          
  /**
  *  @todo this method doesn't use equal at all
  */
  public function equals(other : Set<T>) {
      var all = other.concat(this);
      return all.size == size && all.size == other.size;
  }

  public function compare(other : Set<T>) {
    var a1 = this.toArray();
    var a2 = other.toArray();
    var or = if(null == equal) {
	  if(a1.length == 0)
	    Stax.getOrderFor(null);
	  else
	    order = Stax.getOrderFor(a1[0]);
    } else order;
    return Array.OrderF(or)(a1, a2);
  } 

  public function hashCode() : Int {
	var ha = if(null == hasher) {
	  if(size == 0)
		Stax.getHasherFor(null);
	  else
	    hasher = Stax.getHasherFor(iterator().next());   
	} else hasher;
	return foldl(393241, function(a, b) return a * (ha(b) + 6151));
  }

  public function toString(): String { 
	var a = this.toArray();
	var sh = if(null == show) {
	  if(a.length == 0)
	    Stax.getShowFor(null);
	  else
	    show = Stax.getShowFor(a[0]);	
	} else show;
    return "Set " + Array.ShowF(sh)(a);
  }
/*F    
  public function toString(): String {
    return Set.ShowF(DynamicExtensions.ShowF())(this);
  }
*/    
  private function copyWithMod(newMap: Map<T, T>): Set<T> {
    return new Set<T>(order, equal, hasher, show, newMap);
  }
  
  private function getSize(): Int {
    return _map.size;
  }
}