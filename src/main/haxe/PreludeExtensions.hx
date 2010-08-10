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
import Prelude;

using PreludeExtensions;

class DynamicExtensions {
  public static function ShowT(): Show<Dynamic> {
    return ShowTypeclass.create({
      show: function(d: Dynamic): String {
        return Std.string(d);
      }
    });
  }
  public static function HasherT(): Hasher<Dynamic> {
    return HasherTypeclass.create({
      hash: function(d: Dynamic): Int {
        return StringExtensions.HasherT(String).hash(ShowT().show(d));
      }
    });
  }
  public static function EqualT(): Equal<Dynamic> {
    return EqualTypeclass.create({
      equal: function(d1: Dynamic, d2: Dynamic): Bool {
        return d1 == d2;
      }
    });
  }
  
  public static function withEffect<T>(t: T, f: Function<T, Void>): T {
    f(t);
    
    return t;
  }
  public static function withEffectP<A, B>(a: A, f: Function<A, B>): A {
    f(a);
    
    return a;
  }
  public static function into<A, B>(a: A, f: A -> B): B {
    return f(a);
  }
  public static inline function isInstanceOf(o: Dynamic, c: Dynamic): Bool {
    return Std.is(o, c);
  }
  public static function entuple<A, B>(a: A, b: B): Tuple2<A, B> {
    return Tuple2.create(a, b);
  }
  public static function memoize<T>(t: Thunk<T>): Thunk<T> {
    var evaled = false;
    var result = null;
    
    return function() {
      if (!evaled) { evaled = true; result = t(); }
      
      return result;
    }
  }
  public static function toThunk<T>(t: T): Thunk<T> {
    return function() {
      return t;
    }
  }  
  public static function toConstantFunction<S, T>(t: T): Function<S, T> {
    return function(s: S) {
      return t;
    }
  }
}

class BoolExtensions {
  public static function toInt(v: Bool): Float { return if (v) 1 else 0; }
  public static function toString(v: Bool): String { return Std.string(v); }
  
  public static function ifTrue<T>(v: Bool, f: Thunk<T>): Option<T> {
    return if (v) Some(f()) else None;
  }
  
  public static function ifFalse<T>(v: Bool, f: Thunk<T>): Option<T> {
    return if (!v) Some(f()) else None;
  }
  
  public static function ifElse<T>(v: Bool, f1: Thunk<T>, f2: Thunk<T>): T {
    return if (v) f1() else f2();
  }
  
  public static function OrderT(c: Enum<Bool>): Order<Bool> {
    return OrderTypeclass.create({
      compare: function(v1: Bool, v2: Bool) {
        return if (!v1 && v2) -1 else if (v1 && !v2) 1 else 0;
      }
    });
  }
  public static function EqualT(c: Enum<Bool>): Equal<Bool> {
    return EqualTypeclass.create({
      equal: function(v1: Bool, v2: Bool) {
        return OrderT(c).compare(v1, v2) == 0;
      }
    });
  }
  public static function ShowT(c: Enum<Bool>): Show<Bool> {
    return ShowTypeclass.create({
      show: function(v: Bool) {
        return if (v) "true" else "false";
      }
    });
  }
  public static function HasherT(c: Enum<Bool>): Hasher<Bool> {
    return HasherTypeclass.create({
      hash: function(v: Bool) {
        return if (v) 786433 else 393241;
      }
    });
  }
}
class IntExtensions {
  public static function max(v1: Int, v2: Int): Int { return if (v2 > v1) v2; else v1; }
  public static function min(v1: Int, v2: Int): Int { return if (v2 < v1) v2; else v1; }
  public static function toBool(v: Int): Bool { return if (v == 0) false else true; }
  public static function toFloat(v: Int): Float { return v; }
  public static function toString(v: Int): String { return Std.string(v); }
  
  public static function to(start: Int, end: Int): Iterable<Int> {
    return {
      iterator: function() {
        var cur = start;
    
        return {
          hasNext: function(): Bool { return cur <= end; },      
          next:    function(): Int  { var next = cur; ++cur; return next; }
        }
      }
    }
  }
  
