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
import haxe.functional.PartialFunction;
import haxe.data.collections.Collection;
import haxe.functional.FoldableExtensions;

using PreludeExtensions;
using haxe.functional.FoldableExtensions;
using haxe.functional.PartialFunctionExtensions;

/** A cross-platform, immutable map with support for arbitrary keys.
 * TODO: Use an array of lists to avoid unnecessary copying when adding/removing elements.
 */
class Map<K, V> implements Collection<Map<K, V>, Tuple2<K, V>>, implements PartialFunction<K, V> {
  public static var MaxLoad = 10;
  public static var MinLoad = 1;
/*F  
  public static function OrderF<K, V>(korder: OrderFunction<K>, vorder: OrderFunction<V>): OrderFunction<Map<K, V>> {
    var keySorter = function(t1: Tuple2<K, V>, t2: Tuple2<K, V>): Int {
      return korder(t1._1, t2._1);
    }
    
    return function(v1: Map<K, V>, v2: Map<K, V>) {
        var a1 = v1.toArray();
        var a2 = v2.toArray();
        
        a1.sort(keySorter);
        a2.sort(keySorter);
        
        return Array.OrderF(Tuple2.OrderF(korder, vorder))(a1, a2);
      };
  }
  public static function EqualF<K, V>(kequal: EqualFunction<K>, vequal: EqualFunction<V>): EqualFunction<Map<K, V>> {
    return function(v1: Map<K, V>, v2: Map<K, V>) {
      var keys1 = v1.keySet();
      var keys2 = v2.keySet();
      
      if (!Set.EqualF(kequal)(keys1, keys2)) return false;
      
      for (key in keys1) {
        var v1 = v1.get(key).get();
        var v2 = v2.get(key).get();
        
        if (!vequal(v1, v2)) return false;
      }
      
      return true;
    };
  }
  public static function ShowF<K, V>(kshow: ShowFunction<K>, vshow: ShowFunction<V>): ShowFunction<Map<K, V>> {
    return function(v: Map<K, V>) {
      return "Map" + v.elements().toString(function(t) { return kshow(t._1) + " -> " + vshow(t._2); });
    };
  }
  public static function HasherF<K, V>(khasher: HasherFunction<K>, vhasher: HasherFunction<V>): HasherFunction<Map<K, V>> {
    return function(v: Map<K, V>) {
      return v.foldl(786433, function(a, b) {
        return a + ((khasher(b._1) * 49157 + 6151) * vhasher(b._2));
      });
    };
  }
*/  
  public var size (getSize, null): Int;
/*F  
  public var keyHasher:   HasherFunction<K>;
  public var keyEqual:    EqualFunction<K>;
  public var valueHasher: HasherFunction<V>;
  public var valueEqual:  EqualFunction<V>;  
*/
  public var keyEqual(default, null): EqualFunction<K>;
  public var keyOrder(default, null) : OrderFunction<K>;
  public var keyHasher(default, null) : HasherFunction<K>;
  public var keyShow(default, null) : ShowFunction<K>;
  public var valueEqual(default, null): EqualFunction<V>;
  public var valueOrder(default, null) : OrderFunction<V>;
  public var valueHasher(default, null) : HasherFunction<V>;
  public var valueShow(default, null) : ShowFunction<V>;
  
  var _buckets: Array<Array<Tuple2<K, V>>>;
  
  var _size: Int;
  var _pf: PartialFunction1<K, V>;
  
  public static function create<K, V>(?khasher: HasherFunction<K>, ?kequal: EqualFunction<K>, ?korder : OrderFunction<K>, ?kshow : ShowFunction<K>, ?vhasher: HasherFunction<V>, ?vequal: EqualFunction<V>, ?vorder : OrderFunction<V>, ?vshow : ShowFunction<V>) {
/*F
    var keyOrder    = if (korder  == null) cast DynamicExtensions.OrderF();  else korder; 
    var keyEqual    = if (kequal  == null) cast DynamicExtensions.EqualF();  else kequal;
    var keyHasher   = if (khasher == null) cast DynamicExtensions.HasherF(); else khasher;
    var keyShow     = if (kshow   == null) cast DynamicExtensions.ShowF();   else kshow;  
    var valueOrder  = if (vorder  == null) cast DynamicExtensions.OrderF();  else vorder;   
    var valueEqual  = if (vequal  == null) cast DynamicExtensions.EqualF();  else vequal; 
    var valueHasher = if (vhasher == null) cast DynamicExtensions.HasherF(); else vhasher;
    var valueShow   = if (vshow   == null) cast DynamicExtensions.ShowF();   else vshow;                                                                                           
*/
    return new Map<K, V>(korder, kequal, khasher, kshow, vorder, vequal, vhasher, vshow, [[]], 0);
  }
  
