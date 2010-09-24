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
package haxe.functional;
import haxe.data.collections.Set;
import haxe.data.collections.List;

import Prelude;
import PreludeExtensions;
import haxe.functional.Foldable; 
import haxe.data.collections.Map;

using PreludeExtensions;

class FoldableExtensions {
  public static function foldr<A, B, Z>(foldable: Foldable<A, B>, z: Z, f: B -> Z -> Z): Z {
    var a = toArray(foldable);
    
    a.reverse();
    
    var acc = z;
    
    for (e in a) {
      acc = f(e, acc);
    }
    
    return acc;
  }
  
  public static function filter<A, B>(foldable: Foldable<A, B>, f: B -> Bool): A {
    return cast foldable.foldl(foldable.empty(), function(a, b) {
      return if (f(b)) cast a.append(b); else a;
    });
  }
  
  public static function partition<A, B>(foldable: Foldable<A, B>, f: B -> Bool): Tuple2<A, A> {
    return cast foldable.foldl(Tuple2.create(foldable.empty(), foldable.empty()), function(a, b) {
      return if (f(b)) Tuple2.create(cast a._1.append(b), a._2); else Tuple2.create(a._1, cast a._2.append(b));
    });
  }
  
  public static function partitionWhile<A, B>(foldable: Foldable<A, B>, f: B -> Bool): Tuple2<A, A> {
    var partitioning = true;
    
    return cast foldable.foldl(Tuple2.create(foldable.empty(), foldable.empty()), function(a, b) {
      return if (partitioning) {
        if (f(b)) {
          Tuple2.create(cast a._1.append(b), a._2);
        }
        else {
          partitioning = false;
          
          Tuple2.create(a._1, cast a._2.append(b));
        }
      }
      else {
        Tuple2.create(a._1, cast a._2.append(b));
      }
    });
  }
  
  public static function map<A, B, C, D>(src: Foldable<A, B>, f: B -> D) : Foldable<C, D> {
    return mapTo(src, src.empty(), f);
  }
  
  public static function mapTo<A, B, C, D>(src: Foldable<A, B>, dest: Foldable<C, D>, f: B -> D): C {
    return cast src.foldl(dest, function(a, b) {
      return cast a.append(f(b));
    });
  }
  
  public static function flatMap<A, B, C, D>(src: Foldable<A, B>, f: B -> Foldable<C, D>): C {
    return flatMapTo(src, src.empty(), f);
  }
  
  public static function flatMapTo<A, B, C, D>(src: Foldable<A, B>, dest: Foldable<C, D>, f: B -> Foldable<C, D>): C {
    return cast src.foldl(dest, function(a, b) {
      return f(b).foldl(a, function(a, b) {
        return cast a.append(b);
      });
    });
  }
  
  public static function take<A, B>(foldable: Foldable<A, B>, n: Int): A {
    return cast foldable.foldl(foldable.empty(), function(a, b) {
      return if (n-- > 0) cast a.append(b); else a;
    });
  }
  
  public static function takeWhile<A, B>(foldable: Foldable<A, B>, f: B -> Bool): A {
    var taking = true;
    
    return cast foldable.foldl(foldable.empty(), function(a, b) {
      return if (taking) { if (f(b)) cast a.append(b); else { taking = false; a; } } else a;
    });
  }
  
  public static function drop<A, B>(foldable: Foldable<A, B>, n: Int): A {
    return cast foldable.foldl(foldable.empty(), function(a, b) {
      return if (n-- > 0) a; else cast a.append(b);
    });
  }
  
  public static function dropWhile<A, B>(foldable: Foldable<A, B>, f: B -> Bool): A {
    var dropping = true;
    
    return cast foldable.foldl(foldable.empty(), function(a, b) {
      return if (dropping) { if (f(b)) a; else { dropping = false; cast a.append(b); } } else cast a.append(b);
    });
  }
  
  public static function count<A, B>(foldable: Foldable<A, B>, f: B -> Bool): Int {
    return foldable.foldl(0, function(a, b) {
      return a + (if (f(b)) 1 else 0);
    });
  }
  
  public static function countWhile<A, B>(foldable: Foldable<A, B>, f: B -> Bool): Int {
    var counting = true;
    
    return foldable.foldl(0, function(a, b) {
      return if (!counting) a;
      else {
        if (f(b)) a + 1;
        else {
          counting = false;
          
          a;
        }
      }
    });
  }
  
  public static function scanl<A, B>(foldable:Foldable<A, B>, init: B, f: B -> B -> B): A {
    var a = toArray(foldable);
    
    var result = foldable.empty().append(init);
    
    for (e in a)
      result = cast result.append(f(e, init));
    
    return cast result;
  }
  
  public static function scanr<A, B>(foldable:Foldable<A, B>, init: B, f: B -> B -> B): A {
    var a = toArray(foldable);
    
    a.reverse();
    
    var result = foldable.empty().append(init);
    
    for (e in a)
      result = cast result.append(f(e, init));

    return cast result;
  }
  
  public static function scanl1<A, B>(foldable:Foldable<A, B>, f: B -> B -> B): A {
    var iterator = toArray(foldable).iterator();
    var result = foldable.empty();
    
    if(!iterator.hasNext())
      return cast result;
    
    var accum = iterator.next();
    result = cast result.append(accum);
    
    while (iterator.hasNext())
      result = cast result.append(f(iterator.next(), accum));
    
    return cast result;
  }
  
