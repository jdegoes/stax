$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof haxe=='undefined') haxe = {}
if(!haxe.test) haxe.test = {}
haxe.test.TestCase = function(p) { if( p === $_ ) return; {
	null;
}}
haxe.test.TestCase.__name__ = ["haxe","test","TestCase"];
haxe.test.TestCase.prototype.after = function() {
	null;
}
haxe.test.TestCase.prototype.afterAll = function() {
	null;
}
haxe.test.TestCase.prototype.assertCanceled = function(future,assertions,timeout) {
	return haxe.test.Assert.canceled(future,assertions,timeout);
}
haxe.test.TestCase.prototype.assertContains = function(values,match,msg,pos) {
	haxe.test.Assert.contains(values,match,msg,pos);
}
haxe.test.TestCase.prototype.assertDelivered = function(future,assertions,timeout) {
	return haxe.test.Assert.delivered(future,assertions,timeout);
}
haxe.test.TestCase.prototype.assertEquals = function(expected,value,equal,msg,pos) {
	if(equal != null) {
		haxe.test.Assert.isTrue(equal(expected,value),((msg != null?msg:(("expected " + expected) + " but found ") + value)),pos);
	}
	else {
		haxe.test.Assert.equals(expected,value,null,msg,pos);
	}
}
haxe.test.TestCase.prototype.assertEqualsOneOf = function(value,possibilities,msg,pos) {
	haxe.test.Assert.equalsOneOf(value,possibilities,msg,pos);
}
haxe.test.TestCase.prototype.assertFalse = function(value,msg,pos) {
	haxe.test.Assert.isFalse(value,msg,pos);
}
haxe.test.TestCase.prototype.assertFloatEquals = function(expected,value,approx,msg,pos) {
	haxe.test.Assert.floatEquals(expected,value,approx,msg,pos);
}
haxe.test.TestCase.prototype.assertIs = function(value,type,msg,pos) {
	haxe.test.Assert["is"](value,type,msg,pos);
}
haxe.test.TestCase.prototype.assertLooksLike = function(expected,value,recursive,msg,pos) {
	haxe.test.Assert.looksLike(expected,value,recursive,msg,pos);
}
haxe.test.TestCase.prototype.assertMatches = function(pattern,value,msg,pos) {
	haxe.test.Assert.matches(pattern,value,msg,pos);
}
haxe.test.TestCase.prototype.assertNotContains = function(values,match,msg,pos) {
	haxe.test.Assert.notContains(values,match,msg,pos);
}
haxe.test.TestCase.prototype.assertNotDelivered = function(future,timeout,pos) {
	return haxe.test.Assert.notDelivered(future,timeout,pos);
}
haxe.test.TestCase.prototype.assertNotEquals = function(expected,value,msg,pos) {
	haxe.test.Assert.notEquals(expected,value,msg,pos);
}
haxe.test.TestCase.prototype.assertNotNull = function(value,msg,pos) {
	haxe.test.Assert.notNull(value,msg,pos);
}
haxe.test.TestCase.prototype.assertNull = function(value,msg,pos) {
	haxe.test.Assert.isNull(value,msg,pos);
}
haxe.test.TestCase.prototype.assertStringContains = function(match,value,msg,pos) {
	haxe.test.Assert.stringContains(match,value,msg,pos);
}
haxe.test.TestCase.prototype.assertStringSequence = function(sequence,value,msg,pos) {
	haxe.test.Assert.stringSequence(sequence,value,msg,pos);
}
haxe.test.TestCase.prototype.assertThat = function(obj,cond,msg,pos) {
	haxe.test.Assert.that(obj,cond,msg,pos);
}
haxe.test.TestCase.prototype.assertThrowsException = function(method,type,msg,pos) {
	haxe.test.Assert.throwsException(method,type,msg,pos);
}
haxe.test.TestCase.prototype.assertTrue = function(cond,msg,pos) {
	haxe.test.Assert.isTrue(cond,msg,pos);
}
haxe.test.TestCase.prototype.before = function() {
	null;
}
haxe.test.TestCase.prototype.beforeAll = function() {
	null;
}
haxe.test.TestCase.prototype.fail = function(msg,pos) {
	if(msg == null) msg = "failure expected";
	haxe.test.Assert.fail(msg,pos);
}
haxe.test.TestCase.prototype.not = function(c) {
	return haxe.test.MustMatcherExtensions.negate(c);
}
haxe.test.TestCase.prototype.warn = function(msg) {
	haxe.test.Assert.warn(msg);
}
haxe.test.TestCase.prototype.__class__ = haxe.test.TestCase;
PreludeTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
PreludeTestCase.__name__ = ["PreludeTestCase"];
PreludeTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) PreludeTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
PreludeTestCase.getShow = function(v) {
	return (Stax.getShowFor(v))(v);
}
PreludeTestCase.prototype.assertHashCodeForIsNotZero = function(v) {
	this.assertNotEquals(0,(Stax.getHashFor(v))(v),null,{ fileName : "PreludeTest.hx", lineNumber : 411, className : "PreludeTestCase", methodName : "assertHashCodeForIsNotZero"});
}
PreludeTestCase.prototype.assertHashCodeForIsZero = function(v) {
	this.assertEquals(0,(Stax.getHashFor(v))(v),null,null,{ fileName : "PreludeTest.hx", lineNumber : 407, className : "PreludeTestCase", methodName : "assertHashCodeForIsZero"});
}
PreludeTestCase.prototype.testCompose = function() {
	var f1 = function(i) {
		return i * 2;
	}
	var f2 = function(i) {
		return i - 1;
	}
	this.assertEquals(2,(Function1Extensions.compose(f1,f2))(2),null,null,{ fileName : "PreludeTest.hx", lineNumber : 32, className : "PreludeTestCase", methodName : "testCompose"});
}
PreludeTestCase.prototype.testCurry2 = function() {
	var f = function(i1,i2,i3) {
		return (i1 + i2) + i3;
	}
	this.assertEquals(3,(((Function3Extensions.curry(f))(2))(-2))(3),null,null,{ fileName : "PreludeTest.hx", lineNumber : 38, className : "PreludeTestCase", methodName : "testCurry2"});
}
PreludeTestCase.prototype.testEqualForAnonymousTyped = function() {
	var o1 = { name : "haxe"}
	var o2 = { name : "stax"}
	var o3 = { name : "haxe"}
	var equal = Stax.getEqualFor(o1);
	this.assertFalse(equal(o2,o1),null,{ fileName : "PreludeTest.hx", lineNumber : 342, className : "PreludeTestCase", methodName : "testEqualForAnonymousTyped"});
	this.assertFalse(equal(o1,o2),null,{ fileName : "PreludeTest.hx", lineNumber : 343, className : "PreludeTestCase", methodName : "testEqualForAnonymousTyped"});
	this.assertTrue(equal(o1,o3),null,{ fileName : "PreludeTest.hx", lineNumber : 344, className : "PreludeTestCase", methodName : "testEqualForAnonymousTyped"});
	this.assertFalse(equal(o1,null),null,{ fileName : "PreludeTest.hx", lineNumber : 345, className : "PreludeTestCase", methodName : "testEqualForAnonymousTyped"});
	this.assertFalse(equal(null,o1),null,{ fileName : "PreludeTest.hx", lineNumber : 346, className : "PreludeTestCase", methodName : "testEqualForAnonymousTyped"});
	this.assertTrue(equal(null,null),null,{ fileName : "PreludeTest.hx", lineNumber : 347, className : "PreludeTestCase", methodName : "testEqualForAnonymousTyped"});
}
PreludeTestCase.prototype.testEqualForArray = function() {
	var a1 = [1,2,3];
	var a2 = [4,5];
	var a3 = [4,5];
	var equal = Stax.getEqualFor(a1);
	this.assertFalse(equal(a1,a2),null,{ fileName : "PreludeTest.hx", lineNumber : 302, className : "PreludeTestCase", methodName : "testEqualForArray"});
	this.assertTrue(equal(a2,a3),null,{ fileName : "PreludeTest.hx", lineNumber : 303, className : "PreludeTestCase", methodName : "testEqualForArray"});
	this.assertTrue(equal([],[]),null,{ fileName : "PreludeTest.hx", lineNumber : 304, className : "PreludeTestCase", methodName : "testEqualForArray"});
}
PreludeTestCase.prototype.testEqualForBool = function() {
	var equal = Stax.getEqualFor(true);
	this.assertFalse(equal(true,false),null,{ fileName : "PreludeTest.hx", lineNumber : 263, className : "PreludeTestCase", methodName : "testEqualForBool"});
	this.assertFalse(equal(false,true),null,{ fileName : "PreludeTest.hx", lineNumber : 264, className : "PreludeTestCase", methodName : "testEqualForBool"});
	this.assertTrue(equal(true,true),null,{ fileName : "PreludeTest.hx", lineNumber : 265, className : "PreludeTestCase", methodName : "testEqualForBool"});
	this.assertTrue(equal(false,false),null,{ fileName : "PreludeTest.hx", lineNumber : 266, className : "PreludeTestCase", methodName : "testEqualForBool"});
}
PreludeTestCase.prototype.testEqualForClassWithEquals = function() {
	var c1 = new _PreludeTest.HasEquals(1);
	var c2 = new _PreludeTest.HasEquals(2);
	var c3 = new _PreludeTest.HasEquals(1);
	var equal = Stax.getEqualFor(c1);
	this.assertFalse(equal(c2,c1),null,{ fileName : "PreludeTest.hx", lineNumber : 312, className : "PreludeTestCase", methodName : "testEqualForClassWithEquals"});
	this.assertFalse(equal(c1,c2),null,{ fileName : "PreludeTest.hx", lineNumber : 313, className : "PreludeTestCase", methodName : "testEqualForClassWithEquals"});
	this.assertTrue(equal(c1,c3),null,{ fileName : "PreludeTest.hx", lineNumber : 314, className : "PreludeTestCase", methodName : "testEqualForClassWithEquals"});
}
PreludeTestCase.prototype.testEqualForDate = function() {
	var a = Date.fromString("1999-12-31");
	var b = Date.fromString("2000-01-01");
	var c = Date.fromString("1999-12-31");
	var equal = Stax.getEqualFor(b);
	this.assertFalse(equal(b,a),null,{ fileName : "PreludeTest.hx", lineNumber : 290, className : "PreludeTestCase", methodName : "testEqualForDate"});
	this.assertFalse(equal(a,b),null,{ fileName : "PreludeTest.hx", lineNumber : 291, className : "PreludeTestCase", methodName : "testEqualForDate"});
	this.assertFalse(equal(a,null),null,{ fileName : "PreludeTest.hx", lineNumber : 292, className : "PreludeTestCase", methodName : "testEqualForDate"});
	this.assertFalse(equal(null,a),null,{ fileName : "PreludeTest.hx", lineNumber : 293, className : "PreludeTestCase", methodName : "testEqualForDate"});
	this.assertTrue(equal(a,c),null,{ fileName : "PreludeTest.hx", lineNumber : 294, className : "PreludeTestCase", methodName : "testEqualForDate"});
}
PreludeTestCase.prototype.testEqualForEnum = function() {
	var o1 = Option.None;
	var o2 = Option.Some("a");
	var o3 = Option.Some("b");
	var o4 = Option.Some("a");
	var equal = Stax.getEqualFor(o1);
	this.assertFalse(equal(o2,o1),null,{ fileName : "PreludeTest.hx", lineNumber : 327, className : "PreludeTestCase", methodName : "testEqualForEnum"});
	this.assertFalse(equal(o3,o1),null,{ fileName : "PreludeTest.hx", lineNumber : 328, className : "PreludeTestCase", methodName : "testEqualForEnum"});
	this.assertFalse(equal(o3,o2),null,{ fileName : "PreludeTest.hx", lineNumber : 329, className : "PreludeTestCase", methodName : "testEqualForEnum"});
	this.assertFalse(equal(o1,o2),null,{ fileName : "PreludeTest.hx", lineNumber : 330, className : "PreludeTestCase", methodName : "testEqualForEnum"});
	this.assertFalse(equal(o1,o3),null,{ fileName : "PreludeTest.hx", lineNumber : 331, className : "PreludeTestCase", methodName : "testEqualForEnum"});
	this.assertFalse(equal(o2,o3),null,{ fileName : "PreludeTest.hx", lineNumber : 332, className : "PreludeTestCase", methodName : "testEqualForEnum"});
	this.assertTrue(equal(o1,o1),null,{ fileName : "PreludeTest.hx", lineNumber : 333, className : "PreludeTestCase", methodName : "testEqualForEnum"});
	this.assertTrue(equal(o2,o4),null,{ fileName : "PreludeTest.hx", lineNumber : 334, className : "PreludeTestCase", methodName : "testEqualForEnum"});
}
PreludeTestCase.prototype.testEqualForFloat = function() {
	var equal = Stax.getEqualFor(1.0);
	this.assertFalse(equal(1.2,1.1),null,{ fileName : "PreludeTest.hx", lineNumber : 256, className : "PreludeTestCase", methodName : "testEqualForFloat"});
	this.assertFalse(equal(1.1,1.2),null,{ fileName : "PreludeTest.hx", lineNumber : 257, className : "PreludeTestCase", methodName : "testEqualForFloat"});
	this.assertTrue(equal(0.1,0.1),null,{ fileName : "PreludeTest.hx", lineNumber : 258, className : "PreludeTestCase", methodName : "testEqualForFloat"});
}
PreludeTestCase.prototype.testEqualForInt = function() {
	var equal = Stax.getEqualFor(1);
	this.assertFalse(equal(2,1),null,{ fileName : "PreludeTest.hx", lineNumber : 249, className : "PreludeTestCase", methodName : "testEqualForInt"});
	this.assertFalse(equal(1,2),null,{ fileName : "PreludeTest.hx", lineNumber : 250, className : "PreludeTestCase", methodName : "testEqualForInt"});
	this.assertTrue(equal(1,1),null,{ fileName : "PreludeTest.hx", lineNumber : 251, className : "PreludeTestCase", methodName : "testEqualForInt"});
}
PreludeTestCase.prototype.testEqualForMethods = function() {
	var equal = Stax.getEqualFor($closure(this,"testEqualForMethods"));
	this.assertFalse(equal($closure(this,"testEqualForMethods"),$closure(this,"testEqualForAnonymousTyped")),null,{ fileName : "PreludeTest.hx", lineNumber : 352, className : "PreludeTestCase", methodName : "testEqualForMethods"});
	this.assertTrue(equal($closure(this,"testEqualForMethods"),$closure(this,"testEqualForMethods")),null,{ fileName : "PreludeTest.hx", lineNumber : 353, className : "PreludeTestCase", methodName : "testEqualForMethods"});
}
PreludeTestCase.prototype.testEqualForNotClassWithoutEquals = function() {
	this.assertThrowsException(function() {
		Stax.getEqualFor(new haxe.test.TestCase());
	},null,null,{ fileName : "PreludeTest.hx", lineNumber : 318, className : "PreludeTestCase", methodName : "testEqualForNotClassWithoutEquals"});
}
PreludeTestCase.prototype.testEqualForNull = function() {
	var equal = Stax.getEqualFor(null);
	this.assertFalse(equal("s",null),null,{ fileName : "PreludeTest.hx", lineNumber : 271, className : "PreludeTestCase", methodName : "testEqualForNull"});
	this.assertFalse(equal(null,"s"),null,{ fileName : "PreludeTest.hx", lineNumber : 272, className : "PreludeTestCase", methodName : "testEqualForNull"});
	this.assertTrue(equal(null,null),null,{ fileName : "PreludeTest.hx", lineNumber : 273, className : "PreludeTestCase", methodName : "testEqualForNull"});
}
PreludeTestCase.prototype.testEqualForString = function() {
	var equal = Stax.getEqualFor("s");
	this.assertFalse(equal("b","a"),null,{ fileName : "PreludeTest.hx", lineNumber : 278, className : "PreludeTestCase", methodName : "testEqualForString"});
	this.assertFalse(equal("a","b"),null,{ fileName : "PreludeTest.hx", lineNumber : 279, className : "PreludeTestCase", methodName : "testEqualForString"});
	this.assertFalse(equal("a",null),null,{ fileName : "PreludeTest.hx", lineNumber : 280, className : "PreludeTestCase", methodName : "testEqualForString"});
	this.assertFalse(equal(null,"a"),null,{ fileName : "PreludeTest.hx", lineNumber : 281, className : "PreludeTestCase", methodName : "testEqualForString"});
	this.assertTrue(equal("a","a"),null,{ fileName : "PreludeTest.hx", lineNumber : 282, className : "PreludeTestCase", methodName : "testEqualForString"});
}
PreludeTestCase.prototype.testFutureChaining = function() {
	var f1 = Future.create();
	var f2 = f1.map(function(i) {
		return Std.string(i);
	}).flatMap(function(s) {
		return Future.create().deliver(s.length < 2);
	});
	f1.deliver(9);
	this.assertEquals(true,OptionExtensions.get(f2.value()),null,null,{ fileName : "PreludeTest.hx", lineNumber : 48, className : "PreludeTestCase", methodName : "testFutureChaining"});
}
PreludeTestCase.prototype.testHash = function() {
	this.assertHashCodeForIsZero(null);
	this.assertHashCodeForIsZero(0);
	this.assertHashCodeForIsNotZero(true);
	this.assertHashCodeForIsNotZero(false);
	this.assertHashCodeForIsNotZero("");
	this.assertHashCodeForIsNotZero("a");
	this.assertHashCodeForIsNotZero(1);
	this.assertHashCodeForIsNotZero(0.1);
	this.assertHashCodeForIsNotZero([]);
	this.assertHashCodeForIsNotZero([1]);
	this.assertHashCodeForIsNotZero({ });
	this.assertHashCodeForIsNotZero({ n : "a"});
	this.assertHashCodeForIsNotZero(new _PreludeTest.HasHash(1));
	this.assertHashCodeForIsNotZero(Date.fromString("2000-01-01"));
	this.assertHashCodeForIsNotZero(Option.None);
	this.assertHashCodeForIsNotZero(Option.Some("a"));
}
PreludeTestCase.prototype.testOrderForAnonymousTyped = function() {
	var o1 = { name : "haxe"}
	var o2 = { name : "stax"}
	var o3 = { name : "haxe"}
	var order = Stax.getOrderFor(o1);
	this.assertTrue(order(o2,o1) > 0,null,{ fileName : "PreludeTest.hx", lineNumber : 239, className : "PreludeTestCase", methodName : "testOrderForAnonymousTyped"});
	this.assertTrue(order(o1,o2) < 0,null,{ fileName : "PreludeTest.hx", lineNumber : 240, className : "PreludeTestCase", methodName : "testOrderForAnonymousTyped"});
	this.assertTrue(order(o1,o3) == 0,null,{ fileName : "PreludeTest.hx", lineNumber : 241, className : "PreludeTestCase", methodName : "testOrderForAnonymousTyped"});
	this.assertTrue(order(o1,null) > 0,null,{ fileName : "PreludeTest.hx", lineNumber : 242, className : "PreludeTestCase", methodName : "testOrderForAnonymousTyped"});
	this.assertTrue(order(null,o1) < 0,null,{ fileName : "PreludeTest.hx", lineNumber : 243, className : "PreludeTestCase", methodName : "testOrderForAnonymousTyped"});
	this.assertTrue(order(null,null) == 0,null,{ fileName : "PreludeTest.hx", lineNumber : 244, className : "PreludeTestCase", methodName : "testOrderForAnonymousTyped"});
}
PreludeTestCase.prototype.testOrderForArray = function() {
	var a1 = [1,2,3];
	var a2 = [4];
	var a3 = [2,2,3];
	var a4 = [4];
	var order = Stax.getOrderFor(a1);
	this.assertTrue(order(a1,a2) > 0,null,{ fileName : "PreludeTest.hx", lineNumber : 107, className : "PreludeTestCase", methodName : "testOrderForArray"});
	this.assertTrue(order(a3,a1) > 0,null,{ fileName : "PreludeTest.hx", lineNumber : 108, className : "PreludeTestCase", methodName : "testOrderForArray"});
	this.assertTrue(order(a2,a1) < 0,null,{ fileName : "PreludeTest.hx", lineNumber : 109, className : "PreludeTestCase", methodName : "testOrderForArray"});
	this.assertTrue(order(a1,a3) < 0,null,{ fileName : "PreludeTest.hx", lineNumber : 110, className : "PreludeTestCase", methodName : "testOrderForArray"});
	this.assertTrue(order(a2,a4) == 0,null,{ fileName : "PreludeTest.hx", lineNumber : 111, className : "PreludeTestCase", methodName : "testOrderForArray"});
	this.assertTrue(order([],[]) == 0,null,{ fileName : "PreludeTest.hx", lineNumber : 112, className : "PreludeTestCase", methodName : "testOrderForArray"});
}
PreludeTestCase.prototype.testOrderForBool = function() {
	var order = Stax.getOrderFor(true);
	this.assertTrue(order(true,false) > 0,null,{ fileName : "PreludeTest.hx", lineNumber : 67, className : "PreludeTestCase", methodName : "testOrderForBool"});
	this.assertTrue(order(false,true) < 0,null,{ fileName : "PreludeTest.hx", lineNumber : 68, className : "PreludeTestCase", methodName : "testOrderForBool"});
	this.assertTrue(order(true,true) == 0,null,{ fileName : "PreludeTest.hx", lineNumber : 69, className : "PreludeTestCase", methodName : "testOrderForBool"});
	this.assertTrue(order(false,false) == 0,null,{ fileName : "PreludeTest.hx", lineNumber : 70, className : "PreludeTestCase", methodName : "testOrderForBool"});
}
PreludeTestCase.prototype.testOrderForComparableClass = function() {
	var c1 = new _PreludeTest.Comparable(1);
	var c2 = new _PreludeTest.Comparable(2);
	var c3 = new _PreludeTest.Comparable(1);
	var order = Stax.getOrderFor(c1);
	this.assertTrue(order(c2,c1) > 0,null,{ fileName : "PreludeTest.hx", lineNumber : 120, className : "PreludeTestCase", methodName : "testOrderForComparableClass"});
	this.assertTrue(order(c1,c2) < 0,null,{ fileName : "PreludeTest.hx", lineNumber : 121, className : "PreludeTestCase", methodName : "testOrderForComparableClass"});
	this.assertTrue(order(c1,c3) == 0,null,{ fileName : "PreludeTest.hx", lineNumber : 122, className : "PreludeTestCase", methodName : "testOrderForComparableClass"});
}
PreludeTestCase.prototype.testOrderForDate = function() {
	var a = Date.fromString("1999-12-31");
	var b = Date.fromString("2000-01-01");
	var c = Date.fromString("1999-12-31");
	var order = Stax.getOrderFor(b);
	this.assertTrue(order(b,a) > 0,null,{ fileName : "PreludeTest.hx", lineNumber : 94, className : "PreludeTestCase", methodName : "testOrderForDate"});
	this.assertTrue(order(a,b) < 0,null,{ fileName : "PreludeTest.hx", lineNumber : 95, className : "PreludeTestCase", methodName : "testOrderForDate"});
	this.assertTrue(order(a,null) > 0,null,{ fileName : "PreludeTest.hx", lineNumber : 96, className : "PreludeTestCase", methodName : "testOrderForDate"});
	this.assertTrue(order(null,a) < 0,null,{ fileName : "PreludeTest.hx", lineNumber : 97, className : "PreludeTestCase", methodName : "testOrderForDate"});
	this.assertTrue(order(a,c) == 0,null,{ fileName : "PreludeTest.hx", lineNumber : 98, className : "PreludeTestCase", methodName : "testOrderForDate"});
}
PreludeTestCase.prototype.testOrderForEnum = function() {
	var o1 = Option.None;
	var o2 = Option.Some("a");
	var o3 = Option.Some("b");
	var o4 = Option.Some("a");
	var order = Stax.getOrderFor(o1);
	this.assertTrue(order(o2,o1) > 0,null,{ fileName : "PreludeTest.hx", lineNumber : 224, className : "PreludeTestCase", methodName : "testOrderForEnum"});
	this.assertTrue(order(o3,o1) > 0,null,{ fileName : "PreludeTest.hx", lineNumber : 225, className : "PreludeTestCase", methodName : "testOrderForEnum"});
	this.assertTrue(order(o3,o2) > 0,null,{ fileName : "PreludeTest.hx", lineNumber : 226, className : "PreludeTestCase", methodName : "testOrderForEnum"});
	this.assertTrue(order(o1,o2) < 0,null,{ fileName : "PreludeTest.hx", lineNumber : 227, className : "PreludeTestCase", methodName : "testOrderForEnum"});
	this.assertTrue(order(o1,o3) < 0,null,{ fileName : "PreludeTest.hx", lineNumber : 228, className : "PreludeTestCase", methodName : "testOrderForEnum"});
	this.assertTrue(order(o2,o3) < 0,null,{ fileName : "PreludeTest.hx", lineNumber : 229, className : "PreludeTestCase", methodName : "testOrderForEnum"});
	this.assertTrue(order(o1,o1) == 0,null,{ fileName : "PreludeTest.hx", lineNumber : 230, className : "PreludeTestCase", methodName : "testOrderForEnum"});
	this.assertTrue(order(o2,o4) == 0,null,{ fileName : "PreludeTest.hx", lineNumber : 231, className : "PreludeTestCase", methodName : "testOrderForEnum"});
}
PreludeTestCase.prototype.testOrderForFloat = function() {
	var order = Stax.getOrderFor(1.0);
	this.assertTrue(order(1.2,1.1) > 0,null,{ fileName : "PreludeTest.hx", lineNumber : 60, className : "PreludeTestCase", methodName : "testOrderForFloat"});
	this.assertTrue(order(1.1,1.2) < 0,null,{ fileName : "PreludeTest.hx", lineNumber : 61, className : "PreludeTestCase", methodName : "testOrderForFloat"});
	this.assertTrue(order(0.1,0.1) == 0,null,{ fileName : "PreludeTest.hx", lineNumber : 62, className : "PreludeTestCase", methodName : "testOrderForFloat"});
}
PreludeTestCase.prototype.testOrderForFunction = function() {
	this.assertThrowsException(function() {
		Stax.getOrderFor(function() {
			haxe.Log.trace("hello world",{ fileName : "PreludeTest.hx", lineNumber : 150, className : "PreludeTestCase", methodName : "testOrderForFunction"});
		});
	},null,null,{ fileName : "PreludeTest.hx", lineNumber : 150, className : "PreludeTestCase", methodName : "testOrderForFunction"});
}
PreludeTestCase.prototype.testOrderForInt = function() {
	var order = Stax.getOrderFor(1);
	this.assertTrue(order(2,1) > 0,null,{ fileName : "PreludeTest.hx", lineNumber : 53, className : "PreludeTestCase", methodName : "testOrderForInt"});
	this.assertTrue(order(1,2) < 0,null,{ fileName : "PreludeTest.hx", lineNumber : 54, className : "PreludeTestCase", methodName : "testOrderForInt"});
	this.assertTrue(order(1,1) == 0,null,{ fileName : "PreludeTest.hx", lineNumber : 55, className : "PreludeTestCase", methodName : "testOrderForInt"});
}
PreludeTestCase.prototype.testOrderForNotComparableClass = function() {
	this.assertThrowsException(function() {
		Stax.getOrderFor(new Hash());
	},null,null,{ fileName : "PreludeTest.hx", lineNumber : 126, className : "PreludeTestCase", methodName : "testOrderForNotComparableClass"});
}
PreludeTestCase.prototype.testOrderForNull = function() {
	var order = Stax.getOrderFor(null);
	this.assertTrue(order("s",null) > 0,null,{ fileName : "PreludeTest.hx", lineNumber : 75, className : "PreludeTestCase", methodName : "testOrderForNull"});
	this.assertTrue(order(null,"s") < 0,null,{ fileName : "PreludeTest.hx", lineNumber : 76, className : "PreludeTestCase", methodName : "testOrderForNull"});
	this.assertTrue(order(null,null) == 0,null,{ fileName : "PreludeTest.hx", lineNumber : 77, className : "PreludeTestCase", methodName : "testOrderForNull"});
}
PreludeTestCase.prototype.testOrderForString = function() {
	var order = Stax.getOrderFor("s");
	this.assertTrue(order("b","a") > 0,null,{ fileName : "PreludeTest.hx", lineNumber : 82, className : "PreludeTestCase", methodName : "testOrderForString"});
	this.assertTrue(order("a","b") < 0,null,{ fileName : "PreludeTest.hx", lineNumber : 83, className : "PreludeTestCase", methodName : "testOrderForString"});
	this.assertTrue(order("a",null) > 0,null,{ fileName : "PreludeTest.hx", lineNumber : 84, className : "PreludeTestCase", methodName : "testOrderForString"});
	this.assertTrue(order(null,"a") < 0,null,{ fileName : "PreludeTest.hx", lineNumber : 85, className : "PreludeTestCase", methodName : "testOrderForString"});
	this.assertTrue(order("a","a") == 0,null,{ fileName : "PreludeTest.hx", lineNumber : 86, className : "PreludeTestCase", methodName : "testOrderForString"});
}
PreludeTestCase.prototype.testReflectiveHasher = function() {
	var zerocodes = [null,0];
	{
		var _g = 0;
		while(_g < zerocodes.length) {
			var z = zerocodes[_g];
			++_g;
			this.assertEquals(0,(Stax.getHashFor(z))(z),null,null,{ fileName : "PreludeTest.hx", lineNumber : 399, className : "PreludeTestCase", methodName : "testReflectiveHasher"});
		}
	}
	var nonzerocodes = [true,false,"","a",1,0.1,[],[1],{ },{ n : "a"},new _PreludeTest.HasNoHashAndShow(1),new _PreludeTest.HasHash(1),Date.fromString("2000-01-01"),Option.None,Option.Some("a")];
	{
		var _g = 0;
		while(_g < nonzerocodes.length) {
			var n = nonzerocodes[_g];
			++_g;
			this.assertNotEquals(0,(Stax.getHashFor(n))(n),null,{ fileName : "PreludeTest.hx", lineNumber : 403, className : "PreludeTestCase", methodName : "testReflectiveHasher"});
		}
	}
}
PreludeTestCase.prototype.testReflectiveOrderForDynamicComparableClass = function() {
	var c1 = new _PreludeTest.DynamicComparable(1);
	var c2 = new _PreludeTest.DynamicComparable(2);
	var c3 = new _PreludeTest.DynamicComparable(1);
	var order = Stax.getOrderFor(c1);
	this.assertTrue(order(c2,c1) > 0,null,{ fileName : "PreludeTest.hx", lineNumber : 134, className : "PreludeTestCase", methodName : "testReflectiveOrderForDynamicComparableClass"});
	this.assertTrue(order(c1,c2) < 0,null,{ fileName : "PreludeTest.hx", lineNumber : 135, className : "PreludeTestCase", methodName : "testReflectiveOrderForDynamicComparableClass"});
	this.assertTrue(order(c1,c3) == 0,null,{ fileName : "PreludeTest.hx", lineNumber : 136, className : "PreludeTestCase", methodName : "testReflectiveOrderForDynamicComparableClass"});
}
PreludeTestCase.prototype.testReflectiveOrderForDynamicComparableDescendingClass = function() {
	var c1 = new _PreludeTest.DynamicComparableDescending(1);
	var c2 = new _PreludeTest.DynamicComparableDescending(2);
	var c3 = new _PreludeTest.DynamicComparableDescending(1);
	var order = Stax.getOrderFor(c1);
	this.assertTrue(order(c2,c1) < 0,null,{ fileName : "PreludeTest.hx", lineNumber : 144, className : "PreludeTestCase", methodName : "testReflectiveOrderForDynamicComparableDescendingClass"});
	this.assertTrue(order(c1,c2) > 0,null,{ fileName : "PreludeTest.hx", lineNumber : 145, className : "PreludeTestCase", methodName : "testReflectiveOrderForDynamicComparableDescendingClass"});
	this.assertTrue(order(c1,c3) == 0,null,{ fileName : "PreludeTest.hx", lineNumber : 146, className : "PreludeTestCase", methodName : "testReflectiveOrderForDynamicComparableDescendingClass"});
}
PreludeTestCase.prototype.testShowFor = function() {
	this.assertEquals("null",PreludeTestCase.getShow(null),null,null,{ fileName : "PreludeTest.hx", lineNumber : 359, className : "PreludeTestCase", methodName : "testShowFor"});
	this.assertEquals("true",PreludeTestCase.getShow(true),null,null,{ fileName : "PreludeTest.hx", lineNumber : 360, className : "PreludeTestCase", methodName : "testShowFor"});
	this.assertEquals("false",PreludeTestCase.getShow(false),null,null,{ fileName : "PreludeTest.hx", lineNumber : 361, className : "PreludeTestCase", methodName : "testShowFor"});
	this.assertEquals("a",PreludeTestCase.getShow("a"),null,null,{ fileName : "PreludeTest.hx", lineNumber : 362, className : "PreludeTestCase", methodName : "testShowFor"});
	this.assertEquals("1",PreludeTestCase.getShow(1),null,null,{ fileName : "PreludeTest.hx", lineNumber : 363, className : "PreludeTestCase", methodName : "testShowFor"});
	this.assertEquals("0.123",PreludeTestCase.getShow(0.123),null,null,{ fileName : "PreludeTest.hx", lineNumber : 364, className : "PreludeTestCase", methodName : "testShowFor"});
	this.assertEquals("{name:stax}",PreludeTestCase.getShow({ name : "stax"}),null,null,{ fileName : "PreludeTest.hx", lineNumber : 365, className : "PreludeTestCase", methodName : "testShowFor"});
	this.assertEquals("[[1, 2], [3, 4]]",PreludeTestCase.getShow([[1,2],[3,4]]),null,null,{ fileName : "PreludeTest.hx", lineNumber : 366, className : "PreludeTestCase", methodName : "testShowFor"});
	this.assertEquals("PreludeTest",PreludeTestCase.getShow(this),null,null,{ fileName : "PreludeTest.hx", lineNumber : 367, className : "PreludeTestCase", methodName : "testShowFor"});
	this.assertEquals("_PreludeTest.HasEquals",PreludeTestCase.getShow(new _PreludeTest.HasEquals(1)),null,null,{ fileName : "PreludeTest.hx", lineNumber : 368, className : "PreludeTestCase", methodName : "testShowFor"});
	this.assertEquals("<function>",PreludeTestCase.getShow(function() {
		haxe.Log.trace("",{ fileName : "PreludeTest.hx", lineNumber : 369, className : "PreludeTestCase", methodName : "testShowFor"});
	}),null,null,{ fileName : "PreludeTest.hx", lineNumber : 369, className : "PreludeTestCase", methodName : "testShowFor"});
	this.assertEquals("None",PreludeTestCase.getShow(Option.None),null,null,{ fileName : "PreludeTest.hx", lineNumber : 370, className : "PreludeTestCase", methodName : "testShowFor"});
	this.assertEquals("Some(Some(value))",PreludeTestCase.getShow(Option.Some(Option.Some("value"))),null,null,{ fileName : "PreludeTest.hx", lineNumber : 371, className : "PreludeTestCase", methodName : "testShowFor"});
	this.assertEquals("_PreludeTest.HasNoHashAndShow()",PreludeTestCase.getShow(new _PreludeTest.HasNoHashAndShow(1)),null,null,{ fileName : "PreludeTest.hx", lineNumber : 372, className : "PreludeTestCase", methodName : "testShowFor"});
	this.assertEquals("_PreludeTest.DynamicComparable(1)",PreludeTestCase.getShow(new _PreludeTest.DynamicComparable(1)),null,null,{ fileName : "PreludeTest.hx", lineNumber : 373, className : "PreludeTestCase", methodName : "testShowFor"});
}
PreludeTestCase.prototype.testTupleEqual = function() {
	var tests = [Tuple2.create(Tuple2.create("b",0),Tuple2.create("b",0)),Tuple2.create(Tuple2.create("a",1),Tuple2.create("a",1)),Tuple2.create(Tuple3.create("a",0,0.1),Tuple3.create("a",0,0.1)),Tuple2.create(Tuple4.create("a",0,0.1,"b"),Tuple4.create("a",0,0.1,"b")),Tuple2.create(Tuple5.create("a",0,0.1,"a",1),Tuple5.create("a",0,0.1,"a",1))];
	{
		var _g = 0;
		while(_g < tests.length) {
			var test = tests[_g];
			++_g;
			this.assertTrue((Stax.getEqualFor(test._1))(test._1,test._2),null,{ fileName : "PreludeTest.hx", lineNumber : 178, className : "PreludeTestCase", methodName : "testTupleEqual"});
			this.assertTrue(test._1.equals(test._2),null,{ fileName : "PreludeTest.hx", lineNumber : 179, className : "PreludeTestCase", methodName : "testTupleEqual"});
		}
	}
}
PreludeTestCase.prototype.testTupleHashCode = function() {
	var tests = [Stax.getHashFor(Tuple2.create("b",0)),Stax.getHashFor(Tuple2.create("a",1)),Stax.getHashFor(Tuple3.create("a",0,0.1)),Stax.getHashFor(Tuple4.create("a",0,0.1,"b")),Stax.getHashFor(Tuple5.create("a",0,0.1,"a",1))];
	while(tests.length > 0) {
		var value = tests.pop();
		this.assertFalse(tests.remove(value),"value is not unique hash: " + value,{ fileName : "PreludeTest.hx", lineNumber : 211, className : "PreludeTestCase", methodName : "testTupleHashCode"});
		this.assertNotEquals(0,value,null,{ fileName : "PreludeTest.hx", lineNumber : 214, className : "PreludeTestCase", methodName : "testTupleHashCode"});
	}
}
PreludeTestCase.prototype.testTupleOrder = function() {
	var tests = [Tuple2.create(Tuple2.create("b",0),Tuple2.create("a",0)),Tuple2.create(Tuple2.create("a",1),Tuple2.create("a",0)),Tuple2.create(Tuple3.create("a",0,0.1),Tuple3.create("a",0,0.05)),Tuple2.create(Tuple4.create("a",0,0.1,"b"),Tuple4.create("a",0,0.1,"a")),Tuple2.create(Tuple5.create("a",0,0.1,"a",1),Tuple5.create("a",0,0.1,"a",0))];
	{
		var _g = 0;
		while(_g < tests.length) {
			var test = tests[_g];
			++_g;
			this.assertTrue((Stax.getOrderFor(test._1))(test._1,test._2) > 0,(("failed to compare " + test._1) + " to ") + test._2,{ fileName : "PreludeTest.hx", lineNumber : 163, className : "PreludeTestCase", methodName : "testTupleOrder"});
			this.assertTrue(test._1.compare(test._2) > 0,(("failed to compare " + test._1) + " to ") + test._2,{ fileName : "PreludeTest.hx", lineNumber : 164, className : "PreludeTestCase", methodName : "testTupleOrder"});
		}
	}
}
PreludeTestCase.prototype.testTupleString = function() {
	var tests = [Tuple2.create(Tuple2.create("b",0),"Tuple2(b, 0)"),Tuple2.create(Tuple2.create("a",1),"Tuple2(a, 1)"),Tuple2.create(Tuple3.create("a",0,0.1),"Tuple3(a, 0, 0.1)"),Tuple2.create(Tuple4.create("a",0,0.1,"b"),"Tuple4(a, 0, 0.1, b)"),Tuple2.create(Tuple5.create("a",0,0.1,"a",1),"Tuple5(a, 0, 0.1, a, 1)")];
	{
		var _g = 0;
		while(_g < tests.length) {
			var test = tests[_g];
			++_g;
			this.assertEquals(test._2,(Stax.getShowFor(test._1))(test._1),null,null,{ fileName : "PreludeTest.hx", lineNumber : 193, className : "PreludeTestCase", methodName : "testTupleString"});
			this.assertEquals(test._2,test._1.toString(),null,null,{ fileName : "PreludeTest.hx", lineNumber : 194, className : "PreludeTestCase", methodName : "testTupleString"});
		}
	}
}
PreludeTestCase.prototype.toString = function() {
	return "PreludeTest";
}
PreludeTestCase.prototype.__class__ = PreludeTestCase;
if(typeof _PreludeTest=='undefined') _PreludeTest = {}
_PreludeTest.HasEquals = function(v) { if( v === $_ ) return; {
	this.v = v;
}}
_PreludeTest.HasEquals.__name__ = ["_PreludeTest","HasEquals"];
_PreludeTest.HasEquals.prototype.equals = function(other) {
	return this.v == other.v;
}
_PreludeTest.HasEquals.prototype.v = null;
_PreludeTest.HasEquals.prototype.__class__ = _PreludeTest.HasEquals;
_PreludeTest.Comparable = function(v) { if( v === $_ ) return; {
	this.v = v;
}}
_PreludeTest.Comparable.__name__ = ["_PreludeTest","Comparable"];
_PreludeTest.Comparable.prototype.compare = function(other) {
	return (this.v == other.v?0:((this.v > other.v?1:-1)));
}
_PreludeTest.Comparable.prototype.v = null;
_PreludeTest.Comparable.prototype.__class__ = _PreludeTest.Comparable;
_PreludeTest.HasHash = function(v) { if( v === $_ ) return; {
	this.v = v;
}}
_PreludeTest.HasHash.__name__ = ["_PreludeTest","HasHash"];
_PreludeTest.HasHash.prototype.hashCode = function() {
	return this.v;
}
_PreludeTest.HasHash.prototype.v = null;
_PreludeTest.HasHash.prototype.__class__ = _PreludeTest.HasHash;
_PreludeTest.HasNoHashAndShow = function(v) { if( v === $_ ) return; {
	this.v = v;
}}
_PreludeTest.HasNoHashAndShow.__name__ = ["_PreludeTest","HasNoHashAndShow"];
_PreludeTest.HasNoHashAndShow.prototype.v = null;
_PreludeTest.HasNoHashAndShow.prototype.__class__ = _PreludeTest.HasNoHashAndShow;
_PreludeTest.DynamicComparable = function(v) { if( v === $_ ) return; {
	this.v = v;
}}
_PreludeTest.DynamicComparable.__name__ = ["_PreludeTest","DynamicComparable"];
_PreludeTest.DynamicComparable.prototype.v = null;
_PreludeTest.DynamicComparable.prototype.__class__ = _PreludeTest.DynamicComparable;
_PreludeTest.DynamicComparableDescending = function(v) { if( v === $_ ) return; {
	this.v = v;
}}
_PreludeTest.DynamicComparableDescending.__name__ = ["_PreludeTest","DynamicComparableDescending"];
_PreludeTest.DynamicComparableDescending.prototype.v = null;
_PreludeTest.DynamicComparableDescending.prototype.__class__ = _PreludeTest.DynamicComparableDescending;
if(!haxe.time) haxe.time = {}
haxe.time.ScheduledExecutorTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
haxe.time.ScheduledExecutorTestCase.__name__ = ["haxe","time","ScheduledExecutorTestCase"];
haxe.time.ScheduledExecutorTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) haxe.time.ScheduledExecutorTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
haxe.time.ScheduledExecutorTestCase.prototype._executor = null;
haxe.time.ScheduledExecutorTestCase.prototype.beforeAll = function() {
	this._executor = haxe.framework.Injector.inject(haxe.time.ScheduledExecutor,{ fileName : "ScheduledExecutorTestCase.hx", lineNumber : 31, className : "haxe.time.ScheduledExecutorTestCase", methodName : "beforeAll"});
}
haxe.time.ScheduledExecutorTestCase.prototype.testForever = function() {
	var future = null;
	var count = 0;
	future = this._executor.forever(function() {
		++count;
		future.cancel();
	},1);
	haxe.test.Assert.canceled(future,function() {
		haxe.test.Assert.equals(1,count,null,null,{ fileName : "ScheduledExecutorTestCase.hx", lineNumber : 98, className : "haxe.time.ScheduledExecutorTestCase", methodName : "testForever"});
	});
}
haxe.time.ScheduledExecutorTestCase.prototype.testForeverCanBeCanceled = function() {
	var future = this._executor.forever(function() {
		null;
	},1);
	haxe.test.Assert.notDelivered(future,null,{ fileName : "ScheduledExecutorTestCase.hx", lineNumber : 81, className : "haxe.time.ScheduledExecutorTestCase", methodName : "testForeverCanBeCanceled"});
	future.cancel();
}
haxe.time.ScheduledExecutorTestCase.prototype.testOnce = function() {
	var future = this._executor.once(function() {
		return 12;
	},1);
	haxe.test.Assert.delivered(future,function(v) {
		haxe.test.Assert.equals(12,v,null,null,{ fileName : "ScheduledExecutorTestCase.hx", lineNumber : 41, className : "haxe.time.ScheduledExecutorTestCase", methodName : "testOnce"});
	});
}
haxe.time.ScheduledExecutorTestCase.prototype.testOnceCanBeCanceled = function() {
	var future = this._executor.once(function() {
		return 12;
	},1);
	haxe.test.Assert.notDelivered(future,null,{ fileName : "ScheduledExecutorTestCase.hx", lineNumber : 51, className : "haxe.time.ScheduledExecutorTestCase", methodName : "testOnceCanBeCanceled"});
	future.cancel();
}
haxe.time.ScheduledExecutorTestCase.prototype.testRepeat = function() {
	var future = this._executor.repeat(0,function(count) {
		return count + 1;
	},1,3);
	haxe.test.Assert.delivered(future,function(v) {
		haxe.test.Assert.equals(3,v,null,null,{ fileName : "ScheduledExecutorTestCase.hx", lineNumber : 63, className : "haxe.time.ScheduledExecutorTestCase", methodName : "testRepeat"});
	});
}
haxe.time.ScheduledExecutorTestCase.prototype.testRepeatCanBeCanceled = function() {
	var future = this._executor.repeat(0,function(count) {
		return count + 1;
	},1,3);
	haxe.test.Assert.notDelivered(future,null,{ fileName : "ScheduledExecutorTestCase.hx", lineNumber : 73, className : "haxe.time.ScheduledExecutorTestCase", methodName : "testRepeatCanBeCanceled"});
	future.cancel();
}
haxe.time.ScheduledExecutorTestCase.prototype.__class__ = haxe.time.ScheduledExecutorTestCase;
if(!haxe.io) haxe.io = {}
if(!haxe.io.log) haxe.io.log = {}
haxe.io.log.LoggerFacade = function() { }
haxe.io.log.LoggerFacade.__name__ = ["haxe","io","log","LoggerFacade"];
haxe.io.log.LoggerFacade.prototype.debug = null;
haxe.io.log.LoggerFacade.prototype.error = null;
haxe.io.log.LoggerFacade.prototype.fatal = null;
haxe.io.log.LoggerFacade.prototype.info = null;
haxe.io.log.LoggerFacade.prototype.trace = null;
haxe.io.log.LoggerFacade.prototype.warning = null;
haxe.io.log.LoggerFacade.prototype.__class__ = haxe.io.log.LoggerFacade;
haxe.io.log.LogLevel = { __ename__ : ["haxe","io","log","LogLevel"], __constructs__ : ["All","Debug","Info","Warning","Error","Fatal","None"] }
haxe.io.log.LogLevel.All = ["All",0];
haxe.io.log.LogLevel.All.toString = $estr;
haxe.io.log.LogLevel.All.__enum__ = haxe.io.log.LogLevel;
haxe.io.log.LogLevel.Debug = ["Debug",1];
haxe.io.log.LogLevel.Debug.toString = $estr;
haxe.io.log.LogLevel.Debug.__enum__ = haxe.io.log.LogLevel;
haxe.io.log.LogLevel.Error = ["Error",4];
haxe.io.log.LogLevel.Error.toString = $estr;
haxe.io.log.LogLevel.Error.__enum__ = haxe.io.log.LogLevel;
haxe.io.log.LogLevel.Fatal = ["Fatal",5];
haxe.io.log.LogLevel.Fatal.toString = $estr;
haxe.io.log.LogLevel.Fatal.__enum__ = haxe.io.log.LogLevel;
haxe.io.log.LogLevel.Info = ["Info",2];
haxe.io.log.LogLevel.Info.toString = $estr;
haxe.io.log.LogLevel.Info.__enum__ = haxe.io.log.LogLevel;
haxe.io.log.LogLevel.None = ["None",6];
haxe.io.log.LogLevel.None.toString = $estr;
haxe.io.log.LogLevel.None.__enum__ = haxe.io.log.LogLevel;
haxe.io.log.LogLevel.Warning = ["Warning",3];
haxe.io.log.LogLevel.Warning.toString = $estr;
haxe.io.log.LogLevel.Warning.__enum__ = haxe.io.log.LogLevel;
haxe.io.log.Logger = function() { }
haxe.io.log.Logger.__name__ = ["haxe","io","log","Logger"];
haxe.io.log.Logger.get = function() {
	return haxe.io.log.Logger.create({ level : function() {
		return haxe.io.log.Logger.defaultLevel;
	}, handlers : haxe.io.log.Logger.defaultHandlers});
}
haxe.io.log.Logger.create = function(config) {
	return new haxe.io.log.LoggerBridge(haxe.io.log.LogHandlers.filter(haxe.io.log.LogHandlers.composite(config.handlers),config.level));
}
haxe.io.log.Logger.none = function() {
	return haxe.io.log.Logger.create({ level : DynamicExtensions.toThunk(haxe.io.log.LogLevel.None), handlers : []});
}
haxe.io.log.Logger.debug = function() {
	return haxe.io.log.Logger.create({ level : DynamicExtensions.toThunk(haxe.io.log.LogLevel.Debug), handlers : [haxe.io.log.LogHandlers.Console]});
}
haxe.io.log.Logger.prototype.__class__ = haxe.io.log.Logger;
haxe.io.log.LoggerBridge = function(h) { if( h === $_ ) return; {
	this._handler = h;
}}
haxe.io.log.LoggerBridge.__name__ = ["haxe","io","log","LoggerBridge"];
haxe.io.log.LoggerBridge.prototype._handler = null;
haxe.io.log.LoggerBridge.prototype.debug = function(s,p) {
	this._handler(haxe.io.log.LogLevel.Debug,s,p);
}
haxe.io.log.LoggerBridge.prototype.error = function(s,p) {
	this._handler(haxe.io.log.LogLevel.Error,s,p);
}
haxe.io.log.LoggerBridge.prototype.fatal = function(s,p) {
	this._handler(haxe.io.log.LogLevel.Fatal,s,p);
}
haxe.io.log.LoggerBridge.prototype.info = function(s,p) {
	this._handler(haxe.io.log.LogLevel.Info,s,p);
}
haxe.io.log.LoggerBridge.prototype.trace = function(t,p) {
	this.debug(Std.string(t),p);
	return t;
}
haxe.io.log.LoggerBridge.prototype.warning = function(s,p) {
	this._handler(haxe.io.log.LogLevel.Warning,s,p);
}
haxe.io.log.LoggerBridge.prototype.__class__ = haxe.io.log.LoggerBridge;
haxe.io.log.LoggerBridge.__interfaces__ = [haxe.io.log.LoggerFacade];
haxe.io.log.LogHandlers = function() { }
haxe.io.log.LogHandlers.__name__ = ["haxe","io","log","LogHandlers"];
haxe.io.log.LogHandlers.Trace = function(level,text,p) {
	haxe.Log.trace((haxe.io.log.LogHandlers.textLevel(level).toUpperCase() + ": ") + haxe.io.log.LogHandlers.format(text,p),{ fileName : "Logger.hx", lineNumber : 116, className : "haxe.io.log.LogHandlers"});
}
haxe.io.log.LogHandlers.Console = function(level,text,p) {
	(function(text1) {
		var c = (typeof console != "undefined") ? console : null;
		if(c != null) {
			var $e = (level);
			switch( $e[1] ) {
			case 0:
			case 1:
			{
				if(c.debug != null) c.debug(text1);
			}break;
			case 2:
			{
				if(c.info != null) c.info(text1);
			}break;
			case 3:
			{
				if(c.warn != null) c.warn(text1);
			}break;
			case 4:
			case 5:
			case 6:
			{
				if(c.error != null) c.error(text1);
			}break;
			}
		}
	})(haxe.io.log.LogHandlers.format(text,p));
}
haxe.io.log.LogHandlers.composite = function(fns) {
	return function(l,t,p) {
		var _g = 0;
		while(_g < fns.length) {
			var f = fns[_g];
			++_g;
			f(l,t,p);
		}
	}
}
haxe.io.log.LogHandlers.filter = function(input,cutoff) {
	return function(l,t,p) {
		if(haxe.io.log.LogHandlers.intLevel(l) >= haxe.io.log.LogHandlers.intLevel(cutoff())) {
			input(l,t,p);
		}
	}
}
haxe.io.log.LogHandlers.format = function(text,p) {
	return (((((((p.fileName + ":") + p.lineNumber) + " (") + p.className) + ".") + p.methodName) + "): ") + text;
}
haxe.io.log.LogHandlers.textLevel = function(level) {
	return (function($this) {
		var $r;
		var $e = (level);
		switch( $e[1] ) {
		case 0:
		{
			$r = "All";
		}break;
		case 1:
		{
			$r = "Debug";
		}break;
		case 2:
		{
			$r = "Info";
		}break;
		case 3:
		{
			$r = "Warning";
		}break;
		case 4:
		{
			$r = "Error";
		}break;
		case 5:
		{
			$r = "Fatal";
		}break;
		case 6:
		{
			$r = "None";
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
haxe.io.log.LogHandlers.intLevel = function(level) {
	return (function($this) {
		var $r;
		var $e = (level);
		switch( $e[1] ) {
		case 0:
		{
			$r = 0;
		}break;
		case 1:
		{
			$r = 1;
		}break;
		case 2:
		{
			$r = 2;
		}break;
		case 3:
		{
			$r = 3;
		}break;
		case 4:
		{
			$r = 4;
		}break;
		case 5:
		{
			$r = 5;
		}break;
		case 6:
		{
			$r = 6;
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
haxe.io.log.LogHandlers.prototype.__class__ = haxe.io.log.LogHandlers;
if(!haxe.test.ui) haxe.test.ui = {}
if(!haxe.test.ui.common) haxe.test.ui.common = {}
haxe.test.ui.common.ResultAggregator = function(runner,flattenPackage) { if( runner === $_ ) return; {
	if(flattenPackage == null) flattenPackage = false;
	if(runner == null) throw "runner argument is null";
	this.flattenPackage = flattenPackage;
	this.runner = runner;
	runner.onStart.add($closure(this,"start"));
	runner.onProgress.add($closure(this,"progress"));
	runner.onComplete.add($closure(this,"complete"));
	this.onStart = new haxe.test.Notifier();
	this.onComplete = new haxe.test.Dispatcher();
	this.onProgress = new haxe.test.Dispatcher();
}}
haxe.test.ui.common.ResultAggregator.__name__ = ["haxe","test","ui","common","ResultAggregator"];
haxe.test.ui.common.ResultAggregator.prototype.complete = function(runner) {
	this.onComplete.dispatch(this.root);
}
haxe.test.ui.common.ResultAggregator.prototype.createFixture = function(result) {
	var f = new haxe.test.ui.common.FixtureResult(result.method);
	{ var $it0 = result.assertations.iterator();
	while( $it0.hasNext() ) { var assertation = $it0.next();
	f.add(assertation);
	}}
	return f;
}
haxe.test.ui.common.ResultAggregator.prototype.flattenPackage = null;
haxe.test.ui.common.ResultAggregator.prototype.getOrCreateClass = function(pack,cls,setup,teardown) {
	if(pack.existsClass(cls)) return pack.getClass(cls);
	var c = new haxe.test.ui.common.ClassResult(cls,setup,teardown);
	pack.addClass(c);
	return c;
}
haxe.test.ui.common.ResultAggregator.prototype.getOrCreatePackage = function(pack,flat,ref) {
	if(ref == null) ref = this.root;
	if(pack == null || pack == "") return ref;
	if(flat) {
		if(ref.existsPackage(pack)) return ref.getPackage(pack);
		var p = new haxe.test.ui.common.PackageResult(pack);
		ref.addPackage(p);
		return p;
	}
	else {
		var parts = pack.split(".");
		{
			var _g = 0;
			while(_g < parts.length) {
				var part = parts[_g];
				++_g;
				ref = this.getOrCreatePackage(part,true,ref);
			}
		}
		return ref;
	}
}
haxe.test.ui.common.ResultAggregator.prototype.onComplete = null;
haxe.test.ui.common.ResultAggregator.prototype.onProgress = null;
haxe.test.ui.common.ResultAggregator.prototype.onStart = null;
haxe.test.ui.common.ResultAggregator.prototype.progress = function(e) {
	this.root.addResult(e.result,this.flattenPackage);
	this.onProgress.dispatch(e);
}
haxe.test.ui.common.ResultAggregator.prototype.root = null;
haxe.test.ui.common.ResultAggregator.prototype.runner = null;
haxe.test.ui.common.ResultAggregator.prototype.start = function(runner) {
	this.root = new haxe.test.ui.common.PackageResult(null);
	this.onStart.dispatch();
}
haxe.test.ui.common.ResultAggregator.prototype.__class__ = haxe.test.ui.common.ResultAggregator;
if(!haxe.util) haxe.util = {}
haxe.util.StringExtensionsTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
haxe.util.StringExtensionsTestCase.__name__ = ["haxe","util","StringExtensionsTestCase"];
haxe.util.StringExtensionsTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) haxe.util.StringExtensionsTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
haxe.util.StringExtensionsTestCase.prototype.testChars = function() {
	var result = haxe.util.StringExtensions.chars("foob");
	var iterator = result.iterator();
	this.assertEquals("f",iterator.next(),null,null,{ fileName : "StringExtensionsTestCase.hx", lineNumber : 43, className : "haxe.util.StringExtensionsTestCase", methodName : "testChars"});
	this.assertEquals("o",iterator.next(),null,null,{ fileName : "StringExtensionsTestCase.hx", lineNumber : 44, className : "haxe.util.StringExtensionsTestCase", methodName : "testChars"});
	this.assertEquals("o",iterator.next(),null,null,{ fileName : "StringExtensionsTestCase.hx", lineNumber : 45, className : "haxe.util.StringExtensionsTestCase", methodName : "testChars"});
	this.assertEquals("b",iterator.next(),null,null,{ fileName : "StringExtensionsTestCase.hx", lineNumber : 46, className : "haxe.util.StringExtensionsTestCase", methodName : "testChars"});
	this.assertFalse(iterator.hasNext(),null,{ fileName : "StringExtensionsTestCase.hx", lineNumber : 48, className : "haxe.util.StringExtensionsTestCase", methodName : "testChars"});
}
haxe.util.StringExtensionsTestCase.prototype.testChunk = function() {
	var result = haxe.util.StringExtensions.chunk("foobarblah",3);
	var iterator = result.iterator();
	this.assertEquals("foo",iterator.next(),null,null,{ fileName : "StringExtensionsTestCase.hx", lineNumber : 32, className : "haxe.util.StringExtensionsTestCase", methodName : "testChunk"});
	this.assertEquals("bar",iterator.next(),null,null,{ fileName : "StringExtensionsTestCase.hx", lineNumber : 33, className : "haxe.util.StringExtensionsTestCase", methodName : "testChunk"});
	this.assertEquals("bla",iterator.next(),null,null,{ fileName : "StringExtensionsTestCase.hx", lineNumber : 34, className : "haxe.util.StringExtensionsTestCase", methodName : "testChunk"});
	this.assertEquals("h",iterator.next(),null,null,{ fileName : "StringExtensionsTestCase.hx", lineNumber : 35, className : "haxe.util.StringExtensionsTestCase", methodName : "testChunk"});
}
haxe.util.StringExtensionsTestCase.prototype.testString = function() {
	this.assertEquals("foobar",haxe.util.StringExtensions.string(haxe.util.StringExtensions.chars("foobar")),null,null,{ fileName : "StringExtensionsTestCase.hx", lineNumber : 52, className : "haxe.util.StringExtensionsTestCase", methodName : "testString"});
}
haxe.util.StringExtensionsTestCase.prototype.__class__ = haxe.util.StringExtensionsTestCase;
if(!haxe.functional) haxe.functional = {}
haxe.functional.Foldable = function() { }
haxe.functional.Foldable.__name__ = ["haxe","functional","Foldable"];
haxe.functional.Foldable.prototype.append = null;
haxe.functional.Foldable.prototype.empty = null;
haxe.functional.Foldable.prototype.foldl = null;
haxe.functional.Foldable.prototype.__class__ = haxe.functional.Foldable;
if(!haxe.data) haxe.data = {}
if(!haxe.data.collections) haxe.data.collections = {}
haxe.data.collections.Collection = function() { }
haxe.data.collections.Collection.__name__ = ["haxe","data","collections","Collection"];
haxe.data.collections.Collection.prototype.add = null;
haxe.data.collections.Collection.prototype.addAll = null;
haxe.data.collections.Collection.prototype.contains = null;
haxe.data.collections.Collection.prototype.remove = null;
haxe.data.collections.Collection.prototype.removeAll = null;
haxe.data.collections.Collection.prototype.size = null;
haxe.data.collections.Collection.prototype.__class__ = haxe.data.collections.Collection;
haxe.data.collections.Collection.__interfaces__ = [haxe.functional.Foldable];
haxe.data.collections.List = function(order,equal,hash,show) { if( order === $_ ) return; {
	this._order = order;
	this._equal = equal;
	this._hash = hash;
	this._show = show;
}}
haxe.data.collections.List.__name__ = ["haxe","data","collections","List"];
haxe.data.collections.List.nil = function(order,equal,hash,show) {
	return new haxe.data.collections._List.Nil(order,equal,hash,show);
}
haxe.data.collections.List.create = function(order,equal,hash,show) {
	return haxe.data.collections.List.nil(order,equal,hash,show);
}
haxe.data.collections.List.factory = function(order,equal,hash,show) {
	return function() {
		return haxe.data.collections.List.create(order,equal,hash,show);
	}
}
haxe.data.collections.List.extract = function(v,e,order,equal,hash,show) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 4:
		var v1 = $e[2];
		{
			$r = haxe.data.collections.List.create(order,equal,hash,show).addAll(ArrayExtensions.map(v1,e));
		}break;
		default:{
			$r = Stax.error("Expected Array but was: " + v);
		}break;
		}
		return $r;
	}(this));
}
haxe.data.collections.List.prototype._equal = null;
haxe.data.collections.List.prototype._hash = null;
haxe.data.collections.List.prototype._order = null;
haxe.data.collections.List.prototype._show = null;
haxe.data.collections.List.prototype.add = function(t) {
	return this.foldr(haxe.data.collections.List.create(this._order,this._equal,this._hash,this._show).cons(t),function(b,a) {
		return a.cons(b);
	});
}
haxe.data.collections.List.prototype.addAll = function(i) {
	var a = [];
	{ var $it0 = i.iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
	a.push(e);
	}}
	a.reverse();
	var r = haxe.data.collections.List.create(this._order,this._equal,this._hash,this._show);
	{
		var _g = 0;
		while(_g < a.length) {
			var e = a[_g];
			++_g;
			r = r.cons(e);
		}
	}
	return this.foldr(r,function(b,a1) {
		return a1.cons(b);
	});
}
haxe.data.collections.List.prototype.append = function(b) {
	return this.add(b);
}
haxe.data.collections.List.prototype.compare = function(other) {
	return ArrayExtensions.compareWith(IterableExtensions.toArray(this),IterableExtensions.toArray(other),this.getOrder());
}
haxe.data.collections.List.prototype.concat = function(l) {
	return this.addAll(l);
}
haxe.data.collections.List.prototype.cons = function(head) {
	return new haxe.data.collections._List.Cons(this._order,this._equal,this._hash,this._show,head,this);
}
haxe.data.collections.List.prototype.contains = function(t) {
	var cur = this;
	var eq = this.getEqual();
	{
		var _g1 = 0, _g = this.size();
		while(_g1 < _g) {
			var i = _g1++;
			if(eq(t,cur.getHead())) return true;
			cur = cur.getTail();
		}
	}
	return false;
}
haxe.data.collections.List.prototype.decompose = function() {
	return ArrayExtensions.decompose(IterableExtensions.toArray(this));
}
haxe.data.collections.List.prototype.drop = function(n) {
	var cur = this;
	{
		var _g1 = 0, _g = IntExtensions.min(this.size(),n);
		while(_g1 < _g) {
			var i = _g1++;
			cur = cur.getTail();
		}
	}
	return cur;
}
haxe.data.collections.List.prototype.dropWhile = function(pred) {
	var cur = this;
	{
		var _g1 = 0, _g = this.size();
		while(_g1 < _g) {
			var i = _g1++;
			if(pred(cur.getHead())) return cur;
			cur = cur.getTail();
		}
	}
	return cur;
}
haxe.data.collections.List.prototype.empty = function() {
	return haxe.data.collections.List.nil();
}
haxe.data.collections.List.prototype.equal = null;
haxe.data.collections.List.prototype.equals = function(other) {
	return ArrayExtensions.equalsWith(IterableExtensions.toArray(this),IterableExtensions.toArray(other),this.getEqual());
}
haxe.data.collections.List.prototype.filter = function(f) {
	return this.foldr(haxe.data.collections.List.create(this._order,this._equal,this._hash,this._show),function(e,list) {
		return (f(e)?list.cons(e):list);
	});
}
haxe.data.collections.List.prototype.first = null;
haxe.data.collections.List.prototype.firstOption = null;
haxe.data.collections.List.prototype.flatMap = function(f) {
	return this.foldr(haxe.data.collections.List.create(),function(e,list) {
		return list.prependAll(f(e));
	});
}
haxe.data.collections.List.prototype.foldl = function(z,f) {
	var acc = z;
	var cur = this;
	{
		var _g1 = 0, _g = this.size();
		while(_g1 < _g) {
			var i = _g1++;
			acc = f(acc,cur.getHead());
			cur = cur.getTail();
		}
	}
	return acc;
}
haxe.data.collections.List.prototype.foldr = function(z,f) {
	var a = IterableExtensions.toArray(this);
	var acc = z;
	{
		var _g1 = 0, _g = this.size();
		while(_g1 < _g) {
			var i = _g1++;
			var e = a[(this.size() - 1) - i];
			acc = f(e,acc);
		}
	}
	return acc;
}
haxe.data.collections.List.prototype.gaps = function(f,equal) {
	return haxe.functional.FoldableExtensions.flatMapTo(this.zip(this.drop(1)),haxe.data.collections.List.nil(null,equal),function(tuple) {
		return f(tuple._1,tuple._2);
	});
}
haxe.data.collections.List.prototype.getEqual = function() {
	return (null == this._equal?(this.size() == 0?Stax.getEqualFor(null):this._equal = Stax.getEqualFor(this.getHead())):this._equal);
}
haxe.data.collections.List.prototype.getHash = function() {
	return (null == this._hash?(this.size() == 0?Stax.getHashFor(null):this._hash = Stax.getHashFor(this.getHead())):this._hash);
}
haxe.data.collections.List.prototype.getHead = function() {
	return Stax.error("List has no head element");
}
haxe.data.collections.List.prototype.getHeadOption = function() {
	return Option.None;
}
haxe.data.collections.List.prototype.getLast = function() {
	return Stax.error("List has no last element");
}
haxe.data.collections.List.prototype.getLastOption = function() {
	return Option.None;
}
haxe.data.collections.List.prototype.getOrder = function() {
	return (null == this._order?(this.size() == 0?Stax.getOrderFor(null):this._order = Stax.getOrderFor(this.getHead())):this._order);
}
haxe.data.collections.List.prototype.getShow = function() {
	return (null == this._show?(this.size() == 0?Stax.getShowFor(null):this._show = Stax.getShowFor(this.getHead())):this._show);
}
haxe.data.collections.List.prototype.getTail = function() {
	return Stax.error("List has no head");
}
haxe.data.collections.List.prototype.hash = null;
haxe.data.collections.List.prototype.hashCode = function() {
	var ha = this.getHash();
	return this.foldl(12289,function(a,b) {
		return a * (ha(b) + 12289);
	});
}
haxe.data.collections.List.prototype.head = null;
haxe.data.collections.List.prototype.headOption = null;
haxe.data.collections.List.prototype.iterator = function() {
	return haxe.functional.FoldableExtensions.iterator(this);
}
haxe.data.collections.List.prototype.last = null;
haxe.data.collections.List.prototype.lastOption = null;
haxe.data.collections.List.prototype.map = function(f) {
	return this.foldr(haxe.data.collections.List.create(),function(e,list) {
		return list.cons(f(e));
	});
}
haxe.data.collections.List.prototype.order = null;
haxe.data.collections.List.prototype.prepend = function(head) {
	return this.cons(head);
}
haxe.data.collections.List.prototype.prependAll = function(iterable) {
	var result = this;
	var array = IterableExtensions.toArray(iterable);
	array.reverse();
	{
		var _g = 0;
		while(_g < array.length) {
			var e = array[_g];
			++_g;
			result = result.cons(e);
		}
	}
	return result;
}
haxe.data.collections.List.prototype.prependAllR = function(iterable) {
	var result = this;
	{ var $it0 = iterable.iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
	result = result.cons(e);
	}}
	return result;
}
haxe.data.collections.List.prototype.remove = function(t) {
	var pre = [];
	var post = haxe.data.collections.List.nil(this._order,this._equal,this._hash,this._show);
	var cur = this;
	var eq = this.getEqual();
	{
		var _g1 = 0, _g = this.size();
		while(_g1 < _g) {
			var i = _g1++;
			if(eq(t,cur.getHead())) {
				post = cur.getTail();
				break;
			}
			else {
				pre.push(cur.getHead());
				cur = cur.getTail();
			}
		}
	}
	pre.reverse();
	var result = post;
	{
		var _g = 0;
		while(_g < pre.length) {
			var e = pre[_g];
			++_g;
			result = result.cons(e);
		}
	}
	return result;
}
haxe.data.collections.List.prototype.removeAll = function(i) {
	var r = this;
	{ var $it0 = i.iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
	r = r.remove(e);
	}}
	return r;
}
haxe.data.collections.List.prototype.reverse = function() {
	return this.foldl(haxe.data.collections.List.create(this._order,this._equal,this._hash,this._show),function(a,b) {
		return a.cons(b);
	});
}
haxe.data.collections.List.prototype.show = null;
haxe.data.collections.List.prototype.size = function() {
	return 0;
}
haxe.data.collections.List.prototype.sort = function() {
	var a = IterableExtensions.toArray(this);
	a.sort(this.getOrder());
	var result = haxe.data.collections.List.create(this._order,this._equal,this._hash,this._show);
	{
		var _g1 = 0, _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			result = result.cons(a[(a.length - 1) - i]);
		}
	}
	return result;
}
haxe.data.collections.List.prototype.tail = null;
haxe.data.collections.List.prototype.take = function(n) {
	return this.reverse().drop(this.size() - n);
}
haxe.data.collections.List.prototype.toString = function() {
	return "List " + ArrayExtensions.toStringWith(IterableExtensions.toArray(this),this.getShow());
}
haxe.data.collections.List.prototype.withEqualFunction = function(equal) {
	return haxe.data.collections.List.create(this._order,equal,this._hash,this._show).addAll(this);
}
haxe.data.collections.List.prototype.withHashFunction = function(hash) {
	return haxe.data.collections.List.create(this._order,this._equal,hash,this._show).addAll(this);
}
haxe.data.collections.List.prototype.withOrderFunction = function(order) {
	return haxe.data.collections.List.create(order,this._equal,this._hash,this._show).addAll(this);
}
haxe.data.collections.List.prototype.withShowFunction = function(show) {
	return haxe.data.collections.List.create(this._order,this._equal,this._hash,show).addAll(this);
}
haxe.data.collections.List.prototype.zip = function(that) {
	var len = IntExtensions.min(this.size(),that.size());
	var iterator1 = this.reverse().drop(IntExtensions.max(0,this.size() - len)).iterator();
	var iterator2 = that.reverse().drop(IntExtensions.max(0,that.size() - len)).iterator();
	var r = haxe.data.collections.List.create();
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			r = r.cons(Tuple2.create(iterator1.next(),iterator2.next()));
		}
	}
	return r;
}
haxe.data.collections.List.prototype.__class__ = haxe.data.collections.List;
haxe.data.collections.List.__interfaces__ = [haxe.data.collections.Collection];
if(!haxe.data.collections._List) haxe.data.collections._List = {}
haxe.data.collections._List.Cons = function(order,equal,hash,show,head,tail) { if( order === $_ ) return; {
	haxe.data.collections.List.apply(this,[order,equal,hash,show]);
	this._head = head;
	this._tail = tail;
	this._size = tail.size() + 1;
}}
haxe.data.collections._List.Cons.__name__ = ["haxe","data","collections","_List","Cons"];
haxe.data.collections._List.Cons.__super__ = haxe.data.collections.List;
for(var k in haxe.data.collections.List.prototype ) haxe.data.collections._List.Cons.prototype[k] = haxe.data.collections.List.prototype[k];
haxe.data.collections._List.Cons.prototype._head = null;
haxe.data.collections._List.Cons.prototype._size = null;
haxe.data.collections._List.Cons.prototype._tail = null;
haxe.data.collections._List.Cons.prototype.getHead = function() {
	return this._head;
}
haxe.data.collections._List.Cons.prototype.getHeadOption = function() {
	return Option.Some(this.getHead());
}
haxe.data.collections._List.Cons.prototype.getLast = function() {
	var cur = this;
	{
		var _g1 = 0, _g = (this.size() - 1);
		while(_g1 < _g) {
			var i = _g1++;
			cur = cur.getTail();
		}
	}
	return cur.getHead();
}
haxe.data.collections._List.Cons.prototype.getLastOption = function() {
	return Option.Some(this.getLast());
}
haxe.data.collections._List.Cons.prototype.getTail = function() {
	return this._tail;
}
haxe.data.collections._List.Cons.prototype.size = function() {
	return this._size;
}
haxe.data.collections._List.Cons.prototype.__class__ = haxe.data.collections._List.Cons;
haxe.data.collections._List.Nil = function(order,equal,hash,show) { if( order === $_ ) return; {
	haxe.data.collections.List.apply(this,[order,equal,hash,show]);
}}
haxe.data.collections._List.Nil.__name__ = ["haxe","data","collections","_List","Nil"];
haxe.data.collections._List.Nil.__super__ = haxe.data.collections.List;
for(var k in haxe.data.collections.List.prototype ) haxe.data.collections._List.Nil.prototype[k] = haxe.data.collections.List.prototype[k];
haxe.data.collections._List.Nil.prototype.__class__ = haxe.data.collections._List.Nil;
if(!haxe.data.transcode) haxe.data.transcode = {}
haxe.data.transcode.TranscodeJValueExtensionsTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
haxe.data.transcode.TranscodeJValueExtensionsTestCase.__name__ = ["haxe","data","transcode","TranscodeJValueExtensionsTestCase"];
haxe.data.transcode.TranscodeJValueExtensionsTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) haxe.data.transcode.TranscodeJValueExtensionsTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
haxe.data.transcode.TranscodeJValueExtensionsTestCase.prototype.doTest = function(values,valueType,extractors) {
	var _g = 0;
	while(_g < values.length) {
		var value = values[_g];
		++_g;
		if(valueType == null) valueType = Type["typeof"](value);
		var decomposed = (haxe.data.transcode.TranscodeJValue.getDecomposerFor(valueType))(value);
		var actual = (haxe.data.transcode.TranscodeJValue.getExtractorFor(valueType,extractors))(decomposed);
		var equal = (Stax.getEqualFor(value))(value,actual);
		if(!equal) {
			throw (("Expected " + value) + " but was ") + actual;
		}
		this.assertTrue(equal,null,{ fileName : "TranscodeJValueExtensionsTestCase.hx", lineNumber : 123, className : "haxe.data.transcode.TranscodeJValueExtensionsTestCase", methodName : "doTest"});
	}
}
haxe.data.transcode.TranscodeJValueExtensionsTestCase.prototype.testArray = function() {
	var a = [[123,9,-23],[]];
	this.doTest(a,null,[haxe.data.transcode.TranscodeJValue.getExtractorFor(ValueType.TInt)]);
}
haxe.data.transcode.TranscodeJValueExtensionsTestCase.prototype.testBool = function() {
	this.doTest([true,false]);
}
haxe.data.transcode.TranscodeJValueExtensionsTestCase.prototype.testDate = function() {
	this.doTest([Date.now(),Date.fromTime(0.0)]);
}
haxe.data.transcode.TranscodeJValueExtensionsTestCase.prototype.testEnum = function() {
	var a = [haxe.data.transcode.TestEnum.Second(123),haxe.data.transcode.TestEnum.First];
	this.doTest(a,null,[haxe.data.transcode.TranscodeJValue.getExtractorFor(ValueType.TInt)]);
}
haxe.data.transcode.TranscodeJValueExtensionsTestCase.prototype.testFloat = function() {
	this.doTest([0.25,0.5]);
}
haxe.data.transcode.TranscodeJValueExtensionsTestCase.prototype.testInt = function() {
	this.doTest([-1234,9231]);
}
haxe.data.transcode.TranscodeJValueExtensionsTestCase.prototype.testJValue = function() {
	var a = [haxe.text.json.JValue.JNull,haxe.text.json.JValue.JString("foo"),haxe.text.json.JValue.JNumber(123.0),haxe.text.json.JValue.JBool(false),haxe.text.json.JValue.JObject([haxe.text.json.JValue.JField("foo",haxe.text.json.JValue.JString("bar"))]),haxe.text.json.JValue.JArray([haxe.text.json.JValue.JNull,haxe.text.json.JValue.JString("baz")])];
	this.doTest(a);
}
haxe.data.transcode.TranscodeJValueExtensionsTestCase.prototype.testList = function() {
	var a = [haxe.data.collections.List.create().addAll([123,9,-23]),haxe.data.collections.List.create()];
	this.doTest(a,ValueType.TClass(haxe.data.collections.List),[haxe.data.transcode.TranscodeJValue.getExtractorFor(ValueType.TInt)]);
}
haxe.data.transcode.TranscodeJValueExtensionsTestCase.prototype.testMap = function() {
	var a = [haxe.data.collections.Map.create().addAll([Tuple2.create(123,"foo"),Tuple2.create(-23,"bar"),Tuple2.create(0,"baz")]),haxe.data.collections.Map.create()];
	this.doTest(a,null,[haxe.data.transcode.TranscodeJValue.getExtractorFor(ValueType.TInt),haxe.data.transcode.TranscodeJValue.getExtractorFor(ValueType.TClass(String))]);
}
haxe.data.transcode.TranscodeJValueExtensionsTestCase.prototype.testOption = function() {
	var a = [Option.Some(123),Option.None];
	this.doTest(a,null,[haxe.data.transcode.TranscodeJValue.getExtractorFor(ValueType.TInt)]);
}
haxe.data.transcode.TranscodeJValueExtensionsTestCase.prototype.testSet = function() {
	var a = [haxe.data.collections.Set.create().addAll([123,9,-23]),haxe.data.collections.Set.create()];
	this.doTest(a,null,[haxe.data.transcode.TranscodeJValue.getExtractorFor(ValueType.TInt)]);
}
haxe.data.transcode.TranscodeJValueExtensionsTestCase.prototype.testString = function() {
	this.doTest(["boo","baz"]);
}
haxe.data.transcode.TranscodeJValueExtensionsTestCase.prototype.testTuple2 = function() {
	var a = [Tuple2.create(123,"foo"),Tuple2.create(0,"bar")];
	this.doTest(a,null,[haxe.data.transcode.TranscodeJValue.getExtractorFor(ValueType.TInt),haxe.data.transcode.TranscodeJValue.getExtractorFor(ValueType.TClass(String))]);
}
haxe.data.transcode.TranscodeJValueExtensionsTestCase.prototype.testTuple3 = function() {
	var a = [Tuple3.create(123,"foo",true),Tuple3.create(0,"bar",false)];
	this.doTest(a,null,[haxe.data.transcode.TranscodeJValue.getExtractorFor(ValueType.TInt),haxe.data.transcode.TranscodeJValue.getExtractorFor(ValueType.TClass(String)),haxe.data.transcode.TranscodeJValue.getExtractorFor(ValueType.TBool)]);
}
haxe.data.transcode.TranscodeJValueExtensionsTestCase.prototype.testTuple4 = function() {
	var a = [Tuple4.create(123,"foo",true,0.25),Tuple4.create(0,"bar",false,0.5)];
	this.doTest(a,null,[haxe.data.transcode.TranscodeJValue.getExtractorFor(ValueType.TInt),haxe.data.transcode.TranscodeJValue.getExtractorFor(ValueType.TClass(String)),haxe.data.transcode.TranscodeJValue.getExtractorFor(ValueType.TBool),haxe.data.transcode.TranscodeJValue.getExtractorFor(ValueType.TFloat)]);
}
haxe.data.transcode.TranscodeJValueExtensionsTestCase.prototype.testTuple5 = function() {
	var a = [Tuple5.create(123,"foo",true,0.25,"biz"),Tuple5.create(0,"bar",false,0.5,"bop")];
	this.doTest(a,null,[haxe.data.transcode.TranscodeJValue.getExtractorFor(ValueType.TInt),haxe.data.transcode.TranscodeJValue.getExtractorFor(ValueType.TClass(String)),haxe.data.transcode.TranscodeJValue.getExtractorFor(ValueType.TBool),haxe.data.transcode.TranscodeJValue.getExtractorFor(ValueType.TFloat),haxe.data.transcode.TranscodeJValue.getExtractorFor(ValueType.TClass(String))]);
}
haxe.data.transcode.TranscodeJValueExtensionsTestCase.prototype.__class__ = haxe.data.transcode.TranscodeJValueExtensionsTestCase;
haxe.data.transcode.TestEnum = { __ename__ : ["haxe","data","transcode","TestEnum"], __constructs__ : ["First","Second"] }
haxe.data.transcode.TestEnum.First = ["First",0];
haxe.data.transcode.TestEnum.First.toString = $estr;
haxe.data.transcode.TestEnum.First.__enum__ = haxe.data.transcode.TestEnum;
haxe.data.transcode.TestEnum.Second = function(v) { var $x = ["Second",1,v]; $x.__enum__ = haxe.data.transcode.TestEnum; $x.toString = $estr; return $x; }
List = function(p) { if( p === $_ ) return; {
	this.length = 0;
}}
List.__name__ = ["List"];
List.prototype.add = function(item) {
	var x = [item];
	if(this.h == null) this.h = x;
	else this.q[1] = x;
	this.q = x;
	this.length++;
}
List.prototype.clear = function() {
	this.h = null;
	this.q = null;
	this.length = 0;
}
List.prototype.filter = function(f) {
	var l2 = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		if(f(v)) l2.add(v);
	}
	return l2;
}
List.prototype.first = function() {
	return (this.h == null?null:this.h[0]);
}
List.prototype.h = null;
List.prototype.isEmpty = function() {
	return (this.h == null);
}
List.prototype.iterator = function() {
	return { h : this.h, hasNext : function() {
		return (this.h != null);
	}, next : function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		return x;
	}}
}
List.prototype.join = function(sep) {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	while(l != null) {
		if(first) first = false;
		else s.b[s.b.length] = sep;
		s.b[s.b.length] = l[0];
		l = l[1];
	}
	return s.b.join("");
}
List.prototype.last = function() {
	return (this.q == null?null:this.q[0]);
}
List.prototype.length = null;
List.prototype.map = function(f) {
	var b = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		b.add(f(v));
	}
	return b;
}
List.prototype.pop = function() {
	if(this.h == null) return null;
	var x = this.h[0];
	this.h = this.h[1];
	if(this.h == null) this.q = null;
	this.length--;
	return x;
}
List.prototype.push = function(item) {
	var x = [item,this.h];
	this.h = x;
	if(this.q == null) this.q = x;
	this.length++;
}
List.prototype.q = null;
List.prototype.remove = function(v) {
	var prev = null;
	var l = this.h;
	while(l != null) {
		if(l[0] == v) {
			if(prev == null) this.h = l[1];
			else prev[1] = l[1];
			if(this.q == l) this.q = prev;
			this.length--;
			return true;
		}
		prev = l;
		l = l[1];
	}
	return false;
}
List.prototype.toString = function() {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	s.b[s.b.length] = "{";
	while(l != null) {
		if(first) first = false;
		else s.b[s.b.length] = ", ";
		s.b[s.b.length] = Std.string(l[0]);
		l = l[1];
	}
	s.b[s.b.length] = "}";
	return s.b.join("");
}
List.prototype.__class__ = List;
haxe.test.Must = function() { }
haxe.test.Must.__name__ = ["haxe","test","Must"];
haxe.test.Must.equal = function(expected,equal) {
	if(equal == null) equal = Stax.getEqualFor(expected);
	return function(value) {
		var result = { assertion : "x == " + value, negation : "x != " + value}
		return (!equal(value,expected)?Either.Left(result):Either.Right(result));
	}
}
haxe.test.Must.beTrue = function() {
	return function(value) {
		var result = { assertion : "x == true", negation : "x == false"}
		return (!value?Either.Left(result):Either.Right(result));
	}
}
haxe.test.Must.beFalse = function() {
	return function(value) {
		var result = { assertion : "x == false", negation : "x == true"}
		return (value?Either.Left(result):Either.Right(result));
	}
}
haxe.test.Must.beGreaterThan = function(ref) {
	return function(value) {
		var result = { assertion : "x > " + ref, negation : "x <= " + ref}
		return (value <= ref?Either.Left(result):Either.Right(result));
	}
}
haxe.test.Must.beLessThan = function(ref) {
	return function(value) {
		var result = { assertion : "x < " + ref, negation : "x >= " + ref}
		return (value >= ref?Either.Left(result):Either.Right(result));
	}
}
haxe.test.Must.beGreaterThanInt = function(ref) {
	return function(value) {
		var result = { assertion : "x > " + ref, negation : "x <= " + ref}
		return (value <= ref?Either.Left(result):Either.Right(result));
	}
}
haxe.test.Must.beLessThanInt = function(ref) {
	return function(value) {
		var result = { assertion : "x < " + ref, negation : "x >= " + ref}
		return (value >= ref?Either.Left(result):Either.Right(result));
	}
}
haxe.test.Must.haveLength = function(length) {
	return function(value) {
		var len = 0;
		{ var $it0 = value.iterator();
		while( $it0.hasNext() ) { var e = $it0.next();
		++len;
		}}
		var result = { assertion : "x.length == " + length, negation : "x.length != " + length}
		return (len != length?Either.Left(result):Either.Right(result));
	}
}
haxe.test.Must.haveClass = function(c) {
	return function(value) {
		var result = { assertion : ("x.isInstanceOf(" + Type.getClassName(c)) + ")", negation : ("!x.isInstanceOf(" + Type.getClassName(c)) + ")"}
		return (!Std["is"](value,c)?Either.Left(result):Either.Right(result));
	}
}
haxe.test.Must.containElement = function(element) {
	return function(c) {
		var result = { assertion : ("x.contains(" + element) + ")", negation : ("!x.contains(" + element) + ")"}
		return (!c.contains(element)?Either.Left(result):Either.Right(result));
	}
}
haxe.test.Must.containString = function(sub) {
	return function(value) {
		var result = { assertion : ("x.contains(\"" + sub) + "\")", negation : ("!x.contains(\"" + sub) + "\")"}
		return (!StringExtensions.contains(value,sub)?Either.Left(result):Either.Right(result));
	}
}
haxe.test.Must.startWithString = function(s) {
	return function(value) {
		var result = { assertion : ("x.startsWith(\"" + s) + "\")", negation : ("!x.startsWith(\"" + s) + "\")"}
		return (!StringExtensions.startsWith(value,s)?Either.Left(result):Either.Right(result));
	}
}
haxe.test.Must.endWithString = function(s) {
	return function(value) {
		var result = { assertion : ("x.endsWith(\"" + s) + "\")", negation : ("!x.endsWith(\"" + s) + "\")"}
		return (!StringExtensions.endsWith(value,s)?Either.Left(result):Either.Right(result));
	}
}
haxe.test.Must.beNull = function() {
	return function(value) {
		var result = { assertion : "x == null", negation : "x != null"}
		return (value != null?Either.Left(result):Either.Right(result));
	}
}
haxe.test.Must.beNonNull = function() {
	return function(value) {
		var result = { assertion : "x != null", negation : "x == null"}
		return (value == null?Either.Left(result):Either.Right(result));
	}
}
haxe.test.Must.prototype.__class__ = haxe.test.Must;
if(!haxe.text) haxe.text = {}
if(!haxe.text.json) haxe.text.json = {}
haxe.text.json.JsonGenerator = function() { }
haxe.text.json.JsonGenerator.__name__ = ["haxe","text","json","JsonGenerator"];
haxe.text.json.JsonGenerator.generate = function() {
	var x = Math.random();
	if(x < 1.0 / 6.0) return haxe.text.json.JValue.JNull;
	else if(x < 2.0 / 6.0) return haxe.text.json.JsonGenerator.generateBoolean();
	else if(x < 3.0 / 6.0) return haxe.text.json.JsonGenerator.generateNumber();
	else if(x < 4.0 / 6.0) return haxe.text.json.JsonGenerator.generateString();
	else if(x < 5.0 / 6.0) return haxe.text.json.JsonGenerator.generateArray();
	else return haxe.text.json.JsonGenerator.generateObject();
}
haxe.text.json.JsonGenerator.generateBoolean = function() {
	return haxe.text.json.JValue.JBool(Math.random() < 0.5);
}
haxe.text.json.JsonGenerator.generateNumber = function() {
	return haxe.text.json.JValue.JNumber(Math.exp(Math.random() - 0.5) * Math.log(1.0e36) - Math.exp(Math.random() - 0.5) * Math.log(1.0e36));
}
haxe.text.json.JsonGenerator.generateString = function(length) {
	if(length == null) length = 0;
	var s = "";
	if(length > 0) {
		var _g = 0;
		while(_g < length) {
			var i = _g++;
			s += String.fromCharCode(Math.floor(Math.random() * ((Math.random() < 0.5?128:65536))));
		}
	}
	else while(Math.random() < 0.9) s += String.fromCharCode(Math.floor(Math.random() * ((Math.random() < 0.5?128:65536))));
	return haxe.text.json.JValue.JString(s);
}
haxe.text.json.JsonGenerator.generateArray = function() {
	var xs = [];
	while(Math.random() < 0.5) xs.push(haxe.text.json.JsonGenerator.generate());
	return haxe.text.json.JValue.JArray(xs);
}
haxe.text.json.JsonGenerator.generateObject = function() {
	var h = new Array();
	while(Math.random() < 0.5) h.push(haxe.text.json.JValue.JField(haxe.text.json.JValueExtensions.extractString(haxe.text.json.JsonGenerator.generateString()),haxe.text.json.JsonGenerator.generate()));
	return haxe.text.json.JValue.JObject(h);
}
haxe.text.json.JsonGenerator.prototype.__class__ = haxe.text.json.JsonGenerator;
IntIter = function(min,max) { if( min === $_ ) return; {
	this.min = min;
	this.max = max;
}}
IntIter.__name__ = ["IntIter"];
IntIter.prototype.hasNext = function() {
	return this.min < this.max;
}
IntIter.prototype.max = null;
IntIter.prototype.min = null;
IntIter.prototype.next = function() {
	return this.min++;
}
IntIter.prototype.__class__ = IntIter;
haxe.test.MustMatcherExtensions = function() { }
haxe.test.MustMatcherExtensions.__name__ = ["haxe","test","MustMatcherExtensions"];
haxe.test.MustMatcherExtensions.negate = function(c) {
	var inverter = function(result) {
		return { assertion : result.negation, negation : result.assertion}
	}
	return function(value) {
		return EitherExtensions.map(c(value),inverter,inverter);
	}
}
haxe.test.MustMatcherExtensions.or = function(c1,c2) {
	var transformer = function(r1,r2) {
		return { assertion : ((("(" + r1.assertion) + ") || (") + r2.assertion) + ")", negation : ((("(" + r1.negation) + ") && (") + r2.negation) + ")"}
	}
	return function(value) {
		return EitherExtensions.composeRight(c1(value),c2(value),transformer,transformer);
	}
}
haxe.test.MustMatcherExtensions.and = function(c1,c2) {
	var transformer = function(r1,r2) {
		return { assertion : ((("(" + r1.assertion) + ") && (") + r2.assertion) + ")", negation : ((("(" + r1.negation) + ") || (") + r2.negation) + ")"}
	}
	return function(value) {
		return EitherExtensions.composeLeft(c1(value),c2(value),transformer,transformer);
	}
}
haxe.test.MustMatcherExtensions.prototype.__class__ = haxe.test.MustMatcherExtensions;
haxe.test.ui.common.ReportTools = function() { }
haxe.test.ui.common.ReportTools.__name__ = ["haxe","test","ui","common","ReportTools"];
haxe.test.ui.common.ReportTools.hasHeader = function(report,stats) {
	var $e = (report.displayHeader);
	switch( $e[1] ) {
	case 1:
	{
		return false;
	}break;
	case 2:
	{
		if(!stats.isOk) return true;
		var $e = (report.displaySuccessResults);
		switch( $e[1] ) {
		case 1:
		{
			return false;
		}break;
		case 0:
		case 2:
		{
			return true;
		}break;
		}
	}break;
	case 0:
	{
		return true;
	}break;
	}
}
haxe.test.ui.common.ReportTools.skipResult = function(report,stats,isOk) {
	if(!stats.isOk) return false;
	return (function($this) {
		var $r;
		var $e = (report.displaySuccessResults);
		switch( $e[1] ) {
		case 1:
		{
			$r = true;
		}break;
		case 0:
		{
			$r = false;
		}break;
		case 2:
		{
			$r = !isOk;
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
haxe.test.ui.common.ReportTools.hasOutput = function(report,stats) {
	if(!stats.isOk) return true;
	return haxe.test.ui.common.ReportTools.hasHeader(report,stats);
}
haxe.test.ui.common.ReportTools.prototype.__class__ = haxe.test.ui.common.ReportTools;
Hash = function(p) { if( p === $_ ) return; {
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
	else null;
}}
Hash.__name__ = ["Hash"];
Hash.prototype.exists = function(key) {
	try {
		key = "$" + key;
		return this.hasOwnProperty.call(this.h,key);
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				
				for(var i in this.h)
					if( i == key ) return true;
			;
				return false;
			}
		}
	}
}
Hash.prototype.get = function(key) {
	return this.h["$" + key];
}
Hash.prototype.h = null;
Hash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref["$" + i];
	}}
}
Hash.prototype.keys = function() {
	var a = new Array();
	
			for(var i in this.h)
				a.push(i.substr(1));
		;
	return a.iterator();
}
Hash.prototype.remove = function(key) {
	if(!this.exists(key)) return false;
	delete(this.h["$" + key]);
	return true;
}
Hash.prototype.set = function(key,value) {
	this.h["$" + key] = value;
}
Hash.prototype.toString = function() {
	var s = new StringBuf();
	s.b[s.b.length] = "{";
	var it = this.keys();
	{ var $it0 = it;
	while( $it0.hasNext() ) { var i = $it0.next();
	{
		s.b[s.b.length] = i;
		s.b[s.b.length] = " => ";
		s.b[s.b.length] = Std.string(this.get(i));
		if(it.hasNext()) s.b[s.b.length] = ", ";
	}
	}}
	s.b[s.b.length] = "}";
	return s.b.join("");
}
Hash.prototype.__class__ = Hash;
if(!haxe.net) haxe.net = {}
haxe.net.HttpInformational = { __ename__ : ["haxe","net","HttpInformational"], __constructs__ : ["Continue","SwitchingProtocols","Processing"] }
haxe.net.HttpInformational.Continue = ["Continue",0];
haxe.net.HttpInformational.Continue.toString = $estr;
haxe.net.HttpInformational.Continue.__enum__ = haxe.net.HttpInformational;
haxe.net.HttpInformational.Processing = ["Processing",2];
haxe.net.HttpInformational.Processing.toString = $estr;
haxe.net.HttpInformational.Processing.__enum__ = haxe.net.HttpInformational;
haxe.net.HttpInformational.SwitchingProtocols = ["SwitchingProtocols",1];
haxe.net.HttpInformational.SwitchingProtocols.toString = $estr;
haxe.net.HttpInformational.SwitchingProtocols.__enum__ = haxe.net.HttpInformational;
haxe.net.HttpSuccess = { __ename__ : ["haxe","net","HttpSuccess"], __constructs__ : ["OK","Created","Accepted","Non","NoContent","ResetContent","PartialContent","Multi"] }
haxe.net.HttpSuccess.Accepted = ["Accepted",2];
haxe.net.HttpSuccess.Accepted.toString = $estr;
haxe.net.HttpSuccess.Accepted.__enum__ = haxe.net.HttpSuccess;
haxe.net.HttpSuccess.Created = ["Created",1];
haxe.net.HttpSuccess.Created.toString = $estr;
haxe.net.HttpSuccess.Created.__enum__ = haxe.net.HttpSuccess;
haxe.net.HttpSuccess.Multi = ["Multi",7];
haxe.net.HttpSuccess.Multi.toString = $estr;
haxe.net.HttpSuccess.Multi.__enum__ = haxe.net.HttpSuccess;
haxe.net.HttpSuccess.NoContent = ["NoContent",4];
haxe.net.HttpSuccess.NoContent.toString = $estr;
haxe.net.HttpSuccess.NoContent.__enum__ = haxe.net.HttpSuccess;
haxe.net.HttpSuccess.Non = ["Non",3];
haxe.net.HttpSuccess.Non.toString = $estr;
haxe.net.HttpSuccess.Non.__enum__ = haxe.net.HttpSuccess;
haxe.net.HttpSuccess.OK = ["OK",0];
haxe.net.HttpSuccess.OK.toString = $estr;
haxe.net.HttpSuccess.OK.__enum__ = haxe.net.HttpSuccess;
haxe.net.HttpSuccess.PartialContent = ["PartialContent",6];
haxe.net.HttpSuccess.PartialContent.toString = $estr;
haxe.net.HttpSuccess.PartialContent.__enum__ = haxe.net.HttpSuccess;
haxe.net.HttpSuccess.ResetContent = ["ResetContent",5];
haxe.net.HttpSuccess.ResetContent.toString = $estr;
haxe.net.HttpSuccess.ResetContent.__enum__ = haxe.net.HttpSuccess;
haxe.net.HttpRedirection = { __ename__ : ["haxe","net","HttpRedirection"], __constructs__ : ["MultipleChoices","MovedPermanently","Found","SeeOther","NotModified","UseProxy","TemporaryRedirect"] }
haxe.net.HttpRedirection.Found = ["Found",2];
haxe.net.HttpRedirection.Found.toString = $estr;
haxe.net.HttpRedirection.Found.__enum__ = haxe.net.HttpRedirection;
haxe.net.HttpRedirection.MovedPermanently = ["MovedPermanently",1];
haxe.net.HttpRedirection.MovedPermanently.toString = $estr;
haxe.net.HttpRedirection.MovedPermanently.__enum__ = haxe.net.HttpRedirection;
haxe.net.HttpRedirection.MultipleChoices = ["MultipleChoices",0];
haxe.net.HttpRedirection.MultipleChoices.toString = $estr;
haxe.net.HttpRedirection.MultipleChoices.__enum__ = haxe.net.HttpRedirection;
haxe.net.HttpRedirection.NotModified = ["NotModified",4];
haxe.net.HttpRedirection.NotModified.toString = $estr;
haxe.net.HttpRedirection.NotModified.__enum__ = haxe.net.HttpRedirection;
haxe.net.HttpRedirection.SeeOther = ["SeeOther",3];
haxe.net.HttpRedirection.SeeOther.toString = $estr;
haxe.net.HttpRedirection.SeeOther.__enum__ = haxe.net.HttpRedirection;
haxe.net.HttpRedirection.TemporaryRedirect = ["TemporaryRedirect",6];
haxe.net.HttpRedirection.TemporaryRedirect.toString = $estr;
haxe.net.HttpRedirection.TemporaryRedirect.__enum__ = haxe.net.HttpRedirection;
haxe.net.HttpRedirection.UseProxy = ["UseProxy",5];
haxe.net.HttpRedirection.UseProxy.toString = $estr;
haxe.net.HttpRedirection.UseProxy.__enum__ = haxe.net.HttpRedirection;
haxe.net.HttpClientError = { __ename__ : ["haxe","net","HttpClientError"], __constructs__ : ["BadRequest","Unauthorized","PaymentRequired","Forbidden","NotFound","MethodNotAllowed","NotAcceptable","ProxyAuthenticationRequired","RequestTimeout","Conflict","Gone","LengthRequired","PreconditionFailed","RequestEntityTooLarge","Request","UnsupportedMediaType","RequestedRangeNotSatisfiable","ExpectationFailed","TooManyConnections","UnprocessableEntity","Locked","FailedDependency","UnorderedCollection","UpgradeRequired","RetryWith"] }
haxe.net.HttpClientError.BadRequest = ["BadRequest",0];
haxe.net.HttpClientError.BadRequest.toString = $estr;
haxe.net.HttpClientError.BadRequest.__enum__ = haxe.net.HttpClientError;
haxe.net.HttpClientError.Conflict = ["Conflict",9];
haxe.net.HttpClientError.Conflict.toString = $estr;
haxe.net.HttpClientError.Conflict.__enum__ = haxe.net.HttpClientError;
haxe.net.HttpClientError.ExpectationFailed = ["ExpectationFailed",17];
haxe.net.HttpClientError.ExpectationFailed.toString = $estr;
haxe.net.HttpClientError.ExpectationFailed.__enum__ = haxe.net.HttpClientError;
haxe.net.HttpClientError.FailedDependency = ["FailedDependency",21];
haxe.net.HttpClientError.FailedDependency.toString = $estr;
haxe.net.HttpClientError.FailedDependency.__enum__ = haxe.net.HttpClientError;
haxe.net.HttpClientError.Forbidden = ["Forbidden",3];
haxe.net.HttpClientError.Forbidden.toString = $estr;
haxe.net.HttpClientError.Forbidden.__enum__ = haxe.net.HttpClientError;
haxe.net.HttpClientError.Gone = ["Gone",10];
haxe.net.HttpClientError.Gone.toString = $estr;
haxe.net.HttpClientError.Gone.__enum__ = haxe.net.HttpClientError;
haxe.net.HttpClientError.LengthRequired = ["LengthRequired",11];
haxe.net.HttpClientError.LengthRequired.toString = $estr;
haxe.net.HttpClientError.LengthRequired.__enum__ = haxe.net.HttpClientError;
haxe.net.HttpClientError.Locked = ["Locked",20];
haxe.net.HttpClientError.Locked.toString = $estr;
haxe.net.HttpClientError.Locked.__enum__ = haxe.net.HttpClientError;
haxe.net.HttpClientError.MethodNotAllowed = ["MethodNotAllowed",5];
haxe.net.HttpClientError.MethodNotAllowed.toString = $estr;
haxe.net.HttpClientError.MethodNotAllowed.__enum__ = haxe.net.HttpClientError;
haxe.net.HttpClientError.NotAcceptable = ["NotAcceptable",6];
haxe.net.HttpClientError.NotAcceptable.toString = $estr;
haxe.net.HttpClientError.NotAcceptable.__enum__ = haxe.net.HttpClientError;
haxe.net.HttpClientError.NotFound = ["NotFound",4];
haxe.net.HttpClientError.NotFound.toString = $estr;
haxe.net.HttpClientError.NotFound.__enum__ = haxe.net.HttpClientError;
haxe.net.HttpClientError.PaymentRequired = ["PaymentRequired",2];
haxe.net.HttpClientError.PaymentRequired.toString = $estr;
haxe.net.HttpClientError.PaymentRequired.__enum__ = haxe.net.HttpClientError;
haxe.net.HttpClientError.PreconditionFailed = ["PreconditionFailed",12];
haxe.net.HttpClientError.PreconditionFailed.toString = $estr;
haxe.net.HttpClientError.PreconditionFailed.__enum__ = haxe.net.HttpClientError;
haxe.net.HttpClientError.ProxyAuthenticationRequired = ["ProxyAuthenticationRequired",7];
haxe.net.HttpClientError.ProxyAuthenticationRequired.toString = $estr;
haxe.net.HttpClientError.ProxyAuthenticationRequired.__enum__ = haxe.net.HttpClientError;
haxe.net.HttpClientError.Request = ["Request",14];
haxe.net.HttpClientError.Request.toString = $estr;
haxe.net.HttpClientError.Request.__enum__ = haxe.net.HttpClientError;
haxe.net.HttpClientError.RequestEntityTooLarge = ["RequestEntityTooLarge",13];
haxe.net.HttpClientError.RequestEntityTooLarge.toString = $estr;
haxe.net.HttpClientError.RequestEntityTooLarge.__enum__ = haxe.net.HttpClientError;
haxe.net.HttpClientError.RequestTimeout = ["RequestTimeout",8];
haxe.net.HttpClientError.RequestTimeout.toString = $estr;
haxe.net.HttpClientError.RequestTimeout.__enum__ = haxe.net.HttpClientError;
haxe.net.HttpClientError.RequestedRangeNotSatisfiable = ["RequestedRangeNotSatisfiable",16];
haxe.net.HttpClientError.RequestedRangeNotSatisfiable.toString = $estr;
haxe.net.HttpClientError.RequestedRangeNotSatisfiable.__enum__ = haxe.net.HttpClientError;
haxe.net.HttpClientError.RetryWith = ["RetryWith",24];
haxe.net.HttpClientError.RetryWith.toString = $estr;
haxe.net.HttpClientError.RetryWith.__enum__ = haxe.net.HttpClientError;
haxe.net.HttpClientError.TooManyConnections = ["TooManyConnections",18];
haxe.net.HttpClientError.TooManyConnections.toString = $estr;
haxe.net.HttpClientError.TooManyConnections.__enum__ = haxe.net.HttpClientError;
haxe.net.HttpClientError.Unauthorized = ["Unauthorized",1];
haxe.net.HttpClientError.Unauthorized.toString = $estr;
haxe.net.HttpClientError.Unauthorized.__enum__ = haxe.net.HttpClientError;
haxe.net.HttpClientError.UnorderedCollection = ["UnorderedCollection",22];
haxe.net.HttpClientError.UnorderedCollection.toString = $estr;
haxe.net.HttpClientError.UnorderedCollection.__enum__ = haxe.net.HttpClientError;
haxe.net.HttpClientError.UnprocessableEntity = ["UnprocessableEntity",19];
haxe.net.HttpClientError.UnprocessableEntity.toString = $estr;
haxe.net.HttpClientError.UnprocessableEntity.__enum__ = haxe.net.HttpClientError;
haxe.net.HttpClientError.UnsupportedMediaType = ["UnsupportedMediaType",15];
haxe.net.HttpClientError.UnsupportedMediaType.toString = $estr;
haxe.net.HttpClientError.UnsupportedMediaType.__enum__ = haxe.net.HttpClientError;
haxe.net.HttpClientError.UpgradeRequired = ["UpgradeRequired",23];
haxe.net.HttpClientError.UpgradeRequired.toString = $estr;
haxe.net.HttpClientError.UpgradeRequired.__enum__ = haxe.net.HttpClientError;
haxe.net.HttpServerError = { __ename__ : ["haxe","net","HttpServerError"], __constructs__ : ["InternalServerError","NotImplemented","BadGateway","ServiceUnavailable","GatewayTimeout","HTTPVersionNotSupported","VariantAlsoNegotiates","InsufficientStorage","BandwidthLimitExceeded","NotExtended","UserAccessDenied"] }
haxe.net.HttpServerError.BadGateway = ["BadGateway",2];
haxe.net.HttpServerError.BadGateway.toString = $estr;
haxe.net.HttpServerError.BadGateway.__enum__ = haxe.net.HttpServerError;
haxe.net.HttpServerError.BandwidthLimitExceeded = ["BandwidthLimitExceeded",8];
haxe.net.HttpServerError.BandwidthLimitExceeded.toString = $estr;
haxe.net.HttpServerError.BandwidthLimitExceeded.__enum__ = haxe.net.HttpServerError;
haxe.net.HttpServerError.GatewayTimeout = ["GatewayTimeout",4];
haxe.net.HttpServerError.GatewayTimeout.toString = $estr;
haxe.net.HttpServerError.GatewayTimeout.__enum__ = haxe.net.HttpServerError;
haxe.net.HttpServerError.HTTPVersionNotSupported = ["HTTPVersionNotSupported",5];
haxe.net.HttpServerError.HTTPVersionNotSupported.toString = $estr;
haxe.net.HttpServerError.HTTPVersionNotSupported.__enum__ = haxe.net.HttpServerError;
haxe.net.HttpServerError.InsufficientStorage = ["InsufficientStorage",7];
haxe.net.HttpServerError.InsufficientStorage.toString = $estr;
haxe.net.HttpServerError.InsufficientStorage.__enum__ = haxe.net.HttpServerError;
haxe.net.HttpServerError.InternalServerError = ["InternalServerError",0];
haxe.net.HttpServerError.InternalServerError.toString = $estr;
haxe.net.HttpServerError.InternalServerError.__enum__ = haxe.net.HttpServerError;
haxe.net.HttpServerError.NotExtended = ["NotExtended",9];
haxe.net.HttpServerError.NotExtended.toString = $estr;
haxe.net.HttpServerError.NotExtended.__enum__ = haxe.net.HttpServerError;
haxe.net.HttpServerError.NotImplemented = ["NotImplemented",1];
haxe.net.HttpServerError.NotImplemented.toString = $estr;
haxe.net.HttpServerError.NotImplemented.__enum__ = haxe.net.HttpServerError;
haxe.net.HttpServerError.ServiceUnavailable = ["ServiceUnavailable",3];
haxe.net.HttpServerError.ServiceUnavailable.toString = $estr;
haxe.net.HttpServerError.ServiceUnavailable.__enum__ = haxe.net.HttpServerError;
haxe.net.HttpServerError.UserAccessDenied = ["UserAccessDenied",10];
haxe.net.HttpServerError.UserAccessDenied.toString = $estr;
haxe.net.HttpServerError.UserAccessDenied.__enum__ = haxe.net.HttpServerError;
haxe.net.HttpServerError.VariantAlsoNegotiates = ["VariantAlsoNegotiates",6];
haxe.net.HttpServerError.VariantAlsoNegotiates.toString = $estr;
haxe.net.HttpServerError.VariantAlsoNegotiates.__enum__ = haxe.net.HttpServerError;
haxe.net.HttpNormal = { __ename__ : ["haxe","net","HttpNormal"], __constructs__ : ["Informational","Success","Redirection"] }
haxe.net.HttpNormal.Informational = function(v) { var $x = ["Informational",0,v]; $x.__enum__ = haxe.net.HttpNormal; $x.toString = $estr; return $x; }
haxe.net.HttpNormal.Redirection = function(v) { var $x = ["Redirection",2,v]; $x.__enum__ = haxe.net.HttpNormal; $x.toString = $estr; return $x; }
haxe.net.HttpNormal.Success = function(v) { var $x = ["Success",1,v]; $x.__enum__ = haxe.net.HttpNormal; $x.toString = $estr; return $x; }
haxe.net.HttpError = { __ename__ : ["haxe","net","HttpError"], __constructs__ : ["Client","Server"] }
haxe.net.HttpError.Client = function(v) { var $x = ["Client",0,v]; $x.__enum__ = haxe.net.HttpError; $x.toString = $estr; return $x; }
haxe.net.HttpError.Server = function(v) { var $x = ["Server",1,v]; $x.__enum__ = haxe.net.HttpError; $x.toString = $estr; return $x; }
haxe.net.HttpResponseCode = { __ename__ : ["haxe","net","HttpResponseCode"], __constructs__ : ["Normal","Error"] }
haxe.net.HttpResponseCode.Error = function(v) { var $x = ["Error",1,v]; $x.__enum__ = haxe.net.HttpResponseCode; $x.toString = $estr; return $x; }
haxe.net.HttpResponseCode.Normal = function(v) { var $x = ["Normal",0,v]; $x.__enum__ = haxe.net.HttpResponseCode; $x.toString = $estr; return $x; }
IntHash = function(p) { if( p === $_ ) return; {
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
	else null;
}}
IntHash.__name__ = ["IntHash"];
IntHash.prototype.exists = function(key) {
	return this.h[key] != null;
}
IntHash.prototype.get = function(key) {
	return this.h[key];
}
IntHash.prototype.h = null;
IntHash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref[i];
	}}
}
IntHash.prototype.keys = function() {
	var a = new Array();
	
			for( x in this.h )
				a.push(x);
		;
	return a.iterator();
}
IntHash.prototype.remove = function(key) {
	if(this.h[key] == null) return false;
	delete(this.h[key]);
	return true;
}
IntHash.prototype.set = function(key,value) {
	this.h[key] = value;
}
IntHash.prototype.toString = function() {
	var s = new StringBuf();
	s.b[s.b.length] = "{";
	var it = this.keys();
	{ var $it0 = it;
	while( $it0.hasNext() ) { var i = $it0.next();
	{
		s.b[s.b.length] = i;
		s.b[s.b.length] = " => ";
		s.b[s.b.length] = Std.string(this.get(i));
		if(it.hasNext()) s.b[s.b.length] = ", ";
	}
	}}
	s.b[s.b.length] = "}";
	return s.b.join("");
}
IntHash.prototype.__class__ = IntHash;
haxe.data.transcode.ExtractorHelpers = function() { }
haxe.data.transcode.ExtractorHelpers.__name__ = ["haxe","data","transcode","ExtractorHelpers"];
haxe.data.transcode.ExtractorHelpers.extractFieldValue = function(j,n,e,def) {
	var fieldValue = haxe.text.json.JValueExtensions.getOrElse(j,n,DynamicExtensions.toThunk(def));
	try {
		return e(fieldValue);
	}
	catch( $e0 ) {
		{
			var err = $e0;
			{
				return e(def);
			}
		}
	}
}
haxe.data.transcode.ExtractorHelpers.prototype.__class__ = haxe.data.transcode.ExtractorHelpers;
haxe.data.transcode.MapExtensions = function() { }
haxe.data.transcode.MapExtensions.__name__ = ["haxe","data","transcode","MapExtensions"];
haxe.data.transcode.MapExtensions.stringKeyDecompose = function(v) {
	var it = v.iterator();
	if(it.hasNext()) {
		var dv = haxe.data.transcode.TranscodeJValue.getDecomposerFor(Type["typeof"](it.next()._2));
		return haxe.text.json.JValue.JObject(ArrayExtensions.map(IterableExtensions.toArray(v),function(t) {
			return haxe.text.json.JValue.JField(t._1,dv(t._2));
		}));
	}
	else {
		return haxe.text.json.JValue.JObject([]);
	}
}
haxe.data.transcode.MapExtensions.stringKeyExtract = function(v,ve,vorder,vequal,vhash,vshow) {
	var extract0 = function(v1) {
		return haxe.data.collections.Map.create($closure(StringExtensions,"compare"),$closure(StringExtensions,"equals"),$closure(StringExtensions,"hashCode"),$closure(StringExtensions,"toString"),vorder,vequal,vhash,vshow).addAll(ArrayExtensions.map(v1,function(j) {
			return (function($this) {
				var $r;
				var $e = (j);
				switch( $e[1] ) {
				case 6:
				var v2 = $e[3], k = $e[2];
				{
					$r = Tuple2.create(k,ve(v2));
				}break;
				default:{
					$r = Stax.error("Expected field but was: " + v1);
				}break;
				}
				return $r;
			}(this));
		}));
	}
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 5:
		var v1 = $e[2];
		{
			$r = extract0(v1);
		}break;
		case 4:
		var v1 = $e[2];
		{
			$r = extract0(v1);
		}break;
		default:{
			$r = Stax.error("Expected either Array or Object but was: " + v);
		}break;
		}
		return $r;
	}(this));
}
haxe.data.transcode.MapExtensions.prototype.__class__ = haxe.data.transcode.MapExtensions;
haxe.data.transcode.TranscodeJValue = function() { }
haxe.data.transcode.TranscodeJValue.__name__ = ["haxe","data","transcode","TranscodeJValue"];
haxe.data.transcode.TranscodeJValue._createDecomposeImpl = function(impl) {
	return function(v) {
		if(null == v) return haxe.text.json.JValue.JNull;
		else return impl(v);
	}
}
haxe.data.transcode.TranscodeJValue.getDecomposerFor = function(v) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 3:
		{
			$r = haxe.data.transcode.TranscodeJValue._createDecomposeImpl($closure(BoolExtensions,"decompose"));
		}break;
		case 1:
		{
			$r = haxe.data.transcode.TranscodeJValue._createDecomposeImpl($closure(IntExtensions,"decompose"));
		}break;
		case 2:
		{
			$r = haxe.data.transcode.TranscodeJValue._createDecomposeImpl($closure(FloatExtensions,"decompose"));
		}break;
		case 8:
		{
			$r = haxe.data.transcode.TranscodeJValue._createDecomposeImpl(function(v1) {
				return Stax.error("Can't decompose TUnknown: " + v1);
			});
		}break;
		case 4:
		{
			$r = haxe.data.transcode.TranscodeJValue._createDecomposeImpl(function(v1) {
				return Stax.error("Can't decompose TObject: " + v1);
			});
		}break;
		case 6:
		var c = $e[2];
		{
			$r = (function($this) {
				var $r;
				switch(Type.getClassName(c)) {
				case "String":{
					$r = haxe.data.transcode.TranscodeJValue._createDecomposeImpl($closure(StringExtensions,"decompose"));
				}break;
				case "Date":{
					$r = haxe.data.transcode.TranscodeJValue._createDecomposeImpl($closure(DateExtensions,"decompose"));
				}break;
				case "Array":{
					$r = haxe.data.transcode.TranscodeJValue._createDecomposeImpl($closure(ArrayExtensions,"decompose"));
				}break;
				default:{
					$r = haxe.data.transcode.TranscodeJValue._createDecomposeImpl(function(v1) {
						return (Type.getInstanceFields(Type.getClass(v1)).remove("decompose")?Reflect.field(v1,"decompose").apply(v1,[]):Stax.error("Decompose function cannot be created. 'decompose' method is missing. Object: " + v1));
					});
				}break;
				}
				return $r;
			}($this));
		}break;
		case 7:
		var e = $e[2];
		{
			$r = (function($this) {
				var $r;
				switch(Type.getEnumName(e)) {
				case "Option":{
					$r = haxe.data.transcode.TranscodeJValue._createDecomposeImpl($closure(OptionExtensions,"decompose"));
				}break;
				case "haxe.text.json.JValue":{
					$r = haxe.data.transcode.TranscodeJValue._createDecomposeImpl($closure(JValueExtensions,"decompose"));
				}break;
				default:{
					$r = haxe.data.transcode.TranscodeJValue._createDecomposeImpl(function(v1) {
						var name = StringExtensions.decompose(Type.getEnumName(e));
						var constructor = StringExtensions.decompose(v1[0]);
						var parameters = haxe.text.json.JValue.JArray(ArrayExtensions.map(v1.slice(2),function(v2) {
							return (haxe.data.transcode.TranscodeJValue.getDecomposerFor(Type["typeof"](v2)))(v2);
						}));
						return haxe.text.json.JValue.JArray([name,constructor,parameters]);
					});
				}break;
				}
				return $r;
			}($this));
		}break;
		case 5:
		{
			$r = haxe.data.transcode.TranscodeJValue._createDecomposeImpl(function(v1) {
				Stax.error("Can't decompose function.");
				return haxe.text.json.JValue.JNull;
			});
		}break;
		case 0:
		{
			$r = function(v1) {
				return haxe.text.json.JValue.JNull;
			}
		}break;
		default:{
			$r = haxe.data.transcode.TranscodeJValue._createDecomposeImpl(function(v1) {
				Stax.error("Can't decompose unknown type.");
				return haxe.text.json.JValue.JNull;
			});
		}break;
		}
		return $r;
	}(this));
}
haxe.data.transcode.TranscodeJValue._createExtractorImpl = function(impl) {
	return function(v) {
		if(null == v) return null;
		else return impl(v);
	}
}
haxe.data.transcode.TranscodeJValue.getExtractorFor = function(valueType,extractorArgs) {
	return (function($this) {
		var $r;
		var $e = (valueType);
		switch( $e[1] ) {
		case 3:
		{
			$r = haxe.data.transcode.TranscodeJValue._createExtractorImpl(function(v) {
				return BoolExtensions.extract(Bool,v);
			});
		}break;
		case 1:
		{
			$r = haxe.data.transcode.TranscodeJValue._createExtractorImpl(function(v) {
				return IntExtensions.extract(Int,v);
			});
		}break;
		case 2:
		{
			$r = haxe.data.transcode.TranscodeJValue._createExtractorImpl(function(v) {
				return FloatExtensions.extract(Float,v);
			});
		}break;
		case 8:
		{
			$r = haxe.data.transcode.TranscodeJValue._createExtractorImpl(function(v) {
				return Stax.error("Can't extract TUnknown: " + v);
			});
		}break;
		case 4:
		{
			$r = haxe.data.transcode.TranscodeJValue._createExtractorImpl(function(v) {
				return Stax.error("Can't extract TObject: " + v);
			});
		}break;
		case 6:
		var c = $e[2];
		{
			$r = (function($this) {
				var $r;
				switch(Type.getClassName(c)) {
				case "String":{
					$r = haxe.data.transcode.TranscodeJValue._createExtractorImpl(function(v) {
						return StringExtensions.extract(String,v);
					});
				}break;
				case "Date":{
					$r = haxe.data.transcode.TranscodeJValue._createExtractorImpl(function(v) {
						return DateExtensions.extract(Date,v);
					});
				}break;
				case "Array":{
					$r = haxe.data.transcode.TranscodeJValue._createExtractorImpl(function(v) {
						return ArrayExtensions.extract(Array,v,extractorArgs[0]);
					});
				}break;
				default:{
					$r = haxe.data.transcode.TranscodeJValue._createExtractorImpl(function(v) {
						return (Type.getClassFields(c).remove("extract")?(function($this) {
							var $r;
							var args = [v];
							if(extractorArgs != null) {
								{
									var _g = 0;
									while(_g < extractorArgs.length) {
										var e = extractorArgs[_g];
										++_g;
										args.push(e);
									}
								}
							}
							$r = Reflect.field(c,"extract").apply(c,args);
							return $r;
						}(this)):Stax.error("Extract function cannot be created. 'extract' method is missing. Type: " + valueType));
					});
				}break;
				}
				return $r;
			}($this));
		}break;
		case 7:
		var e = $e[2];
		{
			$r = (function($this) {
				var $r;
				switch(Type.getEnumName(e)) {
				case "Option":{
					$r = haxe.data.transcode.TranscodeJValue._createExtractorImpl(function(v) {
						return OptionExtensions.extract(Option,v,extractorArgs[0]);
					});
				}break;
				case "haxe.text.json.JValue":{
					$r = haxe.data.transcode.TranscodeJValue._createExtractorImpl(function(v) {
						return JValueExtensions.extract(haxe.text.json.JValue,v);
					});
				}break;
				default:{
					$r = haxe.data.transcode.TranscodeJValue._createExtractorImpl(function(v) {
						var $e = (v);
						switch( $e[1] ) {
						case 4:
						var arr = $e[2];
						{
							{
								var name = StringExtensions.extract(String,arr[0]);
								var constructor = StringExtensions.extract(String,arr[1]);
								var parameters = (function($this) {
									var $r;
									var $e = (arr[2]);
									switch( $e[1] ) {
									case 4:
									var a = $e[2];
									{
										$r = (function($this) {
											var $r;
											if(extractorArgs == null) extractorArgs = [];
											$r = ArrayExtensions.map(ArrayExtensions.zip(a,extractorArgs),function(t) {
												return t._2(t._1);
											});
											return $r;
										}($this));
									}break;
									default:{
										$r = Stax.error("Expected JArray but was: " + v);
									}break;
									}
									return $r;
								}(this));
								return Type.createEnum(Type.resolveEnum(name),constructor,parameters);
							}
						}break;
						default:{
							Stax.error("Expected JArray but was: " + v);
							return null;
						}break;
						}
					});
				}break;
				}
				return $r;
			}($this));
		}break;
		case 5:
		{
			$r = haxe.data.transcode.TranscodeJValue._createExtractorImpl(function(v) {
				Stax.error("Can't extract function.");
				return haxe.text.json.JValue.JNull;
			});
		}break;
		case 0:
		{
			$r = function(v) {
				return null;
			}
		}break;
		default:{
			$r = haxe.data.transcode.TranscodeJValue._createExtractorImpl(function(v) {
				Stax.error("Can't extract unknown type.");
				return haxe.text.json.JValue.JNull;
			});
		}break;
		}
		return $r;
	}(this));
}
haxe.data.transcode.TranscodeJValue.prototype.__class__ = haxe.data.transcode.TranscodeJValue;
haxe.data.collections.Set = function(map) { if( map === $_ ) return; {
	this._map = map;
}}
haxe.data.collections.Set.__name__ = ["haxe","data","collections","Set"];
haxe.data.collections.Set.create = function(order,equal,hash,show) {
	return new haxe.data.collections.Set(haxe.data.collections.Map.create(order,equal,hash,show));
}
haxe.data.collections.Set.factory = function(order,equal,hash,show) {
	return function() {
		return haxe.data.collections.Set.create(order,equal,hash,show);
	}
}
haxe.data.collections.Set.extract = function(v,e,order,equal,hash,show) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 4:
		var v1 = $e[2];
		{
			$r = haxe.data.collections.Set.create(order,equal,hash,show).addAll(ArrayExtensions.map(v1,e));
		}break;
		default:{
			$r = Stax.error("Expected Array but was: " + v);
		}break;
		}
		return $r;
	}(this));
}
haxe.data.collections.Set.prototype._map = null;
haxe.data.collections.Set.prototype.add = function(t) {
	return (this.contains(t)?this:this.copyWithMod(this._map.set(t,t)));
}
haxe.data.collections.Set.prototype.addAll = function(it) {
	var set = this;
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
	set = set.add(e);
	}}
	return set;
}
haxe.data.collections.Set.prototype.append = function(t) {
	return this.copyWithMod(this._map.set(t,t));
}
haxe.data.collections.Set.prototype.compare = function(other) {
	return ArrayExtensions.compareWith(IterableExtensions.toArray(this),IterableExtensions.toArray(other),this.getOrder());
}
haxe.data.collections.Set.prototype.contains = function(e) {
	return this._map.containsKey(e);
}
haxe.data.collections.Set.prototype.copyWithMod = function(newMap) {
	return new haxe.data.collections.Set(newMap);
}
haxe.data.collections.Set.prototype.decompose = function() {
	return ArrayExtensions.decompose(IterableExtensions.toArray(this));
}
haxe.data.collections.Set.prototype.empty = function() {
	return haxe.data.collections.Set.create();
}
haxe.data.collections.Set.prototype.equal = null;
haxe.data.collections.Set.prototype.equals = function(other) {
	var all = haxe.functional.FoldableExtensions.concat(this,other);
	return all.size() == this.size() && all.size() == other.size();
}
haxe.data.collections.Set.prototype.foldl = function(z,f) {
	var acc = z;
	{ var $it0 = this._map.iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
	{
		acc = f(acc,e._1);
	}
	}}
	return acc;
}
haxe.data.collections.Set.prototype.getEqual = function() {
	return this._map.getKeyEqual();
}
haxe.data.collections.Set.prototype.getHash = function() {
	return this._map.getKeyHash();
}
haxe.data.collections.Set.prototype.getOrder = function() {
	return this._map.getKeyOrder();
}
haxe.data.collections.Set.prototype.getShow = function() {
	return this._map.getKeyShow();
}
haxe.data.collections.Set.prototype.hash = null;
haxe.data.collections.Set.prototype.hashCode = function() {
	var ha = this.getHash();
	return this.foldl(393241,function(a,b) {
		return a * (ha(b) + 6151);
	});
}
haxe.data.collections.Set.prototype.iterator = function() {
	return haxe.functional.FoldableExtensions.iterator(this);
}
haxe.data.collections.Set.prototype.order = null;
haxe.data.collections.Set.prototype.remove = function(t) {
	return this.copyWithMod(this._map.removeByKey(t));
}
haxe.data.collections.Set.prototype.removeAll = function(it) {
	var set = this;
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
	set = set.remove(e);
	}}
	return set;
}
haxe.data.collections.Set.prototype.show = null;
haxe.data.collections.Set.prototype.size = function() {
	return this._map.size();
}
haxe.data.collections.Set.prototype.toString = function() {
	return "Set " + ArrayExtensions.toStringWith(IterableExtensions.toArray(this),this.getShow());
}
haxe.data.collections.Set.prototype.withEqualFunction = function(equal) {
	var m = this._map;
	return haxe.data.collections.Set.create(m._keyOrder,equal,m._keyHash,m._keyShow).addAll(this);
}
haxe.data.collections.Set.prototype.withHashFunction = function(hash) {
	var m = this._map;
	return haxe.data.collections.Set.create(m._keyOrder,m._keyEqual,hash,m._keyShow).addAll(this);
}
haxe.data.collections.Set.prototype.withOrderFunction = function(order) {
	var m = this._map;
	return haxe.data.collections.Set.create(order,m._keyEqual,m._keyHash,m._keyShow).addAll(this);
}
haxe.data.collections.Set.prototype.withShowFunction = function(show) {
	var m = this._map;
	return haxe.data.collections.Set.create(m._keyOrder,m._keyEqual,m._keyHash,show).addAll(this);
}
haxe.data.collections.Set.prototype.__class__ = haxe.data.collections.Set;
haxe.data.collections.Set.__interfaces__ = [haxe.data.collections.Collection];
haxe.functional.PartialFunction1 = function() { }
haxe.functional.PartialFunction1.__name__ = ["haxe","functional","PartialFunction1"];
haxe.functional.PartialFunction1.prototype.call = null;
haxe.functional.PartialFunction1.prototype.isDefinedAt = null;
haxe.functional.PartialFunction1.prototype.orAlways = null;
haxe.functional.PartialFunction1.prototype.orAlwaysC = null;
haxe.functional.PartialFunction1.prototype.orElse = null;
haxe.functional.PartialFunction1.prototype.toFunction = null;
haxe.functional.PartialFunction1.prototype.__class__ = haxe.functional.PartialFunction1;
haxe.data.collections.Map = function(korder,kequal,khash,kshow,vorder,vequal,vhash,vshow,buckets,size) { if( korder === $_ ) return; {
	var self = this;
	this._keyOrder = korder;
	this._keyEqual = kequal;
	this._keyHash = khash;
	this._keyShow = kshow;
	this._valueOrder = vorder;
	this._valueEqual = vequal;
	this._valueHash = vhash;
	this._valueShow = vshow;
	this._size = size;
	this._buckets = buckets;
	this._pf = haxe.functional.PartialFunction1ImplExtensions.toPartialFunction([Tuple2.create($closure(this,"containsKey"),function(k) {
		return (function($this) {
			var $r;
			var $e = (self.get(k));
			switch( $e[1] ) {
			case 1:
			var v = $e[2];
			{
				$r = v;
			}break;
			case 0:
			{
				$r = Stax.error("No value for this key");
			}break;
			default:{
				$r = null;
			}break;
			}
			return $r;
		}(this));
	})]);
}}
haxe.data.collections.Map.__name__ = ["haxe","data","collections","Map"];
haxe.data.collections.Map.create = function(korder,kequal,khash,kshow,vorder,vequal,vhash,vshow) {
	return new haxe.data.collections.Map(korder,kequal,khash,kshow,vorder,vequal,vhash,vshow,[[]],0);
}
haxe.data.collections.Map.factory = function(korder,kequal,khash,kshow,vorder,vequal,vhash,vshow) {
	return function() {
		return haxe.data.collections.Map.create(korder,kequal,khash,kshow,vorder,vequal,vhash,vshow);
	}
}
haxe.data.collections.Map.extract = function(v,ke,ve,korder,kequal,khash,kshow,vorder,vequal,vhash,vshow) {
	var te = function(v1) {
		return Tuple2.extract(v1,ke,ve);
	}
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 4:
		var v1 = $e[2];
		{
			$r = haxe.data.collections.Map.create(korder,kequal,khash,kshow,vorder,vequal,vhash,vshow).addAll(ArrayExtensions.map(v1,te));
		}break;
		default:{
			$r = Stax.error("Expected Array but was: " + v);
		}break;
		}
		return $r;
	}(this));
}
haxe.data.collections.Map.prototype._buckets = null;
haxe.data.collections.Map.prototype._keyEqual = null;
haxe.data.collections.Map.prototype._keyHash = null;
haxe.data.collections.Map.prototype._keyOrder = null;
haxe.data.collections.Map.prototype._keyShow = null;
haxe.data.collections.Map.prototype._pf = null;
haxe.data.collections.Map.prototype._size = null;
haxe.data.collections.Map.prototype._valueEqual = null;
haxe.data.collections.Map.prototype._valueHash = null;
haxe.data.collections.Map.prototype._valueOrder = null;
haxe.data.collections.Map.prototype._valueShow = null;
haxe.data.collections.Map.prototype.add = function(t) {
	var k = t._1;
	var v = t._2;
	var bucket = this.bucketFor(k);
	var list = this._buckets[bucket];
	if(null == this._keyEqual) this._keyEqual = Stax.getEqualFor(t._1);
	if(null == this._valueEqual) this._valueEqual = Stax.getEqualFor(t._2);
	{
		var _g1 = 0, _g = list.length;
		while(_g1 < _g) {
			var i = _g1++;
			var entry = list[i];
			if(this._keyEqual(entry._1,k)) {
				if(!this._valueEqual(entry._2,v)) {
					var newMap = this.copyWithMod(bucket);
					newMap._buckets[bucket][i] = t;
					return newMap;
				}
				else {
					return this;
				}
			}
		}
	}
	var newMap = this.copyWithMod(bucket);
	newMap._buckets[bucket].push(t);
	newMap._size += 1;
	if(newMap.load() > haxe.data.collections.Map.MaxLoad) {
		newMap.rebalance();
	}
	return newMap;
}
haxe.data.collections.Map.prototype.addAll = function(i) {
	var map = this;
	{ var $it0 = i.iterator();
	while( $it0.hasNext() ) { var t = $it0.next();
	map = map.add(t);
	}}
	return map;
}
haxe.data.collections.Map.prototype.append = function(t) {
	return this.add(t);
}
haxe.data.collections.Map.prototype.bucketFor = function(k) {
	return (this.getKeyHash())(k) % this._buckets.length;
}
haxe.data.collections.Map.prototype.call = function(k) {
	return this._pf.call(k);
}
haxe.data.collections.Map.prototype.compare = function(other) {
	var a1 = IterableExtensions.toArray(this);
	var a2 = IterableExtensions.toArray(other);
	var ko = this.getKeyOrder();
	var vo = this.getValueOrder();
	var sorter = function(t1,t2) {
		var c = ko(t1._1,t2._1);
		return (c != 0?c:vo(t1._2,t2._2));
	}
	a1.sort(sorter);
	a2.sort(sorter);
	return ArrayExtensions.compare(a1,a2);
}
haxe.data.collections.Map.prototype.contains = function(t) {
	var ke = this.getKeyEqual();
	var ve = this.getValueEqual();
	{ var $it0 = this.entries().iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
	{
		if(ke(e._1,t._1) && ve(t._2,t._2)) return true;
	}
	}}
	return false;
}
haxe.data.collections.Map.prototype.containsKey = function(k) {
	return (function($this) {
		var $r;
		var $e = ($this.get(k));
		switch( $e[1] ) {
		case 0:
		{
			$r = false;
		}break;
		case 1:
		var v = $e[2];
		{
			$r = true;
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
haxe.data.collections.Map.prototype.copyWithMod = function(index) {
	var newTable = [];
	{
		var _g = 0;
		while(_g < index) {
			var i = _g++;
			newTable.push(this._buckets[i]);
		}
	}
	newTable.push([].concat(this._buckets[index]));
	{
		var _g1 = (index + 1), _g = this._buckets.length;
		while(_g1 < _g) {
			var i = _g1++;
			newTable.push(this._buckets[i]);
		}
	}
	return new haxe.data.collections.Map(this._keyOrder,this._keyEqual,this._keyHash,this._keyShow,this._valueOrder,this._valueEqual,this._valueHash,this._valueShow,newTable,this.size());
}
haxe.data.collections.Map.prototype.decompose = function() {
	return ArrayExtensions.decompose(IterableExtensions.toArray(this));
}
haxe.data.collections.Map.prototype.empty = function() {
	return haxe.data.collections.Map.create();
}
haxe.data.collections.Map.prototype.entries = function() {
	var buckets = this._buckets;
	var iterable = { iterator : function() {
		var bucket = 0, element = 0;
		var computeNextValue = function() {
			while(bucket < buckets.length) {
				if(element >= buckets[bucket].length) {
					element = 0;
					++bucket;
				}
				else {
					return Option.Some(buckets[bucket][element++]);
				}
			}
			return Option.None;
		}
		var nextValue = computeNextValue();
		return { hasNext : function() {
			return !OptionExtensions.isEmpty(nextValue);
		}, next : function() {
			var value = nextValue;
			nextValue = computeNextValue();
			return OptionExtensions.get(value);
		}}
	}}
	return iterable;
}
haxe.data.collections.Map.prototype.equals = function(other) {
	var keys1 = this.keySet();
	var keys2 = other.keySet();
	if(!keys1.equals(keys2)) return false;
	var ve = this.getValueEqual();
	{ var $it0 = keys1.iterator();
	while( $it0.hasNext() ) { var key = $it0.next();
	{
		var v1 = OptionExtensions.get(this.get(key));
		var v2 = OptionExtensions.get(other.get(key));
		if(!ve(v1,v2)) return false;
	}
	}}
	return true;
}
haxe.data.collections.Map.prototype.foldl = function(z,f) {
	var acc = z;
	{ var $it0 = this.entries().iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
	{
		acc = f(acc,e);
	}
	}}
	return acc;
}
haxe.data.collections.Map.prototype.get = function(k) {
	var ke = this.getKeyEqual();
	{
		var _g = 0, _g1 = this.listFor(k);
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			if(ke(e._1,k)) {
				return Option.Some(e._2);
			}
		}
	}
	return Option.None;
}
haxe.data.collections.Map.prototype.getKeyEqual = function() {
	return (null == this._keyEqual?(function($this) {
		var $r;
		var it = $this.iterator();
		$r = (!it.hasNext()?Stax.getEqualFor(null):$this._keyEqual = Stax.getEqualFor(it.next()._1));
		return $r;
	}(this)):this._keyEqual);
}
haxe.data.collections.Map.prototype.getKeyHash = function() {
	return (null == this._keyHash?(function($this) {
		var $r;
		var it = $this.iterator();
		$r = (!it.hasNext()?Stax.getHashFor(null):$this._keyHash = Stax.getHashFor(it.next()._1));
		return $r;
	}(this)):this._keyHash);
}
haxe.data.collections.Map.prototype.getKeyOrder = function() {
	return (null == this._keyOrder?(function($this) {
		var $r;
		var it = $this.iterator();
		$r = (!it.hasNext()?Stax.getOrderFor(null):$this._keyOrder = Stax.getOrderFor(it.next()._1));
		return $r;
	}(this)):this._keyOrder);
}
haxe.data.collections.Map.prototype.getKeyShow = function() {
	return (null == this._keyShow?(function($this) {
		var $r;
		var it = $this.iterator();
		$r = (!it.hasNext()?Stax.getShowFor(null):$this._keyShow = Stax.getShowFor(it.next()._1));
		return $r;
	}(this)):this._keyShow);
}
haxe.data.collections.Map.prototype.getOrElse = function(k,def) {
	return (function($this) {
		var $r;
		var $e = ($this.get(k));
		switch( $e[1] ) {
		case 1:
		var v = $e[2];
		{
			$r = v;
		}break;
		case 0:
		{
			$r = def();
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
haxe.data.collections.Map.prototype.getOrElseC = function(k,c) {
	return (function($this) {
		var $r;
		var $e = ($this.get(k));
		switch( $e[1] ) {
		case 1:
		var v = $e[2];
		{
			$r = v;
		}break;
		case 0:
		{
			$r = c;
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
haxe.data.collections.Map.prototype.getValueEqual = function() {
	return (null == this._valueEqual?(function($this) {
		var $r;
		var it = $this.iterator();
		$r = (!it.hasNext()?Stax.getEqualFor(null):$this._valueEqual = Stax.getEqualFor(it.next()._2));
		return $r;
	}(this)):this._valueEqual);
}
haxe.data.collections.Map.prototype.getValueHash = function() {
	return (null == this._valueHash?(function($this) {
		var $r;
		var it = $this.iterator();
		$r = (!it.hasNext()?Stax.getHashFor(null):$this._valueHash = Stax.getHashFor(it.next()._2));
		return $r;
	}(this)):this._valueHash);
}
haxe.data.collections.Map.prototype.getValueOrder = function() {
	return (null == this._valueOrder?(function($this) {
		var $r;
		var it = $this.iterator();
		$r = (!it.hasNext()?Stax.getOrderFor(null):$this._valueOrder = Stax.getOrderFor(it.next()._2));
		return $r;
	}(this)):this._valueOrder);
}
haxe.data.collections.Map.prototype.getValueShow = function() {
	return (null == this._valueShow?(function($this) {
		var $r;
		var it = $this.iterator();
		$r = (!it.hasNext()?Stax.getShowFor(null):$this._valueShow = Stax.getShowFor(it.next()._2));
		return $r;
	}(this)):this._valueShow);
}
haxe.data.collections.Map.prototype.hashCode = function() {
	var kha = this.getKeyHash();
	var vha = this.getValueHash();
	return this.foldl(786433,function(a,b) {
		return a + (kha(b._1) * 49157 + 6151) * vha(b._2);
	});
}
haxe.data.collections.Map.prototype.isDefinedAt = function(k) {
	return this._pf.isDefinedAt(k);
}
haxe.data.collections.Map.prototype.iterator = function() {
	return haxe.functional.FoldableExtensions.iterator(this);
}
haxe.data.collections.Map.prototype.keyEqual = null;
haxe.data.collections.Map.prototype.keyHash = null;
haxe.data.collections.Map.prototype.keyOrder = null;
haxe.data.collections.Map.prototype.keySet = function() {
	return haxe.data.collections.Set.create(this._keyOrder,this._keyEqual,this._keyHash,this._keyShow).addAll(this.keys());
}
haxe.data.collections.Map.prototype.keyShow = null;
haxe.data.collections.Map.prototype.keys = function() {
	var self = this;
	return { iterator : function() {
		var entryIterator = self.entries().iterator();
		return { hasNext : $closure(entryIterator,"hasNext"), next : function() {
			return entryIterator.next()._1;
		}}
	}}
}
haxe.data.collections.Map.prototype.listFor = function(k) {
	return (this._buckets.length == 0?[]:this._buckets[this.bucketFor(k)]);
}
haxe.data.collections.Map.prototype.load = function() {
	return (this._buckets.length == 0?haxe.data.collections.Map.MaxLoad:Math.round(this.size() / this._buckets.length));
}
haxe.data.collections.Map.prototype.orAlways = function(f) {
	return this._pf.orAlways(f);
}
haxe.data.collections.Map.prototype.orAlwaysC = function(v) {
	return this._pf.orAlwaysC(v);
}
haxe.data.collections.Map.prototype.orElse = function(that) {
	return this._pf.orElse(that);
}
haxe.data.collections.Map.prototype.rebalance = function() {
	var newSize = Math.round(this.size() / ((haxe.data.collections.Map.MaxLoad + haxe.data.collections.Map.MinLoad) / 2));
	if(newSize > 0) {
		var all = this.entries();
		this._buckets = [];
		{
			var _g = 0;
			while(_g < newSize) {
				var i = _g++;
				this._buckets.push([]);
			}
		}
		{ var $it0 = all.iterator();
		while( $it0.hasNext() ) { var e = $it0.next();
		{
			var bucket = this.bucketFor(e._1);
			this._buckets[bucket].push(e);
		}
		}}
	}
}
haxe.data.collections.Map.prototype.remove = function(t) {
	return this.removeInternal(t._1,t._2,false);
}
haxe.data.collections.Map.prototype.removeAll = function(i) {
	var map = this;
	{ var $it0 = i.iterator();
	while( $it0.hasNext() ) { var t = $it0.next();
	map = map.remove(t);
	}}
	return map;
}
haxe.data.collections.Map.prototype.removeAllByKey = function(i) {
	var map = this;
	{ var $it0 = i.iterator();
	while( $it0.hasNext() ) { var k = $it0.next();
	map = map.removeByKey(k);
	}}
	return map;
}
haxe.data.collections.Map.prototype.removeByKey = function(k) {
	return this.removeInternal(k,null,true);
}
haxe.data.collections.Map.prototype.removeInternal = function(k,v,ignoreValue) {
	var bucket = this.bucketFor(k);
	var list = this._buckets[bucket];
	var ke = this.getKeyEqual();
	var ve = this.getValueEqual();
	{
		var _g1 = 0, _g = list.length;
		while(_g1 < _g) {
			var i = _g1++;
			var entry = list[i];
			if(ke(entry._1,k)) {
				if(ignoreValue || ve(entry._2,v)) {
					var newMap = this.copyWithMod(bucket);
					newMap._buckets[bucket] = list.slice(0,i).concat(list.slice(i + 1,list.length));
					newMap._size -= 1;
					if(newMap.load() < haxe.data.collections.Map.MinLoad) {
						newMap.rebalance();
					}
					return newMap;
				}
				else {
					return this;
				}
			}
		}
	}
	return this;
}
haxe.data.collections.Map.prototype.set = function(k,v) {
	return this.add(Tuple2.create(k,v));
}
haxe.data.collections.Map.prototype.size = function() {
	return this._size;
}
haxe.data.collections.Map.prototype.toFunction = function() {
	return $closure(this,"get");
}
haxe.data.collections.Map.prototype.toString = function() {
	var ksh = this.getKeyShow();
	var vsh = this.getValueShow();
	return "Map " + IterableExtensions.toString(haxe.functional.FoldableExtensions.elements(this),function(t) {
		return (ksh(t._1) + " -> ") + vsh(t._2);
	});
}
haxe.data.collections.Map.prototype.valueEqual = null;
haxe.data.collections.Map.prototype.valueHash = null;
haxe.data.collections.Map.prototype.valueOrder = null;
haxe.data.collections.Map.prototype.valueShow = null;
haxe.data.collections.Map.prototype.values = function() {
	var self = this;
	return { iterator : function() {
		var entryIterator = self.entries().iterator();
		return { hasNext : $closure(entryIterator,"hasNext"), next : function() {
			return entryIterator.next()._2;
		}}
	}}
}
haxe.data.collections.Map.prototype.withKeyEqualFunction = function(equal) {
	return haxe.data.collections.Map.create(this._keyOrder,equal,this._keyHash,this._keyShow,this._valueOrder,this._valueEqual,this._valueHash,this._valueShow).addAll(this);
}
haxe.data.collections.Map.prototype.withKeyHashFunction = function(hash) {
	return haxe.data.collections.Map.create(this._keyOrder,this._keyEqual,hash,this._keyShow,this._valueOrder,this._valueEqual,this._valueHash,this._valueShow).addAll(this);
}
haxe.data.collections.Map.prototype.withKeyOrderFunction = function(order) {
	return haxe.data.collections.Map.create(order,this._keyEqual,this._keyHash,this._keyShow,this._valueOrder,this._valueEqual,this._valueHash,this._valueShow).addAll(this);
}
haxe.data.collections.Map.prototype.withKeyShowFunction = function(show) {
	return haxe.data.collections.Map.create(this._keyOrder,this._keyEqual,this._keyHash,show,this._valueOrder,this._valueEqual,this._valueHash,this._valueShow).addAll(this);
}
haxe.data.collections.Map.prototype.withValueEqualFunction = function(equal) {
	return haxe.data.collections.Map.create(this._keyOrder,this._keyEqual,this._keyHash,this._keyShow,this._valueOrder,equal,this._valueHash,this._valueShow).addAll(this);
}
haxe.data.collections.Map.prototype.withValueHashFunction = function(hash) {
	return haxe.data.collections.Map.create(this._keyOrder,this._keyEqual,this._keyHash,this._keyShow,this._valueOrder,this._valueEqual,hash,this._valueShow).addAll(this);
}
haxe.data.collections.Map.prototype.withValueOrderFunction = function(order) {
	return haxe.data.collections.Map.create(this._keyOrder,this._keyEqual,this._keyHash,this._keyShow,order,this._valueEqual,this._valueHash,this._valueShow).addAll(this);
}
haxe.data.collections.Map.prototype.withValueShowFunction = function(show) {
	return haxe.data.collections.Map.create(this._keyOrder,this._keyEqual,this._keyHash,this._keyShow,this._valueOrder,this._valueEqual,this._valueHash,show).addAll(this);
}
haxe.data.collections.Map.prototype.__class__ = haxe.data.collections.Map;
haxe.data.collections.Map.__interfaces__ = [haxe.functional.PartialFunction1,haxe.data.collections.Collection];
StringTools = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return (s.length >= start.length && s.substr(0,start.length) == start);
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return (slen >= elen && s.substr(slen - elen,elen) == end);
}
StringTools.isSpace = function(s,pos) {
	var c = s.charCodeAt(pos);
	return (c >= 9 && c <= 13) || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) {
		r++;
	}
	if(r > 0) return s.substr(r,l - r);
	else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,(l - r) - 1)) {
		r++;
	}
	if(r > 0) {
		return s.substr(0,l - r);
	}
	else {
		return s;
	}
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) {
		if(l - sl < cl) {
			s += c.substr(0,l - sl);
			sl = l;
		}
		else {
			s += c;
			sl += cl;
		}
	}
	return s;
}
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) {
		if(l - sl < cl) {
			ns += c.substr(0,l - sl);
			sl = l;
		}
		else {
			ns += c;
			sl += cl;
		}
	}
	return ns + s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
StringTools.prototype.__class__ = StringTools;
Function1Extensions = function() { }
Function1Extensions.__name__ = ["Function1Extensions"];
Function1Extensions.swallow = function(f) {
	return Function1Extensions.toEffect(Function1Extensions.swallowWith(f,null));
}
Function1Extensions.swallowWith = function(f,d) {
	return function(a) {
		try {
			return f(a);
		}
		catch( $e0 ) {
			{
				var e = $e0;
				null;
			}
		}
		return d;
	}
}
Function1Extensions.returning = function(f,thunk) {
	return function(p1) {
		f(p1);
		return thunk();
	}
}
Function1Extensions.returningC = function(f,value) {
	return Function1Extensions.returning(f,DynamicExtensions.toThunk(value));
}
Function1Extensions.compose = function(f1,f2) {
	return function(u) {
		return f1(f2(u));
	}
}
Function1Extensions.andThen = function(f1,f2) {
	return Function1Extensions.compose(f2,f1);
}
Function1Extensions.lazy = function(f,p1) {
	var r = null;
	return function() {
		return (r == null?(function($this) {
			var $r;
			r = f(p1);
			$r = r;
			return $r;
		}(this)):r);
	}
}
Function1Extensions.toEffect = function(f) {
	return function(p1) {
		f(p1);
	}
}
Function1Extensions.prototype.__class__ = Function1Extensions;
haxe.text.json.Json = function() { }
haxe.text.json.Json.__name__ = ["haxe","text","json","Json"];
haxe.text.json.Json.toObject = function(v) {
	var $e = (v);
	switch( $e[1] ) {
	case 0:
	{
		return null;
	}break;
	case 3:
	var v1 = $e[2];
	{
		return v1;
	}break;
	case 2:
	var v1 = $e[2];
	{
		return v1;
	}break;
	case 1:
	var v1 = $e[2];
	{
		return v1;
	}break;
	case 4:
	var xs = $e[2];
	{
		return ArrayExtensions.map(xs,function(x) {
			return haxe.text.json.Json.toObject(x);
		});
	}break;
	case 5:
	var fs = $e[2];
	{
		return ArrayExtensions.foldl(fs,{ },function(o,e) {
			var field = haxe.text.json.JValueExtensions.extractField(e);
			o[field._1] = haxe.text.json.Json.toObject(field._2);
			return o;
		});
	}break;
	case 6:
	var v1 = $e[3], k = $e[2];
	{
		return Stax.error("Cannot convert JField to object");
	}break;
	}
}
haxe.text.json.Json.fromObject = function(d) {
	var $e = (Type["typeof"](d));
	switch( $e[1] ) {
	case 8:
	{
		throw "Type of object must be definite: " + d;
	}break;
	case 6:
	var c = $e[2];
	{
		if(Std["is"](d,String)) return haxe.text.json.JValue.JString(d);
		else if(Std["is"](d,Hash)) return haxe.text.json.JValue.JObject(d.keys.toArray().map(function(k) {
			return haxe.text.json.JValue.JField(k,d.get(k));
		}));
		else if(Std["is"](d,Array)) return haxe.text.json.JValue.JArray(ArrayExtensions.map((function($this) {
			var $r;
			var $t = d;
			if(Std["is"]($t,Array)) $t;
			else throw "Class cast error";
			$r = $t;
			return $r;
		}(this)),$closure(haxe.text.json.Json,"fromObject")));
		else return Stax.error("Unknown object type: " + d);
	}break;
	case 7:
	var e = $e[2];
	{
		return Stax.error("Json.fromObject does not support enum conversions.");
	}break;
	case 5:
	{
		return Stax.error("Json.fromObject does not support function conversions.");
	}break;
	case 0:
	{
		return haxe.text.json.JValue.JNull;
	}break;
	case 3:
	{
		return haxe.text.json.JValue.JBool(d);
	}break;
	case 1:
	{
		return haxe.text.json.JValue.JNumber(d);
	}break;
	case 2:
	{
		return haxe.text.json.JValue.JNumber(d);
	}break;
	case 4:
	{
		return haxe.text.json.JValue.JObject(ArrayExtensions.map(Reflect.fields(d),function(f) {
			return haxe.text.json.JValue.JField(f,haxe.text.json.Json.fromObject(Reflect.field(d,f)));
		}));
	}break;
	}
}
haxe.text.json.Json.encode = function(v) {
	var $e = (v);
	switch( $e[1] ) {
	case 0:
	{
		return "null";
	}break;
	case 3:
	var v1 = $e[2];
	{
		return ("\"" + new EReg(".","").customReplace(new EReg("(\\n)","g").replace(new EReg("(\"|\\\\)","g").replace(v1,"\\$1"),"\\n"),function(r) {
			var c = r.matched(0).charCodeAt(0);
			return (c >= 32 && c <= 127?String.fromCharCode(c):"\\u" + StringTools.hex(c,4));
		})) + "\"";
	}break;
	case 2:
	var v1 = $e[2];
	{
		return Std.string(v1);
	}break;
	case 1:
	var v1 = $e[2];
	{
		return (v1?"true":"false");
	}break;
	case 4:
	var xs = $e[2];
	{
		return ("[" + ArrayExtensions.map(xs,$closure(haxe.text.json.Json,"encode")).join(",")) + "]";
	}break;
	case 5:
	var fs = $e[2];
	{
		return ("{" + ArrayExtensions.map(fs,function(f) {
			var field = haxe.text.json.JValueExtensions.extractField(f);
			return (haxe.text.json.Json.encode(haxe.text.json.JValue.JString(field._1)) + ":") + haxe.text.json.Json.encode(field._2);
		}).join(",")) + "}";
	}break;
	case 6:
	var v1 = $e[3], k = $e[2];
	{
		return Stax.error("Cannot encode JField");
	}break;
	}
}
haxe.text.json.Json.decode = function(s) {
	var i = 0, l = s.length, mark, line = 1, temp, type = 0;
	var current = new Array(), last = null;
	var names = new Array(), name = null;
	var value = null;
	var states = new Array(), state = 0;
	while((mark = i) < l) {
		var escaped = false;
		while(i < l && "\n\r\t ".indexOf(temp = s.charAt(i)) > -1) {
			mark = ++i;
			if("\n\r".indexOf(temp) > -1) ++line;
		}
		if(i < l) if((temp = s.charAt(i)) == "\"") {
			type = 4;
			while(++i < l && (escaped || (temp = s.charAt(i)) != "\"")) escaped = !escaped && temp == "\\";
		}
		else if("{[,:]}".indexOf(temp) > -1) {
			type = temp.charCodeAt(0) % 12;
			++i;
		}
		else if(temp == "f") {
			type = 2;
			i += 5;
		}
		else if("tn".indexOf(temp) > -1) {
			type = temp.charCodeAt(0) % 5;
			i += 4;
		}
		else if("0123456789.-".indexOf(temp) > -1) {
			type = 6;
			while(++i < l && "0123456789.eE+-".indexOf(s.charAt(i)) > -1) null;
		}
		else throw ((((((("Invalid JSON lexeme starting at character " + Std.string(i)) + ": ") + temp) + " (character code ") + Std.string(temp.charCodeAt(0))) + ", on line ") + Std.string(line)) + ")";
		if(type == 4) {
			temp = s.substr(mark + 1,(i - mark) - 1);
			++i;
		}
		else if(type == 6) temp = s.substr(mark,i - mark);
		switch(type) {
		case 3:{
			current.push(last = haxe.text.json.JValue.JObject(new Array()));
			names.push(name);
			name = null;
			states.push(state);
			state = 2;
			value = null;
		}break;
		case 7:{
			current.push(last = haxe.text.json.JValue.JArray(new Array()));
			states.push(state);
			state = 1;
			value = null;
		}break;
		case 8:{
			if(state == 1 && value != null) haxe.text.json.JValueExtensions.extractArray(last).push(value);
			else if(state == 3 && name != null && value != null) {
				haxe.text.json.JValueExtensions.extractArray(last).push(haxe.text.json.JValue.JField(name,value));
				state = 2;
			}
			value = null;
		}break;
		case 10:{
			if(state == 2) {
				name = haxe.text.json.JValueExtensions.extractString(value);
				state = 3;
			}
			else throw ((((("Non-sequitur colon on line " + line) + " (character ") + i) + ", state ") + state) + ")";
		}break;
		case 5:{
			if(state <= 1) throw ((("Unmatched closing brace on line " + line) + " (character ") + i) + ")";
			if(name != null && value != null) haxe.text.json.JValueExtensions.extractArray(last).push(haxe.text.json.JValue.JField(name,value));
			value = current.pop();
			state = states.pop();
			name = names.pop();
			if(current.length > 0) last = current[current.length - 1];
		}break;
		case 9:{
			if(state != 1) throw ((("Unmatched closing square bracket on line " + line) + " (character ") + i) + ")";
			if(value != null) haxe.text.json.JValueExtensions.extractArray(last).push(value);
			value = current.pop();
			state = states.pop();
			if(current.length > 0) last = current[current.length - 1];
		}break;
		case 0:{
			value = haxe.text.json.JValue.JNull;
		}break;
		case 1:{
			value = haxe.text.json.JValue.JBool(true);
		}break;
		case 2:{
			value = haxe.text.json.JValue.JBool(false);
		}break;
		case 4:{
			value = haxe.text.json.JValue.JString(new EReg("\\\\([bfnrt\\\\/\"]|u[0-9a-fA-F]{4})","").customReplace(temp,function(r) {
				var s1 = r.matched(1);
				if(s1 == "n") return "\n";
				else if(s1 == "r") return "\r";
				else if(s1 == "b") return String.fromCharCode(8);
				else if(s1 == "f") return String.fromCharCode(12);
				else if(s1 == "t") return "\t";
				else if(s1 == "\\") return "\\";
				else if(s1 == "\"") return "\"";
				else if(s1 == "/") return "/";
				else return String.fromCharCode(Std.parseInt("0x" + s1.substr(1)));
			}));
		}break;
		case 6:{
			value = haxe.text.json.JValue.JNumber(Std.parseFloat(temp));
		}break;
		}
	}
	if(current.length > 0) throw "Closing brace/bracket deficit of " + Std.string(current.length);
	return value;
}
haxe.text.json.Json.prototype.__class__ = haxe.text.json.Json;
haxe.io.Bytes = function(length,b) { if( length === $_ ) return; {
	this.length = length;
	this.b = b;
}}
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	{
		var _g = 0;
		while(_g < length) {
			var i = _g++;
			a.push(0);
		}
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.ofString = function(s) {
	var a = new Array();
	{
		var _g1 = 0, _g = s.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = s["cca"](i);
			if(c <= 127) a.push(c);
			else if(c <= 2047) {
				a.push(192 | (c >> 6));
				a.push(128 | (c & 63));
			}
			else if(c <= 65535) {
				a.push(224 | (c >> 12));
				a.push(128 | ((c >> 6) & 63));
				a.push(128 | (c & 63));
			}
			else {
				a.push(240 | (c >> 18));
				a.push(128 | ((c >> 12) & 63));
				a.push(128 | ((c >> 6) & 63));
				a.push(128 | (c & 63));
			}
		}
	}
	return new haxe.io.Bytes(a.length,a);
}
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
}
haxe.io.Bytes.prototype.b = null;
haxe.io.Bytes.prototype.blit = function(pos,src,srcpos,len) {
	if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw haxe.io.Error.OutsideBounds;
	var b1 = this.b;
	var b2 = src.b;
	if(b1 == b2 && pos > srcpos) {
		var i = len;
		while(i > 0) {
			i--;
			b1[i + pos] = b2[i + srcpos];
		}
		return;
	}
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b1[i + pos] = b2[i + srcpos];
		}
	}
}
haxe.io.Bytes.prototype.compare = function(other) {
	var b1 = this.b;
	var b2 = other.b;
	var len = ((this.length < other.length)?this.length:other.length);
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			if(b1[i] != b2[i]) return b1[i] - b2[i];
		}
	}
	return this.length - other.length;
}
haxe.io.Bytes.prototype.get = function(pos) {
	return this.b[pos];
}
haxe.io.Bytes.prototype.getData = function() {
	return this.b;
}
haxe.io.Bytes.prototype.length = null;
haxe.io.Bytes.prototype.readString = function(pos,len) {
	if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
	var s = "";
	var b = this.b;
	var fcc = $closure(String,"fromCharCode");
	var i = pos;
	var max = pos + len;
	while(i < max) {
		var c = b[i++];
		if(c < 128) {
			if(c == 0) break;
			s += fcc(c);
		}
		else if(c < 224) s += fcc(((c & 63) << 6) | (b[i++] & 127));
		else if(c < 240) {
			var c2 = b[i++];
			s += fcc((((c & 31) << 12) | ((c2 & 127) << 6)) | (b[i++] & 127));
		}
		else {
			var c2 = b[i++];
			var c3 = b[i++];
			s += fcc(((((c & 15) << 18) | ((c2 & 127) << 12)) | ((c3 << 6) & 127)) | (b[i++] & 127));
		}
	}
	return s;
}
haxe.io.Bytes.prototype.set = function(pos,v) {
	this.b[pos] = (v & 255);
}
haxe.io.Bytes.prototype.sub = function(pos,len) {
	if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
	return new haxe.io.Bytes(len,this.b.slice(pos,pos + len));
}
haxe.io.Bytes.prototype.toString = function() {
	return this.readString(0,this.length);
}
haxe.io.Bytes.prototype.__class__ = haxe.io.Bytes;
if(!haxe.io.http) haxe.io.http = {}
haxe.io.http.Http = function() { }
haxe.io.http.Http.__name__ = ["haxe","io","http","Http"];
haxe.io.http.Http.prototype.custom = null;
haxe.io.http.Http.prototype["delete"] = null;
haxe.io.http.Http.prototype.get = null;
haxe.io.http.Http.prototype.post = null;
haxe.io.http.Http.prototype.put = null;
haxe.io.http.Http.prototype.__class__ = haxe.io.http.Http;
EReg = function(r,opt) { if( r === $_ ) return; {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
}}
EReg.__name__ = ["EReg"];
EReg.prototype.customReplace = function(s,f) {
	var buf = new StringBuf();
	while(true) {
		if(!this.match(s)) break;
		buf.b[buf.b.length] = this.matchedLeft();
		buf.b[buf.b.length] = f(this);
		s = this.matchedRight();
	}
	buf.b[buf.b.length] = s;
	return buf.b.join("");
}
EReg.prototype.match = function(s) {
	this.r.m = this.r.exec(s);
	this.r.s = s;
	this.r.l = RegExp.leftContext;
	this.r.r = RegExp.rightContext;
	return (this.r.m != null);
}
EReg.prototype.matched = function(n) {
	return (this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
		var $r;
		throw "EReg::matched";
		return $r;
	}(this)));
}
EReg.prototype.matchedLeft = function() {
	if(this.r.m == null) throw "No string matched";
	if(this.r.l == null) return this.r.s.substr(0,this.r.m.index);
	return this.r.l;
}
EReg.prototype.matchedPos = function() {
	if(this.r.m == null) throw "No string matched";
	return { pos : this.r.m.index, len : this.r.m[0].length}
}
EReg.prototype.matchedRight = function() {
	if(this.r.m == null) throw "No string matched";
	if(this.r.r == null) {
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	return this.r.r;
}
EReg.prototype.r = null;
EReg.prototype.replace = function(s,by) {
	return s.replace(this.r,by);
}
EReg.prototype.split = function(s) {
	var d = "#__delim__#";
	return s.replace(this.r,d).split(d);
}
EReg.prototype.__class__ = EReg;
haxe.net.UrlExtensions = function() { }
haxe.net.UrlExtensions.__name__ = ["haxe","net","UrlExtensions"];
haxe.net.UrlExtensions.toParsedUrl = function(s) {
	var nonNull = function(s1) {
		return (s1 == null?"":s1);
	}
	return (haxe.net.UrlExtensions.UrlPattern.match(s)?Option.Some(haxe.net.UrlExtensions.formUrl(nonNull(haxe.net.UrlExtensions.UrlPattern.matched(haxe.net.UrlExtensions.Protocol)),nonNull(haxe.net.UrlExtensions.UrlPattern.matched(haxe.net.UrlExtensions.Hostname)),nonNull(haxe.net.UrlExtensions.UrlPattern.matched(haxe.net.UrlExtensions.Port)),nonNull(haxe.net.UrlExtensions.UrlPattern.matched(haxe.net.UrlExtensions.Pathname)),nonNull(haxe.net.UrlExtensions.UrlPattern.matched(haxe.net.UrlExtensions.Search)),nonNull(haxe.net.UrlExtensions.UrlPattern.matched(haxe.net.UrlExtensions.Hash)))):Option.None);
}
haxe.net.UrlExtensions.toUrl = function(parsed) {
	return parsed.href;
}
haxe.net.UrlExtensions.withProtocol = function(parsed,protocol) {
	return haxe.net.UrlExtensions.formUrl(protocol,parsed.hostname,parsed.port,parsed.pathname,parsed.search,parsed.hash);
}
haxe.net.UrlExtensions.withHostname = function(parsed,hostname) {
	return haxe.net.UrlExtensions.formUrl(parsed.protocol,hostname,parsed.port,parsed.pathname,parsed.search,parsed.hash);
}
haxe.net.UrlExtensions.withPort = function(parsed,port) {
	return haxe.net.UrlExtensions.formUrl(parsed.protocol,parsed.hostname,port,parsed.pathname,parsed.search,parsed.hash);
}
haxe.net.UrlExtensions.withPathname = function(parsed,pathname) {
	return haxe.net.UrlExtensions.formUrl(parsed.protocol,parsed.hostname,parsed.port,pathname,parsed.search,parsed.hash);
}
haxe.net.UrlExtensions.withSearch = function(parsed,search) {
	return haxe.net.UrlExtensions.formUrl(parsed.protocol,parsed.hostname,parsed.port,parsed.pathname,search,parsed.hash);
}
haxe.net.UrlExtensions.withHash = function(parsed,hash) {
	return haxe.net.UrlExtensions.formUrl(parsed.protocol,parsed.hostname,parsed.port,parsed.pathname,parsed.search,hash);
}
haxe.net.UrlExtensions.withFile = function(parsed,file) {
	var filePattern = new EReg("[/]([^/]*)$","i");
	var newPathname = filePattern.replace(parsed.pathname,"/" + file);
	return haxe.net.UrlExtensions.formUrl(parsed.protocol,parsed.hostname,parsed.port,newPathname,parsed.search,parsed.hash);
}
haxe.net.UrlExtensions.withoutProtocol = function(parsed) {
	return haxe.net.UrlExtensions.withProtocol(parsed,"");
}
haxe.net.UrlExtensions.withoutHostname = function(parsed) {
	return haxe.net.UrlExtensions.withHostname(parsed,"");
}
haxe.net.UrlExtensions.withoutPort = function(parsed) {
	return haxe.net.UrlExtensions.withPort(parsed,"");
}
haxe.net.UrlExtensions.withoutPathname = function(parsed) {
	return haxe.net.UrlExtensions.withPathname(parsed,"");
}
haxe.net.UrlExtensions.withoutSearch = function(parsed) {
	return haxe.net.UrlExtensions.withSearch(parsed,"");
}
haxe.net.UrlExtensions.withoutHash = function(parsed) {
	return haxe.net.UrlExtensions.withHash(parsed,"");
}
haxe.net.UrlExtensions.withoutFile = function(parsed) {
	return haxe.net.UrlExtensions.withFile(parsed,"");
}
haxe.net.UrlExtensions.addQueryParameters = function(url,params) {
	var tqs = haxe.net.UrlExtensions.toQueryString(params);
	return (function($this) {
		var $r;
		var $e = (haxe.net.UrlExtensions.toParsedUrl(url));
		switch( $e[1] ) {
		case 0:
		{
			$r = url + tqs;
		}break;
		case 1:
		var parsed = $e[2];
		{
			$r = (parsed.search.length == 0?url + tqs:(parsed.search.length == 1?url + tqs.substr(1):(url + "&") + tqs.substr(1)));
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
haxe.net.UrlExtensions.extractQueryParameters = function(url) {
	return haxe.net.UrlExtensions.toQueryParameters(haxe.net.UrlExtensions.extractSearch(url));
}
haxe.net.UrlExtensions.extractSearch = function(url) {
	return haxe.net.UrlExtensions.extractField(url,"search");
}
haxe.net.UrlExtensions.extractProtocol = function(url) {
	return haxe.net.UrlExtensions.extractField(url,"protocol");
}
haxe.net.UrlExtensions.extractHash = function(url) {
	return haxe.net.UrlExtensions.extractField(url,"hash");
}
haxe.net.UrlExtensions.extractPathname = function(url) {
	return haxe.net.UrlExtensions.extractField(url,"pathname");
}
haxe.net.UrlExtensions.extractHostname = function(url) {
	return haxe.net.UrlExtensions.extractField(url,"hostname");
}
haxe.net.UrlExtensions.extractHost = function(url) {
	return haxe.net.UrlExtensions.extractField(url,"host");
}
haxe.net.UrlExtensions.extractPort = function(url) {
	return StringExtensions.toInt(haxe.net.UrlExtensions.extractField(url,"port"));
}
haxe.net.UrlExtensions.toQueryParameters = function(query) {
	return (!StringExtensions.startsWith(query,"?")?haxe.data.collections.Map.create():ArrayExtensions.foldl(ArrayExtensions.flatMap(query.substr(1).split("&"),function(kv) {
		var a = ArrayExtensions.map(kv.split("="),function(s) {
			return StringExtensions.urlDecode(s);
		});
		return (a.length == 0?[]:(a.length == 1?[DynamicExtensions.entuple(a[0],"")]:[DynamicExtensions.entuple(a[0],a[1])]));
	}),haxe.data.collections.Map.create(),function(m,t) {
		return m.add(t);
	}));
}
haxe.net.UrlExtensions.toQueryString = function(query) {
	return query.foldl("?",function(url,tuple) {
		var fieldName = tuple._1;
		var fieldValue = tuple._2;
		var rest = (StringTools.urlEncode(fieldName) + "=") + StringTools.urlEncode(fieldValue);
		return url + ((url == "?"?rest:"&" + rest));
	});
}
haxe.net.UrlExtensions.formUrl = function(protocol,hostname,port,pathname,search,hash) {
	var host = hostname + ((port == ""?"":":" + port));
	var $final = ((host + pathname) + search) + hash;
	return { hash : hash, host : host, hostname : hostname, href : (protocol.length > 0?((protocol + "//") + $final):$final), pathname : pathname, port : port, protocol : protocol, search : search}
}
haxe.net.UrlExtensions.extractField = function(url,field) {
	return OptionExtensions.getOrElseC(OptionExtensions.map(haxe.net.UrlExtensions.toParsedUrl(url),function(parsed) {
		return Reflect.field(parsed,field);
	}),"");
}
haxe.net.UrlExtensions.prototype.__class__ = haxe.net.UrlExtensions;
if(!haxe.test._Dispatcher) haxe.test._Dispatcher = {}
haxe.test._Dispatcher.EventException = { __ename__ : ["haxe","test","_Dispatcher","EventException"], __constructs__ : ["StopPropagation"] }
haxe.test._Dispatcher.EventException.StopPropagation = ["StopPropagation",0];
haxe.test._Dispatcher.EventException.StopPropagation.toString = $estr;
haxe.test._Dispatcher.EventException.StopPropagation.__enum__ = haxe.test._Dispatcher.EventException;
haxe.test.Dispatcher = function(p) { if( p === $_ ) return; {
	this.handlers = new Array();
}}
haxe.test.Dispatcher.__name__ = ["haxe","test","Dispatcher"];
haxe.test.Dispatcher.stop = function() {
	throw haxe.test._Dispatcher.EventException.StopPropagation;
}
haxe.test.Dispatcher.prototype.add = function(h) {
	this.handlers.push(h);
	return h;
}
haxe.test.Dispatcher.prototype.clear = function() {
	this.handlers = new Array();
}
haxe.test.Dispatcher.prototype.dispatch = function(e) {
	try {
		var list = this.handlers.copy();
		{
			var _g = 0;
			while(_g < list.length) {
				var l = list[_g];
				++_g;
				l(e);
			}
		}
		return true;
	}
	catch( $e0 ) {
		if( js.Boot.__instanceof($e0,haxe.test._Dispatcher.EventException) ) {
			var exc = $e0;
			{
				return false;
			}
		} else throw($e0);
	}
}
haxe.test.Dispatcher.prototype.handlers = null;
haxe.test.Dispatcher.prototype.has = function() {
	return this.handlers.length > 0;
}
haxe.test.Dispatcher.prototype.remove = function(h) {
	{
		var _g1 = 0, _g = this.handlers.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(Reflect.compareMethods(this.handlers[i],h)) return this.handlers.splice(i,1)[0];
		}
	}
	return null;
}
haxe.test.Dispatcher.prototype.__class__ = haxe.test.Dispatcher;
haxe.test.Notifier = function(p) { if( p === $_ ) return; {
	this.handlers = new Array();
}}
haxe.test.Notifier.__name__ = ["haxe","test","Notifier"];
haxe.test.Notifier.stop = function() {
	throw haxe.test._Dispatcher.EventException.StopPropagation;
}
haxe.test.Notifier.prototype.add = function(h) {
	this.handlers.push(h);
	return h;
}
haxe.test.Notifier.prototype.clear = function() {
	this.handlers = new Array();
}
haxe.test.Notifier.prototype.dispatch = function() {
	try {
		var list = this.handlers.copy();
		{
			var _g = 0;
			while(_g < list.length) {
				var l = list[_g];
				++_g;
				l();
			}
		}
		return true;
	}
	catch( $e0 ) {
		if( js.Boot.__instanceof($e0,haxe.test._Dispatcher.EventException) ) {
			var exc = $e0;
			{
				return false;
			}
		} else throw($e0);
	}
}
haxe.test.Notifier.prototype.handlers = null;
haxe.test.Notifier.prototype.has = function() {
	return this.handlers.length > 0;
}
haxe.test.Notifier.prototype.remove = function(h) {
	{
		var _g1 = 0, _g = this.handlers.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(Reflect.compareMethods(this.handlers[i],h)) return this.handlers.splice(i,1)[0];
		}
	}
	return null;
}
haxe.test.Notifier.prototype.__class__ = haxe.test.Notifier;
haxe.net.HttpResponseCodeExtensions = function() { }
haxe.net.HttpResponseCodeExtensions.__name__ = ["haxe","net","HttpResponseCodeExtensions"];
haxe.net.HttpResponseCodeExtensions.toHttpResponseCode = function(code) {
	return (function($this) {
		var $r;
		switch(code) {
		case 100:{
			$r = haxe.net.HttpResponseCode.Normal(haxe.net.HttpNormal.Informational(haxe.net.HttpInformational.Continue));
		}break;
		case 101:{
			$r = haxe.net.HttpResponseCode.Normal(haxe.net.HttpNormal.Informational(haxe.net.HttpInformational.SwitchingProtocols));
		}break;
		case 102:{
			$r = haxe.net.HttpResponseCode.Normal(haxe.net.HttpNormal.Informational(haxe.net.HttpInformational.Processing));
		}break;
		case 200:{
			$r = haxe.net.HttpResponseCode.Normal(haxe.net.HttpNormal.Success(haxe.net.HttpSuccess.OK));
		}break;
		case 201:{
			$r = haxe.net.HttpResponseCode.Normal(haxe.net.HttpNormal.Success(haxe.net.HttpSuccess.Created));
		}break;
		case 202:{
			$r = haxe.net.HttpResponseCode.Normal(haxe.net.HttpNormal.Success(haxe.net.HttpSuccess.Accepted));
		}break;
		case 203:{
			$r = haxe.net.HttpResponseCode.Normal(haxe.net.HttpNormal.Success(haxe.net.HttpSuccess.Non));
		}break;
		case 204:{
			$r = haxe.net.HttpResponseCode.Normal(haxe.net.HttpNormal.Success(haxe.net.HttpSuccess.NoContent));
		}break;
		case 205:{
			$r = haxe.net.HttpResponseCode.Normal(haxe.net.HttpNormal.Success(haxe.net.HttpSuccess.ResetContent));
		}break;
		case 206:{
			$r = haxe.net.HttpResponseCode.Normal(haxe.net.HttpNormal.Success(haxe.net.HttpSuccess.PartialContent));
		}break;
		case 207:{
			$r = haxe.net.HttpResponseCode.Normal(haxe.net.HttpNormal.Success(haxe.net.HttpSuccess.Multi));
		}break;
		case 300:{
			$r = haxe.net.HttpResponseCode.Normal(haxe.net.HttpNormal.Redirection(haxe.net.HttpRedirection.MultipleChoices));
		}break;
		case 301:{
			$r = haxe.net.HttpResponseCode.Normal(haxe.net.HttpNormal.Redirection(haxe.net.HttpRedirection.MovedPermanently));
		}break;
		case 302:{
			$r = haxe.net.HttpResponseCode.Normal(haxe.net.HttpNormal.Redirection(haxe.net.HttpRedirection.Found));
		}break;
		case 303:{
			$r = haxe.net.HttpResponseCode.Normal(haxe.net.HttpNormal.Redirection(haxe.net.HttpRedirection.SeeOther));
		}break;
		case 304:{
			$r = haxe.net.HttpResponseCode.Normal(haxe.net.HttpNormal.Redirection(haxe.net.HttpRedirection.NotModified));
		}break;
		case 305:{
			$r = haxe.net.HttpResponseCode.Normal(haxe.net.HttpNormal.Redirection(haxe.net.HttpRedirection.UseProxy));
		}break;
		case 307:{
			$r = haxe.net.HttpResponseCode.Normal(haxe.net.HttpNormal.Redirection(haxe.net.HttpRedirection.TemporaryRedirect));
		}break;
		case 400:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Client(haxe.net.HttpClientError.BadRequest));
		}break;
		case 401:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Client(haxe.net.HttpClientError.Unauthorized));
		}break;
		case 402:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Client(haxe.net.HttpClientError.PaymentRequired));
		}break;
		case 403:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Client(haxe.net.HttpClientError.Forbidden));
		}break;
		case 404:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Client(haxe.net.HttpClientError.NotFound));
		}break;
		case 405:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Client(haxe.net.HttpClientError.MethodNotAllowed));
		}break;
		case 406:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Client(haxe.net.HttpClientError.NotAcceptable));
		}break;
		case 407:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Client(haxe.net.HttpClientError.ProxyAuthenticationRequired));
		}break;
		case 408:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Client(haxe.net.HttpClientError.RequestTimeout));
		}break;
		case 409:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Client(haxe.net.HttpClientError.Conflict));
		}break;
		case 410:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Client(haxe.net.HttpClientError.Gone));
		}break;
		case 411:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Client(haxe.net.HttpClientError.LengthRequired));
		}break;
		case 412:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Client(haxe.net.HttpClientError.PreconditionFailed));
		}break;
		case 413:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Client(haxe.net.HttpClientError.RequestEntityTooLarge));
		}break;
		case 414:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Client(haxe.net.HttpClientError.Request));
		}break;
		case 415:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Client(haxe.net.HttpClientError.UnsupportedMediaType));
		}break;
		case 416:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Client(haxe.net.HttpClientError.RequestedRangeNotSatisfiable));
		}break;
		case 417:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Client(haxe.net.HttpClientError.ExpectationFailed));
		}break;
		case 421:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Client(haxe.net.HttpClientError.TooManyConnections));
		}break;
		case 422:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Client(haxe.net.HttpClientError.UnprocessableEntity));
		}break;
		case 423:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Client(haxe.net.HttpClientError.Locked));
		}break;
		case 424:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Client(haxe.net.HttpClientError.FailedDependency));
		}break;
		case 425:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Client(haxe.net.HttpClientError.UnorderedCollection));
		}break;
		case 426:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Client(haxe.net.HttpClientError.UpgradeRequired));
		}break;
		case 449:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Client(haxe.net.HttpClientError.RetryWith));
		}break;
		case 500:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Server(haxe.net.HttpServerError.InternalServerError));
		}break;
		case 501:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Server(haxe.net.HttpServerError.NotImplemented));
		}break;
		case 502:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Server(haxe.net.HttpServerError.BadGateway));
		}break;
		case 503:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Server(haxe.net.HttpServerError.ServiceUnavailable));
		}break;
		case 504:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Server(haxe.net.HttpServerError.GatewayTimeout));
		}break;
		case 505:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Server(haxe.net.HttpServerError.HTTPVersionNotSupported));
		}break;
		case 506:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Server(haxe.net.HttpServerError.VariantAlsoNegotiates));
		}break;
		case 507:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Server(haxe.net.HttpServerError.InsufficientStorage));
		}break;
		case 509:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Server(haxe.net.HttpServerError.BandwidthLimitExceeded));
		}break;
		case 510:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Server(haxe.net.HttpServerError.NotExtended));
		}break;
		case 530:{
			$r = haxe.net.HttpResponseCode.Error(haxe.net.HttpError.Server(haxe.net.HttpServerError.UserAccessDenied));
		}break;
		default:{
			$r = haxe.net.HttpResponseCode.Normal(haxe.net.HttpNormal.Success(haxe.net.HttpSuccess.OK));
		}break;
		}
		return $r;
	}(this));
}
haxe.net.HttpResponseCodeExtensions.isNormal = function(response) {
	return (function($this) {
		var $r;
		var $e = (response);
		switch( $e[1] ) {
		case 0:
		var v = $e[2];
		{
			$r = true;
		}break;
		default:{
			$r = false;
		}break;
		}
		return $r;
	}(this));
}
haxe.net.HttpResponseCodeExtensions.isInformational = function(response) {
	return (function($this) {
		var $r;
		var $e = (response);
		switch( $e[1] ) {
		case 0:
		var v = $e[2];
		{
			$r = (function($this) {
				var $r;
				var $e = (v);
				switch( $e[1] ) {
				case 0:
				var v1 = $e[2];
				{
					$r = true;
				}break;
				default:{
					$r = false;
				}break;
				}
				return $r;
			}($this));
		}break;
		default:{
			$r = false;
		}break;
		}
		return $r;
	}(this));
}
haxe.net.HttpResponseCodeExtensions.isSuccess = function(response) {
	return (function($this) {
		var $r;
		var $e = (response);
		switch( $e[1] ) {
		case 0:
		var v = $e[2];
		{
			$r = (function($this) {
				var $r;
				var $e = (v);
				switch( $e[1] ) {
				case 1:
				var v1 = $e[2];
				{
					$r = true;
				}break;
				default:{
					$r = false;
				}break;
				}
				return $r;
			}($this));
		}break;
		default:{
			$r = false;
		}break;
		}
		return $r;
	}(this));
}
haxe.net.HttpResponseCodeExtensions.isRedirection = function(response) {
	return (function($this) {
		var $r;
		var $e = (response);
		switch( $e[1] ) {
		case 0:
		var v = $e[2];
		{
			$r = (function($this) {
				var $r;
				var $e = (v);
				switch( $e[1] ) {
				case 2:
				var v1 = $e[2];
				{
					$r = true;
				}break;
				default:{
					$r = false;
				}break;
				}
				return $r;
			}($this));
		}break;
		default:{
			$r = false;
		}break;
		}
		return $r;
	}(this));
}
haxe.net.HttpResponseCodeExtensions.isError = function(response) {
	return (function($this) {
		var $r;
		var $e = (response);
		switch( $e[1] ) {
		case 1:
		var v = $e[2];
		{
			$r = true;
		}break;
		default:{
			$r = false;
		}break;
		}
		return $r;
	}(this));
}
haxe.net.HttpResponseCodeExtensions.isClientError = function(response) {
	return (function($this) {
		var $r;
		var $e = (response);
		switch( $e[1] ) {
		case 1:
		var v = $e[2];
		{
			$r = (function($this) {
				var $r;
				var $e = (v);
				switch( $e[1] ) {
				case 0:
				var v1 = $e[2];
				{
					$r = true;
				}break;
				default:{
					$r = false;
				}break;
				}
				return $r;
			}($this));
		}break;
		default:{
			$r = false;
		}break;
		}
		return $r;
	}(this));
}
haxe.net.HttpResponseCodeExtensions.isServerError = function(response) {
	return (function($this) {
		var $r;
		var $e = (response);
		switch( $e[1] ) {
		case 1:
		var v = $e[2];
		{
			$r = (function($this) {
				var $r;
				var $e = (v);
				switch( $e[1] ) {
				case 1:
				var v1 = $e[2];
				{
					$r = true;
				}break;
				default:{
					$r = false;
				}break;
				}
				return $r;
			}($this));
		}break;
		default:{
			$r = false;
		}break;
		}
		return $r;
	}(this));
}
haxe.net.HttpResponseCodeExtensions.toStatusCode = function(response) {
	return (function($this) {
		var $r;
		var $e = (response);
		switch( $e[1] ) {
		case 0:
		var v = $e[2];
		{
			$r = (function($this) {
				var $r;
				var $e = (v);
				switch( $e[1] ) {
				case 0:
				var v1 = $e[2];
				{
					$r = (function($this) {
						var $r;
						var $e = (v1);
						switch( $e[1] ) {
						case 0:
						{
							$r = 100;
						}break;
						case 1:
						{
							$r = 101;
						}break;
						case 2:
						{
							$r = 102;
						}break;
						default:{
							$r = null;
						}break;
						}
						return $r;
					}($this));
				}break;
				case 1:
				var v1 = $e[2];
				{
					$r = (function($this) {
						var $r;
						var $e = (v1);
						switch( $e[1] ) {
						case 0:
						{
							$r = 200;
						}break;
						case 1:
						{
							$r = 201;
						}break;
						case 2:
						{
							$r = 202;
						}break;
						case 3:
						{
							$r = 203;
						}break;
						case 4:
						{
							$r = 204;
						}break;
						case 5:
						{
							$r = 205;
						}break;
						case 6:
						{
							$r = 206;
						}break;
						case 7:
						{
							$r = 207;
						}break;
						default:{
							$r = null;
						}break;
						}
						return $r;
					}($this));
				}break;
				case 2:
				var v1 = $e[2];
				{
					$r = (function($this) {
						var $r;
						var $e = (v1);
						switch( $e[1] ) {
						case 0:
						{
							$r = 300;
						}break;
						case 1:
						{
							$r = 301;
						}break;
						case 2:
						{
							$r = 302;
						}break;
						case 3:
						{
							$r = 303;
						}break;
						case 4:
						{
							$r = 304;
						}break;
						case 5:
						{
							$r = 305;
						}break;
						case 6:
						{
							$r = 307;
						}break;
						default:{
							$r = null;
						}break;
						}
						return $r;
					}($this));
				}break;
				default:{
					$r = null;
				}break;
				}
				return $r;
			}($this));
		}break;
		case 1:
		var v = $e[2];
		{
			$r = (function($this) {
				var $r;
				var $e = (v);
				switch( $e[1] ) {
				case 0:
				var v1 = $e[2];
				{
					$r = (function($this) {
						var $r;
						var $e = (v1);
						switch( $e[1] ) {
						case 0:
						{
							$r = 400;
						}break;
						case 1:
						{
							$r = 401;
						}break;
						case 2:
						{
							$r = 402;
						}break;
						case 3:
						{
							$r = 403;
						}break;
						case 4:
						{
							$r = 404;
						}break;
						case 5:
						{
							$r = 405;
						}break;
						case 6:
						{
							$r = 406;
						}break;
						case 7:
						{
							$r = 407;
						}break;
						case 8:
						{
							$r = 408;
						}break;
						case 9:
						{
							$r = 409;
						}break;
						case 10:
						{
							$r = 410;
						}break;
						case 11:
						{
							$r = 411;
						}break;
						case 12:
						{
							$r = 412;
						}break;
						case 13:
						{
							$r = 413;
						}break;
						case 14:
						{
							$r = 414;
						}break;
						case 15:
						{
							$r = 415;
						}break;
						case 16:
						{
							$r = 416;
						}break;
						case 17:
						{
							$r = 417;
						}break;
						case 18:
						{
							$r = 421;
						}break;
						case 19:
						{
							$r = 422;
						}break;
						case 20:
						{
							$r = 423;
						}break;
						case 21:
						{
							$r = 424;
						}break;
						case 22:
						{
							$r = 425;
						}break;
						case 23:
						{
							$r = 426;
						}break;
						case 24:
						{
							$r = 449;
						}break;
						default:{
							$r = null;
						}break;
						}
						return $r;
					}($this));
				}break;
				case 1:
				var v1 = $e[2];
				{
					$r = (function($this) {
						var $r;
						var $e = (v1);
						switch( $e[1] ) {
						case 0:
						{
							$r = 500;
						}break;
						case 1:
						{
							$r = 501;
						}break;
						case 2:
						{
							$r = 502;
						}break;
						case 3:
						{
							$r = 503;
						}break;
						case 4:
						{
							$r = 504;
						}break;
						case 5:
						{
							$r = 505;
						}break;
						case 6:
						{
							$r = 506;
						}break;
						case 7:
						{
							$r = 507;
						}break;
						case 8:
						{
							$r = 509;
						}break;
						case 9:
						{
							$r = 510;
						}break;
						case 10:
						{
							$r = 530;
						}break;
						default:{
							$r = null;
						}break;
						}
						return $r;
					}($this));
				}break;
				default:{
					$r = null;
				}break;
				}
				return $r;
			}($this));
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
haxe.net.HttpResponseCodeExtensions.prototype.__class__ = haxe.net.HttpResponseCodeExtensions;
haxe.test.ui.common.IReport = function() { }
haxe.test.ui.common.IReport.__name__ = ["haxe","test","ui","common","IReport"];
haxe.test.ui.common.IReport.prototype.displayHeader = null;
haxe.test.ui.common.IReport.prototype.displaySuccessResults = null;
haxe.test.ui.common.IReport.prototype.setHandler = null;
haxe.test.ui.common.IReport.prototype.__class__ = haxe.test.ui.common.IReport;
if(!haxe.test.ui.text) haxe.test.ui.text = {}
haxe.test.ui.text.PlainTextReport = function(runner,outputHandler) { if( runner === $_ ) return; {
	this.aggregator = new haxe.test.ui.common.ResultAggregator(runner,true);
	runner.onStart.add($closure(this,"start"));
	this.aggregator.onComplete.add($closure(this,"complete"));
	if(null != outputHandler) this.setHandler(outputHandler);
	this.displaySuccessResults = haxe.test.ui.common.SuccessResultsDisplayMode.AlwaysShowSuccessResults;
	this.displayHeader = haxe.test.ui.common.HeaderDisplayMode.AlwaysShowHeader;
}}
haxe.test.ui.text.PlainTextReport.__name__ = ["haxe","test","ui","text","PlainTextReport"];
haxe.test.ui.text.PlainTextReport.prototype.addHeader = function(buf,result) {
	if(!haxe.test.ui.common.ReportTools.hasHeader(this,result.stats)) return;
	var end = haxe.Timer.stamp();
	var time = Std["int"]((end - this.startTime) * 1000) / 1000;
	buf.b[buf.b.length] = ((("results: " + ((result.stats.isOk?"ALL TESTS OK":"SOME TESTS FAILURES"))) + this.newline) + " ") + this.newline;
	buf.b[buf.b.length] = ("assertations: " + result.stats.assertations) + this.newline;
	buf.b[buf.b.length] = ("successes: " + result.stats.successes) + this.newline;
	buf.b[buf.b.length] = ("errors: " + result.stats.errors) + this.newline;
	buf.b[buf.b.length] = ("failures: " + result.stats.failures) + this.newline;
	buf.b[buf.b.length] = ("warnings: " + result.stats.warnings) + this.newline;
	buf.b[buf.b.length] = ("execution time: " + time) + this.newline;
	buf.b[buf.b.length] = this.newline;
}
haxe.test.ui.text.PlainTextReport.prototype.aggregator = null;
haxe.test.ui.text.PlainTextReport.prototype.complete = function(result) {
	this.result = result;
	this.handler(this);
}
haxe.test.ui.text.PlainTextReport.prototype.displayHeader = null;
haxe.test.ui.text.PlainTextReport.prototype.displaySuccessResults = null;
haxe.test.ui.text.PlainTextReport.prototype.dumpStack = function(stack) {
	if(stack.length == 0) return "";
	var parts = haxe.Stack.toString(stack).split("\n");
	var r = [];
	{
		var _g = 0;
		while(_g < parts.length) {
			var part = parts[_g];
			++_g;
			if(part.indexOf(" utest.") >= 0) continue;
			r.push(part);
		}
	}
	return r.join(this.newline);
}
haxe.test.ui.text.PlainTextReport.prototype.getResults = function() {
	var buf = new StringBuf();
	this.addHeader(buf,this.result);
	{
		var _g = 0, _g1 = this.result.packageNames();
		while(_g < _g1.length) {
			var pname = _g1[_g];
			++_g;
			var pack = this.result.getPackage(pname);
			if(haxe.test.ui.common.ReportTools.skipResult(this,pack.stats,this.result.stats.isOk)) continue;
			{
				var _g2 = 0, _g3 = pack.classNames();
				while(_g2 < _g3.length) {
					var cname = _g3[_g2];
					++_g2;
					var cls = pack.getClass(cname);
					if(haxe.test.ui.common.ReportTools.skipResult(this,cls.stats,this.result.stats.isOk)) continue;
					buf.b[buf.b.length] = (((pname == ""?"":pname + ".")) + cname) + this.newline;
					{
						var _g4 = 0, _g5 = cls.methodNames();
						while(_g4 < _g5.length) {
							var mname = _g5[_g4];
							++_g4;
							var fix = cls.get(mname);
							if(haxe.test.ui.common.ReportTools.skipResult(this,fix.stats,this.result.stats.isOk)) continue;
							buf.b[buf.b.length] = (this.indents(1) + mname) + ": ";
							if(fix.stats.isOk) {
								buf.b[buf.b.length] = "OK ";
							}
							else if(fix.stats.hasErrors) {
								buf.b[buf.b.length] = "ERROR ";
							}
							else if(fix.stats.hasFailures) {
								buf.b[buf.b.length] = "FAILURE ";
							}
							else if(fix.stats.hasWarnings) {
								buf.b[buf.b.length] = "WARNING ";
							}
							var messages = "";
							{ var $it0 = fix.iterator();
							while( $it0.hasNext() ) { var assertation = $it0.next();
							{
								var $e = (assertation);
								switch( $e[1] ) {
								case 0:
								var pos = $e[2];
								{
									buf.b[buf.b.length] = ".";
								}break;
								case 1:
								var pos = $e[3], msg = $e[2];
								{
									buf.b[buf.b.length] = "F";
									messages += ((((this.indents(2) + "line: ") + pos.lineNumber) + ", ") + msg) + this.newline;
								}break;
								case 2:
								var s = $e[3], e = $e[2];
								{
									buf.b[buf.b.length] = "E";
									messages += ((this.indents(2) + Std.string(e)) + this.dumpStack(s)) + this.newline;
								}break;
								case 3:
								var s = $e[3], e = $e[2];
								{
									buf.b[buf.b.length] = "S";
									messages += ((this.indents(2) + Std.string(e)) + this.dumpStack(s)) + this.newline;
								}break;
								case 4:
								var s = $e[3], e = $e[2];
								{
									buf.b[buf.b.length] = "T";
									messages += ((this.indents(2) + Std.string(e)) + this.dumpStack(s)) + this.newline;
								}break;
								case 5:
								var s = $e[3], missedAsyncs = $e[2];
								{
									buf.b[buf.b.length] = "O";
									messages += (((this.indents(2) + "missed async calls: ") + missedAsyncs) + this.dumpStack(s)) + this.newline;
								}break;
								case 6:
								var s = $e[3], e = $e[2];
								{
									buf.b[buf.b.length] = "A";
									messages += ((this.indents(2) + Std.string(e)) + this.dumpStack(s)) + this.newline;
								}break;
								case 7:
								var msg = $e[2];
								{
									buf.b[buf.b.length] = "W";
									messages += (this.indents(2) + msg) + this.newline;
								}break;
								}
							}
							}}
							buf.b[buf.b.length] = this.newline;
							buf.b[buf.b.length] = messages;
						}
					}
				}
			}
		}
	}
	return buf.b.join("");
}
haxe.test.ui.text.PlainTextReport.prototype.handler = null;
haxe.test.ui.text.PlainTextReport.prototype.indent = null;
haxe.test.ui.text.PlainTextReport.prototype.indents = function(c) {
	var s = "";
	{
		var _g = 0;
		while(_g < c) {
			var _ = _g++;
			s += this.indent;
		}
	}
	return s;
}
haxe.test.ui.text.PlainTextReport.prototype.newline = null;
haxe.test.ui.text.PlainTextReport.prototype.result = null;
haxe.test.ui.text.PlainTextReport.prototype.setHandler = function(handler) {
	this.handler = handler;
}
haxe.test.ui.text.PlainTextReport.prototype.start = function(e) {
	this.startTime = haxe.Timer.stamp();
}
haxe.test.ui.text.PlainTextReport.prototype.startTime = null;
haxe.test.ui.text.PlainTextReport.prototype.__class__ = haxe.test.ui.text.PlainTextReport;
haxe.test.ui.text.PlainTextReport.__interfaces__ = [haxe.test.ui.common.IReport];
haxe.util.ObjectExtensions = function() { }
haxe.util.ObjectExtensions.__name__ = ["haxe","util","ObjectExtensions"];
haxe.util.ObjectExtensions.copy = function(d,shallow) {
	if(shallow == null) shallow = true;
	return haxe.util.ObjectExtensions.copyTo(d,{ },shallow);
}
haxe.util.ObjectExtensions.copyTo = function(src,dest,shallow) {
	if(shallow == null) shallow = true;
	var safecopy = function(d) {
		return (function($this) {
			var $r;
			var $e = (Type["typeof"](d));
			switch( $e[1] ) {
			case 4:
			{
				$r = haxe.util.ObjectExtensions.copy(d,shallow);
			}break;
			default:{
				$r = d;
			}break;
			}
			return $r;
		}(this));
	}
	{
		var _g = 0, _g1 = Reflect.fields(src);
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			var value = Reflect.field(src,field);
			dest[field] = (shallow?value:safecopy(value));
		}
	}
	return src;
}
haxe.util.ObjectExtensions.extendWith = function(dest,src,shallow) {
	if(shallow == null) shallow = true;
	haxe.util.ObjectExtensions.copyTo(src,dest);
	return dest;
}
haxe.util.ObjectExtensions.fields = function(d) {
	return Reflect.fields(d);
}
haxe.util.ObjectExtensions.mapValues = function(d,f) {
	return haxe.util.ObjectExtensions.setAll({ },ArrayExtensions.map(Reflect.fields(d),function(name) {
		return DynamicExtensions.entuple(name,f(Reflect.field(d,name)));
	}));
}
haxe.util.ObjectExtensions.set = function(d,k,v) {
	d[k] = v;
	return d;
}
haxe.util.ObjectExtensions.setAny = function(d,k,v) {
	d[k] = v;
	return d;
}
haxe.util.ObjectExtensions.setAll = function(d,fields) {
	{ var $it0 = fields.iterator();
	while( $it0.hasNext() ) { var field = $it0.next();
	{
		d[field._1] = field._2;
	}
	}}
	return d;
}
haxe.util.ObjectExtensions.replaceAll = function(d1,d2,def) {
	var names = Reflect.fields(d2);
	var oldValues = haxe.util.ObjectExtensions.extractValues(d1,names,def);
	haxe.util.ObjectExtensions.extendWith(d1,d2);
	return ArrayExtensions.foldl(ArrayExtensions.zip(names,oldValues),{ },function(o,t) {
		o[t._1] = t._2;
		return o;
	});
}
haxe.util.ObjectExtensions.setAllAny = function(d,fields) {
	{ var $it0 = fields.iterator();
	while( $it0.hasNext() ) { var field = $it0.next();
	{
		d[field._1] = field._2;
	}
	}}
	return d;
}
haxe.util.ObjectExtensions.replaceAllAny = function(d1,d2,def) {
	var names = Reflect.fields(d2);
	var oldValues = haxe.util.ObjectExtensions.extractValues(d1,names,def);
	haxe.util.ObjectExtensions.extendWith(d1,d2);
	return ArrayExtensions.foldl(ArrayExtensions.zip(names,oldValues),{ },function(o,t) {
		o[t._1] = t._2;
		return o;
	});
}
haxe.util.ObjectExtensions.get = function(d,k) {
	return (Reflect.hasField(d,k)?Option.Some(Reflect.field(d,k)):Option.None);
}
haxe.util.ObjectExtensions.getAny = function(d,k) {
	return (Reflect.hasField(d,k)?Option.Some(Reflect.field(d,k)):Option.None);
}
haxe.util.ObjectExtensions.extractAll = function(d) {
	return ArrayExtensions.map(Reflect.fields(d),function(name) {
		return DynamicExtensions.entuple(name,Reflect.field(d,name));
	});
}
haxe.util.ObjectExtensions.extractAllAny = function(d) {
	return haxe.util.ObjectExtensions.extractAll(d);
}
haxe.util.ObjectExtensions.extractValuesAny = function(d,names,def) {
	return haxe.util.ObjectExtensions.extractValues(d,names,def);
}
haxe.util.ObjectExtensions.extractValues = function(d,names,def) {
	var result = [];
	{ var $it0 = names.iterator();
	while( $it0.hasNext() ) { var field = $it0.next();
	{
		var value = Reflect.field(d,field);
		result.push((value != null?value:def));
	}
	}}
	return result;
}
haxe.util.ObjectExtensions.iterator = function(d) {
	return Reflect.fields(d).iterator();
}
haxe.util.ObjectExtensions.prototype.__class__ = haxe.util.ObjectExtensions;
haxe.data.collections.IterableExtensions = function() { }
haxe.data.collections.IterableExtensions.__name__ = ["haxe","data","collections","IterableExtensions"];
haxe.data.collections.IterableExtensions.size = function(iterable) {
	var size = 0;
	{ var $it0 = iterable.iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
	++size;
	}}
	return size;
}
haxe.data.collections.IterableExtensions.filter = function(iter,f) {
	return haxe.data.collections.IterableExtensions.foldl(iter,[],function(a,b) {
		return (f(b)?haxe.data.collections.IterableExtensions.append(a,b):a);
	});
}
haxe.data.collections.IterableExtensions.foldl = function(iter,seed,mapper) {
	var folded = seed;
	{ var $it0 = iter.iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
	{
		folded = mapper(folded,e);
	}
	}}
	return folded;
}
haxe.data.collections.IterableExtensions.concat = function(iter1,iter2) {
	var result = [];
	result.push(iter1);
	result.push(iter2);
	return result;
}
haxe.data.collections.IterableExtensions.foldr = function(iterable,z,f) {
	var r = z;
	var a = IterableExtensions.toArray(iterable);
	{
		var _g1 = 0, _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			var e = a[(a.length - 1) - i];
			r = f(e,r);
		}
	}
	return r;
}
haxe.data.collections.IterableExtensions.headOption = function(iter) {
	var iterator = iter.iterator();
	if(iterator.hasNext()) {
		{ var $it0 = iter.iterator();
		while( $it0.hasNext() ) { var e = $it0.next();
		return Option.Some(e);
		}}
	}
	return Option.None;
}
haxe.data.collections.IterableExtensions.head = function(iter) {
	return (function($this) {
		var $r;
		var $e = (haxe.data.collections.IterableExtensions.headOption(iter));
		switch( $e[1] ) {
		case 0:
		{
			$r = Stax.error("Iterable has no head");
		}break;
		case 1:
		var h = $e[2];
		{
			$r = h;
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
haxe.data.collections.IterableExtensions.tailOption = function(iter) {
	var iterator = iter.iterator();
	return (!iterator.hasNext()?Option.None:Option.Some(haxe.data.collections.IterableExtensions.drop(iter,1)));
}
haxe.data.collections.IterableExtensions.drop = function(iter,n) {
	var iterator = iter.iterator();
	while(iterator.hasNext() && n > 0) {
		iterator.next();
		--n;
	}
	var result = [];
	while(iterator.hasNext()) result.push(iterator.next());
	return result;
}
haxe.data.collections.IterableExtensions.take = function(iter,n) {
	var iterator = iter.iterator();
	var result = [];
	{
		var _g1 = 0, _g = (n);
		while(_g1 < _g) {
			var i = _g1++;
			if(iterator.hasNext()) {
				result.push(iterator.next());
			}
		}
	}
	return result;
}
haxe.data.collections.IterableExtensions.tail = function(iter) {
	return (function($this) {
		var $r;
		var $e = (haxe.data.collections.IterableExtensions.tailOption(iter));
		switch( $e[1] ) {
		case 0:
		{
			$r = Stax.error("Iterable has no tail");
		}break;
		case 1:
		var t = $e[2];
		{
			$r = t;
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
haxe.data.collections.IterableExtensions.exists = function(iter,cmp,value) {
	var iterator = iter.iterator();
	while(iterator.hasNext()) {
		var element = iterator.next();
		if(cmp(element,value)) {
			return true;
		}
	}
	return false;
}
haxe.data.collections.IterableExtensions.nub = function(iter) {
	var result = [];
	var iterator = iter.iterator();
	while(iterator.hasNext()) {
		var element = iterator.next();
		if(!haxe.data.collections.IterableExtensions.exists(result,function(a,b) {
			return a == b;
		},element)) {
			result.push(element);
		}
	}
	return result;
}
haxe.data.collections.IterableExtensions.at = function(iter,index) {
	var result = null;
	if(index < 0) index = haxe.data.collections.IterableExtensions.size(iter) - (-1 * index);
	var curIndex = 0;
	{ var $it0 = iter.iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
	{
		if(index == curIndex) {
			return e;
		}
		else ++curIndex;
	}
	}}
	return Stax.error("Index not found");
}
haxe.data.collections.IterableExtensions.map = function(iter,f) {
	return haxe.data.collections.IterableExtensions.foldl(iter,[],function(a,b) {
		a.push(f(b));
		return a;
	});
}
haxe.data.collections.IterableExtensions.flatMap = function(iter,f) {
	return haxe.data.collections.IterableExtensions.foldl(iter,[],function(a,b) {
		{ var $it0 = f(b).iterator();
		while( $it0.hasNext() ) { var e = $it0.next();
		a.push(e);
		}}
		return a;
	});
}
haxe.data.collections.IterableExtensions.zip = function(iter1,iter2) {
	var i1 = iter1.iterator();
	var i2 = iter2.iterator();
	var result = [];
	while(i1.hasNext() && i2.hasNext()) {
		var t1 = i1.next();
		var t2 = i2.next();
		result.push(DynamicExtensions.entuple(t1,t2));
	}
	return result;
}
haxe.data.collections.IterableExtensions.append = function(iter,e) {
	return haxe.data.collections.IterableExtensions.foldr(iter,[e],function(a,b) {
		b.unshift(a);
		return b;
	});
}
haxe.data.collections.IterableExtensions.cons = function(iter,e) {
	return haxe.data.collections.IterableExtensions.foldl(iter,[e],function(b,a) {
		b.push(a);
		return b;
	});
}
haxe.data.collections.IterableExtensions.toArray = function(i) {
	var a = [];
	{ var $it0 = i.iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
	a.push(e);
	}}
	return a;
}
haxe.data.collections.IterableExtensions.reversed = function(iter) {
	return haxe.data.collections.IterableExtensions.foldl(iter,[],function(a,b) {
		a.unshift(b);
		return a;
	});
}
haxe.data.collections.IterableExtensions.and = function(iter) {
	var iterator = iter.iterator();
	while(iterator.hasNext()) {
		var element = iterator.next();
		if(element == false) {
			return false;
		}
	}
	return true;
}
haxe.data.collections.IterableExtensions.or = function(iter) {
	var iterator = iter.iterator();
	while(iterator.hasNext()) {
		if(iterator.next() == true) {
			return true;
		}
	}
	return false;
}
haxe.data.collections.IterableExtensions.scanl = function(iter,init,f) {
	var accum = init;
	var result = [init];
	{ var $it0 = iter.iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
	{
		result.push(f(e,accum));
	}
	}}
	return result;
}
haxe.data.collections.IterableExtensions.scanr = function(iter,init,f) {
	var accum = init;
	var result = [init];
	{ var $it0 = haxe.data.collections.IterableExtensions.reversed(iter).iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
	{
		result.push(f(e,accum));
	}
	}}
	return result;
}
haxe.data.collections.IterableExtensions.scanl1 = function(iter,f) {
	var iterator = iter.iterator();
	var accum = null;
	var result = [];
	while(iterator.hasNext()) {
		if(result[0] == null) {
			var first = iterator.next();
			result.push(first);
			accum = first;
		}
		else result.push(f(iterator.next(),accum));
	}
	return result;
}
haxe.data.collections.IterableExtensions.scanr1 = function(iter,f) {
	var iterator = haxe.data.collections.IterableExtensions.reversed(iter).iterator();
	var init = iterator.next();
	var accum = init;
	var result = [init];
	while(iterator.hasNext()) {
		result.push(f(iterator.next(),accum));
	}
	return result;
}
haxe.data.collections.IterableExtensions.existsP = function(iter,ref,f) {
	var result = false;
	{ var $it0 = iter.iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
	{
		if(f(ref,e)) result = true;
	}
	}}
	return result;
}
haxe.data.collections.IterableExtensions.nubBy = function(iter,f) {
	return haxe.data.collections.IterableExtensions.foldl(iter,[],function(a,b) {
		return (haxe.data.collections.IterableExtensions.existsP(a,b,f)?a:(function($this) {
			var $r;
			a.push(b);
			$r = a;
			return $r;
		}(this)));
	});
}
haxe.data.collections.IterableExtensions.intersectBy = function(iter1,iter2,f) {
	return haxe.data.collections.IterableExtensions.foldl(iter1,[],function(a,b) {
		return (haxe.data.collections.IterableExtensions.existsP(iter2,b,f)?haxe.data.collections.IterableExtensions.append(a,b):a);
	});
}
haxe.data.collections.IterableExtensions.intersect = function(iter1,iter2) {
	return haxe.data.collections.IterableExtensions.foldl(iter1,[],function(a,b) {
		return (haxe.data.collections.IterableExtensions.existsP(iter2,b,function(a1,b1) {
			return a1 == b1;
		})?haxe.data.collections.IterableExtensions.append(a,b):a);
	});
}
haxe.data.collections.IterableExtensions.unionBy = function(iter1,iter2,f) {
	var result = iter1;
	{ var $it0 = iter2.iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
	{
		var exists = false;
		{ var $it1 = iter1.iterator();
		while( $it1.hasNext() ) { var i = $it1.next();
		{
			if(f(i,e)) {
				exists = true;
			}
		}
		}}
		if(!exists) {
			result = haxe.data.collections.IterableExtensions.append(result,e);
		}
	}
	}}
	return result;
}
haxe.data.collections.IterableExtensions.union = function(iter1,iter2) {
	return haxe.data.collections.IterableExtensions.unionBy(iter1,iter2,function(a,b) {
		return a == b;
	});
}
haxe.data.collections.IterableExtensions.partition = function(iter,f) {
	return haxe.data.collections.IterableExtensions.partition(IterableExtensions.toArray(iter),f);
}
haxe.data.collections.IterableExtensions.partitionWhile = function(iter,f) {
	return haxe.data.collections.IterableExtensions.partitionWhile(IterableExtensions.toArray(iter),f);
}
haxe.data.collections.IterableExtensions.count = function(iter,f) {
	return haxe.data.collections.IterableExtensions.count(IterableExtensions.toArray(iter),f);
}
haxe.data.collections.IterableExtensions.countWhile = function(iter,f) {
	return haxe.data.collections.IterableExtensions.countWhile(IterableExtensions.toArray(iter),f);
}
haxe.data.collections.IterableExtensions.elements = function(iter) {
	return IterableExtensions.toArray(iter);
}
haxe.data.collections.IterableExtensions.appendAll = function(iter,i) {
	return haxe.data.collections.IterableExtensions.appendAll(IterableExtensions.toArray(iter),i);
}
haxe.data.collections.IterableExtensions.isEmpty = function(iter) {
	return !iter.iterator().hasNext();
}
haxe.data.collections.IterableExtensions.find = function(iter,f) {
	return haxe.data.collections.IterableExtensions.find(IterableExtensions.toArray(iter),f);
}
haxe.data.collections.IterableExtensions.forAll = function(iter,f) {
	return haxe.data.collections.IterableExtensions.forAll(IterableExtensions.toArray(iter),f);
}
haxe.data.collections.IterableExtensions.forAny = function(iter,f) {
	return haxe.data.collections.IterableExtensions.forAny(IterableExtensions.toArray(iter),f);
}
haxe.data.collections.IterableExtensions.prototype.__class__ = haxe.data.collections.IterableExtensions;
haxe.functional.FoldableExtensions = function() { }
haxe.functional.FoldableExtensions.__name__ = ["haxe","functional","FoldableExtensions"];
haxe.functional.FoldableExtensions.foldr = function(foldable,z,f) {
	var a = haxe.functional.FoldableExtensions.toArray(foldable);
	a.reverse();
	var acc = z;
	{
		var _g = 0;
		while(_g < a.length) {
			var e = a[_g];
			++_g;
			acc = f(e,acc);
		}
	}
	return acc;
}
haxe.functional.FoldableExtensions.filter = function(foldable,f) {
	return foldable.foldl(foldable.empty(),function(a,b) {
		return (f(b)?a.append(b):a);
	});
}
haxe.functional.FoldableExtensions.partition = function(foldable,f) {
	return foldable.foldl(Tuple2.create(foldable.empty(),foldable.empty()),function(a,b) {
		return (f(b)?Tuple2.create(a._1.append(b),a._2):Tuple2.create(a._1,a._2.append(b)));
	});
}
haxe.functional.FoldableExtensions.partitionWhile = function(foldable,f) {
	var partitioning = true;
	return foldable.foldl(Tuple2.create(foldable.empty(),foldable.empty()),function(a,b) {
		return (partitioning?(f(b)?Tuple2.create(a._1.append(b),a._2):(function($this) {
			var $r;
			partitioning = false;
			$r = Tuple2.create(a._1,a._2.append(b));
			return $r;
		}(this))):Tuple2.create(a._1,a._2.append(b)));
	});
}
haxe.functional.FoldableExtensions.map = function(src,f) {
	return haxe.functional.FoldableExtensions.mapTo(src,src.empty(),f);
}
haxe.functional.FoldableExtensions.mapTo = function(src,dest,f) {
	return src.foldl(dest,function(a,b) {
		return a.append(f(b));
	});
}
haxe.functional.FoldableExtensions.flatMap = function(src,f) {
	return haxe.functional.FoldableExtensions.flatMapTo(src,src.empty(),f);
}
haxe.functional.FoldableExtensions.flatMapTo = function(src,dest,f) {
	return src.foldl(dest,function(a,b) {
		return f(b).foldl(a,function(a1,b1) {
			return a1.append(b1);
		});
	});
}
haxe.functional.FoldableExtensions.take = function(foldable,n) {
	return foldable.foldl(foldable.empty(),function(a,b) {
		return (n-- > 0?a.append(b):a);
	});
}
haxe.functional.FoldableExtensions.takeWhile = function(foldable,f) {
	var taking = true;
	return foldable.foldl(foldable.empty(),function(a,b) {
		return (taking?(f(b)?a.append(b):(function($this) {
			var $r;
			taking = false;
			$r = a;
			return $r;
		}(this))):a);
	});
}
haxe.functional.FoldableExtensions.drop = function(foldable,n) {
	return foldable.foldl(foldable.empty(),function(a,b) {
		return (n-- > 0?a:a.append(b));
	});
}
haxe.functional.FoldableExtensions.dropWhile = function(foldable,f) {
	var dropping = true;
	return foldable.foldl(foldable.empty(),function(a,b) {
		return (dropping?(f(b)?a:(function($this) {
			var $r;
			dropping = false;
			$r = a.append(b);
			return $r;
		}(this))):a.append(b));
	});
}
haxe.functional.FoldableExtensions.count = function(foldable,f) {
	return foldable.foldl(0,function(a,b) {
		return a + ((f(b)?1:0));
	});
}
haxe.functional.FoldableExtensions.countWhile = function(foldable,f) {
	var counting = true;
	return foldable.foldl(0,function(a,b) {
		return (!counting?a:(f(b)?a + 1:(function($this) {
			var $r;
			counting = false;
			$r = a;
			return $r;
		}(this))));
	});
}
haxe.functional.FoldableExtensions.scanl = function(foldable,init,f) {
	var a = haxe.functional.FoldableExtensions.toArray(foldable);
	var result = foldable.empty().append(init);
	{
		var _g = 0;
		while(_g < a.length) {
			var e = a[_g];
			++_g;
			result = result.append(f(e,init));
		}
	}
	return result;
}
haxe.functional.FoldableExtensions.scanr = function(foldable,init,f) {
	var a = haxe.functional.FoldableExtensions.toArray(foldable);
	a.reverse();
	var result = foldable.empty().append(init);
	{
		var _g = 0;
		while(_g < a.length) {
			var e = a[_g];
			++_g;
			result = result.append(f(e,init));
		}
	}
	return result;
}
haxe.functional.FoldableExtensions.scanl1 = function(foldable,f) {
	var iterator = haxe.functional.FoldableExtensions.toArray(foldable).iterator();
	var result = foldable.empty();
	if(!iterator.hasNext()) return result;
	var accum = iterator.next();
	result = result.append(accum);
	while(iterator.hasNext()) result = result.append(f(iterator.next(),accum));
	return result;
}
haxe.functional.FoldableExtensions.scanr1 = function(foldable,f) {
	var a = haxe.functional.FoldableExtensions.toArray(foldable);
	a.reverse();
	var iterator = a.iterator();
	var result = foldable.empty();
	if(!iterator.hasNext()) return result;
	var accum = iterator.next();
	result = result.append(accum);
	while(iterator.hasNext()) result = result.append(f(iterator.next(),accum));
	return result;
}
haxe.functional.FoldableExtensions.elements = function(foldable) {
	return haxe.functional.FoldableExtensions.toArray(foldable);
}
haxe.functional.FoldableExtensions.concat = function(foldable,rest) {
	return rest.foldl(foldable,function(a,b) {
		return a.append(b);
	});
}
haxe.functional.FoldableExtensions.append = function(foldable,e) {
	return foldable.append(e);
}
haxe.functional.FoldableExtensions.appendAll = function(foldable,i) {
	var acc = foldable;
	{ var $it0 = i.iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
	{
		acc = acc.append(e);
	}
	}}
	return acc;
}
haxe.functional.FoldableExtensions.iterator = function(foldable) {
	return haxe.functional.FoldableExtensions.elements(foldable).iterator();
}
haxe.functional.FoldableExtensions.isEmpty = function(foldable) {
	return !haxe.functional.FoldableExtensions.iterator(foldable).hasNext();
}
haxe.functional.FoldableExtensions.foreach = function(foldable,f) {
	foldable.foldl(1,function(a,b) {
		f(b);
		return a;
	});
	return foldable;
}
haxe.functional.FoldableExtensions.find = function(foldable,f) {
	return foldable.foldl(Option.None,function(a,b) {
		return (function($this) {
			var $r;
			var $e = (a);
			switch( $e[1] ) {
			case 0:
			{
				$r = OptionExtensions.filter(OptionExtensions.toOption(b),f);
			}break;
			default:{
				$r = a;
			}break;
			}
			return $r;
		}(this));
	});
}
haxe.functional.FoldableExtensions.forAll = function(foldable,f) {
	return foldable.foldl(true,function(a,b) {
		return (function($this) {
			var $r;
			switch(a) {
			case true:{
				$r = f(b);
			}break;
			case false:{
				$r = false;
			}break;
			default:{
				$r = null;
			}break;
			}
			return $r;
		}(this));
	});
}
haxe.functional.FoldableExtensions.forAny = function(foldable,f) {
	return foldable.foldl(false,function(a,b) {
		return (function($this) {
			var $r;
			switch(a) {
			case false:{
				$r = f(b);
			}break;
			case true:{
				$r = true;
			}break;
			default:{
				$r = null;
			}break;
			}
			return $r;
		}(this));
	});
}
haxe.functional.FoldableExtensions.exists = function(foldable,f) {
	return (function($this) {
		var $r;
		var $e = (haxe.functional.FoldableExtensions.find(foldable,f));
		switch( $e[1] ) {
		case 1:
		var v = $e[2];
		{
			$r = true;
		}break;
		case 0:
		{
			$r = false;
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
haxe.functional.FoldableExtensions.existsP = function(foldable,ref,f) {
	var result = false;
	var a = haxe.functional.FoldableExtensions.toArray(foldable);
	{
		var _g = 0;
		while(_g < a.length) {
			var e = a[_g];
			++_g;
			if(f(e,ref)) result = true;
		}
	}
	return result;
}
haxe.functional.FoldableExtensions.contains = function(foldable,member) {
	return haxe.functional.FoldableExtensions.exists(foldable,function(e) {
		return e == member;
	});
}
haxe.functional.FoldableExtensions.nubBy = function(foldable,f) {
	return foldable.foldl(foldable.empty(),function(a,b) {
		return (haxe.functional.FoldableExtensions.existsP(a,b,f)?a:a.append(b));
	});
}
haxe.functional.FoldableExtensions.nub = function(foldable) {
	return haxe.functional.FoldableExtensions.nubBy(foldable,function(a,b) {
		return a == b;
	});
}
haxe.functional.FoldableExtensions.intersectBy = function(foldable1,foldable2,f) {
	return foldable1.foldl(foldable1.empty(),function(a,b) {
		return (haxe.functional.FoldableExtensions.existsP(foldable2,b,f)?haxe.functional.FoldableExtensions.append(a,b):a);
	});
}
haxe.functional.FoldableExtensions.intersect = function(foldable1,foldable2) {
	return foldable1.foldl(foldable1.empty(),function(a,b) {
		return (haxe.functional.FoldableExtensions.existsP(foldable2,b,function(a1,b1) {
			return a1 == b1;
		})?haxe.functional.FoldableExtensions.append(a,b):a);
	});
}
haxe.functional.FoldableExtensions.mkString = function(foldable,sep,show) {
	if(sep == null) sep = ", ";
	var isFirst = true;
	return foldable.foldl("",function(a,b) {
		var prefix = (isFirst?(function($this) {
			var $r;
			isFirst = false;
			$r = "";
			return $r;
		}(this)):sep);
		if(null == show) show = Stax.getShowFor(b);
		return (a + prefix) + show(b);
	});
}
haxe.functional.FoldableExtensions.toArray = function(foldable) {
	var es = [];
	foldable.foldl(foldable.empty(),function(a,b) {
		es.push(b);
		return a;
	});
	return es;
}
haxe.functional.FoldableExtensions.toMap = function(foldable) {
	var dest = haxe.data.collections.Map.create();
	return foldable.foldl(dest,function(a,b) {
		return a.append(b);
	});
}
haxe.functional.FoldableExtensions.toList = function(foldable) {
	var dest = haxe.data.collections.List.create();
	return foldable.foldl(dest,function(a,b) {
		return a.append(b);
	});
}
haxe.functional.FoldableExtensions.toSet = function(foldable) {
	var dest = haxe.data.collections.Set.create();
	return foldable.foldl(dest,function(a,b) {
		return a.append(b);
	});
}
haxe.functional.FoldableExtensions.prototype.__class__ = haxe.functional.FoldableExtensions;
if(!haxe.math) haxe.math = {}
if(!haxe.math.geom) haxe.math.geom = {}
haxe.math.geom.PointTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
haxe.math.geom.PointTestCase.__name__ = ["haxe","math","geom","PointTestCase"];
haxe.math.geom.PointTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) haxe.math.geom.PointTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
haxe.math.geom.PointTestCase.cmpInt = function(p1,p2) {
	return p1.x == p2.x && p1.y == p2.y;
}
haxe.math.geom.PointTestCase.prototype.testMap = function() {
	this.assertEquals({ x : 2, y : 9},haxe.math.geom.Point2dIntExtensions.map({ x : 1, y : 3},function(x) {
		return x * 2;
	},function(y) {
		return y * 3;
	}),haxe.math.geom.PointTestCase.cmpInt,null,{ fileName : "PointTestCase.hx", lineNumber : 44, className : "haxe.math.geom.PointTestCase", methodName : "testMap"});
}
haxe.math.geom.PointTestCase.prototype.testMinusPlusLeavesUnchanged = function() {
	var p1 = { x : 23, y : 92}
	var p2 = { x : -85, y : -39}
	this.assertEquals(p2,haxe.math.geom.Point2dIntExtensions.plus(p1,{ dx : p2.x - p1.x, dy : p2.y - p1.y}),haxe.math.geom.PointTestCase.cmpInt,null,{ fileName : "PointTestCase.hx", lineNumber : 40, className : "haxe.math.geom.PointTestCase", methodName : "testMinusPlusLeavesUnchanged"});
}
haxe.math.geom.PointTestCase.prototype.__class__ = haxe.math.geom.PointTestCase;
haxe.test.Assertation = { __ename__ : ["haxe","test","Assertation"], __constructs__ : ["Success","Failure","Error","SetupError","TeardownError","TimeoutError","AsyncError","Warning"] }
haxe.test.Assertation.AsyncError = function(e,stack) { var $x = ["AsyncError",6,e,stack]; $x.__enum__ = haxe.test.Assertation; $x.toString = $estr; return $x; }
haxe.test.Assertation.Error = function(e,stack) { var $x = ["Error",2,e,stack]; $x.__enum__ = haxe.test.Assertation; $x.toString = $estr; return $x; }
haxe.test.Assertation.Failure = function(msg,pos) { var $x = ["Failure",1,msg,pos]; $x.__enum__ = haxe.test.Assertation; $x.toString = $estr; return $x; }
haxe.test.Assertation.SetupError = function(e,stack) { var $x = ["SetupError",3,e,stack]; $x.__enum__ = haxe.test.Assertation; $x.toString = $estr; return $x; }
haxe.test.Assertation.Success = function(pos) { var $x = ["Success",0,pos]; $x.__enum__ = haxe.test.Assertation; $x.toString = $estr; return $x; }
haxe.test.Assertation.TeardownError = function(e,stack) { var $x = ["TeardownError",4,e,stack]; $x.__enum__ = haxe.test.Assertation; $x.toString = $estr; return $x; }
haxe.test.Assertation.TimeoutError = function(missedAsyncs,stack) { var $x = ["TimeoutError",5,missedAsyncs,stack]; $x.__enum__ = haxe.test.Assertation; $x.toString = $estr; return $x; }
haxe.test.Assertation.Warning = function(msg) { var $x = ["Warning",7,msg]; $x.__enum__ = haxe.test.Assertation; $x.toString = $estr; return $x; }
StaxTestSuite = function() { }
StaxTestSuite.__name__ = ["StaxTestSuite"];
StaxTestSuite.main = function() {
	haxe.framework.Injector.forever(function(c) {
		c.bind(haxe.time.ScheduledExecutor,haxe.time.ScheduledExecutorSystem);
		var runner = (new haxe.test.Runner()).addAll([new PreludeTestCase(),new haxe.data.transcode.JValueTestCase(),new haxe.data.collections.ArrayExtensionsTestCase(),new haxe.data.collections.MapTestCase(),new haxe.data.collections.SetTestCase(),new haxe.data.collections.ListTestCase(),new haxe.io.log.LoggerTestCase(),new haxe.text.json.JsonTestCase(),new haxe.functional.FoldableExtensionsTestCase(),new haxe.functional.PartialFunctionTestCase(),new haxe.math.tween.TweenTestCase(),new haxe.time.ScheduledExecutorTestCase(),new haxe.net.UrlExtensionsTestCase(),new haxe.util.StringExtensionsTestCase(),new haxe.framework.InjectorTestCase(),new haxe.net.HttpHeaderExtensionsTestCase(),new haxe.math.geom.PointTestCase(),new haxe.util.OrderExtensionsTestCase(),new haxe.util.GuidTestCase(),new haxe.io.http.HttpStringTestCase(),new js.io.IFrameIOTestCase(),new haxe.io.http.HttpJValueJsonpTestCase(),new js.dom.HTMLElementExtensionsTestCase(),new js.dom.QuirksTestCase(),new haxe.util.ObjectExtensionsTestCase(),new haxe.data.transcode.TranscodeJValueExtensionsTestCase()]);
		haxe.test.ui.Report.create(runner);
		runner.run();
		return Unit.Unit;
	});
}
StaxTestSuite.prototype.__class__ = StaxTestSuite;
if(typeof js=='undefined') js = {}
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = (i != null?((i.fileName + ":") + i.lineNumber) + ": ":"");
	msg += js.Boot.__unhtml(js.Boot.__string_rec(v,"")) + "<br/>";
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("No haxe:trace element defined\n" + msg);
	else d.innerHTML += msg;
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
	else null;
}
js.Boot.__closure = function(o,f) {
	var m = o[f];
	if(m == null) return null;
	var f1 = function() {
		return m.apply(o,arguments);
	}
	f1.scope = o;
	f1.method = m;
	return f1;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":{
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				{
					var _g1 = 2, _g = o.length;
					while(_g1 < _g) {
						var i = _g1++;
						if(i != 2) str += "," + js.Boot.__string_rec(o[i],s);
						else str += js.Boot.__string_rec(o[i],s);
					}
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			{
				var _g = 0;
				while(_g < l) {
					var i1 = _g++;
					str += ((i1 > 0?",":"")) + js.Boot.__string_rec(o[i1],s);
				}
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		}
		catch( $e0 ) {
			{
				var e = $e0;
				{
					return "???";
				}
			}
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = (o.hasOwnProperty != null);
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) continue;
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__") continue;
		if(str.length != 2) str += ", \n";
		str += ((s + k) + " : ") + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += ("\n" + s) + "}";
		return str;
	}break;
	case "function":{
		return "<function>";
	}break;
	case "string":{
		return o;
	}break;
	default:{
		return String(o);
	}break;
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return (o.__enum__ == null);
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				if(cl == null) return false;
			}
		}
	}
	switch(cl) {
	case Int:{
		return Math.ceil(o%2147483648.0) === o;
	}break;
	case Float:{
		return typeof(o) == "number";
	}break;
	case Bool:{
		return o === true || o === false;
	}break;
	case String:{
		return typeof(o) == "string";
	}break;
	case Dynamic:{
		return true;
	}break;
	default:{
		if(o == null) return false;
		return o.__enum__ == cl || (cl == Class && o.__name__ != null) || (cl == Enum && o.__ename__ != null);
	}break;
	}
}
js.Boot.__init = function() {
	js.Lib.isIE = (typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null);
	js.Lib.isOpera = (typeof window!='undefined' && window.opera != null);
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	}
	Array.prototype.remove = (Array.prototype.indexOf?function(obj) {
		var idx = this.indexOf(obj);
		if(idx == -1) return false;
		this.splice(idx,1);
		return true;
	}:function(obj) {
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				return true;
			}
			i++;
		}
		return false;
	});
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}}
	}
	var cca = String.prototype.charCodeAt;
	String.prototype.cca = cca;
	String.prototype.charCodeAt = function(i) {
		var x = cca.call(this,i);
		if(isNaN(x)) return null;
		return x;
	}
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		}
		else if(len < 0) {
			len = (this.length + len) - pos;
		}
		return oldsub.apply(this,[pos,len]);
	}
	$closure = js.Boot.__closure;
}
js.Boot.prototype.__class__ = js.Boot;
haxe.functional.PartialFunction2 = function() { }
haxe.functional.PartialFunction2.__name__ = ["haxe","functional","PartialFunction2"];
haxe.functional.PartialFunction2.prototype.call = null;
haxe.functional.PartialFunction2.prototype.isDefinedAt = null;
haxe.functional.PartialFunction2.prototype.orAlways = null;
haxe.functional.PartialFunction2.prototype.orAlwaysC = null;
haxe.functional.PartialFunction2.prototype.orElse = null;
haxe.functional.PartialFunction2.prototype.toFunction = null;
haxe.functional.PartialFunction2.prototype.__class__ = haxe.functional.PartialFunction2;
haxe.functional.PartialFunction3 = function() { }
haxe.functional.PartialFunction3.__name__ = ["haxe","functional","PartialFunction3"];
haxe.functional.PartialFunction3.prototype.call = null;
haxe.functional.PartialFunction3.prototype.isDefinedAt = null;
haxe.functional.PartialFunction3.prototype.orAlways = null;
haxe.functional.PartialFunction3.prototype.orAlwaysC = null;
haxe.functional.PartialFunction3.prototype.orElse = null;
haxe.functional.PartialFunction3.prototype.toFunction = null;
haxe.functional.PartialFunction3.prototype.__class__ = haxe.functional.PartialFunction3;
haxe.functional.PartialFunction4 = function() { }
haxe.functional.PartialFunction4.__name__ = ["haxe","functional","PartialFunction4"];
haxe.functional.PartialFunction4.prototype.call = null;
haxe.functional.PartialFunction4.prototype.isDefinedAt = null;
haxe.functional.PartialFunction4.prototype.orAlways = null;
haxe.functional.PartialFunction4.prototype.orAlwaysC = null;
haxe.functional.PartialFunction4.prototype.orElse = null;
haxe.functional.PartialFunction4.prototype.toFunction = null;
haxe.functional.PartialFunction4.prototype.__class__ = haxe.functional.PartialFunction4;
haxe.functional.PartialFunction5 = function() { }
haxe.functional.PartialFunction5.__name__ = ["haxe","functional","PartialFunction5"];
haxe.functional.PartialFunction5.prototype.call = null;
haxe.functional.PartialFunction5.prototype.isDefinedAt = null;
haxe.functional.PartialFunction5.prototype.orAlways = null;
haxe.functional.PartialFunction5.prototype.orAlwaysC = null;
haxe.functional.PartialFunction5.prototype.orElse = null;
haxe.functional.PartialFunction5.prototype.toFunction = null;
haxe.functional.PartialFunction5.prototype.__class__ = haxe.functional.PartialFunction5;
haxe.util.GuidTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
haxe.util.GuidTestCase.__name__ = ["haxe","util","GuidTestCase"];
haxe.util.GuidTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) haxe.util.GuidTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
haxe.util.GuidTestCase.prototype.testNonNull = function() {
	this.assertNotNull(haxe.util.Guid.generate(),null,{ fileName : "GuidTestCase.hx", lineNumber : 31, className : "haxe.util.GuidTestCase", methodName : "testNonNull"});
}
haxe.util.GuidTestCase.prototype.testUnique = function() {
	this.assertFalse(haxe.util.Guid.generate() == haxe.util.Guid.generate(),null,{ fileName : "GuidTestCase.hx", lineNumber : 35, className : "haxe.util.GuidTestCase", methodName : "testUnique"});
}
haxe.util.GuidTestCase.prototype.__class__ = haxe.util.GuidTestCase;
haxe.data.collections.SetTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
haxe.data.collections.SetTestCase.__name__ = ["haxe","data","collections","SetTestCase"];
haxe.data.collections.SetTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) haxe.data.collections.SetTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
haxe.data.collections.SetTestCase.prototype.defaultSet = function() {
	var s = this.set();
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			s = s.add(i);
		}
	}
	return s;
}
haxe.data.collections.SetTestCase.prototype.set = function(values) {
	var s = haxe.data.collections.Set.create();
	if(null != values) s = s.addAll(values);
	return s;
}
haxe.data.collections.SetTestCase.prototype.testAddingSameElementDoesNotChangeSet = function() {
	var s = this.defaultSet();
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			var oldM = s;
			s = s.add(i);
			this.assertEquals(oldM,s,null,null,{ fileName : "SetTestCase.hx", lineNumber : 81, className : "haxe.data.collections.SetTestCase", methodName : "testAddingSameElementDoesNotChangeSet"});
			this.assertEquals(100,s.size(),null,null,{ fileName : "SetTestCase.hx", lineNumber : 82, className : "haxe.data.collections.SetTestCase", methodName : "testAddingSameElementDoesNotChangeSet"});
		}
	}
}
haxe.data.collections.SetTestCase.prototype.testCanIterateThroughElements = function() {
	var s = this.defaultSet();
	var count = 4950;
	var iterated = 0;
	{ var $it0 = s.iterator();
	while( $it0.hasNext() ) { var k = $it0.next();
	{
		count -= k;
		++iterated;
	}
	}}
	this.assertEquals(100,iterated,null,null,{ fileName : "SetTestCase.hx", lineNumber : 98, className : "haxe.data.collections.SetTestCase", methodName : "testCanIterateThroughElements"});
	this.assertEquals(0,count,null,null,{ fileName : "SetTestCase.hx", lineNumber : 99, className : "haxe.data.collections.SetTestCase", methodName : "testCanIterateThroughElements"});
}
haxe.data.collections.SetTestCase.prototype.testCompare = function() {
	this.assertTrue(this.set().compare(this.set()) == 0,null,{ fileName : "SetTestCase.hx", lineNumber : 118, className : "haxe.data.collections.SetTestCase", methodName : "testCompare"});
	this.assertTrue(this.set([1,2,3]).compare(this.set([1,2,3])) == 0,null,{ fileName : "SetTestCase.hx", lineNumber : 119, className : "haxe.data.collections.SetTestCase", methodName : "testCompare"});
	this.assertTrue(this.set().compare(this.set([1])) < 0,null,{ fileName : "SetTestCase.hx", lineNumber : 120, className : "haxe.data.collections.SetTestCase", methodName : "testCompare"});
	this.assertTrue(this.set([2]).compare(this.set([1])) > 0,null,{ fileName : "SetTestCase.hx", lineNumber : 121, className : "haxe.data.collections.SetTestCase", methodName : "testCompare"});
	this.assertTrue(this.set([1,2]).compare(this.set([1,3])) < 0,null,{ fileName : "SetTestCase.hx", lineNumber : 122, className : "haxe.data.collections.SetTestCase", methodName : "testCompare"});
}
haxe.data.collections.SetTestCase.prototype.testContainsElements = function() {
	var s = this.set();
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			this.assertFalse(s.contains(i),null,{ fileName : "SetTestCase.hx", lineNumber : 65, className : "haxe.data.collections.SetTestCase", methodName : "testContainsElements"});
			s = s.add(i);
			this.assertTrue(s.contains(i),null,{ fileName : "SetTestCase.hx", lineNumber : 69, className : "haxe.data.collections.SetTestCase", methodName : "testContainsElements"});
		}
	}
}
haxe.data.collections.SetTestCase.prototype.testEquals = function() {
	this.assertTrue(this.set().equals(this.set()),null,{ fileName : "SetTestCase.hx", lineNumber : 109, className : "haxe.data.collections.SetTestCase", methodName : "testEquals"});
	this.assertTrue(this.set([1,2,3]).equals(this.set([1,2,3])),null,{ fileName : "SetTestCase.hx", lineNumber : 110, className : "haxe.data.collections.SetTestCase", methodName : "testEquals"});
	this.assertTrue(this.set([2,1]).equals(this.set([1,2])),null,{ fileName : "SetTestCase.hx", lineNumber : 111, className : "haxe.data.collections.SetTestCase", methodName : "testEquals"});
	this.assertFalse(this.set().equals(this.set([1])),null,{ fileName : "SetTestCase.hx", lineNumber : 112, className : "haxe.data.collections.SetTestCase", methodName : "testEquals"});
	this.assertFalse(this.set([2]).equals(this.set([1])),null,{ fileName : "SetTestCase.hx", lineNumber : 113, className : "haxe.data.collections.SetTestCase", methodName : "testEquals"});
	this.assertFalse(this.set([1,2]).equals(this.set([1,3])),null,{ fileName : "SetTestCase.hx", lineNumber : 114, className : "haxe.data.collections.SetTestCase", methodName : "testEquals"});
}
haxe.data.collections.SetTestCase.prototype.testFilter = function() {
	var s = haxe.functional.FoldableExtensions.filter(this.defaultSet(),function(e) {
		return e < 50;
	});
	this.assertEquals(50,s.size(),null,null,{ fileName : "SetTestCase.hx", lineNumber : 105, className : "haxe.data.collections.SetTestCase", methodName : "testFilter"});
}
haxe.data.collections.SetTestCase.prototype.testHashCode = function() {
	this.assertNotEquals(0,this.set().hashCode(),null,{ fileName : "SetTestCase.hx", lineNumber : 131, className : "haxe.data.collections.SetTestCase", methodName : "testHashCode"});
	this.assertNotEquals(0,this.set([1,2]).hashCode(),null,{ fileName : "SetTestCase.hx", lineNumber : 132, className : "haxe.data.collections.SetTestCase", methodName : "testHashCode"});
}
haxe.data.collections.SetTestCase.prototype.testSizeDoesNotGrowWhenAddingDuplicateElements = function() {
	var s = this.set().add(0);
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			s = s.add(0);
		}
	}
	this.assertEquals(1,s.size(),null,null,{ fileName : "SetTestCase.hx", lineNumber : 46, className : "haxe.data.collections.SetTestCase", methodName : "testSizeDoesNotGrowWhenAddingDuplicateElements"});
}
haxe.data.collections.SetTestCase.prototype.testSizeGrowsWhenAddingUniqueElements = function() {
	var s = this.set();
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			this.assertEquals(i,s.size(),null,null,{ fileName : "SetTestCase.hx", lineNumber : 33, className : "haxe.data.collections.SetTestCase", methodName : "testSizeGrowsWhenAddingUniqueElements"});
			s = s.add(i);
		}
	}
	this.assertEquals(100,s.size(),null,null,{ fileName : "SetTestCase.hx", lineNumber : 38, className : "haxe.data.collections.SetTestCase", methodName : "testSizeGrowsWhenAddingUniqueElements"});
}
haxe.data.collections.SetTestCase.prototype.testSizeShrinksWhenRemovingElements = function() {
	var s = this.defaultSet();
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			this.assertEquals(100 - i,s.size(),null,null,{ fileName : "SetTestCase.hx", lineNumber : 53, className : "haxe.data.collections.SetTestCase", methodName : "testSizeShrinksWhenRemovingElements"});
			s = s.remove(i);
		}
	}
	this.assertEquals(0,s.size(),null,null,{ fileName : "SetTestCase.hx", lineNumber : 58, className : "haxe.data.collections.SetTestCase", methodName : "testSizeShrinksWhenRemovingElements"});
}
haxe.data.collections.SetTestCase.prototype.testToString = function() {
	this.assertEquals("Set []",this.set().toString(),null,null,{ fileName : "SetTestCase.hx", lineNumber : 126, className : "haxe.data.collections.SetTestCase", methodName : "testToString"});
	this.assertEquals("Set [1, 2, 3]",this.set([1,2,3]).toString(),null,null,{ fileName : "SetTestCase.hx", lineNumber : 127, className : "haxe.data.collections.SetTestCase", methodName : "testToString"});
}
haxe.data.collections.SetTestCase.prototype.__class__ = haxe.data.collections.SetTestCase;
haxe.test.ui.Report = function() { }
haxe.test.ui.Report.__name__ = ["haxe","test","ui","Report"];
haxe.test.ui.Report.create = function(runner,displaySuccessResults,headerDisplayMode) {
	var report;
	report = new haxe.test.ui.text.HtmlReport(runner,null,true);
	if(null == displaySuccessResults) report.displaySuccessResults = haxe.test.ui.common.SuccessResultsDisplayMode.ShowSuccessResultsWithNoErrors;
	else report.displaySuccessResults = displaySuccessResults;
	if(null == headerDisplayMode) report.displayHeader = haxe.test.ui.common.HeaderDisplayMode.ShowHeaderWithResults;
	else report.displayHeader = headerDisplayMode;
	return report;
}
haxe.test.ui.Report.prototype.__class__ = haxe.test.ui.Report;
haxe.StackItem = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","Lambda"] }
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Lambda = function(v) { var $x = ["Lambda",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.Stack = function() { }
haxe.Stack.__name__ = ["haxe","Stack"];
haxe.Stack.callStack = function() {
	return haxe.Stack.makeStack("$s");
}
haxe.Stack.exceptionStack = function() {
	return haxe.Stack.makeStack("$e");
}
haxe.Stack.toString = function(stack) {
	var b = new StringBuf();
	{
		var _g = 0;
		while(_g < stack.length) {
			var s = stack[_g];
			++_g;
			b.b[b.b.length] = "\nCalled from ";
			haxe.Stack.itemToString(b,s);
		}
	}
	return b.b.join("");
}
haxe.Stack.itemToString = function(b,s) {
	var $e = (s);
	switch( $e[1] ) {
	case 0:
	{
		b.b[b.b.length] = "a C function";
	}break;
	case 1:
	var m = $e[2];
	{
		b.b[b.b.length] = "module ";
		b.b[b.b.length] = m;
	}break;
	case 2:
	var line = $e[4], file = $e[3], s1 = $e[2];
	{
		if(s1 != null) {
			haxe.Stack.itemToString(b,s1);
			b.b[b.b.length] = " (";
		}
		b.b[b.b.length] = file;
		b.b[b.b.length] = " line ";
		b.b[b.b.length] = line;
		if(s1 != null) b.b[b.b.length] = ")";
	}break;
	case 3:
	var meth = $e[3], cname = $e[2];
	{
		b.b[b.b.length] = cname;
		b.b[b.b.length] = ".";
		b.b[b.b.length] = meth;
	}break;
	case 4:
	var n = $e[2];
	{
		b.b[b.b.length] = "local function #";
		b.b[b.b.length] = n;
	}break;
	}
}
haxe.Stack.makeStack = function(s) {
	var a = (function($this) {
		var $r;
		try {
			$r = eval(s);
		}
		catch( $e0 ) {
			{
				var e = $e0;
				$r = [];
			}
		}
		return $r;
	}(this));
	var m = new Array();
	{
		var _g1 = 0, _g = a.length - (s == "$s"?2:0);
		while(_g1 < _g) {
			var i = _g1++;
			var d = a[i].split("::");
			m.unshift(haxe.StackItem.Method(d[0],d[1]));
		}
	}
	return m;
}
haxe.Stack.prototype.__class__ = haxe.Stack;
haxe.data.collections.ArrayExtensions = function() { }
haxe.data.collections.ArrayExtensions.__name__ = ["haxe","data","collections","ArrayExtensions"];
haxe.data.collections.ArrayExtensions.partition = function(arr,f) {
	return ArrayExtensions.foldl(arr,Tuple2.create([],[]),function(a,b) {
		if(f(b)) a._1.push(b);
		else a._2.push(b);
		return a;
	});
}
haxe.data.collections.ArrayExtensions.partitionWhile = function(arr,f) {
	var partitioning = true;
	return ArrayExtensions.foldl(arr,Tuple2.create([],[]),function(a,b) {
		if(partitioning) {
			if(f(b)) a._1.push(b);
			else {
				partitioning = false;
				a._2.push(b);
			}
		}
		else a._2.push(b);
		return a;
	});
}
haxe.data.collections.ArrayExtensions.mapTo = function(src,dest,f) {
	return ArrayExtensions.foldl(src,ArrayExtensions.snapshot(dest),function(a,b) {
		a.push(f(b));
		return a;
	});
}
haxe.data.collections.ArrayExtensions.flatMapTo = function(src,dest,f) {
	return ArrayExtensions.foldl(src,dest,function(a,b) {
		return ArrayExtensions.foldl(f(b),a,function(a1,b1) {
			a1.push(b1);
			return a1;
		});
	});
}
haxe.data.collections.ArrayExtensions.count = function(arr,f) {
	return ArrayExtensions.foldl(arr,0,function(a,b) {
		return a + ((f(b)?1:0));
	});
}
haxe.data.collections.ArrayExtensions.countWhile = function(arr,f) {
	var counting = true;
	return ArrayExtensions.foldl(arr,0,function(a,b) {
		return (!counting?a:(f(b)?a + 1:(function($this) {
			var $r;
			counting = false;
			$r = a;
			return $r;
		}(this))));
	});
}
haxe.data.collections.ArrayExtensions.scanl = function(arr,init,f) {
	var accum = init;
	var result = [init];
	{
		var _g = 0;
		while(_g < arr.length) {
			var e = arr[_g];
			++_g;
			result.push(f(e,accum));
		}
	}
	return result;
}
haxe.data.collections.ArrayExtensions.scanr = function(arr,init,f) {
	var a = ArrayExtensions.snapshot(arr);
	a.reverse();
	return haxe.data.collections.ArrayExtensions.scanl(a,init,f);
}
haxe.data.collections.ArrayExtensions.scanl1 = function(arr,f) {
	var result = [];
	if(0 == arr.length) return result;
	var accum = arr[0];
	result.push(accum);
	{
		var _g1 = 1, _g = arr.length;
		while(_g1 < _g) {
			var i = _g1++;
			result.push(f(arr[i],accum));
		}
	}
	return result;
}
haxe.data.collections.ArrayExtensions.scanr1 = function(arr,f) {
	var a = ArrayExtensions.snapshot(arr);
	a.reverse();
	return haxe.data.collections.ArrayExtensions.scanl1(a,f);
}
haxe.data.collections.ArrayExtensions.elements = function(arr) {
	return ArrayExtensions.snapshot(arr);
}
haxe.data.collections.ArrayExtensions.appendAll = function(arr,i) {
	var acc = ArrayExtensions.snapshot(arr);
	{ var $it0 = i.iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
	acc.push(e);
	}}
	return acc;
}
haxe.data.collections.ArrayExtensions.isEmpty = function(arr) {
	return arr.length == 0;
}
haxe.data.collections.ArrayExtensions.find = function(arr,f) {
	return ArrayExtensions.foldl(arr,Option.None,function(a,b) {
		return (function($this) {
			var $r;
			var $e = (a);
			switch( $e[1] ) {
			case 0:
			{
				$r = OptionExtensions.filter(OptionExtensions.toOption(b),f);
			}break;
			default:{
				$r = a;
			}break;
			}
			return $r;
		}(this));
	});
}
haxe.data.collections.ArrayExtensions.forAll = function(arr,f) {
	return ArrayExtensions.foldl(arr,true,function(a,b) {
		return (function($this) {
			var $r;
			switch(a) {
			case true:{
				$r = f(b);
			}break;
			case false:{
				$r = false;
			}break;
			default:{
				$r = null;
			}break;
			}
			return $r;
		}(this));
	});
}
haxe.data.collections.ArrayExtensions.forAny = function(arr,f) {
	return ArrayExtensions.foldl(arr,false,function(a,b) {
		return (function($this) {
			var $r;
			switch(a) {
			case false:{
				$r = f(b);
			}break;
			case true:{
				$r = true;
			}break;
			default:{
				$r = null;
			}break;
			}
			return $r;
		}(this));
	});
}
haxe.data.collections.ArrayExtensions.exists = function(arr,f) {
	return (function($this) {
		var $r;
		var $e = (haxe.data.collections.ArrayExtensions.find(arr,f));
		switch( $e[1] ) {
		case 1:
		var v = $e[2];
		{
			$r = true;
		}break;
		case 0:
		{
			$r = false;
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
haxe.data.collections.ArrayExtensions.existsP = function(arr,ref,f) {
	var result = false;
	{
		var _g = 0;
		while(_g < arr.length) {
			var e = arr[_g];
			++_g;
			if(f(e,ref)) return true;
		}
	}
	return false;
}
haxe.data.collections.ArrayExtensions.nubBy = function(arr,f) {
	return ArrayExtensions.foldl(arr,[],function(a,b) {
		return (haxe.data.collections.ArrayExtensions.existsP(a,b,f)?a:ArrayExtensions.append(a,b));
	});
}
haxe.data.collections.ArrayExtensions.nub = function(arr) {
	return haxe.data.collections.ArrayExtensions.nubBy(arr,function(a,b) {
		return a == b;
	});
}
haxe.data.collections.ArrayExtensions.intersectBy = function(arr1,arr2,f) {
	return ArrayExtensions.foldl(arr1,[],function(a,b) {
		return (haxe.data.collections.ArrayExtensions.existsP(arr2,b,f)?ArrayExtensions.append(a,b):a);
	});
}
haxe.data.collections.ArrayExtensions.intersect = function(arr1,arr2) {
	return haxe.data.collections.ArrayExtensions.intersectBy(arr1,arr2,function(a,b) {
		return a == b;
	});
}
haxe.data.collections.ArrayExtensions.mkString = function(arr,sep,show) {
	if(sep == null) sep = ", ";
	var isFirst = true;
	return ArrayExtensions.foldl(arr,"",function(a,b) {
		var prefix = (isFirst?(function($this) {
			var $r;
			isFirst = false;
			$r = "";
			return $r;
		}(this)):sep);
		if(null == show) show = Stax.getShowFor(b);
		return (a + prefix) + show(b);
	});
}
haxe.data.collections.ArrayExtensions.toList = function(arr) {
	return haxe.data.collections.List.create().addAll(arr);
}
haxe.data.collections.ArrayExtensions.toSet = function(arr) {
	return haxe.data.collections.Set.create().addAll(arr);
}
haxe.data.collections.ArrayExtensions.toMap = function(arr) {
	return haxe.data.collections.Map.create().addAll(arr);
}
haxe.data.collections.ArrayExtensions.prototype.__class__ = haxe.data.collections.ArrayExtensions;
haxe.io.http.HttpString = function() { }
haxe.io.http.HttpString.__name__ = ["haxe","io","http","HttpString"];
haxe.io.http.HttpString.prototype.__class__ = haxe.io.http.HttpString;
haxe.io.http.HttpString.__interfaces__ = [haxe.io.http.Http];
haxe.io.http.HttpStringAsync = function(p) { if( p === $_ ) return; {
	null;
}}
haxe.io.http.HttpStringAsync.__name__ = ["haxe","io","http","HttpStringAsync"];
haxe.io.http.HttpStringAsync.prototype.custom = function(method,_url,data,_params,_headers) {
	var url = haxe.net.UrlExtensions.addQueryParameters(_url,OptionExtensions.getOrElseC(OptionExtensions.toOption(_params),haxe.data.collections.Map.create()));
	var future = new Future();
	var request = js.dom.Quirks.createXMLHttpRequest();
	future.ifCanceled(Function0Extensions.swallow($closure(request,"abort")));
	request.onreadystatechange = function() {
		var toBody = function(text) {
			return (text == null || text.length == 0?Option.None:Option.Some(text));
		}
		if(request.readyState == js.XmlHttpRequestState.DONE) {
			var responseHeaders = (request.getAllResponseHeaders() == null?"":request.getAllResponseHeaders());
			future.deliver({ body : toBody(request.responseText), headers : haxe.net.HttpHeaderExtensions.toHttpHeaders(responseHeaders), code : haxe.net.HttpResponseCodeExtensions.toHttpResponseCode(request.status)});
		}
	}
	try {
		request.open(method,url,true);
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				future.cancel();
			}
		}
	}
	OptionExtensions.map(OptionExtensions.toOption(_headers),function(headers) {
		haxe.functional.FoldableExtensions.foreach(headers,function(header) {
			request.setRequestHeader(header._1,header._2);
		});
	});
	request.send(data);
	return future;
}
haxe.io.http.HttpStringAsync.prototype["delete"] = function(url,params,headers) {
	return this.custom("DELETE",url,null,params,headers);
}
haxe.io.http.HttpStringAsync.prototype.get = function(url,params,headers) {
	return this.custom("GET",url,null,params,headers);
}
haxe.io.http.HttpStringAsync.prototype.makeHeader = function(_headers,contentType) {
	return OptionExtensions.getOrElseC(OptionExtensions.toOption(_headers),haxe.data.collections.Map.create()).set("Content-Type",contentType);
}
haxe.io.http.HttpStringAsync.prototype.post = function(url,data,params,headers) {
	return this.custom("POST",url,data,params,this.makeHeader(headers,"application/x-www-form-urlencoded"));
}
haxe.io.http.HttpStringAsync.prototype.put = function(url,data,params,headers) {
	return this.custom("PUT",url,data,params,this.makeHeader(headers,"application/x-www-form-urlencoded"));
}
haxe.io.http.HttpStringAsync.prototype.__class__ = haxe.io.http.HttpStringAsync;
haxe.io.http.HttpStringAsync.__interfaces__ = [haxe.io.http.HttpString];
js.Lib = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Lib.prototype.__class__ = js.Lib;
FloatExtensions = function() { }
FloatExtensions.__name__ = ["FloatExtensions"];
FloatExtensions.round = function(v) {
	return Math.round(v);
}
FloatExtensions.ceil = function(v) {
	return Math.ceil(v);
}
FloatExtensions.floor = function(v) {
	return Math.floor(v);
}
FloatExtensions.max = function(v1,v2) {
	return (v2 > v1?v2:v1);
}
FloatExtensions.min = function(v1,v2) {
	return (v2 < v1?v2:v1);
}
FloatExtensions.toInt = function(v) {
	return Std["int"](v);
}
FloatExtensions.compare = function(v1,v2) {
	return (v1 < v2?-1:(v1 > v2?1:0));
}
FloatExtensions.equals = function(v1,v2) {
	return v1 == v2;
}
FloatExtensions.toString = function(v) {
	return "" + v;
}
FloatExtensions.hashCode = function(v) {
	return Std["int"](v * 98317);
}
FloatExtensions.decompose = function(v) {
	return haxe.text.json.JValue.JNumber(v);
}
FloatExtensions.extract = function(c,v) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 2:
		var v1 = $e[2];
		{
			$r = v1;
		}break;
		case 3:
		var v1 = $e[2];
		{
			$r = StringExtensions.toFloat(v1);
		}break;
		default:{
			$r = Stax.error("Expected Float but found: " + v);
		}break;
		}
		return $r;
	}(this));
}
FloatExtensions.prototype.__class__ = FloatExtensions;
if(!haxe.math.tween) haxe.math.tween = {}
haxe.math.tween.TweenerExtensions = function() { }
haxe.math.tween.TweenerExtensions.__name__ = ["haxe","math","tween","TweenerExtensions"];
haxe.math.tween.TweenerExtensions.startWith = function(tweener,easing) {
	return function(t) {
		return tweener(easing(t));
	}
}
haxe.math.tween.TweenerExtensions.endWith = function(tweener,easing) {
	return haxe.math.tween.TweenerExtensions.startWith(tweener,function(t) {
		return 1.0 - easing(1.0 - t);
	});
}
haxe.math.tween.TweenerExtensions.animate = function(tweener,duration,frequency_,cb) {
	if(frequency_ == null) frequency_ = 0;
	var executor = haxe.framework.Injector.inject(haxe.time.ScheduledExecutor,{ fileName : "TweenExtensions.hx", lineNumber : 51, className : "haxe.math.tween.TweenerExtensions", methodName : "animate"});
	var frequency = (frequency_ > 0?frequency_:haxe.math.tween.TweenerExtensions.DefaultFrequency);
	return executor.repeat(frequency,function(millis) {
		var t = millis / duration;
		cb(tweener(t));
		return millis + frequency;
	},frequency,FloatExtensions.ceil((duration / frequency)));
}
haxe.math.tween.TweenerExtensions.prototype.__class__ = haxe.math.tween.TweenerExtensions;
ValueType = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
Type = function() { }
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if(o.__enum__ != null) return null;
	return o.__class__;
}
Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
}
Type.getSuperClass = function(c) {
	return c.__super__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl;
	try {
		cl = eval(name);
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				cl = null;
			}
		}
	}
	if(cl == null || cl.__name__ == null) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e;
	try {
		e = eval(name);
	}
	catch( $e0 ) {
		{
			var err = $e0;
			{
				e = null;
			}
		}
	}
	if(e == null || e.__ename__ == null) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	if(args.length <= 3) return new cl(args[0],args[1],args[2]);
	if(args.length > 8) throw "Too many arguments";
	return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
}
Type.createEmptyInstance = function(cl) {
	return new cl($_);
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw ("Constructor " + constr) + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw ("Constructor " + constr) + " does not need parameters";
	return f;
}
Type.createEnumIndex = function(e,index,params) {
	var c = Type.getEnumConstructs(e)[index];
	if(c == null) throw index + " is not a valid enum constructor index";
	return Type.createEnum(e,c,params);
}
Type.getInstanceFields = function(c) {
	var a = Reflect.fields(c.prototype);
	a.remove("__class__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	a.remove("__name__");
	a.remove("__interfaces__");
	a.remove("__super__");
	a.remove("prototype");
	return a;
}
Type.getEnumConstructs = function(e) {
	return e.__constructs__;
}
Type["typeof"] = function(v) {
	switch(typeof(v)) {
	case "boolean":{
		return ValueType.TBool;
	}break;
	case "string":{
		return ValueType.TClass(String);
	}break;
	case "number":{
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	}break;
	case "object":{
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	}break;
	case "function":{
		if(v.__name__ != null) return ValueType.TObject;
		return ValueType.TFunction;
	}break;
	case "undefined":{
		return ValueType.TNull;
	}break;
	default:{
		return ValueType.TUnknown;
	}break;
	}
}
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		{
			var _g1 = 2, _g = a.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(!Type.enumEq(a[i],b[i])) return false;
			}
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				return false;
			}
		}
	}
	return true;
}
Type.enumConstructor = function(e) {
	return e[0];
}
Type.enumParameters = function(e) {
	return e.slice(2);
}
Type.enumIndex = function(e) {
	return e[1];
}
Type.prototype.__class__ = Type;
if(!haxe.framework) haxe.framework = {}
haxe.framework.BindingType = { __ename__ : ["haxe","framework","BindingType"], __constructs__ : ["OneToOne","OneToMany"] }
haxe.framework.BindingType.OneToMany = ["OneToMany",1];
haxe.framework.BindingType.OneToMany.toString = $estr;
haxe.framework.BindingType.OneToMany.__enum__ = haxe.framework.BindingType;
haxe.framework.BindingType.OneToOne = ["OneToOne",0];
haxe.framework.BindingType.OneToOne.toString = $estr;
haxe.framework.BindingType.OneToOne.__enum__ = haxe.framework.BindingType;
haxe.framework.InjectorConfig = function() { }
haxe.framework.InjectorConfig.__name__ = ["haxe","framework","InjectorConfig"];
haxe.framework.InjectorConfig.prototype.bind = null;
haxe.framework.InjectorConfig.prototype.bindF = null;
haxe.framework.InjectorConfig.prototype.inClass = null;
haxe.framework.InjectorConfig.prototype.inModule = null;
haxe.framework.InjectorConfig.prototype.inPackage = null;
haxe.framework.InjectorConfig.prototype.__class__ = haxe.framework.InjectorConfig;
haxe.framework.Injector = function() { }
haxe.framework.Injector.__name__ = ["haxe","framework","Injector"];
haxe.framework.Injector.inject = function(interf,pos) {
	return haxe.framework._Injector.InjectorImpl.inject(interf,pos);
}
haxe.framework.Injector.enter = function(f) {
	return haxe.framework._Injector.InjectorImpl.enter(f);
}
haxe.framework.Injector.forever = function(f) {
	return haxe.framework._Injector.InjectorImpl.forever(f);
}
haxe.framework.Injector.prototype.__class__ = haxe.framework.Injector;
if(!haxe.framework._Injector) haxe.framework._Injector = {}
haxe.framework._Injector.InjectorImpl = function() { }
haxe.framework._Injector.InjectorImpl.__name__ = ["haxe","framework","_Injector","InjectorImpl"];
haxe.framework._Injector.InjectorImpl.classBindingsExtractor = function(b) {
	return b.classBindings;
}
haxe.framework._Injector.InjectorImpl.moduleBindingsExtractor = function(b) {
	return b.moduleBindings;
}
haxe.framework._Injector.InjectorImpl.packageBindingsExtractor = function(b) {
	return b.packageBindings;
}
haxe.framework._Injector.InjectorImpl.inject = function(interf,pos) {
	var binding = haxe.framework._Injector.InjectorImpl.getMostSpecificBinding(interf,pos);
	var factory = OptionExtensions.getOrElse(binding,Function1Extensions.lazy($closure(Stax,"error"),"No binding defined for " + Type.getClassName(interf)));
	return factory();
}
haxe.framework._Injector.InjectorImpl.forever = function(f) {
	haxe.framework._Injector.InjectorImpl.state.unshift({ globalBindings : new Hash(), packageBindings : new Hash(), moduleBindings : new Hash(), classBindings : new Hash()});
	return f(new haxe.framework._Injector.InjectorConfigImpl());
}
haxe.framework._Injector.InjectorImpl.enter = function(f) {
	haxe.framework._Injector.InjectorImpl.state.unshift({ globalBindings : new Hash(), packageBindings : new Hash(), moduleBindings : new Hash(), classBindings : new Hash()});
	var result = null;
	try {
		result = f(new haxe.framework._Injector.InjectorConfigImpl());
		haxe.framework._Injector.InjectorImpl.state.shift();
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				haxe.framework._Injector.InjectorImpl.state.shift();
				throw e;
			}
		}
	}
	return result;
}
haxe.framework._Injector.InjectorImpl.bindTo = function(interf,impl,bindingType) {
	return haxe.framework._Injector.InjectorImpl.globally().bindTo(interf,impl,bindingType);
}
haxe.framework._Injector.InjectorImpl.bindToF = function(interf,f,bindingType) {
	return haxe.framework._Injector.InjectorImpl.globally().bindToF(interf,f,bindingType);
}
haxe.framework._Injector.InjectorImpl.globally = function() {
	var internalBind = function(interf,f,bindingType) {
		var $e = (haxe.framework._Injector.InjectorImpl.bindingTypeDef(bindingType));
		switch( $e[1] ) {
		case 0:
		{
			haxe.framework._Injector.InjectorImpl.addGlobalBinding(interf,f);
		}break;
		case 1:
		{
			haxe.framework._Injector.InjectorImpl.addGlobalBinding(interf,DynamicExtensions.memoize(f));
		}break;
		}
	}
	return { bindToF : internalBind, bindTo : function(interf,impl,bindingType) {
		internalBind(interf,haxe.framework._Injector.InjectorImpl.factoryFor(impl),bindingType);
	}}
}
haxe.framework._Injector.InjectorImpl.inClass = function(c) {
	return { bindToF : function(interf,f,bindingType) {
		haxe.framework._Injector.InjectorImpl.bindForSpecificF(haxe.framework._Injector.InjectorImpl.classBindingsExtractor,interf,Type.getClassName(c),f,bindingType);
	}, bindTo : function(interf,impl,bindingType) {
		haxe.framework._Injector.InjectorImpl.bindForSpecificF(haxe.framework._Injector.InjectorImpl.classBindingsExtractor,interf,Type.getClassName(c),haxe.framework._Injector.InjectorImpl.factoryFor(impl),bindingType);
	}}
}
haxe.framework._Injector.InjectorImpl.inModule = function(moduleName) {
	return { bindToF : function(interf,f,bindingType) {
		haxe.framework._Injector.InjectorImpl.bindForSpecificF(haxe.framework._Injector.InjectorImpl.moduleBindingsExtractor,interf,moduleName,f,bindingType);
	}, bindTo : function(interf,impl,bindingType) {
		haxe.framework._Injector.InjectorImpl.bindForSpecificF(haxe.framework._Injector.InjectorImpl.moduleBindingsExtractor,interf,moduleName,haxe.framework._Injector.InjectorImpl.factoryFor(impl),bindingType);
	}}
}
haxe.framework._Injector.InjectorImpl.inPackage = function(packageName) {
	return { bindToF : function(interf,f,bindingType) {
		haxe.framework._Injector.InjectorImpl.bindForSpecificF(haxe.framework._Injector.InjectorImpl.packageBindingsExtractor,interf,packageName,f,bindingType);
	}, bindTo : function(interf,impl,bindingType) {
		haxe.framework._Injector.InjectorImpl.bindForSpecificF(haxe.framework._Injector.InjectorImpl.packageBindingsExtractor,interf,packageName,haxe.framework._Injector.InjectorImpl.factoryFor(impl),bindingType);
	}}
}
haxe.framework._Injector.InjectorImpl.bindForSpecificF = function(extractor,interf,specific,f,bindingType) {
	var $e = (haxe.framework._Injector.InjectorImpl.bindingTypeDef(bindingType));
	switch( $e[1] ) {
	case 0:
	{
		haxe.framework._Injector.InjectorImpl.addSpecificBinding(extractor(ArrayExtensions.first(haxe.framework._Injector.InjectorImpl.state)),interf,specific,f);
	}break;
	case 1:
	{
		haxe.framework._Injector.InjectorImpl.addSpecificBinding(extractor(ArrayExtensions.first(haxe.framework._Injector.InjectorImpl.state)),interf,specific,DynamicExtensions.memoize(f));
	}break;
	}
}
haxe.framework._Injector.InjectorImpl.getMostSpecificBinding = function(c,pos) {
	var className = haxe.framework._Injector.InjectorImpl.classOf(pos);
	var moduleName = haxe.framework._Injector.InjectorImpl.moduleOf(pos);
	var packageName = haxe.framework._Injector.InjectorImpl.packageOf(pos);
	return OptionExtensions.orElse(OptionExtensions.orElse(OptionExtensions.orElse(haxe.framework._Injector.InjectorImpl.getClassBinding(c,className),Function2Extensions.lazy($closure(haxe.framework._Injector.InjectorImpl,"getModuleBinding"),c,moduleName)),Function2Extensions.lazy($closure(haxe.framework._Injector.InjectorImpl,"getPackageBinding"),c,packageName)),Function1Extensions.lazy($closure(haxe.framework._Injector.InjectorImpl,"getGlobalBinding"),c));
}
haxe.framework._Injector.InjectorImpl.getGlobalBinding = function(c) {
	var className = Type.getClassName(c);
	return ArrayExtensions.foldl(haxe.framework._Injector.InjectorImpl.state,Option.None,function(a,b) {
		return OptionExtensions.orElseC(a,OptionExtensions.toOption(b.globalBindings.get(className)));
	});
}
haxe.framework._Injector.InjectorImpl.getClassBinding = function(c,className) {
	return haxe.framework._Injector.InjectorImpl.getSpecificBinding(haxe.framework._Injector.InjectorImpl.classBindingsExtractor,c,className);
}
haxe.framework._Injector.InjectorImpl.getModuleBinding = function(c,moduleName) {
	return haxe.framework._Injector.InjectorImpl.getSpecificBinding(haxe.framework._Injector.InjectorImpl.moduleBindingsExtractor,c,moduleName);
}
haxe.framework._Injector.InjectorImpl.getPackageBinding = function(c,packageName) {
	return haxe.framework._Injector.InjectorImpl.getSpecificBinding(haxe.framework._Injector.InjectorImpl.packageBindingsExtractor,c,packageName);
}
haxe.framework._Injector.InjectorImpl.addGlobalBinding = function(c,f) {
	ArrayExtensions.first(haxe.framework._Injector.InjectorImpl.state).globalBindings.set(Type.getClassName(c),f);
}
haxe.framework._Injector.InjectorImpl.getSpecificBinding = function(extractor,c,specific) {
	{
		var _g = 0, _g1 = haxe.framework._Injector.InjectorImpl.state;
		while(_g < _g1.length) {
			var bindings = _g1[_g];
			++_g;
			var binding = extractor(bindings);
			var result = OptionExtensions.flatMap(OptionExtensions.toOption(binding.get(Type.getClassName(c))),function(h) {
				return OptionExtensions.toOption(h.get(specific));
			});
			if(!OptionExtensions.isEmpty(result)) {
				return result;
			}
		}
	}
	return Option.None;
}
haxe.framework._Injector.InjectorImpl.addSpecificBinding = function(bindings,c,specific,f) {
	var h = bindings.get(Type.getClassName(c));
	if(h == null) {
		h = new Hash();
		bindings.set(Type.getClassName(c),h);
	}
	h.set(specific,f);
}
haxe.framework._Injector.InjectorImpl.classOf = function(pos) {
	return pos.className;
}
haxe.framework._Injector.InjectorImpl.packageOf = function(pos) {
	return pos.className.substr(0,pos.className.lastIndexOf("."));
}
haxe.framework._Injector.InjectorImpl.moduleOf = function(pos) {
	var className = haxe.framework._Injector.InjectorImpl.classOf(pos);
	var packageName = haxe.framework._Injector.InjectorImpl.packageOf(pos);
	var moduleName = (packageName + ".") + pos.fileName.substr(0,pos.fileName.lastIndexOf("."));
	return moduleName;
}
haxe.framework._Injector.InjectorImpl.factoryFor = function(impl) {
	return function() {
		return Type.createInstance(impl,[]);
	}
}
haxe.framework._Injector.InjectorImpl.bindingTypeDef = function(bindingType) {
	return OptionExtensions.getOrElseC(OptionExtensions.toOption(bindingType),haxe.framework.BindingType.OneToMany);
}
haxe.framework._Injector.InjectorImpl.prototype.__class__ = haxe.framework._Injector.InjectorImpl;
haxe.framework._Injector.InjectorConfigImpl = function(p) { if( p === $_ ) return; {
	null;
}}
haxe.framework._Injector.InjectorConfigImpl.__name__ = ["haxe","framework","_Injector","InjectorConfigImpl"];
haxe.framework._Injector.InjectorConfigImpl.prototype.bind = function(interf,impl,b) {
	haxe.framework._Injector.InjectorImpl.globally().bindTo(interf,impl,b);
	return this;
}
haxe.framework._Injector.InjectorConfigImpl.prototype.bindF = function(interf,f,b) {
	haxe.framework._Injector.InjectorImpl.globally().bindToF(interf,f,b);
	return this;
}
haxe.framework._Injector.InjectorConfigImpl.prototype.inClass = function(c) {
	var self = this;
	return { bind : function(interf,impl,b) {
		haxe.framework._Injector.InjectorImpl.inClass(c).bindTo(interf,impl,b);
		return self;
	}, bindF : function(interf,f,b) {
		haxe.framework._Injector.InjectorImpl.inClass(c).bindToF(interf,f,b);
		return self;
	}}
}
haxe.framework._Injector.InjectorConfigImpl.prototype.inModule = function(m) {
	var self = this;
	return { bind : function(interf,impl,b) {
		haxe.framework._Injector.InjectorImpl.inModule(m).bindTo(interf,impl,b);
		return self;
	}, bindF : function(interf,f,b) {
		haxe.framework._Injector.InjectorImpl.inModule(m).bindToF(interf,f,b);
		return self;
	}}
}
haxe.framework._Injector.InjectorConfigImpl.prototype.inPackage = function(p) {
	var self = this;
	return { bind : function(interf,impl,b) {
		haxe.framework._Injector.InjectorImpl.inPackage(p).bindTo(interf,impl,b);
		return self;
	}, bindF : function(interf,f,b) {
		haxe.framework._Injector.InjectorImpl.inPackage(p).bindToF(interf,f,b);
		return self;
	}}
}
haxe.framework._Injector.InjectorConfigImpl.prototype.__class__ = haxe.framework._Injector.InjectorConfigImpl;
haxe.framework._Injector.InjectorConfigImpl.__interfaces__ = [haxe.framework.InjectorConfig];
haxe.data.collections.ListTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
haxe.data.collections.ListTestCase.__name__ = ["haxe","data","collections","ListTestCase"];
haxe.data.collections.ListTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) haxe.data.collections.ListTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
haxe.data.collections.ListTestCase.prototype.assertListEquals = function(l1,l2,pos) {
	this.assertTrue(l1.equals(l2),null,pos);
	this.assertTrue((Stax.getEqualFor(l1))(l1,l2),null,pos);
}
haxe.data.collections.ListTestCase.prototype.defaultList = function() {
	var l = this.newList();
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			l = l.add(i);
		}
	}
	return l;
}
haxe.data.collections.ListTestCase.prototype.newList = function(values) {
	var list = haxe.data.collections.List.create();
	if(null != values) return list.addAll(values);
	else return list;
}
haxe.data.collections.ListTestCase.prototype.testCanIterateThroughElements = function() {
	var l = this.defaultList();
	var count = 4950;
	var iterated = 0;
	{ var $it0 = l.iterator();
	while( $it0.hasNext() ) { var k = $it0.next();
	{
		count -= k;
		++iterated;
	}
	}}
	this.assertEquals(100,iterated,null,null,{ fileName : "ListTestCase.hx", lineNumber : 86, className : "haxe.data.collections.ListTestCase", methodName : "testCanIterateThroughElements"});
	this.assertEquals(0,count,null,null,{ fileName : "ListTestCase.hx", lineNumber : 87, className : "haxe.data.collections.ListTestCase", methodName : "testCanIterateThroughElements"});
}
haxe.data.collections.ListTestCase.prototype.testCompare = function() {
	this.assertTrue(this.newList().compare(this.newList()) == 0,null,{ fileName : "ListTestCase.hx", lineNumber : 187, className : "haxe.data.collections.ListTestCase", methodName : "testCompare"});
	this.assertTrue(this.newList([1,2,3]).compare(this.newList([1,2,3])) == 0,null,{ fileName : "ListTestCase.hx", lineNumber : 188, className : "haxe.data.collections.ListTestCase", methodName : "testCompare"});
	this.assertTrue(this.newList([1,2,3]).compare(this.newList([2,2,3])) < 0,null,{ fileName : "ListTestCase.hx", lineNumber : 190, className : "haxe.data.collections.ListTestCase", methodName : "testCompare"});
	this.assertTrue(this.newList([1,2,3]).compare(this.newList([1])) > 0,null,{ fileName : "ListTestCase.hx", lineNumber : 191, className : "haxe.data.collections.ListTestCase", methodName : "testCompare"});
	var list = haxe.data.collections.List.create(function(a,b) {
		return (Math.abs(a - b) < 0.25?0:((a > b?1:-1)));
	}).addAll([1.0,2.1]);
	this.assertTrue(list.compare(this.newList([0.9,2.0])) == 0,null,{ fileName : "ListTestCase.hx", lineNumber : 195, className : "haxe.data.collections.ListTestCase", methodName : "testCompare"});
	this.assertTrue(list.compare(this.newList([0.9,2.4])) < 0,null,{ fileName : "ListTestCase.hx", lineNumber : 196, className : "haxe.data.collections.ListTestCase", methodName : "testCompare"});
	this.assertTrue(list.compare(this.newList([0.7,2.0])) > 0,null,{ fileName : "ListTestCase.hx", lineNumber : 197, className : "haxe.data.collections.ListTestCase", methodName : "testCompare"});
}
haxe.data.collections.ListTestCase.prototype.testContainsElements = function() {
	var l = this.newList();
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			this.assertFalse(l.contains(i),null,{ fileName : "ListTestCase.hx", lineNumber : 66, className : "haxe.data.collections.ListTestCase", methodName : "testContainsElements"});
			l = l.add(i);
			this.assertTrue(l.contains(i),null,{ fileName : "ListTestCase.hx", lineNumber : 70, className : "haxe.data.collections.ListTestCase", methodName : "testContainsElements"});
		}
	}
}
haxe.data.collections.ListTestCase.prototype.testEquals = function() {
	this.assertTrue(this.newList().equals(this.newList()),null,{ fileName : "ListTestCase.hx", lineNumber : 174, className : "haxe.data.collections.ListTestCase", methodName : "testEquals"});
	this.assertTrue(this.newList([1,2,3]).equals(this.newList([1,2,3])),null,{ fileName : "ListTestCase.hx", lineNumber : 175, className : "haxe.data.collections.ListTestCase", methodName : "testEquals"});
	this.assertFalse(this.newList([1,2,3]).equals(this.newList([2,2,3])),null,{ fileName : "ListTestCase.hx", lineNumber : 176, className : "haxe.data.collections.ListTestCase", methodName : "testEquals"});
	this.assertFalse(this.newList([1,2,3]).equals(this.newList([1])),null,{ fileName : "ListTestCase.hx", lineNumber : 177, className : "haxe.data.collections.ListTestCase", methodName : "testEquals"});
	var list = haxe.data.collections.List.create(null,function(a,b) {
		return Math.abs(a - b) < 0.25;
	}).addAll([1.0,2.1]);
	this.assertTrue(list.equals(this.newList([0.9,2.0])),null,{ fileName : "ListTestCase.hx", lineNumber : 181, className : "haxe.data.collections.ListTestCase", methodName : "testEquals"});
	this.assertFalse(list.equals(this.newList([0.9,2.4])),null,{ fileName : "ListTestCase.hx", lineNumber : 182, className : "haxe.data.collections.ListTestCase", methodName : "testEquals"});
	this.assertFalse(list.equals(this.newList([0.7,2.0])),null,{ fileName : "ListTestCase.hx", lineNumber : 183, className : "haxe.data.collections.ListTestCase", methodName : "testEquals"});
}
haxe.data.collections.ListTestCase.prototype.testFilter = function() {
	var l = this.defaultList().filter(function(e) {
		return e < 50;
	});
	this.assertEquals(50,l.size(),null,null,{ fileName : "ListTestCase.hx", lineNumber : 93, className : "haxe.data.collections.ListTestCase", methodName : "testFilter"});
}
haxe.data.collections.ListTestCase.prototype.testFoldr = function() {
	this.assertEquals(4950,this.defaultList().foldr(0,function(b,a) {
		return a + b;
	}),null,null,{ fileName : "ListTestCase.hx", lineNumber : 130, className : "haxe.data.collections.ListTestCase", methodName : "testFoldr"});
}
haxe.data.collections.ListTestCase.prototype.testHashCode = function() {
	this.assertNotEquals(0,this.newList().hashCode(),null,{ fileName : "ListTestCase.hx", lineNumber : 210, className : "haxe.data.collections.ListTestCase", methodName : "testHashCode"});
	this.assertNotEquals(0,this.newList([1,2]).hashCode(),null,{ fileName : "ListTestCase.hx", lineNumber : 211, className : "haxe.data.collections.ListTestCase", methodName : "testHashCode"});
}
haxe.data.collections.ListTestCase.prototype.testHead = function() {
	this.assertEquals(0,this.defaultList().getHead(),null,null,{ fileName : "ListTestCase.hx", lineNumber : 148, className : "haxe.data.collections.ListTestCase", methodName : "testHead"});
}
haxe.data.collections.ListTestCase.prototype.testHeadOption = function() {
	var $e = (this.defaultList().getHeadOption());
	switch( $e[1] ) {
	case 1:
	var v = $e[2];
	{
		this.assertEquals(0,v,null,null,{ fileName : "ListTestCase.hx", lineNumber : 153, className : "haxe.data.collections.ListTestCase", methodName : "testHeadOption"});
	}break;
	default:{
		this.assertTrue(false,null,{ fileName : "ListTestCase.hx", lineNumber : 155, className : "haxe.data.collections.ListTestCase", methodName : "testHeadOption"});
	}break;
	}
}
haxe.data.collections.ListTestCase.prototype.testIntListMapToString = function() {
	var list = haxe.data.collections.List.create().addAll([1,2,3]);
	var slist = list.map(function(i) {
		return IntExtensions.toString(i);
	});
	this.assertEquals(["1","2","3"],haxe.functional.FoldableExtensions.toArray(slist),null,null,{ fileName : "ListTestCase.hx", lineNumber : 217, className : "haxe.data.collections.ListTestCase", methodName : "testIntListMapToString"});
}
haxe.data.collections.ListTestCase.prototype.testLast = function() {
	this.assertEquals(99,this.defaultList().getLast(),null,null,{ fileName : "ListTestCase.hx", lineNumber : 136, className : "haxe.data.collections.ListTestCase", methodName : "testLast"});
}
haxe.data.collections.ListTestCase.prototype.testLastOption = function() {
	var $e = (this.defaultList().getLastOption());
	switch( $e[1] ) {
	case 1:
	var v = $e[2];
	{
		this.assertEquals(99,v,null,null,{ fileName : "ListTestCase.hx", lineNumber : 141, className : "haxe.data.collections.ListTestCase", methodName : "testLastOption"});
	}break;
	default:{
		this.assertTrue(false,null,{ fileName : "ListTestCase.hx", lineNumber : 143, className : "haxe.data.collections.ListTestCase", methodName : "testLastOption"});
	}break;
	}
}
haxe.data.collections.ListTestCase.prototype.testReverse = function() {
	var l = this.newList().addAll([9,2,1,100]);
	var rl = this.newList().addAll([100,1,2,9]);
	this.assertListEquals(rl,l.reverse(),{ fileName : "ListTestCase.hx", lineNumber : 126, className : "haxe.data.collections.ListTestCase", methodName : "testReverse"});
}
haxe.data.collections.ListTestCase.prototype.testSizeGrowsWhenAddingDuplicateElements = function() {
	var l = this.newList().add(0);
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			l = l.add(0);
		}
	}
	this.assertEquals(101,l.size(),null,null,{ fileName : "ListTestCase.hx", lineNumber : 47, className : "haxe.data.collections.ListTestCase", methodName : "testSizeGrowsWhenAddingDuplicateElements"});
}
haxe.data.collections.ListTestCase.prototype.testSizeGrowsWhenAddingUniqueElements = function() {
	var l = this.newList();
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			this.assertEquals(i,l.size(),null,null,{ fileName : "ListTestCase.hx", lineNumber : 34, className : "haxe.data.collections.ListTestCase", methodName : "testSizeGrowsWhenAddingUniqueElements"});
			l = l.add(i);
		}
	}
	this.assertEquals(100,l.size(),null,null,{ fileName : "ListTestCase.hx", lineNumber : 39, className : "haxe.data.collections.ListTestCase", methodName : "testSizeGrowsWhenAddingUniqueElements"});
}
haxe.data.collections.ListTestCase.prototype.testSizeShrinksWhenRemovingElements = function() {
	var l = this.defaultList();
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			this.assertEquals(100 - i,l.size(),null,null,{ fileName : "ListTestCase.hx", lineNumber : 54, className : "haxe.data.collections.ListTestCase", methodName : "testSizeShrinksWhenRemovingElements"});
			l = l.remove(i);
		}
	}
	this.assertEquals(0,l.size(),null,null,{ fileName : "ListTestCase.hx", lineNumber : 59, className : "haxe.data.collections.ListTestCase", methodName : "testSizeShrinksWhenRemovingElements"});
}
haxe.data.collections.ListTestCase.prototype.testSort = function() {
	var ul = this.newList().addAll([9,2,1,100]);
	var ol = this.newList().addAll([1,2,9,100]);
	this.assertListEquals(ol,ul.sort(),{ fileName : "ListTestCase.hx", lineNumber : 100, className : "haxe.data.collections.ListTestCase", methodName : "testSort"});
}
haxe.data.collections.ListTestCase.prototype.testSortWith = function() {
	var ul = this.newList().addAll([9,2,1,100]);
	var ol = this.newList().addAll([1,9,2,100]);
	var oddsfirst = function(a,b) {
		if(a == b) return 0;
		var aeven = a % 2 == 0;
		var beven = b % 2 == 0;
		if((aeven && beven) || (!aeven && !beven)) return a - b;
		else if(aeven) return 1;
		else return -1;
	}
	this.assertListEquals(ol,ul.withOrderFunction(oddsfirst).sort(),{ fileName : "ListTestCase.hx", lineNumber : 119, className : "haxe.data.collections.ListTestCase", methodName : "testSortWith"});
}
haxe.data.collections.ListTestCase.prototype.testToString = function() {
	this.assertEquals("List []",this.newList().toString(),null,null,{ fileName : "ListTestCase.hx", lineNumber : 201, className : "haxe.data.collections.ListTestCase", methodName : "testToString"});
	this.assertEquals("List [a, b]",this.newList(["a","b"]).toString(),null,null,{ fileName : "ListTestCase.hx", lineNumber : 202, className : "haxe.data.collections.ListTestCase", methodName : "testToString"});
	var list = haxe.data.collections.List.create(null,null,null,function(a) {
		return ("\"" + a) + "\"";
	}).addAll(["a","b"]);
	this.assertEquals("List [\"a\", \"b\"]",list.toString(),null,null,{ fileName : "ListTestCase.hx", lineNumber : 206, className : "haxe.data.collections.ListTestCase", methodName : "testToString"});
}
haxe.data.collections.ListTestCase.prototype.testZip = function() {
	var l = this.defaultList().zip(this.defaultList().drop(1));
	var i1 = 0, i2 = 1;
	{ var $it0 = l.iterator();
	while( $it0.hasNext() ) { var z = $it0.next();
	{
		this.assertEquals(z,DynamicExtensions.entuple(i1,i2),null,null,{ fileName : "ListTestCase.hx", lineNumber : 165, className : "haxe.data.collections.ListTestCase", methodName : "testZip"});
		++i1;
		++i2;
	}
	}}
	this.assertEquals(99,l.size(),null,null,{ fileName : "ListTestCase.hx", lineNumber : 170, className : "haxe.data.collections.ListTestCase", methodName : "testZip"});
}
haxe.data.collections.ListTestCase.prototype.__class__ = haxe.data.collections.ListTestCase;
Reflect = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	if(o.hasOwnProperty != null) return o.hasOwnProperty(field);
	var arr = Reflect.fields(o);
	{ var $it0 = arr.iterator();
	while( $it0.hasNext() ) { var t = $it0.next();
	if(t == field) return true;
	}}
	return false;
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	}
	catch( $e0 ) {
		{
			var e = $e0;
			null;
		}
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	if(o == null) return new Array();
	var a = new Array();
	if(o.hasOwnProperty) {
		
				for(var i in o)
					if( o.hasOwnProperty(i) )
						a.push(i);
			;
	}
	else {
		var t;
		try {
			t = o.__proto__;
		}
		catch( $e0 ) {
			{
				var e = $e0;
				{
					t = null;
				}
			}
		}
		if(t != null) o.__proto__ = null;
		
				for(var i in o)
					if( i != "__proto__" )
						a.push(i);
			;
		if(t != null) o.__proto__ = t;
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && f.__name__ == null;
}
Reflect.compare = function(a,b) {
	return ((a == b)?0:((((a) > (b))?1:-1)));
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return (t == "string" || (t == "object" && !v.__enum__) || (t == "function" && v.__name__ != null));
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { }
	{
		var _g = 0, _g1 = Reflect.fields(o);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			o2[f] = Reflect.field(o,f);
		}
	}
	return o2;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = new Array();
		{
			var _g1 = 0, _g = arguments.length;
			while(_g1 < _g) {
				var i = _g1++;
				a.push(arguments[i]);
			}
		}
		return f(a);
	}
}
Reflect.prototype.__class__ = Reflect;
if(!haxe.functional._PartialFunctionExtensions) haxe.functional._PartialFunctionExtensions = {}
haxe.functional._PartialFunctionExtensions.PartialFunction1Impl = function(def) { if( def === $_ ) return; {
	this._def = def;
}}
haxe.functional._PartialFunctionExtensions.PartialFunction1Impl.__name__ = ["haxe","functional","_PartialFunctionExtensions","PartialFunction1Impl"];
haxe.functional._PartialFunctionExtensions.PartialFunction1Impl.create = function(def) {
	return new haxe.functional._PartialFunctionExtensions.PartialFunction1Impl(def);
}
haxe.functional._PartialFunctionExtensions.PartialFunction1Impl.prototype._def = null;
haxe.functional._PartialFunctionExtensions.PartialFunction1Impl.prototype.call = function(a) {
	{
		var _g = 0, _g1 = this._def;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			if(d._1(a)) return d._2(a);
		}
	}
	return Stax.error("Function undefined at " + a);
}
haxe.functional._PartialFunctionExtensions.PartialFunction1Impl.prototype.isDefinedAt = function(a) {
	{
		var _g = 0, _g1 = this._def;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			if(d._1(a)) return true;
		}
	}
	return false;
}
haxe.functional._PartialFunctionExtensions.PartialFunction1Impl.prototype.orAlways = function(f) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction1Impl.create(this._def.concat([DynamicExtensions.entuple((function(a) {
		return true;
	}),f)]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction1Impl.prototype.orAlwaysC = function(z) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction1Impl.create(this._def.concat([DynamicExtensions.entuple((function(a) {
		return true;
	}),function(a) {
		return z();
	})]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction1Impl.prototype.orElse = function(that) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction1Impl.create(this._def.concat([Tuple2.create($closure(that,"isDefinedAt"),$closure(that,"call"))]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction1Impl.prototype.toFunction = function() {
	var self = this;
	return function(a) {
		return (self.isDefinedAt(a)?Option.Some(self.call(a)):Option.None);
	}
}
haxe.functional._PartialFunctionExtensions.PartialFunction1Impl.prototype.__class__ = haxe.functional._PartialFunctionExtensions.PartialFunction1Impl;
haxe.functional._PartialFunctionExtensions.PartialFunction1Impl.__interfaces__ = [haxe.functional.PartialFunction1];
haxe.functional.PartialFunction1ImplExtensions = function() { }
haxe.functional.PartialFunction1ImplExtensions.__name__ = ["haxe","functional","PartialFunction1ImplExtensions"];
haxe.functional.PartialFunction1ImplExtensions.toPartialFunction = function(def) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction1Impl.create(def);
}
haxe.functional.PartialFunction1ImplExtensions.prototype.__class__ = haxe.functional.PartialFunction1ImplExtensions;
haxe.functional._PartialFunctionExtensions.PartialFunction2Impl = function(def) { if( def === $_ ) return; {
	this._def = def;
}}
haxe.functional._PartialFunctionExtensions.PartialFunction2Impl.__name__ = ["haxe","functional","_PartialFunctionExtensions","PartialFunction2Impl"];
haxe.functional._PartialFunctionExtensions.PartialFunction2Impl.create = function(def) {
	return new haxe.functional._PartialFunctionExtensions.PartialFunction2Impl(def);
}
haxe.functional._PartialFunctionExtensions.PartialFunction2Impl.prototype._def = null;
haxe.functional._PartialFunctionExtensions.PartialFunction2Impl.prototype.call = function(a,b) {
	{
		var _g = 0, _g1 = this._def;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			if(d._1(a,b)) return d._2(a,b);
		}
	}
	return Stax.error(((("Function undefined at (" + a) + ", ") + b) + ")");
}
haxe.functional._PartialFunctionExtensions.PartialFunction2Impl.prototype.isDefinedAt = function(a,b) {
	{
		var _g = 0, _g1 = this._def;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			if(d._1(a,b)) return true;
		}
	}
	return false;
}
haxe.functional._PartialFunctionExtensions.PartialFunction2Impl.prototype.orAlways = function(f) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction2Impl.create(this._def.concat([DynamicExtensions.entuple((function(a,b) {
		return true;
	}),f)]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction2Impl.prototype.orAlwaysC = function(z) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction2Impl.create(this._def.concat([DynamicExtensions.entuple((function(a,b) {
		return true;
	}),function(a,b) {
		return z();
	})]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction2Impl.prototype.orElse = function(that) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction2Impl.create(this._def.concat([Tuple2.create($closure(that,"isDefinedAt"),$closure(that,"call"))]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction2Impl.prototype.toFunction = function() {
	var self = this;
	return function(a,b) {
		return (self.isDefinedAt(a,b)?Option.Some(self.call(a,b)):Option.None);
	}
}
haxe.functional._PartialFunctionExtensions.PartialFunction2Impl.prototype.__class__ = haxe.functional._PartialFunctionExtensions.PartialFunction2Impl;
haxe.functional._PartialFunctionExtensions.PartialFunction2Impl.__interfaces__ = [haxe.functional.PartialFunction2];
haxe.functional.PartialFunction2ImplExtensions = function() { }
haxe.functional.PartialFunction2ImplExtensions.__name__ = ["haxe","functional","PartialFunction2ImplExtensions"];
haxe.functional.PartialFunction2ImplExtensions.toPartialFunction = function(def) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction2Impl.create(def);
}
haxe.functional.PartialFunction2ImplExtensions.prototype.__class__ = haxe.functional.PartialFunction2ImplExtensions;
haxe.functional._PartialFunctionExtensions.PartialFunction3Impl = function(def) { if( def === $_ ) return; {
	this._def = def;
}}
haxe.functional._PartialFunctionExtensions.PartialFunction3Impl.__name__ = ["haxe","functional","_PartialFunctionExtensions","PartialFunction3Impl"];
haxe.functional._PartialFunctionExtensions.PartialFunction3Impl.create = function(def) {
	return new haxe.functional._PartialFunctionExtensions.PartialFunction3Impl(def);
}
haxe.functional._PartialFunctionExtensions.PartialFunction3Impl.prototype._def = null;
haxe.functional._PartialFunctionExtensions.PartialFunction3Impl.prototype.call = function(a,b,c) {
	{
		var _g = 0, _g1 = this._def;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			if(d._1(a,b,c)) return d._2(a,b,c);
		}
	}
	return Stax.error(((((("Function undefined at (" + a) + ", ") + b) + ", ") + c) + ")");
}
haxe.functional._PartialFunctionExtensions.PartialFunction3Impl.prototype.isDefinedAt = function(a,b,c) {
	{
		var _g = 0, _g1 = this._def;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			if(d._1(a,b,c)) return true;
		}
	}
	return false;
}
haxe.functional._PartialFunctionExtensions.PartialFunction3Impl.prototype.orAlways = function(f) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction3Impl.create(this._def.concat([DynamicExtensions.entuple((function(a,b,c) {
		return true;
	}),f)]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction3Impl.prototype.orAlwaysC = function(z) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction3Impl.create(this._def.concat([DynamicExtensions.entuple((function(a,b,c) {
		return true;
	}),function(a,b,c) {
		return z();
	})]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction3Impl.prototype.orElse = function(that) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction3Impl.create(this._def.concat([Tuple2.create($closure(that,"isDefinedAt"),$closure(that,"call"))]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction3Impl.prototype.toFunction = function() {
	var self = this;
	return function(a,b,c) {
		return (self.isDefinedAt(a,b,c)?Option.Some(self.call(a,b,c)):Option.None);
	}
}
haxe.functional._PartialFunctionExtensions.PartialFunction3Impl.prototype.__class__ = haxe.functional._PartialFunctionExtensions.PartialFunction3Impl;
haxe.functional._PartialFunctionExtensions.PartialFunction3Impl.__interfaces__ = [haxe.functional.PartialFunction3];
haxe.functional.PartialFunction3ImplExtensions = function() { }
haxe.functional.PartialFunction3ImplExtensions.__name__ = ["haxe","functional","PartialFunction3ImplExtensions"];
haxe.functional.PartialFunction3ImplExtensions.toPartialFunction = function(def) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction3Impl.create(def);
}
haxe.functional.PartialFunction3ImplExtensions.prototype.__class__ = haxe.functional.PartialFunction3ImplExtensions;
haxe.functional._PartialFunctionExtensions.PartialFunction4Impl = function(def) { if( def === $_ ) return; {
	this._def = def;
}}
haxe.functional._PartialFunctionExtensions.PartialFunction4Impl.__name__ = ["haxe","functional","_PartialFunctionExtensions","PartialFunction4Impl"];
haxe.functional._PartialFunctionExtensions.PartialFunction4Impl.create = function(def) {
	return new haxe.functional._PartialFunctionExtensions.PartialFunction4Impl(def);
}
haxe.functional._PartialFunctionExtensions.PartialFunction4Impl.prototype._def = null;
haxe.functional._PartialFunctionExtensions.PartialFunction4Impl.prototype.call = function(a,b,c,d) {
	{
		var _g = 0, _g1 = this._def;
		while(_g < _g1.length) {
			var def = _g1[_g];
			++_g;
			if(def._1(a,b,c,d)) return def._2(a,b,c,d);
		}
	}
	return Stax.error(((((((("Function undefined at (" + a) + ", ") + b) + ", ") + c) + ", ") + d) + ")");
}
haxe.functional._PartialFunctionExtensions.PartialFunction4Impl.prototype.isDefinedAt = function(a,b,c,d) {
	{
		var _g = 0, _g1 = this._def;
		while(_g < _g1.length) {
			var def = _g1[_g];
			++_g;
			if(def._1(a,b,c,d)) return true;
		}
	}
	return false;
}
haxe.functional._PartialFunctionExtensions.PartialFunction4Impl.prototype.orAlways = function(f) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction4Impl.create(this._def.concat([DynamicExtensions.entuple((function(a,b,c,d) {
		return true;
	}),f)]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction4Impl.prototype.orAlwaysC = function(z) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction4Impl.create(this._def.concat([DynamicExtensions.entuple((function(a,b,c,d) {
		return true;
	}),function(a,b,c,d) {
		return z();
	})]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction4Impl.prototype.orElse = function(that) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction4Impl.create(this._def.concat([Tuple2.create($closure(that,"isDefinedAt"),$closure(that,"call"))]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction4Impl.prototype.toFunction = function() {
	var self = this;
	return function(a,b,c,d) {
		return (self.isDefinedAt(a,b,c,d)?Option.Some(self.call(a,b,c,d)):Option.None);
	}
}
haxe.functional._PartialFunctionExtensions.PartialFunction4Impl.prototype.__class__ = haxe.functional._PartialFunctionExtensions.PartialFunction4Impl;
haxe.functional._PartialFunctionExtensions.PartialFunction4Impl.__interfaces__ = [haxe.functional.PartialFunction4];
haxe.functional.PartialFunction4ImplExtensions = function() { }
haxe.functional.PartialFunction4ImplExtensions.__name__ = ["haxe","functional","PartialFunction4ImplExtensions"];
haxe.functional.PartialFunction4ImplExtensions.toPartialFunction = function(def) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction4Impl.create(def);
}
haxe.functional.PartialFunction4ImplExtensions.prototype.__class__ = haxe.functional.PartialFunction4ImplExtensions;
haxe.functional._PartialFunctionExtensions.PartialFunction5Impl = function(def) { if( def === $_ ) return; {
	this._def = def;
}}
haxe.functional._PartialFunctionExtensions.PartialFunction5Impl.__name__ = ["haxe","functional","_PartialFunctionExtensions","PartialFunction5Impl"];
haxe.functional._PartialFunctionExtensions.PartialFunction5Impl.create = function(def) {
	return new haxe.functional._PartialFunctionExtensions.PartialFunction5Impl(def);
}
haxe.functional._PartialFunctionExtensions.PartialFunction5Impl.prototype._def = null;
haxe.functional._PartialFunctionExtensions.PartialFunction5Impl.prototype.call = function(a,b,c,d,e) {
	{
		var _g = 0, _g1 = this._def;
		while(_g < _g1.length) {
			var def = _g1[_g];
			++_g;
			if(def._1(a,b,c,d,e)) return def._2(a,b,c,d,e);
		}
	}
	return Stax.error(((((((("Function undefined at (" + a) + ", ") + b) + ", ") + c) + ", ") + d) + ")");
}
haxe.functional._PartialFunctionExtensions.PartialFunction5Impl.prototype.isDefinedAt = function(a,b,c,d,e) {
	{
		var _g = 0, _g1 = this._def;
		while(_g < _g1.length) {
			var def = _g1[_g];
			++_g;
			if(def._1(a,b,c,d,e)) return true;
		}
	}
	return false;
}
haxe.functional._PartialFunctionExtensions.PartialFunction5Impl.prototype.orAlways = function(f) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction5Impl.create(this._def.concat([DynamicExtensions.entuple((function(a,b,c,d,e) {
		return true;
	}),f)]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction5Impl.prototype.orAlwaysC = function(z) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction5Impl.create(this._def.concat([DynamicExtensions.entuple((function(a,b,c,d,e) {
		return true;
	}),function(a,b,c,d,e) {
		return z();
	})]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction5Impl.prototype.orElse = function(that) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction5Impl.create(this._def.concat([Tuple2.create($closure(that,"isDefinedAt"),$closure(that,"call"))]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction5Impl.prototype.toFunction = function() {
	var self = this;
	return function(a,b,c,d,e) {
		return (self.isDefinedAt(a,b,c,d,e)?Option.Some(self.call(a,b,c,d,e)):Option.None);
	}
}
haxe.functional._PartialFunctionExtensions.PartialFunction5Impl.prototype.__class__ = haxe.functional._PartialFunctionExtensions.PartialFunction5Impl;
haxe.functional._PartialFunctionExtensions.PartialFunction5Impl.__interfaces__ = [haxe.functional.PartialFunction5];
haxe.functional.PartialFunction5ImplExtensions = function() { }
haxe.functional.PartialFunction5ImplExtensions.__name__ = ["haxe","functional","PartialFunction5ImplExtensions"];
haxe.functional.PartialFunction5ImplExtensions.toPartialFunction = function(def) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction5Impl.create(def);
}
haxe.functional.PartialFunction5ImplExtensions.prototype.__class__ = haxe.functional.PartialFunction5ImplExtensions;
haxe.util.ObjectExtensionsTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
haxe.util.ObjectExtensionsTestCase.__name__ = ["haxe","util","ObjectExtensionsTestCase"];
haxe.util.ObjectExtensionsTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) haxe.util.ObjectExtensionsTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
haxe.util.ObjectExtensionsTestCase.prototype.testGet = function() {
	var o = { foo : "bar"}
	this.assertEquals("bar",OptionExtensions.get(haxe.util.ObjectExtensions.getAny(o,"foo")),null,null,{ fileName : "ObjectExtensionsTestCase.hx", lineNumber : 34, className : "haxe.util.ObjectExtensionsTestCase", methodName : "testGet"});
}
haxe.util.ObjectExtensionsTestCase.prototype.testReplaceAll = function() {
	var o = { foo : "bar", bar : "foo"}
	var replaced = haxe.util.ObjectExtensions.replaceAllAny(o,{ foo : "foo"},"");
	this.assertEquals("bar",OptionExtensions.get(haxe.util.ObjectExtensions.getAny(replaced,"foo")),null,null,{ fileName : "ObjectExtensionsTestCase.hx", lineNumber : 48, className : "haxe.util.ObjectExtensionsTestCase", methodName : "testReplaceAll"});
	this.assertTrue(OptionExtensions.isEmpty(haxe.util.ObjectExtensions.getAny(replaced,"bar")),null,{ fileName : "ObjectExtensionsTestCase.hx", lineNumber : 50, className : "haxe.util.ObjectExtensionsTestCase", methodName : "testReplaceAll"});
}
haxe.util.ObjectExtensionsTestCase.prototype.testSet = function() {
	var o = { foo : "bar"}
	this.assertEquals("baz",OptionExtensions.get(haxe.util.ObjectExtensions.getAny(haxe.util.ObjectExtensions.setAny(o,"foo","baz"),"foo")),null,null,{ fileName : "ObjectExtensionsTestCase.hx", lineNumber : 40, className : "haxe.util.ObjectExtensionsTestCase", methodName : "testSet"});
}
haxe.util.ObjectExtensionsTestCase.prototype.__class__ = haxe.util.ObjectExtensionsTestCase;
if(!js.io) js.io = {}
js.io.IFrameIO = function() { }
js.io.IFrameIO.__name__ = ["js","io","IFrameIO"];
js.io.IFrameIO.prototype.receive = null;
js.io.IFrameIO.prototype.receiveRequests = null;
js.io.IFrameIO.prototype.receiveWhile = null;
js.io.IFrameIO.prototype.request = null;
js.io.IFrameIO.prototype.send = null;
js.io.IFrameIO.prototype.__class__ = js.io.IFrameIO;
if(!js.io._IFrameIO) js.io._IFrameIO = {}
js.io._IFrameIO.AbstractIFrameIO = function(p) { if( p === $_ ) return; {
	this.requestCounter = 0;
}}
js.io._IFrameIO.AbstractIFrameIO.__name__ = ["js","io","_IFrameIO","AbstractIFrameIO"];
js.io._IFrameIO.AbstractIFrameIO.prototype.receive = function(f,originUrl,originWindow) {
	return Stax.error("Not implemented");
}
js.io._IFrameIO.AbstractIFrameIO.prototype.receiveRequests = function(f,url,window) {
	var self = this;
	return this.receive(function(message) {
		if(message.__requestId != null && message.__data != null) {
			f(message.__data).deliverTo(function(responseData) {
				self.send({ __responseId : message.__requestId, __data : responseData},url,window);
			});
		}
	},url,window);
}
js.io._IFrameIO.AbstractIFrameIO.prototype.receiveWhile = function(f,originUrl,originWindow) {
	return Stax.error("Not implemented");
}
js.io._IFrameIO.AbstractIFrameIO.prototype.request = function(requestData,targetUrl,targetWindow) {
	var requestId = ++this.requestCounter;
	var future = new Future();
	this.send({ __requestId : requestId, __data : requestData},targetUrl,targetWindow);
	this.receiveWhile(function(message) {
		return (message.__responseId != null && message.__responseId == requestId?(function($this) {
			var $r;
			future.deliver(message.__data);
			$r = false;
			return $r;
		}(this)):true);
	},targetUrl,targetWindow);
	return future;
}
js.io._IFrameIO.AbstractIFrameIO.prototype.requestCounter = null;
js.io._IFrameIO.AbstractIFrameIO.prototype.send = function(data,targetUrl,targetWindow) {
	return Stax.error("Not implemented");
}
js.io._IFrameIO.AbstractIFrameIO.prototype.__class__ = js.io._IFrameIO.AbstractIFrameIO;
js.io._IFrameIO.AbstractIFrameIO.__interfaces__ = [js.io.IFrameIO];
js.io.IFrameIOAutoDetect = function(w) { if( w === $_ ) return; {
	this.bindTarget = OptionExtensions.getOrElseC(OptionExtensions.toOption(w),js.Env.window);
	this.underlying = ($closure(this.bindTarget,"postMessage") != null?(function($this) {
		var $r;
		var $t = new js.io.IFrameIOPostMessage($this.bindTarget);
		if(Std["is"]($t,js.io.IFrameIO)) $t;
		else throw "Class cast error";
		$r = $t;
		return $r;
	}(this)):(function($this) {
		var $r;
		var $t = new js.io.IFrameIOPollingHashtag($this.bindTarget);
		if(Std["is"]($t,js.io.IFrameIO)) $t;
		else throw "Class cast error";
		$r = $t;
		return $r;
	}(this)));
}}
js.io.IFrameIOAutoDetect.__name__ = ["js","io","IFrameIOAutoDetect"];
js.io.IFrameIOAutoDetect.prototype.bindTarget = null;
js.io.IFrameIOAutoDetect.prototype.receive = function(f,originUrl,originWindow) {
	this.underlying.receive(f,originUrl,originWindow);
	return this;
}
js.io.IFrameIOAutoDetect.prototype.receiveRequests = function(f,url,window) {
	this.underlying.receiveRequests(f,url,window);
	return this;
}
js.io.IFrameIOAutoDetect.prototype.receiveWhile = function(f,originUrl,originWindow) {
	this.underlying.receiveWhile(f,originUrl,originWindow);
	return this;
}
js.io.IFrameIOAutoDetect.prototype.request = function(data,targetUrl,targetWindow) {
	return this.underlying.request(data,targetUrl,targetWindow);
}
js.io.IFrameIOAutoDetect.prototype.send = function(data,targetUrl,targetWindow) {
	this.underlying.send(data,targetUrl,targetWindow);
	return this;
}
js.io.IFrameIOAutoDetect.prototype.underlying = null;
js.io.IFrameIOAutoDetect.prototype.__class__ = js.io.IFrameIOAutoDetect;
js.io.IFrameIOAutoDetect.__interfaces__ = [js.io.IFrameIO];
DynamicExtensions = function() { }
DynamicExtensions.__name__ = ["DynamicExtensions"];
DynamicExtensions.withEffect = function(t,f) {
	f(t);
	return t;
}
DynamicExtensions.withEffectP = function(a,f) {
	f(a);
	return a;
}
DynamicExtensions.into = function(a,f) {
	return f(a);
}
DynamicExtensions.isInstanceOf = function(o,c) {
	return Std["is"](o,c);
}
DynamicExtensions.entuple = function(a,b) {
	return Tuple2.create(a,b);
}
DynamicExtensions.memoize = function(t) {
	var evaled = false;
	var result = null;
	return function() {
		if(!evaled) {
			evaled = true;
			result = t();
		}
		return result;
	}
}
DynamicExtensions.toThunk = function(t) {
	return function() {
		return t;
	}
}
DynamicExtensions.toConstantFunction = function(t) {
	return function(s) {
		return t;
	}
}
DynamicExtensions.toMap = function(d) {
	var map = haxe.data.collections.Map.create();
	{
		var _g = 0, _g1 = Reflect.fields(d);
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			var value = Reflect.field(d,field);
			map = map.set(field,value);
		}
	}
	return map;
}
DynamicExtensions.prototype.__class__ = DynamicExtensions;
js.io.IFrameIOPostMessage = function(w) { if( w === $_ ) return; {
	js.io._IFrameIO.AbstractIFrameIO.apply(this,[]);
	this.bindTarget = w;
}}
js.io.IFrameIOPostMessage.__name__ = ["js","io","IFrameIOPostMessage"];
js.io.IFrameIOPostMessage.__super__ = js.io._IFrameIO.AbstractIFrameIO;
for(var k in js.io._IFrameIO.AbstractIFrameIO.prototype ) js.io.IFrameIOPostMessage.prototype[k] = js.io._IFrameIO.AbstractIFrameIO.prototype[k];
js.io.IFrameIOPostMessage.normalizeOpt = function(url) {
	return OptionExtensions.map(haxe.net.UrlExtensions.toParsedUrl(url),function(p) {
		return haxe.net.UrlExtensions.toUrl(haxe.net.UrlExtensions.withoutSearch(haxe.net.UrlExtensions.withoutPathname(haxe.net.UrlExtensions.withoutHash(p))));
	});
}
js.io.IFrameIOPostMessage.normalize = function(url) {
	return OptionExtensions.getOrElseC(js.io.IFrameIOPostMessage.normalizeOpt(url),url);
}
js.io.IFrameIOPostMessage.getUrlFor = function(w,url_) {
	return (StringExtensions.startsWith(url_,"about:")?(function($this) {
		var $r;
		var allWindows = [w].concat(IterableExtensions.toArray(Stax.unfold(w,function(w1) {
			var parentWindow = w1.parent;
			return (w1 == parentWindow?Option.None:Option.Some(DynamicExtensions.entuple(parentWindow,parentWindow)));
		})));
		$r = ArrayExtensions.first(ArrayExtensions.flatMap(allWindows,function(w1) {
			try {
				return OptionExtensions.toArray(js.io.IFrameIOPostMessage.normalizeOpt(w1.location.href));
			}
			catch( $e0 ) {
				{
					var e = $e0;
					{
						return [];
					}
				}
			}
		}));
		return $r;
	}(this)):js.io.IFrameIOPostMessage.normalize(url_));
}
js.io.IFrameIOPostMessage.prototype.bindTarget = null;
js.io.IFrameIOPostMessage.prototype.receive = function(f,originUrl,originWindow) {
	return this.receiveWhile(function(d) {
		return DynamicExtensions.withEffect(true,function(_) {
			f(d);
		});
	},originUrl,originWindow);
}
js.io.IFrameIOPostMessage.prototype.receiveWhile = function(f,originUrl_,originWindow) {
	var originUrl = js.io.IFrameIOPostMessage.getUrlFor(originWindow,originUrl_);
	var listener = null;
	var self = this;
	listener = function(event) {
		if(event.origin == originUrl || event.origin == "null") {
			var data = haxe.text.json.Json.decodeObject(event.data);
			if(!f(data)) {
				js.dom.Quirks.removeEventListener(self.bindTarget,"message",listener,false);
			}
		}
	}
	js.dom.Quirks.addEventListener(this.bindTarget,"message",listener,false);
	return this;
}
js.io.IFrameIOPostMessage.prototype.send = function(data,targetUrl_,targetWindow) {
	var targetUrl = js.io.IFrameIOPostMessage.getUrlFor(targetWindow,targetUrl_);
	if(StringExtensions.startsWith(targetUrl,"file:")) targetUrl = "*";
	try {
		targetWindow.postMessage(haxe.text.json.Json.encodeObject(data),targetUrl);
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				js.io.IFrameIOPostMessage.log.fatal((((("Error while posting message to " + targetUrl) + " (originally ") + targetUrl_) + "): ") + e.message,{ fileName : "IFrameIO.hx", lineNumber : 250, className : "js.io.IFrameIOPostMessage", methodName : "send"});
			}
		}
	}
	return this;
}
js.io.IFrameIOPostMessage.prototype.__class__ = js.io.IFrameIOPostMessage;
js.io.IFrameIOPostMessage.__interfaces__ = [js.io.IFrameIO];
js.io.IFrameIOPollingHashtag = function(w) { if( w === $_ ) return; {
	js.io._IFrameIO.AbstractIFrameIO.apply(this,[]);
	this.bindTarget = w;
	this.executor = haxe.framework.Injector.inject(haxe.time.ScheduledExecutor,{ fileName : "IFrameIO.hx", lineNumber : 308, className : "js.io.IFrameIOPollingHashtag", methodName : "new"});
	this.fragmentsToSend = js.io.IFrameIOPollingHashtag.newFragmentsList();
	this.fragmentsReceived = haxe.data.collections.Map.create();
	this.receivers = new Hash();
	this.originUrlToWindow = new Hash();
	this.senderFuture = Option.None;
	this.receiverFuture = Option.None;
}}
js.io.IFrameIOPollingHashtag.__name__ = ["js","io","IFrameIOPollingHashtag"];
js.io.IFrameIOPollingHashtag.__super__ = js.io._IFrameIO.AbstractIFrameIO;
for(var k in js.io._IFrameIO.AbstractIFrameIO.prototype ) js.io.IFrameIOPollingHashtag.prototype[k] = js.io._IFrameIO.AbstractIFrameIO.prototype[k];
js.io.IFrameIOPollingHashtag.normalizeOpt = function(url) {
	return OptionExtensions.map(haxe.net.UrlExtensions.toParsedUrl(url),function(p) {
		return haxe.net.UrlExtensions.toUrl(haxe.net.UrlExtensions.withoutHash(p));
	});
}
js.io.IFrameIOPollingHashtag.normalize = function(url) {
	return OptionExtensions.getOrElseC(js.io.IFrameIOPollingHashtag.normalizeOpt(url),url);
}
js.io.IFrameIOPollingHashtag.messageKeyFrom = function(o) {
	return new js.io._IFrameIO.MessageKey(StringExtensions.toInt(o.messageId),o.from,o.to,StringExtensions.toInt(o.fragmentCount));
}
js.io.IFrameIOPollingHashtag.prototype.analyzeReceivedFragments = function(messageKey,fragments) {
	if(fragments.length >= messageKey.fragmentCount) {
		fragments.sort(function(a,b) {
			return StringExtensions.toInt(a.fragmentId) - StringExtensions.toInt(b.fragmentId);
		});
		var fullData = ArrayExtensions.foldl(fragments,"",function(a,b) {
			return a + b.data;
		});
		var message = haxe.text.json.Json.decodeObject(fullData);
		var domain = this.extractDomain(fragments[0].from);
		if(this.receivers.exists(domain)) {
			ArrayExtensions.foreach(this.receivers.get(domain),function(r) {
				r(message);
			});
		}
		this.fragmentsReceived.removeByKey(messageKey);
	}
}
js.io.IFrameIOPollingHashtag.prototype.bindTarget = null;
js.io.IFrameIOPollingHashtag.prototype.executor = null;
js.io.IFrameIOPollingHashtag.prototype.extractDomain = function(url) {
	return (function($this) {
		var $r;
		var $e = (haxe.net.UrlExtensions.toParsedUrl(url));
		switch( $e[1] ) {
		case 1:
		var parsed = $e[2];
		{
			$r = parsed.hostname + parsed.pathname;
		}break;
		case 0:
		{
			$r = url;
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
js.io.IFrameIOPollingHashtag.prototype.findMissingFragments = function() {
	return haxe.data.collections.IterableExtensions.foldl(this.fragmentsReceived.values(),haxe.data.collections.List.nil(),function(allMissing,fragments) {
		var firstFrag = fragments[0];
		fragments.sort(function(a,b) {
			return StringExtensions.toInt(a.fragmentId) - StringExtensions.toInt(b.fragmentId);
		});
		return IterableExtensions.toList(fragments).gaps(function(a,b) {
			var lastId = StringExtensions.toInt(a.fragmentId);
			var curId = StringExtensions.toInt(b.fragmentId);
			return IterableExtensions.toList(haxe.data.collections.IterableExtensions.map(IntExtensions.until((lastId + 1),curId),function(missingId) {
				var request = { type : "request", from : firstFrag.to, to : firstFrag.from, messageId : firstFrag.messageId, fragmentCount : firstFrag.fragmentCount, fragmentId : IntExtensions.toString(missingId)}
				return request;
			}));
		});
	});
}
js.io.IFrameIOPollingHashtag.prototype.fragmentsReceived = null;
js.io.IFrameIOPollingHashtag.prototype.fragmentsReceivedFor = function(messageKey) {
	if(!this.fragmentsReceived.containsKey(messageKey)) {
		this.fragmentsReceived = this.fragmentsReceived.set(messageKey,[]);
	}
	return OptionExtensions.get(this.fragmentsReceived.get(messageKey));
}
js.io.IFrameIOPollingHashtag.prototype.fragmentsToSend = null;
js.io.IFrameIOPollingHashtag.prototype.originUrlToWindow = null;
js.io.IFrameIOPollingHashtag.prototype.receive = function(f,originUrl,originWindow) {
	return this.receiveWhile(function(d) {
		return DynamicExtensions.withEffect(true,function(_) {
			f(d);
		});
	},originUrl,originWindow);
}
js.io.IFrameIOPollingHashtag.prototype.receiveWhile = function(f,originUrl,originWindow) {
	var self = this;
	var domain = this.extractDomain(originUrl);
	var r = (this.receivers.exists(domain)?this.receivers.get(domain):DynamicExtensions.withEffect([],function(r) {
		self.receivers.set(domain,r);
	}));
	var wrapper = null;
	wrapper = function(d) {
		if(!f(d)) r.remove(wrapper);
	}
	r.push(wrapper);
	this.originUrlToWindow.set(originUrl,originWindow);
	this.startReceiver();
	return this;
}
js.io.IFrameIOPollingHashtag.prototype.receiver = function() {
	var hash = this.bindTarget.location.hash;
	if(hash.length > 1) {
		var query = "?" + hash.substr(1);
		var unknown = haxe.data.collections.MapExtensions.toObject(haxe.net.UrlExtensions.toQueryParameters(query));
		if(unknown.type == "delivery") {
			var packet = unknown;
			var messageKey = js.io.IFrameIOPollingHashtag.messageKeyFrom(packet);
			var fragments = this.fragmentsReceivedFor(messageKey);
			var alreadyReceived = ArrayExtensions.foldl(fragments,false,function(b,f) {
				return b || f.fragmentId == packet.fragmentId;
			});
			if(!alreadyReceived) {
				fragments.push(packet);
				this.analyzeReceivedFragments(messageKey,fragments);
			}
		}
		else if(unknown.type == "request") {
			var packet = unknown;
			var messageKey = js.io.IFrameIOPollingHashtag.messageKeyFrom(packet);
		}
		else if(unknown.type == "receipt") {
			var packet = unknown;
			var messageKey = js.io.IFrameIOPollingHashtag.messageKeyFrom(packet);
		}
		this.bindTarget.location.hash = "#";
	}
	else {
		var self = this;
		var fragmentRequests = this.findMissingFragments();
		if(fragmentRequests.size() > 0) {
			var encoded = haxe.functional.FoldableExtensions.flatMapTo(fragmentRequests,haxe.data.collections.List.nil(),function(request) {
				var win = self.originUrlToWindow.get(request.to);
				return (win != null?haxe.data.collections.List.nil().cons(DynamicExtensions.entuple(win,request)):haxe.data.collections.List.nil());
			});
			this.fragmentsToSend = this.fragmentsToSend.concat(encoded);
		}
	}
}
js.io.IFrameIOPollingHashtag.prototype.receiverFuture = null;
js.io.IFrameIOPollingHashtag.prototype.receivers = null;
js.io.IFrameIOPollingHashtag.prototype.send = function(data,to_,iframe) {
	var from = js.io.IFrameIOPollingHashtag.normalize(this.bindTarget.location.href);
	var to = js.io.IFrameIOPollingHashtag.normalize(to_);
	var maxFragSize = 1500 - to.length;
	var fragmentId = 1;
	var fragments = haxe.util.StringExtensions.chunk(haxe.text.json.Json.encodeObject(data),maxFragSize);
	var encoded = haxe.functional.FoldableExtensions.mapTo(fragments,js.io.IFrameIOPollingHashtag.newFragmentsList(),function(chunk) {
		return DynamicExtensions.entuple(iframe,{ type : "delivery", from : from, to : to, messageId : IntExtensions.toString(js.io.IFrameIOPollingHashtag.lastMessageId), fragmentId : IntExtensions.toString((fragmentId++)), fragmentCount : IntExtensions.toString(fragments.size()), data : chunk});
	});
	this.fragmentsToSend = this.fragmentsToSend.concat(encoded);
	++js.io.IFrameIOPollingHashtag.lastMessageId;
	this.startSender();
	return this;
}
js.io.IFrameIOPollingHashtag.prototype.sender = function() {
	var $e = (this.fragmentsToSend.getHeadOption());
	switch( $e[1] ) {
	case 0:
	{
		this.stopSender();
	}break;
	case 1:
	var tuple = $e[2];
	{
		this.fragmentsToSend = this.fragmentsToSend.drop(1);
		var win = tuple._1;
		var frag = tuple._2;
		win.location.href = (frag.to + "#") + haxe.net.UrlExtensions.toQueryString(DynamicExtensions.toMap(frag)).substr(1);
	}break;
	}
}
js.io.IFrameIOPollingHashtag.prototype.senderFuture = null;
js.io.IFrameIOPollingHashtag.prototype.startReceiver = function() {
	if(OptionExtensions.isEmpty(this.receiverFuture)) {
		this.receiverFuture = Option.Some(this.executor.forever($closure(this,"receiver"),10));
	}
}
js.io.IFrameIOPollingHashtag.prototype.startSender = function() {
	if(OptionExtensions.isEmpty(this.senderFuture)) {
		this.senderFuture = Option.Some(this.executor.forever($closure(this,"sender"),20));
	}
}
js.io.IFrameIOPollingHashtag.prototype.stop = function() {
	this.stopSender();
	this.stopReceiver();
	return this;
}
js.io.IFrameIOPollingHashtag.prototype.stopReceiver = function() {
	OptionExtensions.map(this.receiverFuture,function(r) {
		r.cancel();
		return Unit.Unit;
	});
	this.receiverFuture = Option.None;
}
js.io.IFrameIOPollingHashtag.prototype.stopSender = function() {
	OptionExtensions.map(this.senderFuture,function(s) {
		s.cancel();
		return Unit.Unit;
	});
	this.senderFuture = Option.None;
}
js.io.IFrameIOPollingHashtag.prototype.__class__ = js.io.IFrameIOPollingHashtag;
js.io.IFrameIOPollingHashtag.__interfaces__ = [js.io.IFrameIO];
js.io._IFrameIO.MessageKey = function(messageId,from,to,fragmentCount) { if( messageId === $_ ) return; {
	this.messageId = messageId;
	this.from = from;
	this.to = to;
	this.fragmentCount = fragmentCount;
}}
js.io._IFrameIO.MessageKey.__name__ = ["js","io","_IFrameIO","MessageKey"];
js.io._IFrameIO.MessageKey.prototype.equals = function(other) {
	return this.messageId == other.messageId && this.from == other.from && this.to == other.to && this.fragmentCount == other.fragmentCount;
}
js.io._IFrameIO.MessageKey.prototype.fragmentCount = null;
js.io._IFrameIO.MessageKey.prototype.from = null;
js.io._IFrameIO.MessageKey.prototype.hashCode = function() {
	return ((IntExtensions.hashCode(this.messageId) * StringExtensions.hashCode(this.from)) * StringExtensions.hashCode(this.to)) * IntExtensions.hashCode(this.fragmentCount);
}
js.io._IFrameIO.MessageKey.prototype.messageId = null;
js.io._IFrameIO.MessageKey.prototype.to = null;
js.io._IFrameIO.MessageKey.prototype.__class__ = js.io._IFrameIO.MessageKey;
haxe.net.HttpHeaderExtensions = function() { }
haxe.net.HttpHeaderExtensions.__name__ = ["haxe","net","HttpHeaderExtensions"];
haxe.net.HttpHeaderExtensions.toHttpHeader = function(str) {
	return (haxe.net.HttpHeaderExtensions.HeaderPattern.match(str)?Option.Some(DynamicExtensions.entuple(StringExtensions.trim(haxe.net.HttpHeaderExtensions.HeaderPattern.matched(1)),StringExtensions.trim(haxe.net.HttpHeaderExtensions.HeaderPattern.matched(2)))):Option.None);
}
haxe.net.HttpHeaderExtensions.toHttpHeaders = function(str) {
	return haxe.data.collections.Map.create().addAll(ArrayExtensions.flatMap(haxe.net.HttpHeaderExtensions.HeaderLinesPattern.split(str),function(line) {
		return OptionExtensions.toArray(haxe.net.HttpHeaderExtensions.toHttpHeader(StringExtensions.trim(line)));
	}));
}
haxe.net.HttpHeaderExtensions.prototype.__class__ = haxe.net.HttpHeaderExtensions;
haxe.math.geom.Point2dIntExtensions = function() { }
haxe.math.geom.Point2dIntExtensions.__name__ = ["haxe","math","geom","Point2dIntExtensions"];
haxe.math.geom.Point2dIntExtensions.minus = function(p1,p2) {
	return { dx : p1.x - p2.x, dy : p1.y - p2.y}
}
haxe.math.geom.Point2dIntExtensions.plus = function(p,v) {
	return { x : p.x + v.dx, y : p.y + v.dy}
}
haxe.math.geom.Point2dIntExtensions.map = function(p,f,g) {
	return { x : f(p.x), y : g(p.y)}
}
haxe.math.geom.Point2dIntExtensions.toVector = function(p) {
	return { dx : p.x, dy : p.y}
}
haxe.math.geom.Point2dIntExtensions.toFloat = function(p) {
	return { x : IntExtensions.toFloat(p.x), y : IntExtensions.toFloat(p.y)}
}
haxe.math.geom.Point2dIntExtensions.toTuple = function(p) {
	return DynamicExtensions.entuple(p.x,p.y);
}
haxe.math.geom.Point2dIntExtensions.prototype.__class__ = haxe.math.geom.Point2dIntExtensions;
haxe.math.geom.Point2dFloatExtensions = function() { }
haxe.math.geom.Point2dFloatExtensions.__name__ = ["haxe","math","geom","Point2dFloatExtensions"];
haxe.math.geom.Point2dFloatExtensions.minus = function(p1,p2) {
	return { dx : p1.x - p2.x, dy : p1.y - p2.y}
}
haxe.math.geom.Point2dFloatExtensions.plus = function(p,v) {
	return { x : p.x + v.dx, y : p.y + v.dy}
}
haxe.math.geom.Point2dFloatExtensions.map = function(p,f,g) {
	return { x : f(p.x), y : g(p.y)}
}
haxe.math.geom.Point2dFloatExtensions.toVector = function(p) {
	return { dx : p.x, dy : p.y}
}
haxe.math.geom.Point2dFloatExtensions.toInt = function(p) {
	return { x : FloatExtensions.round(p.x), y : FloatExtensions.round(p.y)}
}
haxe.math.geom.Point2dFloatExtensions.toTuple = function(p) {
	return DynamicExtensions.entuple(p.x,p.y);
}
haxe.math.geom.Point2dFloatExtensions.prototype.__class__ = haxe.math.geom.Point2dFloatExtensions;
haxe.text.json.JValueExtensions = function() { }
haxe.text.json.JValueExtensions.__name__ = ["haxe","text","json","JValueExtensions"];
haxe.text.json.JValueExtensions.fold = function(v,initial,f) {
	var cur = initial;
	haxe.text.json.JValueExtensions.map(v,function(j) {
		cur = f(cur,j);
		return j;
	});
	return cur;
}
haxe.text.json.JValueExtensions.path = function(v,s) {
	var ss = s.split("/"), c = v;
	{ var $it0 = ss.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	if(x.length > 0) c = haxe.text.json.JValueExtensions.get(c,x);
	}}
	return c;
}
haxe.text.json.JValueExtensions.map = function(v,f) {
	var $e = (v);
	switch( $e[1] ) {
	case 4:
	var xs = $e[2];
	{
		return f(haxe.text.json.JValue.JArray(ArrayExtensions.map(xs,function(x) {
			return haxe.text.json.JValueExtensions.map(x,f);
		})));
	}break;
	case 6:
	var v1 = $e[3], k = $e[2];
	{
		return f(haxe.text.json.JValue.JField(k,haxe.text.json.JValueExtensions.map(v1,f)));
	}break;
	case 5:
	var fs = $e[2];
	{
		return f(haxe.text.json.JValue.JObject(ArrayExtensions.map(fs,function(field) {
			return haxe.text.json.JValueExtensions.map(field,f);
		})));
	}break;
	default:{
		return f(v);
	}break;
	}
}
haxe.text.json.JValueExtensions.getOption = function(v,k) {
	var $e = (v);
	switch( $e[1] ) {
	case 5:
	var xs = $e[2];
	{
		var hash = haxe.text.json.JValueExtensions.extractHash(v);
		return (hash.exists(k)?Option.Some(hash.get(k)):Option.None);
	}break;
	default:{
		return Option.None;
	}break;
	}
}
haxe.text.json.JValueExtensions.get = function(v,k) {
	return (function($this) {
		var $r;
		var $e = (haxe.text.json.JValueExtensions.getOption(v,k));
		switch( $e[1] ) {
		case 1:
		var v1 = $e[2];
		{
			$r = v1;
		}break;
		case 0:
		{
			$r = Stax.error((("Expected to find field " + k) + " in ") + v);
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
haxe.text.json.JValueExtensions.getOrElse = function(v,k,def) {
	return (function($this) {
		var $r;
		var $e = (haxe.text.json.JValueExtensions.getOption(v,k));
		switch( $e[1] ) {
		case 1:
		var v1 = $e[2];
		{
			$r = v1;
		}break;
		case 0:
		{
			$r = def();
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
haxe.text.json.JValueExtensions.extractString = function(v) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 3:
		var s = $e[2];
		{
			$r = s;
		}break;
		default:{
			$r = Stax.error("Expected JString but found: " + v);
		}break;
		}
		return $r;
	}(this));
}
haxe.text.json.JValueExtensions.extractNumber = function(v) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 2:
		var n = $e[2];
		{
			$r = n;
		}break;
		default:{
			$r = Stax.error("Expected JNumber but found: " + v);
		}break;
		}
		return $r;
	}(this));
}
haxe.text.json.JValueExtensions.extractBool = function(v) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 1:
		var b = $e[2];
		{
			$r = b;
		}break;
		default:{
			$r = Stax.error("Expected JBool but found: " + v);
		}break;
		}
		return $r;
	}(this));
}
haxe.text.json.JValueExtensions.extractKey = function(v) {
	return haxe.text.json.JValueExtensions.extractField(v)._1;
}
haxe.text.json.JValueExtensions.extractValue = function(v) {
	return haxe.text.json.JValueExtensions.extractField(v)._2;
}
haxe.text.json.JValueExtensions.extractField = function(v) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 6:
		var v1 = $e[3], k = $e[2];
		{
			$r = Tuple2.create(k,v1);
		}break;
		default:{
			$r = Stax.error("Expected JField but found: " + v);
		}break;
		}
		return $r;
	}(this));
}
haxe.text.json.JValueExtensions.extractHash = function(v) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 5:
		var xs = $e[2];
		{
			$r = (function($this) {
				var $r;
				var hash = new Hash();
				{
					var _g = 0;
					while(_g < xs.length) {
						var x = xs[_g];
						++_g;
						var field = haxe.text.json.JValueExtensions.extractField(x);
						hash.set(field._1,field._2);
					}
				}
				$r = hash;
				return $r;
			}($this));
		}break;
		default:{
			$r = Stax.error("Expected JObject but found: " + v);
		}break;
		}
		return $r;
	}(this));
}
haxe.text.json.JValueExtensions.extractFields = function(v) {
	return ArrayExtensions.flatMap(haxe.text.json.JValueExtensions.extractArray(v),function(j) {
		return (function($this) {
			var $r;
			var $e = (j);
			switch( $e[1] ) {
			case 6:
			var v1 = $e[3], k = $e[2];
			{
				$r = [Tuple2.create(k,v1)];
			}break;
			default:{
				$r = [];
			}break;
			}
			return $r;
		}(this));
	});
}
haxe.text.json.JValueExtensions.extractArray = function(v) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 4:
		var xs = $e[2];
		{
			$r = xs;
		}break;
		case 5:
		var xs = $e[2];
		{
			$r = xs;
		}break;
		default:{
			$r = Stax.error("Expected JArray or JObject but found: " + v);
		}break;
		}
		return $r;
	}(this));
}
haxe.text.json.JValueExtensions.prototype.__class__ = haxe.text.json.JValueExtensions;
haxe.io.http.HttpJValue = function() { }
haxe.io.http.HttpJValue.__name__ = ["haxe","io","http","HttpJValue"];
haxe.io.http.HttpJValue.prototype.__class__ = haxe.io.http.HttpJValue;
haxe.io.http.HttpJValue.__interfaces__ = [haxe.io.http.Http];
haxe.io.http.HttpTransformer = function(http,encoder,decoder) { if( http === $_ ) return; {
	this.http = http;
	this.encoder = encoder;
	this.decoder = decoder;
}}
haxe.io.http.HttpTransformer.__name__ = ["haxe","io","http","HttpTransformer"];
haxe.io.http.HttpTransformer.prototype.custom = function(method,url,data,params,headers) {
	return this.http.custom(method,url,this.encoder(data),params,headers).map($closure(this,"transformResponse"));
}
haxe.io.http.HttpTransformer.prototype.decoder = null;
haxe.io.http.HttpTransformer.prototype["delete"] = function(url,params,headers) {
	return this.http["delete"](url,params,headers).map($closure(this,"transformResponse"));
}
haxe.io.http.HttpTransformer.prototype.encoder = null;
haxe.io.http.HttpTransformer.prototype.get = function(url,params,headers) {
	return this.http.get(url,params,headers).map($closure(this,"transformResponse"));
}
haxe.io.http.HttpTransformer.prototype.http = null;
haxe.io.http.HttpTransformer.prototype.post = function(url,data,params,headers) {
	return this.http.post(url,this.encoder(data),params,headers).map($closure(this,"transformResponse"));
}
haxe.io.http.HttpTransformer.prototype.put = function(url,data,params,headers) {
	return this.http.put(url,this.encoder(data),params,headers).map($closure(this,"transformResponse"));
}
haxe.io.http.HttpTransformer.prototype.transformResponse = function(r) {
	return { body : OptionExtensions.map(r.body,this.decoder), headers : r.headers, code : r.code}
}
haxe.io.http.HttpTransformer.prototype.__class__ = haxe.io.http.HttpTransformer;
haxe.io.http.HttpTransformer.__interfaces__ = [haxe.io.http.Http];
haxe.io.http.HttpJValueAsync = function(p) { if( p === $_ ) return; {
	haxe.io.http.HttpTransformer.apply(this,[new haxe.io.http.HttpStringAsync(),$closure(haxe.text.json.Json,"encode"),$closure(haxe.text.json.Json,"decode")]);
}}
haxe.io.http.HttpJValueAsync.__name__ = ["haxe","io","http","HttpJValueAsync"];
haxe.io.http.HttpJValueAsync.__super__ = haxe.io.http.HttpTransformer;
for(var k in haxe.io.http.HttpTransformer.prototype ) haxe.io.http.HttpJValueAsync.prototype[k] = haxe.io.http.HttpTransformer.prototype[k];
haxe.io.http.HttpJValueAsync.prototype.__class__ = haxe.io.http.HttpJValueAsync;
haxe.io.http.HttpJValueAsync.__interfaces__ = [haxe.io.http.HttpJValue];
haxe.io.http.HttpJValueJsonp = function(callbackParameterName) { if( callbackParameterName === $_ ) return; {
	if(callbackParameterName == null) callbackParameterName = "callback";
	this.callbackParameterName = callbackParameterName;
}}
haxe.io.http.HttpJValueJsonp.__name__ = ["haxe","io","http","HttpJValueJsonp"];
haxe.io.http.HttpJValueJsonp.prototype.callbackParameterName = null;
haxe.io.http.HttpJValueJsonp.prototype.custom = function(request,url,data,params,headers) {
	return Stax.error("JSONP does not support custom request: " + request);
}
haxe.io.http.HttpJValueJsonp.prototype["delete"] = function(url,params,headers) {
	return Stax.error("JSONP does not support DELETE");
}
haxe.io.http.HttpJValueJsonp.prototype.get = function(url_,params_,headers) {
	var future = new Future();
	var requestId = Math.round(haxe.io.http.HttpJValueJsonp.RequestMod * (++haxe.io.http.HttpJValueJsonp.RequestCount));
	var callbackName = "stax_jsonp_callback_" + requestId;
	var callbackFullName = "haxe.io.http.HttpJValueJsonp.Responders." + callbackName;
	var params = OptionExtensions.getOrElseC(OptionExtensions.toOption(params_),haxe.data.collections.Map.create()).set(this.callbackParameterName,callbackFullName);
	var url = haxe.net.UrlExtensions.addQueryParameters(url_,params);
	var doCleanup = function() {
		var script = js.Env.document.getElementById(callbackName);
		if(script != null) js.Env.document.getElementsByTagName("HEAD")[0].removeChild(script);
		Reflect.deleteField(haxe.io.http.HttpJValueJsonp.Responders,callbackName);
	}
	future.ifCanceled(doCleanup);
	haxe.io.http.HttpJValueJsonp.Responders[callbackName] = function(data) {
		doCleanup();
		var code;
		var response;
		try {
			response = Option.Some(haxe.text.json.Json.fromObject(data));
			code = haxe.net.HttpResponseCode.Normal(haxe.net.HttpNormal.Success(haxe.net.HttpSuccess.OK));
		}
		catch( $e0 ) {
			{
				var e = $e0;
				{
					response = Option.None;
					code = haxe.net.HttpResponseCode.Normal(haxe.net.HttpNormal.Success(haxe.net.HttpSuccess.NoContent));
				}
			}
		}
		future.deliver({ body : response, headers : haxe.data.collections.Map.create(), code : code});
	}
	var script = js.Env.document.createElement("SCRIPT");
	script.setAttribute("type","text/javascript");
	script.setAttribute("src",url);
	script.setAttribute("id",callbackName);
	js.Env.document.getElementsByTagName("HEAD")[0].appendChild(script);
	return future;
}
haxe.io.http.HttpJValueJsonp.prototype.post = function(url,data,params,headers) {
	return Stax.error("JSONP does not support POST");
}
haxe.io.http.HttpJValueJsonp.prototype.put = function(url,data,params,headers) {
	return Stax.error("JSONP does not support PUT");
}
haxe.io.http.HttpJValueJsonp.prototype.__class__ = haxe.io.http.HttpJValueJsonp;
haxe.io.http.HttpJValueJsonp.__interfaces__ = [haxe.io.http.HttpJValue];
haxe.test.ui.common.ResultStats = function(p) { if( p === $_ ) return; {
	this.assertations = 0;
	this.successes = 0;
	this.failures = 0;
	this.errors = 0;
	this.warnings = 0;
	this.isOk = true;
	this.hasFailures = false;
	this.hasErrors = false;
	this.hasWarnings = false;
	this.onAddSuccesses = new haxe.test.Dispatcher();
	this.onAddFailures = new haxe.test.Dispatcher();
	this.onAddErrors = new haxe.test.Dispatcher();
	this.onAddWarnings = new haxe.test.Dispatcher();
}}
haxe.test.ui.common.ResultStats.__name__ = ["haxe","test","ui","common","ResultStats"];
haxe.test.ui.common.ResultStats.prototype.addErrors = function(v) {
	if(v == 0) return;
	this.assertations += v;
	this.errors += v;
	this.hasErrors = this.errors > 0;
	this.isOk = !(this.hasFailures || this.hasErrors || this.hasWarnings);
	this.onAddErrors.dispatch(v);
}
haxe.test.ui.common.ResultStats.prototype.addFailures = function(v) {
	if(v == 0) return;
	this.assertations += v;
	this.failures += v;
	this.hasFailures = this.failures > 0;
	this.isOk = !(this.hasFailures || this.hasErrors || this.hasWarnings);
	this.onAddFailures.dispatch(v);
}
haxe.test.ui.common.ResultStats.prototype.addSuccesses = function(v) {
	if(v == 0) return;
	this.assertations += v;
	this.successes += v;
	this.onAddSuccesses.dispatch(v);
}
haxe.test.ui.common.ResultStats.prototype.addWarnings = function(v) {
	if(v == 0) return;
	this.assertations += v;
	this.warnings += v;
	this.hasWarnings = this.warnings > 0;
	this.isOk = !(this.hasFailures || this.hasErrors || this.hasWarnings);
	this.onAddWarnings.dispatch(v);
}
haxe.test.ui.common.ResultStats.prototype.assertations = null;
haxe.test.ui.common.ResultStats.prototype.errors = null;
haxe.test.ui.common.ResultStats.prototype.failures = null;
haxe.test.ui.common.ResultStats.prototype.hasErrors = null;
haxe.test.ui.common.ResultStats.prototype.hasFailures = null;
haxe.test.ui.common.ResultStats.prototype.hasWarnings = null;
haxe.test.ui.common.ResultStats.prototype.isOk = null;
haxe.test.ui.common.ResultStats.prototype.onAddErrors = null;
haxe.test.ui.common.ResultStats.prototype.onAddFailures = null;
haxe.test.ui.common.ResultStats.prototype.onAddSuccesses = null;
haxe.test.ui.common.ResultStats.prototype.onAddWarnings = null;
haxe.test.ui.common.ResultStats.prototype.subtract = function(other) {
	this.addSuccesses(-other.successes);
	this.addFailures(-other.failures);
	this.addErrors(-other.errors);
	this.addWarnings(-other.warnings);
}
haxe.test.ui.common.ResultStats.prototype.successes = null;
haxe.test.ui.common.ResultStats.prototype.sum = function(other) {
	this.addSuccesses(other.successes);
	this.addFailures(other.failures);
	this.addErrors(other.errors);
	this.addWarnings(other.warnings);
}
haxe.test.ui.common.ResultStats.prototype.unwire = function(dependant) {
	dependant.onAddSuccesses.remove($closure(this,"addSuccesses"));
	dependant.onAddFailures.remove($closure(this,"addFailures"));
	dependant.onAddErrors.remove($closure(this,"addErrors"));
	dependant.onAddWarnings.remove($closure(this,"addWarnings"));
	this.subtract(dependant);
}
haxe.test.ui.common.ResultStats.prototype.warnings = null;
haxe.test.ui.common.ResultStats.prototype.wire = function(dependant) {
	dependant.onAddSuccesses.add($closure(this,"addSuccesses"));
	dependant.onAddFailures.add($closure(this,"addFailures"));
	dependant.onAddErrors.add($closure(this,"addErrors"));
	dependant.onAddWarnings.add($closure(this,"addWarnings"));
	this.sum(dependant);
}
haxe.test.ui.common.ResultStats.prototype.__class__ = haxe.test.ui.common.ResultStats;
Lambda = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var i = $it0.next();
	a.push(i);
	}}
	return a;
}
Lambda.list = function(it) {
	var l = new List();
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var i = $it0.next();
	l.add(i);
	}}
	return l;
}
Lambda.map = function(it,f) {
	var l = new List();
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	l.add(f(x));
	}}
	return l;
}
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	l.add(f(i++,x));
	}}
	return l;
}
Lambda.has = function(it,elt,cmp) {
	if(cmp == null) {
		{ var $it0 = it.iterator();
		while( $it0.hasNext() ) { var x = $it0.next();
		if(x == elt) return true;
		}}
	}
	else {
		{ var $it1 = it.iterator();
		while( $it1.hasNext() ) { var x = $it1.next();
		if(cmp(x,elt)) return true;
		}}
	}
	return false;
}
Lambda.exists = function(it,f) {
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	if(f(x)) return true;
	}}
	return false;
}
Lambda.foreach = function(it,f) {
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	if(!f(x)) return false;
	}}
	return true;
}
Lambda.iter = function(it,f) {
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	f(x);
	}}
}
Lambda.filter = function(it,f) {
	var l = new List();
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	if(f(x)) l.add(x);
	}}
	return l;
}
Lambda.fold = function(it,f,first) {
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var x = $it0.next();
	first = f(x,first);
	}}
	return first;
}
Lambda.count = function(it) {
	var n = 0;
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var _ = $it0.next();
	++n;
	}}
	return n;
}
Lambda.empty = function(it) {
	return !it.iterator().hasNext();
}
Lambda.prototype.__class__ = Lambda;
if(!js.dom) js.dom = {}
js.dom.Quirks = function() { }
js.dom.Quirks.__name__ = ["js","dom","Quirks"];
js.dom.Quirks.createXMLHttpRequest = function() {
	return (window.XMLHttpRequest?new XMLHttpRequest():(window.ActiveXObject?(function($this) {
		var $r;
		try {
			$r = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch( $e0 ) {
			{
				var e = $e0;
				$r = (function($this) {
					var $r;
					try {
						$r = new ActiveXObject("Microsoft.XMLHTTP");
					}
					catch( $e1 ) {
						{
							var e1 = $e1;
							$r = (function($this) {
								var $r;
								throw "Unable to create XMLHttpRequest object.";
								$r = null;
								return $r;
							}($this));
						}
					}
					return $r;
				}($this));
			}
		}
		return $r;
	}(this)):(function($this) {
		var $r;
		throw "Unable to create XMLHttpRequest object.";
		$r = null;
		return $r;
	}(this))));
}
js.dom.Quirks.getIframeDocument = function(iframe) {
	if(iframe.contentDocument != null) {
		return iframe.contentDocument;
	}
	else if(iframe.contentWindow != null) {
		return iframe.contentWindow.document;
	}
	else if(iframe.document != null) {
		return iframe.document;
	}
	else {
		throw "Cannot find iframe content document for " + iframe;
		return null;
	}
}
js.dom.Quirks.getIframeWindow = function(iframe) {
	if(iframe.contentWindow != null) {
		return iframe.contentWindow;
	}
	else if(iframe.contentDocument != null && iframe.contentDocument.defaultView != null) {
		return iframe.contentDocument.defaultView;
	}
	else if(iframe.document != null && iframe.document.window != null) {
		return iframe.document.window;
	}
	else {
		throw "Cannot find iframe content document for " + iframe;
		return null;
	}
}
js.dom.Quirks.addEventListener = function(target,type,listener,useCapture) {
	if($closure(target,"addEventListener") != null) {
		target.addEventListener(type,listener,useCapture);
	}
	else if(target.attachEvent != null) {
		target.attachEvent("on" + type,listener);
	}
	else null;
}
js.dom.Quirks.removeEventListener = function(target,type,listener,useCapture) {
	if($closure(target,"removeEventListener") != null) {
		target.removeEventListener(type,listener,useCapture);
	}
	else if(target.detachEvent != null) {
		target.detachEvent("on" + type,listener);
	}
	else null;
}
js.dom.Quirks.getOverrideStyle = function(doc,el,pseudo) {
	if($closure(doc,"getOverrideStyle") != null && doc.getOverrideStyle(el,pseudo) != null) {
		return doc.getOverrideStyle(el,pseudo);
	}
	else if(el.runtimeStyle != null) {
		return el.runtimeStyle;
	}
	else {
		return { }
	}
}
js.dom.Quirks.deleteCssRule = function(doc,rule) {
	var deleteFromSheet = function(sheet) {
		var index = ArrayExtensions.indexOf(js.dom.DomCollectionExtensions.toArray(js.dom.Quirks.getCssRules(sheet)),rule);
		if(index > 0) {
			if($closure(sheet,"deleteRule") != null) {
				sheet.deleteRule(index);
				return true;
			}
			else if(sheet.removeRule != null) {
				sheet.removeRule(index);
				return true;
			}
		}
		return false;
	}
	if(rule.parentStyleSheet != null) {
		deleteFromSheet(rule.parentStyleSheet);
	}
	else {
		var stylesheets = doc.styleSheets;
		{
			var _g1 = 0, _g = stylesheets.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(deleteFromSheet(stylesheets[i])) break;
			}
		}
	}
	return rule;
}
js.dom.Quirks.addOverridingCssRule = function(el,style) {
	if(style == null) style = "";
	var doc = el.ownerDocument;
	var id = OptionExtensions.getOrElse(OptionExtensions.filter(OptionExtensions.toOption(el.getAttribute("id")),function(id) {
		return id != "";
	}),function() {
		return DynamicExtensions.withEffect(haxe.util.Guid.generate(),function(guid) {
			el.setAttribute("id",guid);
		});
	});
	if(doc.styleSheets.length <= 0) {
		js.dom.Quirks.addCssStylesheet(doc,"");
	}
	var lastStyleSheet = doc.styleSheets[doc.styleSheets.length - 1];
	return js.dom.Quirks.insertCssRule(lastStyleSheet,((("#" + id) + " {") + style) + "}");
}
js.dom.Quirks.addCssStylesheet = function(doc,content) {
	var head = OptionExtensions.getOrElse(OptionExtensions.toOption(doc.getElementsByTagName("HEAD")[0]),function() {
		return DynamicExtensions.withEffect(doc.createElement("HEAD"),function(newHead) {
			doc.documentElement.appendChild(newHead);
		});
	});
	var style = doc.createElement("STYLE");
	style.setAttribute("type","text/css");
	try {
		if(style.innerText != null) {
			style.innerText = content;
		}
		else if(style.innerHTML != null) {
			style.innerHTML = content;
		}
		head.appendChild(style);
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				head.appendChild(style);
				doc.styleSheets[doc.styleSheets.length - 1].cssText = content;
			}
		}
	}
	return doc.styleSheets[doc.styleSheets.length - 1];
}
js.dom.Quirks.getCssRules = function(sheet) {
	return (sheet.cssRules != null?sheet.cssRules:sheet.rules);
}
js.dom.Quirks.insertCssRule = function(sheet,rule,index_) {
	if($closure(sheet,"insertRule") != null) {
		var rules = js.dom.Quirks.getCssRules(sheet);
		var index = (index_ == null?rules.length:index_);
		sheet.insertRule(rule,index);
		return rules[index];
	}
	else if(sheet.addRule != null) {
		var addRule = sheet.addRule;
		var Pattern = new EReg("^([^{]+)\\{([^}]*)\\}$","");
		if(Pattern.match(rule)) {
			var index = (index_ == null?-1:index_);
			addRule(StringExtensions.trim(Pattern.matched(1)),StringExtensions.trim(Pattern.matched(2)),index);
			var rules = js.dom.Quirks.getCssRules(sheet);
			var newIndex = (index == -1?rules.length - 1:index);
			return rules[newIndex];
		}
	}
	return Stax.error("Invalid rule: " + rule);
}
js.dom.Quirks.getActualCssPropertyName = function(name) {
	if(js.dom.Quirks.FloatPattern.match(name)) return (js.detect.BrowserSupport.cssFloat()?"cssFloat":"styleFloat");
	return name;
}
js.dom.Quirks.getComputedCssProperty = function(elem,name) {
	return DynamicExtensions.into(((js.detect.BrowserSupport.getComputedStyle()?OptionExtensions.getOrElseC(OptionExtensions.orElse(OptionExtensions.flatMap(OptionExtensions.flatMap(OptionExtensions.toOption(elem.ownerDocument.defaultView),function(defaultView) {
		return OptionExtensions.toOption(defaultView.getComputedStyle(elem,null));
	}),function(computedStyle) {
		return OptionExtensions.filter(OptionExtensions.toOption(computedStyle.getPropertyValue(name)),function(style) {
			return style != "";
		});
	}),function() {
		return (name == "opacity"?Option.Some("1"):Option.None);
	}),""):(elem.currentStyle != null?(name == "opacity" && !js.detect.BrowserSupport.opacity()?(js.dom.Quirks.OpacityPattern.match(elem.currentStyle.filter)?FloatExtensions.toString((StringExtensions.toFloat(js.dom.Quirks.OpacityPattern.matched(1)) / 100.0)):"1"):(function($this) {
		var $r;
		var style = elem.currentStyle[name];
		$r = (js.dom.Quirks.NumberPattern.match(style) && !js.dom.Quirks.NumberPixelPattern.match(style)?(function($this) {
			var $r;
			var oldLeft = elem.style.left;
			var oldRtLeft = elem.runtimeStyle.left;
			elem.runtimeStyle.left = elem.currentStyle.left;
			elem.style.left = ((name == "font-size")?"1em":style);
			$r = (elem.style.pixelLeft + "px").withEffect(function() {
				elem.style.left = oldLeft;
				elem.runtimeStyle.left = oldRtLeft;
			});
			return $r;
		}($this)):style);
		return $r;
	}(this))):""))),function(computedStyle) {
		return (computedStyle == ""?Option.None:OptionExtensions.toOption(computedStyle));
	});
}
js.dom.Quirks.getCssProperty = function(elem,name) {
	return OptionExtensions.orElse(OptionExtensions.flatMap(OptionExtensions.toOption(elem.style),function(style) {
		return haxe.util.ObjectExtensions.getAny(style,js.dom.Quirks.getActualCssPropertyName(name));
	}),function() {
		return js.dom.Quirks.getComputedCssProperty(elem,name);
	});
}
js.dom.Quirks.getCssPropertyIfSet = function(elem,name) {
	return OptionExtensions.filter(js.dom.Quirks.getCssProperty(elem,name),function(style) {
		return style != "";
	});
}
js.dom.Quirks.getViewportSize = function() {
	return (js.Env.window.innerWidth != null?{ dx : js.Env.window.innerWidth, dy : js.Env.window.innerHeight}:(js.Env.document.documentElement != null && js.Env.document.documentElement.clientWidth != null && js.Env.document.documentElement.clientWidth != 0?{ dx : js.Env.document.documentElement.clientWidth, dy : js.Env.document.documentElement.clientHeight}:{ dx : js.Env.document.body.clientWidth, dy : js.Env.document.body.clientHeight}));
}
js.dom.Quirks.getPageScroll = function() {
	var xScroll = 0;
	var yScroll = 0;
	if(js.Env.window.pageYOffset != null) {
		yScroll = js.Env.window.pageYOffset;
		xScroll = js.Env.window.pageXOffset;
	}
	else if(js.Env.document.documentElement != null && js.Env.document.documentElement.scrollTop != null) {
		yScroll = js.Env.document.documentElement.scrollTop;
		xScroll = js.Env.document.documentElement.scrollLeft;
	}
	else if(js.Env.document.body != null) {
		yScroll = js.Env.document.body.scrollTop;
		xScroll = js.Env.document.body.scrollLeft;
	}
	return { x : xScroll, y : yScroll}
}
js.dom.Quirks.getPageHeight = function() {
	var windowHeight = 0;
	if(js.Env.window.innerHeight != null) {
		windowHeight = js.Env.window.innerHeight;
	}
	else if(js.Env.document.documentElement != null && js.Env.document.documentElement.clientHeight != null) {
		windowHeight = js.Env.document.documentElement.clientHeight;
	}
	else if(js.Env.document.body != null) {
		windowHeight = js.Env.document.body.clientHeight;
	}
	return windowHeight;
}
js.dom.Quirks.hasAttribute = function(e,attr) {
	if($closure(e,"hasAttribute") != null) {
		return e.hasAttribute(attr);
	}
	else {
		var value = e.getAttribute(attr);
		return (js.Env.eq(value,null) || js.Env.eq(value,"")?false:true);
	}
}
js.dom.Quirks.getBodyOffset = function(doc) {
	return OptionExtensions.map(OptionExtensions.flatMap(OptionExtensions.toOption(js.Env.document),function(document) {
		return OptionExtensions.toOption(document.body);
	}),function(body) {
		var top = body.offsetTop;
		var left = body.offsetLeft;
		if(js.detect.BrowserSupport.offsetDoesNotIncludeMarginInBodyOffset()) {
			top += OptionExtensions.getOrElseC(OptionExtensions.map(js.dom.Quirks.getComputedCssProperty(body,"margin-top"),function(s) {
				return StringExtensions.toInt(s,0);
			}),0);
			left += OptionExtensions.getOrElseC(OptionExtensions.map(js.dom.Quirks.getComputedCssProperty(body,"margin-left"),function(s) {
				return StringExtensions.toInt(s,0);
			}),0);
		}
		return { x : left, y : top}
	});
}
js.dom.Quirks.setOffset = function(elem,offset) {
	if(elem == null || elem.ownerDocument == null) return elem;
	else {
		var position = js.dom.Quirks.getComputedCssProperty(elem,"position");
		OptionExtensions.foreach(position,function(v) {
			if(v == "static") elem.style.position = "relative";
		});
		var curOffset = OptionExtensions.getOrElseC(js.dom.Quirks.getOffset(elem),{ x : 0, y : 0});
		var curTop = OptionExtensions.getOrElseC(OptionExtensions.map(js.dom.Quirks.getComputedCssProperty(elem,"top"),function(s) {
			return StringExtensions.toInt(s,0);
		}),0);
		var curLeft = OptionExtensions.getOrElseC(OptionExtensions.map(js.dom.Quirks.getComputedCssProperty(elem,"left"),function(s) {
			return StringExtensions.toInt(s,0);
		}),0);
		elem.style.top = IntExtensions.toString(((offset.y - curOffset.y) + curTop)) + "px";
		elem.style.left = IntExtensions.toString(((offset.x - curOffset.x) + curLeft)) + "px";
		return elem;
	}
}
js.dom.Quirks.addClass = function(element,value) {
	if(!js.dom.Quirks.hasClass(element,value)) element.className += ((element.className != null && element.className != ""?" ":"")) + value;
}
js.dom.Quirks.removeClass = function(element,value) {
	var result = new EReg(("(^|\\s)" + value) + "(\\s|$)","g").replace(element.className,"$2");
	element.className = new EReg("/^\\s|\\s$/","").replace(result,"");
}
js.dom.Quirks.hasClass = function(element,value) {
	var r = new EReg(("(^|\\s)" + value) + "(\\s|$)","");
	return (element.className != null?r.match(element.className):false);
}
js.dom.Quirks.setWidth = function(elem,width) {
	return js.dom.Quirks.setCssProperty(elem,"width",IntExtensions.toString(width) + "px");
}
js.dom.Quirks.setHeight = function(elem,hight) {
	return js.dom.Quirks.setCssProperty(elem,"height",IntExtensions.toString(hight) + "px");
}
js.dom.Quirks.setCssProperty = function(elem,name,value) {
	if(elem == null || elem.nodeType == 3 || elem.nodeType == 8) {
		return elem;
	}
	else {
		if((name == "width" || name == "height") && StringExtensions.toFloat(value) < 0) {
			return elem;
		}
		else {
			var style = elem.style;
			if(name == "opacity" && !js.detect.BrowserSupport.opacity()) {
				style.zoom = 1;
				var opacity = ("alpha(opacity=" + StringExtensions.toFloat(value) * 100) + ")";
				var filter = (style.filter != null?OptionExtensions.getOrElseC(js.dom.Quirks.getComputedCssProperty(elem,"filter"),""):"");
				var newFilter = (js.dom.Quirks.AlphaPattern.match(filter)?js.dom.Quirks.AlphaPattern.replace(filter,opacity):opacity);
				style.filter = newFilter;
			}
			else {
				var propertyName = haxe.util.StringExtensions.toCamelCase(js.dom.Quirks.getActualCssPropertyName(name));
				elem.style[propertyName] = value;
			}
			return elem;
		}
	}
}
js.dom.Quirks.getInnerHeight = function(elem) {
	return js.dom.Quirks.getWidthOrHeight(elem,"offsetHeight",js.dom.Quirks.cssHeight,"padding");
}
js.dom.Quirks.getOuterHeight = function(elem,includeMargin) {
	return js.dom.Quirks.getWidthOrHeight(elem,"offsetHeight",js.dom.Quirks.cssHeight,(includeMargin?"margin":"border"));
}
js.dom.Quirks.getInnerWidth = function(elem) {
	return js.dom.Quirks.getWidthOrHeight(elem,"offsetWidth",js.dom.Quirks.cssWidth,"padding");
}
js.dom.Quirks.getOuterWidth = function(elem,includeMargin) {
	return js.dom.Quirks.getWidthOrHeight(elem,"offsetWidth",js.dom.Quirks.cssWidth,(includeMargin?"margin":"border"));
}
js.dom.Quirks.getHeight = function(elem) {
	return js.dom.Quirks.getWidthOrHeight(elem,"offsetHeight",js.dom.Quirks.cssHeight,"");
}
js.dom.Quirks.getWidth = function(elem) {
	return js.dom.Quirks.getWidthOrHeight(elem,"offsetWidth",js.dom.Quirks.cssWidth,"");
}
js.dom.Quirks.getWidthOrHeight = function(elem,offsetValueExtract,which,extra) {
	if(elem == null || elem.ownerDocument == null) return Option.None;
	else {
		var val = 0;
		if(elem.offsetWidth != 0) {
			val = js.dom.Quirks.getWH(elem,offsetValueExtract,which,extra);
		}
		else {
			val = js.dom.Quirks.swap(elem,js.dom.Quirks.cssShow,function(value) {
				return js.dom.Quirks.getWH(elem,offsetValueExtract,which,extra);
			});
		}
		return Option.Some(FloatExtensions.toInt(Math.max(0,Math.round(val))));
	}
}
js.dom.Quirks.swap = function(elem,values,functionCallback) {
	var elemStyle = js.dom.Quirks.setAndStore(elem,values);
	var result = functionCallback.call(elem);
	js.dom.Quirks.setAndStore(elem,elemStyle);
	return result;
}
js.dom.Quirks.setAndStore = function(elem,styles) {
	var values = haxe.data.collections.Map.create();
	{ var $it0 = styles.iterator();
	while( $it0.hasNext() ) { var k = $it0.next();
	{
		values = values.set(k._1,elem.style[k._1]);
		elem.style[k._1] = k._2;
	}
	}}
	return values;
}
js.dom.Quirks.getWH = function(elem,offsetValueExtract,which,extra) {
	var val = elem[offsetValueExtract];
	if(extra != "border") {
		ArrayExtensions.foreach(which,function(v) {
			if(extra != "") {
				val -= OptionExtensions.getOrElseC(OptionExtensions.map(js.dom.Quirks.getCssPropertyIfSet(elem,"padding-" + v),function(s) {
					return StringExtensions.toInt(s,0);
				}),0);
			}
			if(extra == "margin") {
				val += OptionExtensions.getOrElseC(OptionExtensions.map(js.dom.Quirks.getCssPropertyIfSet(elem,"margin-" + v),function(s) {
					return StringExtensions.toInt(s,0);
				}),0);
			}
			else {
				val -= OptionExtensions.getOrElseC(OptionExtensions.map(js.dom.Quirks.getCssPropertyIfSet(elem,("border-" + v) + "-width"),function(s) {
					return StringExtensions.toInt(s,0);
				}),0);
			}
		});
	}
	return val;
}
js.dom.Quirks.getOffset = function(elem) {
	if(elem == null || elem.ownerDocument == null) return Option.None;
	else if(elem == elem.ownerDocument.body) return js.dom.Quirks.getBodyOffset(elem.ownerDocument);
	else if(js.Env.document.documentElement != null && $closure(js.Env.document.documentElement,"getBoundingClientRect") != null) {
		var box = elem.getBoundingClientRect();
		var doc = elem.ownerDocument;
		var body = doc.body;
		var docElem = doc.documentElement;
		var clientTop = ArrayExtensions.first(ArrayExtensions.filter([docElem.clientTop,body.clientTop,0],haxe.functional.P.isNotNull()));
		var clientLeft = ArrayExtensions.first(ArrayExtensions.filter([docElem.clientLeft,body.clientLeft,0],haxe.functional.P.isNotNull()));
		var top = (box.top + ArrayExtensions.first(ArrayExtensions.filter([js.Env.window.pageYOffset,(js.detect.BrowserSupport.boxModel()?docElem.scrollTop:null),body.scrollTop],haxe.functional.P.isNotNull()))) - clientTop;
		var left = (box.left + ArrayExtensions.first(ArrayExtensions.filter([js.Env.window.pageXOffset,(js.detect.BrowserSupport.boxModel()?docElem.scrollLeft:null),body.scrollLeft],haxe.functional.P.isNotNull()))) - clientLeft;
		return Option.Some({ x : left, y : top});
	}
	else {
		var getStyle = function(elem1) {
			var defaultView = elem1.ownerDocument.defaultView;
			return (defaultView != null?defaultView.getComputedStyle(elem1,null):elem1.currentStyle);
		}
		var offsetParent = elem.offsetParent;
		var prevOffsetParent = elem;
		var doc = elem.ownerDocument;
		var docElem = doc.documentElement;
		var body = doc.body;
		var defaultView = doc.defaultView;
		var prevComputedStyle = getStyle(elem);
		var top = elem.offsetTop;
		var left = elem.offsetLeft;
		while(((elem = elem.parentNode) != null) && elem != body && elem != docElem) {
			if(js.detect.BrowserSupport.positionFixed() && prevComputedStyle.position == "fixed") {
				break;
			}
			var computedStyle = getStyle(elem);
			top -= elem.scrollTop;
			left -= elem.scrollLeft;
			if(elem == offsetParent) {
				top += elem.offsetTop;
				left += elem.offsetLeft;
				if(js.detect.BrowserSupport.offsetDoesNotAddBorder() && !(js.detect.BrowserSupport.offsetAddsBorderForTableAndCells() && new EReg("^t(able|d|h)$","i").match(elem.nodeName))) {
					top += computedStyle.borderTopWidth.toInt(0);
					left += computedStyle.borderLeftWidth.toInt(0);
				}
				prevOffsetParent = offsetParent;
				offsetParent = elem.offsetParent;
			}
			if(js.detect.BrowserSupport.offsetSubtractsBorderForOverflowNotVisible() && computedStyle.overflow != "visible") {
				top += computedStyle.borderTopWidth.toInt(0);
				left += computedStyle.borderLeftWidth.toInt(0);
			}
			prevComputedStyle = computedStyle;
		}
		if(prevComputedStyle.position == "relative" || prevComputedStyle.position == "static") {
			top += body.offsetTop;
			left += body.offsetLeft;
		}
		if(js.detect.BrowserSupport.positionFixed() && prevComputedStyle.position == "fixed") {
			top += FloatExtensions.toInt(Math.max(docElem.scrollTop,body.scrollTop));
			left += FloatExtensions.toInt(Math.max(docElem.scrollLeft,body.scrollLeft));
		}
		return Option.Some({ x : left, y : top});
	}
}
js.dom.Quirks.getPosition = function(elem) {
	if(elem == null || elem.ownerDocument == null) return Option.None;
	var offsetParent = js.dom.Quirks.offsetParent(elem);
	var offset = OptionExtensions.getOrElseC(js.dom.Quirks.getOffset(elem),{ x : 0, y : 0});
	var parentOffset = (js.dom.Quirks.RootPattern.match(offsetParent.nodeName)?{ x : 0, y : 0}:OptionExtensions.getOrElseC(js.dom.Quirks.getOffset(offsetParent),{ x : 0, y : 0}));
	offset.x -= StringExtensions.toInt(OptionExtensions.getOrElseC(js.dom.Quirks.getCssPropertyIfSet(elem,"marginTop"),"0"));
	offset.y -= StringExtensions.toInt(OptionExtensions.getOrElseC(js.dom.Quirks.getCssPropertyIfSet(elem,"marginLeft"),"0"));
	parentOffset.x += StringExtensions.toInt(OptionExtensions.getOrElseC(js.dom.Quirks.getCssPropertyIfSet(offsetParent,"borderTopWidth"),"0"));
	parentOffset.y += StringExtensions.toInt(OptionExtensions.getOrElseC(js.dom.Quirks.getCssPropertyIfSet(offsetParent,"borderLeftWidth"),"0"));
	return Option.Some({ x : offset.x - parentOffset.x, y : offset.y - parentOffset.y});
}
js.dom.Quirks.offsetParent = function(elem) {
	var offsetParent = (elem.offsetParent != null?elem.offsetParent:js.Env.document.body);
	while(offsetParent != null && (!js.dom.Quirks.RootPattern.match(offsetParent.nodeName) && OptionExtensions.getOrElseC(js.dom.Quirks.getCssProperty(offsetParent,"position"),"") == "static")) {
		offsetParent = offsetParent.offsetParent;
	}
	return offsetParent;
}
js.dom.Quirks.prototype.__class__ = js.dom.Quirks;
js.io.IFrameIOTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
js.io.IFrameIOTestCase.__name__ = ["js","io","IFrameIOTestCase"];
js.io.IFrameIOTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) js.io.IFrameIOTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
js.io.IFrameIOTestCase.prototype.XtestSendOfLargeStringPacketIsReceived = function() {
	var string = "";
	{
		var _g = 0;
		while(_g < 1000) {
			var i = _g++;
			string += "91234";
		}
	}
	var self = this;
	this.iframeIO1.receiveWhile(function(data) {
		self.assertEquals(string,data,null,null,{ fileName : "IFrameIOTestCase.hx", lineNumber : 93, className : "js.io.IFrameIOTestCase", methodName : "XtestSendOfLargeStringPacketIsReceived"});
		haxe.Log.trace("Successfully tested send of large packet",{ fileName : "IFrameIOTestCase.hx", lineNumber : 95, className : "js.io.IFrameIOTestCase", methodName : "XtestSendOfLargeStringPacketIsReceived"});
		return false;
	},this.window2.location.href,this.window2);
	this.iframeIO2.send(string,this.window1.location.href,this.window1);
	this.assertTrue(true,null,{ fileName : "IFrameIOTestCase.hx", lineNumber : 105, className : "js.io.IFrameIOTestCase", methodName : "XtestSendOfLargeStringPacketIsReceived"});
}
js.io.IFrameIOTestCase.prototype.afterAll = function() {
	null;
}
js.io.IFrameIOTestCase.prototype.beforeAll = function() {
	var d = js.Env.document;
	var body = d.getElementsByTagName("body")[0];
	var iframe1 = js.dom.HTMLDocumentExtensions.newIframeInvisible(js.Env.document);
	var iframe2 = js.dom.HTMLDocumentExtensions.newIframeInvisible(js.Env.document);
	body.appendChild(iframe1);
	body.appendChild(iframe2);
	var doc1 = js.dom.Quirks.getIframeDocument(iframe1);
	var doc2 = js.dom.Quirks.getIframeDocument(iframe2);
	this.window1 = js.dom.Quirks.getIframeWindow(iframe1);
	this.window2 = js.dom.Quirks.getIframeWindow(iframe2);
	this.iframeIO1 = new js.io.IFrameIOAutoDetect(this.window1);
	this.iframeIO2 = new js.io.IFrameIOAutoDetect(this.window2);
}
js.io.IFrameIOTestCase.prototype.iframeIO1 = null;
js.io.IFrameIOTestCase.prototype.iframeIO2 = null;
js.io.IFrameIOTestCase.prototype.testSendOfTinyStringPacketIsReceived = function() {
	var self = this;
	var count = 0;
	this.iframeIO1.receiveWhile(function(data) {
		self.assertEquals("foo",data,null,null,{ fileName : "IFrameIOTestCase.hx", lineNumber : 67, className : "js.io.IFrameIOTestCase", methodName : "testSendOfTinyStringPacketIsReceived"});
		haxe.Log.trace("Successfully tested send of tiny packet",{ fileName : "IFrameIOTestCase.hx", lineNumber : 69, className : "js.io.IFrameIOTestCase", methodName : "testSendOfTinyStringPacketIsReceived"});
		self.XtestSendOfLargeStringPacketIsReceived();
		return false;
	},this.window2.location.href,this.window2);
	this.iframeIO2.send("foo",this.window1.location.href,this.window1);
	this.assertTrue(true,null,{ fileName : "IFrameIOTestCase.hx", lineNumber : 81, className : "js.io.IFrameIOTestCase", methodName : "testSendOfTinyStringPacketIsReceived"});
}
js.io.IFrameIOTestCase.prototype.window1 = null;
js.io.IFrameIOTestCase.prototype.window2 = null;
js.io.IFrameIOTestCase.prototype.__class__ = js.io.IFrameIOTestCase;
haxe.test.Runner = function(p) { if( p === $_ ) return; {
	this.fixtures = new Array();
	this.onProgress = new haxe.test.Dispatcher();
	this.onStart = new haxe.test.Dispatcher();
	this.onComplete = new haxe.test.Dispatcher();
	this.length = 0;
}}
haxe.test.Runner.__name__ = ["haxe","test","Runner"];
haxe.test.Runner.findMethodByName = function(test,name) {
	return function() {
		var method = Reflect.field(test,name);
		if(method != null) {
			method.apply(test,[]);
		}
	}
}
haxe.test.Runner.prototype.add = function(test,prefix,pattern) {
	if(prefix == null) prefix = "test";
	if(!Reflect.isObject(test)) throw "can't add a null object as a test case";
	var patternMatches = function(field) {
		return OptionExtensions.map(OptionExtensions.toOption(pattern),function(p) {
			return p.match(field);
		});
	}
	var prefixMatches = function(field) {
		return Option.Some(StringExtensions.startsWith(field,prefix));
	}
	var fieldIsTest = function(field) {
		return OptionExtensions.getOrElseC(OptionExtensions.orElseC(patternMatches(field),prefixMatches(field)),false);
	}
	var fieldIsMethod = (Function2Extensions.curry($closure(this,"isMethod")))(test);
	var testMethods = ArrayExtensions.filter(Type.getInstanceFields(Type.getClass(test)),haxe.functional.Predicate1Extensions.and(fieldIsTest,fieldIsMethod));
	var getMethodByName = this.addBeforeAll(test,this.addAfterAll(test,[testMethods.length],(Function2Extensions.curry($closure(haxe.test.Runner,"findMethodByName")))(test)));
	var methodFixtures = ArrayExtensions.map(testMethods,function(field) {
		return new haxe.test.TestFixture(test,field,getMethodByName(field),"before","after");
	});
	this.addFixtures(methodFixtures);
	return this;
}
haxe.test.Runner.prototype.addAfterAll = function(test,totalTestsHolder,f) {
	if(Reflect.field(test,"afterAll") != null) {
		var afterAll = haxe.test.Runner.findMethodByName(test,"afterAll");
		var runAfterAll = function() {
			--totalTestsHolder[0];
			if(totalTestsHolder[0] == 0) {
				afterAll();
			}
		}
		return function(name) {
			var method = f(name);
			return function() {
				try {
					method();
				}
				catch( $e0 ) {
					{
						var e = $e0;
						{
							runAfterAll();
							throw e;
						}
					}
				}
				runAfterAll();
			}
		}
	}
	return f;
}
haxe.test.Runner.prototype.addAll = function(tests,prefix,pattern) {
	if(prefix == null) prefix = "test";
	{ var $it0 = tests.iterator();
	while( $it0.hasNext() ) { var test = $it0.next();
	{
		this.add(test,prefix,pattern);
	}
	}}
	return this;
}
haxe.test.Runner.prototype.addBeforeAll = function(test,f) {
	if(Reflect.field(test,"beforeAll") != null) {
		var beforeAll = haxe.test.Runner.findMethodByName(test,"beforeAll");
		var totalTests = 0;
		var runBeforeAll = function() {
			++totalTests;
			if(totalTests == 1) {
				beforeAll();
			}
		}
		return function(name) {
			var method = f(name);
			return function() {
				runBeforeAll();
				method();
			}
		}
	}
	return f;
}
haxe.test.Runner.prototype.addFixture = function(fixture) {
	this.fixtures.push(fixture);
	this.length++;
	return this;
}
haxe.test.Runner.prototype.addFixtures = function(fixtures) {
	{ var $it0 = fixtures.iterator();
	while( $it0.hasNext() ) { var fixture = $it0.next();
	this.addFixture(fixture);
	}}
	return this;
}
haxe.test.Runner.prototype.fixtures = null;
haxe.test.Runner.prototype.getFixture = function(index) {
	return this.fixtures[index];
}
haxe.test.Runner.prototype.isMethod = function(test,name) {
	try {
		return Reflect.isFunction(Reflect.field(test,name));
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				return false;
			}
		}
	}
}
haxe.test.Runner.prototype.length = null;
haxe.test.Runner.prototype.onComplete = null;
haxe.test.Runner.prototype.onProgress = null;
haxe.test.Runner.prototype.onStart = null;
haxe.test.Runner.prototype.pos = null;
haxe.test.Runner.prototype.run = function() {
	this.pos = 0;
	this.onStart.dispatch(this);
	this.runNext();
	return this;
}
haxe.test.Runner.prototype.runFixture = function(fixture) {
	var handler = new haxe.test.TestHandler(fixture);
	handler.onComplete.add($closure(this,"testComplete"));
	handler.execute();
}
haxe.test.Runner.prototype.runNext = function() {
	if(this.fixtures.length > this.pos) this.runFixture(this.fixtures[this.pos++]);
	else this.onComplete.dispatch(this);
}
haxe.test.Runner.prototype.testComplete = function(h) {
	this.onProgress.dispatch({ result : haxe.test.TestResult.ofHandler(h), done : this.pos, totals : this.length});
	this.runNext();
}
haxe.test.Runner.prototype.__class__ = haxe.test.Runner;
haxe.text.json.JValue = { __ename__ : ["haxe","text","json","JValue"], __constructs__ : ["JNull","JBool","JNumber","JString","JArray","JObject","JField"] }
haxe.text.json.JValue.JArray = function(v) { var $x = ["JArray",4,v]; $x.__enum__ = haxe.text.json.JValue; $x.toString = $estr; return $x; }
haxe.text.json.JValue.JBool = function(v) { var $x = ["JBool",1,v]; $x.__enum__ = haxe.text.json.JValue; $x.toString = $estr; return $x; }
haxe.text.json.JValue.JField = function(k,v) { var $x = ["JField",6,k,v]; $x.__enum__ = haxe.text.json.JValue; $x.toString = $estr; return $x; }
haxe.text.json.JValue.JNull = ["JNull",0];
haxe.text.json.JValue.JNull.toString = $estr;
haxe.text.json.JValue.JNull.__enum__ = haxe.text.json.JValue;
haxe.text.json.JValue.JNumber = function(v) { var $x = ["JNumber",2,v]; $x.__enum__ = haxe.text.json.JValue; $x.toString = $estr; return $x; }
haxe.text.json.JValue.JObject = function(v) { var $x = ["JObject",5,v]; $x.__enum__ = haxe.text.json.JValue; $x.toString = $estr; return $x; }
haxe.text.json.JValue.JString = function(v) { var $x = ["JString",3,v]; $x.__enum__ = haxe.text.json.JValue; $x.toString = $estr; return $x; }
haxe.test.ui.common.ClassResult = function(className,setupName,teardownName) { if( className === $_ ) return; {
	this.fixtures = new Hash();
	this.className = className;
	this.setupName = setupName;
	this.hasSetup = setupName != null;
	this.teardownName = teardownName;
	this.hasTeardown = teardownName != null;
	this.methods = 0;
	this.stats = new haxe.test.ui.common.ResultStats();
}}
haxe.test.ui.common.ClassResult.__name__ = ["haxe","test","ui","common","ClassResult"];
haxe.test.ui.common.ClassResult.prototype.add = function(result) {
	if(this.fixtures.exists(result.methodName)) throw "invalid duplicated fixture result";
	this.stats.wire(result.stats);
	this.methods++;
	this.fixtures.set(result.methodName,result);
}
haxe.test.ui.common.ClassResult.prototype.className = null;
haxe.test.ui.common.ClassResult.prototype.exists = function(method) {
	return this.fixtures.exists(method);
}
haxe.test.ui.common.ClassResult.prototype.fixtures = null;
haxe.test.ui.common.ClassResult.prototype.get = function(method) {
	return this.fixtures.get(method);
}
haxe.test.ui.common.ClassResult.prototype.hasSetup = null;
haxe.test.ui.common.ClassResult.prototype.hasTeardown = null;
haxe.test.ui.common.ClassResult.prototype.methodNames = function(errorsHavePriority) {
	if(errorsHavePriority == null) errorsHavePriority = true;
	var names = [];
	{ var $it0 = this.fixtures.keys();
	while( $it0.hasNext() ) { var name = $it0.next();
	names.push(name);
	}}
	if(errorsHavePriority) {
		var me = this;
		names.sort(function(a,b) {
			var $as = me.get(a).stats;
			var bs = me.get(b).stats;
			if($as.hasErrors) {
				return ((!bs.hasErrors)?-1:(($as.errors == bs.errors?Reflect.compare(a,b):Reflect.compare($as.errors,bs.errors))));
			}
			else if(bs.hasErrors) {
				return 1;
			}
			else if($as.hasFailures) {
				return ((!bs.hasFailures)?-1:(($as.failures == bs.failures?Reflect.compare(a,b):Reflect.compare($as.failures,bs.failures))));
			}
			else if(bs.hasFailures) {
				return 1;
			}
			else if($as.hasWarnings) {
				return ((!bs.hasWarnings)?-1:(($as.warnings == bs.warnings?Reflect.compare(a,b):Reflect.compare($as.warnings,bs.warnings))));
			}
			else if(bs.hasWarnings) {
				return 1;
			}
			else {
				return Reflect.compare(a,b);
			}
		});
	}
	else {
		names.sort(function(a,b) {
			return Reflect.compare(a,b);
		});
	}
	return names;
}
haxe.test.ui.common.ClassResult.prototype.methods = null;
haxe.test.ui.common.ClassResult.prototype.setupName = null;
haxe.test.ui.common.ClassResult.prototype.stats = null;
haxe.test.ui.common.ClassResult.prototype.teardownName = null;
haxe.test.ui.common.ClassResult.prototype.__class__ = haxe.test.ui.common.ClassResult;
haxe.test.TestHandler = function(fixture) { if( fixture === $_ ) return; {
	if(fixture == null) throw "fixture argument is null";
	this.fixture = fixture;
	this.results = new List();
	this.asyncStack = new List();
	this.onTested = fixture.onTested;
	this.onTimeout = fixture.onTimeout;
	this.onComplete = fixture.onComplete;
}}
haxe.test.TestHandler.__name__ = ["haxe","test","TestHandler"];
haxe.test.TestHandler.exceptionStack = function(pops) {
	if(pops == null) pops = 2;
	var stack = haxe.Stack.exceptionStack();
	while(pops-- > 0) {
		stack.pop();
	}
	return stack;
}
haxe.test.TestHandler.prototype.addAsync = function(f,timeout) {
	if(timeout == null) timeout = 250;
	this.asyncStack.add(f);
	var handler = this;
	this.setTimeout(timeout);
	return function() {
		if(!handler.asyncStack.remove(f)) {
			handler.results.add(haxe.test.Assertation.AsyncError("method already executed",[]));
			return;
		}
		try {
			handler.bindHandler();
			f();
		}
		catch( $e0 ) {
			{
				var e = $e0;
				{
					handler.results.add(haxe.test.Assertation.AsyncError(e,haxe.test.TestHandler.exceptionStack(0)));
				}
			}
		}
	}
}
haxe.test.TestHandler.prototype.addEvent = function(f,timeout) {
	if(timeout == null) timeout = 250;
	this.asyncStack.add(f);
	var handler = this;
	this.setTimeout(timeout);
	return function(e) {
		if(!handler.asyncStack.remove(f)) {
			handler.results.add(haxe.test.Assertation.AsyncError("event already executed",[]));
			return;
		}
		try {
			handler.bindHandler();
			f(e);
		}
		catch( $e0 ) {
			{
				var e1 = $e0;
				{
					handler.results.add(haxe.test.Assertation.AsyncError(e1,haxe.test.TestHandler.exceptionStack(0)));
				}
			}
		}
	}
}
haxe.test.TestHandler.prototype.asyncStack = null;
haxe.test.TestHandler.prototype.bindHandler = function() {
	haxe.test.Assert.results = this.results;
	haxe.test.Assert.createAsync = $closure(this,"addAsync");
	haxe.test.Assert.createEvent = $closure(this,"addEvent");
}
haxe.test.TestHandler.prototype.checkTested = function() {
	if(this.expireson == null || this.asyncStack.length == 0) {
		this.tested();
	}
	else if(haxe.Timer.stamp() > this.expireson) {
		this.timeout();
	}
	else {
		haxe.Timer.delay($closure(this,"checkTested"),10);
	}
}
haxe.test.TestHandler.prototype.completed = function() {
	try {
		this.executeMethodByName(this.fixture.teardown);
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				this.results.add(haxe.test.Assertation.TeardownError(e,haxe.test.TestHandler.exceptionStack(2)));
			}
		}
	}
	this.unbindHandler();
	this.onComplete.dispatch(this);
}
haxe.test.TestHandler.prototype.execute = function() {
	try {
		this.executeMethodByName(this.fixture.setup);
		try {
			this.executeMethod($closure(this.fixture,"method"));
		}
		catch( $e0 ) {
			{
				var e = $e0;
				{
					this.results.add(haxe.test.Assertation.Error(e,haxe.test.TestHandler.exceptionStack()));
				}
			}
		}
	}
	catch( $e1 ) {
		{
			var e = $e1;
			{
				this.results.add(haxe.test.Assertation.SetupError(e,haxe.test.TestHandler.exceptionStack()));
			}
		}
	}
	this.checkTested();
}
haxe.test.TestHandler.prototype.executeMethod = function(f) {
	if(f != null) {
		this.bindHandler();
		f();
	}
}
haxe.test.TestHandler.prototype.executeMethodByName = function(name) {
	if(name == null) return;
	var method = Reflect.field(this.fixture.target,name);
	if(method != null) {
		this.bindHandler();
		method.apply(this.fixture.target,[]);
	}
}
haxe.test.TestHandler.prototype.expireson = null;
haxe.test.TestHandler.prototype.fixture = null;
haxe.test.TestHandler.prototype.onComplete = null;
haxe.test.TestHandler.prototype.onTested = null;
haxe.test.TestHandler.prototype.onTimeout = null;
haxe.test.TestHandler.prototype.results = null;
haxe.test.TestHandler.prototype.setTimeout = function(timeout) {
	var newexpire = haxe.Timer.stamp() + timeout / 1000;
	this.expireson = ((this.expireson == null)?newexpire:((newexpire > this.expireson?newexpire:this.expireson)));
}
haxe.test.TestHandler.prototype.tested = function() {
	if(this.results.length == 0) this.results.add(haxe.test.Assertation.Warning("no assertions"));
	this.onTested.dispatch(this);
	this.completed();
}
haxe.test.TestHandler.prototype.timeout = function() {
	this.results.add(haxe.test.Assertation.TimeoutError(this.asyncStack.length,[]));
	this.onTimeout.dispatch(this);
	this.completed();
}
haxe.test.TestHandler.prototype.unbindHandler = function() {
	haxe.test.Assert.results = null;
	haxe.test.Assert.createAsync = function(f,t) {
		return function() {
			null;
		}
	}
	haxe.test.Assert.createEvent = function(f,t) {
		return function(e) {
			null;
		}
	}
}
haxe.test.TestHandler.prototype.__class__ = haxe.test.TestHandler;
haxe.test.Assert = function() { }
haxe.test.Assert.__name__ = ["haxe","test","Assert"];
haxe.test.Assert.results = null;
haxe.test.Assert.that = function(obj,cond,msg,pos) {
	var $e = (cond(obj));
	switch( $e[1] ) {
	case 0:
	var result = $e[2];
	{
		haxe.test.Assert.isTrue(false,(("Expected: " + result.assertion) + ", Found: x = ") + haxe.test.Assert.q(obj),pos);
	}break;
	case 1:
	{
		haxe.test.Assert.isTrue(true,null,pos);
	}break;
	}
}
haxe.test.Assert.isTrue = function(cond,msg,pos) {
	if(haxe.test.Assert.results == null) throw "Assert.results is not currently bound to any assert context";
	if(null == msg) msg = "expected true";
	if(cond) haxe.test.Assert.results.add(haxe.test.Assertation.Success(pos));
	else haxe.test.Assert.results.add(haxe.test.Assertation.Failure(msg,pos));
}
haxe.test.Assert.isFalse = function(value,msg,pos) {
	if(null == msg) msg = "expected false";
	haxe.test.Assert.isTrue(value == false,msg,pos);
}
haxe.test.Assert.isNull = function(value,msg,pos) {
	if(msg == null) msg = "expected null but was " + haxe.test.Assert.q(value);
	haxe.test.Assert.isTrue(value == null,msg,pos);
}
haxe.test.Assert.notNull = function(value,msg,pos) {
	if(null == msg) msg = "expected false";
	haxe.test.Assert.isTrue(value != null,msg,pos);
}
haxe.test.Assert["is"] = function(value,type,msg,pos) {
	if(msg == null) msg = (("expected type " + haxe.test.Assert.typeToString(type)) + " but was ") + haxe.test.Assert.typeToString(value);
	haxe.test.Assert.isTrue(Std["is"](value,type),msg,pos);
}
haxe.test.Assert.notEquals = function(expected,value,msg,pos) {
	if(msg == null) msg = ((("expected " + haxe.test.Assert.q(expected)) + " and testa value ") + haxe.test.Assert.q(value)) + " should be different";
	haxe.test.Assert.isFalse(expected == value,msg,pos);
}
haxe.test.Assert.equals = function(expected,value,equal,msg,pos) {
	if(equal == null) equal = Stax.getEqualFor(expected);
	if(msg == null) msg = (("expected " + haxe.test.Assert.q(expected)) + " but was ") + haxe.test.Assert.q(value);
	haxe.test.Assert.isTrue(equal(expected,value),msg,pos);
}
haxe.test.Assert.matches = function(pattern,value,msg,pos) {
	if(msg == null) msg = ("the value " + haxe.test.Assert.q(value)) + "does not match the provided pattern";
	haxe.test.Assert.isTrue(pattern.match(value),msg,pos);
}
haxe.test.Assert.floatEquals = function(expected,value,approx,msg,pos) {
	if(msg == null) msg = (("expected " + expected) + " but was ") + value;
	if(Math.isNaN(expected)) if(Math.isNaN(value)) return haxe.test.Assert.isTrue(true,msg,pos);
	else return haxe.test.Assert.isTrue(false,msg,pos);
	else if(Math.isNaN(value)) return haxe.test.Assert.isTrue(false,msg,pos);
	if(null == approx) approx = 1e-5;
	return haxe.test.Assert.isTrue(Math.abs(value - expected) < approx,msg,pos);
}
haxe.test.Assert.getTypeName = function(v) {
	var $e = (Type["typeof"](v));
	switch( $e[1] ) {
	case 0:
	{
		return null;
	}break;
	case 1:
	{
		return "Int";
	}break;
	case 2:
	{
		return "Float";
	}break;
	case 3:
	{
		return "Bool";
	}break;
	case 5:
	{
		return "function";
	}break;
	case 6:
	var c = $e[2];
	{
		return Type.getClassName(c);
	}break;
	case 7:
	var e = $e[2];
	{
		return Type.getEnumName(e);
	}break;
	case 4:
	{
		return "Object";
	}break;
	case 8:
	{
		return "Unknown";
	}break;
	}
}
haxe.test.Assert.isIterable = function(v,isAnonym) {
	var fields = (isAnonym?Reflect.fields(v):Type.getInstanceFields(Type.getClass(v)));
	if(!Lambda.has(fields,"iterator")) return false;
	return Reflect.isFunction(Reflect.field(v,"iterator"));
}
haxe.test.Assert.isIterator = function(v,isAnonym) {
	var fields = (isAnonym?Reflect.fields(v):Type.getInstanceFields(Type.getClass(v)));
	if(!Lambda.has(fields,"next") || !Lambda.has(fields,"hasNext")) return false;
	return Reflect.isFunction(Reflect.field(v,"next")) && Reflect.isFunction(Reflect.field(v,"hasNext"));
}
haxe.test.Assert.sameAs = function(expected,value,status) {
	var texpected = haxe.test.Assert.getTypeName(expected);
	var tvalue = haxe.test.Assert.getTypeName(value);
	var isanonym = texpected == "Object";
	if(texpected != tvalue) {
		status.error = ((("expected type " + texpected) + " but it is ") + tvalue) + ((status.path == ""?"":" for field " + status.path));
		return false;
	}
	var $e = (Type["typeof"](expected));
	switch( $e[1] ) {
	case 0:
	case 1:
	case 2:
	case 3:
	{
		if(expected != value) {
			status.error = ((("expected " + expected) + " but it is ") + value) + ((status.path == ""?"":" for field " + status.path));
			return false;
		}
		return true;
	}break;
	case 5:
	{
		if(!Reflect.compareMethods(expected,value)) {
			status.error = "expected same function reference" + ((status.path == ""?"":" for field " + status.path));
			return false;
		}
		return true;
	}break;
	case 6:
	var c = $e[2];
	{
		var cexpected = Type.getClassName(c);
		var cvalue = Type.getClassName(Type.getClass(value));
		if(cexpected != cvalue) {
			status.error = ((("expected instance of " + cexpected) + " but it is ") + cvalue) + ((status.path == ""?"":" for field " + status.path));
			return false;
		}
		if(Std["is"](expected,Array)) {
			if(status.recursive || status.path == "") {
				if(expected.length != value.length) {
					status.error = ((("expected " + expected.length) + " elements but they were ") + value.length) + ((status.path == ""?"":" for field " + status.path));
					return false;
				}
				var path = status.path;
				{
					var _g1 = 0, _g = expected.length;
					while(_g1 < _g) {
						var i = _g1++;
						status.path = (path == ""?("array[" + i) + "]":((path + "[") + i) + "]");
						if(!haxe.test.Assert.sameAs(expected[i],value[i],status)) {
							status.error = ((("expected " + haxe.test.Assert.q(expected)) + " but it is ") + haxe.test.Assert.q(value)) + ((status.path == ""?"":" for field " + status.path));
							return false;
						}
					}
				}
			}
			return true;
		}
		if(Std["is"](expected,Date)) {
			if(expected.getTime() != value.getTime()) {
				status.error = ((("expected " + haxe.test.Assert.q(expected)) + " but it is ") + haxe.test.Assert.q(value)) + ((status.path == ""?"":" for field " + status.path));
				return false;
			}
			return true;
		}
		if(Std["is"](expected,haxe.io.Bytes)) {
			if(status.recursive || status.path == "") {
				var ebytes = expected;
				var vbytes = value;
				if(ebytes.length != vbytes.length) return false;
				{
					var _g1 = 0, _g = ebytes.length;
					while(_g1 < _g) {
						var i = _g1++;
						if(ebytes.b[i] != vbytes.b[i]) {
							status.error = ((("expected byte " + ebytes.b[i]) + " but wss ") + ebytes.b[i]) + ((status.path == ""?"":" for field " + status.path));
							return false;
						}
					}
				}
			}
			return true;
		}
		if(Std["is"](expected,Hash) || Std["is"](expected,IntHash)) {
			if(status.recursive || status.path == "") {
				var keys = Lambda.array({ iterator : function() {
					return expected.keys();
				}});
				var vkeys = Lambda.array({ iterator : function() {
					return value.keys();
				}});
				if(keys.length != vkeys.length) {
					status.error = ((("expected " + keys.length) + " keys but they were ") + vkeys.length) + ((status.path == ""?"":" for field " + status.path));
					return false;
				}
				var path = status.path;
				{
					var _g = 0;
					while(_g < keys.length) {
						var key = keys[_g];
						++_g;
						status.path = (path == ""?("hash[" + key) + "]":((path + "[") + key) + "]");
						if(!haxe.test.Assert.sameAs(expected.get(key),value.get(key),status)) {
							status.error = ((("expected " + haxe.test.Assert.q(expected)) + " but it is ") + haxe.test.Assert.q(value)) + ((status.path == ""?"":" for field " + status.path));
							return false;
						}
					}
				}
			}
			return true;
		}
		if(haxe.test.Assert.isIterator(expected,false)) {
			if(status.recursive || status.path == "") {
				var evalues = Lambda.array({ iterator : function() {
					return expected;
				}});
				var vvalues = Lambda.array({ iterator : function() {
					return value;
				}});
				if(evalues.length != vvalues.length) {
					status.error = ((("expected " + evalues.length) + " values in Iterator but they were ") + vvalues.length) + ((status.path == ""?"":" for field " + status.path));
					return false;
				}
				var path = status.path;
				{
					var _g1 = 0, _g = evalues.length;
					while(_g1 < _g) {
						var i = _g1++;
						status.path = (path == ""?("iterator[" + i) + "]":((path + "[") + i) + "]");
						if(!haxe.test.Assert.sameAs(evalues[i],vvalues[i],status)) {
							status.error = ((("expected " + haxe.test.Assert.q(expected)) + " but it is ") + haxe.test.Assert.q(value)) + ((status.path == ""?"":" for field " + status.path));
							return false;
						}
					}
				}
			}
			return true;
		}
		if(haxe.test.Assert.isIterable(expected,false)) {
			if(status.recursive || status.path == "") {
				var evalues = Lambda.array(expected);
				var vvalues = Lambda.array(value);
				if(evalues.length != vvalues.length) {
					status.error = ((("expected " + evalues.length) + " values in Iterable but they were ") + vvalues.length) + ((status.path == ""?"":" for field " + status.path));
					return false;
				}
				var path = status.path;
				{
					var _g1 = 0, _g = evalues.length;
					while(_g1 < _g) {
						var i = _g1++;
						status.path = (path == ""?("iterable[" + i) + "]":((path + "[") + i) + "]");
						if(!haxe.test.Assert.sameAs(evalues[i],vvalues[i],status)) return false;
					}
				}
			}
			return true;
		}
		if(status.recursive || status.path == "") {
			var fields = Type.getInstanceFields(Type.getClass(expected));
			var path = status.path;
			{
				var _g = 0;
				while(_g < fields.length) {
					var field = fields[_g];
					++_g;
					status.path = (path == ""?field:(path + ".") + field);
					var e = Reflect.field(expected,field);
					if(Reflect.isFunction(e)) continue;
					var v = Reflect.field(value,field);
					if(!haxe.test.Assert.sameAs(e,v,status)) return false;
				}
			}
		}
		return true;
	}break;
	case 7:
	var e = $e[2];
	{
		var eexpected = Type.getEnumName(e);
		var evalue = Type.getEnumName(Type.getEnum(value));
		if(eexpected != evalue) {
			status.error = ((("expected enumeration of " + eexpected) + " but it is ") + evalue) + ((status.path == ""?"":" for field " + status.path));
			return false;
		}
		if(status.recursive || status.path == "") {
			if(expected[1] != value[1]) {
				status.error = ((("expected " + haxe.test.Assert.q(expected[0])) + " but is ") + haxe.test.Assert.q(value[0])) + ((status.path == ""?"":" for field " + status.path));
				return false;
			}
			var eparams = expected.slice(2);
			var vparams = value.slice(2);
			var path = status.path;
			{
				var _g1 = 0, _g = eparams.length;
				while(_g1 < _g) {
					var i = _g1++;
					status.path = (path == ""?("enum[" + i) + "]":((path + "[") + i) + "]");
					if(!haxe.test.Assert.sameAs(eparams[i],vparams[i],status)) {
						status.error = ((("expected " + haxe.test.Assert.q(expected)) + " but it is ") + haxe.test.Assert.q(value)) + ((status.path == ""?"":" for field " + status.path));
						return false;
					}
				}
			}
		}
		return true;
	}break;
	case 4:
	{
		if(status.recursive || status.path == "") {
			var fields = Reflect.fields(expected);
			var path = status.path;
			{
				var _g = 0;
				while(_g < fields.length) {
					var field = fields[_g];
					++_g;
					status.path = (path == ""?field:(path + ".") + field);
					if(!Reflect.hasField(value,field)) {
						status.error = (("expected field " + status.path) + " does not exist in ") + value;
						return false;
					}
					var e = Reflect.field(expected,field);
					if(Reflect.isFunction(e)) continue;
					var v = Reflect.field(value,field);
					if(!haxe.test.Assert.sameAs(e,v,status)) return false;
				}
			}
		}
		if(haxe.test.Assert.isIterator(expected,true)) {
			if(!(haxe.test.Assert.isIterator(value,true))) {
				status.error = "expected Iterable but it is not " + ((status.path == ""?"":" for field " + status.path));
				return false;
			}
			if(status.recursive || status.path == "") {
				var evalues = Lambda.array({ iterator : function() {
					return expected;
				}});
				var vvalues = Lambda.array({ iterator : function() {
					return value;
				}});
				if(evalues.length != vvalues.length) {
					status.error = ((("expected " + evalues.length) + " values in Iterator but they were ") + vvalues.length) + ((status.path == ""?"":" for field " + status.path));
					return false;
				}
				var path = status.path;
				{
					var _g1 = 0, _g = evalues.length;
					while(_g1 < _g) {
						var i = _g1++;
						status.path = (path == ""?("iterator[" + i) + "]":((path + "[") + i) + "]");
						if(!haxe.test.Assert.sameAs(evalues[i],vvalues[i],status)) {
							status.error = ((("expected " + haxe.test.Assert.q(expected)) + " but it is ") + haxe.test.Assert.q(value)) + ((status.path == ""?"":" for field " + status.path));
							return false;
						}
					}
				}
			}
			return true;
		}
		if(haxe.test.Assert.isIterable(expected,true)) {
			if(!(haxe.test.Assert.isIterable(value,true))) {
				status.error = "expected Iterator but it is not " + ((status.path == ""?"":" for field " + status.path));
				return false;
			}
			if(status.recursive || status.path == "") {
				var evalues = Lambda.array(expected);
				var vvalues = Lambda.array(value);
				if(evalues.length != vvalues.length) {
					status.error = ((("expected " + evalues.length) + " values in Iterable but they were ") + vvalues.length) + ((status.path == ""?"":" for field " + status.path));
					return false;
				}
				var path = status.path;
				{
					var _g1 = 0, _g = evalues.length;
					while(_g1 < _g) {
						var i = _g1++;
						status.path = (path == ""?("iterable[" + i) + "]":((path + "[") + i) + "]");
						if(!haxe.test.Assert.sameAs(evalues[i],vvalues[i],status)) return false;
					}
				}
			}
			return true;
		}
		return true;
	}break;
	case 8:
	{
		return (function($this) {
			var $r;
			throw "Unable to compare  two unknown types";
			return $r;
		}(this));
	}break;
	}
	return (function($this) {
		var $r;
		throw (("Unable to compare values: " + haxe.test.Assert.q(expected)) + " and ") + haxe.test.Assert.q(value);
		return $r;
	}(this));
}
haxe.test.Assert.q = function(v) {
	if(null == v) return "null";
	else if(Std["is"](v,String)) return ("\"" + StringTools.replace(v,"\"","\\\"")) + "\"";
	else return "" + v;
}
haxe.test.Assert.looksLike = function(expected,value,recursive,msg,pos) {
	if(null == recursive) recursive = true;
	var status = { recursive : recursive, path : "", error : null}
	if(haxe.test.Assert.sameAs(expected,value,status)) {
		haxe.test.Assert.isTrue(true,msg,pos);
	}
	else {
		haxe.test.Assert.fail((msg == null?status.error:msg),pos);
	}
}
haxe.test.Assert.throwsException = function(method,type,msg,pos) {
	if(type == null) type = String;
	try {
		method();
		var name = Type.getClassName(type);
		if(name == null) name = "" + type;
		haxe.test.Assert.fail(("exception of type " + name) + " not raised",pos);
	}
	catch( $e0 ) {
		{
			var ex = $e0;
			{
				var name = Type.getClassName(type);
				if(name == null) name = "" + type;
				haxe.test.Assert.isTrue(Std["is"](ex,type),(("expected throw of type " + name) + " but was ") + ex,pos);
			}
		}
	}
}
haxe.test.Assert.equalsOneOf = function(value,possibilities,msg,pos) {
	if(Lambda.has(possibilities,value)) {
		haxe.test.Assert.isTrue(true,msg,pos);
	}
	else {
		haxe.test.Assert.fail((msg == null?(("value " + haxe.test.Assert.q(value)) + " not found in the expected possibilities ") + possibilities:msg),pos);
	}
}
haxe.test.Assert.contains = function(values,match,msg,pos) {
	if(Lambda.has(values,match)) {
		haxe.test.Assert.isTrue(true,msg,pos);
	}
	else {
		haxe.test.Assert.fail((msg == null?(("values " + values) + " do not contain ") + match:msg),pos);
	}
}
haxe.test.Assert.notContains = function(values,match,msg,pos) {
	if(!Lambda.has(values,match)) {
		haxe.test.Assert.isTrue(true,msg,pos);
	}
	else {
		haxe.test.Assert.fail((msg == null?(("values " + values) + " do contain ") + match:msg),pos);
	}
}
haxe.test.Assert.stringContains = function(match,value,msg,pos) {
	if(value != null && value.indexOf(match) >= 0) {
		haxe.test.Assert.isTrue(true,msg,pos);
	}
	else {
		haxe.test.Assert.fail((msg == null?(("value " + haxe.test.Assert.q(value)) + " does not contain ") + haxe.test.Assert.q(match):msg),pos);
	}
}
haxe.test.Assert.stringSequence = function(sequence,value,msg,pos) {
	if(null == value) {
		haxe.test.Assert.fail((msg == null?"null argument value":msg),pos);
		return;
	}
	var p = 0;
	{
		var _g = 0;
		while(_g < sequence.length) {
			var s = sequence[_g];
			++_g;
			var p2 = value.indexOf(s,p);
			if(p2 < 0) {
				if(msg == null) {
					msg = ("expected '" + s) + "' after ";
					if(p > 0) {
						var cut = value.substr(0,p);
						if(cut.length > 30) cut = "..." + cut.substr(-27);
						msg += (" '" + cut) + "'";
					}
					else msg += " begin";
				}
				haxe.test.Assert.fail(msg,pos);
				return;
			}
			p = p2 + s.length;
		}
	}
	haxe.test.Assert.isTrue(true,msg,pos);
}
haxe.test.Assert.fail = function(msg,pos) {
	if(msg == null) msg = "failure expected";
	haxe.test.Assert.isTrue(false,msg,pos);
}
haxe.test.Assert.warn = function(msg) {
	haxe.test.Assert.results.add(haxe.test.Assertation.Warning(msg));
}
haxe.test.Assert.createAsync = function(f,timeout) {
	return function() {
		null;
	}
}
haxe.test.Assert.delivered = function(future,assertions,timeout) {
	var f = haxe.test.Assert.createAsync(function() {
		if(future.isCanceled()) {
			haxe.test.Assert.fail(("expected delivery of future " + haxe.test.Assert.q(future)) + ", but it was canceled",{ fileName : "Assert.hx", lineNumber : 681, className : "haxe.test.Assert", methodName : "delivered"});
		}
		else {
			assertions(OptionExtensions.get(future.value()));
		}
	},timeout);
	future.deliverTo(function(value) {
		f();
	});
	future.ifCanceled(f);
}
haxe.test.Assert.canceled = function(future,assertions,timeout) {
	future.ifCanceled(haxe.test.Assert.createAsync(assertions,timeout));
}
haxe.test.Assert.notDelivered = function(future,timeout,pos) {
	var f = haxe.test.Assert.createAsync(function() {
		if(future.isDelivered()) {
			haxe.test.Assert.fail("Did not expect delivery of: " + OptionExtensions.get(future.value()),pos);
		}
		else {
			haxe.test.Assert.isTrue(true,null,{ fileName : "Assert.hx", lineNumber : 708, className : "haxe.test.Assert", methodName : "notDelivered"});
		}
	},timeout + 10);
	haxe.Timer.delay(f,timeout);
	future.deliverTo(function(value) {
		f();
	});
}
haxe.test.Assert.createEvent = function(f,timeout) {
	return function(e) {
		null;
	}
}
haxe.test.Assert.typeToString = function(t) {
	try {
		var _t = Type.getClass(t);
		if(_t != null) t = _t;
	}
	catch( $e0 ) {
		{
			var e = $e0;
			null;
		}
	}
	try {
		return Type.getClassName(t);
	}
	catch( $e1 ) {
		{
			var e = $e1;
			null;
		}
	}
	try {
		var _t = Type.getEnum(t);
		if(_t != null) t = _t;
	}
	catch( $e2 ) {
		{
			var e = $e2;
			null;
		}
	}
	try {
		return Type.getEnumName(t);
	}
	catch( $e3 ) {
		{
			var e = $e3;
			null;
		}
	}
	try {
		return Std.string(Type["typeof"](t));
	}
	catch( $e4 ) {
		{
			var e = $e4;
			null;
		}
	}
	try {
		return Std.string(t);
	}
	catch( $e5 ) {
		{
			var e = $e5;
			null;
		}
	}
	return "<unable to retrieve type name>";
}
haxe.test.Assert.prototype.__class__ = haxe.test.Assert;
StringBuf = function(p) { if( p === $_ ) return; {
	this.b = new Array();
}}
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.add = function(x) {
	this.b[this.b.length] = x;
}
StringBuf.prototype.addChar = function(c) {
	this.b[this.b.length] = String.fromCharCode(c);
}
StringBuf.prototype.addSub = function(s,pos,len) {
	this.b[this.b.length] = s.substr(pos,len);
}
StringBuf.prototype.b = null;
StringBuf.prototype.toString = function() {
	return this.b.join("");
}
StringBuf.prototype.__class__ = StringBuf;
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype.__class__ = haxe.Log;
DOMTokenList = function() { }
DOMTokenList.__name__ = ["DOMTokenList"];
DOMTokenList.prototype.add = null;
DOMTokenList.prototype.contains = null;
DOMTokenList.prototype.item = null;
DOMTokenList.prototype.length = null;
DOMTokenList.prototype.remove = null;
DOMTokenList.prototype.stringifier = null;
DOMTokenList.prototype.toggle = null;
DOMTokenList.prototype.__class__ = DOMTokenList;
DOMSettableTokenList = function() { }
DOMSettableTokenList.__name__ = ["DOMSettableTokenList"];
DOMSettableTokenList.prototype.add = null;
DOMSettableTokenList.prototype.contains = null;
DOMSettableTokenList.prototype.item = null;
DOMSettableTokenList.prototype.length = null;
DOMSettableTokenList.prototype.remove = null;
DOMSettableTokenList.prototype.stringifier = null;
DOMSettableTokenList.prototype.toggle = null;
DOMSettableTokenList.prototype.value = null;
DOMSettableTokenList.prototype.__class__ = DOMSettableTokenList;
DOMStringList = function() { }
DOMStringList.__name__ = ["DOMStringList"];
DOMStringList.prototype.contains = null;
DOMStringList.prototype.item = null;
DOMStringList.prototype.length = null;
DOMStringList.prototype.__class__ = DOMStringList;
NameList = function() { }
NameList.__name__ = ["NameList"];
NameList.prototype.contains = null;
NameList.prototype.containsNS = null;
NameList.prototype.getName = null;
NameList.prototype.getNamespaceURI = null;
NameList.prototype.length = null;
NameList.prototype.__class__ = NameList;
NamedNodeMap = function() { }
NamedNodeMap.__name__ = ["NamedNodeMap"];
NamedNodeMap.prototype.getNamedItem = null;
NamedNodeMap.prototype.getNamedItemNS = null;
NamedNodeMap.prototype.item = null;
NamedNodeMap.prototype.length = null;
NamedNodeMap.prototype.removeNamedItem = null;
NamedNodeMap.prototype.removeNamedItemNS = null;
NamedNodeMap.prototype.setNamedItem = null;
NamedNodeMap.prototype.setNamedItemNS = null;
NamedNodeMap.prototype.__class__ = NamedNodeMap;
TimedTrackCueList = function() { }
TimedTrackCueList.__name__ = ["TimedTrackCueList"];
TimedTrackCueList.prototype.getCueById = null;
TimedTrackCueList.prototype.getter = null;
TimedTrackCueList.prototype.length = null;
TimedTrackCueList.prototype.__class__ = TimedTrackCueList;
Selection = function() { }
Selection.__name__ = ["Selection"];
Selection.prototype.addRange = null;
Selection.prototype.anchorNode = null;
Selection.prototype.anchorOffset = null;
Selection.prototype.collapse = null;
Selection.prototype.collapseToEnd = null;
Selection.prototype.collapseToStart = null;
Selection.prototype.deleteFromDocument = null;
Selection.prototype.focusNode = null;
Selection.prototype.focusOffset = null;
Selection.prototype.getRangeAt = null;
Selection.prototype.isCollapsed = null;
Selection.prototype.rangeCount = null;
Selection.prototype.removeAllRanges = null;
Selection.prototype.removeRange = null;
Selection.prototype.selectAllChildren = null;
Selection.prototype.stringifier = null;
Selection.prototype.__class__ = Selection;
MessagePortArray = function() { }
MessagePortArray.__name__ = ["MessagePortArray"];
MessagePortArray.prototype.__class__ = MessagePortArray;
MessagePort = function() { }
MessagePort.__name__ = ["MessagePort"];
MessagePort.prototype.close = null;
MessagePort.prototype.onMessage = null;
MessagePort.prototype.postMessage = null;
MessagePort.prototype.start = null;
MessagePort.prototype.__class__ = MessagePort;
MediaList = function() { }
MediaList.__name__ = ["MediaList"];
MediaList.prototype.appendMedium = null;
MediaList.prototype.deleteMedium = null;
MediaList.prototype.item = null;
MediaList.prototype.length = null;
MediaList.prototype.mediaText = null;
MediaList.prototype.__class__ = MediaList;
js.dom.HTMLDocumentExtensions = function() { }
js.dom.HTMLDocumentExtensions.__name__ = ["js","dom","HTMLDocumentExtensions"];
js.dom.HTMLDocumentExtensions.newImage = function(doc) {
	return doc.createElement("IMG");
}
js.dom.HTMLDocumentExtensions.newDiv = function(doc) {
	return doc.createElement("DIV");
}
js.dom.HTMLDocumentExtensions.newIframe = function(doc,width,height) {
	var iframe = doc.createElement("IFRAME");
	OptionExtensions.map(OptionExtensions.zip(OptionExtensions.toOption(width),OptionExtensions.toOption(height)),function(t) {
		iframe.setAttribute("width",IntExtensions.toString(width));
		iframe.setAttribute("height",IntExtensions.toString(height));
	});
	return iframe;
}
js.dom.HTMLDocumentExtensions.newIframeWindow = function(doc,width,height) {
	var iframe = js.dom.HTMLDocumentExtensions.newIframe(doc,width,height);
	iframe.setAttribute("frameborder","0");
	iframe.setAttribute("marginwidth","0");
	iframe.setAttribute("marginheight","0");
	iframe.setAttribute("vspace","0");
	iframe.setAttribute("hspace","0");
	iframe.setAttribute("scrolling","no");
	iframe.setAttribute("noresize","noresize");
	iframe.setAttribute("allowtransparency","true");
	iframe.style.margin = "0";
	iframe.style.padding = "0";
	iframe.style.border = "none";
	iframe.style.borderLeftStyle = "none";
	iframe.style.borderRightStyle = "none";
	iframe.style.borderTopStyle = "none";
	iframe.style.borderBottomStyle = "none";
	iframe.style.backgroundColor = "transparent";
	return iframe;
}
js.dom.HTMLDocumentExtensions.newIframeInvisible = function(doc) {
	return js.dom.HTMLDocumentExtensions.newIframeWindow(doc,0,0);
}
js.dom.HTMLDocumentExtensions.prototype.__class__ = js.dom.HTMLDocumentExtensions;
haxe.test.ui.text.PrintReport = function(runner) { if( runner === $_ ) return; {
	haxe.test.ui.text.PlainTextReport.apply(this,[runner,$closure(this,"_handler")]);
	this.newline = "\n";
	this.indent = "  ";
}}
haxe.test.ui.text.PrintReport.__name__ = ["haxe","test","ui","text","PrintReport"];
haxe.test.ui.text.PrintReport.__super__ = haxe.test.ui.text.PlainTextReport;
for(var k in haxe.test.ui.text.PlainTextReport.prototype ) haxe.test.ui.text.PrintReport.prototype[k] = haxe.test.ui.text.PlainTextReport.prototype[k];
haxe.test.ui.text.PrintReport.prototype._handler = function(report) {
	this._trace(report.getResults());
}
haxe.test.ui.text.PrintReport.prototype._trace = function(s) {
	s = StringTools.replace(s,"  ",this.indent);
	s = StringTools.replace(s,"\n",this.newline);
	haxe.Log.trace(s,{ fileName : "PrintReport.hx", lineNumber : 81, className : "haxe.test.ui.text.PrintReport", methodName : "_trace"});
}
haxe.test.ui.text.PrintReport.prototype.useTrace = null;
haxe.test.ui.text.PrintReport.prototype.__class__ = haxe.test.ui.text.PrintReport;
haxe.math.tween.Tween = function() { }
haxe.math.tween.Tween.__name__ = ["haxe","math","tween","Tween"];
haxe.math.tween.Tween.linear = function(state1,state2,def) {
	if(def == null) def = 0.0;
	var combinedFields = IterableExtensions.toSet(Reflect.fields(state1)).addAll(Reflect.fields(state2));
	var data = haxe.functional.FoldableExtensions.toMap(haxe.functional.FoldableExtensions.map(combinedFields,function(name) {
		var start = OptionExtensions.getOrElseC(OptionExtensions.toOption(Reflect.field(state1,name)),def);
		var end = OptionExtensions.getOrElseC(OptionExtensions.toOption(Reflect.field(state2,name)),def);
		return DynamicExtensions.entuple(name,{ start : start, delta : end - start});
	}));
	return function(t) {
		return data.foldl({ },function(r,tuple) {
			var name = tuple._1;
			var start = tuple._2.start;
			var delta = tuple._2.delta;
			r[name] = start + t * delta;
			return r;
		});
	}
}
haxe.math.tween.Tween.prototype.__class__ = haxe.math.tween.Tween;
haxe.net.UrlExtensionsTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
haxe.net.UrlExtensionsTestCase.__name__ = ["haxe","net","UrlExtensionsTestCase"];
haxe.net.UrlExtensionsTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) haxe.net.UrlExtensionsTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
haxe.net.UrlExtensionsTestCase.prototype.testAddQueryParametersWhenJustQuestionMarkExists = function() {
	this.assertEquals("http://foo.com?foo=bar",haxe.net.UrlExtensions.addQueryParameters("http://foo.com?",DynamicExtensions.toMap({ foo : "bar"})),null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 98, className : "haxe.net.UrlExtensionsTestCase", methodName : "testAddQueryParametersWhenJustQuestionMarkExists"});
}
haxe.net.UrlExtensionsTestCase.prototype.testAddQueryParametersWhenNoneExist = function() {
	this.assertEquals("http://foo.com?foo=bar",haxe.net.UrlExtensions.addQueryParameters("http://foo.com",DynamicExtensions.toMap({ foo : "bar"})),null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 94, className : "haxe.net.UrlExtensionsTestCase", methodName : "testAddQueryParametersWhenNoneExist"});
}
haxe.net.UrlExtensionsTestCase.prototype.testAddQueryParametersWhenQueryParametersAlreadyExists = function() {
	this.assertEquals("http://foo.com?doo=dar&foo=bar",haxe.net.UrlExtensions.addQueryParameters("http://foo.com?doo=dar",DynamicExtensions.toMap({ foo : "bar"})),null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 102, className : "haxe.net.UrlExtensionsTestCase", methodName : "testAddQueryParametersWhenQueryParametersAlreadyExists"});
}
haxe.net.UrlExtensionsTestCase.prototype.testCanParseFileProtocol = function() {
	var p = OptionExtensions.get(haxe.net.UrlExtensions.toParsedUrl("file:///Users/John/Documents/github/stax/test.html"));
	this.assertEquals("file:",p.protocol,null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 79, className : "haxe.net.UrlExtensionsTestCase", methodName : "testCanParseFileProtocol"});
	this.assertEquals("/Users/John/Documents/github/stax/test.html",p.pathname,null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 80, className : "haxe.net.UrlExtensionsTestCase", methodName : "testCanParseFileProtocol"});
}
haxe.net.UrlExtensionsTestCase.prototype.testExtractSearchForLocalFile = function() {
	this.assertEquals("?foo",haxe.net.UrlExtensions.extractSearch("ad-display.js?foo"),null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 56, className : "haxe.net.UrlExtensionsTestCase", methodName : "testExtractSearchForLocalFile"});
}
haxe.net.UrlExtensionsTestCase.prototype.testNoProtocolIsPreserved = function() {
	this.assertEquals("client.html",haxe.net.UrlExtensions.toUrl(haxe.net.UrlExtensions.withoutSearch(OptionExtensions.get(haxe.net.UrlExtensions.toParsedUrl("client.html?foo")))),null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 60, className : "haxe.net.UrlExtensionsTestCase", methodName : "testNoProtocolIsPreserved"});
}
haxe.net.UrlExtensionsTestCase.prototype.testParseUrl1 = function() {
	var p = OptionExtensions.get(haxe.net.UrlExtensions.toParsedUrl("ftp://eau.ww.eesd.gov.calgary/home/smith/budget.wk1?foo=bar#top"));
	this.assertEquals("#top",p.hash,null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 32, className : "haxe.net.UrlExtensionsTestCase", methodName : "testParseUrl1"});
	this.assertEquals("eau.ww.eesd.gov.calgary",p.host,null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 33, className : "haxe.net.UrlExtensionsTestCase", methodName : "testParseUrl1"});
	this.assertEquals("eau.ww.eesd.gov.calgary",p.hostname,null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 34, className : "haxe.net.UrlExtensionsTestCase", methodName : "testParseUrl1"});
	this.assertEquals("ftp://eau.ww.eesd.gov.calgary/home/smith/budget.wk1?foo=bar#top",p.href,null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 35, className : "haxe.net.UrlExtensionsTestCase", methodName : "testParseUrl1"});
	this.assertEquals("/home/smith/budget.wk1",p.pathname,null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 36, className : "haxe.net.UrlExtensionsTestCase", methodName : "testParseUrl1"});
	this.assertEquals("",p.port,null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 37, className : "haxe.net.UrlExtensionsTestCase", methodName : "testParseUrl1"});
	this.assertEquals("ftp:",p.protocol,null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 38, className : "haxe.net.UrlExtensionsTestCase", methodName : "testParseUrl1"});
	this.assertEquals("?foo=bar",p.search,null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 39, className : "haxe.net.UrlExtensionsTestCase", methodName : "testParseUrl1"});
}
haxe.net.UrlExtensionsTestCase.prototype.testParseUrl2 = function() {
	var p = OptionExtensions.get(haxe.net.UrlExtensions.toParsedUrl("ftp://eau.ww.eesd.gov.calgary:923/home/smith/budget.wk1?foo=bar#top"));
	this.assertEquals("#top",p.hash,null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 45, className : "haxe.net.UrlExtensionsTestCase", methodName : "testParseUrl2"});
	this.assertEquals("eau.ww.eesd.gov.calgary:923",p.host,null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 46, className : "haxe.net.UrlExtensionsTestCase", methodName : "testParseUrl2"});
	this.assertEquals("eau.ww.eesd.gov.calgary",p.hostname,null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 47, className : "haxe.net.UrlExtensionsTestCase", methodName : "testParseUrl2"});
	this.assertEquals("ftp://eau.ww.eesd.gov.calgary:923/home/smith/budget.wk1?foo=bar#top",p.href,null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 48, className : "haxe.net.UrlExtensionsTestCase", methodName : "testParseUrl2"});
	this.assertEquals("/home/smith/budget.wk1",p.pathname,null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 49, className : "haxe.net.UrlExtensionsTestCase", methodName : "testParseUrl2"});
	this.assertEquals("923",p.port,null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 50, className : "haxe.net.UrlExtensionsTestCase", methodName : "testParseUrl2"});
	this.assertEquals("ftp:",p.protocol,null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 51, className : "haxe.net.UrlExtensionsTestCase", methodName : "testParseUrl2"});
	this.assertEquals("?foo=bar",p.search,null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 52, className : "haxe.net.UrlExtensionsTestCase", methodName : "testParseUrl2"});
}
haxe.net.UrlExtensionsTestCase.prototype.testQueryStringBijection = function() {
	var self = this;
	var identity = Function1Extensions.compose($closure(haxe.net.UrlExtensions,"toQueryString"),$closure(haxe.net.UrlExtensions,"toQueryParameters"));
	var test = function(s) {
		self.assertEquals(s,identity(s),null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 87, className : "haxe.net.UrlExtensionsTestCase", methodName : "testQueryStringBijection"});
	}
	test("?foo=bar");
	test("?foo=");
}
haxe.net.UrlExtensionsTestCase.prototype.testWithout = function() {
	var p = OptionExtensions.get(haxe.net.UrlExtensions.toParsedUrl("ftp://eau.ww.eesd.gov.calgary:923/home/smith/budget.wk1?foo=bar#top"));
	this.assertEquals("ftp://eau.ww.eesd.gov.calgary/home/smith/budget.wk1?foo=bar#top",haxe.net.UrlExtensions.toUrl(haxe.net.UrlExtensions.withoutPort(p)),null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 66, className : "haxe.net.UrlExtensionsTestCase", methodName : "testWithout"});
	this.assertEquals("ftp://eau.ww.eesd.gov.calgary:923/home/smith/budget.wk1#top",haxe.net.UrlExtensions.toUrl(haxe.net.UrlExtensions.withoutSearch(p)),null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 67, className : "haxe.net.UrlExtensionsTestCase", methodName : "testWithout"});
	this.assertEquals("ftp://eau.ww.eesd.gov.calgary:923/home/smith/budget.wk1?foo=bar",haxe.net.UrlExtensions.toUrl(haxe.net.UrlExtensions.withoutHash(p)),null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 68, className : "haxe.net.UrlExtensionsTestCase", methodName : "testWithout"});
	this.assertEquals("ftp://:923/home/smith/budget.wk1?foo=bar#top",haxe.net.UrlExtensions.toUrl(haxe.net.UrlExtensions.withoutHostname(p)),null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 69, className : "haxe.net.UrlExtensionsTestCase", methodName : "testWithout"});
	this.assertEquals("eau.ww.eesd.gov.calgary:923/home/smith/budget.wk1?foo=bar#top",haxe.net.UrlExtensions.toUrl(haxe.net.UrlExtensions.withoutProtocol(p)),null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 70, className : "haxe.net.UrlExtensionsTestCase", methodName : "testWithout"});
	this.assertEquals("ftp://eau.ww.eesd.gov.calgary:923/home/smith/?foo=bar#top",haxe.net.UrlExtensions.toUrl(haxe.net.UrlExtensions.withoutFile(p)),null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 71, className : "haxe.net.UrlExtensionsTestCase", methodName : "testWithout"});
	this.assertEquals("ftp://eau.ww.eesd.gov.calgary:923",haxe.net.UrlExtensions.toUrl(haxe.net.UrlExtensions.withoutPathname(haxe.net.UrlExtensions.withoutHash(haxe.net.UrlExtensions.withoutSearch(p)))),null,null,{ fileName : "UrlExtensionsTestCase.hx", lineNumber : 73, className : "haxe.net.UrlExtensionsTestCase", methodName : "testWithout"});
}
haxe.net.UrlExtensionsTestCase.prototype.__class__ = haxe.net.UrlExtensionsTestCase;
haxe.test.TestResult = function(p) { if( p === $_ ) return; {
	null;
}}
haxe.test.TestResult.__name__ = ["haxe","test","TestResult"];
haxe.test.TestResult.ofHandler = function(handler) {
	var r = new haxe.test.TestResult();
	var path = Type.getClassName(Type.getClass(handler.fixture.target)).split(".");
	r.cls = path.pop();
	r.pack = path.join(".");
	r.method = handler.fixture.methodName;
	r.setup = handler.fixture.setup;
	r.teardown = handler.fixture.teardown;
	r.assertations = handler.results;
	return r;
}
haxe.test.TestResult.prototype.assertations = null;
haxe.test.TestResult.prototype.cls = null;
haxe.test.TestResult.prototype.method = null;
haxe.test.TestResult.prototype.pack = null;
haxe.test.TestResult.prototype.setup = null;
haxe.test.TestResult.prototype.teardown = null;
haxe.test.TestResult.prototype.__class__ = haxe.test.TestResult;
if(!js.detect) js.detect = {}
js.detect.BrowserSupport = function() { }
js.detect.BrowserSupport.__name__ = ["js","detect","BrowserSupport"];
js.detect.BrowserSupport.cssTransformationSupported = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("cssTransformationSupported",function(v) {
		var isSupported = Option.None;
		var docEl = js.Env.document.documentElement;
		if(docEl != null) {
			var s = docEl.style;
			isSupported = Option.Some(js.Env.isDefined(s.WebkitTransform) || js.Env.isDefined(s.MozTransform));
		}
		return isSupported;
	});
}
js.detect.BrowserSupport.elementTagnameUppercased = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("elementTagnameUppercased",function(v) {
		var isUppercased = Option.None;
		var docEl = js.Env.document.documentElement;
		if(docEl != null) {
			isUppercased = Option.Some("HTML" == docEl.nodeName);
		}
		return isUppercased;
	});
}
js.detect.BrowserSupport.querySelectorIgnoresCapitalizedValuesBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("querySelectorIgnoresCapitalizedValuesBug",function(v) {
		var result = Option.None;
		if($closure(js.Env.document,"createElement") != null && (js.Env.document.compatMode == "BackCompat")) {
			var el = js.Env.document.createElement("div");
			var el2 = js.Env.document.createElement("span");
			if(el != null && el2 != null && el.querySelector != null) {
				el2.className = "Test";
				el.appendChild(el2);
				result = Option.Some((el.querySelector(".Test") != null));
			}
		}
		return result;
	});
}
js.detect.BrowserSupport.isEventSrcelementPresent = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("isEventSrcelementPresent",function(v) {
		var isSupported = Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var i = js.Env.document.createElement("input");
			var root = js.Env.document.documentElement;
			if(i != null && i.style != null && $closure(i,"click") != null && root != null && $closure(root,"appendChild") != null && $closure(root,"removeChild") != null) {
				i.type = "checkbox";
				i.style.display = "none";
				i.onclick = function(e) {
					if(js.Env.typeOf(e) == "object") {
						isSupported = Option.Some(js.Env.isDefined(e.srcElement));
					}
					else {
						isSupported = Option.Some(false);
					}
				}
				root.appendChild(i);
				i.click();
				root.removeChild(i);
				i.onclick = null;
				i = null;
			}
		}
		return isSupported;
	});
}
js.detect.BrowserSupport.isNativeHasAttributePresent = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("isNativeHasAttributePresent",function(v) {
		var isSupported = Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var i = js.Env.document.createElement("iframe");
			var root = js.Env.document.documentElement;
			var frames = js.Env.window.frames;
			if(root != null && $closure(root,"appendChild") != null && $closure(root,"removeChild") != null) {
				i.style.display = "none";
				root.appendChild(i);
				try {
					var frame = frames[frames.length - 1];
					if(frame != null) {
						var doc = frame.document;
						if(doc != null && $closure(doc,"write") != null) {
							doc.write("<html><head><title></title></head><body></body></html>");
							if(doc.documentElement != null) {
								isSupported = Option.Some(js.Env.isDefined($closure(doc.documentElement,"hasAttribute")));
							}
							else {
								isSupported = Option.Some(false);
							}
							root.removeChild(i);
							i = null;
						}
					}
				}
				catch( $e0 ) {
					{
						var e = $e0;
						{
							isSupported = Option.Some(false);
						}
					}
				}
			}
		}
		return isSupported;
	});
}
js.detect.BrowserSupport.isContextMenuEventSupported = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("isContextMenuEventSupported",function(v) {
		var isPresent = Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var el = js.Env.document.createElement("p");
			if(el != null && $closure(el,"setAttribute") != null) {
				el.setAttribute("oncontextmenu","");
				isPresent = Option.Some(js.Env.isDefined(el.oncontextmenu));
			}
		}
		return isPresent;
	});
}
js.detect.BrowserSupport.computedStyleReturnsValuesForStaticlyPositionedElements = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("computedStyleReturnsValuesForStaticlyPositionedElements",function(v) {
		var result = Option.None;
		var view = js.Env.document.defaultView;
		if(view != null && $closure(view,"getComputedStyle") != null) {
			var docEl = js.Env.document.documentElement;
			var position = null;
			var positionPriority = null;
			var style = view.getComputedStyle(docEl,null);
			if(style.position != "static") {
				position = style.position;
				var docElStyle = docEl.style;
				docElStyle.position = "";
			}
			var computedStyle = view.getComputedStyle(docEl,null);
			result = Option.Some(computedStyle.left != "auto");
			if(position != null) {
				var docElStyle = docEl.style;
				docElStyle.position = position;
			}
		}
		return result;
	});
}
js.detect.BrowserSupport.isRgbaSupported = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("isRgbaSupported",function(v) {
		var result = Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var value = "rgba(1,1,1,0.5)";
			var el = js.Env.document.createElement("p");
			var re = /^rgba/;
			if(el != null && el.style != null && js.Env.typeOf(re.test) == "function") {
				try {
					el.style.color = value;
					result = Option.Some(re.test(el.style.color));
				}
				catch( $e0 ) {
					{
						var e = $e0;
						{
							result = Option.Some(false);
						}
					}
				}
			}
		}
		return result;
	});
}
js.detect.BrowserSupport.isCssBorderRadiusSupported = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("isCssBorderRadiusSupported",function(v) {
		var result = Option.None;
		var docEl = js.Env.document.documentElement;
		if(docEl != null) {
			var s = docEl.style;
			result = Option.Some((js.Env.typeOf(s.borderRadius) == "string" || js.Env.typeOf(s.MozBorderRadius) == "string" || js.Env.typeOf(s.WebkitBorderRadius) == "string" || js.Env.typeOf(s.KhtmlBorderRadius) == "string"));
		}
		return result;
	});
}
js.detect.BrowserSupport.elemenChildrenReturnsElementNodes = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("elemenChildrenReturnsElementNodes",function(v) {
		var isSupported = Option.None;
		var docEl = js.Env.document.documentElement;
		if($closure(js.Env.document,"createElement") != null && js.Env.isDefined(docEl.children)) {
			var el = js.Env.document.createElement("div");
			el.innerHTML = "<div><p>a</p></div>b<!-- x -->";
			isSupported = Option.Some((el.children && el.children.length == 1 && el.children[0] && el.children[0].tagName && el.children[0].tagName.toUpperCase() == "DIV"));
		}
		return isSupported;
	});
}
js.detect.BrowserSupport.isCanvasSupported = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("isCanvasSupported",function(v) {
		var result = Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var elCanvas = js.Env.document.createElement("canvas");
			result = Option.Some(!!(elCanvas != null && elCanvas.getContext != null && elCanvas.getContext("2d") != null));
		}
		return result;
	});
}
js.detect.BrowserSupport.positionFixed = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("positionFixed",function(v) {
		var isSupported = Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var el = js.Env.document.createElement("div");
			if(el != null && el.style != null) {
				el.style.position = "fixed";
				el.style.top = "-10px";
				var root = js.Env.document.body;
				if(root != null) {
					root.appendChild(el);
					isSupported = Option.Some(el.offsetTop == -10);
					root.removeChild(el);
				}
			}
		}
		return isSupported;
	});
}
js.detect.BrowserSupport.isCssEnabled = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("isCssEnabled",function(v) {
		var isSupported = Option.None;
		var body = js.Env.document.body;
		if($closure(js.Env.document,"createElement") != null && body != null && $closure(body,"appendChild") != null && $closure(body,"removeChild") != null) {
			var el = js.Env.document.createElement("div");
			if(el != null && el.style != null) {
				el.style.display = "none";
				body.appendChild(el);
				isSupported = Option.Some(el.offsetWidth == 0);
				body.removeChild(el);
			}
		}
		return isSupported;
	});
}
js.detect.BrowserSupport.isQuirksMode = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("isQuirksMode",function(v) {
		var result = Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var el = js.Env.document.createElement("div");
			if(el != null && el.style != null) {
				var style = el.style;
				style.width = "1";
			}
			var style = el.style;
			result = Option.Some(style.width == "1px");
		}
		return result;
	});
}
js.detect.BrowserSupport.isContainsBuggy = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("isContainsBuggy",function(v) {
		var result = Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var el1 = js.Env.document.createElement("div"), el2 = js.Env.document.createElement("div");
			if(el1 != null && el2 != null && js.Env.isDefined(el1.contains)) {
				result = Option.Some(el1.contains(el2));
			}
		}
		return result;
	});
}
js.detect.BrowserSupport.isActivexEnabled = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("isActivexEnabled",function(v) {
		var result = Option.Some(false);
		if(window.ActiveXObject) {
			var xmlVersions = ["Microsoft.XMLHTTP","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP.4.0","Msxml2.XMLHTTP.5.0","Msxml2.XMLHTTP.6.0"];
			{
				var _g = 0;
				while(_g < xmlVersions.length) {
					var value = xmlVersions[_g];
					++_g;
					try {
						if(new ActiveXObject(value) != null) {
							result = Option.Some(true);
						}
					}
					catch( $e0 ) {
						{
							var ex = $e0;
							null;
						}
					}
				}
			}
			result = Option.Some(OptionExtensions.getOrElseC(result,false));
		}
		else null;
		return result;
	});
}
js.detect.BrowserSupport.typeofNodelistIsFunctionBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("typeofNodelistIsFunctionBug",function(v) {
		var result = Option.None;
		if(js.Env.document.forms != null) {
			result = Option.Some(js.Env.typeOf(js.Env.document.forms) == "function");
		}
		return result;
	});
}
js.detect.BrowserSupport.getElementsByTagNameReturnsCommentNodesBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("getElementsByTagNameReturnsCommentNodesBug",function(v) {
		var result = Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var el = js.Env.document.createElement("div");
			if(el != null && $closure(el,"getElementsByTagName") != null) {
				el.innerHTML = "<span>a</span><!--b-->";
				var all = el.getElementsByTagName("*");
				if(all.length != null) {
					var lastNode = el.getElementsByTagName("*")[1];
					result = Option.Some(!!(lastNode != null && lastNode.nodeType == 8));
				}
			}
		}
		return result;
	});
}
js.detect.BrowserSupport.setAttributeIgnoresNameAttributeBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("setAttributeIgnoresNameAttributeBug",function(v) {
		var result = Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var elForm = js.Env.document.createElement("form");
			var elInput = js.Env.document.createElement("input");
			var root = js.Env.document.documentElement;
			if(elForm != null && elInput != null && $closure(elInput,"setAttribute") != null && $closure(elForm,"appendChild") != null && root != null && $closure(root,"appendChild") != null && $closure(root,"removeChild") != null) {
				elInput.setAttribute("name","test");
				elForm.appendChild(elInput);
				root.appendChild(elForm);
				if(elForm.elements != null) {
					result = Option.Some(js.Env.typeOf(elForm.elements["test"]) == "undefined");
				}
				else {
					result = Option.Some(true);
				}
				root.removeChild(elForm);
			}
		}
		return result;
	});
}
js.detect.BrowserSupport.elementPropertiesAreAttributesBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("elementPropertiesAreAttributesBug",function(v) {
		var result = Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var el = js.Env.document.createElement("div");
			if(el != null && $closure(el,"getAttribute") != null) {
				el.__foo = 'bar';
				result = Option.Some(el.getAttribute("__foo") == "bar");
				el = null;
			}
		}
		return result;
	});
}
js.detect.BrowserSupport.isRegexpWhitespaceCharacterClassBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("isRegexpWhitespaceCharacterClassBug",function(v) {
		var result = Option.None;
		var str = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029';
		result = Option.Some(!/^\s+$/.test(str));
		return result;
	});
}
js.detect.BrowserSupport.isStringPrototypeSplitRegexpBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("isStringPrototypeSplitRegexpBug",function(v) {
		var s = "a_b";
		return Option.Some(s.split(/(_)/).length != 3);
	});
}
js.detect.BrowserSupport.preElementsIgnoreNewLinesBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("preElementsIgnoreNewLinesBug",function(v) {
		var result = Option.None;
		if($closure(js.Env.document,"createElement") != null && $closure(js.Env.document,"createTextNode") != null) {
			var el = js.Env.document.createElement("pre");
			var txt = js.Env.document.createTextNode("xx");
			var root = js.Env.document.documentElement;
			if(el != null && $closure(el,"appendChild") != null && txt != null && root != null && $closure(root,"appendChild") != null && $closure(root,"removeChild") != null) {
				el.appendChild(txt);
				root.appendChild(el);
				var initialHeight = el.offsetHeight;
				el.firstChild.nodeValue = "x\nx";
				var isIgnored = (el.offsetHeight == initialHeight);
				root.removeChild(el);
				el = txt = null;
				result = Option.Some(isIgnored);
			}
		}
		return result;
	});
}
js.detect.BrowserSupport.selectElementInnerHtmlBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("selectElementInnerHtmlBug",function(v) {
		var result = Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var el = js.Env.document.createElement("select");
			if(el != null) {
				el.innerHTML = "<option value=\"test\">test</option>";
				if(el.options != null && el.options[0] != null) {
					result = Option.Some(el.options[0].nodeName.toUpperCase() != "OPTION");
				}
				else null;
				el = null;
			}
		}
		return result;
	});
}
js.detect.BrowserSupport.tableElementInnerHtmlBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("tableElementInnerHtmlBug",function(v) {
		var result = Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			try {
				var el = js.Env.document.createElement("table");
				if(el != null && el.tBodies != null) {
					el.innerHTML = "<tbody><tr><td>test</td></tr></tbody>";
					result = Option.Some(js.Env.typeOf(el.tBodies[0]) == "undefined");
					el = null;
				}
			}
			catch( $e0 ) {
				{
					var e = $e0;
					{
						result = Option.Some(true);
					}
				}
			}
		}
		return result;
	});
}
js.detect.BrowserSupport.scriptElementRejectsTextNodeAppendingBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("scriptElementRejectsTextNodeAppendingBug",function(v) {
		var result = Option.None;
		if($closure(js.Env.document,"createElement") != null && $closure(js.Env.document,"createTextNode") != null) {
			var s = js.Env.document.createElement("script");
			if(s != null && $closure(s,"appendChild") != null) {
				try {
					s.appendChild(js.Env.document.createTextNode(""));
					result = Option.Some((s.firstChild == null) || (s.firstChild != null && s.firstChild.nodeType != 3));
				}
				catch( $e0 ) {
					{
						var e = $e0;
						{
							result = Option.Some(true);
						}
					}
				}
				s = null;
			}
		}
		return result;
	});
}
js.detect.BrowserSupport.documentGetElementByIdConfusesIdsWithNamesBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("documentGetElementByIdConfusesIdsWithNamesBug",function(v) {
		var result = Option.Some(false);
		if($closure(js.Env.document,"getElementsByTagName") != null && $closure(js.Env.document,"createElement") != null) {
			var num = Date.now().getTime();
			var name = "__test_" + num;
			var head = js.Env.document.getElementsByTagName("head")[0];
			var el;
			try {
				el = js.Env.document.createElement(("<input name=\"" + name) + "\">");
			}
			catch( $e0 ) {
				{
					var e = $e0;
					{
						el = js.Env.document.createElement("input");
						el.name = name;
					}
				}
			}
			if($closure(head,"appendChild") != null && $closure(head,"removeChild") != null) {
				head.appendChild(el);
				var testElement = js.Env.document.getElementById(name);
				result = Option.Some(!!((testElement != null) && (testElement.nodeName.toUpperCase() == "INPUT")));
				head.removeChild(el);
				el = null;
			}
		}
		return result;
	});
}
js.detect.BrowserSupport.documentGetElementByIdIgnoresCaseBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("documentGetElementByIdIgnoresCaseBug",function(v) {
		var result = Option.None;
		if($closure(js.Env.document,"createElement") != null && $closure(js.Env.document,"getElementsByTagName") != null && $closure(js.Env.document,"getElementById") != null) {
			var el = js.Env.document.createElement("script");
			var head = js.Env.document.getElementsByTagName("head")[0];
			if(el != null && head != null && $closure(head,"appendChild") != null && $closure(head,"removeChild") != null) {
				el.type = "text/javascript";
				el.id = "A";
				head.appendChild(el);
				result = Option.Some(!!(js.Env.document.getElementById("a") != null));
				head.removeChild(el);
				el = null;
			}
		}
		return result;
	});
}
js.detect.BrowserSupport.offsetValuesForStaticElementsInsidePositionedOnesBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("offsetValuesForStaticElementsInsidePositionedOnesBug",function(v) {
		var result = Option.None;
		var body = js.Env.document.body;
		if(body != null && $closure(body,"insertBefore") != null && $closure(js.Env.document,"createElement") != null && $closure(js.Env.document,"getElementById") != null) {
			var id = "x" + (Math.random() + "").substr(2);
			var clearance = "margin:0;padding:0;border:0;visibility:hidden;";
			var payload = (((((((((((("<div style=\"position:absolute;top:10px;" + clearance) + "\">") + "<div style=\"position:relative;top:10px;") + clearance) + "\">") + "<div style=\"height:10px;font-size:1px;") + clearance) + "\"></div>") + "<div id=\"") + id) + "\">x</div>") + "</div>") + "</div>";
			var wrapper = js.Env.document.createElement("div");
			if(wrapper != null) {
				wrapper.innerHTML = payload;
				body.insertBefore(wrapper,body.firstChild);
				var el = js.Env.document.getElementById(id);
				if(el != null && el.style != null) {
					if(el.offsetTop != 10) {
						el.style.position = "relative";
						if(el.offsetTop == 10) {
							result = Option.Some(true);
						}
					}
					else {
						result = Option.Some(false);
					}
				}
				body.removeChild(wrapper);
			}
			wrapper = null;
		}
		return result;
	});
}
js.detect.BrowserSupport.isDocumentGetElementsByNameBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("isDocumentGetElementsByNameBug",function(v) {
		var result = Option.None;
		var docEl = js.Env.document.documentElement;
		if(docEl != null && $closure(docEl,"appendChild") != null && $closure(docEl,"removeChild") != null && $closure(js.Env.document,"getElementsByName") != null && $closure(js.Env.document,"createElement") != null) {
			var el = js.Env.document.createElement("div");
			if(el != null) {
				var uid = "x" + (Math.random() + "").substr(2);
				el.id = uid;
				docEl.appendChild(el);
				result = Option.Some(js.Env.document.getElementsByName(uid)[0] == el);
				docEl.removeChild(el);
			}
		}
		return result;
	});
}
js.detect.BrowserSupport.isOverflowStyleBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("isOverflowStyleBug",function(v) {
		var result = Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var el = js.Env.document.createElement("div");
			el.innerHTML = "<p style=\"overflow: visible;\">x</p>";
			var firstChild = el.firstChild;
			if(firstChild != null && firstChild.style != null) {
				var style = firstChild.style;
				style.overflow = "hidden";
				result = Option.Some(style.overflow != "hidden");
			}
			el = null;
			firstChild = null;
		}
		return result;
	});
}
js.detect.BrowserSupport.isQuerySelectorAllBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("isQuerySelectorAllBug",function(v) {
		var result = Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var el = js.Env.document.createElement("div");
			if(el != null && (el.querySelectorAll != null)) {
				el.innerHTML = "<object><param name=\"\"></object>";
				result = Option.Some(el.querySelectorAll("param").length != 1);
			}
			el = null;
		}
		return result;
	});
}
js.detect.BrowserSupport.html5Audio = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5Audio",function(v) {
		var result = Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var el = js.Env.document.createElement("audio");
			result = Option.Some(!!el.canPlayType);
			el = null;
		}
		return result;
	});
}
js.detect.BrowserSupport.html5AudioInMP3Format = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5AudioInMP3Format",function(v) {
		return js.detect.BrowserSupport.canPlayType("audio","audio/mpeg;");
	});
}
js.detect.BrowserSupport.html5AudioInVorbisFormat = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5AudioInVorbisFormat",function(v) {
		return js.detect.BrowserSupport.canPlayType("audio","audio/ogg; codecs=\"vorbis\"");
	});
}
js.detect.BrowserSupport.html5AudioInWavFormat = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5AudioInWavFormat",function(v) {
		return js.detect.BrowserSupport.canPlayType("audio","audio/wav; codecs=\"1\"");
	});
}
js.detect.BrowserSupport.html5AudioInAACFormat = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5AudioInAACFormat",function(v) {
		return js.detect.BrowserSupport.canPlayType("audio","audio/mp4; codecs=\"mp4a.40.2\"");
	});
}
js.detect.BrowserSupport.canPlayType = function(element,format) {
	var result = Option.None;
	if($closure(js.Env.document,"createElement") != null) {
		var a = js.Env.document.createElement(element);
		result = Option.Some(!!(a.canPlayType && a.canPlayType(format).replace("no","") != ""));
		a = null;
	}
	return result;
}
js.detect.BrowserSupport.html5Canvas = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5Canvas",function(v) {
		var result = Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var a = js.Env.document.createElement("canvas");
			result = Option.Some(!!a.getContext);
			a = null;
		}
		return result;
	});
}
js.detect.BrowserSupport.html5CanvasTextAPI = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5CanvasTextAPI",function(v) {
		var result = Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var c = js.Env.document.createElement("canvas");
			result = Option.Some(c.getContext && js.Env.typeOf(c.getContext("2d").fillText) == "function");
			c = null;
		}
		return result;
	});
}
js.detect.BrowserSupport.html5Command = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5Command",function(v) {
		return js.detect.BrowserSupport.checIfExist("command","type");
	});
}
js.detect.BrowserSupport.html5Datalist = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5Datalist",function(v) {
		return js.detect.BrowserSupport.checIfExist("datalist","options");
	});
}
js.detect.BrowserSupport.html5Details = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5Details",function(v) {
		return js.detect.BrowserSupport.checIfExist("details","open");
	});
}
js.detect.BrowserSupport.html5Device = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5Device",function(v) {
		return js.detect.BrowserSupport.checIfExist("device","type");
	});
}
js.detect.BrowserSupport.html5FormConstraintValidation = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5FormConstraintValidation",function(v) {
		return js.detect.BrowserSupport.checIfExist("form","noValidate");
	});
}
js.detect.BrowserSupport.html5IframeSandbox = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5IframeSandbox",function(v) {
		return js.detect.BrowserSupport.checIfExist("iframe","sandbox");
	});
}
js.detect.BrowserSupport.html5IframeSrcdoc = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5IframeSrcdoc",function(v) {
		return js.detect.BrowserSupport.checIfExist("iframe","srcdoc");
	});
}
js.detect.BrowserSupport.html5InputAutofocus = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5InputAutofocus",function(v) {
		return js.detect.BrowserSupport.checIfExist("input","autofocus");
	});
}
js.detect.BrowserSupport.html5InputPlaceholder = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5InputPlaceholder",function(v) {
		return js.detect.BrowserSupport.checIfExist("input","placeholder");
	});
}
js.detect.BrowserSupport.html5InputTypeColor = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5InputTypeColor",function(v) {
		return js.detect.BrowserSupport.checIputTypeProperty("color");
	});
}
js.detect.BrowserSupport.html5InputTypeEmail = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5InputTypeEmail",function(v) {
		return js.detect.BrowserSupport.checIputTypeProperty("email");
	});
}
js.detect.BrowserSupport.html5InputTypeNumber = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5InputTypeNumber",function(v) {
		return js.detect.BrowserSupport.checIputTypeProperty("range");
	});
}
js.detect.BrowserSupport.html5InputTypeRange = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5InputTypeRange",function(v) {
		return js.detect.BrowserSupport.checIputTypeProperty("color");
	});
}
js.detect.BrowserSupport.html5InputTypeSearch = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5InputTypeSearch",function(v) {
		return js.detect.BrowserSupport.checIputTypeProperty("search");
	});
}
js.detect.BrowserSupport.html5InputTypeTel = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5InputTypeTel",function(v) {
		return js.detect.BrowserSupport.checIputTypeProperty("tel");
	});
}
js.detect.BrowserSupport.html5InputTypeUrl = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5InputTypeUrl",function(v) {
		return js.detect.BrowserSupport.checIputTypeProperty("url");
	});
}
js.detect.BrowserSupport.html5InputTypeDate = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5InputTypeDate",function(v) {
		return js.detect.BrowserSupport.checIputTypeProperty("date");
	});
}
js.detect.BrowserSupport.html5InputTypeTime = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5InputTypeTime",function(v) {
		return js.detect.BrowserSupport.checIputTypeProperty("time");
	});
}
js.detect.BrowserSupport.html5InputTypeDatetime = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5InputTypeDatetime",function(v) {
		return js.detect.BrowserSupport.checIputTypeProperty("datetime");
	});
}
js.detect.BrowserSupport.html5InputTypeDatetimeLocal = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5InputTypeDatetimeLocal",function(v) {
		return js.detect.BrowserSupport.checIputTypeProperty("datetime-local");
	});
}
js.detect.BrowserSupport.html5InputTypeWeek = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5InputTypeWeek",function(v) {
		return js.detect.BrowserSupport.checIputTypeProperty("week");
	});
}
js.detect.BrowserSupport.html5InputTypeMonth = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5InputTypeMonth",function(v) {
		return js.detect.BrowserSupport.checIputTypeProperty("month");
	});
}
js.detect.BrowserSupport.html5Meter = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5Meter",function(v) {
		return js.detect.BrowserSupport.checIfExist("meter","value");
	});
}
js.detect.BrowserSupport.html5Output = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5Output",function(v) {
		return js.detect.BrowserSupport.checIfExist("output","value");
	});
}
js.detect.BrowserSupport.html5Progress = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5Progress",function(v) {
		return js.detect.BrowserSupport.checIfExist("value","progress");
	});
}
js.detect.BrowserSupport.html5Time = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5Time",function(v) {
		return js.detect.BrowserSupport.checIfExist("time","valueAsDate");
	});
}
js.detect.BrowserSupport.html5Video = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5Video",function(v) {
		var result = Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var el = js.Env.document.createElement("video");
			result = Option.Some(!!el.canPlayType);
			el = null;
		}
		return result;
	});
}
js.detect.BrowserSupport.html5VideoCaptions = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5VideoCaptions",function(v) {
		return js.detect.BrowserSupport.checIfExist("track","track");
	});
}
js.detect.BrowserSupport.html5VideoPoster = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5VideoPoster",function(v) {
		return js.detect.BrowserSupport.checIfExist("track","poster");
	});
}
js.detect.BrowserSupport.checIfExist = function(elementName,property) {
	var result = Option.None;
	if($closure(js.Env.document,"createElement") != null) {
		var c = js.Env.document.createElement(elementName);
		result = Option.Some(js.Env.typeOf(c[property]) != "undefined");
		c = null;
	}
	return result;
}
js.detect.BrowserSupport.checIputTypeProperty = function(type) {
	var result = Option.None;
	if($closure(js.Env.document,"createElement") != null) {
		var i = js.Env.document.createElement("input");
		i.setAttribute("type",type);
		result = Option.Some(i.type != "text");
		i = null;
	}
	return result;
}
js.detect.BrowserSupport.html5VidouInWebMFormat = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5VidouInWebMFormat",function(v) {
		return js.detect.BrowserSupport.canPlayType("video","video/webm; codecs=\"vp8, vorbis\"");
	});
}
js.detect.BrowserSupport.html5VidouInH264Format = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5VidouInH264Format",function(v) {
		return js.detect.BrowserSupport.canPlayType("video","video/mp4; codecs=\"avc1.42E01E, mp4a.40.2\"");
	});
}
js.detect.BrowserSupport.html5VidouInTheoraFormat = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5VidouInTheoraFormat",function(v) {
		return js.detect.BrowserSupport.canPlayType("video","video/ogg; codecs=\"theora, vorbis\"");
	});
}
js.detect.BrowserSupport.html5ContentEditable = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5ContentEditable",function(v) {
		return js.detect.BrowserSupport.checIfExist("span","isContentEditable");
	});
}
js.detect.BrowserSupport.html5CrossDocumentMessaging = function() {
	return js.Env.isDefined($closure(js.Env.window,"postMessage"));
}
js.detect.BrowserSupport.html5DragAndDrop = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5DragAndDrop",function(v) {
		return js.detect.BrowserSupport.checIfExist("span","draggable");
	});
}
js.detect.BrowserSupport.html5FileApi = function() {
	try {
		return js.Env.isDefined(FileReader);
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				return false;
			}
		}
	}
}
js.detect.BrowserSupport.html5Geolocation = function() {
	return js.Env.isDefined(js.Env.navigator.geolocation);
}
js.detect.BrowserSupport.html5History = function() {
	return (js.Env.isDefined(js.Env.window.history) && js.Env.isDefined($closure(js.Env.window.history,"pushState")) && js.Env.isDefined(js.Env.window.history.popState));
}
js.detect.BrowserSupport.html5LocalStorage = function() {
	return ((js.Env.typeOf(js.Env.window["localStorage"]) != "undefined") && js.Env.window["localStorage"] != null);
}
js.detect.BrowserSupport.html5Microdata = function() {
	return js.Env.isDefined(js.Env.document.getItems);
}
js.detect.BrowserSupport.html5OfflineWebApplications = function() {
	return js.Env.isDefined(js.Env.window.applicationCache);
}
js.detect.BrowserSupport.html5ServerSentEvents = function() {
	try {
		return js.Env.isDefined(EventSource);
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				return false;
			}
		}
	}
}
js.detect.BrowserSupport.html5SessionStorage = function() {
	try {
		return ((js.Env.typeOf(js.Env.window["sessionStorage"]) != "undefined") && js.Env.window["sessionStorage"] != null);
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				return false;
			}
		}
	}
}
js.detect.BrowserSupport.html5SVG = function() {
	return ($closure(js.Env.document,"createElementNS") != null) && (js.Env.document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect != null);
}
js.detect.BrowserSupport.html5SVGInTextHtml = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5SVGInTextHtml",function(v) {
		var result = Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var e = js.Env.document.createElement("div");
			e.innerHTML = "<svg></svg>";
			result = Option.Some(!!((js.Env.window.SVGSVGElement != null) && (Std["is"](e.firstChild,js.Env.window.SVGSVGElement))));
			e = null;
		}
		return result;
	});
}
js.detect.BrowserSupport.html5WebSimpleDB = function() {
	return js.Env.isDefined(js.Env.window.indexedDB);
}
js.detect.BrowserSupport.html5WebSocket = function() {
	return js.Env.isDefined(js.Env.window.WebSocket);
}
js.detect.BrowserSupport.html5WebSQLDatabase = function() {
	return js.Env.isDefined(js.Env.window.openDatabase);
}
js.detect.BrowserSupport.html5WebWorkers = function() {
	return js.Env.isDefined(js.Env.window.Worker);
}
js.detect.BrowserSupport.html5Widgets = function() {
	try {
		return js.Env.isDefined(widget);
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				return false;
			}
		}
	}
}
js.detect.BrowserSupport.html5Undo = function() {
	try {
		return js.Env.isDefined(UndoManager);
	}
	catch( $e0 ) {
		{
			var e = $e0;
			{
				return false;
			}
		}
	}
}
js.detect.BrowserSupport.boxModel = function() {
	return js.detect.BrowserSupport.testSupportInBody("<div style=\"padding: 0; margin: 0; padding-left: 1px; width: 1px;\"></div>","div",function(e) {
		return e.offsetWidth == 2;
	});
}
js.detect.BrowserSupport.getAttributeStyle = function() {
	return js.detect.BrowserSupport.testSupport("<a style=\"color: black;\"></a>","a",function(e) {
		var styleAttribute = e.getAttribute("style");
		if(js.Env.typeOf(styleAttribute) == "string") {
			return StringExtensions.contains(styleAttribute,"black");
		}
		else if(js.Env.typeOf(styleAttribute) == "object") {
			var cssText = styleAttribute.cssText;
			return StringExtensions.contains(cssText,"black");
		}
		else {
			return false;
		}
	});
}
js.detect.BrowserSupport.opacity = function() {
	return js.detect.BrowserSupport.testSupport("<div></div>","div",function(e) {
		var filter = e.style.filter;
		return filter == null;
	});
}
js.detect.BrowserSupport.cssFloat = function() {
	return js.detect.BrowserSupport.testSupport("<div style=\"float:left\"></div>","div",function(e) {
		return e.style.cssFloat != null;
	});
}
js.detect.BrowserSupport.checkboxValueDefaultsToOn = function() {
	return js.detect.BrowserSupport.testSupport("<input type=\"checkbox\"/>","input",function(e) {
		var value = e.value;
		return OptionExtensions.getOrElseC(OptionExtensions.map(OptionExtensions.toOption(value),function(s) {
			return new EReg("on","i").match(s);
		}),false);
	});
}
js.detect.BrowserSupport.defaultSelectedHasSelectProperty = function() {
	return js.detect.BrowserSupport.testSupport("<select><option></select>","option",function(e) {
		return e.selected != null;
	});
}
js.detect.BrowserSupport.removedNodeHasNullParentNode = function() {
	return js.detect.BrowserSupport.testSupport("<div></div>","div",function(e) {
		return e.removeChild(e.appendChild(js.Env.document.createElement("div"))).parentNode == null;
	});
}
js.detect.BrowserSupport.getComputedStyle = function() {
	return js.Env.document.defaultView != null && $closure(js.Env.document.defaultView,"getComputedStyle") != null;
}
js.detect.BrowserSupport.offsetDoesNotIncludeMarginInBodyOffset = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("offsetDoesNotIncludeMarginInBodyOffset",function(v) {
		if(js.Env.document != null && js.Env.document.body != null) {
			return DynamicExtensions.into(js.Env.document.body,function(body) {
				var bodyMarginTop = OptionExtensions.getOrElseC(OptionExtensions.map(js.dom.Quirks.getComputedCssProperty(body,"margin-top"),function(s) {
					return StringExtensions.toInt(s,0);
				}),0);
				return Option.Some(body.offsetTop != bodyMarginTop);
			});
		}
		return Option.None;
	});
}
js.detect.BrowserSupport.spuriousTbodyInsertedBug = function() {
	return js.detect.BrowserSupport.testBug("<table></table>","tbody",function(e) {
		return true;
	},false);
}
js.detect.BrowserSupport.whitespaceDroppedWithInnerHTMLBug = function() {
	return js.detect.BrowserSupport.testBug("      <div></div>","div",function(e) {
		return e.previousSibling == null || e.previousSibling.nodeType != js.NodeType.TEXT_NODE;
	});
}
js.detect.BrowserSupport.linksDroppedWithInnerHTMLBug = function() {
	return js.detect.BrowserSupport.testBug("<link/>","link",function(e) {
		return false;
	});
}
js.detect.BrowserSupport.hrefIsNormalizedBug = function() {
	return js.detect.BrowserSupport.testBug("<a href=\"/a\" style=\"color: black;\"></a>","a",function(e) {
		return e.getAttribute("href") != "/a";
	});
}
js.detect.BrowserSupport.offsetDoesNotAddBorder = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("offsetDoesNotAddBorder",function(v) {
		if(js.Env.document != null && js.Env.document.body != null) {
			var container = DynamicExtensions.withEffect(js.Env.document.createElement("div"),function(container) {
				haxe.util.ObjectExtensions.extendWith(container.style,{ position : "absolute", top : 0, left : 0, margin : 0, border : 0, width : "1px", height : "1px", visibility : "hidden"});
				container.innerHTML = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div>";
			});
			return Option.Some(DynamicExtensions.into(js.Env.document.body,function(body) {
				body.insertBefore(container,body.firstChild);
				var checkDiv = container.firstChild.firstChild;
				return DynamicExtensions.withEffect((checkDiv.offsetTop != 5),function(_) {
					body.removeChild(container);
				});
			}));
		}
		return Option.None;
	});
}
js.detect.BrowserSupport.offsetAddsBorderForTableAndCells = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("offsetAddsBorderForTableAndCells",function(v) {
		if(js.Env.document != null && js.Env.document.body != null) {
			var container = DynamicExtensions.withEffect(js.Env.document.createElement("div"),function(container) {
				haxe.util.ObjectExtensions.extendWith(container.style,{ position : "absolute", top : 0, left : 0, margin : 0, border : 0, width : "1px", height : "1px", visibility : "hidden"});
				container.innerHTML = "<table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
			});
			return Option.Some(DynamicExtensions.into(js.Env.document.body,function(body) {
				body.insertBefore(container,body.firstChild);
				var td = container.getElementsByTagName("td")[0];
				return DynamicExtensions.withEffect((td.offsetTop == 5),function(_) {
					body.removeChild(container);
				});
			}));
		}
		return Option.None;
	});
}
js.detect.BrowserSupport.offsetSubtractsBorderForOverflowNotVisible = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("offsetSubtractsBorderForOverflowNotVisible",function(v) {
		if(js.Env.document != null && js.Env.document.body != null) {
			var container = DynamicExtensions.withEffect(js.Env.document.createElement("div"),function(container) {
				haxe.util.ObjectExtensions.extendWith(container.style,{ position : "absolute", top : 0, left : 0, margin : 0, border : 0, width : "1px", height : "1px", visibility : "hidden"});
				container.innerHTML = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div>";
			});
			return Option.Some(DynamicExtensions.into(js.Env.document.body,function(body) {
				body.insertBefore(container,body.firstChild);
				var innerDiv = container.firstChild;
				haxe.util.ObjectExtensions.extendWith(innerDiv.style,{ overflow : "hidden", position : "relative"});
				var checkDiv = innerDiv.firstChild;
				return DynamicExtensions.withEffect((checkDiv.offsetTop == -5),function(_) {
					body.removeChild(container);
				});
			}));
		}
		return Option.None;
	});
}
js.detect.BrowserSupport.testSupport = function(contents,tagName,f,def) {
	if(def == null) def = false;
	return js.detect.BrowserSupport.test(contents,tagName,f,true,def);
}
js.detect.BrowserSupport.testSupportInBody = function(contents,tagName,f,def) {
	if(def == null) def = false;
	return js.detect.BrowserSupport.testInBody(contents,tagName,f,true,def);
}
js.detect.BrowserSupport.testBug = function(contents,tagName,f,def) {
	if(def == null) def = true;
	return js.detect.BrowserSupport.test(contents,tagName,f,false,def);
}
js.detect.BrowserSupport.testBugInBody = function(contents,tagName,f,def) {
	if(def == null) def = true;
	return js.detect.BrowserSupport.testInBody(contents,tagName,f,false,def);
}
js.detect.BrowserSupport.test = function(contents,tagName,f,def1,def2) {
	return js.detect.BrowserSupport.testAndMemorize(("testInBody" + contents) + tagName,def1,function(v) {
		return (js.Env.document == null?Option.None:(function($this) {
			var $r;
			var div = js.Env.document.createElement("div");
			div.style.display = "none";
			div.innerHTML = contents;
			$r = Option.Some(OptionExtensions.getOrElseC(OptionExtensions.map(ArrayExtensions.firstOption(js.dom.DomCollectionExtensions.toArray(div.getElementsByTagName(tagName))),f),def2));
			return $r;
		}(this)));
	});
}
js.detect.BrowserSupport.testInBody = function(contents,tagName,f,def1,def2) {
	return js.detect.BrowserSupport.testAndMemorize(("testInBody" + contents) + tagName,def1,function(v) {
		return (js.Env.document == null || js.Env.document.body == null?Option.None:(function($this) {
			var $r;
			var div = js.Env.document.createElement("div");
			div.innerHTML = contents;
			js.Env.document.body.insertBefore(div,js.Env.document.body.firstChild);
			$r = Option.Some(DynamicExtensions.withEffect(OptionExtensions.getOrElseC(OptionExtensions.map(ArrayExtensions.firstOption(js.dom.DomCollectionExtensions.toArray(div.getElementsByTagName(tagName))),f),def2),function(_) {
				js.Env.document.body.removeChild(div);
				div.style.display = "none";
			}));
			return $r;
		}(this)));
	});
}
js.detect.BrowserSupport.testFeatureAndMemorize = function(key,testFunction) {
	return js.detect.BrowserSupport.testAndMemorize(key,true,testFunction);
}
js.detect.BrowserSupport.testBugAndMemorize = function(key,testFunction) {
	return js.detect.BrowserSupport.testAndMemorize(key,false,testFunction);
}
js.detect.BrowserSupport.testAndMemorize = function(key,defaultValue,testFunction) {
	return OptionExtensions.getOrElse(js.detect.BrowserSupport.memorized.get(key),function() {
		var result = testFunction.call();
		OptionExtensions.foreach(result,function(v) {
			js.detect.BrowserSupport.memorized = js.detect.BrowserSupport.memorized.set(key,v);
		});
		return OptionExtensions.getOrElseC(result,defaultValue);
	});
}
js.detect.BrowserSupport.prototype.__class__ = js.detect.BrowserSupport;
haxe.io.http.HttpJValueJsonpTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
haxe.io.http.HttpJValueJsonpTestCase.__name__ = ["haxe","io","http","HttpJValueJsonpTestCase"];
haxe.io.http.HttpJValueJsonpTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) haxe.io.http.HttpJValueJsonpTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
haxe.io.http.HttpJValueJsonpTestCase.prototype.before = function() {
	this.h = new haxe.io.http.HttpJValueJsonp();
}
haxe.io.http.HttpJValueJsonpTestCase.prototype.h = null;
haxe.io.http.HttpJValueJsonpTestCase.prototype.testGet = function() {
	haxe.test.Assert.delivered(this.h.get("http://search.twitter.com/search.json",DynamicExtensions.toMap({ q : "santa"})),function(data) {
		var results = haxe.text.json.JValueExtensions.get(OptionExtensions.get(data.body),"results");
		haxe.test.Assert.notNull(results,null,{ fileName : "HttpJValueJsonpTestCase.hx", lineNumber : 45, className : "haxe.io.http.HttpJValueJsonpTestCase", methodName : "testGet"});
	},4000);
}
haxe.io.http.HttpJValueJsonpTestCase.prototype.__class__ = haxe.io.http.HttpJValueJsonpTestCase;
haxe.framework.InjectorTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
haxe.framework.InjectorTestCase.__name__ = ["haxe","framework","InjectorTestCase"];
haxe.framework.InjectorTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) haxe.framework.InjectorTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
haxe.framework.InjectorTestCase.prototype.testClassInjectorOverridesPackageInjector = function() {
	haxe.framework.Injector.enter(function(c) {
		c.inPackage("haxe.framework").bind(haxe.time.Clock,haxe.time.MockClock);
		c.inClass(haxe.framework.InjectorTestCase).bind(haxe.time.Clock,haxe.time.SystemClock);
		haxe.test.Assert["is"](haxe.framework.Injector.inject(haxe.time.Clock,{ fileName : "InjectorTestCase.hx", lineNumber : 71, className : "haxe.framework.InjectorTestCase", methodName : "testClassInjectorOverridesPackageInjector"}),haxe.time.SystemClock,null,{ fileName : "InjectorTestCase.hx", lineNumber : 71, className : "haxe.framework.InjectorTestCase", methodName : "testClassInjectorOverridesPackageInjector"});
		return Unit.Unit;
	});
}
haxe.framework.InjectorTestCase.prototype.testGlobalInjector = function() {
	haxe.framework.Injector.enter(function(c) {
		c.bind(haxe.time.Clock,haxe.time.MockClock);
		haxe.test.Assert["is"](haxe.framework.Injector.inject(haxe.time.Clock,{ fileName : "InjectorTestCase.hx", lineNumber : 38, className : "haxe.framework.InjectorTestCase", methodName : "testGlobalInjector"}),haxe.time.MockClock,null,{ fileName : "InjectorTestCase.hx", lineNumber : 38, className : "haxe.framework.InjectorTestCase", methodName : "testGlobalInjector"});
		return Unit.Unit;
	});
}
haxe.framework.InjectorTestCase.prototype.testModuleInjectorOverridesPackageInjector = function() {
	haxe.framework.Injector.enter(function(c) {
		c.inPackage("haxe.framework").bind(haxe.time.Clock,haxe.time.MockClock);
		c.inModule("haxe.framework.InjectorTestCase").bind(haxe.time.Clock,haxe.time.SystemClock);
		haxe.test.Assert["is"](haxe.framework.Injector.inject(haxe.time.Clock,{ fileName : "InjectorTestCase.hx", lineNumber : 60, className : "haxe.framework.InjectorTestCase", methodName : "testModuleInjectorOverridesPackageInjector"}),haxe.time.SystemClock,null,{ fileName : "InjectorTestCase.hx", lineNumber : 60, className : "haxe.framework.InjectorTestCase", methodName : "testModuleInjectorOverridesPackageInjector"});
		return Unit.Unit;
	});
}
haxe.framework.InjectorTestCase.prototype.testOneToManyReturnsSameInstanceForEachInvocation = function() {
	haxe.framework.Injector.enter(function(c) {
		c.bind(haxe.time.Clock,haxe.time.MockClock,haxe.framework.BindingType.OneToMany);
		var i1 = haxe.framework.Injector.inject(haxe.time.Clock,{ fileName : "InjectorTestCase.hx", lineNumber : 94, className : "haxe.framework.InjectorTestCase", methodName : "testOneToManyReturnsSameInstanceForEachInvocation"});
		var i2 = haxe.framework.Injector.inject(haxe.time.Clock,{ fileName : "InjectorTestCase.hx", lineNumber : 95, className : "haxe.framework.InjectorTestCase", methodName : "testOneToManyReturnsSameInstanceForEachInvocation"});
		haxe.test.Assert.isTrue(i1 == i2,null,{ fileName : "InjectorTestCase.hx", lineNumber : 97, className : "haxe.framework.InjectorTestCase", methodName : "testOneToManyReturnsSameInstanceForEachInvocation"});
		return Unit.Unit;
	});
}
haxe.framework.InjectorTestCase.prototype.testOneToOneCreatesNewInstancesForEachInvocation = function() {
	haxe.framework.Injector.enter(function(c) {
		c.bind(haxe.time.Clock,haxe.time.MockClock,haxe.framework.BindingType.OneToOne);
		var i1 = haxe.framework.Injector.inject(haxe.time.Clock,{ fileName : "InjectorTestCase.hx", lineNumber : 81, className : "haxe.framework.InjectorTestCase", methodName : "testOneToOneCreatesNewInstancesForEachInvocation"});
		var i2 = haxe.framework.Injector.inject(haxe.time.Clock,{ fileName : "InjectorTestCase.hx", lineNumber : 82, className : "haxe.framework.InjectorTestCase", methodName : "testOneToOneCreatesNewInstancesForEachInvocation"});
		haxe.test.Assert.isTrue(i1 != i2,null,{ fileName : "InjectorTestCase.hx", lineNumber : 84, className : "haxe.framework.InjectorTestCase", methodName : "testOneToOneCreatesNewInstancesForEachInvocation"});
		return Unit.Unit;
	});
}
haxe.framework.InjectorTestCase.prototype.testPackageInjectorOverridesGlobalInjector = function() {
	haxe.framework.Injector.enter(function(c) {
		c.bind(haxe.time.Clock,haxe.time.MockClock);
		c.inPackage("haxe.framework").bind(haxe.time.Clock,haxe.time.SystemClock);
		haxe.test.Assert["is"](haxe.framework.Injector.inject(haxe.time.Clock,{ fileName : "InjectorTestCase.hx", lineNumber : 49, className : "haxe.framework.InjectorTestCase", methodName : "testPackageInjectorOverridesGlobalInjector"}),haxe.time.SystemClock,null,{ fileName : "InjectorTestCase.hx", lineNumber : 49, className : "haxe.framework.InjectorTestCase", methodName : "testPackageInjectorOverridesGlobalInjector"});
		return Unit.Unit;
	});
}
haxe.framework.InjectorTestCase.prototype.__class__ = haxe.framework.InjectorTestCase;
BoolExtensions = function() { }
BoolExtensions.__name__ = ["BoolExtensions"];
BoolExtensions.toInt = function(v) {
	return (v?1:0);
}
BoolExtensions.ifTrue = function(v,f) {
	return (v?Option.Some(f()):Option.None);
}
BoolExtensions.ifFalse = function(v,f) {
	return (!v?Option.Some(f()):Option.None);
}
BoolExtensions.ifElse = function(v,f1,f2) {
	return (v?f1():f2());
}
BoolExtensions.compare = function(v1,v2) {
	return (!v1 && v2?-1:(v1 && !v2?1:0));
}
BoolExtensions.equals = function(v1,v2) {
	return v1 == v2;
}
BoolExtensions.hashCode = function(v) {
	return (v?786433:393241);
}
BoolExtensions.toString = function(v) {
	return (v?"true":"false");
}
BoolExtensions.decompose = function(v) {
	return haxe.text.json.JValue.JBool(v);
}
BoolExtensions.extract = function(c,v) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 1:
		var v1 = $e[2];
		{
			$r = v1;
		}break;
		case 2:
		var v1 = $e[2];
		{
			$r = (v1 == 0.0?false:true);
		}break;
		case 3:
		var v1 = $e[2];
		{
			$r = StringExtensions.toBool(v1);
		}break;
		default:{
			$r = Stax.error("Expected Bool but found: " + v);
		}break;
		}
		return $r;
	}(this));
}
BoolExtensions.prototype.__class__ = BoolExtensions;
IntExtensions = function() { }
IntExtensions.__name__ = ["IntExtensions"];
IntExtensions.max = function(v1,v2) {
	return (v2 > v1?v2:v1);
}
IntExtensions.min = function(v1,v2) {
	return (v2 < v1?v2:v1);
}
IntExtensions.toBool = function(v) {
	return (v == 0?false:true);
}
IntExtensions.toFloat = function(v) {
	return v;
}
IntExtensions.to = function(start,end) {
	return { iterator : function() {
		var cur = start;
		return { hasNext : function() {
			return cur <= end;
		}, next : function() {
			var next = cur;
			++cur;
			return next;
		}}
	}}
}
IntExtensions.until = function(start,end) {
	return IntExtensions.to(start,end - 1);
}
IntExtensions.compare = function(v1,v2) {
	return v1 - v2;
}
IntExtensions.equals = function(v1,v2) {
	return v1 == v2;
}
IntExtensions.toString = function(v) {
	return "" + v;
}
IntExtensions.hashCode = function(v) {
	return v * 196613;
}
IntExtensions.decompose = function(v) {
	return haxe.text.json.JValue.JNumber(v);
}
IntExtensions.extract = function(c,v) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 2:
		var v1 = $e[2];
		{
			$r = FloatExtensions.toInt(v1);
		}break;
		case 3:
		var v1 = $e[2];
		{
			$r = StringExtensions.toInt(v1);
		}break;
		default:{
			$r = Stax.error("Expected Int but found: " + v);
		}break;
		}
		return $r;
	}(this));
}
IntExtensions.prototype.__class__ = IntExtensions;
StringExtensions = function() { }
StringExtensions.__name__ = ["StringExtensions"];
StringExtensions.toBool = function(v,d) {
	if(v == null) return d;
	var vLower = v.toLowerCase();
	return OptionExtensions.getOrElseC(((vLower == "false" || v == "0"?Option.Some(false):(vLower == "true" || v == "1"?Option.Some(true):Option.None))),d);
}
StringExtensions.toInt = function(v,d) {
	if(v == null) return d;
	return OptionExtensions.getOrElseC(OptionExtensions.filter(OptionExtensions.toOption(Std.parseInt(v)),function(i) {
		return !Math.isNaN(i);
	}),d);
}
StringExtensions.toFloat = function(v,d) {
	if(v == null) return d;
	return OptionExtensions.getOrElseC(OptionExtensions.filter(OptionExtensions.toOption(Std.parseFloat(v)),function(i) {
		return !Math.isNaN(i);
	}),d);
}
StringExtensions.startsWith = function(v,frag) {
	return (v.length >= frag.length && frag == v.substr(0,frag.length)?true:false);
}
StringExtensions.endsWith = function(v,frag) {
	return (v.length >= frag.length && frag == v.substr(v.length - frag.length)?true:false);
}
StringExtensions.urlEncode = function(v) {
	return StringTools.urlEncode(v);
}
StringExtensions.urlDecode = function(v) {
	return StringTools.urlDecode(v);
}
StringExtensions.htmlEscape = function(v) {
	return StringTools.htmlEscape(v);
}
StringExtensions.htmlUnescape = function(v) {
	return StringTools.htmlUnescape(v);
}
StringExtensions.trim = function(v) {
	return StringTools.trim(v);
}
StringExtensions.contains = function(v,s) {
	return v.indexOf(s) != -1;
}
StringExtensions.replace = function(s,sub,by) {
	return StringTools.replace(s,sub,by);
}
StringExtensions.compare = function(v1,v2) {
	return ((v1 == v2)?0:((v1 > v2?1:-1)));
}
StringExtensions.equals = function(v1,v2) {
	return v1 == v2;
}
StringExtensions.toString = function(v) {
	return v;
}
StringExtensions.hashCode = function(v) {
	var hash = 49157;
	{
		var _g1 = 0, _g = v.length;
		while(_g1 < _g) {
			var i = _g1++;
			hash += (24593 + v.cca(i)) * 49157;
		}
	}
	return hash;
}
StringExtensions.decompose = function(v) {
	return haxe.text.json.JValue.JString(v);
}
StringExtensions.extract = function(c,v) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 2:
		var v1 = $e[2];
		{
			$r = FloatExtensions.toString(v1);
		}break;
		case 1:
		var v1 = $e[2];
		{
			$r = BoolExtensions.toString(v1);
		}break;
		case 3:
		var v1 = $e[2];
		{
			$r = v1;
		}break;
		default:{
			$r = Stax.error("Expected String but found: " + v);
		}break;
		}
		return $r;
	}(this));
}
StringExtensions.prototype.__class__ = StringExtensions;
DateExtensions = function() { }
DateExtensions.__name__ = ["DateExtensions"];
DateExtensions.compare = function(v1,v2) {
	var diff = v1.getTime() - v2.getTime();
	return (diff < 0?-1:(diff > 0?1:0));
}
DateExtensions.equals = function(v1,v2) {
	return v1.getTime() == v2.getTime();
}
DateExtensions.toString = function(v) {
	return v.toString();
}
DateExtensions.hashCode = function(v) {
	return Math.round(v.getTime() * 49157);
}
DateExtensions.decompose = function(v) {
	return haxe.text.json.JValue.JNumber(v.getTime());
}
DateExtensions.extract = function(c,v) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 2:
		var v1 = $e[2];
		{
			$r = Date.fromTime(v1);
		}break;
		case 3:
		var v1 = $e[2];
		{
			$r = Date.fromTime(StringExtensions.toFloat(v1));
		}break;
		default:{
			$r = Stax.error("Expected Number but found: " + v);
		}break;
		}
		return $r;
	}(this));
}
DateExtensions.prototype.__class__ = DateExtensions;
ArrayExtensions = function() { }
ArrayExtensions.__name__ = ["ArrayExtensions"];
ArrayExtensions.sort = function(v) {
	return ArrayExtensions.sortWith(v,Stax.getOrderFor(v[0]));
}
ArrayExtensions.sortWith = function(v,order) {
	var r = v.copy();
	r.sort(order);
	return r;
}
ArrayExtensions.compare = function(v1,v2) {
	return ArrayExtensions.compareWith(v1,v2,Stax.getOrderFor(v1[0]));
}
ArrayExtensions.compareWith = function(v1,v2,order) {
	var c = v1.length - v2.length;
	if(c != 0) return c;
	if(v1.length == 0) return 0;
	{
		var _g1 = 0, _g = v1.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c1 = order(v1[i],v2[i]);
			if(c1 != 0) return c1;
		}
	}
	return 0;
}
ArrayExtensions.equals = function(v1,v2) {
	return ArrayExtensions.equalsWith(v1,v2,Stax.getEqualFor(v1[0]));
}
ArrayExtensions.equalsWith = function(v1,v2,equal) {
	if(v1.length != v2.length) return false;
	if(v1.length == 0) return true;
	{
		var _g1 = 0, _g = v1.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!equal(v1[i],v2[i])) return false;
		}
	}
	return true;
}
ArrayExtensions.toString = function(v) {
	return ArrayExtensions.toStringWith(v,Stax.getShowFor(v[0]));
}
ArrayExtensions.toStringWith = function(v,show) {
	return ("[" + ArrayExtensions.map(v,show).join(", ")) + "]";
}
ArrayExtensions.hashCode = function(v) {
	return ArrayExtensions.hashCodeWith(v,Stax.getHashFor(v[0]));
}
ArrayExtensions.hashCodeWith = function(v,hash) {
	var h = 12289;
	if(v.length == 0) return h;
	{
		var _g1 = 0, _g = v.length;
		while(_g1 < _g) {
			var i = _g1++;
			h += hash(v[i]) * 12289;
		}
	}
	return h;
}
ArrayExtensions.filter = function(a,f) {
	var n = [];
	{
		var _g = 0;
		while(_g < a.length) {
			var e = a[_g];
			++_g;
			if(f(e)) n.push(e);
		}
	}
	return n;
}
ArrayExtensions.size = function(a) {
	var count = 0;
	if(a != []) {
		{
			var _g = 0;
			while(_g < a.length) {
				var e = a[_g];
				++_g;
				++count;
			}
		}
	}
	return count;
}
ArrayExtensions.indexOf = function(a,t) {
	var index = 0;
	{
		var _g = 0;
		while(_g < a.length) {
			var e = a[_g];
			++_g;
			if(e == t) return index;
			++index;
		}
	}
	return -1;
}
ArrayExtensions.map = function(a,f) {
	var n = [];
	{
		var _g = 0;
		while(_g < a.length) {
			var e = a[_g];
			++_g;
			n.push(f(e));
		}
	}
	return n;
}
ArrayExtensions.flatMap = function(a,f) {
	var n = [];
	{
		var _g = 0;
		while(_g < a.length) {
			var e1 = a[_g];
			++_g;
			{ var $it0 = f(e1).iterator();
			while( $it0.hasNext() ) { var e2 = $it0.next();
			n.push(e2);
			}}
		}
	}
	return n;
}
ArrayExtensions.foldl = function(a,z,f) {
	var r = z;
	{
		var _g = 0;
		while(_g < a.length) {
			var e = a[_g];
			++_g;
			r = f(r,e);
		}
	}
	return r;
}
ArrayExtensions.foldr = function(a,z,f) {
	var r = z;
	{
		var _g1 = 0, _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			var e = a[(a.length - 1) - i];
			r = f(e,r);
		}
	}
	return r;
}
ArrayExtensions.zip = function(a,b) {
	var len = Math.floor(Math.min(a.length,b.length));
	var r = [];
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			r.push(Tuple2.create(a[i],b[i]));
		}
	}
	return r;
}
ArrayExtensions.append = function(a,t) {
	var copy = ArrayExtensions.snapshot(a);
	copy.push(t);
	return copy;
}
ArrayExtensions.snapshot = function(a) {
	return [].concat(a);
}
ArrayExtensions.first = function(a) {
	return a[0];
}
ArrayExtensions.firstOption = function(a) {
	return (a.length == 0?Option.None:Option.Some(a[0]));
}
ArrayExtensions.last = function(a) {
	return a[a.length - 1];
}
ArrayExtensions.lastOption = function(a) {
	return (a.length == 0?Option.None:Option.Some(a[a.length - 1]));
}
ArrayExtensions.contains = function(a,t) {
	{
		var _g = 0;
		while(_g < a.length) {
			var e = a[_g];
			++_g;
			if(t == e) return true;
		}
	}
	return false;
}
ArrayExtensions.foreach = function(a,f) {
	{
		var _g = 0;
		while(_g < a.length) {
			var e = a[_g];
			++_g;
			f(e);
		}
	}
	return a;
}
ArrayExtensions.take = function(a,n) {
	return a.slice(0,IntExtensions.min(n,a.length));
}
ArrayExtensions.takeWhile = function(a,p) {
	var r = [];
	{
		var _g = 0;
		while(_g < a.length) {
			var e = a[_g];
			++_g;
			if(p(e)) r.push(e);
			else break;
		}
	}
	return r;
}
ArrayExtensions.drop = function(a,n) {
	return (n >= a.length?[]:a.slice(n));
}
ArrayExtensions.dropWhile = function(a,p) {
	var r = [].concat(a);
	{
		var _g = 0;
		while(_g < a.length) {
			var e = a[_g];
			++_g;
			if(p(e)) r.shift();
			else break;
		}
	}
	return r;
}
ArrayExtensions.decompose = function(v) {
	return (ArrayExtensions.size(v) != 0?(function($this) {
		var $r;
		var d = haxe.data.transcode.TranscodeJValue.getDecomposerFor(Type["typeof"](v[0]));
		$r = haxe.text.json.JValue.JArray(ArrayExtensions.map(v,d));
		return $r;
	}(this)):haxe.text.json.JValue.JArray([]));
}
ArrayExtensions.extract = function(c,v,e) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 4:
		var v1 = $e[2];
		{
			$r = ArrayExtensions.map(v1,e);
		}break;
		default:{
			$r = Stax.error("Expected Array but was: " + v);
		}break;
		}
		return $r;
	}(this));
}
ArrayExtensions.prototype.__class__ = ArrayExtensions;
Function0Extensions = function() { }
Function0Extensions.__name__ = ["Function0Extensions"];
Function0Extensions.swallow = function(f) {
	return function() {
		try {
			f();
		}
		catch( $e0 ) {
			{
				var e = $e0;
				null;
			}
		}
	}
}
Function0Extensions.thenDo = function(f1,f2) {
	return function() {
		f1();
		f2();
	}
}
Function0Extensions.returning = function(f,thunk) {
	return function() {
		f();
		return thunk();
	}
}
Function0Extensions.returningC = function(f,value) {
	return Function0Extensions.returning(f,DynamicExtensions.toThunk(value));
}
Function0Extensions.promote = function(f) {
	return function(a) {
		return f();
	}
}
Function0Extensions.promoteEffect = function(f) {
	return function(a) {
		f();
	}
}
Function0Extensions.stage = function(f,before,after) {
	var state = before();
	var result = f();
	after(state);
	return result;
}
Function0Extensions.toEffect = function(f) {
	return function() {
		f();
	}
}
Function0Extensions.prototype.__class__ = Function0Extensions;
Function2Extensions = function() { }
Function2Extensions.__name__ = ["Function2Extensions"];
Function2Extensions.swallow = function(f) {
	return Function2Extensions.toEffect(Function2Extensions.swallowWith(f,null));
}
Function2Extensions.swallowWith = function(f,d) {
	return function(p1,p2) {
		try {
			return f(p1,p2);
		}
		catch( $e0 ) {
			{
				var e = $e0;
				null;
			}
		}
		return d;
	}
}
Function2Extensions.returning = function(f,thunk) {
	return function(p1,p2) {
		f(p1,p2);
		return thunk();
	}
}
Function2Extensions.returningC = function(f,value) {
	return Function2Extensions.returning(f,value.toThunk());
}
Function2Extensions.flip = function(f) {
	return function(p2,p1) {
		return f(p1,p2);
	}
}
Function2Extensions.curry = function(f) {
	return function(p1) {
		return function(p2) {
			return f(p1,p2);
		}
	}
}
Function2Extensions.uncurry = function(f) {
	return function(p1,p2) {
		return (f(p1))(p2);
	}
}
Function2Extensions.lazy = function(f,p1,p2) {
	var r = null;
	return function() {
		return (r == null?(function($this) {
			var $r;
			r = f(p1,p2);
			$r = r;
			return $r;
		}(this)):r);
	}
}
Function2Extensions.toEffect = function(f) {
	return function(p1,p2) {
		f(p1,p2);
	}
}
Function2Extensions.prototype.__class__ = Function2Extensions;
Function3Extensions = function() { }
Function3Extensions.__name__ = ["Function3Extensions"];
Function3Extensions.swallow = function(f) {
	return Function3Extensions.toEffect(Function3Extensions.swallowWith(f,null));
}
Function3Extensions.swallowWith = function(f,d) {
	return function(a,b,c) {
		try {
			return f(a,b,c);
		}
		catch( $e0 ) {
			{
				var e = $e0;
				null;
			}
		}
		return d;
	}
}
Function3Extensions.returning = function(f,thunk) {
	return function(p1,p2,p3) {
		f(p1,p2,p3);
		return thunk();
	}
}
Function3Extensions.returningC = function(f,value) {
	return Function3Extensions.returning(f,value.toThunk());
}
Function3Extensions.curry = function(f) {
	return function(p1) {
		return function(p2) {
			return function(p3) {
				return f(p1,p2,p3);
			}
		}
	}
}
Function3Extensions.uncurry = function(f) {
	return function(p1,p2,p3) {
		return ((f(p1))(p2))(p3);
	}
}
Function3Extensions.lazy = function(f,p1,p2,p3) {
	var r = null;
	return function() {
		return (r == null?(function($this) {
			var $r;
			r = f(p1,p2,p3);
			$r = r;
			return $r;
		}(this)):r);
	}
}
Function3Extensions.toEffect = function(f) {
	return function(p1,p2,p3) {
		f(p1,p2,p3);
	}
}
Function3Extensions.prototype.__class__ = Function3Extensions;
Function4Extensions = function() { }
Function4Extensions.__name__ = ["Function4Extensions"];
Function4Extensions.swallow = function(f) {
	return Function4Extensions.toEffect(Function4Extensions.swallowWith(f,null));
}
Function4Extensions.swallowWith = function(f,def) {
	return function(a,b,c,d) {
		try {
			return f(a,b,c,d);
		}
		catch( $e0 ) {
			{
				var e = $e0;
				null;
			}
		}
		return def;
	}
}
Function4Extensions.returning = function(f,thunk) {
	return function(p1,p2,p3,p4) {
		f(p1,p2,p3,p4);
		return thunk();
	}
}
Function4Extensions.returningC = function(f,value) {
	return Function4Extensions.returning(f,value.toThunk());
}
Function4Extensions.curry = function(f) {
	return function(p1) {
		return function(p2) {
			return function(p3) {
				return function(p4) {
					return f(p1,p2,p3,p4);
				}
			}
		}
	}
}
Function4Extensions.uncurry = function(f) {
	return function(p1,p2,p3,p4) {
		return (((f(p1))(p2))(p3))(p4);
	}
}
Function4Extensions.lazy = function(f,p1,p2,p3,p4) {
	var r = null;
	return function() {
		return (r == null?(function($this) {
			var $r;
			r = f(p1,p2,p3,p4);
			$r = r;
			return $r;
		}(this)):r);
	}
}
Function4Extensions.toEffect = function(f) {
	return function(p1,p2,p3,p4) {
		f(p1,p2,p3,p4);
	}
}
Function4Extensions.prototype.__class__ = Function4Extensions;
Function5Extensions = function() { }
Function5Extensions.__name__ = ["Function5Extensions"];
Function5Extensions.swallow = function(f) {
	return Function5Extensions.toEffect(Function5Extensions.swallowWith(f,null));
}
Function5Extensions.swallowWith = function(f,def) {
	return function(a,b,c,d,e) {
		try {
			return f(a,b,c,d,e);
		}
		catch( $e0 ) {
			{
				var e1 = $e0;
				null;
			}
		}
		return def;
	}
}
Function5Extensions.returning = function(f,thunk) {
	return function(p1,p2,p3,p4,p5) {
		f(p1,p2,p3,p4,p5);
		return thunk();
	}
}
Function5Extensions.returningC = function(f,value) {
	return Function5Extensions.returning(f,value.toThunk());
}
Function5Extensions.curry = function(f) {
	return function(p1) {
		return function(p2) {
			return function(p3) {
				return function(p4) {
					return function(p5) {
						return f(p1,p2,p3,p4,p5);
					}
				}
			}
		}
	}
}
Function5Extensions.uncurry = function(f) {
	return function(p1,p2,p3,p4,p5) {
		return ((((f(p1))(p2))(p3))(p4))(p5);
	}
}
Function5Extensions.lazy = function(f,p1,p2,p3,p4,p5) {
	var r = null;
	return function() {
		return (r == null?(function($this) {
			var $r;
			r = f(p1,p2,p3,p4,p5);
			$r = r;
			return $r;
		}(this)):r);
	}
}
Function5Extensions.toEffect = function(f) {
	return function(p1,p2,p3,p4,p5) {
		f(p1,p2,p3,p4,p5);
	}
}
Function5Extensions.prototype.__class__ = Function5Extensions;
OptionExtensions = function() { }
OptionExtensions.__name__ = ["OptionExtensions"];
OptionExtensions.toOption = function(t) {
	return (t == null?Option.None:Option.Some(t));
}
OptionExtensions.toArray = function(o) {
	return (function($this) {
		var $r;
		var $e = (o);
		switch( $e[1] ) {
		case 0:
		{
			$r = [];
		}break;
		case 1:
		var v = $e[2];
		{
			$r = [v];
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
OptionExtensions.map = function(o,f) {
	return (function($this) {
		var $r;
		var $e = (o);
		switch( $e[1] ) {
		case 0:
		{
			$r = Option.None;
		}break;
		case 1:
		var v = $e[2];
		{
			$r = Option.Some(f(v));
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
OptionExtensions.foreach = function(o,f) {
	return (function($this) {
		var $r;
		var $e = (o);
		switch( $e[1] ) {
		case 0:
		{
			$r = null;
		}break;
		case 1:
		var v = $e[2];
		{
			$r = f(v);
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
OptionExtensions.filter = function(o,f) {
	return (function($this) {
		var $r;
		var $e = (o);
		switch( $e[1] ) {
		case 0:
		{
			$r = Option.None;
		}break;
		case 1:
		var v = $e[2];
		{
			$r = (f(v)?Option.Some(v):Option.None);
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
OptionExtensions.flatMap = function(o,f) {
	return OptionExtensions.flatten(OptionExtensions.map(o,f));
}
OptionExtensions.flatten = function(o1) {
	return (function($this) {
		var $r;
		var $e = (o1);
		switch( $e[1] ) {
		case 0:
		{
			$r = Option.None;
		}break;
		case 1:
		var o2 = $e[2];
		{
			$r = o2;
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
OptionExtensions.zip = function(o1,o2) {
	return (function($this) {
		var $r;
		var $e = (o1);
		switch( $e[1] ) {
		case 0:
		{
			$r = Option.None;
		}break;
		case 1:
		var v1 = $e[2];
		{
			$r = (function($this) {
				var $r;
				var $e = (o2);
				switch( $e[1] ) {
				case 0:
				{
					$r = Option.None;
				}break;
				case 1:
				var v2 = $e[2];
				{
					$r = Option.Some(DynamicExtensions.entuple(v1,v2));
				}break;
				default:{
					$r = null;
				}break;
				}
				return $r;
			}($this));
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
OptionExtensions.get = function(o) {
	return (function($this) {
		var $r;
		var $e = (o);
		switch( $e[1] ) {
		case 0:
		{
			$r = Stax.error("Error: Option is empty");
		}break;
		case 1:
		var v = $e[2];
		{
			$r = v;
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
OptionExtensions.orElse = function(o1,thunk) {
	return (function($this) {
		var $r;
		var $e = (o1);
		switch( $e[1] ) {
		case 0:
		{
			$r = thunk();
		}break;
		case 1:
		var v = $e[2];
		{
			$r = o1;
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
OptionExtensions.orElseC = function(o1,o2) {
	return OptionExtensions.orElse(o1,DynamicExtensions.toThunk(o2));
}
OptionExtensions.orEither = function(o1,thunk) {
	return (function($this) {
		var $r;
		var $e = (o1);
		switch( $e[1] ) {
		case 0:
		{
			$r = EitherExtensions.toRight(thunk());
		}break;
		case 1:
		var v = $e[2];
		{
			$r = EitherExtensions.toLeft(v);
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
OptionExtensions.orEitherC = function(o1,c) {
	return OptionExtensions.orEither(o1,DynamicExtensions.toThunk(c));
}
OptionExtensions.getOrElse = function(o,thunk) {
	return (function($this) {
		var $r;
		var $e = (o);
		switch( $e[1] ) {
		case 0:
		{
			$r = thunk();
		}break;
		case 1:
		var v = $e[2];
		{
			$r = v;
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
OptionExtensions.getOrElseC = function(o,c) {
	return OptionExtensions.getOrElse(o,DynamicExtensions.toThunk(c));
}
OptionExtensions.isEmpty = function(o) {
	return (function($this) {
		var $r;
		var $e = (o);
		switch( $e[1] ) {
		case 0:
		{
			$r = true;
		}break;
		case 1:
		var v = $e[2];
		{
			$r = false;
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
OptionExtensions.decompose = function(v) {
	return OptionExtensions.getOrElse(OptionExtensions.map(v,function(v1) {
		return (haxe.data.transcode.TranscodeJValue.getDecomposerFor(Type["typeof"](v1)))(v1);
	}),DynamicExtensions.toThunk(haxe.text.json.JValue.JNull));
}
OptionExtensions.extract = function(c,v,e) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 0:
		{
			$r = Option.None;
		}break;
		default:{
			$r = Option.Some(e(v));
		}break;
		}
		return $r;
	}(this));
}
OptionExtensions.prototype.__class__ = OptionExtensions;
EitherExtensions = function() { }
EitherExtensions.__name__ = ["EitherExtensions"];
EitherExtensions.toLeft = function(v) {
	return Either.Left(v);
}
EitherExtensions.toRight = function(v) {
	return Either.Right(v);
}
EitherExtensions.flip = function(e) {
	return (function($this) {
		var $r;
		var $e = (e);
		switch( $e[1] ) {
		case 0:
		var v = $e[2];
		{
			$r = Either.Right(v);
		}break;
		case 1:
		var v = $e[2];
		{
			$r = Either.Left(v);
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
EitherExtensions.left = function(e) {
	return (function($this) {
		var $r;
		var $e = (e);
		switch( $e[1] ) {
		case 0:
		var v = $e[2];
		{
			$r = Option.Some(v);
		}break;
		default:{
			$r = Option.None;
		}break;
		}
		return $r;
	}(this));
}
EitherExtensions.isLeft = function(e) {
	return (function($this) {
		var $r;
		var $e = (e);
		switch( $e[1] ) {
		case 0:
		{
			$r = true;
		}break;
		case 1:
		{
			$r = false;
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
EitherExtensions.isRight = function(e) {
	return (function($this) {
		var $r;
		var $e = (e);
		switch( $e[1] ) {
		case 0:
		{
			$r = false;
		}break;
		case 1:
		{
			$r = true;
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
EitherExtensions.right = function(e) {
	return (function($this) {
		var $r;
		var $e = (e);
		switch( $e[1] ) {
		case 1:
		var v = $e[2];
		{
			$r = Option.Some(v);
		}break;
		default:{
			$r = Option.None;
		}break;
		}
		return $r;
	}(this));
}
EitherExtensions.get = function(e) {
	return (function($this) {
		var $r;
		var $e = (e);
		switch( $e[1] ) {
		case 0:
		var v = $e[2];
		{
			$r = v;
		}break;
		case 1:
		var v = $e[2];
		{
			$r = v;
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
EitherExtensions.mapLeft = function(e,f) {
	return (function($this) {
		var $r;
		var $e = (e);
		switch( $e[1] ) {
		case 0:
		var v = $e[2];
		{
			$r = Either.Left(f(v));
		}break;
		case 1:
		var v = $e[2];
		{
			$r = Either.Right(v);
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
EitherExtensions.map = function(e,f1,f2) {
	return (function($this) {
		var $r;
		var $e = (e);
		switch( $e[1] ) {
		case 0:
		var v = $e[2];
		{
			$r = Either.Left(f1(v));
		}break;
		case 1:
		var v = $e[2];
		{
			$r = Either.Right(f2(v));
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
EitherExtensions.mapRight = function(e,f) {
	return (function($this) {
		var $r;
		var $e = (e);
		switch( $e[1] ) {
		case 0:
		var v = $e[2];
		{
			$r = Either.Left(v);
		}break;
		case 1:
		var v = $e[2];
		{
			$r = Either.Right(f(v));
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
EitherExtensions.flatMap = function(e,f1,f2) {
	return (function($this) {
		var $r;
		var $e = (e);
		switch( $e[1] ) {
		case 0:
		var v = $e[2];
		{
			$r = f1(v);
		}break;
		case 1:
		var v = $e[2];
		{
			$r = f2(v);
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
EitherExtensions.composeLeft = function(e1,e2,ac,bc) {
	return (function($this) {
		var $r;
		var $e = (e1);
		switch( $e[1] ) {
		case 0:
		var v1 = $e[2];
		{
			$r = (function($this) {
				var $r;
				var $e = (e2);
				switch( $e[1] ) {
				case 0:
				var v2 = $e[2];
				{
					$r = Either.Left(ac(v1,v2));
				}break;
				case 1:
				var v2 = $e[2];
				{
					$r = Either.Left(v1);
				}break;
				default:{
					$r = null;
				}break;
				}
				return $r;
			}($this));
		}break;
		case 1:
		var v1 = $e[2];
		{
			$r = (function($this) {
				var $r;
				var $e = (e2);
				switch( $e[1] ) {
				case 0:
				var v2 = $e[2];
				{
					$r = Either.Left(v2);
				}break;
				case 1:
				var v2 = $e[2];
				{
					$r = Either.Right(bc(v1,v2));
				}break;
				default:{
					$r = null;
				}break;
				}
				return $r;
			}($this));
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
EitherExtensions.composeRight = function(e1,e2,ac,bc) {
	return (function($this) {
		var $r;
		var $e = (e1);
		switch( $e[1] ) {
		case 0:
		var v1 = $e[2];
		{
			$r = (function($this) {
				var $r;
				var $e = (e2);
				switch( $e[1] ) {
				case 0:
				var v2 = $e[2];
				{
					$r = Either.Left(ac(v1,v2));
				}break;
				case 1:
				var v2 = $e[2];
				{
					$r = Either.Right(v2);
				}break;
				default:{
					$r = null;
				}break;
				}
				return $r;
			}($this));
		}break;
		case 1:
		var v1 = $e[2];
		{
			$r = (function($this) {
				var $r;
				var $e = (e2);
				switch( $e[1] ) {
				case 0:
				var v2 = $e[2];
				{
					$r = Either.Right(v1);
				}break;
				case 1:
				var v2 = $e[2];
				{
					$r = Either.Right(bc(v1,v2));
				}break;
				default:{
					$r = null;
				}break;
				}
				return $r;
			}($this));
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
EitherExtensions.prototype.__class__ = EitherExtensions;
FutureExtensions = function() { }
FutureExtensions.__name__ = ["FutureExtensions"];
FutureExtensions.toFuture = function(t) {
	return Future.create().deliver(t);
}
FutureExtensions.prototype.__class__ = FutureExtensions;
IterableExtensions = function() { }
IterableExtensions.__name__ = ["IterableExtensions"];
IterableExtensions.toString = function(i,show,prefix,suffix,sep) {
	if(sep == null) sep = ", ";
	if(suffix == null) suffix = ")";
	if(prefix == null) prefix = "(";
	return IterableExtensions.mkString(i,show,prefix,suffix,sep);
}
IterableExtensions.mkString = function(i,show,prefix,suffix,sep) {
	if(sep == null) sep = ", ";
	if(suffix == null) suffix = ")";
	if(prefix == null) prefix = "(";
	if(show == null) show = $closure(Std,"string");
	var s = prefix;
	var isFirst = true;
	{ var $it0 = i.iterator();
	while( $it0.hasNext() ) { var t = $it0.next();
	{
		if(isFirst) isFirst = false;
		else s += sep;
		s += show(t);
	}
	}}
	return s + suffix;
}
IterableExtensions.toList = function(i) {
	return haxe.data.collections.List.create().addAll(i);
}
IterableExtensions.toSet = function(i) {
	return haxe.data.collections.Set.create().addAll(i);
}
IterableExtensions.toMap = function(i) {
	return haxe.data.collections.Map.create().addAll(i);
}
IterableExtensions.toArray = function(i) {
	var a = [];
	{ var $it0 = i.iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
	a.push(e);
	}}
	return a;
}
IterableExtensions.prototype.__class__ = IterableExtensions;
JValueExtensions = function() { }
JValueExtensions.__name__ = ["JValueExtensions"];
JValueExtensions.decompose = function(v) {
	return v;
}
JValueExtensions.extract = function(c,v) {
	return v;
}
JValueExtensions.prototype.__class__ = JValueExtensions;
haxe.data.collections.MapExtensions = function() { }
haxe.data.collections.MapExtensions.__name__ = ["haxe","data","collections","MapExtensions"];
haxe.data.collections.MapExtensions.toObject = function(map) {
	return map.foldl({ },function(object,tuple) {
		object[tuple._1] = tuple._2;
		return object;
	});
}
haxe.data.collections.MapExtensions.prototype.__class__ = haxe.data.collections.MapExtensions;
js.dom.HTMLElementExtensions = function() { }
js.dom.HTMLElementExtensions.__name__ = ["js","dom","HTMLElementExtensions"];
js.dom.HTMLElementExtensions.asIframe = function(e) {
	return OptionExtensions.get((e.nodeName == "IFRAME"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asScript = function(e) {
	return OptionExtensions.get((e.nodeName == "SCRIPT"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asDiv = function(e) {
	return OptionExtensions.get((e.nodeName == "DIV"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asForm = function(e) {
	return OptionExtensions.get((e.nodeName == "FORM"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asBody = function(e) {
	return OptionExtensions.get((e.nodeName == "BODY"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asStyle = function(e) {
	return OptionExtensions.get((e.nodeName == "STYLE"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asText = function(e) {
	return OptionExtensions.get((e.nodeName == "TEXT"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asVideo = function(e) {
	return OptionExtensions.get((e.nodeName == "VIDEO"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asAudio = function(e) {
	return OptionExtensions.get((e.nodeName == "AUDIO"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asHead = function(e) {
	return OptionExtensions.get((e.nodeName == "HEAD"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asLink = function(e) {
	return OptionExtensions.get((e.nodeName == "LINK"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asTitle = function(e) {
	return OptionExtensions.get((e.nodeName == "TITLE"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asMeta = function(e) {
	return OptionExtensions.get((e.nodeName == "META"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asBase = function(e) {
	return OptionExtensions.get((e.nodeName == "BASE"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asIsIndex = function(e) {
	return OptionExtensions.get((e.nodeName == "ISINDEX"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asSelect = function(e) {
	return OptionExtensions.get((e.nodeName == "SELECT"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asCanvas = function(e) {
	return OptionExtensions.get((e.nodeName == "CANVAS"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asOptGroup = function(e) {
	return OptionExtensions.get((e.nodeName == "OPTGROUP"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asOption = function(e) {
	return OptionExtensions.get((e.nodeName == "OPTION"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asInput = function(e) {
	return OptionExtensions.get((e.nodeName == "INPUT"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asTextArea = function(e) {
	return OptionExtensions.get((e.nodeName == "TEXTAREA"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asButton = function(e) {
	return OptionExtensions.get((e.nodeName == "BUTTON"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asLabel = function(e) {
	return OptionExtensions.get((e.nodeName == "LABEL"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asFieldSet = function(e) {
	return OptionExtensions.get((e.nodeName == "FIELDSET"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asLegend = function(e) {
	return OptionExtensions.get((e.nodeName == "LEGEND"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asUList = function(e) {
	return OptionExtensions.get((e.nodeName == "UL"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asOList = function(e) {
	return OptionExtensions.get((e.nodeName == "OL"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asDList = function(e) {
	return OptionExtensions.get((e.nodeName == "DL"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asDir = function(e) {
	return OptionExtensions.get((e.nodeName == "DIR"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asMenu = function(e) {
	return OptionExtensions.get((e.nodeName == "MENU"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asLI = function(e) {
	return OptionExtensions.get((e.nodeName == "LI"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asP = function(e) {
	return OptionExtensions.get((e.nodeName == "P"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asH = function(e) {
	return OptionExtensions.get((e.nodeName == "H"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asQuote = function(e) {
	return OptionExtensions.get((e.nodeName == "QUOTE"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asPre = function(e) {
	return OptionExtensions.get((e.nodeName == "PRE"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asBR = function(e) {
	return OptionExtensions.get((e.nodeName == "BR"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asBaseFont = function(e) {
	return OptionExtensions.get((e.nodeName == "BASEFONT"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asFont = function(e) {
	return OptionExtensions.get((e.nodeName == "FONT"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asHR = function(e) {
	return OptionExtensions.get((e.nodeName == "HR"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asMod = function(e) {
	return OptionExtensions.get((e.nodeName == "MOD"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asA = function(e) {
	return OptionExtensions.get((e.nodeName == "A"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asImage = function(e) {
	return OptionExtensions.get((e.nodeName == "IMG"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asObject = function(e) {
	return OptionExtensions.get((e.nodeName == "OBJECT"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asParam = function(e) {
	return OptionExtensions.get((e.nodeName == "PARAM"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asApplet = function(e) {
	return OptionExtensions.get((e.nodeName == "APPLET"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asMap = function(e) {
	return OptionExtensions.get((e.nodeName == "MAP"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asArea = function(e) {
	return OptionExtensions.get((e.nodeName == "AREA"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asTable = function(e) {
	return OptionExtensions.get((e.nodeName == "TABLE"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asCaption = function(e) {
	return OptionExtensions.get((e.nodeName == "CAPTION"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asTD = function(e) {
	return OptionExtensions.get((e.nodeName == "TD"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asTHead = function(e) {
	return OptionExtensions.get((e.nodeName == "THEAD"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asTBody = function(e) {
	return OptionExtensions.get((e.nodeName == "TBODY"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asTFoot = function(e) {
	return OptionExtensions.get((e.nodeName == "TFOOT"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asTR = function(e) {
	return OptionExtensions.get((e.nodeName == "TR"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asFrameSet = function(e) {
	return OptionExtensions.get((e.nodeName == "FRAMESET"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asFrame = function(e) {
	return OptionExtensions.get((e.nodeName == "FRAME"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asIFrame = function(e) {
	return OptionExtensions.get((e.nodeName == "IFRAME"?Option.Some(e):Option.None));
}
js.dom.HTMLElementExtensions.asIframeOption = function(e) {
	return (e.nodeName == "IFRAME"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asScriptOption = function(e) {
	return (e.nodeName == "SCRIPT"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asDivOption = function(e) {
	return (e.nodeName == "DIV"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asFormOption = function(e) {
	return (e.nodeName == "FORM"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asBodyOption = function(e) {
	return (e.nodeName == "BODY"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asStyleOption = function(e) {
	return (e.nodeName == "STYLE"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asTextOption = function(e) {
	return (e.nodeName == "TEXT"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asVideoOption = function(e) {
	return (e.nodeName == "VIDEO"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asAudioOption = function(e) {
	return (e.nodeName == "AUDIO"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asHeadOption = function(e) {
	return (e.nodeName == "HEAD"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asLinkOption = function(e) {
	return (e.nodeName == "LINK"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asTitleOption = function(e) {
	return (e.nodeName == "TITLE"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asMetaOption = function(e) {
	return (e.nodeName == "META"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asBaseOption = function(e) {
	return (e.nodeName == "BASE"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asIsIndexOption = function(e) {
	return (e.nodeName == "ISINDEX"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asSelectOption = function(e) {
	return (e.nodeName == "SELECT"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asCanvasOption = function(e) {
	return (e.nodeName == "CANVAS"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asOptGroupOption = function(e) {
	return (e.nodeName == "OPTGROUP"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asOptionOption = function(e) {
	return (e.nodeName == "OPTION"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asInputOption = function(e) {
	return (e.nodeName == "INPUT"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asTextAreaOption = function(e) {
	return (e.nodeName == "TEXTAREA"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asButtonOption = function(e) {
	return (e.nodeName == "BUTTON"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asLabelOption = function(e) {
	return (e.nodeName == "LABEL"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asFieldSetOption = function(e) {
	return (e.nodeName == "FIELDSET"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asLegendOption = function(e) {
	return (e.nodeName == "LEGEND"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asUListOption = function(e) {
	return (e.nodeName == "UL"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asOListOption = function(e) {
	return (e.nodeName == "OL"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asDListOption = function(e) {
	return (e.nodeName == "DL"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asDirOption = function(e) {
	return (e.nodeName == "DIR"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asMenuOption = function(e) {
	return (e.nodeName == "MENU"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asLIOption = function(e) {
	return (e.nodeName == "LI"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asPOption = function(e) {
	return (e.nodeName == "P"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asHOption = function(e) {
	return (e.nodeName == "H"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asQuoteOption = function(e) {
	return (e.nodeName == "QUOTE"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asPreOption = function(e) {
	return (e.nodeName == "PRE"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asBROption = function(e) {
	return (e.nodeName == "BR"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asBaseFontOption = function(e) {
	return (e.nodeName == "BASEFONT"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asFontOption = function(e) {
	return (e.nodeName == "FONT"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asHROption = function(e) {
	return (e.nodeName == "HR"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asModOption = function(e) {
	return (e.nodeName == "MOD"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asAOption = function(e) {
	return (e.nodeName == "A"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asImageOption = function(e) {
	return (e.nodeName == "IMG"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asObjectOption = function(e) {
	return (e.nodeName == "OBJECT"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asParamOption = function(e) {
	return (e.nodeName == "PARAM"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asAppletOption = function(e) {
	return (e.nodeName == "APPLET"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asMapOption = function(e) {
	return (e.nodeName == "MAP"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asAreaOption = function(e) {
	return (e.nodeName == "AREA"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asTableOption = function(e) {
	return (e.nodeName == "TABLE"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asCaptionOption = function(e) {
	return (e.nodeName == "CAPTION"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asTDOption = function(e) {
	return (e.nodeName == "TD"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asTHeadOption = function(e) {
	return (e.nodeName == "THEAD"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asTBodyOption = function(e) {
	return (e.nodeName == "TBODY"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asTFootOption = function(e) {
	return (e.nodeName == "TFOOT"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asTROption = function(e) {
	return (e.nodeName == "TR"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asFrameSetOption = function(e) {
	return (e.nodeName == "FRAMESET"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asFrameOption = function(e) {
	return (e.nodeName == "FRAME"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.asIFrameOption = function(e) {
	return (e.nodeName == "IFRAME"?Option.Some(e):Option.None);
}
js.dom.HTMLElementExtensions.prototype.__class__ = js.dom.HTMLElementExtensions;
haxe.util.OrderExtensionsTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
haxe.util.OrderExtensionsTestCase.__name__ = ["haxe","util","OrderExtensionsTestCase"];
haxe.util.OrderExtensionsTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) haxe.util.OrderExtensionsTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
haxe.util.OrderExtensionsTestCase.prototype.testGreaterThan = function() {
	this.assertTrue((haxe.util.OrderExtension.greaterThan($closure(IntExtensions,"compare")))(2,1),null,{ fileName : "OrderExtensionsTestCase.hx", lineNumber : 27, className : "haxe.util.OrderExtensionsTestCase", methodName : "testGreaterThan"});
	this.assertFalse((haxe.util.OrderExtension.greaterThan($closure(IntExtensions,"compare")))(1,1),null,{ fileName : "OrderExtensionsTestCase.hx", lineNumber : 28, className : "haxe.util.OrderExtensionsTestCase", methodName : "testGreaterThan"});
	this.assertTrue((haxe.util.OrderExtension.greaterThanOrEqual($closure(IntExtensions,"compare")))(2,1),null,{ fileName : "OrderExtensionsTestCase.hx", lineNumber : 30, className : "haxe.util.OrderExtensionsTestCase", methodName : "testGreaterThan"});
	this.assertTrue((haxe.util.OrderExtension.greaterThanOrEqual($closure(IntExtensions,"compare")))(1,1),null,{ fileName : "OrderExtensionsTestCase.hx", lineNumber : 31, className : "haxe.util.OrderExtensionsTestCase", methodName : "testGreaterThan"});
	this.assertFalse((haxe.util.OrderExtension.greaterThanOrEqual($closure(IntExtensions,"compare")))(1,2),null,{ fileName : "OrderExtensionsTestCase.hx", lineNumber : 32, className : "haxe.util.OrderExtensionsTestCase", methodName : "testGreaterThan"});
	this.assertTrue((haxe.util.OrderExtension.lessThan($closure(IntExtensions,"compare")))(1,2),null,{ fileName : "OrderExtensionsTestCase.hx", lineNumber : 34, className : "haxe.util.OrderExtensionsTestCase", methodName : "testGreaterThan"});
	this.assertFalse((haxe.util.OrderExtension.lessThan($closure(IntExtensions,"compare")))(1,1),null,{ fileName : "OrderExtensionsTestCase.hx", lineNumber : 35, className : "haxe.util.OrderExtensionsTestCase", methodName : "testGreaterThan"});
	this.assertTrue((haxe.util.OrderExtension.lessThanOrEqual($closure(IntExtensions,"compare")))(1,2),null,{ fileName : "OrderExtensionsTestCase.hx", lineNumber : 37, className : "haxe.util.OrderExtensionsTestCase", methodName : "testGreaterThan"});
	this.assertTrue((haxe.util.OrderExtension.lessThanOrEqual($closure(IntExtensions,"compare")))(1,1),null,{ fileName : "OrderExtensionsTestCase.hx", lineNumber : 38, className : "haxe.util.OrderExtensionsTestCase", methodName : "testGreaterThan"});
	this.assertFalse((haxe.util.OrderExtension.lessThanOrEqual($closure(IntExtensions,"compare")))(2,1),null,{ fileName : "OrderExtensionsTestCase.hx", lineNumber : 39, className : "haxe.util.OrderExtensionsTestCase", methodName : "testGreaterThan"});
	this.assertTrue((haxe.util.OrderExtension.notEqual($closure(IntExtensions,"compare")))(2,1),null,{ fileName : "OrderExtensionsTestCase.hx", lineNumber : 41, className : "haxe.util.OrderExtensionsTestCase", methodName : "testGreaterThan"});
	this.assertTrue((haxe.util.OrderExtension.notEqual($closure(IntExtensions,"compare")))(1,2),null,{ fileName : "OrderExtensionsTestCase.hx", lineNumber : 42, className : "haxe.util.OrderExtensionsTestCase", methodName : "testGreaterThan"});
	this.assertFalse((haxe.util.OrderExtension.notEqual($closure(IntExtensions,"compare")))(1,1),null,{ fileName : "OrderExtensionsTestCase.hx", lineNumber : 43, className : "haxe.util.OrderExtensionsTestCase", methodName : "testGreaterThan"});
	this.assertTrue((haxe.util.OrderExtension.equal($closure(IntExtensions,"compare")))(1,1),null,{ fileName : "OrderExtensionsTestCase.hx", lineNumber : 45, className : "haxe.util.OrderExtensionsTestCase", methodName : "testGreaterThan"});
	this.assertFalse((haxe.util.OrderExtension.equal($closure(IntExtensions,"compare")))(1,2),null,{ fileName : "OrderExtensionsTestCase.hx", lineNumber : 46, className : "haxe.util.OrderExtensionsTestCase", methodName : "testGreaterThan"});
}
haxe.util.OrderExtensionsTestCase.prototype.__class__ = haxe.util.OrderExtensionsTestCase;
js.Env = function() { }
js.Env.__name__ = ["js","Env"];
js.Env.eq = function(a,b) {
	return (function(a, b) { return a === b; })(a,b);
}
js.Env.alert = function(a) {
	alert(Std.string(a));
}
js.Env.decodeURI = function(uri) {
	return decodeURI(uri);
}
js.Env.decodeURIComponent = function(uriComponent) {
	return decodeURIComponent(uriComponent);
}
js.Env.encodeURI = function(uri) {
	return encodeURI(uri);
}
js.Env.encodeURIComponent = function(uriComponent) {
	return encodeURIComponent(uriComponent);
}
js.Env.escape = function(string) {
	return escape(string);
}
js.Env.unescape = function(string) {
	return unescape(string);
}
js.Env.eval = function(string) {
	return eval(string);
}
js.Env.isFinite = function(number) {
	return isFinite(number);
}
js.Env.isNaN = function(number) {
	return isNaN(number);
}
js.Env.isDefined = function(d) {
	return js.Env.typeOf(d) != "undefined";
}
js.Env.isDefinedGlobal = function(s) {
	return (function(s){return typeof window[s] != "undefined";})(s);
}
js.Env.typeOf = function(d) {
	return typeof d;
}
js.Env.getElementsByClass = function(className,tag,elm) {
	var getFunc = 
      /*
        Developed by Robert Nyman, http://www.robertnyman.com
        Code/licensing: http://code.google.com/p/getelementsbyclassname/
      */  
      function (className, tag, elm){
        if (document.getElementsByClassName) {
          getElementsByClassName = function (className, tag, elm) {
            elm = elm || document;
            var elements = elm.getElementsByClassName(className),
              nodeName = (tag)? new RegExp("\b" + tag + "\b", "i") : null,
              returnElements = [],
              current;
            for(var i=0, il=elements.length; i<il; i+=1){
              current = elements[i];
              if(!nodeName || nodeName.test(current.nodeName)) {
                returnElements.push(current);
              }
            }
            return returnElements;
          };
        }
        else if (document.evaluate) {
          getElementsByClassName = function (className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var space = " ";
            var classes = className.split(" "),
              classesToCheck = "",
              xhtmlNamespace = "http://www.w3.org/1999/xhtml",
              namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
              returnElements = [],
              elements,
              node;
            for(var j=0, jl=classes.length; j<jl; j+=1){
              classesToCheck += "[contains(concat(space, @class, space), (space + classes[j] + space))]";
            }
            try  {
              elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
            }
            catch (e) {
              elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
            }
            while ((node = elements.iterateNext())) {
              returnElements.push(node);
            }
            return returnElements;
          };
        }
        else {
          getElementsByClassName = function (className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
              classesToCheck = [],
              elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
              current,
              returnElements = [],
              match;
            for(var k=0, kl=classes.length; k<kl; k+=1){
              classesToCheck.push(new RegExp("(^|\s)" + classes[k] + "(\s|$)"));
            }
            for(var l=0, ll=elements.length; l<ll; l+=1){
              current = elements[l];
              match = false;
              for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
                match = classesToCheck[m].test(current.className);
                if (!match) {
                  break;
                }
              }
              if (match) {
                returnElements.push(current);
              }
            }
            return returnElements;
          };
        }
        return getElementsByClassName(className, tag, elm);
      };
    
    ;
	return getFunc(className,tag,elm);
}
js.Env.prototype.__class__ = js.Env;
js.XmlHttpRequestState = function() { }
js.XmlHttpRequestState.__name__ = ["js","XmlHttpRequestState"];
js.XmlHttpRequestState.prototype.__class__ = js.XmlHttpRequestState;
js.ExceptionCode = function() { }
js.ExceptionCode.__name__ = ["js","ExceptionCode"];
js.ExceptionCode.prototype.__class__ = js.ExceptionCode;
js.NodeType = function() { }
js.NodeType.__name__ = ["js","NodeType"];
js.NodeType.prototype.__class__ = js.NodeType;
js.DocumentPosition = function() { }
js.DocumentPosition.__name__ = ["js","DocumentPosition"];
js.DocumentPosition.prototype.__class__ = js.DocumentPosition;
js.DerivationMethod = function() { }
js.DerivationMethod.__name__ = ["js","DerivationMethod"];
js.DerivationMethod.prototype.__class__ = js.DerivationMethod;
js.OperationType = function() { }
js.OperationType.__name__ = ["js","OperationType"];
js.OperationType.prototype.__class__ = js.OperationType;
js.ErrorState = function() { }
js.ErrorState.__name__ = ["js","ErrorState"];
js.ErrorState.prototype.__class__ = js.ErrorState;
js.ReadyState = function() { }
js.ReadyState.__name__ = ["js","ReadyState"];
js.ReadyState.prototype.__class__ = js.ReadyState;
js.EventExceptionCode = function() { }
js.EventExceptionCode.__name__ = ["js","EventExceptionCode"];
js.EventExceptionCode.prototype.__class__ = js.EventExceptionCode;
js.DeltaModeCode = function() { }
js.DeltaModeCode.__name__ = ["js","DeltaModeCode"];
js.DeltaModeCode.prototype.__class__ = js.DeltaModeCode;
js.InputModeCode = function() { }
js.InputModeCode.__name__ = ["js","InputModeCode"];
js.InputModeCode.prototype.__class__ = js.InputModeCode;
js.KeyLocationCode = function() { }
js.KeyLocationCode.__name__ = ["js","KeyLocationCode"];
js.KeyLocationCode.prototype.__class__ = js.KeyLocationCode;
js.PhaseType = function() { }
js.PhaseType.__name__ = ["js","PhaseType"];
js.PhaseType.prototype.__class__ = js.PhaseType;
js.AttrChangeType = function() { }
js.AttrChangeType.__name__ = ["js","AttrChangeType"];
js.AttrChangeType.prototype.__class__ = js.AttrChangeType;
js.AcceptNodeConstants = function() { }
js.AcceptNodeConstants.__name__ = ["js","AcceptNodeConstants"];
js.AcceptNodeConstants.prototype.__class__ = js.AcceptNodeConstants;
js.WhatToShowConstants = function() { }
js.WhatToShowConstants.__name__ = ["js","WhatToShowConstants"];
js.WhatToShowConstants.prototype.__class__ = js.WhatToShowConstants;
js.RangeExceptionCode = function() { }
js.RangeExceptionCode.__name__ = ["js","RangeExceptionCode"];
js.RangeExceptionCode.prototype.__class__ = js.RangeExceptionCode;
js.CompareHow = function() { }
js.CompareHow.__name__ = ["js","CompareHow"];
js.CompareHow.prototype.__class__ = js.CompareHow;
js.RuleType = function() { }
js.RuleType.__name__ = ["js","RuleType"];
js.RuleType.prototype.__class__ = js.RuleType;
js.CSSValueType = function() { }
js.CSSValueType.__name__ = ["js","CSSValueType"];
js.CSSValueType.prototype.__class__ = js.CSSValueType;
js.PrimitiveType = function() { }
js.PrimitiveType.__name__ = ["js","PrimitiveType"];
js.PrimitiveType.prototype.__class__ = js.PrimitiveType;
js.UpdateStatus = function() { }
js.UpdateStatus.__name__ = ["js","UpdateStatus"];
js.UpdateStatus.prototype.__class__ = js.UpdateStatus;
js.ErrorSeverity = function() { }
js.ErrorSeverity.__name__ = ["js","ErrorSeverity"];
js.ErrorSeverity.prototype.__class__ = js.ErrorSeverity;
haxe.data.collections.ArrayExtensionsTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
haxe.data.collections.ArrayExtensionsTestCase.__name__ = ["haxe","data","collections","ArrayExtensionsTestCase"];
haxe.data.collections.ArrayExtensionsTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) haxe.data.collections.ArrayExtensionsTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
haxe.data.collections.ArrayExtensionsTestCase.prototype.testAppendAll = function() {
	this.assertEquals([1,2,3],haxe.data.collections.ArrayExtensions.appendAll([1],[2,3]),null,null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 79, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testAppendAll"});
}
haxe.data.collections.ArrayExtensionsTestCase.prototype.testCount = function() {
	this.assertEquals(3,haxe.data.collections.ArrayExtensions.count([1,2,3,4,5],function(v) {
		return v % 2 != 0;
	}),null,null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 51, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testCount"});
}
haxe.data.collections.ArrayExtensionsTestCase.prototype.testCountWhile = function() {
	this.assertEquals(2,haxe.data.collections.ArrayExtensions.count([1,2,3,4,5],function(v) {
		return v < 3;
	}),null,null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 55, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testCountWhile"});
}
haxe.data.collections.ArrayExtensionsTestCase.prototype.testExists = function() {
	this.assertFalse(haxe.data.collections.ArrayExtensions.exists([1,2,3],function(v) {
		return v == 4;
	}),null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 103, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testExists"});
	this.assertTrue(haxe.data.collections.ArrayExtensions.exists([1,2,3],function(v) {
		return v == 2;
	}),null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 104, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testExists"});
}
haxe.data.collections.ArrayExtensionsTestCase.prototype.testExistsP = function() {
	var f = function(v,ref) {
		return v == ref;
	}
	this.assertFalse(haxe.data.collections.ArrayExtensions.existsP([1,2,3],4,f),null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 109, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testExistsP"});
	this.assertTrue(haxe.data.collections.ArrayExtensions.existsP([1,2,3],2,f),null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 110, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testExistsP"});
}
haxe.data.collections.ArrayExtensionsTestCase.prototype.testFind = function() {
	this.assertEquals(Option.None,haxe.data.collections.ArrayExtensions.find([1,2,3],function(v) {
		return v == 4;
	}),null,null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 88, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testFind"});
	this.assertEquals(Option.Some(2),haxe.data.collections.ArrayExtensions.find([1,2,3],function(v) {
		return v == 2;
	}),null,null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 89, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testFind"});
}
haxe.data.collections.ArrayExtensionsTestCase.prototype.testFlatMapTo = function() {
	var r = haxe.data.collections.ArrayExtensions.flatMapTo(["2","3,4,5","6,7"],[1],function(v) {
		return ArrayExtensions.map(v.split(","),function(i) {
			return Std.parseInt(i);
		});
	});
	this.assertEquals([1,2,3,4,5,6,7],r,null,null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 47, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testFlatMapTo"});
}
haxe.data.collections.ArrayExtensionsTestCase.prototype.testForAll = function() {
	this.assertTrue(haxe.data.collections.ArrayExtensions.forAll([1,2,3],function(v) {
		return v < 4;
	}),null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 93, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testForAll"});
	this.assertFalse(haxe.data.collections.ArrayExtensions.forAll([1,2,3],function(v) {
		return v < 2;
	}),null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 94, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testForAll"});
}
haxe.data.collections.ArrayExtensionsTestCase.prototype.testForAny = function() {
	this.assertFalse(haxe.data.collections.ArrayExtensions.forAny([1,2,3],function(v) {
		return v > 3;
	}),null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 98, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testForAny"});
	this.assertTrue(haxe.data.collections.ArrayExtensions.forAny([1,2,3],function(v) {
		return v < 2;
	}),null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 99, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testForAny"});
}
haxe.data.collections.ArrayExtensionsTestCase.prototype.testIntersect = function() {
	this.assertEquals([2,3],haxe.data.collections.ArrayExtensions.intersect([1,2,3],[2,3,4,5]),null,null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 126, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testIntersect"});
}
haxe.data.collections.ArrayExtensionsTestCase.prototype.testIntersectBy = function() {
	this.assertEquals([2,3],haxe.data.collections.ArrayExtensions.intersectBy([1,2,3],[2,3,4,5],function(a,b) {
		return a == b;
	}),null,null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 122, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testIntersectBy"});
}
haxe.data.collections.ArrayExtensionsTestCase.prototype.testIsEmpty = function() {
	this.assertTrue(haxe.data.collections.ArrayExtensions.isEmpty([]),null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 83, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testIsEmpty"});
	this.assertFalse(haxe.data.collections.ArrayExtensions.isEmpty([1]),null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 84, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testIsEmpty"});
}
haxe.data.collections.ArrayExtensionsTestCase.prototype.testMapTo = function() {
	var r = haxe.data.collections.ArrayExtensions.mapTo([2,3],["1"],function(v) {
		return "" + v;
	});
	this.assertEquals(["1","2","3"],r,null,null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 40, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testMapTo"});
}
haxe.data.collections.ArrayExtensionsTestCase.prototype.testMkString = function() {
	this.assertEquals("A-B-C",haxe.data.collections.ArrayExtensions.mkString(["a","b","c"],"-",function(s) {
		return s.toUpperCase();
	}),null,null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 130, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testMkString"});
}
haxe.data.collections.ArrayExtensionsTestCase.prototype.testNub = function() {
	this.assertEquals([1,2,3],haxe.data.collections.ArrayExtensions.nubBy([1,2,2,3,1],function(a,b) {
		return a == b;
	}),null,null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 118, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testNub"});
}
haxe.data.collections.ArrayExtensionsTestCase.prototype.testNubBy = function() {
	this.assertEquals([1,2,3],haxe.data.collections.ArrayExtensions.nub([1,2,2,3,1]),null,null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 114, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testNubBy"});
}
haxe.data.collections.ArrayExtensionsTestCase.prototype.testPartition = function() {
	var t = haxe.data.collections.ArrayExtensions.partition([1,2,3,4,5,6],function(v) {
		return v % 2 != 0;
	});
	this.assertEquals(Tuple2.create([1,3,5],[2,4,6]),t,null,null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 30, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testPartition"});
}
haxe.data.collections.ArrayExtensionsTestCase.prototype.testPartitionWhile = function() {
	var t = haxe.data.collections.ArrayExtensions.partitionWhile([1,2,3,4,5,6],function(v) {
		return v < 4;
	});
	this.assertEquals(Tuple2.create([1,2,3],[4,5,6]),t,null,null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 35, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testPartitionWhile"});
}
haxe.data.collections.ArrayExtensionsTestCase.prototype.testScanl = function() {
	var r = haxe.data.collections.ArrayExtensions.scanl([1,2,3,4,5],1,function(a,b) {
		return a + b;
	});
	this.assertEquals([1,2,3,4,5,6],r,null,null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 60, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testScanl"});
}
haxe.data.collections.ArrayExtensionsTestCase.prototype.testScanl1 = function() {
	var r = haxe.data.collections.ArrayExtensions.scanl1([1,2,3,4,5],function(a,b) {
		return a + b;
	});
	this.assertEquals([1,3,4,5,6],r,null,null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 70, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testScanl1"});
}
haxe.data.collections.ArrayExtensionsTestCase.prototype.testScanr = function() {
	var r = haxe.data.collections.ArrayExtensions.scanr([1,2,3,4,5],1,function(a,b) {
		return a + b;
	});
	this.assertEquals([1,6,5,4,3,2],r,null,null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 65, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testScanr"});
}
haxe.data.collections.ArrayExtensionsTestCase.prototype.testScanr1 = function() {
	var r = haxe.data.collections.ArrayExtensions.scanr1([1,2,3,4,5],function(a,b) {
		return a + b;
	});
	this.assertEquals([5,9,8,7,6],r,null,null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 75, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testScanr1"});
}
haxe.data.collections.ArrayExtensionsTestCase.prototype.testToList = function() {
	var list = haxe.data.collections.ArrayExtensions.toList([1,2,3]);
	this.assertIs(list,haxe.data.collections.List,null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 141, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testToList"});
	this.assertEquals(3,list.size(),null,null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 142, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testToList"});
}
haxe.data.collections.ArrayExtensionsTestCase.prototype.testToMap = function() {
	var map = haxe.data.collections.ArrayExtensions.toMap([Tuple2.create("a",1),Tuple2.create("b",2)]);
	this.assertIs(map,haxe.data.collections.Map,null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 135, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testToMap"});
	this.assertEquals(2,map.size(),null,null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 136, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testToMap"});
}
haxe.data.collections.ArrayExtensionsTestCase.prototype.testToSet = function() {
	var set = haxe.data.collections.ArrayExtensions.toSet([1,2,2,3,1]);
	this.assertIs(set,haxe.data.collections.Set,null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 147, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testToSet"});
	this.assertEquals(3,set.size(),null,null,{ fileName : "ArrayExtensionsTestCase.hx", lineNumber : 148, className : "haxe.data.collections.ArrayExtensionsTestCase", methodName : "testToSet"});
}
haxe.data.collections.ArrayExtensionsTestCase.prototype.__class__ = haxe.data.collections.ArrayExtensionsTestCase;
Std = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	if(x < 0) return Math.ceil(x);
	return Math.floor(x);
}
Std.parseInt = function(x) {
	var v = parseInt(x);
	if(Math.isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
Std.prototype.__class__ = Std;
haxe.Timer = function(time_ms) { if( time_ms === $_ ) return; {
	this.id = haxe.Timer.arr.length;
	haxe.Timer.arr[this.id] = this;
	this.timerId = window.setInterval(("haxe.Timer.arr[" + this.id) + "].run();",time_ms);
}}
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	}
	return t;
}
haxe.Timer.stamp = function() {
	return Date.now().getTime() / 1000;
}
haxe.Timer.prototype.id = null;
haxe.Timer.prototype.run = function() {
	null;
}
haxe.Timer.prototype.stop = function() {
	if(this.id == null) return;
	window.clearInterval(this.timerId);
	haxe.Timer.arr[this.id] = null;
	if(this.id > 100 && this.id == haxe.Timer.arr.length - 1) {
		var p = this.id - 1;
		while(p >= 0 && haxe.Timer.arr[p] == null) p--;
		haxe.Timer.arr = haxe.Timer.arr.slice(0,p + 1);
	}
	this.id = null;
}
haxe.Timer.prototype.timerId = null;
haxe.Timer.prototype.__class__ = haxe.Timer;
js.dom.DomCollectionExtensions = function() { }
js.dom.DomCollectionExtensions.__name__ = ["js","dom","DomCollectionExtensions"];
js.dom.DomCollectionExtensions.toArray = function(c) {
	var a = [];
	{
		var _g1 = 0, _g = c.length;
		while(_g1 < _g) {
			var i = _g1++;
			a.push(c[i]);
		}
	}
	return a;
}
js.dom.DomCollectionExtensions.prototype.__class__ = js.dom.DomCollectionExtensions;
if(!haxe.rtti) haxe.rtti = {}
haxe.rtti.Meta = function() { }
haxe.rtti.Meta.__name__ = ["haxe","rtti","Meta"];
haxe.rtti.Meta.getType = function(t) {
	var meta = t.__meta__;
	return ((meta == null)?meta:meta.obj);
}
haxe.rtti.Meta.getStatics = function(t) {
	var meta = t.__meta__;
	return ((meta == null)?meta:meta.statics);
}
haxe.rtti.Meta.getFields = function(t) {
	var meta = t.__meta__;
	return ((meta == null)?meta:meta.fields);
}
haxe.rtti.Meta.prototype.__class__ = haxe.rtti.Meta;
haxe.data.transcode.JValueTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
haxe.data.transcode.JValueTestCase.__name__ = ["haxe","data","transcode","JValueTestCase"];
haxe.data.transcode.JValueTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) haxe.data.transcode.JValueTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
haxe.data.transcode.JValueTestCase.prototype.doTest = function(decomposer,extractor,values) {
	var eq = Stax.getEqualFor(values[0]);
	{
		var _g = 0;
		while(_g < values.length) {
			var value = values[_g];
			++_g;
			var actual = extractor(decomposer(value));
			var equal = eq(value,actual);
			if(!equal) {
				throw (("Expected " + value) + " but was ") + actual;
			}
			this.assertTrue(equal,null,{ fileName : "JValueTestCase.hx", lineNumber : 140, className : "haxe.data.transcode.JValueTestCase", methodName : "doTest"});
		}
	}
}
haxe.data.transcode.JValueTestCase.prototype.instanceDecompose = function(v) {
	return Reflect.field(v,"decompose").apply(v,[]);
}
haxe.data.transcode.JValueTestCase.prototype.testArray = function() {
	var a = [[123,9,-23],[]];
	this.doTest($closure(ArrayExtensions,"decompose"),function(v) {
		return ArrayExtensions.extract(Array,v,function(v1) {
			return IntExtensions.extract(Int,v1);
		});
	},a);
}
haxe.data.transcode.JValueTestCase.prototype.testBool = function() {
	this.doTest($closure(BoolExtensions,"decompose"),function(v) {
		return BoolExtensions.extract(Bool,v);
	},[true,false]);
}
haxe.data.transcode.JValueTestCase.prototype.testDate = function() {
	this.doTest($closure(DateExtensions,"decompose"),function(v) {
		return DateExtensions.extract(Date,v);
	},[Date.now(),Date.fromTime(0.0)]);
}
haxe.data.transcode.JValueTestCase.prototype.testFloat = function() {
	this.doTest($closure(FloatExtensions,"decompose"),function(v) {
		return FloatExtensions.extract(Float,v);
	},[0.25,0.5]);
}
haxe.data.transcode.JValueTestCase.prototype.testInt = function() {
	this.doTest($closure(IntExtensions,"decompose"),function(v) {
		return IntExtensions.extract(Int,v);
	},[-1234,9231]);
}
haxe.data.transcode.JValueTestCase.prototype.testJValue = function() {
	this.doTest($closure(JValueExtensions,"decompose"),function(v) {
		return JValueExtensions.extract(haxe.text.json.JValue,v);
	},[haxe.text.json.JValue.JNull,haxe.text.json.JValue.JString("foo"),haxe.text.json.JValue.JNumber(123.0),haxe.text.json.JValue.JBool(false),haxe.text.json.JValue.JObject([haxe.text.json.JValue.JField("foo",haxe.text.json.JValue.JString("bar"))]),haxe.text.json.JValue.JArray([haxe.text.json.JValue.JNull,haxe.text.json.JValue.JString("baz")])]);
}
haxe.data.transcode.JValueTestCase.prototype.testList = function() {
	var a = [haxe.data.collections.List.create().addAll([123,9,-23]),haxe.data.collections.List.create()];
	this.doTest($closure(this,"instanceDecompose"),function(v) {
		return haxe.data.collections.List.extract(v,function(v1) {
			return IntExtensions.extract(Int,v1);
		});
	},a);
}
haxe.data.transcode.JValueTestCase.prototype.testMap = function() {
	var a = [haxe.data.collections.Map.create().addAll([Tuple2.create(123,"foo"),Tuple2.create(-23,"bar"),Tuple2.create(0,"baz")]),haxe.data.collections.Map.create()];
	this.doTest($closure(this,"instanceDecompose"),function(v) {
		return haxe.data.collections.Map.extract(v,function(v1) {
			return IntExtensions.extract(Int,v1);
		},function(v1) {
			return StringExtensions.extract(String,v1);
		});
	},a);
}
haxe.data.transcode.JValueTestCase.prototype.testOption = function() {
	var a = [Option.Some(123),Option.None];
	this.doTest($closure(OptionExtensions,"decompose"),function(v) {
		return OptionExtensions.extract(Option,v,function(v1) {
			return IntExtensions.extract(Int,v1);
		});
	},a);
}
haxe.data.transcode.JValueTestCase.prototype.testSet = function() {
	var a = [haxe.data.collections.Set.create().addAll([123,9,-23]),haxe.data.collections.Set.create()];
	this.doTest($closure(this,"instanceDecompose"),function(v) {
		return haxe.data.collections.Set.extract(v,function(v1) {
			return IntExtensions.extract(Int,v1);
		});
	},a);
}
haxe.data.transcode.JValueTestCase.prototype.testString = function() {
	this.doTest($closure(StringExtensions,"decompose"),function(v) {
		return StringExtensions.extract(String,v);
	},["boo","baz"]);
}
haxe.data.transcode.JValueTestCase.prototype.testTuple2 = function() {
	var a = [Tuple2.create(123,"foo"),Tuple2.create(0,"bar")];
	this.doTest($closure(this,"instanceDecompose"),function(v) {
		return Tuple2.extract(v,function(v1) {
			return IntExtensions.extract(Int,v1);
		},function(v1) {
			return StringExtensions.extract(String,v1);
		});
	},a);
}
haxe.data.transcode.JValueTestCase.prototype.testTuple3 = function() {
	var a = [Tuple3.create(123,"foo",true),Tuple3.create(0,"bar",false)];
	this.doTest($closure(this,"instanceDecompose"),function(v) {
		return Tuple3.extract(v,function(v1) {
			return IntExtensions.extract(Int,v1);
		},function(v1) {
			return StringExtensions.extract(String,v1);
		},function(v1) {
			return BoolExtensions.extract(Bool,v1);
		});
	},a);
}
haxe.data.transcode.JValueTestCase.prototype.testTuple4 = function() {
	var a = [Tuple4.create(123,"foo",true,0.25),Tuple4.create(0,"bar",false,0.5)];
	this.doTest($closure(this,"instanceDecompose"),function(v) {
		return Tuple4.extract(v,function(v1) {
			return IntExtensions.extract(Int,v1);
		},function(v1) {
			return StringExtensions.extract(String,v1);
		},function(v1) {
			return BoolExtensions.extract(Bool,v1);
		},function(v1) {
			return FloatExtensions.extract(Float,v1);
		});
	},a);
}
haxe.data.transcode.JValueTestCase.prototype.testTuple5 = function() {
	var a = [Tuple5.create(123,"foo",true,0.25,"biz"),Tuple5.create(0,"bar",false,0.5,"bop")];
	this.doTest($closure(this,"instanceDecompose"),function(v) {
		return Tuple5.extract(v,function(v1) {
			return IntExtensions.extract(Int,v1);
		},function(v1) {
			return StringExtensions.extract(String,v1);
		},function(v1) {
			return BoolExtensions.extract(Bool,v1);
		},function(v1) {
			return FloatExtensions.extract(Float,v1);
		},function(v1) {
			return StringExtensions.extract(String,v1);
		});
	},a);
}
haxe.data.transcode.JValueTestCase.prototype.__class__ = haxe.data.transcode.JValueTestCase;
haxe.math.tween.Easings = function() { }
haxe.math.tween.Easings.__name__ = ["haxe","math","tween","Easings"];
haxe.math.tween.Easings.Linear = function(t) {
	return t;
}
haxe.math.tween.Easings.Quadratic = function(t) {
	return t * t;
}
haxe.math.tween.Easings.Cubic = function(t) {
	return (t * t) * t;
}
haxe.math.tween.Easings.Quartic = function(t) {
	var squared = t * t;
	return squared * squared;
}
haxe.math.tween.Easings.Quintic = function(t) {
	var squared = t * t;
	return (squared * squared) * t;
}
haxe.math.tween.Easings.prototype.__class__ = haxe.math.tween.Easings;
Unit = { __ename__ : ["Unit"], __constructs__ : ["Unit"] }
Unit.Unit = ["Unit",0];
Unit.Unit.toString = $estr;
Unit.Unit.__enum__ = Unit;
Option = { __ename__ : ["Option"], __constructs__ : ["None","Some"] }
Option.None = ["None",0];
Option.None.toString = $estr;
Option.None.__enum__ = Option;
Option.Some = function(v) { var $x = ["Some",1,v]; $x.__enum__ = Option; $x.toString = $estr; return $x; }
Either = { __ename__ : ["Either"], __constructs__ : ["Left","Right"] }
Either.Left = function(v) { var $x = ["Left",0,v]; $x.__enum__ = Either; $x.toString = $estr; return $x; }
Either.Right = function(v) { var $x = ["Right",1,v]; $x.__enum__ = Either; $x.toString = $estr; return $x; }
Future = function(p) { if( p === $_ ) return; {
	this._listeners = [];
	this._result = null;
	this._isSet = false;
	this._isCanceled = false;
	this._cancelers = [];
	this._canceled = [];
}}
Future.__name__ = ["Future"];
Future.dead = function() {
	return DynamicExtensions.withEffect(new Future(),function(future) {
		future.cancel();
	});
}
Future.create = function() {
	return new Future();
}
Future.prototype._canceled = null;
Future.prototype._cancelers = null;
Future.prototype._isCanceled = null;
Future.prototype._isSet = null;
Future.prototype._listeners = null;
Future.prototype._result = null;
Future.prototype.allowCancelOnlyIf = function(f) {
	if(!this.isDone()) this._cancelers.push(f);
	return this;
}
Future.prototype.cancel = function() {
	return (this.isDone()?false:(this.isCanceled()?true:(function($this) {
		var $r;
		var r = true;
		{
			var _g = 0, _g1 = $this._cancelers;
			while(_g < _g1.length) {
				var canceller = _g1[_g];
				++_g;
				r = r && canceller();
			}
		}
		if(r) {
			$this.forceCancel();
		}
		$r = r;
		return $r;
	}(this))));
}
Future.prototype.deliver = function(t) {
	return (this._isCanceled?this:(this._isSet?Stax.error("Future already delivered"):(function($this) {
		var $r;
		$this._result = t;
		$this._isSet = true;
		{
			var _g = 0, _g1 = $this._listeners;
			while(_g < _g1.length) {
				var l = _g1[_g];
				++_g;
				l($this._result);
			}
		}
		$this._listeners = [];
		$r = $this;
		return $r;
	}(this))));
}
Future.prototype.deliverTo = function(f) {
	if(this.isCanceled()) return this;
	else if(this.isDelivered()) f(this._result);
	else this._listeners.push(f);
	return this;
}
Future.prototype.filter = function(f) {
	var fut = new Future();
	this.deliverTo(function(t) {
		if(f(t)) fut.deliver(t);
		else fut.forceCancel();
	});
	this.ifCanceled(function() {
		fut.forceCancel();
	});
	return fut;
}
Future.prototype.flatMap = function(f) {
	var fut = new Future();
	this.deliverTo(function(t) {
		f(t).deliverTo(function(s) {
			fut.deliver(s);
		}).ifCanceled(function() {
			fut.forceCancel();
		});
	});
	this.ifCanceled(function() {
		fut.forceCancel();
	});
	return fut;
}
Future.prototype.forceCancel = function() {
	if(!this._isCanceled) {
		this._isCanceled = true;
		{
			var _g = 0, _g1 = this._canceled;
			while(_g < _g1.length) {
				var canceled = _g1[_g];
				++_g;
				canceled();
			}
		}
	}
	return this;
}
Future.prototype.ifCanceled = function(f) {
	if(this.isCanceled()) f();
	else if(!this.isDone()) this._canceled.push(f);
	return this;
}
Future.prototype.isCanceled = function() {
	return this._isCanceled;
}
Future.prototype.isDelivered = function() {
	return this._isSet;
}
Future.prototype.isDone = function() {
	return this.isDelivered() || this.isCanceled();
}
Future.prototype.map = function(f) {
	var fut = new Future();
	this.deliverTo(function(t) {
		fut.deliver(f(t));
	});
	this.ifCanceled(function() {
		fut.forceCancel();
	});
	return fut;
}
Future.prototype.toArray = function() {
	return OptionExtensions.toArray(this.value());
}
Future.prototype.toOption = function() {
	return this.value();
}
Future.prototype.value = function() {
	return (this._isSet?Option.Some(this._result):Option.None);
}
Future.prototype.zip = function(f2) {
	var zipped = new Future();
	var f1 = this;
	var deliverZip = function() {
		if(f1.isDelivered() && f2.isDelivered()) {
			zipped.deliver(Tuple2.create(OptionExtensions.get(f1.value()),OptionExtensions.get(f2.value())));
		}
	}
	f1.deliverTo(function(v) {
		deliverZip();
	});
	f2.deliverTo(function(v) {
		deliverZip();
	});
	zipped.allowCancelOnlyIf(function() {
		return f1.cancel() || f2.cancel();
	});
	f1.ifCanceled(function() {
		zipped.forceCancel();
	});
	f2.ifCanceled(function() {
		zipped.forceCancel();
	});
	return zipped;
}
Future.prototype.__class__ = Future;
Product = function() { }
Product.__name__ = ["Product"];
Product.prototype.productArity = null;
Product.prototype.productElement = null;
Product.prototype.productPrefix = null;
Product.prototype.__class__ = Product;
if(typeof _Prelude=='undefined') _Prelude = {}
_Prelude.AbstractProduct = function(elements) { if( elements === $_ ) return; {
	this._productElements = elements;
	this._orders = [];
	this._equals = [];
	this._hashes = [];
	this._shows = [];
}}
_Prelude.AbstractProduct.__name__ = ["_Prelude","AbstractProduct"];
_Prelude.AbstractProduct.prototype._equals = null;
_Prelude.AbstractProduct.prototype._hashes = null;
_Prelude.AbstractProduct.prototype._orders = null;
_Prelude.AbstractProduct.prototype._productElements = null;
_Prelude.AbstractProduct.prototype._shows = null;
_Prelude.AbstractProduct.prototype.getEqual = function(i) {
	return (null == this._equals[i]?this._equals[i] = Stax.getEqualFor(this.productElement(i)):this._equals[i]);
}
_Prelude.AbstractProduct.prototype.getHash = function(i) {
	return (null == this._hashes[i]?this._hashes[i] = Stax.getHashFor(this.productElement(i)):this._hashes[i]);
}
_Prelude.AbstractProduct.prototype.getOrder = function(i) {
	return (null == this._orders[i]?this._orders[i] = Stax.getOrderFor(this.productElement(i)):this._orders[i]);
}
_Prelude.AbstractProduct.prototype.getProductArity = function() {
	return Stax.error("Not implemented");
}
_Prelude.AbstractProduct.prototype.getProductPrefix = function() {
	return Stax.error("Not implemented");
}
_Prelude.AbstractProduct.prototype.getShow = function(i) {
	return (null == this._shows[i]?this._shows[i] = Stax.getShowFor(this.productElement(i)):this._shows[i]);
}
_Prelude.AbstractProduct.prototype.hashCode = function() {
	var h = 0;
	{
		var _g1 = 0, _g = this.getProductArity();
		while(_g1 < _g) {
			var i = _g1++;
			h += _Prelude.AbstractProduct._baseHashes[this.getProductArity() - 2][i] * (this.getHash(i))(this.productElement(i));
		}
	}
	return h;
}
_Prelude.AbstractProduct.prototype.productArity = null;
_Prelude.AbstractProduct.prototype.productCompare = function(other) {
	{
		var _g1 = 0, _g = this.getProductArity();
		while(_g1 < _g) {
			var i = _g1++;
			var c = (this.getOrder(i))(this.productElement(i),other.productElement(i));
			if(c != 0) return c;
		}
	}
	return 0;
}
_Prelude.AbstractProduct.prototype.productDecompose = function() {
	return haxe.text.json.JValue.JArray(ArrayExtensions.map(this._productElements,function(t) {
		return (haxe.data.transcode.TranscodeJValue.getDecomposerFor(Type["typeof"](t)))(t);
	}));
}
_Prelude.AbstractProduct.prototype.productElement = function(n) {
	return this._productElements[n];
}
_Prelude.AbstractProduct.prototype.productEquals = function(other) {
	{
		var _g1 = 0, _g = this.getProductArity();
		while(_g1 < _g) {
			var i = _g1++;
			if(!(this.getEqual(i))(this.productElement(i),other.productElement(i))) return false;
		}
	}
	return true;
}
_Prelude.AbstractProduct.prototype.productPrefix = null;
_Prelude.AbstractProduct.prototype.toString = function() {
	var s = (this.getProductPrefix() + "(") + (this.getShow(0))(this.productElement(0));
	{
		var _g1 = 1, _g = this.getProductArity();
		while(_g1 < _g) {
			var i = _g1++;
			s += ", " + (this.getShow(i))(this.productElement(i));
		}
	}
	return s + ")";
}
_Prelude.AbstractProduct.prototype.__class__ = _Prelude.AbstractProduct;
_Prelude.AbstractProduct.__interfaces__ = [Product];
Tuple2 = function(first,second) { if( first === $_ ) return; {
	_Prelude.AbstractProduct.apply(this,[[first,second]]);
	this._1 = first;
	this._2 = second;
}}
Tuple2.__name__ = ["Tuple2"];
Tuple2.__super__ = _Prelude.AbstractProduct;
for(var k in _Prelude.AbstractProduct.prototype ) Tuple2.prototype[k] = _Prelude.AbstractProduct.prototype[k];
Tuple2.create = function(a,b) {
	return new Tuple2(a,b);
}
Tuple2.extract = function(v,e1,e2) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 4:
		var v1 = $e[2];
		{
			$r = Tuple2.create(e1(v1[0]),e2(v1[1]));
		}break;
		default:{
			$r = Stax.error("Expected Array but was: " + v);
		}break;
		}
		return $r;
	}(this));
}
Tuple2.prototype._1 = null;
Tuple2.prototype._2 = null;
Tuple2.prototype.compare = function(other) {
	return this.productCompare(other);
}
Tuple2.prototype.decompose = function() {
	return this.productDecompose();
}
Tuple2.prototype.entuple = function(c) {
	return Tuple3.create(this._1,this._2,c);
}
Tuple2.prototype.equals = function(other) {
	return this.productEquals(other);
}
Tuple2.prototype.getProductArity = function() {
	return 2;
}
Tuple2.prototype.getProductPrefix = function() {
	return "Tuple2";
}
Tuple2.prototype.__class__ = Tuple2;
Tuple3 = function(first,second,third) { if( first === $_ ) return; {
	_Prelude.AbstractProduct.apply(this,[[first,second,third]]);
	this._1 = first;
	this._2 = second;
	this._3 = third;
}}
Tuple3.__name__ = ["Tuple3"];
Tuple3.__super__ = _Prelude.AbstractProduct;
for(var k in _Prelude.AbstractProduct.prototype ) Tuple3.prototype[k] = _Prelude.AbstractProduct.prototype[k];
Tuple3.create = function(a,b,c) {
	return new Tuple3(a,b,c);
}
Tuple3.extract = function(v,e1,e2,e3) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 4:
		var v1 = $e[2];
		{
			$r = Tuple3.create(e1(v1[0]),e2(v1[1]),e3(v1[2]));
		}break;
		default:{
			$r = Stax.error("Expected Array but was: " + v);
		}break;
		}
		return $r;
	}(this));
}
Tuple3.prototype._1 = null;
Tuple3.prototype._2 = null;
Tuple3.prototype._3 = null;
Tuple3.prototype.compare = function(other) {
	return this.productCompare(other);
}
Tuple3.prototype.decompose = function() {
	return this.productDecompose();
}
Tuple3.prototype.entuple = function(d) {
	return Tuple4.create(this._1,this._2,this._3,d);
}
Tuple3.prototype.equals = function(other) {
	return this.productEquals(other);
}
Tuple3.prototype.getProductArity = function() {
	return 3;
}
Tuple3.prototype.getProductPrefix = function() {
	return "Tuple3";
}
Tuple3.prototype.__class__ = Tuple3;
Tuple4 = function(first,second,third,fourth) { if( first === $_ ) return; {
	_Prelude.AbstractProduct.apply(this,[[first,second,third,fourth]]);
	this._1 = first;
	this._2 = second;
	this._3 = third;
	this._4 = fourth;
}}
Tuple4.__name__ = ["Tuple4"];
Tuple4.__super__ = _Prelude.AbstractProduct;
for(var k in _Prelude.AbstractProduct.prototype ) Tuple4.prototype[k] = _Prelude.AbstractProduct.prototype[k];
Tuple4.create = function(a,b,c,d) {
	return new Tuple4(a,b,c,d);
}
Tuple4.extract = function(v,e1,e2,e3,e4) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 4:
		var v1 = $e[2];
		{
			$r = Tuple4.create(e1(v1[0]),e2(v1[1]),e3(v1[2]),e4(v1[3]));
		}break;
		default:{
			$r = Stax.error("Expected Array but was: " + v);
		}break;
		}
		return $r;
	}(this));
}
Tuple4.prototype._1 = null;
Tuple4.prototype._2 = null;
Tuple4.prototype._3 = null;
Tuple4.prototype._4 = null;
Tuple4.prototype.compare = function(other) {
	return this.productCompare(other);
}
Tuple4.prototype.decompose = function() {
	return this.productDecompose();
}
Tuple4.prototype.entuple = function(e) {
	return Tuple5.create(this._1,this._2,this._3,this._4,e);
}
Tuple4.prototype.equals = function(other) {
	return this.productEquals(other);
}
Tuple4.prototype.getProductArity = function() {
	return 4;
}
Tuple4.prototype.getProductPrefix = function() {
	return "Tuple4";
}
Tuple4.prototype.__class__ = Tuple4;
Tuple5 = function(first,second,third,fourth,fifth) { if( first === $_ ) return; {
	_Prelude.AbstractProduct.apply(this,[[first,second,third,fourth,fifth]]);
	this._1 = first;
	this._2 = second;
	this._3 = third;
	this._4 = fourth;
	this._5 = fifth;
}}
Tuple5.__name__ = ["Tuple5"];
Tuple5.__super__ = _Prelude.AbstractProduct;
for(var k in _Prelude.AbstractProduct.prototype ) Tuple5.prototype[k] = _Prelude.AbstractProduct.prototype[k];
Tuple5.create = function(a,b,c,d,e) {
	return new Tuple5(a,b,c,d,e);
}
Tuple5.extract = function(v,e1,e2,e3,e4,e5) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 4:
		var v1 = $e[2];
		{
			$r = Tuple5.create(e1(v1[0]),e2(v1[1]),e3(v1[2]),e4(v1[3]),e5(v1[4]));
		}break;
		default:{
			$r = Stax.error("Expected Array but was: " + v);
		}break;
		}
		return $r;
	}(this));
}
Tuple5.prototype._1 = null;
Tuple5.prototype._2 = null;
Tuple5.prototype._3 = null;
Tuple5.prototype._4 = null;
Tuple5.prototype._5 = null;
Tuple5.prototype.compare = function(other) {
	return this.productCompare(other);
}
Tuple5.prototype.decompose = function() {
	return this.productDecompose();
}
Tuple5.prototype.equals = function(other) {
	return this.productEquals(other);
}
Tuple5.prototype.getProductArity = function() {
	return 5;
}
Tuple5.prototype.getProductPrefix = function() {
	return "Tuple5";
}
Tuple5.prototype.__class__ = Tuple5;
FieldOrder = function() { }
FieldOrder.__name__ = ["FieldOrder"];
FieldOrder.prototype.__class__ = FieldOrder;
Stax = function() { }
Stax.__name__ = ["Stax"];
Stax._createOrderImpl = function(impl) {
	return function(a,b) {
		return (a == b || (a == null && b == null)?0:(a == null?-1:(b == null?1:impl(a,b))));
	}
}
Stax.getOrderFor = function(t) {
	return Stax.getOrderForType(Type["typeof"](t));
}
Stax.getOrderForType = function(v) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 3:
		{
			$r = Stax._createOrderImpl($closure(BoolExtensions,"compare"));
		}break;
		case 1:
		{
			$r = Stax._createOrderImpl($closure(IntExtensions,"compare"));
		}break;
		case 2:
		{
			$r = Stax._createOrderImpl($closure(FloatExtensions,"compare"));
		}break;
		case 8:
		{
			$r = function(a,b) {
				return ((a == b)?0:(((a) > (b)?1:-1)));
			}
		}break;
		case 4:
		{
			$r = Stax._createOrderImpl(function(a,b) {
				{
					var _g = 0, _g1 = Reflect.fields(a);
					while(_g < _g1.length) {
						var key = _g1[_g];
						++_g;
						var va = Reflect.field(a,key);
						var v1 = (Stax.getOrderFor(va))(va,Reflect.field(b,key));
						if(0 != v1) return v1;
					}
				}
				return 0;
			});
		}break;
		case 6:
		var c = $e[2];
		{
			$r = (function($this) {
				var $r;
				switch(Type.getClassName(c)) {
				case "String":{
					$r = Stax._createOrderImpl($closure(StringExtensions,"compare"));
				}break;
				case "Date":{
					$r = Stax._createOrderImpl($closure(DateExtensions,"compare"));
				}break;
				case "Array":{
					$r = Stax._createOrderImpl($closure(ArrayExtensions,"compare"));
				}break;
				default:{
					$r = (Stax._hasMetaDataClass(c)?(function($this) {
						var $r;
						var i = 0;
						var fields = ArrayExtensions.sortWith(ArrayExtensions.filter(ArrayExtensions.map(Type.getInstanceFields(c),function(v1) {
							var fieldMeta = Stax._getMetaDataField(c,v1);
							var weight = (fieldMeta != null && Reflect.hasField(fieldMeta,"order")?Reflect.field(fieldMeta,"order"):1);
							return Tuple3.create(v1,weight,(fieldMeta != null && Reflect.hasField(fieldMeta,"index")?Reflect.field(fieldMeta,"index"):i++));
						}),function(v1) {
							return v1._2 != 0;
						}),function(a,b) {
							var c1 = a._3 - b._3;
							if(c1 != 0) return c1;
							return StringExtensions.compare(a._1,b._1);
						});
						$r = Stax._createOrderImpl(function(a,b) {
							var values = ArrayExtensions.map(ArrayExtensions.filter(fields,function(v1) {
								return !Reflect.isFunction(Reflect.field(a,v1._1));
							}),function(v1) {
								return Tuple3.create(Reflect.field(a,v1._1),Reflect.field(b,v1._1),v1._2);
							});
							{
								var _g = 0;
								while(_g < values.length) {
									var value = values[_g];
									++_g;
									var c1 = (Stax.getOrderFor(value._1))(value._1,value._2) * value._3;
									if(c1 != 0) return c1;
								}
							}
							return 0;
						});
						return $r;
					}($this)):(Type.getInstanceFields(c).remove("compare")?Stax._createOrderImpl(function(a,b) {
						return (a).compare(b);
					}):Stax.error(("class " + Type.getClassName(c)) + " is not comparable")));
				}break;
				}
				return $r;
			}($this));
		}break;
		case 7:
		var e = $e[2];
		{
			$r = Stax._createOrderImpl(function(a,b) {
				var v1 = a[1] - b[1];
				if(0 != v1) return v1;
				var pa = a.slice(2);
				var pb = b.slice(2);
				{
					var _g1 = 0, _g = pa.length;
					while(_g1 < _g) {
						var i = _g1++;
						var v2 = (Stax.getOrderFor(pa[i]))(pa[i],pb[i]);
						if(v2 != 0) return v2;
					}
				}
				return 0;
			});
		}break;
		case 0:
		{
			$r = Stax._createOrderImpl(function(a,b) {
				return Stax.error("at least one of the arguments should be null");
			});
		}break;
		case 5:
		{
			$r = Stax.error("unable to compare on a function");
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
Stax._hasMetaDataClass = function(c) {
	var m = haxe.rtti.Meta.getType(c);
	return null != m && Reflect.hasField(m,"DataClass");
}
Stax._getMetaDataField = function(c,f) {
	var m = haxe.rtti.Meta.getFields(c);
	if(null == m || !Reflect.hasField(m,f)) return null;
	var fm = Reflect.field(m,f);
	if(!Reflect.hasField(fm,"DataField")) return null;
	return Reflect.field(fm,"DataField").copy().pop();
}
Stax._fieldsWithMeta = function(c,name) {
	var i = 0;
	return ArrayExtensions.map(ArrayExtensions.sortWith(ArrayExtensions.filter(ArrayExtensions.map(Type.getInstanceFields(c),function(v) {
		var fieldMeta = Stax._getMetaDataField(c,v);
		var inc = (fieldMeta == null || !Reflect.hasField(fieldMeta,name) || Reflect.field(fieldMeta,name));
		return Tuple3.create(v,inc,(fieldMeta != null && Reflect.hasField(fieldMeta,"index")?Reflect.field(fieldMeta,"index"):i++));
	}),function(v) {
		return v._2;
	}),function(a,b) {
		var c1 = a._3 - b._3;
		if(c1 != 0) return c1;
		return StringExtensions.compare(a._1,b._1);
	}),function(v) {
		return v._1;
	});
}
Stax._createEqualImpl = function(impl) {
	return function(a,b) {
		return (a == b || (a == null && b == null)?true:(a == null || b == null?false:impl(a,b)));
	}
}
Stax.getEqualFor = function(t) {
	return Stax.getEqualForType(Type["typeof"](t));
}
Stax.getEqualForType = function(v) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 3:
		{
			$r = Stax._createEqualImpl($closure(BoolExtensions,"equals"));
		}break;
		case 1:
		{
			$r = Stax._createEqualImpl($closure(IntExtensions,"equals"));
		}break;
		case 2:
		{
			$r = Stax._createEqualImpl($closure(FloatExtensions,"equals"));
		}break;
		case 8:
		{
			$r = function(a,b) {
				return a == b;
			}
		}break;
		case 4:
		{
			$r = Stax._createEqualImpl(function(a,b) {
				{
					var _g = 0, _g1 = Reflect.fields(a);
					while(_g < _g1.length) {
						var key = _g1[_g];
						++_g;
						var va = Reflect.field(a,key);
						if(!(Stax.getEqualFor(va))(va,Reflect.field(b,key))) return false;
					}
				}
				return true;
			});
		}break;
		case 6:
		var c = $e[2];
		{
			$r = (function($this) {
				var $r;
				switch(Type.getClassName(c)) {
				case "String":{
					$r = Stax._createEqualImpl($closure(StringExtensions,"equals"));
				}break;
				case "Date":{
					$r = Stax._createEqualImpl($closure(DateExtensions,"equals"));
				}break;
				case "Array":{
					$r = Stax._createEqualImpl($closure(ArrayExtensions,"equals"));
				}break;
				default:{
					$r = (Stax._hasMetaDataClass(c)?(function($this) {
						var $r;
						var fields = Stax._fieldsWithMeta(c,"equalHash");
						$r = Stax._createEqualImpl(function(a,b) {
							var values = ArrayExtensions.map(fields,function(v1) {
								return Tuple2.create(Reflect.field(a,v1),Reflect.field(b,v1));
							});
							{
								var _g = 0;
								while(_g < values.length) {
									var value = values[_g];
									++_g;
									if(Reflect.isFunction(value._1)) continue;
									if(!(Stax.getEqualFor(value._1))(value._1,value._2)) return false;
								}
							}
							return true;
						});
						return $r;
					}($this)):(Type.getInstanceFields(c).remove("equals")?Stax._createEqualImpl(function(a,b) {
						return (a).equals(b);
					}):Stax.error(("class " + Type.getClassName(c)) + " has not equals method")));
				}break;
				}
				return $r;
			}($this));
		}break;
		case 7:
		var e = $e[2];
		{
			$r = Stax._createEqualImpl(function(a,b) {
				if(0 != a[1] - b[1]) return false;
				var pa = a.slice(2);
				var pb = b.slice(2);
				{
					var _g1 = 0, _g = pa.length;
					while(_g1 < _g) {
						var i = _g1++;
						if(!(Stax.getEqualFor(pa[i]))(pa[i],pb[i])) return false;
					}
				}
				return true;
			});
		}break;
		case 0:
		{
			$r = Stax._createEqualImpl(function(a,b) {
				return Stax.error("at least one of the arguments should be null");
			});
		}break;
		case 5:
		{
			$r = Stax._createEqualImpl($closure(Reflect,"compareMethods"));
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
Stax._createShowImpl = function(impl) {
	return function(v) {
		return (null == v?"null":impl(v));
	}
}
Stax.getShowFor = function(t) {
	return Stax.getShowForType(Type["typeof"](t));
}
Stax.getShowForType = function(v) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 3:
		{
			$r = Stax._createShowImpl($closure(BoolExtensions,"toString"));
		}break;
		case 1:
		{
			$r = Stax._createShowImpl($closure(IntExtensions,"toString"));
		}break;
		case 2:
		{
			$r = Stax._createShowImpl($closure(FloatExtensions,"toString"));
		}break;
		case 8:
		{
			$r = Stax._createShowImpl(function(v1) {
				return "<unknown>";
			});
		}break;
		case 4:
		{
			$r = Stax._createShowImpl(function(v1) {
				var buf = [];
				{
					var _g = 0, _g1 = Reflect.fields(v1);
					while(_g < _g1.length) {
						var k = _g1[_g];
						++_g;
						var i = Reflect.field(v1,k);
						buf.push((k + ":") + (Stax.getShowFor(i))(i));
					}
				}
				return ("{" + buf.join(",")) + "}";
			});
		}break;
		case 6:
		var c = $e[2];
		{
			$r = (function($this) {
				var $r;
				switch(Type.getClassName(c)) {
				case "String":{
					$r = Stax._createShowImpl($closure(StringExtensions,"toString"));
				}break;
				case "Array":{
					$r = Stax._createShowImpl($closure(ArrayExtensions,"toString"));
				}break;
				default:{
					$r = (Stax._hasMetaDataClass(c)?(function($this) {
						var $r;
						var fields = Stax._fieldsWithMeta(c,"show");
						$r = Stax._createShowImpl(function(v1) {
							var values = ArrayExtensions.map(ArrayExtensions.filter(ArrayExtensions.map(fields,function(f) {
								return Reflect.field(v1,f);
							}),function(v2) {
								return !Reflect.isFunction(v2);
							}),function(v2) {
								return (Stax.getShowFor(v2))(v2);
							});
							return IterableExtensions.mkString(values,null,Type.getClassName(c) + "(",")",", ");
						});
						return $r;
					}($this)):(Type.getInstanceFields(c).remove("toString")?Stax._createShowImpl(function(v1) {
						return Reflect.field(v1,"toString").apply(v1,[]);
					}):Stax._createShowImpl(function(v1) {
						return Type.getClassName(Type.getClass(v1));
					})));
				}break;
				}
				return $r;
			}($this));
		}break;
		case 7:
		var e = $e[2];
		{
			$r = Stax._createShowImpl(function(v1) {
				var buf = v1[0];
				var params = v1.slice(2);
				if(params.length == 0) return buf;
				else {
					buf += "(";
					{
						var _g = 0;
						while(_g < params.length) {
							var p = params[_g];
							++_g;
							buf += (Stax.getShowFor(p))(p);
						}
					}
					return buf + ")";
				}
			});
		}break;
		case 0:
		{
			$r = function(v1) {
				return "null";
			}
		}break;
		case 5:
		{
			$r = Stax._createShowImpl(function(v1) {
				return "<function>";
			});
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
Stax._createHashImpl = function(impl) {
	return function(v) {
		if(null == v) return 0;
		else return impl(v);
	}
}
Stax.getHashFor = function(t) {
	return Stax.getHashForType(Type["typeof"](t));
}
Stax.getHashForType = function(v) {
	return (function($this) {
		var $r;
		var $e = (v);
		switch( $e[1] ) {
		case 3:
		{
			$r = Stax._createHashImpl($closure(BoolExtensions,"hashCode"));
		}break;
		case 1:
		{
			$r = Stax._createHashImpl($closure(IntExtensions,"hashCode"));
		}break;
		case 2:
		{
			$r = Stax._createHashImpl($closure(FloatExtensions,"hashCode"));
		}break;
		case 8:
		{
			$r = Stax._createHashImpl(function(v1) {
				return Stax.error("can't retrieve hascode for TUnknown: " + v1);
			});
		}break;
		case 4:
		{
			$r = Stax._createHashImpl(function(v1) {
				var s = (Stax.getShowFor(v1))(v1);
				return (Stax.getHashFor(s))(s);
			});
		}break;
		case 6:
		var c = $e[2];
		{
			$r = (function($this) {
				var $r;
				switch(Type.getClassName(c)) {
				case "String":{
					$r = Stax._createHashImpl($closure(StringExtensions,"hashCode"));
				}break;
				case "Date":{
					$r = Stax._createHashImpl($closure(DateExtensions,"hashCode"));
				}break;
				case "Array":{
					$r = Stax._createHashImpl($closure(ArrayExtensions,"hashCode"));
				}break;
				default:{
					$r = (function($this) {
						var $r;
						var fields = Type.getInstanceFields(c);
						$r = (Stax._hasMetaDataClass(c)?(function($this) {
							var $r;
							var fields1 = Stax._fieldsWithMeta(c,"equalHash");
							$r = Stax._createHashImpl(function(v1) {
								var className = Type.getClassName(c);
								var values = ArrayExtensions.filter(ArrayExtensions.map(fields1,function(f) {
									return Reflect.field(v1,f);
								}),function(v2) {
									return !Reflect.isFunction(v2);
								});
								return ArrayExtensions.foldl(values,9901 * StringExtensions.hashCode(className),function(v2,e) {
									return v2 + (333667 * ((Stax.getHashFor(e))(e) + 197192));
								});
							});
							return $r;
						}($this)):(Type.getInstanceFields(c).remove("hashCode")?Stax._createHashImpl(function(v1) {
							return Reflect.field(v1,"hashCode").apply(v1,[]);
						}):Stax.error("class does not have a hashCode method")));
						return $r;
					}($this));
				}break;
				}
				return $r;
			}($this));
		}break;
		case 7:
		var e = $e[2];
		{
			$r = Stax._createHashImpl(function(v1) {
				var hash = StringExtensions.hashCode(v1[0]) * 6151;
				{
					var _g = 0, _g1 = v1.slice(2);
					while(_g < _g1.length) {
						var i = _g1[_g];
						++_g;
						hash += (Stax.getHashFor(i))(i) * 6151;
					}
				}
				return hash;
			});
		}break;
		case 5:
		{
			$r = Stax._createHashImpl(function(v1) {
				return Stax.error("function can't provide a hash code");
			});
		}break;
		case 0:
		{
			$r = function(v1) {
				return 0;
			}
		}break;
		default:{
			$r = function(v1) {
				return -1;
			}
		}break;
		}
		return $r;
	}(this));
}
Stax.noop1 = function() {
	return function(a) {
		null;
	}
}
Stax.noop2 = function() {
	return function(a,b) {
		null;
	}
}
Stax.noop3 = function() {
	return function(a,b,c) {
		null;
	}
}
Stax.noop4 = function() {
	return function(a,b,c,d) {
		null;
	}
}
Stax.noop5 = function() {
	return function(a,b,c,d,e) {
		null;
	}
}
Stax.identity = function() {
	return function(a) {
		return a;
	}
}
Stax.unfold = function(initial,unfolder) {
	return { iterator : function() {
		var _next = Option.None;
		var _progress = initial;
		var precomputeNext = function() {
			var $e = (unfolder(_progress));
			switch( $e[1] ) {
			case 0:
			{
				_progress = null;
				_next = Option.None;
			}break;
			case 1:
			var tuple = $e[2];
			{
				_progress = tuple._1;
				_next = Option.Some(tuple._2);
			}break;
			}
		}
		precomputeNext();
		return { hasNext : function() {
			return !OptionExtensions.isEmpty(_next);
		}, next : function() {
			var n = OptionExtensions.get(_next);
			precomputeNext();
			return n;
		}}
	}}
}
Stax.error = function(msg) {
	throw msg;
	return null;
}
Stax.prototype.__class__ = Stax;
haxe.test.TestFixture = function(target,methodName,method,setup,teardown) { if( target === $_ ) return; {
	this.target = target;
	this.methodName = methodName;
	this.method = method;
	this.setup = setup;
	this.teardown = teardown;
	this.onTested = new haxe.test.Dispatcher();
	this.onTimeout = new haxe.test.Dispatcher();
	this.onComplete = new haxe.test.Dispatcher();
}}
haxe.test.TestFixture.__name__ = ["haxe","test","TestFixture"];
haxe.test.TestFixture.prototype.checkMethod = function(name,arg) {
	var field = Reflect.field(this.target,name);
	if(field == null) throw ((arg + " function ") + name) + " is not a field of target";
	if(!Reflect.isFunction(field)) throw ((arg + " function ") + name) + " is not a function";
}
haxe.test.TestFixture.prototype.method = null;
haxe.test.TestFixture.prototype.methodName = null;
haxe.test.TestFixture.prototype.onComplete = null;
haxe.test.TestFixture.prototype.onTested = null;
haxe.test.TestFixture.prototype.onTimeout = null;
haxe.test.TestFixture.prototype.setup = null;
haxe.test.TestFixture.prototype.target = null;
haxe.test.TestFixture.prototype.teardown = null;
haxe.test.TestFixture.prototype.__class__ = haxe.test.TestFixture;
haxe.net.HttpHeaderExtensionsTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
haxe.net.HttpHeaderExtensionsTestCase.__name__ = ["haxe","net","HttpHeaderExtensionsTestCase"];
haxe.net.HttpHeaderExtensionsTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) haxe.net.HttpHeaderExtensionsTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
haxe.net.HttpHeaderExtensionsTestCase.prototype.testThatHeadersCanBeParsedWithCrLf = function() {
	var headers = " mime-type: text/html\r\n cache-expire : 0 \r\n";
	var headersP = haxe.net.HttpHeaderExtensions.toHttpHeaders(headers);
	haxe.test.Assert.equals("text/html",OptionExtensions.get(headersP.get("mime-type")),null,null,{ fileName : "HttpHeaderExtensionsTestCase.hx", lineNumber : 51, className : "haxe.net.HttpHeaderExtensionsTestCase", methodName : "testThatHeadersCanBeParsedWithCrLf"});
	haxe.test.Assert.equals("0",OptionExtensions.get(headersP.get("cache-expire")),null,null,{ fileName : "HttpHeaderExtensionsTestCase.hx", lineNumber : 52, className : "haxe.net.HttpHeaderExtensionsTestCase", methodName : "testThatHeadersCanBeParsedWithCrLf"});
}
haxe.net.HttpHeaderExtensionsTestCase.prototype.testThatHeadersCanBeParsedWithLf = function() {
	var headers = " mime-type: text/html\n cache-expire : 0 \n";
	var headersP = haxe.net.HttpHeaderExtensions.toHttpHeaders(headers);
	haxe.test.Assert.equals("text/html",OptionExtensions.get(headersP.get("mime-type")),null,null,{ fileName : "HttpHeaderExtensionsTestCase.hx", lineNumber : 60, className : "haxe.net.HttpHeaderExtensionsTestCase", methodName : "testThatHeadersCanBeParsedWithLf"});
	haxe.test.Assert.equals("0",OptionExtensions.get(headersP.get("cache-expire")),null,null,{ fileName : "HttpHeaderExtensionsTestCase.hx", lineNumber : 61, className : "haxe.net.HttpHeaderExtensionsTestCase", methodName : "testThatHeadersCanBeParsedWithLf"});
}
haxe.net.HttpHeaderExtensionsTestCase.prototype.testThatValidHeaderCanBeIdentified = function() {
	var header = " Mime-type text/html ";
	haxe.test.Assert.isTrue(OptionExtensions.isEmpty(haxe.net.HttpHeaderExtensions.toHttpHeader(header)),null,{ fileName : "HttpHeaderExtensionsTestCase.hx", lineNumber : 43, className : "haxe.net.HttpHeaderExtensionsTestCase", methodName : "testThatValidHeaderCanBeIdentified"});
}
haxe.net.HttpHeaderExtensionsTestCase.prototype.testThatValidHeaderCanBeParsed = function() {
	var header = " Mime-type : text/html ";
	var headerP = DynamicExtensions.entuple("Mime-type","text/html");
	haxe.test.Assert.equals(headerP,OptionExtensions.get(haxe.net.HttpHeaderExtensions.toHttpHeader(header)),null,null,{ fileName : "HttpHeaderExtensionsTestCase.hx", lineNumber : 37, className : "haxe.net.HttpHeaderExtensionsTestCase", methodName : "testThatValidHeaderCanBeParsed"});
}
haxe.net.HttpHeaderExtensionsTestCase.prototype.__class__ = haxe.net.HttpHeaderExtensionsTestCase;
js.dom.QuirksTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
js.dom.QuirksTestCase.__name__ = ["js","dom","QuirksTestCase"];
js.dom.QuirksTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) js.dom.QuirksTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
js.dom.QuirksTestCase.prototype.beforeAll = function() {
	var d = js.Env.document;
	var body = d.getElementsByTagName("body")[0];
	this.element = d.createElement("div");
	body.appendChild(this.element);
}
js.dom.QuirksTestCase.prototype.element = null;
js.dom.QuirksTestCase.prototype.testAddClass = function() {
	var className = "test-class";
	js.dom.Quirks.addClass(this.element,className);
	this.assertEquals(className,this.element.className,null,null,{ fileName : "QuirksTestCase.hx", lineNumber : 92, className : "js.dom.QuirksTestCase", methodName : "testAddClass"});
}
js.dom.QuirksTestCase.prototype.testGetInnerWidth = function() {
	var width = 221;
	js.dom.Quirks.setWidth(this.element,width);
	js.dom.Quirks.setCssProperty(this.element,"padding-left","2px");
	js.dom.Quirks.setCssProperty(this.element,"padding-right","3px");
	js.dom.Quirks.setCssProperty(this.element,"margin-left","5px");
	js.dom.Quirks.setCssProperty(this.element,"margin-right","6px");
	this.assertEquals(width,OptionExtensions.get(js.dom.Quirks.getInnerWidth(this.element)),null,null,{ fileName : "QuirksTestCase.hx", lineNumber : 60, className : "js.dom.QuirksTestCase", methodName : "testGetInnerWidth"});
}
js.dom.QuirksTestCase.prototype.testGetOuterWidth = function() {
	var width = 221;
	js.dom.Quirks.setWidth(this.element,width);
	js.dom.Quirks.setCssProperty(this.element,"padding-left","2px");
	js.dom.Quirks.setCssProperty(this.element,"padding-right","3px");
	js.dom.Quirks.setCssProperty(this.element,"margin-left","5px");
	js.dom.Quirks.setCssProperty(this.element,"margin-right","6px");
	this.assertEquals(width + 5,OptionExtensions.get(js.dom.Quirks.getOuterWidth(this.element,false)),null,null,{ fileName : "QuirksTestCase.hx", lineNumber : 72, className : "js.dom.QuirksTestCase", methodName : "testGetOuterWidth"});
}
js.dom.QuirksTestCase.prototype.testGetOuterWidthWithMargin = function() {
	var width = 221;
	js.dom.Quirks.setWidth(this.element,width);
	js.dom.Quirks.setCssProperty(this.element,"padding-left","2px");
	js.dom.Quirks.setCssProperty(this.element,"padding-right","3px");
	js.dom.Quirks.setCssProperty(this.element,"margin-left","5px");
	js.dom.Quirks.setCssProperty(this.element,"margin-right","6px");
	this.assertEquals(width + 11,OptionExtensions.get(js.dom.Quirks.getOuterWidth(this.element,true)),null,null,{ fileName : "QuirksTestCase.hx", lineNumber : 84, className : "js.dom.QuirksTestCase", methodName : "testGetOuterWidthWithMargin"});
}
js.dom.QuirksTestCase.prototype.testHasClass = function() {
	var className = "test-class";
	js.dom.Quirks.addClass(this.element,className);
	this.assertEquals(true,js.dom.Quirks.hasClass(this.element,className),null,null,{ fileName : "QuirksTestCase.hx", lineNumber : 117, className : "js.dom.QuirksTestCase", methodName : "testHasClass"});
}
js.dom.QuirksTestCase.prototype.testHasNoClass = function() {
	this.assertEquals(false,js.dom.Quirks.hasClass(this.element,"wrong-class-name"),null,null,{ fileName : "QuirksTestCase.hx", lineNumber : 120, className : "js.dom.QuirksTestCase", methodName : "testHasNoClass"});
}
js.dom.QuirksTestCase.prototype.testNestedPosition = function() {
	var offset = { x : 10, y : 20}
	var d = js.Env.document;
	var body = d.getElementsByTagName("body")[0];
	var element2 = d.createElement("div");
	body.appendChild(element2);
	js.dom.Quirks.setOffset(element2,offset);
	var d1 = js.Env.document;
	var subElement = d1.createElement("div");
	element2.appendChild(subElement);
	var subOffset = { x : 20, y : 40}
	js.dom.Quirks.setOffset(subElement,subOffset);
	var position = OptionExtensions.get(js.dom.Quirks.getPosition(subElement));
	this.assertEquals(10,position.x,null,null,{ fileName : "QuirksTestCase.hx", lineNumber : 165, className : "js.dom.QuirksTestCase", methodName : "testNestedPosition"});
	this.assertEquals(20,position.y,null,null,{ fileName : "QuirksTestCase.hx", lineNumber : 166, className : "js.dom.QuirksTestCase", methodName : "testNestedPosition"});
}
js.dom.QuirksTestCase.prototype.testPosition = function() {
	var offset = { x : 50, y : 40}
	var d = js.Env.document;
	var body = d.getElementsByTagName("body")[0];
	var element2 = d.createElement("div");
	body.appendChild(element2);
	js.dom.Quirks.setOffset(element2,offset);
	var position = OptionExtensions.get(js.dom.Quirks.getPosition(element2));
	this.assertEquals(offset.x,position.x,null,null,{ fileName : "QuirksTestCase.hx", lineNumber : 142, className : "js.dom.QuirksTestCase", methodName : "testPosition"});
	this.assertEquals(offset.y,position.y,null,null,{ fileName : "QuirksTestCase.hx", lineNumber : 143, className : "js.dom.QuirksTestCase", methodName : "testPosition"});
}
js.dom.QuirksTestCase.prototype.testRemoveClass = function() {
	var className = "test-class";
	js.dom.Quirks.addClass(this.element,className);
	js.dom.Quirks.removeClass(this.element,className);
	this.assertEquals(false,js.dom.Quirks.hasClass(this.element,className),null,null,{ fileName : "QuirksTestCase.hx", lineNumber : 100, className : "js.dom.QuirksTestCase", methodName : "testRemoveClass"});
}
js.dom.QuirksTestCase.prototype.testRemoveClassRemoveCorrectClass = function() {
	var className = "test-class";
	var className1 = "foo";
	js.dom.Quirks.addClass(this.element,className);
	js.dom.Quirks.addClass(this.element,className1);
	js.dom.Quirks.removeClass(this.element,className);
	this.assertEquals(true,js.dom.Quirks.hasClass(this.element,className1),null,null,{ fileName : "QuirksTestCase.hx", lineNumber : 110, className : "js.dom.QuirksTestCase", methodName : "testRemoveClassRemoveCorrectClass"});
}
js.dom.QuirksTestCase.prototype.testSetGetHight = function() {
	var hight = 121;
	js.dom.Quirks.setHeight(this.element,hight);
	this.assertEquals(hight,OptionExtensions.get(js.dom.Quirks.getHeight(this.element)),null,null,{ fileName : "QuirksTestCase.hx", lineNumber : 38, className : "js.dom.QuirksTestCase", methodName : "testSetGetHight"});
}
js.dom.QuirksTestCase.prototype.testSetGetOffset = function() {
	var offset = { x : 50, y : 40}
	js.dom.Quirks.setOffset(this.element,offset);
	var elementOffset = OptionExtensions.getOrElseC(js.dom.Quirks.getOffset(this.element),{ x : 0, y : 0});
	this.assertEquals(offset.x,elementOffset.x,null,null,{ fileName : "QuirksTestCase.hx", lineNumber : 30, className : "js.dom.QuirksTestCase", methodName : "testSetGetOffset"});
	this.assertEquals(offset.y,elementOffset.y,null,null,{ fileName : "QuirksTestCase.hx", lineNumber : 31, className : "js.dom.QuirksTestCase", methodName : "testSetGetOffset"});
}
js.dom.QuirksTestCase.prototype.testSetGetWidth = function() {
	var width = 221;
	js.dom.Quirks.setWidth(this.element,width);
	js.dom.Quirks.setCssProperty(this.element,"padding-left","2px");
	js.dom.Quirks.setCssProperty(this.element,"padding-right","3px");
	js.dom.Quirks.setCssProperty(this.element,"margin-left","5px");
	js.dom.Quirks.setCssProperty(this.element,"margin-right","6px");
	this.assertEquals(width + 5,OptionExtensions.get(js.dom.Quirks.getWidth(this.element)),null,null,{ fileName : "QuirksTestCase.hx", lineNumber : 49, className : "js.dom.QuirksTestCase", methodName : "testSetGetWidth"});
}
js.dom.QuirksTestCase.prototype.testSetOpacityProperty = function() {
	var value = "0.5";
	js.dom.Quirks.setCssProperty(this.element,"opacity",value);
	this.assertEquals(value,OptionExtensions.get(js.dom.Quirks.getComputedCssProperty(this.element,"opacity")),null,null,{ fileName : "QuirksTestCase.hx", lineNumber : 128, className : "js.dom.QuirksTestCase", methodName : "testSetOpacityProperty"});
}
js.dom.QuirksTestCase.prototype.__class__ = js.dom.QuirksTestCase;
haxe.time.Clock = function() { }
haxe.time.Clock.__name__ = ["haxe","time","Clock"];
haxe.time.Clock.prototype.now = null;
haxe.time.Clock.prototype.__class__ = haxe.time.Clock;
haxe.time.SystemClock = function(p) { if( p === $_ ) return; {
	null;
}}
haxe.time.SystemClock.__name__ = ["haxe","time","SystemClock"];
haxe.time.SystemClock.prototype.now = function() {
	return Date.now();
}
haxe.time.SystemClock.prototype.__class__ = haxe.time.SystemClock;
haxe.time.SystemClock.__interfaces__ = [haxe.time.Clock];
haxe.time.MockClock = function(p) { if( p === $_ ) return; {
	this.time = 0.0;
}}
haxe.time.MockClock.__name__ = ["haxe","time","MockClock"];
haxe.time.MockClock.prototype.now = function() {
	return Date.fromTime(this.time);
}
haxe.time.MockClock.prototype.time = null;
haxe.time.MockClock.prototype.__class__ = haxe.time.MockClock;
haxe.time.MockClock.__interfaces__ = [haxe.time.Clock];
haxe.functional.P = function() { }
haxe.functional.P.__name__ = ["haxe","functional","P"];
haxe.functional.P.isNull = function() {
	return function(value) {
		return value == null;
	}
}
haxe.functional.P.isNotNull = function() {
	return function(value) {
		return value != null;
	}
}
haxe.functional.P.isGreaterThan = function(ref) {
	return function(value) {
		return value > ref;
	}
}
haxe.functional.P.isLessThan = function(ref) {
	return function(value) {
		return value < ref;
	}
}
haxe.functional.P.isGreaterThanInt = function(ref) {
	return function(value) {
		return value > ref;
	}
}
haxe.functional.P.isLessThanInt = function(ref) {
	return function(value) {
		return value < ref;
	}
}
haxe.functional.P.isEqualTo = function(ref,equal) {
	if(equal == null) equal = Stax.getEqualFor(ref);
	return function(value) {
		return equal(ref,value);
	}
}
haxe.functional.P.startsWith = function(s) {
	return function(value) {
		return StringExtensions.startsWith(value,s);
	}
}
haxe.functional.P.endsWith = function(s) {
	return function(value) {
		return StringExtensions.endsWith(value,s);
	}
}
haxe.functional.P.contains = function(s) {
	return function(value) {
		return StringExtensions.contains(value,s);
	}
}
haxe.functional.P.prototype.__class__ = haxe.functional.P;
haxe.functional.Predicate1Extensions = function() { }
haxe.functional.Predicate1Extensions.__name__ = ["haxe","functional","Predicate1Extensions"];
haxe.functional.Predicate1Extensions.and = function(p1,p2) {
	return function(value) {
		return p1(value) && p2(value);
	}
}
haxe.functional.Predicate1Extensions.andAll = function(p1,ps) {
	return function(value) {
		var result = p1(value);
		{ var $it0 = ps.iterator();
		while( $it0.hasNext() ) { var p = $it0.next();
		{
			if(!result) break;
			result = result && p(value);
		}
		}}
		return result;
	}
}
haxe.functional.Predicate1Extensions.or = function(p1,p2) {
	return function(value) {
		return p1(value) || p2(value);
	}
}
haxe.functional.Predicate1Extensions.orAny = function(p1,ps) {
	return function(value) {
		var result = p1(value);
		{ var $it0 = ps.iterator();
		while( $it0.hasNext() ) { var p = $it0.next();
		{
			if(result) break;
			result = result || p(value);
		}
		}}
		return result;
	}
}
haxe.functional.Predicate1Extensions.negate = function(p) {
	return function(value) {
		return !p(value);
	}
}
haxe.functional.Predicate1Extensions.prototype.__class__ = haxe.functional.Predicate1Extensions;
haxe.functional.PartialFunctionTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
haxe.functional.PartialFunctionTestCase.__name__ = ["haxe","functional","PartialFunctionTestCase"];
haxe.functional.PartialFunctionTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) haxe.functional.PartialFunctionTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
haxe.functional.PartialFunctionTestCase.prototype.testCallForPartialFunction1 = function() {
	var f = haxe.functional.PartialFunction1ImplExtensions.toPartialFunction([Tuple2.create(function(i) {
		return i > 0;
	},function(i) {
		return i * i;
	})]);
	this.assertEquals(4,f.call(2),null,null,{ fileName : "PartialFunctionTestCase.hx", lineNumber : 37, className : "haxe.functional.PartialFunctionTestCase", methodName : "testCallForPartialFunction1"});
}
haxe.functional.PartialFunctionTestCase.prototype.testIsDefinedAtForPartialFunction1 = function() {
	var f = haxe.functional.PartialFunction1ImplExtensions.toPartialFunction([Tuple2.create(function(i) {
		return i > 0;
	},function(i) {
		return i * i;
	})]);
	this.assertTrue(f.isDefinedAt(2),null,{ fileName : "PartialFunctionTestCase.hx", lineNumber : 30, className : "haxe.functional.PartialFunctionTestCase", methodName : "testIsDefinedAtForPartialFunction1"});
	this.assertFalse(f.isDefinedAt(-2),null,{ fileName : "PartialFunctionTestCase.hx", lineNumber : 31, className : "haxe.functional.PartialFunctionTestCase", methodName : "testIsDefinedAtForPartialFunction1"});
}
haxe.functional.PartialFunctionTestCase.prototype.testOrAlwaysCForPartialFunction1 = function() {
	var f = haxe.functional.PartialFunction1ImplExtensions.toPartialFunction([Tuple2.create(function(i) {
		return i > 0;
	},function(i) {
		return i * i;
	})]);
	this.assertTrue(f.orAlwaysC(DynamicExtensions.toThunk(9)).isDefinedAt(-2),null,{ fileName : "PartialFunctionTestCase.hx", lineNumber : 55, className : "haxe.functional.PartialFunctionTestCase", methodName : "testOrAlwaysCForPartialFunction1"});
}
haxe.functional.PartialFunctionTestCase.prototype.testOrElseForPartialFunction1 = function() {
	var f1 = haxe.functional.PartialFunction1ImplExtensions.toPartialFunction([Tuple2.create(function(i) {
		return i > 0;
	},function(i) {
		return i * i;
	})]);
	var f2 = haxe.functional.PartialFunction1ImplExtensions.toPartialFunction([Tuple2.create(function(i) {
		return i < 0;
	},function(i) {
		return i * i;
	})]);
	var f = f1.orElse(f2);
	this.assertTrue(f.isDefinedAt(-2),null,{ fileName : "PartialFunctionTestCase.hx", lineNumber : 46, className : "haxe.functional.PartialFunctionTestCase", methodName : "testOrElseForPartialFunction1"});
	this.assertEquals(4,f.call(-2),null,null,{ fileName : "PartialFunctionTestCase.hx", lineNumber : 48, className : "haxe.functional.PartialFunctionTestCase", methodName : "testOrElseForPartialFunction1"});
	this.assertEquals(4,f.call(2),null,null,{ fileName : "PartialFunctionTestCase.hx", lineNumber : 49, className : "haxe.functional.PartialFunctionTestCase", methodName : "testOrElseForPartialFunction1"});
}
haxe.functional.PartialFunctionTestCase.prototype.__class__ = haxe.functional.PartialFunctionTestCase;
haxe.io.Error = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; }
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.http.HttpStringTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
haxe.io.http.HttpStringTestCase.__name__ = ["haxe","io","http","HttpStringTestCase"];
haxe.io.http.HttpStringTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) haxe.io.http.HttpStringTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
haxe.io.http.HttpStringTestCase.prototype.before = function() {
	this.h = new haxe.io.http.HttpStringAsync();
}
haxe.io.http.HttpStringTestCase.prototype.h = null;
haxe.io.http.HttpStringTestCase.prototype.testGet = function() {
	haxe.test.Assert.delivered(this.h.get("http://www.google.com"),function(page) {
		haxe.test.Assert.notNull(page,null,{ fileName : "HttpStringTestCase.hx", lineNumber : 41, className : "haxe.io.http.HttpStringTestCase", methodName : "testGet"});
	},4000);
}
haxe.io.http.HttpStringTestCase.prototype.__class__ = haxe.io.http.HttpStringTestCase;
haxe.test.ui.common.FixtureResult = function(methodName) { if( methodName === $_ ) return; {
	this.methodName = methodName;
	this.list = new List();
	this.hasTestError = false;
	this.hasSetupError = false;
	this.hasTeardownError = false;
	this.hasTimeoutError = false;
	this.hasAsyncError = false;
	this.stats = new haxe.test.ui.common.ResultStats();
}}
haxe.test.ui.common.FixtureResult.__name__ = ["haxe","test","ui","common","FixtureResult"];
haxe.test.ui.common.FixtureResult.prototype.add = function(assertation) {
	this.list.add(assertation);
	var $e = (assertation);
	switch( $e[1] ) {
	case 0:
	{
		this.stats.addSuccesses(1);
	}break;
	case 1:
	{
		this.stats.addFailures(1);
	}break;
	case 2:
	{
		this.stats.addErrors(1);
	}break;
	case 3:
	{
		this.stats.addErrors(1);
		this.hasSetupError = true;
	}break;
	case 4:
	{
		this.stats.addErrors(1);
		this.hasTeardownError = true;
	}break;
	case 5:
	{
		this.stats.addErrors(1);
		this.hasTimeoutError = true;
	}break;
	case 6:
	{
		this.stats.addErrors(1);
		this.hasAsyncError = true;
	}break;
	case 7:
	{
		this.stats.addWarnings(1);
	}break;
	}
}
haxe.test.ui.common.FixtureResult.prototype.hasAsyncError = null;
haxe.test.ui.common.FixtureResult.prototype.hasSetupError = null;
haxe.test.ui.common.FixtureResult.prototype.hasTeardownError = null;
haxe.test.ui.common.FixtureResult.prototype.hasTestError = null;
haxe.test.ui.common.FixtureResult.prototype.hasTimeoutError = null;
haxe.test.ui.common.FixtureResult.prototype.iterator = function() {
	return this.list.iterator();
}
haxe.test.ui.common.FixtureResult.prototype.list = null;
haxe.test.ui.common.FixtureResult.prototype.methodName = null;
haxe.test.ui.common.FixtureResult.prototype.stats = null;
haxe.test.ui.common.FixtureResult.prototype.__class__ = haxe.test.ui.common.FixtureResult;
haxe.test.ui.text.HtmlReport = function(runner,outputHandler,traceRedirected) { if( runner === $_ ) return; {
	if(traceRedirected == null) traceRedirected = true;
	this.aggregator = new haxe.test.ui.common.ResultAggregator(runner,true);
	runner.onStart.add($closure(this,"start"));
	this.aggregator.onComplete.add($closure(this,"complete"));
	if(null == outputHandler) this.setHandler($closure(this,"_handler"));
	else this.setHandler(outputHandler);
	if(traceRedirected) this.redirectTrace();
	this.displaySuccessResults = haxe.test.ui.common.SuccessResultsDisplayMode.AlwaysShowSuccessResults;
	this.displayHeader = haxe.test.ui.common.HeaderDisplayMode.AlwaysShowHeader;
}}
haxe.test.ui.text.HtmlReport.__name__ = ["haxe","test","ui","text","HtmlReport"];
haxe.test.ui.text.HtmlReport.prototype._handler = function(report) {
	var isDef = function(v) {
		return typeof v != 'undefined';
	}
	var head = js.Lib.document.getElementsByTagName("head")[0];
	var script = js.Lib.document.createElement("script");
	script.type = "text/javascript";
	var sjs = report.jsScript();
	if(isDef(script.text)) {
		script.text = sjs;
	}
	else {
		script.innerHTML = sjs;
	}
	head.appendChild(script);
	var style = js.Lib.document.createElement("style");
	style.type = "text/css";
	var scss = report.cssStyle();
	if(isDef(style.styleSheet)) {
		style.styleSheet.cssText = scss;
	}
	else if(isDef(style.cssText)) {
		style.cssText = scss;
	}
	else if(isDef(style.innerText)) {
		style.innerText = scss;
	}
	else {
		style.innerHTML = scss;
	}
	head.appendChild(style);
	var el = js.Lib.document.getElementById("utest-results");
	if(null == el) {
		el = js.Lib.document.createElement("div");
		el.id = "utest-results";
		js.Lib.document.body.appendChild(el);
	}
	el.innerHTML = report.getAll();
}
haxe.test.ui.text.HtmlReport.prototype._trace = function(v,infos) {
	var time = haxe.Timer.stamp();
	var delta = (this._traceTime == null?0:time - this._traceTime);
	this._traces.push({ msg : StringTools.htmlEscape(Std.string(v)), infos : infos, time : time - this.startTime, delta : delta, stack : haxe.Stack.callStack()});
	this._traceTime = haxe.Timer.stamp();
}
haxe.test.ui.text.HtmlReport.prototype._traceTime = null;
haxe.test.ui.text.HtmlReport.prototype._traces = null;
haxe.test.ui.text.HtmlReport.prototype.addClass = function(buf,result,name,isOk) {
	if(haxe.test.ui.common.ReportTools.skipResult(this,result.stats,isOk)) return;
	buf.b[buf.b.length] = "<li>";
	buf.b[buf.b.length] = ("<h2 class=\"classname\">" + name) + "</h2>";
	this.blockNumbers(buf,result.stats);
	buf.b[buf.b.length] = "<ul>\n";
	{
		var _g = 0, _g1 = result.methodNames();
		while(_g < _g1.length) {
			var mname = _g1[_g];
			++_g;
			this.addFixture(buf,result.get(mname),mname,isOk);
		}
	}
	buf.b[buf.b.length] = "</ul>\n";
	buf.b[buf.b.length] = "</li>\n";
}
haxe.test.ui.text.HtmlReport.prototype.addFixture = function(buf,result,name,isOk) {
	if(haxe.test.ui.common.ReportTools.skipResult(this,result.stats,isOk)) return;
	buf.b[buf.b.length] = "<li class=\"fixture\"><div class=\"li\">";
	buf.b[buf.b.length] = ("<span class=\"" + this.cls(result.stats)) + "bg fixtureresult\">";
	if(result.stats.isOk) {
		buf.b[buf.b.length] = "OK ";
	}
	else if(result.stats.hasErrors) {
		buf.b[buf.b.length] = "ERROR ";
	}
	else if(result.stats.hasFailures) {
		buf.b[buf.b.length] = "FAILURE ";
	}
	else if(result.stats.hasWarnings) {
		buf.b[buf.b.length] = "WARNING ";
	}
	buf.b[buf.b.length] = "</span>";
	buf.b[buf.b.length] = "<div class=\"fixturedetails\">";
	buf.b[buf.b.length] = ("<strong>" + name) + "</strong>";
	buf.b[buf.b.length] = ": ";
	this.resultNumbers(buf,result.stats);
	var messages = [];
	{ var $it0 = result.iterator();
	while( $it0.hasNext() ) { var assertation = $it0.next();
	{
		var $e = (assertation);
		switch( $e[1] ) {
		case 0:
		var pos = $e[2];
		{
			null;
		}break;
		case 1:
		var pos = $e[3], msg = $e[2];
		{
			messages.push(((("<strong>line " + pos.lineNumber) + "</strong>: <em>") + StringTools.htmlEscape(msg)) + "</em>");
		}break;
		case 2:
		var s = $e[3], e = $e[2];
		{
			messages.push((("<strong>error</strong>: <em>" + StringTools.htmlEscape(Std.string(e))) + "</em>\n") + this.formatStack(s));
		}break;
		case 3:
		var s = $e[3], e = $e[2];
		{
			messages.push((("<strong>setup error</strong>: " + StringTools.htmlEscape(Std.string(e))) + "\n") + this.formatStack(s));
		}break;
		case 4:
		var s = $e[3], e = $e[2];
		{
			messages.push((("<strong>tear-down error</strong>: " + StringTools.htmlEscape(Std.string(e))) + "\n") + this.formatStack(s));
		}break;
		case 5:
		var s = $e[3], missedAsyncs = $e[2];
		{
			messages.push("<strong>missed async call(s)</strong>: " + missedAsyncs);
		}break;
		case 6:
		var s = $e[3], e = $e[2];
		{
			messages.push((("<strong>async error</strong>: " + StringTools.htmlEscape(Std.string(e))) + "\n") + this.formatStack(s));
		}break;
		case 7:
		var msg = $e[2];
		{
			messages.push(StringTools.htmlEscape(msg));
		}break;
		}
	}
	}}
	if(messages.length > 0) {
		buf.b[buf.b.length] = "<div class=\"testoutput\">";
		buf.b[buf.b.length] = messages.join("<br/>");
		buf.b[buf.b.length] = "</div>\n";
	}
	buf.b[buf.b.length] = "</div>\n";
	buf.b[buf.b.length] = "</div></li>\n";
}
haxe.test.ui.text.HtmlReport.prototype.addPackage = function(buf,result,name,isOk) {
	if(haxe.test.ui.common.ReportTools.skipResult(this,result.stats,isOk)) return;
	if(name == "" && result.classNames().length == 0) return;
	buf.b[buf.b.length] = "<li>";
	buf.b[buf.b.length] = ("<h2>" + name) + "</h2>";
	this.blockNumbers(buf,result.stats);
	buf.b[buf.b.length] = "<ul>\n";
	{
		var _g = 0, _g1 = result.classNames();
		while(_g < _g1.length) {
			var cname = _g1[_g];
			++_g;
			this.addClass(buf,result.getClass(cname),cname,isOk);
		}
	}
	buf.b[buf.b.length] = "</ul>\n";
	buf.b[buf.b.length] = "</li>\n";
}
haxe.test.ui.text.HtmlReport.prototype.addPackages = function(buf,result,isOk) {
	if(haxe.test.ui.common.ReportTools.skipResult(this,result.stats,isOk)) return;
	buf.b[buf.b.length] = "<ul id=\"utest-results-packages\">\n";
	{
		var _g = 0, _g1 = result.packageNames(false);
		while(_g < _g1.length) {
			var name = _g1[_g];
			++_g;
			this.addPackage(buf,result.getPackage(name),name,isOk);
		}
	}
	buf.b[buf.b.length] = "</ul>\n";
}
haxe.test.ui.text.HtmlReport.prototype.aggregator = null;
haxe.test.ui.text.HtmlReport.prototype.blockNumbers = function(buf,stats) {
	buf.b[buf.b.length] = ("<div class=\"" + this.cls(stats)) + "bg statnumbers\">";
	this.resultNumbers(buf,stats);
	buf.b[buf.b.length] = "</div>";
}
haxe.test.ui.text.HtmlReport.prototype.cls = function(stats) {
	if(stats.hasErrors) return "error";
	else if(stats.hasFailures) return "failure";
	else if(stats.hasWarnings) return "warn";
	else return "ok";
}
haxe.test.ui.text.HtmlReport.prototype.complete = function(result) {
	this.result = result;
	this.handler(this);
	this.restoreTrace();
}
haxe.test.ui.text.HtmlReport.prototype.cssStyle = function() {
	return "body, dd, dt {\r\n  font-family: Verdana, Arial, Sans-serif;\r\n  font-size: 12px;\r\n}\r\ndl {\r\n  width: 180px;\r\n}\r\ndd, dt {\r\n  margin : 0;\r\n  padding : 2px 5px;\r\n  border-top: 1px solid #f0f0f0;\r\n  border-left: 1px solid #f0f0f0;\r\n  border-right: 1px solid #CCCCCC;\r\n  border-bottom: 1px solid #CCCCCC;\r\n}\r\ndd.value {\r\n  text-align: center;\r\n  background-color: #eeeeee;\r\n}\r\ndt {\r\n  text-align: left;\r\n  background-color: #e6e6e6;\r\n  float: left;\r\n  width: 100px;\r\n}\r\n\r\nh1, h2, h3, h4, h5, h6 {\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\nh1 {\r\n  text-align: center;\r\n  font-weight: bold;\r\n  padding: 5px 0 4px 0;\r\n  font-family: Arial, Sans-serif;\r\n  font-size: 18px;\r\n  border-top: 1px solid #f0f0f0;\r\n  border-left: 1px solid #f0f0f0;\r\n  border-right: 1px solid #CCCCCC;\r\n  border-bottom: 1px solid #CCCCCC;\r\n  margin: 0 2px 0px 2px;\r\n}\r\n\r\nh2 {\r\n  font-weight: bold;\r\n  padding: 2px 0 2px 8px;\r\n  font-family: Arial, Sans-serif;\r\n  font-size: 13px;\r\n  border-top: 1px solid #f0f0f0;\r\n  border-left: 1px solid #f0f0f0;\r\n  border-right: 1px solid #CCCCCC;\r\n  border-bottom: 1px solid #CCCCCC;\r\n  margin: 0 0 0px 0;\r\n  background-color: #FFFFFF;\r\n  color: #777777;\r\n}\r\n\r\nh2.classname {\r\n  color: #000000;\r\n}\r\n\r\n.okbg {\r\n  background-color: #66FF55;\r\n}\r\n.errorbg {\r\n  background-color: #CC1100;\r\n}\r\n.failurebg {\r\n  background-color: #EE3322;\r\n}\r\n.warnbg {\r\n  background-color: #FFCC99;\r\n}\r\n.headerinfo {\r\n  text-align: right;\r\n  font-size: 11px;\r\n  font - color: 0xCCCCCC;\r\n  margin: 0 2px 5px 2px;\r\n  border-left: 1px solid #f0f0f0;\r\n  border-right: 1px solid #CCCCCC;\r\n  border-bottom: 1px solid #CCCCCC;\r\n  padding: 2px;\r\n}\r\n\r\nli {\r\n  padding: 4px;\r\n  margin: 2px;\r\n  border-top: 1px solid #f0f0f0;\r\n  border-left: 1px solid #f0f0f0;\r\n  border-right: 1px solid #CCCCCC;\r\n  border-bottom: 1px solid #CCCCCC;\r\n  background-color: #e6e6e6;\r\n}\r\n\r\nli.fixture {\r\n  background-color: #f6f6f6;\r\n  padding-bottom: 6px;\r\n}\r\n\r\ndiv.fixturedetails {\r\n  padding-left: 108px;\r\n}\r\n\r\nul {\r\n  padding: 0;\r\n  margin: 6px 0 0 0;\r\n  list-style-type: none;\r\n}\r\n\r\nol {\r\n  padding: 0 0 0 28px;\r\n  margin: 0px 0 0 0;\r\n}\r\n\r\n.statnumbers {\r\n  padding: 2px 8px;\r\n}\r\n\r\n.fixtureresult {\r\n  width: 100px;\r\n  text-align: center;\r\n  display: block;\r\n  float: left;\r\n  font-weight: bold;\r\n  padding: 1px;\r\n  margin: 0 0 0 0;\r\n}\r\n\r\n.testoutput {\r\n  border: 1px dashed #CCCCCC;\r\n  margin: 4px 0 0 0;\r\n  padding: 4px 8px;\r\n  background-color: #eeeeee;\r\n}\r\n\r\nspan.tracepos, span.traceposempty {\r\n  display: block;\r\n  float: left;\r\n  font-weight: bold;\r\n  font-size: 9px;\r\n  width: 170px;\r\n  margin: 2px 0 0 2px;\r\n}\r\n\r\nspan.tracepos:hover {\r\n  cursor : pointer;\r\n  background-color: #ffff99;\r\n}\r\n\r\nspan.tracemsg {\r\n  display: block;\r\n  margin-left: 180px;\r\n  background-color: #eeeeee;\r\n  padding: 7px;\r\n}\r\n\r\nspan.tracetime {\r\n  display: block;\r\n  float: right;\r\n  margin: 2px;\r\n  font-size: 9px;\r\n  color: #777777;\r\n}\r\n\r\n\r\ndiv.trace ol {\r\n  padding: 0 0 0 40px;\r\n  color: #777777;\r\n}\r\n\r\ndiv.trace li {\r\n  padding: 0;\r\n}\r\n\r\ndiv.trace li div.li {\r\n  color: #000000;\r\n}\r\n\r\ndiv.trace h2 {\r\n  margin: 0 2px 0px 2px;\r\n  padding-left: 4px;\r\n}\r\n\r\n.tracepackage {\r\n  color: #777777;\r\n  font-weight: normal;\r\n}\r\n\r\n.clr {\r\n  clear: both;\r\n}\r\n\r\n#utesttip {\r\n  margin-top: -3px;\r\n  margin-left: 170px;\r\n  font-size: 9px;\r\n}\r\n\r\n#utesttip li {\r\n  margin: 0;\r\n  background-color: #ffff99;\r\n  padding: 2px 4px;\r\n  border: 0;\r\n  border-bottom: 1px dashed #ffff33;\r\n}";
}
haxe.test.ui.text.HtmlReport.prototype.displayHeader = null;
haxe.test.ui.text.HtmlReport.prototype.displaySuccessResults = null;
haxe.test.ui.text.HtmlReport.prototype.formatStack = function(stack,addNL) {
	if(addNL == null) addNL = true;
	var parts = [];
	var nl = (addNL?"\n":"");
	{
		var _g = 0, _g1 = haxe.Stack.toString(stack).split("\n");
		while(_g < _g1.length) {
			var part = _g1[_g];
			++_g;
			if(StringTools.trim(part) == "") continue;
			if(-1 < part.indexOf("Called from utest.")) continue;
			parts.push(part);
		}
	}
	var s = (("<ul><li>" + parts.join(("</li>" + nl) + "<li>")) + "</li></ul>") + nl;
	return (("<div>" + s) + "</div>") + nl;
}
haxe.test.ui.text.HtmlReport.prototype.formatTime = function(t) {
	return Math.round(t * 1000) + " ms";
}
haxe.test.ui.text.HtmlReport.prototype.getAll = function() {
	if(!haxe.test.ui.common.ReportTools.hasOutput(this,this.result.stats)) return "";
	else return (this.getHeader() + this.getTrace()) + this.getResults();
}
haxe.test.ui.text.HtmlReport.prototype.getHeader = function() {
	var buf = new StringBuf();
	if(!haxe.test.ui.common.ReportTools.hasHeader(this,this.result.stats)) return "";
	var end = haxe.Timer.stamp();
	var time = Std["int"]((end - this.startTime) * 1000) / 1000;
	var msg = "TEST OK";
	if(this.result.stats.hasErrors) msg = "TEST ERRORS";
	else if(this.result.stats.hasFailures) msg = "TEST FAILED";
	else if(this.result.stats.hasWarnings) msg = "WARNING REPORTED";
	buf.b[buf.b.length] = ((("<h1 class=\"" + this.cls(this.result.stats)) + "bg header\">") + msg) + "</h1>\n";
	buf.b[buf.b.length] = "<div class=\"headerinfo\">";
	this.resultNumbers(buf,this.result.stats);
	buf.b[buf.b.length] = (((" performed on <strong>" + haxe.test.ui.text.HtmlReport.platform) + "</strong>, executed in <strong> ") + time) + " sec. </strong></div >\n ";
	return buf.b.join("");
}
haxe.test.ui.text.HtmlReport.prototype.getHtml = function(title) {
	if(null == title) title = "utest: " + haxe.test.ui.text.HtmlReport.platform;
	var s = this.getAll();
	if("" == s) return "";
	else return this.wrapHtml(title,s);
}
haxe.test.ui.text.HtmlReport.prototype.getResults = function() {
	var buf = new StringBuf();
	this.addPackages(buf,this.result,this.result.stats.isOk);
	return buf.b.join("");
}
haxe.test.ui.text.HtmlReport.prototype.getTrace = function() {
	var buf = new StringBuf();
	if(this._traces == null || this._traces.length == 0) return "";
	buf.b[buf.b.length] = "<div class=\"trace\"><h2>traces</h2><ol>";
	{
		var _g = 0, _g1 = this._traces;
		while(_g < _g1.length) {
			var t = _g1[_g];
			++_g;
			buf.b[buf.b.length] = "<li><div class=\"li\">";
			var stack = StringTools.replace(this.formatStack(t.stack,false),"'","\\'");
			var method = ((((("<span class=\"tracepackage\">" + t.infos.className) + "</span><br/>") + t.infos.methodName) + "(") + t.infos.lineNumber) + ")";
			buf.b[buf.b.length] = ("<span class=\"tracepos\" onmouseover=\"utestTooltip(this.parentNode, '" + stack) + "')\" onmouseout=\"utestRemoveTooltip()\">";
			buf.b[buf.b.length] = method;
			buf.b[buf.b.length] = "</span><span class=\"tracetime\">";
			buf.b[buf.b.length] = "@ " + this.formatTime(t.time);
			if(Math.round(t.delta * 1000) > 0) buf.b[buf.b.length] = ", ~" + this.formatTime(t.delta);
			buf.b[buf.b.length] = "</span><span class=\"tracemsg\">";
			buf.b[buf.b.length] = StringTools.replace(StringTools.trim(t.msg),"\n","<br/>\n");
			buf.b[buf.b.length] = "</span><div class=\"clr\"></div></div></li>";
		}
	}
	buf.b[buf.b.length] = "</ol></div>";
	return buf.b.join("");
}
haxe.test.ui.text.HtmlReport.prototype.handler = null;
haxe.test.ui.text.HtmlReport.prototype.jsScript = function() {
	return "function utestTooltip(ref, text) {\r\n  var el = document.getElementById(\"utesttip\");\r\n  if(!el) {\r\n    var el = document.createElement(\"div\")\r\n    el.id = \"utesttip\";\r\n    el.style.position = \"absolute\";\r\n    document.body.appendChild(el)\r\n  }\r\n  var p = utestFindPos(ref);\r\n  el.style.left = p[0];\r\n  el.style.top = p[1];\r\n  el.innerHTML =  text;\r\n}\r\n\r\nfunction utestFindPos(el) {\r\n  var left = 0;\r\n  var top = 0;\r\n  do {\r\n    left += el.offsetLeft;\r\n    top += el.offsetTop;\r\n  } while(el = el.offsetParent)\r\n  return [left, top];\r\n}\r\n\r\nfunction utestRemoveTooltip() {\r\n  var el = document.getElementById(\"utesttip\")\r\n  if(el)\r\n    document.body.removeChild(el)\r\n}";
}
haxe.test.ui.text.HtmlReport.prototype.oldTrace = null;
haxe.test.ui.text.HtmlReport.prototype.redirectTrace = function() {
	if(this.traceRedirected) return;
	this._traces = [];
	this.oldTrace = $closure(haxe.Log,"trace");
	haxe.Log.trace = $closure(this,"_trace");
}
haxe.test.ui.text.HtmlReport.prototype.restoreTrace = function() {
	if(!this.traceRedirected) return;
	haxe.Log.trace = this.oldTrace;
}
haxe.test.ui.text.HtmlReport.prototype.result = null;
haxe.test.ui.text.HtmlReport.prototype.resultNumbers = function(buf,stats) {
	var numbers = [];
	if(stats.assertations == 1) numbers.push("<strong>1</strong> test");
	else numbers.push(("<strong>" + stats.assertations) + "</strong> tests");
	if(stats.successes != stats.assertations) {
		if(stats.successes == 1) numbers.push("<strong>1</strong> pass");
		else if(stats.successes > 0) numbers.push(("<strong>" + stats.successes) + "</strong> passes");
	}
	if(stats.errors == 1) numbers.push("<strong>1</strong> error");
	else if(stats.errors > 0) numbers.push(("<strong>" + stats.errors) + "</strong> errors");
	if(stats.failures == 1) numbers.push("<strong>1</strong> failure");
	else if(stats.failures > 0) numbers.push(("<strong>" + stats.failures) + "</strong> failures");
	if(stats.warnings == 1) numbers.push("<strong>1</strong> warning");
	else if(stats.warnings > 0) numbers.push(("<strong>" + stats.warnings) + "</strong> warnings");
	buf.b[buf.b.length] = numbers.join(", ");
}
haxe.test.ui.text.HtmlReport.prototype.setHandler = function(handler) {
	this.handler = handler;
}
haxe.test.ui.text.HtmlReport.prototype.start = function(e) {
	this.startTime = haxe.Timer.stamp();
}
haxe.test.ui.text.HtmlReport.prototype.startTime = null;
haxe.test.ui.text.HtmlReport.prototype.traceRedirected = null;
haxe.test.ui.text.HtmlReport.prototype.wrapHtml = function(title,s) {
	return ((((((("<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\" />\n<title>" + title) + "</title>\r\n      <style type=\"text/css\">") + this.cssStyle()) + "</style>\r\n      <script type=\"text/javascript\">\n") + this.jsScript()) + "\n</script>\n</head>\r\n      <body>\n") + s) + "\n</body>\n</html>";
}
haxe.test.ui.text.HtmlReport.prototype.__class__ = haxe.test.ui.text.HtmlReport;
haxe.test.ui.text.HtmlReport.__interfaces__ = [haxe.test.ui.common.IReport];
haxe.util.OrderExtension = function() { }
haxe.util.OrderExtension.__name__ = ["haxe","util","OrderExtension"];
haxe.util.OrderExtension.greaterThan = function(order) {
	return function(v1,v2) {
		return order(v1,v2) > 0;
	}
}
haxe.util.OrderExtension.greaterThanOrEqual = function(order) {
	return function(v1,v2) {
		return order(v1,v2) >= 0;
	}
}
haxe.util.OrderExtension.lessThan = function(order) {
	return function(v1,v2) {
		return order(v1,v2) < 0;
	}
}
haxe.util.OrderExtension.lessThanOrEqual = function(order) {
	return function(v1,v2) {
		return order(v1,v2) <= 0;
	}
}
haxe.util.OrderExtension.equal = function(order) {
	return function(v1,v2) {
		return order(v1,v2) == 0;
	}
}
haxe.util.OrderExtension.notEqual = function(order) {
	return function(v1,v2) {
		return order(v1,v2) != 0;
	}
}
haxe.util.OrderExtension.prototype.__class__ = haxe.util.OrderExtension;
haxe.functional.FoldableExtensionsTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
haxe.functional.FoldableExtensionsTestCase.__name__ = ["haxe","functional","FoldableExtensionsTestCase"];
haxe.functional.FoldableExtensionsTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) haxe.functional.FoldableExtensionsTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
haxe.functional.FoldableExtensionsTestCase.prototype.testForAny = function() {
	this.assertFalse(haxe.functional.FoldableExtensions.forAny(IterableExtensions.toSet([1,2,3]),function(v) {
		return v > 3;
	}),null,{ fileName : "FoldableExtensionsTestCase.hx", lineNumber : 85, className : "haxe.functional.FoldableExtensionsTestCase", methodName : "testForAny"});
	this.assertTrue(haxe.functional.FoldableExtensions.forAny(IterableExtensions.toSet([1,2,3]),function(v) {
		return v < 2;
	}),null,{ fileName : "FoldableExtensionsTestCase.hx", lineNumber : 86, className : "haxe.functional.FoldableExtensionsTestCase", methodName : "testForAny"});
}
haxe.functional.FoldableExtensionsTestCase.prototype.testIntSetMapToString = function() {
	var seta = haxe.data.collections.Set.create().addAll([1,2,3]);
	var setb = haxe.functional.FoldableExtensions.map(seta,function(i) {
		return IntExtensions.toString(i);
	});
	this.assertEquals(["1","2","3"],haxe.functional.FoldableExtensions.toArray(setb),null,null,{ fileName : "FoldableExtensionsTestCase.hx", lineNumber : 33, className : "haxe.functional.FoldableExtensionsTestCase", methodName : "testIntSetMapToString"});
}
haxe.functional.FoldableExtensionsTestCase.prototype.testListToSet = function() {
	var set = IterableExtensions.toSet(haxe.data.collections.List.create().addAll([1,2,2,3]));
	this.assertIs(set,haxe.data.collections.Set,null,{ fileName : "FoldableExtensionsTestCase.hx", lineNumber : 44, className : "haxe.functional.FoldableExtensionsTestCase", methodName : "testListToSet"});
	this.assertEquals(3,set.size(),null,null,{ fileName : "FoldableExtensionsTestCase.hx", lineNumber : 45, className : "haxe.functional.FoldableExtensionsTestCase", methodName : "testListToSet"});
}
haxe.functional.FoldableExtensionsTestCase.prototype.testMapToList = function() {
	var list = IterableExtensions.toList(haxe.data.collections.Map.create().set("a","A").set("b","B"));
	this.assertIs(list,haxe.data.collections.List,null,{ fileName : "FoldableExtensionsTestCase.hx", lineNumber : 38, className : "haxe.functional.FoldableExtensionsTestCase", methodName : "testMapToList"});
	this.assertEquals(2,list.size(),null,null,{ fileName : "FoldableExtensionsTestCase.hx", lineNumber : 39, className : "haxe.functional.FoldableExtensionsTestCase", methodName : "testMapToList"});
}
haxe.functional.FoldableExtensionsTestCase.prototype.testPartition = function() {
	var t = haxe.functional.FoldableExtensions.partition(IterableExtensions.toSet([1,2,3,4,5,6]),function(v) {
		return v % 2 != 0;
	});
	this.assertEquals(Tuple2.create(IterableExtensions.toSet([1,3,5]),IterableExtensions.toSet([2,4,6])),t,null,null,{ fileName : "FoldableExtensionsTestCase.hx", lineNumber : 56, className : "haxe.functional.FoldableExtensionsTestCase", methodName : "testPartition"});
}
haxe.functional.FoldableExtensionsTestCase.prototype.testPartitionWhile = function() {
	var t = haxe.functional.FoldableExtensions.partitionWhile(IterableExtensions.toSet([1,2,3,4,5,6]),function(v) {
		return v < 4;
	});
	this.assertEquals(Tuple2.create(IterableExtensions.toSet([1,2,3]),IterableExtensions.toSet([4,5,6])),t,null,null,{ fileName : "FoldableExtensionsTestCase.hx", lineNumber : 61, className : "haxe.functional.FoldableExtensionsTestCase", methodName : "testPartitionWhile"});
}
haxe.functional.FoldableExtensionsTestCase.prototype.testScanl = function() {
	var r = haxe.functional.FoldableExtensions.scanl(IterableExtensions.toSet([1,2,3,4,5]),1,function(a,b) {
		return a + b;
	});
	this.assertEquals(IterableExtensions.toSet([1,2,3,4,5,6]),r,null,null,{ fileName : "FoldableExtensionsTestCase.hx", lineNumber : 66, className : "haxe.functional.FoldableExtensionsTestCase", methodName : "testScanl"});
}
haxe.functional.FoldableExtensionsTestCase.prototype.testScanl1 = function() {
	var r = haxe.functional.FoldableExtensions.scanl1(IterableExtensions.toSet([1,2,3,4,5]),function(a,b) {
		return a + b;
	});
	this.assertEquals(IterableExtensions.toSet([1,3,4,5,6]),r,null,null,{ fileName : "FoldableExtensionsTestCase.hx", lineNumber : 76, className : "haxe.functional.FoldableExtensionsTestCase", methodName : "testScanl1"});
}
haxe.functional.FoldableExtensionsTestCase.prototype.testScanr = function() {
	var r = haxe.functional.FoldableExtensions.scanr(IterableExtensions.toSet([1,2,3,4,5]),1,function(a,b) {
		return a + b;
	});
	this.assertEquals(IterableExtensions.toSet([1,6,5,4,3,2]),r,null,null,{ fileName : "FoldableExtensionsTestCase.hx", lineNumber : 71, className : "haxe.functional.FoldableExtensionsTestCase", methodName : "testScanr"});
}
haxe.functional.FoldableExtensionsTestCase.prototype.testScanr1 = function() {
	var r = haxe.functional.FoldableExtensions.scanr1(IterableExtensions.toSet([1,2,3,4,5]),function(a,b) {
		return a + b;
	});
	this.assertEquals(IterableExtensions.toSet([5,9,8,7,6]),r,null,null,{ fileName : "FoldableExtensionsTestCase.hx", lineNumber : 81, className : "haxe.functional.FoldableExtensionsTestCase", methodName : "testScanr1"});
}
haxe.functional.FoldableExtensionsTestCase.prototype.testSetToList = function() {
	var list = IterableExtensions.toList(haxe.data.collections.Set.create().addAll([1,2,3]));
	this.assertIs(list,haxe.data.collections.List,null,{ fileName : "FoldableExtensionsTestCase.hx", lineNumber : 50, className : "haxe.functional.FoldableExtensionsTestCase", methodName : "testSetToList"});
	this.assertEquals(3,list.size(),null,null,{ fileName : "FoldableExtensionsTestCase.hx", lineNumber : 51, className : "haxe.functional.FoldableExtensionsTestCase", methodName : "testSetToList"});
}
haxe.functional.FoldableExtensionsTestCase.prototype.__class__ = haxe.functional.FoldableExtensionsTestCase;
haxe.test.ui.common.HeaderDisplayMode = { __ename__ : ["haxe","test","ui","common","HeaderDisplayMode"], __constructs__ : ["AlwaysShowHeader","NeverShowHeader","ShowHeaderWithResults"] }
haxe.test.ui.common.HeaderDisplayMode.AlwaysShowHeader = ["AlwaysShowHeader",0];
haxe.test.ui.common.HeaderDisplayMode.AlwaysShowHeader.toString = $estr;
haxe.test.ui.common.HeaderDisplayMode.AlwaysShowHeader.__enum__ = haxe.test.ui.common.HeaderDisplayMode;
haxe.test.ui.common.HeaderDisplayMode.NeverShowHeader = ["NeverShowHeader",1];
haxe.test.ui.common.HeaderDisplayMode.NeverShowHeader.toString = $estr;
haxe.test.ui.common.HeaderDisplayMode.NeverShowHeader.__enum__ = haxe.test.ui.common.HeaderDisplayMode;
haxe.test.ui.common.HeaderDisplayMode.ShowHeaderWithResults = ["ShowHeaderWithResults",2];
haxe.test.ui.common.HeaderDisplayMode.ShowHeaderWithResults.toString = $estr;
haxe.test.ui.common.HeaderDisplayMode.ShowHeaderWithResults.__enum__ = haxe.test.ui.common.HeaderDisplayMode;
haxe.test.ui.common.SuccessResultsDisplayMode = { __ename__ : ["haxe","test","ui","common","SuccessResultsDisplayMode"], __constructs__ : ["AlwaysShowSuccessResults","NeverShowSuccessResults","ShowSuccessResultsWithNoErrors"] }
haxe.test.ui.common.SuccessResultsDisplayMode.AlwaysShowSuccessResults = ["AlwaysShowSuccessResults",0];
haxe.test.ui.common.SuccessResultsDisplayMode.AlwaysShowSuccessResults.toString = $estr;
haxe.test.ui.common.SuccessResultsDisplayMode.AlwaysShowSuccessResults.__enum__ = haxe.test.ui.common.SuccessResultsDisplayMode;
haxe.test.ui.common.SuccessResultsDisplayMode.NeverShowSuccessResults = ["NeverShowSuccessResults",1];
haxe.test.ui.common.SuccessResultsDisplayMode.NeverShowSuccessResults.toString = $estr;
haxe.test.ui.common.SuccessResultsDisplayMode.NeverShowSuccessResults.__enum__ = haxe.test.ui.common.SuccessResultsDisplayMode;
haxe.test.ui.common.SuccessResultsDisplayMode.ShowSuccessResultsWithNoErrors = ["ShowSuccessResultsWithNoErrors",2];
haxe.test.ui.common.SuccessResultsDisplayMode.ShowSuccessResultsWithNoErrors.toString = $estr;
haxe.test.ui.common.SuccessResultsDisplayMode.ShowSuccessResultsWithNoErrors.__enum__ = haxe.test.ui.common.SuccessResultsDisplayMode;
haxe.util.Guid = function() { }
haxe.util.Guid.__name__ = ["haxe","util","Guid"];
haxe.util.Guid.generate = function() {
	var result = "";
	{
		var _g = 0;
		while(_g < 32) {
			var j = _g++;
			if(j == 8 || j == 12 || j == 16 || j == 20) {
				result += "-";
			}
			result += StringTools.hex(Math.floor(Math.random() * 16));
		}
	}
	return result.toUpperCase();
}
haxe.util.Guid.prototype.__class__ = haxe.util.Guid;
haxe.text.json.JsonTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
haxe.text.json.JsonTestCase.__name__ = ["haxe","text","json","JsonTestCase"];
haxe.text.json.JsonTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) haxe.text.json.JsonTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
haxe.text.json.JsonTestCase.prototype.assertIdentity = function(x) {
	this.assertLooksEqual(haxe.text.json.Json.decode(x),haxe.text.json.Json.decode(haxe.text.json.Json.encode(haxe.text.json.Json.decode(x))));
}
haxe.text.json.JsonTestCase.prototype.assertLooksEqual = function(x,y) {
	this.assertEquals(Std.string(x),Std.string(y),null,null,{ fileName : "JsonTestCase.hx", lineNumber : 35, className : "haxe.text.json.JsonTestCase", methodName : "assertLooksEqual"});
}
haxe.text.json.JsonTestCase.prototype.testArrayDecodings = function() {
	this.assertLooksEqual(haxe.text.json.Json.fromObject([]),haxe.text.json.Json.decode("[]"));
	this.assertLooksEqual(haxe.text.json.Json.fromObject([1,2,"foo"]),haxe.text.json.Json.decode("[1, 2, \"foo\"]"));
	this.assertLooksEqual(haxe.text.json.Json.fromObject([{ foo : "bar"}]),haxe.text.json.Json.decode("[{\"foo\": \"bar\"}]"));
}
haxe.text.json.JsonTestCase.prototype.testArrayEncodings = function() {
	this.assertLooksEqual(haxe.text.json.Json.toObject(haxe.text.json.Json.decode("[]")),[]);
	this.assertLooksEqual(haxe.text.json.Json.toObject(haxe.text.json.Json.decode("[1, 2, 3, 4, 5]")),[1,2,3,4,5]);
	this.assertLooksEqual(haxe.text.json.Json.toObject(haxe.text.json.Json.decode("[1, true, null, \"bar\"]")),[1,true,null,"bar"]);
}
haxe.text.json.JsonTestCase.prototype.testArrayFold = function() {
	this.assertLooksEqual(haxe.text.json.JValueExtensions.fold(haxe.text.json.Json.decode("[1]"),0.0,function(t,x) {
		return (function($this) {
			var $r;
			var $e = (x);
			switch( $e[1] ) {
			case 2:
			var x1 = $e[2];
			{
				$r = x1 + t;
			}break;
			default:{
				$r = t;
			}break;
			}
			return $r;
		}(this));
	}),1);
	this.assertLooksEqual(haxe.text.json.JValueExtensions.fold(haxe.text.json.Json.decode("[1, 2, 3, 4, 5]"),0.0,function(t,x) {
		return (function($this) {
			var $r;
			var $e = (x);
			switch( $e[1] ) {
			case 2:
			var x1 = $e[2];
			{
				$r = x1 + t;
			}break;
			default:{
				$r = t;
			}break;
			}
			return $r;
		}(this));
	}),15);
}
haxe.text.json.JsonTestCase.prototype.testArrays = function() {
	this.assertLooksEqual(haxe.text.json.JValue.JArray([]),haxe.text.json.Json.decode("[]"));
	this.assertIdentity("[]");
	this.assertIdentity("[[]]");
	this.assertIdentity("[[1]]");
	this.assertIdentity("[[1],[2]]");
	this.assertIdentity("[1,2,[3,4],5,6]");
	this.assertIdentity("[1,[2,[3,[4,[5,6]]]]]");
}
haxe.text.json.JsonTestCase.prototype.testBogusArrays = function() {
	this.assertLooksEqual(haxe.text.json.Json.decode("[1   , 2 ,, 3, ]"),haxe.text.json.JValue.JArray([haxe.text.json.JValue.JNumber(1),haxe.text.json.JValue.JNumber(2),haxe.text.json.JValue.JNumber(3)]));
	this.assertLooksEqual(haxe.text.json.Json.decode("[,,]"),haxe.text.json.JValue.JArray([]));
	this.assertLooksEqual(haxe.text.json.Json.decode("[,,1]"),haxe.text.json.JValue.JArray([haxe.text.json.JValue.JNumber(1)]));
}
haxe.text.json.JsonTestCase.prototype.testBogusObjects = function() {
	this.assertLooksEqual(haxe.text.json.Json.decode("{\"foo\": \"bar\", ,,\"bif\":\"baz\",}"),haxe.text.json.Json.decode("{\"foo\":\"bar\",\"bif\":\"baz\"}"));
	this.assertLooksEqual(haxe.text.json.Json.decode("{,,,}"),haxe.text.json.Json.decode("{}"));
}
haxe.text.json.JsonTestCase.prototype.testEnumExtractionReferentiality = function() {
	var x = haxe.text.json.JValue.JObject([]);
	haxe.text.json.JValueExtensions.extractArray(x).push(haxe.text.json.JValue.JField("foo",haxe.text.json.JValue.JString("bar")));
	haxe.text.json.JValueExtensions.extractArray(x).push(haxe.text.json.JValue.JField("bif",haxe.text.json.JValue.JString("baz")));
	this.assertLooksEqual(haxe.text.json.JValueExtensions.extractArray(x)[0],haxe.text.json.JValue.JField("foo",haxe.text.json.JValue.JString("bar")));
	this.assertLooksEqual(haxe.text.json.JValueExtensions.extractArray(x)[1],haxe.text.json.JValue.JField("bif",haxe.text.json.JValue.JString("baz")));
}
haxe.text.json.JsonTestCase.prototype.testLiteralDecodings = function() {
	this.assertLooksEqual(haxe.text.json.Json.decode("true"),haxe.text.json.JValue.JBool(true));
	this.assertLooksEqual(haxe.text.json.Json.decode("false"),haxe.text.json.JValue.JBool(false));
	this.assertLooksEqual(haxe.text.json.Json.decode("null"),haxe.text.json.JValue.JNull);
	this.assertLooksEqual(haxe.text.json.Json.decode("\"\""),haxe.text.json.JValue.JString(""));
	this.assertLooksEqual(haxe.text.json.Json.decode("3"),haxe.text.json.JValue.JNumber(3));
	this.assertLooksEqual(haxe.text.json.Json.decode("1.01"),haxe.text.json.JValue.JNumber(1.01));
	this.assertLooksEqual(haxe.text.json.Json.decode("\"foo\""),haxe.text.json.JValue.JString("foo"));
	this.assertLooksEqual(haxe.text.json.Json.decode("\"\\\\foo\""),haxe.text.json.JValue.JString("\\foo"));
	this.assertLooksEqual(haxe.text.json.Json.decode("\"\\nfoo\""),haxe.text.json.JValue.JString("\nfoo"));
	this.assertLooksEqual(haxe.text.json.Json.decode("\"\\\"foo\\\"\""),haxe.text.json.JValue.JString("\"foo\""));
	this.assertLooksEqual(haxe.text.json.Json.decode("\"\\u0020foobar\""),haxe.text.json.JValue.JString(" foobar"));
	this.assertLooksEqual(haxe.text.json.Json.decode("\"\\\"\\\" is equal to \\\"\\\", but isn't equal to \\\"\\n\\\"\""),haxe.text.json.JValue.JString("\"\" is equal to \"\", but isn't equal to \"\n\""));
}
haxe.text.json.JsonTestCase.prototype.testLiteralEncodings = function() {
	this.assertEquals(haxe.text.json.Json.encode(haxe.text.json.JValue.JString("foo")),"\"foo\"",null,null,{ fileName : "JsonTestCase.hx", lineNumber : 56, className : "haxe.text.json.JsonTestCase", methodName : "testLiteralEncodings"});
	this.assertEquals(haxe.text.json.Json.encode(haxe.text.json.JValue.JString("\"foo\"")),"\"\\\"foo\\\"\"",null,null,{ fileName : "JsonTestCase.hx", lineNumber : 57, className : "haxe.text.json.JsonTestCase", methodName : "testLiteralEncodings"});
	this.assertEquals(haxe.text.json.Json.encode(haxe.text.json.JValue.JString("foo\n")),"\"foo\\n\"",null,null,{ fileName : "JsonTestCase.hx", lineNumber : 58, className : "haxe.text.json.JsonTestCase", methodName : "testLiteralEncodings"});
	this.assertEquals(haxe.text.json.Json.encode(haxe.text.json.JValue.JString("\\foo\\")),"\"\\\\foo\\\\\"",null,null,{ fileName : "JsonTestCase.hx", lineNumber : 59, className : "haxe.text.json.JsonTestCase", methodName : "testLiteralEncodings"});
	this.assertEquals(haxe.text.json.Json.encode(haxe.text.json.JValue.JNumber(3)),"3",null,null,{ fileName : "JsonTestCase.hx", lineNumber : 61, className : "haxe.text.json.JsonTestCase", methodName : "testLiteralEncodings"});
	this.assertEquals(haxe.text.json.Json.encode(haxe.text.json.JValue.JNumber(1.01)),"1.01",null,null,{ fileName : "JsonTestCase.hx", lineNumber : 62, className : "haxe.text.json.JsonTestCase", methodName : "testLiteralEncodings"});
	this.assertEquals(haxe.text.json.Json.encode(haxe.text.json.JValue.JBool(true)),"true",null,null,{ fileName : "JsonTestCase.hx", lineNumber : 64, className : "haxe.text.json.JsonTestCase", methodName : "testLiteralEncodings"});
	this.assertEquals(haxe.text.json.Json.encode(haxe.text.json.JValue.JBool(false)),"false",null,null,{ fileName : "JsonTestCase.hx", lineNumber : 65, className : "haxe.text.json.JsonTestCase", methodName : "testLiteralEncodings"});
	this.assertEquals(haxe.text.json.Json.encode(haxe.text.json.JValue.JNull),"null",null,null,{ fileName : "JsonTestCase.hx", lineNumber : 66, className : "haxe.text.json.JsonTestCase", methodName : "testLiteralEncodings"});
}
haxe.text.json.JsonTestCase.prototype.testLiteralIdentities = function() {
	this.assertIdentity("\"\"");
	this.assertIdentity("0");
	this.assertIdentity("1.2");
	this.assertIdentity("-5");
	this.assertIdentity("false");
	this.assertIdentity("true");
	this.assertIdentity("null");
}
haxe.text.json.JsonTestCase.prototype.testMap = function() {
	this.assertLooksEqual(Lambda.array(Lambda.map(haxe.text.json.JValueExtensions.extractArray(haxe.text.json.Json.decode("[]")),function(x) {
		throw "YELP";
	})),[]);
	this.assertLooksEqual(Lambda.array(Lambda.map(haxe.text.json.JValueExtensions.extractArray(haxe.text.json.Json.decode("[1,2,3]")),function(x) {
		return haxe.text.json.JValueExtensions.extractNumber(x);
	})),[1,2,3]);
	this.assertLooksEqual(Lambda.array(Lambda.map(haxe.text.json.JValueExtensions.extractArray(haxe.text.json.Json.decode("[\"foo1\",\"bar12\",\"bif123\"]")),function(x) {
		return haxe.text.json.JValueExtensions.extractString(x).length;
	})),[4,5,6]);
	this.assertLooksEqual(Lambda.array(Lambda.map(haxe.text.json.JValueExtensions.extractArray(haxe.text.json.Json.decode("[]")),function(k) {
		throw "YELP";
	})),[]);
	this.assertLooksEqual(Lambda.array(Lambda.map(haxe.text.json.JValueExtensions.extractArray(haxe.text.json.Json.decode("{\"foo\":\"bar\"}")),function(k) {
		return haxe.text.json.JValueExtensions.extractKey(k);
	})),["foo"]);
	this.assertLooksEqual(Lambda.array(Lambda.map(haxe.text.json.JValueExtensions.extractArray(haxe.text.json.Json.decode("{\"foo\":\"bar\",\"bif\":\"baz\"}")),function(k) {
		return haxe.text.json.JValueExtensions.extractKey(k);
	})),["foo","bif"]);
}
haxe.text.json.JsonTestCase.prototype.testObjectDecodingRegression1 = function() {
	var string = "{\"results\":[{\"profile_image_url\":\"http://a2.twimg.com/profile_images/1045840718/lii_normal.jpg\",\"created_at\":\"Mon, 02 Aug 2010 20:36:16 +0000\",\"from_user\":\"AliineRodrigues\",\"metadata\":{\"result_type\":\"recent\"},\"to_user_id\":null,\"text\":\"RT @imnotmoni: @gabiipop @AliineRodrigues asaushaushauhsausa uu00F1a mulatininha fugosa. llame a santa kika -not xDD\",\"id\":20165933792,\"from_user_id\":28130713,\"geo\":null,\"iso_language_code\":\"es\",\"source\":\"&lt;a href=&quot;http://twitter.com/&quot;&gt;web&lt;/a&gt;\"},{\"profile_image_url\":\"http://a1.twimg.com/profile_images/996076313/Imagen023_normal.jpg\",\"created_at\":\"Mon, 02 Aug 2010 20:36:15 +0000\",\"from_user\":\"heri_wagner\",\"metadata\":{\"result_type\":\"recent\"},\"to_user_id\":null,\"text\":\"RT @perrodepavlov #esnaquu00EDsimo el culto a la santa muerte &lt;&lt; yo diria &quot;narquisimo&quot; =S\",\"id\":20165932871,\"from_user_id\":99215763,\"geo\":null,\"iso_language_code\":\"es\",\"source\":\"&lt;a href=&quot;http://github.com/cezarsa/chromed_bird&quot; rel=&quot;nofollow&quot;&gt;Chromed Bird&lt;/a&gt;\"},{\"profile_image_url\":\"http://a2.twimg.com/profile_images/1069963050/37263_1412094954987_1610913811_1003558_4400767_n_copy_normal.png\",\"created_at\":\"Mon, 02 Aug 2010 20:36:11 +0000\",\"from_user\":\"holdme_\",\"metadata\":{\"result_type\":\"recent\"},\"to_user_id\":null,\"text\":\"mamma santa che coscioni che hai fatto http://27.media.tumblr.com/tumblr_l6jhy1EH301qa27x6o1_500.png ahahhahahha @nickjonas\",\"id\":20165929351,\"from_user_id\":80652540,\"geo\":null,\"iso_language_code\":\"it\",\"source\":\"&lt;a href=&quot;http://83degrees.com/to/powertwitter&quot; rel=&quot;nofollow&quot;&gt;Power Twitter&lt;/a&gt;\"},{\"profile_image_url\":\"http://a3.twimg.com/profile_images/510112827/PRN_logo_normal.bmp\",\"created_at\":\"Mon, 02 Aug 2010 20:36:11 +0000\",\"from_user\":\"PRNbiz\",\"metadata\":{\"result_type\":\"recent\"},\"to_user_id\":null,\"text\":\"Program Announced: 34th Internationalization and Unicode Conference: Santa Clara, Calif., USA; October 18-20, 2010... http://bit.ly/9K92RB\",\"id\":20165929344,\"from_user_id\":34612434,\"geo\":null,\"iso_language_code\":\"en\",\"source\":\"&lt;a href=&quot;http://twitterfeed.com&quot; rel=&quot;nofollow&quot;&gt;twitterfeed&lt;/a&gt;\"},{\"profile_image_url\":\"http://a2.twimg.com/profile_images/1076818910/perfil_normal.jpg\",\"created_at\":\"Mon, 02 Aug 2010 20:36:11 +0000\",\"from_user\":\"Joanux810\",\"metadata\":{\"result_type\":\"recent\"},\"to_user_id\":89683958,\"text\":\"@baby_zinthy Alrededor de 100 pesos, pues santa fe queda al sur de la ciudad, y que de que-santafe, la expo queda a 5 minutos\",\"id\":20165929331,\"from_user_id\":109316690,\"to_user\":\"baby_zinthy\",\"geo\":null,\"iso_language_code\":\"es\",\"source\":\"&lt;a href=&quot;http://twitter.com/&quot;&gt;web&lt;/a&gt;\"},{\"profile_image_url\":\"http://a1.twimg.com/profile_images/118565949/imagem_7_normal.jpg\",\"created_at\":\"Mon, 02 Aug 2010 20:36:10 +0000\",\"from_user\":\"Zamorim\",\"metadata\":{\"result_type\":\"recent\"},\"to_user_id\":null,\"text\":\"RT @LeiSecaRJ: SEG 17:25 #Blitz Niteru00F3i RT @u200Eduannidejeanu200E: Blitz Santa Rosa Niteroi em frente ao supermercado premier com reboque.\",\"id\":20165928149,\"from_user_id\":36772960,\"geo\":null,\"iso_language_code\":\"es\",\"source\":\"&lt;a href=&quot;http://tweethopper.com&quot; rel=&quot;nofollow&quot;&gt;tweet hopper&lt;/a&gt;\"},{\"profile_image_url\":\"http://a2.twimg.com/profile_images/1009631706/65e3a70d-c7df-4f15-bba4-414e45087ded_normal.png\",\"created_at\":\"Mon, 02 Aug 2010 20:36:03 +0000\",\"from_user\":\"lucianoclaw\",\"metadata\":{\"result_type\":\"recent\"},\"to_user_id\":null,\"text\":\"no rio seru00E1 em magu00E9 e santa cruz e na bahia sera em serrinha esse ja tem data sera dia 20 e 21/11\",\"id\":20165920876,\"from_user_id\":28818485,\"geo\":null,\"iso_language_code\":\"pt\",\"source\":\"&lt;a href=&quot;http://www.tweetdeck.com&quot; rel=&quot;nofollow&quot;&gt;TweetDeck&lt;/a&gt;\"},{\"profile_image_url\":\"http://a0.twimg.com/profile_images/1092501912/pglr_-__48_normal.png\",\"created_at\":\"Mon, 02 Aug 2010 20:36:02 +0000\",\"from_user\":\"lanzameudocinho\",\"metadata\":{\"result_type\":\"recent\"},\"to_user_id\":null,\"text\":\"KKKKKKKKKKKKKKKKKKKKKKKKKK A @PELUTESAO SE ACHA A SANTA U.U u2193\",\"id\":20165920259,\"from_user_id\":129719133,\"geo\":null,\"iso_language_code\":\"it\",\"source\":\"&lt;a href=&quot;http://twitter.com/&quot;&gt;web&lt;/a&gt;\"},{\"profile_image_url\":\"http://a1.twimg.com/profile_images/1080492017/alok_normal.jpg\",\"created_at\":\"Mon, 02 Aug 2010 20:35:58 +0000\",\"from_user\":\"gabiipop\",\"metadata\":{\"result_type\":\"recent\"},\"to_user_id\":28130713,\"text\":\"@AliineRodrigues @imnotmoni shamemos santa kiku00E3 HUAHSUAHSUHSUSHU obrigado queridjinhow\",\"id\":20165917174,\"from_user_id\":21038998,\"to_user\":\"AliineRodrigues\",\"geo\":null,\"iso_language_code\":\"pt\",\"source\":\"&lt;a href=&quot;http://twitter.com/&quot;&gt;web&lt;/a&gt;\"},{\"profile_image_url\":\"http://a2.twimg.com/profile_images/894695414/MELT_SMILE_web_copy_normal.jpg\",\"created_at\":\"Mon, 02 Aug 2010 20:35:54 +0000\",\"from_user\":\"meltdowncomics\",\"metadata\":{\"result_type\":\"recent\"},\"to_user_id\":null,\"text\":\"RT @DisneyStorePrez: Seeing Santa Monica for the 1st time today since we put product in the store.  Cannot wait for the Friday opening!\",\"id\":20165913125,\"from_user_id\":1932339,\"geo\":null,\"iso_language_code\":\"en\",\"source\":\"&lt;a href=&quot;http://twitter.com/&quot;&gt;web&lt;/a&gt;\"},{\"profile_image_url\":\"http://a1.twimg.com/profile_images/1093206513/srk_don248_normal.jpg\",\"created_at\":\"Mon, 02 Aug 2010 20:35:45 +0000\",\"from_user\":\"nagendraaithal\",\"metadata\":{\"result_type\":\"recent\"},\"to_user_id\":null,\"text\":\"Santa Ko Exam Me Koi Sawal Nhi Aata Tha To Wo Hr Ques K Neche ???????????? Aisi Line Laga K Neche Likhta Hai Scratch Kar lo Answer Pad Lo\",\"id\":20165905363,\"from_user_id\":105070299,\"geo\":null,\"iso_language_code\":\"en\",\"source\":\"&lt;a href=&quot;http://dabr.co.uk&quot; rel=&quot;nofollow&quot;&gt;dabr&lt;/a&gt;\"},{\"profile_image_url\":\"http://a1.twimg.com/profile_images/1094044101/carnaval_2010_019_normal.jpg\",\"created_at\":\"Mon, 02 Aug 2010 20:35:44 +0000\",\"from_user\":\"donromero7\",\"metadata\":{\"result_type\":\"recent\"},\"to_user_id\":null,\"text\":\"RT @LeiSecaRJ: SEG 17:25 #Blitz Niteru00F3i RT @u200Eduannidejeanu200E: Blitz Santa Rosa Niteroi em frente ao supermercado premier com reboque.\",\"id\":20165904898,\"from_user_id\":49424581,\"geo\":null,\"iso_language_code\":\"es\",\"source\":\"&lt;a href=&quot;http://tweethopper.com&quot; rel=&quot;nofollow&quot;&gt;tweet hopper&lt;/a&gt;\"},{\"profile_image_url\":\"http://a3.twimg.com/profile_images/1052988803/msn1_normal.jpg\",\"created_at\":\"Mon, 02 Aug 2010 20:35:34 +0000\",\"from_user\":\"spacecarolis\",\"metadata\":{\"result_type\":\"recent\"},\"to_user_id\":16487990,\"text\":\"@pelanzarestart voooooooooooooooooooolta pra santa catarina pe )):\",\"id\":20165895807,\"from_user_id\":70616091,\"to_user\":\"pelanzarestart\",\"geo\":null,\"iso_language_code\":\"it\",\"source\":\"&lt;a href=&quot;http://twitter.com/&quot;&gt;web&lt;/a&gt;\"},{\"profile_image_url\":\"http://a0.twimg.com/profile_images/627448636/IMG_2187_normal.JPG\",\"created_at\":\"Mon, 02 Aug 2010 20:35:33 +0000\",\"from_user\":\"Yarbroughtow\",\"metadata\":{\"result_type\":\"recent\"},\"to_user_id\":null,\"text\":\"Yarbrough Bros Towing in Rohnert Park this a/m to body shop in Santa Rosa, then got 1 in Healdsburg towing in Santa Rosa direction also.\",\"id\":20165894168,\"from_user_id\":90110966,\"geo\":null,\"iso_language_code\":\"en\",\"source\":\"&lt;a href=&quot;http://twitter.com/&quot;&gt;web&lt;/a&gt;\"},{\"profile_image_url\":\"http://a0.twimg.com/profile_images/1024563412/400x400_DS_Logo_normal.jpg\",\"created_at\":\"Mon, 02 Aug 2010 20:35:29 +0000\",\"from_user\":\"DisneyStorePrez\",\"metadata\":{\"result_type\":\"recent\"},\"to_user_id\":null,\"text\":\"Seeing Santa Monica for the 1st time today since we put product in the store.  Cannot wait for the Friday opening!\",\"id\":20165891220,\"from_user_id\":8558121,\"geo\":null,\"iso_language_code\":\"en\",\"source\":\"&lt;a href=&quot;http://twitter.com/&quot;&gt;web&lt;/a&gt;\"}],\"max_id\":20165933792,\"since_id\":0,\"refresh_url\":\"?since_id=20165933792&q=santa\",\"next_page\":\"?page=2&max_id=20165933792&q=santa\",\"results_per_page\":15,\"page\":1,\"completed_in\":0.890801,\"query\":\"santa\"}";
	var decoded = haxe.text.json.Json.decodeObject(string);
	this.assertEquals(string,haxe.text.json.Json.encodeObject(decoded),null,null,{ fileName : "JsonTestCase.hx", lineNumber : 198, className : "haxe.text.json.JsonTestCase", methodName : "testObjectDecodingRegression1"});
}
haxe.text.json.JsonTestCase.prototype.testObjectDecodings = function() {
	this.assertLooksEqual(haxe.text.json.Json.fromObject({ foo : "bar"}),haxe.text.json.Json.decode("{\"foo\": \"bar\"}"));
	this.assertLooksEqual(haxe.text.json.Json.fromObject({ foo : "bar", bif : [1,2,"baz"]}),haxe.text.json.Json.decode("{\"foo\": \"bar\", \"bif\": [1, 2, \"baz\"]}"));
	this.assertLooksEqual(haxe.text.json.Json.fromObject({ }),haxe.text.json.Json.decode("{}"));
}
haxe.text.json.JsonTestCase.prototype.testObjectEncodings = function() {
	this.assertLooksEqual(haxe.text.json.Json.toObject(haxe.text.json.Json.decode("{\"foo\": \"bar\"}")),{ foo : "bar"});
	this.assertLooksEqual(haxe.text.json.Json.toObject(haxe.text.json.Json.decode("{}")),{ });
	this.assertLooksEqual(haxe.text.json.Json.toObject(haxe.text.json.Json.decode("{\"foo\": [1, 2, 3, 4, 5]}")),{ foo : [1,2,3,4,5]});
	this.assertLooksEqual(haxe.text.json.Json.toObject(haxe.text.json.Json.decode("{\"foo\": [1, 2, 3, 4, 5], \"bar\": null}")),{ foo : [1,2,3,4,5], bar : null});
}
haxe.text.json.JsonTestCase.prototype.testObjectFold = function() {
	this.assertLooksEqual(haxe.text.json.JValueExtensions.fold(haxe.text.json.Json.decode("{\"foo\":\"bar\"}"),[],function(xs,x) {
		var v = null;
		try {
			v = [haxe.text.json.JValueExtensions.extractKey(x)];
		}
		catch( $e0 ) {
			{
				var e = $e0;
				{
					v = [];
				}
			}
		}
		return xs.concat(v);
	}),["foo"]);
	this.assertLooksEqual(haxe.text.json.JValueExtensions.fold(haxe.text.json.Json.decode("{\"a\":\"b\",\"c\":\"d\"}"),[],function(xs,x) {
		var v = null;
		try {
			v = [haxe.text.json.JValueExtensions.extractKey(x)];
		}
		catch( $e1 ) {
			{
				var e = $e1;
				{
					v = [];
				}
			}
		}
		return xs.concat(v);
	}),["a","c"]);
}
haxe.text.json.JsonTestCase.prototype.testObjects = function() {
	this.assertIdentity("{}");
	this.assertIdentity("{\"foo\":{}}");
	this.assertIdentity("{\"bar\":null,\"foo\":{}}");
	this.assertIdentity("{\"foo\":\"bar\"}");
	this.assertIdentity("{\"baz\":\"bok\",\"foo\":{\"bar\":\"bif\"}}");
	this.assertIdentity("{\"bar\":[1,2,3,4,{\"bif\":\"bar\"}],\"bif\":{\"baz\":\"bok\"}}");
}
haxe.text.json.JsonTestCase.prototype.testPath = function() {
	this.assertLooksEqual(haxe.text.json.JValueExtensions.path(haxe.text.json.Json.decode("{\"foo\":\"bar\"}"),"foo"),haxe.text.json.JValue.JString("bar"));
	this.assertLooksEqual(haxe.text.json.JValueExtensions.path(haxe.text.json.Json.decode("{\"a\":{\"b\":{\"c\":5,\"d\":6}}}"),"a/b/c"),haxe.text.json.JValue.JNumber(5));
	this.assertLooksEqual(haxe.text.json.JValueExtensions.path(haxe.text.json.Json.decode("{\"a\":{\"b\":{\"c\":5,\"d\":6}}}"),"a/b/d"),haxe.text.json.JValue.JNumber(6));
	this.assertLooksEqual(haxe.text.json.JValueExtensions.path(haxe.text.json.Json.decode("{\"a\":{\"b\":{\"c\":5,\"d\":6}}}"),"/a/b/c"),haxe.text.json.JValue.JNumber(5));
	this.assertLooksEqual(haxe.text.json.JValueExtensions.path(haxe.text.json.Json.decode("{\"a\":{\"b\":{\"c\":5,\"d\":6}}}"),"/a/b/d"),haxe.text.json.JValue.JNumber(6));
	this.assertLooksEqual(haxe.text.json.JValueExtensions.path(haxe.text.json.Json.decode("{\"a\":{\"b\":{\"c\":5,\"d\":6}}}"),"a/b/c/"),haxe.text.json.JValue.JNumber(5));
	this.assertLooksEqual(haxe.text.json.JValueExtensions.path(haxe.text.json.Json.decode("{\"a\":{\"b\":{\"c\":5,\"d\":6}}}"),"a/b/d/"),haxe.text.json.JValue.JNumber(6));
	this.assertLooksEqual(haxe.text.json.JValueExtensions.path(haxe.text.json.Json.decode("{\"a\":{\"b\":{\"c\":5,\"d\":6}}}"),"/a/b/c/"),haxe.text.json.JValue.JNumber(5));
	this.assertLooksEqual(haxe.text.json.JValueExtensions.path(haxe.text.json.Json.decode("{\"a\":{\"b\":{\"c\":5,\"d\":6}}}"),"/a/b/d/"),haxe.text.json.JValue.JNumber(6));
	this.assertLooksEqual(haxe.text.json.JValueExtensions.path(haxe.text.json.Json.decode("{\"a\":{\"b\":{\"c\":5,\"d\":6}}}"),"////a/b/c/"),haxe.text.json.JValue.JNumber(5));
	this.assertLooksEqual(haxe.text.json.JValueExtensions.path(haxe.text.json.Json.decode("{\"a\":{\"b\":{\"c\":5,\"d\":6}}}"),"////a/b/d/"),haxe.text.json.JValue.JNumber(6));
	this.assertLooksEqual(haxe.text.json.JValueExtensions.path(haxe.text.json.Json.decode("\"foobar\""),""),haxe.text.json.JValue.JString("foobar"));
}
haxe.text.json.JsonTestCase.prototype.testRandomStrings = function() {
	var _g = 1;
	while(_g < 1000) {
		var i = _g++;
		this.assertIdentity(haxe.text.json.Json.encode(haxe.text.json.JsonGenerator.generateString()));
	}
}
haxe.text.json.JsonTestCase.prototype.testRandomValues = function() {
	var _g = 1;
	while(_g < 1000) {
		var i = _g++;
		this.assertIdentity(haxe.text.json.Json.encode(haxe.text.json.JsonGenerator.generate()));
	}
}
haxe.text.json.JsonTestCase.prototype.testSanityOfParseInt = function() {
	this.assertEquals(Std.parseInt("0x30"),48,null,null,{ fileName : "JsonTestCase.hx", lineNumber : 42, className : "haxe.text.json.JsonTestCase", methodName : "testSanityOfParseInt"});
	this.assertEquals(Std.parseInt("0xD8A6"),55462,null,null,{ fileName : "JsonTestCase.hx", lineNumber : 43, className : "haxe.text.json.JsonTestCase", methodName : "testSanityOfParseInt"});
	this.assertEquals(Std.parseInt("55462"),55462,null,null,{ fileName : "JsonTestCase.hx", lineNumber : 44, className : "haxe.text.json.JsonTestCase", methodName : "testSanityOfParseInt"});
}
haxe.text.json.JsonTestCase.prototype.__class__ = haxe.text.json.JsonTestCase;
js.dom.HTMLElementExtensionsTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
	this._doc = js.Env.document;
}}
js.dom.HTMLElementExtensionsTestCase.__name__ = ["js","dom","HTMLElementExtensionsTestCase"];
js.dom.HTMLElementExtensionsTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) js.dom.HTMLElementExtensionsTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
js.dom.HTMLElementExtensionsTestCase.prototype._doc = null;
js.dom.HTMLElementExtensionsTestCase.prototype.alertObject = function(obj) {
	
        (function(){for (key in obj) {
            alert(key);
        }})();
}
js.dom.HTMLElementExtensionsTestCase.prototype.createTestElement = function(name,id) {
	var body = this._doc.getElementsByTagName("body")[0];
	var newChild = this._doc.createElement(name);
	newChild.setAttribute("id",id);
	newChild.setAttribute("style","position:relative; height:1; width:1; left: -1000000000;");
	body.appendChild(newChild);
	return newChild;
}
js.dom.HTMLElementExtensionsTestCase.prototype.newTable = function(id) {
	if(id == null) id = "test";
	var table = this.createTestElement("TABLE","table");
	table.setAttribute("id",id);
	var th = this._doc.createElement("th");
	var cap = this._doc.createElement("caption");
	var thead = this._doc.createElement("thead");
	var text = this._doc.createTextNode("foo");
	var tr = this._doc.createElement("tr");
	var tbody = this._doc.createElement("tbody");
	var td1 = this._doc.createElement("td");
	var td2 = this._doc.createElement("td");
	var tfoot = this._doc.createElement("tfoot");
	table.appendChild(cap);
	table.appendChild(thead);
	table.appendChild(tbody);
	thead.appendChild(tr);
	tr.appendChild(th);
	th.appendChild(text);
	tr.appendChild(td1);
	tr.appendChild(td2);
	tbody.appendChild(tr);
	table.appendChild(tfoot);
	return OptionExtensions.get((table.nodeName == "TABLE"?Option.Some(table):Option.None));
}
js.dom.HTMLElementExtensionsTestCase.prototype.removeTestElement = function(id) {
	var body = this._doc.getElementsByTagName("body")[0];
	var delChild = this._doc.getElementById(id);
	body.removeChild(delChild);
	if(this._doc.getElementById(id) != null) throw "Element still exists after attempting to delete: " + delChild.nodeName;
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsAPPLETWorks = function() {
	var applet = this.createTestElement("APPLET","test");
	this.assertEquals("APPLET",OptionExtensions.get((applet.nodeName == "APPLET"?Option.Some(applet):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 347, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsAPPLETWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsAREAWorks = function() {
	var area = this.createTestElement("AREA","test");
	this.assertEquals("AREA",OptionExtensions.get((area.nodeName == "AREA"?Option.Some(area):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 361, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsAREAWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsAUDIOOptionWorks = function() {
	var audio = this.createTestElement("audio","test");
	this.assertEquals("AUDIO",OptionExtensions.get((audio.nodeName == "AUDIO"?Option.Some(audio):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 94, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsAUDIOOptionWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsAWorks = function() {
	var a = this.createTestElement("A","test");
	this.assertEquals("A",OptionExtensions.get((a.nodeName == "A"?Option.Some(a):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 319, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsAWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsBASEFONTWorks = function() {
	var baseFont = this.createTestElement("baseFont","test");
	this.assertEquals("BASEFONT",OptionExtensions.get((baseFont.nodeName == "BASEFONT"?Option.Some(baseFont):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 291, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsBASEFONTWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsBASEOptionWorks = function() {
	var base = this.createTestElement("base","test");
	this.assertEquals("BASE",OptionExtensions.get((base.nodeName == "BASE"?Option.Some(base):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 129, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsBASEOptionWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsBODYOptionWorks = function() {
	var body = this._doc.getElementsByTagName("body")[0];
	this.assertEquals("BODY",OptionExtensions.get((body.nodeName == "BODY"?Option.Some(body):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 63, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsBODYOptionWorks"});
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsBRWorks = function() {
	var br = this.createTestElement("br","test");
	this.assertEquals("BR",OptionExtensions.get((br.nodeName == "BR"?Option.Some(br):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 284, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsBRWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsBUTTONButtonWorks = function() {
	var button = this.createTestElement("button","test");
	this.assertEquals("BUTTON",OptionExtensions.get((button.nodeName == "BUTTON"?Option.Some(button):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 186, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsBUTTONButtonWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsCANVASOptionWorks = function() {
	var canvas = this.createTestElement("canvas","test");
	this.assertEquals("CANVAS",OptionExtensions.get((canvas.nodeName == "CANVAS"?Option.Some(canvas):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 151, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsCANVASOptionWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsDIRWorks = function() {
	var dir = this.createTestElement("dir","test");
	this.assertEquals("DIR",OptionExtensions.get((dir.nodeName == "DIR"?Option.Some(dir):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 235, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsDIRWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsDIVOptionWorks = function() {
	var div = this._doc.getElementsByTagName("div")[0];
	this.assertEquals("DIV",OptionExtensions.get((div.nodeName == "DIV"?Option.Some(div):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 51, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsDIVOptionWorks"});
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsDLWorks = function() {
	var dl = this.createTestElement("dl","test");
	this.assertEquals("DL",OptionExtensions.get((dl.nodeName == "DL"?Option.Some(dl):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 228, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsDLWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsFIELDSETWorks = function() {
	var fieldSet = this.createTestElement("fieldset","test");
	this.assertEquals("FIELDSET",OptionExtensions.get((fieldSet.nodeName == "FIELDSET"?Option.Some(fieldSet):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 200, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsFIELDSETWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsFONTWorks = function() {
	var Font = this.createTestElement("Font","test");
	this.assertEquals("FONT",OptionExtensions.get((Font.nodeName == "FONT"?Option.Some(Font):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 298, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsFONTWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsFORMOptionWorks = function() {
	var form = this._doc.getElementsByTagName("form")[0];
	this.assertEquals("FORM",OptionExtensions.get((form.nodeName == "FORM"?Option.Some(form):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 57, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsFORMOptionWorks"});
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsFRAMESETWorks = function() {
	var frameset = this.createTestElement("frameset","test");
	this.assertEquals("FRAMESET",OptionExtensions.get((frameset.nodeName == "FRAMESET"?Option.Some(frameset):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 417, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsFRAMESETWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsFRAMEWorks = function() {
	var frame = this.createTestElement("frame","test");
	this.assertEquals("FRAME",OptionExtensions.get((frame.nodeName == "FRAME"?Option.Some(frame):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 424, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsFRAMEWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsHEADOptionWorks = function() {
	var head = this.createTestElement("HEAD","test");
	this.assertEquals("HEAD",OptionExtensions.get((head.nodeName == "HEAD"?Option.Some(head):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 101, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsHEADOptionWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsHRWorks = function() {
	var hr = this.createTestElement("HR","test");
	this.assertEquals("HR",OptionExtensions.get((hr.nodeName == "HR"?Option.Some(hr):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 305, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsHRWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsHWorks = function() {
	var h = this.createTestElement("h","test");
	this.assertEquals("H",OptionExtensions.get((h.nodeName == "H"?Option.Some(h):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 263, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsHWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsIFRAMEWorks = function() {
	var iFrame = this.createTestElement("iFrame","test");
	this.assertEquals("IFRAME",OptionExtensions.get((iFrame.nodeName == "IFRAME"?Option.Some(iFrame):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 431, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsIFRAMEWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsIFrameOptionWorks = function() {
	var iframe = this._doc.getElementsByTagName("iframe")[0];
	this.assertEquals("IFRAME",OptionExtensions.get((iframe.nodeName == "IFRAME"?Option.Some(iframe):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 39, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsIFrameOptionWorks"});
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsIMGWorks = function() {
	var image = this.createTestElement("IMG","test");
	this.assertEquals("IMG",OptionExtensions.get((image.nodeName == "IMG"?Option.Some(image):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 326, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsIMGWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsINPUTInputWorks = function() {
	var input = this.createTestElement("input","test");
	this.assertEquals("INPUT",OptionExtensions.get((input.nodeName == "INPUT"?Option.Some(input):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 172, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsINPUTInputWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsISINDEXOptionWorks = function() {
	var isIndex = this.createTestElement("isIndex","test");
	this.assertEquals("ISINDEX",OptionExtensions.get((isIndex.nodeName == "ISINDEX"?Option.Some(isIndex):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 137, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsISINDEXOptionWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsLABELLabelWorks = function() {
	var label = this.createTestElement("label","test");
	this.assertEquals("LABEL",OptionExtensions.get((label.nodeName == "LABEL"?Option.Some(label):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 193, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsLABELLabelWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsLEGENDWorks = function() {
	var legend = this.createTestElement("legend","test");
	this.assertEquals("LEGEND",OptionExtensions.get((legend.nodeName == "LEGEND"?Option.Some(legend):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 207, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsLEGENDWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsLINKOptionWorks = function() {
	var link = this.createTestElement("link","test");
	this.assertEquals("LINK",OptionExtensions.get((link.nodeName == "LINK"?Option.Some(link):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 108, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsLINKOptionWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsLIWorks = function() {
	var li = this.createTestElement("li","test");
	this.assertEquals("LI",OptionExtensions.get((li.nodeName == "LI"?Option.Some(li):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 249, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsLIWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsMAPWorks = function() {
	var map = this.createTestElement("MAP","test");
	this.assertEquals("MAP",OptionExtensions.get((map.nodeName == "MAP"?Option.Some(map):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 354, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsMAPWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsMENUWorks = function() {
	var menu = this.createTestElement("menu","test");
	this.assertEquals("MENU",OptionExtensions.get((menu.nodeName == "MENU"?Option.Some(menu):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 242, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsMENUWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsMETAOptionWorks = function() {
	var meta = this.createTestElement("meta","test");
	this.assertEquals("META",OptionExtensions.get((meta.nodeName == "META"?Option.Some(meta):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 122, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsMETAOptionWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsMODWorks = function() {
	var mod = this.createTestElement("MOD","test");
	this.assertEquals("MOD",OptionExtensions.get((mod.nodeName == "MOD"?Option.Some(mod):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 312, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsMODWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsOBJECTWorks = function() {
	var object = this.createTestElement("OBJECT","test");
	this.assertEquals("OBJECT",OptionExtensions.get((object.nodeName == "OBJECT"?Option.Some(object):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 333, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsOBJECTWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsOLWorks = function() {
	var ol = this.createTestElement("ol","test");
	this.assertEquals("OL",OptionExtensions.get((ol.nodeName == "OL"?Option.Some(ol):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 221, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsOLWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsOPTGROUPOptionWorks = function() {
	var optGroup = this.createTestElement("optGroup","test");
	this.assertEquals("OPTGROUP",OptionExtensions.get((optGroup.nodeName == "OPTGROUP"?Option.Some(optGroup):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 158, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsOPTGROUPOptionWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsOPTIONOptionWorks = function() {
	var option = this.createTestElement("option","test");
	this.assertEquals("OPTION",OptionExtensions.get((option.nodeName == "OPTION"?Option.Some(option):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 165, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsOPTIONOptionWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsPARAMWorks = function() {
	var param = this.createTestElement("PARAM","test");
	this.assertEquals("PARAM",OptionExtensions.get((param.nodeName == "PARAM"?Option.Some(param):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 340, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsPARAMWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsPREWorks = function() {
	var pre = this.createTestElement("pre","test");
	this.assertEquals("PRE",OptionExtensions.get((pre.nodeName == "PRE"?Option.Some(pre):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 277, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsPREWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsPWorks = function() {
	var p = this.createTestElement("p","test");
	this.assertEquals("P",OptionExtensions.get((p.nodeName == "P"?Option.Some(p):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 256, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsPWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsQUOTEWorks = function() {
	var quote = this.createTestElement("quote","test");
	this.assertEquals("QUOTE",OptionExtensions.get((quote.nodeName == "QUOTE"?Option.Some(quote):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 270, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsQUOTEWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsSELECTOptionWorks = function() {
	var select = this.createTestElement("select","test");
	this.assertEquals("SELECT",OptionExtensions.get((select.nodeName == "SELECT"?Option.Some(select):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 144, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsSELECTOptionWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsSTYLEOptionWorks = function() {
	var style = this._doc.getElementsByTagName("STYLE")[0];
	this.assertEquals("STYLE",OptionExtensions.get((style.nodeName == "STYLE"?Option.Some(style):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 69, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsSTYLEOptionWorks"});
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsScriptOptionWorks = function() {
	var script = this._doc.getElementsByTagName("script")[0];
	this.assertEquals("SCRIPT",OptionExtensions.get((script.nodeName == "SCRIPT"?Option.Some(script):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 45, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsScriptOptionWorks"});
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsTABLEBODYWorks = function() {
	var table = this.newTable("table");
	this.assertEquals("TBODY",js.dom.HTMLElementExtensions.asTBody(table.tBodies[0]).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 396, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsTABLEBODYWorks"});
	this.removeTestElement("table");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsTABLECAPTIONWorks = function() {
	var caption = this.createTestElement("CAPTION","test");
	this.assertEquals("CAPTION",OptionExtensions.get((caption.nodeName == "CAPTION"?Option.Some(caption):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 375, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsTABLECAPTIONWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsTABLEFOOTWorks = function() {
	var table = this.newTable("table");
	this.assertEquals("TFOOT",js.dom.HTMLElementExtensions.asTFoot(table.tFoot).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 403, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsTABLEFOOTWorks"});
	this.removeTestElement("table");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsTABLEHEADWorks = function() {
	var table = this.newTable("table");
	this.assertEquals("THEAD",js.dom.HTMLElementExtensions.asTHead(table.tHead).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 389, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsTABLEHEADWorks"});
	this.removeTestElement("table");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsTABLETDWorks = function() {
	var td = this.createTestElement("TD","test");
	this.assertEquals("TD",OptionExtensions.get((td.nodeName == "TD"?Option.Some(td):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 382, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsTABLETDWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsTABLETRWorks = function() {
	var table = this.newTable("table");
	this.assertEquals("TR",js.dom.HTMLElementExtensions.asTR(table.rows[0]).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 410, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsTABLETRWorks"});
	this.removeTestElement("table");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsTABLEWorks = function() {
	var table = this.createTestElement("TABLE","test");
	this.assertEquals("TABLE",OptionExtensions.get((table.nodeName == "TABLE"?Option.Some(table):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 368, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsTABLEWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsTEXTAREATextAreaWorks = function() {
	var textArea = this.createTestElement("textArea","test");
	this.assertEquals("TEXTAREA",OptionExtensions.get((textArea.nodeName == "TEXTAREA"?Option.Some(textArea):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 179, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsTEXTAREATextAreaWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsTEXTOptionWorks = function() {
	var p = this.createTestElement("P","test");
	var appendText = this._doc.createTextNode("foo");
	p.appendChild(appendText);
	var text = p.firstChild;
	this.assertEquals("foo",text.nodeValue,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 80, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsTEXTOptionWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsTITLEOptionWorks = function() {
	var title = this.createTestElement("title","test");
	this.assertEquals("TITLE",OptionExtensions.get((title.nodeName == "TITLE"?Option.Some(title):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 115, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsTITLEOptionWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsULWorks = function() {
	var ul = this.createTestElement("ul","test");
	this.assertEquals("UL",OptionExtensions.get((ul.nodeName == "UL"?Option.Some(ul):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 214, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsULWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.testThatHTMLElementExtensionsVideoOptionWorks = function() {
	var video = this.createTestElement("video","test");
	this.assertEquals("VIDEO",OptionExtensions.get((video.nodeName == "VIDEO"?Option.Some(video):Option.None)).nodeName,null,null,{ fileName : "HTMLElementExtensionsTestCase.hx", lineNumber : 87, className : "js.dom.HTMLElementExtensionsTestCase", methodName : "testThatHTMLElementExtensionsVideoOptionWorks"});
	this.removeTestElement("test");
}
js.dom.HTMLElementExtensionsTestCase.prototype.__class__ = js.dom.HTMLElementExtensionsTestCase;
haxe.io.log.LoggerTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
haxe.io.log.LoggerTestCase.__name__ = ["haxe","io","log","LoggerTestCase"];
haxe.io.log.LoggerTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) haxe.io.log.LoggerTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
haxe.io.log.LoggerTestCase.prototype.doTest = function(handler,f) {
	var invoked = false;
	haxe.io.log.Logger.defaultHandlers.push(function(l,t,p) {
		handler(l,t,p);
		invoked = true;
	});
	f(haxe.io.log.Logger.get());
	haxe.io.log.Logger.defaultHandlers.pop();
	this.assertTrue(invoked,null,{ fileName : "LoggerTestCase.hx", lineNumber : 134, className : "haxe.io.log.LoggerTestCase", methodName : "doTest"});
}
haxe.io.log.LoggerTestCase.prototype.testLogDebug = function() {
	haxe.io.log.Logger.defaultLevel = haxe.io.log.LogLevel.Debug;
	var self = this;
	this.doTest(function(level,text,p) {
		var $e = (level);
		switch( $e[1] ) {
		case 1:
		{
			self.assertEquals("hi",text,null,null,{ fileName : "LoggerTestCase.hx", lineNumber : 34, className : "haxe.io.log.LoggerTestCase", methodName : "testLogDebug"});
		}break;
		default:{
			self.assertTrue(false,null,{ fileName : "LoggerTestCase.hx", lineNumber : 36, className : "haxe.io.log.LoggerTestCase", methodName : "testLogDebug"});
		}break;
		}
	},function(logger) {
		logger.debug("hi",{ fileName : "LoggerTestCase.hx", lineNumber : 40, className : "haxe.io.log.LoggerTestCase", methodName : "testLogDebug"});
	});
}
haxe.io.log.LoggerTestCase.prototype.testLogError = function() {
	haxe.io.log.Logger.defaultLevel = haxe.io.log.LogLevel.Error;
	var self = this;
	this.doTest(function(level,text,p) {
		var $e = (level);
		switch( $e[1] ) {
		case 4:
		{
			self.assertEquals("hi",text,null,null,{ fileName : "LoggerTestCase.hx", lineNumber : 93, className : "haxe.io.log.LoggerTestCase", methodName : "testLogError"});
		}break;
		default:{
			self.assertTrue(false,null,{ fileName : "LoggerTestCase.hx", lineNumber : 95, className : "haxe.io.log.LoggerTestCase", methodName : "testLogError"});
		}break;
		}
	},function(logger) {
		logger.error("hi",{ fileName : "LoggerTestCase.hx", lineNumber : 99, className : "haxe.io.log.LoggerTestCase", methodName : "testLogError"});
		logger.warning("bye",{ fileName : "LoggerTestCase.hx", lineNumber : 100, className : "haxe.io.log.LoggerTestCase", methodName : "testLogError"});
	});
}
haxe.io.log.LoggerTestCase.prototype.testLogFatal = function() {
	haxe.io.log.Logger.defaultLevel = haxe.io.log.LogLevel.Fatal;
	var self = this;
	this.doTest(function(level,text,p) {
		var $e = (level);
		switch( $e[1] ) {
		case 5:
		{
			self.assertEquals("hi",text,null,null,{ fileName : "LoggerTestCase.hx", lineNumber : 113, className : "haxe.io.log.LoggerTestCase", methodName : "testLogFatal"});
		}break;
		default:{
			self.assertTrue(false,null,{ fileName : "LoggerTestCase.hx", lineNumber : 115, className : "haxe.io.log.LoggerTestCase", methodName : "testLogFatal"});
		}break;
		}
	},function(logger) {
		logger.fatal("hi",{ fileName : "LoggerTestCase.hx", lineNumber : 119, className : "haxe.io.log.LoggerTestCase", methodName : "testLogFatal"});
		logger.error("bye",{ fileName : "LoggerTestCase.hx", lineNumber : 120, className : "haxe.io.log.LoggerTestCase", methodName : "testLogFatal"});
	});
}
haxe.io.log.LoggerTestCase.prototype.testLogInfo = function() {
	haxe.io.log.Logger.defaultLevel = haxe.io.log.LogLevel.Info;
	var self = this;
	this.doTest(function(level,text,p) {
		var $e = (level);
		switch( $e[1] ) {
		case 2:
		{
			self.assertEquals("hi",text,null,null,{ fileName : "LoggerTestCase.hx", lineNumber : 53, className : "haxe.io.log.LoggerTestCase", methodName : "testLogInfo"});
		}break;
		default:{
			self.assertTrue(false,null,{ fileName : "LoggerTestCase.hx", lineNumber : 55, className : "haxe.io.log.LoggerTestCase", methodName : "testLogInfo"});
		}break;
		}
	},function(logger) {
		logger.info("hi",{ fileName : "LoggerTestCase.hx", lineNumber : 59, className : "haxe.io.log.LoggerTestCase", methodName : "testLogInfo"});
		logger.debug("bye",{ fileName : "LoggerTestCase.hx", lineNumber : 60, className : "haxe.io.log.LoggerTestCase", methodName : "testLogInfo"});
	});
}
haxe.io.log.LoggerTestCase.prototype.testLogWarning = function() {
	haxe.io.log.Logger.defaultLevel = haxe.io.log.LogLevel.Warning;
	var self = this;
	this.doTest(function(level,text,p) {
		var $e = (level);
		switch( $e[1] ) {
		case 3:
		{
			self.assertEquals("hi",text,null,null,{ fileName : "LoggerTestCase.hx", lineNumber : 73, className : "haxe.io.log.LoggerTestCase", methodName : "testLogWarning"});
		}break;
		default:{
			self.assertTrue(false,null,{ fileName : "LoggerTestCase.hx", lineNumber : 75, className : "haxe.io.log.LoggerTestCase", methodName : "testLogWarning"});
		}break;
		}
	},function(logger) {
		logger.warning("hi",{ fileName : "LoggerTestCase.hx", lineNumber : 79, className : "haxe.io.log.LoggerTestCase", methodName : "testLogWarning"});
		logger.info("bye",{ fileName : "LoggerTestCase.hx", lineNumber : 80, className : "haxe.io.log.LoggerTestCase", methodName : "testLogWarning"});
	});
}
haxe.io.log.LoggerTestCase.prototype.__class__ = haxe.io.log.LoggerTestCase;
haxe.data.collections.MapTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
haxe.data.collections.MapTestCase.__name__ = ["haxe","data","collections","MapTestCase"];
haxe.data.collections.MapTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) haxe.data.collections.MapTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
haxe.data.collections.MapTestCase.prototype.defaultMap = function() {
	var m = this.map();
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			m = m.set(i,"foo");
		}
	}
	return m;
}
haxe.data.collections.MapTestCase.prototype.map = function(defaults) {
	var m = haxe.data.collections.Map.create();
	if(null != defaults) m = m.addAll(defaults);
	return m;
}
haxe.data.collections.MapTestCase.prototype.testAddingSameKeyButDifferentValueUpdatesMap = function() {
	var m = this.defaultMap();
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			m = m.set(i,"bar");
			this.assertEquals("bar",OptionExtensions.get(m.get(i)),null,null,{ fileName : "MapTestCase.hx", lineNumber : 110, className : "haxe.data.collections.MapTestCase", methodName : "testAddingSameKeyButDifferentValueUpdatesMap"});
			this.assertEquals(100,m.size(),null,null,{ fileName : "MapTestCase.hx", lineNumber : 111, className : "haxe.data.collections.MapTestCase", methodName : "testAddingSameKeyButDifferentValueUpdatesMap"});
		}
	}
}
haxe.data.collections.MapTestCase.prototype.testAddingSameKeysAndSameValueDoesNotChangeMap = function() {
	var m = this.defaultMap();
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			var oldM = m;
			m = m.set(i,"foo");
			this.assertEquals(oldM,m,null,null,{ fileName : "MapTestCase.hx", lineNumber : 99, className : "haxe.data.collections.MapTestCase", methodName : "testAddingSameKeysAndSameValueDoesNotChangeMap"});
			this.assertEquals(100,m.size(),null,null,{ fileName : "MapTestCase.hx", lineNumber : 100, className : "haxe.data.collections.MapTestCase", methodName : "testAddingSameKeysAndSameValueDoesNotChangeMap"});
		}
	}
}
haxe.data.collections.MapTestCase.prototype.testCanIterateThroughKeys = function() {
	var m = this.defaultMap();
	var count = 4950;
	var iterated = 0;
	{ var $it0 = m.keys().iterator();
	while( $it0.hasNext() ) { var k = $it0.next();
	{
		count -= k;
		++iterated;
	}
	}}
	this.assertEquals(100,iterated,null,null,{ fileName : "MapTestCase.hx", lineNumber : 127, className : "haxe.data.collections.MapTestCase", methodName : "testCanIterateThroughKeys"});
	this.assertEquals(0,count,null,null,{ fileName : "MapTestCase.hx", lineNumber : 128, className : "haxe.data.collections.MapTestCase", methodName : "testCanIterateThroughKeys"});
}
haxe.data.collections.MapTestCase.prototype.testCanIterateThroughValues = function() {
	var m = this.defaultMap();
	{ var $it0 = m.values().iterator();
	while( $it0.hasNext() ) { var v = $it0.next();
	{
		this.assertEquals("foo",v,null,null,{ fileName : "MapTestCase.hx", lineNumber : 135, className : "haxe.data.collections.MapTestCase", methodName : "testCanIterateThroughValues"});
	}
	}}
}
haxe.data.collections.MapTestCase.prototype.testCanRetrieveValuesForKeys = function() {
	var m = this.defaultMap();
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			this.assertEquals("foo",OptionExtensions.getOrElse(m.get(i),function() {
				return "bar";
			}),null,null,{ fileName : "MapTestCase.hx", lineNumber : 53, className : "haxe.data.collections.MapTestCase", methodName : "testCanRetrieveValuesForKeys"});
		}
	}
}
haxe.data.collections.MapTestCase.prototype.testCompare = function() {
	this.assertTrue(this.map().compare(this.map()) == 0,null,{ fileName : "MapTestCase.hx", lineNumber : 154, className : "haxe.data.collections.MapTestCase", methodName : "testCompare"});
	this.assertTrue(this.map([Tuple2.create(1,"a")]).compare(this.map([Tuple2.create(1,"a")])) == 0,null,{ fileName : "MapTestCase.hx", lineNumber : 155, className : "haxe.data.collections.MapTestCase", methodName : "testCompare"});
	this.assertTrue(this.map([Tuple2.create(1,"a")]).compare(this.map([Tuple2.create(2,"a")])) < 0,null,{ fileName : "MapTestCase.hx", lineNumber : 156, className : "haxe.data.collections.MapTestCase", methodName : "testCompare"});
	this.assertTrue(this.map([Tuple2.create(1,"a")]).compare(this.map([Tuple2.create(1,"b")])) < 0,null,{ fileName : "MapTestCase.hx", lineNumber : 157, className : "haxe.data.collections.MapTestCase", methodName : "testCompare"});
	this.assertTrue(this.map([Tuple2.create(1,"a")]).compare(this.map([Tuple2.create(1,"a"),Tuple2.create(2,"a")])) < 0,null,{ fileName : "MapTestCase.hx", lineNumber : 158, className : "haxe.data.collections.MapTestCase", methodName : "testCompare"});
	this.assertTrue(this.map([Tuple2.create(2,"a")]).compare(this.map([Tuple2.create(1,"b")])) > 0,null,{ fileName : "MapTestCase.hx", lineNumber : 159, className : "haxe.data.collections.MapTestCase", methodName : "testCompare"});
}
haxe.data.collections.MapTestCase.prototype.testContainsKeys = function() {
	var m = this.map();
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			this.assertFalse(m.containsKey(i),null,{ fileName : "MapTestCase.hx", lineNumber : 83, className : "haxe.data.collections.MapTestCase", methodName : "testContainsKeys"});
			m = m.set(i,"foo");
			this.assertTrue(m.containsKey(i),null,{ fileName : "MapTestCase.hx", lineNumber : 87, className : "haxe.data.collections.MapTestCase", methodName : "testContainsKeys"});
		}
	}
}
haxe.data.collections.MapTestCase.prototype.testEquals = function() {
	this.assertTrue(this.map().equals(this.map()),null,{ fileName : "MapTestCase.hx", lineNumber : 146, className : "haxe.data.collections.MapTestCase", methodName : "testEquals"});
	this.assertTrue(this.map([Tuple2.create(1,"a")]).equals(this.map([Tuple2.create(1,"a")])),null,{ fileName : "MapTestCase.hx", lineNumber : 147, className : "haxe.data.collections.MapTestCase", methodName : "testEquals"});
	this.assertFalse(this.map([Tuple2.create(1,"a")]).equals(this.map([Tuple2.create(2,"a")])),null,{ fileName : "MapTestCase.hx", lineNumber : 148, className : "haxe.data.collections.MapTestCase", methodName : "testEquals"});
	this.assertFalse(this.map([Tuple2.create(1,"a")]).equals(this.map([Tuple2.create(1,"b")])),null,{ fileName : "MapTestCase.hx", lineNumber : 149, className : "haxe.data.collections.MapTestCase", methodName : "testEquals"});
	this.assertFalse(this.map([Tuple2.create(1,"a")]).equals(this.map([Tuple2.create(1,"a"),Tuple2.create(2,"a")])),null,{ fileName : "MapTestCase.hx", lineNumber : 150, className : "haxe.data.collections.MapTestCase", methodName : "testEquals"});
}
haxe.data.collections.MapTestCase.prototype.testFilter = function() {
	var m = haxe.functional.FoldableExtensions.filter(this.defaultMap(),function(t) {
		return t._1 < 50;
	});
	this.assertEquals(50,m.size(),null,null,{ fileName : "MapTestCase.hx", lineNumber : 142, className : "haxe.data.collections.MapTestCase", methodName : "testFilter"});
}
haxe.data.collections.MapTestCase.prototype.testHashCode = function() {
	this.assertNotEquals(0,this.map().hashCode(),null,{ fileName : "MapTestCase.hx", lineNumber : 168, className : "haxe.data.collections.MapTestCase", methodName : "testHashCode"});
	this.assertNotEquals(0,this.map([Tuple2.create(1,"a"),Tuple2.create(2,"a")]).hashCode(),null,{ fileName : "MapTestCase.hx", lineNumber : 169, className : "haxe.data.collections.MapTestCase", methodName : "testHashCode"});
}
haxe.data.collections.MapTestCase.prototype.testLoadNeverExceedsMax = function() {
	var m = this.map();
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			m = m.set(i,"foo");
			this.assertTrue(m.load() <= haxe.data.collections.Map.MaxLoad,null,{ fileName : "MapTestCase.hx", lineNumber : 75, className : "haxe.data.collections.MapTestCase", methodName : "testLoadNeverExceedsMax"});
		}
	}
}
haxe.data.collections.MapTestCase.prototype.testSizeGrowsWhenAddingDuplicateKeys = function() {
	var m = this.map().set(0,"foo");
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			m = m.set(0,"foo");
		}
	}
	this.assertEquals(1,m.size(),null,null,{ fileName : "MapTestCase.hx", lineNumber : 46, className : "haxe.data.collections.MapTestCase", methodName : "testSizeGrowsWhenAddingDuplicateKeys"});
}
haxe.data.collections.MapTestCase.prototype.testSizeGrowsWhenAddingUniqueKeys = function() {
	var m = this.map();
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			this.assertEquals(i,m.size(),null,null,{ fileName : "MapTestCase.hx", lineNumber : 33, className : "haxe.data.collections.MapTestCase", methodName : "testSizeGrowsWhenAddingUniqueKeys"});
			m = m.set(i,"foo");
		}
	}
	this.assertEquals(100,m.size(),null,null,{ fileName : "MapTestCase.hx", lineNumber : 38, className : "haxe.data.collections.MapTestCase", methodName : "testSizeGrowsWhenAddingUniqueKeys"});
}
haxe.data.collections.MapTestCase.prototype.testSizeShrinksWhenRemovingKeys = function() {
	var m = this.defaultMap();
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			this.assertEquals(100 - i,m.size(),null,null,{ fileName : "MapTestCase.hx", lineNumber : 61, className : "haxe.data.collections.MapTestCase", methodName : "testSizeShrinksWhenRemovingKeys"});
			m = m.removeByKey(i);
		}
	}
	this.assertEquals(0,m.size(),null,null,{ fileName : "MapTestCase.hx", lineNumber : 66, className : "haxe.data.collections.MapTestCase", methodName : "testSizeShrinksWhenRemovingKeys"});
}
haxe.data.collections.MapTestCase.prototype.testToString = function() {
	this.assertEquals("Map ()",this.map().toString(),null,null,{ fileName : "MapTestCase.hx", lineNumber : 163, className : "haxe.data.collections.MapTestCase", methodName : "testToString"});
	this.assertEquals("Map (1 -> a, 2 -> a)",this.map([Tuple2.create(1,"a"),Tuple2.create(2,"a")]).toString(),null,null,{ fileName : "MapTestCase.hx", lineNumber : 164, className : "haxe.data.collections.MapTestCase", methodName : "testToString"});
}
haxe.data.collections.MapTestCase.prototype.__class__ = haxe.data.collections.MapTestCase;
haxe.util.StringExtensions = function() { }
haxe.util.StringExtensions.__name__ = ["haxe","util","StringExtensions"];
haxe.util.StringExtensions.chunk = function(str,len) {
	var start = 0;
	var end = IntExtensions.min((start + len),str.length);
	return (end == 0?haxe.data.collections.List.nil():(function($this) {
		var $r;
		var prefix = str.substr(start,end);
		var rest = str.substr(end);
		$r = haxe.util.StringExtensions.chunk(rest,len).prepend(prefix);
		return $r;
	}(this)));
}
haxe.util.StringExtensions.chars = function(str) {
	var a = [];
	{
		var _g1 = 0, _g = str.length;
		while(_g1 < _g) {
			var i = _g1++;
			a.push(str.charAt(i));
		}
	}
	return IterableExtensions.toList(a);
}
haxe.util.StringExtensions.string = function(l) {
	return l.foldr("",function(b,a) {
		return b + a;
	});
}
haxe.util.StringExtensions.toCamelCase = function(str) {
	return haxe.util.StringExtensions.SepAlphaPattern.customReplace(str,function(e) {
		return e.matched(2).toUpperCase();
	});
}
haxe.util.StringExtensions.fromCamelCase = function(str,sep) {
	return haxe.util.StringExtensions.AlphaUpperAlphaPattern.customReplace(str,function(e) {
		return (e.matched(1) + sep) + e.matched(2).toLowerCase();
	});
}
haxe.util.StringExtensions.prototype.__class__ = haxe.util.StringExtensions;
haxe.test.ui.common.PackageResult = function(packageName) { if( packageName === $_ ) return; {
	this.packageName = packageName;
	this.classes = new Hash();
	this.packages = new Hash();
	this.stats = new haxe.test.ui.common.ResultStats();
}}
haxe.test.ui.common.PackageResult.__name__ = ["haxe","test","ui","common","PackageResult"];
haxe.test.ui.common.PackageResult.prototype.addClass = function(result) {
	this.classes.set(result.className,result);
	this.stats.wire(result.stats);
}
haxe.test.ui.common.PackageResult.prototype.addPackage = function(result) {
	this.packages.set(result.packageName,result);
	this.stats.wire(result.stats);
}
haxe.test.ui.common.PackageResult.prototype.addResult = function(result,flattenPackage) {
	var pack = this.getOrCreatePackage(result.pack,flattenPackage,this);
	var cls = this.getOrCreateClass(pack,result.cls,result.setup,result.teardown);
	var fix = this.createFixture(result.method,result.assertations);
	cls.add(fix);
}
haxe.test.ui.common.PackageResult.prototype.classNames = function(errorsHavePriority) {
	if(errorsHavePriority == null) errorsHavePriority = true;
	var names = [];
	{ var $it0 = this.classes.keys();
	while( $it0.hasNext() ) { var name = $it0.next();
	names.push(name);
	}}
	if(errorsHavePriority) {
		var me = this;
		names.sort(function(a,b) {
			var $as = me.getClass(a).stats;
			var bs = me.getClass(b).stats;
			if($as.hasErrors) {
				return ((!bs.hasErrors)?-1:(($as.errors == bs.errors?Reflect.compare(a,b):Reflect.compare($as.errors,bs.errors))));
			}
			else if(bs.hasErrors) {
				return 1;
			}
			else if($as.hasFailures) {
				return ((!bs.hasFailures)?-1:(($as.failures == bs.failures?Reflect.compare(a,b):Reflect.compare($as.failures,bs.failures))));
			}
			else if(bs.hasFailures) {
				return 1;
			}
			else if($as.hasWarnings) {
				return ((!bs.hasWarnings)?-1:(($as.warnings == bs.warnings?Reflect.compare(a,b):Reflect.compare($as.warnings,bs.warnings))));
			}
			else if(bs.hasWarnings) {
				return 1;
			}
			else {
				return Reflect.compare(a,b);
			}
		});
	}
	else {
		names.sort(function(a,b) {
			return Reflect.compare(a,b);
		});
	}
	return names;
}
haxe.test.ui.common.PackageResult.prototype.classes = null;
haxe.test.ui.common.PackageResult.prototype.createFixture = function(method,assertations) {
	var f = new haxe.test.ui.common.FixtureResult(method);
	{ var $it0 = assertations.iterator();
	while( $it0.hasNext() ) { var assertation = $it0.next();
	f.add(assertation);
	}}
	return f;
}
haxe.test.ui.common.PackageResult.prototype.existsClass = function(name) {
	return this.classes.exists(name);
}
haxe.test.ui.common.PackageResult.prototype.existsPackage = function(name) {
	return this.packages.exists(name);
}
haxe.test.ui.common.PackageResult.prototype.getClass = function(name) {
	return this.classes.get(name);
}
haxe.test.ui.common.PackageResult.prototype.getOrCreateClass = function(pack,cls,setup,teardown) {
	if(pack.existsClass(cls)) return pack.getClass(cls);
	var c = new haxe.test.ui.common.ClassResult(cls,setup,teardown);
	pack.addClass(c);
	return c;
}
haxe.test.ui.common.PackageResult.prototype.getOrCreatePackage = function(pack,flat,ref) {
	if(pack == null || pack == "") return ref;
	if(flat) {
		if(ref.existsPackage(pack)) return ref.getPackage(pack);
		var p = new haxe.test.ui.common.PackageResult(pack);
		ref.addPackage(p);
		return p;
	}
	else {
		var parts = pack.split(".");
		{
			var _g = 0;
			while(_g < parts.length) {
				var part = parts[_g];
				++_g;
				ref = this.getOrCreatePackage(part,true,ref);
			}
		}
		return ref;
	}
}
haxe.test.ui.common.PackageResult.prototype.getPackage = function(name) {
	if(this.packageName == null && name == "") return this;
	return this.packages.get(name);
}
haxe.test.ui.common.PackageResult.prototype.packageName = null;
haxe.test.ui.common.PackageResult.prototype.packageNames = function(errorsHavePriority) {
	if(errorsHavePriority == null) errorsHavePriority = true;
	var names = [];
	if(this.packageName == null) names.push("");
	{ var $it0 = this.packages.keys();
	while( $it0.hasNext() ) { var name = $it0.next();
	names.push(name);
	}}
	if(errorsHavePriority) {
		var me = this;
		names.sort(function(a,b) {
			var $as = me.getPackage(a).stats;
			var bs = me.getPackage(b).stats;
			if($as.hasErrors) {
				return ((!bs.hasErrors)?-1:(($as.errors == bs.errors?Reflect.compare(a,b):Reflect.compare($as.errors,bs.errors))));
			}
			else if(bs.hasErrors) {
				return 1;
			}
			else if($as.hasFailures) {
				return ((!bs.hasFailures)?-1:(($as.failures == bs.failures?Reflect.compare(a,b):Reflect.compare($as.failures,bs.failures))));
			}
			else if(bs.hasFailures) {
				return 1;
			}
			else if($as.hasWarnings) {
				return ((!bs.hasWarnings)?-1:(($as.warnings == bs.warnings?Reflect.compare(a,b):Reflect.compare($as.warnings,bs.warnings))));
			}
			else if(bs.hasWarnings) {
				return 1;
			}
			else {
				return Reflect.compare(a,b);
			}
		});
	}
	else {
		names.sort(function(a,b) {
			return Reflect.compare(a,b);
		});
	}
	return names;
}
haxe.test.ui.common.PackageResult.prototype.packages = null;
haxe.test.ui.common.PackageResult.prototype.stats = null;
haxe.test.ui.common.PackageResult.prototype.__class__ = haxe.test.ui.common.PackageResult;
haxe.time.ScheduledExecutor = function() { }
haxe.time.ScheduledExecutor.__name__ = ["haxe","time","ScheduledExecutor"];
haxe.time.ScheduledExecutor.prototype.forever = null;
haxe.time.ScheduledExecutor.prototype.once = null;
haxe.time.ScheduledExecutor.prototype.repeat = null;
haxe.time.ScheduledExecutor.prototype.repeatWhile = null;
haxe.time.ScheduledExecutor.prototype.__class__ = haxe.time.ScheduledExecutor;
haxe.time.ScheduledExecutorSystem = function(p) { if( p === $_ ) return; {
	null;
}}
haxe.time.ScheduledExecutorSystem.__name__ = ["haxe","time","ScheduledExecutorSystem"];
haxe.time.ScheduledExecutorSystem.prototype.forever = function(f,ms) {
	var future = new Future();
	var timer = new haxe.Timer(ms);
	future.ifCanceled($closure(timer,"stop"));
	timer.run = f;
	return future;
}
haxe.time.ScheduledExecutorSystem.prototype.once = function(f,ms) {
	var run = false;
	var future = new Future();
	var timer = haxe.Timer.delay(function() {
		run = true;
		future.deliver(f());
	},ms);
	future.allowCancelOnlyIf(function() {
		return (run?false:(function($this) {
			var $r;
			timer.stop();
			$r = true;
			return $r;
		}(this)));
	});
	return future;
}
haxe.time.ScheduledExecutorSystem.prototype.repeat = function(seed,f,ms,times) {
	var future = new Future();
	return (times > 0?(function($this) {
		var $r;
		var result = seed;
		var timer = new haxe.Timer(ms);
		future.ifCanceled($closure(timer,"stop"));
		timer.run = function() {
			result = f(result);
			--times;
			if(times == 0) {
				timer.stop();
				future.deliver(result);
			}
		}
		$r = future;
		return $r;
	}(this)):future.deliver(seed));
}
haxe.time.ScheduledExecutorSystem.prototype.repeatWhile = function(seed,f,ms,pred) {
	var future = new Future();
	return (pred(seed)?(function($this) {
		var $r;
		var result = seed;
		var timer = new haxe.Timer(ms);
		future.ifCanceled($closure(timer,"stop"));
		timer.run = function() {
			result = f(result);
			if(!pred(result)) {
				timer.stop();
				future.deliver(result);
			}
		}
		$r = future;
		return $r;
	}(this)):future.deliver(seed));
}
haxe.time.ScheduledExecutorSystem.prototype.__class__ = haxe.time.ScheduledExecutorSystem;
haxe.time.ScheduledExecutorSystem.__interfaces__ = [haxe.time.ScheduledExecutor];
haxe.math.tween.TweenTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
haxe.math.tween.TweenTestCase.__name__ = ["haxe","math","tween","TweenTestCase"];
haxe.math.tween.TweenTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) haxe.math.tween.TweenTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
haxe.math.tween.TweenTestCase.prototype.testLinearTweenAt0 = function() {
	this.assertFloatEquals(0.0,haxe.math.tween.TweenTestCase.Linear(0).x,null,null,{ fileName : "TweenTestCase.hx", lineNumber : 44, className : "haxe.math.tween.TweenTestCase", methodName : "testLinearTweenAt0"});
	this.assertFloatEquals(2.0,haxe.math.tween.TweenTestCase.Linear(0).y,null,null,{ fileName : "TweenTestCase.hx", lineNumber : 45, className : "haxe.math.tween.TweenTestCase", methodName : "testLinearTweenAt0"});
}
haxe.math.tween.TweenTestCase.prototype.testLinearTweenAt0_5 = function() {
	this.assertFloatEquals(3.0,haxe.math.tween.TweenTestCase.Linear(0.5).x,null,null,{ fileName : "TweenTestCase.hx", lineNumber : 54, className : "haxe.math.tween.TweenTestCase", methodName : "testLinearTweenAt0_5"});
	this.assertFloatEquals(7.0,haxe.math.tween.TweenTestCase.Linear(0.5).y,null,null,{ fileName : "TweenTestCase.hx", lineNumber : 55, className : "haxe.math.tween.TweenTestCase", methodName : "testLinearTweenAt0_5"});
}
haxe.math.tween.TweenTestCase.prototype.testLinearTweenAt1 = function() {
	this.assertFloatEquals(6.0,haxe.math.tween.TweenTestCase.Linear(1).x,null,null,{ fileName : "TweenTestCase.hx", lineNumber : 49, className : "haxe.math.tween.TweenTestCase", methodName : "testLinearTweenAt1"});
	this.assertFloatEquals(12.0,haxe.math.tween.TweenTestCase.Linear(1).y,null,null,{ fileName : "TweenTestCase.hx", lineNumber : 50, className : "haxe.math.tween.TweenTestCase", methodName : "testLinearTweenAt1"});
}
haxe.math.tween.TweenTestCase.prototype.__class__ = haxe.math.tween.TweenTestCase;
$Main = function() { }
$Main.__name__ = ["@Main"];
$Main.prototype.__class__ = $Main;
$_ = {}
js.Boot.__res = {}
js.Boot.__init();
{
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if( f == null )
			return false;
		return f(msg,[url+":"+line]);
	}
}
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	Math.isFinite = function(i) {
		return isFinite(i);
	}
	Math.isNaN = function(i) {
		return isNaN(i);
	}
}
{
	var d = Date;
	d.now = function() {
		return new Date();
	}
	d.fromTime = function(t) {
		var d1 = new Date();
		d1["setTime"](t);
		return d1;
	}
	d.fromString = function(s) {
		switch(s.length) {
		case 8:{
			var k = s.split(":");
			var d1 = new Date();
			d1["setTime"](0);
			d1["setUTCHours"](k[0]);
			d1["setUTCMinutes"](k[1]);
			d1["setUTCSeconds"](k[2]);
			return d1;
		}break;
		case 10:{
			var k = s.split("-");
			return new Date(k[0],k[1] - 1,k[2],0,0,0);
		}break;
		case 19:{
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
		}break;
		default:{
			throw "Invalid date format : " + s;
		}break;
		}
	}
	d.prototype["toString"] = function() {
		var date = this;
		var m = date.getMonth() + 1;
		var d1 = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		return (((((((((date.getFullYear() + "-") + ((m < 10?"0" + m:"" + m))) + "-") + ((d1 < 10?"0" + d1:"" + d1))) + " ") + ((h < 10?"0" + h:"" + h))) + ":") + ((mi < 10?"0" + mi:"" + mi))) + ":") + ((s < 10?"0" + s:"" + s));
	}
	d.prototype.__class__ = d;
	d.__name__ = ["Date"];
}
{
	String.prototype.__class__ = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = Array;
	Array.__name__ = ["Array"];
	Int = { __name__ : ["Int"]}
	Dynamic = { __name__ : ["Dynamic"]}
	Float = Number;
	Float.__name__ = ["Float"];
	Bool = { __ename__ : ["Bool"]}
	Class = { __name__ : ["Class"]}
	Enum = { }
	Void = { __ename__ : ["Void"]}
}
_PreludeTest.HasNoHashAndShow.__meta__ = { obj : { DataClass : null}, fields : { v : { DataField : [{ show : false}]}}}
_PreludeTest.DynamicComparable.__meta__ = { obj : { DataClass : null}}
_PreludeTest.DynamicComparableDescending.__meta__ = { obj : { DataClass : null}, fields : { v : { DataField : [{ order : -1}]}}}
haxe.io.log.Logger.defaultHandlers = [];
haxe.io.log.Logger.defaultLevel = haxe.io.log.LogLevel.Warning;
haxe.data.collections.Map.MaxLoad = 10;
haxe.data.collections.Map.MinLoad = 1;
haxe.text.json.Json.encodeObject = Function1Extensions.compose($closure(haxe.text.json.Json,"encode"),$closure(haxe.text.json.Json,"fromObject"));
haxe.text.json.Json.decodeObject = Function1Extensions.compose($closure(haxe.text.json.Json,"toObject"),$closure(haxe.text.json.Json,"decode"));
haxe.net.UrlExtensions.UrlPattern = new EReg("^(?:([a-zA-Z]+:)(?:[/][/]))?([^:?/#\\s]*)(?:[:](\\d+))?(/[^\\s?#]+)?([?][^\\s#]*)?(#.*)?$","i");
haxe.net.UrlExtensions.Protocol = 1;
haxe.net.UrlExtensions.Hostname = 2;
haxe.net.UrlExtensions.Port = 3;
haxe.net.UrlExtensions.Pathname = 4;
haxe.net.UrlExtensions.Search = 5;
haxe.net.UrlExtensions.Hash = 6;
js.Lib.onerror = null;
haxe.math.tween.TweenerExtensions.DefaultFrequency = FloatExtensions.round((1000.0 / 24.0));
haxe.framework._Injector.InjectorImpl.state = [];
js.io.IFrameIOPostMessage.log = haxe.io.log.Logger.debug();
js.io.IFrameIOPollingHashtag.lastMessageId = 1;
js.io.IFrameIOPollingHashtag.newFragmentsList = haxe.data.collections.List.factory();
js.io.IFrameIOPollingHashtag.log = haxe.io.log.Logger.debug();
haxe.net.HttpHeaderExtensions.HeaderPattern = new EReg("^([^:]+): *(.+)$","");
haxe.net.HttpHeaderExtensions.HeaderLinesPattern = new EReg("[\\r\\n]+","");
haxe.io.http.HttpJValueJsonp.Responders = { }
haxe.io.http.HttpJValueJsonp.RequestMod = Math.round(Math.random() * 2147483647);
haxe.io.http.HttpJValueJsonp.RequestCount = 0;
js.dom.Quirks.ExcludePattern = new EReg("z-?index|font-?weight|opacity|zoom|line-?height","i");
js.dom.Quirks.AlphaPattern = new EReg("alpha\\([^)]*\\)","");
js.dom.Quirks.OpacityPattern = new EReg("opacity=([^)]*)","");
js.dom.Quirks.FloatPattern = new EReg("float","i");
js.dom.Quirks.UpperCasePattern = new EReg("([A-Z])","g");
js.dom.Quirks.NumberPixelPattern = new EReg("^-?\\d+(?:px)?$","i");
js.dom.Quirks.NumberPattern = new EReg("^-?\\d","");
js.dom.Quirks.RootPattern = new EReg("^body|html$","i");
js.dom.Quirks.cssWidth = ["left","right"];
js.dom.Quirks.cssHeight = ["top","bottom"];
js.dom.Quirks.cssShow = haxe.data.collections.Map.create().set("position","absolute").set("visibility","hidden").set("display","block");
js.dom.Quirks.border = "border";
js.dom.Quirks.margin = "margin";
haxe.test.TestHandler.POLLING_TIME = 10;
js.detect.BrowserSupport.memorized = haxe.data.collections.Map.create();
js.Env.document = document;
js.Env.documentRaw = document;
js.Env.screen = screen;
js.Env.window = window;
js.Env.navigator = navigator;
js.Env.history = history;
js.Env.JInfinity = Infinity;
js.Env.JNaN = NaN;
js.Env.JUndefined = undefined;
js.XmlHttpRequestState.UNSENT = 0;
js.XmlHttpRequestState.OPENED = 1;
js.XmlHttpRequestState.HEADERS_RECEIVED = 2;
js.XmlHttpRequestState.LOADING = 3;
js.XmlHttpRequestState.DONE = 4;
js.ExceptionCode.INDEX_SIZE_ERR = 1;
js.ExceptionCode.DOMSTRING_SIZE_ERR = 2;
js.ExceptionCode.HIERARCHY_REQUEST_ERR = 3;
js.ExceptionCode.WRONG_DOCUMENT_ERR = 4;
js.ExceptionCode.INVALID_CHARACTER_ERR = 5;
js.ExceptionCode.NO_DATA_ALLOWED_ERR = 6;
js.ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = 7;
js.ExceptionCode.NOT_FOUND_ERR = 8;
js.ExceptionCode.NOT_SUPPORTED_ERR = 9;
js.ExceptionCode.INUSE_ATTRIBUTE_ERR = 10;
js.ExceptionCode.INVALID_STATE_ERR = 11;
js.ExceptionCode.SYNTAX_ERR = 12;
js.ExceptionCode.INVALID_MODIFICATION_ERR = 13;
js.ExceptionCode.NAMESPACE_ERR = 14;
js.ExceptionCode.INVALID_ACCESS_ERR = 15;
js.ExceptionCode.VALIDATION_ERR = 16;
js.ExceptionCode.TYPE_MISMATCH_ERR = 17;
js.NodeType.ELEMENT_NODE = 1;
js.NodeType.ATTRIBUTE_NODE = 2;
js.NodeType.TEXT_NODE = 3;
js.NodeType.CDATA_SECTION_NODE = 4;
js.NodeType.ENTITY_REFERENCE_NODE = 5;
js.NodeType.ENTITY_NODE = 6;
js.NodeType.PROCESSING_INSTRUCTION_NODE = 7;
js.NodeType.COMMENT_NODE = 8;
js.NodeType.DOCUMENT_NODE = 9;
js.NodeType.DOCUMENT_TYPE_NODE = 10;
js.NodeType.DOCUMENT_FRAGMENT_NODE = 11;
js.NodeType.NOTATION_NODE = 12;
js.DocumentPosition.DOCUMENT_POSITION_DISCONNECTED = 1;
js.DocumentPosition.DOCUMENT_POSITION_PRECEDING = 2;
js.DocumentPosition.DOCUMENT_POSITION_FOLLOWING = 4;
js.DocumentPosition.DOCUMENT_POSITION_CONTAINS = 8;
js.DocumentPosition.DOCUMENT_POSITION_CONTAINED_BY = 16;
js.DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32;
js.DerivationMethod.DERIVATION_RESTRICTION = 1;
js.DerivationMethod.DERIVATION_EXTENSION = 2;
js.DerivationMethod.DERIVATION_UNION = 4;
js.DerivationMethod.DERIVATION_LIST = 8;
js.OperationType.NODE_CLONED = 1;
js.OperationType.NODE_IMPORTED = 2;
js.OperationType.NODE_DELETED = 3;
js.OperationType.NODE_RENAMED = 4;
js.OperationType.NODE_ADOPTED = 5;
js.ErrorState.NETWORK_EMPTY = 0;
js.ErrorState.NETWORK_IDLE = 1;
js.ErrorState.NETWORK_LOADING = 2;
js.ErrorState.NETWORK_NO_SOURCE = 3;
js.ReadyState.CONNECTING = 0;
js.ReadyState.OPEN = 1;
js.ReadyState.CLOSED = 2;
js.EventExceptionCode.UNSPECIFIED_EVENT_TYPE_ERR = 0;
js.DeltaModeCode.DOM_DELTA_PIXEL = 0;
js.DeltaModeCode.DOM_DELTA_Line = 1;
js.DeltaModeCode.DOM_DELTA_Page = 2;
js.InputModeCode.DOM_INPUT_METHOD_UNKNOWN = 0;
js.InputModeCode.DOM_INPUT_METHOD_KEYBOARD = 1;
js.InputModeCode.DOM_INPUT_METHOD_PASTE = 2;
js.InputModeCode.DOM_INPUT_METHOD_DROP = 3;
js.InputModeCode.DOM_INPUT_METHOD_IME = 4;
js.InputModeCode.DOM_INPUT_METHOD_OPTION = 5;
js.InputModeCode.DOM_INPUT_METHOD_HANDWRITING = 6;
js.InputModeCode.DOM_INPUT_METHOD_VOICE = 7;
js.InputModeCode.DOM_INPUT_METHOD_MULTIMODAL = 8;
js.InputModeCode.DOM_INPUT_METHOD_SCRIPT = 9;
js.KeyLocationCode.DOM_KEY_LOCATION_STANDARD = 0;
js.KeyLocationCode.DOM_KEY_LOCATION_LEFT = 1;
js.KeyLocationCode.DOM_KEY_LOCATION_RIGHT = 2;
js.KeyLocationCode.DOM_KEY_LOCATION_NUMPAD = 3;
js.KeyLocationCode.DOM_KEY_LOCATION_MOBILE = 4;
js.KeyLocationCode.DOM_KEY_LOCATION_JOYSTICK = 5;
js.PhaseType.CAPTURING_PHASE = 1;
js.PhaseType.AT_TARGET = 2;
js.PhaseType.BUBBLING_PHASE = 3;
js.AttrChangeType.MODIFICATION = 1;
js.AttrChangeType.ADDITION = 2;
js.AttrChangeType.REMOVAL = 3;
js.AcceptNodeConstants.FILTER_ACCEPT = 1;
js.AcceptNodeConstants.FILTER_REJECT = 2;
js.AcceptNodeConstants.FILTER_SKIP = 1;
js.WhatToShowConstants.SHOW_ALL = -1;
js.WhatToShowConstants.SHOW_ELEMENT = 1;
js.WhatToShowConstants.SHOW_ATTRIBUTE = 2;
js.WhatToShowConstants.SHOW_TEXT = 4;
js.WhatToShowConstants.SHOW_CDATA_SECTION = 8;
js.WhatToShowConstants.SHOW_ENTITY_REFERENCE = 16;
js.WhatToShowConstants.SHOW_ENTITY = 32;
js.WhatToShowConstants.SHOW_PROCESSING_INSTRUCTION = 64;
js.WhatToShowConstants.SHOW_COMMENT = 128;
js.WhatToShowConstants.SHOW_DOCUMENT = 256;
js.WhatToShowConstants.SHOW_DOCUMENT_TYPE = 512;
js.WhatToShowConstants.SHOW_DOCUMENT_FRAGMENT = 1024;
js.WhatToShowConstants.SHOW_NOTATION = 2048;
js.RangeExceptionCode.BAD_BOUNDARYPOINTS_ERR = 1;
js.RangeExceptionCode.INVALID_NODE_TYPE_ERR = 2;
js.CompareHow.START_TO_START = 0;
js.CompareHow.START_TO_END = 1;
js.CompareHow.END_TO_END = 2;
js.CompareHow.END_TO_START = 3;
js.RuleType.UNKNOWN_RULE = 0;
js.RuleType.STYLE_RULE = 1;
js.RuleType.CHARSET_RULE = 2;
js.RuleType.IMPORT_RULE = 3;
js.RuleType.MEDIA_RULE = 4;
js.RuleType.FONT_FACE_RULE = 5;
js.RuleType.PAGE_RULE = 6;
js.CSSValueType.CSS_INHERIT = 0;
js.CSSValueType.CSS_PRIMITIVE_VALUE = 1;
js.CSSValueType.CSS_VALUE_LIST = 2;
js.CSSValueType.CSS_CUSTOM = 3;
js.PrimitiveType.CSS_UNKNOWN = 0;
js.PrimitiveType.CSS_NUMBER = 1;
js.PrimitiveType.CSS_PERCENTAGE = 2;
js.PrimitiveType.CSS_EMS = 3;
js.PrimitiveType.CSS_EXS = 4;
js.PrimitiveType.CSS_PX = 5;
js.PrimitiveType.CSS_CM = 6;
js.PrimitiveType.CSS_MM = 7;
js.PrimitiveType.CSS_IN = 8;
js.PrimitiveType.CSS_PT = 9;
js.PrimitiveType.CSS_PC = 10;
js.PrimitiveType.CSS_DEG = 11;
js.PrimitiveType.CSS_RAD = 12;
js.PrimitiveType.CSS_GRAD = 13;
js.PrimitiveType.CSS_MS = 14;
js.PrimitiveType.CSS_S = 15;
js.PrimitiveType.CSS_HZ = 16;
js.PrimitiveType.CSS_KHZ = 17;
js.PrimitiveType.CSS_DIMENSION = 18;
js.PrimitiveType.CSS_STRING = 19;
js.PrimitiveType.CSS_URI = 20;
js.PrimitiveType.CSS_IDENT = 21;
js.PrimitiveType.CSS_ATTR = 22;
js.PrimitiveType.CSS_COUNTER = 23;
js.PrimitiveType.CSS_RECT = 24;
js.PrimitiveType.CSS_RGBCOLOR = 25;
js.UpdateStatus.UNCACHED = 0;
js.UpdateStatus.IDLE = 1;
js.UpdateStatus.CHECKING = 2;
js.UpdateStatus.DOWNLOADING = 3;
js.UpdateStatus.UPDATEREADY = 4;
js.ErrorSeverity.SEVERITY_WARNING = 1;
js.ErrorSeverity.SEVERITY_ERROR = 2;
js.ErrorSeverity.SEVERITY_FATAL_ERROR = 3;
haxe.Timer.arr = new Array();
_Prelude.AbstractProduct._baseHashes = [[786433,24593],[196613,3079,389],[1543,49157,196613,97],[12289,769,393241,193,53]];
FieldOrder.Ascending = 1;
FieldOrder.Descending = -1;
FieldOrder.Ignore = 0;
haxe.test.ui.text.HtmlReport.platform = "javascript";
haxe.util.StringExtensions.SepAlphaPattern = new EReg("(-|_)([a-z])","g");
haxe.util.StringExtensions.AlphaUpperAlphaPattern = new EReg("-([a-z])([A-Z])","g");
haxe.math.tween.TweenTestCase.Start = { x : 0.0, y : 2.0}
haxe.math.tween.TweenTestCase.End = { x : 6.0, y : 12.0}
haxe.math.tween.TweenTestCase.Linear = haxe.math.tween.Tween.linear(haxe.math.tween.TweenTestCase.Start,haxe.math.tween.TweenTestCase.End);
$Main.init = StaxTestSuite.main();