  /** Creates a factory for maps of the specified types. */
  public static function factory<K, V>(?khasher: HasherFunction<K>, ?kequal: EqualFunction<K>, ?korder : OrderFunction<K>, ?kshow : ShowFunction<K>, ?vhasher: HasherFunction<V>, ?vequal: EqualFunction<V>, ?vorder : OrderFunction<V>, ?vshow : ShowFunction<V>): Factory<Map<K, V>> {
    return function() {
      return Map.create(khasher, kequal, korder, kshow, vhasher, vequal, vorder, vshow);
    }
  }
  
  private function new(korder : OrderFunction<K>, kequal: EqualFunction<K>, khasher: HasherFunction<K>, kshow: ShowFunction<K>, vorder: OrderFunction<V>, vequal: EqualFunction<V>, vhasher: HasherFunction<V>, vshow: ShowFunction<V>, buckets: Array<Array<Tuple2<K, V>>>, size: Int) {
    var self = this;
    
    this.keyOrder = korder; this.keyEqual = kequal; this.keyHasher = khasher; this.keyShow = kshow; 
    this.valueOrder = vorder;  this.valueEqual = vequal; this.valueHasher = vhasher; this.valueShow = vshow;
    
    this._size    = size;
    this._buckets = buckets;
    this._pf      = [Tuple2.create(
      containsKey,
      function(k) {
        return switch(self.get(k)) {
          case Some(v): v;
          case None:    Stax.error("No value for this key");
        }
      }
    )].toPartialFunction();
  }
  
  public function isDefinedAt(k: K): Bool {
    return _pf.isDefinedAt(k);
  }
  
  public function orElse(that: PartialFunction1<K, V>): PartialFunction1<K, V> {
    return _pf.orElse(that);
  }
  
  public function orAlways(f: K -> V): PartialFunction1<K, V> {
    return _pf.orAlways(f);
  }
  
  public function orAlwaysC(v: Thunk<V>): PartialFunction1<K, V> {
    return _pf.orAlwaysC(v);
  }
  
  public function call(k: K): V {
    return _pf.call(k);
  }
    
  public function toFunction(): K -> Option<V> {
    return get;
  }
  
  public function empty(): Map<K, V> {
    return if (size == 0) this; else Map.create(keyHasher, keyEqual, keyOrder, keyShow, valueHasher, valueEqual, valueOrder, valueShow);
  }
  
  public function append(m: Map<K, V>, t: Tuple2<K, V>): Map<K, V> {
    return m.add(t);
  }
  
  public function foldl<Z>(z: Z, f: Z -> Tuple2<K, V> -> Z): Z {
    var acc = z;
    
    for (e in entries()) {
      acc = f(acc, e);
    }
    
    return acc;
  }
  
  public function set(k: K, v: V): Map<K, V> {
    return add(Tuple2.create(k, v));
  }
  
  public function add(t: Tuple2<K, V>): Map<K, V> {
    var k = t._1;
    var v = t._2;
    var bucket = bucketFor(k);
    
    var list = _buckets[bucket];  

    if(null == keyEqual)   keyEqual = Stax.getEqualFor(t._1);
    if(null == valueEqual) valueEqual = Stax.getEqualFor(t._2);
    
    for (i in 0...list.length) {
      var entry = list[i];
      
      if (keyEqual(entry._1, k)) {
        if (!valueEqual(entry._2, v)) {
          var newMap = copyWithMod(bucket);
        
          newMap._buckets[bucket][i] = t;
                  
          return newMap;
        }
        else {
          return this;
        }
      }
    }
    
    var newMap = copyWithMod(bucket);
    
    newMap._buckets[bucket].push(t);
    
    newMap._size += 1;
    
    if (newMap.load() > MaxLoad) {
      newMap.rebalance();
    }
    
    return newMap;
  }
  
  public function addAll(i: Iterable<Tuple2<K, V>>): Map<K, V> {
    var map = this;
    
    for (t in i) map = map.add(t);
    
    return map;
  }
  
