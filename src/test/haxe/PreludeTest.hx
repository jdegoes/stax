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

import haxe.test.TestCase;

using PreludeExtensions;

class PreludeTestCase extends TestCase {
  public function new() {
    super();
  }
  
  public function testCompose() {
    var f1 = function(i) { return i * 2; }
    var f2 = function(i) { return i - 1; }
    
    assertEquals(2, f1.compose(f2)(2));
  }
  
  public function testCurry2() {
    var f = function(i1, i2, i3) { return i1 + i2 + i3; }
    
    assertEquals(3, f.curry()(2)(-2)(3));
  }
  
  public function testFutureChaining() {
    var f1: Future<Int> = Future.create();
    
    var f2 = f1.map(function(i) { return Std.string(i); }).flatMap(function(s): Future<Bool> { return Future.create().deliver(s.length < 2); });
    
    f1.deliver(9);
    
    assertEquals(true, f2.value().get());
  }           

  public function testOrderForInt() {
    var order = Stax.getOrderFor(1);
    assertTrue(order(2, 1)  > 0);
    assertTrue(order(1, 2)  < 0);
    assertTrue(order(1, 1) == 0);
  }

  public function testOrderForFloat() {
    var order = Stax.getOrderFor(1.0);
    assertTrue(order(1.2, 1.1)  > 0);
    assertTrue(order(1.1, 1.2)  < 0);
    assertTrue(order(0.1, 0.1) == 0);
  }

  public function testOrderForBool() {
    var order = Stax.getOrderFor(true);
    assertTrue(order(true,  false)  > 0);
    assertTrue(order(false, true)   < 0);
    assertTrue(order(true,  true)  == 0);
    assertTrue(order(false, false) == 0);
  }

  public function testOrderForNull() {   
    var order = Stax.getOrderFor(null);
    assertTrue(order("s", null)   > 0);
    assertTrue(order(null, "s")   < 0);
    assertTrue(order(null, null) == 0);
  }  

  public function testOrderForString() {
    var order = Stax.getOrderFor("s");
    assertTrue(order("b", "a")  > 0);
    assertTrue(order("a", "b")  < 0);
    assertTrue(order("a", null) > 0);
    assertTrue(order(null, "a") < 0);
    assertTrue(order("a", "a") == 0);
  }             

  public function testOrderForDate() {
    var a = Date.fromString("1999-12-31");
    var b = Date.fromString("2000-01-01");  
    var c = Date.fromString("1999-12-31");
    var order = Stax.getOrderFor(b);
    assertTrue(order(b, a)    > 0);
    assertTrue(order(a, b)    < 0); 
    assertTrue(order(a, null) > 0);
    assertTrue(order(null, a) < 0);
    assertTrue(order(a, c)   == 0);
  }   

  public function testOrderForArray() {
    var a1 = [1,2,3];
    var a2 = [4];
    var a3 = [2,2,3];
    var a4 = [4]; 
    var order = Stax.getOrderFor(a1);
    assertTrue(order(a1, a2)  > 0);
    assertTrue(order(a3, a1)  > 0); 
    assertTrue(order(a2, a1)  < 0);
    assertTrue(order(a1, a3)  < 0);  
    assertTrue(order(a2, a4) == 0); 
    assertTrue(order([], []) == 0);
  }

  public function testOrderForComparableClass() {   
    var c1 = new Comparable(1);
    var c2 = new Comparable(2);  
    var c3 = new Comparable(1);
    var order = Stax.getOrderFor(c1);
    assertTrue(order(c2, c1)  > 0);
    assertTrue(order(c1, c2)  < 0);
    assertTrue(order(c1, c3) == 0);
  } 

  public function testOrderForNotComparableClass() {                 
    this.assertThrowsException(function() Stax.getOrderFor(new Hash()));
  } 

  public function testOrderForFunction() {                 
    this.assertThrowsException(function() Stax.getOrderFor(function() trace("hello world")));
  }  

  public function testTupleOrder() {    
    var tests = [
     Tuple2.create(Tuple2.create("b",0), Tuple2.create("a",0)),
     Tuple2.create(Tuple2.create("a",1), Tuple2.create("a",0)), 
     Tuple2.create(Tuple3.create("a",0,0.1), Tuple3.create("a",0,0.05)),
     Tuple2.create(Tuple4.create("a",0,0.1,"b"), Tuple4.create("a",0,0.1,"a")),
     Tuple2.create(Tuple5.create("a",0,0.1,"a",1), Tuple5.create("a",0,0.1,"a",0)), 
    ];
  
    for(test in tests) {
      assertTrue(Stax.getOrderFor(test._1)(test._1, test._2) > 0, "failed to compare " + test._1 + " to " + test._2);
      assertTrue(test._1.compare(test._2) > 0, "failed to compare " + test._1 + " to " + test._2);  
    }
  }

