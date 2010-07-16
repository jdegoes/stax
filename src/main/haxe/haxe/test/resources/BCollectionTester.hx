package haxe.test.resources;

import haxe.test.TestCase;
import haxe.test.TestRunner;
import haxe.reactive.BehaviorCollection;

using haxe.data.collections.IterableExtensions;

class CollectionTester extends TestCase {
  
  public function new():Void {
      super();
  }
  
  public function testThatTraceWorks(): Void {
    trace("Trace is working");
    assertTrue(true);
  }
  
  public function testThatItXFoldlWorks(): Void {
    var i: Iterable<Int> = [1, 2, 3, 4, 5];
    
    var result = i.foldl(0, function(a, b) {return a + b;});
    
    assertEquals(result, 15);
  }
  
  public function testThatItXFoldrWorks(): Void {
    var i: Iterable<Int> = [1, 2, 3, 4, 5];
    
    var result = i.foldr(0, function(a, b) {return a + b;});
    
    assertEquals(result, 15);
  }
  
  public function testThatItXReversedWorks(): Void {
    var i: Iterable<Int> = [1, 2, 3, 4, 5];
    
    assertEquals(Std.string(i.reversed()), '[5,4,3,2,1]');
  }
  
  public function testThatItXHeadWorks(): Void {
    var i: Iterable<Int> = [1, 2, 3, 4, 5];
    
    assertEquals(i.head(), 1);
  }
  
  public function testThatItXAppendWorks(): Void {
    var i: Iterable<Int> = [1, 2, 3, 4, 5];
    
    assertEquals(Std.string(i.append(2)), '[1,2,3,4,5,2]');
  }
  
  public function testThatItXTailWorks(): Void {
    var i: Iterable<Int> = [1, 2, 3, 4, 5];
    var t: Iterable<Int> = [];
    trace(t.foldl(2, function(a, b) {return [b].push(a); }));
    trace(i.tailOption());
    assertEquals(Std.string(i.tail()), '[2,3,4,5]');
  }
  
}

class BCollectionTester {
	public static function main():Void {
		var tr = new haxe.test.TestRunner();
	    
	    var tester1 = new CollectionTester();
	    
	    tr.add(tester1);
	    
	    tr.run();
	    
	}
}