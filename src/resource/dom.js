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
	catch( $e2 ) {
		{
			var e = $e2;
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
	catch( $e3 ) {
		{
			var err = $e3;
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
	catch( $e4 ) {
		{
			var e = $e4;
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
if(!haxe.unit) haxe.unit = {}
haxe.unit.TestStatus = function(p) { if( p === $_ ) return; {
	this.done = false;
	this.success = false;
}}
haxe.unit.TestStatus.__name__ = ["haxe","unit","TestStatus"];
haxe.unit.TestStatus.prototype.backtrace = null;
haxe.unit.TestStatus.prototype.classname = null;
haxe.unit.TestStatus.prototype.done = null;
haxe.unit.TestStatus.prototype.error = null;
haxe.unit.TestStatus.prototype.method = null;
haxe.unit.TestStatus.prototype.posInfos = null;
haxe.unit.TestStatus.prototype.success = null;
haxe.unit.TestStatus.prototype.__class__ = haxe.unit.TestStatus;
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype.__class__ = haxe.Log;
haxe.Public = function() { }
haxe.Public.__name__ = ["haxe","Public"];
haxe.Public.prototype.__class__ = haxe.Public;
haxe.unit.TestCase = function(p) { if( p === $_ ) return; {
	null;
}}
haxe.unit.TestCase.__name__ = ["haxe","unit","TestCase"];
haxe.unit.TestCase.prototype.assertEquals = function(expected,actual,c) {
	this.currentTest.done = true;
	if(actual != expected) {
		this.currentTest.success = false;
		this.currentTest.error = ((("expected '" + expected) + "' but was '") + actual) + "'";
		this.currentTest.posInfos = c;
		throw this.currentTest;
	}
}
haxe.unit.TestCase.prototype.assertFalse = function(b,c) {
	this.currentTest.done = true;
	if(b == true) {
		this.currentTest.success = false;
		this.currentTest.error = "expected false but was true";
		this.currentTest.posInfos = c;
		throw this.currentTest;
	}
}
haxe.unit.TestCase.prototype.assertTrue = function(b,c) {
	this.currentTest.done = true;
	if(b == false) {
		this.currentTest.success = false;
		this.currentTest.error = "expected true but was false";
		this.currentTest.posInfos = c;
		throw this.currentTest;
	}
}
haxe.unit.TestCase.prototype.currentTest = null;
haxe.unit.TestCase.prototype.print = function(v) {
	haxe.unit.TestRunner.print(v);
}
haxe.unit.TestCase.prototype.setup = function() {
	null;
}
haxe.unit.TestCase.prototype.tearDown = function() {
	null;
}
haxe.unit.TestCase.prototype.__class__ = haxe.unit.TestCase;
haxe.unit.TestCase.__interfaces__ = [haxe.Public];
js.DomTester = function(p) { if( p === $_ ) return; {
	haxe.unit.TestCase.apply(this,[]);
	this._doc = js.EnvLib.document;
}}
js.DomTester.__name__ = ["js","DomTester"];
js.DomTester.__super__ = haxe.unit.TestCase;
for(var k in haxe.unit.TestCase.prototype ) js.DomTester.prototype[k] = haxe.unit.TestCase.prototype[k];
js.DomTester.prototype._doc = null;
js.DomTester.prototype.alertObject = function(obj) {
	
        (function(){for (key in obj) {
            alert(key);
        }})();
}
js.DomTester.prototype.handleEvent = function(e) {
	haxe.Log.trace("test working",{ fileName : "HDomTester.hx", lineNumber : 34, className : "js.DomTester", methodName : "handleEvent"});
}
js.DomTester.prototype.testChangeElementStyle = function() {
	var main = this._doc.getElementById("main");
	this.assertEquals("",main.style.display,{ fileName : "HDomTester.hx", lineNumber : 91, className : "js.DomTester", methodName : "testChangeElementStyle"});
	main.style.display = "none";
	this.assertEquals("none",main.style.display,{ fileName : "HDomTester.hx", lineNumber : 95, className : "js.DomTester", methodName : "testChangeElementStyle"});
	main.style.display = "inherit";
}
js.DomTester.prototype.testDIVHasProperties = function() {
	var div = this._doc.getElementsByTagName("DIV")[0];
	var properties = ["nodeType","parentNode","childNodes","firstChild","lastChild","previousSibling","nextSibling","attributes","ownerDocument","namespaceURI","localName","baseURI","textContent"];
	this.verifyThatPropertiesExist(div,properties,{ fileName : "HDomTester.hx", lineNumber : 151, className : "js.DomTester", methodName : "testDIVHasProperties"});
}
js.DomTester.prototype.testDOMImplementationHasMethods = function() {
	var impl = this._doc.implementation;
	var methods = ["hasFeature","createDocumentType","createDocument"];
	this.verifyThatMethodsExist(impl,methods,{ fileName : "HDomTester.hx", lineNumber : 163, className : "js.DomTester", methodName : "testDOMImplementationHasMethods"});
}
js.DomTester.prototype.testDivNodeHasMethods = function() {
	var div = this._doc.getElementsByTagName("DIV")[0];
	var methods = ["hasChildNodes","replaceChild","removeChild","appendChild","cloneNode","normalize","isSupported","hasAttributes","addEventListener","removeEventListener","dispatchEvent","compareDocumentPosition","isSameNode","lookupPrefix","isDefaultNamespace","lookupNamespaceURI","isEqualNode"];
	this.verifyThatMethodsExist(div,methods,{ fileName : "HDomTester.hx", lineNumber : 129, className : "js.DomTester", methodName : "testDivNodeHasMethods"});
}
js.DomTester.prototype.testDocumentAttributesGetNamedItemNodeValue = function() {
	var main = this._doc.getElementById("main");
	var nodeValue = main.attributes.getNamedItem("name").nodeValue;
	this.assertEquals("Primary Content",nodeValue,{ fileName : "HDomTester.hx", lineNumber : 56, className : "js.DomTester", methodName : "testDocumentAttributesGetNamedItemNodeValue"});
}
js.DomTester.prototype.testDocumentGetElementById = function() {
	var main = this._doc.getElementById("main");
	this.assertEquals("DIV",main.nodeName,{ fileName : "HDomTester.hx", lineNumber : 49, className : "js.DomTester", methodName : "testDocumentGetElementById"});
}
js.DomTester.prototype.testNamedNodeMapHasMethods = function() {
	var map = this._doc.getElementsByTagName("DIV")[0].attributes;
	var methods = ["getNamedItem","setNamedItem","removeNamedItem","item","getNamedItemNS","setNamedItemNS","removeNamedItemNS"];
	this.verifyThatMethodsExist(map,methods,{ fileName : "HDomTester.hx", lineNumber : 179, className : "js.DomTester", methodName : "testNamedNodeMapHasMethods"});
}
js.DomTester.prototype.testSetup = function() {
	var clickText = this._doc.getElementById("text");
	var self = this;
	clickText.addEventListener("click",function(e) {
		self.handleEvent(e);
	},false);
	this.assertTrue(true,{ fileName : "HDomTester.hx", lineNumber : 43, className : "js.DomTester", methodName : "testSetup"});
}
js.DomTester.prototype.testTextNodeCanBeSet = function() {
	var main = this._doc.getElementById("text");
	var text = main.firstChild.nodeValue;
	this.assertEquals("Click Me",text,{ fileName : "HDomTester.hx", lineNumber : 81, className : "js.DomTester", methodName : "testTextNodeCanBeSet"});
	text = "Something";
	this.assertEquals("Something",text,{ fileName : "HDomTester.hx", lineNumber : 85, className : "js.DomTester", methodName : "testTextNodeCanBeSet"});
}
js.DomTester.prototype.testTextNodeHasMethods = function() {
	var textNode = this._doc.createTextNode("new");
	textNode.nodeValue = "new text node";
	var methods = ["splitText","replaceWholeText","substringData","appendData","insertData","deleteData","replaceData","hasChildNodes","replaceChild","removeChild","appendChild","cloneNode","normalize","isSupported","hasAttributes","addEventListener","removeEventListener","dispatchEvent","compareDocumentPosition","isSameNode","lookupPrefix","isDefaultNamespace","lookupNamespaceURI","isEqualNode"];
	this.verifyThatMethodsExist(textNode,methods,{ fileName : "HDomTester.hx", lineNumber : 212, className : "js.DomTester", methodName : "testTextNodeHasMethods"});
}
js.DomTester.prototype.testThatApplicationCacheHasPropertiesAndMethods = function() {
	var appCache = js.EnvLib.window.applicationCache;
	var properties = ["status"];
	this.verifyThatPropertiesExist(appCache,properties,{ fileName : "HDomTester.hx", lineNumber : 1780, className : "js.DomTester", methodName : "testThatApplicationCacheHasPropertiesAndMethods"});
	var methods = ["swapCache","update","dispatchEvent","addEventListener","removeEventListener"];
	this.verifyThatMethodsExist(appCache,methods,{ fileName : "HDomTester.hx", lineNumber : 1801, className : "js.DomTester", methodName : "testThatApplicationCacheHasPropertiesAndMethods"});
}
js.DomTester.prototype.testThatAttrHasProperties = function() {
	var main = this._doc.getElementById("main");
	var attr = this._doc.createAttribute("main");
	main.setAttributeNode(attr);
	var properties = ["name","specified","value","ownerElement"];
	this.verifyThatPropertiesExist(attr,properties,{ fileName : "HDomTester.hx", lineNumber : 74, className : "js.DomTester", methodName : "testThatAttrHasProperties"});
}
js.DomTester.prototype.testThatBarPropHasProperties = function() {
	var barProp = js.EnvLib.window.locationbar;
	var properties = ["visible"];
	this.verifyThatPropertiesExist(barProp,properties,{ fileName : "HDomTester.hx", lineNumber : 1769, className : "js.DomTester", methodName : "testThatBarPropHasProperties"});
}
js.DomTester.prototype.testThatCSSRuleHasProperties = function() {
	var stylesheet = this._doc.styleSheets[0];
	var rule = stylesheet.cssRules[0];
	var properties = ["type","cssText","parentStyleSheet"];
	this.verifyThatPropertiesExist(rule,properties,{ fileName : "HDomTester.hx", lineNumber : 1580, className : "js.DomTester", methodName : "testThatCSSRuleHasProperties"});
}
js.DomTester.prototype.testThatCSSStyleDeclarationHasPropertiesAndMethods = function() {
	var div = this._doc.getElementsByTagName("DIV")[0];
	var cssStyleDeclaration = div.style;
	var properties = ["length","cssText"];
	this.verifyThatPropertiesExist(cssStyleDeclaration,properties,{ fileName : "HDomTester.hx", lineNumber : 1594, className : "js.DomTester", methodName : "testThatCSSStyleDeclarationHasPropertiesAndMethods"});
	var methods = ["removeProperty","getPropertyPriority","getPropertyValue","getPropertyCSSValue","item","setProperty"];
	this.verifyThatMethodsExist(cssStyleDeclaration,methods,{ fileName : "HDomTester.hx", lineNumber : 1607, className : "js.DomTester", methodName : "testThatCSSStyleDeclarationHasPropertiesAndMethods"});
}
js.DomTester.prototype.testThatCSSStyleSheetHasMethodsAndProperties = function() {
	var styleSheet = this._doc.styleSheets[0];
	var properties = ["ownerNode","cssRules","type","disabled","media"];
	this.verifyThatPropertiesExist(styleSheet,properties,{ fileName : "HDomTester.hx", lineNumber : 1559, className : "js.DomTester", methodName : "testThatCSSStyleSheetHasMethodsAndProperties"});
	var methods = ["insertRule","deleteRule"];
	this.verifyThatMethodsExist(styleSheet,methods,{ fileName : "HDomTester.hx", lineNumber : 1566, className : "js.DomTester", methodName : "testThatCSSStyleSheetHasMethodsAndProperties"});
}
js.DomTester.prototype.testThatCreateXMLHttpRequestWorks = function() {
	var req = js.EnvLib.createXMLHttpRequest();
	this.assertTrue(Type["typeof"](req) != null,{ fileName : "HDomTester.hx", lineNumber : 1921, className : "js.DomTester", methodName : "testThatCreateXMLHttpRequestWorks"});
}
js.DomTester.prototype.testThatDecodeURIComponentWorks = function() {
	var encodedURI = js.EnvLib.decodeURIComponent("Thyme%20%26time%3Dagain");
	this.assertEquals("Thyme &time=again",encodedURI,{ fileName : "HDomTester.hx", lineNumber : 1885, className : "js.DomTester", methodName : "testThatDecodeURIComponentWorks"});
}
js.DomTester.prototype.testThatDecodeURIWorks = function() {
	var decodedURI = js.EnvLib.decodeURI("~!@#$%25%5E&*()%7B%7D%5B%5D=:/,;?+'%22%5C");
	this.assertEquals("~!@#$%^&*(){}[]=:/,;?+'\"\\",decodedURI,{ fileName : "HDomTester.hx", lineNumber : 1873, className : "js.DomTester", methodName : "testThatDecodeURIWorks"});
}
js.DomTester.prototype.testThatDocumentHasMethods = function() {
	var doc = this._doc;
	var methods = ["adoptNode","appendChild","cloneNode","close","compareDocumentPosition","createAttributeNS","createAttribute","captureEvents","addEventListener","createCDATASection","createComment","createDocumentFragment","createElement","createElementNS","createEntityReference","createEvent","createExpression","createNSResolver","createRange","createTextNode","createTreeWalker","elementFromPoint","evaluate","execCommand","getElementById","getElementsByClassName","getElementsByName","getElementsByTagName","getElementsByTagNameNS","getSelection","hasAttributes","hasChildNodes","hasFocus","importNode","insertBefore","isDefaultNamespace","isEqualNode","isSameNode","isSupported","lookupNamespaceURI","lookupPrefix","normalize","open","queryCommandEnabled","queryCommandIndeterm","queryCommandState","queryCommandSupported","queryCommandValue","querySelector","querySelectorAll","releaseEvents","removeChild","removeEventListener","replaceChild","write","writeln"];
	this.verifyThatMethodsExist(doc,methods,{ fileName : "HDomTester.hx", lineNumber : 504, className : "js.DomTester", methodName : "testThatDocumentHasMethods"});
}
js.DomTester.prototype.testThatDocumentHasProperties = function() {
	var doc = this._doc;
	var properties = ["activeElement","anchors","applets","body","characterSet","childNodes","compatMode","cookie","defaultView","designMode","dir","doctype","documentElement","documentURI","domain","embeds","firstChild","forms","height","images","implementation","inputEncoding","lastChild","lastModified","links","location","nodeName","nodeType","plugins","readyState","referrer","styleSheets","title","URL","width"];
	this.verifyThatPropertiesExist(doc,properties,{ fileName : "HDomTester.hx", lineNumber : 433, className : "js.DomTester", methodName : "testThatDocumentHasProperties"});
}
js.DomTester.prototype.testThatDocumentTypeHasProperties = function() {
	var docType = this._doc.doctype;
	var properties = ["name","publicId","systemId"];
	this.verifyThatPropertiesExist(docType,properties,{ fileName : "HDomTester.hx", lineNumber : 388, className : "js.DomTester", methodName : "testThatDocumentTypeHasProperties"});
}
js.DomTester.prototype.testThatElementHasMethods = function() {
	var element1 = this._doc.createElement("div");
	this._doc.createAttribute("id");
	element1.setAttribute("id","created-element");
	element1.setAttribute("value","hasValue");
	element1.setAttribute("name","hasName");
	var element2 = this._doc.createElement("div");
	element2.setAttribute("id","created-element-sibling");
	var main = this._doc.getElementById("main");
	main.appendChild(element1);
	main.appendChild(element2);
	var element = this._doc.getElementById("created-element");
	var methods = ["addEventListener","appendChild","cloneNode","compareDocumentPosition","dispatchEvent","focus","getAttribute","getAttributeNS","getAttributeNode","getAttributeNodeNS","getBoundingClientRect","getClientRects","getElementsByClassName","getElementsByTagName","getElementsByTagNameNS","hasAttribute","hasChildNodes","insertBefore","isDefaultNamespace","isSupported","lookupNamespaceURI","lookupPrefix","normalize","querySelector","querySelectorAll","removeAttribute","removeAttributeNS","removeAttributeNode","removeChild","removeEventListener","replaceChild","scrollIntoView","setAttribute","setAttributeNS","setAttributeNode","setAttributeNodeNS"];
	this.verifyThatMethodsExist(element,methods,{ fileName : "HDomTester.hx", lineNumber : 373, className : "js.DomTester", methodName : "testThatElementHasMethods"});
}
js.DomTester.prototype.testThatElementHasProperties = function() {
	var element1 = this._doc.createElement("div");
	this._doc.createAttribute("id");
	element1.setAttribute("id","created-element");
	element1.setAttribute("value","hasValue");
	element1.setAttribute("name","hasName");
	var element2 = this._doc.createElement("div");
	element2.setAttribute("id","created-element-sibling");
	var main = this._doc.getElementById("main");
	main.appendChild(element1);
	main.appendChild(element2);
	var element = this._doc.getElementById("created-element");
	var childspan = this._doc.createElement("span");
	childspan.setAttribute("class","text");
	element.appendChild(childspan);
	var properties = ["tagName","scrollTop","scrollLeft","scrollWidth","scrollHeight","clientHeight","clientWidth","attributes","childElementCount","childNodes","className","dir","firstChild","firstElementChild","id","innerHTML","lang","lastChild","lastElementChild","localName","namespaceURI","nextSibling","nextElementSibling","nodeName","nodeType","offsetHeight","offsetLeft","offsetTop","offsetWidth","ownerDocument","parentNode","previousSibling","previousElementSibling","style","tabIndex","textContent","title"];
	this.verifyThatPropertiesExist(element,properties,{ fileName : "HDomTester.hx", lineNumber : 311, className : "js.DomTester", methodName : "testThatElementHasProperties"});
}
js.DomTester.prototype.testThatEncodeURIComponentWorks = function() {
	var encodedURI = js.EnvLib.encodeURIComponent("Thyme &time=again");
	this.assertEquals("Thyme%20%26time%3Dagain",encodedURI,{ fileName : "HDomTester.hx", lineNumber : 1879, className : "js.DomTester", methodName : "testThatEncodeURIComponentWorks"});
}
js.DomTester.prototype.testThatEncodeURIWorks = function() {
	var encodedURI = js.EnvLib.encodeURI("~!@#$%^&*(){}[]=:/,;?+'\"\\");
	this.assertEquals("~!@#$%25%5E&*()%7B%7D%5B%5D=:/,;?+'%22%5C",encodedURI,{ fileName : "HDomTester.hx", lineNumber : 1867, className : "js.DomTester", methodName : "testThatEncodeURIWorks"});
}
js.DomTester.prototype.testThatEscapeWorks = function() {
	var escapedString = js.EnvLib.escape("http://www.google.com?q=quadrilateral");
	this.assertEquals("http%3A//www.google.com%3Fq%3Dquadrilateral",escapedString,{ fileName : "HDomTester.hx", lineNumber : 1891, className : "js.DomTester", methodName : "testThatEscapeWorks"});
}
js.DomTester.prototype.testThatHTMLAnchorElementHasPropertiesAndMethods = function() {
	var anchor = this._doc.getElementsByTagName("a")[0];
	var properties = ["accessKey","charset","coords","href","hreflang","name","rel","rev","shape","tabIndex","target","type"];
	this.verifyThatPropertiesExist(anchor,properties,{ fileName : "HDomTester.hx", lineNumber : 1126, className : "js.DomTester", methodName : "testThatHTMLAnchorElementHasPropertiesAndMethods"});
	var methods = ["blur","focus"];
	this.verifyThatMethodsExist(anchor,methods,{ fileName : "HDomTester.hx", lineNumber : 1133, className : "js.DomTester", methodName : "testThatHTMLAnchorElementHasPropertiesAndMethods"});
}
js.DomTester.prototype.testThatHTMLAppletElementHasProperties = function() {
	var applet = this._doc.getElementsByTagName("applet")[0];
	var properties = ["align","alt","archive","code","codeBase","height","hspace","name","object","vspace","width"];
	this.verifyThatPropertiesExist(applet,properties,{ fileName : "HDomTester.hx", lineNumber : 1232, className : "js.DomTester", methodName : "testThatHTMLAppletElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLAreaElementHasProperties = function() {
	var area = this._doc.getElementsByTagName("area")[0];
	var properties = ["accessKey","alt","coords","href","noHref","shape","tabIndex","target"];
	this.verifyThatPropertiesExist(area,properties,{ fileName : "HDomTester.hx", lineNumber : 1260, className : "js.DomTester", methodName : "testThatHTMLAreaElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLBRElementHasProperties = function() {
	var br = this._doc.getElementsByTagName("br")[0];
	var properties = ["clear"];
	this.verifyThatPropertiesExist(br,properties,{ fileName : "HDomTester.hx", lineNumber : 1057, className : "js.DomTester", methodName : "testThatHTMLBRElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLBaseElementHasProperties = function() {
	var element = this._doc.getElementsByTagName("base")[0];
	var baseElement = element;
	var properties = ["id","href","target"];
	this.verifyThatPropertiesExist(baseElement,properties,{ fileName : "HDomTester.hx", lineNumber : 802, className : "js.DomTester", methodName : "testThatHTMLBaseElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLBaseFontElementHasProperties = function() {
	var baseFont = this._doc.getElementsByTagName("baseFont")[0];
	var properties = ["color","face","size"];
	this.verifyThatPropertiesExist(baseFont,properties,{ fileName : "HDomTester.hx", lineNumber : 1069, className : "js.DomTester", methodName : "testThatHTMLBaseFontElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLBodyElementHasProperties = function() {
	var element = this._doc.getElementsByTagName("body")[0];
	var bodyElement = element;
	var properties = ["aLink","background","bgColor","link","text","vLink"];
	this.verifyThatPropertiesExist(bodyElement,properties,{ fileName : "HDomTester.hx", lineNumber : 831, className : "js.DomTester", methodName : "testThatHTMLBodyElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLButtonElementHasProperties = function() {
	var element = this._doc.getElementsByTagName("button")[0];
	var buttonElement = element;
	var properties = ["id","lang","name","style","tabIndex","title","type","value"];
	this.verifyThatPropertiesExist(buttonElement,properties,{ fileName : "HDomTester.hx", lineNumber : 896, className : "js.DomTester", methodName : "testThatHTMLButtonElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLCaptionElementHasProperties = function() {
	var caption = this._doc.getElementsByTagName("caption")[0];
	var properties = ["align"];
	this.verifyThatPropertiesExist(caption,properties,{ fileName : "HDomTester.hx", lineNumber : 1322, className : "js.DomTester", methodName : "testThatHTMLCaptionElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLCollectionHasMethodsAndProperties = function() {
	var doc = this._doc;
	var anchors = doc.anchors;
	var methods = ["item","namedItem"];
	this.verifyThatMethodsExist(anchors,methods,{ fileName : "HDomTester.hx", lineNumber : 550, className : "js.DomTester", methodName : "testThatHTMLCollectionHasMethodsAndProperties"});
	var properties = ["length"];
	this.verifyThatPropertiesExist(anchors,properties,{ fileName : "HDomTester.hx", lineNumber : 556, className : "js.DomTester", methodName : "testThatHTMLCollectionHasMethodsAndProperties"});
}
js.DomTester.prototype.testThatHTMLDListElementHasProperties = function() {
	var oList = this._doc.getElementsByTagName("ol")[0];
	var dList = oList;
	var properties = ["compact"];
	this.verifyThatPropertiesExist(dList,properties,{ fileName : "HDomTester.hx", lineNumber : 965, className : "js.DomTester", methodName : "testThatHTMLDListElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLDirectoryElementHasProperties = function() {
	var dir = this._doc.getElementsByTagName("dir")[0];
	var properties = ["compact"];
	this.verifyThatPropertiesExist(dir,properties,{ fileName : "HDomTester.hx", lineNumber : 975, className : "js.DomTester", methodName : "testThatHTMLDirectoryElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLDivElementHasProperties = function() {
	var div = this._doc.getElementsByTagName("div")[0];
	var properties = ["align"];
	this.verifyThatPropertiesExist(div,properties,{ fileName : "HDomTester.hx", lineNumber : 1006, className : "js.DomTester", methodName : "testThatHTMLDivElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLDocumentHasMethods = function() {
	var doc = this._doc;
	var methods = ["open","close","write","writeln","getElementsByName"];
	this.verifyThatMethodsExist(doc,methods,{ fileName : "HDomTester.hx", lineNumber : 518, className : "js.DomTester", methodName : "testThatHTMLDocumentHasMethods"});
}
js.DomTester.prototype.testThatHTMLDocumentHasProperties = function() {
	var doc = this._doc;
	var properties = ["title","referrer","domain","URL","body","images","applets","links","forms","anchors","cookie"];
	this.verifyThatPropertiesExist(doc,properties,{ fileName : "HDomTester.hx", lineNumber : 538, className : "js.DomTester", methodName : "testThatHTMLDocumentHasProperties"});
}
js.DomTester.prototype.testThatHTMLElementHasMethodsAndProperties = function() {
	var element = this._doc.getElementById("inset-div-1");
	var selectedElement = element;
	var methods = ["addEventListener","appendChild","blur","cloneNode","compareDocumentPosition","dispatchEvent","focus","getAttribute","getAttributeNS","getAttributeNode","getAttributeNodeNS","getBoundingClientRect","getClientRects","getElementsByClassName","getElementsByTagName","getElementsByTagNameNS","hasAttribute","hasAttributeNS","hasAttributes","hasChildNodes","insertBefore","isDefaultNamespace","isEqualNode","isSameNode","isSupported","lookupNamespaceURI","lookupPrefix","normalize","querySelector","querySelectorAll","removeAttribute","removeAttributeNS","removeAttributeNode","removeChild","removeEventListener","replaceChild","scrollIntoView","setAttribute","setAttributeNS","setAttributeNode","setAttributeNodeNS"];
	this.verifyThatMethodsExist(selectedElement,methods,{ fileName : "HDomTester.hx", lineNumber : 672, className : "js.DomTester", methodName : "testThatHTMLElementHasMethodsAndProperties"});
	var properties = ["attributes","baseURI","childElementCount","childNodes","children","className","clientHeight","clientLeft","clientTop","clientWidth","contentEditable","dir","firstChild","firstElementChild","id","innerHTML","lang","lastChild","lastElementChild","localName","namespaceURI","nextSibling","nextElementSibling","nodeName","nodeType","offsetHeight","offsetLeft","offsetParent","offsetTop","offsetWidth","ownerDocument","parentNode","previousSibling","previousElementSibling","scrollHeight","scrollLeft","scrollTop","scrollWidth","style","tabIndex","tagName","textContent","title"];
	this.verifyThatPropertiesExist(selectedElement,properties,{ fileName : "HDomTester.hx", lineNumber : 722, className : "js.DomTester", methodName : "testThatHTMLElementHasMethodsAndProperties"});
}
js.DomTester.prototype.testThatHTMLFieldSetElementHasProperties = function() {
	var fieldSet = this._doc.getElementsByTagName("legend")[0];
	var properties = ["form"];
	this.verifyThatPropertiesExist(fieldSet,properties,{ fileName : "HDomTester.hx", lineNumber : 919, className : "js.DomTester", methodName : "testThatHTMLFieldSetElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLFontElementHasProperties = function() {
	var font = this._doc.getElementsByTagName("font")[0];
	var properties = ["color","face","size"];
	this.verifyThatPropertiesExist(font,properties,{ fileName : "HDomTester.hx", lineNumber : 1081, className : "js.DomTester", methodName : "testThatHTMLFontElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLFormElementHasMethodsAndProperties = function() {
	var element = this._doc.getElementById("form-element");
	var selectElement = element;
	var methods = ["submit","reset"];
	this.verifyThatMethodsExist(selectElement,methods,{ fileName : "HDomTester.hx", lineNumber : 605, className : "js.DomTester", methodName : "testThatHTMLFormElementHasMethodsAndProperties"});
	var properties = ["elements","length","name","acceptCharset","action","enctype","method","target"];
	this.verifyThatPropertiesExist(selectElement,properties,{ fileName : "HDomTester.hx", lineNumber : 618, className : "js.DomTester", methodName : "testThatHTMLFormElementHasMethodsAndProperties"});
}
js.DomTester.prototype.testThatHTMLHeadElementHasProperties = function() {
	var headElement = this._doc.getElementsByTagName("head")[0];
	var properties = ["profile"];
	this.verifyThatPropertiesExist(headElement,properties,{ fileName : "HDomTester.hx", lineNumber : 742, className : "js.DomTester", methodName : "testThatHTMLHeadElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLHeadingElementHasProperties = function() {
	var heading = this._doc.getElementsByTagName("h1")[0];
	var properties = ["align"];
	this.verifyThatPropertiesExist(heading,properties,{ fileName : "HDomTester.hx", lineNumber : 1026, className : "js.DomTester", methodName : "testThatHTMLHeadingElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLHrElementHasProperties = function() {
	var hr = this._doc.getElementsByTagName("hr")[0];
	var properties = ["align","noShade","size","width"];
	this.verifyThatPropertiesExist(hr,properties,{ fileName : "HDomTester.hx", lineNumber : 1094, className : "js.DomTester", methodName : "testThatHTMLHrElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLHtmlElementHasProperties = function() {
	var htmlElement = this._doc.getElementsByTagName("html")[0];
	var properties = ["version"];
	this.verifyThatPropertiesExist(htmlElement,properties,{ fileName : "HDomTester.hx", lineNumber : 732, className : "js.DomTester", methodName : "testThatHTMLHtmlElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLIFrameElementHasProperties = function() {
	var iframe = this._doc.getElementsByTagName("iframe")[0];
	var properties = ["align","frameBorder","height","longDesc","marginHeight","name","scrolling","src","width","contentDocument","contentWindow"];
	this.verifyThatPropertiesExist(iframe,properties,{ fileName : "HDomTester.hx", lineNumber : 1426, className : "js.DomTester", methodName : "testThatHTMLIFrameElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLImgElementHasProperties = function() {
	var img = this._doc.getElementsByTagName("img")[0];
	var properties = ["name","align","alt","border","height","hspace","isMap","longDesc","src","useMap","vspace","width"];
	this.verifyThatPropertiesExist(img,properties,{ fileName : "HDomTester.hx", lineNumber : 1172, className : "js.DomTester", methodName : "testThatHTMLImgElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLInputElementHasMethodsAndProperties = function() {
	var element = this._doc.getElementById("submit-input");
	var selectElement = element;
	var methods = ["blur","focus","select","click"];
	this.verifyThatMethodsExist(selectElement,methods,{ fileName : "HDomTester.hx", lineNumber : 570, className : "js.DomTester", methodName : "testThatHTMLInputElementHasMethodsAndProperties"});
	var properties = ["defaultValue","defaultChecked","form","accept","accessKey","align","alt","checked","disabled","maxLength","name","readOnly","size","src","tabIndex","type","useMap","value"];
	this.verifyThatPropertiesExist(selectElement,properties,{ fileName : "HDomTester.hx", lineNumber : 593, className : "js.DomTester", methodName : "testThatHTMLInputElementHasMethodsAndProperties"});
}
js.DomTester.prototype.testThatHTMLLabelElementHasProperties = function() {
	var element = this._doc.getElementsByTagName("label")[0];
	var labelElement = element;
	var properties = ["form","accessKey","htmlFor"];
	this.verifyThatPropertiesExist(labelElement,properties,{ fileName : "HDomTester.hx", lineNumber : 909, className : "js.DomTester", methodName : "testThatHTMLLabelElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLLegendElementHasProperties = function() {
	var fieldSet = this._doc.getElementsByTagName("legend")[0];
	var properties = ["form","accessKey","align"];
	this.verifyThatPropertiesExist(fieldSet,properties,{ fileName : "HDomTester.hx", lineNumber : 931, className : "js.DomTester", methodName : "testThatHTMLLegendElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLLiElementHasProperties = function() {
	var li = this._doc.getElementsByTagName("li")[0];
	var properties = ["type","value"];
	this.verifyThatPropertiesExist(li,properties,{ fileName : "HDomTester.hx", lineNumber : 996, className : "js.DomTester", methodName : "testThatHTMLLiElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLLinkElementHasProperties = function() {
	var element = this._doc.getElementById("link-element");
	var linkElement = element;
	var properties = ["charset","disabled","href","hreflang","media","rel","rev","target","type"];
	this.verifyThatPropertiesExist(linkElement,properties,{ fileName : "HDomTester.hx", lineNumber : 761, className : "js.DomTester", methodName : "testThatHTMLLinkElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLMapElementHasProperties = function() {
	var map = this._doc.getElementsByTagName("map")[0];
	var properties = ["areas","name"];
	this.verifyThatPropertiesExist(map,properties,{ fileName : "HDomTester.hx", lineNumber : 1243, className : "js.DomTester", methodName : "testThatHTMLMapElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLMenuElementHasProperties = function() {
	var menu = this._doc.getElementsByTagName("menu")[0];
	var properties = ["compact"];
	this.verifyThatPropertiesExist(menu,properties,{ fileName : "HDomTester.hx", lineNumber : 985, className : "js.DomTester", methodName : "testThatHTMLMenuElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLMetaElementHasProperties = function() {
	var element = this._doc.getElementsByTagName("meta")[0];
	var metaElement = element;
	var properties = ["content","httpEquiv","lang","id","dir","name","scheme"];
	this.verifyThatPropertiesExist(metaElement,properties,{ fileName : "HDomTester.hx", lineNumber : 789, className : "js.DomTester", methodName : "testThatHTMLMetaElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLModElementHasProperties = function() {
	var mod = this._doc.getElementsByTagName("ins")[0];
	var properties = ["cite","dateTime"];
	this.verifyThatPropertiesExist(mod,properties,{ fileName : "HDomTester.hx", lineNumber : 1105, className : "js.DomTester", methodName : "testThatHTMLModElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLOListElementHasProperties = function() {
	var oList = this._doc.getElementsByTagName("ol")[0];
	var properties = ["compact","start","type"];
	this.verifyThatPropertiesExist(oList,properties,{ fileName : "HDomTester.hx", lineNumber : 954, className : "js.DomTester", methodName : "testThatHTMLOListElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLObjectElementHasProperties = function() {
	var object = this._doc.getElementsByTagName("object")[0];
	var properties = ["form","code","align","archive","border","codeBase","codeType","data","declare","height","hspace","name","standby","tabIndex","type","useMap","vspace","width"];
	this.verifyThatPropertiesExist(object,properties,{ fileName : "HDomTester.hx", lineNumber : 1199, className : "js.DomTester", methodName : "testThatHTMLObjectElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLOptionElementHasProperties = function() {
	var element = this._doc.getElementsByTagName("option")[1];
	var optionElement = element;
	var properties = ["form","defaultSelected","text","index","disabled","label","selected","value"];
	this.verifyThatPropertiesExist(optionElement,properties,{ fileName : "HDomTester.hx", lineNumber : 849, className : "js.DomTester", methodName : "testThatHTMLOptionElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLParagraphElementHasProperties = function() {
	var paragraph = this._doc.getElementsByTagName("p")[0];
	var properties = ["align"];
	this.verifyThatPropertiesExist(paragraph,properties,{ fileName : "HDomTester.hx", lineNumber : 1016, className : "js.DomTester", methodName : "testThatHTMLParagraphElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLParamElementHasProperties = function() {
	var param = this._doc.getElementsByTagName("param")[0];
	var properties = ["name","type","value","valueType"];
	this.verifyThatPropertiesExist(param,properties,{ fileName : "HDomTester.hx", lineNumber : 1212, className : "js.DomTester", methodName : "testThatHTMLParamElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLPreElementHasProperties = function() {
	var pre = this._doc.getElementsByTagName("pre")[0];
	var properties = ["width"];
	this.verifyThatPropertiesExist(pre,properties,{ fileName : "HDomTester.hx", lineNumber : 1046, className : "js.DomTester", methodName : "testThatHTMLPreElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLQuoteElementHasProperties = function() {
	var quote = this._doc.getElementsByTagName("q")[0];
	var properties = ["cite"];
	this.verifyThatPropertiesExist(quote,properties,{ fileName : "HDomTester.hx", lineNumber : 1036, className : "js.DomTester", methodName : "testThatHTMLQuoteElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLScriptElementHasProperties = function() {
	var script = this._doc.getElementsByTagName("script")[0];
	var properties = ["text","htmlFor","event","charset","defer","src","type"];
	this.verifyThatPropertiesExist(script,properties,{ fileName : "HDomTester.hx", lineNumber : 1276, className : "js.DomTester", methodName : "testThatHTMLScriptElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLStyleElementHasProperties = function() {
	var element = this._doc.getElementsByTagName("style")[0];
	var styleElement = element;
	var properties = ["media","type","disabled"];
	this.verifyThatPropertiesExist(styleElement,properties,{ fileName : "HDomTester.hx", lineNumber : 815, className : "js.DomTester", methodName : "testThatHTMLStyleElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLTableCellElementHasProperties = function() {
	var tableDivision = this._doc.getElementsByTagName("td")[0];
	var properties = ["cellIndex","abbr","align","axis","bgColor","ch","chOff","colSpan","headers","height","noWrap","rowSpan","scope","vAlign","width"];
	this.verifyThatPropertiesExist(tableDivision,properties,{ fileName : "HDomTester.hx", lineNumber : 1406, className : "js.DomTester", methodName : "testThatHTMLTableCellElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLTableColumnElementHasProperties = function() {
	var tableColumn = this._doc.getElementsByTagName("col")[0];
	var properties = ["align","ch","chOff","span","vAlign","width"];
	this.verifyThatPropertiesExist(tableColumn,properties,{ fileName : "HDomTester.hx", lineNumber : 1337, className : "js.DomTester", methodName : "testThatHTMLTableColumnElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLTableElementHasPropertiesAndMethods = function() {
	var table = this._doc.getElementsByTagName("table")[0];
	var properties = ["caption","tHead","tFoot","rows","tBodies","align","bgColor","border","cellPadding","cellSpacing","frame","rules","summary","width"];
	this.verifyThatPropertiesExist(table,properties,{ fileName : "HDomTester.hx", lineNumber : 1299, className : "js.DomTester", methodName : "testThatHTMLTableElementHasPropertiesAndMethods"});
	var methods = ["createTHead","deleteTHead","createTFoot","deleteTFoot","createCaption","deleteCaption","insertRow","deleteRow"];
	this.verifyThatMethodsExist(table,methods,{ fileName : "HDomTester.hx", lineNumber : 1312, className : "js.DomTester", methodName : "testThatHTMLTableElementHasPropertiesAndMethods"});
}
js.DomTester.prototype.testThatHTMLTableRowElementHasProperties = function() {
	var tableRow = this._doc.getElementsByTagName("tr")[0];
	var properties = ["rowIndex","sectionRowIndex","cells","align","bgColor","ch","chOff","vAlign"];
	var methods = ["insertCell","deleteCell"];
	this.verifyThatMethodsExist(tableRow,methods,{ fileName : "HDomTester.hx", lineNumber : 1380, className : "js.DomTester", methodName : "testThatHTMLTableRowElementHasProperties"});
	this.verifyThatPropertiesExist(tableRow,properties,{ fileName : "HDomTester.hx", lineNumber : 1382, className : "js.DomTester", methodName : "testThatHTMLTableRowElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLTableSectionElementHasPropertiesAndMethods = function() {
	var section = this._doc.getElementsByTagName("thead")[0];
	var properties = ["align","ch","chOff","vAlign","rows"];
	var methods = ["insertRow","deleteRow"];
	this.verifyThatMethodsExist(section,methods,{ fileName : "HDomTester.hx", lineNumber : 1356, className : "js.DomTester", methodName : "testThatHTMLTableSectionElementHasPropertiesAndMethods"});
	this.verifyThatPropertiesExist(section,properties,{ fileName : "HDomTester.hx", lineNumber : 1358, className : "js.DomTester", methodName : "testThatHTMLTableSectionElementHasPropertiesAndMethods"});
}
js.DomTester.prototype.testThatHTMLTextAreaElementHasPropertiesAndMethods = function() {
	var element = this._doc.getElementsByTagName("textarea")[0];
	var textAreaElement = element;
	var properties = ["defaultValue","form","accessKey","cols","disabled","name","readOnly","rows","tabIndex","type","value"];
	this.verifyThatPropertiesExist(textAreaElement,properties,{ fileName : "HDomTester.hx", lineNumber : 870, className : "js.DomTester", methodName : "testThatHTMLTextAreaElementHasPropertiesAndMethods"});
	var methods = ["select","blur","focus"];
	this.verifyThatMethodsExist(textAreaElement,methods,{ fileName : "HDomTester.hx", lineNumber : 878, className : "js.DomTester", methodName : "testThatHTMLTextAreaElementHasPropertiesAndMethods"});
}
js.DomTester.prototype.testThatHTMLTitleElementHasProperties = function() {
	var element = this._doc.getElementsByTagName("title")[0];
	var titleElement = element;
	var properties = ["text"];
	this.verifyThatPropertiesExist(titleElement,properties,{ fileName : "HDomTester.hx", lineNumber : 772, className : "js.DomTester", methodName : "testThatHTMLTitleElementHasProperties"});
}
js.DomTester.prototype.testThatHTMLUListElementHasProperties = function() {
	var uList = this._doc.getElementsByTagName("ul")[0];
	var properties = ["compact","type"];
	this.verifyThatPropertiesExist(uList,properties,{ fileName : "HDomTester.hx", lineNumber : 942, className : "js.DomTester", methodName : "testThatHTMLUListElementHasProperties"});
}
js.DomTester.prototype.testThatHistoryHasPropertiesAndMethods = function() {
	var history = js.EnvLib.history;
	var properties = ["length"];
	this.verifyThatPropertiesExist(history,properties,{ fileName : "HDomTester.hx", lineNumber : 1695, className : "js.DomTester", methodName : "testThatHistoryHasPropertiesAndMethods"});
	var methods = ["back","forward","go"];
	this.verifyThatMethodsExist(history,methods,{ fileName : "HDomTester.hx", lineNumber : 1705, className : "js.DomTester", methodName : "testThatHistoryHasPropertiesAndMethods"});
}
js.DomTester.prototype.testThatIsFiniteWorks = function() {
	var n = 22;
	this.assertTrue(js.EnvLib.isFinite(22.2),{ fileName : "HDomTester.hx", lineNumber : 1903, className : "js.DomTester", methodName : "testThatIsFiniteWorks"});
	this.assertFalse(js.EnvLib.isFinite(js.EnvLib.JInfinity),{ fileName : "HDomTester.hx", lineNumber : 1904, className : "js.DomTester", methodName : "testThatIsFiniteWorks"});
}
js.DomTester.prototype.testThatIsNaNWorks = function() {
	var n = 22;
	this.assertFalse(js.EnvLib.isNaN(22.2),{ fileName : "HDomTester.hx", lineNumber : 1910, className : "js.DomTester", methodName : "testThatIsNaNWorks"});
	this.assertTrue(js.EnvLib.isNaN(js.EnvLib.JNaN),{ fileName : "HDomTester.hx", lineNumber : 1911, className : "js.DomTester", methodName : "testThatIsNaNWorks"});
}
js.DomTester.prototype.testThatJUndefinedWorks = function() {
	this.assertEquals(Std.string(Type["typeof"](js.EnvLib.JUndefined)),"TNull",{ fileName : "HDomTester.hx", lineNumber : 1915, className : "js.DomTester", methodName : "testThatJUndefinedWorks"});
}
js.DomTester.prototype.testThatLocationHasPropertiesAndMethods = function() {
	var location = js.EnvLib.location;
	var properties = ["hash","host","hostname","href","pathname","port","protocol","search"];
	this.verifyThatPropertiesExist(location,properties,{ fileName : "HDomTester.hx", lineNumber : 1722, className : "js.DomTester", methodName : "testThatLocationHasPropertiesAndMethods"});
	var methods = ["assign","replace","reload"];
	this.verifyThatMethodsExist(location,methods,{ fileName : "HDomTester.hx", lineNumber : 1731, className : "js.DomTester", methodName : "testThatLocationHasPropertiesAndMethods"});
}
js.DomTester.prototype.testThatMouseEventWorks = function() {
	var main = this._doc.getElementById("main");
	var win = this._doc.defaultView;
	main.addEventListener("mousedown",function(e) {
		haxe.Log.trace(e.screenX,{ fileName : "HDomTester.hx", lineNumber : 1529, className : "js.DomTester", methodName : "testThatMouseEventWorks"});
	},false);
	win.addEventListener("mousedown",function(e) {
		haxe.Log.trace(e.screenX,{ fileName : "HDomTester.hx", lineNumber : 1537, className : "js.DomTester", methodName : "testThatMouseEventWorks"});
	},false);
	this.assertTrue(true,{ fileName : "HDomTester.hx", lineNumber : 1542, className : "js.DomTester", methodName : "testThatMouseEventWorks"});
}
js.DomTester.prototype.testThatNavigatorHasPropertiesAndMethods = function() {
	var navigator = js.EnvLib.navigator;
	var properties = ["appCodeName","cookieEnabled","geolocation","language","appName","appVersion","platform","userAgent","appName","appVersion","platform","plugins","onLine","productSub","product","mimeTypes","vendorSub","vendor","cookieEnabled"];
	this.verifyThatPropertiesExist(navigator,properties,{ fileName : "HDomTester.hx", lineNumber : 1665, className : "js.DomTester", methodName : "testThatNavigatorHasPropertiesAndMethods"});
}
js.DomTester.prototype.testThatPluginHasPropertiesAndMethods = function() {
	var plugins = js.EnvLib.navigator.plugins[0];
	var properties = ["length","name","filename","description"];
	this.verifyThatPropertiesExist(plugins,properties,{ fileName : "HDomTester.hx", lineNumber : 1678, className : "js.DomTester", methodName : "testThatPluginHasPropertiesAndMethods"});
	var methods = ["item","namedItem"];
	this.verifyThatMethodsExist(plugins,methods,{ fileName : "HDomTester.hx", lineNumber : 1685, className : "js.DomTester", methodName : "testThatPluginHasPropertiesAndMethods"});
}
js.DomTester.prototype.testThatScreenHasPropertiesAndMethods = function() {
	var screen = js.EnvLib.screen;
	var properties = ["availHeight","availWidth","colorDepth","height","pixelDepth","width","availTop","availLeft"];
	this.verifyThatPropertiesExist(screen,properties,{ fileName : "HDomTester.hx", lineNumber : 1750, className : "js.DomTester", methodName : "testThatScreenHasPropertiesAndMethods"});
	var methods = [];
	this.verifyThatMethodsExist(screen,methods,{ fileName : "HDomTester.hx", lineNumber : 1759, className : "js.DomTester", methodName : "testThatScreenHasPropertiesAndMethods"});
}
js.DomTester.prototype.testThatTextNodeHasProperties = function() {
	var textNode = this._doc.createTextNode("new");
	var properties = ["wholeText","data","length","hasChildNodes","replaceChild","removeChild","appendChild","cloneNode","normalize","isSupported","hasAttributes","addEventListener","removeEventListener","dispatchEvent","compareDocumentPosition","isSameNode","lookupPrefix","isDefaultNamespace","lookupNamespaceURI","isEqualNode"];
	this.verifyThatPropertiesExist(textNode,properties,{ fileName : "HDomTester.hx", lineNumber : 242, className : "js.DomTester", methodName : "testThatTextNodeHasProperties"});
}
js.DomTester.prototype.testThatUnescapeWorks = function() {
	var unescapedString = js.EnvLib.unescape("http%3A//www.google.com%3Fq%3Dquadrilateral");
	this.assertEquals("http://www.google.com?q=quadrilateral",unescapedString,{ fileName : "HDomTester.hx", lineNumber : 1897, className : "js.DomTester", methodName : "testThatUnescapeWorks"});
}
js.DomTester.prototype.testThatWindowBarPropContainsProperties = function() {
	var bar = this._doc.defaultView.locationbar;
	var properties = ["visible"];
	this.verifyThatPropertiesExist(bar,properties,{ fileName : "HDomTester.hx", lineNumber : 1518, className : "js.DomTester", methodName : "testThatWindowBarPropContainsProperties"});
}
js.DomTester.prototype.testThatWindowHasPropertiesAndMethods = function() {
	var view = this._doc.defaultView;
	var properties = ["closed","defaultStatus","frames","innerHeight","innerWidth","length","navigator","outerHeight","outerWidth","pageXOffset","pageYOffset","parent","screen","screenX","screenY","status","scrollY","top","window","self","document","name","location","history","locationbar","menubar","personalbar","scrollbars","statusbar","toolbar","applicationCache","localStorage"];
	this.verifyThatPropertiesExist(view,properties,{ fileName : "HDomTester.hx", lineNumber : 1477, className : "js.DomTester", methodName : "testThatWindowHasPropertiesAndMethods"});
	var methods = ["moveBy","moveTo","find","resizeTo","resizeBy","atob","btoa","getComputedStyle","postMessage","getSelection","stop","close","focus","blur","open","alert","confirm","prompt","print","showModalDialog","scroll","scrollTo","scrollBy","setTimeout","clearTimeout","setInterval","clearInterval"];
	this.verifyThatMethodsExist(view,methods,{ fileName : "HDomTester.hx", lineNumber : 1509, className : "js.DomTester", methodName : "testThatWindowHasPropertiesAndMethods"});
}
js.DomTester.prototype.testThatXMLHTTPRequestHasPropertiesAndMethods = function() {
	var xhr = js.EnvLib.createXMLHttpRequest();
	var properties = ["readyState","status","statusText","responseText"];
	this.verifyThatPropertiesExist(xhr,properties,{ fileName : "HDomTester.hx", lineNumber : 1841, className : "js.DomTester", methodName : "testThatXMLHTTPRequestHasPropertiesAndMethods"});
	var methods = ["open","setRequestHeader","send","abort","getResponseHeader","getAllResponseHeaders"];
	this.verifyThatMethodsExist(xhr,methods,{ fileName : "HDomTester.hx", lineNumber : 1861, className : "js.DomTester", methodName : "testThatXMLHTTPRequestHasPropertiesAndMethods"});
}
js.DomTester.prototype.testgetElementsByTagName = function() {
	var divElements = this._doc.getElementsByTagName("DIV");
	this.assertEquals(14,divElements.length,{ fileName : "HDomTester.hx", lineNumber : 103, className : "js.DomTester", methodName : "testgetElementsByTagName"});
}
js.DomTester.prototype.verifyThatMethodsExist = function(o,methods,pos) {
	var _g = 0;
	while(_g < methods.length) {
		var method = methods[_g];
		++_g;
		var m = o[method];
		var t = Type["typeof"](m);
		var isMethod = (function($this) {
			var $r;
			var $e = (t);
			switch( $e[1] ) {
			case 5:
			{
				$r = true;
			}break;
			default:{
				$r = false;
			}break;
			}
			return $r;
		}(this));
		if(!isMethod) {
			haxe.Log.trace((("Object does not contain method : " + method) + ". From line: ") + pos.lineNumber,{ fileName : "HDomTester.hx", lineNumber : 1942, className : "js.DomTester", methodName : "verifyThatMethodsExist"});
			this.assertTrue(false,{ fileName : "HDomTester.hx", lineNumber : 1942, className : "js.DomTester", methodName : "verifyThatMethodsExist"});
		}
		else this.assertTrue(true,{ fileName : "HDomTester.hx", lineNumber : 1943, className : "js.DomTester", methodName : "verifyThatMethodsExist"});
	}
}
js.DomTester.prototype.verifyThatPropertiesExist = function(o,fields,pos) {
	var _g = 0;
	while(_g < fields.length) {
		var field = fields[_g];
		++_g;
		var f = Reflect.field(o,field);
		if(f == null) {
			haxe.Log.trace((("Object does not contain property : " + field) + ". From line: ") + pos.lineNumber,{ fileName : "HDomTester.hx", lineNumber : 1950, className : "js.DomTester", methodName : "verifyThatPropertiesExist"});
			this.assertTrue(false,{ fileName : "HDomTester.hx", lineNumber : 1950, className : "js.DomTester", methodName : "verifyThatPropertiesExist"});
		}
		else this.assertTrue(true,{ fileName : "HDomTester.hx", lineNumber : 1951, className : "js.DomTester", methodName : "verifyThatPropertiesExist"});
	}
}
js.DomTester.prototype.xtestThatHTMLLinkElementHasProperties = function() {
	var linkElement = this._doc.getElementById("link-element");
	haxe.Log.trace(linkElement,{ fileName : "HDomTester.hx", lineNumber : 1138, className : "js.DomTester", methodName : "xtestThatHTMLLinkElementHasProperties"});
	var properties = ["charset","disabled","href","hreflang","media","rel","rev","target","type"];
	this.verifyThatPropertiesExist(linkElement,properties,{ fileName : "HDomTester.hx", lineNumber : 1151, className : "js.DomTester", methodName : "xtestThatHTMLLinkElementHasProperties"});
}
js.DomTester.prototype.__class__ = js.DomTester;
js.HDomTester = function() { }
js.HDomTester.__name__ = ["js","HDomTester"];
js.HDomTester.main = function() {
	var tr = new haxe.unit.TestRunner();
	var tester1 = new js.DomTester();
	tr.add(tester1);
	tr.run();
}
js.HDomTester.prototype.__class__ = js.HDomTester;
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
haxe.unit.TestRunner = function(p) { if( p === $_ ) return; {
	this.result = new haxe.unit.TestResult();
	this.cases = new List();
}}
haxe.unit.TestRunner.__name__ = ["haxe","unit","TestRunner"];
haxe.unit.TestRunner.print = function(v) {
	var msg = StringTools.htmlEscape(js.Boot.__string_rec(v,"")).split("\n").join("<br/>");
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("haxe:trace element not found");
	else d.innerHTML += msg;
}
haxe.unit.TestRunner.customTrace = function(v,p) {
	haxe.unit.TestRunner.print(((((p.fileName + ":") + p.lineNumber) + ": ") + Std.string(v)) + "\n");
}
haxe.unit.TestRunner.prototype.add = function(c) {
	this.cases.add(c);
}
haxe.unit.TestRunner.prototype.cases = null;
haxe.unit.TestRunner.prototype.result = null;
haxe.unit.TestRunner.prototype.run = function() {
	this.result = new haxe.unit.TestResult();
	{ var $it5 = this.cases.iterator();
	while( $it5.hasNext() ) { var c = $it5.next();
	{
		this.runCase(c);
	}
	}}
	haxe.unit.TestRunner.print(this.result.toString());
	return this.result.success;
}
haxe.unit.TestRunner.prototype.runCase = function(t) {
	var old = $closure(haxe.Log,"trace");
	haxe.Log.trace = $closure(haxe.unit.TestRunner,"customTrace");
	var cl = Type.getClass(t);
	var fields = Type.getInstanceFields(cl);
	haxe.unit.TestRunner.print(("Class: " + Type.getClassName(cl)) + " ");
	{
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			var fname = f;
			var field = Reflect.field(t,f);
			if(StringTools.startsWith(fname,"test") && Reflect.isFunction(field)) {
				t.currentTest = new haxe.unit.TestStatus();
				t.currentTest.classname = Type.getClassName(cl);
				t.currentTest.method = fname;
				t.setup();
				try {
					field.apply(t,new Array());
					if(t.currentTest.done) {
						t.currentTest.success = true;
						haxe.unit.TestRunner.print(".");
					}
					else {
						t.currentTest.success = false;
						t.currentTest.error = "(warning) no assert";
						haxe.unit.TestRunner.print("W");
					}
				}
				catch( $e6 ) {
					if( js.Boot.__instanceof($e6,haxe.unit.TestStatus) ) {
						var e = $e6;
						{
							haxe.unit.TestRunner.print("F");
							t.currentTest.backtrace = haxe.Stack.toString(haxe.Stack.exceptionStack());
						}
					} else {
						var e = $e6;
						{
							haxe.unit.TestRunner.print("E");
							if(e.message != null) {
								t.currentTest.error = ((("exception thrown : " + e) + " [") + e.message) + "]";
							}
							else {
								t.currentTest.error = "exception thrown : " + e;
							}
							t.currentTest.backtrace = haxe.Stack.toString(haxe.Stack.exceptionStack());
						}
					}
				}
				this.result.add(t.currentTest);
				t.tearDown();
			}
		}
	}
	haxe.unit.TestRunner.print("\n");
	haxe.Log.trace = old;
}
haxe.unit.TestRunner.prototype.__class__ = haxe.unit.TestRunner;
js.ExceptionCode = function(p) { if( p === $_ ) return; {
	null;
}}
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
js.ErrorSeverity = function() { }
js.ErrorSeverity.__name__ = ["js","ErrorSeverity"];
js.ErrorSeverity.prototype.__class__ = js.ErrorSeverity;
js.ErrorState = function() { }
js.ErrorState.__name__ = ["js","ErrorState"];
js.ErrorState.prototype.__class__ = js.ErrorState;
js.Selection = function() { }
js.Selection.__name__ = ["js","Selection"];
js.Selection.prototype.addRange = null;
js.Selection.prototype.anchorNode = null;
js.Selection.prototype.anchorOffset = null;
js.Selection.prototype.collapse = null;
js.Selection.prototype.collapseToEnd = null;
js.Selection.prototype.collapseToStart = null;
js.Selection.prototype.deleteFromDocument = null;
js.Selection.prototype.focusNode = null;
js.Selection.prototype.focusOffset = null;
js.Selection.prototype.getRangeAt = null;
js.Selection.prototype.isCollapsed = null;
js.Selection.prototype.rangeCount = null;
js.Selection.prototype.removeAllRanges = null;
js.Selection.prototype.removeRange = null;
js.Selection.prototype.selectAllChildren = null;
js.Selection.prototype.stringifier = null;
js.Selection.prototype.__class__ = js.Selection;
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
js.States = function() { }
js.States.__name__ = ["js","States"];
js.States.prototype.__class__ = js.States;
js.EnvLib = function() { }
js.EnvLib.__name__ = ["js","EnvLib"];
js.EnvLib.alert = function(a) {
	alert(Std.string(a));
}
js.EnvLib.decodeURI = function(uri) {
	return decodeURI(uri);
}
js.EnvLib.decodeURIComponent = function(uriComponent) {
	return decodeURIComponent(uriComponent);
}
js.EnvLib.encodeURI = function(uri) {
	return encodeURI(uri);
}
js.EnvLib.encodeURIComponent = function(uriComponent) {
	return encodeURIComponent(uriComponent);
}
js.EnvLib.escape = function(string) {
	return escape(string);
}
js.EnvLib.unescape = function(string) {
	return unescape(string);
}
js.EnvLib.eval = function(string) {
	return eval(string);
}
js.EnvLib.isFinite = function(number) {
	return isFinite(number);
}
js.EnvLib.isNaN = function(number) {
	return isNaN(number);
}
js.EnvLib.createXMLHttpRequest = function() {
	return (js.EnvLib.window.XMLHttpRequest?new XMLHttpRequest():(js.EnvLib.window.ActiveXObject?(function($this) {
		var $r;
		try {
			$r = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch( $e7 ) {
			{
				var e = $e7;
				$r = (function($this) {
					var $r;
					try {
						$r = new ActiveXObject("Microsoft.XMLHTTP");
					}
					catch( $e8 ) {
						{
							var e1 = $e8;
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
js.EnvLib.prototype.__class__ = js.EnvLib;
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
		catch( $e9 ) {
			{
				var e = $e9;
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
	{ var $it10 = arr.iterator();
	while( $it10.hasNext() ) { var t = $it10.next();
	if(t == field) return true;
	}}
	return false;
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	}
	catch( $e11 ) {
		{
			var e = $e11;
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
		catch( $e12 ) {
			{
				var e = $e12;
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
haxe.unit.TestResult = function(p) { if( p === $_ ) return; {
	this.m_tests = new List();
	this.success = true;
}}
haxe.unit.TestResult.__name__ = ["haxe","unit","TestResult"];
haxe.unit.TestResult.prototype.add = function(t) {
	this.m_tests.add(t);
	if(!t.success) this.success = false;
}
haxe.unit.TestResult.prototype.m_tests = null;
haxe.unit.TestResult.prototype.success = null;
haxe.unit.TestResult.prototype.toString = function() {
	var buf = new StringBuf();
	var failures = 0;
	{ var $it13 = this.m_tests.iterator();
	while( $it13.hasNext() ) { var test = $it13.next();
	{
		if(test.success == false) {
			buf.b[buf.b.length] = "* ";
			buf.b[buf.b.length] = test.classname;
			buf.b[buf.b.length] = "::";
			buf.b[buf.b.length] = test.method;
			buf.b[buf.b.length] = "()";
			buf.b[buf.b.length] = "\n";
			buf.b[buf.b.length] = "ERR: ";
			if(test.posInfos != null) {
				buf.b[buf.b.length] = test.posInfos.fileName;
				buf.b[buf.b.length] = ":";
				buf.b[buf.b.length] = test.posInfos.lineNumber;
				buf.b[buf.b.length] = "(";
				buf.b[buf.b.length] = test.posInfos.className;
				buf.b[buf.b.length] = ".";
				buf.b[buf.b.length] = test.posInfos.methodName;
				buf.b[buf.b.length] = ") - ";
			}
			buf.b[buf.b.length] = test.error;
			buf.b[buf.b.length] = "\n";
			if(test.backtrace != null) {
				buf.b[buf.b.length] = test.backtrace;
				buf.b[buf.b.length] = "\n";
			}
			buf.b[buf.b.length] = "\n";
			failures++;
		}
	}
	}}
	buf.b[buf.b.length] = "\n";
	if(failures == 0) buf.b[buf.b.length] = "OK ";
	else buf.b[buf.b.length] = "FAILED ";
	buf.b[buf.b.length] = this.m_tests.length;
	buf.b[buf.b.length] = " tests, ";
	buf.b[buf.b.length] = failures;
	buf.b[buf.b.length] = " failed, ";
	buf.b[buf.b.length] = (this.m_tests.length - failures);
	buf.b[buf.b.length] = " success";
	buf.b[buf.b.length] = "\n";
	return buf.b.join("");
}
haxe.unit.TestResult.prototype.__class__ = haxe.unit.TestResult;
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
js.ErrorSeverity.SEVERITY_WARNING = 1;
js.ErrorSeverity.SEVERITY_ERROR = 2;
js.ErrorSeverity.SEVERITY_FATAL_ERROR = 3;
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
js.States.UNSENT = 0;
js.States.OPENED = 1;
js.States.HEADERS_RECEIVED = 2;
js.States.LOADING = 3;
js.States.DONE = 4;
js.EnvLib.document = document;
js.EnvLib.screen = screen;
js.EnvLib.window = window;
js.EnvLib.navigator = navigator;
js.EnvLib.history = history;
js.EnvLib.location = location;
js.EnvLib.JInfinity = Infinity;
js.EnvLib.JNaN = NaN;
js.EnvLib.JUndefined = undefined;
$Main.init = js.HDomTester.main();