  public function testTupleEqual() {    
    var tests = [
      Tuple2.create(Tuple2.create("b",0), Tuple2.create("b",0)),
      Tuple2.create(Tuple2.create("a",1), Tuple2.create("a",1)), 
      Tuple2.create(Tuple3.create("a",0,0.1), Tuple3.create("a",0,0.1)),
      Tuple2.create(Tuple4.create("a",0,0.1,"b"), Tuple4.create("a",0,0.1,"b")),
      Tuple2.create(Tuple5.create("a",0,0.1,"a",1), Tuple5.create("a",0,0.1,"a",1)), 
    ];
    
    for(test in tests) {
      assertTrue(Stax.getEqualFor(test._1)(test._1, test._2));
      assertTrue(test._1.equals(test._2)); 
    } 
  }

  public function testTupleString() {    
    var tests = [
      Tuple2.create(Tuple2.create("b",0), "Tuple2(b, 0)"),
      Tuple2.create(Tuple2.create("a",1), "Tuple2(a, 1)"), 
      Tuple2.create(Tuple3.create("a",0,0.1), "Tuple3(a, 0, 0.1)"),
      Tuple2.create(Tuple4.create("a",0,0.1,"b"), "Tuple4(a, 0, 0.1, b)"),
      Tuple2.create(Tuple5.create("a",0,0.1,"a",1), "Tuple5(a, 0, 0.1, a, 1)"), 
    ];
    
    for(test in tests) {
      assertEquals(test._2, Stax.getShowFor(test._1)(test._1));
      assertEquals(test._2, test._1.toString());       
    }
  }    

  public function testTupleHashCode() {    
    var tests = [
      Stax.getHasherFor(Tuple2.create("b",0)),
      Stax.getHasherFor(Tuple2.create("a",1)), 
      Stax.getHasherFor(Tuple3.create("a",0,0.1)),
      Stax.getHasherFor(Tuple4.create("a",0,0.1,"b")),
      Stax.getHasherFor(Tuple5.create("a",0,0.1,"a",1)), 
    ];
   
    while(tests.length > 0)
    {
      var value = tests.pop();
      // check is unique        
        assertFalse(tests.remove(value), "value is not unique hash: " + value);
      
      // check is different from zero
      assertNotEquals(0, value);
    } 
  }

  public function testOrderForEnum() { 
    var o1 = None;
    var o2 = Some("a");
    var o3 = Some("b"); 
    var o4 = Some("a");
    var order = Stax.getOrderFor(o1);
    assertTrue(order(o2, o1)  > 0);
    assertTrue(order(o3, o1)  > 0);
    assertTrue(order(o3, o2)  > 0);
    assertTrue(order(o1, o2)  < 0);
    assertTrue(order(o1, o3)  < 0);
    assertTrue(order(o2, o3)  < 0); 
    assertTrue(order(o1, o1) == 0);
    assertTrue(order(o2, o4) == 0);
  }    

  public function testOrderForAnonymousTyped() {
    var o1 = { name : "haxe"};                      
    var o2 = { name : "stax"};
    var o3 = { name : "haxe"};
    var order = Stax.getOrderFor(o1);
    assertTrue(order(o2, o1)      > 0);
    assertTrue(order(o1, o2)      < 0);
    assertTrue(order(o1, o3)     == 0); 
    assertTrue(order(o1, null)    > 0);
    assertTrue(order(null, o1)    < 0);
    assertTrue(order(null, null) == 0);
  }       

  public function testEqualForInt() {
    var equal = Stax.getEqualFor(1);
    assertFalse(equal(2, 1));
    assertFalse(equal(1, 2));
    assertTrue(equal(1, 1));
  }

  public function testEqualForFloat() {
    var equal = Stax.getEqualFor(1.0);
    assertFalse(equal(1.2, 1.1));
    assertFalse(equal(1.1, 1.2));
    assertTrue(equal(0.1, 0.1));
  }

  public function testEqualForBool() {
    var equal = Stax.getEqualFor(true);
    assertFalse(equal(true,  false));
    assertFalse(equal(false, true));
    assertTrue(equal(true,  true));
    assertTrue(equal(false, false));
  }

  public function testEqualForNull() {   
    var equal = Stax.getEqualFor(null);
    assertFalse(equal("s", null));
    assertFalse(equal(null, "s"));
    assertTrue(equal(null, null));
  }  

  public function testEqualForString() {
    var equal = Stax.getEqualFor("s");
    assertFalse(equal("b", "a"));
    assertFalse(equal("a", "b"));
  assertFalse(equal("a", null));
    assertFalse(equal(null, "a"));
    assertTrue(equal("a", "a"));
  }             

  public function testEqualForDate() {
    var a = Date.fromString("1999-12-31");
    var b = Date.fromString("2000-01-01");  
    var c = Date.fromString("1999-12-31");
    var equal = Stax.getEqualFor(b);
    assertFalse(equal(b, a));
    assertFalse(equal(a, b)); 
    assertFalse(equal(a, null));
    assertFalse(equal(null, a));
    assertTrue(equal(a, c));
  }    

