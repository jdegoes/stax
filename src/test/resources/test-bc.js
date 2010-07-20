$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof haxe=='undefined') haxe = {}
if(!haxe.test) haxe.test = {}
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
	catch( $e1 ) {
		if( js.Boot.__instanceof($e1,haxe.test._Dispatcher.EventException) ) {
			var exc = $e1;
			{
				return false;
			}
		} else throw($e1);
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
if(!haxe.reactive) haxe.reactive = {}
haxe.reactive.BehaviorBool = function(p) { if( p === $_ ) return; {
	null;
}}
haxe.reactive.BehaviorBool.__name__ = ["haxe","reactive","BehaviorBool"];
haxe.reactive.BehaviorBool.not = function(behavior) {
	return haxe.reactive.StreamBool.not(behavior.changes()).startsWith(!behavior.valueNow());
}
haxe.reactive.BehaviorBool.ifTrue = function(condition,thenB,elseB) {
	return condition.map(function(b) {
		return (b?thenB.valueNow():elseB.valueNow());
	});
}
haxe.reactive.BehaviorBool.and = function(behaviors) {
	return haxe.reactive.Behaviors.zipN(behaviors).map(function(i) {
		return haxe.data.collections.IterableExtensions.and(i);
	});
}
haxe.reactive.BehaviorBool.or = function(behaviors) {
	return haxe.reactive.Behaviors.zipN(behaviors).map(function(i) {
		return haxe.data.collections.IterableExtensions.or(i);
	});
}
haxe.reactive.BehaviorBool.prototype.__class__ = haxe.reactive.BehaviorBool;
if(!haxe["abstract"]) haxe["abstract"] = {}
haxe.abstract.Foldable = function() { }
haxe.abstract.Foldable.__name__ = ["haxe","abstract","Foldable"];
haxe.abstract.Foldable.prototype.append = null;
haxe.abstract.Foldable.prototype.empty = null;
haxe.abstract.Foldable.prototype.foldl = null;
haxe.abstract.Foldable.prototype.__class__ = haxe.abstract.Foldable;
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
haxe.data.collections.Collection.__interfaces__ = [haxe.abstract.Foldable];
haxe.data.collections.List = function(equal) { if( equal === $_ ) return; {
	this.equal = (equal == null?DynamicExtensions.EqualT():equal);
}}
haxe.data.collections.List.__name__ = ["haxe","data","collections","List"];
haxe.data.collections.List.OrderT = function(order) {
	return OrderTypeclass.create({ compare : function(v1,v2) {
		var a1 = IterableExtensions.toArray(v1);
		var a2 = IterableExtensions.toArray(v2);
		return ArrayExtensions.OrderT(Array,order).compare(a1,a2);
	}});
}
haxe.data.collections.List.EqualT = function(equal) {
	return EqualTypeclass.create({ equal : function(v1,v2) {
		var a1 = IterableExtensions.toArray(v1);
		var a2 = IterableExtensions.toArray(v2);
		return ArrayExtensions.EqualT(Array,equal).equal(a1,a2);
	}});
}
haxe.data.collections.List.ShowT = function(show) {
	return ShowTypeclass.create({ show : function(v) {
		return "List" + IterableExtensions.toString(haxe.abstract.FoldableExtensions.elements(v),show.show);
	}});
}
haxe.data.collections.List.HasherT = function(hasher) {
	return HasherTypeclass.create({ hash : function(v) {
		return v.foldl(12289,function(a,b) {
			return a * (hasher.hash(b) + 12289);
		});
	}});
}
haxe.data.collections.List.nil = function(equal) {
	return new haxe.data.collections._List.Nil((equal == null?DynamicExtensions.EqualT():equal));
}
haxe.data.collections.List.create = function(equal) {
	return haxe.data.collections.List.nil(equal);
}
haxe.data.collections.List.factory = function(equal) {
	return function() {
		return haxe.data.collections.List.create(equal);
	}
}
haxe.data.collections.List.prototype.add = function(t) {
	return this.foldr(this.empty().cons(t),function(b,a) {
		return a.cons(b);
	});
}
haxe.data.collections.List.prototype.addAll = function(i) {
	var a = [];
	{ var $it2 = i.iterator();
	while( $it2.hasNext() ) { var e = $it2.next();
	a.push(e);
	}}
	a.reverse();
	var r = this.empty();
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
haxe.data.collections.List.prototype.append = function(a,b) {
	return a.add(b);
}
haxe.data.collections.List.prototype.concat = function(l) {
	return this.addAll(l);
}
haxe.data.collections.List.prototype.cons = function(head) {
	return new haxe.data.collections._List.Cons(this.equal,head,this);
}
haxe.data.collections.List.prototype.contains = function(t) {
	var cur = this;
	{
		var _g1 = 0, _g = this.getSize();
		while(_g1 < _g) {
			var i = _g1++;
			if(this.equal.equal(t,cur.getHead())) return true;
			cur = cur.getTail();
		}
	}
	return false;
}
haxe.data.collections.List.prototype.drop = function(n) {
	var cur = this;
	{
		var _g1 = 0, _g = IntExtensions.min(this.getSize(),n);
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
		var _g1 = 0, _g = this.getSize();
		while(_g1 < _g) {
			var i = _g1++;
			if(pred(cur.getHead())) return cur;
			cur = cur.getTail();
		}
	}
	return cur;
}
haxe.data.collections.List.prototype.empty = function() {
	return (this.getSize() == 0?this:haxe.data.collections.List.nil(this.equal));
}
haxe.data.collections.List.prototype.equal = null;
haxe.data.collections.List.prototype.first = null;
haxe.data.collections.List.prototype.firstOption = null;
haxe.data.collections.List.prototype.foldl = function(z,f) {
	var acc = z;
	var cur = this;
	{
		var _g1 = 0, _g = this.getSize();
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
		var _g1 = 0, _g = this.getSize();
		while(_g1 < _g) {
			var i = _g1++;
			var e = a[(this.getSize() - 1) - i];
			acc = f(e,acc);
		}
	}
	return acc;
}
haxe.data.collections.List.prototype.gaps = function(f,equal) {
	return haxe.abstract.FoldableExtensions.flatMapTo(this.zip(this.drop(1)),haxe.data.collections.List.nil(equal),function(tuple) {
		return f(tuple._1,tuple._2);
	});
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
haxe.data.collections.List.prototype.getSize = function() {
	return 0;
}
haxe.data.collections.List.prototype.getTail = function() {
	return Stax.error("List has no head");
}
haxe.data.collections.List.prototype.head = null;
haxe.data.collections.List.prototype.headOption = null;
haxe.data.collections.List.prototype.iterator = function() {
	return haxe.abstract.FoldableExtensions.iterator(this);
}
haxe.data.collections.List.prototype.last = null;
haxe.data.collections.List.prototype.lastOption = null;
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
	{ var $it3 = iterable.iterator();
	while( $it3.hasNext() ) { var e = $it3.next();
	result = result.cons(e);
	}}
	return result;
}
haxe.data.collections.List.prototype.remove = function(t) {
	var pre = [];
	var post = haxe.data.collections.List.nil(this.equal);
	var cur = this;
	{
		var _g1 = 0, _g = this.getSize();
		while(_g1 < _g) {
			var i = _g1++;
			if(this.equal.equal(t,cur.getHead())) {
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
	{ var $it4 = i.iterator();
	while( $it4.hasNext() ) { var e = $it4.next();
	r = r.remove(e);
	}}
	return r;
}
haxe.data.collections.List.prototype.reverse = function() {
	return this.foldl(this.empty(),function(a,b) {
		return a.cons(b);
	});
}
haxe.data.collections.List.prototype.size = null;
haxe.data.collections.List.prototype.sort = function(order) {
	var a = IterableExtensions.toArray(this);
	a.sort(order.compare);
	var result = this.empty();
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
	return this.reverse().drop(this.getSize() - n);
}
haxe.data.collections.List.prototype.toString = function() {
	return haxe.data.collections.List.ShowT(DynamicExtensions.ShowT()).show(this);
}
haxe.data.collections.List.prototype.zip = function(that) {
	var len = IntExtensions.min(this.getSize(),that.getSize());
	var iterator1 = this.reverse().drop(IntExtensions.max(0,this.getSize() - len)).iterator();
	var iterator2 = that.reverse().drop(IntExtensions.max(0,that.getSize() - len)).iterator();
	var r = haxe.data.collections.List.create(Tuple2.EqualT(this.equal,that.equal));
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
haxe.data.collections._List.Cons = function(equal,head,tail) { if( equal === $_ ) return; {
	haxe.data.collections.List.apply(this,[equal]);
	this._head = head;
	this._tail = tail;
	this._size = tail.getSize() + 1;
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
		var _g1 = 0, _g = (this.getSize() - 1);
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
haxe.data.collections._List.Cons.prototype.getSize = function() {
	return this._size;
}
haxe.data.collections._List.Cons.prototype.getTail = function() {
	return this._tail;
}
haxe.data.collections._List.Cons.prototype.__class__ = haxe.data.collections._List.Cons;
haxe.data.collections._List.Nil = function(equal) { if( equal === $_ ) return; {
	haxe.data.collections.List.apply(this,[equal]);
}}
haxe.data.collections._List.Nil.__name__ = ["haxe","data","collections","_List","Nil"];
haxe.data.collections._List.Nil.__super__ = haxe.data.collections.List;
for(var k in haxe.data.collections.List.prototype ) haxe.data.collections._List.Nil.prototype[k] = haxe.data.collections.List.prototype[k];
haxe.data.collections._List.Nil.prototype.__class__ = haxe.data.collections._List.Nil;
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
haxe.test.TestCase.prototype.assertContains = function(values,match,msg,pos) {
	haxe.test.Assert.contains(match,values,msg,pos);
}
haxe.test.TestCase.prototype.assertEquals = function(expected,value,equal,msg,pos) {
	if(equal != null) {
		haxe.test.Assert.isTrue(equal.equal(expected,value),((msg != null?msg:(("expected " + expected) + " but found ") + value)),pos);
	}
	else {
		haxe.test.Assert.equals(expected,value,msg,pos);
	}
}
haxe.test.TestCase.prototype.assertEqualsOneOf = function(value,possibilities,msg,pos) {
	haxe.test.Assert.allows(possibilities,value,msg,pos);
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
haxe.test.TestCase.prototype.assertLater = function(f,timeout) {
	return haxe.test.Assert.createAsync(f,timeout);
}
haxe.test.TestCase.prototype.assertLaterWithEvent = function(f,timeout) {
	return haxe.test.Assert.createEvent(f,timeout);
}
haxe.test.TestCase.prototype.assertLooksLike = function(expected,value,recursive,msg,pos) {
	haxe.test.Assert.same(expected,value,recursive,msg,pos);
}
haxe.test.TestCase.prototype.assertMatches = function(pattern,value,msg,pos) {
	haxe.test.Assert.match(pattern,value,msg,pos);
}
haxe.test.TestCase.prototype.assertNotContains = function(values,match,msg,pos) {
	haxe.test.Assert.notContains(match,values,msg,pos);
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
	var $e = (cond(obj));
	switch( $e[1] ) {
	case 0:
	var msg1 = $e[2];
	{
		haxe.test.Assert.isTrue(false,msg1,pos);
	}break;
	case 1:
	var msg1 = $e[2];
	{
		haxe.test.Assert.isTrue(true,msg1,pos);
	}break;
	}
}
haxe.test.TestCase.prototype.assertThrowsException = function(method,type,msg,pos) {
	haxe.test.Assert.raises(method,type,msg,pos);
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
haxe.test.TestCase.prototype.not = function(c) {
	return haxe.test.MustMatcherExtensions.not(c);
}
haxe.test.TestCase.prototype.__class__ = haxe.test.TestCase;
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
haxe.reactive.Streams = function(p) { if( p === $_ ) return; {
	null;
}}
haxe.reactive.Streams.__name__ = ["haxe","reactive","Streams"];
haxe.reactive.Streams.create = function(updater,sources) {
	var sourceEvents = (sources == null?null:(haxe.data.collections.IterableExtensions.toArray(sources)));
	return new haxe.reactive.EventStream(updater,sourceEvents);
}
haxe.reactive.Streams.identity = function(sources) {
	var sourceArray = (sources == null?null:(haxe.data.collections.IterableExtensions.toArray(sources)));
	return new haxe.reactive.EventStream(function(pulse) {
		return haxe.reactive.Propagation.propagate(pulse);
	},sourceArray);
}
haxe.reactive.Streams.zero = function() {
	return haxe.reactive.Streams.create(function(pulse) {
		throw "zeroE : received a value; zeroE should not receive a value; the value was " + pulse.value;
		return haxe.reactive.Propagation.doNotPropagate;
	});
}
haxe.reactive.Streams.one = function(val) {
	var sent = false;
	var stream = haxe.reactive.Streams.create(function(pulse) {
		if(sent) {
			throw "Streams.one: received an extra value";
		}
		sent = false;
		return haxe.reactive.Propagation.propagate(pulse);
	});
	stream.sendLater(val);
	return stream;
}
haxe.reactive.Streams.merge = function(streams) {
	return (haxe.data.collections.IterableExtensions.size(streams) == 0?haxe.reactive.Streams.zero():haxe.reactive.Streams.identity(streams));
}
haxe.reactive.Streams.constant = function(value,sources) {
	return haxe.reactive.Streams.create(function(pulse) {
		return haxe.reactive.Propagation.propagate(pulse.withValue(value));
	},sources);
}
haxe.reactive.Streams.receiver = function() {
	return haxe.reactive.Streams.identity();
}
haxe.reactive.Streams.cond = function(conditions) {
	return (function($this) {
		var $r;
		var $e = (haxe.data.collections.IterableExtensions.headOption(conditions));
		switch( $e[1] ) {
		case 0:
		{
			$r = haxe.reactive.Streams.zero();
		}break;
		case 1:
		var h = $e[2];
		{
			$r = haxe.reactive.StreamBool.ifTrue(h._1,h._2,haxe.reactive.Streams.cond(haxe.data.collections.IterableExtensions.tail(conditions)));
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
haxe.reactive.Streams.timer = function(time) {
	return haxe.reactive.Streams.timerB(haxe.reactive.Behaviors.constant(time));
}
haxe.reactive.Streams.timerB = function(time) {
	var stream = haxe.reactive.Streams.identity();
	var pulser = null;
	var timer = null;
	var createTimer = function() {
		return haxe.reactive.External.setTimeout(pulser,time.valueNow());
	}
	pulser = function() {
		stream.sendEvent(haxe.reactive.External.now());
		if(timer != null) haxe.reactive.External.cancelTimeout(timer);
		if(!stream.getWeaklyHeld()) {
			timer = createTimer();
		}
	}
	timer = createTimer();
	return stream;
}
haxe.reactive.Streams.zipN = function(streams) {
	var stamps = haxe.data.collections.IterableExtensions.toArray(haxe.data.collections.IterableExtensions.map(streams,function(s) {
		return -1;
	}));
	var values = haxe.data.collections.IterableExtensions.toArray(haxe.data.collections.IterableExtensions.map(streams,function(s) {
		return null;
	}));
	var output = haxe.reactive.Streams.identity();
	{
		var _g1 = 0, _g = haxe.data.collections.IterableExtensions.size(streams);
		while(_g1 < _g) {
			var index = [_g1++];
			var stream = haxe.data.collections.IterableExtensions.at(streams,index[0]);
			output = output.merge(haxe.reactive.Streams.create(function(index) {
				return function(pulse) {
					stamps[index[0]] = pulse.stamp;
					values[index[0]] = pulse.value;
					return haxe.reactive.Propagation.propagate(pulse);
				}
			}(index),[stream]));
		}
	}
	return haxe.reactive.Streams.create(function(pulse) {
		var stampsEqual = haxe.data.collections.IterableExtensions.size(haxe.data.collections.IterableExtensions.nub(stamps)) == 1;
		return (stampsEqual?(function($this) {
			var $r;
			var iter = ArrayExtensions.snapshot(values);
			$r = haxe.reactive.Propagation.propagate(pulse.withValue(iter));
			return $r;
		}(this)):haxe.reactive.Propagation.doNotPropagate);
	},[output]).uniqueSteps();
}
haxe.reactive.Streams.randomB = function(time) {
	return haxe.reactive.Streams.timerB(time).map(function(e) {
		return Math.random();
	});
}
haxe.reactive.Streams.random = function(time) {
	return haxe.reactive.Streams.randomB(haxe.reactive.Behaviors.constant(time));
}
haxe.reactive.Streams.prototype.__class__ = haxe.reactive.Streams;
if(!haxe.test.ui) haxe.test.ui = {}
if(!haxe.test.ui.common) haxe.test.ui.common = {}
haxe.test.ui.common.IReport = function() { }
haxe.test.ui.common.IReport.__name__ = ["haxe","test","ui","common","IReport"];
haxe.test.ui.common.IReport.prototype.displayHeader = null;
haxe.test.ui.common.IReport.prototype.displaySuccessResults = null;
haxe.test.ui.common.IReport.prototype.setHandler = null;
haxe.test.ui.common.IReport.prototype.__class__ = haxe.test.ui.common.IReport;
if(!haxe.test.ui.text) haxe.test.ui.text = {}
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
	{ var $it5 = result.iterator();
	while( $it5.hasNext() ) { var assertation = $it5.next();
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
	return "body, dd, dt {\r\n\tfont-family: Verdana, Arial, Sans-serif;\r\n\tfont-size: 12px;\r\n}\r\ndl {\r\n\twidth: 180px;\r\n}\r\ndd, dt {\r\n\tmargin : 0;\r\n\tpadding : 2px 5px;\r\n\tborder-top: 1px solid #f0f0f0;\r\n\tborder-left: 1px solid #f0f0f0;\r\n\tborder-right: 1px solid #CCCCCC;\r\n\tborder-bottom: 1px solid #CCCCCC;\r\n}\r\ndd.value {\r\n\ttext-align: center;\r\n\tbackground-color: #eeeeee;\r\n}\r\ndt {\r\n\ttext-align: left;\r\n\tbackground-color: #e6e6e6;\r\n\tfloat: left;\r\n\twidth: 100px;\r\n}\r\n\r\nh1, h2, h3, h4, h5, h6 {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n}\r\n\r\nh1 {\r\n\ttext-align: center;\r\n\tfont-weight: bold;\r\n\tpadding: 5px 0 4px 0;\r\n\tfont-family: Arial, Sans-serif;\r\n\tfont-size: 18px;\r\n\tborder-top: 1px solid #f0f0f0;\r\n\tborder-left: 1px solid #f0f0f0;\r\n\tborder-right: 1px solid #CCCCCC;\r\n\tborder-bottom: 1px solid #CCCCCC;\r\n\tmargin: 0 2px 0px 2px;\r\n}\r\n\r\nh2 {\r\n\tfont-weight: bold;\r\n\tpadding: 2px 0 2px 8px;\r\n\tfont-family: Arial, Sans-serif;\r\n\tfont-size: 13px;\r\n\tborder-top: 1px solid #f0f0f0;\r\n\tborder-left: 1px solid #f0f0f0;\r\n\tborder-right: 1px solid #CCCCCC;\r\n\tborder-bottom: 1px solid #CCCCCC;\r\n\tmargin: 0 0 0px 0;\r\n\tbackground-color: #FFFFFF;\r\n\tcolor: #777777;\r\n}\r\n\r\nh2.classname {\r\n\tcolor: #000000;\r\n}\r\n\r\n.okbg {\r\n\tbackground-color: #66FF55;\r\n}\r\n.errorbg {\r\n\tbackground-color: #CC1100;\r\n}\r\n.failurebg {\r\n\tbackground-color: #EE3322;\r\n}\r\n.warnbg {\r\n\tbackground-color: #FFCC99;\r\n}\r\n.headerinfo {\r\n\ttext-align: right;\r\n\tfont-size: 11px;\r\n\tfont - color: 0xCCCCCC;\r\n\tmargin: 0 2px 5px 2px;\r\n\tborder-left: 1px solid #f0f0f0;\r\n\tborder-right: 1px solid #CCCCCC;\r\n\tborder-bottom: 1px solid #CCCCCC;\r\n\tpadding: 2px;\r\n}\r\n\r\nli {\r\n\tpadding: 4px;\r\n\tmargin: 2px;\r\n\tborder-top: 1px solid #f0f0f0;\r\n\tborder-left: 1px solid #f0f0f0;\r\n\tborder-right: 1px solid #CCCCCC;\r\n\tborder-bottom: 1px solid #CCCCCC;\r\n\tbackground-color: #e6e6e6;\r\n}\r\n\r\nli.fixture {\r\n\tbackground-color: #f6f6f6;\r\n\tpadding-bottom: 6px;\r\n}\r\n\r\ndiv.fixturedetails {\r\n\tpadding-left: 108px;\r\n}\r\n\r\nul {\r\n\tpadding: 0;\r\n\tmargin: 6px 0 0 0;\r\n\tlist-style-type: none;\r\n}\r\n\r\nol {\r\n\tpadding: 0 0 0 28px;\r\n\tmargin: 0px 0 0 0;\r\n}\r\n\r\n.statnumbers {\r\n\tpadding: 2px 8px;\r\n}\r\n\r\n.fixtureresult {\r\n\twidth: 100px;\r\n\ttext-align: center;\r\n\tdisplay: block;\r\n\tfloat: left;\r\n\tfont-weight: bold;\r\n\tpadding: 1px;\r\n\tmargin: 0 0 0 0;\r\n}\r\n\r\n.testoutput {\r\n\tborder: 1px dashed #CCCCCC;\r\n\tmargin: 4px 0 0 0;\r\n\tpadding: 4px 8px;\r\n\tbackground-color: #eeeeee;\r\n}\r\n\r\nspan.tracepos, span.traceposempty {\r\n\tdisplay: block;\r\n\tfloat: left;\r\n\tfont-weight: bold;\r\n\tfont-size: 9px;\r\n\twidth: 170px;\r\n\tmargin: 2px 0 0 2px;\r\n}\r\n\r\nspan.tracepos:hover {\r\n\tcursor : pointer;\r\n\tbackground-color: #ffff99;\r\n}\r\n\r\nspan.tracemsg {\r\n\tdisplay: block;\r\n\tmargin-left: 180px;\r\n\tbackground-color: #eeeeee;\r\n\tpadding: 7px;\r\n}\r\n\r\nspan.tracetime {\r\n\tdisplay: block;\r\n\tfloat: right;\r\n\tmargin: 2px;\r\n\tfont-size: 9px;\r\n\tcolor: #777777;\r\n}\r\n\r\n\r\ndiv.trace ol {\r\n\tpadding: 0 0 0 40px;\r\n\tcolor: #777777;\r\n}\r\n\r\ndiv.trace li {\r\n\tpadding: 0;\r\n}\r\n\r\ndiv.trace li div.li {\r\n\tcolor: #000000;\r\n}\r\n\r\ndiv.trace h2 {\r\n\tmargin: 0 2px 0px 2px;\r\n\tpadding-left: 4px;\r\n}\r\n\r\n.tracepackage {\r\n\tcolor: #777777;\r\n\tfont-weight: normal;\r\n}\r\n\r\n.clr {\r\n\tclear: both;\r\n}\r\n\r\n#utesttip {\r\n\tmargin-top: -3px;\r\n\tmargin-left: 170px;\r\n\tfont-size: 9px;\r\n}\r\n\r\n#utesttip li {\r\n\tmargin: 0;\r\n\tbackground-color: #ffff99;\r\n\tpadding: 2px 4px;\r\n\tborder: 0;\r\n\tborder-bottom: 1px dashed #ffff33;\r\n}";
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
	return "function utestTooltip(ref, text) {\r\n\tvar el = document.getElementById(\"utesttip\");\r\n\tif(!el) {\r\n\t\tvar el = document.createElement(\"div\")\r\n\t\tel.id = \"utesttip\";\r\n\t\tel.style.position = \"absolute\";\r\n\t\tdocument.body.appendChild(el)\r\n\t}\r\n\tvar p = utestFindPos(ref);\r\n\tel.style.left = p[0];\r\n\tel.style.top = p[1];\r\n\tel.innerHTML =  text;\r\n}\r\n\r\nfunction utestFindPos(el) {\r\n\tvar left = 0;\r\n\tvar top = 0;\r\n\tdo {\r\n\t\tleft += el.offsetLeft;\r\n\t\ttop += el.offsetTop;\r\n\t} while(el = el.offsetParent)\r\n\treturn [left, top];\r\n}\r\n\r\nfunction utestRemoveTooltip() {\r\n\tvar el = document.getElementById(\"utesttip\")\r\n\tif(el)\r\n\t\tdocument.body.removeChild(el)\r\n}";
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
	return ((((((("<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\" />\n<title>" + title) + "</title>\r\n\t\t\t<style type=\"text/css\">") + this.cssStyle()) + "</style>\r\n\t\t\t<script type=\"text/javascript\">\n") + this.jsScript()) + "\n</script>\n</head>\r\n\t\t\t<body>\n") + s) + "\n</body>\n</html>";
}
haxe.test.ui.text.HtmlReport.prototype.__class__ = haxe.test.ui.text.HtmlReport;
haxe.test.ui.text.HtmlReport.__interfaces__ = [haxe.test.ui.common.IReport];
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
	{ var $it6 = result.assertations.iterator();
	while( $it6.hasNext() ) { var assertation = $it6.next();
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
haxe.data.collections.IterableExtensions = function() { }
haxe.data.collections.IterableExtensions.__name__ = ["haxe","data","collections","IterableExtensions"];
haxe.data.collections.IterableExtensions.size = function(iterable) {
	var size = 0;
	{ var $it7 = iterable.iterator();
	while( $it7.hasNext() ) { var e = $it7.next();
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
	{ var $it8 = iter.iterator();
	while( $it8.hasNext() ) { var e = $it8.next();
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
		{ var $it9 = iter.iterator();
		while( $it9.hasNext() ) { var e = $it9.next();
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
	{ var $it10 = iter.iterator();
	while( $it10.hasNext() ) { var e = $it10.next();
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
		{ var $it11 = f(b).iterator();
		while( $it11.hasNext() ) { var e = $it11.next();
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
	{ var $it12 = i.iterator();
	while( $it12.hasNext() ) { var e = $it12.next();
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
	{ var $it13 = iter.iterator();
	while( $it13.hasNext() ) { var e = $it13.next();
	{
		result.push(f(e,accum));
	}
	}}
	return result;
}
haxe.data.collections.IterableExtensions.scanr = function(iter,init,f) {
	var accum = init;
	var result = [init];
	{ var $it14 = haxe.data.collections.IterableExtensions.reversed(iter).iterator();
	while( $it14.hasNext() ) { var e = $it14.next();
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
	{ var $it15 = iter.iterator();
	while( $it15.hasNext() ) { var e = $it15.next();
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
	return haxe.data.collections.IterableExtensions.foldl(iter2,iter1,function(a,b) {
		return (haxe.data.collections.IterableExtensions.existsP(a,b,f)?a:haxe.data.collections.IterableExtensions.append(a,b));
	});
}
haxe.data.collections.IterableExtensions.prototype.__class__ = haxe.data.collections.IterableExtensions;
Reflect = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	if(o.hasOwnProperty != null) return o.hasOwnProperty(field);
	var arr = Reflect.fields(o);
	{ var $it16 = arr.iterator();
	while( $it16.hasNext() ) { var t = $it16.next();
	if(t == field) return true;
	}}
	return false;
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	}
	catch( $e17 ) {
		{
			var e = $e17;
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
		catch( $e18 ) {
			{
				var e = $e18;
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
haxe.abstract.PartialFunction1 = function() { }
haxe.abstract.PartialFunction1.__name__ = ["haxe","abstract","PartialFunction1"];
haxe.abstract.PartialFunction1.prototype.call = null;
haxe.abstract.PartialFunction1.prototype.isDefinedAt = null;
haxe.abstract.PartialFunction1.prototype.orAlways = null;
haxe.abstract.PartialFunction1.prototype.orAlwaysC = null;
haxe.abstract.PartialFunction1.prototype.orElse = null;
haxe.abstract.PartialFunction1.prototype.toFunction = null;
haxe.abstract.PartialFunction1.prototype.__class__ = haxe.abstract.PartialFunction1;
haxe.abstract.PartialFunction2 = function() { }
haxe.abstract.PartialFunction2.__name__ = ["haxe","abstract","PartialFunction2"];
haxe.abstract.PartialFunction2.prototype.call = null;
haxe.abstract.PartialFunction2.prototype.isDefinedAt = null;
haxe.abstract.PartialFunction2.prototype.orAlways = null;
haxe.abstract.PartialFunction2.prototype.orAlwaysC = null;
haxe.abstract.PartialFunction2.prototype.orElse = null;
haxe.abstract.PartialFunction2.prototype.toFunction = null;
haxe.abstract.PartialFunction2.prototype.__class__ = haxe.abstract.PartialFunction2;
haxe.abstract.PartialFunction3 = function() { }
haxe.abstract.PartialFunction3.__name__ = ["haxe","abstract","PartialFunction3"];
haxe.abstract.PartialFunction3.prototype.call = null;
haxe.abstract.PartialFunction3.prototype.isDefinedAt = null;
haxe.abstract.PartialFunction3.prototype.orAlways = null;
haxe.abstract.PartialFunction3.prototype.orAlwaysC = null;
haxe.abstract.PartialFunction3.prototype.orElse = null;
haxe.abstract.PartialFunction3.prototype.toFunction = null;
haxe.abstract.PartialFunction3.prototype.__class__ = haxe.abstract.PartialFunction3;
haxe.abstract.PartialFunction4 = function() { }
haxe.abstract.PartialFunction4.__name__ = ["haxe","abstract","PartialFunction4"];
haxe.abstract.PartialFunction4.prototype.call = null;
haxe.abstract.PartialFunction4.prototype.isDefinedAt = null;
haxe.abstract.PartialFunction4.prototype.orAlways = null;
haxe.abstract.PartialFunction4.prototype.orAlwaysC = null;
haxe.abstract.PartialFunction4.prototype.orElse = null;
haxe.abstract.PartialFunction4.prototype.toFunction = null;
haxe.abstract.PartialFunction4.prototype.__class__ = haxe.abstract.PartialFunction4;
haxe.abstract.PartialFunction5 = function() { }
haxe.abstract.PartialFunction5.__name__ = ["haxe","abstract","PartialFunction5"];
haxe.abstract.PartialFunction5.prototype.call = null;
haxe.abstract.PartialFunction5.prototype.isDefinedAt = null;
haxe.abstract.PartialFunction5.prototype.orAlways = null;
haxe.abstract.PartialFunction5.prototype.orAlwaysC = null;
haxe.abstract.PartialFunction5.prototype.orElse = null;
haxe.abstract.PartialFunction5.prototype.toFunction = null;
haxe.abstract.PartialFunction5.prototype.__class__ = haxe.abstract.PartialFunction5;
if(!haxe.abstract._PartialFunction) haxe.abstract._PartialFunction = {}
haxe.abstract._PartialFunction.PartialFunction1Impl = function(def) { if( def === $_ ) return; {
	this._def = def;
}}
haxe.abstract._PartialFunction.PartialFunction1Impl.__name__ = ["haxe","abstract","_PartialFunction","PartialFunction1Impl"];
haxe.abstract._PartialFunction.PartialFunction1Impl.create = function(def) {
	return new haxe.abstract._PartialFunction.PartialFunction1Impl(def);
}
haxe.abstract._PartialFunction.PartialFunction1Impl.prototype._def = null;
haxe.abstract._PartialFunction.PartialFunction1Impl.prototype.call = function(a) {
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
haxe.abstract._PartialFunction.PartialFunction1Impl.prototype.isDefinedAt = function(a) {
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
haxe.abstract._PartialFunction.PartialFunction1Impl.prototype.orAlways = function(f) {
	return haxe.abstract._PartialFunction.PartialFunction1Impl.create(this._def.concat([DynamicExtensions.entuple((function(a) {
		return true;
	}),f)]));
}
haxe.abstract._PartialFunction.PartialFunction1Impl.prototype.orAlwaysC = function(z) {
	return haxe.abstract._PartialFunction.PartialFunction1Impl.create(this._def.concat([DynamicExtensions.entuple((function(a) {
		return true;
	}),function(a) {
		return z();
	})]));
}
haxe.abstract._PartialFunction.PartialFunction1Impl.prototype.orElse = function(that) {
	return haxe.abstract._PartialFunction.PartialFunction1Impl.create(this._def.concat([Tuple2.create($closure(that,"isDefinedAt"),$closure(that,"call"))]));
}
haxe.abstract._PartialFunction.PartialFunction1Impl.prototype.toFunction = function() {
	var self = this;
	return function(a) {
		return (self.isDefinedAt(a)?Option.Some(self.call(a)):Option.None);
	}
}
haxe.abstract._PartialFunction.PartialFunction1Impl.prototype.__class__ = haxe.abstract._PartialFunction.PartialFunction1Impl;
haxe.abstract._PartialFunction.PartialFunction1Impl.__interfaces__ = [haxe.abstract.PartialFunction1];
haxe.abstract.PartialFunction1ImplExtensions = function() { }
haxe.abstract.PartialFunction1ImplExtensions.__name__ = ["haxe","abstract","PartialFunction1ImplExtensions"];
haxe.abstract.PartialFunction1ImplExtensions.toPartialFunction = function(def) {
	return haxe.abstract._PartialFunction.PartialFunction1Impl.create(def);
}
haxe.abstract.PartialFunction1ImplExtensions.prototype.__class__ = haxe.abstract.PartialFunction1ImplExtensions;
haxe.abstract._PartialFunction.PartialFunction2Impl = function(def) { if( def === $_ ) return; {
	this._def = def;
}}
haxe.abstract._PartialFunction.PartialFunction2Impl.__name__ = ["haxe","abstract","_PartialFunction","PartialFunction2Impl"];
haxe.abstract._PartialFunction.PartialFunction2Impl.create = function(def) {
	return new haxe.abstract._PartialFunction.PartialFunction2Impl(def);
}
haxe.abstract._PartialFunction.PartialFunction2Impl.prototype._def = null;
haxe.abstract._PartialFunction.PartialFunction2Impl.prototype.call = function(a,b) {
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
haxe.abstract._PartialFunction.PartialFunction2Impl.prototype.isDefinedAt = function(a,b) {
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
haxe.abstract._PartialFunction.PartialFunction2Impl.prototype.orAlways = function(f) {
	return haxe.abstract._PartialFunction.PartialFunction2Impl.create(this._def.concat([DynamicExtensions.entuple((function(a,b) {
		return true;
	}),f)]));
}
haxe.abstract._PartialFunction.PartialFunction2Impl.prototype.orAlwaysC = function(z) {
	return haxe.abstract._PartialFunction.PartialFunction2Impl.create(this._def.concat([DynamicExtensions.entuple((function(a,b) {
		return true;
	}),function(a,b) {
		return z();
	})]));
}
haxe.abstract._PartialFunction.PartialFunction2Impl.prototype.orElse = function(that) {
	return haxe.abstract._PartialFunction.PartialFunction2Impl.create(this._def.concat([Tuple2.create($closure(that,"isDefinedAt"),$closure(that,"call"))]));
}
haxe.abstract._PartialFunction.PartialFunction2Impl.prototype.toFunction = function() {
	var self = this;
	return function(a,b) {
		return (self.isDefinedAt(a,b)?Option.Some(self.call(a,b)):Option.None);
	}
}
haxe.abstract._PartialFunction.PartialFunction2Impl.prototype.__class__ = haxe.abstract._PartialFunction.PartialFunction2Impl;
haxe.abstract._PartialFunction.PartialFunction2Impl.__interfaces__ = [haxe.abstract.PartialFunction2];
haxe.abstract.PartialFunction2ImplExtensions = function() { }
haxe.abstract.PartialFunction2ImplExtensions.__name__ = ["haxe","abstract","PartialFunction2ImplExtensions"];
haxe.abstract.PartialFunction2ImplExtensions.toPartialFunction = function(def) {
	return haxe.abstract._PartialFunction.PartialFunction2Impl.create(def);
}
haxe.abstract.PartialFunction2ImplExtensions.prototype.__class__ = haxe.abstract.PartialFunction2ImplExtensions;
haxe.abstract._PartialFunction.PartialFunction3Impl = function(def) { if( def === $_ ) return; {
	this._def = def;
}}
haxe.abstract._PartialFunction.PartialFunction3Impl.__name__ = ["haxe","abstract","_PartialFunction","PartialFunction3Impl"];
haxe.abstract._PartialFunction.PartialFunction3Impl.create = function(def) {
	return new haxe.abstract._PartialFunction.PartialFunction3Impl(def);
}
haxe.abstract._PartialFunction.PartialFunction3Impl.prototype._def = null;
haxe.abstract._PartialFunction.PartialFunction3Impl.prototype.call = function(a,b,c) {
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
haxe.abstract._PartialFunction.PartialFunction3Impl.prototype.isDefinedAt = function(a,b,c) {
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
haxe.abstract._PartialFunction.PartialFunction3Impl.prototype.orAlways = function(f) {
	return haxe.abstract._PartialFunction.PartialFunction3Impl.create(this._def.concat([DynamicExtensions.entuple((function(a,b,c) {
		return true;
	}),f)]));
}
haxe.abstract._PartialFunction.PartialFunction3Impl.prototype.orAlwaysC = function(z) {
	return haxe.abstract._PartialFunction.PartialFunction3Impl.create(this._def.concat([DynamicExtensions.entuple((function(a,b,c) {
		return true;
	}),function(a,b,c) {
		return z();
	})]));
}
haxe.abstract._PartialFunction.PartialFunction3Impl.prototype.orElse = function(that) {
	return haxe.abstract._PartialFunction.PartialFunction3Impl.create(this._def.concat([Tuple2.create($closure(that,"isDefinedAt"),$closure(that,"call"))]));
}
haxe.abstract._PartialFunction.PartialFunction3Impl.prototype.toFunction = function() {
	var self = this;
	return function(a,b,c) {
		return (self.isDefinedAt(a,b,c)?Option.Some(self.call(a,b,c)):Option.None);
	}
}
haxe.abstract._PartialFunction.PartialFunction3Impl.prototype.__class__ = haxe.abstract._PartialFunction.PartialFunction3Impl;
haxe.abstract._PartialFunction.PartialFunction3Impl.__interfaces__ = [haxe.abstract.PartialFunction3];
haxe.abstract.PartialFunction3ImplExtensions = function() { }
haxe.abstract.PartialFunction3ImplExtensions.__name__ = ["haxe","abstract","PartialFunction3ImplExtensions"];
haxe.abstract.PartialFunction3ImplExtensions.toPartialFunction = function(def) {
	return haxe.abstract._PartialFunction.PartialFunction3Impl.create(def);
}
haxe.abstract.PartialFunction3ImplExtensions.prototype.__class__ = haxe.abstract.PartialFunction3ImplExtensions;
haxe.abstract._PartialFunction.PartialFunction4Impl = function(def) { if( def === $_ ) return; {
	this._def = def;
}}
haxe.abstract._PartialFunction.PartialFunction4Impl.__name__ = ["haxe","abstract","_PartialFunction","PartialFunction4Impl"];
haxe.abstract._PartialFunction.PartialFunction4Impl.create = function(def) {
	return new haxe.abstract._PartialFunction.PartialFunction4Impl(def);
}
haxe.abstract._PartialFunction.PartialFunction4Impl.prototype._def = null;
haxe.abstract._PartialFunction.PartialFunction4Impl.prototype.call = function(a,b,c,d) {
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
haxe.abstract._PartialFunction.PartialFunction4Impl.prototype.isDefinedAt = function(a,b,c,d) {
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
haxe.abstract._PartialFunction.PartialFunction4Impl.prototype.orAlways = function(f) {
	return haxe.abstract._PartialFunction.PartialFunction4Impl.create(this._def.concat([DynamicExtensions.entuple((function(a,b,c,d) {
		return true;
	}),f)]));
}
haxe.abstract._PartialFunction.PartialFunction4Impl.prototype.orAlwaysC = function(z) {
	return haxe.abstract._PartialFunction.PartialFunction4Impl.create(this._def.concat([DynamicExtensions.entuple((function(a,b,c,d) {
		return true;
	}),function(a,b,c,d) {
		return z();
	})]));
}
haxe.abstract._PartialFunction.PartialFunction4Impl.prototype.orElse = function(that) {
	return haxe.abstract._PartialFunction.PartialFunction4Impl.create(this._def.concat([Tuple2.create($closure(that,"isDefinedAt"),$closure(that,"call"))]));
}
haxe.abstract._PartialFunction.PartialFunction4Impl.prototype.toFunction = function() {
	var self = this;
	return function(a,b,c,d) {
		return (self.isDefinedAt(a,b,c,d)?Option.Some(self.call(a,b,c,d)):Option.None);
	}
}
haxe.abstract._PartialFunction.PartialFunction4Impl.prototype.__class__ = haxe.abstract._PartialFunction.PartialFunction4Impl;
haxe.abstract._PartialFunction.PartialFunction4Impl.__interfaces__ = [haxe.abstract.PartialFunction4];
haxe.abstract.PartialFunction4ImplExtensions = function() { }
haxe.abstract.PartialFunction4ImplExtensions.__name__ = ["haxe","abstract","PartialFunction4ImplExtensions"];
haxe.abstract.PartialFunction4ImplExtensions.toPartialFunction = function(def) {
	return haxe.abstract._PartialFunction.PartialFunction4Impl.create(def);
}
haxe.abstract.PartialFunction4ImplExtensions.prototype.__class__ = haxe.abstract.PartialFunction4ImplExtensions;
haxe.abstract._PartialFunction.PartialFunction5Impl = function(def) { if( def === $_ ) return; {
	this._def = def;
}}
haxe.abstract._PartialFunction.PartialFunction5Impl.__name__ = ["haxe","abstract","_PartialFunction","PartialFunction5Impl"];
haxe.abstract._PartialFunction.PartialFunction5Impl.create = function(def) {
	return new haxe.abstract._PartialFunction.PartialFunction5Impl(def);
}
haxe.abstract._PartialFunction.PartialFunction5Impl.prototype._def = null;
haxe.abstract._PartialFunction.PartialFunction5Impl.prototype.call = function(a,b,c,d,e) {
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
haxe.abstract._PartialFunction.PartialFunction5Impl.prototype.isDefinedAt = function(a,b,c,d,e) {
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
haxe.abstract._PartialFunction.PartialFunction5Impl.prototype.orAlways = function(f) {
	return haxe.abstract._PartialFunction.PartialFunction5Impl.create(this._def.concat([DynamicExtensions.entuple((function(a,b,c,d,e) {
		return true;
	}),f)]));
}
haxe.abstract._PartialFunction.PartialFunction5Impl.prototype.orAlwaysC = function(z) {
	return haxe.abstract._PartialFunction.PartialFunction5Impl.create(this._def.concat([DynamicExtensions.entuple((function(a,b,c,d,e) {
		return true;
	}),function(a,b,c,d,e) {
		return z();
	})]));
}
haxe.abstract._PartialFunction.PartialFunction5Impl.prototype.orElse = function(that) {
	return haxe.abstract._PartialFunction.PartialFunction5Impl.create(this._def.concat([Tuple2.create($closure(that,"isDefinedAt"),$closure(that,"call"))]));
}
haxe.abstract._PartialFunction.PartialFunction5Impl.prototype.toFunction = function() {
	var self = this;
	return function(a,b,c,d,e) {
		return (self.isDefinedAt(a,b,c,d,e)?Option.Some(self.call(a,b,c,d,e)):Option.None);
	}
}
haxe.abstract._PartialFunction.PartialFunction5Impl.prototype.__class__ = haxe.abstract._PartialFunction.PartialFunction5Impl;
haxe.abstract._PartialFunction.PartialFunction5Impl.__interfaces__ = [haxe.abstract.PartialFunction5];
haxe.abstract.PartialFunction5ImplExtensions = function() { }
haxe.abstract.PartialFunction5ImplExtensions.__name__ = ["haxe","abstract","PartialFunction5ImplExtensions"];
haxe.abstract.PartialFunction5ImplExtensions.toPartialFunction = function(def) {
	return haxe.abstract._PartialFunction.PartialFunction5Impl.create(def);
}
haxe.abstract.PartialFunction5ImplExtensions.prototype.__class__ = haxe.abstract.PartialFunction5ImplExtensions;
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
		catch( $e19 ) {
			{
				var e = $e19;
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
	if(c == null) return null;
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
	catch( $e20 ) {
		{
			var e = $e20;
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
	catch( $e21 ) {
		{
			var err = $e21;
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
	catch( $e22 ) {
		{
			var e = $e22;
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
haxe.reactive.StreamStream = function(p) { if( p === $_ ) return; {
	null;
}}
haxe.reactive.StreamStream.__name__ = ["haxe","reactive","StreamStream"];
haxe.reactive.StreamStream.switchE = function(streams) {
	return haxe.reactive.StreamStream.flatten(streams);
}
haxe.reactive.StreamStream.join = function(stream) {
	return haxe.reactive.StreamStream.flatten(stream);
}
haxe.reactive.StreamStream.flatten = function(stream) {
	return stream.bind(function(stream1) {
		return stream1;
	});
}
haxe.reactive.StreamStream.prototype.__class__ = haxe.reactive.StreamStream;
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
		catch( $e23 ) {
			{
				var e = $e23;
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
	catch( $e24 ) {
		{
			var e = $e24;
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
	{ var $it25 = it;
	while( $it25.hasNext() ) { var i = $it25.next();
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
haxe.test.Assertation = { __ename__ : ["haxe","test","Assertation"], __constructs__ : ["Success","Failure","Error","SetupError","TeardownError","TimeoutError","AsyncError","Warning"] }
haxe.test.Assertation.AsyncError = function(e,stack) { var $x = ["AsyncError",6,e,stack]; $x.__enum__ = haxe.test.Assertation; $x.toString = $estr; return $x; }
haxe.test.Assertation.Error = function(e,stack) { var $x = ["Error",2,e,stack]; $x.__enum__ = haxe.test.Assertation; $x.toString = $estr; return $x; }
haxe.test.Assertation.Failure = function(msg,pos) { var $x = ["Failure",1,msg,pos]; $x.__enum__ = haxe.test.Assertation; $x.toString = $estr; return $x; }
haxe.test.Assertation.SetupError = function(e,stack) { var $x = ["SetupError",3,e,stack]; $x.__enum__ = haxe.test.Assertation; $x.toString = $estr; return $x; }
haxe.test.Assertation.Success = function(pos) { var $x = ["Success",0,pos]; $x.__enum__ = haxe.test.Assertation; $x.toString = $estr; return $x; }
haxe.test.Assertation.TeardownError = function(e,stack) { var $x = ["TeardownError",4,e,stack]; $x.__enum__ = haxe.test.Assertation; $x.toString = $estr; return $x; }
haxe.test.Assertation.TimeoutError = function(missedAsyncs,stack) { var $x = ["TimeoutError",5,missedAsyncs,stack]; $x.__enum__ = haxe.test.Assertation; $x.toString = $estr; return $x; }
haxe.test.Assertation.Warning = function(msg) { var $x = ["Warning",7,msg]; $x.__enum__ = haxe.test.Assertation; $x.toString = $estr; return $x; }
Unit = { __ename__ : ["Unit"], __constructs__ : ["Unit"] }
Unit.Unit = ["Unit",0];
Unit.Unit.toString = $estr;
Unit.Unit.__enum__ = Unit;
DynamicExtensions = function() { }
DynamicExtensions.__name__ = ["DynamicExtensions"];
DynamicExtensions.ShowT = function() {
	return ShowTypeclass.create({ show : function(d) {
		return Std.string(d);
	}});
}
DynamicExtensions.HasherT = function() {
	return HasherTypeclass.create({ hash : function(d) {
		return StringExtensions.HasherT(String).hash(DynamicExtensions.ShowT().show(d));
	}});
}
DynamicExtensions.EqualT = function() {
	return EqualTypeclass.create({ equal : function(d1,d2) {
		return d1 == d2;
	}});
}
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
DynamicExtensions.prototype.__class__ = DynamicExtensions;
BoolExtensions = function() { }
BoolExtensions.__name__ = ["BoolExtensions"];
BoolExtensions.toInt = function(v) {
	return (v?1:0);
}
BoolExtensions.toString = function(v) {
	return Std.string(v);
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
BoolExtensions.OrderT = function(c) {
	return OrderTypeclass.create({ compare : function(v1,v2) {
		return (!v1 && v2?-1:(v1 && !v2?1:0));
	}});
}
BoolExtensions.EqualT = function(c) {
	return EqualTypeclass.create({ equal : function(v1,v2) {
		return BoolExtensions.OrderT(c).compare(v1,v2) == 0;
	}});
}
BoolExtensions.ShowT = function(c) {
	return ShowTypeclass.create({ show : function(v) {
		return (v?"true":"false");
	}});
}
BoolExtensions.HasherT = function(c) {
	return HasherTypeclass.create({ hash : function(v) {
		return (v?786433:393241);
	}});
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
IntExtensions.toString = function(v) {
	return Std.string(v);
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
IntExtensions.OrderT = function(c) {
	return OrderTypeclass.create({ compare : function(v1,v2) {
		return v1 - v2;
	}});
}
IntExtensions.EqualT = function(c) {
	return EqualTypeclass.create({ equal : function(v1,v2) {
		return IntExtensions.OrderT(c).compare(v1,v2) == 0;
	}});
}
IntExtensions.ShowT = function(c) {
	return ShowTypeclass.create({ show : function(v) {
		return Std.string(v);
	}});
}
IntExtensions.HasherT = function(c) {
	return HasherTypeclass.create({ hash : function(v) {
		return v * 196613;
	}});
}
IntExtensions.prototype.__class__ = IntExtensions;
FloatExtensions = function() { }
FloatExtensions.__name__ = ["FloatExtensions"];
FloatExtensions.round = function(v) {
	return Math.round(v);
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
FloatExtensions.toString = function(v) {
	return Std.string(v);
}
FloatExtensions.OrderT = function(c) {
	return OrderTypeclass.create({ compare : function(v1,v2) {
		return (v1 < v2?-1:(v2 > v1?1:0));
	}});
}
FloatExtensions.EqualT = function(c) {
	return EqualTypeclass.create({ equal : function(v1,v2) {
		return FloatExtensions.OrderT(c).compare(v1,v2) == 0;
	}});
}
FloatExtensions.ShowT = function(c) {
	return ShowTypeclass.create({ show : function(v) {
		return Std.string(v);
	}});
}
FloatExtensions.HasherT = function(c) {
	return HasherTypeclass.create({ hash : function(v) {
		return Std["int"](v * 98317);
	}});
}
FloatExtensions.prototype.__class__ = FloatExtensions;
StringExtensions = function() { }
StringExtensions.__name__ = ["StringExtensions"];
StringExtensions.toBool = function(v) {
	return (v.toLowerCase() == "false" || v == "0"?false:true);
}
StringExtensions.toInt = function(v) {
	return Std.parseInt(v);
}
StringExtensions.toFloat = function(v) {
	return Std.parseFloat(v);
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
StringExtensions.OrderT = function(c) {
	return OrderTypeclass.create({ compare : function(v1,v2) {
		{
			var _g1 = 0, _g = Std["int"](Math.min(v1.length,v2.length));
			while(_g1 < _g) {
				var i = _g1++;
				var c1 = v1.charCodeAt(i) - v2.charCodeAt(i);
				if(c1 != 0) return c1;
			}
		}
		return v1.length - v2.length;
	}});
}
StringExtensions.EqualT = function(c) {
	return EqualTypeclass.create({ equal : function(v1,v2) {
		return v1 == v2;
	}});
}
StringExtensions.ShowT = function(c) {
	return ShowTypeclass.create({ show : function(v) {
		return v;
	}});
}
StringExtensions.HasherT = function(c) {
	return HasherTypeclass.create({ hash : function(v) {
		var hash = 0;
		{
			var _g1 = 0, _g = v.length;
			while(_g1 < _g) {
				var i = _g1++;
				hash += (v.charCodeAt(i) + 24593) * 49157;
			}
		}
		return hash;
	}});
}
StringExtensions.prototype.__class__ = StringExtensions;
DateExtensions = function() { }
DateExtensions.__name__ = ["DateExtensions"];
DateExtensions.toString = function(v) {
	return Std.string(v);
}
DateExtensions.OrderT = function(c) {
	return OrderTypeclass.create({ compare : function(v1,v2) {
		var diff = v1.getTime() - v2.getTime();
		return (diff < 0?-1:(diff > 0?1:0));
	}});
}
DateExtensions.EqualT = function(c) {
	return EqualTypeclass.create({ equal : function(v1,v2) {
		return v1.getTime() == v2.getTime();
	}});
}
DateExtensions.ShowT = function(c) {
	return ShowTypeclass.create({ show : function(v) {
		return v.toString();
	}});
}
DateExtensions.HasherT = function(c) {
	return HasherTypeclass.create({ hash : function(v) {
		return Math.round(v.getTime() * 49157);
	}});
}
DateExtensions.prototype.__class__ = DateExtensions;
ArrayExtensions = function() { }
ArrayExtensions.__name__ = ["ArrayExtensions"];
ArrayExtensions.OrderT = function(c,order) {
	return OrderTypeclass.create({ compare : function(v1,v2) {
		{
			var _g1 = 0, _g = Std["int"](Math.min(v1.length,v2.length));
			while(_g1 < _g) {
				var i = _g1++;
				var c1 = order.compare(v1[i],v2[i]);
				if(c1 != 0) return c1;
			}
		}
		return v1.length - v2.length;
	}});
}
ArrayExtensions.EqualT = function(c,equal) {
	return EqualTypeclass.create({ equal : function(v1,v2) {
		if(v1.length != v2.length) return false;
		{
			var _g1 = 0, _g = Std["int"](Math.min(v1.length,v2.length));
			while(_g1 < _g) {
				var i = _g1++;
				if(!equal.equal(v1[i],v2[i])) return false;
			}
		}
		return true;
	}});
}
ArrayExtensions.ShowT = function(c,show) {
	return ShowTypeclass.create({ show : function(v) {
		return ("[" + ArrayExtensions.map(v,function(e) {
			return show.show(e);
		}).join(", ")) + "]";
	}});
}
ArrayExtensions.HasherT = function(c,hasher) {
	return HasherTypeclass.create({ hash : function(v) {
		var hash = 0;
		{
			var _g1 = 0, _g = v.length;
			while(_g1 < _g) {
				var i = _g1++;
				var e = v[i];
				hash += hasher.hash(e) * 12289;
			}
		}
		return hash;
	}});
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
			{ var $it26 = f(e1).iterator();
			while( $it26.hasNext() ) { var e2 = $it26.next();
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
	var copy = [].concat(a);
	copy.push(t);
	return copy;
}
ArrayExtensions.snapshot = function(a) {
	return [].concat(a);
}
ArrayExtensions.first = function(a) {
	return a[0];
}
ArrayExtensions.last = function(a) {
	return a[a.length - 1];
}
ArrayExtensions.contains = function(a,t) {
	{
		var _g = 0;
		while(_g < a.length) {
			var e = a[_g];
			++_g;
			if(e == t) return true;
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
ArrayExtensions.prototype.__class__ = ArrayExtensions;
FunctionExtensions = function() { }
FunctionExtensions.__name__ = ["FunctionExtensions"];
FunctionExtensions.toFunction1 = function(f) {
	return function(v) {
		return f();
	}
}
FunctionExtensions.compose = function(f1,f2) {
	return function(u) {
		return f1(f2(u));
	}
}
FunctionExtensions.andThen = function(f1,f2) {
	return function(u) {
		return f2(f1(u));
	}
}
FunctionExtensions.lazy = function(f,p1) {
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
FunctionExtensions.prototype.__class__ = FunctionExtensions;
Function2Extensions = function() { }
Function2Extensions.__name__ = ["Function2Extensions"];
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
Function2Extensions.prototype.__class__ = Function2Extensions;
Function3Extensions = function() { }
Function3Extensions.__name__ = ["Function3Extensions"];
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
Function3Extensions.prototype.__class__ = Function3Extensions;
Function4Extensions = function() { }
Function4Extensions.__name__ = ["Function4Extensions"];
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
Function4Extensions.prototype.__class__ = Function4Extensions;
Function5Extensions = function() { }
Function5Extensions.__name__ = ["Function5Extensions"];
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
Function5Extensions.prototype.__class__ = Function5Extensions;
Option = { __ename__ : ["Option"], __constructs__ : ["None","Some"] }
Option.None = ["None",0];
Option.None.toString = $estr;
Option.None.__enum__ = Option;
Option.Some = function(v) { var $x = ["Some",1,v]; $x.__enum__ = Option; $x.toString = $estr; return $x; }
OptionExtensions = function() { }
OptionExtensions.__name__ = ["OptionExtensions"];
OptionExtensions.OrderT = function(c,order) {
	return OrderTypeclass.create({ compare : function(v1,v2) {
		return (function($this) {
			var $r;
			var $e = (v1);
			switch( $e[1] ) {
			case 0:
			{
				$r = (function($this) {
					var $r;
					var $e = (v2);
					switch( $e[1] ) {
					case 0:
					{
						$r = 0;
					}break;
					case 1:
					{
						$r = -1;
					}break;
					default:{
						$r = null;
					}break;
					}
					return $r;
				}($this));
			}break;
			case 1:
			var t1 = $e[2];
			{
				$r = (function($this) {
					var $r;
					var $e = (v2);
					switch( $e[1] ) {
					case 0:
					{
						$r = 1;
					}break;
					case 1:
					var t2 = $e[2];
					{
						$r = order.compare(t1,t2);
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
	}});
}
OptionExtensions.EqualT = function(c,equal) {
	return EqualTypeclass.create({ equal : function(v1,v2) {
		return (function($this) {
			var $r;
			var $e = (v1);
			switch( $e[1] ) {
			case 0:
			{
				$r = (function($this) {
					var $r;
					var $e = (v2);
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
				}($this));
			}break;
			case 1:
			var t1 = $e[2];
			{
				$r = (function($this) {
					var $r;
					var $e = (v2);
					switch( $e[1] ) {
					case 0:
					{
						$r = false;
					}break;
					case 1:
					var t2 = $e[2];
					{
						$r = equal.equal(t1,t2);
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
	}});
}
OptionExtensions.ShowT = function(c,show) {
	return ShowTypeclass.create({ show : function(v) {
		return (function($this) {
			var $r;
			var $e = (v);
			switch( $e[1] ) {
			case 0:
			{
				$r = "None";
			}break;
			case 1:
			var t = $e[2];
			{
				$r = ("Some(" + show.show(t)) + ")";
			}break;
			default:{
				$r = null;
			}break;
			}
			return $r;
		}(this));
	}});
}
OptionExtensions.HasherT = function(c,hasher) {
	return HasherTypeclass.create({ hash : function(v) {
		return (function($this) {
			var $r;
			var $e = (v);
			switch( $e[1] ) {
			case 0:
			{
				$r = 3079;
			}break;
			case 1:
			var t = $e[2];
			{
				$r = hasher.hash(t);
			}break;
			default:{
				$r = null;
			}break;
			}
			return $r;
		}(this));
	}});
}
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
	return (function($this) {
		var $r;
		var $e = (o);
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
				var $e = (f(v1));
				switch( $e[1] ) {
				case 0:
				{
					$r = Option.None;
				}break;
				case 1:
				var v2 = $e[2];
				{
					$r = Option.Some(v2);
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
OptionExtensions.prototype.__class__ = OptionExtensions;
Either = { __ename__ : ["Either"], __constructs__ : ["Left","Right"] }
Either.Left = function(v) { var $x = ["Left",0,v]; $x.__enum__ = Either; $x.toString = $estr; return $x; }
Either.Right = function(v) { var $x = ["Right",1,v]; $x.__enum__ = Either; $x.toString = $estr; return $x; }
EitherExtensions = function() { }
EitherExtensions.__name__ = ["EitherExtensions"];
EitherExtensions.OrderT = function(c,order1,order2) {
	return OrderTypeclass.create({ compare : function(e1,e2) {
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
						$r = order1.compare(v1,v2);
					}break;
					case 1:
					var v2 = $e[2];
					{
						$r = -1;
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
						$r = 1;
					}break;
					case 1:
					var v2 = $e[2];
					{
						$r = order2.compare(v1,v2);
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
	}});
}
EitherExtensions.EqualT = function(c,equal1,equal2) {
	return EqualTypeclass.create({ equal : function(e1,e2) {
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
						$r = equal1.equal(v1,v2);
					}break;
					case 1:
					var v2 = $e[2];
					{
						$r = false;
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
						$r = false;
					}break;
					case 1:
					var v2 = $e[2];
					{
						$r = equal2.equal(v1,v2);
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
	}});
}
EitherExtensions.ShowT = function(c,show1,show2) {
	return ShowTypeclass.create({ show : function(e) {
		return (function($this) {
			var $r;
			var $e = (e);
			switch( $e[1] ) {
			case 0:
			var v = $e[2];
			{
				$r = ("Left(" + show1.show(v)) + ")";
			}break;
			case 1:
			var v = $e[2];
			{
				$r = ("Right(" + show2.show(v)) + ")";
			}break;
			default:{
				$r = null;
			}break;
			}
			return $r;
		}(this));
	}});
}
EitherExtensions.HasherT = function(c,hash1,hash2) {
	return HasherTypeclass.create({ hash : function(e) {
		return (function($this) {
			var $r;
			var $e = (e);
			switch( $e[1] ) {
			case 0:
			var v = $e[2];
			{
				$r = hash1.hash(v);
			}break;
			case 1:
			var v = $e[2];
			{
				$r = hash2.hash(v);
			}break;
			default:{
				$r = null;
			}break;
			}
			return $r;
		}(this));
	}});
}
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
	return new Future().cancel();
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
	{ var $it27 = i.iterator();
	while( $it27.hasNext() ) { var t = $it27.next();
	{
		if(isFirst) isFirst = false;
		else s += sep;
		s += show(t);
	}
	}}
	return s + suffix;
}
IterableExtensions.toList = function(i,equal) {
	return haxe.data.collections.List.create(equal).addAll(i);
}
IterableExtensions.toSet = function(i,hash,equal) {
	return haxe.data.collections.Set.create(hash,equal).addAll(i);
}
IterableExtensions.toMap = function(i,khash,kequal,vhash,vequal) {
	return haxe.data.collections.Map.create(khash,kequal,vhash,vequal).addAll(i);
}
IterableExtensions.toArray = function(i) {
	var a = [];
	{ var $it28 = i.iterator();
	while( $it28.hasNext() ) { var e = $it28.next();
	a.push(e);
	}}
	return a;
}
IterableExtensions.prototype.__class__ = IterableExtensions;
Product = function() { }
Product.__name__ = ["Product"];
Product.prototype.productArity = null;
Product.prototype.productElement = null;
Product.prototype.productPrefix = null;
Product.prototype.__class__ = Product;
if(typeof _Prelude=='undefined') _Prelude = {}
_Prelude.AbstractProduct = function(elements) { if( elements === $_ ) return; {
	this._productElements = elements;
}}
_Prelude.AbstractProduct.__name__ = ["_Prelude","AbstractProduct"];
_Prelude.AbstractProduct.prototype._productElements = null;
_Prelude.AbstractProduct.prototype.getProductArity = function() {
	return Stax.error("Not implemented");
}
_Prelude.AbstractProduct.prototype.getProductPrefix = function() {
	return Stax.error("Not implemented");
}
_Prelude.AbstractProduct.prototype.productArity = null;
_Prelude.AbstractProduct.prototype.productElement = function(n) {
	return this._productElements[n];
}
_Prelude.AbstractProduct.prototype.productPrefix = null;
_Prelude.AbstractProduct.prototype.toString = function() {
	var string = this.getProductPrefix() + "(";
	{
		var _g1 = 0, _g = this.getProductArity();
		while(_g1 < _g) {
			var i = _g1++;
			if(i != 0) string += ", ";
			string += Std.string(this.productElement(i));
		}
	}
	return string + ")";
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
Tuple2.OrderT = function(order1,order2) {
	return OrderTypeclass.create({ compare : function(v1,v2) {
		var c = order1.compare(v1._1,v2._1);
		if(c != 0) return c;
		c = order2.compare(v1._2,v2._2);
		if(c != 0) return c;
		return 0;
	}});
}
Tuple2.EqualT = function(equal1,equal2) {
	return EqualTypeclass.create({ equal : function(v1,v2) {
		return equal1.equal(v1._1,v2._1) && equal2.equal(v1._2,v2._2);
	}});
}
Tuple2.ShowT = function(show1,show2) {
	return ShowTypeclass.create({ show : function(v1) {
		return ((("Tuple2(" + show1.show(v1._1)) + ", ") + show2.show(v1._2)) + ")";
	}});
}
Tuple2.HasherT = function(hash1,hash2) {
	return HasherTypeclass.create({ hash : function(v) {
		return 786433 * hash1.hash(v._1) + 24593 * hash2.hash(v._2);
	}});
}
Tuple2.create = function(a,b) {
	return new Tuple2(a,b);
}
Tuple2.prototype._1 = null;
Tuple2.prototype._2 = null;
Tuple2.prototype.entuple = function(c) {
	return Tuple3.create(this._1,this._2,c);
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
Tuple3.OrderT = function(order1,order2,order3) {
	return OrderTypeclass.create({ compare : function(v1,v2) {
		var c = order1.compare(v1._1,v2._1);
		if(c != 0) return c;
		c = order2.compare(v1._2,v2._2);
		if(c != 0) return c;
		c = order3.compare(v1._3,v2._3);
		if(c != 0) return c;
		return 0;
	}});
}
Tuple3.EqualT = function(equal1,equal2,equal3) {
	return EqualTypeclass.create({ equal : function(v1,v2) {
		return equal1.equal(v1._1,v2._1) && equal2.equal(v1._2,v2._2) && equal3.equal(v1._3,v2._3);
	}});
}
Tuple3.ShowT = function(show1,show2,show3) {
	return ShowTypeclass.create({ show : function(v1) {
		return ((((("Tuple3(" + show1.show(v1._1)) + ", ") + show2.show(v1._2)) + ", ") + show3.show(v1._3)) + ")";
	}});
}
Tuple3.HasherT = function(hash1,hash2,hash3) {
	return HasherTypeclass.create({ hash : function(v) {
		return (196613 * hash1.hash(v._1) + 3079 * hash2.hash(v._2)) + 389 * hash3.hash(v._3);
	}});
}
Tuple3.create = function(a,b,c) {
	return new Tuple3(a,b,c);
}
Tuple3.prototype._1 = null;
Tuple3.prototype._2 = null;
Tuple3.prototype._3 = null;
Tuple3.prototype.entuple = function(d) {
	return Tuple4.create(this._1,this._2,this._3,d);
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
Tuple4.OrderT = function(order1,order2,order3,order4) {
	return OrderTypeclass.create({ compare : function(v1,v2) {
		var c = order1.compare(v1._1,v2._1);
		if(c != 0) return c;
		c = order2.compare(v1._2,v2._2);
		if(c != 0) return c;
		c = order3.compare(v1._3,v2._3);
		if(c != 0) return c;
		c = order4.compare(v1._4,v2._4);
		if(c != 0) return c;
		return 0;
	}});
}
Tuple4.EqualT = function(equal1,equal2,equal3,equal4) {
	return EqualTypeclass.create({ equal : function(v1,v2) {
		return equal1.equal(v1._1,v2._1) && equal2.equal(v1._2,v2._2) && equal3.equal(v1._3,v2._3) && equal4.equal(v1._4,v2._4);
	}});
}
Tuple4.ShowT = function(show1,show2,show3,show4) {
	return ShowTypeclass.create({ show : function(v1) {
		return ((((((("Tuple4(" + show1.show(v1._1)) + ", ") + show2.show(v1._2)) + ", ") + show3.show(v1._3)) + ", ") + show4.show(v1._4)) + ")";
	}});
}
Tuple4.HasherT = function(hash1,hash2,hash3,hash4) {
	return HasherTypeclass.create({ hash : function(v) {
		return ((1543 * hash1.hash(v._1) + 49157 * hash2.hash(v._2)) + 196613 * hash3.hash(v._3)) + 97 * hash4.hash(v._4);
	}});
}
Tuple4.create = function(a,b,c,d) {
	return new Tuple4(a,b,c,d);
}
Tuple4.prototype._1 = null;
Tuple4.prototype._2 = null;
Tuple4.prototype._3 = null;
Tuple4.prototype._4 = null;
Tuple4.prototype.entuple = function(e) {
	return Tuple5.create(this._1,this._2,this._3,this._4,e);
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
Tuple5.OrderT = function(order1,order2,order3,order4,order5) {
	return OrderTypeclass.create({ compare : function(v1,v2) {
		var c = order1.compare(v1._1,v2._1);
		if(c != 0) return c;
		c = order2.compare(v1._2,v2._2);
		if(c != 0) return c;
		c = order3.compare(v1._3,v2._3);
		if(c != 0) return c;
		c = order4.compare(v1._4,v2._4);
		if(c != 0) return c;
		c = order5.compare(v1._5,v2._5);
		if(c != 0) return c;
		return 0;
	}});
}
Tuple5.EqualT = function(equal1,equal2,equal3,equal4,equal5) {
	return EqualTypeclass.create({ equal : function(v1,v2) {
		return equal1.equal(v1._1,v2._1) && equal2.equal(v1._2,v2._2) && equal3.equal(v1._3,v2._3) && equal4.equal(v1._4,v2._4) && equal5.equal(v1._5,v2._5);
	}});
}
Tuple5.ShowT = function(show1,show2,show3,show4,show5) {
	return ShowTypeclass.create({ show : function(v1) {
		return ((((((((("Tuple5(" + show1.show(v1._1)) + ", ") + show2.show(v1._2)) + ", ") + show3.show(v1._3)) + ", ") + show4.show(v1._4)) + ", ") + show5.show(v1._5)) + ")";
	}});
}
Tuple5.HasherT = function(hash1,hash2,hash3,hash4,hash5) {
	return HasherTypeclass.create({ hash : function(v) {
		return (((12289 * hash1.hash(v._1) + 769 * hash2.hash(v._2)) + 393241 * hash3.hash(v._3)) + 193 * hash4.hash(v._4)) + 53 * hash5.hash(v._5);
	}});
}
Tuple5.create = function(a,b,c,d,e) {
	return new Tuple5(a,b,c,d,e);
}
Tuple5.prototype._1 = null;
Tuple5.prototype._2 = null;
Tuple5.prototype._3 = null;
Tuple5.prototype._4 = null;
Tuple5.prototype._5 = null;
Tuple5.prototype.getProductArity = function() {
	return 5;
}
Tuple5.prototype.getProductPrefix = function() {
	return "Tuple5";
}
Tuple5.prototype.__class__ = Tuple5;
OrderTypeclass = function() { }
OrderTypeclass.__name__ = ["OrderTypeclass"];
OrderTypeclass.create = function(cmp) {
	return { compare : cmp.compare, equal : function(t1,t2) {
		return cmp.compare(t1,t2) == 0;
	}, notEqual : function(t1,t2) {
		return cmp.compare(t1,t2) != 0;
	}, greaterThan : function(t1,t2) {
		return cmp.compare(t1,t2) > 0;
	}, greaterThanOrEqual : function(t1,t2) {
		return cmp.compare(t1,t2) >= 0;
	}, lessThan : function(t1,t2) {
		return cmp.compare(t1,t2) < 0;
	}, lessThanOrEqual : function(t1,t2) {
		return cmp.compare(t1,t2) <= 0;
	}}
}
OrderTypeclass.prototype.__class__ = OrderTypeclass;
EqualTypeclass = function() { }
EqualTypeclass.__name__ = ["EqualTypeclass"];
EqualTypeclass.create = function(equal) {
	return { equal : equal.equal, notEqual : function(v1,v2) {
		return !equal.equal(v1,v2);
	}}
}
EqualTypeclass.prototype.__class__ = EqualTypeclass;
ShowTypeclass = function() { }
ShowTypeclass.__name__ = ["ShowTypeclass"];
ShowTypeclass.create = function(show) {
	return { show : show.show}
}
ShowTypeclass.prototype.__class__ = ShowTypeclass;
HasherTypeclass = function() { }
HasherTypeclass.__name__ = ["HasherTypeclass"];
HasherTypeclass.create = function(hasher) {
	return { hash : hasher.hash}
}
HasherTypeclass.prototype.__class__ = HasherTypeclass;
Stax = function() { }
Stax.__name__ = ["Stax"];
Stax.error = function(msg) {
	return (Stax.errorT(msg))();
}
Stax.errorT = function(msg) {
	return function() {
		throw msg;
		return null;
	}
}
Stax.prototype.__class__ = Stax;
haxe.test.MustMatcherExtensions = function() { }
haxe.test.MustMatcherExtensions.__name__ = ["haxe","test","MustMatcherExtensions"];
haxe.test.MustMatcherExtensions.not = function(c) {
	return function(value) {
		return EitherExtensions.map(c(value),function(err) {
			return err;
		},function(suc) {
			return ("!(" + suc) + ")";
		});
	}
}
haxe.test.MustMatcherExtensions.or = function(c1,c2) {
	return function(value) {
		return EitherExtensions.composeRight(c1(value),c2(value),function(err1,err2) {
			return ((("(" + err1) + ") && (") + err2) + ")";
		},function(suc1,suc2) {
			return ((("(" + suc1) + ") || (") + suc2) + ")";
		});
	}
}
haxe.test.MustMatcherExtensions.and = function(c1,c2) {
	return function(value) {
		return EitherExtensions.composeLeft(c1(value),c2(value),function(err1,err2) {
			return ((("(" + err1) + ") || (") + err2) + ")";
		},function(suc1,suc2) {
			return ((("(" + suc1) + ") && (") + suc2) + ")";
		});
	}
}
haxe.test.MustMatcherExtensions.prototype.__class__ = haxe.test.MustMatcherExtensions;
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
haxe.test.Must = function() { }
haxe.test.Must.__name__ = ["haxe","test","Must"];
haxe.test.Must.equal = function(expected,equal) {
	if(equal == null) equal = DynamicExtensions.EqualT();
	return function(value) {
		return (!equal.equal(value,expected)?Either.Left((expected + " != ") + value):Either.Right((expected + " == ") + value));
	}
}
haxe.test.Must.contain = function(c,element) {
	return function(value) {
		return (!c.contains(element)?Either.Left(((("![" + haxe.abstract.FoldableExtensions.mkString(c,", ")) + "].contains(") + value) + ")"):Either.Right(((("[" + haxe.abstract.FoldableExtensions.mkString(c,", ")) + "].contains(") + value) + ")"));
	}
}
haxe.test.Must.beNull = function() {
	return function(value) {
		return (value != null?Either.Left(value + " != null"):Either.Right(value + " == null"));
	}
}
haxe.test.Must.beNonNull = function() {
	return function(value) {
		return (value == null?Either.Left(value + " == null"):Either.Right(value + " != null"));
	}
}
haxe.test.Must.prototype.__class__ = haxe.test.Must;
Lambda = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	{ var $it29 = it.iterator();
	while( $it29.hasNext() ) { var i = $it29.next();
	a.push(i);
	}}
	return a;
}
Lambda.list = function(it) {
	var l = new List();
	{ var $it30 = it.iterator();
	while( $it30.hasNext() ) { var i = $it30.next();
	l.add(i);
	}}
	return l;
}
Lambda.map = function(it,f) {
	var l = new List();
	{ var $it31 = it.iterator();
	while( $it31.hasNext() ) { var x = $it31.next();
	l.add(f(x));
	}}
	return l;
}
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	{ var $it32 = it.iterator();
	while( $it32.hasNext() ) { var x = $it32.next();
	l.add(f(i++,x));
	}}
	return l;
}
Lambda.has = function(it,elt,cmp) {
	if(cmp == null) {
		{ var $it33 = it.iterator();
		while( $it33.hasNext() ) { var x = $it33.next();
		if(x == elt) return true;
		}}
	}
	else {
		{ var $it34 = it.iterator();
		while( $it34.hasNext() ) { var x = $it34.next();
		if(cmp(x,elt)) return true;
		}}
	}
	return false;
}
Lambda.exists = function(it,f) {
	{ var $it35 = it.iterator();
	while( $it35.hasNext() ) { var x = $it35.next();
	if(f(x)) return true;
	}}
	return false;
}
Lambda.foreach = function(it,f) {
	{ var $it36 = it.iterator();
	while( $it36.hasNext() ) { var x = $it36.next();
	if(!f(x)) return false;
	}}
	return true;
}
Lambda.iter = function(it,f) {
	{ var $it37 = it.iterator();
	while( $it37.hasNext() ) { var x = $it37.next();
	f(x);
	}}
}
Lambda.filter = function(it,f) {
	var l = new List();
	{ var $it38 = it.iterator();
	while( $it38.hasNext() ) { var x = $it38.next();
	if(f(x)) l.add(x);
	}}
	return l;
}
Lambda.fold = function(it,f,first) {
	{ var $it39 = it.iterator();
	while( $it39.hasNext() ) { var x = $it39.next();
	first = f(x,first);
	}}
	return first;
}
Lambda.count = function(it) {
	var n = 0;
	{ var $it40 = it.iterator();
	while( $it40.hasNext() ) { var _ = $it40.next();
	++n;
	}}
	return n;
}
Lambda.empty = function(it) {
	return !it.iterator().hasNext();
}
Lambda.prototype.__class__ = Lambda;
haxe.test.TestFixture = function(target,methodName,method,setup,teardown,expectAssertions) { if( target === $_ ) return; {
	if(expectAssertions == null) expectAssertions = true;
	this.target = target;
	this.methodName = methodName;
	this.method = method;
	this.setup = setup;
	this.teardown = teardown;
	this.expectAssertions = expectAssertions;
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
haxe.test.TestFixture.prototype.expectAssertions = null;
haxe.test.TestFixture.prototype.method = null;
haxe.test.TestFixture.prototype.methodName = null;
haxe.test.TestFixture.prototype.onComplete = null;
haxe.test.TestFixture.prototype.onTested = null;
haxe.test.TestFixture.prototype.onTimeout = null;
haxe.test.TestFixture.prototype.setup = null;
haxe.test.TestFixture.prototype.target = null;
haxe.test.TestFixture.prototype.teardown = null;
haxe.test.TestFixture.prototype.__class__ = haxe.test.TestFixture;
haxe.abstract.P = function() { }
haxe.abstract.P.__name__ = ["haxe","abstract","P"];
haxe.abstract.P.isGreaterThan = function(ref) {
	return function(value) {
		return value > ref;
	}
}
haxe.abstract.P.isLessThan = function(ref) {
	return function(value) {
		return value < ref;
	}
}
haxe.abstract.P.isGreaterThanInt = function(ref) {
	return function(value) {
		return value > ref;
	}
}
haxe.abstract.P.isLessThanInt = function(ref) {
	return function(value) {
		return value < ref;
	}
}
haxe.abstract.P.isEqualTo = function(ref,equal) {
	if(equal == null) equal = DynamicExtensions.EqualT();
	return function(value) {
		return equal.equal(ref,value);
	}
}
haxe.abstract.P.startsWith = function(s) {
	return function(value) {
		return StringExtensions.startsWith(value,s);
	}
}
haxe.abstract.P.endsWith = function(s) {
	return function(value) {
		return StringExtensions.endsWith(value,s);
	}
}
haxe.abstract.P.contains = function(s) {
	return function(value) {
		return StringExtensions.contains(value,s);
	}
}
haxe.abstract.P.prototype.__class__ = haxe.abstract.P;
haxe.reactive.External = function() { }
haxe.reactive.External.__name__ = ["haxe","reactive","External"];
haxe.reactive.External.setTimeout = function(f,time) {
	return haxe.Timer.delay(f,time);
}
haxe.reactive.External.cancelTimeout = function(timer) {
	(function($this) {
		var $r;
		var tmp = timer;
		$r = (Std["is"](tmp,haxe.Timer)?tmp:(function($this) {
			var $r;
			throw "Class cast error";
			return $r;
		}($this)));
		return $r;
	}(this)).stop();
}
haxe.reactive.External.now = function() {
	return Date.now().getTime();
}
haxe.reactive.External.prototype.__class__ = haxe.reactive.External;
haxe.reactive.Propagation = { __ename__ : ["haxe","reactive","Propagation"], __constructs__ : ["propagate","doNotPropagate"] }
haxe.reactive.Propagation.doNotPropagate = ["doNotPropagate",1];
haxe.reactive.Propagation.doNotPropagate.toString = $estr;
haxe.reactive.Propagation.doNotPropagate.__enum__ = haxe.reactive.Propagation;
haxe.reactive.Propagation.propagate = function(value) { var $x = ["propagate",0,value]; $x.__enum__ = haxe.reactive.Propagation; $x.toString = $estr; return $x; }
haxe.reactive.Pulse = function(stamp,value) { if( stamp === $_ ) return; {
	this.stamp = stamp;
	this.value = value;
	var elements = [];
	elements.push(stamp);
	elements.push(value);
}}
haxe.reactive.Pulse.__name__ = ["haxe","reactive","Pulse"];
haxe.reactive.Pulse.prototype.map = function(f) {
	return this.withValue(f(this.value));
}
haxe.reactive.Pulse.prototype.stamp = null;
haxe.reactive.Pulse.prototype.value = null;
haxe.reactive.Pulse.prototype.withValue = function(newValue) {
	return new haxe.reactive.Pulse(this.stamp,newValue);
}
haxe.reactive.Pulse.prototype.__class__ = haxe.reactive.Pulse;
haxe.reactive.Stamp = function() { }
haxe.reactive.Stamp.__name__ = ["haxe","reactive","Stamp"];
haxe.reactive.Stamp.lastStamp = function() {
	return haxe.reactive.Stamp._stamp;
}
haxe.reactive.Stamp.nextStamp = function() {
	return ++haxe.reactive.Stamp._stamp;
}
haxe.reactive.Stamp.prototype.__class__ = haxe.reactive.Stamp;
haxe.reactive.Rank = function() { }
haxe.reactive.Rank.__name__ = ["haxe","reactive","Rank"];
haxe.reactive.Rank.lastRank = function() {
	return haxe.reactive.Rank._rank;
}
haxe.reactive.Rank.nextRank = function() {
	return ++haxe.reactive.Rank._rank;
}
haxe.reactive.Rank.prototype.__class__ = haxe.reactive.Rank;
if(!haxe.reactive._Reactive) haxe.reactive._Reactive = {}
haxe.reactive._Reactive.PriorityQueue = function(p) { if( p === $_ ) return; {
	this.val = [];
}}
haxe.reactive._Reactive.PriorityQueue.__name__ = ["haxe","reactive","_Reactive","PriorityQueue"];
haxe.reactive._Reactive.PriorityQueue.prototype.insert = function(kv) {
	this.val.push(kv);
	var kvpos = this.val.length - 1;
	while(kvpos > 0 && kv.k < this.val[Math.floor((kvpos - 1) / 2)].k) {
		var oldpos = kvpos;
		kvpos = Math.floor((kvpos - 1) / 2);
		this.val[oldpos] = this.val[kvpos];
		this.val[kvpos] = kv;
	}
}
haxe.reactive._Reactive.PriorityQueue.prototype.isEmpty = function() {
	return this.val.length == 0;
}
haxe.reactive._Reactive.PriorityQueue.prototype.length = function() {
	return this.val.length;
}
haxe.reactive._Reactive.PriorityQueue.prototype.pop = function() {
	if(this.val.length == 1) {
		return this.val.pop();
	}
	var ret = this.val.shift();
	this.val.unshift(this.val.pop());
	var kvpos = 0;
	var kv = this.val[0];
	while(true) {
		var leftChild = ((kvpos * 2 + 1 < this.val.length?this.val[kvpos * 2 + 1].k:kv.k + 1));
		var rightChild = ((kvpos * 2 + 2 < this.val.length?this.val[kvpos * 2 + 2].k:kv.k + 1));
		if(leftChild > kv.k && rightChild > kv.k) {
			break;
		}
		else if(leftChild < rightChild) {
			this.val[kvpos] = this.val[kvpos * 2 + 1];
			this.val[kvpos * 2 + 1] = kv;
			kvpos = kvpos * 2 + 1;
		}
		else {
			this.val[kvpos] = this.val[kvpos * 2 + 2];
			this.val[kvpos * 2 + 2] = kv;
			kvpos = kvpos * 2 + 2;
		}
	}
	return ret;
}
haxe.reactive._Reactive.PriorityQueue.prototype.val = null;
haxe.reactive._Reactive.PriorityQueue.prototype.__class__ = haxe.reactive._Reactive.PriorityQueue;
haxe.reactive.EventStream = function(updater,sources) { if( updater === $_ ) return; {
	this._updater = updater;
	this._sendsTo = [];
	this._weak = false;
	this._rank = haxe.reactive.Rank.nextRank();
	this._cleanups = [];
	if(sources != null) {
		{
			var _g = 0;
			while(_g < sources.length) {
				var source = sources[_g];
				++_g;
				source.attachListener(this);
			}
		}
	}
}}
haxe.reactive.EventStream.__name__ = ["haxe","reactive","EventStream"];
haxe.reactive.EventStream.prototype._cleanups = null;
haxe.reactive.EventStream.prototype._rank = null;
haxe.reactive.EventStream.prototype._sendsTo = null;
haxe.reactive.EventStream.prototype._updater = null;
haxe.reactive.EventStream.prototype._weak = null;
haxe.reactive.EventStream.prototype.attachListener = function(dependent) {
	this._sendsTo.push(dependent);
	if(this._rank > dependent._rank) {
		var lowest = haxe.reactive.Rank.lastRank() + 1;
		var q = [dependent];
		while(q.length > 0) {
			var cur = q.splice(0,1)[0];
			cur._rank = haxe.reactive.Rank.nextRank();
			q = q.concat(cur._sendsTo);
		}
	}
}
haxe.reactive.EventStream.prototype.bind = function(k) {
	var m = this;
	var prevE = null;
	var outE = haxe.reactive.Streams.identity();
	var inE = haxe.reactive.Streams.create(function(pulse) {
		if(prevE != null) {
			prevE.removeListener(outE,true);
		}
		prevE = k(pulse.value);
		prevE.attachListener(outE);
		return haxe.reactive.Propagation.doNotPropagate;
	},[m]);
	return outE;
}
haxe.reactive.EventStream.prototype.blind = function(time) {
	return this.blindB(haxe.reactive.Behaviors.constant(time));
}
haxe.reactive.EventStream.prototype.blindB = function(time) {
	var lastSent = (haxe.reactive.External.now() - time.valueNow()) - 1;
	return haxe.reactive.Streams.create(function(p) {
		var curTime = haxe.reactive.External.now();
		if(curTime - lastSent > time.valueNow()) {
			lastSent = curTime;
			return haxe.reactive.Propagation.propagate(p);
		}
		else {
			return haxe.reactive.Propagation.doNotPropagate;
		}
	},[this]);
}
haxe.reactive.EventStream.prototype.calm = function(time) {
	return this.calmB(haxe.reactive.Behaviors.constant(time));
}
haxe.reactive.EventStream.prototype.calmB = function(time) {
	var out = haxe.reactive.Streams.identity();
	var towards = null;
	haxe.reactive.Streams.create(function(pulse) {
		if(towards != null) {
			haxe.reactive.External.cancelTimeout(towards);
		}
		towards = haxe.reactive.External.setTimeout(function() {
			towards = null;
			out.sendEvent(pulse.value);
		},time.valueNow());
		return haxe.reactive.Propagation.doNotPropagate;
	},[this]);
	return out;
}
haxe.reactive.EventStream.prototype.constant = function(value) {
	return this.map(function(v) {
		return value;
	});
}
haxe.reactive.EventStream.prototype.delay = function(time) {
	var resE = haxe.reactive.Streams.identity();
	haxe.reactive.Streams.create(function(pulse) {
		resE.sendLaterIn(pulse.value,time);
		return haxe.reactive.Propagation.doNotPropagate;
	},[this]);
	return resE;
}
haxe.reactive.EventStream.prototype.delayB = function(time) {
	var self = this;
	var receiverEE = haxe.reactive.Streams.identity();
	var link = { from : self, towards : self.delay(time.valueNow())}
	var switcherE = haxe.reactive.Streams.create(function(pulse) {
		link.from.removeListener(link.towards);
		link = { from : self, towards : self.delay(pulse.value)}
		receiverEE.sendEvent(link.towards);
		return haxe.reactive.Propagation.doNotPropagate;
	},[time.changes()]);
	var resE = haxe.reactive.StreamStream.flatten(receiverEE);
	switcherE.sendEvent(time.valueNow());
	return resE;
}
haxe.reactive.EventStream.prototype.drop = function(n) {
	var count = n;
	return haxe.reactive.Streams.create(function(pulse) {
		return (count > 0?(function($this) {
			var $r;
			--count;
			$r = haxe.reactive.Propagation.doNotPropagate;
			return $r;
		}(this)):haxe.reactive.Propagation.propagate(pulse));
	},[this]);
}
haxe.reactive.EventStream.prototype.dropWhile = function(pred) {
	var checking = true;
	return haxe.reactive.Streams.create(function(pulse) {
		return (checking?(pred(pulse.value)?haxe.reactive.Propagation.doNotPropagate:(function($this) {
			var $r;
			checking = false;
			$r = haxe.reactive.Propagation.propagate(pulse);
			return $r;
		}(this))):haxe.reactive.Propagation.propagate(pulse));
	},[this]);
}
haxe.reactive.EventStream.prototype.each = function(f) {
	return this.forEach(f);
}
haxe.reactive.EventStream.prototype.filter = function(pred) {
	return haxe.reactive.Streams.create(function(pulse) {
		return (pred(pulse.value)?haxe.reactive.Propagation.propagate(pulse):haxe.reactive.Propagation.doNotPropagate);
	},[this]);
}
haxe.reactive.EventStream.prototype.filterRepeats = function(optStart) {
	return this.filterRepeatsBy(optStart,DynamicExtensions.EqualT().equal);
}
haxe.reactive.EventStream.prototype.filterRepeatsBy = function(optStart,eq) {
	var hadFirst = (optStart == null?false:true);
	var prev = optStart;
	return this.filter(function(v) {
		return (!hadFirst || !eq(prev,v)?(function($this) {
			var $r;
			hadFirst = true;
			prev = v;
			$r = true;
			return $r;
		}(this)):false);
	});
}
haxe.reactive.EventStream.prototype.filterWhile = function(pred) {
	var checking = true;
	var self = this;
	return haxe.reactive.Streams.create(function(pulse) {
		return (checking?(pred(pulse.value)?haxe.reactive.Propagation.propagate(pulse):(function($this) {
			var $r;
			checking = false;
			self.setWeaklyHeld(true);
			$r = haxe.reactive.Propagation.doNotPropagate;
			return $r;
		}(this))):haxe.reactive.Propagation.doNotPropagate);
	},[this]);
}
haxe.reactive.EventStream.prototype.flatMap = function(mapper) {
	return this.bind(mapper);
}
haxe.reactive.EventStream.prototype.forEach = function(f) {
	haxe.reactive.Streams.create(function(pulse) {
		f(pulse.value);
		return haxe.reactive.Propagation.doNotPropagate;
	},[this]);
	return this;
}
haxe.reactive.EventStream.prototype.getWeaklyHeld = function() {
	return this._weak;
}
haxe.reactive.EventStream.prototype.group = function() {
	return this.groupBy(function(e1,e2) {
		return e1 == e2;
	});
}
haxe.reactive.EventStream.prototype.groupBy = function(eq) {
	var prev = null;
	var cur = [];
	return haxe.reactive.Streams.create(function(pulse) {
		var ret = haxe.reactive.Propagation.doNotPropagate;
		if(prev != null) {
			if(!eq(prev,pulse.value)) {
				var iter = cur;
				ret = haxe.reactive.Propagation.propagate(pulse.withValue(iter));
				cur = [];
				cur.push(pulse.value);
				prev = null;
			}
			else {
				cur.push(pulse.value);
			}
		}
		else {
			cur.push(pulse.value);
		}
		prev = pulse.value;
		return ret;
	},[this]);
}
haxe.reactive.EventStream.prototype.map = function(mapper) {
	return haxe.reactive.Streams.create(function(pulse) {
		return haxe.reactive.Propagation.propagate(pulse.map(mapper));
	},[this]);
}
haxe.reactive.EventStream.prototype.merge = function(that) {
	return haxe.reactive.Streams.create(function(p) {
		return haxe.reactive.Propagation.propagate(p);
	},[this,that]);
}
haxe.reactive.EventStream.prototype.partition = function(pred) {
	var trueStream = haxe.reactive.Streams.create(function(pulse) {
		return (pred(pulse.value)?haxe.reactive.Propagation.propagate(pulse):haxe.reactive.Propagation.doNotPropagate);
	},[this]);
	var falseStream = haxe.reactive.Streams.create(function(pulse) {
		return (!pred(pulse.value)?haxe.reactive.Propagation.propagate(pulse):haxe.reactive.Propagation.doNotPropagate);
	},[this]);
	return Tuple2.create(trueStream,falseStream);
}
haxe.reactive.EventStream.prototype.partitionWhile = function(pred) {
	var trueStream = this.takeWhile(pred);
	var falseStream = this.dropWhile(pred);
	return Tuple2.create(trueStream,falseStream);
}
haxe.reactive.EventStream.prototype.propagatePulse = function(pulse) {
	var queue = new haxe.reactive._Reactive.PriorityQueue();
	var self = (function($this) {
		var $r;
		var tmp = $this;
		$r = (Std["is"](tmp,haxe.reactive.EventStream)?tmp:(function($this) {
			var $r;
			throw "Class cast error";
			return $r;
		}($this)));
		return $r;
	}(this));
	queue.insert({ k : this._rank, v : { stream : self, pulse : pulse}});
	while(queue.length() > 0) {
		var qv = queue.pop();
		var stream = qv.v.stream;
		var pulse1 = qv.v.pulse;
		var propagation = stream._updater(pulse1);
		var $e = (propagation);
		switch( $e[1] ) {
		case 0:
		var nextPulse = $e[2];
		{
			{
				var weaklyHeld = true;
				{
					var _g = 0, _g1 = stream._sendsTo;
					while(_g < _g1.length) {
						var recipient = _g1[_g];
						++_g;
						weaklyHeld = weaklyHeld && recipient.getWeaklyHeld();
						queue.insert({ k : recipient._rank, v : { stream : (function($this) {
							var $r;
							var tmp = recipient;
							$r = (Std["is"](tmp,haxe.reactive.EventStream)?tmp:(function($this) {
								var $r;
								throw "Class cast error";
								return $r;
							}($this)));
							return $r;
						}(this)), pulse : nextPulse}});
					}
				}
				if(stream._sendsTo.length > 0 && weaklyHeld) {
					stream.setWeaklyHeld(true);
				}
			}
		}break;
		case 1:
		{
			null;
		}break;
		}
	}
}
haxe.reactive.EventStream.prototype.removeListener = function(dependent,isWeakReference) {
	if(isWeakReference == null) isWeakReference = false;
	var foundSending = false;
	{
		var _g1 = 0, _g = this._sendsTo.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this._sendsTo[i] == dependent) {
				this._sendsTo.splice(i,1);
				foundSending = true;
				break;
			}
		}
	}
	if(isWeakReference && this._sendsTo.length == 0) {
		this.setWeaklyHeld(true);
	}
	return foundSending;
}
haxe.reactive.EventStream.prototype.scanl = function(initial,folder) {
	var acc = initial;
	return this.map(function(n) {
		var next = folder(acc,n);
		acc = next;
		return next;
	});
}
haxe.reactive.EventStream.prototype.scanlP = function(folder) {
	var acc = null;
	return this.map(function(n) {
		var next;
		if(acc != null) {
			next = folder(acc,n);
		}
		else {
			next = n;
		}
		acc = next;
		return next;
	});
}
haxe.reactive.EventStream.prototype.sendEvent = function(value) {
	this.propagatePulse(new haxe.reactive.Pulse(haxe.reactive.Stamp.nextStamp(),value));
	return this;
}
haxe.reactive.EventStream.prototype.sendLater = function(value) {
	return this.sendLaterIn(value,0);
}
haxe.reactive.EventStream.prototype.sendLaterIn = function(value,millis) {
	var self = this;
	haxe.reactive.External.setTimeout(function() {
		self.sendEvent(value);
	},millis);
	return this;
}
haxe.reactive.EventStream.prototype.setWeaklyHeld = function(held) {
	if(this._weak != held) {
		this._weak = held;
		if(!held) {
			{
				var _g = 0, _g1 = this._cleanups;
				while(_g < _g1.length) {
					var cleanup = _g1[_g];
					++_g;
					cleanup();
				}
			}
			this._cleanups = [];
		}
	}
	return this._weak;
}
haxe.reactive.EventStream.prototype.shift = function(n) {
	var queue = [];
	return haxe.reactive.Streams.create(function(pulse) {
		queue.push(pulse.value);
		return (queue.length <= n?haxe.reactive.Propagation.doNotPropagate:haxe.reactive.Propagation.propagate(pulse.withValue(queue.shift())));
	},[this]);
}
haxe.reactive.EventStream.prototype.shiftWhile = function(pred) {
	var queue = [];
	var checking = true;
	return haxe.reactive.Streams.create(function(pulse) {
		queue.push(pulse.value);
		return (checking?(pred(pulse.value)?haxe.reactive.Propagation.doNotPropagate:(function($this) {
			var $r;
			checking = false;
			$r = haxe.reactive.Propagation.propagate(pulse.withValue(queue.shift()));
			return $r;
		}(this))):haxe.reactive.Propagation.propagate(pulse.withValue(queue.shift())));
	},[this]);
}
haxe.reactive.EventStream.prototype.shiftWith = function(elements) {
	var queue = IterableExtensions.toArray(elements);
	var n = queue.length;
	return haxe.reactive.Streams.create(function(pulse) {
		queue.push(pulse.value);
		return (queue.length <= n?haxe.reactive.Propagation.doNotPropagate:haxe.reactive.Propagation.propagate(pulse.withValue(queue.shift())));
	},[this]);
}
haxe.reactive.EventStream.prototype.snapshot = function(value) {
	return this.map(function(t) {
		return value.valueNow();
	});
}
haxe.reactive.EventStream.prototype.startsWith = function(init) {
	return new haxe.reactive.Behavior(this,init,function(pulse) {
		return haxe.reactive.Propagation.propagate(pulse);
	});
}
haxe.reactive.EventStream.prototype.take = function(n) {
	var count = n;
	var self = this;
	return haxe.reactive.Streams.create(function(pulse) {
		return (count > 0?(function($this) {
			var $r;
			--count;
			$r = haxe.reactive.Propagation.propagate(pulse);
			return $r;
		}(this)):(function($this) {
			var $r;
			self.setWeaklyHeld(true);
			$r = haxe.reactive.Propagation.doNotPropagate;
			return $r;
		}(this)));
	},[this]);
}
haxe.reactive.EventStream.prototype.takeWhile = function(filter) {
	var stillChecking = true;
	var self = this;
	return haxe.reactive.Streams.create(function(pulse) {
		return (stillChecking?(filter(pulse.value)?haxe.reactive.Propagation.propagate(pulse):(function($this) {
			var $r;
			stillChecking = false;
			self.setWeaklyHeld(true);
			$r = haxe.reactive.Propagation.doNotPropagate;
			return $r;
		}(this))):haxe.reactive.Propagation.doNotPropagate);
	},[this]);
}
haxe.reactive.EventStream.prototype.toArray = function() {
	var array = [];
	this.each(function(e) {
		array.push(e);
	});
	return array;
}
haxe.reactive.EventStream.prototype.unique = function(eq) {
	return this.uniqueSteps().uniqueEvents(eq);
}
haxe.reactive.EventStream.prototype.uniqueEvents = function(eq) {
	if(eq == null) eq = function(e1,e2) {
		return e1 == e2;
	}
	var lastEvent = null;
	return haxe.reactive.Streams.create(function(pulse) {
		return (pulse.value != lastEvent?(function($this) {
			var $r;
			lastEvent = pulse.value;
			$r = haxe.reactive.Propagation.propagate(pulse);
			return $r;
		}(this)):haxe.reactive.Propagation.doNotPropagate);
	},[this]);
}
haxe.reactive.EventStream.prototype.uniqueSteps = function() {
	var lastStamp = -1;
	return haxe.reactive.Streams.create(function(pulse) {
		return (pulse.stamp != lastStamp?(function($this) {
			var $r;
			lastStamp = pulse.stamp;
			$r = haxe.reactive.Propagation.propagate(pulse);
			return $r;
		}(this)):haxe.reactive.Propagation.doNotPropagate);
	},[this]);
}
haxe.reactive.EventStream.prototype.weaklyHeld = null;
haxe.reactive.EventStream.prototype.whenFinishedDo = function(f) {
	if(this.getWeaklyHeld()) {
		f();
	}
	else {
		this._cleanups.push(f);
	}
}
haxe.reactive.EventStream.prototype.zip = function($as) {
	var testStamp = -1;
	var value1 = null;
	haxe.reactive.Streams.create(function(pulse) {
		testStamp = pulse.stamp;
		value1 = pulse.value;
		return haxe.reactive.Propagation.doNotPropagate;
	},[this]);
	return haxe.reactive.Streams.create(function(pulse) {
		return (testStamp == pulse.stamp?haxe.reactive.Propagation.propagate(pulse.withValue(Tuple2.create(value1,pulse.value))):haxe.reactive.Propagation.doNotPropagate);
	},[$as]);
}
haxe.reactive.EventStream.prototype.zip3 = function($as,bs) {
	var streams = [];
	streams.push(this);
	streams.push($as);
	streams.push(bs);
	return haxe.reactive.Streams.zipN(streams).map(function(i) {
		return Tuple3.create(haxe.data.collections.IterableExtensions.at(i,0),haxe.data.collections.IterableExtensions.at(i,1),haxe.data.collections.IterableExtensions.at(i,2));
	});
}
haxe.reactive.EventStream.prototype.zip4 = function($as,bs,cs) {
	var streams = [];
	streams.push(this);
	streams.push($as);
	streams.push(bs);
	streams.push(cs);
	return haxe.reactive.Streams.zipN(streams).map(function(i) {
		return Tuple4.create(haxe.data.collections.IterableExtensions.at(i,0),haxe.data.collections.IterableExtensions.at(i,1),haxe.data.collections.IterableExtensions.at(i,2),haxe.data.collections.IterableExtensions.at(i,3));
	});
}
haxe.reactive.EventStream.prototype.zip5 = function($as,bs,cs,ds) {
	var streams = [];
	streams.push(this);
	streams.push($as);
	streams.push(bs);
	streams.push(cs);
	streams.push(ds);
	return haxe.reactive.Streams.zipN(streams).map(function(i) {
		return Tuple5.create(haxe.data.collections.IterableExtensions.at(i,0),haxe.data.collections.IterableExtensions.at(i,1),haxe.data.collections.IterableExtensions.at(i,2),haxe.data.collections.IterableExtensions.at(i,3),haxe.data.collections.IterableExtensions.at(i,4));
	});
}
haxe.reactive.EventStream.prototype.__class__ = haxe.reactive.EventStream;
haxe.reactive.Behavior = function(stream,init,updater) { if( stream === $_ ) return; {
	this._last = init;
	this._underlyingRaw = stream;
	this._updater = updater;
	var self = this;
	this._underlying = haxe.reactive.Streams.create(function(pulse) {
		return (function($this) {
			var $r;
			var $e = (updater(pulse));
			switch( $e[1] ) {
			case 0:
			var newPulse = $e[2];
			{
				$r = (function($this) {
					var $r;
					self._last = newPulse.value;
					$r = haxe.reactive.Propagation.propagate(newPulse);
					return $r;
				}($this));
			}break;
			case 1:
			{
				$r = haxe.reactive.Propagation.doNotPropagate;
			}break;
			default:{
				$r = null;
			}break;
			}
			return $r;
		}(this));
	},[stream.uniqueSteps()]);
}}
haxe.reactive.Behavior.__name__ = ["haxe","reactive","Behavior"];
haxe.reactive.Behavior.prototype._last = null;
haxe.reactive.Behavior.prototype._underlying = null;
haxe.reactive.Behavior.prototype._underlyingRaw = null;
haxe.reactive.Behavior.prototype._updater = null;
haxe.reactive.Behavior.prototype.blind = function(time) {
	return this.mapC(function(s) {
		return s.blind(time);
	});
}
haxe.reactive.Behavior.prototype.blindB = function(time) {
	return this.mapC(function(s) {
		return s.blindB(time);
	});
}
haxe.reactive.Behavior.prototype.calm = function(time) {
	return this.mapC(function(s) {
		return s.calm(time);
	});
}
haxe.reactive.Behavior.prototype.calmB = function(time) {
	return this.mapC(function(s) {
		return s.calmB(time);
	});
}
haxe.reactive.Behavior.prototype.changes = function() {
	return this._underlying;
}
haxe.reactive.Behavior.prototype.delay = function(time) {
	return this.mapC(function(s) {
		return s.delay(time);
	});
}
haxe.reactive.Behavior.prototype.delayB = function(time) {
	return this.mapC(function(s) {
		return s.delayB(time);
	});
}
haxe.reactive.Behavior.prototype.lift = function(f) {
	return this.changes().map(function(a) {
		return f(a);
	}).startsWith(f(this.valueNow()));
}
haxe.reactive.Behavior.prototype.liftB = function(f) {
	return this.changes().map(function(a) {
		return (f.valueNow())(a);
	}).startsWith((f.valueNow())(this.valueNow()));
}
haxe.reactive.Behavior.prototype.map = function(f) {
	return this.lift(f);
}
haxe.reactive.Behavior.prototype.mapB = function(f) {
	return this.liftB(f);
}
haxe.reactive.Behavior.prototype.mapC = function(f) {
	return f(this.changes()).startsWith(this.valueNow());
}
haxe.reactive.Behavior.prototype.sendBehavior = function(value) {
	this.changes().sendEvent(value);
}
haxe.reactive.Behavior.prototype.valueNow = function() {
	return this._last;
}
haxe.reactive.Behavior.prototype.zip = function(b2) {
	var self = this;
	var createTuple = function() {
		return Tuple2.create(self.valueNow(),b2.valueNow());
	}
	return haxe.reactive.Streams.create(function(pulse) {
		return haxe.reactive.Propagation.propagate(pulse.withValue(createTuple()));
	},ArrayExtensions.map([this,b2],function(b) {
		return (function($this) {
			var $r;
			var tmp = b.changes();
			$r = (Std["is"](tmp,haxe.reactive.EventStream)?tmp:(function($this) {
				var $r;
				throw "Class cast error";
				return $r;
			}($this)));
			return $r;
		}(this));
	})).startsWith(createTuple());
}
haxe.reactive.Behavior.prototype.zip3 = function(b2,b3) {
	var self = this;
	var createTuple = function() {
		return Tuple3.create(self.valueNow(),b2.valueNow(),b3.valueNow());
	}
	return haxe.reactive.Streams.create(function(pulse) {
		return haxe.reactive.Propagation.propagate(pulse.withValue(createTuple()));
	},ArrayExtensions.map([this,b2,b3],function(b) {
		return (function($this) {
			var $r;
			var tmp = b.changes();
			$r = (Std["is"](tmp,haxe.reactive.EventStream)?tmp:(function($this) {
				var $r;
				throw "Class cast error";
				return $r;
			}($this)));
			return $r;
		}(this));
	})).startsWith(createTuple());
}
haxe.reactive.Behavior.prototype.zip4 = function(b2,b3,b4) {
	var self = this;
	var createTuple = function() {
		return Tuple4.create(self.valueNow(),b2.valueNow(),b3.valueNow(),b4.valueNow());
	}
	return haxe.reactive.Streams.create(function(pulse) {
		return haxe.reactive.Propagation.propagate(pulse.withValue(createTuple()));
	},ArrayExtensions.map([this,b2,b3,b4],function(b) {
		return (function($this) {
			var $r;
			var tmp = b.changes();
			$r = (Std["is"](tmp,haxe.reactive.EventStream)?tmp:(function($this) {
				var $r;
				throw "Class cast error";
				return $r;
			}($this)));
			return $r;
		}(this));
	})).startsWith(createTuple());
}
haxe.reactive.Behavior.prototype.zip5 = function(b2,b3,b4,b5) {
	var self = this;
	var createTuple = function() {
		return Tuple5.create(self.valueNow(),b2.valueNow(),b3.valueNow(),b4.valueNow(),b5.valueNow());
	}
	return haxe.reactive.Streams.create(function(pulse) {
		return haxe.reactive.Propagation.propagate(pulse.withValue(createTuple()));
	},ArrayExtensions.map([this,b2,b3,b4,b5],function(b) {
		return (function($this) {
			var $r;
			var tmp = b.changes();
			$r = (Std["is"](tmp,haxe.reactive.EventStream)?tmp:(function($this) {
				var $r;
				throw "Class cast error";
				return $r;
			}($this)));
			return $r;
		}(this));
	})).startsWith(createTuple());
}
haxe.reactive.Behavior.prototype.zipN = function(behaviors) {
	var behaviors1 = haxe.data.collections.IterableExtensions.cons(behaviors,this);
	return haxe.reactive.Behaviors.zipN(behaviors1);
}
haxe.reactive.Behavior.prototype.__class__ = haxe.reactive.Behavior;
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
	{ var $it41 = this.classes.keys();
	while( $it41.hasNext() ) { var name = $it41.next();
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
	{ var $it42 = assertations.iterator();
	while( $it42.hasNext() ) { var assertation = $it42.next();
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
	{ var $it43 = this.packages.keys();
	while( $it43.hasNext() ) { var name = $it43.next();
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
haxe.test.Assert = function() { }
haxe.test.Assert.__name__ = ["haxe","test","Assert"];
haxe.test.Assert.results = null;
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
haxe.test.Assert.equals = function(expected,value,msg,pos) {
	if(msg == null) msg = (("expected " + haxe.test.Assert.q(expected)) + " but was ") + haxe.test.Assert.q(value);
	haxe.test.Assert.isTrue(expected == value,msg,pos);
}
haxe.test.Assert.match = function(pattern,value,msg,pos) {
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
				status.error = ((("expected " + haxe.test.Assert.q(Type.enumConstructor(expected))) + " but is ") + haxe.test.Assert.q(Type.enumConstructor(value))) + ((status.path == ""?"":" for field " + status.path));
				return false;
			}
			var eparams = Type.enumParameters(expected);
			var vparams = Type.enumParameters(value);
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
haxe.test.Assert.same = function(expected,value,recursive,msg,pos) {
	if(null == recursive) recursive = true;
	var status = { recursive : recursive, path : "", error : null}
	if(haxe.test.Assert.sameAs(expected,value,status)) {
		haxe.test.Assert.isTrue(true,msg,pos);
	}
	else {
		haxe.test.Assert.fail((msg == null?status.error:msg),pos);
	}
}
haxe.test.Assert.raises = function(method,type,msg,pos) {
	if(type == null) type = String;
	try {
		method();
		var name = Type.getClassName(type);
		if(name == null) name = "" + type;
		haxe.test.Assert.fail(("exception of type " + name) + " not raised",pos);
	}
	catch( $e44 ) {
		{
			var ex = $e44;
			{
				var name = Type.getClassName(type);
				if(name == null) name = "" + type;
				haxe.test.Assert.isTrue(Std["is"](ex,type),(("expected throw of type " + name) + " but was ") + ex,pos);
			}
		}
	}
}
haxe.test.Assert.allows = function(possibilities,value,msg,pos) {
	if(Lambda.has(possibilities,value)) {
		haxe.test.Assert.isTrue(true,msg,pos);
	}
	else {
		haxe.test.Assert.fail((msg == null?(("value " + haxe.test.Assert.q(value)) + " not found in the expected possibilities ") + possibilities:msg),pos);
	}
}
haxe.test.Assert.contains = function(match,values,msg,pos) {
	if(Lambda.has(values,match)) {
		haxe.test.Assert.isTrue(true,msg,pos);
	}
	else {
		haxe.test.Assert.fail((msg == null?(("values " + values) + " do not contain ") + match:msg),pos);
	}
}
haxe.test.Assert.notContains = function(match,values,msg,pos) {
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
	catch( $e45 ) {
		{
			var e = $e45;
			null;
		}
	}
	try {
		return Type.getClassName(t);
	}
	catch( $e46 ) {
		{
			var e = $e46;
			null;
		}
	}
	try {
		var _t = Type.getEnum(t);
		if(_t != null) t = _t;
	}
	catch( $e47 ) {
		{
			var e = $e47;
			null;
		}
	}
	try {
		return Type.getEnumName(t);
	}
	catch( $e48 ) {
		{
			var e = $e48;
			null;
		}
	}
	try {
		return Std.string(Type["typeof"](t));
	}
	catch( $e49 ) {
		{
			var e = $e49;
			null;
		}
	}
	try {
		return Std.string(t);
	}
	catch( $e50 ) {
		{
			var e = $e50;
			null;
		}
	}
	return "<unable to retrieve type name>";
}
haxe.test.Assert.prototype.__class__ = haxe.test.Assert;
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
							{ var $it51 = fix.iterator();
							while( $it51.hasNext() ) { var assertation = $it51.next();
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
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype.__class__ = haxe.Log;
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
	catch( $e52 ) {
		{
			var e = $e52;
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
	{ var $it53 = it;
	while( $it53.hasNext() ) { var i = $it53.next();
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
		catch( $e54 ) {
			{
				var e = $e54;
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
		catch( $e55 ) {
			{
				var e1 = $e55;
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
	catch( $e56 ) {
		{
			var e = $e56;
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
		catch( $e57 ) {
			{
				var e = $e57;
				{
					this.results.add(haxe.test.Assertation.Error(e,haxe.test.TestHandler.exceptionStack()));
				}
			}
		}
	}
	catch( $e58 ) {
		{
			var e = $e58;
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
	if(this.results.length == 0 && this.fixture.expectAssertions) this.results.add(haxe.test.Assertation.Warning("no assertions"));
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
haxe.abstract.Predicate1Extensions = function() { }
haxe.abstract.Predicate1Extensions.__name__ = ["haxe","abstract","Predicate1Extensions"];
haxe.abstract.Predicate1Extensions.and = function(p1,p2) {
	return function(value) {
		return p1(value) && p2(value);
	}
}
haxe.abstract.Predicate1Extensions.andAll = function(p1,ps) {
	return function(value) {
		var result = p1(value);
		{ var $it59 = ps.iterator();
		while( $it59.hasNext() ) { var p = $it59.next();
		{
			if(!result) break;
			result = result && p(value);
		}
		}}
		return result;
	}
}
haxe.abstract.Predicate1Extensions.or = function(p1,p2) {
	return function(value) {
		return p1(value) || p2(value);
	}
}
haxe.abstract.Predicate1Extensions.orAny = function(p1,ps) {
	return function(value) {
		var result = p1(value);
		{ var $it60 = ps.iterator();
		while( $it60.hasNext() ) { var p = $it60.next();
		{
			if(result) break;
			result = result || p(value);
		}
		}}
		return result;
	}
}
haxe.abstract.Predicate1Extensions.negate = function(p) {
	return function(value) {
		return !p(value);
	}
}
haxe.abstract.Predicate1Extensions.prototype.__class__ = haxe.abstract.Predicate1Extensions;
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
	{ var $it61 = this.fixtures.keys();
	while( $it61.hasNext() ) { var name = $it61.next();
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
haxe.reactive.Behaviors = function(p) { if( p === $_ ) return; {
	null;
}}
haxe.reactive.Behaviors.__name__ = ["haxe","reactive","Behaviors"];
haxe.reactive.Behaviors.constant = function(value) {
	return haxe.reactive.Streams.identity().startsWith(value);
}
haxe.reactive.Behaviors.cond = function(conditions,elseB) {
	return (function($this) {
		var $r;
		var $e = (haxe.data.collections.IterableExtensions.headOption(conditions));
		switch( $e[1] ) {
		case 0:
		{
			$r = elseB;
		}break;
		case 1:
		var h = $e[2];
		{
			$r = haxe.reactive.BehaviorBool.ifTrue(h._1,h._2,haxe.reactive.Behaviors.cond(haxe.data.collections.IterableExtensions.tail(conditions),elseB));
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
haxe.reactive.Behaviors.zipN = function(behaviors) {
	var zipValueNow = function() {
		return haxe.data.collections.IterableExtensions.map(behaviors,function(b) {
			return b.valueNow();
		});
	}
	return haxe.reactive.Streams.create(function(pulse) {
		return haxe.reactive.Propagation.propagate(pulse.withValue(zipValueNow()));
	},haxe.data.collections.IterableExtensions.map(behaviors,function(b) {
		return b.changes();
	})).startsWith(zipValueNow());
}
haxe.reactive.Behaviors.sample = function(time) {
	return haxe.reactive.Streams.timer(time).startsWith(Std["int"](haxe.reactive.External.now()));
}
haxe.reactive.Behaviors.sampleB = function(time) {
	return haxe.reactive.Streams.timerB(time).startsWith(Std["int"](haxe.reactive.External.now()));
}
haxe.reactive.Behaviors.prototype.__class__ = haxe.reactive.Behaviors;
haxe.abstract.FoldableExtensions = function() { }
haxe.abstract.FoldableExtensions.__name__ = ["haxe","abstract","FoldableExtensions"];
haxe.abstract.FoldableExtensions.foldr = function(foldable,z,f) {
	var a = haxe.abstract.FoldableExtensions.toArray(foldable);
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
haxe.abstract.FoldableExtensions.filter = function(foldable,f) {
	return foldable.foldl(foldable.empty(),function(a,b) {
		return (f(b)?foldable.append(a,b):a);
	});
}
haxe.abstract.FoldableExtensions.partition = function(foldable,f) {
	return foldable.foldl(Tuple2.create(foldable.empty(),foldable.empty()),function(a,b) {
		return (f(b)?Tuple2.create(foldable.append(a._1,b),a._2):Tuple2.create(a._1,foldable.append(a._2,b)));
	});
}
haxe.abstract.FoldableExtensions.partitionWhile = function(foldable,f) {
	var partitioning = true;
	return foldable.foldl(Tuple2.create(foldable.empty(),foldable.empty()),function(a,b) {
		return (partitioning?(f(b)?Tuple2.create(foldable.append(a._1,b),a._2):(function($this) {
			var $r;
			partitioning = false;
			$r = Tuple2.create(a._1,foldable.append(a._2,b));
			return $r;
		}(this))):Tuple2.create(a._1,foldable.append(a._2,b)));
	});
}
haxe.abstract.FoldableExtensions.map = function(foldable,f) {
	return foldable.foldl(foldable.empty(),function(a,b) {
		return foldable.append(a,f(b));
	});
}
haxe.abstract.FoldableExtensions.mapTo = function(src,dest,f) {
	return src.foldl(dest,function(a,b) {
		return dest.append(a,f(b));
	});
}
haxe.abstract.FoldableExtensions.flatMap = function(foldable,f) {
	return foldable.foldl(foldable.empty(),function(a,b) {
		var fb = f(b);
		return fb.foldl(a,function(a1,b1) {
			return fb.append(a1,b1);
		});
	});
}
haxe.abstract.FoldableExtensions.flatMapTo = function(src,dest,f) {
	return src.foldl(dest,function(a,b) {
		return f(b).foldl(a,function(a1,b1) {
			return dest.append(a1,b1);
		});
	});
}
haxe.abstract.FoldableExtensions.take = function(foldable,n) {
	return foldable.foldl(foldable.empty(),function(a,b) {
		return (n-- > 0?foldable.append(a,b):a);
	});
}
haxe.abstract.FoldableExtensions.takeWhile = function(foldable,f) {
	var taking = true;
	return foldable.foldl(foldable.empty(),function(a,b) {
		return (taking?(f(b)?foldable.append(a,b):(function($this) {
			var $r;
			taking = false;
			$r = a;
			return $r;
		}(this))):a);
	});
}
haxe.abstract.FoldableExtensions.drop = function(foldable,n) {
	return foldable.foldl(foldable.empty(),function(a,b) {
		return (n-- > 0?a:foldable.append(a,b));
	});
}
haxe.abstract.FoldableExtensions.dropWhile = function(foldable,f) {
	var dropping = true;
	return foldable.foldl(foldable.empty(),function(a,b) {
		return (dropping?(f(b)?a:(function($this) {
			var $r;
			dropping = false;
			$r = foldable.append(a,b);
			return $r;
		}(this))):foldable.append(a,b));
	});
}
haxe.abstract.FoldableExtensions.count = function(foldable,f) {
	return foldable.foldl(0,function(a,b) {
		return a + ((f(b)?1:0));
	});
}
haxe.abstract.FoldableExtensions.countWhile = function(foldable,f) {
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
haxe.abstract.FoldableExtensions.scanl = function(foldable,init,f) {
	var a = haxe.abstract.FoldableExtensions.toArray(foldable);
	var accum = init;
	var result = [init];
	{
		var _g = 0;
		while(_g < a.length) {
			var e = a[_g];
			++_g;
			result.push(f(e,accum));
		}
	}
	return result;
}
haxe.abstract.FoldableExtensions.scanr = function(foldable,init,f) {
	var a = haxe.abstract.FoldableExtensions.toArray(foldable);
	a.reverse();
	var accum = init;
	var result = [init];
	{
		var _g = 0;
		while(_g < a.length) {
			var e = a[_g];
			++_g;
			result.push(f(e,accum));
		}
	}
	return result;
}
haxe.abstract.FoldableExtensions.scanl1 = function(foldable,f) {
	var a = haxe.abstract.FoldableExtensions.toArray(foldable);
	var iterator = a.iterator();
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
haxe.abstract.FoldableExtensions.scanr1 = function(foldable,f) {
	var a = haxe.abstract.FoldableExtensions.toArray(foldable);
	a.reverse();
	var iterator = a.iterator();
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
haxe.abstract.FoldableExtensions.elements = function(foldable) {
	return haxe.abstract.FoldableExtensions.toArray(foldable);
}
haxe.abstract.FoldableExtensions.toArray = function(foldable) {
	var es = [];
	foldable.foldl(foldable.empty(),function(a,b) {
		es.push(b);
		return a;
	});
	return es;
}
haxe.abstract.FoldableExtensions.concat = function(foldable,rest) {
	return rest.foldl(foldable,function(a,b) {
		return foldable.append(a,b);
	});
}
haxe.abstract.FoldableExtensions.append = function(foldable,e) {
	return foldable.append(foldable,e);
}
haxe.abstract.FoldableExtensions.appendAll = function(foldable,i) {
	var acc = foldable;
	{ var $it62 = i.iterator();
	while( $it62.hasNext() ) { var e = $it62.next();
	{
		acc = acc.append(acc,e);
	}
	}}
	return acc;
}
haxe.abstract.FoldableExtensions.iterator = function(foldable) {
	return haxe.abstract.FoldableExtensions.elements(foldable).iterator();
}
haxe.abstract.FoldableExtensions.isEmpty = function(foldable) {
	return !haxe.abstract.FoldableExtensions.iterator(foldable).hasNext();
}
haxe.abstract.FoldableExtensions.foreach = function(foldable,f) {
	foldable.foldl(1,function(a,b) {
		f(b);
		return a;
	});
	return foldable;
}
haxe.abstract.FoldableExtensions.find = function(foldable,f) {
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
haxe.abstract.FoldableExtensions.forAll = function(foldable,f) {
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
haxe.abstract.FoldableExtensions.forAny = function(foldable,f) {
	return foldable.foldl(true,function(a,b) {
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
haxe.abstract.FoldableExtensions.exists = function(foldable,f) {
	return (function($this) {
		var $r;
		var $e = (haxe.abstract.FoldableExtensions.find(foldable,f));
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
haxe.abstract.FoldableExtensions.existsP = function(foldable,ref,f) {
	var result = false;
	var a = haxe.abstract.FoldableExtensions.toArray(foldable);
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
haxe.abstract.FoldableExtensions.member = function(foldable,member) {
	return haxe.abstract.FoldableExtensions.exists(foldable,function(e) {
		return e == member;
	});
}
haxe.abstract.FoldableExtensions.nubBy = function(foldable,f) {
	return foldable.foldl(foldable.empty(),function(a,b) {
		return (haxe.abstract.FoldableExtensions.existsP(a,b,f)?a:foldable.append(a,b));
	});
}
haxe.abstract.FoldableExtensions.nub = function(foldable) {
	return haxe.abstract.FoldableExtensions.nubBy(foldable,function(a,b) {
		return a == b;
	});
}
haxe.abstract.FoldableExtensions.intersectBy = function(foldable1,foldable2,f) {
	return foldable1.foldl(foldable1.empty(),function(a,b) {
		return (haxe.abstract.FoldableExtensions.existsP(foldable2,b,f)?haxe.abstract.FoldableExtensions.append(a,b):a);
	});
}
haxe.abstract.FoldableExtensions.intersect = function(foldable1,foldable2) {
	return foldable1.foldl(foldable1.empty(),function(a,b) {
		return (haxe.abstract.FoldableExtensions.existsP(foldable2,b,function(a1,b1) {
			return a1 == b1;
		})?haxe.abstract.FoldableExtensions.append(a,b):a);
	});
}
haxe.abstract.FoldableExtensions.mkString = function(foldable,sep,show) {
	if(sep == null) sep = ", ";
	show = (show == null?DynamicExtensions.ShowT().show:show);
	var isFirst = true;
	return foldable.foldl("",function(a,b) {
		var prefix = (isFirst?(function($this) {
			var $r;
			isFirst = false;
			$r = "";
			return $r;
		}(this)):sep);
		return (a + prefix) + show(b);
	});
}
haxe.abstract.FoldableExtensions.prototype.__class__ = haxe.abstract.FoldableExtensions;
haxe.data.collections.Set = function(hasher,equal,map) { if( hasher === $_ ) return; {
	this.hasher = hasher;
	this.equal = equal;
	this._map = map;
}}
haxe.data.collections.Set.__name__ = ["haxe","data","collections","Set"];
haxe.data.collections.Set.OrderT = function(order) {
	return OrderTypeclass.create({ compare : function(v1,v2) {
		var a1 = IterableExtensions.toArray(v1);
		var a2 = IterableExtensions.toArray(v2);
		a1.sort(order.compare);
		a2.sort(order.compare);
		return ArrayExtensions.OrderT(Array,order).compare(a1,a2);
	}});
}
haxe.data.collections.Set.EqualT = function(equal) {
	return EqualTypeclass.create({ equal : function(v1,v2) {
		var all = haxe.abstract.FoldableExtensions.concat(v1,v2);
		return all.getSize() == v1.getSize() && all.getSize() == v2.getSize();
	}});
}
haxe.data.collections.Set.ShowT = function(show) {
	return ShowTypeclass.create({ show : function(v) {
		return "Set" + IterableExtensions.toString(haxe.abstract.FoldableExtensions.elements(v),show.show);
	}});
}
haxe.data.collections.Set.HasherT = function(hasher) {
	return HasherTypeclass.create({ hash : function(v) {
		return v.foldl(393241,function(a,b) {
			return a + (hasher.hash(b) * 6151);
		});
	}});
}
haxe.data.collections.Set.create = function(hasher,equal) {
	hasher = (hasher == null?DynamicExtensions.HasherT():hasher);
	equal = (equal == null?DynamicExtensions.EqualT():equal);
	return new haxe.data.collections.Set(hasher,equal,haxe.data.collections.Map.create(hasher,equal,hasher,equal));
}
haxe.data.collections.Set.factory = function(hasher,equal) {
	return function() {
		return haxe.data.collections.Set.create(hasher,equal);
	}
}
haxe.data.collections.Set.prototype._map = null;
haxe.data.collections.Set.prototype.add = function(t) {
	return (this.contains(t)?this:this.copyWithMod(this._map.set(t,t)));
}
haxe.data.collections.Set.prototype.addAll = function(it) {
	var set = this;
	{ var $it63 = it.iterator();
	while( $it63.hasNext() ) { var e = $it63.next();
	set = set.add(e);
	}}
	return set;
}
haxe.data.collections.Set.prototype.append = function(s,t) {
	return s.copyWithMod(s._map.set(t,t));
}
haxe.data.collections.Set.prototype.contains = function(e) {
	return this._map.containsKey(e);
}
haxe.data.collections.Set.prototype.copyWithMod = function(newMap) {
	return new haxe.data.collections.Set(this.hasher,this.equal,newMap);
}
haxe.data.collections.Set.prototype.empty = function() {
	return (this.getSize() == 0?this:haxe.data.collections.Set.create(this.hasher,this.equal));
}
haxe.data.collections.Set.prototype.equal = null;
haxe.data.collections.Set.prototype.foldl = function(z,f) {
	var acc = z;
	{ var $it64 = this._map.iterator();
	while( $it64.hasNext() ) { var e = $it64.next();
	{
		acc = f(acc,e._1);
	}
	}}
	return acc;
}
haxe.data.collections.Set.prototype.getSize = function() {
	return this._map.getSize();
}
haxe.data.collections.Set.prototype.hasher = null;
haxe.data.collections.Set.prototype.iterator = function() {
	return haxe.abstract.FoldableExtensions.iterator(this);
}
haxe.data.collections.Set.prototype.remove = function(t) {
	return this.copyWithMod(this._map.removeByKey(t));
}
haxe.data.collections.Set.prototype.removeAll = function(it) {
	var set = this;
	{ var $it65 = it.iterator();
	while( $it65.hasNext() ) { var e = $it65.next();
	set = set.remove(e);
	}}
	return set;
}
haxe.data.collections.Set.prototype.size = null;
haxe.data.collections.Set.prototype.toString = function() {
	return haxe.data.collections.Set.ShowT(DynamicExtensions.ShowT()).show(this);
}
haxe.data.collections.Set.prototype.__class__ = haxe.data.collections.Set;
haxe.data.collections.Set.__interfaces__ = [haxe.data.collections.Collection];
if(!haxe.io) haxe.io = {}
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
	var testMethods = ArrayExtensions.filter(Type.getInstanceFields(Type.getClass(test)),haxe.abstract.Predicate1Extensions.and(fieldIsTest,fieldIsMethod));
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
				catch( $e66 ) {
					{
						var e = $e66;
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
	{ var $it67 = tests.iterator();
	while( $it67.hasNext() ) { var test = $it67.next();
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
	{ var $it68 = fixtures.iterator();
	while( $it68.hasNext() ) { var fixture = $it68.next();
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
	catch( $e69 ) {
		{
			var e = $e69;
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
haxe.reactive.BehaviorCollection = function(p) { if( p === $_ ) return; {
	null;
}}
haxe.reactive.BehaviorCollection.__name__ = ["haxe","reactive","BehaviorCollection"];
haxe.reactive.BehaviorCollection.concatB = function(b1,b2) {
	return b1.zip(b2).map(function(c) {
		return haxe.abstract.FoldableExtensions.concat(c._1,c._2);
	});
}
haxe.reactive.BehaviorCollection.join = function(b,$char) {
	return b.map(function(c) {
		return haxe.abstract.FoldableExtensions.mkString(c,$char);
	});
}
haxe.reactive.BehaviorCollection.size = function(b) {
	return b.map(function(c) {
		return c.getSize();
	});
}
haxe.reactive.BehaviorCollection.zipB = function(b1,b2) {
	return b1.zip(b2).map(function(c) {
		return c._1.zip(c._2);
	});
}
haxe.reactive.BehaviorCollection.append = function(b,element) {
	return b.map(function(c) {
		return c.add(element);
	});
}
haxe.reactive.BehaviorCollection.count = function(b,predicate) {
	return b.map(function(c) {
		return haxe.abstract.FoldableExtensions.count(c,predicate);
	});
}
haxe.reactive.BehaviorCollection.all = function(b,tester) {
	return b.map(function(c) {
		return haxe.abstract.FoldableExtensions.forAll(c,tester);
	});
}
haxe.reactive.BehaviorCollection.any = function(b,tester) {
	return b.map(function(c) {
		return haxe.abstract.FoldableExtensions.forAny(c,tester);
	});
}
haxe.reactive.BehaviorCollection.forEach = function(b,f) {
	return b.map(function(c) {
		return haxe.abstract.FoldableExtensions.foreach(c,f);
	});
}
haxe.reactive.BehaviorCollection.each = function(b,f) {
	return b.map(function(c) {
		return haxe.abstract.FoldableExtensions.foreach(c,f);
	});
}
haxe.reactive.BehaviorCollection.map = function(b,f) {
	return b.map(function(c) {
		return haxe.abstract.FoldableExtensions.map(c,f);
	});
}
haxe.reactive.BehaviorCollection.mapTo = function(b,t,f) {
	return b.map(function(c) {
		return haxe.abstract.FoldableExtensions.mapTo(c,t,f);
	});
}
haxe.reactive.BehaviorCollection.partition = function(b,filter) {
	return b.map(function(c) {
		return haxe.abstract.FoldableExtensions.partition(c,filter);
	});
}
haxe.reactive.BehaviorCollection.filter = function(b,f) {
	return b.map(function(c) {
		return haxe.abstract.FoldableExtensions.filter(c,f);
	});
}
haxe.reactive.BehaviorCollection.flatMap = function(b,f) {
	return b.map(function(c) {
		return haxe.abstract.FoldableExtensions.flatMap(c,f);
	});
}
haxe.reactive.BehaviorCollection.toArray = function(b) {
	return b.map(function(c) {
		return haxe.abstract.FoldableExtensions.toArray(c);
	});
}
haxe.reactive.BehaviorCollection.foldr = function(b,initial,f) {
	return b.map(function(c) {
		return haxe.abstract.FoldableExtensions.foldr(c,initial,f);
	});
}
haxe.reactive.BehaviorCollection.foldl = function(b,initial,f) {
	return b.map(function(c) {
		return c.foldl(initial,f);
	});
}
haxe.reactive.BehaviorCollection.scanl = function(b,initial,f) {
	return b.map(function(c) {
		return haxe.abstract.FoldableExtensions.scanl(c,initial,f);
	});
}
haxe.reactive.BehaviorCollection.scanr = function(b,initial,f) {
	return b.map(function(c) {
		return haxe.abstract.FoldableExtensions.scanr(c,initial,f);
	});
}
haxe.reactive.BehaviorCollection.scanrP = function(b,f) {
	return b.map(function(c) {
		return haxe.abstract.FoldableExtensions.scanr1(c,f);
	});
}
haxe.reactive.BehaviorCollection.scanlP = function(b,f) {
	return b.map(function(c) {
		return haxe.abstract.FoldableExtensions.scanl1(c,f);
	});
}
haxe.reactive.BehaviorCollection.member = function(b,element) {
	return b.map(function(c) {
		return haxe.abstract.FoldableExtensions.member(c,element);
	});
}
haxe.reactive.BehaviorCollection.exists = function(b,cmp) {
	return b.map(function(v) {
		return haxe.abstract.FoldableExtensions.exists(v,cmp);
	});
}
haxe.reactive.BehaviorCollection.existsP = function(b,ref,cmp) {
	return b.map(function(c) {
		return haxe.abstract.FoldableExtensions.existsP(c,ref,cmp);
	});
}
haxe.reactive.BehaviorCollection.find = function(b,cmp) {
	return b.map(function(c) {
		return haxe.abstract.FoldableExtensions.find(c,cmp);
	});
}
haxe.reactive.BehaviorCollection.nubBy = function(b,cmp) {
	return b.map(function(c) {
		return haxe.abstract.FoldableExtensions.nubBy(c,cmp);
	});
}
haxe.reactive.BehaviorCollection.nub = function(b) {
	return b.map(function(c) {
		return haxe.abstract.FoldableExtensions.nub(c);
	});
}
haxe.reactive.BehaviorCollection.intersectB = function(b1,b2) {
	return b1.zip(b2).map(function(c) {
		return haxe.abstract.FoldableExtensions.intersect(c._1,c._2);
	});
}
haxe.reactive.BehaviorCollection.intersectByB = function(b1,b2,cmp) {
	return b1.zip(b2).map(function(c) {
		return haxe.abstract.FoldableExtensions.intersectBy(c._1,c._2,cmp);
	});
}
haxe.reactive.BehaviorCollection.prototype.__class__ = haxe.reactive.BehaviorCollection;
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
haxe.reactive.StreamBool = function(p) { if( p === $_ ) return; {
	null;
}}
haxe.reactive.StreamBool.__name__ = ["haxe","reactive","StreamBool"];
haxe.reactive.StreamBool.not = function(stream) {
	return stream.map(function(v) {
		return !v;
	});
}
haxe.reactive.StreamBool.ifTrue = function(stream,thenE,elseE) {
	var testStamp = -1;
	var testValue = false;
	haxe.reactive.Streams.create(function(pulse) {
		testStamp = pulse.stamp;
		testValue = pulse.value;
		return haxe.reactive.Propagation.doNotPropagate;
	},[stream]);
	return haxe.reactive.Streams.merge([haxe.reactive.Streams.create(function(pulse) {
		return (testValue && (testStamp == pulse.stamp)?haxe.reactive.Propagation.propagate(pulse):haxe.reactive.Propagation.doNotPropagate);
	},[thenE]),haxe.reactive.Streams.create(function(pulse) {
		return (!testValue && (testStamp == pulse.stamp)?haxe.reactive.Propagation.propagate(pulse):haxe.reactive.Propagation.doNotPropagate);
	},[elseE])]);
}
haxe.reactive.StreamBool.and = function(streams) {
	var rev = haxe.data.collections.IterableExtensions.reversed(streams);
	var count = haxe.data.collections.IterableExtensions.size(streams);
	var iterator = rev.iterator();
	var acc = (iterator.hasNext()?iterator.next():haxe.reactive.Streams.one(true));
	while(iterator.hasNext()) {
		var next = iterator.next();
		acc = haxe.reactive.StreamBool.ifTrue(next,acc,next.constant(false));
	}
	return acc;
}
haxe.reactive.StreamBool.or = function(streams) {
	var rev = haxe.data.collections.IterableExtensions.reversed(streams);
	var count = haxe.data.collections.IterableExtensions.size(streams);
	var iterator = rev.iterator();
	var acc = (iterator.hasNext()?iterator.next():haxe.reactive.Streams.one(false));
	while(iterator.hasNext()) {
		var next = iterator.next();
		acc = haxe.reactive.StreamBool.ifTrue(next,next,acc);
	}
	return acc;
}
haxe.reactive.StreamBool.prototype.__class__ = haxe.reactive.StreamBool;
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
haxe.data.collections.Map = function(khasher,kequal,vhasher,vequal,buckets,size) { if( khasher === $_ ) return; {
	var self = this;
	this.keyHasher = khasher;
	this.keyEqual = kequal;
	this.valueHasher = vhasher;
	this.valueEqual = vequal;
	this._size = size;
	this._buckets = buckets;
	this._pf = haxe.abstract.PartialFunction1ImplExtensions.toPartialFunction([Tuple2.create($closure(this,"containsKey"),function(k) {
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
haxe.data.collections.Map.OrderT = function(korder,vorder) {
	var keySorter = function(t1,t2) {
		return korder.compare(t1._1,t2._1);
	}
	return OrderTypeclass.create({ compare : function(v1,v2) {
		var a1 = IterableExtensions.toArray(v1);
		var a2 = IterableExtensions.toArray(v2);
		a1.sort(keySorter);
		a2.sort(keySorter);
		return ArrayExtensions.OrderT(Array,Tuple2.OrderT(korder,vorder)).compare(a1,a2);
	}});
}
haxe.data.collections.Map.EqualT = function(kequal,vequal) {
	return EqualTypeclass.create({ equal : function(v1,v2) {
		var keys1 = v1.keySet();
		var keys2 = v2.keySet();
		if(!haxe.data.collections.Set.EqualT(kequal).equal(keys1,keys2)) return false;
		{ var $it70 = keys1.iterator();
		while( $it70.hasNext() ) { var key = $it70.next();
		{
			var v11 = OptionExtensions.get(v1.get(key));
			var v21 = OptionExtensions.get(v2.get(key));
			if(!vequal.equal(v11,v21)) return false;
		}
		}}
		return true;
	}});
}
haxe.data.collections.Map.ShowT = function(kshow,vshow) {
	return ShowTypeclass.create({ show : function(v) {
		return "Map" + IterableExtensions.toString(haxe.abstract.FoldableExtensions.elements(v),function(t) {
			return (kshow.show(t._1) + " -> ") + vshow.show(t._2);
		});
	}});
}
haxe.data.collections.Map.HasherT = function(khasher,vhasher) {
	return HasherTypeclass.create({ hash : function(v) {
		return v.foldl(786433,function(a,b) {
			return a + ((khasher.hash(b._1) * 49157 + 6151) * vhasher.hash(b._2));
		});
	}});
}
haxe.data.collections.Map.create = function(khasher,kequal,vhasher,vequal) {
	var keyHasher = (khasher == null?DynamicExtensions.HasherT():khasher);
	var keyEqual = (kequal == null?DynamicExtensions.EqualT():kequal);
	var valueHasher = (vhasher == null?DynamicExtensions.HasherT():vhasher);
	var valueEqual = (vequal == null?DynamicExtensions.EqualT():vequal);
	return new haxe.data.collections.Map(keyHasher,keyEqual,valueHasher,valueEqual,[[]],0);
}
haxe.data.collections.Map.factory = function(khasher,kequal,vhasher,vequal) {
	return function() {
		return haxe.data.collections.Map.create(khasher,kequal,vhasher,vequal);
	}
}
haxe.data.collections.Map.prototype._buckets = null;
haxe.data.collections.Map.prototype._pf = null;
haxe.data.collections.Map.prototype._size = null;
haxe.data.collections.Map.prototype.add = function(t) {
	var k = t._1;
	var v = t._2;
	var bucket = this.bucketFor(k);
	var list = this._buckets[bucket];
	{
		var _g1 = 0, _g = list.length;
		while(_g1 < _g) {
			var i = _g1++;
			var entry = list[i];
			if(this.keyEqual.equal(entry._1,k)) {
				if(!this.valueEqual.equal(entry._2,v)) {
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
	{ var $it71 = i.iterator();
	while( $it71.hasNext() ) { var t = $it71.next();
	map = map.add(t);
	}}
	return map;
}
haxe.data.collections.Map.prototype.append = function(m,t) {
	return m.add(t);
}
haxe.data.collections.Map.prototype.bucketFor = function(k) {
	return this.keyHasher.hash(k) % this._buckets.length;
}
haxe.data.collections.Map.prototype.call = function(k) {
	return this._pf.call(k);
}
haxe.data.collections.Map.prototype.contains = function(t) {
	var tupleEqual = Tuple2.EqualT(this.keyEqual,this.valueEqual);
	{ var $it72 = this.entries().iterator();
	while( $it72.hasNext() ) { var e = $it72.next();
	{
		if(tupleEqual.equal(e,t)) return true;
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
	return new haxe.data.collections.Map(this.keyHasher,this.keyEqual,this.valueHasher,this.valueEqual,newTable,this.getSize());
}
haxe.data.collections.Map.prototype.empty = function() {
	return (this.getSize() == 0?this:haxe.data.collections.Map.create(this.keyHasher,this.keyEqual,this.valueHasher,this.valueEqual));
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
haxe.data.collections.Map.prototype.foldl = function(z,f) {
	var acc = z;
	{ var $it73 = this.entries().iterator();
	while( $it73.hasNext() ) { var e = $it73.next();
	{
		acc = f(acc,e);
	}
	}}
	return acc;
}
haxe.data.collections.Map.prototype.get = function(k) {
	{
		var _g = 0, _g1 = this.listFor(k);
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			if(this.keyEqual.equal(e._1,k)) {
				return Option.Some(e._2);
			}
		}
	}
	return Option.None;
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
haxe.data.collections.Map.prototype.getSize = function() {
	return this._size;
}
haxe.data.collections.Map.prototype.isDefinedAt = function(k) {
	return this._pf.isDefinedAt(k);
}
haxe.data.collections.Map.prototype.iterator = function() {
	return haxe.abstract.FoldableExtensions.iterator(this);
}
haxe.data.collections.Map.prototype.keyEqual = null;
haxe.data.collections.Map.prototype.keyHasher = null;
haxe.data.collections.Map.prototype.keySet = function() {
	return haxe.data.collections.Set.create(this.keyHasher,this.keyEqual).addAll(this.keys());
}
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
	return (this._buckets.length == 0?haxe.data.collections.Map.MaxLoad:Math.round(this.getSize() / this._buckets.length));
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
	var newSize = Math.round(this.getSize() / ((haxe.data.collections.Map.MaxLoad + haxe.data.collections.Map.MinLoad) / 2));
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
		{ var $it74 = all.iterator();
		while( $it74.hasNext() ) { var e = $it74.next();
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
	{ var $it75 = i.iterator();
	while( $it75.hasNext() ) { var t = $it75.next();
	map = map.remove(t);
	}}
	return map;
}
haxe.data.collections.Map.prototype.removeAllByKey = function(i) {
	var map = this;
	{ var $it76 = i.iterator();
	while( $it76.hasNext() ) { var k = $it76.next();
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
	{
		var _g1 = 0, _g = list.length;
		while(_g1 < _g) {
			var i = _g1++;
			var entry = list[i];
			if(this.keyEqual.equal(entry._1,k)) {
				if(ignoreValue || this.valueEqual.equal(entry._2,v)) {
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
haxe.data.collections.Map.prototype.size = null;
haxe.data.collections.Map.prototype.toFunction = function() {
	return $closure(this,"get");
}
haxe.data.collections.Map.prototype.toString = function() {
	return haxe.data.collections.Map.ShowT(DynamicExtensions.ShowT(),DynamicExtensions.ShowT()).show(this);
}
haxe.data.collections.Map.prototype.valueEqual = null;
haxe.data.collections.Map.prototype.valueHasher = null;
haxe.data.collections.Map.prototype.values = function() {
	var self = this;
	return { iterator : function() {
		var entryIterator = self.entries().iterator();
		return { hasNext : $closure(entryIterator,"hasNext"), next : function() {
			return entryIterator.next()._2;
		}}
	}}
}
haxe.data.collections.Map.prototype.__class__ = haxe.data.collections.Map;
haxe.data.collections.Map.__interfaces__ = [haxe.abstract.PartialFunction1,haxe.data.collections.Collection];
if(typeof resources=='undefined') resources = {}
resources.CollectionTester = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
resources.CollectionTester.__name__ = ["resources","CollectionTester"];
resources.CollectionTester.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) resources.CollectionTester.prototype[k] = haxe.test.TestCase.prototype[k];
resources.CollectionTester.prototype.assertIterableEquals = function(i1,i2) {
	var size1 = haxe.data.collections.IterableExtensions.size(i1);
	var size2 = haxe.data.collections.IterableExtensions.size(i2);
	if(size1 != size2) {
		haxe.Log.trace((("Iterable Sizes Not Equal.  Iterable 1 length = " + size1) + " and Iterable 2 length =  ") + size2,{ fileName : "BCollectionTester.hx", lineNumber : 206, className : "resources.CollectionTester", methodName : "assertIterableEquals"});
		this.assertTrue(false,null,{ fileName : "BCollectionTester.hx", lineNumber : 207, className : "resources.CollectionTester", methodName : "assertIterableEquals"});
	}
	var iterator1 = i1.iterator();
	var iterator2 = i2.iterator();
	var index = 0;
	while(iterator1.hasNext()) {
		var e1 = iterator1.next();
		var e2 = iterator2.next();
		if(e1 != e2) {
			haxe.Log.trace((((("Iterables not equal at index [" + index) + "].  Element 1 = ") + e1) + " and Element 2 = ") + e2,{ fileName : "BCollectionTester.hx", lineNumber : 219, className : "resources.CollectionTester", methodName : "assertIterableEquals"});
			this.assertTrue(false,null,{ fileName : "BCollectionTester.hx", lineNumber : 220, className : "resources.CollectionTester", methodName : "assertIterableEquals"});
		}
		++index;
	}
	this.assertTrue(true,null,{ fileName : "BCollectionTester.hx", lineNumber : 224, className : "resources.CollectionTester", methodName : "assertIterableEquals"});
}
resources.CollectionTester.prototype.testThatItXAppendWorks = function() {
	var i = [1,2,3,4,5];
	this.assertIterableEquals(haxe.data.collections.IterableExtensions.append(i,2),[1,2,3,4,5,2]);
}
resources.CollectionTester.prototype.testThatItXAtWorks = function() {
	var a = [1,2,3,4,5,4,3,2,1,5,6,7,8,6,5,4,3,2];
	this.assertEquals(6,haxe.data.collections.IterableExtensions.at(a,10),null,null,{ fileName : "BCollectionTester.hx", lineNumber : 102, className : "resources.CollectionTester", methodName : "testThatItXAtWorks"});
	this.assertEquals(5,haxe.data.collections.IterableExtensions.at(a,-4),null,null,{ fileName : "BCollectionTester.hx", lineNumber : 104, className : "resources.CollectionTester", methodName : "testThatItXAtWorks"});
}
resources.CollectionTester.prototype.testThatItXDropWorks = function() {
	var i = [1,2,3,4,5];
	this.assertIterableEquals([4,5],haxe.data.collections.IterableExtensions.drop(i,3));
	var i1 = [1];
	this.assertIterableEquals(haxe.data.collections.IterableExtensions.drop(i1,3),[]);
}
resources.CollectionTester.prototype.testThatItXExistsPWorks = function() {
	var a = [6,5,4,3,2];
	this.assertEquals(true,haxe.data.collections.IterableExtensions.existsP(a,2,function(a1,b) {
		return a1 == b;
	}),null,null,{ fileName : "BCollectionTester.hx", lineNumber : 140, className : "resources.CollectionTester", methodName : "testThatItXExistsPWorks"});
}
resources.CollectionTester.prototype.testThatItXExistsWorks = function() {
	var i = [1,2,3,4,5];
	this.assertTrue(haxe.data.collections.IterableExtensions.exists(i,function(a,b) {
		return a == b;
	},2),null,{ fileName : "BCollectionTester.hx", lineNumber : 88, className : "resources.CollectionTester", methodName : "testThatItXExistsWorks"});
	this.assertFalse(haxe.data.collections.IterableExtensions.exists(i,function(a,b) {
		return a < b;
	},1),null,{ fileName : "BCollectionTester.hx", lineNumber : 90, className : "resources.CollectionTester", methodName : "testThatItXExistsWorks"});
}
resources.CollectionTester.prototype.testThatItXFilterWorks = function() {
	var a = [6,5,4,5,1,3,2,5,4,1];
	this.assertIterableEquals([6,5,4,5,5,4],haxe.data.collections.IterableExtensions.filter(a,function(a1) {
		return a1 > 3;
	}));
}
resources.CollectionTester.prototype.testThatItXFoldlWorks = function() {
	var i = [1,2,3,4,5];
	var result = haxe.data.collections.IterableExtensions.foldl(i,0,function(a,b) {
		return a + b;
	});
	this.assertEquals(result,15,null,null,{ fileName : "BCollectionTester.hx", lineNumber : 26, className : "resources.CollectionTester", methodName : "testThatItXFoldlWorks"});
}
resources.CollectionTester.prototype.testThatItXFoldrWorks = function() {
	var i = [1,2,3,4,5];
	var result = haxe.data.collections.IterableExtensions.foldr(i,0,function(a,b) {
		return a + b;
	});
	this.assertEquals(result,15,null,null,{ fileName : "BCollectionTester.hx", lineNumber : 34, className : "resources.CollectionTester", methodName : "testThatItXFoldrWorks"});
}
resources.CollectionTester.prototype.testThatItXHeadWorks = function() {
	var i = [1,2,3,4,5];
	this.assertEquals(haxe.data.collections.IterableExtensions.head(i),1,null,null,{ fileName : "BCollectionTester.hx", lineNumber : 46, className : "resources.CollectionTester", methodName : "testThatItXHeadWorks"});
}
resources.CollectionTester.prototype.testThatItXIntersectByWorks = function() {
	var a = [1,2,3,4];
	var b = [4,8,12,16,20];
	this.assertIterableEquals([2,4],haxe.data.collections.IterableExtensions.intersectBy(a,b,function(a1,b1) {
		return a1 * a1 == b1;
	}));
}
resources.CollectionTester.prototype.testThatItXIntersectWorks = function() {
	var a = [1,2,2,3,4];
	var b = [6,4,4,2];
	this.assertIterableEquals([2,2,4],haxe.data.collections.IterableExtensions.intersect(a,b));
}
resources.CollectionTester.prototype.testThatItXMapWorks = function() {
	var a = [6,5,4,3,2];
	this.assertIterableEquals([12,10,8,6,4],haxe.data.collections.IterableExtensions.map(a,function(a1) {
		return a1 * 2;
	}));
}
resources.CollectionTester.prototype.testThatItXNubByWorks = function() {
	var a = [6,5,4,5,1,3,2,5,4,1];
	this.assertIterableEquals([6,5,4,1,3,2],haxe.data.collections.IterableExtensions.nubBy(a,function(a1,b) {
		return a1 == b;
	}));
}
resources.CollectionTester.prototype.testThatItXNubWorks = function() {
	var a = [1,2,3,4,5,4,3,2,1,5,6,7,8,6,5,4,3,2];
	this.assertEquals(8,haxe.data.collections.IterableExtensions.size(haxe.data.collections.IterableExtensions.nub(a)),null,null,{ fileName : "BCollectionTester.hx", lineNumber : 96, className : "resources.CollectionTester", methodName : "testThatItXNubWorks"});
}
resources.CollectionTester.prototype.testThatItXReversedWorks = function() {
	var i = [1,2,3,4,5];
	this.assertIterableEquals(haxe.data.collections.IterableExtensions.reversed(i),[5,4,3,2,1]);
}
resources.CollectionTester.prototype.testThatItXScanl1Works = function() {
	var a = [6,5,4,3,2];
	this.assertIterableEquals([6,11,10,9,8],haxe.data.collections.IterableExtensions.scanl1(a,function(a1,b) {
		return a1 + b;
	}));
}
resources.CollectionTester.prototype.testThatItXScanlWorks = function() {
	var a = [6,5,4,3,2];
	this.assertIterableEquals([1,7,6,5,4,3],haxe.data.collections.IterableExtensions.scanl(a,1,function(a1,b) {
		return a1 + b;
	}));
}
resources.CollectionTester.prototype.testThatItXScanr1Works = function() {
	var a = [6,5,4,3,2];
	this.assertIterableEquals([2,5,6,7,8],haxe.data.collections.IterableExtensions.scanr1(a,function(a1,b) {
		return a1 + b;
	}));
}
resources.CollectionTester.prototype.testThatItXScanrWorks = function() {
	var a = [6,5,4,3,2];
	this.assertIterableEquals([1,3,4,5,6,7],haxe.data.collections.IterableExtensions.scanr(a,1,function(a1,b) {
		return a1 + b;
	}));
}
resources.CollectionTester.prototype.testThatItXTailWorks = function() {
	var i = [1,2,3,4,5];
	this.assertIterableEquals(haxe.data.collections.IterableExtensions.tail(i),[2,3,4,5]);
}
resources.CollectionTester.prototype.testThatItXTakeWorks = function() {
	var i = [1,2,3,4,5];
	this.assertIterableEquals(haxe.data.collections.IterableExtensions.take(i,3),[1,2,3]);
	var i1 = [1];
	this.assertEquals(Std.string(haxe.data.collections.IterableExtensions.take(i1,3)),"[1]",null,null,{ fileName : "BCollectionTester.hx", lineNumber : 68, className : "resources.CollectionTester", methodName : "testThatItXTakeWorks"});
	var i2 = [];
	this.assertIterableEquals(haxe.data.collections.IterableExtensions.take(i2,3),[]);
}
resources.CollectionTester.prototype.testThatTraceWorks = function() {
	haxe.Log.trace("Trace is working",{ fileName : "BCollectionTester.hx", lineNumber : 17, className : "resources.CollectionTester", methodName : "testThatTraceWorks"});
	this.assertTrue(true,null,{ fileName : "BCollectionTester.hx", lineNumber : 18, className : "resources.CollectionTester", methodName : "testThatTraceWorks"});
}
resources.CollectionTester.prototype.__class__ = resources.CollectionTester;
resources.BCollectionTester = function() { }
resources.BCollectionTester.__name__ = ["resources","BCollectionTester"];
resources.BCollectionTester.main = function() {
	var runner = (new haxe.test.Runner()).addAll([new resources.CollectionTester()]);
	haxe.test.ui.Report.create(runner);
	runner.run();
}
resources.BCollectionTester.prototype.__class__ = resources.BCollectionTester;
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
	var neg = false;
	if(n < 0) {
		neg = true;
		n = -n;
	}
	var s = n.toString(16);
	s = s.toUpperCase();
	if(digits != null) while(s.length < digits) s = "0" + s;
	if(neg) s = "-" + s;
	return s;
}
StringTools.prototype.__class__ = StringTools;
$Main = function() { }
$Main.__name__ = ["@Main"];
$Main.prototype.__class__ = $Main;
$_ = {}
js.Boot.__res = {}
js.Boot.__init();
{
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	Math.isFinite = function(i) {
		return isFinite(i);
	}
	Math.isNaN = function(i) {
		return isNaN(i);
	}
	Math.__name__ = ["Math"];
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
	Date.now = function() {
		return new Date();
	}
	Date.fromTime = function(t) {
		var d = new Date();
		d["setTime"](t);
		return d;
	}
	Date.fromString = function(s) {
		switch(s.length) {
		case 8:{
			var k = s.split(":");
			var d = new Date();
			d["setTime"](0);
			d["setUTCHours"](k[0]);
			d["setUTCMinutes"](k[1]);
			d["setUTCSeconds"](k[2]);
			return d;
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
	Date.prototype["toString"] = function() {
		var date = this;
		var m = date.getMonth() + 1;
		var d = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		return (((((((((date.getFullYear() + "-") + ((m < 10?"0" + m:"" + m))) + "-") + ((d < 10?"0" + d:"" + d))) + " ") + ((h < 10?"0" + h:"" + h))) + ":") + ((mi < 10?"0" + mi:"" + mi))) + ":") + ((s < 10?"0" + s:"" + s));
	}
	Date.prototype.__class__ = Date;
	Date.__name__ = ["Date"];
}
haxe.test.ui.text.HtmlReport.platform = "javascript";
haxe.Timer.arr = new Array();
haxe.reactive.Stamp._stamp = 1;
haxe.reactive.Rank._rank = 0;
haxe.test.TestHandler.POLLING_TIME = 10;
js.Lib.onerror = null;
haxe.data.collections.Map.MaxLoad = 10;
haxe.data.collections.Map.MinLoad = 1;
$Main.init = resources.BCollectionTester.main();
