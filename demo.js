$estr = function() { return js.Boot.__string_rec(this,''); }
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
	catch( $e1 ) {
		{
			var e = $e1;
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
HaXeDemo = function() { }
HaXeDemo.__name__ = ["HaXeDemo"];
HaXeDemo.select = function(form) {
	return function(table) {
		var results = [];
		{
			var _g = 0, _g1 = table.entries;
			while(_g < _g1.length) {
				var entry = _g1[_g];
				++_g;
				var entryFields = Reflect.fields(entry);
				{
					var _g2 = 0, _g3 = Reflect.fields(form);
					while(_g2 < _g3.length) {
						var fieldName = _g3[_g2];
						++_g2;
						if(ArrayExtensions.contains(entryFields,fieldName)) {
							var type1 = Type["typeof"](Reflect.field(form,fieldName));
							var type2 = Type["typeof"](Reflect.field(entry,fieldName));
							if(!Type.enumEq(type1,type2)) break;
						}
						else {
							entry[fieldName] = Reflect.field(form,fieldName);
						}
					}
				}
				results.push(entry);
			}
		}
		return IterableExtensions.toList(results);
	}
}
HaXeDemo.equalTo = function(t) {
	return function(v) {
		return v == t;
	}
}
HaXeDemo.greaterThan = function(ref) {
	return function(v) {
		return v > ref;
	}
}
HaXeDemo.field = function(name) {
	return { is : function(f) {
		return function(v) {
			var value = Reflect.field(v,name);
			return f(value);
		}
	}}
}
HaXeDemo.main = function() {
	var table = new Table([{ name : "Sarah", age : 92},{ name : "John", age : 12},{ name : "John", age : 61},{ name : "Bob"}]);
	var selector = HaXeDemoExtensions.where(HaXeDemo.select({ name : "", age : 0}),HaXeDemoExtensions.and(HaXeDemo.field("name")["is"](HaXeDemo.equalTo("John")),HaXeDemo.field("age")["is"](HaXeDemo.greaterThan(40))));
	var results = selector(table);
	{ var $it2 = results.iterator();
	while( $it2.hasNext() ) { var result = $it2.next();
	{
		haxe.Log.trace((("name = " + result.name) + ", age = ") + result.age,{ fileName : "HaXeDemo.hx", lineNumber : 93, className : "HaXeDemo", methodName : "main"});
	}
	}}
}
HaXeDemo.prototype.__class__ = HaXeDemo;
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
	catch( $e3 ) {
		{
			var e = $e3;
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
	catch( $e4 ) {
		{
			var err = $e4;
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
	catch( $e5 ) {
		{
			var e = $e5;
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
if(typeof haxe=='undefined') haxe = {}
if(!haxe["abstract"]) haxe["abstract"] = {}
haxe.abstract.Foldable = function() { }
haxe.abstract.Foldable.__name__ = ["haxe","abstract","Foldable"];
haxe.abstract.Foldable.prototype.append = null;
haxe.abstract.Foldable.prototype.empty = null;
haxe.abstract.Foldable.prototype.foldl = null;
haxe.abstract.Foldable.prototype.__class__ = haxe.abstract.Foldable;
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
haxe.abstract.FoldableExtensions.map = function(foldable,f) {
	return foldable.foldl(foldable.empty(),function(a,b) {
		return foldable.append(a,f(b));
	});
}
haxe.abstract.FoldableExtensions.mapTo = function(src,factory,f) {
	var dest = factory();
	return src.foldl(dest.empty(),function(a,b) {
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
haxe.abstract.FoldableExtensions.flatMapTo = function(src,factory,f) {
	var dest = factory();
	return src.foldl(dest.empty(),function(a,b) {
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
	{ var $it6 = i.iterator();
	while( $it6.hasNext() ) { var e = $it6.next();
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
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype.__class__ = haxe.Log;
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
Lambda = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	{ var $it7 = it.iterator();
	while( $it7.hasNext() ) { var i = $it7.next();
	a.push(i);
	}}
	return a;
}
Lambda.list = function(it) {
	var l = new List();
	{ var $it8 = it.iterator();
	while( $it8.hasNext() ) { var i = $it8.next();
	l.add(i);
	}}
	return l;
}
Lambda.map = function(it,f) {
	var l = new List();
	{ var $it9 = it.iterator();
	while( $it9.hasNext() ) { var x = $it9.next();
	l.add(f(x));
	}}
	return l;
}
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	{ var $it10 = it.iterator();
	while( $it10.hasNext() ) { var x = $it10.next();
	l.add(f(i++,x));
	}}
	return l;
}
Lambda.has = function(it,elt,cmp) {
	if(cmp == null) {
		{ var $it11 = it.iterator();
		while( $it11.hasNext() ) { var x = $it11.next();
		if(x == elt) return true;
		}}
	}
	else {
		{ var $it12 = it.iterator();
		while( $it12.hasNext() ) { var x = $it12.next();
		if(cmp(x,elt)) return true;
		}}
	}
	return false;
}
Lambda.exists = function(it,f) {
	{ var $it13 = it.iterator();
	while( $it13.hasNext() ) { var x = $it13.next();
	if(f(x)) return true;
	}}
	return false;
}
Lambda.foreach = function(it,f) {
	{ var $it14 = it.iterator();
	while( $it14.hasNext() ) { var x = $it14.next();
	if(!f(x)) return false;
	}}
	return true;
}
Lambda.iter = function(it,f) {
	{ var $it15 = it.iterator();
	while( $it15.hasNext() ) { var x = $it15.next();
	f(x);
	}}
}
Lambda.filter = function(it,f) {
	var l = new List();
	{ var $it16 = it.iterator();
	while( $it16.hasNext() ) { var x = $it16.next();
	if(f(x)) l.add(x);
	}}
	return l;
}
Lambda.fold = function(it,f,first) {
	{ var $it17 = it.iterator();
	while( $it17.hasNext() ) { var x = $it17.next();
	first = f(x,first);
	}}
	return first;
}
Lambda.count = function(it) {
	var n = 0;
	{ var $it18 = it.iterator();
	while( $it18.hasNext() ) { var _ = $it18.next();
	++n;
	}}
	return n;
}
Lambda.empty = function(it) {
	return !it.iterator().hasNext();
}
Lambda.prototype.__class__ = Lambda;
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
DynamicExtensions.prototype.__class__ = DynamicExtensions;
BoolExtensions = function() { }
BoolExtensions.__name__ = ["BoolExtensions"];
BoolExtensions.toInt = function(v) {
	return (v?1:0);
}
BoolExtensions.toString = function(v) {
	return Std.string(v);
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
		return ("[" + Lambda.array(Lambda.map(v,function(e) {
			return show.show(e);
		})).join(", ")) + "]";
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
			{ var $it19 = f(e1).iterator();
			while( $it19.hasNext() ) { var e2 = $it19.next();
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
ArrayExtensions.prototype.__class__ = ArrayExtensions;
FunctionExtensions = function() { }
FunctionExtensions.__name__ = ["FunctionExtensions"];
FunctionExtensions.toThunk = function(t) {
	return function() {
		return t;
	}
}
FunctionExtensions.toFunction = function(t) {
	return function(s) {
		return t;
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
EitherExtensions.prototype.__class__ = EitherExtensions;
Future = function(p) { if( p === $_ ) return; {
	this._listeners = [];
	this._result = null;
	this._isSet = false;
}}
Future.__name__ = ["Future"];
Future.create = function() {
	return new Future();
}
Future.prototype._isSet = null;
Future.prototype._listeners = null;
Future.prototype._result = null;
Future.prototype.deliver = function(t) {
	if(this._isSet) Stax.error("Future already delivered");
	this._result = t;
	this._isSet = true;
	{
		var _g = 0, _g1 = this._listeners;
		while(_g < _g1.length) {
			var l = _g1[_g];
			++_g;
			l(this._result);
		}
	}
	this._listeners = [];
	return this;
}
Future.prototype.deliverTo = function(f) {
	if(this._isSet) f(this._result);
	else this._listeners.push(f);
	return this;
}
Future.prototype.filter = function(f) {
	var fut = Future.create();
	this.deliverTo(function(t) {
		if(f(t)) fut.deliver(t);
	});
	return fut;
}
Future.prototype.flatMap = function(f) {
	var fut = Future.create();
	this.deliverTo(function(t) {
		f(t).deliverTo(function(s) {
			fut.deliver(s);
		});
	});
	return fut;
}
Future.prototype.map = function(f) {
	var fut = Future.create();
	this.deliverTo(function(t) {
		fut.deliver(f(t));
	});
	return fut;
}
Future.prototype.value = function() {
	return (this._isSet?Option.Some(this._result):Option.None);
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
	{ var $it20 = i.iterator();
	while( $it20.hasNext() ) { var t = $it20.next();
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
	{ var $it21 = i.iterator();
	while( $it21.hasNext() ) { var e = $it21.next();
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
	this._equal = (equal == null?DynamicExtensions.EqualT():equal);
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
haxe.data.collections.List.prototype._equal = null;
haxe.data.collections.List.prototype.add = function(t) {
	return this.foldr(this.empty().cons(t),function(b,a) {
		return a.cons(b);
	});
}
haxe.data.collections.List.prototype.addAll = function(i) {
	var a = [];
	{ var $it22 = i.iterator();
	while( $it22.hasNext() ) { var e = $it22.next();
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
	return new haxe.data.collections._List.Cons(this._equal,head,this);
}
haxe.data.collections.List.prototype.contains = function(t) {
	var cur = this;
	{
		var _g1 = 0, _g = this.getSize();
		while(_g1 < _g) {
			var i = _g1++;
			if(this._equal.equal(t,cur.getHead())) return true;
			cur = cur.getTail();
		}
	}
	return false;
}
haxe.data.collections.List.prototype.empty = function() {
	return (this.getSize() == 0?this:haxe.data.collections.List.nil(this._equal));
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
haxe.data.collections.List.prototype.remove = function(t) {
	var pre = [];
	var post = haxe.data.collections.List.nil(this._equal);
	var cur = this;
	{
		var _g1 = 0, _g = this.getSize();
		while(_g1 < _g) {
			var i = _g1++;
			if(this._equal.equal(t,cur.getHead())) {
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
	{ var $it23 = i.iterator();
	while( $it23.hasNext() ) { var e = $it23.next();
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
	return this.empty().addAll(a);
}
haxe.data.collections.List.prototype.tail = null;
haxe.data.collections.List.prototype.toString = function() {
	return haxe.data.collections.List.ShowT(DynamicExtensions.ShowT()).show(this);
}
haxe.data.collections.List.prototype.zip = function(that) {
	var len = IntExtensions.min(this.getSize(),that.getSize());
	var iterator1 = haxe.abstract.FoldableExtensions.drop(this.reverse(),IntExtensions.max(0,this.getSize() - len)).iterator();
	var iterator2 = haxe.abstract.FoldableExtensions.drop(that.reverse(),IntExtensions.max(0,that.getSize() - len)).iterator();
	var r = haxe.data.collections.List.create(Tuple2.EqualT(this._equal,that._equal));
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
Reflect = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	if(o.hasOwnProperty != null) return o.hasOwnProperty(field);
	var arr = Reflect.fields(o);
	{ var $it24 = arr.iterator();
	while( $it24.hasNext() ) { var t = $it24.next();
	if(t == field) return true;
	}}
	return false;
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	}
	catch( $e25 ) {
		{
			var e = $e25;
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
		catch( $e26 ) {
			{
				var e = $e26;
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
haxe.data.collections.Set = function(hasher,equal,map) { if( hasher === $_ ) return; {
	this._hasher = hasher;
	this._equal = equal;
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
haxe.data.collections.Set.prototype._equal = null;
haxe.data.collections.Set.prototype._hasher = null;
haxe.data.collections.Set.prototype._map = null;
haxe.data.collections.Set.prototype.add = function(t) {
	return (this.contains(t)?this:this.copyWithMod(this._map.set(t,t)));
}
haxe.data.collections.Set.prototype.addAll = function(it) {
	var set = this;
	{ var $it27 = it.iterator();
	while( $it27.hasNext() ) { var e = $it27.next();
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
	return new haxe.data.collections.Set(this._hasher,this._equal,newMap);
}
haxe.data.collections.Set.prototype.empty = function() {
	return (this.getSize() == 0?this:haxe.data.collections.Set.create(this._hasher,this._equal));
}
haxe.data.collections.Set.prototype.foldl = function(z,f) {
	var acc = z;
	{ var $it28 = this._map.iterator();
	while( $it28.hasNext() ) { var e = $it28.next();
	{
		acc = f(acc,e._1);
	}
	}}
	return acc;
}
haxe.data.collections.Set.prototype.getSize = function() {
	return this._map.getSize();
}
haxe.data.collections.Set.prototype.iterator = function() {
	return haxe.abstract.FoldableExtensions.iterator(this);
}
haxe.data.collections.Set.prototype.remove = function(t) {
	return this.copyWithMod(this._map.removeByKey(t));
}
haxe.data.collections.Set.prototype.removeAll = function(it) {
	var set = this;
	{ var $it29 = it.iterator();
	while( $it29.hasNext() ) { var e = $it29.next();
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
HaXeDemoExtensions = function() { }
HaXeDemoExtensions.__name__ = ["HaXeDemoExtensions"];
HaXeDemoExtensions.where = function(s,f) {
	return function(table) {
		return haxe.abstract.FoldableExtensions.filter(s(table),f);
	}
}
HaXeDemoExtensions.and = function(f1,f2) {
	return function(v) {
		return f1(v) && f2(v);
	}
}
HaXeDemoExtensions.or = function(f1,f2) {
	return function(v) {
		return f1(v) || f2(v);
	}
}
HaXeDemoExtensions.not = function(f) {
	return function(v) {
		return !f(v);
	}
}
HaXeDemoExtensions.prototype.__class__ = HaXeDemoExtensions;
Table = function(a) { if( a === $_ ) return; {
	this.entries = a;
}}
Table.__name__ = ["Table"];
Table.prototype.entries = null;
Table.prototype.__class__ = Table;
haxe.data.collections.Map = function(khasher,kequal,vhasher,vequal,buckets,size) { if( khasher === $_ ) return; {
	this._keyHasher = khasher;
	this._keyEqual = kequal;
	this._valueHasher = vhasher;
	this._valueEqual = vequal;
	this._size = size;
	this._buckets = buckets;
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
		{ var $it30 = keys1.iterator();
		while( $it30.hasNext() ) { var key = $it30.next();
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
haxe.data.collections.Map.prototype._keyEqual = null;
haxe.data.collections.Map.prototype._keyHasher = null;
haxe.data.collections.Map.prototype._size = null;
haxe.data.collections.Map.prototype._valueEqual = null;
haxe.data.collections.Map.prototype._valueHasher = null;
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
			if(this._keyEqual.equal(entry._1,k)) {
				if(!this._valueEqual.equal(entry._2,v)) {
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
	{ var $it31 = i.iterator();
	while( $it31.hasNext() ) { var t = $it31.next();
	map = map.add(t);
	}}
	return map;
}
haxe.data.collections.Map.prototype.append = function(m,t) {
	return m.add(t);
}
haxe.data.collections.Map.prototype.bucketFor = function(k) {
	return this._keyHasher.hash(k) % this._buckets.length;
}
haxe.data.collections.Map.prototype.contains = function(t) {
	var tupleEqual = Tuple2.EqualT(this._keyEqual,this._valueEqual);
	{ var $it32 = this.entries().iterator();
	while( $it32.hasNext() ) { var e = $it32.next();
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
	return new haxe.data.collections.Map(this._keyHasher,this._keyEqual,this._valueHasher,this._valueEqual,newTable,this.getSize());
}
haxe.data.collections.Map.prototype.empty = function() {
	return (this.getSize() == 0?this:haxe.data.collections.Map.create(this._keyHasher,this._keyEqual,this._valueHasher,this._valueEqual));
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
	{ var $it33 = this.entries().iterator();
	while( $it33.hasNext() ) { var e = $it33.next();
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
			if(this._keyEqual.equal(e._1,k)) {
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
			$r = def;
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
haxe.data.collections.Map.prototype.iterator = function() {
	return haxe.abstract.FoldableExtensions.iterator(this);
}
haxe.data.collections.Map.prototype.keySet = function() {
	return haxe.data.collections.Set.create(this._keyHasher,this._keyEqual).addAll(this.keys());
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
		{ var $it34 = all.iterator();
		while( $it34.hasNext() ) { var e = $it34.next();
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
	{ var $it35 = i.iterator();
	while( $it35.hasNext() ) { var t = $it35.next();
	map = map.remove(t);
	}}
	return map;
}
haxe.data.collections.Map.prototype.removeAllByKey = function(i) {
	var map = this;
	{ var $it36 = i.iterator();
	while( $it36.hasNext() ) { var k = $it36.next();
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
			if(this._keyEqual.equal(entry._1,k)) {
				if(ignoreValue || this._valueEqual.equal(entry._2,v)) {
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
haxe.data.collections.Map.prototype.toString = function() {
	return haxe.data.collections.Map.ShowT(DynamicExtensions.ShowT(),DynamicExtensions.ShowT()).show(this);
}
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
haxe.data.collections.Map.__interfaces__ = [haxe.data.collections.Collection];
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
js.Lib.onerror = null;
haxe.data.collections.Map.MaxLoad = 10;
haxe.data.collections.Map.MinLoad = 1;
$Main.init = HaXeDemo.main();
