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

import stax.Tuples;
import Prelude;

import haxe.functional.Foldable;
import haxe.data.collections.Collection;
import haxe.functional.FoldableExtensions;

import stax.IntOps;
using  stax.IntOps;
using  stax.ArrayOps;
using  stax.IterableOps;

using haxe.functional.FoldableExtensions;

class ArrayToList {
  public static function toList<T>(arr : Array<T>) {
    return haxe.data.collections.List.create().addAll(arr);
  }	
}
class FoldableToList {
  public static function toList<A, B>(foldable : Foldable<A, B>) : List<B> {  
    var dest = List.create();
    return foldable.foldl(dest, function(a, b) {
      return a.append(b);
    });
  }	
}
/** A classic immutable list built from cons and nil elements. */
class List<T> implements Collection<List<T>, T> {
  public var head (getHead, null): T;
  public var tail (getTail, null): List<T>;

  public var first (getHead, null): T;
  public var last  (getLast, null): T;

  public var headOption  (getHeadOption, null): Option<T>;
  public var firstOption (getHeadOption, null): Option<T>;
  public var lastOption  (getLastOption, null): Option<T>;
  
  public var equal (getEqual, null) : EqualFunction<T>;
  public var order (getOrder, null) : OrderFunction<T>;
  public var hash(getHash, null) : HashFunction<T>;
  public var show  (getShow, null) : ShowFunction<T>;

	public static function toList<T>(i: Iterable<T>) {
    return haxe.data.collections.List.create().addAll(i);
  }
  public static function nil<T>(?order : OrderFunction<T>, ?tools : CollectionTools<T>): List<T> {
    return new Nil(tools);
  }
  
  public static function create<T>(?tools:CollectionTools<T>): List<T> {
    return nil(tools);
  }

  /** Creates a factory for lists of the specified type. */
  public static function factory<T>(?tools:CollectionTools<T> ): Factory<List<T>> {
    return function() {
      return List.create(tools);
    }
  }

  private function new(?tools:CollectionTools<T>) {
		if(tools!=null){
				_order  = tools.order;
				_equal  = tools.equal;  
				_hash = tools.hash; 
				_show   = tools.show; 
		}
  }

  public function empty<C, D>(): Foldable<C, D> {
    return cast nil();
  }

  /** Prepends an element to the list. This method is dramatically faster than
   * appending an element to the end of the list. In general, you should
   * construct lists by prepending, and then reverse at the end if necessary.
   */
  public function cons(head: T): List<T> {
    return new Cons(Stax.tool(_order,_equal,_hash,_show), head, this);
  }

  /** Synonym for cons. */
  public function prepend(head: T): List<T> {
    return cons(head);
  }

  public function prependAll(iterable: Iterable<T>): List<T> {
    var result = this;

    var array = iterable.toArray();

    array.reverse();

    for (e in array) result = result.cons(e);

    return result;
  }

  public function prependAllR(iterable: Iterable<T>): List<T> {
    var result = this;

    for (e in iterable) result = result.cons(e);

    return result;
  }

  public function append(b: T): List<T> {
    return add(b);
  }

  public function foldl<Z>(z: Z, f: Z -> T -> Z): Z {
    var acc = z;
    var cur = this;

    for (i in 0...size()) {
      acc = f(acc, cur.head);

      cur = cur.tail;
    }

    return acc;
  }

  /** A right fold. Right folds are much more efficient when folding to
   * another list.
   */
  public function foldr<Z>(z: Z, f: T -> Z -> Z): Z {
    var a = this.toArray();

    var acc = z;

    for (i in 0...size()) {
      var e = a[size() - 1 - i];

      acc = f(e, acc);
    }

    return acc;
  }

  public function contains(t: T): Bool {
    var cur = this;
    var eq = equal;
    for (i in 0...size()) {
      if (eq(t, cur.head)) return true;
      cur = cur.tail;
    }

    return false;
  }

  /** Adds an item to the end of the list. This is a slow method; for high performance,
   * the cons() method should be used to grow the list.
   */
  public function add(t: T): List<T> {
    return foldr(create(Stax.tool(_order, _equal, _hash, _show)).cons(t), function(b, a) {
      return a.cons(b);
    });
  }

   public function addAll(i: Iterable<T>): List<T> {
    var a = [];

    for (e in i) a.push(e);

    a.reverse();

    var r = create( Stax.tool(_order, _equal, _hash, _show) );

    for (e in a) r = r.cons(e);

    return foldr(r, function(b, a) {
      return a.cons(b);
    });
  }

  public function remove(t: T): List<T> {
    var pre: Array<T> = [];
    var post: List<T> = nil(Stax.tool(_order, _equal, _hash, _show));
    var cur = this;      
    var eq = equal;
    for (i in 0...size()) {
      if (eq(t, cur.head)) {
        post = cur.tail;

        break;
      }
      else {
        pre.push(cur.head);

        cur = cur.tail;
      }
    }

    pre.reverse();

    var result = post;

    for (e in pre) {
      result = result.cons(e);
    }

    return result;
  }

  public function removeAll(i: Iterable<T>): List<T> {
    var r = this;

    for (e in i) r = r.remove(e);

    return r;
  }

  /** Override Foldable to provide higher performance: */
  public function concat(l: List<T>): List<T> {
    return this.addAll(l);
  }

  /** Override Foldable to provide higher performance: */
  public function drop(n: Int): List<T> {
    var cur = this;

    for (i in 0...size().min(n)) {
      cur = cur.tail;
    }

    return cur;
  }

  /** Override Foldable to provide higher performance: */
  public function dropWhile(pred: T -> Bool): List<T> {
    var cur = this;

    for (i in 0...size()) {
      if (pred(cur.head)) return cur;

      cur = cur.tail;
    }

    return cur;
  }