  public static function until(start: Int, end: Int): Iterable<Int> {
    return to(start, end - 1);
  }
  
  public static function OrderT(c: Class<Int>): Order<Int> {
    return OrderTypeclass.create({
      compare: function(v1: Int, v2: Int) {
        return v1 - v2;
      }
    });
  }
  public static function EqualT(c: Class<Int>): Equal<Int> {
    return EqualTypeclass.create({
      equal: function(v1: Int, v2: Int) {
        return OrderT(c).compare(v1, v2) == 0;
      }
    });
  }
  public static function ShowT(c: Class<Int>): Show<Int> {
    return ShowTypeclass.create({
      show: function(v: Int): String {
        return Std.string(v);
      }
    });
  }
  public static function HasherT(c: Class<Int>): Hasher<Int> {
    return HasherTypeclass.create({
      hash: function(v: Int) {
        return v * 196613;
      }
    });
  }
}
class FloatExtensions {
  public static function round(v: Float): Int { return Math.round(v); }
  public static function max(v1: Float, v2: Float): Float { return if (v2 > v1) v2; else v1; }
  public static function min(v1: Float, v2: Float): Float { return if (v2 < v1) v2; else v1; }
  public static function toInt(v: Float): Int { return Std.int(v); }
  public static function toString(v: Float): String { return Std.string(v); }
  
  public static function OrderT(c: Class<Float>): Order<Float> {
    return OrderTypeclass.create({
      compare: function(v1: Float, v2: Float) {
        return if (v1 < v2) -1 else if (v2 > v1) 1 else 0;
      }
    });
  }
  public static function EqualT(c: Class<Float>): Equal<Float>  {
    return EqualTypeclass.create({
      equal: function(v1: Float, v2: Float) {
        return OrderT(c).compare(v1, v2) == 0;
      }
    });
  }
  public static function ShowT(c: Class<Float>): Show<Float> {
    return ShowTypeclass.create({
      show: function(v: Float): String {
        return Std.string(v);
      }
    });
  }
  public static function HasherT(c: Class<Float>): Hasher<Float> {
    return HasherTypeclass.create({
      hash: function(v: Float) {
        return Std.int(v * 98317);
      }
    });
  }
}
class StringExtensions {
  public static function toBool(v: String): Bool { return if (v.toLowerCase() == "false" || v == "0") false else true; }
  public static function toInt(v: String): Int { return Std.parseInt(v); }
  public static function toFloat(v: String): Float { return Std.parseFloat(v); }  
  public static function startsWith(v: String, frag: String): Bool {
    return if (v.length >= frag.length && frag == v.substr(0, frag.length)) true else false;
  }
  public static function endsWith(v: String, frag: String): Bool {
    return if (v.length >= frag.length && frag == v.substr(v.length - frag.length)) true else false;
  }
  public static function urlEncode(v: String): String {
    return StringTools.urlEncode(v);
  }
  public static function urlDecode(v: String): String {
    return StringTools.urlDecode(v);
  }  
  public static function htmlEscape(v: String): String {
    return StringTools.htmlEscape(v);
  }
  public static function htmlUnescape(v: String): String {
    return StringTools.htmlUnescape(v);
  }
  public static function trim(v: String): String {
    return StringTools.trim(v);
  }
  public static function contains(v: String, s: String): Bool {
    return v.indexOf(s) != -1;
  }
  public static function replace( s : String, sub : String, by : String ) : String {
    return StringTools.replace(s, sub, by);
  }
  
