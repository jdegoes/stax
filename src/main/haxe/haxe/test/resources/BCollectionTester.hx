package haxe.test.resources;

import haxe.test.TestCase;
import haxe.test.TestRunner;
import haxe.reactive.BehaviorCollection;

class CollectionTester extends TestCase {
  
  public function new():Void {
      super();
  }
  
  public function testThatTraceWorks(): Void {
    trace("Trace is working");
    assertTrue(true);
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