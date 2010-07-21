package resources;

import haxe.test.TestCase;
import haxe.test.Runner;
import haxe.test.ui.Report;

import haxe.reactive.SignalCollection;
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
    
    assertIterableEquals(i.reversed(), [5,4,3,2,1]);
  }
  
  public function testThatItXHeadWorks(): Void {
    var i: Iterable<Int> = [1, 2, 3, 4, 5];
    
    assertEquals(i.head(), 1);
  }
  
  public function testThatItXAppendWorks(): Void {
    var i: Iterable<Int> = [1, 2, 3, 4, 5];
    
    assertIterableEquals(i.append(2), [1,2,3,4,5,2]);
  }
  
  public function testThatItXTailWorks(): Void {
    var i: Iterable<Int> = [1, 2, 3, 4, 5];
    
    assertIterableEquals(i.tail(), [2,3,4,5]);
  }
  
  public function testThatItXTakeWorks(): Void {
    var i: Iterable<Int> = [1, 2, 3, 4, 5];
    
    assertIterableEquals(i.take(3), [1,2,3]);
    
    var i = [1];
    
    assertEquals(Std.string(i.take(3)), '[1]');
    
    var i = [];
    
    assertIterableEquals(i.take(3), []);
  }
  
  public function testThatItXDropWorks(): Void {
    var i: Iterable<Int> = [1, 2, 3, 4, 5];
    
    assertIterableEquals([4,5], i.drop(3));
    
    var i = [1];
    
    assertIterableEquals(i.drop(3), []);
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
    
    assertIterableEquals([12,10,8,6,4], a.map(function(a) { return a * 2; }));
  }
  
  public function testThatItXScanlWorks(): Void {
    var a: Iterable<Int> = [6, 5, 4, 3, 2];
    
    assertIterableEquals([1,7,6,5,4,3], a.scanl(1, function(a, b) { return a + b; }));
  }
  
  public function testThatItXScanl1Works(): Void {
    var a: Iterable<Int> = [6, 5, 4, 3, 2];
    
    assertIterableEquals([6,11,10,9,8], a.scanl1(function(a, b) { return a + b; }));
  }
  
  public function testThatItXScanrWorks(): Void {
    var a: Iterable<Int> = [6, 5, 4, 3, 2];
    
    assertIterableEquals([1,3,4,5,6,7], a.scanr(1, function(a, b) { return a + b; }));
  }
  
  public function testThatItXScanr1Works(): Void {
    var a: Iterable<Int> = [6, 5, 4, 3, 2];
    
    assertIterableEquals([2,5,6,7,8], a.scanr1(function(a, b) { return a + b; }));
  }
  
  public function testThatItXExistsPWorks(): Void {
    var a: Iterable<Int> = [6, 5, 4, 3, 2];
    
    assertEquals(true, a.existsP(2, function(a, b) { return a == b; }));
  }
  
  public function testThatItXNubByWorks(): Void {
    var a: Iterable<Int> = [6, 5, 4, 5, 1, 3, 2, 5, 4, 1];
    
    assertIterableEquals([6,5,4,1,3,2], a.nubBy(function(a, b) { return a == b; }));
  }
  
  public function testThatItXFilterWorks(): Void {
    var a: Iterable<Int> = [6, 5, 4, 5, 1, 3, 2, 5, 4, 1];
    
    assertIterableEquals([6,5,4,5,5,4], a.filter(function(a) { return a > 3; }));
  }
  
  public function testThatItXIntersectByWorks(): Void {
    var a: Iterable<Int> = [1,2,3,4];
    var b: Iterable<Int> = [4,8,12,16,20];
    
    assertIterableEquals([2,4], a.intersectBy(b, function(a, b) { return a * a == b; }));
  }
  
  public function testThatItXIntersectWorks(): Void {
    var a: Iterable<Int> = [1, 2, 2, 3, 4];
    var b: Iterable<Int> = [6, 4, 4, 2];
    
    assertIterableEquals([2,2,4], a.intersect(b));
  }
  /*
  public function testThatItXUnionByWorks(): Void {
    var a: Iterable<Int> = [1,2,3,4];
    var b: Iterable<Int> = [4,6,9,10];
    trace(a.unionBy(b, function(a, b) { return a == b; }));
    assertIterableEquals([1,2,3,4,4,10], a.unionBy(b, function(a, b) { return a * 3 == b; }));
  }
  */
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  private function assertIterableEquals<T>(i1: Iterable<T>, i2: Iterable<T>): Void {
    var size1 = i1.size();
    var size2 = i2.size();
    
    if (size1 != size2) {
      trace("Iterable Sizes Not Equal.  Iterable 1 length = " + size1 + " and Iterable 2 length =  " + size2);
      assertTrue(false);
    }
    
    var iterator1 = i1.iterator();
    var iterator2 = i2.iterator();
    var index = 0;
    
    while (iterator1.hasNext()) {
      var e1 = iterator1.next();
      var e2 = iterator2.next();
      
      if (e1 != e2) {
        trace("Iterables not equal at index [" + index + "].  Element 1 = " + e1 + " and Element 2 = " + e2);
        assertTrue(false);
      }
      ++index;
    }
    assertTrue(true);
  }
}

class BCollectionTester {
  public static function main (): Void {
    var runner = (new Runner()).addAll([
      new CollectionTester()
    ]);
    
    Report.create(runner);
    
    runner.run();
  }
}
