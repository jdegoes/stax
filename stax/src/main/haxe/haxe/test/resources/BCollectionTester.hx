import test.TestCase.hx;
import test.testRunner.hx;

public class CollectionTester {
  
}

public class BCollectionTester {
	public static function main():Void {
		var tr = new haxe.test.TestRunner();
	    
	    var tester1 = new CollectionTester();
	    
	    tr.add(tester1);
	    
	    tr.run();
	    
	}
}