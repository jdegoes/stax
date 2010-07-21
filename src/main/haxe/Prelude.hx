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
using Prelude;

enum Unit {
  Unit;
}

typedef AnyRef = {}
typedef CodeBlock = Void -> Void
typedef Function<P1, R> = P1 -> R
typedef Function1<P1, R> = P1 -> R
typedef Function2<P1, P2, R> = P1 -> P2 -> R
typedef Function3<P1, P2, P3, R> = P1 -> P2 -> P3 -> R
typedef Function4<P1, P2, P3, P4, R> = P1 -> P2 -> P3 -> P4 -> R
typedef Function5<P1, P2, P3, P4, P5, R> = P1 -> P2 -> P3 -> P4 -> P5 -> R
typedef Function6<P1, P2, P3, P4, P5, P6, R> = P1 -> P2 -> P3 -> P4 -> P5 -> P6 -> R
typedef Function7<P1, P2, P3, P4, P5, P6, P7, R> = P1 -> P2 -> P3 -> P4 -> P5 -> P6 -> P7 -> R
typedef Function8<P1, P2, P3, P4, P5, P6, P7, P8, R> = P1 -> P2 -> P3 -> P4 -> P5 -> P6 -> P7 -> P8 -> R
typedef Function9<P1, P2, P3, P4, P5, P6, P7, P8, P9, R> = P1 -> P2 -> P3 -> P4 -> P5 -> P6 -> P7 -> P8 -> P9 -> R
typedef Function10<P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, R> = P1 -> P2 -> P3 -> P4 -> P5 -> P6 -> P7 -> P8 -> P9 -> P10 -> R

typedef Reducer<T> = T -> T -> T

typedef Factory<T> = Void -> T

typedef Show<T> = {
  show: T -> String 
}

typedef Read<T> = {
  read:  String -> T
}

typedef Equal<T> = { 
  equal:    T -> T -> Bool,
  notEqual: T -> T -> Bool
}

typedef Hasher<T> = { 
  hash:  T -> Int
}

typedef Order<T> = {>Equal<T>, 
  compare:            T -> T -> Int,
  greaterThan:        T -> T -> Bool,
  greaterThanOrEqual: T -> T -> Bool,
  lessThan:           T -> T -> Bool,
  lessThanOrEqual:    T -> T -> Bool
}

typedef Thunk<T> = Void -> T

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
    var copy = [].concat(a);
    
    copy.push(t);
    
    return copy;
  }
  
  public static function snapshot<T>(a: Array<T>): Array<T> {
    return [].concat(a);
  }
  
  public static function first<T>(a: Array<T>): T {
    return a[0];
  }
  
  public static function last<T>(a: Array<T>): T {
    return a[a.length - 1];
  }
  
  public static function contains<T>(a: Array<T>, t: T): Bool {
    for (e in a) if (e == t) return true;
    
    return false;
  }
  
  public static function foreach<T>(a: Array<T>, f: T -> Void): Array<T> {
    for (e in a) f(e);
    
    return a;
  }
}
class FunctionExtensions {
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

/** An option represents an optional value -- the value may or may not be 
 * present. Option is a much safer alternative to null that often enables
 * reduction in code size and increase in code clarity.
 */
enum Option<T> {
  None;
  Some(v: T);
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

/** Either represents a type that is either a "left" value or a "right" value, 
 * but not both. Either is often used to represent success/failure, where the 
 * left side represents failure, and the right side represents success.
 */
enum Either<A, B> {
  Left(v: A);
  Right(v: B);
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

/** 
 * An asynchronous operation that may complete in the future unless 
 * successfully canceled.
 * <p>
 * Futures can be combined and chained together to form complicated 
 * asynchronous control flows. Often used operations are map() and
 * flatMap().
 * <p>
 */
class Future<T> {
  var _listeners: Array<T -> Void>;
  var _result: T;
  var _isSet: Bool;
  var _isCanceled: Bool;
  var _cancelers: Array<Void -> Bool>;
  var _canceled: Array<Void -> Void>;
  
  public function new() {
    _listeners  = [];
    _result     = null;
    _isSet      = false;
    _isCanceled = false;
    _cancelers  = [];
    _canceled   = [];
  }
  
