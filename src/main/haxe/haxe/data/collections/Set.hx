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
import haxe.data.collections.Collection;
import haxe.functional.FoldableExtensions;

using PreludeExtensions;
using haxe.functional.FoldableExtensions;

/** A cross-platform, immutable Set built on Map. */
class Set<T> implements Collection<Set<T>, T> {
  public var equal (getEqual, null): EqualFunction<T>;
  public var order (getOrder, null) : OrderFunction<T>;
  public var hash (getHash, null) : HashFunction<T>;
  public var show (getShow, null) : ShowFunction<T>;
  
  var _map: Map<T, T>;
  
  public static function create<T>(?order: OrderFunction<T>, ?equal: EqualFunction<T>, ?hash: HashFunction<T>, ?show: ShowFunction<T>): Set<T> {  
    return new Set<T>(Map.create(order, equal, hash, show));
  }
  
  /** Creates a factory for sets of the specified type. */
  public static function factory<T>(?order: OrderFunction<T>, ?equal: EqualFunction<T>, ?hash: HashFunction<T>, ?show: ShowFunction<T>): Factory<Set<T>> {
    return function() {
      return Set.create(order, equal, hash, show);
    }
  }

  private function new(map: Map<T, T>) {
    _map = map;
  }
  
  public function contains(e: T): Bool {
    return _map.containsKey(e);
  }
  
  public function empty(): Set<T> {    
    var m : FriendMap<T> = _map;
    return if (size() == 0) this; else Set.create(m._keyOrder, m._keyEqual, m._keyHash, m._keyShow);
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
          
  public function equals(other : Set<T>) {
    return toArray().equalsWith(other.toArray(), equal);
  }

  public function compare(other : Set<T>) {
    return toArray().compareWith(other.toArray(), order);
  } 

  public function hashCode() : Int {
    var ha = hash;
    return foldl(393241, function(a, b) return a * (ha(b) + 6151));
  }

  public function decompose(): JValue {
    return ArrayExtensions.decompose(toArray());
  }

  public static function extract<T>(v: JValue, e: JExtractorFunction<T>, ?order: OrderFunction<T>, ?equal: EqualFunction<T>, ?hash: HashFunction<T>, ?show: ShowFunction<T>): Set<T> {
    return switch(v) {
      case JArray(v): Set.create(order, equal, hash, show).addAll(v.map(e));

      default: Stax.error("Expected Array but was: " + v);
    }
  }

  public function toString(): String {    
    return "Set " + toArray().toStringWith(show);
  } 
  
  public function withOrderFunction(order : OrderFunction<T>) {
    var m : FriendMap<T> = _map;
    return create(order, m._keyEqual, m._keyHash, m._keyShow).addAll(this);
  }
  
  public function withEqualFunction(equal : EqualFunction<T>) {
    var m : FriendMap<T> = _map;
    return create(m._keyOrder, equal, m._keyHash, m._keyShow).addAll(this);
  }
  
  public function withHashFunction(hash : HashFunction<T>) {
    var m : FriendMap<T> = _map;
    return create(m._keyOrder, m._keyEqual, hash, m._keyShow).addAll(this);
  }
  
  public function withShowFunction(show : ShowFunction<T>) { 
    var m : FriendMap<T> = _map;
    return create(m._keyOrder, m._keyEqual, m._keyHash, show).addAll(this);
  }
  
  /**
   *  @todo inject *Functions here?
   */ 
  private function copyWithMod(newMap: Map<T, T>): Set<T> {
    return new Set<T>(newMap);
  }
  
  public function size(): Int {
    return _map.size();
  } 

  function getOrder() {
    return _map.keyOrder;     
  }
  
  function getEqual() { 
    return _map.keyEqual;
  } 
  
  function getHash() {
    return _map.keyHash;
  }
  
  function getShow() {    
    return _map.keyShow;
  }
}     

private typedef FriendMap<K> = {
  private var _keyEqual  : EqualFunction<K>;
  private var _keyOrder  : OrderFunction<K>;
  private var _keyHash : HashFunction<K>;
  private var _keyShow   : ShowFunction<K>;
}