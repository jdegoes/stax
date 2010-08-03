/*
 HaXe library written by John A. De Goes <john@socialmedia.com>

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

//using haxe.abstract.FoldableExtensions;
using PreludeExtensions;

class IterableExtensions {
	public static function size<T>(iterable: Iterable<T>): Int {
	  var size = 0;
	  
	  for (e in iterable) ++size;
	  
	  return size;
	}
	
	public static function filter<T>(iter: Iterable<T>, f: T -> Bool): Iterable<T> {
	  return foldl(iter, cast [], function(a: Iterable<T>, b: T): Iterable<T> {
	    return if (f(b)) append(a, b); else a;
	  });
	}
	
	public static function foldl<T, Z>(iter: Iterable<T>, seed: Z, mapper: Z -> T -> Z): Z {
    var folded = seed;
    
    for (e in iter) { folded = mapper(folded, e); }
    
    return folded;
  }
  
  public static function concat<T, Z>(iter1: Iterable<T>, iter2: Iterable<T>): Iterable<Iterable<T>> {
    var result = [];
    
    result.push(iter1);
    result.push(iter2);
    
    return result;
  }
  
  public static function foldr<T, Z>(iterable: Iterable<T>, z: Z, f: T -> Z -> Z): Z {
    var r = z;
    
    var a = iterable.toArray();
    
    for (i in 0...a.length) { 
      var e = a[a.length - 1 - i];
      
      r = f(e, r);
    }
    
    return r;
  }
  
  public static function headOption<T>(iter: Iterable<T>): Option<T> {
    var iterator = iter.iterator();
    
    if (iterator.hasNext()) {
      for (e in iter) return Some(e);
    }
    
    return None;
  }
  
  public static function head<T>(iter: Iterable<T>): T {
    return switch(headOption(iter)) {
      case None: Stax.error('Iterable has no head');
      
      case Some(h): h;
    }
  }
  
  public static function tailOption<T>(iter: Iterable<T>): Option<Iterable<T>> {
    var iterator = iter.iterator();
    
    return if (!iterator.hasNext()) None;
           else Some(drop(iter, 1));
  }
  
  public static function drop<T>(iter: Iterable<T>, n: Int): Iterable<T> {
    var iterator = iter.iterator();
    
    while (iterator.hasNext() && n > 0) {
      iterator.next();
      --n;
    }
    
    var result = [];
    
    while (iterator.hasNext()) result.push(iterator.next());
    
    return result;
  }
  
  public static function take<T>(iter: Iterable<T>, n: Int): Iterable<T> {
    var iterator = iter.iterator();
    var result = [];
    
    for (i in 0...(n)) {
      if (iterator.hasNext()) { result.push(iterator.next()); };
    }
    
    return result;
  }
  
  
  public static function tail<T>(iter: Iterable<T>): Iterable<T> {
    return switch (tailOption(iter)) {
      case None: Stax.error('Iterable has no tail');
      
      case Some(t): t;
    }
  }
  
  public static function exists<T>(iter: Iterable<T>, cmp: T -> T -> Bool, value: T): Bool {
    var iterator = iter.iterator();
    
    while (iterator.hasNext()) {
      var element = iterator.next();
      
      if (cmp(element, value)) { return true; };
    }
    
    return false;
  }
  
  public static function nub<T>(iter: Iterable<T>): Iterable<T> {
    var result = [];
    
    var iterator = iter.iterator();
    
    while (iterator.hasNext()) {
      var element = iterator.next();
      
      if (!exists(result, function(a, b) { return a == b; }, element)) { result.push(element); };
    }
    
    return result;
  }
  
  public static function at<T>(iter: Iterable<T>, index: Int): T {
    var result: T = null;
    
    if (index < 0) index = size(iter) - (-1 * index);
    
    var curIndex  = 0;
    for (e in iter) {
      if (index == curIndex) {
        return e;
      }
      else ++curIndex;
    }
    return Stax.error('Index not found');
  }
  
  public static function map<T, Z>(iter: Iterable<T>, f: T -> Z): Iterable<Z> {
    return foldl(iter, [], function(a, b) {
      a.push(f(b));
      
      return a;
    });
  }
  
  public static function flatMap<T, Z>(iter: Iterable<T>, f: T -> Iterable<Z>): Iterable<Z> {
    return foldl(iter, [], function(a, b) {
      for (e in f(b)) a.push(e);
      
      return a;
    });
  }
  
  public static function zip<T1, T2>(iter1: Iterable<T1>, iter2: Iterable<T2>): Iterable<Tuple2<T1, T2>> {
    var i1 = iter1.iterator();
    var i2 = iter2.iterator();
    
    var result = [];
    
    while (i1.hasNext() && i2.hasNext()) {
      var t1 = i1.next();
      var t2 = i2.next();
      
      result.push(t1.entuple(t2));
    }
    
    return result;
  }
  
  public static function append<T>(iter: Iterable<T>, e: T): Iterable<T> {
    return foldr(iter, [e], function(a, b) {
      b.unshift(a);
      
      return b;
    });
  }
  
  public static function cons<T>(iter: Iterable<T>, e: T): Iterable<T> {
    return foldl(iter, [e], function(b, a) {
      b.push(a);
      
      return b;
    });
  }
  
  public static function toArray<T>(i: Iterable<T>) {
    var a = [];
    
    for (e in i) a.push(e);
    
    return a;
  }
	
	public static function reversed<T>(iter: Iterable<T>): Iterable<T> {
	  return foldl(iter, [], function(a, b) {
      a.unshift(b);
      
      return a;
	  });
	}
	
	public static function and<T>(iter: Iterable<Bool>): Bool {
	  var iterator = iter.iterator();
	  
	  while (iterator.hasNext()) {
	    var element = iterator.next();
	    if (element == false) { return false; }; 
	  }
	  return true;
	}
	
	public static function or<T>(iter: Iterable<Bool>): Bool {
	  var iterator = iter.iterator();
	  
	  while (iterator.hasNext()) {
	    if (iterator.next() == true) { return true; }; 
	  }
	  return false;
	}
	
	public static function scanl<T>(iter:Iterable<T>, init: T, f: T -> T -> T): Iterable<T> {
	  var accum = init;
	  var result = [init];
	  
	  for (e in iter) {
	    result.push(f(e, accum));
	  }
	  
	  return result;
	}
	
	public static function scanr<T>(iter:Iterable<T>, init: T, f: T -> T -> T): Iterable<T> {
	  var accum = init;
	  var result = [init];
	  
	  for (e in reversed(iter)) {
	    result.push(f(e, accum));
	  }
	  
	  return result;
	}
	
	public static function scanl1<T>(iter:Iterable<T>, f: T -> T -> T): Iterable<T> {
    var iterator = iter.iterator();
    var accum = null;
    var result = [];
    
    while (iterator.hasNext()) {
      if (result[0] == null) {
        
        var first = iterator.next(); 
        result.push(first); 
        accum = first;
      }
      else result.push(f(iterator.next(), accum));
    }
    
	  return cast result;
	}
	
	public static function scanr1<T>(iter:Iterable<T>, f: T -> T -> T): Iterable<T> {
	  var iterator = reversed(iter).iterator();
	  var init = iterator.next(); 
	  
	  var accum = init;
	  var result = [init];
	  
	  while (iterator.hasNext()) {
	    result.push(f(iterator.next(), accum));
	  }
	  
	  return result;
	}
	
	public static function existsP<T>(iter:Iterable<T>, ref: T, f: T -> T -> Bool): Bool {
	  var result:Bool = false;
	  
	  for (e in iter) {
	    if (f(ref, e)) result = true;
	  }
	  
	  return result;
	}

	public static function nubBy<T>(iter:Iterable<T>, f: T -> T -> Bool): Iterable<T> {
	  return foldl(iter, [], function(a, b) {
	    return if(existsP(a, b, f)) {
	      a;
	    }
	    else {
	      a.push(b);
	      a;
	    }
	  });
	}
	
	public static function intersectBy<T>(iter1: Iterable<T>, iter2: Iterable<T>, f: T -> T -> Bool): Iterable<T> {
	  return foldl(iter1, cast [], function(a: Iterable<T>, b: T): Iterable<T> {
	    return if (existsP(iter2, b, f)) append(a, b); else a;
	  });
	}
	
	public static function intersect<T>(iter1: Iterable<T>, iter2: Iterable<T>): Iterable<T> {
	  return foldl(iter1, cast [], function(a: Iterable<T>, b: T): Iterable<T> {
	    return if (existsP(iter2, b, function(a, b) { return a == b; })) append(a, b); else a;
	  });
	}
	
	public static function unionBy<T>(iter1: Iterable<T>, iter2: Iterable<T>, f: T -> T -> Bool): Iterable<T> {
	  return foldl(iter2, iter1, function(a, b) {
	    return if (existsP(a, b, f)) a; else append(a, b);
	  });
	}

}