  public static function OrderT(c: Class<String>): Order<String> {
    return OrderTypeclass.create({
      compare: function(v1: String, v2: String) {
        for (i in 0...Std.int(Math.min(v1.length, v2.length))) {
          var c: Int = v1.charCodeAt(i) - v2.charCodeAt(i);
      
          if (c != 0) return c;
        }
    
        return v1.length - v2.length;
      }
    });
  }
  public static function EqualT(c: Class<String>): Equal<String> {
    return EqualTypeclass.create({
      equal: function(v1: String, v2: String) {
        return v1 == v2;
      }
    });
  }
  public static function ShowT(c: Class<String>): Show<String> {
    return ShowTypeclass.create({
      show: function(v: String) {
        return v;
      }
    });
  }
  public static function HasherT(c: Class<String>): Hasher<String> {
    return HasherTypeclass.create({
      hash: function(v: String) {
        var hash = 0;
    
        for (i in 0...v.length) {
          hash += (v.charCodeAt(i) + 24593) * 49157;
        }
    
        return hash;
      }
    });
  }
}
class DateExtensions {
  public static function toString(v: Date): String { return Std.string(v); }

  public static function OrderT(c: Class<Date>): Order<Date> {
    return OrderTypeclass.create({
      compare: function(v1: Date, v2: Date) {
        var diff = v1.getTime() - v2.getTime();
        
        return if (diff < 0) -1; else if (diff > 0) 1; else 0;
      }
    });
  }
  public static function EqualT(c: Class<Date>): Equal<Date> {
    return EqualTypeclass.create({
      equal: function(v1: Date, v2: Date) {
        return v1.getTime() == v2.getTime();
      }
    });
  }
  public static function ShowT(c: Class<Date>): Show<Date> {
    return ShowTypeclass.create({
      show: function(v: Date) {
        return v.toString();
      }
    });
  }
  public static function HasherT(c: Class<Date>): Hasher<Date> {
    return HasherTypeclass.create({
      hash: function(v: Date) {
        return Math.round(v.getTime() * 49157);
      }
    });
  }
}
class ArrayExtensions {
  public static function OrderT<T>(c: Class<Array<Dynamic>>, order: Order<T>): Order<Array<T>> {
    return OrderTypeclass.create({
      compare: function(v1: Array<T>, v2: Array<T>) {
        for (i in 0...Std.int(Math.min(v1.length, v2.length))) {
          var c = order.compare(v1[i], v2[i]);
          if (c != 0) return c;
        }

        return v1.length - v2.length;
      }
    });
  }
  public static function EqualT<T>(c: Class<Array<Dynamic>>, equal: Equal<T>): Equal<Array<T>> {
    return EqualTypeclass.create({
      equal: function(v1: Array<T>, v2: Array<T>) {
        if (v1.length != v2.length) return false;
      
        for (i in 0...Std.int(Math.min(v1.length, v2.length))) {
          if (!equal.equal(v1[i], v2[i])) return false;
        }

        return true;
      }
    });
  }
  public static function ShowT<T>(c: Class<Array<Dynamic>>, show: Show<T>): Show<Array<T>> {
    return ShowTypeclass.create({
      show: function(v: Array<T>) {
        return "[" + v.map(function(e) { return show.show(e); }).join(", ") + "]";
      }
    });
  }
  public static function HasherT<T>(c: Class<Array<Dynamic>>, hasher: Hasher<T>): Hasher<Array<T>> {
    return HasherTypeclass.create({
      hash: function(v: Array<T>) {
        var hash = 0;
      
        for (i in 0...v.length) {
          var e: T = v[i];
          hash += hasher.hash(e) * 12289;
        }
      
        return hash;
      }
    });
  }
  
  public static function filter<T>(a: Array<T>, f: T -> Bool): Array<T> {
    var n: Array<T> = [];
    
    for (e in a) {
      if (f(e)) n.push(e);
    }
    
    return n;
  }
  
  public static function size<T>(a: Array<T>): Int {
    var count: Int = 0;
    
    if (a != []) {
      for (e in a) {
        ++count;
      }
    }
    return count;
  }
  
  public static function map<T, S>(a: Array<T>, f: T -> S): Array<S> {
    var n: Array<S> = [];
    
    for (e in a) n.push(f(e));
    
    return n;
  }
  