  public function testEqualForArray() {
    var a1 = [1,2,3];
    var a2 = [4,5];
    var a3 = [4,5];
    var equal = Stax.getEqualFor(a1);
    assertFalse(equal(a1, a2));
    assertTrue(equal(a2, a3)); 
    assertTrue(equal([], [])); 
  }

  public function testEqualForClassWithEquals() {   
    var c1 = new HasEquals(1);
    var c2 = new HasEquals(2);  
    var c3 = new HasEquals(1);
    var equal = Stax.getEqualFor(c1);
    assertFalse(equal(c2, c1));
    assertFalse(equal(c1, c2));
    assertTrue(equal(c1, c3));
  }

  public function testEqualForComparableClass() {   
    var c1 = new Comparable(1);
    var c2 = new Comparable(2);  
    var c3 = new Comparable(1);
    var equal = Stax.getEqualFor(c1);
    assertFalse(equal(c2, c1));
    assertFalse(equal(c1, c2));
    assertTrue(equal(c1, c3));
  } 

  public function testEqualForNotClassWithoutEquals() {                 
    this.assertThrowsException(function() Stax.getEqualFor(new TestCase()));
  } 

  public function testEqualForEnum() { 
    var o1 = None;
    var o2 = Some("a");
    var o3 = Some("b"); 
    var o4 = Some("a");
    var equal = Stax.getEqualFor(o1);
    assertFalse(equal(o2, o1));
    assertFalse(equal(o3, o1));
    assertFalse(equal(o3, o2));
    assertFalse(equal(o1, o2));
    assertFalse(equal(o1, o3));
    assertFalse(equal(o2, o3)); 
    assertTrue(equal(o1, o1));
    assertTrue(equal(o2, o4));
  }    

  public function testEqualForAnonymousTyped() {
    var o1 = { name : "haxe"};                      
    var o2 = { name : "stax"};
    var o3 = { name : "haxe"};
    var equal = Stax.getEqualFor(o1);
    assertFalse(equal(o2, o1));
    assertFalse(equal(o1, o2));
    assertTrue(equal(o1, o3)); 
    assertFalse(equal(o1, null));
    assertFalse(equal(null, o1));
    assertTrue(equal(null, null));
  }             

  public function testEqualForMethods() {
    var equal = Stax.getEqualFor(testEqualForMethods);
    assertFalse(equal(testEqualForMethods, testEqualForAnonymousTyped));
    assertTrue(equal(testEqualForMethods, testEqualForMethods));
  }  
                     
  static function getShow<T>(v : T) return Stax.getShowFor(v)(v)
  
  public function testShowFor() {         
    assertEquals("null",  getShow(null));
    assertEquals("true",  getShow(true));
    assertEquals("false", getShow(false));
    assertEquals("a",     getShow("a")); 
    assertEquals("1",  getShow(1));
    assertEquals("0.123",  getShow(0.123)); 
    assertEquals("{name:stax}",  getShow({ name : "stax" })); 
    assertEquals("[[1, 2], [3, 4]]", getShow([[1,2],[3,4]]));
    assertEquals("PreludeTest", getShow(this));
    assertEquals("_PreludeTest.HasEquals", getShow(new HasEquals(1)));
    assertEquals("<function>", getShow(function() trace("")));
    assertEquals("None", getShow(None));
    assertEquals("Some(Some(value))", getShow(Some(Some("value"))));
  } 

  public function testHasher() {
    assertHashCodeForIsZero(null);
    assertHashCodeForIsZero(0);
       
    assertHashCodeForIsNotZero(true);
    assertHashCodeForIsNotZero(false);
    assertHashCodeForIsNotZero("");
    assertHashCodeForIsNotZero("a");
    assertHashCodeForIsNotZero(1);
    assertHashCodeForIsNotZero(0.1);
    assertHashCodeForIsNotZero([]);
    assertHashCodeForIsNotZero([1]);
    assertHashCodeForIsNotZero({});
    assertHashCodeForIsNotZero({n:"a"});
    assertHashCodeForIsNotZero(new HasHasher(1));
    assertHashCodeForIsNotZero(Date.fromString("2000-01-01"));       
    assertHashCodeForIsNotZero(None);
    assertHashCodeForIsNotZero(Some("a"));
  }

  public function assertHashCodeForIsZero<T>(v : T) {
    assertEquals(0, Stax.getHasherFor(v)(v));
  }

  public function assertHashCodeForIsNotZero<T>(v : T) {
    assertNotEquals(0, Stax.getHasherFor(v)(v));
  }

  public function toString() return "PreludeTest"
}
   
private class HasEquals
{                               
  var v : Int;
  public function new(v : Int) this.v = v
  public function equals(other : HasEquals) return v == other.v
}

private class Comparable
{                               
  var v : Int;
  public function new(v : Int) this.v = v
  public function compare(other : Comparable) return v == other.v ? 0 : (v > other.v ? 1 : -1)
}             

private class HasHasher
{
  var v : Int;
  public function new(v : Int) this.v = v
  public function hashCode() return v
}