  /** Creates a "dead" future that is canceled and will never be delivered.
   */
  public static function dead<T>() {
    return new Future().cancel();
  }
  
  /** Delivers the value of the future to anyone awaiting it. If the value has
   * already been delivered, this method will throw an exception.
   */
  public function deliver(t: T): Future<T> {
    return if (_isCanceled) this;
    else if (_isSet) Stax.error("Future already delivered");
    else {    
      _result = t;
      _isSet  = true;
    
      for (l in _listeners) l(_result);
    
      _listeners = [];
      
      this;
    }
  }
  
  /** Installs the specified canceler on the future. Under ordinary 
   * circumstances, the future will not be canceled unless all cancelers 
   * return true. If the future is already done, this method has no effect.
   * <p>
   * This method does not normally need to be called. It's provided primarily
   * for the implementation of future primitives.
   */
  public function allowCancelOnlyIf(f: Void -> Bool): Future<T> {
    if (!isDone()) _cancelers.push(f);
    
    return this;
  }
  
  /** Installs a handler that will be called if and only if the future is
   * canceled. 
   * <p> 
   * This method does not normally need to be called, since there is no 
   * difference between a future being canceled and a future taking an 
   * arbitrarily long amount of time to evaluate. It's provided primarily
   * for implementation of future primitives to save resources when it's
   * explicitly known the result of a future will not be used.
   */
  public function ifCanceled(f: Void -> Void): Future<T> {
    if (isCanceled()) f();
    else if (!isDone()) _canceled.push(f);
    
    return this;
  }
  
  /** Attempts to cancel the future. This may succeed only if the future is
   * not already delivered, and if all cancel conditions are satisfied.
   * <p>
   * If a future is canceled, the result will never be delivered.
   *
   * @return true if the future is canceled, false otherwise.
   */
  public function cancel(): Bool {
    return if (isDone()) false;   // <-- Already done, can't be canceled
    else if (isCanceled()) true;  // <-- Already canceled, nothing to do
    else {                        // <-- Ask to see if everyone's OK with canceling
      var r = true;
             
      for (canceller in _cancelers) r = r && canceller();
      
      if (r) {
        // Everyone's OK with canceling, mark state & notify:
        forceCancel();
      }
             
      r;
    }
  }
  
  /** Determines if the future is "done" -- that is, delivered or canceled.
   */
  public function isDone(): Bool {
    return isDelivered() || isCanceled();
  }
  
  /** Determines if the future is delivered.
   */
  public function isDelivered(): Bool {
    return _isSet;
  }
  
  /** Determines if the future is canceled.
   */
  public function isCanceled(): Bool {
    return _isCanceled;
  }
  
  /** Delivers the result of the future to the specified handler as soon as it
   * is delivered.
   */
  public function deliverTo(f: T -> Void): Future<T> {
    if (isCanceled()) return this;
    else if (isDelivered()) f(_result);
    else _listeners.push(f);
    
    return this;
  }
  
  /** Uses the specified function to transform the result of this future into
   * a different value, returning a future of that value.
   * <p>
   * urlLoader.load("image.png").map(function(data) return new Image(data)).deliverTo(function(image) imageContainer.add(image));
   */
  public function map<S>(f: T -> S): Future<S> {
    var fut: Future<S> = new Future();
    
    deliverTo(function(t: T) { fut.deliver(f(t)); });
    ifCanceled(function() { fut.forceCancel(); });
    
    return fut;
  }
  
  /** Maps the result of this future to another future, and returns a future
   * of the result of that future. Useful when chaining together multiple
   * asynchronous operations that must be completed sequentially.
   * <p>
   * <pre>
   * <code>
   * urlLoader.load("config.xml").flatMap(function(xml){
   *   return urlLoader.load(parse(xml).mediaUrl);
   * }).deliverTo(function(loadedMedia){
   *   container.add(loadedMedia);
   * });
   * </code>
   * </pre>
   */
  public function flatMap<S>(f: T -> Future<S>): Future<S> {
    var fut: Future<S> = new Future();
    
    deliverTo(function(t: T) { 
      f(t).deliverTo(function(s: S) { 
        fut.deliver(s);
      }).ifCanceled(function() {
        fut.forceCancel();
      });
    });
    
    ifCanceled(function() { fut.forceCancel(); });
    
    return fut;
  }
  
