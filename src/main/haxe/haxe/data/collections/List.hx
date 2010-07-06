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

/** A classic immutable list built from cons and nil elements. */
class List<T> implements Collection<List<T>, T> {
  public static function OrderT<T>(order: Order<T>): Order<List<T>> {
    return OrderTypeclass.create({
      compare: function(v1: List<T>, v2: List<T>) {
        var a1 = v1.toArray();
        var a2 = v2.toArray();
        
        return Array.OrderT(order).compare(a1, a2);
      }
    });
  }
  public static function EqualT<T>(equal: Equal<T>): Equal<List<T>> {
    return EqualTypeclass.create({
      equal: function(v1: List<T>, v2: List<T>) {
        var a1 = v1.toArray();
        var a2 = v2.toArray();
        
        return Array.EqualT(equal).equal(a1, a2);
      }
    });
  }
  public static function ShowT<T>(show: Show<T>): Show<List<T>> {
    return ShowTypeclass.create({
      show: function(v: List<T>) {
        return "List" + v.elements().toString(show.show);
      }
    });
  }
  public static function HasherT<T>(hasher: Hasher<T>): Hasher<List<T>> {
    return HasherTypeclass.create({
      hash: function(v: List<T>) {
        return v.foldl(12289, function(a, b) {
          return a * (hasher.hash(b) + 12289);
        });
      }
    });
  }
  
  public var size (getSize, null): Int;
  public var head (getHead, null): T;
  public var last (getLast, null): T;
  public var tail (getTail, null): List<T>;
  public var headOption (getHeadOption, null): Option<T>;
  public var lastOption (getLastOption, null): Option<T>;
  
  var _equal: Equal<T>;
  
  public static function nil<T>(?equal: Equal<T>): List<T> {
    return new Nil(if (equal == null) DynamicExtensions.EqualT(); else equal);
  }
  
  public static function create<T>(?equal: Equal<T>): List<T> {
    return nil(equal);
  }
  
  /** Creates a factory for lists of the specified type. */
  public static function factory<T>(?equal: Equal<T>): Factory<List<T>> {
    return function() {
      return List.create(equal);
    }
  }

  private function new(equal: Equal<T>) {
    _equal = if (equal == null) DynamicExtensions.EqualT(); else equal;
  }
  
	public function empty(): List<T> {
	  return if (size == 0) this;
	         else nil(_equal);
	}
	
	/** Prepends an element to the list. This method is dramatically faster than
	 * appending an element to the end of the list. In general, you should 
	 * construct lists by prepending, and then reverse at the end if necessary.
	 */
	public function cons(head: T): List<T> {
    return new Cons(_equal, head, this);
  }
  
  /** Synonym for cons. */
  public function prepend(head: T): List<T> {
    return cons(head);
  }
  
  public function append(a: List<T>, b: T): List<T> {
    return a.add(b);
  }
  
  public function foldl<Z>(z: Z, f: Z -> T -> Z): Z {
    var acc = z;
    var cur = this;
    
    for (i in 0...size) {
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
        
    for (i in 0...size) {
      var e = a[size - 1 - i];
      
      acc = f(e, acc);
    }
    
    return acc;
  }
  
  public function contains(t: T): Bool {
    var cur = this;
    
    for (i in 0...size) {
      if (_equal.equal(t, cur.head)) return true;
      
      cur = cur.tail;
    }
    
    return false;
  }
  
  /** Adds an item to the end of the list. This is a slow method; for high performance,
   * the cons() method should be used to grow the list.
   */
	public function add(t: T): List<T> {
	  return foldr(empty().cons(t), function(b, a) {
	    return a.cons(b);
	  });
	}
	
	public function addAll(i: Iterable<T>): List<T> {
	  var a = [];
	  
	  for (e in i) a.push(e);
	  
	  a.reverse();
	  
	  var r = empty();
	  
	  for (e in a) r = r.cons(e);
	  
	  return foldr(r, function(b, a) {
	    return a.cons(b);
	  });
	}
	
	public function remove(t: T): List<T> {
	  var pre: Array<T> = [];
	  var post: List<T> = nil(_equal);
	  
	  var cur = this;
	  
	  for (i in 0...size) {
      if (_equal.equal(t, cur.head)) {
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
	
	/** Returns a list that contains all the elements of this list in reverse 
	 * order */
	public function reverse(): List<T> {
	  return foldl(empty(), function(a, b) {
	    return a.cons(b);
	  });
	}
	
	/** Zips this list and the specified list into a list of tuples. */
	public function zip<U>(that: List<U>): List<Tuple2<T, U>> {
	  var len = this.size.min(that.size);
	  
	  var iterator1 = this.reverse().drop(0.max(this.size - len)).iterator();
	  var iterator2 = that.reverse().drop(0.max(that.size - len)).iterator();
	  
	  var r = List.create(Tuple2.EqualT(this._equal, that._equal));
	  
	  for (i in 0...len) {
	    r = r.cons(Tuple2.create(iterator1.next(), iterator2.next()));
	  }
	  
	  return r;
	}
	
	/** Returns a list that contains all the elements of this list, sorted by
	 * the specified ordering function.
	 */
	public function sort(order: Order<T>): List<T> {
	  var a = this.toArray();
	  
	  a.sort(order.compare);
	  
	  return empty().addAll(a);
	}
	
	public function iterator(): Iterator<T> {
	  return FoldableExtensions.iterator(this);
	}
	
	public function toString(): String {
	  return List.ShowT(DynamicExtensions.ShowT()).show(this);
	}
  
  private function getSize(): Int {
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
  
  public function new(equal: Equal<T>, head: T, tail: List<T>) {
    super(equal);
    
    _head = head;
    _tail = tail;
    _size = tail.size + 1;
  }
  
  override private function getHead(): T {
    return _head;
  }
  
  override private function getLast(): T {
    var cur: List<T> = this;
    
    for (i in 0...(size - 1)) {
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
  
  override private function getSize(): Int {
    return _size;
  }
}

private class Nil<T> extends List<T> {
  public function new(equal: Equal<T>) {
    super(equal);
  }
}