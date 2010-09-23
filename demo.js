$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof hxrt=='undefined') hxrt = {}
if(typeof haxe=='undefined') haxe = {}
if(!haxe.functional) haxe.functional = {}
haxe.functional.PartialFunction1 = function() { }
haxe.functional.PartialFunction1.__name__ = ["haxe","functional","PartialFunction1"];
haxe.functional.PartialFunction1.prototype.call = null;
haxe.functional.PartialFunction1.prototype.isDefinedAt = null;
haxe.functional.PartialFunction1.prototype.orAlways = null;
haxe.functional.PartialFunction1.prototype.orAlwaysC = null;
haxe.functional.PartialFunction1.prototype.orElse = null;
haxe.functional.PartialFunction1.prototype.toFunction = null;
haxe.functional.PartialFunction1.prototype.__class__ = haxe.functional.PartialFunction1;
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
if(typeof js=='undefined') js = {}
if(!js.dom) js.dom = {}
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
hxrt.Function1Extensions = function() { }
hxrt.Function1Extensions.__name__ = ["Function1Extensions"];
hxrt.Function1Extensions.swallow = function(f) {
	return function(a) {
		try {
			f(a);
		}
		catch( $e0 ) {
			{
				var e = $e0;
				null;
			}
		}
	}
}
hxrt.Function1Extensions.toFunction1 = function(f) {
	return function(v) {
		return f();
	}
}
hxrt.Function1Extensions.compose = function(f1,f2) {
	return function(u) {
		return f1(f2(u));
	}
}
hxrt.Function1Extensions.andThen = function(f1,f2) {
	return function(u) {
		return f2(f1(u));
	}
}
hxrt.Function1Extensions.lazy = function(f,p1) {
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
hxrt.Function1Extensions.prototype.__class__ = hxrt.Function1Extensions;
if(!haxe.text) haxe.text = {}
if(!haxe.text.json) haxe.text.json = {}
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
		return hxrt.ArrayExtensions.map(xs,function(x) {
			return haxe.text.json.Json.toObject(x);
		});
	}break;
	case 5:
	var fs = $e[2];
	{
		return hxrt.ArrayExtensions.foldl(fs,{ },function(o,e) {
			var field = haxe.text.json.JValueExtensions.extractField(e);
			o[field._1] = haxe.text.json.Json.toObject(field._2);
			return o;
		});
	}break;
	case 6:
	var v1 = $e[3], k = $e[2];
	{
		return hxrt.Stax.error("Cannot convert JField to object");
	}break;
	}
}
haxe.text.json.Json.fromObject = function(d) {
	var $e = (hxrt.Type["typeof"](d));
	switch( $e[1] ) {
	case 8:
	{
		throw "Type of object must be definite: " + d;
	}break;
	case 6:
	var c = $e[2];
	{
		if(hxrt.Std["is"](d,hxrt.String)) return haxe.text.json.JValue.JString(d);
		else if(hxrt.Std["is"](d,hxrt.Hash)) return haxe.text.json.JValue.JObject(d.keys.toArray().map(function(k) {
			return haxe.text.json.JValue.JField(k,d.get(k));
		}));
		else if(hxrt.Std["is"](d,hxrt.Array)) return haxe.text.json.JValue.JArray(hxrt.ArrayExtensions.map((function($this) {
			var $r;
			var $t = d;
			if(hxrt.Std["is"]($t,hxrt.Array)) $t;
			else throw "Class cast error";
			$r = $t;
			return $r;
		}(this)),$closure(haxe.text.json.Json,"fromObject")));
		else return hxrt.Stax.error("Unknown object type: " + d);
	}break;
	case 7:
	var e = $e[2];
	{
		return hxrt.Stax.error("Json.fromObject does not support enum conversions.");
	}break;
	case 5:
	{
		return hxrt.Stax.error("Json.fromObject does not support function conversions.");
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
		return haxe.text.json.JValue.JObject(hxrt.ArrayExtensions.map(hxrt.Reflect.fields(d),function(f) {
			return haxe.text.json.JValue.JField(f,haxe.text.json.Json.fromObject(hxrt.Reflect.field(d,f)));
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
		return ("\"" + new hxrt.EReg(".","").customReplace(new hxrt.EReg("(\\n)","g").replace(new hxrt.EReg("(\"|\\\\)","g").replace(v1,"\\$1"),"\\n"),function(r) {
			var c = r.matched(0).charCodeAt(0);
			return (c >= 32 && c <= 127?hxrt.String.fromCharCode(c):"\\u" + hxrt.StringTools.hex(c,4));
		})) + "\"";
	}break;
	case 2:
	var v1 = $e[2];
	{
		return hxrt.Std.string(v1);
	}break;
	case 1:
	var v1 = $e[2];
	{
		return (v1?"true":"false");
	}break;
	case 4:
	var xs = $e[2];
	{
		return ("[" + hxrt.ArrayExtensions.map(xs,$closure(haxe.text.json.Json,"encode")).join(",")) + "]";
	}break;
	case 5:
	var fs = $e[2];
	{
		return ("{" + hxrt.ArrayExtensions.map(fs,function(f) {
			var field = haxe.text.json.JValueExtensions.extractField(f);
			return (haxe.text.json.Json.encode(haxe.text.json.JValue.JString(field._1)) + ":") + haxe.text.json.Json.encode(field._2);
		}).join(",")) + "}";
	}break;
	case 6:
	var v1 = $e[3], k = $e[2];
	{
		return hxrt.Stax.error("Cannot encode JField");
	}break;
	}
}
haxe.text.json.Json.decode = function(s) {
	var i = 0, l = s.length, mark, line = 1, temp, type = 0;
	var current = new hxrt.Array(), last = null;
	var names = new hxrt.Array(), name = null;
	var value = null;
	var states = new hxrt.Array(), state = 0;
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
		else throw ((((((("Invalid JSON lexeme starting at character " + hxrt.Std.string(i)) + ": ") + temp) + " (character code ") + hxrt.Std.string(temp.charCodeAt(0))) + ", on line ") + hxrt.Std.string(line)) + ")";
		if(type == 4) {
			temp = s.substr(mark + 1,(i - mark) - 1);
			++i;
		}
		else if(type == 6) temp = s.substr(mark,i - mark);
		switch(type) {
		case 3:{
			current.push(last = haxe.text.json.JValue.JObject(new hxrt.Array()));
			names.push(name);
			name = null;
			states.push(state);
			state = 2;
			value = null;
		}break;
		case 7:{
			current.push(last = haxe.text.json.JValue.JArray(new hxrt.Array()));
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
			value = haxe.text.json.JValue.JString(new hxrt.EReg("\\\\([bfnrt\\\\/\"]|u[0-9a-fA-F]{4})","").customReplace(temp,function(r) {
				var s1 = r.matched(1);
				if(s1 == "n") return "\n";
				else if(s1 == "r") return "\r";
				else if(s1 == "b") return hxrt.String.fromCharCode(8);
				else if(s1 == "f") return hxrt.String.fromCharCode(12);
				else if(s1 == "t") return "\t";
				else if(s1 == "\\") return "\\";
				else if(s1 == "\"") return "\"";
				else if(s1 == "/") return "/";
				else return hxrt.String.fromCharCode(hxrt.Std.parseInt("0x" + s1.substr(1)));
			}));
		}break;
		case 6:{
			value = haxe.text.json.JValue.JNumber(hxrt.Std.parseFloat(temp));
		}break;
		}
	}
	if(current.length > 0) throw "Closing brace/bracket deficit of " + hxrt.Std.string(current.length);
	return value;
}
haxe.text.json.Json.prototype.__class__ = haxe.text.json.Json;
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
if(!haxe.data) haxe.data = {}
if(!haxe.data.collections) haxe.data.collections = {}
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
	var a = hxrt.IterableExtensions.toArray(iterable);
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
		return hxrt.Option.Some(e);
		}}
	}
	return hxrt.Option.None;
}
haxe.data.collections.IterableExtensions.head = function(iter) {
	return (function($this) {
		var $r;
		var $e = (haxe.data.collections.IterableExtensions.headOption(iter));
		switch( $e[1] ) {
		case 0:
		{
			$r = hxrt.Stax.error("Iterable has no head");
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
	return (!iterator.hasNext()?hxrt.Option.None:hxrt.Option.Some(haxe.data.collections.IterableExtensions.drop(iter,1)));
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
			$r = hxrt.Stax.error("Iterable has no tail");
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
	return hxrt.Stax.error("Index not found");
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
		result.push(hxrt.DynamicExtensions.entuple(t1,t2));
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
haxe.data.collections.IterableExtensions.prototype.__class__ = haxe.data.collections.IterableExtensions;
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
	return hxrt.Stax.error("Function undefined at " + a);
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
	return haxe.functional._PartialFunctionExtensions.PartialFunction1Impl.create(this._def.concat([hxrt.DynamicExtensions.entuple((function(a) {
		return true;
	}),f)]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction1Impl.prototype.orAlwaysC = function(z) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction1Impl.create(this._def.concat([hxrt.DynamicExtensions.entuple((function(a) {
		return true;
	}),function(a) {
		return z();
	})]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction1Impl.prototype.orElse = function(that) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction1Impl.create(this._def.concat([hxrt.Tuple2.create($closure(that,"isDefinedAt"),$closure(that,"call"))]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction1Impl.prototype.toFunction = function() {
	var self = this;
	return function(a) {
		return (self.isDefinedAt(a)?hxrt.Option.Some(self.call(a)):hxrt.Option.None);
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
	return hxrt.Stax.error(((("Function undefined at (" + a) + ", ") + b) + ")");
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
	return haxe.functional._PartialFunctionExtensions.PartialFunction2Impl.create(this._def.concat([hxrt.DynamicExtensions.entuple((function(a,b) {
		return true;
	}),f)]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction2Impl.prototype.orAlwaysC = function(z) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction2Impl.create(this._def.concat([hxrt.DynamicExtensions.entuple((function(a,b) {
		return true;
	}),function(a,b) {
		return z();
	})]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction2Impl.prototype.orElse = function(that) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction2Impl.create(this._def.concat([hxrt.Tuple2.create($closure(that,"isDefinedAt"),$closure(that,"call"))]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction2Impl.prototype.toFunction = function() {
	var self = this;
	return function(a,b) {
		return (self.isDefinedAt(a,b)?hxrt.Option.Some(self.call(a,b)):hxrt.Option.None);
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
	return hxrt.Stax.error(((((("Function undefined at (" + a) + ", ") + b) + ", ") + c) + ")");
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
	return haxe.functional._PartialFunctionExtensions.PartialFunction3Impl.create(this._def.concat([hxrt.DynamicExtensions.entuple((function(a,b,c) {
		return true;
	}),f)]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction3Impl.prototype.orAlwaysC = function(z) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction3Impl.create(this._def.concat([hxrt.DynamicExtensions.entuple((function(a,b,c) {
		return true;
	}),function(a,b,c) {
		return z();
	})]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction3Impl.prototype.orElse = function(that) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction3Impl.create(this._def.concat([hxrt.Tuple2.create($closure(that,"isDefinedAt"),$closure(that,"call"))]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction3Impl.prototype.toFunction = function() {
	var self = this;
	return function(a,b,c) {
		return (self.isDefinedAt(a,b,c)?hxrt.Option.Some(self.call(a,b,c)):hxrt.Option.None);
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
	return hxrt.Stax.error(((((((("Function undefined at (" + a) + ", ") + b) + ", ") + c) + ", ") + d) + ")");
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
	return haxe.functional._PartialFunctionExtensions.PartialFunction4Impl.create(this._def.concat([hxrt.DynamicExtensions.entuple((function(a,b,c,d) {
		return true;
	}),f)]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction4Impl.prototype.orAlwaysC = function(z) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction4Impl.create(this._def.concat([hxrt.DynamicExtensions.entuple((function(a,b,c,d) {
		return true;
	}),function(a,b,c,d) {
		return z();
	})]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction4Impl.prototype.orElse = function(that) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction4Impl.create(this._def.concat([hxrt.Tuple2.create($closure(that,"isDefinedAt"),$closure(that,"call"))]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction4Impl.prototype.toFunction = function() {
	var self = this;
	return function(a,b,c,d) {
		return (self.isDefinedAt(a,b,c,d)?hxrt.Option.Some(self.call(a,b,c,d)):hxrt.Option.None);
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
	return hxrt.Stax.error(((((((("Function undefined at (" + a) + ", ") + b) + ", ") + c) + ", ") + d) + ")");
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
	return haxe.functional._PartialFunctionExtensions.PartialFunction5Impl.create(this._def.concat([hxrt.DynamicExtensions.entuple((function(a,b,c,d,e) {
		return true;
	}),f)]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction5Impl.prototype.orAlwaysC = function(z) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction5Impl.create(this._def.concat([hxrt.DynamicExtensions.entuple((function(a,b,c,d,e) {
		return true;
	}),function(a,b,c,d,e) {
		return z();
	})]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction5Impl.prototype.orElse = function(that) {
	return haxe.functional._PartialFunctionExtensions.PartialFunction5Impl.create(this._def.concat([hxrt.Tuple2.create($closure(that,"isDefinedAt"),$closure(that,"call"))]));
}
haxe.functional._PartialFunctionExtensions.PartialFunction5Impl.prototype.toFunction = function() {
	var self = this;
	return function(a,b,c,d,e) {
		return (self.isDefinedAt(a,b,c,d,e)?hxrt.Option.Some(self.call(a,b,c,d,e)):hxrt.Option.None);
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
hxrt.StringTools = function() { }
hxrt.StringTools.__name__ = ["StringTools"];
hxrt.StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
hxrt.StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
hxrt.StringTools.htmlEscape = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
hxrt.StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
}
hxrt.StringTools.startsWith = function(s,start) {
	return (s.length >= start.length && s.substr(0,start.length) == start);
}
hxrt.StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return (slen >= elen && s.substr(slen - elen,elen) == end);
}
hxrt.StringTools.isSpace = function(s,pos) {
	var c = s.charCodeAt(pos);
	return (c >= 9 && c <= 13) || c == 32;
}
hxrt.StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && hxrt.StringTools.isSpace(s,r)) {
		r++;
	}
	if(r > 0) return s.substr(r,l - r);
	else return s;
}
hxrt.StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && hxrt.StringTools.isSpace(s,(l - r) - 1)) {
		r++;
	}
	if(r > 0) {
		return s.substr(0,l - r);
	}
	else {
		return s;
	}
}
hxrt.StringTools.trim = function(s) {
	return hxrt.StringTools.ltrim(hxrt.StringTools.rtrim(s));
}
hxrt.StringTools.rpad = function(s,c,l) {
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
hxrt.StringTools.lpad = function(s,c,l) {
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
hxrt.StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
hxrt.StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
hxrt.StringTools.prototype.__class__ = hxrt.StringTools;
hxrt.Reflect = function() { }
hxrt.Reflect.__name__ = ["Reflect"];
hxrt.Reflect.hasField = function(o,field) {
	if(o.hasOwnProperty != null) return o.hasOwnProperty(field);
	var arr = hxrt.Reflect.fields(o);
	{ var $it0 = arr.iterator();
	while( $it0.hasNext() ) { var t = $it0.next();
	if(t == field) return true;
	}}
	return false;
}
hxrt.Reflect.field = function(o,field) {
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
hxrt.Reflect.setField = function(o,field,value) {
	o[field] = value;
}
hxrt.Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
hxrt.Reflect.fields = function(o) {
	if(o == null) return new hxrt.Array();
	var a = new hxrt.Array();
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
hxrt.Reflect.isFunction = function(f) {
	return typeof(f) == "function" && f.__name__ == null;
}
hxrt.Reflect.compare = function(a,b) {
	return ((a == b)?0:((((a) > (b))?1:-1)));
}
hxrt.Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!hxrt.Reflect.isFunction(f1) || !hxrt.Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
hxrt.Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return (t == "string" || (t == "object" && !v.__enum__) || (t == "function" && v.__name__ != null));
}
hxrt.Reflect.deleteField = function(o,f) {
	if(!hxrt.Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
hxrt.Reflect.copy = function(o) {
	var o2 = { }
	{
		var _g = 0, _g1 = hxrt.Reflect.fields(o);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			o2[f] = hxrt.Reflect.field(o,f);
		}
	}
	return o2;
}
hxrt.Reflect.makeVarArgs = function(f) {
	return function() {
		var a = new hxrt.Array();
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
hxrt.Reflect.prototype.__class__ = hxrt.Reflect;
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype.__class__ = haxe.Log;
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
	hxrt.OptionExtensions.map(hxrt.OptionExtensions.zip(hxrt.OptionExtensions.toOption(width),hxrt.OptionExtensions.toOption(height)),function(t) {
		iframe.setAttribute("width",hxrt.IntExtensions.toString(width));
		iframe.setAttribute("height",hxrt.IntExtensions.toString(height));
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
	return iframe;
}
js.dom.HTMLDocumentExtensions.newIframeInvisible = function(doc) {
	return js.dom.HTMLDocumentExtensions.newIframeWindow(doc,0,0);
}
js.dom.HTMLDocumentExtensions.prototype.__class__ = js.dom.HTMLDocumentExtensions;
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
		return (f(b)?foldable.append(a,b):a);
	});
}
haxe.functional.FoldableExtensions.partition = function(foldable,f) {
	return foldable.foldl(hxrt.Tuple2.create(foldable.empty(),foldable.empty()),function(a,b) {
		return (f(b)?hxrt.Tuple2.create(foldable.append(a._1,b),a._2):hxrt.Tuple2.create(a._1,foldable.append(a._2,b)));
	});
}
haxe.functional.FoldableExtensions.partitionWhile = function(foldable,f) {
	var partitioning = true;
	return foldable.foldl(hxrt.Tuple2.create(foldable.empty(),foldable.empty()),function(a,b) {
		return (partitioning?(f(b)?hxrt.Tuple2.create(foldable.append(a._1,b),a._2):(function($this) {
			var $r;
			partitioning = false;
			$r = hxrt.Tuple2.create(a._1,foldable.append(a._2,b));
			return $r;
		}(this))):hxrt.Tuple2.create(a._1,foldable.append(a._2,b)));
	});
}
haxe.functional.FoldableExtensions.map = function(foldable,f) {
	return foldable.foldl(foldable.empty(),function(a,b) {
		return foldable.append(a,f(b));
	});
}
haxe.functional.FoldableExtensions.mapTo = function(src,dest,f) {
	return src.foldl(dest,function(a,b) {
		return dest.append(a,f(b));
	});
}
haxe.functional.FoldableExtensions.flatMap = function(foldable,f) {
	return foldable.foldl(foldable.empty(),function(a,b) {
		var fb = f(b);
		return fb.foldl(a,function(a1,b1) {
			return fb.append(a1,b1);
		});
	});
}
haxe.functional.FoldableExtensions.flatMapTo = function(src,dest,f) {
	return src.foldl(dest,function(a,b) {
		return f(b).foldl(a,function(a1,b1) {
			return dest.append(a1,b1);
		});
	});
}
haxe.functional.FoldableExtensions.take = function(foldable,n) {
	return foldable.foldl(foldable.empty(),function(a,b) {
		return (n-- > 0?foldable.append(a,b):a);
	});
}
haxe.functional.FoldableExtensions.takeWhile = function(foldable,f) {
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
haxe.functional.FoldableExtensions.drop = function(foldable,n) {
	return foldable.foldl(foldable.empty(),function(a,b) {
		return (n-- > 0?a:foldable.append(a,b));
	});
}
haxe.functional.FoldableExtensions.dropWhile = function(foldable,f) {
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
haxe.functional.FoldableExtensions.scanr = function(foldable,init,f) {
	var a = haxe.functional.FoldableExtensions.toArray(foldable);
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
haxe.functional.FoldableExtensions.scanl1 = function(foldable,f) {
	var a = haxe.functional.FoldableExtensions.toArray(foldable);
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
haxe.functional.FoldableExtensions.scanr1 = function(foldable,f) {
	var a = haxe.functional.FoldableExtensions.toArray(foldable);
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
haxe.functional.FoldableExtensions.elements = function(foldable) {
	return haxe.functional.FoldableExtensions.toArray(foldable);
}
haxe.functional.FoldableExtensions.toArray = function(foldable) {
	var es = [];
	foldable.foldl(foldable.empty(),function(a,b) {
		es.push(b);
		return a;
	});
	return es;
}
haxe.functional.FoldableExtensions.concat = function(foldable,rest) {
	return rest.foldl(foldable,function(a,b) {
		return foldable.append(a,b);
	});
}
haxe.functional.FoldableExtensions.append = function(foldable,e) {
	return foldable.append(foldable,e);
}
haxe.functional.FoldableExtensions.appendAll = function(foldable,i) {
	var acc = foldable;
	{ var $it0 = i.iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
	{
		acc = acc.append(acc,e);
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
	return foldable.foldl(hxrt.Option.None,function(a,b) {
		return (function($this) {
			var $r;
			var $e = (a);
			switch( $e[1] ) {
			case 0:
			{
				$r = hxrt.OptionExtensions.filter(hxrt.OptionExtensions.toOption(b),f);
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
		return (haxe.functional.FoldableExtensions.existsP(a,b,f)?a:foldable.append(a,b));
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
	show = (show == null?hxrt.DynamicExtensions.ShowF().show:show);
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
haxe.functional.FoldableExtensions.prototype.__class__ = haxe.functional.FoldableExtensions;
hxrt.DOMTokenList = function() { }
hxrt.DOMTokenList.__name__ = ["DOMTokenList"];
hxrt.DOMTokenList.prototype.add = null;
hxrt.DOMTokenList.prototype.contains = null;
hxrt.DOMTokenList.prototype.item = null;
hxrt.DOMTokenList.prototype.length = null;
hxrt.DOMTokenList.prototype.remove = null;
hxrt.DOMTokenList.prototype.stringifier = null;
hxrt.DOMTokenList.prototype.toggle = null;
hxrt.DOMTokenList.prototype.__class__ = hxrt.DOMTokenList;
hxrt.DOMSettableTokenList = function() { }
hxrt.DOMSettableTokenList.__name__ = ["DOMSettableTokenList"];
hxrt.DOMSettableTokenList.prototype.add = null;
hxrt.DOMSettableTokenList.prototype.contains = null;
hxrt.DOMSettableTokenList.prototype.item = null;
hxrt.DOMSettableTokenList.prototype.length = null;
hxrt.DOMSettableTokenList.prototype.remove = null;
hxrt.DOMSettableTokenList.prototype.stringifier = null;
hxrt.DOMSettableTokenList.prototype.toggle = null;
hxrt.DOMSettableTokenList.prototype.value = null;
hxrt.DOMSettableTokenList.prototype.__class__ = hxrt.DOMSettableTokenList;
hxrt.DOMStringList = function() { }
hxrt.DOMStringList.__name__ = ["DOMStringList"];
hxrt.DOMStringList.prototype.contains = null;
hxrt.DOMStringList.prototype.item = null;
hxrt.DOMStringList.prototype.length = null;
hxrt.DOMStringList.prototype.__class__ = hxrt.DOMStringList;
hxrt.NameList = function() { }
hxrt.NameList.__name__ = ["NameList"];
hxrt.NameList.prototype.contains = null;
hxrt.NameList.prototype.containsNS = null;
hxrt.NameList.prototype.getName = null;
hxrt.NameList.prototype.getNamespaceURI = null;
hxrt.NameList.prototype.length = null;
hxrt.NameList.prototype.__class__ = hxrt.NameList;
hxrt.NamedNodeMap = function() { }
hxrt.NamedNodeMap.__name__ = ["NamedNodeMap"];
hxrt.NamedNodeMap.prototype.getNamedItem = null;
hxrt.NamedNodeMap.prototype.getNamedItemNS = null;
hxrt.NamedNodeMap.prototype.item = null;
hxrt.NamedNodeMap.prototype.length = null;
hxrt.NamedNodeMap.prototype.removeNamedItem = null;
hxrt.NamedNodeMap.prototype.removeNamedItemNS = null;
hxrt.NamedNodeMap.prototype.setNamedItem = null;
hxrt.NamedNodeMap.prototype.setNamedItemNS = null;
hxrt.NamedNodeMap.prototype.__class__ = hxrt.NamedNodeMap;
hxrt.TimedTrackCueList = function() { }
hxrt.TimedTrackCueList.__name__ = ["TimedTrackCueList"];
hxrt.TimedTrackCueList.prototype.getCueById = null;
hxrt.TimedTrackCueList.prototype.getter = null;
hxrt.TimedTrackCueList.prototype.length = null;
hxrt.TimedTrackCueList.prototype.__class__ = hxrt.TimedTrackCueList;
hxrt.Selection = function() { }
hxrt.Selection.__name__ = ["Selection"];
hxrt.Selection.prototype.addRange = null;
hxrt.Selection.prototype.anchorNode = null;
hxrt.Selection.prototype.anchorOffset = null;
hxrt.Selection.prototype.collapse = null;
hxrt.Selection.prototype.collapseToEnd = null;
hxrt.Selection.prototype.collapseToStart = null;
hxrt.Selection.prototype.deleteFromDocument = null;
hxrt.Selection.prototype.focusNode = null;
hxrt.Selection.prototype.focusOffset = null;
hxrt.Selection.prototype.getRangeAt = null;
hxrt.Selection.prototype.isCollapsed = null;
hxrt.Selection.prototype.rangeCount = null;
hxrt.Selection.prototype.removeAllRanges = null;
hxrt.Selection.prototype.removeRange = null;
hxrt.Selection.prototype.selectAllChildren = null;
hxrt.Selection.prototype.stringifier = null;
hxrt.Selection.prototype.__class__ = hxrt.Selection;
hxrt.MessagePortArray = function() { }
hxrt.MessagePortArray.__name__ = ["MessagePortArray"];
hxrt.MessagePortArray.prototype.__class__ = hxrt.MessagePortArray;
hxrt.MessagePort = function() { }
hxrt.MessagePort.__name__ = ["MessagePort"];
hxrt.MessagePort.prototype.close = null;
hxrt.MessagePort.prototype.onMessage = null;
hxrt.MessagePort.prototype.postMessage = null;
hxrt.MessagePort.prototype.start = null;
hxrt.MessagePort.prototype.__class__ = hxrt.MessagePort;
hxrt.MediaList = function() { }
hxrt.MediaList.__name__ = ["MediaList"];
hxrt.MediaList.prototype.appendMedium = null;
hxrt.MediaList.prototype.deleteMedium = null;
hxrt.MediaList.prototype.item = null;
hxrt.MediaList.prototype.length = null;
hxrt.MediaList.prototype.mediaText = null;
hxrt.MediaList.prototype.__class__ = hxrt.MediaList;
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
	return hxrt.Stax.error("Not implemented");
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
	return hxrt.Stax.error("Not implemented");
}
js.io._IFrameIO.AbstractIFrameIO.prototype.request = function(requestData,targetUrl,targetWindow) {
	var requestId = ++this.requestCounter;
	var future = new hxrt.Future();
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
	return hxrt.Stax.error("Not implemented");
}
js.io._IFrameIO.AbstractIFrameIO.prototype.__class__ = js.io._IFrameIO.AbstractIFrameIO;
js.io._IFrameIO.AbstractIFrameIO.__interfaces__ = [js.io.IFrameIO];
js.io.IFrameIOAutoDetect = function(w) { if( w === $_ ) return; {
	this.bindTarget = hxrt.OptionExtensions.getOrElseC(hxrt.OptionExtensions.toOption(w),js.Env.window);
	this.underlying = ($closure(this.bindTarget,"postMessage") != null?(function($this) {
		var $r;
		var $t = new js.io.IFrameIOPostMessage($this.bindTarget);
		if(hxrt.Std["is"]($t,js.io.IFrameIO)) $t;
		else throw "Class cast error";
		$r = $t;
		return $r;
	}(this)):(function($this) {
		var $r;
		var $t = new js.io.IFrameIOPollingHashtag($this.bindTarget);
		if(hxrt.Std["is"]($t,js.io.IFrameIO)) $t;
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
if(!haxe.io) haxe.io = {}
if(!haxe.io.log) haxe.io.log = {}
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
haxe.io.log.Logger.debug = function() {
	return haxe.io.log.Logger.create({ level : hxrt.DynamicExtensions.toThunk(haxe.io.log.LogLevel.Debug), handlers : [haxe.io.log.LogHandlers.Trace,haxe.io.log.LogHandlers.Console]});
}
haxe.io.log.Logger.prototype.__class__ = haxe.io.log.Logger;
hxrt.DynamicExtensions = function() { }
hxrt.DynamicExtensions.__name__ = ["DynamicExtensions"];
hxrt.DynamicExtensions.ShowF = function() {
	return hxrt.ShowTypeclass.create({ show : function(d) {
		return hxrt.Std.string(d);
	}});
}
hxrt.DynamicExtensions.HasherF = function() {
	return hxrt.HasherTypeclass.create({ hash : function(d) {
		return hxrt.StringExtensions.HasherF(hxrt.String).hash(hxrt.DynamicExtensions.ShowF().show(d));
	}});
}
hxrt.DynamicExtensions.EqualF = function() {
	return hxrt.EqualTypeclass.create({ equal : function(d1,d2) {
		return d1 == d2;
	}});
}
hxrt.DynamicExtensions.withEffect = function(t,f) {
	f(t);
	return t;
}
hxrt.DynamicExtensions.withEffectP = function(a,f) {
	f(a);
	return a;
}
hxrt.DynamicExtensions.into = function(a,f) {
	return f(a);
}
hxrt.DynamicExtensions.isInstanceOf = function(o,c) {
	return hxrt.Std["is"](o,c);
}
hxrt.DynamicExtensions.entuple = function(a,b) {
	return hxrt.Tuple2.create(a,b);
}
hxrt.DynamicExtensions.memoize = function(t) {
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
hxrt.DynamicExtensions.toThunk = function(t) {
	return function() {
		return t;
	}
}
hxrt.DynamicExtensions.toConstantFunction = function(t) {
	return function(s) {
		return t;
	}
}
hxrt.DynamicExtensions.toMap = function(d) {
	var map = haxe.data.collections.Map.create(hxrt.StringExtensions.HasherF(hxrt.String),hxrt.StringExtensions.EqualF(hxrt.String));
	{
		var _g = 0, _g1 = hxrt.Reflect.fields(d);
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			var value = hxrt.Reflect.field(d,field);
			map = map.set(field,value);
		}
	}
	return map;
}
hxrt.DynamicExtensions.prototype.__class__ = hxrt.DynamicExtensions;
haxe.io.log.LogHandlers = function() { }
haxe.io.log.LogHandlers.__name__ = ["haxe","io","log","LogHandlers"];
haxe.io.log.LogHandlers.Trace = function(level,text,p) {
	haxe.Log.trace((haxe.io.log.LogHandlers.textLevel(level).toUpperCase() + ": ") + haxe.io.log.LogHandlers.format(text,p),{ fileName : "Logger.hx", lineNumber : 105, className : "haxe.io.log.LogHandlers"});
}
haxe.io.log.LogHandlers.Console = function(level,text,p) {
	(function(text1,console) {
		var $e = (level);
		switch( $e[1] ) {
		case 0:
		case 1:
		{
			if(console.debug != null) console.debug(text1);
		}break;
		case 2:
		{
			if(console.info != null) console.info(text1);
		}break;
		case 3:
		{
			if(console.warn != null) console.warn(text1);
		}break;
		case 4:
		case 5:
		case 6:
		{
			if(console.error != null) console.error(text1);
		}break;
		}
	})(haxe.io.log.LogHandlers.format(text,p),console);
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
haxe.io.log.LoggerFacade = function() { }
haxe.io.log.LoggerFacade.__name__ = ["haxe","io","log","LoggerFacade"];
haxe.io.log.LoggerFacade.prototype.debug = null;
haxe.io.log.LoggerFacade.prototype.error = null;
haxe.io.log.LoggerFacade.prototype.fatal = null;
haxe.io.log.LoggerFacade.prototype.info = null;
haxe.io.log.LoggerFacade.prototype.trace = null;
haxe.io.log.LoggerFacade.prototype.warning = null;
haxe.io.log.LoggerFacade.prototype.__class__ = haxe.io.log.LoggerFacade;
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
	this.debug(hxrt.Std.string(t),p);
	return t;
}
haxe.io.log.LoggerBridge.prototype.warning = function(s,p) {
	this._handler(haxe.io.log.LogLevel.Warning,s,p);
}
haxe.io.log.LoggerBridge.prototype.__class__ = haxe.io.log.LoggerBridge;
haxe.io.log.LoggerBridge.__interfaces__ = [haxe.io.log.LoggerFacade];
js.io.IFrameIOPostMessage = function(w) { if( w === $_ ) return; {
	js.io._IFrameIO.AbstractIFrameIO.apply(this,[]);
	this.bindTarget = w;
}}
js.io.IFrameIOPostMessage.__name__ = ["js","io","IFrameIOPostMessage"];
js.io.IFrameIOPostMessage.__super__ = js.io._IFrameIO.AbstractIFrameIO;
for(var k in js.io._IFrameIO.AbstractIFrameIO.prototype ) js.io.IFrameIOPostMessage.prototype[k] = js.io._IFrameIO.AbstractIFrameIO.prototype[k];
js.io.IFrameIOPostMessage.normalizeOpt = function(url) {
	return hxrt.OptionExtensions.map(haxe.net.UrlExtensions.toParsedUrl(url),function(p) {
		return haxe.net.UrlExtensions.toUrl(haxe.net.UrlExtensions.withoutSearch(haxe.net.UrlExtensions.withoutPathname(haxe.net.UrlExtensions.withoutHash(p))));
	});
}
js.io.IFrameIOPostMessage.normalize = function(url) {
	return hxrt.OptionExtensions.getOrElseC(js.io.IFrameIOPostMessage.normalizeOpt(url),url);
}
js.io.IFrameIOPostMessage.getUrlFor = function(w,url_) {
	var tryExtractUrl = function(w1) {
		return hxrt.OptionExtensions.getOrElse(js.io.IFrameIOPostMessage.normalizeOpt(url_),function() {
			try {
				return js.io.IFrameIOPostMessage.normalize(w1.location.href);
			}
			catch( $e0 ) {
				{
					var d = $e0;
					{
						return url_;
					}
				}
			}
		});
	}
	var cur = w;
	while(cur != null) {
		var url = tryExtractUrl(cur);
		if(!hxrt.StringExtensions.startsWith(url,"about:")) {
			return js.io.IFrameIOPostMessage.normalize(url);
		}
		if(cur == cur.top) cur = null;
		else cur = cur.parent;
	}
	return url_;
}
js.io.IFrameIOPostMessage.prototype.bindTarget = null;
js.io.IFrameIOPostMessage.prototype.receive = function(f,originUrl,originWindow) {
	return this.receiveWhile(function(d) {
		return hxrt.DynamicExtensions.withEffect(true,function(_) {
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
	if(hxrt.StringExtensions.startsWith(targetUrl,"file:")) targetUrl = "*";
	targetWindow.postMessage(haxe.text.json.Json.encodeObject(data),targetUrl);
	return this;
}
js.io.IFrameIOPostMessage.prototype.__class__ = js.io.IFrameIOPostMessage;
js.io.IFrameIOPostMessage.__interfaces__ = [js.io.IFrameIO];
haxe.functional.Foldable = function() { }
haxe.functional.Foldable.__name__ = ["haxe","functional","Foldable"];
haxe.functional.Foldable.prototype.append = null;
haxe.functional.Foldable.prototype.empty = null;
haxe.functional.Foldable.prototype.foldl = null;
haxe.functional.Foldable.prototype.__class__ = haxe.functional.Foldable;
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
haxe.data.collections.List = function(equal) { if( equal === $_ ) return; {
	this.equal = (equal == null?hxrt.DynamicExtensions.EqualF():equal);
}}
haxe.data.collections.List.__name__ = ["haxe","data","collections","List"];
haxe.data.collections.List.OrderF = function(order) {
	return hxrt.OrderTypeclass.create({ compare : function(v1,v2) {
		var a1 = hxrt.IterableExtensions.toArray(v1);
		var a2 = hxrt.IterableExtensions.toArray(v2);
		return hxrt.ArrayExtensions.OrderF(hxrt.Array,order).compare(a1,a2);
	}});
}
haxe.data.collections.List.EqualF = function(equal) {
	return hxrt.EqualTypeclass.create({ equal : function(v1,v2) {
		var a1 = hxrt.IterableExtensions.toArray(v1);
		var a2 = hxrt.IterableExtensions.toArray(v2);
		return hxrt.ArrayExtensions.EqualF(hxrt.Array,equal).equal(a1,a2);
	}});
}
haxe.data.collections.List.ShowF = function(show) {
	return hxrt.ShowTypeclass.create({ show : function(v) {
		return "List" + hxrt.IterableExtensions.toString(haxe.functional.FoldableExtensions.elements(v),show.show);
	}});
}
haxe.data.collections.List.HasherF = function(hasher) {
	return hxrt.HasherTypeclass.create({ hash : function(v) {
		return v.foldl(12289,function(a,b) {
			return a * (hasher.hash(b) + 12289);
		});
	}});
}
haxe.data.collections.List.nil = function(equal) {
	return new haxe.data.collections._List.Nil((equal == null?hxrt.DynamicExtensions.EqualF():equal));
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
	{ var $it0 = i.iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
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
		var _g1 = 0, _g = hxrt.IntExtensions.min(this.getSize(),n);
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
haxe.data.collections.List.prototype.filter = function(f) {
	return this.foldr(this.empty(),function(e,list) {
		return (f(e)?list.cons(e):list);
	});
}
haxe.data.collections.List.prototype.first = null;
haxe.data.collections.List.prototype.firstOption = null;
haxe.data.collections.List.prototype.flatMap = function(f) {
	return this.foldr(this.empty(),function(e,list) {
		return list.prependAll(f(e));
	});
}
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
	var a = hxrt.IterableExtensions.toArray(this);
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
	return haxe.functional.FoldableExtensions.flatMapTo(this.zip(this.drop(1)),haxe.data.collections.List.nil(equal),function(tuple) {
		return f(tuple._1,tuple._2);
	});
}
haxe.data.collections.List.prototype.getHead = function() {
	return hxrt.Stax.error("List has no head element");
}
haxe.data.collections.List.prototype.getHeadOption = function() {
	return hxrt.Option.None;
}
haxe.data.collections.List.prototype.getLast = function() {
	return hxrt.Stax.error("List has no last element");
}
haxe.data.collections.List.prototype.getLastOption = function() {
	return hxrt.Option.None;
}
haxe.data.collections.List.prototype.getSize = function() {
	return 0;
}
haxe.data.collections.List.prototype.getTail = function() {
	return hxrt.Stax.error("List has no head");
}
haxe.data.collections.List.prototype.head = null;
haxe.data.collections.List.prototype.headOption = null;
haxe.data.collections.List.prototype.iterator = function() {
	return haxe.functional.FoldableExtensions.iterator(this);
}
haxe.data.collections.List.prototype.last = null;
haxe.data.collections.List.prototype.lastOption = null;
haxe.data.collections.List.prototype.map = function(f) {
	return this.foldr(this.empty(),function(e,list) {
		return list.cons(f(e));
	});
}
haxe.data.collections.List.prototype.prepend = function(head) {
	return this.cons(head);
}
haxe.data.collections.List.prototype.prependAll = function(iterable) {
	var result = this;
	var array = hxrt.IterableExtensions.toArray(iterable);
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
	{ var $it0 = i.iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
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
	var a = hxrt.IterableExtensions.toArray(this);
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
	return haxe.data.collections.List.ShowF(hxrt.DynamicExtensions.ShowF()).show(this);
}
haxe.data.collections.List.prototype.zip = function(that) {
	var len = hxrt.IntExtensions.min(this.getSize(),that.getSize());
	var iterator1 = this.reverse().drop(hxrt.IntExtensions.max(0,this.getSize() - len)).iterator();
	var iterator2 = that.reverse().drop(hxrt.IntExtensions.max(0,that.getSize() - len)).iterator();
	var r = haxe.data.collections.List.create(hxrt.Tuple2.EqualF(this.equal,that.equal));
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			r = r.cons(hxrt.Tuple2.create(iterator1.next(),iterator2.next()));
		}
	}
	return r;
}
haxe.data.collections.List.prototype.__class__ = haxe.data.collections.List;
haxe.data.collections.List.__interfaces__ = [haxe.data.collections.Collection];
hxrt.EqualTypeclass = function() { }
hxrt.EqualTypeclass.__name__ = ["EqualTypeclass"];
hxrt.EqualTypeclass.create = function(equal) {
	return { equal : equal.equal, notEqual : function(v1,v2) {
		return !equal.equal(v1,v2);
	}}
}
hxrt.EqualTypeclass.prototype.__class__ = hxrt.EqualTypeclass;
if(!haxe.data.collections._List) haxe.data.collections._List = {}
haxe.data.collections._List.Nil = function(equal) { if( equal === $_ ) return; {
	haxe.data.collections.List.apply(this,[equal]);
}}
haxe.data.collections._List.Nil.__name__ = ["haxe","data","collections","_List","Nil"];
haxe.data.collections._List.Nil.__super__ = haxe.data.collections.List;
for(var k in haxe.data.collections.List.prototype ) haxe.data.collections._List.Nil.prototype[k] = haxe.data.collections.List.prototype[k];
haxe.data.collections._List.Nil.prototype.__class__ = haxe.data.collections._List.Nil;
js.io.IFrameIOPollingHashtag = function(w) { if( w === $_ ) return; {
	js.io._IFrameIO.AbstractIFrameIO.apply(this,[]);
	this.bindTarget = w;
	this.executor = haxe.framework.Injector.inject(haxe.time.ScheduledExecutor,{ fileName : "IFrameIO.hx", lineNumber : 310, className : "js.io.IFrameIOPollingHashtag", methodName : "new"});
	this.fragmentsToSend = js.io.IFrameIOPollingHashtag.newFragmentsList();
	this.fragmentsReceived = haxe.data.collections.Map.create(js.io._IFrameIO.MessageKey.HasherF(),js.io._IFrameIO.MessageKey.EqualF());
	this.receivers = new hxrt.Hash();
	this.originUrlToWindow = new hxrt.Hash();
	this.senderFuture = hxrt.Option.None;
	this.receiverFuture = hxrt.Option.None;
}}
js.io.IFrameIOPollingHashtag.__name__ = ["js","io","IFrameIOPollingHashtag"];
js.io.IFrameIOPollingHashtag.__super__ = js.io._IFrameIO.AbstractIFrameIO;
for(var k in js.io._IFrameIO.AbstractIFrameIO.prototype ) js.io.IFrameIOPollingHashtag.prototype[k] = js.io._IFrameIO.AbstractIFrameIO.prototype[k];
js.io.IFrameIOPollingHashtag.normalizeOpt = function(url) {
	return hxrt.OptionExtensions.map(haxe.net.UrlExtensions.toParsedUrl(url),function(p) {
		return haxe.net.UrlExtensions.toUrl(haxe.net.UrlExtensions.withoutHash(p));
	});
}
js.io.IFrameIOPollingHashtag.normalize = function(url) {
	return hxrt.OptionExtensions.getOrElseC(js.io.IFrameIOPollingHashtag.normalizeOpt(url),url);
}
js.io.IFrameIOPollingHashtag.messageKeyFrom = function(o) {
	return new js.io._IFrameIO.MessageKey(hxrt.StringExtensions.toInt(o.messageId),o.from,o.to,hxrt.StringExtensions.toInt(o.fragmentCount));
}
js.io.IFrameIOPollingHashtag.prototype.analyzeReceivedFragments = function(messageKey,fragments) {
	if(fragments.length >= messageKey.fragmentCount) {
		fragments.sort(function(a,b) {
			return hxrt.StringExtensions.toInt(a.fragmentId) - hxrt.StringExtensions.toInt(b.fragmentId);
		});
		var fullData = hxrt.ArrayExtensions.foldl(fragments,"",function(a,b) {
			return a + b.data;
		});
		var message = haxe.text.json.Json.decodeObject(fullData);
		var domain = this.extractDomain(fragments[0].from);
		if(this.receivers.exists(domain)) {
			hxrt.ArrayExtensions.foreach(this.receivers.get(domain),function(r) {
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
			return hxrt.StringExtensions.toInt(a.fragmentId) - hxrt.StringExtensions.toInt(b.fragmentId);
		});
		return hxrt.IterableExtensions.toList(fragments).gaps(function(a,b) {
			var lastId = hxrt.StringExtensions.toInt(a.fragmentId);
			var curId = hxrt.StringExtensions.toInt(b.fragmentId);
			return hxrt.IterableExtensions.toList(haxe.data.collections.IterableExtensions.map(hxrt.IntExtensions.until((lastId + 1),curId),function(missingId) {
				var request = { type : "request", from : firstFrag.to, to : firstFrag.from, messageId : firstFrag.messageId, fragmentCount : firstFrag.fragmentCount, fragmentId : hxrt.IntExtensions.toString(missingId)}
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
	return hxrt.OptionExtensions.get(this.fragmentsReceived.get(messageKey));
}
js.io.IFrameIOPollingHashtag.prototype.fragmentsToSend = null;
js.io.IFrameIOPollingHashtag.prototype.originUrlToWindow = null;
js.io.IFrameIOPollingHashtag.prototype.receive = function(f,originUrl,originWindow) {
	return this.receiveWhile(function(d) {
		return hxrt.DynamicExtensions.withEffect(true,function(_) {
			f(d);
		});
	},originUrl,originWindow);
}
js.io.IFrameIOPollingHashtag.prototype.receiveWhile = function(f,originUrl,originWindow) {
	var self = this;
	var domain = this.extractDomain(originUrl);
	var r = (this.receivers.exists(domain)?this.receivers.get(domain):hxrt.DynamicExtensions.withEffect([],function(r) {
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
		var unknown = haxe.net.UrlExtensions.toQueryParameters(query);
		if(unknown.type == "delivery") {
			var packet = unknown;
			var messageKey = js.io.IFrameIOPollingHashtag.messageKeyFrom(packet);
			var fragments = this.fragmentsReceivedFor(messageKey);
			var alreadyReceived = hxrt.ArrayExtensions.foldl(fragments,false,function(b,f) {
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
		if(fragmentRequests.getSize() > 0) {
			var encoded = haxe.functional.FoldableExtensions.flatMapTo(fragmentRequests,haxe.data.collections.List.nil(),function(request) {
				var window = self.originUrlToWindow.get(request.to);
				return (window != null?haxe.data.collections.List.nil().cons(hxrt.DynamicExtensions.entuple(window,request)):haxe.data.collections.List.nil());
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
		return hxrt.DynamicExtensions.entuple(iframe,{ type : "delivery", from : from, to : to, messageId : hxrt.IntExtensions.toString(js.io.IFrameIOPollingHashtag.lastMessageId), fragmentId : hxrt.IntExtensions.toString((fragmentId++)), fragmentCount : hxrt.IntExtensions.toString(fragments.getSize()), data : chunk});
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
		var window = tuple._1;
		var fragment = tuple._2;
		window.location.href = (fragment.to + "#") + haxe.net.UrlExtensions.toQueryString(hxrt.DynamicExtensions.toMap(fragment)).substr(1);
	}break;
	}
}
js.io.IFrameIOPollingHashtag.prototype.senderFuture = null;
js.io.IFrameIOPollingHashtag.prototype.startReceiver = function() {
	if(hxrt.OptionExtensions.isEmpty(this.receiverFuture)) {
		this.receiverFuture = hxrt.Option.Some(this.executor.forever($closure(this,"receiver"),10));
	}
}
js.io.IFrameIOPollingHashtag.prototype.startSender = function() {
	if(hxrt.OptionExtensions.isEmpty(this.senderFuture)) {
		this.senderFuture = hxrt.Option.Some(this.executor.forever($closure(this,"sender"),20));
	}
}
js.io.IFrameIOPollingHashtag.prototype.stop = function() {
	this.stopSender();
	this.stopReceiver();
	return this;
}
js.io.IFrameIOPollingHashtag.prototype.stopReceiver = function() {
	hxrt.OptionExtensions.map(this.receiverFuture,function(r) {
		r.cancel();
		return hxrt.Unit.Unit;
	});
	this.receiverFuture = hxrt.Option.None;
}
js.io.IFrameIOPollingHashtag.prototype.stopSender = function() {
	hxrt.OptionExtensions.map(this.senderFuture,function(s) {
		s.cancel();
		return hxrt.Unit.Unit;
	});
	this.senderFuture = hxrt.Option.None;
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
js.io._IFrameIO.MessageKey.HasherF = function() {
	var intHasher = hxrt.IntExtensions.HasherF(hxrt.Int);
	var stringHasher = hxrt.StringExtensions.HasherF(hxrt.String);
	return hxrt.HasherTypeclass.create({ hash : function(v) {
		return ((intHasher.hash(v.messageId) * stringHasher.hash(v.from)) * stringHasher.hash(v.to)) * intHasher.hash(v.fragmentCount);
	}});
}
js.io._IFrameIO.MessageKey.EqualF = function() {
	return hxrt.EqualTypeclass.create({ equal : function(v1,v2) {
		return v1.messageId == v2.messageId && v1.from == v2.from && v1.to == v2.to && v1.fragmentCount == v2.fragmentCount;
	}});
}
js.io._IFrameIO.MessageKey.prototype.fragmentCount = null;
js.io._IFrameIO.MessageKey.prototype.from = null;
js.io._IFrameIO.MessageKey.prototype.messageId = null;
js.io._IFrameIO.MessageKey.prototype.to = null;
js.io._IFrameIO.MessageKey.prototype.__class__ = js.io._IFrameIO.MessageKey;
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
	return hxrt.Option.Some(this.getHead());
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
	return hxrt.Option.Some(this.getLast());
}
haxe.data.collections._List.Cons.prototype.getSize = function() {
	return this._size;
}
haxe.data.collections._List.Cons.prototype.getTail = function() {
	return this._tail;
}
haxe.data.collections._List.Cons.prototype.__class__ = haxe.data.collections._List.Cons;
hxrt.StringBuf = function(p) { if( p === $_ ) return; {
	this.b = new hxrt.Array();
}}
hxrt.StringBuf.__name__ = ["StringBuf"];
hxrt.StringBuf.prototype.add = function(x) {
	this.b[this.b.length] = x;
}
hxrt.StringBuf.prototype.addChar = function(c) {
	this.b[this.b.length] = hxrt.String.fromCharCode(c);
}
hxrt.StringBuf.prototype.addSub = function(s,pos,len) {
	this.b[this.b.length] = s.substr(pos,len);
}
hxrt.StringBuf.prototype.b = null;
hxrt.StringBuf.prototype.toString = function() {
	return this.b.join("");
}
hxrt.StringBuf.prototype.__class__ = hxrt.StringBuf;
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
	var factory = hxrt.OptionExtensions.getOrElse(binding,hxrt.Function1Extensions.lazy($closure(hxrt.Stax,"error"),"No binding defined for " + hxrt.Type.getClassName(interf)));
	return factory();
}
haxe.framework._Injector.InjectorImpl.forever = function(f) {
	haxe.framework._Injector.InjectorImpl.state.unshift({ globalBindings : new hxrt.Hash(), packageBindings : new hxrt.Hash(), moduleBindings : new hxrt.Hash(), classBindings : new hxrt.Hash()});
	return f(new haxe.framework._Injector.InjectorConfigImpl());
}
haxe.framework._Injector.InjectorImpl.enter = function(f) {
	haxe.framework._Injector.InjectorImpl.state.unshift({ globalBindings : new hxrt.Hash(), packageBindings : new hxrt.Hash(), moduleBindings : new hxrt.Hash(), classBindings : new hxrt.Hash()});
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
			haxe.framework._Injector.InjectorImpl.addGlobalBinding(interf,hxrt.DynamicExtensions.memoize(f));
		}break;
		}
	}
	return { bindToF : internalBind, bindTo : function(interf,impl,bindingType) {
		internalBind(interf,haxe.framework._Injector.InjectorImpl.factoryFor(impl),bindingType);
	}}
}
haxe.framework._Injector.InjectorImpl.inClass = function(c) {
	return { bindToF : function(interf,f,bindingType) {
		haxe.framework._Injector.InjectorImpl.bindForSpecificF(haxe.framework._Injector.InjectorImpl.classBindingsExtractor,interf,hxrt.Type.getClassName(c),f,bindingType);
	}, bindTo : function(interf,impl,bindingType) {
		haxe.framework._Injector.InjectorImpl.bindForSpecificF(haxe.framework._Injector.InjectorImpl.classBindingsExtractor,interf,hxrt.Type.getClassName(c),haxe.framework._Injector.InjectorImpl.factoryFor(impl),bindingType);
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
		haxe.framework._Injector.InjectorImpl.addSpecificBinding(extractor(hxrt.ArrayExtensions.first(haxe.framework._Injector.InjectorImpl.state)),interf,specific,f);
	}break;
	case 1:
	{
		haxe.framework._Injector.InjectorImpl.addSpecificBinding(extractor(hxrt.ArrayExtensions.first(haxe.framework._Injector.InjectorImpl.state)),interf,specific,hxrt.DynamicExtensions.memoize(f));
	}break;
	}
}
haxe.framework._Injector.InjectorImpl.getMostSpecificBinding = function(c,pos) {
	var className = haxe.framework._Injector.InjectorImpl.classOf(pos);
	var moduleName = haxe.framework._Injector.InjectorImpl.moduleOf(pos);
	var packageName = haxe.framework._Injector.InjectorImpl.packageOf(pos);
	return hxrt.OptionExtensions.orElse(hxrt.OptionExtensions.orElse(hxrt.OptionExtensions.orElse(haxe.framework._Injector.InjectorImpl.getClassBinding(c,className),hxrt.Function2Extensions.lazy($closure(haxe.framework._Injector.InjectorImpl,"getModuleBinding"),c,moduleName)),hxrt.Function2Extensions.lazy($closure(haxe.framework._Injector.InjectorImpl,"getPackageBinding"),c,packageName)),hxrt.Function1Extensions.lazy($closure(haxe.framework._Injector.InjectorImpl,"getGlobalBinding"),c));
}
haxe.framework._Injector.InjectorImpl.getGlobalBinding = function(c) {
	var className = hxrt.Type.getClassName(c);
	return hxrt.ArrayExtensions.foldl(haxe.framework._Injector.InjectorImpl.state,hxrt.Option.None,function(a,b) {
		return hxrt.OptionExtensions.orElseC(a,hxrt.OptionExtensions.toOption(b.globalBindings.get(className)));
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
	hxrt.ArrayExtensions.first(haxe.framework._Injector.InjectorImpl.state).globalBindings.set(hxrt.Type.getClassName(c),f);
}
haxe.framework._Injector.InjectorImpl.getSpecificBinding = function(extractor,c,specific) {
	{
		var _g = 0, _g1 = haxe.framework._Injector.InjectorImpl.state;
		while(_g < _g1.length) {
			var bindings = _g1[_g];
			++_g;
			var binding = extractor(bindings);
			var result = hxrt.OptionExtensions.flatMap(hxrt.OptionExtensions.toOption(binding.get(hxrt.Type.getClassName(c))),function(h) {
				return hxrt.OptionExtensions.toOption(h.get(specific));
			});
			if(!hxrt.OptionExtensions.isEmpty(result)) {
				return result;
			}
		}
	}
	return hxrt.Option.None;
}
haxe.framework._Injector.InjectorImpl.addSpecificBinding = function(bindings,c,specific,f) {
	var h = bindings.get(hxrt.Type.getClassName(c));
	if(h == null) {
		h = new hxrt.Hash();
		bindings.set(hxrt.Type.getClassName(c),h);
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
		return hxrt.Type.createInstance(impl,[]);
	}
}
haxe.framework._Injector.InjectorImpl.bindingTypeDef = function(bindingType) {
	return hxrt.OptionExtensions.getOrElseC(hxrt.OptionExtensions.toOption(bindingType),haxe.framework.BindingType.OneToMany);
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
haxe.text.json.JValueExtensions = function() { }
haxe.text.json.JValueExtensions.__name__ = ["haxe","text","json","JValueExtensions"];
haxe.text.json.JValueExtensions.OrderF = function(c) {
	return hxrt.OrderTypeclass.create({ compare : function(v1,v2) {
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
					case 2:
					case 3:
					case 4:
					case 5:
					case 6:
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
			var v11 = $e[2];
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
					var v21 = $e[2];
					{
						$r = hxrt.BoolExtensions.OrderF(hxrt.Bool).compare(v11,v21);
					}break;
					case 2:
					case 3:
					case 4:
					case 5:
					case 6:
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
			case 2:
			var v11 = $e[2];
			{
				$r = (function($this) {
					var $r;
					var $e = (v2);
					switch( $e[1] ) {
					case 0:
					case 1:
					{
						$r = 1;
					}break;
					case 2:
					var v21 = $e[2];
					{
						$r = hxrt.FloatExtensions.OrderF(hxrt.Float).compare(v11,v21);
					}break;
					case 3:
					case 4:
					case 5:
					case 6:
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
			case 3:
			var v11 = $e[2];
			{
				$r = (function($this) {
					var $r;
					var $e = (v2);
					switch( $e[1] ) {
					case 0:
					case 1:
					case 2:
					{
						$r = 1;
					}break;
					case 3:
					var v21 = $e[2];
					{
						$r = hxrt.StringExtensions.OrderF(hxrt.String).compare(v11,v21);
					}break;
					case 4:
					case 5:
					case 6:
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
			case 4:
			var v11 = $e[2];
			{
				$r = (function($this) {
					var $r;
					var $e = (v2);
					switch( $e[1] ) {
					case 0:
					case 1:
					case 2:
					case 3:
					{
						$r = 1;
					}break;
					case 4:
					var v21 = $e[2];
					{
						$r = hxrt.ArrayExtensions.OrderF(hxrt.Array,haxe.text.json.JValueExtensions.OrderF(haxe.text.json.JValue)).compare(v11,v21);
					}break;
					case 5:
					case 6:
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
			case 5:
			var v11 = $e[2];
			{
				$r = (function($this) {
					var $r;
					var $e = (v2);
					switch( $e[1] ) {
					case 0:
					case 1:
					case 2:
					case 3:
					case 4:
					{
						$r = 1;
					}break;
					case 5:
					var v21 = $e[2];
					{
						$r = hxrt.ArrayExtensions.OrderF(hxrt.Array,haxe.text.json.JValueExtensions.OrderF(haxe.text.json.JValue)).compare(v11,v21);
					}break;
					case 6:
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
			case 6:
			var v11 = $e[3], k1 = $e[2];
			{
				$r = (function($this) {
					var $r;
					var $e = (v2);
					switch( $e[1] ) {
					case 0:
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
					{
						$r = 1;
					}break;
					case 6:
					var v21 = $e[3], k2 = $e[2];
					{
						$r = hxrt.Tuple2.OrderF(hxrt.StringExtensions.OrderF(hxrt.String),haxe.text.json.JValueExtensions.OrderF(haxe.text.json.JValue)).compare(hxrt.Tuple2.create(k1,v11),hxrt.Tuple2.create(k2,v21));
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
haxe.text.json.JValueExtensions.EqualF = function(c) {
	return haxe.text.json.JValueExtensions.OrderF(c);
}
haxe.text.json.JValueExtensions.ShowF = function(c) {
	return hxrt.ShowTypeclass.create({ show : function(v) {
		return hxrt.Std.string(v);
	}});
}
haxe.text.json.JValueExtensions.HasherF = function(c) {
	return hxrt.HasherTypeclass.create({ hash : function(v) {
		return (function($this) {
			var $r;
			var $e = (v);
			switch( $e[1] ) {
			case 0:
			{
				$r = 1543;
			}break;
			case 1:
			var v1 = $e[2];
			{
				$r = 24593 * hxrt.BoolExtensions.HasherF(hxrt.Bool).hash(v1);
			}break;
			case 2:
			var v1 = $e[2];
			{
				$r = 49157 * hxrt.FloatExtensions.HasherF(hxrt.Float).hash(v1);
			}break;
			case 3:
			var v1 = $e[2];
			{
				$r = 98317 * hxrt.StringExtensions.HasherF(hxrt.String).hash(v1);
			}break;
			case 4:
			var v1 = $e[2];
			{
				$r = 196613 * hxrt.ArrayExtensions.HasherF(hxrt.Array,haxe.text.json.JValueExtensions.HasherF(c)).hash(v1);
			}break;
			case 5:
			var v1 = $e[2];
			{
				$r = 393241 * hxrt.ArrayExtensions.HasherF(hxrt.Array,haxe.text.json.JValueExtensions.HasherF(c)).hash(v1);
			}break;
			case 6:
			var v1 = $e[3], k = $e[2];
			{
				$r = 786433 * hxrt.Tuple2.HasherF(hxrt.StringExtensions.HasherF(hxrt.String),haxe.text.json.JValueExtensions.HasherF(c)).hash(hxrt.Tuple2.create(k,v1));
			}break;
			default:{
				$r = null;
			}break;
			}
			return $r;
		}(this));
	}});
}
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
		return f(haxe.text.json.JValue.JArray(hxrt.ArrayExtensions.map(xs,function(x) {
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
		return f(haxe.text.json.JValue.JObject(hxrt.ArrayExtensions.map(fs,function(field) {
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
		return (hash.exists(k)?hxrt.Option.Some(hash.get(k)):hxrt.Option.None);
	}break;
	default:{
		return hxrt.Option.None;
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
			$r = hxrt.Stax.error((("Expected to find field " + k) + " in ") + v);
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
			$r = hxrt.Stax.error("Expected JString but found: " + v);
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
			$r = hxrt.Stax.error("Expected JNumber but found: " + v);
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
			$r = hxrt.Stax.error("Expected JBool but found: " + v);
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
			$r = hxrt.Tuple2.create(k,v1);
		}break;
		default:{
			$r = hxrt.Stax.error("Expected JField but found: " + v);
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
				var hash = new hxrt.Hash();
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
			$r = hxrt.Stax.error("Expected JObject but found: " + v);
		}break;
		}
		return $r;
	}(this));
}
haxe.text.json.JValueExtensions.extractFields = function(v) {
	return hxrt.ArrayExtensions.flatMap(haxe.text.json.JValueExtensions.extractArray(v),function(j) {
		return (function($this) {
			var $r;
			var $e = (j);
			switch( $e[1] ) {
			case 6:
			var v1 = $e[3], k = $e[2];
			{
				$r = [hxrt.Tuple2.create(k,v1)];
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
			$r = hxrt.Stax.error("Expected JArray or JObject but found: " + v);
		}break;
		}
		return $r;
	}(this));
}
haxe.text.json.JValueExtensions.prototype.__class__ = haxe.text.json.JValueExtensions;
hxrt.Demo = function() { }
hxrt.Demo.__name__ = ["Demo"];
hxrt.Demo.iframeDemo = function() {
	var IframeTemplate = "\n      <html>\n        <body>\n          <div id=\"div\"></div>\n          <textarea id=\"textarea\" rows=\"5\" cols=\"20\"></textarea>\n          <input id=\"button\" type=\"button\" value=\"Send\">\n        </body>\n      </html>\n    ";
	var window1;
	var window2;
	var iframeIO1;
	var iframeIO2;
	var d = js.Env.document;
	var body = d.getElementsByTagName("body")[0];
	var iframe1 = js.dom.HTMLDocumentExtensions.newIframe(js.Env.document,300,250);
	var iframe2 = js.dom.HTMLDocumentExtensions.newIframe(js.Env.document,300,250);
	body.appendChild(iframe1);
	body.appendChild(iframe2);
	var doc1 = js.dom.Quirks.getIframeDocument(iframe1);
	var doc2 = js.dom.Quirks.getIframeDocument(iframe2);
	doc1.open();
	doc1.write(IframeTemplate);
	doc1.close();
	doc2.open();
	doc2.write(IframeTemplate);
	doc2.close();
	window1 = js.dom.Quirks.getIframeWindow(iframe1);
	window2 = js.dom.Quirks.getIframeWindow(iframe2);
	iframeIO1 = new js.io.IFrameIOAutoDetect(window1);
	iframeIO2 = new js.io.IFrameIOAutoDetect(window2);
	var div1 = doc1.getElementById("div");
	var div2 = doc2.getElementById("div");
	var textarea1 = doc1.getElementById("textarea");
	var textarea2 = doc2.getElementById("textarea");
	var button1 = doc1.getElementById("button");
	var button2 = doc2.getElementById("button");
	iframeIO1.receive(function(data) {
		div1.innerHTML += data;
	},window2.location.href,window2);
	iframeIO2.receive(function(data) {
		div2.innerHTML += data;
	},window1.location.href,window1);
	button1.onclick = function(e) {
		iframeIO1.send(textarea1.value,window2.location.href,window2);
		textarea1.value = "";
	}
	button2.onclick = function(e) {
		iframeIO2.send(textarea2.value,window1.location.href,window1);
		textarea2.value = "";
	}
}
hxrt.Demo.browserSupportDemo = function() {
	hxrt.DynamicExtensions.withEffect(js.Env.document.createElement("div"),function(div) {
		div.innerHTML += ((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((("<table>" + "<tr><td>cssTransformationSupported:</td><td>") + js.detect.BrowserSupport.cssTransformationSupported()) + "</td></tr>") + "<tr><td>elementTagnameUppercased:</td><td>") + js.detect.BrowserSupport.elementTagnameUppercased()) + "</td></tr>") + "<tr><td>positionFixed:</td><td>") + js.detect.BrowserSupport.positionFixed()) + "</td></tr>") + "<tr><td>boxModel:</td><td>") + js.detect.BrowserSupport.boxModel()) + "</td></tr>") + "<tr><td>getAttributeStyle:</td><td>") + js.detect.BrowserSupport.getAttributeStyle()) + "</td></tr>") + "<tr><td>opacity:</td><td>") + js.detect.BrowserSupport.opacity()) + "</td></tr>") + "<tr><td>cssFloat:</td><td>") + js.detect.BrowserSupport.cssFloat()) + "</td></tr>") + "<tr><td>checkboxValueDefaultsToOn:</td><td>") + js.detect.BrowserSupport.checkboxValueDefaultsToOn()) + "</td></tr>") + "<tr><td>defaultSelectedHasSelectProperty:</td><td>") + js.detect.BrowserSupport.defaultSelectedHasSelectProperty()) + "</td></tr>") + "<tr><td>offsetAddsBorderForTableAndCells:</td><td>") + js.detect.BrowserSupport.offsetAddsBorderForTableAndCells()) + "</td></tr>") + "<tr><td>offsetDoesNotIncludeMarginInBodyOffset:</td><td>") + js.detect.BrowserSupport.offsetDoesNotIncludeMarginInBodyOffset()) + "</td></tr>") + "<tr><td>offsetDoesNotAddBorder:</td><td>") + js.detect.BrowserSupport.offsetDoesNotAddBorder()) + "</td></tr>") + "<tr><td>offsetSubtractsBorderForOverflowNotVisible:</td><td>") + js.detect.BrowserSupport.offsetSubtractsBorderForOverflowNotVisible()) + "</td></tr>") + "<tr><td>spuriousTbodyInsertedBug:</td><td>") + js.detect.BrowserSupport.spuriousTbodyInsertedBug()) + "</td></tr>") + "<tr><td>whitespaceDroppedWithInnerHTMLBug:</td><td>") + js.detect.BrowserSupport.whitespaceDroppedWithInnerHTMLBug()) + "</td></tr>") + "<tr><td>linksDroppedWithInnerHTMLBug:</td><td>") + js.detect.BrowserSupport.linksDroppedWithInnerHTMLBug()) + "</td></tr>") + "<tr><td>hrefIsNormalizedBug:</td><td>") + js.detect.BrowserSupport.hrefIsNormalizedBug()) + "</td></tr>") + "<tr><td>isEventSrcelementPresent:</td><td>") + js.detect.BrowserSupport.isEventSrcelementPresent()) + "</td></tr>") + "<tr><td>isNativeHasAttributePresent:</td><td>") + js.detect.BrowserSupport.isNativeHasAttributePresent()) + "</td></tr>") + "<tr><td>isContextMenuEventSupported:</td><td>") + js.detect.BrowserSupport.isContextMenuEventSupported()) + "</td></tr>") + "<tr><td>computedStyleReturnsValuesForStaticlyPositionedElements:</td><td>") + js.detect.BrowserSupport.computedStyleReturnsValuesForStaticlyPositionedElements()) + "</td></tr>") + "<tr><td>isRgbaSupported:</td><td>") + js.detect.BrowserSupport.isRgbaSupported()) + "</td></tr>") + "<tr><td>isCssBorderRadiusSupported:</td><td>") + js.detect.BrowserSupport.isCssBorderRadiusSupported()) + "</td></tr>") + "<tr><td>isCanvasSupported:</td><td>") + js.detect.BrowserSupport.isCanvasSupported()) + "</td></tr>") + "<tr><td>elemenChildrenReturnsElementNodes:</td><td>") + js.detect.BrowserSupport.elemenChildrenReturnsElementNodes()) + "</td></tr>") + "<tr><td>isCssEnabled:</td><td>") + js.detect.BrowserSupport.isCssEnabled()) + "</td></tr>") + "<tr><td>isQuirksMode:</td><td>") + js.detect.BrowserSupport.isQuirksMode()) + "</td></tr>") + "<tr><td>isContainsBuggy:</td><td>") + js.detect.BrowserSupport.isContainsBuggy()) + "</td></tr>") + "<tr><td>isActivexEnabled:</td><td>") + js.detect.BrowserSupport.isActivexEnabled()) + "</td></tr>") + "<tr><td>typeofNodelistIsFunctionBug:</td><td>") + js.detect.BrowserSupport.typeofNodelistIsFunctionBug()) + "</td></tr>") + "<tr><td>getElementsByTagNameReturnsCommentNodesBug:</td><td>") + js.detect.BrowserSupport.getElementsByTagNameReturnsCommentNodesBug()) + "</td></tr>") + "<tr><td>setAttributeIgnoresNameAttributeBug:</td><td>") + js.detect.BrowserSupport.setAttributeIgnoresNameAttributeBug()) + "</td></tr>") + "<tr><td>elementPropertiesAreAttributesBug:</td><td>") + js.detect.BrowserSupport.elementPropertiesAreAttributesBug()) + "</td></tr>") + "<tr><td>isRegexpWhitespaceCharacterClassBug:</td><td>") + js.detect.BrowserSupport.isRegexpWhitespaceCharacterClassBug()) + "</td></tr>") + "<tr><td>isStringPrototypeSplitRegexpBug:</td><td>") + js.detect.BrowserSupport.isStringPrototypeSplitRegexpBug()) + "</td></tr>") + "<tr><td>preElementsIgnoreNewLinesBug:</td><td>") + js.detect.BrowserSupport.preElementsIgnoreNewLinesBug()) + "</td></tr>") + "<tr><td>selectElementInnerHtmlBug:</td><td>") + js.detect.BrowserSupport.selectElementInnerHtmlBug()) + "</td></tr>") + "<tr><td>tableElementInnerHtmlBug:</td><td>") + js.detect.BrowserSupport.tableElementInnerHtmlBug()) + "</td></tr>") + "<tr><td>scriptElementRejectsTextNodeAppendingBug:</td><td>") + js.detect.BrowserSupport.scriptElementRejectsTextNodeAppendingBug()) + "</td></tr>") + "<tr><td>documentGetElementByIdConfusesIdsWithNamesBug:</td><td>") + js.detect.BrowserSupport.documentGetElementByIdConfusesIdsWithNamesBug()) + "</td></tr>") + "<tr><td>documentGetElementByIdIgnoresCaseBug:</td><td>") + js.detect.BrowserSupport.documentGetElementByIdIgnoresCaseBug()) + "</td></tr>") + "<tr><td>offsetValuesForStaticElementsInsidePositionedOnesBug:</td><td>") + js.detect.BrowserSupport.offsetValuesForStaticElementsInsidePositionedOnesBug()) + "</td></tr>") + "<tr><td>isDocumentGetElementsByNameBug:</td><td>") + js.detect.BrowserSupport.isDocumentGetElementsByNameBug()) + "</td></tr>") + "<tr><td>isOverflowStyleBug:</td><td>") + js.detect.BrowserSupport.isOverflowStyleBug()) + "</td></tr>") + "<tr><td>isQuerySelectorAllBug:</td><td>") + js.detect.BrowserSupport.isQuerySelectorAllBug()) + "</td></tr>") + "<tr><td>html5AudioCanPlayType:</td><td>") + js.detect.BrowserSupport.html5Audio()) + "</td></tr>") + "<tr><td>html5AudioInMP3Format:</td><td>") + js.detect.BrowserSupport.html5AudioInMP3Format()) + "</td></tr>") + "<tr><td>html5AudioInVorbisFormat:</td><td>") + js.detect.BrowserSupport.html5AudioInVorbisFormat()) + "</td></tr>") + "<tr><td>html5AudioInWavFormat:</td><td>") + js.detect.BrowserSupport.html5AudioInWavFormat()) + "</td></tr>") + "<tr><td>html5AudioInAACFormat:</td><td>") + js.detect.BrowserSupport.html5AudioInAACFormat()) + "</td></tr>") + "<tr><td>html5Canvas:</td><td>") + js.detect.BrowserSupport.html5Canvas()) + "</td></tr>") + "<tr><td>html5CanvasTextAPI:</td><td>") + js.detect.BrowserSupport.html5CanvasTextAPI()) + "</td></tr>") + "<tr><td>html5Command:</td><td>") + js.detect.BrowserSupport.html5Command()) + "</td></tr>") + "<tr><td>html5Datalist:</td><td>") + js.detect.BrowserSupport.html5Datalist()) + "</td></tr>") + "<tr><td>html5Details:</td><td>") + js.detect.BrowserSupport.html5Details()) + "</td></tr>") + "<tr><td>html5Device:</td><td>") + js.detect.BrowserSupport.html5Device()) + "</td></tr>") + "<tr><td>html5FormConstraintValidation:</td><td>") + js.detect.BrowserSupport.html5FormConstraintValidation()) + "</td></tr>") + "<tr><td>html5IframeSandbox:</td><td>") + js.detect.BrowserSupport.html5IframeSandbox()) + "</td></tr>") + "<tr><td>html5IframeSrcdoc:</td><td>") + js.detect.BrowserSupport.html5IframeSrcdoc()) + "</td></tr>") + "<tr><td>html5InputAutofocus:</td><td>") + js.detect.BrowserSupport.html5InputAutofocus()) + "</td></tr>") + "<tr><td>html5InputPlaceholder:</td><td>") + js.detect.BrowserSupport.html5InputPlaceholder()) + "</td></tr>") + "<tr><td>html5InputTypeColor:</td><td>") + js.detect.BrowserSupport.html5InputTypeColor()) + "</td></tr>") + "<tr><td>html5InputTypeEmail:</td><td>") + js.detect.BrowserSupport.html5InputTypeEmail()) + "</td></tr>") + "<tr><td>html5InputTypeNumber:</td><td>") + js.detect.BrowserSupport.html5InputTypeNumber()) + "</td></tr>") + "<tr><td>html5InputTypeRange:</td><td>") + js.detect.BrowserSupport.html5InputTypeRange()) + "</td></tr>") + "<tr><td>html5InputTypeSearch:</td><td>") + js.detect.BrowserSupport.html5InputTypeSearch()) + "</td></tr>") + "<tr><td>html5InputTypeTel:</td><td>") + js.detect.BrowserSupport.html5InputTypeTel()) + "</td></tr>") + "<tr><td>html5InputTypeUrl:</td><td>") + js.detect.BrowserSupport.html5InputTypeUrl()) + "</td></tr>") + "<tr><td>html5InputTypeDate:</td><td>") + js.detect.BrowserSupport.html5InputTypeDate()) + "</td></tr>") + "<tr><td>html5InputTypeTime:</td><td>") + js.detect.BrowserSupport.html5InputTypeTime()) + "</td></tr>") + "<tr><td>html5InputTypeDatetime:</td><td>") + js.detect.BrowserSupport.html5InputTypeDatetime()) + "</td></tr>") + "<tr><td>html5InputTypeDatetimeLocal:</td><td>") + js.detect.BrowserSupport.html5InputTypeDatetimeLocal()) + "</td></tr>") + "<tr><td>html5InputTypeMonth:</td><td>") + js.detect.BrowserSupport.html5InputTypeMonth()) + "</td></tr>") + "<tr><td>html5InputTypeWeek:</td><td>") + js.detect.BrowserSupport.html5InputTypeWeek()) + "</td></tr>") + "<tr><td>html5Meter:</td><td>") + js.detect.BrowserSupport.html5Meter()) + "</td></tr>") + "<tr><td>html5Output:</td><td>") + js.detect.BrowserSupport.html5Output()) + "</td></tr>") + "<tr><td>html5Progress:</td><td>") + js.detect.BrowserSupport.html5Progress()) + "</td></tr>") + "<tr><td>html5Time:</td><td>") + js.detect.BrowserSupport.html5Time()) + "</td></tr>") + "<tr><td>html5Video:</td><td>") + js.detect.BrowserSupport.html5Video()) + "</td></tr>") + "<tr><td>html5VideoCaptions:</td><td>") + js.detect.BrowserSupport.html5VideoCaptions()) + "</td></tr>") + "<tr><td>html5VideoPoster:</td><td>") + js.detect.BrowserSupport.html5VideoPoster()) + "</td></tr>") + "<tr><td>html5VidouInWebMFormat:</td><td>") + js.detect.BrowserSupport.html5VidouInWebMFormat()) + "</td></tr>") + "<tr><td>html5VidouInH264Format:</td><td>") + js.detect.BrowserSupport.html5VidouInH264Format()) + "</td></tr>") + "<tr><td>html5VidouInTheoraFormat:</td><td>") + js.detect.BrowserSupport.html5VidouInTheoraFormat()) + "</td></tr>") + "<tr><td>html5ContentEditable:</td><td>") + js.detect.BrowserSupport.html5ContentEditable()) + "</td></tr>") + "<tr><td>html5CrossDocumentMessaging:</td><td>") + js.detect.BrowserSupport.html5CrossDocumentMessaging()) + "</td></tr>") + "<tr><td>html5DragAndDrop:</td><td>") + js.detect.BrowserSupport.html5DragAndDrop()) + "</td></tr>") + "<tr><td>html5FileApi:</td><td>") + js.detect.BrowserSupport.html5FileApi()) + "</td></tr>") + "<tr><td>html5Geolocation:</td><td>") + js.detect.BrowserSupport.html5Geolocation()) + "</td></tr>") + "<tr><td>html5History:</td><td>") + js.detect.BrowserSupport.html5History()) + "</td></tr>") + "<tr><td>html5LocalStorage:</td><td>") + js.detect.BrowserSupport.html5LocalStorage()) + "</td></tr>") + "<tr><td>html5Microdata:</td><td>") + js.detect.BrowserSupport.html5Microdata()) + "</td></tr>") + "<tr><td>html5OfflineWebApplications:</td><td>") + js.detect.BrowserSupport.html5OfflineWebApplications()) + "</td></tr>") + "<tr><td>html5ServerSentEvents:</td><td>") + js.detect.BrowserSupport.html5ServerSentEvents()) + "</td></tr>") + "<tr><td>html5SessionStorage:</td><td>") + js.detect.BrowserSupport.html5SessionStorage()) + "</td></tr>") + "<tr><td>html5SVG:</td><td>") + js.detect.BrowserSupport.html5SVG()) + "</td></tr>") + "<tr><td>html5SVGInTextHtml:</td><td>") + js.detect.BrowserSupport.html5SVGInTextHtml()) + "</td></tr>") + "<tr><td>html5WebSimpleDB:</td><td>") + js.detect.BrowserSupport.html5WebSimpleDB()) + "</td></tr>") + "<tr><td>html5WebSocket:</td><td>") + js.detect.BrowserSupport.html5WebSocket()) + "</td></tr>") + "<tr><td>html5WebSQLDatabase:</td><td>") + js.detect.BrowserSupport.html5WebSQLDatabase()) + "</td></tr>") + "<tr><td>html5WebWorkers:</td><td>") + js.detect.BrowserSupport.html5WebWorkers()) + "</td></tr>") + "<tr><td>html5Widgets:</td><td>") + js.detect.BrowserSupport.html5Widgets()) + "</td></tr>") + "<tr><td>html5Undo:</td><td>") + js.detect.BrowserSupport.html5Undo()) + "</td></tr>") + "</table>";
		js.Env.document.body.appendChild(div);
	});
}
hxrt.Demo.main = function() {
	haxe.framework.Injector.enter(function(c) {
		c.bind(haxe.time.ScheduledExecutor,haxe.time.ScheduledExecutorSystem);
		hxrt.Demo.iframeDemo();
		hxrt.Demo.browserSupportDemo();
	});
}
hxrt.Demo.prototype.__class__ = hxrt.Demo;
haxe.data.collections.Set = function(hasher,equal,map) { if( hasher === $_ ) return; {
	this.hasher = hasher;
	this.equal = equal;
	this._map = map;
}}
haxe.data.collections.Set.__name__ = ["haxe","data","collections","Set"];
haxe.data.collections.Set.OrderF = function(order) {
	return hxrt.OrderTypeclass.create({ compare : function(v1,v2) {
		var a1 = hxrt.IterableExtensions.toArray(v1);
		var a2 = hxrt.IterableExtensions.toArray(v2);
		a1.sort(order.compare);
		a2.sort(order.compare);
		return hxrt.ArrayExtensions.OrderF(hxrt.Array,order).compare(a1,a2);
	}});
}
haxe.data.collections.Set.EqualF = function(equal) {
	return hxrt.EqualTypeclass.create({ equal : function(v1,v2) {
		var all = haxe.functional.FoldableExtensions.concat(v1,v2);
		return all.getSize() == v1.getSize() && all.getSize() == v2.getSize();
	}});
}
haxe.data.collections.Set.ShowF = function(show) {
	return hxrt.ShowTypeclass.create({ show : function(v) {
		return "Set" + hxrt.IterableExtensions.toString(haxe.functional.FoldableExtensions.elements(v),show.show);
	}});
}
haxe.data.collections.Set.HasherF = function(hasher) {
	return hxrt.HasherTypeclass.create({ hash : function(v) {
		return v.foldl(393241,function(a,b) {
			return a + (hasher.hash(b) * 6151);
		});
	}});
}
haxe.data.collections.Set.create = function(hasher,equal) {
	hasher = (hasher == null?hxrt.DynamicExtensions.HasherF():hasher);
	equal = (equal == null?hxrt.DynamicExtensions.EqualF():equal);
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
	{ var $it0 = it.iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
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
	{ var $it0 = this._map.iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
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
	return haxe.functional.FoldableExtensions.iterator(this);
}
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
haxe.data.collections.Set.prototype.size = null;
haxe.data.collections.Set.prototype.toString = function() {
	return haxe.data.collections.Set.ShowF(hxrt.DynamicExtensions.ShowF()).show(this);
}
haxe.data.collections.Set.prototype.__class__ = haxe.data.collections.Set;
haxe.data.collections.Set.__interfaces__ = [haxe.data.collections.Collection];
hxrt.IntIter = function(min,max) { if( min === $_ ) return; {
	this.min = min;
	this.max = max;
}}
hxrt.IntIter.__name__ = ["IntIter"];
hxrt.IntIter.prototype.hasNext = function() {
	return this.min < this.max;
}
hxrt.IntIter.prototype.max = null;
hxrt.IntIter.prototype.min = null;
hxrt.IntIter.prototype.next = function() {
	return this.min++;
}
hxrt.IntIter.prototype.__class__ = hxrt.IntIter;
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
	return hxrt.Date.now().getTime() / 1000;
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
hxrt.EReg = function(r,opt) { if( r === $_ ) return; {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
}}
hxrt.EReg.__name__ = ["EReg"];
hxrt.EReg.prototype.customReplace = function(s,f) {
	var buf = new hxrt.StringBuf();
	while(true) {
		if(!this.match(s)) break;
		buf.b[buf.b.length] = this.matchedLeft();
		buf.b[buf.b.length] = f(this);
		s = this.matchedRight();
	}
	buf.b[buf.b.length] = s;
	return buf.b.join("");
}
hxrt.EReg.prototype.match = function(s) {
	this.r.m = this.r.exec(s);
	this.r.s = s;
	this.r.l = RegExp.leftContext;
	this.r.r = RegExp.rightContext;
	return (this.r.m != null);
}
hxrt.EReg.prototype.matched = function(n) {
	return (this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
		var $r;
		throw "EReg::matched";
		return $r;
	}(this)));
}
hxrt.EReg.prototype.matchedLeft = function() {
	if(this.r.m == null) throw "No string matched";
	if(this.r.l == null) return this.r.s.substr(0,this.r.m.index);
	return this.r.l;
}
hxrt.EReg.prototype.matchedPos = function() {
	if(this.r.m == null) throw "No string matched";
	return { pos : this.r.m.index, len : this.r.m[0].length}
}
hxrt.EReg.prototype.matchedRight = function() {
	if(this.r.m == null) throw "No string matched";
	if(this.r.r == null) {
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	return this.r.r;
}
hxrt.EReg.prototype.r = null;
hxrt.EReg.prototype.replace = function(s,by) {
	return s.replace(this.r,by);
}
hxrt.EReg.prototype.split = function(s) {
	var d = "#__delim__#";
	return s.replace(this.r,d).split(d);
}
hxrt.EReg.prototype.__class__ = hxrt.EReg;
if(!haxe.util) haxe.util = {}
haxe.util.StringExtensions = function() { }
haxe.util.StringExtensions.__name__ = ["haxe","util","StringExtensions"];
haxe.util.StringExtensions.chunk = function(str,len) {
	var start = 0;
	var end = hxrt.IntExtensions.min((start + len),str.length);
	return (end == 0?haxe.data.collections.List.nil(hxrt.StringExtensions.EqualF(hxrt.String)):(function($this) {
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
	return hxrt.IterableExtensions.toList(a,hxrt.StringExtensions.EqualF(hxrt.String));
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
hxrt.Std = function() { }
hxrt.Std.__name__ = ["Std"];
hxrt.Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
hxrt.Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
hxrt.Std["int"] = function(x) {
	if(x < 0) return hxrt.Math.ceil(x);
	return hxrt.Math.floor(x);
}
hxrt.Std.parseInt = function(x) {
	var v = parseInt(x);
	if(hxrt.Math.isNaN(v)) return null;
	return v;
}
hxrt.Std.parseFloat = function(x) {
	return parseFloat(x);
}
hxrt.Std.random = function(x) {
	return hxrt.Math.floor(hxrt.Math.random() * x);
}
hxrt.Std.prototype.__class__ = hxrt.Std;
haxe.data.collections.Map = function(khasher,kequal,vhasher,vequal,buckets,size) { if( khasher === $_ ) return; {
	var self = this;
	this.keyHasher = khasher;
	this.keyEqual = kequal;
	this.valueHasher = vhasher;
	this.valueEqual = vequal;
	this._size = size;
	this._buckets = buckets;
	this._pf = haxe.functional.PartialFunction1ImplExtensions.toPartialFunction([hxrt.Tuple2.create($closure(this,"containsKey"),function(k) {
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
				$r = hxrt.Stax.error("No value for this key");
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
haxe.data.collections.Map.OrderF = function(korder,vorder) {
	var keySorter = function(t1,t2) {
		return korder.compare(t1._1,t2._1);
	}
	return hxrt.OrderTypeclass.create({ compare : function(v1,v2) {
		var a1 = hxrt.IterableExtensions.toArray(v1);
		var a2 = hxrt.IterableExtensions.toArray(v2);
		a1.sort(keySorter);
		a2.sort(keySorter);
		return hxrt.ArrayExtensions.OrderF(hxrt.Array,hxrt.Tuple2.OrderF(korder,vorder)).compare(a1,a2);
	}});
}
haxe.data.collections.Map.EqualF = function(kequal,vequal) {
	return hxrt.EqualTypeclass.create({ equal : function(v1,v2) {
		var keys1 = v1.keySet();
		var keys2 = v2.keySet();
		if(!haxe.data.collections.Set.EqualF(kequal).equal(keys1,keys2)) return false;
		{ var $it0 = keys1.iterator();
		while( $it0.hasNext() ) { var key = $it0.next();
		{
			var v11 = hxrt.OptionExtensions.get(v1.get(key));
			var v21 = hxrt.OptionExtensions.get(v2.get(key));
			if(!vequal.equal(v11,v21)) return false;
		}
		}}
		return true;
	}});
}
haxe.data.collections.Map.ShowF = function(kshow,vshow) {
	return hxrt.ShowTypeclass.create({ show : function(v) {
		return "Map" + hxrt.IterableExtensions.toString(haxe.functional.FoldableExtensions.elements(v),function(t) {
			return (kshow.show(t._1) + " -> ") + vshow.show(t._2);
		});
	}});
}
haxe.data.collections.Map.HasherF = function(khasher,vhasher) {
	return hxrt.HasherTypeclass.create({ hash : function(v) {
		return v.foldl(786433,function(a,b) {
			return a + ((khasher.hash(b._1) * 49157 + 6151) * vhasher.hash(b._2));
		});
	}});
}
haxe.data.collections.Map.create = function(khasher,kequal,vhasher,vequal) {
	var keyHasher = (khasher == null?hxrt.DynamicExtensions.HasherF():khasher);
	var keyEqual = (kequal == null?hxrt.DynamicExtensions.EqualF():kequal);
	var valueHasher = (vhasher == null?hxrt.DynamicExtensions.HasherF():vhasher);
	var valueEqual = (vequal == null?hxrt.DynamicExtensions.EqualF():vequal);
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
	{ var $it0 = i.iterator();
	while( $it0.hasNext() ) { var t = $it0.next();
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
	var tupleEqual = hxrt.Tuple2.EqualF(this.keyEqual,this.valueEqual);
	{ var $it0 = this.entries().iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
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
					return hxrt.Option.Some(buckets[bucket][element++]);
				}
			}
			return hxrt.Option.None;
		}
		var nextValue = computeNextValue();
		return { hasNext : function() {
			return !hxrt.OptionExtensions.isEmpty(nextValue);
		}, next : function() {
			var value = nextValue;
			nextValue = computeNextValue();
			return hxrt.OptionExtensions.get(value);
		}}
	}}
	return iterable;
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
	{
		var _g = 0, _g1 = this.listFor(k);
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			if(this.keyEqual.equal(e._1,k)) {
				return hxrt.Option.Some(e._2);
			}
		}
	}
	return hxrt.Option.None;
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
	return haxe.functional.FoldableExtensions.iterator(this);
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
	return (this._buckets.length == 0?haxe.data.collections.Map.MaxLoad:hxrt.Math.round(this.getSize() / this._buckets.length));
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
	var newSize = hxrt.Math.round(this.getSize() / ((haxe.data.collections.Map.MaxLoad + haxe.data.collections.Map.MinLoad) / 2));
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
	return this.add(hxrt.Tuple2.create(k,v));
}
haxe.data.collections.Map.prototype.size = null;
haxe.data.collections.Map.prototype.toFunction = function() {
	return $closure(this,"get");
}
haxe.data.collections.Map.prototype.toString = function() {
	return haxe.data.collections.Map.ShowF(hxrt.DynamicExtensions.ShowF(),hxrt.DynamicExtensions.ShowF()).show(this);
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
haxe.data.collections.Map.__interfaces__ = [haxe.functional.PartialFunction1,haxe.data.collections.Collection];
hxrt.StringExtensions = function() { }
hxrt.StringExtensions.__name__ = ["StringExtensions"];
hxrt.StringExtensions.toBool = function(v,d) {
	if(v == null) return d;
	var vLower = v.toLowerCase();
	return hxrt.OptionExtensions.getOrElseC(((vLower == "false" || v == "0"?hxrt.Option.Some(false):(vLower == "true" || v == "1"?hxrt.Option.Some(true):hxrt.Option.None))),d);
}
hxrt.StringExtensions.toInt = function(v,d) {
	if(v == null) return d;
	return hxrt.OptionExtensions.getOrElseC(hxrt.OptionExtensions.filter(hxrt.OptionExtensions.toOption(hxrt.Std.parseInt(v)),function(i) {
		return !hxrt.Math.isNaN(i);
	}),d);
}
hxrt.StringExtensions.toFloat = function(v,d) {
	if(v == null) return d;
	return hxrt.OptionExtensions.getOrElseC(hxrt.OptionExtensions.filter(hxrt.OptionExtensions.toOption(hxrt.Std.parseFloat(v)),function(i) {
		return !hxrt.Math.isNaN(i);
	}),d);
}
hxrt.StringExtensions.startsWith = function(v,frag) {
	return (v.length >= frag.length && frag == v.substr(0,frag.length)?true:false);
}
hxrt.StringExtensions.endsWith = function(v,frag) {
	return (v.length >= frag.length && frag == v.substr(v.length - frag.length)?true:false);
}
hxrt.StringExtensions.urlEncode = function(v) {
	return hxrt.StringTools.urlEncode(v);
}
hxrt.StringExtensions.urlDecode = function(v) {
	return hxrt.StringTools.urlDecode(v);
}
hxrt.StringExtensions.htmlEscape = function(v) {
	return hxrt.StringTools.htmlEscape(v);
}
hxrt.StringExtensions.htmlUnescape = function(v) {
	return hxrt.StringTools.htmlUnescape(v);
}
hxrt.StringExtensions.trim = function(v) {
	return hxrt.StringTools.trim(v);
}
hxrt.StringExtensions.contains = function(v,s) {
	return v.indexOf(s) != -1;
}
hxrt.StringExtensions.replace = function(s,sub,by) {
	return hxrt.StringTools.replace(s,sub,by);
}
hxrt.StringExtensions.OrderF = function(c) {
	return hxrt.OrderTypeclass.create({ compare : function(v1,v2) {
		{
			var _g1 = 0, _g = hxrt.Std["int"](hxrt.Math.min(v1.length,v2.length));
			while(_g1 < _g) {
				var i = _g1++;
				var c1 = v1.charCodeAt(i) - v2.charCodeAt(i);
				if(c1 != 0) return c1;
			}
		}
		return v1.length - v2.length;
	}});
}
hxrt.StringExtensions.EqualF = function(c) {
	return hxrt.EqualTypeclass.create({ equal : function(v1,v2) {
		return v1 == v2;
	}});
}
hxrt.StringExtensions.ShowF = function(c) {
	return hxrt.ShowTypeclass.create({ show : function(v) {
		return v;
	}});
}
hxrt.StringExtensions.HasherF = function(c) {
	return hxrt.HasherTypeclass.create({ hash : function(v) {
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
hxrt.StringExtensions.prototype.__class__ = hxrt.StringExtensions;
hxrt.HasherTypeclass = function() { }
hxrt.HasherTypeclass.__name__ = ["HasherTypeclass"];
hxrt.HasherTypeclass.create = function(hasher) {
	return { hash : hasher.hash}
}
hxrt.HasherTypeclass.prototype.__class__ = hxrt.HasherTypeclass;
hxrt.ShowTypeclass = function() { }
hxrt.ShowTypeclass.__name__ = ["ShowTypeclass"];
hxrt.ShowTypeclass.create = function(show) {
	return { show : show.show}
}
hxrt.ShowTypeclass.prototype.__class__ = hxrt.ShowTypeclass;
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
		return hxrt.String(o);
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
			if(cl == hxrt.Array) return (o.__enum__ == null);
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
	case hxrt.Int:{
		return Math.ceil(o%2147483648.0) === o;
	}break;
	case hxrt.Float:{
		return typeof(o) == "number";
	}break;
	case hxrt.Bool:{
		return o === true || o === false;
	}break;
	case hxrt.String:{
		return typeof(o) == "string";
	}break;
	case hxrt.Dynamic:{
		return true;
	}break;
	default:{
		if(o == null) return false;
		return o.__enum__ == cl || (cl == hxrt.Class && o.__name__ != null) || (cl == hxrt.Enum && o.__ename__ != null);
	}break;
	}
}
js.Boot.__init = function() {
	js.Lib.isIE = (typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null);
	js.Lib.isOpera = (typeof window!='undefined' && window.opera != null);
	eval(js.Boot.__ns).Array = Array;
	eval(js.Boot.__ns).String = String;
	eval(js.Boot.__ns).Math = Math;
	eval(js.Boot.__ns).Date = Date;
	hxrt.Array.prototype.copy = hxrt.Array.prototype.slice;
	hxrt.Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	}
	hxrt.Array.prototype.remove = (hxrt.Array.prototype.indexOf?function(obj) {
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
	hxrt.Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}}
	}
	var cca = hxrt.String.prototype.charCodeAt;
	hxrt.String.prototype.cca = cca;
	hxrt.String.prototype.charCodeAt = function(i) {
		var x = cca.call(this,i);
		if(isNaN(x)) return null;
		return x;
	}
	var oldsub = hxrt.String.prototype.substr;
	hxrt.String.prototype.substr = function(pos,len) {
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
haxe.data.collections.Maps = function() { }
haxe.data.collections.Maps.__name__ = ["haxe","data","collections","Maps"];
haxe.data.collections.Maps.prototype.__class__ = haxe.data.collections.Maps;
if(!haxe.net) haxe.net = {}
haxe.net.UrlExtensions = function() { }
haxe.net.UrlExtensions.__name__ = ["haxe","net","UrlExtensions"];
haxe.net.UrlExtensions.toParsedUrl = function(s) {
	var nonNull = function(s1) {
		return (s1 == null?"":s1);
	}
	return (haxe.net.UrlExtensions.UrlPattern.match(s)?hxrt.Option.Some(haxe.net.UrlExtensions.formUrl(nonNull(haxe.net.UrlExtensions.UrlPattern.matched(haxe.net.UrlExtensions.Protocol)),nonNull(haxe.net.UrlExtensions.UrlPattern.matched(haxe.net.UrlExtensions.Hostname)),nonNull(haxe.net.UrlExtensions.UrlPattern.matched(haxe.net.UrlExtensions.Port)),nonNull(haxe.net.UrlExtensions.UrlPattern.matched(haxe.net.UrlExtensions.Pathname)),nonNull(haxe.net.UrlExtensions.UrlPattern.matched(haxe.net.UrlExtensions.Search)),nonNull(haxe.net.UrlExtensions.UrlPattern.matched(haxe.net.UrlExtensions.Hash)))):hxrt.Option.None);
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
	var filePattern = new hxrt.EReg("[/]([^/]*)$","i");
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
	return hxrt.StringExtensions.toInt(haxe.net.UrlExtensions.extractField(url,"port"));
}
haxe.net.UrlExtensions.toQueryParameters = function(query) {
	return (!hxrt.StringExtensions.startsWith(query,"?")?haxe.data.collections.Maps.StringString:hxrt.ArrayExtensions.foldl(hxrt.ArrayExtensions.flatMap(query.substr(1).split("&"),function(kv) {
		var a = hxrt.ArrayExtensions.map(kv.split("="),function(s) {
			return hxrt.StringExtensions.urlDecode(s);
		});
		return (a.length == 0?[]:(a.length == 1?[hxrt.DynamicExtensions.entuple(a[0],"")]:[hxrt.DynamicExtensions.entuple(a[0],a[1])]));
	}),haxe.data.collections.Maps.StringString,function(m,t) {
		return m.add(t);
	}));
}
haxe.net.UrlExtensions.toQueryString = function(query) {
	return query.foldl("?",function(url,tuple) {
		var fieldName = tuple._1;
		var fieldValue = tuple._2;
		var rest = (hxrt.StringTools.urlEncode(fieldName) + "=") + hxrt.StringTools.urlEncode(fieldValue);
		return url + ((url == "?"?rest:"&" + rest));
	});
}
haxe.net.UrlExtensions.formUrl = function(protocol,hostname,port,pathname,search,hash) {
	var host = hostname + ((port == ""?"":":" + port));
	var $final = ((host + pathname) + search) + hash;
	return { hash : hash, host : host, hostname : hostname, href : (protocol.length > 0?((protocol + "//") + $final):$final), pathname : pathname, port : port, protocol : protocol, search : search}
}
haxe.net.UrlExtensions.extractField = function(url,field) {
	return hxrt.OptionExtensions.getOrElseC(hxrt.OptionExtensions.map(haxe.net.UrlExtensions.toParsedUrl(url),function(parsed) {
		return hxrt.Reflect.field(parsed,field);
	}),"");
}
haxe.net.UrlExtensions.prototype.__class__ = haxe.net.UrlExtensions;
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
hxrt.ValueType = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
hxrt.ValueType.TBool = ["TBool",3];
hxrt.ValueType.TBool.toString = $estr;
hxrt.ValueType.TBool.__enum__ = hxrt.ValueType;
hxrt.ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = hxrt.ValueType; $x.toString = $estr; return $x; }
hxrt.ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = hxrt.ValueType; $x.toString = $estr; return $x; }
hxrt.ValueType.TFloat = ["TFloat",2];
hxrt.ValueType.TFloat.toString = $estr;
hxrt.ValueType.TFloat.__enum__ = hxrt.ValueType;
hxrt.ValueType.TFunction = ["TFunction",5];
hxrt.ValueType.TFunction.toString = $estr;
hxrt.ValueType.TFunction.__enum__ = hxrt.ValueType;
hxrt.ValueType.TInt = ["TInt",1];
hxrt.ValueType.TInt.toString = $estr;
hxrt.ValueType.TInt.__enum__ = hxrt.ValueType;
hxrt.ValueType.TNull = ["TNull",0];
hxrt.ValueType.TNull.toString = $estr;
hxrt.ValueType.TNull.__enum__ = hxrt.ValueType;
hxrt.ValueType.TObject = ["TObject",4];
hxrt.ValueType.TObject.toString = $estr;
hxrt.ValueType.TObject.__enum__ = hxrt.ValueType;
hxrt.ValueType.TUnknown = ["TUnknown",8];
hxrt.ValueType.TUnknown.toString = $estr;
hxrt.ValueType.TUnknown.__enum__ = hxrt.ValueType;
hxrt.Type = function() { }
hxrt.Type.__name__ = ["Type"];
hxrt.Type.getClass = function(o) {
	if(o == null) return null;
	if(o.__enum__ != null) return null;
	return o.__class__;
}
hxrt.Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
}
hxrt.Type.getSuperClass = function(c) {
	return c.__super__;
}
hxrt.Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
hxrt.Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
hxrt.Type.resolveClass = function(name) {
	var cl;
	try {
		if(name.indexOf(".") < 0) cl = eval((js.Boot.__ns + ".") + name);
		else cl = eval(name);
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
hxrt.Type.resolveEnum = function(name) {
	var e;
	try {
		if(name.indexOf(".") < 0) e = eval((js.Boot.__ns + ".") + name);
		else e = eval(name);
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
hxrt.Type.createInstance = function(cl,args) {
	if(args.length <= 3) return new cl(args[0],args[1],args[2]);
	if(args.length > 8) throw "Too many arguments";
	return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
}
hxrt.Type.createEmptyInstance = function(cl) {
	return new cl($_);
}
hxrt.Type.createEnum = function(e,constr,params) {
	var f = hxrt.Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(hxrt.Reflect.isFunction(f)) {
		if(params == null) throw ("Constructor " + constr) + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw ("Constructor " + constr) + " does not need parameters";
	return f;
}
hxrt.Type.createEnumIndex = function(e,index,params) {
	var c = hxrt.Type.getEnumConstructs(e)[index];
	if(c == null) throw index + " is not a valid enum constructor index";
	return hxrt.Type.createEnum(e,c,params);
}
hxrt.Type.getInstanceFields = function(c) {
	var a = hxrt.Reflect.fields(c.prototype);
	a.remove("__class__");
	return a;
}
hxrt.Type.getClassFields = function(c) {
	var a = hxrt.Reflect.fields(c);
	a.remove("__name__");
	a.remove("__interfaces__");
	a.remove("__super__");
	a.remove("prototype");
	return a;
}
hxrt.Type.getEnumConstructs = function(e) {
	return e.__constructs__;
}
hxrt.Type["typeof"] = function(v) {
	switch(typeof(v)) {
	case "boolean":{
		return hxrt.ValueType.TBool;
	}break;
	case "string":{
		return hxrt.ValueType.TClass(hxrt.String);
	}break;
	case "number":{
		if(hxrt.Math.ceil(v) == v % 2147483648.0) return hxrt.ValueType.TInt;
		return hxrt.ValueType.TFloat;
	}break;
	case "object":{
		if(v == null) return hxrt.ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return hxrt.ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return hxrt.ValueType.TClass(c);
		return hxrt.ValueType.TObject;
	}break;
	case "function":{
		if(v.__name__ != null) return hxrt.ValueType.TObject;
		return hxrt.ValueType.TFunction;
	}break;
	case "undefined":{
		return hxrt.ValueType.TNull;
	}break;
	default:{
		return hxrt.ValueType.TUnknown;
	}break;
	}
}
hxrt.Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		{
			var _g1 = 2, _g = a.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(!hxrt.Type.enumEq(a[i],b[i])) return false;
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
hxrt.Type.enumConstructor = function(e) {
	return e[0];
}
hxrt.Type.enumParameters = function(e) {
	return e.slice(2);
}
hxrt.Type.enumIndex = function(e) {
	return e[1];
}
hxrt.Type.prototype.__class__ = hxrt.Type;
if(!haxe.time) haxe.time = {}
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
	var future = new hxrt.Future();
	var timer = new haxe.Timer(ms);
	future.ifCanceled($closure(timer,"stop"));
	timer.run = f;
	return future;
}
haxe.time.ScheduledExecutorSystem.prototype.once = function(f,ms) {
	var run = false;
	var future = new hxrt.Future();
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
	var future = new hxrt.Future();
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
	var future = new hxrt.Future();
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
hxrt.BoolExtensions = function() { }
hxrt.BoolExtensions.__name__ = ["BoolExtensions"];
hxrt.BoolExtensions.toInt = function(v) {
	return (v?1:0);
}
hxrt.BoolExtensions.toString = function(v) {
	return hxrt.Std.string(v);
}
hxrt.BoolExtensions.ifTrue = function(v,f) {
	return (v?hxrt.Option.Some(f()):hxrt.Option.None);
}
hxrt.BoolExtensions.ifFalse = function(v,f) {
	return (!v?hxrt.Option.Some(f()):hxrt.Option.None);
}
hxrt.BoolExtensions.ifElse = function(v,f1,f2) {
	return (v?f1():f2());
}
hxrt.BoolExtensions.OrderF = function(c) {
	return hxrt.OrderTypeclass.create({ compare : function(v1,v2) {
		return (!v1 && v2?-1:(v1 && !v2?1:0));
	}});
}
hxrt.BoolExtensions.EqualF = function(c) {
	return hxrt.EqualTypeclass.create({ equal : function(v1,v2) {
		return hxrt.BoolExtensions.OrderF(c).compare(v1,v2) == 0;
	}});
}
hxrt.BoolExtensions.ShowF = function(c) {
	return hxrt.ShowTypeclass.create({ show : function(v) {
		return (v?"true":"false");
	}});
}
hxrt.BoolExtensions.HasherF = function(c) {
	return hxrt.HasherTypeclass.create({ hash : function(v) {
		return (v?786433:393241);
	}});
}
hxrt.BoolExtensions.prototype.__class__ = hxrt.BoolExtensions;
hxrt.IntExtensions = function() { }
hxrt.IntExtensions.__name__ = ["IntExtensions"];
hxrt.IntExtensions.max = function(v1,v2) {
	return (v2 > v1?v2:v1);
}
hxrt.IntExtensions.min = function(v1,v2) {
	return (v2 < v1?v2:v1);
}
hxrt.IntExtensions.toBool = function(v) {
	return (v == 0?false:true);
}
hxrt.IntExtensions.toFloat = function(v) {
	return v;
}
hxrt.IntExtensions.toString = function(v) {
	return hxrt.Std.string(v);
}
hxrt.IntExtensions.to = function(start,end) {
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
hxrt.IntExtensions.until = function(start,end) {
	return hxrt.IntExtensions.to(start,end - 1);
}
hxrt.IntExtensions.OrderF = function(c) {
	return hxrt.OrderTypeclass.create({ compare : function(v1,v2) {
		return v1 - v2;
	}});
}
hxrt.IntExtensions.EqualF = function(c) {
	return hxrt.EqualTypeclass.create({ equal : function(v1,v2) {
		return hxrt.IntExtensions.OrderF(c).compare(v1,v2) == 0;
	}});
}
hxrt.IntExtensions.ShowF = function(c) {
	return hxrt.ShowTypeclass.create({ show : function(v) {
		return hxrt.Std.string(v);
	}});
}
hxrt.IntExtensions.HasherF = function(c) {
	return hxrt.HasherTypeclass.create({ hash : function(v) {
		return v * 196613;
	}});
}
hxrt.IntExtensions.prototype.__class__ = hxrt.IntExtensions;
hxrt.FloatExtensions = function() { }
hxrt.FloatExtensions.__name__ = ["FloatExtensions"];
hxrt.FloatExtensions.round = function(v) {
	return hxrt.Math.round(v);
}
hxrt.FloatExtensions.max = function(v1,v2) {
	return (v2 > v1?v2:v1);
}
hxrt.FloatExtensions.min = function(v1,v2) {
	return (v2 < v1?v2:v1);
}
hxrt.FloatExtensions.toInt = function(v) {
	return hxrt.Std["int"](v);
}
hxrt.FloatExtensions.toString = function(v) {
	return hxrt.Std.string(v);
}
hxrt.FloatExtensions.OrderF = function(c) {
	return hxrt.OrderTypeclass.create({ compare : function(v1,v2) {
		return (v1 < v2?-1:(v2 > v1?1:0));
	}});
}
hxrt.FloatExtensions.EqualF = function(c) {
	return hxrt.EqualTypeclass.create({ equal : function(v1,v2) {
		return hxrt.FloatExtensions.OrderF(c).compare(v1,v2) == 0;
	}});
}
hxrt.FloatExtensions.ShowF = function(c) {
	return hxrt.ShowTypeclass.create({ show : function(v) {
		return hxrt.Std.string(v);
	}});
}
hxrt.FloatExtensions.HasherF = function(c) {
	return hxrt.HasherTypeclass.create({ hash : function(v) {
		return hxrt.Std["int"](v * 98317);
	}});
}
hxrt.FloatExtensions.prototype.__class__ = hxrt.FloatExtensions;
hxrt.DateExtensions = function() { }
hxrt.DateExtensions.__name__ = ["DateExtensions"];
hxrt.DateExtensions.toString = function(v) {
	return hxrt.Std.string(v);
}
hxrt.DateExtensions.OrderF = function(c) {
	return hxrt.OrderTypeclass.create({ compare : function(v1,v2) {
		var diff = v1.getTime() - v2.getTime();
		return (diff < 0?-1:(diff > 0?1:0));
	}});
}
hxrt.DateExtensions.EqualF = function(c) {
	return hxrt.EqualTypeclass.create({ equal : function(v1,v2) {
		return v1.getTime() == v2.getTime();
	}});
}
hxrt.DateExtensions.ShowF = function(c) {
	return hxrt.ShowTypeclass.create({ show : function(v) {
		return v.toString();
	}});
}
hxrt.DateExtensions.HasherF = function(c) {
	return hxrt.HasherTypeclass.create({ hash : function(v) {
		return hxrt.Math.round(v.getTime() * 49157);
	}});
}
hxrt.DateExtensions.prototype.__class__ = hxrt.DateExtensions;
hxrt.ArrayExtensions = function() { }
hxrt.ArrayExtensions.__name__ = ["ArrayExtensions"];
hxrt.ArrayExtensions.OrderF = function(c,order) {
	return hxrt.OrderTypeclass.create({ compare : function(v1,v2) {
		{
			var _g1 = 0, _g = hxrt.Std["int"](hxrt.Math.min(v1.length,v2.length));
			while(_g1 < _g) {
				var i = _g1++;
				var c1 = order.compare(v1[i],v2[i]);
				if(c1 != 0) return c1;
			}
		}
		return v1.length - v2.length;
	}});
}
hxrt.ArrayExtensions.EqualF = function(c,equal) {
	return hxrt.EqualTypeclass.create({ equal : function(v1,v2) {
		if(v1.length != v2.length) return false;
		{
			var _g1 = 0, _g = hxrt.Std["int"](hxrt.Math.min(v1.length,v2.length));
			while(_g1 < _g) {
				var i = _g1++;
				if(!equal.equal(v1[i],v2[i])) return false;
			}
		}
		return true;
	}});
}
hxrt.ArrayExtensions.ShowF = function(c,show) {
	return hxrt.ShowTypeclass.create({ show : function(v) {
		return ("[" + hxrt.ArrayExtensions.map(v,function(e) {
			return show.show(e);
		}).join(", ")) + "]";
	}});
}
hxrt.ArrayExtensions.HasherF = function(c,hasher) {
	return hxrt.HasherTypeclass.create({ hash : function(v) {
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
hxrt.ArrayExtensions.filter = function(a,f) {
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
hxrt.ArrayExtensions.size = function(a) {
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
hxrt.ArrayExtensions.map = function(a,f) {
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
hxrt.ArrayExtensions.flatMap = function(a,f) {
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
hxrt.ArrayExtensions.foldl = function(a,z,f) {
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
hxrt.ArrayExtensions.foldr = function(a,z,f) {
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
hxrt.ArrayExtensions.zip = function(a,b) {
	var len = hxrt.Math.floor(hxrt.Math.min(a.length,b.length));
	var r = [];
	{
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			r.push(hxrt.Tuple2.create(a[i],b[i]));
		}
	}
	return r;
}
hxrt.ArrayExtensions.append = function(a,t) {
	var copy = hxrt.ArrayExtensions.snapshot(a);
	copy.push(t);
	return copy;
}
hxrt.ArrayExtensions.snapshot = function(a) {
	return [].concat(a);
}
hxrt.ArrayExtensions.first = function(a) {
	return a[0];
}
hxrt.ArrayExtensions.firstOption = function(a) {
	return (a.length == 0?hxrt.Option.None:hxrt.Option.Some(a[0]));
}
hxrt.ArrayExtensions.last = function(a) {
	return a[a.length - 1];
}
hxrt.ArrayExtensions.lastOption = function(a) {
	return (a.length == 0?hxrt.Option.None:hxrt.Option.Some(a[a.length - 1]));
}
hxrt.ArrayExtensions.contains = function(a,t) {
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
hxrt.ArrayExtensions.foreach = function(a,f) {
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
hxrt.ArrayExtensions.prototype.__class__ = hxrt.ArrayExtensions;
hxrt.Function0Extensions = function() { }
hxrt.Function0Extensions.__name__ = ["Function0Extensions"];
hxrt.Function0Extensions.swallow = function(f) {
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
hxrt.Function0Extensions.thenDo = function(f1,f2) {
	return function() {
		f1();
		f2();
	}
}
hxrt.Function0Extensions.promote = function(f) {
	return function(a) {
		return f();
	}
}
hxrt.Function0Extensions.promoteEffect = function(f) {
	return function(a) {
		f();
	}
}
hxrt.Function0Extensions.stage = function(f,before,after) {
	var state = before();
	var result = f();
	after(state);
	return result;
}
hxrt.Function0Extensions.prototype.__class__ = hxrt.Function0Extensions;
hxrt.Function2Extensions = function() { }
hxrt.Function2Extensions.__name__ = ["Function2Extensions"];
hxrt.Function2Extensions.swallow = function(f) {
	return function(a,b) {
		try {
			f(a,b);
		}
		catch( $e0 ) {
			{
				var e = $e0;
				null;
			}
		}
	}
}
hxrt.Function2Extensions.flip = function(f) {
	return function(p2,p1) {
		return f(p1,p2);
	}
}
hxrt.Function2Extensions.curry = function(f) {
	return function(p1) {
		return function(p2) {
			return f(p1,p2);
		}
	}
}
hxrt.Function2Extensions.uncurry = function(f) {
	return function(p1,p2) {
		return (f(p1))(p2);
	}
}
hxrt.Function2Extensions.lazy = function(f,p1,p2) {
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
hxrt.Function2Extensions.prototype.__class__ = hxrt.Function2Extensions;
hxrt.Function3Extensions = function() { }
hxrt.Function3Extensions.__name__ = ["Function3Extensions"];
hxrt.Function3Extensions.swallow = function(f) {
	return function(a,b,c) {
		try {
			f(a,b,c);
		}
		catch( $e0 ) {
			{
				var e = $e0;
				null;
			}
		}
	}
}
hxrt.Function3Extensions.curry = function(f) {
	return function(p1) {
		return function(p2) {
			return function(p3) {
				return f(p1,p2,p3);
			}
		}
	}
}
hxrt.Function3Extensions.uncurry = function(f) {
	return function(p1,p2,p3) {
		return ((f(p1))(p2))(p3);
	}
}
hxrt.Function3Extensions.lazy = function(f,p1,p2,p3) {
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
hxrt.Function3Extensions.prototype.__class__ = hxrt.Function3Extensions;
hxrt.Function4Extensions = function() { }
hxrt.Function4Extensions.__name__ = ["Function4Extensions"];
hxrt.Function4Extensions.swallow = function(f) {
	return function(a,b,c,d) {
		try {
			f(a,b,c,d);
		}
		catch( $e0 ) {
			{
				var e = $e0;
				null;
			}
		}
	}
}
hxrt.Function4Extensions.curry = function(f) {
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
hxrt.Function4Extensions.uncurry = function(f) {
	return function(p1,p2,p3,p4) {
		return (((f(p1))(p2))(p3))(p4);
	}
}
hxrt.Function4Extensions.lazy = function(f,p1,p2,p3,p4) {
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
hxrt.Function4Extensions.prototype.__class__ = hxrt.Function4Extensions;
hxrt.Function5Extensions = function() { }
hxrt.Function5Extensions.__name__ = ["Function5Extensions"];
hxrt.Function5Extensions.swallow = function(f) {
	return function(a,b,c,d,e) {
		try {
			f(a,b,c,d,e);
		}
		catch( $e0 ) {
			{
				var e1 = $e0;
				null;
			}
		}
	}
}
hxrt.Function5Extensions.curry = function(f) {
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
hxrt.Function5Extensions.uncurry = function(f) {
	return function(p1,p2,p3,p4,p5) {
		return ((((f(p1))(p2))(p3))(p4))(p5);
	}
}
hxrt.Function5Extensions.lazy = function(f,p1,p2,p3,p4,p5) {
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
hxrt.Function5Extensions.prototype.__class__ = hxrt.Function5Extensions;
hxrt.OptionExtensions = function() { }
hxrt.OptionExtensions.__name__ = ["OptionExtensions"];
hxrt.OptionExtensions.OrderF = function(c,order) {
	return hxrt.OrderTypeclass.create({ compare : function(v1,v2) {
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
hxrt.OptionExtensions.EqualF = function(c,equal) {
	return hxrt.EqualTypeclass.create({ equal : function(v1,v2) {
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
hxrt.OptionExtensions.ShowF = function(c,show) {
	return hxrt.ShowTypeclass.create({ show : function(v) {
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
hxrt.OptionExtensions.HasherF = function(c,hasher) {
	return hxrt.HasherTypeclass.create({ hash : function(v) {
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
hxrt.OptionExtensions.toOption = function(t) {
	return (t == null?hxrt.Option.None:hxrt.Option.Some(t));
}
hxrt.OptionExtensions.toArray = function(o) {
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
hxrt.OptionExtensions.map = function(o,f) {
	return (function($this) {
		var $r;
		var $e = (o);
		switch( $e[1] ) {
		case 0:
		{
			$r = hxrt.Option.None;
		}break;
		case 1:
		var v = $e[2];
		{
			$r = hxrt.Option.Some(f(v));
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
hxrt.OptionExtensions.foreach = function(o,f) {
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
hxrt.OptionExtensions.filter = function(o,f) {
	return (function($this) {
		var $r;
		var $e = (o);
		switch( $e[1] ) {
		case 0:
		{
			$r = hxrt.Option.None;
		}break;
		case 1:
		var v = $e[2];
		{
			$r = (f(v)?hxrt.Option.Some(v):hxrt.Option.None);
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
hxrt.OptionExtensions.flatMap = function(o,f) {
	return (function($this) {
		var $r;
		var $e = (o);
		switch( $e[1] ) {
		case 0:
		{
			$r = hxrt.Option.None;
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
					$r = hxrt.Option.None;
				}break;
				case 1:
				var v2 = $e[2];
				{
					$r = hxrt.Option.Some(v2);
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
hxrt.OptionExtensions.zip = function(o1,o2) {
	return (function($this) {
		var $r;
		var $e = (o1);
		switch( $e[1] ) {
		case 0:
		{
			$r = hxrt.Option.None;
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
					$r = hxrt.Option.None;
				}break;
				case 1:
				var v2 = $e[2];
				{
					$r = hxrt.Option.Some(hxrt.DynamicExtensions.entuple(v1,v2));
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
hxrt.OptionExtensions.get = function(o) {
	return (function($this) {
		var $r;
		var $e = (o);
		switch( $e[1] ) {
		case 0:
		{
			$r = hxrt.Stax.error("Error: Option is empty");
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
hxrt.OptionExtensions.orElse = function(o1,thunk) {
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
hxrt.OptionExtensions.orElseC = function(o1,o2) {
	return hxrt.OptionExtensions.orElse(o1,hxrt.DynamicExtensions.toThunk(o2));
}
hxrt.OptionExtensions.orEither = function(o1,thunk) {
	return (function($this) {
		var $r;
		var $e = (o1);
		switch( $e[1] ) {
		case 0:
		{
			$r = hxrt.EitherExtensions.toRight(thunk());
		}break;
		case 1:
		var v = $e[2];
		{
			$r = hxrt.EitherExtensions.toLeft(v);
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
hxrt.OptionExtensions.orEitherC = function(o1,c) {
	return hxrt.OptionExtensions.orEither(o1,hxrt.DynamicExtensions.toThunk(c));
}
hxrt.OptionExtensions.getOrElse = function(o,thunk) {
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
hxrt.OptionExtensions.getOrElseC = function(o,c) {
	return hxrt.OptionExtensions.getOrElse(o,hxrt.DynamicExtensions.toThunk(c));
}
hxrt.OptionExtensions.isEmpty = function(o) {
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
hxrt.OptionExtensions.prototype.__class__ = hxrt.OptionExtensions;
hxrt.EitherExtensions = function() { }
hxrt.EitherExtensions.__name__ = ["EitherExtensions"];
hxrt.EitherExtensions.OrderF = function(c,order1,order2) {
	return hxrt.OrderTypeclass.create({ compare : function(e1,e2) {
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
hxrt.EitherExtensions.EqualF = function(c,equal1,equal2) {
	return hxrt.EqualTypeclass.create({ equal : function(e1,e2) {
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
hxrt.EitherExtensions.ShowF = function(c,show1,show2) {
	return hxrt.ShowTypeclass.create({ show : function(e) {
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
hxrt.EitherExtensions.HasherF = function(c,hash1,hash2) {
	return hxrt.HasherTypeclass.create({ hash : function(e) {
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
hxrt.EitherExtensions.toLeft = function(v) {
	return hxrt.Either.Left(v);
}
hxrt.EitherExtensions.toRight = function(v) {
	return hxrt.Either.Right(v);
}
hxrt.EitherExtensions.flip = function(e) {
	return (function($this) {
		var $r;
		var $e = (e);
		switch( $e[1] ) {
		case 0:
		var v = $e[2];
		{
			$r = hxrt.Either.Right(v);
		}break;
		case 1:
		var v = $e[2];
		{
			$r = hxrt.Either.Left(v);
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
hxrt.EitherExtensions.left = function(e) {
	return (function($this) {
		var $r;
		var $e = (e);
		switch( $e[1] ) {
		case 0:
		var v = $e[2];
		{
			$r = hxrt.Option.Some(v);
		}break;
		default:{
			$r = hxrt.Option.None;
		}break;
		}
		return $r;
	}(this));
}
hxrt.EitherExtensions.isLeft = function(e) {
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
hxrt.EitherExtensions.isRight = function(e) {
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
hxrt.EitherExtensions.right = function(e) {
	return (function($this) {
		var $r;
		var $e = (e);
		switch( $e[1] ) {
		case 1:
		var v = $e[2];
		{
			$r = hxrt.Option.Some(v);
		}break;
		default:{
			$r = hxrt.Option.None;
		}break;
		}
		return $r;
	}(this));
}
hxrt.EitherExtensions.get = function(e) {
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
hxrt.EitherExtensions.mapLeft = function(e,f) {
	return (function($this) {
		var $r;
		var $e = (e);
		switch( $e[1] ) {
		case 0:
		var v = $e[2];
		{
			$r = hxrt.Either.Left(f(v));
		}break;
		case 1:
		var v = $e[2];
		{
			$r = hxrt.Either.Right(v);
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
hxrt.EitherExtensions.map = function(e,f1,f2) {
	return (function($this) {
		var $r;
		var $e = (e);
		switch( $e[1] ) {
		case 0:
		var v = $e[2];
		{
			$r = hxrt.Either.Left(f1(v));
		}break;
		case 1:
		var v = $e[2];
		{
			$r = hxrt.Either.Right(f2(v));
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
hxrt.EitherExtensions.mapRight = function(e,f) {
	return (function($this) {
		var $r;
		var $e = (e);
		switch( $e[1] ) {
		case 0:
		var v = $e[2];
		{
			$r = hxrt.Either.Left(v);
		}break;
		case 1:
		var v = $e[2];
		{
			$r = hxrt.Either.Right(f(v));
		}break;
		default:{
			$r = null;
		}break;
		}
		return $r;
	}(this));
}
hxrt.EitherExtensions.flatMap = function(e,f1,f2) {
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
hxrt.EitherExtensions.composeLeft = function(e1,e2,ac,bc) {
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
					$r = hxrt.Either.Left(ac(v1,v2));
				}break;
				case 1:
				var v2 = $e[2];
				{
					$r = hxrt.Either.Left(v1);
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
					$r = hxrt.Either.Left(v2);
				}break;
				case 1:
				var v2 = $e[2];
				{
					$r = hxrt.Either.Right(bc(v1,v2));
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
hxrt.EitherExtensions.composeRight = function(e1,e2,ac,bc) {
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
					$r = hxrt.Either.Left(ac(v1,v2));
				}break;
				case 1:
				var v2 = $e[2];
				{
					$r = hxrt.Either.Right(v2);
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
					$r = hxrt.Either.Right(v1);
				}break;
				case 1:
				var v2 = $e[2];
				{
					$r = hxrt.Either.Right(bc(v1,v2));
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
hxrt.EitherExtensions.prototype.__class__ = hxrt.EitherExtensions;
hxrt.FutureExtensions = function() { }
hxrt.FutureExtensions.__name__ = ["FutureExtensions"];
hxrt.FutureExtensions.toFuture = function(t) {
	return hxrt.Future.create().deliver(t);
}
hxrt.FutureExtensions.prototype.__class__ = hxrt.FutureExtensions;
hxrt.IterableExtensions = function() { }
hxrt.IterableExtensions.__name__ = ["IterableExtensions"];
hxrt.IterableExtensions.toString = function(i,show,prefix,suffix,sep) {
	if(sep == null) sep = ", ";
	if(suffix == null) suffix = ")";
	if(prefix == null) prefix = "(";
	return hxrt.IterableExtensions.mkString(i,show,prefix,suffix,sep);
}
hxrt.IterableExtensions.mkString = function(i,show,prefix,suffix,sep) {
	if(sep == null) sep = ", ";
	if(suffix == null) suffix = ")";
	if(prefix == null) prefix = "(";
	if(show == null) show = $closure(hxrt.Std,"string");
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
hxrt.IterableExtensions.toList = function(i,equal) {
	return haxe.data.collections.List.create(equal).addAll(i);
}
hxrt.IterableExtensions.toSet = function(i,hash,equal) {
	return haxe.data.collections.Set.create(hash,equal).addAll(i);
}
hxrt.IterableExtensions.toMap = function(i,khash,kequal,vhash,vequal) {
	return haxe.data.collections.Map.create(khash,kequal,vhash,vequal).addAll(i);
}
hxrt.IterableExtensions.toArray = function(i) {
	var a = [];
	{ var $it0 = i.iterator();
	while( $it0.hasNext() ) { var e = $it0.next();
	a.push(e);
	}}
	return a;
}
hxrt.IterableExtensions.prototype.__class__ = hxrt.IterableExtensions;
hxrt.OrderTypeclass = function() { }
hxrt.OrderTypeclass.__name__ = ["OrderTypeclass"];
hxrt.OrderTypeclass.create = function(cmp) {
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
hxrt.OrderTypeclass.prototype.__class__ = hxrt.OrderTypeclass;
if(!js.detect) js.detect = {}
js.detect.BrowserSupport = function() { }
js.detect.BrowserSupport.__name__ = ["js","detect","BrowserSupport"];
js.detect.BrowserSupport.cssTransformationSupported = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("cssTransformationSupported",function(v) {
		var isSupported = hxrt.Option.None;
		var docEl = js.Env.document.documentElement;
		if(docEl != null) {
			var s = docEl.style;
			isSupported = hxrt.Option.Some(js.Env.isDefined(s.WebkitTransform) || js.Env.isDefined(s.MozTransform));
		}
		return isSupported;
	});
}
js.detect.BrowserSupport.elementTagnameUppercased = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("elementTagnameUppercased",function(v) {
		var isUppercased = hxrt.Option.None;
		var docEl = js.Env.document.documentElement;
		if(docEl != null) {
			isUppercased = hxrt.Option.Some("HTML" == docEl.nodeName);
		}
		return isUppercased;
	});
}
js.detect.BrowserSupport.querySelectorIgnoresCapitalizedValuesBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("querySelectorIgnoresCapitalizedValuesBug",function(v) {
		var result = hxrt.Option.None;
		if($closure(js.Env.document,"createElement") != null && (js.Env.document.compatMode == "BackCompat")) {
			var el = js.Env.document.createElement("div");
			var el2 = js.Env.document.createElement("span");
			if(el != null && el2 != null && el.querySelector != null) {
				el2.className = "Test";
				el.appendChild(el2);
				result = hxrt.Option.Some((el.querySelector(".Test") != null));
			}
		}
		return result;
	});
}
js.detect.BrowserSupport.isEventSrcelementPresent = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("isEventSrcelementPresent",function(v) {
		var isSupported = hxrt.Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var i = js.Env.document.createElement("input");
			var root = js.Env.document.documentElement;
			if(i != null && i.style != null && $closure(i,"click") != null && root != null && $closure(root,"appendChild") != null && $closure(root,"removeChild") != null) {
				i.type = "checkbox";
				i.style.display = "none";
				i.onclick = function(e) {
					isSupported = hxrt.Option.Some(js.Env.isDefined(e.srcElement));
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
		var isSupported = hxrt.Option.None;
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
								isSupported = hxrt.Option.Some(js.Env.isDefined($closure(doc.documentElement,"hasAttribute")));
							}
							else {
								isSupported = hxrt.Option.Some(false);
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
							isSupported = hxrt.Option.Some(false);
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
		var isPresent = hxrt.Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var el = js.Env.document.createElement("p");
			if(el != null && $closure(el,"setAttribute") != null) {
				el.setAttribute("oncontextmenu","");
				isPresent = hxrt.Option.Some(js.Env.isDefined(el.oncontextmenu));
			}
		}
		return isPresent;
	});
}
js.detect.BrowserSupport.computedStyleReturnsValuesForStaticlyPositionedElements = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("computedStyleReturnsValuesForStaticlyPositionedElements",function(v) {
		var result = hxrt.Option.None;
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
			result = hxrt.Option.Some(computedStyle.left != "auto");
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
		var result = hxrt.Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var value = "rgba(1,1,1,0.5)";
			var el = js.Env.document.createElement("p");
			var re = /^rgba/;
			if(el != null && el.style != null && js.Env.typeOf(re.test) == "function") {
				try {
					el.style.color = value;
					result = hxrt.Option.Some(re.test(el.style.color));
				}
				catch( $e0 ) {
					{
						var e = $e0;
						{
							result = hxrt.Option.Some(false);
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
		var result = hxrt.Option.None;
		var docEl = js.Env.document.documentElement;
		if(docEl != null) {
			var s = docEl.style;
			result = hxrt.Option.Some((js.Env.typeOf(s.borderRadius) == "string" || js.Env.typeOf(s.MozBorderRadius) == "string" || js.Env.typeOf(s.WebkitBorderRadius) == "string" || js.Env.typeOf(s.KhtmlBorderRadius) == "string"));
		}
		return result;
	});
}
js.detect.BrowserSupport.elemenChildrenReturnsElementNodes = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("elemenChildrenReturnsElementNodes",function(v) {
		var isSupported = hxrt.Option.None;
		var docEl = js.Env.document.documentElement;
		if($closure(js.Env.document,"createElement") != null && js.Env.isDefined(docEl.children)) {
			var el = js.Env.document.createElement("div");
			el.innerHTML = "<div><p>a</p></div>b<!-- x -->";
			isSupported = hxrt.Option.Some((el.children && el.children.length == 1 && el.children[0] && el.children[0].tagName && el.children[0].tagName.toUpperCase() == "DIV"));
		}
		return isSupported;
	});
}
js.detect.BrowserSupport.isCanvasSupported = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("isCanvasSupported",function(v) {
		var result = hxrt.Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var elCanvas = js.Env.document.createElement("canvas");
			result = hxrt.Option.Some(!!(elCanvas != null && elCanvas.getContext != null && elCanvas.getContext("2d") != null));
		}
		return result;
	});
}
js.detect.BrowserSupport.positionFixed = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("positionFixed",function(v) {
		var isSupported = hxrt.Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var el = js.Env.document.createElement("div");
			if(el != null && el.style != null) {
				el.style.position = "fixed";
				el.style.top = "-10px";
				var root = js.Env.document.body;
				if(root != null) {
					root.appendChild(el);
					isSupported = hxrt.Option.Some(el.offsetTop == -10);
					root.removeChild(el);
				}
			}
		}
		return isSupported;
	});
}
js.detect.BrowserSupport.isCssEnabled = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("isCssEnabled",function(v) {
		var isSupported = hxrt.Option.None;
		var body = js.Env.document.body;
		if($closure(js.Env.document,"createElement") != null && body != null && $closure(body,"appendChild") != null && $closure(body,"removeChild") != null) {
			var el = js.Env.document.createElement("div");
			if(el != null && el.style != null) {
				el.style.display = "none";
				body.appendChild(el);
				isSupported = hxrt.Option.Some(el.offsetWidth == 0);
				body.removeChild(el);
			}
		}
		return isSupported;
	});
}
js.detect.BrowserSupport.isQuirksMode = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("isQuirksMode",function(v) {
		var result = hxrt.Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var el = js.Env.document.createElement("div");
			if(el != null && el.style != null) {
				var style = el.style;
				style.width = "1";
			}
			var style = el.style;
			result = hxrt.Option.Some(style.width == "1px");
		}
		return result;
	});
}
js.detect.BrowserSupport.isContainsBuggy = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("isContainsBuggy",function(v) {
		var result = hxrt.Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var el1 = js.Env.document.createElement("div"), el2 = js.Env.document.createElement("div");
			if(el1 != null && el2 != null && js.Env.isDefined(el1.contains)) {
				result = hxrt.Option.Some(el1.contains(el2));
			}
		}
		return result;
	});
}
js.detect.BrowserSupport.isActivexEnabled = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("isActivexEnabled",function(v) {
		var result = hxrt.Option.Some(false);
		if(window.ActiveXObject) {
			var xmlVersions = ["Microsoft.XMLHTTP","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP.4.0","Msxml2.XMLHTTP.5.0","Msxml2.XMLHTTP.6.0"];
			{
				var _g = 0;
				while(_g < xmlVersions.length) {
					var value = xmlVersions[_g];
					++_g;
					try {
						if(new ActiveXObject(value) != null) {
							result = hxrt.Option.Some(true);
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
			result = hxrt.Option.Some(hxrt.OptionExtensions.getOrElseC(result,false));
		}
		else null;
		return result;
	});
}
js.detect.BrowserSupport.typeofNodelistIsFunctionBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("typeofNodelistIsFunctionBug",function(v) {
		var result = hxrt.Option.None;
		if(js.Env.document.forms != null) {
			result = hxrt.Option.Some(js.Env.typeOf(js.Env.document.forms) == "function");
		}
		return result;
	});
}
js.detect.BrowserSupport.getElementsByTagNameReturnsCommentNodesBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("getElementsByTagNameReturnsCommentNodesBug",function(v) {
		var result = hxrt.Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var el = js.Env.document.createElement("div");
			if(el != null && $closure(el,"getElementsByTagName") != null) {
				el.innerHTML = "<span>a</span><!--b-->";
				var all = el.getElementsByTagName("*");
				if(all.length != null) {
					var lastNode = el.getElementsByTagName("*")[1];
					result = hxrt.Option.Some(!!(lastNode != null && lastNode.nodeType == 8));
				}
			}
		}
		return result;
	});
}
js.detect.BrowserSupport.setAttributeIgnoresNameAttributeBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("setAttributeIgnoresNameAttributeBug",function(v) {
		var result = hxrt.Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var elForm = js.Env.document.createElement("form");
			var elInput = js.Env.document.createElement("input");
			var root = js.Env.document.documentElement;
			if(elForm != null && elInput != null && $closure(elInput,"setAttribute") != null && $closure(elForm,"appendChild") != null && root != null && $closure(root,"appendChild") != null && $closure(root,"removeChild") != null) {
				elInput.setAttribute("name","test");
				elForm.appendChild(elInput);
				root.appendChild(elForm);
				if(elForm.elements != null) {
					result = hxrt.Option.Some(js.Env.typeOf(elForm.elements["test"]) == "undefined");
				}
				else {
					result = hxrt.Option.Some(true);
				}
				root.removeChild(elForm);
			}
		}
		return result;
	});
}
js.detect.BrowserSupport.elementPropertiesAreAttributesBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("elementPropertiesAreAttributesBug",function(v) {
		var result = hxrt.Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var el = js.Env.document.createElement("div");
			if(el != null && $closure(el,"getAttribute") != null) {
				el.__foo = 'bar';
				result = hxrt.Option.Some(el.getAttribute("__foo") == "bar");
				el = null;
			}
		}
		return result;
	});
}
js.detect.BrowserSupport.isRegexpWhitespaceCharacterClassBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("isRegexpWhitespaceCharacterClassBug",function(v) {
		var result = hxrt.Option.None;
		var str = "\\u0009\\u000A\\u000B\\u000C\\u000D\\u0020\\u00A0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029";
		result = hxrt.Option.Some(new hxrt.EReg("^\\s+$","").match(str));
		return result;
	});
}
js.detect.BrowserSupport.isStringPrototypeSplitRegexpBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("isStringPrototypeSplitRegexpBug",function(v) {
		var s = "a_b";
		return hxrt.Option.Some(s.split(/(_)/).length != 3);
	});
}
js.detect.BrowserSupport.preElementsIgnoreNewLinesBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("preElementsIgnoreNewLinesBug",function(v) {
		var result = hxrt.Option.None;
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
				result = hxrt.Option.Some(isIgnored);
			}
		}
		return result;
	});
}
js.detect.BrowserSupport.selectElementInnerHtmlBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("selectElementInnerHtmlBug",function(v) {
		var result = hxrt.Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var el = js.Env.document.createElement("select");
			if(el != null) {
				el.innerHTML = "<option value=\"test\">test</option>";
				if(el.options != null && el.options[0] != null) {
					result = hxrt.Option.Some(el.options[0].nodeName.toUpperCase() != "OPTION");
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
		var result = hxrt.Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			try {
				var el = js.Env.document.createElement("table");
				if(el != null && el.tBodies != null) {
					el.innerHTML = "<tbody><tr><td>test</td></tr></tbody>";
					result = hxrt.Option.Some(js.Env.typeOf(el.tBodies[0]) == "undefined");
					el = null;
				}
			}
			catch( $e0 ) {
				{
					var e = $e0;
					{
						result = hxrt.Option.Some(true);
					}
				}
			}
		}
		return result;
	});
}
js.detect.BrowserSupport.scriptElementRejectsTextNodeAppendingBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("scriptElementRejectsTextNodeAppendingBug",function(v) {
		var result = hxrt.Option.None;
		if($closure(js.Env.document,"createElement") != null && $closure(js.Env.document,"createTextNode") != null) {
			var s = js.Env.document.createElement("script");
			if(s != null && $closure(s,"appendChild") != null) {
				try {
					s.appendChild(js.Env.document.createTextNode(""));
					result = hxrt.Option.Some((s.firstChild == null) || (s.firstChild != null && s.firstChild.nodeType != 3));
				}
				catch( $e0 ) {
					{
						var e = $e0;
						{
							result = hxrt.Option.Some(true);
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
		var result = hxrt.Option.Some(false);
		if($closure(js.Env.document,"getElementsByTagName") != null && $closure(js.Env.document,"createElement") != null) {
			var num = hxrt.Date.now().getTime();
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
				result = hxrt.Option.Some(!!((testElement != null) && (testElement.nodeName.toUpperCase() == "INPUT")));
				head.removeChild(el);
				el = null;
			}
		}
		return result;
	});
}
js.detect.BrowserSupport.documentGetElementByIdIgnoresCaseBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("documentGetElementByIdIgnoresCaseBug",function(v) {
		var result = hxrt.Option.None;
		if($closure(js.Env.document,"createElement") != null && $closure(js.Env.document,"getElementsByTagName") != null && $closure(js.Env.document,"getElementById") != null) {
			var el = js.Env.document.createElement("script");
			var head = js.Env.document.getElementsByTagName("head")[0];
			if(el != null && head != null && $closure(head,"appendChild") != null && $closure(head,"removeChild") != null) {
				el.type = "text/javascript";
				el.id = "A";
				head.appendChild(el);
				result = hxrt.Option.Some(!!(js.Env.document.getElementById("a") != null));
				head.removeChild(el);
				el = null;
			}
		}
		return result;
	});
}
js.detect.BrowserSupport.offsetValuesForStaticElementsInsidePositionedOnesBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("offsetValuesForStaticElementsInsidePositionedOnesBug",function(v) {
		var result = hxrt.Option.None;
		var body = js.Env.document.body;
		if(body != null && $closure(body,"insertBefore") != null && $closure(js.Env.document,"createElement") != null && $closure(js.Env.document,"getElementById") != null) {
			var id = "x" + (hxrt.Math.random() + "").substr(2);
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
							result = hxrt.Option.Some(true);
						}
					}
					else {
						result = hxrt.Option.Some(false);
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
		var result = hxrt.Option.None;
		var docEl = js.Env.document.documentElement;
		if(docEl != null && $closure(docEl,"appendChild") != null && $closure(docEl,"removeChild") != null && $closure(js.Env.document,"getElementsByName") != null && $closure(js.Env.document,"createElement") != null) {
			var el = js.Env.document.createElement("div");
			if(el != null) {
				var uid = "x" + (hxrt.Math.random() + "").substr(2);
				el.id = uid;
				docEl.appendChild(el);
				result = hxrt.Option.Some(js.Env.document.getElementsByName(uid)[0] == el);
				docEl.removeChild(el);
			}
		}
		return result;
	});
}
js.detect.BrowserSupport.isOverflowStyleBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("isOverflowStyleBug",function(v) {
		var result = hxrt.Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var el = js.Env.document.createElement("div");
			el.innerHTML = "<p style=\"overflow: visible;\">x</p>";
			var firstChild = el.firstChild;
			if(firstChild != null && firstChild.style != null) {
				var style = firstChild.style;
				style.overflow = "hidden";
				result = hxrt.Option.Some(style.overflow != "hidden");
			}
			el = null;
			firstChild = null;
		}
		return result;
	});
}
js.detect.BrowserSupport.isQuerySelectorAllBug = function() {
	return js.detect.BrowserSupport.testBugAndMemorize("isQuerySelectorAllBug",function(v) {
		var result = hxrt.Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var el = js.Env.document.createElement("div");
			if(el != null && (el.querySelectorAll != null)) {
				el.innerHTML = "<object><param name=\"\"></object>";
				result = hxrt.Option.Some(el.querySelectorAll("param").length != 1);
			}
			el = null;
		}
		return result;
	});
}
js.detect.BrowserSupport.html5Audio = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5Audio",function(v) {
		var result = hxrt.Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var el = js.Env.document.createElement("audio");
			result = hxrt.Option.Some(!!el.canPlayType);
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
	var result = hxrt.Option.None;
	if($closure(js.Env.document,"createElement") != null) {
		var a = js.Env.document.createElement(element);
		result = hxrt.Option.Some(!!(a.canPlayType && a.canPlayType(format).replace("no","") != ""));
		a = null;
	}
	return result;
}
js.detect.BrowserSupport.html5Canvas = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5Canvas",function(v) {
		var result = hxrt.Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var a = js.Env.document.createElement("canvas");
			result = hxrt.Option.Some(!!a.getContext);
			a = null;
		}
		return result;
	});
}
js.detect.BrowserSupport.html5CanvasTextAPI = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("html5CanvasTextAPI",function(v) {
		var result = hxrt.Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var c = js.Env.document.createElement("canvas");
			result = hxrt.Option.Some(c.getContext && js.Env.typeOf(c.getContext("2d").fillText) == "function");
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
		var result = hxrt.Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var el = js.Env.document.createElement("video");
			result = hxrt.Option.Some(!!el.canPlayType);
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
	var result = hxrt.Option.None;
	if($closure(js.Env.document,"createElement") != null) {
		var c = js.Env.document.createElement(elementName);
		result = hxrt.Option.Some(js.Env.typeOf(c[property]) != "undefined");
		c = null;
	}
	return result;
}
js.detect.BrowserSupport.checIputTypeProperty = function(type) {
	var result = hxrt.Option.None;
	if($closure(js.Env.document,"createElement") != null) {
		var i = js.Env.document.createElement("input");
		i.setAttribute("type",type);
		result = hxrt.Option.Some(i.type != "text");
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
		var result = hxrt.Option.None;
		if($closure(js.Env.document,"createElement") != null) {
			var e = js.Env.document.createElement("div");
			e.innerHTML = "<svg></svg>";
			result = hxrt.Option.Some(!!((js.Env.window.SVGSVGElement != null) && (hxrt.Std["is"](e.firstChild,js.Env.window.SVGSVGElement))));
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
		return hxrt.StringExtensions.contains(e.getAttribute("style"),"black");
	});
}
js.detect.BrowserSupport.opacity = function() {
	return js.detect.BrowserSupport.testSupport("<a style=\"opacity: 0.5;\"></a>","a",function(e) {
		var opacity = e.style.opacity;
		return opacity != null && new hxrt.EReg("0.5","").match(opacity.toString());
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
		return hxrt.OptionExtensions.getOrElseC(hxrt.OptionExtensions.map(hxrt.OptionExtensions.toOption(value),function(s) {
			return new hxrt.EReg("on","i").match(s);
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
			return hxrt.DynamicExtensions.into(js.Env.document.body,function(body) {
				var bodyMarginTop = hxrt.OptionExtensions.getOrElseC(hxrt.OptionExtensions.map(js.dom.Quirks.getComputedCssProperty(body,"margin-top"),function(s) {
					return hxrt.StringExtensions.toInt(s,0);
				}),0);
				return hxrt.Option.Some(body.offsetTop != bodyMarginTop);
			});
		}
		return hxrt.Option.None;
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
			var container = hxrt.DynamicExtensions.withEffect(js.Env.document.createElement("div"),function(container) {
				haxe.util.ObjectExtensions.extendWith(container.style,{ position : "absolute", top : 0, left : 0, margin : 0, border : 0, width : "1px", height : "1px", visibility : "hidden"});
				container.innerHTML = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div>";
			});
			return hxrt.Option.Some(hxrt.DynamicExtensions.into(js.Env.document.body,function(body) {
				body.insertBefore(container,body.firstChild);
				var checkDiv = container.firstChild.firstChild;
				return hxrt.DynamicExtensions.withEffect((checkDiv.offsetTop != 5),function(_) {
					body.removeChild(container);
				});
			}));
		}
		return hxrt.Option.None;
	});
}
js.detect.BrowserSupport.offsetAddsBorderForTableAndCells = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("offsetAddsBorderForTableAndCells",function(v) {
		if(js.Env.document != null && js.Env.document.body != null) {
			var container = hxrt.DynamicExtensions.withEffect(js.Env.document.createElement("div"),function(container) {
				haxe.util.ObjectExtensions.extendWith(container.style,{ position : "absolute", top : 0, left : 0, margin : 0, border : 0, width : "1px", height : "1px", visibility : "hidden"});
				container.innerHTML = "<table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
			});
			return hxrt.Option.Some(hxrt.DynamicExtensions.into(js.Env.document.body,function(body) {
				body.insertBefore(container,body.firstChild);
				var td = container.getElementsByTagName("td")[0];
				return hxrt.DynamicExtensions.withEffect((td.offsetTop == 5),function(_) {
					body.removeChild(container);
				});
			}));
		}
		return hxrt.Option.None;
	});
}
js.detect.BrowserSupport.offsetSubtractsBorderForOverflowNotVisible = function() {
	return js.detect.BrowserSupport.testFeatureAndMemorize("offsetSubtractsBorderForOverflowNotVisible",function(v) {
		if(js.Env.document != null && js.Env.document.body != null) {
			var container = hxrt.DynamicExtensions.withEffect(js.Env.document.createElement("div"),function(container) {
				haxe.util.ObjectExtensions.extendWith(container.style,{ position : "absolute", top : 0, left : 0, margin : 0, border : 0, width : "1px", height : "1px", visibility : "hidden"});
				container.innerHTML = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div>";
			});
			return hxrt.Option.Some(hxrt.DynamicExtensions.into(js.Env.document.body,function(body) {
				body.insertBefore(container,body.firstChild);
				var innerDiv = container.firstChild;
				haxe.util.ObjectExtensions.extendWith(innerDiv.style,{ overflow : "hidden", position : "relative"});
				var checkDiv = innerDiv.firstChild;
				return hxrt.DynamicExtensions.withEffect((checkDiv.offsetTop == -5),function(_) {
					body.removeChild(container);
				});
			}));
		}
		return hxrt.Option.None;
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
	return js.detect.BrowserSupport.testAndMemorize("testInBody" + tagName,def1,function(v) {
		return (js.Env.document == null?hxrt.Option.None:(function($this) {
			var $r;
			var div = js.Env.document.createElement("div");
			div.style.display = "none";
			div.innerHTML = contents;
			$r = hxrt.Option.Some(hxrt.OptionExtensions.getOrElseC(hxrt.OptionExtensions.map(hxrt.ArrayExtensions.firstOption(js.dom.DomCollectionExtensions.toArray(div.getElementsByTagName(tagName))),f),def2));
			return $r;
		}(this)));
	});
}
js.detect.BrowserSupport.testInBody = function(contents,tagName,f,def1,def2) {
	return js.detect.BrowserSupport.testAndMemorize("testInBody" + tagName,def1,function(v) {
		return (js.Env.document == null || js.Env.document.body == null?hxrt.Option.None:(function($this) {
			var $r;
			var div = js.Env.document.createElement("div");
			div.innerHTML = contents;
			js.Env.document.body.insertBefore(div,js.Env.document.body.firstChild);
			$r = hxrt.Option.Some(hxrt.DynamicExtensions.withEffect(hxrt.OptionExtensions.getOrElseC(hxrt.OptionExtensions.map(hxrt.ArrayExtensions.firstOption(js.dom.DomCollectionExtensions.toArray(div.getElementsByTagName(tagName))),f),def2),function(_) {
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
	return hxrt.OptionExtensions.getOrElse(js.detect.BrowserSupport.memorized.get(key),function() {
		var result = testFunction.call();
		hxrt.OptionExtensions.foreach(result,function(v) {
			js.detect.BrowserSupport.memorized = js.detect.BrowserSupport.memorized.set(key,v);
		});
		return hxrt.OptionExtensions.getOrElseC(result,defaultValue);
	});
}
js.detect.BrowserSupport.prototype.__class__ = js.detect.BrowserSupport;
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
	else if(js.Env.isDefined(el.runtimeStyle)) {
		return el.runtimeStyle;
	}
	else {
		return null;
	}
}
js.dom.Quirks.getActualCssPropertyName = function(name) {
	if(js.dom.Quirks.FloatPattern.match(name)) return (js.detect.BrowserSupport.cssFloat()?"cssFloat":"styleFloat");
	return name;
}
js.dom.Quirks.getComputedCssProperty = function(elem,name) {
	return hxrt.DynamicExtensions.into(((js.detect.BrowserSupport.getComputedStyle()?hxrt.OptionExtensions.getOrElseC(hxrt.OptionExtensions.orElse(hxrt.OptionExtensions.flatMap(hxrt.OptionExtensions.flatMap(hxrt.OptionExtensions.toOption(elem.ownerDocument.defaultView),function(defaultView) {
		return hxrt.OptionExtensions.toOption(defaultView.getComputedStyle(elem,null));
	}),function(computedStyle) {
		return hxrt.OptionExtensions.filter(hxrt.OptionExtensions.toOption(computedStyle.getPropertyValue(name)),function(style) {
			return style != "";
		});
	}),function() {
		return (name == "opacity"?hxrt.Option.Some("1"):hxrt.Option.None);
	}),""):(js.Env.isDefined(elem.currentStyle)?(name == "opacity" && !js.detect.BrowserSupport.opacity()?(js.dom.Quirks.OpacityPattern.match(elem.currentStyle.filter)?hxrt.FloatExtensions.toString((hxrt.StringExtensions.toFloat(js.dom.Quirks.OpacityPattern.matched(1)) / 100.0)):"1"):(function($this) {
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
		return (computedStyle == ""?hxrt.Option.None:hxrt.OptionExtensions.toOption(computedStyle));
	});
}
js.dom.Quirks.getCssProperty = function(elem,name) {
	return hxrt.OptionExtensions.orElse(hxrt.OptionExtensions.flatMap(hxrt.OptionExtensions.toOption(elem.style),function(style) {
		return haxe.util.ObjectExtensions.getAny(style,js.dom.Quirks.getActualCssPropertyName(name));
	}),function() {
		return js.dom.Quirks.getComputedCssProperty(elem,name);
	});
}
js.dom.Quirks.getViewportSize = function() {
	return (js.Env.isDefined(js.Env.window.innerWidth)?{ dx : js.Env.window.innerWidth, dy : js.Env.window.innerHeight}:(js.Env.isDefined(js.Env.document.documentElement) && js.Env.isDefined(js.Env.document.documentElement.clientWidth) && js.Env.document.documentElement.clientWidth != 0?{ dx : js.Env.document.documentElement.clientWidth, dy : js.Env.document.documentElement.clientHeight}:{ dx : js.Env.document.body.clientWidth, dy : js.Env.document.body.clientHeight}));
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
js.dom.Quirks.getBodyOffset = function(doc) {
	return hxrt.OptionExtensions.map(hxrt.OptionExtensions.flatMap(hxrt.OptionExtensions.toOption(js.Env.document),function(document) {
		return hxrt.OptionExtensions.toOption(document.body);
	}),function(body) {
		var top = body.offsetTop;
		var left = body.offsetLeft;
		if(js.detect.BrowserSupport.offsetDoesNotIncludeMarginInBodyOffset()) {
			top += hxrt.OptionExtensions.getOrElseC(hxrt.OptionExtensions.map(js.dom.Quirks.getComputedCssProperty(body,"margin-top"),function(s) {
				return hxrt.StringExtensions.toInt(s,0);
			}),0);
			left += hxrt.OptionExtensions.getOrElseC(hxrt.OptionExtensions.map(js.dom.Quirks.getComputedCssProperty(body,"margin-left"),function(s) {
				return hxrt.StringExtensions.toInt(s,0);
			}),0);
		}
		return { x : left, y : top}
	});
}
js.dom.Quirks.setOffset = function(elem,offset) {
	if(elem == null || elem.ownerDocument == null) return elem;
	else {
		var position = js.dom.Quirks.getComputedCssProperty(elem,"position");
		hxrt.OptionExtensions.foreach(position,function(v) {
			if(v == "static") elem.style.position = "relative";
		});
		var curOffset = hxrt.OptionExtensions.getOrElseC(js.dom.Quirks.getOffset(elem),{ x : 0, y : 0});
		var curTop = hxrt.OptionExtensions.getOrElseC(hxrt.OptionExtensions.map(js.dom.Quirks.getComputedCssProperty(elem,"top"),function(s) {
			return hxrt.StringExtensions.toInt(s,0);
		}),0);
		var curLeft = hxrt.OptionExtensions.getOrElseC(hxrt.OptionExtensions.map(js.dom.Quirks.getComputedCssProperty(elem,"left"),function(s) {
			return hxrt.StringExtensions.toInt(s,0);
		}),0);
		elem.style.top = hxrt.IntExtensions.toString(((offset.y - curOffset.y) + curTop)) + "px";
		elem.style.left = hxrt.IntExtensions.toString(((offset.x - curOffset.x) + curLeft)) + "px";
		return elem;
	}
}
js.dom.Quirks.setWidth = function(elem,width) {
	return js.dom.Quirks.setStyle(elem,"width",hxrt.IntExtensions.toString(width) + "px");
}
js.dom.Quirks.setHeight = function(elem,hight) {
	return js.dom.Quirks.setStyle(elem,"height",hxrt.IntExtensions.toString(hight) + "px");
}
js.dom.Quirks.setStyle = function(elem,name,value) {
	if(elem == null || elem.ownerDocument == null) return elem;
	else {
		elem.style[name] = value;
		return elem;
	}
}
js.dom.Quirks.getHeight = function(elem) {
	return js.dom.Quirks.getWidthOrHeight(elem,"offsetHeight",js.dom.Quirks.cssHeight,hxrt.Option.None);
}
js.dom.Quirks.getWidth = function(elem) {
	return js.dom.Quirks.getWidthOrHeight(elem,"offsetWidth",js.dom.Quirks.cssWidth,hxrt.Option.None);
}
js.dom.Quirks.getWidthOrHeight = function(elem,offsetValueExtract,which,extra) {
	if(elem == null || elem.ownerDocument == null) return hxrt.Option.None;
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
		return hxrt.Option.Some(hxrt.FloatExtensions.toInt(hxrt.Math.max(0,hxrt.Math.round(val))));
	}
}
js.dom.Quirks.swap = function(elem,values,functionCallback) {
	var elemStyle = js.dom.Quirks.setAndStore(elem,values);
	var result = functionCallback.call(elem);
	js.dom.Quirks.setAndStore(elem,elemStyle);
	return result;
}
js.dom.Quirks.setAndStore = function(elem,styles) {
	var values = haxe.data.collections.Map.create(hxrt.StringExtensions.HasherF(hxrt.String),hxrt.StringExtensions.EqualF(hxrt.String),hxrt.StringExtensions.HasherF(hxrt.String),hxrt.StringExtensions.EqualF(hxrt.String));
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
	var $e = (extra);
	switch( $e[1] ) {
	case 1:
	var border = $e[2];
	{
		null;
	}break;
	default:{
		hxrt.ArrayExtensions.foreach(which,function(v) {
			var $e = (extra);
			switch( $e[1] ) {
			case 0:
			{
				val -= hxrt.OptionExtensions.getOrElseC(hxrt.OptionExtensions.map(js.dom.Quirks.getComputedCssProperty(elem,"padding-" + v),function(s) {
					return hxrt.StringExtensions.toInt(s,0);
				}),0);
			}break;
			case 1:
			var margin = $e[2];
			{
				val += hxrt.OptionExtensions.getOrElseC(hxrt.OptionExtensions.map(js.dom.Quirks.getComputedCssProperty(elem,"margin-" + v),function(s) {
					return hxrt.StringExtensions.toInt(s,0);
				}),0);
			}break;
			}
			val -= hxrt.OptionExtensions.getOrElseC(hxrt.OptionExtensions.map(js.dom.Quirks.getComputedCssProperty(elem,("border-" + v) + "-width"),function(s) {
				return hxrt.StringExtensions.toInt(s,0);
			}),0);
		});
	}break;
	}
	return val;
}
js.dom.Quirks.getOffset = function(elem) {
	if(elem == null || elem.ownerDocument == null) return hxrt.Option.None;
	else if(elem == elem.ownerDocument.body) return js.dom.Quirks.getBodyOffset(elem.ownerDocument);
	else if(js.Env.document.documentElement != null && $closure(js.Env.document.documentElement,"getBoundingClientRect") != null) {
		var box = elem.getBoundingClientRect();
		var doc = elem.ownerDocument;
		var body = doc.body;
		var docElem = doc.documentElement;
		var clientTop = hxrt.ArrayExtensions.first(hxrt.ArrayExtensions.filter([docElem.clientTop,body.clientTop,0],haxe.functional.P.isNotNull()));
		var clientLeft = hxrt.ArrayExtensions.first(hxrt.ArrayExtensions.filter([docElem.clientLeft,body.clientLeft,0],haxe.functional.P.isNotNull()));
		var top = (box.top + hxrt.ArrayExtensions.first(hxrt.ArrayExtensions.filter([js.Env.window.pageYOffset,(js.detect.BrowserSupport.boxModel()?docElem.scrollTop:null),body.scrollTop],haxe.functional.P.isNotNull()))) - clientTop;
		var left = (box.left + hxrt.ArrayExtensions.first(hxrt.ArrayExtensions.filter([js.Env.window.pageXOffset,(js.detect.BrowserSupport.boxModel()?docElem.scrollLeft:null),body.scrollLeft],haxe.functional.P.isNotNull()))) - clientLeft;
		return hxrt.Option.Some({ x : left, y : top});
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
				if(js.detect.BrowserSupport.offsetDoesNotAddBorder() && !(js.detect.BrowserSupport.offsetAddsBorderForTableAndCells() && new hxrt.EReg("^t(able|d|h)$","i").match(elem.nodeName))) {
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
			top += hxrt.FloatExtensions.toInt(hxrt.Math.max(docElem.scrollTop,body.scrollTop));
			left += hxrt.FloatExtensions.toInt(hxrt.Math.max(docElem.scrollLeft,body.scrollLeft));
		}
		return hxrt.Option.Some({ x : left, y : top});
	}
}
js.dom.Quirks.prototype.__class__ = js.dom.Quirks;
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
	if(equal == null) equal = hxrt.DynamicExtensions.EqualF();
	return function(value) {
		return equal.equal(ref,value);
	}
}
haxe.functional.P.startsWith = function(s) {
	return function(value) {
		return hxrt.StringExtensions.startsWith(value,s);
	}
}
haxe.functional.P.endsWith = function(s) {
	return function(value) {
		return hxrt.StringExtensions.endsWith(value,s);
	}
}
haxe.functional.P.contains = function(s) {
	return function(value) {
		return hxrt.StringExtensions.contains(value,s);
	}
}
haxe.functional.P.prototype.__class__ = haxe.functional.P;
js.Env = function() { }
js.Env.__name__ = ["js","Env"];
js.Env.eq = function(a,b) {
	return (function(a, b) { return a === b; })(a,b);
}
js.Env.alert = function(a) {
	alert(hxrt.Std.string(a));
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
js.Env.typeOf = function(d) {
	return typeof d;
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
hxrt.Unit = { __ename__ : ["Unit"], __constructs__ : ["Unit"] }
hxrt.Unit.Unit = ["Unit",0];
hxrt.Unit.Unit.toString = $estr;
hxrt.Unit.Unit.__enum__ = hxrt.Unit;
hxrt.Option = { __ename__ : ["Option"], __constructs__ : ["None","Some"] }
hxrt.Option.None = ["None",0];
hxrt.Option.None.toString = $estr;
hxrt.Option.None.__enum__ = hxrt.Option;
hxrt.Option.Some = function(v) { var $x = ["Some",1,v]; $x.__enum__ = hxrt.Option; $x.toString = $estr; return $x; }
hxrt.Either = { __ename__ : ["Either"], __constructs__ : ["Left","Right"] }
hxrt.Either.Left = function(v) { var $x = ["Left",0,v]; $x.__enum__ = hxrt.Either; $x.toString = $estr; return $x; }
hxrt.Either.Right = function(v) { var $x = ["Right",1,v]; $x.__enum__ = hxrt.Either; $x.toString = $estr; return $x; }
hxrt.Future = function(p) { if( p === $_ ) return; {
	this._listeners = [];
	this._result = null;
	this._isSet = false;
	this._isCanceled = false;
	this._cancelers = [];
	this._canceled = [];
}}
hxrt.Future.__name__ = ["Future"];
hxrt.Future.dead = function() {
	return hxrt.DynamicExtensions.withEffect(new hxrt.Future(),function(future) {
		future.cancel();
	});
}
hxrt.Future.create = function() {
	return new hxrt.Future();
}
hxrt.Future.prototype._canceled = null;
hxrt.Future.prototype._cancelers = null;
hxrt.Future.prototype._isCanceled = null;
hxrt.Future.prototype._isSet = null;
hxrt.Future.prototype._listeners = null;
hxrt.Future.prototype._result = null;
hxrt.Future.prototype.allowCancelOnlyIf = function(f) {
	if(!this.isDone()) this._cancelers.push(f);
	return this;
}
hxrt.Future.prototype.cancel = function() {
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
hxrt.Future.prototype.deliver = function(t) {
	return (this._isCanceled?this:(this._isSet?hxrt.Stax.error("Future already delivered"):(function($this) {
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
hxrt.Future.prototype.deliverTo = function(f) {
	if(this.isCanceled()) return this;
	else if(this.isDelivered()) f(this._result);
	else this._listeners.push(f);
	return this;
}
hxrt.Future.prototype.filter = function(f) {
	var fut = new hxrt.Future();
	this.deliverTo(function(t) {
		if(f(t)) fut.deliver(t);
		else fut.forceCancel();
	});
	this.ifCanceled(function() {
		fut.forceCancel();
	});
	return fut;
}
hxrt.Future.prototype.flatMap = function(f) {
	var fut = new hxrt.Future();
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
hxrt.Future.prototype.forceCancel = function() {
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
hxrt.Future.prototype.ifCanceled = function(f) {
	if(this.isCanceled()) f();
	else if(!this.isDone()) this._canceled.push(f);
	return this;
}
hxrt.Future.prototype.isCanceled = function() {
	return this._isCanceled;
}
hxrt.Future.prototype.isDelivered = function() {
	return this._isSet;
}
hxrt.Future.prototype.isDone = function() {
	return this.isDelivered() || this.isCanceled();
}
hxrt.Future.prototype.map = function(f) {
	var fut = new hxrt.Future();
	this.deliverTo(function(t) {
		fut.deliver(f(t));
	});
	this.ifCanceled(function() {
		fut.forceCancel();
	});
	return fut;
}
hxrt.Future.prototype.toArray = function() {
	return hxrt.OptionExtensions.toArray(this.value());
}
hxrt.Future.prototype.toOption = function() {
	return this.value();
}
hxrt.Future.prototype.value = function() {
	return (this._isSet?hxrt.Option.Some(this._result):hxrt.Option.None);
}
hxrt.Future.prototype.zip = function(f2) {
	var zipped = new hxrt.Future();
	var f1 = this;
	var deliverZip = function() {
		if(f1.isDelivered() && f2.isDelivered()) {
			zipped.deliver(hxrt.Tuple2.create(hxrt.OptionExtensions.get(f1.value()),hxrt.OptionExtensions.get(f2.value())));
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
hxrt.Future.prototype.__class__ = hxrt.Future;
hxrt.Product = function() { }
hxrt.Product.__name__ = ["Product"];
hxrt.Product.prototype.productArity = null;
hxrt.Product.prototype.productElement = null;
hxrt.Product.prototype.productPrefix = null;
hxrt.Product.prototype.__class__ = hxrt.Product;
if(typeof _Prelude=='undefined') _Prelude = {}
_Prelude.AbstractProduct = function(elements) { if( elements === $_ ) return; {
	this._productElements = elements;
}}
_Prelude.AbstractProduct.__name__ = ["_Prelude","AbstractProduct"];
_Prelude.AbstractProduct.prototype._productElements = null;
_Prelude.AbstractProduct.prototype.getProductArity = function() {
	return hxrt.Stax.error("Not implemented");
}
_Prelude.AbstractProduct.prototype.getProductPrefix = function() {
	return hxrt.Stax.error("Not implemented");
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
			string += hxrt.Std.string(this.productElement(i));
		}
	}
	return string + ")";
}
_Prelude.AbstractProduct.prototype.__class__ = _Prelude.AbstractProduct;
_Prelude.AbstractProduct.__interfaces__ = [hxrt.Product];
hxrt.Tuple2 = function(first,second) { if( first === $_ ) return; {
	_Prelude.AbstractProduct.apply(this,[[first,second]]);
	this._1 = first;
	this._2 = second;
}}
hxrt.Tuple2.__name__ = ["Tuple2"];
hxrt.Tuple2.__super__ = _Prelude.AbstractProduct;
for(var k in _Prelude.AbstractProduct.prototype ) hxrt.Tuple2.prototype[k] = _Prelude.AbstractProduct.prototype[k];
hxrt.Tuple2.OrderF = function(order1,order2) {
	return hxrt.OrderTypeclass.create({ compare : function(v1,v2) {
		var c = order1.compare(v1._1,v2._1);
		if(c != 0) return c;
		c = order2.compare(v1._2,v2._2);
		if(c != 0) return c;
		return 0;
	}});
}
hxrt.Tuple2.EqualF = function(equal1,equal2) {
	return hxrt.EqualTypeclass.create({ equal : function(v1,v2) {
		return equal1.equal(v1._1,v2._1) && equal2.equal(v1._2,v2._2);
	}});
}
hxrt.Tuple2.ShowF = function(show1,show2) {
	return hxrt.ShowTypeclass.create({ show : function(v1) {
		return ((("Tuple2(" + show1.show(v1._1)) + ", ") + show2.show(v1._2)) + ")";
	}});
}
hxrt.Tuple2.HasherF = function(hash1,hash2) {
	return hxrt.HasherTypeclass.create({ hash : function(v) {
		return 786433 * hash1.hash(v._1) + 24593 * hash2.hash(v._2);
	}});
}
hxrt.Tuple2.create = function(a,b) {
	return new hxrt.Tuple2(a,b);
}
hxrt.Tuple2.prototype._1 = null;
hxrt.Tuple2.prototype._2 = null;
hxrt.Tuple2.prototype.entuple = function(c) {
	return hxrt.Tuple3.create(this._1,this._2,c);
}
hxrt.Tuple2.prototype.getProductArity = function() {
	return 2;
}
hxrt.Tuple2.prototype.getProductPrefix = function() {
	return "Tuple2";
}
hxrt.Tuple2.prototype.__class__ = hxrt.Tuple2;
hxrt.Tuple3 = function(first,second,third) { if( first === $_ ) return; {
	_Prelude.AbstractProduct.apply(this,[[first,second,third]]);
	this._1 = first;
	this._2 = second;
	this._3 = third;
}}
hxrt.Tuple3.__name__ = ["Tuple3"];
hxrt.Tuple3.__super__ = _Prelude.AbstractProduct;
for(var k in _Prelude.AbstractProduct.prototype ) hxrt.Tuple3.prototype[k] = _Prelude.AbstractProduct.prototype[k];
hxrt.Tuple3.OrderF = function(order1,order2,order3) {
	return hxrt.OrderTypeclass.create({ compare : function(v1,v2) {
		var c = order1.compare(v1._1,v2._1);
		if(c != 0) return c;
		c = order2.compare(v1._2,v2._2);
		if(c != 0) return c;
		c = order3.compare(v1._3,v2._3);
		if(c != 0) return c;
		return 0;
	}});
}
hxrt.Tuple3.EqualF = function(equal1,equal2,equal3) {
	return hxrt.EqualTypeclass.create({ equal : function(v1,v2) {
		return equal1.equal(v1._1,v2._1) && equal2.equal(v1._2,v2._2) && equal3.equal(v1._3,v2._3);
	}});
}
hxrt.Tuple3.ShowF = function(show1,show2,show3) {
	return hxrt.ShowTypeclass.create({ show : function(v1) {
		return ((((("Tuple3(" + show1.show(v1._1)) + ", ") + show2.show(v1._2)) + ", ") + show3.show(v1._3)) + ")";
	}});
}
hxrt.Tuple3.HasherF = function(hash1,hash2,hash3) {
	return hxrt.HasherTypeclass.create({ hash : function(v) {
		return (196613 * hash1.hash(v._1) + 3079 * hash2.hash(v._2)) + 389 * hash3.hash(v._3);
	}});
}
hxrt.Tuple3.create = function(a,b,c) {
	return new hxrt.Tuple3(a,b,c);
}
hxrt.Tuple3.prototype._1 = null;
hxrt.Tuple3.prototype._2 = null;
hxrt.Tuple3.prototype._3 = null;
hxrt.Tuple3.prototype.entuple = function(d) {
	return hxrt.Tuple4.create(this._1,this._2,this._3,d);
}
hxrt.Tuple3.prototype.getProductArity = function() {
	return 3;
}
hxrt.Tuple3.prototype.getProductPrefix = function() {
	return "Tuple3";
}
hxrt.Tuple3.prototype.__class__ = hxrt.Tuple3;
hxrt.Tuple4 = function(first,second,third,fourth) { if( first === $_ ) return; {
	_Prelude.AbstractProduct.apply(this,[[first,second,third,fourth]]);
	this._1 = first;
	this._2 = second;
	this._3 = third;
	this._4 = fourth;
}}
hxrt.Tuple4.__name__ = ["Tuple4"];
hxrt.Tuple4.__super__ = _Prelude.AbstractProduct;
for(var k in _Prelude.AbstractProduct.prototype ) hxrt.Tuple4.prototype[k] = _Prelude.AbstractProduct.prototype[k];
hxrt.Tuple4.OrderF = function(order1,order2,order3,order4) {
	return hxrt.OrderTypeclass.create({ compare : function(v1,v2) {
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
hxrt.Tuple4.EqualF = function(equal1,equal2,equal3,equal4) {
	return hxrt.EqualTypeclass.create({ equal : function(v1,v2) {
		return equal1.equal(v1._1,v2._1) && equal2.equal(v1._2,v2._2) && equal3.equal(v1._3,v2._3) && equal4.equal(v1._4,v2._4);
	}});
}
hxrt.Tuple4.ShowF = function(show1,show2,show3,show4) {
	return hxrt.ShowTypeclass.create({ show : function(v1) {
		return ((((((("Tuple4(" + show1.show(v1._1)) + ", ") + show2.show(v1._2)) + ", ") + show3.show(v1._3)) + ", ") + show4.show(v1._4)) + ")";
	}});
}
hxrt.Tuple4.HasherF = function(hash1,hash2,hash3,hash4) {
	return hxrt.HasherTypeclass.create({ hash : function(v) {
		return ((1543 * hash1.hash(v._1) + 49157 * hash2.hash(v._2)) + 196613 * hash3.hash(v._3)) + 97 * hash4.hash(v._4);
	}});
}
hxrt.Tuple4.create = function(a,b,c,d) {
	return new hxrt.Tuple4(a,b,c,d);
}
hxrt.Tuple4.prototype._1 = null;
hxrt.Tuple4.prototype._2 = null;
hxrt.Tuple4.prototype._3 = null;
hxrt.Tuple4.prototype._4 = null;
hxrt.Tuple4.prototype.entuple = function(e) {
	return hxrt.Tuple5.create(this._1,this._2,this._3,this._4,e);
}
hxrt.Tuple4.prototype.getProductArity = function() {
	return 4;
}
hxrt.Tuple4.prototype.getProductPrefix = function() {
	return "Tuple4";
}
hxrt.Tuple4.prototype.__class__ = hxrt.Tuple4;
hxrt.Tuple5 = function(first,second,third,fourth,fifth) { if( first === $_ ) return; {
	_Prelude.AbstractProduct.apply(this,[[first,second,third,fourth,fifth]]);
	this._1 = first;
	this._2 = second;
	this._3 = third;
	this._4 = fourth;
	this._5 = fifth;
}}
hxrt.Tuple5.__name__ = ["Tuple5"];
hxrt.Tuple5.__super__ = _Prelude.AbstractProduct;
for(var k in _Prelude.AbstractProduct.prototype ) hxrt.Tuple5.prototype[k] = _Prelude.AbstractProduct.prototype[k];
hxrt.Tuple5.OrderF = function(order1,order2,order3,order4,order5) {
	return hxrt.OrderTypeclass.create({ compare : function(v1,v2) {
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
hxrt.Tuple5.EqualF = function(equal1,equal2,equal3,equal4,equal5) {
	return hxrt.EqualTypeclass.create({ equal : function(v1,v2) {
		return equal1.equal(v1._1,v2._1) && equal2.equal(v1._2,v2._2) && equal3.equal(v1._3,v2._3) && equal4.equal(v1._4,v2._4) && equal5.equal(v1._5,v2._5);
	}});
}
hxrt.Tuple5.ShowF = function(show1,show2,show3,show4,show5) {
	return hxrt.ShowTypeclass.create({ show : function(v1) {
		return ((((((((("Tuple5(" + show1.show(v1._1)) + ", ") + show2.show(v1._2)) + ", ") + show3.show(v1._3)) + ", ") + show4.show(v1._4)) + ", ") + show5.show(v1._5)) + ")";
	}});
}
hxrt.Tuple5.HasherF = function(hash1,hash2,hash3,hash4,hash5) {
	return hxrt.HasherTypeclass.create({ hash : function(v) {
		return (((12289 * hash1.hash(v._1) + 769 * hash2.hash(v._2)) + 393241 * hash3.hash(v._3)) + 193 * hash4.hash(v._4)) + 53 * hash5.hash(v._5);
	}});
}
hxrt.Tuple5.create = function(a,b,c,d,e) {
	return new hxrt.Tuple5(a,b,c,d,e);
}
hxrt.Tuple5.prototype._1 = null;
hxrt.Tuple5.prototype._2 = null;
hxrt.Tuple5.prototype._3 = null;
hxrt.Tuple5.prototype._4 = null;
hxrt.Tuple5.prototype._5 = null;
hxrt.Tuple5.prototype.getProductArity = function() {
	return 5;
}
hxrt.Tuple5.prototype.getProductPrefix = function() {
	return "Tuple5";
}
hxrt.Tuple5.prototype.__class__ = hxrt.Tuple5;
hxrt.Stax = function() { }
hxrt.Stax.__name__ = ["Stax"];
hxrt.Stax.noop1 = function() {
	return function(a) {
		null;
	}
}
hxrt.Stax.noop2 = function() {
	return function(a,b) {
		null;
	}
}
hxrt.Stax.noop3 = function() {
	return function(a,b,c) {
		null;
	}
}
hxrt.Stax.noop4 = function() {
	return function(a,b,c,d) {
		null;
	}
}
hxrt.Stax.noop5 = function() {
	return function(a,b,c,d,e) {
		null;
	}
}
hxrt.Stax.identity = function() {
	return function(a) {
		return a;
	}
}
hxrt.Stax.unfold = function(initial,unfolder) {
	return { iterator : function() {
		var _next = hxrt.Option.None;
		var _progress = initial;
		var precomputeNext = function() {
			var $e = (unfolder(_progress));
			switch( $e[1] ) {
			case 0:
			{
				_progress = null;
				_next = hxrt.Option.None;
			}break;
			case 1:
			var tuple = $e[2];
			{
				_progress = tuple._1;
				_next = hxrt.Option.Some(tuple._2);
			}break;
			}
		}
		precomputeNext();
		return { hasNext : function() {
			return !hxrt.OptionExtensions.isEmpty(_next);
		}, next : function() {
			var n = hxrt.OptionExtensions.get(_next);
			precomputeNext();
			return n;
		}}
	}}
}
hxrt.Stax.error = function(msg) {
	throw msg;
	return null;
}
hxrt.Stax.prototype.__class__ = hxrt.Stax;
hxrt.Hash = function(p) { if( p === $_ ) return; {
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
	else null;
}}
hxrt.Hash.__name__ = ["Hash"];
hxrt.Hash.prototype.exists = function(key) {
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
hxrt.Hash.prototype.get = function(key) {
	return this.h["$" + key];
}
hxrt.Hash.prototype.h = null;
hxrt.Hash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref["$" + i];
	}}
}
hxrt.Hash.prototype.keys = function() {
	var a = new hxrt.Array();
	
			for(var i in this.h)
				a.push(i.substr(1));
		;
	return a.iterator();
}
hxrt.Hash.prototype.remove = function(key) {
	if(!this.exists(key)) return false;
	delete(this.h["$" + key]);
	return true;
}
hxrt.Hash.prototype.set = function(key,value) {
	this.h["$" + key] = value;
}
hxrt.Hash.prototype.toString = function() {
	var s = new hxrt.StringBuf();
	s.b[s.b.length] = "{";
	var it = this.keys();
	{ var $it0 = it;
	while( $it0.hasNext() ) { var i = $it0.next();
	{
		s.b[s.b.length] = i;
		s.b[s.b.length] = " => ";
		s.b[s.b.length] = hxrt.Std.string(this.get(i));
		if(it.hasNext()) s.b[s.b.length] = ", ";
	}
	}}
	s.b[s.b.length] = "}";
	return s.b.join("");
}
hxrt.Hash.prototype.__class__ = hxrt.Hash;
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
			var $e = (hxrt.Type["typeof"](d));
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
		var _g = 0, _g1 = hxrt.Reflect.fields(src);
		while(_g < _g1.length) {
			var field = _g1[_g];
			++_g;
			var value = hxrt.Reflect.field(src,field);
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
	return hxrt.Reflect.fields(d);
}
haxe.util.ObjectExtensions.mapValues = function(d,f) {
	return haxe.util.ObjectExtensions.setAll({ },hxrt.ArrayExtensions.map(hxrt.Reflect.fields(d),function(name) {
		return hxrt.DynamicExtensions.entuple(name,f(hxrt.Reflect.field(d,name)));
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
	var names = hxrt.Reflect.fields(d1);
	var oldValues = haxe.util.ObjectExtensions.extractValues(d1,names,def);
	haxe.util.ObjectExtensions.extendWith(d1,d2);
	return hxrt.ArrayExtensions.foldl(hxrt.ArrayExtensions.zip(names,oldValues),{ },function(o,t) {
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
	var names = hxrt.Reflect.fields(d1);
	var oldValues = haxe.util.ObjectExtensions.extractValues(d1,names,def);
	haxe.util.ObjectExtensions.extendWith(d1,d2);
	return hxrt.ArrayExtensions.foldl(hxrt.ArrayExtensions.zip(names,oldValues),{ },function(o,t) {
		o[t._1] = t._2;
		return o;
	});
}
haxe.util.ObjectExtensions.get = function(d,k) {
	return (hxrt.Reflect.hasField(d,k)?hxrt.Option.Some(hxrt.Reflect.field(d,k)):hxrt.Option.None);
}
haxe.util.ObjectExtensions.getAny = function(d,k) {
	return (hxrt.Reflect.hasField(d,k)?hxrt.Option.Some(hxrt.Reflect.field(d,k)):hxrt.Option.None);
}
haxe.util.ObjectExtensions.extractAll = function(d) {
	return hxrt.ArrayExtensions.map(hxrt.Reflect.fields(d),function(name) {
		return hxrt.DynamicExtensions.entuple(name,hxrt.Reflect.field(d,name));
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
		var value = hxrt.Reflect.field(d,field);
		result.push((value != null?value:def));
	}
	}}
	return result;
}
haxe.util.ObjectExtensions.iterator = function(d) {
	return hxrt.Reflect.fields(d).iterator();
}
haxe.util.ObjectExtensions.prototype.__class__ = haxe.util.ObjectExtensions;
$Main = function() { }
$Main.__name__ = ["@Main"];
$Main.prototype.__class__ = $Main;
$_ = {}
js.Boot.__res = {}
js.Boot.__ns = 'hxrt';
js.Boot.__init();
{
	var d = hxrt.Date;
	d.now = function() {
		return new hxrt.Date();
	}
	d.fromTime = function(t) {
		var d1 = new hxrt.Date();
		d1["setTime"](t);
		return d1;
	}
	d.fromString = function(s) {
		switch(s.length) {
		case 8:{
			var k = s.split(":");
			var d1 = new hxrt.Date();
			d1["setTime"](0);
			d1["setUTCHours"](k[0]);
			d1["setUTCMinutes"](k[1]);
			d1["setUTCSeconds"](k[2]);
			return d1;
		}break;
		case 10:{
			var k = s.split("-");
			return new hxrt.Date(k[0],k[1] - 1,k[2],0,0,0);
		}break;
		case 19:{
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			return new hxrt.Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
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
	hxrt.String.prototype.__class__ = hxrt.String;
	hxrt.String.__name__ = ["String"];
	hxrt.Array.prototype.__class__ = hxrt.Array;
	hxrt.Array.__name__ = ["Array"];
	hxrt.Int = { __name__ : ["Int"]}
	hxrt.Dynamic = { __name__ : ["Dynamic"]}
	hxrt.Float = Number;
	hxrt.Float.__name__ = ["Float"];
	hxrt.Bool = { __ename__ : ["Bool"]}
	hxrt.Class = { __name__ : ["Class"]}
	hxrt.Enum = { }
	hxrt.Void = { __ename__ : ["Void"]}
}
{
	hxrt.Math.__name__ = ["Math"];
	hxrt.Math.NaN = Number["NaN"];
	hxrt.Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	hxrt.Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	hxrt.Math.isFinite = function(i) {
		return isFinite(i);
	}
	hxrt.Math.isNaN = function(i) {
		return isNaN(i);
	}
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
haxe.text.json.Json.encodeObject = hxrt.Function1Extensions.compose($closure(haxe.text.json.Json,"encode"),$closure(haxe.text.json.Json,"fromObject"));
haxe.text.json.Json.decodeObject = hxrt.Function1Extensions.compose($closure(haxe.text.json.Json,"toObject"),$closure(haxe.text.json.Json,"decode"));
haxe.io.log.Logger.defaultHandlers = [];
haxe.io.log.Logger.defaultLevel = haxe.io.log.LogLevel.Warning;
js.io.IFrameIOPostMessage.log = haxe.io.log.Logger.debug();
js.io.IFrameIOPollingHashtag.lastMessageId = 1;
js.io.IFrameIOPollingHashtag.newFragmentsList = haxe.data.collections.List.factory();
haxe.framework._Injector.InjectorImpl.state = [];
haxe.Timer.arr = new hxrt.Array();
haxe.util.StringExtensions.SepAlphaPattern = new hxrt.EReg("(-|_)([a-z])","g");
haxe.util.StringExtensions.AlphaUpperAlphaPattern = new hxrt.EReg("-([a-z])([A-Z])","g");
haxe.data.collections.Map.MaxLoad = 10;
haxe.data.collections.Map.MinLoad = 1;
haxe.data.collections.Maps.StringString = haxe.data.collections.Map.create(hxrt.StringExtensions.HasherF(hxrt.String),hxrt.StringExtensions.EqualF(hxrt.String),hxrt.StringExtensions.HasherF(hxrt.String),hxrt.StringExtensions.EqualF(hxrt.String));
haxe.net.UrlExtensions.UrlPattern = new hxrt.EReg("^(?:([a-zA-Z]+:)(?:[/][/]))?([^:?/#\\s]*)(?:[:](\\d+))?(/[^\\s?#]+)?([?][^\\s#]*)?(#.*)?$","i");
haxe.net.UrlExtensions.Protocol = 1;
haxe.net.UrlExtensions.Hostname = 2;
haxe.net.UrlExtensions.Port = 3;
haxe.net.UrlExtensions.Pathname = 4;
haxe.net.UrlExtensions.Search = 5;
haxe.net.UrlExtensions.Hash = 6;
js.Lib.onerror = null;
js.detect.BrowserSupport.memorized = haxe.data.collections.Map.create(hxrt.StringExtensions.HasherF(hxrt.String),hxrt.StringExtensions.EqualF(hxrt.String),hxrt.BoolExtensions.HasherF(hxrt.Bool),hxrt.BoolExtensions.EqualF(hxrt.Bool));
js.dom.Quirks.ExcludePattern = new hxrt.EReg("z-?index|font-?weight|opacity|zoom|line-?height","i");
js.dom.Quirks.AlphaPattern = new hxrt.EReg("alpha\\([^)]*\\)","");
js.dom.Quirks.OpacityPattern = new hxrt.EReg("opacity=([^)]*)","");
js.dom.Quirks.FloatPattern = new hxrt.EReg("float","i");
js.dom.Quirks.UpperCasePattern = new hxrt.EReg("([A-Z])","g");
js.dom.Quirks.NumberPixelPattern = new hxrt.EReg("^-?\\d+(?:px)?$","i");
js.dom.Quirks.NumberPattern = new hxrt.EReg("^-?\\d","");
js.dom.Quirks.cssWidth = ["left","right"];
js.dom.Quirks.cssHeight = ["top","bottom"];
js.dom.Quirks.cssShow = haxe.data.collections.Map.create(hxrt.StringExtensions.HasherF(hxrt.String),hxrt.StringExtensions.EqualF(hxrt.String),hxrt.StringExtensions.HasherF(hxrt.String),hxrt.StringExtensions.EqualF(hxrt.String)).set("position","absolute").set("visibility","hidden").set("display","block");
js.dom.Quirks.border = "border";
js.dom.Quirks.margin = "margin";
js.Env.document = document;
js.Env.documentRaw = document;
js.Env.screen = screen;
js.Env.window = window;
js.Env.navigator = navigator;
js.Env.history = history;
js.Env.location = location;
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
$Main.init = hxrt.Demo.main();