  /** Returns a new future that will be delivered only if the result of this
   * future is accepted by the specified filter (otherwise, the new future
   * will be canceled).
   */
  public function filter(f: T -> Bool): Future<T> {
    var fut: Future<T> = new Future();
    
    deliverTo(function(t: T) { if (f(t)) fut.deliver(t); else fut.forceCancel(); });
    
    ifCanceled(function() fut.forceCancel());
    
    return fut;
  }
  
  /** Zips this future and the specified future into another future, whose 
   * result is a tuple of the individual results of the futures. Useful when
   * an operation requires the result of two futures, but each future may
   * execute independently of the other.
   */
  public function zip<A>(f2: Future<A>): Future<Tuple2<T, A>> {
    var zipped: Future<Tuple2<T, A>> = new Future();
    
    var f1 = this;
    
    var deliverZip = function() {
      if (f1.isDelivered() && f2.isDelivered()) {
        zipped.deliver(
          Tuple2.create(f1.value().get(), f2.value().get())
        );
      }
    }
    
    f1.deliverTo(function(v) deliverZip());
    f2.deliverTo(function(v) deliverZip());
    
    zipped.allowCancelOnlyIf(function() return f1.cancel() || f2.cancel());
    
    f1.ifCanceled(function() zipped.forceCancel());
    f2.ifCanceled(function() zipped.forceCancel());
    
    return zipped;
  }
  
  /** Retrieves the value of the future, as an option.
   */
  public function value(): Option<T> {
    return if (_isSet) Some(_result) else None;
  }
  
  public function toOption(): Option<T> {
    return value();
  }
  
  public function toArray(): Array<T> {
    return value().toArray();
  }
  
  private function forceCancel(): Future<T> {
    if (!_isCanceled) {
      _isCanceled = true;
  
      for (canceled in _canceled) canceled();
    }
    
    return this;
  }
  
