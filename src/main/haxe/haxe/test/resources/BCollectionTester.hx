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
    
    assertEquals(Std.string(i.tail()), '[2,3,4,5]');
  }
  
  public function testThatItXTakeWorks(): Void {
    var i: Iterable<Int> = [1, 2, 3, 4, 5];
    
    assertEquals(Std.string(i.take(3)), '[1,2,3]');
    
    var i = [1];
    
    assertEquals(Std.string(i.take(3)), '[1]');
    
    var i = [];
    
    assertEquals(Std.string(i.take(3)), '[]');
  }
  
  public function testThatItXDropWorks(): Void {
    var i: Iterable<Int> = [1, 2, 3, 4, 5];
    
    assertEquals('[4,5]', Std.string(i.drop(3)));
    
    var i = [1];
    
    assertEquals(Std.string(i.drop(3)), '[]');
  }
  
  public function testThatItXExistsWorks(): Void {
    var i: Iterable<Int> = [1, 2, 3, 4, 5];
    
    assertTrue(i.exists(function(a, b) {return a == b;}, 2));
    
    assertFalse(i.exists(function(a,b) {return a < b;}, 1));
  }
  
  public function testThatItXNubWorks(): Void {
    var a: Iterable<Int> = [1, 2, 3, 4, 5, 4, 3, 2, 1, 5, 6, 7, 8, 6, 5, 4, 3, 2];

    assertEquals(8, a.nub().size());
  }
  
  public function testThatItXAtWorks(): Void {
    var a: Iterable<Int> = [1, 2, 3, 4, 5, 4, 3, 2, 1, 5, 6, 7, 8, 6, 5, 4, 3, 2];
    
    assertEquals(6, a.at(10));
    
    assertEquals(5, a.at(-4));
  }
  
  public function testThatItXMapWorks(): Void {
    var a: Iterable<Int> = [6, 5, 4, 3, 2];
    
    assertEquals('[12,10,8,6,4]', Std.string(a.map(function(a) { return a * 2; })));
  }
  
  public function testThatItXScanlWorks(): Void {
    var a: Iterable<Int> = [6, 5, 4, 3, 2];
    
    assertEquals('[1,7,6,5,4,3]', Std.string(a.scanl(1, function(a, b) { return a + b; })));
  }
  
  public function testThatItXScanl1Works(): Void {
    var a: Iterable<Int> = [6, 5, 4, 3, 2];
    
    assertEquals('[6,11,10,9,8]', Std.string(a.scanl1(function(a, b) { return a + b; })));
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