  /** Override Foldable to provide higher performance: */
  public function take(n: Int): List<T> {
    return reverse().drop(size() - n);
  }

  /** Override Foldable to provide higher performance: */
  public function map<B>(f: T -> B): List<B> {
    return foldr(create(), function(e, list) return list.cons(f(e)));
  }

  /** Override Foldable to provide higher performance: */
  public function flatMap<B>(f: T -> Iterable<B>): List<B> {
    return foldr(create(), function(e, list) return list.prependAll(f(e)));
  }

  /** Override Foldable to provide higher performance: */
  public function filter(f: T -> Bool): List<T> {
    return foldr(create(Stax.tool(_order, _equal, _hash, _show)), function(e, list) return if (f(e)) list.cons(e) else list);
  }

  /** Returns a list that contains all the elements of this list in reverse
   * order */
  public function reverse(): List<T> {
    return foldl(create(Stax.tool(_order, _equal, _hash, _show)), function(a, b) return a.cons(b));
  }

  /** Zips this list and the specified list into a list of tuples. */
  public function zip<U>(that: List<U>): List<Tuple2<T, U>> {
    var len = this.size().min(that.size());

    var iterator1 = this.reverse().drop(0.max(this.size() - len)).iterator();
    var iterator2 = that.reverse().drop(0.max(that.size() - len)).iterator();

    var r = List.create();

    for (i in 0...len) {
      r = r.cons(Tuple2.create(iterator1.next(), iterator2.next()));
    }

    return r;
  }

  /** Retrieves a list of gaps in this sequence.
   *
   * @param f Called with every two consecutive elements to retrieve a list of gaps.
   */
  public function gaps<G>(f: T -> T -> List<G>, ?equal: EqualFunction<G>): List<G> {
    return zip(drop(1)).flatMapTo(List.nil(Stax.tool(null,equal)), function(tuple) return f(tuple._1, tuple._2));
  }

  /** Returns a list that contains all the elements of this list, sorted by
   * the ordering function.
   */        
  public function sort(): List<T> {
    var a = this.toArray();
    a.sort(order);
    var result = create(Stax.tool(_order, _equal, _hash, _show));

    for (i in 0...a.length) {
      result = result.cons(a[a.length - 1 - i]);
    }

    return result;
  } 

  public function iterator(): Iterator<T> {
    return FoldableExtensions.iterator(this);
  }
  
  public function withOrderFunction(order : OrderFunction<T>) {
    return create(Stax.tool(order,_equal,_hash,_show)).addAll(this);
  }
  
  public function withEqualFunction(equal : EqualFunction<T>) {
    return create(Stax.tool(_order, equal, _hash, _show)).addAll(this);
  }
  
  public function withHashFunction(hash : HashFunction<T>) {
    return create(Stax.tool(_order, _equal, hash, _show)).addAll(this);
  }
  
  public function withShowFunction(show : ShowFunction<T>) {
    return create(Stax.tool(_order, _equal, _hash, show)).addAll(this);
  }

  var _equal : EqualFunction<T>;
  var _order : OrderFunction<T>;
  var _hash: HashFunction<T>;
  var _show  : ShowFunction<T>;
  function getOrder() {
    return if(null == _order) {
      if(size() == 0)
        Stax.getOrderFor(null);
      else
        _order = Stax.getOrderFor(first);
      } else _order;
  }
  
  function getEqual() { 
    return if(null == _equal) {
      if(size() == 0)
        Stax.getEqualFor(null);
      else
        _equal = Stax.getEqualFor(first);
      } else _equal;
  }

  function getHash() {
    return if(null == _hash) {
      if(size() == 0)
      Stax.getHashFor(null);
      else
        _hash = Stax.getHashFor(first);   
    } else _hash;
  }
  
  function getShow() {
    return if(null == _show) {
      if(size() == 0)
      Stax.getShowFor(null);
      else
        _show = Stax.getShowFor(first);   
    } else _show;
  }
  
  public function equals(other : List<T>) {     
    return toArray().equalsWith(other.toArray(), equal);
  }

  public function compare(other : List<T>) {
    return toArray().compareWith(other.toArray(), order);   
  } 
   
  public function hashCode() : Int { 
    var ha = hash;
    return foldl(12289, function(a, b) return a * (ha(b) + 12289));
  }

  public function toString(): String { 
    return "List " + toArray().toStringWith(show);
  }

  public function size(): Int {
    return 0;
  }

  private function getHead(): T {
    return Stax.error("List has no head element");
  }

  private function getLast(): T {
    return Stax.error("List has no last element");
  }

  private function getHeadOption(): Option<T> {
    return None;
  }

  private function getLastOption(): Option<T> {
    return None;
  }

  private function getTail(): List<T> {
    return Stax.error("List has no head");
  }
}

private class Cons<T> extends List<T> {
  var _head: T;
  var _tail: List<T>;
  var _size: Int;

  public function new(tools:CollectionTools<T>, head: T, tail: List<T>) {
    super(tools);
    _head = head;
    _tail = tail;
    _size = tail.size() + 1;
  }

  override private function getHead(): T {
    return _head;
  }

  override private function getLast(): T {
    var cur: List<T> = this;

    for (i in 0...(size() - 1)) {
      cur = cur.tail;
    }

    return cur.head;
  }

  override private function getTail(): List<T> {
    return _tail;
  }

  override private function getHeadOption(): Option<T> {
    return Some(head);
  }

  override private function getLastOption(): Option<T> {
    return Some(last);
  }

  override public function size(): Int {
    return _size;
  }
}

private class Nil<T> extends List<T> {
  public function new(tools:CollectionTools<T>) {
    super(tools);
  }
}