  public static function create<T>(): Future<T> {
    return new Future<T>();
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

interface Product {
  public var productPrefix (getProductPrefix, null): String;
  
  public var productArity (getProductArity, null): Int;

  public function productElement(n: Int): Dynamic;
}

private class AbstractProduct implements Product {
  public var productPrefix (getProductPrefix, null): String;
  
  public var productArity (getProductArity, null): Int;
  
  private var _productElements: Array<Dynamic>;
  
  public function new(elements: Array<Dynamic>) {
    _productElements = elements;
  }
  
  public function productElement(n: Int): Dynamic {
    return _productElements[n];
  }
  
  public function toString(): String {
    var string = productPrefix + "(";
    
    for (i in 0...productArity) {
      if (i != 0) string += ", ";
      
      string += Std.string(productElement(i));
    }
    
    return string + ")";
  }
  
  private function getProductPrefix(): String {
    return Stax.error("Not implemented");
  }
  
  private function getProductArity(): Int {
    return Stax.error("Not implemented");
  }
}

class Tuple2<A, B> extends AbstractProduct {
  public static function OrderT<T1, T2>(order1: Order<T1>, order2: Order<T2>): Order<Tuple2<T1, T2>> {
    return OrderTypeclass.create({
      compare: function (v1: Tuple2<T1, T2>, v2: Tuple2<T1, T2>) {
        var c = order1.compare(v1._1, v2._1);
        if (c != 0) return c;
      
        c = order2.compare(v1._2, v2._2);
        if (c != 0) return c;
      
        return 0;
      }
    });
  }
  public static function EqualT<T1, T2>(equal1: Equal<T1>, equal2: Equal<T2>): Equal<Tuple2<T1, T2>> {
    return EqualTypeclass.create({
      equal: function (v1: Tuple2<T1, T2>, v2: Tuple2<T1, T2>) {
        return equal1.equal(v1._1, v2._1) && equal2.equal(v1._2, v2._2);
      }
    });
  }
  public static function ShowT<T1, T2>(show1: Show<T1>, show2: Show<T2>): Show<Tuple2<T1, T2>> {
    return ShowTypeclass.create({
      show: function (v1: Tuple2<T1, T2>) {
        return "Tuple2(" + show1.show(v1._1) + ", " + show2.show(v1._2) + ")";
      }
    });
  }
  public static function HasherT<T1, T2>(hash1: Hasher<T1>, hash2: Hasher<T2>): Hasher<Tuple2<T1, T2>> {
    return HasherTypeclass.create({
      hash: function (v: Tuple2<T1, T2>) {
        return 786433 * hash1.hash(v._1) + 24593 * hash2.hash(v._2);
      }
    });
  }
  
  public var _1 (default, null): A;
  public var _2 (default, null): B;

  public function new(first: A, second: B) {
    super([first, second]);
    
    this._1  = first; this._2 = second;
  }
  
  override private function getProductPrefix(): String {
    return "Tuple2";
  }
  
  override private function getProductArity(): Int {
    return 2;
  }
  
  public function entuple<C>(c: C): Tuple3<A, B, C> {
    return Tuple3.create(_1, _2, c);
  }
  
  public static function create<A, B>(a: A, b: B): Tuple2<A, B> {
    return new Tuple2<A, B>(a, b);
  }
}

class Tuple3<A, B, C> extends AbstractProduct {
  public static function OrderT<T1, T2, T3>(order1: Order<T1>, order2: Order<T2>, order3: Order<T3>): Order<Tuple3<T1, T2, T3>> {
    return OrderTypeclass.create({
      compare: function (v1: Tuple3<T1, T2, T3>, v2: Tuple3<T1, T2, T3>) {
        var c = order1.compare(v1._1, v2._1);
        if (c != 0) return c;
      
        c = order2.compare(v1._2, v2._2);
        if (c != 0) return c;
      
        c = order3.compare(v1._3, v2._3);
        if (c != 0) return c;
      
        return 0;
      }
    });
  }
  public static function EqualT<T1, T2, T3>(equal1: Equal<T1>, equal2: Equal<T2>, equal3: Equal<T3>): Equal<Tuple3<T1, T2, T3>> {
    return EqualTypeclass.create({
      equal: function (v1: Tuple3<T1, T2, T3>, v2: Tuple3<T1, T2, T3>) {
        return equal1.equal(v1._1, v2._1) && equal2.equal(v1._2, v2._2) && equal3.equal(v1._3, v2._3);
      }
    });
  }
  public static function ShowT<T1, T2, T3>(show1: Show<T1>, show2: Show<T2>, show3: Show<T3>): Show<Tuple3<T1, T2, T3>> {
    return ShowTypeclass.create({
      show: function (v1: Tuple3<T1, T2, T3>) {
        return "Tuple3(" + show1.show(v1._1) + ", " + show2.show(v1._2) + ", " + show3.show(v1._3) + ")";
      }
    });
  }
  public static function HasherT<T1, T2, T3>(hash1: Hasher<T1>, hash2: Hasher<T2>, hash3: Hasher<T3>): Hasher<Tuple3<T1, T2, T3>> {
    return HasherTypeclass.create({
      hash: function (v: Tuple3<T1, T2, T3>) {
        return 196613 * hash1.hash(v._1) + 3079 * hash2.hash(v._2) + 389 * hash3.hash(v._3);
      }
    });
  }
  
  public var _1 (default, null): A;
  public var _2 (default, null): B;
  public var _3 (default, null): C;

  public function new(first: A, second: B, third: C) {
    super([first, second, third]);

    this._1 = first; this._2 = second; this._3 = third;
  }

  override private function getProductPrefix(): String {
    return "Tuple3";
  }
  
  override private function getProductArity(): Int {
    return 3;
  }
  
  public function entuple<D>(d: D): Tuple4<A, B, C, D> {
    return Tuple4.create(_1, _2, _3, d);
  }

  public static function create<A, B, C>(a: A, b: B, c: C): Tuple3<A, B, C> {
    return new Tuple3<A, B, C>(a, b, c);
  }
}

class Tuple4<A, B, C, D> extends AbstractProduct {
  public static function OrderT<T1, T2, T3, T4>(order1: Order<T1>, order2: Order<T2>, order3: Order<T3>, order4: Order<T4>): Order<Tuple4<T1, T2, T3, T4>> {
    return OrderTypeclass.create({
      compare: function (v1: Tuple4<T1, T2, T3, T4>, v2: Tuple4<T1, T2, T3, T4>) {
        var c = order1.compare(v1._1, v2._1);
        if (c != 0) return c;
      
        c = order2.compare(v1._2, v2._2);
        if (c != 0) return c;
      
        c = order3.compare(v1._3, v2._3);
        if (c != 0) return c;
      
        c = order4.compare(v1._4, v2._4);
        if (c != 0) return c;
      
        return 0;
      }
    });
  }
  public static function EqualT<T1, T2, T3, T4>(equal1: Equal<T1>, equal2: Equal<T2>, equal3: Equal<T3>, equal4: Equal<T4>): Equal<Tuple4<T1, T2, T3, T4>> {
    return EqualTypeclass.create({
      equal: function (v1: Tuple4<T1, T2, T3, T4>, v2: Tuple4<T1, T2, T3, T4>) {
        return equal1.equal(v1._1, v2._1) && equal2.equal(v1._2, v2._2) && equal3.equal(v1._3, v2._3) && equal4.equal(v1._4, v2._4);
      }
    });
  }
  public static function ShowT<T1, T2, T3, T4>(show1: Show<T1>, show2: Show<T2>, show3: Show<T3>, show4: Show<T4>): Show<Tuple4<T1, T2, T3, T4>> {
    return ShowTypeclass.create({
      show: function (v1: Tuple4<T1, T2, T3, T4>) {
        return "Tuple4(" + show1.show(v1._1) + ", " + show2.show(v1._2) + ", " + show3.show(v1._3) + ", " + show4.show(v1._4) + ")";
      }
    });
  }
  public static function HasherT<T1, T2, T3, T4>(hash1: Hasher<T1>, hash2: Hasher<T2>, hash3: Hasher<T3>, hash4: Hasher<T4>): Hasher<Tuple4<T1, T2, T3, T4>> {
    return HasherTypeclass.create({
      hash: function (v: Tuple4<T1, T2, T3, T4>) {
        return 1543 * hash1.hash(v._1) + 49157 * hash2.hash(v._2) + 196613 * hash3.hash(v._3) + 97 * hash4.hash(v._4);
      }
    });
  }
  
  public var _1 (default, null): A;
  public var _2 (default, null): B;
  public var _3 (default, null): C;
  public var _4 (default, null): D;

  public function new(first: A, second: B, third: C, fourth: D) {
    super([first, second, third, fourth]);

    this._1 = first; this._2 = second; this._3 = third; this._4 = fourth;
  }

  override private function getProductPrefix(): String {
    return "Tuple4";
  }
  
  override private function getProductArity(): Int {
    return 4;
  }
  
  public function entuple<E>(e: E): Tuple5<A, B, C, D, E> {
    return Tuple5.create(_1, _2, _3, _4, e);
  }

  public static function create<A, B, C, D>(a: A, b: B, c: C, d: D): Tuple4<A, B, C, D> {
    return new Tuple4<A, B, C, D>(a, b, c, d);
  }
}

class Tuple5<A, B, C, D, E> extends AbstractProduct {
  public static function OrderT<T1, T2, T3, T4, T5>(order1: Order<T1>, order2: Order<T2>, order3: Order<T3>, order4: Order<T4>, order5: Order<T5>): Order<Tuple5<T1, T2, T3, T4, T5>> {
    return OrderTypeclass.create({
      compare: function (v1: Tuple5<T1, T2, T3, T4, T5>, v2: Tuple5<T1, T2, T3, T4, T5>) {
        var c = order1.compare(v1._1, v2._1);
        if (c != 0) return c;
      
        c = order2.compare(v1._2, v2._2);
        if (c != 0) return c;
      
        c = order3.compare(v1._3, v2._3);
        if (c != 0) return c;
      
        c = order4.compare(v1._4, v2._4);
        if (c != 0) return c;
      
        c = order5.compare(v1._5, v2._5);
        if (c != 0) return c;
      
        return 0;
      }
    });
  }
  public static function EqualT<T1, T2, T3, T4, T5>(equal1: Equal<T1>, equal2: Equal<T2>, equal3: Equal<T3>, equal4: Equal<T4>, equal5: Equal<T5>): Equal<Tuple5<T1, T2, T3, T4, T5>> {
    return EqualTypeclass.create({
      equal: function (v1: Tuple5<T1, T2, T3, T4, T5>, v2: Tuple5<T1, T2, T3, T4, T5>) {
        return equal1.equal(v1._1, v2._1) && equal2.equal(v1._2, v2._2) && equal3.equal(v1._3, v2._3) && equal4.equal(v1._4, v2._4) && equal5.equal(v1._5, v2._5);
      }
    });
  }
  public static function ShowT<T1, T2, T3, T4, T5>(show1: Show<T1>, show2: Show<T2>, show3: Show<T3>, show4: Show<T4>, show5: Show<T5>): Show<Tuple5<T1, T2, T3, T4, T5>> {
    return ShowTypeclass.create({
      show: function (v1: Tuple5<T1, T2, T3, T4, T5>) {
        return "Tuple5(" + show1.show(v1._1) + ", " + show2.show(v1._2) + ", " + show3.show(v1._3) + ", " + show4.show(v1._4) + ", " + show5.show(v1._5) + ")";
      }
    });
  }
  public static function HasherT<T1, T2, T3, T4, T5>(hash1: Hasher<T1>, hash2: Hasher<T2>, hash3: Hasher<T3>, hash4: Hasher<T4>, hash5: Hasher<T5>): Hasher<Tuple5<T1, T2, T3, T4, T5>> {
    return HasherTypeclass.create({
      hash: function (v: Tuple5<T1, T2, T3, T4, T5>) {
        return 12289 * hash1.hash(v._1) + 769 * hash2.hash(v._2) + 393241 * hash3.hash(v._3) + 193 * hash4.hash(v._4) + 53 * hash5.hash(v._5);
      }
    });
  }
  
  public var _1 (default, null): A;
  public var _2 (default, null): B;
  public var _3 (default, null): C;
  public var _4 (default, null): D;
  public var _5 (default, null): E;

  public function new(first: A, second: B, third: C, fourth: D, fifth: E) {
    super([first, second, third, fourth, fifth]);

    this._1 = first; this._2 = second; this._3 = third; this._4 = fourth; this._5 = fifth;
  }

  override private function getProductPrefix(): String {
    return "Tuple5";
  }
  
  override private function getProductArity(): Int {
    return 5;
  }

  public static function create<A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): Tuple5<A, B, C, D, E> {
    return new Tuple5<A, B, C, D, E>(a, b, c, d, e);
  }
}

class OrderTypeclass {
  public static function create<T>(cmp: { compare: Function2<T, T, Int> }): Order<T> {
    return {
      compare:            cmp.compare,
      equal:              function(t1, t2) { return cmp.compare(t1, t2) == 0; },
      notEqual:           function(t1, t2) { return cmp.compare(t1, t2) != 0; },
      greaterThan:        function(t1, t2) { return cmp.compare(t1, t2) > 0; },
      greaterThanOrEqual: function(t1, t2) { return cmp.compare(t1, t2) >= 0; },
      lessThan:           function(t1, t2) { return cmp.compare(t1, t2) < 0; },
      lessThanOrEqual:    function(t1, t2) { return cmp.compare(t1, t2) <= 0; }
    }
  }
}
class EqualTypeclass {
  public static function create<T>(equal: { equal: Function2<T, T, Bool> }): Equal<T> {
    return {
      equal:    equal.equal,
      notEqual: function(v1, v2) { return !equal.equal(v1, v2); }
    }
  }
}
class ShowTypeclass {
  public static function create<T>(show: { show: Function<T, String> }): Show<T> {
    return {
      show:     show.show
    }
  }
}
class HasherTypeclass {
  public static function create<T>(hasher: { hash: Function<T, Int> }): Hasher<T> {
    return {
      hash:     hasher.hash
    }
  }
}

class Stax {
  public static function error<T>(msg: String): T { return errorT(msg)(); }
  
  public static function errorT<T>(msg: String): Thunk<T> { 
    return function() {
      throw msg; return null;
    }
  }
}