  public static function flatMap<T, S>(a: Array<T>, f: T -> Iterable<S>): Array<S> {
    var n: Array<S> = [];
    
    for (e1 in a) {
      for (e2 in f(e1)) n.push(e2);
    }
    
    return n;
  }
  
  public static function foldl<T, Z>(a: Array<T>, z: Z, f: Z -> T -> Z): Z {
    var r = z;
    
    for (e in a) { r = f(r, e); }
    
    return r;
  }
  
  public static function foldr<T, Z>(a: Array<T>, z: Z, f: T -> Z -> Z): Z {
    var r = z;
    
    for (i in 0...a.length) { 
      var e = a[a.length - 1 - i];
      
      r = f(e, r);
    }
    
    return r;
  }
  
  public static function zip<A, B>(a: Array<A>, b: Array<B>): Array<Tuple2<A, B>> {
    var len = Math.floor(Math.min(a.length, b.length));
    
    var r: Array<Tuple2<A, B>> = [];
    
    for (i in 0...len) {
      r.push(Tuple2.create(a[i], b[i]));
    }
    
    return r;
  }
  
  public static function append<T>(a: Array<T>, t: T): Array<T> {
    var copy = snapshot(a);
    
    copy.push(t);
    
    return copy;
  }
  
  public static function snapshot<T>(a: Array<T>): Array<T> {
    return [].concat(a);
  }
  
  public static function first<T>(a: Array<T>): T {
    return a[0];
  }
  
  public static function firstOption<T>(a: Array<T>): Option<T> {
    return if (a.length == 0) None; else Some(a[0]);
  }
  
  public static function last<T>(a: Array<T>): T {
    return a[a.length - 1];
  }
  
  public static function lastOption<T>(a: Array<T>): Option<T> {
    return if (a.length == 0) None; else Some(a[a.length - 1]);
  }
  
  public static function contains<T>(a: Array<T>, t: T): Bool {
    for (e in a) if (t == e) return true;
    
    return false;
  }
  
  public static function foreach<T>(a: Array<T>, f: T -> Void): Array<T> {
    for (e in a) f(e);
    
    return a;
  }
}
class Function0Extensions {
  public static function swallow(f: Void -> Void): Void -> Void {
    return function() {
      try {
        f();
      }
      catch (e: Dynamic) { }
    }
  }
}
class Function1Extensions {
  public static function swallow<A>(f: Function<A, Void>): Function<A, Void> {
    return function(a) {
      try {
        f(a);
      }
      catch (e: Dynamic) { }
    }
  }
  