  public function remove(t: Tuple2<K, V>): Map<K, V> {
    return removeInternal(t._1, t._2, false);
  }
  
  public function removeAll(i: Iterable<Tuple2<K, V>>): Map<K, V> {
    var map = this;
    
    for (t in i) map = map.remove(t);
    
    return map;
  }
  
  public function removeByKey(k: K): Map<K, V> {
    return removeInternal(k, null, true);
  }
  
  public function removeAllByKey(i: Iterable<K>): Map<K, V> {
    var map = this;
    
    for (k in i) map = map.removeByKey(k);
    
    return map;
  }

  public function get(k: K): Option<V> {  
	var ke = getKeyEqual();
    for (e in listFor(k)) {
      if (ke(e._1, k)) {
        return Some(e._2);
      }
    }

    return None;
  }
  
  public function getOrElse(k: K, def: Thunk<V>): V {
    return switch (get(k)) {
      case Some(v): v;
      case None: def();
    }
  }
  
  public function getOrElseC(k: K, c: V): V {
    return switch (get(k)) {
      case Some(v): v;
      case None: c;
    }
  }
  
  public function contains(t: Tuple2<K, V>): Bool {
    var tupleEqual = Tuple2.EqualF(keyEqual, valueEqual);
    
    for (e in entries()) {
      if (tupleEqual(e, t)) return true;
    }
    
    return false;
  }
  
  public function containsKey(k: K): Bool {
    return switch(get(k)) {
      case None:    false;
      case Some(v): true;
    }
  }
  
  public function keys(): Iterable<K> {
    var self = this;
    
    return {
      iterator: function() {
        var entryIterator = self.entries().iterator();
        
        return {
          hasNext: entryIterator.hasNext,
          
          next: function() {
            return entryIterator.next()._1;
          }
        }
      }
    }
  }
  
  public function keySet(): Set<K> {
    return Set.create(keyHasher, keyEqual, keyOrder, keyShow).addAll(keys());
  }
  
  public function values(): Iterable<V> {
    var self = this;
    
    return {
      iterator: function() {
        var entryIterator = self.entries().iterator();
        
        return {
          hasNext: entryIterator.hasNext,
          
          next: function() {
            return entryIterator.next()._2;
          }
        }
      }
    }
  }
  
  public function iterator(): Iterator<Tuple2<K, V>> {
    return FoldableExtensions.iterator(this);
  }

  public function compare(other : Map<K, V>) {
	var a1 = this.toArray();
	var a2 = other.toArray(); 
	
	var ko = if(null == keyOrder) {
	  if(a1.length == 0) 
	    Stax.getOrderFor(null);
	  else
	    keyOrder = Stax.getOrderFor(a1[0]._1);	
	} else keyOrder;
	
	var vo = if(null == valueOrder) {
	  if(a1.length == 0) 
	    Stax.getOrderFor(null);
	  else
	    valueOrder = Stax.getOrderFor(a1[0]._2);	
	} else valueOrder;        
	
	var keySorter = function(t1: Tuple2<K, V>, t2: Tuple2<K, V>): Int {
      return ko(t1._1, t2._1);
    }
    
    a1.sort(keySorter);
    a2.sort(keySorter);
    
    return Array.OrderF(Tuple2.OrderF(ko, vo))(a1, a2);
  }
     
  function getKeyEqual() {
    return if(null == keyEqual) {
	  var it = iterator();
	  if(!it.hasNext())
		Stax.getEqualFor(null);
	  else
	    keyEqual = Stax.getEqualFor(it.next()._1); 
    } else keyEqual;
  }

  function getValueEqual() {
    return if(null == valueEqual) {
	  var it = iterator();
	  if(!it.hasNext())
		Stax.getEqualFor(null);
	  else
	    valueEqual = Stax.getEqualFor(it.next()._2); 
    } else valueEqual;
  }

  public function equals(other : Map<K, V>) {
	var keys1 = this.keySet();
    var keys2 = other.keySet();
    if(!keys1.equals(keys2)) return false;
    
    var ve = getValueEqual();

    for(key in keys1) {
      var v1 = this.get(key).get();
      var v2 = other.get(key).get();
      if (!ve(v1, v2)) return false;
    }
    return true;
  }  

