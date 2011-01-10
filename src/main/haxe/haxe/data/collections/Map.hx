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

import haxe.text.json.JValue;
import haxe.data.transcode.TranscodeJValue;
import haxe.data.transcode.TranscodeJValueExtensions;
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

  public var keyEqual(getKeyEqual, null): EqualFunction<K>;
  public var keyOrder(getKeyOrder, null) : OrderFunction<K>;
  public var keyHash(getKeyHash, null) : HashFunction<K>;
  public var keyShow(getKeyShow, null) : ShowFunction<K>;
  public var valueEqual(getValueEqual, null): EqualFunction<V>;
  public var valueOrder(getValueOrder, null) : OrderFunction<V>;
  public var valueHash(getValueHash, null) : HashFunction<V>;
  public var valueShow(getValueShow, null) : ShowFunction<V>;
  
  var _buckets: Array<Array<Tuple2<K, V>>>;
  
  var _size: Int;
  var _pf: PartialFunction1<K, V>;
    
  public static function create<K, V>(?korder : OrderFunction<K>, ?kequal: EqualFunction<K>, ?khash: HashFunction<K>, ?kshow : ShowFunction<K>, ?vorder : OrderFunction<V>, ?vequal: EqualFunction<V>, ?vhash: HashFunction<V>, ?vshow : ShowFunction<V>) {
    return new Map<K, V>(korder, kequal, khash, kshow, vorder, vequal, vhash, vshow, [[]], 0);
  }
  
  /** Creates a factory for maps of the specified types. */
  public static function factory<K, V>(?korder : OrderFunction<K>, ?kequal: EqualFunction<K>, ?khash: HashFunction<K>, ?kshow : ShowFunction<K>, ?vorder : OrderFunction<V>, ?vequal: EqualFunction<V>, ?vhash: HashFunction<V>, ?vshow : ShowFunction<V>): Factory<Map<K, V>> {
    return function() {
      return Map.create(korder, kequal, khash, kshow, vorder, vequal, vhash, vshow);
    }
  }
  
  private function new(korder : OrderFunction<K>, kequal: EqualFunction<K>, khash: HashFunction<K>, kshow : ShowFunction<K>, vorder : OrderFunction<V>, vequal: EqualFunction<V>, vhash: HashFunction<V>, vshow : ShowFunction<V>, buckets: Array<Array<Tuple2<K, V>>>, size: Int) {
    var self = this;
    
    _keyOrder = korder; _keyEqual = kequal; _keyHash = khash; _keyShow = kshow; 
    _valueOrder = vorder;  _valueEqual = vequal; _valueHash = vhash; _valueShow = vshow;
    
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
  
  public function empty<C, D>(): Foldable<C, D> {
    return cast create();
  }
  
  public function append(t: Tuple2<K, V>): Map<K, V> {
    return add(t);
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

    if(null == _keyEqual)   _keyEqual = Stax.getEqualFor(t._1);
    if(null == _valueEqual) _valueEqual = Stax.getEqualFor(t._2);
    
    for (i in 0...list.length) {
      var entry = list[i];
      
      if (_keyEqual(entry._1, k)) {
        if (!_valueEqual(entry._2, v)) {
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
    var ke = keyEqual;
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
    var ke = keyEqual;
    var ve = valueEqual;
    for (e in entries()) {
      if (ke(e._1, t._1) && ve(t._2, t._2)) return true;
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
    return Set.create(_keyOrder, _keyEqual, _keyHash, _keyShow).addAll(keys());
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
    
    var ko = keyOrder;
    var vo = valueOrder;        
    
    var sorter = function(t1: Tuple2<K, V>, t2: Tuple2<K, V>): Int {
      var c = ko(t1._1, t2._1);
      return if(c != 0)
        c;
      else
        vo(t1._2, t2._2);
    }
    
    a1.sort(sorter);
    a2.sort(sorter);
    
    return a1.compare(a2);
  } 
  
  public function equals(other : Map<K, V>) {
    var keys1 = this.keySet();
    var keys2 = other.keySet();
    if(!keys1.equals(keys2)) return false;
    
    var ve = valueEqual;

    for(key in keys1) {
      var v1 = this.get(key).get();
      var v2 = other.get(key).get();
      if (!ve(v1, v2)) return false;
    }
    return true;
  }
  
  public function toString() { 
    var ksh = keyShow;
    var vsh = valueShow;
    return "Map " + elements().toString(function(t) { return ksh(t._1) + " -> " + vsh(t._2); });  
  }
  
  public function hashCode() {
    var kha = keyHash;  
    var vha = valueHash; 
    return foldl(786433, function(a, b) return a + (kha(b._1) * 49157 + 6151) * vha(b._2));
  }

  public function decompose(): JValue {
    return ArrayExtensions.decompose(toArray());
  }

  public static function extract<K, V>(v: JValue, ke: JExtractorFunction<K>, ve: JExtractorFunction<V>, ?korder : OrderFunction<K>, ?kequal: EqualFunction<K>, ?khash: HashFunction<K>, ?kshow : ShowFunction<K>, ?vorder : OrderFunction<V>, ?vequal: EqualFunction<V>, ?vhash: HashFunction<V>, ?vshow : ShowFunction<V>): Map<K, V> {
    var te = function(v){return Tuple2.extract(v, ke, ve);};

    return switch(v) {
      case JArray(v): Map.create(korder, kequal, khash, kshow, vorder, vequal, vhash, vshow).addAll(v.map(te));

      default: Stax.error("Expected Array but was: " + v);
    }
  }
  
  public function load(): Int {
    return if (_buckets.length == 0) MaxLoad;
           else Math.round(this.size() / _buckets.length);
  }
  
  public function withKeyOrderFunction(order : OrderFunction<K>) {
    return create(order, _keyEqual, _keyHash, _keyShow, _valueOrder, _valueEqual, _valueHash, _valueShow).addAll(this);
  }
  
  public function withKeyEqualFunction(equal : EqualFunction<K>) {
    return create(_keyOrder, equal, _keyHash, _keyShow, _valueOrder, _valueEqual, _valueHash, _valueShow).addAll(this);
  }
  
  public function withKeyHashFunction(hash : HashFunction<K>) {
    return create(_keyOrder, _keyEqual, hash, _keyShow, _valueOrder, _valueEqual, _valueHash, _valueShow).addAll(this);
  }
  
  public function withKeyShowFunction(show : ShowFunction<K>) { 
    return create(_keyOrder, _keyEqual, _keyHash, show, _valueOrder, _valueEqual, _valueHash, _valueShow).addAll(this);
  }
  
  public function withValueOrderFunction(order : OrderFunction<V>) {
    return create(_keyOrder, _keyEqual, _keyHash, _keyShow, order, _valueEqual, _valueHash, _valueShow).addAll(this);
  }
  
  public function withValueEqualFunction(equal : EqualFunction<V>) {
    return create(_keyOrder, _keyEqual, _keyHash, _keyShow, _valueOrder, equal, _valueHash, _valueShow).addAll(this);
  }
  
  public function withValueHashFunction(hash : HashFunction<V>) {
    return create(_keyOrder, _keyEqual, _keyHash, _keyShow, _valueOrder, _valueEqual, hash, _valueShow).addAll(this);
  }
  
  public function withValueShowFunction(show : ShowFunction<V>) { 
    return create(_keyOrder, _keyEqual, _keyHash, _keyShow, _valueOrder, _valueEqual, _valueHash, show).addAll(this);
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
    
    var ke = keyEqual;
    var ve = valueEqual;
    
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
    
    return new Map<K, V>(_keyOrder, _keyEqual, _keyHash, _keyShow, _valueOrder, _valueEqual, _valueHash, _valueShow, newTable, size());      
  }
  
  private function rebalance(): Void {
    var newSize = Math.round(size() / ((MaxLoad + MinLoad) / 2));
    
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
    return keyHash(k) % _buckets.length;
  }
  
  private function listFor(k: K): Array<Tuple2<K, V>> {
    return if (_buckets.length == 0) []
    else _buckets[bucketFor(k)];
  }
  
  public function size(): Int {
    return _size;
  }
  
  var _keyEqual   : EqualFunction<K>;
  var _keyOrder   : OrderFunction<K>;
  var _keyHash  : HashFunction<K>;
  var _keyShow    : ShowFunction<K>;
  var _valueEqual : EqualFunction<V>;
  var _valueOrder : OrderFunction<V>;
  var _valueHash: HashFunction<V>;
  var _valueShow  : ShowFunction<V>;   
  function getKeyOrder() {
    return if(null == _keyOrder) {
      var it = iterator();
      if(!it.hasNext())
      Stax.getOrderFor(null);
      else
        _keyOrder = Stax.getOrderFor(it.next()._1); 
    } else _keyOrder;
  }
  
  function getKeyEqual() {
    return if(null == _keyEqual) {
      var it = iterator();
      if(!it.hasNext())
      Stax.getEqualFor(null);
      else
        _keyEqual = Stax.getEqualFor(it.next()._1); 
    } else _keyEqual;
  }     
  
  function getKeyHash() {
    return if(null == _keyHash) {
      var it = iterator();
      if(!it.hasNext())
        Stax.getHashFor(null);
      else
        _keyHash = Stax.getHashFor(it.next()._1);  
    } else _keyHash;
  }
  
  function getKeyShow() {
    return if(null == _keyShow) {
      var it = iterator();
      if(!it.hasNext())
        Stax.getShowFor(null);
      else
        _keyShow = Stax.getShowFor(it.next()._1);  
    } else _keyShow;
  }

  function getValueOrder() {
    return if(null == _valueOrder) {
      var it = iterator();
      if(!it.hasNext())
      Stax.getOrderFor(null);
      else
        _valueOrder = Stax.getOrderFor(it.next()._2); 
    } else _valueOrder;
  }     

  function getValueEqual() {
    return if(null == _valueEqual) {
      var it = iterator();
      if(!it.hasNext())
      Stax.getEqualFor(null);
      else
        _valueEqual = Stax.getEqualFor(it.next()._2); 
    } else _valueEqual;    
  }   

  function getValueHash() {
    return if(null == _valueHash) {
      var it = iterator();
      if(!it.hasNext())
        Stax.getHashFor(null);
      else
        _valueHash = Stax.getHashFor(it.next()._2);  
    } else _valueHash;
  }
  
  function getValueShow() {
    return if(null == _valueShow) {
      var it = iterator();
      if(!it.hasNext())
        Stax.getShowFor(null);
      else
        _valueShow = Stax.getShowFor(it.next()._2);  
    } else _valueShow;
  }
}