  public static function toFunction1<A, B>(f: Void -> B): Function<A, B> {
    return function(v) {
      return f();
    }
  }  
  public static function compose<U, V, W>(f1: Function<V, W>, f2: Function<U, V>): Function<U, W> {
    return function(u: U): W {
      return f1(f2(u));
    }
  }
  public static function andThen<U, V, W>(f1: Function<U, V>, f2: Function<V, W>): Function<U, W> {
    return function(u: U): W {
      return f2(f1(u));
    }
  }
  public static function lazy<P1, R>(f: Function<P1, R>, p1: P1): Thunk<R> {
    var r = null;
    
    return function() {
      return if (r == null) { r = f(p1); r; } else r;
    }
  }
}
class Function2Extensions {  
  public static function swallow<A, B>(f: Function2<A, B, Void>): Function2<A, B, Void> {
    return function(a, b) {
      try {
        f(a, b);
      }
      catch (e: Dynamic) { }
    }
  }
  public static function flip<P1, P2, R>(f: Function2<P1, P2, R>): Function2<P2, P1, R> {
    return function(p2, p1) {
      return f(p1, p2);
    }
  }
  public static function curry<P1, P2, R>(f: Function2<P1, P2, R>): Function<P1, Function<P2, R>> {
    return function(p1: P1) {
      return function(p2: P2) {
        return f(p1, p2);
      }
    }
  }
  public static function uncurry<P1, P2, R>(f: Function<P1, Function<P2, R>>): Function2<P1, P2, R> {
    return function(p1: P1, p2: P2) {
      return f(p1)(p2);
    }
  }
  public static function lazy<P1, P2, R>(f: Function2<P1, P2, R>, p1: P1, p2: P2): Thunk<R> {
    var r = null;
    
    return function() {
      return if (r == null) { r = f(p1, p2); r; } else r;
    }
  }
}
class Function3Extensions {  
  public static function swallow<A, B, C>(f: Function3<A, B, C, Void>): Function3<A, B, C, Void> {
    return function(a, b, c) {
      try {
        f(a, b, c);
      }
      catch (e: Dynamic) { }
    }
  }
  public static function curry<P1, P2, P3, R>(f: Function3<P1, P2, P3, R>): Function<P1, Function<P2, Function<P3, R>>> {
    return function(p1: P1) {
      return function(p2: P2) {
        return function(p3: P3) {
          return f(p1, p2, p3);
        }
      }
    }
  }
  public static function uncurry<P1, P2, P3, R>(f: Function<P1, Function<P2, Function<P3, R>>>): Function3<P1, P2, P3, R> {
    return function(p1: P1, p2: P2, p3: P3) {
      return f(p1)(p2)(p3);
    }
  }
  public static function lazy<P1, P2, P3, R>(f: Function3<P1, P2, P3, R>, p1: P1, p2: P2, p3: P3): Thunk<R> {
    var r = null;
    
    return function() {
      return if (r == null) { r = f(p1, p2, p3); r; } else r;
    }
  }
}
class Function4Extensions {  
  public static function swallow<A, B, C, D>(f: Function4<A, B, C, D, Void>): Function4<A, B, C, D, Void> {
    return function(a, b, c, d) {
      try {
        f(a, b, c, d);
      }
      catch (e: Dynamic) { }
    }
  }
  public static function curry<P1, P2, P3, P4, R>(f: Function4<P1, P2, P3, P4, R>): Function<P1, Function<P2, Function<P3, Function<P4, R>>>> {
    return function(p1: P1) {
      return function(p2: P2) {
        return function(p3: P3) {
          return function(p4: P4) {
            return f(p1, p2, p3, p4);
          }
        }
      }
    }
  }
  public static function uncurry<P1, P2, P3, P4, R>(f: Function<P1, Function<P2, Function<P3, Function<P4, R>>>>): Function4<P1, P2, P3, P4, R> {
    return function(p1: P1, p2: P2, p3: P3, p4: P4) {
      return f(p1)(p2)(p3)(p4);
    }
  }
  public static function lazy<P1, P2, P3, P4, R>(f: Function4<P1, P2, P3, P4, R>, p1: P1, p2: P2, p3: P3, p4: P4): Thunk<R> {
    var r = null;
    
    return function() {
      return if (r == null) { r = f(p1, p2, p3, p4); r; } else r;
    }
  }
}
class Function5Extensions {  
  public static function swallow<A, B, C, D, E>(f: Function5<A, B, C, D, E, Void>): Function5<A, B, C, D, E, Void> {
    return function(a, b, c, d, e) {
      try {
        f(a, b, c, d, e);
      }
      catch (e: Dynamic) { }
    }
  }
  public static function curry<P1, P2, P3, P4, P5, R>(f: Function5<P1, P2, P3, P4, P5, R>): Function<P1, Function<P2, Function<P3, Function<P4, Function<P5, R>>>>> {
    return function(p1: P1) {
      return function(p2: P2) {
        return function(p3: P3) {
          return function(p4: P4) {
            return function(p5: P5) {
              return f(p1, p2, p3, p4, p5);
            }
          }
        }
      }
    }
  }
  public static function uncurry<P1, P2, P3, P4, P5, R>(f: Function<P1, Function<P2, Function<P3, Function<P4, Function<P5, R>>>>>): Function5<P1, P2, P3, P4, P5, R> {
    return function(p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) {
      return f(p1)(p2)(p3)(p4)(p5);
    }
  }
  public static function lazy<P1, P2, P3, P4, P5, R>(f: Function5<P1, P2, P3, P4, P5, R>, p1: P1, p2: P2, p3: P3, p4: P4, p5: P5): Thunk<R> {
    var r = null;
    
    return function() {
      return if (r == null) { r = f(p1, p2, p3, p4, p5); r; } else r;
    }
  }
}