  public function toString() { 
	var ksh = if(null == keyShow) {
	  var it = iterator();
	  if(!it.hasNext())
	    Stax.getShowFor(null);
	  else
	    keyShow = Stax.getShowFor(it.next()._1);	
	} else keyShow;
	
	var vsh = if(null == valueShow) {
	  var it = iterator();
	  if(!it.hasNext())
	    Stax.getShowFor(null);
	  else
	    valueShow = Stax.getShowFor(it.next()._2);	
	} else valueShow;
    return "Map " + elements().toString(function(t) { return ksh(t._1) + " -> " + vsh(t._2); });  
  }    
       
  function getKeyHasher() {
	return if(null == keyHasher) {
	  var it = iterator();
	  if(!it.hasNext())
	    Stax.getHasherFor(null);
	  else
	    keyHasher = Stax.getHasherFor(it.next()._1);	
	} else keyHasher;
  }   

  function getValueHasher() {
	return if(null == valueHasher) {
	  var it = iterator();
	  if(!it.hasNext())
	    Stax.getHasherFor(null);
	  else
	    valueHasher = Stax.getHasherFor(it.next()._2);	
	} else valueHasher;
  }

  public function hashCode() {
	var kha = getKeyHasher();  
	var vha = getValueHasher(); 
	return foldl(786433, function(a, b) return a + (kha(b._1) * 49157 + 6151) * vha(b._2));
  }
  
  public function load(): Int {
    return if (_buckets.length == 0) MaxLoad;
           else Math.round(this.size / _buckets.length);
  }
  
  private function entries(): Iterable<Tuple2<K, V>> {
    var buckets = _buckets;
    
    var iterable: Iterable<Tuple2<K, V>> = {
      iterator: function(): Iterator<Tuple2<K, V>> {
        var bucket = 0, element = 0;
        
        var computeNextValue = function(): Option<Tuple2<K, V>> {
          while (bucket < buckets.length) {
            if (element >= buckets[bucket].length) {
              element = 0;
              ++bucket;
            }
            else {
              return Some(buckets[bucket][element++]);
            }
          }
          
          return None;
        }
        
        var nextValue = computeNextValue();
        
        return {
          hasNext: function(): Bool {
            return !nextValue.isEmpty();
          },
          
          next: function(): Tuple2<K, V> {
            var value = nextValue;
            
            nextValue = computeNextValue();
            
            return value.get();
          }
        }
      }
    }
    
    return iterable;
  }
  
  private function removeInternal(k: K, v: V, ignoreValue: Bool): Map<K, V> {
    var bucket = bucketFor(k);
    
    var list = _buckets[bucket];  
    
    var ke = getKeyEqual();
	var ve = getValueEqual();
    
    for (i in 0...list.length) {
      var entry = list[i];
      
      if (ke(entry._1, k)) {
        if (ignoreValue || ve(entry._2, v)) {
          var newMap = copyWithMod(bucket);
        
          newMap._buckets[bucket] = list.slice(0, i).concat(list.slice(i + 1, list.length));
          newMap._size -= 1;
        
          if (newMap.load() < MinLoad) {
            newMap.rebalance();
          }
        
          return newMap;
        }
        else {
          return this;
        }
      }
    }
    
    return this;
  }
  
  private function copyWithMod(index: Int): Map<K, V> {
    var newTable = [];
    
    for (i in 0...index) {
      newTable.push(_buckets[i]);
    }
    
    newTable.push([].concat(_buckets[index]));
    
    for (i in (index + 1)..._buckets.length) {
      newTable.push(_buckets[i]);
    }
    
    return new Map<K, V>(keyOrder, keyEqual, keyHasher, keyShow, valueOrder, valueEqual, valueHasher, valueShow, newTable, size);      
  }
  
  private function rebalance(): Void {
    var newSize = Math.round(size / ((MaxLoad + MinLoad) / 2));
    
    if (newSize > 0) {
      var all = entries();
    
      _buckets = [];
    
      for (i in 0...newSize) {
        _buckets.push([]);
      }
    
      for (e in all) {
        var bucket = bucketFor(e._1);
      
        _buckets[bucket].push(e);
      }
    }
  }
  
  private function bucketFor(k: K): Int {
    return getKeyHasher()(k) % _buckets.length;
  }
  
  private function listFor(k: K): Array<Tuple2<K, V>> {
    return if (_buckets.length == 0) []
    else _buckets[bucketFor(k)];
  }
  
  private function getSize(): Int {
    return _size;
  }
}