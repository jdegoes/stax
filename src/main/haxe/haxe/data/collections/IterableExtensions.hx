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

using Prelude;

class IterableExtensions {
	public static function size<T>(iterable: Iterable<T>): Int {
	  var size = 0;
	  
	  for (e in iterable) ++size;
	  
	  return size;
	}
	
	public static function foldl<T, Z>(iter: Iterable<T>, itInit: Z, mapper: Z -> T -> Z): Z {
    var init = itInit;
    
    for (e in iter) { init = mapper(init, e); }
    
    return init;
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
      
      if (exists(result, function(a, b) { return a == b; }, element)) { result.push(element); };
    }
    
    return result;
  }
  
  public static function at<T>(iter: Iterable<T>, index: Int): T {
    var result: T = null;
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
}

class ArrayExtensions {
  public static function snapshot<T>(a: Array<T>): Array<T> {
    var array:Array<T> = a;
    
    return array;
  }
}