class OptionExtensions {
  public static function OrderT<T>(c: Enum<Option<Dynamic>>, order: Order<T>): Order<Option<T>> {
    return OrderTypeclass.create({
      compare: function(v1: Option<T>, v2: Option<T>) {
        return switch(v1) {
          case None: switch(v2) {
            case None: 0;
            case Some(_): -1;
          }
        
          case Some(t1): switch(v2) {
            case None: 1;
            case Some(t2): order.compare(t1, t2);
          }
        }
      }
    });
  }
  public static function EqualT<T>(c: Enum<Option<Dynamic>>, equal: Equal<T>): Equal<Option<T>> {
    return EqualTypeclass.create({
      equal: function(v1: Option<T>, v2: Option<T>) {
        return switch(v1) {
          case None: switch(v2) {
            case None: true;
            case Some(_): false;
          }
        
          case Some(t1): switch(v2) {
            case None: false;
            case Some(t2): equal.equal(t1, t2);
          }
        }
      }
    });
  }
  public static function ShowT<T>(c: Enum<Option<Dynamic>>, show: Show<T>): Show<Option<T>> {
    return ShowTypeclass.create({
      show: function(v: Option<T>) {
        return switch(v) {
          case None: "None";
          case Some(t): "Some(" + show.show(t) + ")";
        }
      }
    });
  }
  public static function HasherT<T>(c: Enum<Option<Dynamic>>, hasher: Hasher<T>): Hasher<Option<T>> {
    return HasherTypeclass.create({
      hash: function(v: Option<T>) {
        return switch(v) {
          case None:    3079;
          case Some(t): hasher.hash(t);
        }
      }
    });
  }
  
  public static function toOption<T>(t: T): Option<T> {
    return if (t == null) None; else Some(t);
  }
  
  public static function toArray<T>(o: Option<T>): Array<T> {
    return switch (o) {
      case None:    [];
      case Some(v): [v];
    }
  }
  
  public static function map<T, S>(o: Option<T>, f: T -> S): Option<S> {
    return switch (o) {
      case None: None;
      case Some(v): Some(f(v));
    }
  }
  
  public static function filter<T>(o: Option<T>, f: T -> Bool): Option<T> {
    return switch (o) {
      case None: None;
      case Some(v): if (f(v)) Some(v) else None;
    }
  }
  
  public static function flatMap<T, S>(o: Option<T>, f: T -> Option<S>): Option<S> {
    return switch (o) {
      case None: None;
      case Some(v1): switch (f(v1)) {
        case None: None;
        case Some(v2): Some(v2);
      }
    }
  }
  
  public static function zip<T, S>(o1: Option<T>, o2: Option<S>): Option<Tuple2<T, S>> {
    return switch (o1) {
      case None: None;
      case Some(v1): switch (o2) {
        case None: None;
        case Some(v2): Some(v1.entuple(v2));
      }
    }
  }
  
  public static function get<T>(o: Option<T>): T {
    return switch (o) {
      case None: Stax.error("Error: Option is empty");
      case Some(v): v;
    }
  }
  
  public static function orElse<T>(o1: Option<T>, thunk: Thunk<Option<T>>): Option<T> {
    return switch (o1) {
      case None: thunk();
      
      case Some(v): o1;
    }
  }
  
  public static function orElseC<T>(o1: Option<T>, o2: Option<T>): Option<T> {
    return OptionExtensions.orElse(o1, o2.toThunk());
  }
  