  public static function scanr1<A, B>(foldable:Foldable<A, B>, f: B -> B -> B): A {
    var a = toArray(foldable);
    a.reverse();
    var iterator = a.iterator();
    var result = foldable.empty();
    
    if(!iterator.hasNext())
      return cast result;
    
    var accum = iterator.next();
    result = cast result.append(accum);
    
    while (iterator.hasNext())
      result = cast result.append(f(iterator.next(), accum));
    
    return cast result;
  }
  
  public static function elements<A, B>(foldable: Foldable<A, B>): Iterable<B> {
    return toArray(foldable);
  }
  
  public static function concat<A, B>(foldable: Foldable<A, B>, rest: Foldable<A, B>): A {
    return cast rest.foldl(foldable, function(a, b) {
      return cast a.append(b);
    });
  }
  
  public static function append<A, B>(foldable: Foldable<A, B>, e: B): A {
    return foldable.append(e);
  }
  
  public static function appendAll<A, B>(foldable: Foldable<A, B>, i: Iterable<B>): A {
    var acc = foldable;
    
    for (e in i) { acc = cast acc.append(e); }
    
    return cast acc;
  }
  
  public static function iterator<A, B>(foldable: Foldable<A, B>): Iterator<B> {
    return elements(foldable).iterator();
  }
  
  public static function isEmpty<A, B>(foldable: Foldable<A, B>): Bool {
    return !iterator(foldable).hasNext();
  }
  
  public static function foreach<A, B>(foldable: Foldable<A, B>, f: B -> Void): Foldable<A, B> {
    foldable.foldl(1, function(a, b) { f(b); return a; });
        
    return foldable;
  }
  
  public static function find<A, B>(foldable: Foldable<A, B>, f: B -> Bool): Option<B> {
    return foldable.foldl(None, function(a, b) {
      return switch (a) {
        case None: b.toOption().filter(f);
        
        default: a;
      }
    });
  }
  
  public static function forAll<A, B>(foldable: Foldable<A, B>, f: B -> Bool): Bool {
    return foldable.foldl(true, function(a, b) {
      return switch (a) {
        case true:  f(b);
        case false: false;
      }
    });
  }
  
  public static function forAny<A, B>(foldable: Foldable<A, B>, f: B -> Bool): Bool {
    return foldable.foldl(false, function(a, b) {
      return switch (a) {
        case false: f(b);
        case true:  true;
      }
    });
  }
  
  public static function exists<A, B>(foldable: Foldable<A, B>, f: B -> Bool): Bool {
    return switch (find(foldable, f)) {
      case Some(v): true;
      case None:    false;
    }
  }
  
  public static function existsP<A, B>(foldable:Foldable<A, B>, ref: B, f: B -> B -> Bool): Bool {
    var result:Bool = false;
    
    var a = toArray(foldable);
    
    for (e in a) {
      if (f(e, ref)) result = true;
    }
    
    return result;
  }
  
  public static function contains<A, B>(foldable: Foldable<A, B>, member: B): Bool {
    return exists(foldable, function(e) { return e == member; });
  }
  
  public static function nubBy<A, B>(foldable:Foldable<A, B>, f: B -> B -> Bool): A {
    return cast foldable.foldl(foldable.empty(), function(a, b) {
      return if (existsP(a, b, f)) {
        a;
      }
      else {
        cast a.append(b);
      }
    });
  }
  
  public static function nub<A, B>(foldable:Foldable<A, B>): A {
    var it = iterator(foldable);
    var first = if(it.hasNext()) it.next() else null;
    return nubBy(foldable, Stax.getEqualFor(first));
  }
  
  public static function intersectBy<A, B>(foldable1: Foldable<A, B>, foldable2: Foldable<A, B>, f: B -> B -> Bool): A {
    return cast foldable1.foldl(foldable1.empty(), function(a, b) {
      return if (existsP(foldable2, b, f)) cast a.append(b); else a;
    });
  }
  
  public static function intersect<A, B>(foldable1: Foldable<A, B>, foldable2: Foldable<A, B>): A {
    var it = iterator(foldable1);
    var first = if(it.hasNext()) it.next() else null;
    return intersectBy(foldable1, foldable2, Stax.getEqualFor(first));
  }
  
  public static function mkString<A, B>(foldable: Foldable<A, B>, ?sep: String = ', ', ?show: B -> String): String {
    var isFirst = true;
    
    return foldable.foldl('', function(a, b) {
      var prefix = if (isFirst) { isFirst = false; ''; } else sep;    
      if(null == show)
      show = Stax.getShowFor(b);
      return a + prefix + show(b);
    });
  }
  
  public static function toArray<A, B>(foldable: Foldable<A, B>): Array<B> {
    var es: Array<B> = [];
    
    foldable.foldl(foldable.empty(), function(a, b) { es.push(b); return a; });

    return es;
  }
  
  public static function toMap<A, K, V>(foldable : Foldable<A, Tuple2<K, V>>) : Map<K, V> {  
    var dest = Map.create();
    return foldable.foldl(dest, function(a, b) {
      return a.append(b);
    });
  }
  
  public static function toList<A, B>(foldable : Foldable<A, B>) : List<B> {  
    var dest = List.create();
    return foldable.foldl(dest, function(a, b) {
      return a.append(b);
    });
  }
  
  public static function toSet<A, B>(foldable : Foldable<A, B>) : Set<B> {  
    var dest = Set.create();
    return foldable.foldl(dest, function(a, b) {
      return a.append(b);
    });
  }
}