  public static function orEither<T, S>(o1: Option<T>, thunk: Thunk<S>): Either<T, S> {
    return switch (o1) {
      case None: EitherExtensions.toRight(thunk());
      
      case Some(v): EitherExtensions.toLeft(v);
    }
  }
  
  public static function orEitherC<T, S>(o1: Option<T>, c: S): Either<T, S> {
    return OptionExtensions.orEither(o1, c.toThunk());
  }
  
  public static function getOrElse<T>(o: Option<T>, thunk: Thunk<T>): T {
    return switch(o) {
      case None: thunk();
      case Some(v): v;
    }
  }
  
  public static function getOrElseC<T>(o: Option<T>, c: T): T {
    return OptionExtensions.getOrElse(o, c.toThunk());
  }
  
  public static function isEmpty<T>(o: Option<T>): Bool {
    return switch(o) {
      case None:    true;
      case Some(v): false;
    }
  }
}

class EitherExtensions {
  public static function OrderT<A, B>(c: Enum<Either<Dynamic, Dynamic>>, order1: Order<A>, order2: Order<B>): Order<Either<A, B>> {
    return OrderTypeclass.create({
      compare: function(e1: Either<A, B>, e2: Either<A, B>) {
        return switch (e1) {
          case Left(v1): switch (e2) {
            case Left(v2): order1.compare(v1, v2);
            case Right(v2): -1;
          }
        
          case Right(v1): switch (e2) {
            case Left(v2): 1;
            case Right(v2): order2.compare(v1, v2);
          } 
        }
      }
    });
  }
  public static function EqualT<A, B>(c: Enum<Either<Dynamic, Dynamic>>, equal1: Equal<A>, equal2: Equal<B>): Equal<Either<A, B>> {
    return EqualTypeclass.create({
      equal: function(e1: Either<A, B>, e2: Either<A, B>) {
        return switch (e1) {
          case Left(v1): switch (e2) {
            case Left(v2): equal1.equal(v1, v2);
            case Right(v2): false;
          }
        
          case Right(v1): switch (e2) {
            case Left(v2): false;
            case Right(v2): equal2.equal(v1, v2);
          } 
        }
      }
    });
  }
  public static function ShowT<A, B>(c: Enum<Either<Dynamic, Dynamic>>, show1: Show<A>, show2: Show<B>): Show<Either<A, B>> {
    return ShowTypeclass.create({
      show: function(e: Either<A, B>) {
        return switch(e) {
          case Left(v): "Left(" + show1.show(v) + ")";
          case Right(v): "Right(" + show2.show(v) + ")";
        }
      }
    });
  }
  public static function HasherT<A, B>(c: Enum<Either<Dynamic, Dynamic>>, hash1: Hasher<A>, hash2: Hasher<B>): Hasher<Either<A, B>> {
    return HasherTypeclass.create({
      hash: function(e: Either<A, B>) {
        return switch(e) {
          case Left(v): hash1.hash(v);
          case Right(v): hash2.hash(v);
        }
      }
    });
  }
  
  public static function toLeft<A, B>(v: A): Either<A, B> {
    return Left(v);
  }
  
  public static function toRight<A, B>(v: B): Either<A, B> {
    return Right(v);
  }
  
  public static function flip<A, B>(e: Either<A, B>): Either<B, A> {
    return switch(e) {
      case Left(v): Right(v);
      case Right(v): Left(v);
    }
  }
  
  public static function left<A, B>(e: Either<A, B>): Option<A> {
    return switch (e) {
      case Left(v): Some(v);
      
      default: None;
    }
  }
  
  public static function isLeft<A, B>(e: Either<A, B>): Bool {
    return switch (e) {
      case Left(_):  true;
      case Right(_): false;
    }
  }
  
  public static function isRight<A, B>(e: Either<A, B>): Bool {
    return switch (e) {
      case Left(_):  false;
      case Right(_): true;
    }
  }
  
  public static function right<A, B>(e: Either<A, B>): Option<B> {
    return switch (e) {
      case Right(v): Some(v);
      
      default: None;
    }
  }
  
  public static function get<A>(e: Either<A, A>): A {
    return switch (e) {
      case Left(v): v;
      case Right(v): v;
    }
  }
  
  public static function mapLeft<A, B, C>(e: Either<A, B>, f: A -> C): Either<C, B> {
    return switch (e) {
      case Left(v): Left(f(v));
      case Right(v): Right(v);
    }
  }
  
  public static function map<A, B, C, D>(e: Either<A, B>, f1: A -> C, f2: B -> D): Either<C, D> {
    return switch (e) {
      case Left(v): Left(f1(v));
      case Right(v): Right(f2(v));
    }
  }
  
  public static function mapRight<A, B, D>(e: Either<A, B>, f: B -> D): Either<A, D> {
    return switch (e) {
      case Left(v): Left(v);
      case Right(v): Right(f(v));
    }
  }
  
  public static function flatMap<A, B, C, D>(e: Either<A, B>, f1: A -> Either<C, D>, f2: B -> Either<C, D>): Either<C, D> {
    return switch (e) {
      case Left(v): f1(v);
      case Right(v): f2(v);
    }
  }
  
  /** Composes two Eithers together. In case of conflicts, "failure" (left) 
   * always wins.
   */
  public static function composeLeft<A, B>(e1: Either<A, B>, e2: Either<A, B>, ac: A -> A -> A, bc: B -> B -> B): Either<A, B> {
    return switch (e1) {
      case Left(v1): switch (e2) {
        case Left(v2): Left(ac(v1, v2));
        case Right(v2): Left(v1);
      }
      case Right(v1): switch (e2) {
        case Left(v2): Left(v2);
        case Right(v2): Right(bc(v1, v2));
      }
    }
  }
  
  /** Composes two Eithers together. In case of conflicts, "success" (right) 
   * always wins.
   */
  public static function composeRight<A, B>(e1: Either<A, B>, e2: Either<A, B>, ac: A -> A -> A, bc: B -> B -> B): Either<A, B> {
    return switch (e1) {
      case Left(v1): switch (e2) {
        case Left(v2): Left(ac(v1, v2));
        case Right(v2): Right(v2);
      }
      case Right(v1): switch (e2) {
        case Left(v2): Right(v1);
        case Right(v2): Right(bc(v1, v2));
      }
    }
  }
}
class FutureExtensions {
  public static function toFuture<T>(t: T): Future<T> {
    return Future.create().deliver(t);
  }
}

class IterableExtensions {
  public static function toString<T>(i: Iterable<T>, ?show: T -> String, ?prefix: String = '(', ?suffix: String = ')', ?sep = ', ') {
    return mkString(i, show, prefix, suffix, sep);
  }
  
  public static function mkString<T>(i: Iterable<T>, ?show: T -> String, ?prefix: String = '(', ?suffix: String = ')', ?sep = ', ') {
    if (show == null) show = Std.string;
    
    var s = prefix;
    
    var isFirst = true;

    for (t in i) {
      if (isFirst) isFirst = false; else s += sep;
      
      s += show(t);
    }
    
    return s + suffix;
  }
  
  public static function toList<T>(i: Iterable<T>, ?equal: Equal<T>) {
    return haxe.data.collections.List.create(equal).addAll(i);
  }
  
  public static function toSet<T>(i: Iterable<T>, ?hash: Hasher<T>, ?equal: Equal<T>) {
    return haxe.data.collections.Set.create(hash, equal).addAll(i);
  }
  
  public static function toMap<K, V>(i: Iterable<Tuple2<K, V>>, ?khash: Hasher<K>, ?kequal: Equal<K>, ?vhash: Hasher<V>, ?vequal: Equal<V>) {
    return haxe.data.collections.Map.create(khash, kequal, vhash, vequal).addAll(i);
  }
  
  public static function toArray<T>(i: Iterable<T>) {
    var a = [];
    
    for (e in i) a.push(e);
    
    return a;
  }
}