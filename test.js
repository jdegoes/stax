$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof haxe=='undefined') haxe = {}
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
StaxTestSuite = function() { }
StaxTestSuite.__name__ = ["StaxTestSuite"];
StaxTestSuite.main = function() {
	(new haxe.test.TestRunner()).addAll([new PreludeTestCase(),new haxe.data.transcode.JValueTestCase(),new haxe.data.collections.MapTestCase(),new haxe.data.collections.SetTestCase(),new haxe.data.collections.ListTestCase(),new haxe.io.log.LoggerTestCase(),new haxe.text.json.JsonTestCase(),new haxe.abstract.PartialFunctionTestCase(),new haxe.time.ScheduledExecutorTestCase()]).run();
}
StaxTestSuite.prototype.__class__ = StaxTestSuite;
if(!haxe.test) haxe.test = {}
haxe.test.TestResult = function(p) { if( p === $_ ) return; {
	this.m_tests = new List();
	this.success = true;
}}
haxe.test.TestResult.__name__ = ["haxe","test","TestResult"];
haxe.test.TestResult.prototype.add = function(t) {
	this.m_tests.add(t);
	if(!t.success) this.success = false;
}
haxe.test.TestResult.prototype.m_tests = null;
haxe.test.TestResult.prototype.success = null;
haxe.test.TestResult.prototype.toString = function() {
	var buf = new StringBuf();
	var failures = 0;
	{ var $it1 = this.m_tests.iterator();
	while( $it1.hasNext() ) { var test = $it1.next();
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
haxe.test.TestResult.prototype.__class__ = haxe.test.TestResult;
if(!haxe.data) haxe.data = {}
if(!haxe.data.transcode) haxe.data.transcode = {}
haxe.data.transcode.BoolExtensions = function() { }
haxe.data.transcode.BoolExtensions.__name__ = ["haxe","data","transcode","BoolExtensions"];
haxe.data.transcode.BoolExtensions.DecomposerT = function(c) {
	return haxe.data.transcode.DecomposerTypeclass.create({ decompose : function(v) {
		return haxe.text.json.JValue.JBool(v);
	}});
}
haxe.data.transcode.BoolExtensions.ExtractorT = function(c) {
	return haxe.data.transcode.ExtractorTypeclass.create({ extract : function(v) {
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
	}});
}
haxe.data.transcode.BoolExtensions.prototype.__class__ = haxe.data.transcode.BoolExtensions;
haxe.data.transcode.IntExtensions = function() { }
haxe.data.transcode.IntExtensions.__name__ = ["haxe","data","transcode","IntExtensions"];
haxe.data.transcode.IntExtensions.DecomposerT = function(c) {
	return haxe.data.transcode.DecomposerTypeclass.create({ decompose : function(v) {
		return haxe.text.json.JValue.JNumber(v);
	}});
}
haxe.data.transcode.IntExtensions.ExtractorT = function(c) {
	return haxe.data.transcode.ExtractorTypeclass.create({ extract : function(v) {
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
	}});
}
haxe.data.transcode.IntExtensions.prototype.__class__ = haxe.data.transcode.IntExtensions;
haxe.data.transcode.FloatExtensions = function() { }
haxe.data.transcode.FloatExtensions.__name__ = ["haxe","data","transcode","FloatExtensions"];
haxe.data.transcode.FloatExtensions.DecomposerT = function(c) {
	return haxe.data.transcode.DecomposerTypeclass.create({ decompose : function(v) {
		return haxe.text.json.JValue.JNumber(v);
	}});
}
haxe.data.transcode.FloatExtensions.ExtractorT = function(c) {
	return haxe.data.transcode.ExtractorTypeclass.create({ extract : function(v) {
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
	}});
}
haxe.data.transcode.FloatExtensions.prototype.__class__ = haxe.data.transcode.FloatExtensions;
haxe.data.transcode.StringExtensions = function() { }
haxe.data.transcode.StringExtensions.__name__ = ["haxe","data","transcode","StringExtensions"];
haxe.data.transcode.StringExtensions.DecomposerT = function(c) {
	return haxe.data.transcode.DecomposerTypeclass.create({ decompose : function(v) {
		return haxe.text.json.JValue.JString(v);
	}});
}
haxe.data.transcode.StringExtensions.ExtractorT = function(c) {
	return haxe.data.transcode.ExtractorTypeclass.create({ extract : function(v) {
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
	}});
}
haxe.data.transcode.StringExtensions.prototype.__class__ = haxe.data.transcode.StringExtensions;
haxe.data.transcode.DateExtensions = function() { }
haxe.data.transcode.DateExtensions.__name__ = ["haxe","data","transcode","DateExtensions"];
haxe.data.transcode.DateExtensions.DecomposerT = function(c) {
	return haxe.data.transcode.DecomposerTypeclass.create({ decompose : function(v) {
		return haxe.text.json.JValue.JNumber(v.getTime());
	}});
}
haxe.data.transcode.DateExtensions.ExtractorT = function(c) {
	return haxe.data.transcode.ExtractorTypeclass.create({ extract : function(v) {
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
	}});
}
haxe.data.transcode.DateExtensions.prototype.__class__ = haxe.data.transcode.DateExtensions;
haxe.data.transcode.OptionExtensions = function() { }
haxe.data.transcode.OptionExtensions.__name__ = ["haxe","data","transcode","OptionExtensions"];
haxe.data.transcode.OptionExtensions.DecomposerT = function(c,d) {
	return haxe.data.transcode.DecomposerTypeclass.create({ decompose : function(v) {
		return OptionExtensions.getOrElse(OptionExtensions.map(v,d.decompose),DynamicExtensions.toThunk(haxe.text.json.JValue.JNull));
	}});
}
haxe.data.transcode.OptionExtensions.ExtractorT = function(c,e) {
	return haxe.data.transcode.ExtractorTypeclass.create({ extract : function(v) {
		return (function($this) {
			var $r;
			var $e = (v);
			switch( $e[1] ) {
			case 0:
			{
				$r = Option.None;
			}break;
			default:{
				$r = Option.Some(e.extract(v));
			}break;
			}
			return $r;
		}(this));
	}});
}
haxe.data.transcode.OptionExtensions.prototype.__class__ = haxe.data.transcode.OptionExtensions;
haxe.data.transcode.Tuple2Extensions = function() { }
haxe.data.transcode.Tuple2Extensions.__name__ = ["haxe","data","transcode","Tuple2Extensions"];
haxe.data.transcode.Tuple2Extensions.DecomposerT = function(c,d1,d2) {
	return haxe.data.transcode.DecomposerTypeclass.create({ decompose : function(v) {
		return haxe.text.json.JValue.JArray([d1.decompose(v._1),d2.decompose(v._2)]);
	}});
}
haxe.data.transcode.Tuple2Extensions.ExtractorT = function(c,e1,e2) {
	return haxe.data.transcode.ExtractorTypeclass.create({ extract : function(v) {
		return (function($this) {
			var $r;
			var $e = (v);
			switch( $e[1] ) {
			case 4:
			var v1 = $e[2];
			{
				$r = Tuple2.create(e1.extract(v1[0]),e2.extract(v1[1]));
			}break;
			default:{
				$r = Stax.error("Expected Array but was: " + v);
			}break;
			}
			return $r;
		}(this));
	}});
}
haxe.data.transcode.Tuple2Extensions.prototype.__class__ = haxe.data.transcode.Tuple2Extensions;
haxe.data.transcode.Tuple3Extensions = function() { }
haxe.data.transcode.Tuple3Extensions.__name__ = ["haxe","data","transcode","Tuple3Extensions"];
haxe.data.transcode.Tuple3Extensions.DecomposerT = function(c,d1,d2,d3) {
	return haxe.data.transcode.DecomposerTypeclass.create({ decompose : function(v) {
		return haxe.text.json.JValue.JArray([d1.decompose(v._1),d2.decompose(v._2),d3.decompose(v._3)]);
	}});
}
haxe.data.transcode.Tuple3Extensions.ExtractorT = function(c,e1,e2,e3) {
	return haxe.data.transcode.ExtractorTypeclass.create({ extract : function(v) {
		return (function($this) {
			var $r;
			var $e = (v);
			switch( $e[1] ) {
			case 4:
			var v1 = $e[2];
			{
				$r = Tuple3.create(e1.extract(v1[0]),e2.extract(v1[1]),e3.extract(v1[2]));
			}break;
			default:{
				$r = Stax.error("Expected Array but was: " + v);
			}break;
			}
			return $r;
		}(this));
	}});
}
haxe.data.transcode.Tuple3Extensions.prototype.__class__ = haxe.data.transcode.Tuple3Extensions;
haxe.data.transcode.Tuple4Extensions = function() { }
haxe.data.transcode.Tuple4Extensions.__name__ = ["haxe","data","transcode","Tuple4Extensions"];
haxe.data.transcode.Tuple4Extensions.DecomposerT = function(c,d1,d2,d3,d4) {
	return haxe.data.transcode.DecomposerTypeclass.create({ decompose : function(v) {
		return haxe.text.json.JValue.JArray([d1.decompose(v._1),d2.decompose(v._2),d3.decompose(v._3),d4.decompose(v._4)]);
	}});
}
haxe.data.transcode.Tuple4Extensions.ExtractorT = function(c,e1,e2,e3,e4) {
	return haxe.data.transcode.ExtractorTypeclass.create({ extract : function(v) {
		return (function($this) {
			var $r;
			var $e = (v);
			switch( $e[1] ) {
			case 4:
			var v1 = $e[2];
			{
				$r = Tuple4.create(e1.extract(v1[0]),e2.extract(v1[1]),e3.extract(v1[2]),e4.extract(v1[3]));
			}break;
			default:{
				$r = Stax.error("Expected Array but was: " + v);
			}break;
			}
			return $r;
		}(this));
	}});
}
haxe.data.transcode.Tuple4Extensions.prototype.__class__ = haxe.data.transcode.Tuple4Extensions;
haxe.data.transcode.Tuple5Extensions = function() { }
haxe.data.transcode.Tuple5Extensions.__name__ = ["haxe","data","transcode","Tuple5Extensions"];
haxe.data.transcode.Tuple5Extensions.DecomposerT = function(c,d1,d2,d3,d4,d5) {
	return haxe.data.transcode.DecomposerTypeclass.create({ decompose : function(v) {
		return haxe.text.json.JValue.JArray([d1.decompose(v._1),d2.decompose(v._2),d3.decompose(v._3),d4.decompose(v._4),d5.decompose(v._5)]);
	}});
}
haxe.data.transcode.Tuple5Extensions.ExtractorT = function(c,e1,e2,e3,e4,e5) {
	return haxe.data.transcode.ExtractorTypeclass.create({ extract : function(v) {
		return (function($this) {
			var $r;
			var $e = (v);
			switch( $e[1] ) {
			case 4:
			var v1 = $e[2];
			{
				$r = Tuple5.create(e1.extract(v1[0]),e2.extract(v1[1]),e3.extract(v1[2]),e4.extract(v1[3]),e5.extract(v1[4]));
			}break;
			default:{
				$r = Stax.error("Expected Array but was: " + v);
			}break;
			}
			return $r;
		}(this));
	}});
}
haxe.data.transcode.Tuple5Extensions.prototype.__class__ = haxe.data.transcode.Tuple5Extensions;
haxe.data.transcode.ArrayExtensions = function() { }
haxe.data.transcode.ArrayExtensions.__name__ = ["haxe","data","transcode","ArrayExtensions"];
haxe.data.transcode.ArrayExtensions.DecomposerT = function(c,d) {
	return haxe.data.transcode.DecomposerTypeclass.create({ decompose : function(v) {
		return haxe.text.json.JValue.JArray(ArrayExtensions.map(v,d.decompose));
	}});
}
haxe.data.transcode.ArrayExtensions.ExtractorT = function(c,e) {
	return haxe.data.transcode.ExtractorTypeclass.create({ extract : function(v) {
		return (function($this) {
			var $r;
			var $e = (v);
			switch( $e[1] ) {
			case 4:
			var v1 = $e[2];
			{
				$r = ArrayExtensions.map(v1,e.extract);
			}break;
			default:{
				$r = Stax.error("Expected Array but was: " + v);
			}break;
			}
			return $r;
		}(this));
	}});
}
haxe.data.transcode.ArrayExtensions.prototype.__class__ = haxe.data.transcode.ArrayExtensions;
haxe.data.transcode.ListExtensions = function() { }
haxe.data.transcode.ListExtensions.__name__ = ["haxe","data","transcode","ListExtensions"];
haxe.data.transcode.ListExtensions.DecomposerT = function(c,d) {
	return haxe.data.transcode.DecomposerTypeclass.create({ decompose : function(v) {
		return haxe.text.json.JValue.JArray(ArrayExtensions.map(IterableExtensions.toArray(v),d.decompose));
	}});
}
haxe.data.transcode.ListExtensions.ExtractorT = function(c,e,eq) {
	return haxe.data.transcode.ExtractorTypeclass.create({ extract : function(v) {
		return (function($this) {
			var $r;
			var $e = (v);
			switch( $e[1] ) {
			case 4:
			var v1 = $e[2];
			{
				$r = haxe.data.collections.List.create(eq).addAll(ArrayExtensions.map(v1,e.extract));
			}break;
			default:{
				$r = Stax.error("Expected Array but was: " + v);
			}break;
			}
			return $r;
		}(this));
	}});
}
haxe.data.transcode.ListExtensions.prototype.__class__ = haxe.data.transcode.ListExtensions;
haxe.data.transcode.SetExtensions = function() { }
haxe.data.transcode.SetExtensions.__name__ = ["haxe","data","transcode","SetExtensions"];
haxe.data.transcode.SetExtensions.DecomposerT = function(c,d) {
	return haxe.data.transcode.DecomposerTypeclass.create({ decompose : function(v) {
		return haxe.text.json.JValue.JArray(ArrayExtensions.map(IterableExtensions.toArray(v),d.decompose));
	}});
}
haxe.data.transcode.SetExtensions.ExtractorT = function(c,e,h,eq) {
	return haxe.data.transcode.ExtractorTypeclass.create({ extract : function(v) {
		return (function($this) {
			var $r;
			var $e = (v);
			switch( $e[1] ) {
			case 4:
			var v1 = $e[2];
			{
				$r = haxe.data.collections.Set.create(h,eq).addAll(ArrayExtensions.map(v1,e.extract));
			}break;
			default:{
				$r = Stax.error("Expected Array but was: " + v);
			}break;
			}
			return $r;
		}(this));
	}});
}
haxe.data.transcode.SetExtensions.prototype.__class__ = haxe.data.transcode.SetExtensions;
haxe.data.transcode.MapExtensions = function() { }
haxe.data.transcode.MapExtensions.__name__ = ["haxe","data","transcode","MapExtensions"];
haxe.data.transcode.MapExtensions.DecomposerT = function(c,dk,dv) {
	var td = haxe.data.transcode.Tuple2Extensions.DecomposerT(Tuple2,dk,dv);
	return haxe.data.transcode.DecomposerTypeclass.create({ decompose : function(v) {
		return haxe.text.json.JValue.JArray(ArrayExtensions.map(IterableExtensions.toArray(v),td.decompose));
	}});
}
haxe.data.transcode.MapExtensions.ExtractorT = function(c,ke,ve,kh,keq,vh,veq) {
	var te = haxe.data.transcode.Tuple2Extensions.ExtractorT(Tuple2,ke,ve);
	return haxe.data.transcode.ExtractorTypeclass.create({ extract : function(v) {
		return (function($this) {
			var $r;
			var $e = (v);
			switch( $e[1] ) {
			case 4:
			var v1 = $e[2];
			{
				$r = haxe.data.collections.Map.create(kh,keq,vh,veq).addAll(ArrayExtensions.map(v1,te.extract));
			}break;
			default:{
				$r = Stax.error("Expected Array but was: " + v);
			}break;
			}
			return $r;
		}(this));
	}});
}
haxe.data.transcode.MapExtensions.StringKeyDecomposerT = function(c,dv) {
	return haxe.data.transcode.DecomposerTypeclass.create({ decompose : function(v) {
		return haxe.text.json.JValue.JObject(ArrayExtensions.map(IterableExtensions.toArray(v),function(t) {
			return haxe.text.json.JValue.JField(t._1,dv.decompose(t._2));
		}));
	}});
}
haxe.data.transcode.MapExtensions.StringKeyExtractorT = function(c,ve,vh,veq) {
	var te = haxe.data.transcode.Tuple2Extensions.ExtractorT(Tuple2,haxe.data.transcode.StringExtensions.ExtractorT(String),ve);
	return haxe.data.transcode.ExtractorTypeclass.create({ extract : function(v) {
		return (function($this) {
			var $r;
			var $e = (v);
			switch( $e[1] ) {
			case 5:
			var v1 = $e[2];
			{
				$r = haxe.data.collections.Map.create(StringExtensions.HasherT(String),StringExtensions.EqualT(String),vh,veq).addAll(ArrayExtensions.map(v1,function(j) {
					return (function($this) {
						var $r;
						var $e = (j);
						switch( $e[1] ) {
						case 6:
						var v2 = $e[3], k = $e[2];
						{
							$r = Tuple2.create(k,ve.extract(v2));
						}break;
						default:{
							$r = Stax.error("Expected field but was: " + v1);
						}break;
						}
						return $r;
					}(this));
				}));
			}break;
			default:{
				$r = Stax.error("Expected Array but was: " + v);
			}break;
			}
			return $r;
		}(this));
	}});
}
haxe.data.transcode.MapExtensions.prototype.__class__ = haxe.data.transcode.MapExtensions;
haxe.data.transcode.JValueExtensions = function() { }
haxe.data.transcode.JValueExtensions.__name__ = ["haxe","data","transcode","JValueExtensions"];
haxe.data.transcode.JValueExtensions.DecomposerT = function(c) {
	return haxe.data.transcode.DecomposerTypeclass.create({ decompose : function(v) {
		return v;
	}});
}
haxe.data.transcode.JValueExtensions.ExtractorT = function(c) {
	return haxe.data.transcode.ExtractorTypeclass.create({ extract : function(v) {
		return v;
	}});
}
haxe.data.transcode.JValueExtensions.prototype.__class__ = haxe.data.transcode.JValueExtensions;
haxe.data.transcode.ExtractorHelpers = function() { }
haxe.data.transcode.ExtractorHelpers.__name__ = ["haxe","data","transcode","ExtractorHelpers"];
haxe.data.transcode.ExtractorHelpers.extractFieldValue = function(j,n,e,def) {
	var fieldValue = haxe.text.json.JValueExtensions.getOrElse(j,n,DynamicExtensions.toThunk(def));
	try {
		return e.extract(fieldValue);
	}
	catch( $e2 ) {
		{
			var err = $e2;
			{
				return e.extract(def);
			}
		}
	}
}
haxe.data.transcode.ExtractorHelpers.prototype.__class__ = haxe.data.transcode.ExtractorHelpers;
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
			var tmp = d;
			$r = (Std["is"](tmp,Array)?tmp:(function($this) {
				var $r;
				throw "Class cast error";
				return $r;
			}($this)));
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
haxe.text.json.JValueExtensions = function() { }
haxe.text.json.JValueExtensions.__name__ = ["haxe","text","json","JValueExtensions"];
haxe.text.json.JValueExtensions.OrderT = function(c) {
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
						$r = BoolExtensions.OrderT(Bool).compare(v11,v21);
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
						$r = FloatExtensions.OrderT(Float).compare(v11,v21);
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
						$r = StringExtensions.OrderT(String).compare(v11,v21);
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
						$r = ArrayExtensions.OrderT(Array,haxe.text.json.JValueExtensions.OrderT(haxe.text.json.JValue)).compare(v11,v21);
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
						$r = ArrayExtensions.OrderT(Array,haxe.text.json.JValueExtensions.OrderT(haxe.text.json.JValue)).compare(v11,v21);
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
						$r = Tuple2.OrderT(StringExtensions.OrderT(String),haxe.text.json.JValueExtensions.OrderT(haxe.text.json.JValue)).compare(Tuple2.create(k1,v11),Tuple2.create(k2,v21));
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
haxe.text.json.JValueExtensions.EqualT = function(c) {
	return haxe.text.json.JValueExtensions.OrderT(c);
}
haxe.text.json.JValueExtensions.ShowT = function(c) {
	return ShowTypeclass.create({ show : function(v) {
		return Std.string(v);
	}});
}
haxe.text.json.JValueExtensions.HasherT = function(c) {
	return HasherTypeclass.create({ hash : function(v) {
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
				$r = 24593 * BoolExtensions.HasherT(Bool).hash(v1);
			}break;
			case 2:
			var v1 = $e[2];
			{
				$r = 49157 * FloatExtensions.HasherT(Float).hash(v1);
			}break;
			case 3:
			var v1 = $e[2];
			{
				$r = 98317 * StringExtensions.HasherT(String).hash(v1);
			}break;
			case 4:
			var v1 = $e[2];
			{
				$r = 196613 * ArrayExtensions.HasherT(Array,haxe.text.json.JValueExtensions.HasherT(c)).hash(v1);
			}break;
			case 5:
			var v1 = $e[2];
			{
				$r = 393241 * ArrayExtensions.HasherT(Array,haxe.text.json.JValueExtensions.HasherT(c)).hash(v1);
			}break;
			case 6:
			var v1 = $e[3], k = $e[2];
			{
				$r = 786433 * Tuple2.HasherT(StringExtensions.HasherT(String),haxe.text.json.JValueExtensions.HasherT(c)).hash(Tuple2.create(k,v1));
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
	{ var $it3 = ss.iterator();
	while( $it3.hasNext() ) { var x = $it3.next();
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
haxe.test.TestCase = function(p) { if( p === $_ ) return; {
	this.futureAsserts = [];
}}
haxe.test.TestCase.__name__ = ["haxe","test","TestCase"];
haxe.test.TestCase.prototype.after = function() {
	null;
}
haxe.test.TestCase.prototype.afterAll = function() {
	null;
}
haxe.test.TestCase.prototype.assertEquals = function(expected,actual,equal,c) {
	equal = ((equal == null?DynamicExtensions.EqualT():equal));
	this.currentTest.done = true;
	if(equal.notEqual(actual,expected)) {
		this.currentTest.success = false;
		this.currentTest.error = ((("Expected '" + expected) + "' but was '") + actual) + "'";
		this.currentTest.posInfos = c;
		throw this.currentTest;
	}
}
haxe.test.TestCase.prototype.assertException = function(f,msg,c) {
	if(msg == null) msg = "Expected an exception, but nothing was thrown";
	this.currentTest.done = true;
	try {
		f();
		this.currentTest.success = false;
		this.currentTest.error = msg;
		this.currentTest.posInfos = c;
		throw this.currentTest;
	}
	catch( $e4 ) {
		{
			var e = $e4;
			null;
		}
	}
}
haxe.test.TestCase.prototype.assertFalse = function(b,msg,c) {
	if(msg == null) msg = "Expected false but was true";
	this.currentTest.done = true;
	if(b == true) {
		this.currentTest.success = false;
		this.currentTest.error = msg;
		this.currentTest.posInfos = c;
		throw this.currentTest;
	}
}
haxe.test.TestCase.prototype.assertLater = function(f,minMs,maxMs) {
	this.futureAsserts.push({ future : f, min : minMs, max : maxMs});
}
haxe.test.TestCase.prototype.assertNotNull = function(a,c) {
	this.currentTest.done = true;
	if(a == null) {
		this.currentTest.success = false;
		this.currentTest.error = "Expected non-null, but was null";
		this.currentTest.posInfos = c;
		throw this.currentTest;
	}
}
haxe.test.TestCase.prototype.assertNull = function(a,c) {
	this.currentTest.done = true;
	if(a != null) {
		this.currentTest.success = false;
		this.currentTest.error = ("Expected null, but was '" + a) + "'";
		this.currentTest.posInfos = c;
		throw this.currentTest;
	}
}
haxe.test.TestCase.prototype.assertTrue = function(b,msg,c) {
	if(msg == null) msg = "Expected true but was false";
	this.currentTest.done = true;
	if(b == false) {
		this.currentTest.success = false;
		this.currentTest.error = msg;
		this.currentTest.posInfos = c;
		throw this.currentTest;
	}
}
haxe.test.TestCase.prototype.before = function() {
	null;
}
haxe.test.TestCase.prototype.beforeAll = function() {
	null;
}
haxe.test.TestCase.prototype.currentTest = null;
haxe.test.TestCase.prototype.futureAsserts = null;
haxe.test.TestCase.prototype.print = function(v) {
	this.currentTest.output += Std.string(v);
}
haxe.test.TestCase.prototype.__class__ = haxe.test.TestCase;
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
if(!haxe.data.collections) haxe.data.collections = {}
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
haxe.data.collections.MapTestCase.prototype.map = function() {
	return haxe.data.collections.Map.create(IntExtensions.HasherT(Int),IntExtensions.EqualT(Int),StringExtensions.HasherT(String),StringExtensions.EqualT(String));
}
haxe.data.collections.MapTestCase.prototype.testAddingSameKeyButDifferentValueUpdatesMap = function() {
	var m = this.defaultMap();
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			m = m.set(i,"bar");
			this.assertEquals("bar",OptionExtensions.get(m.get(i)),null,{ fileName : "MapTestCase.hx", lineNumber : 110, className : "haxe.data.collections.MapTestCase", methodName : "testAddingSameKeyButDifferentValueUpdatesMap"});
			this.assertEquals(100,m.getSize(),null,{ fileName : "MapTestCase.hx", lineNumber : 111, className : "haxe.data.collections.MapTestCase", methodName : "testAddingSameKeyButDifferentValueUpdatesMap"});
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
			this.assertEquals(oldM,m,null,{ fileName : "MapTestCase.hx", lineNumber : 99, className : "haxe.data.collections.MapTestCase", methodName : "testAddingSameKeysAndSameValueDoesNotChangeMap"});
			this.assertEquals(100,m.getSize(),null,{ fileName : "MapTestCase.hx", lineNumber : 100, className : "haxe.data.collections.MapTestCase", methodName : "testAddingSameKeysAndSameValueDoesNotChangeMap"});
		}
	}
}
haxe.data.collections.MapTestCase.prototype.testCanIterateThroughKeys = function() {
	var m = this.defaultMap();
	var count = 4950;
	var iterated = 0;
	{ var $it5 = m.keys().iterator();
	while( $it5.hasNext() ) { var k = $it5.next();
	{
		count -= k;
		++iterated;
	}
	}}
	this.assertEquals(100,iterated,null,{ fileName : "MapTestCase.hx", lineNumber : 127, className : "haxe.data.collections.MapTestCase", methodName : "testCanIterateThroughKeys"});
	this.assertEquals(0,count,null,{ fileName : "MapTestCase.hx", lineNumber : 128, className : "haxe.data.collections.MapTestCase", methodName : "testCanIterateThroughKeys"});
}
haxe.data.collections.MapTestCase.prototype.testCanIterateThroughValues = function() {
	var m = this.defaultMap();
	{ var $it6 = m.values().iterator();
	while( $it6.hasNext() ) { var v = $it6.next();
	{
		this.assertEquals("foo",v,null,{ fileName : "MapTestCase.hx", lineNumber : 135, className : "haxe.data.collections.MapTestCase", methodName : "testCanIterateThroughValues"});
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
			}),null,{ fileName : "MapTestCase.hx", lineNumber : 53, className : "haxe.data.collections.MapTestCase", methodName : "testCanRetrieveValuesForKeys"});
		}
	}
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
haxe.data.collections.MapTestCase.prototype.testFilter = function() {
	var m = haxe.abstract.FoldableExtensions.filter(this.defaultMap(),function(t) {
		return t._1 < 50;
	});
	this.assertEquals(50,m.getSize(),null,{ fileName : "MapTestCase.hx", lineNumber : 142, className : "haxe.data.collections.MapTestCase", methodName : "testFilter"});
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
	this.assertEquals(1,m.getSize(),null,{ fileName : "MapTestCase.hx", lineNumber : 46, className : "haxe.data.collections.MapTestCase", methodName : "testSizeGrowsWhenAddingDuplicateKeys"});
}
haxe.data.collections.MapTestCase.prototype.testSizeGrowsWhenAddingUniqueKeys = function() {
	var m = this.map();
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			this.assertEquals(i,m.getSize(),null,{ fileName : "MapTestCase.hx", lineNumber : 33, className : "haxe.data.collections.MapTestCase", methodName : "testSizeGrowsWhenAddingUniqueKeys"});
			m = m.set(i,"foo");
		}
	}
	this.assertEquals(100,m.getSize(),null,{ fileName : "MapTestCase.hx", lineNumber : 38, className : "haxe.data.collections.MapTestCase", methodName : "testSizeGrowsWhenAddingUniqueKeys"});
}
haxe.data.collections.MapTestCase.prototype.testSizeShrinksWhenRemovingKeys = function() {
	var m = this.defaultMap();
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			this.assertEquals(100 - i,m.getSize(),null,{ fileName : "MapTestCase.hx", lineNumber : 61, className : "haxe.data.collections.MapTestCase", methodName : "testSizeShrinksWhenRemovingKeys"});
			m = m.removeByKey(i);
		}
	}
	this.assertEquals(0,m.getSize(),null,{ fileName : "MapTestCase.hx", lineNumber : 66, className : "haxe.data.collections.MapTestCase", methodName : "testSizeShrinksWhenRemovingKeys"});
}
haxe.data.collections.MapTestCase.prototype.__class__ = haxe.data.collections.MapTestCase;
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
	this.assertEquals(Std.string(x),Std.string(y),null,{ fileName : "JsonTestCase.hx", lineNumber : 36, className : "haxe.text.json.JsonTestCase", methodName : "assertLooksEqual"});
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
	this.assertEquals(haxe.text.json.Json.encode(haxe.text.json.JValue.JString("foo")),"\"foo\"",null,{ fileName : "JsonTestCase.hx", lineNumber : 57, className : "haxe.text.json.JsonTestCase", methodName : "testLiteralEncodings"});
	this.assertEquals(haxe.text.json.Json.encode(haxe.text.json.JValue.JString("\"foo\"")),"\"\\\"foo\\\"\"",null,{ fileName : "JsonTestCase.hx", lineNumber : 58, className : "haxe.text.json.JsonTestCase", methodName : "testLiteralEncodings"});
	this.assertEquals(haxe.text.json.Json.encode(haxe.text.json.JValue.JString("foo\n")),"\"foo\\n\"",null,{ fileName : "JsonTestCase.hx", lineNumber : 59, className : "haxe.text.json.JsonTestCase", methodName : "testLiteralEncodings"});
	this.assertEquals(haxe.text.json.Json.encode(haxe.text.json.JValue.JString("\\foo\\")),"\"\\\\foo\\\\\"",null,{ fileName : "JsonTestCase.hx", lineNumber : 60, className : "haxe.text.json.JsonTestCase", methodName : "testLiteralEncodings"});
	this.assertEquals(haxe.text.json.Json.encode(haxe.text.json.JValue.JNumber(3)),"3",null,{ fileName : "JsonTestCase.hx", lineNumber : 62, className : "haxe.text.json.JsonTestCase", methodName : "testLiteralEncodings"});
	this.assertEquals(haxe.text.json.Json.encode(haxe.text.json.JValue.JNumber(1.01)),"1.01",null,{ fileName : "JsonTestCase.hx", lineNumber : 63, className : "haxe.text.json.JsonTestCase", methodName : "testLiteralEncodings"});
	this.assertEquals(haxe.text.json.Json.encode(haxe.text.json.JValue.JBool(true)),"true",null,{ fileName : "JsonTestCase.hx", lineNumber : 65, className : "haxe.text.json.JsonTestCase", methodName : "testLiteralEncodings"});
	this.assertEquals(haxe.text.json.Json.encode(haxe.text.json.JValue.JBool(false)),"false",null,{ fileName : "JsonTestCase.hx", lineNumber : 66, className : "haxe.text.json.JsonTestCase", methodName : "testLiteralEncodings"});
	this.assertEquals(haxe.text.json.Json.encode(haxe.text.json.JValue.JNull),"null",null,{ fileName : "JsonTestCase.hx", lineNumber : 67, className : "haxe.text.json.JsonTestCase", methodName : "testLiteralEncodings"});
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
		return xs.concat((function($this) {
			var $r;
			try {
				$r = [haxe.text.json.JValueExtensions.extractKey(x)];
			}
			catch( $e7 ) {
				{
					var e = $e7;
					$r = [];
				}
			}
			return $r;
		}(this)));
	}),["foo"]);
	this.assertLooksEqual(haxe.text.json.JValueExtensions.fold(haxe.text.json.Json.decode("{\"a\":\"b\",\"c\":\"d\"}"),[],function(xs,x) {
		return xs.concat((function($this) {
			var $r;
			try {
				$r = [haxe.text.json.JValueExtensions.extractKey(x)];
			}
			catch( $e8 ) {
				{
					var e = $e8;
					$r = [];
				}
			}
			return $r;
		}(this)));
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
	this.assertEquals(Std.parseInt("0x30"),48,null,{ fileName : "JsonTestCase.hx", lineNumber : 43, className : "haxe.text.json.JsonTestCase", methodName : "testSanityOfParseInt"});
	this.assertEquals(Std.parseInt("0xD8A6"),55462,null,{ fileName : "JsonTestCase.hx", lineNumber : 44, className : "haxe.text.json.JsonTestCase", methodName : "testSanityOfParseInt"});
	this.assertEquals(Std.parseInt("55462"),55462,null,{ fileName : "JsonTestCase.hx", lineNumber : 45, className : "haxe.text.json.JsonTestCase", methodName : "testSanityOfParseInt"});
}
haxe.text.json.JsonTestCase.prototype.__class__ = haxe.text.json.JsonTestCase;
Reflect = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	if(o.hasOwnProperty != null) return o.hasOwnProperty(field);
	var arr = Reflect.fields(o);
	{ var $it9 = arr.iterator();
	while( $it9.hasNext() ) { var t = $it9.next();
	if(t == field) return true;
	}}
	return false;
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	}
	catch( $e10 ) {
		{
			var e = $e10;
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
		catch( $e11 ) {
			{
				var e = $e11;
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
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype.__class__ = haxe.Log;
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
haxe.data.collections.SetTestCase.prototype.set = function() {
	return haxe.data.collections.Set.create(IntExtensions.HasherT(Int),IntExtensions.EqualT(Int));
}
haxe.data.collections.SetTestCase.prototype.testAddingSameElementDoesNotChangeSet = function() {
	var s = this.defaultSet();
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			var oldM = s;
			s = s.add(i);
			this.assertEquals(oldM,s,null,{ fileName : "SetTestCase.hx", lineNumber : 81, className : "haxe.data.collections.SetTestCase", methodName : "testAddingSameElementDoesNotChangeSet"});
			this.assertEquals(100,s.getSize(),null,{ fileName : "SetTestCase.hx", lineNumber : 82, className : "haxe.data.collections.SetTestCase", methodName : "testAddingSameElementDoesNotChangeSet"});
		}
	}
}
haxe.data.collections.SetTestCase.prototype.testCanIterateThroughElements = function() {
	var s = this.defaultSet();
	var count = 4950;
	var iterated = 0;
	{ var $it12 = s.iterator();
	while( $it12.hasNext() ) { var k = $it12.next();
	{
		count -= k;
		++iterated;
	}
	}}
	this.assertEquals(100,iterated,null,{ fileName : "SetTestCase.hx", lineNumber : 98, className : "haxe.data.collections.SetTestCase", methodName : "testCanIterateThroughElements"});
	this.assertEquals(0,count,null,{ fileName : "SetTestCase.hx", lineNumber : 99, className : "haxe.data.collections.SetTestCase", methodName : "testCanIterateThroughElements"});
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
haxe.data.collections.SetTestCase.prototype.testFilter = function() {
	var s = haxe.abstract.FoldableExtensions.filter(this.defaultSet(),function(e) {
		return e < 50;
	});
	this.assertEquals(50,s.getSize(),null,{ fileName : "SetTestCase.hx", lineNumber : 105, className : "haxe.data.collections.SetTestCase", methodName : "testFilter"});
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
	this.assertEquals(1,s.getSize(),null,{ fileName : "SetTestCase.hx", lineNumber : 46, className : "haxe.data.collections.SetTestCase", methodName : "testSizeDoesNotGrowWhenAddingDuplicateElements"});
}
haxe.data.collections.SetTestCase.prototype.testSizeGrowsWhenAddingUniqueElements = function() {
	var s = this.set();
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			this.assertEquals(i,s.getSize(),null,{ fileName : "SetTestCase.hx", lineNumber : 33, className : "haxe.data.collections.SetTestCase", methodName : "testSizeGrowsWhenAddingUniqueElements"});
			s = s.add(i);
		}
	}
	this.assertEquals(100,s.getSize(),null,{ fileName : "SetTestCase.hx", lineNumber : 38, className : "haxe.data.collections.SetTestCase", methodName : "testSizeGrowsWhenAddingUniqueElements"});
}
haxe.data.collections.SetTestCase.prototype.testSizeShrinksWhenRemovingElements = function() {
	var s = this.defaultSet();
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			this.assertEquals(100 - i,s.getSize(),null,{ fileName : "SetTestCase.hx", lineNumber : 53, className : "haxe.data.collections.SetTestCase", methodName : "testSizeShrinksWhenRemovingElements"});
			s = s.remove(i);
		}
	}
	this.assertEquals(0,s.getSize(),null,{ fileName : "SetTestCase.hx", lineNumber : 58, className : "haxe.data.collections.SetTestCase", methodName : "testSizeShrinksWhenRemovingElements"});
}
haxe.data.collections.SetTestCase.prototype.__class__ = haxe.data.collections.SetTestCase;
if(!haxe["abstract"]) haxe["abstract"] = {}
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
haxe.abstract.Foldable = function() { }
haxe.abstract.Foldable.__name__ = ["haxe","abstract","Foldable"];
haxe.abstract.Foldable.prototype.append = null;
haxe.abstract.Foldable.prototype.empty = null;
haxe.abstract.Foldable.prototype.foldl = null;
haxe.abstract.Foldable.prototype.__class__ = haxe.abstract.Foldable;
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
	{ var $it13 = i.iterator();
	while( $it13.hasNext() ) { var e = $it13.next();
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
haxe.data.collections.List.prototype.empty = function() {
	return (this.getSize() == 0?this:haxe.data.collections.List.nil(this.equal));
}
haxe.data.collections.List.prototype.equal = null;
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
	{ var $it14 = i.iterator();
	while( $it14.hasNext() ) { var e = $it14.next();
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
haxe.data.transcode.ExtractorTypeclass = function() { }
haxe.data.transcode.ExtractorTypeclass.__name__ = ["haxe","data","transcode","ExtractorTypeclass"];
haxe.data.transcode.ExtractorTypeclass.create = function(e) {
	return { extract : e.extract}
}
haxe.data.transcode.ExtractorTypeclass.prototype.__class__ = haxe.data.transcode.ExtractorTypeclass;
haxe.data.transcode.DecomposerTypeclass = function() { }
haxe.data.transcode.DecomposerTypeclass.__name__ = ["haxe","data","transcode","DecomposerTypeclass"];
haxe.data.transcode.DecomposerTypeclass.create = function(e) {
	return { decompose : e.decompose}
}
haxe.data.transcode.DecomposerTypeclass.prototype.__class__ = haxe.data.transcode.DecomposerTypeclass;
haxe.data.transcode.TranscoderTypeclass = function() { }
haxe.data.transcode.TranscoderTypeclass.__name__ = ["haxe","data","transcode","TranscoderTypeclass"];
haxe.data.transcode.TranscoderTypeclass.create = function(d,e) {
	return { decompose : d.decompose, extract : e.extract}
}
haxe.data.transcode.TranscoderTypeclass.prototype.__class__ = haxe.data.transcode.TranscoderTypeclass;
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
if(!haxe.io) haxe.io = {}
if(!haxe.io.log) haxe.io.log = {}
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
	this.assertTrue(invoked,null,{ fileName : "LoggerTestCase.hx", lineNumber : 136, className : "haxe.io.log.LoggerTestCase", methodName : "doTest"});
}
haxe.io.log.LoggerTestCase.prototype.testLogDebug = function() {
	haxe.io.log.Logger.defaultLevel = haxe.io.log.LogLevel.Debug;
	var self = this;
	this.doTest(function(level,text,p) {
		var $e = (level);
		switch( $e[1] ) {
		case 1:
		{
			self.assertEquals("hi",text,null,{ fileName : "LoggerTestCase.hx", lineNumber : 36, className : "haxe.io.log.LoggerTestCase", methodName : "testLogDebug"});
		}break;
		default:{
			self.assertTrue(false,null,{ fileName : "LoggerTestCase.hx", lineNumber : 38, className : "haxe.io.log.LoggerTestCase", methodName : "testLogDebug"});
		}break;
		}
	},function(logger) {
		logger.debug("hi",{ fileName : "LoggerTestCase.hx", lineNumber : 42, className : "haxe.io.log.LoggerTestCase", methodName : "testLogDebug"});
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
			self.assertEquals("hi",text,null,{ fileName : "LoggerTestCase.hx", lineNumber : 95, className : "haxe.io.log.LoggerTestCase", methodName : "testLogError"});
		}break;
		default:{
			self.assertTrue(false,null,{ fileName : "LoggerTestCase.hx", lineNumber : 97, className : "haxe.io.log.LoggerTestCase", methodName : "testLogError"});
		}break;
		}
	},function(logger) {
		logger.error("hi",{ fileName : "LoggerTestCase.hx", lineNumber : 101, className : "haxe.io.log.LoggerTestCase", methodName : "testLogError"});
		logger.warning("bye",{ fileName : "LoggerTestCase.hx", lineNumber : 102, className : "haxe.io.log.LoggerTestCase", methodName : "testLogError"});
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
			self.assertEquals("hi",text,null,{ fileName : "LoggerTestCase.hx", lineNumber : 115, className : "haxe.io.log.LoggerTestCase", methodName : "testLogFatal"});
		}break;
		default:{
			self.assertTrue(false,null,{ fileName : "LoggerTestCase.hx", lineNumber : 117, className : "haxe.io.log.LoggerTestCase", methodName : "testLogFatal"});
		}break;
		}
	},function(logger) {
		logger.fatal("hi",{ fileName : "LoggerTestCase.hx", lineNumber : 121, className : "haxe.io.log.LoggerTestCase", methodName : "testLogFatal"});
		logger.error("bye",{ fileName : "LoggerTestCase.hx", lineNumber : 122, className : "haxe.io.log.LoggerTestCase", methodName : "testLogFatal"});
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
			self.assertEquals("hi",text,null,{ fileName : "LoggerTestCase.hx", lineNumber : 55, className : "haxe.io.log.LoggerTestCase", methodName : "testLogInfo"});
		}break;
		default:{
			self.assertTrue(false,null,{ fileName : "LoggerTestCase.hx", lineNumber : 57, className : "haxe.io.log.LoggerTestCase", methodName : "testLogInfo"});
		}break;
		}
	},function(logger) {
		logger.info("hi",{ fileName : "LoggerTestCase.hx", lineNumber : 61, className : "haxe.io.log.LoggerTestCase", methodName : "testLogInfo"});
		logger.debug("bye",{ fileName : "LoggerTestCase.hx", lineNumber : 62, className : "haxe.io.log.LoggerTestCase", methodName : "testLogInfo"});
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
			self.assertEquals("hi",text,null,{ fileName : "LoggerTestCase.hx", lineNumber : 75, className : "haxe.io.log.LoggerTestCase", methodName : "testLogWarning"});
		}break;
		default:{
			self.assertTrue(false,null,{ fileName : "LoggerTestCase.hx", lineNumber : 77, className : "haxe.io.log.LoggerTestCase", methodName : "testLogWarning"});
		}break;
		}
	},function(logger) {
		logger.warning("hi",{ fileName : "LoggerTestCase.hx", lineNumber : 81, className : "haxe.io.log.LoggerTestCase", methodName : "testLogWarning"});
		logger.info("bye",{ fileName : "LoggerTestCase.hx", lineNumber : 82, className : "haxe.io.log.LoggerTestCase", methodName : "testLogWarning"});
	});
}
haxe.io.log.LoggerTestCase.prototype.__class__ = haxe.io.log.LoggerTestCase;
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
	{ var $it15 = it.iterator();
	while( $it15.hasNext() ) { var e = $it15.next();
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
	{ var $it16 = this._map.iterator();
	while( $it16.hasNext() ) { var e = $it16.next();
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
	{ var $it17 = it.iterator();
	while( $it17.hasNext() ) { var e = $it17.next();
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
if(!haxe.time) haxe.time = {}
haxe.time.ScheduledExecutorTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
haxe.time.ScheduledExecutorTestCase.__name__ = ["haxe","time","ScheduledExecutorTestCase"];
haxe.time.ScheduledExecutorTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) haxe.time.ScheduledExecutorTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
haxe.time.ScheduledExecutorTestCase.prototype._executor = null;
haxe.time.ScheduledExecutorTestCase.prototype.beforeAll = function() {
	this._executor = haxe.time.ScheduledExecutorFactory.create();
}
haxe.time.ScheduledExecutorTestCase.prototype.testOnce = function() {
	var future = this._executor.once(function() {
		return 12;
	},10);
	future.deliverTo(function(v) {
		haxe.Log.trace("Successfully received value: " + v,{ fileName : "ScheduledExecutorTestCase.hx", lineNumber : 37, className : "haxe.time.ScheduledExecutorTestCase", methodName : "testOnce"});
	});
	this.assertTrue(true,null,{ fileName : "ScheduledExecutorTestCase.hx", lineNumber : 39, className : "haxe.time.ScheduledExecutorTestCase", methodName : "testOnce"});
}
haxe.time.ScheduledExecutorTestCase.prototype.testOnceCanBeCanceled = function() {
	var future = this._executor.once(function() {
		return 12;
	},10);
	future.deliverTo(function(v) {
		haxe.Log.trace("Failed! Received value: " + v,{ fileName : "ScheduledExecutorTestCase.hx", lineNumber : 47, className : "haxe.time.ScheduledExecutorTestCase", methodName : "testOnceCanBeCanceled"});
	});
	future.cancel();
	this.assertTrue(true,null,{ fileName : "ScheduledExecutorTestCase.hx", lineNumber : 51, className : "haxe.time.ScheduledExecutorTestCase", methodName : "testOnceCanBeCanceled"});
}
haxe.time.ScheduledExecutorTestCase.prototype.__class__ = haxe.time.ScheduledExecutorTestCase;
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
haxe.test.TestRunner = function(p) { if( p === $_ ) return; {
	this.result = new haxe.test.TestResult();
	this.cases = new List();
}}
haxe.test.TestRunner.__name__ = ["haxe","test","TestRunner"];
haxe.test.TestRunner.print = function(v) {
	var msg = StringTools.htmlEscape(js.Boot.__string_rec(v,"")).split("\n").join("<br/>");
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("haxe:trace element not found");
	else d.innerHTML += msg;
}
haxe.test.TestRunner.customTrace = function(v,p) {
	haxe.test.TestRunner.print(((((p.fileName + ":") + p.lineNumber) + ": ") + Std.string(v)) + "\n");
}
haxe.test.TestRunner.prototype.add = function(c) {
	this.cases.add(c);
	return this;
}
haxe.test.TestRunner.prototype.addAll = function(i) {
	{ var $it18 = i.iterator();
	while( $it18.hasNext() ) { var c = $it18.next();
	this.cases.add(c);
	}}
	return this;
}
haxe.test.TestRunner.prototype.cases = null;
haxe.test.TestRunner.prototype.result = null;
haxe.test.TestRunner.prototype.run = function() {
	this.result = new haxe.test.TestResult();
	{ var $it19 = this.cases.iterator();
	while( $it19.hasNext() ) { var c = $it19.next();
	{
		this.runCase(c);
	}
	}}
	haxe.test.TestRunner.print(this.result.toString());
	return this.result.success;
}
haxe.test.TestRunner.prototype.runCase = function(testCase) {
	var old = $closure(haxe.Log,"trace");
	haxe.Log.trace = $closure(haxe.test.TestRunner,"customTrace");
	var cl = Type.getClass(testCase);
	var fields = Type.getInstanceFields(cl);
	haxe.test.TestRunner.print(("Class: " + Type.getClassName(cl)) + " ");
	testCase.beforeAll();
	{
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			var fname = f;
			var field = Reflect.field(testCase,f);
			if(StringTools.startsWith(fname,"test") && Reflect.isFunction(field)) {
				testCase.currentTest = new haxe.test.TestStatus();
				testCase.currentTest.classname = Type.getClassName(cl);
				testCase.currentTest.method = fname;
				testCase.before();
				try {
					field.apply(testCase,[]);
					if(testCase.currentTest.done) {
						testCase.currentTest.success = true;
						haxe.test.TestRunner.print(".");
					}
					else {
						testCase.currentTest.success = false;
						testCase.currentTest.error = "(warning) no assert";
						haxe.test.TestRunner.print("W");
					}
				}
				catch( $e20 ) {
					if( js.Boot.__instanceof($e20,haxe.test.TestStatus) ) {
						var e = $e20;
						{
							haxe.test.TestRunner.print("F");
							testCase.currentTest.backtrace = haxe.Stack.toString(haxe.Stack.exceptionStack());
						}
					} else {
						var e = $e20;
						{
							haxe.test.TestRunner.print("E");
							if(e.message != null) {
								testCase.currentTest.error = ((("exception thrown: " + e) + " [") + e.message) + "]";
							}
							else {
								testCase.currentTest.error = "exception thrown: " + e;
							}
							testCase.currentTest.backtrace = haxe.Stack.toString(haxe.Stack.exceptionStack());
						}
					}
				}
				haxe.test.TestRunner.print(testCase.currentTest.output);
				this.result.add(testCase.currentTest);
				testCase.after();
			}
		}
	}
	testCase.afterAll();
	haxe.test.TestRunner.print("\n");
	haxe.Log.trace = old;
}
haxe.test.TestRunner.prototype.__class__ = haxe.test.TestRunner;
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
	{ var $it21 = i.iterator();
	while( $it21.hasNext() ) { var e = $it21.next();
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
	{ var $it22 = it.iterator();
	while( $it22.hasNext() ) { var i = $it22.next();
	a.push(i);
	}}
	return a;
}
Lambda.list = function(it) {
	var l = new List();
	{ var $it23 = it.iterator();
	while( $it23.hasNext() ) { var i = $it23.next();
	l.add(i);
	}}
	return l;
}
Lambda.map = function(it,f) {
	var l = new List();
	{ var $it24 = it.iterator();
	while( $it24.hasNext() ) { var x = $it24.next();
	l.add(f(x));
	}}
	return l;
}
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	{ var $it25 = it.iterator();
	while( $it25.hasNext() ) { var x = $it25.next();
	l.add(f(i++,x));
	}}
	return l;
}
Lambda.has = function(it,elt,cmp) {
	if(cmp == null) {
		{ var $it26 = it.iterator();
		while( $it26.hasNext() ) { var x = $it26.next();
		if(x == elt) return true;
		}}
	}
	else {
		{ var $it27 = it.iterator();
		while( $it27.hasNext() ) { var x = $it27.next();
		if(cmp(x,elt)) return true;
		}}
	}
	return false;
}
Lambda.exists = function(it,f) {
	{ var $it28 = it.iterator();
	while( $it28.hasNext() ) { var x = $it28.next();
	if(f(x)) return true;
	}}
	return false;
}
Lambda.foreach = function(it,f) {
	{ var $it29 = it.iterator();
	while( $it29.hasNext() ) { var x = $it29.next();
	if(!f(x)) return false;
	}}
	return true;
}
Lambda.iter = function(it,f) {
	{ var $it30 = it.iterator();
	while( $it30.hasNext() ) { var x = $it30.next();
	f(x);
	}}
}
Lambda.filter = function(it,f) {
	var l = new List();
	{ var $it31 = it.iterator();
	while( $it31.hasNext() ) { var x = $it31.next();
	if(f(x)) l.add(x);
	}}
	return l;
}
Lambda.fold = function(it,f,first) {
	{ var $it32 = it.iterator();
	while( $it32.hasNext() ) { var x = $it32.next();
	first = f(x,first);
	}}
	return first;
}
Lambda.count = function(it) {
	var n = 0;
	{ var $it33 = it.iterator();
	while( $it33.hasNext() ) { var _ = $it33.next();
	++n;
	}}
	return n;
}
Lambda.empty = function(it) {
	return !it.iterator().hasNext();
}
Lambda.prototype.__class__ = Lambda;
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
PreludeTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
PreludeTestCase.__name__ = ["PreludeTestCase"];
PreludeTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) PreludeTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
PreludeTestCase.prototype.testCompose = function() {
	var f1 = function(i) {
		return i * 2;
	}
	var f2 = function(i) {
		return i - 1;
	}
	this.assertEquals(2,(FunctionExtensions.compose(f1,f2))(2),null,{ fileName : "PreludeTest.hx", lineNumber : 33, className : "PreludeTestCase", methodName : "testCompose"});
}
PreludeTestCase.prototype.testCurry2 = function() {
	var f = function(i1,i2,i3) {
		return (i1 + i2) + i3;
	}
	this.assertEquals(3,(((Function3Extensions.curry(f))(2))(-2))(3),null,{ fileName : "PreludeTest.hx", lineNumber : 39, className : "PreludeTestCase", methodName : "testCurry2"});
}
PreludeTestCase.prototype.testFutureChaining = function() {
	var f1 = Future.create();
	var f2 = f1.map(function(i) {
		return Std.string(i);
	}).flatMap(function(s) {
		return Future.create().deliver(s.length < 2);
	});
	f1.deliver(9);
	this.assertEquals(true,OptionExtensions.get(f2.value()),null,{ fileName : "PreludeTest.hx", lineNumber : 49, className : "PreludeTestCase", methodName : "testFutureChaining"});
}
PreludeTestCase.prototype.__class__ = PreludeTestCase;
if(typeof js=='undefined') js = {}
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
	catch( $e34 ) {
		{
			var e = $e34;
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
	catch( $e35 ) {
		{
			var err = $e35;
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
	catch( $e36 ) {
		{
			var e = $e36;
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
haxe.time.ScheduledExecutor = function() { }
haxe.time.ScheduledExecutor.__name__ = ["haxe","time","ScheduledExecutor"];
haxe.time.ScheduledExecutor.prototype.forever = null;
haxe.time.ScheduledExecutor.prototype.once = null;
haxe.time.ScheduledExecutor.prototype.repeat = null;
haxe.time.ScheduledExecutor.prototype.__class__ = haxe.time.ScheduledExecutor;
haxe.time.ScheduledExecutorFactory = function() { }
haxe.time.ScheduledExecutorFactory.__name__ = ["haxe","time","ScheduledExecutorFactory"];
haxe.time.ScheduledExecutorFactory.create = function() {
	return new haxe.time._ScheduledExecutor.ScheduledExecutorImpl();
}
haxe.time.ScheduledExecutorFactory.prototype.__class__ = haxe.time.ScheduledExecutorFactory;
if(!haxe.time._ScheduledExecutor) haxe.time._ScheduledExecutor = {}
haxe.time._ScheduledExecutor.ScheduledExecutorImpl = function(p) { if( p === $_ ) return; {
	null;
}}
haxe.time._ScheduledExecutor.ScheduledExecutorImpl.__name__ = ["haxe","time","_ScheduledExecutor","ScheduledExecutorImpl"];
haxe.time._ScheduledExecutor.ScheduledExecutorImpl.prototype.forever = function(seed,f,ms) {
	var future = new Future();
	var result = seed;
	var timer = new haxe.Timer(ms);
	timer.run = function() {
		result = f(result);
		if(future.isCanceled()) {
			timer.stop();
			future.deliver(result);
		}
	}
	return future;
}
haxe.time._ScheduledExecutor.ScheduledExecutorImpl.prototype.once = function(f,ms) {
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
haxe.time._ScheduledExecutor.ScheduledExecutorImpl.prototype.repeat = function(seed,f,ms,times) {
	var future = new Future();
	return (times > 0?(function($this) {
		var $r;
		var result = seed;
		var timer = new haxe.Timer(ms);
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
haxe.time._ScheduledExecutor.ScheduledExecutorImpl.prototype.__class__ = haxe.time._ScheduledExecutor.ScheduledExecutorImpl;
haxe.time._ScheduledExecutor.ScheduledExecutorImpl.__interfaces__ = [haxe.time.ScheduledExecutor];
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
		catch( $e37 ) {
			{
				var e = $e37;
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
	catch( $e38 ) {
		{
			var e = $e38;
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
haxe.data.transcode.JValueTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
haxe.data.transcode.JValueTestCase.__name__ = ["haxe","data","transcode","JValueTestCase"];
haxe.data.transcode.JValueTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) haxe.data.transcode.JValueTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
haxe.data.transcode.JValueTestCase.prototype.doTest = function(decomposer,extractor,values,eq) {
	var _g = 0;
	while(_g < values.length) {
		var value = values[_g];
		++_g;
		var actual = extractor.extract(decomposer.decompose(value));
		var equal = eq.equal(value,actual);
		if(!equal) {
			throw (("Expected " + value) + " but was ") + actual;
		}
		this.assertTrue(equal,null,{ fileName : "JValueTestCase.hx", lineNumber : 141, className : "haxe.data.transcode.JValueTestCase", methodName : "doTest"});
	}
}
haxe.data.transcode.JValueTestCase.prototype.testArray = function() {
	var a = [[123,9,-23],[]];
	this.doTest(haxe.data.transcode.ArrayExtensions.DecomposerT(Array,haxe.data.transcode.IntExtensions.DecomposerT(Int)),haxe.data.transcode.ArrayExtensions.ExtractorT(Array,haxe.data.transcode.IntExtensions.ExtractorT(Int)),a,ArrayExtensions.EqualT(Array,IntExtensions.EqualT(Int)));
}
haxe.data.transcode.JValueTestCase.prototype.testBool = function() {
	this.doTest(haxe.data.transcode.BoolExtensions.DecomposerT(Bool),haxe.data.transcode.BoolExtensions.ExtractorT(Bool),[true,false],BoolExtensions.EqualT(Bool));
}
haxe.data.transcode.JValueTestCase.prototype.testDate = function() {
	this.doTest(haxe.data.transcode.DateExtensions.DecomposerT(Date),haxe.data.transcode.DateExtensions.ExtractorT(Date),[Date.now(),Date.fromTime(0.0)],DateExtensions.EqualT(Date));
}
haxe.data.transcode.JValueTestCase.prototype.testFloat = function() {
	this.doTest(haxe.data.transcode.FloatExtensions.DecomposerT(Float),haxe.data.transcode.FloatExtensions.ExtractorT(Float),[0.25,0.5],FloatExtensions.EqualT(Float));
}
haxe.data.transcode.JValueTestCase.prototype.testInt = function() {
	this.doTest(haxe.data.transcode.IntExtensions.DecomposerT(Int),haxe.data.transcode.IntExtensions.ExtractorT(Int),[-1234,9231],IntExtensions.EqualT(Int));
}
haxe.data.transcode.JValueTestCase.prototype.testJValue = function() {
	this.doTest(haxe.data.transcode.JValueExtensions.DecomposerT(haxe.text.json.JValue),haxe.data.transcode.JValueExtensions.ExtractorT(haxe.text.json.JValue),[haxe.text.json.JValue.JNull,haxe.text.json.JValue.JString("foo"),haxe.text.json.JValue.JNumber(123.0),haxe.text.json.JValue.JBool(false),haxe.text.json.JValue.JObject([haxe.text.json.JValue.JField("foo",haxe.text.json.JValue.JString("bar"))]),haxe.text.json.JValue.JArray([haxe.text.json.JValue.JNull,haxe.text.json.JValue.JString("baz")])],haxe.text.json.JValueExtensions.EqualT(haxe.text.json.JValue));
}
haxe.data.transcode.JValueTestCase.prototype.testList = function() {
	var newList = haxe.data.collections.List.factory(IntExtensions.EqualT(Int));
	var a = [newList().addAll([123,9,-23]),newList()];
	this.doTest(haxe.data.transcode.ListExtensions.DecomposerT(haxe.data.collections.List,haxe.data.transcode.IntExtensions.DecomposerT(Int)),haxe.data.transcode.ListExtensions.ExtractorT(haxe.data.collections.List,haxe.data.transcode.IntExtensions.ExtractorT(Int),IntExtensions.EqualT(Int)),a,haxe.data.collections.List.EqualT(IntExtensions.EqualT(Int)));
}
haxe.data.transcode.JValueTestCase.prototype.testMap = function() {
	var newMap = haxe.data.collections.Map.factory(IntExtensions.HasherT(Int),IntExtensions.EqualT(Int),StringExtensions.HasherT(String),StringExtensions.EqualT(String));
	var a = [newMap().addAll([Tuple2.create(123,"foo"),Tuple2.create(-23,"bar"),Tuple2.create(0,"baz")]),newMap()];
	this.doTest(haxe.data.transcode.MapExtensions.DecomposerT(haxe.data.collections.Map,haxe.data.transcode.IntExtensions.DecomposerT(Int),haxe.data.transcode.StringExtensions.DecomposerT(String)),haxe.data.transcode.MapExtensions.ExtractorT(haxe.data.collections.Map,haxe.data.transcode.IntExtensions.ExtractorT(Int),haxe.data.transcode.StringExtensions.ExtractorT(String),IntExtensions.HasherT(Int),IntExtensions.EqualT(Int),StringExtensions.HasherT(String),StringExtensions.EqualT(String)),a,haxe.data.collections.Map.EqualT(IntExtensions.EqualT(Int),StringExtensions.EqualT(String)));
}
haxe.data.transcode.JValueTestCase.prototype.testOption = function() {
	var a = [Option.Some(123),Option.None];
	this.doTest(haxe.data.transcode.OptionExtensions.DecomposerT(Option,haxe.data.transcode.IntExtensions.DecomposerT(Int)),haxe.data.transcode.OptionExtensions.ExtractorT(Option,haxe.data.transcode.IntExtensions.ExtractorT(Int)),a,OptionExtensions.EqualT(Option,IntExtensions.EqualT(Int)));
}
haxe.data.transcode.JValueTestCase.prototype.testSet = function() {
	var newSet = haxe.data.collections.Set.factory(IntExtensions.HasherT(Int),IntExtensions.EqualT(Int));
	var a = [newSet().addAll([123,9,-23]),newSet()];
	this.doTest(haxe.data.transcode.SetExtensions.DecomposerT(haxe.data.collections.Set,haxe.data.transcode.IntExtensions.DecomposerT(Int)),haxe.data.transcode.SetExtensions.ExtractorT(haxe.data.collections.Set,haxe.data.transcode.IntExtensions.ExtractorT(Int),IntExtensions.HasherT(Int),IntExtensions.EqualT(Int)),a,haxe.data.collections.Set.EqualT(IntExtensions.EqualT(Int)));
}
haxe.data.transcode.JValueTestCase.prototype.testString = function() {
	this.doTest(haxe.data.transcode.StringExtensions.DecomposerT(String),haxe.data.transcode.StringExtensions.ExtractorT(String),["boo","baz"],StringExtensions.EqualT(String));
}
haxe.data.transcode.JValueTestCase.prototype.testTuple2 = function() {
	var a = [Tuple2.create(123,"foo"),Tuple2.create(0,"bar")];
	this.doTest(haxe.data.transcode.Tuple2Extensions.DecomposerT(Tuple2,haxe.data.transcode.IntExtensions.DecomposerT(Int),haxe.data.transcode.StringExtensions.DecomposerT(String)),haxe.data.transcode.Tuple2Extensions.ExtractorT(Tuple2,haxe.data.transcode.IntExtensions.ExtractorT(Int),haxe.data.transcode.StringExtensions.ExtractorT(String)),a,Tuple2.EqualT(IntExtensions.EqualT(Int),StringExtensions.EqualT(String)));
}
haxe.data.transcode.JValueTestCase.prototype.testTuple3 = function() {
	var a = [Tuple3.create(123,"foo",true),Tuple3.create(0,"bar",false)];
	this.doTest(haxe.data.transcode.Tuple3Extensions.DecomposerT(Tuple3,haxe.data.transcode.IntExtensions.DecomposerT(Int),haxe.data.transcode.StringExtensions.DecomposerT(String),haxe.data.transcode.BoolExtensions.DecomposerT(Bool)),haxe.data.transcode.Tuple3Extensions.ExtractorT(Tuple3,haxe.data.transcode.IntExtensions.ExtractorT(Int),haxe.data.transcode.StringExtensions.ExtractorT(String),haxe.data.transcode.BoolExtensions.ExtractorT(Bool)),a,Tuple3.EqualT(IntExtensions.EqualT(Int),StringExtensions.EqualT(String),BoolExtensions.EqualT(Bool)));
}
haxe.data.transcode.JValueTestCase.prototype.testTuple4 = function() {
	var a = [Tuple4.create(123,"foo",true,0.25),Tuple4.create(0,"bar",false,0.5)];
	this.doTest(haxe.data.transcode.Tuple4Extensions.DecomposerT(Tuple4,haxe.data.transcode.IntExtensions.DecomposerT(Int),haxe.data.transcode.StringExtensions.DecomposerT(String),haxe.data.transcode.BoolExtensions.DecomposerT(Bool),haxe.data.transcode.FloatExtensions.DecomposerT(Float)),haxe.data.transcode.Tuple4Extensions.ExtractorT(Tuple4,haxe.data.transcode.IntExtensions.ExtractorT(Int),haxe.data.transcode.StringExtensions.ExtractorT(String),haxe.data.transcode.BoolExtensions.ExtractorT(Bool),haxe.data.transcode.FloatExtensions.ExtractorT(Float)),a,Tuple4.EqualT(IntExtensions.EqualT(Int),StringExtensions.EqualT(String),BoolExtensions.EqualT(Bool),FloatExtensions.EqualT(Float)));
}
haxe.data.transcode.JValueTestCase.prototype.testTuple5 = function() {
	var a = [Tuple5.create(123,"foo",true,0.25,"biz"),Tuple5.create(0,"bar",false,0.5,"bop")];
	this.doTest(haxe.data.transcode.Tuple5Extensions.DecomposerT(Tuple5,haxe.data.transcode.IntExtensions.DecomposerT(Int),haxe.data.transcode.StringExtensions.DecomposerT(String),haxe.data.transcode.BoolExtensions.DecomposerT(Bool),haxe.data.transcode.FloatExtensions.DecomposerT(Float),haxe.data.transcode.StringExtensions.DecomposerT(String)),haxe.data.transcode.Tuple5Extensions.ExtractorT(Tuple5,haxe.data.transcode.IntExtensions.ExtractorT(Int),haxe.data.transcode.StringExtensions.ExtractorT(String),haxe.data.transcode.BoolExtensions.ExtractorT(Bool),haxe.data.transcode.FloatExtensions.ExtractorT(Float),haxe.data.transcode.StringExtensions.ExtractorT(String)),a,Tuple5.EqualT(IntExtensions.EqualT(Int),StringExtensions.EqualT(String),BoolExtensions.EqualT(Bool),FloatExtensions.EqualT(Float),StringExtensions.EqualT(String)));
}
haxe.data.transcode.JValueTestCase.prototype.__class__ = haxe.data.transcode.JValueTestCase;
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
haxe.test.TestStatus = function(p) { if( p === $_ ) return; {
	this.done = false;
	this.success = false;
	this.output = "";
}}
haxe.test.TestStatus.__name__ = ["haxe","test","TestStatus"];
haxe.test.TestStatus.prototype.backtrace = null;
haxe.test.TestStatus.prototype.classname = null;
haxe.test.TestStatus.prototype.done = null;
haxe.test.TestStatus.prototype.error = null;
haxe.test.TestStatus.prototype.method = null;
haxe.test.TestStatus.prototype.output = null;
haxe.test.TestStatus.prototype.posInfos = null;
haxe.test.TestStatus.prototype.success = null;
haxe.test.TestStatus.prototype.__class__ = haxe.test.TestStatus;
haxe.abstract.PartialFunctionTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
haxe.abstract.PartialFunctionTestCase.__name__ = ["haxe","abstract","PartialFunctionTestCase"];
haxe.abstract.PartialFunctionTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) haxe.abstract.PartialFunctionTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
haxe.abstract.PartialFunctionTestCase.prototype.testCallForPartialFunction1 = function() {
	var f = haxe.abstract.PartialFunction1ImplExtensions.toPartialFunction([Tuple2.create(function(i) {
		return i > 0;
	},function(i) {
		return i * i;
	})]);
	this.assertEquals(4,f.call(2),null,{ fileName : "PartialFunctionTestCase.hx", lineNumber : 37, className : "haxe.abstract.PartialFunctionTestCase", methodName : "testCallForPartialFunction1"});
}
haxe.abstract.PartialFunctionTestCase.prototype.testIsDefinedAtForPartialFunction1 = function() {
	var f = haxe.abstract.PartialFunction1ImplExtensions.toPartialFunction([Tuple2.create(function(i) {
		return i > 0;
	},function(i) {
		return i * i;
	})]);
	this.assertTrue(f.isDefinedAt(2),null,{ fileName : "PartialFunctionTestCase.hx", lineNumber : 30, className : "haxe.abstract.PartialFunctionTestCase", methodName : "testIsDefinedAtForPartialFunction1"});
	this.assertFalse(f.isDefinedAt(-2),null,{ fileName : "PartialFunctionTestCase.hx", lineNumber : 31, className : "haxe.abstract.PartialFunctionTestCase", methodName : "testIsDefinedAtForPartialFunction1"});
}
haxe.abstract.PartialFunctionTestCase.prototype.testOrAlwaysCForPartialFunction1 = function() {
	var f = haxe.abstract.PartialFunction1ImplExtensions.toPartialFunction([Tuple2.create(function(i) {
		return i > 0;
	},function(i) {
		return i * i;
	})]);
	this.assertTrue(f.orAlwaysC(DynamicExtensions.toThunk(9)).isDefinedAt(-2),null,{ fileName : "PartialFunctionTestCase.hx", lineNumber : 55, className : "haxe.abstract.PartialFunctionTestCase", methodName : "testOrAlwaysCForPartialFunction1"});
}
haxe.abstract.PartialFunctionTestCase.prototype.testOrElseForPartialFunction1 = function() {
	var f1 = haxe.abstract.PartialFunction1ImplExtensions.toPartialFunction([Tuple2.create(function(i) {
		return i > 0;
	},function(i) {
		return i * i;
	})]);
	var f2 = haxe.abstract.PartialFunction1ImplExtensions.toPartialFunction([Tuple2.create(function(i) {
		return i < 0;
	},function(i) {
		return i * i;
	})]);
	var f = f1.orElse(f2);
	this.assertTrue(f.isDefinedAt(-2),null,{ fileName : "PartialFunctionTestCase.hx", lineNumber : 46, className : "haxe.abstract.PartialFunctionTestCase", methodName : "testOrElseForPartialFunction1"});
	this.assertEquals(4,f.call(-2),null,{ fileName : "PartialFunctionTestCase.hx", lineNumber : 48, className : "haxe.abstract.PartialFunctionTestCase", methodName : "testOrElseForPartialFunction1"});
	this.assertEquals(4,f.call(2),null,{ fileName : "PartialFunctionTestCase.hx", lineNumber : 49, className : "haxe.abstract.PartialFunctionTestCase", methodName : "testOrElseForPartialFunction1"});
}
haxe.abstract.PartialFunctionTestCase.prototype.__class__ = haxe.abstract.PartialFunctionTestCase;
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
haxe.io.log.Logger.debug = function() {
	return haxe.io.log.Logger.create({ level : DynamicExtensions.toThunk(haxe.io.log.LogLevel.Debug), handlers : [haxe.io.log.LogHandlers.Trace,haxe.io.log.LogHandlers.Console]});
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
		{ var $it39 = keys1.iterator();
		while( $it39.hasNext() ) { var key = $it39.next();
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
	{ var $it40 = i.iterator();
	while( $it40.hasNext() ) { var t = $it40.next();
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
	{ var $it41 = this.entries().iterator();
	while( $it41.hasNext() ) { var e = $it41.next();
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
	{ var $it42 = this.entries().iterator();
	while( $it42.hasNext() ) { var e = $it42.next();
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
		{ var $it43 = all.iterator();
		while( $it43.hasNext() ) { var e = $it43.next();
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
	{ var $it44 = i.iterator();
	while( $it44.hasNext() ) { var t = $it44.next();
	map = map.remove(t);
	}}
	return map;
}
haxe.data.collections.Map.prototype.removeAllByKey = function(i) {
	var map = this;
	{ var $it45 = i.iterator();
	while( $it45.hasNext() ) { var k = $it45.next();
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
			{ var $it46 = f(e1).iterator();
			while( $it46.hasNext() ) { var e2 = $it46.next();
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
	this._isCanceled = false;
	this._cancelers = [];
}}
Future.__name__ = ["Future"];
Future.Dead = function() {
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
	if(this._isSet) f(this._result);
	else this._listeners.push(f);
	return this;
}
Future.prototype.filter = function(f) {
	var fut = new Future();
	this.deliverTo(function(t) {
		if(f(t)) fut.deliver(t);
		else fut.cancel();
	});
	this.ifCanceled(function() {
		fut.cancel();
	});
	return fut;
}
Future.prototype.flatMap = function(f) {
	var fut = new Future();
	this.deliverTo(function(t) {
		f(t).deliverTo(function(s) {
			fut.deliver(s);
		}).ifCanceled(function() {
			fut.cancel();
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
Future.prototype.value = function() {
	return (this._isSet?Option.Some(this._result):Option.None);
}
Future.prototype.zip = function(f2) {
	var zipped = new Future();
	var f1 = this;
	var deliverZip = function() {
		if(!zipped.isDone()) {
			if(f1.isDelivered() && f2.isDelivered()) {
				zipped.deliver(Tuple2.create(OptionExtensions.get(f1.value()),OptionExtensions.get(f2.value())));
			}
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
	{ var $it47 = i.iterator();
	while( $it47.hasNext() ) { var t = $it47.next();
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
	{ var $it48 = i.iterator();
	while( $it48.hasNext() ) { var e = $it48.next();
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
haxe.data.collections.ListTestCase = function(p) { if( p === $_ ) return; {
	haxe.test.TestCase.apply(this,[]);
}}
haxe.data.collections.ListTestCase.__name__ = ["haxe","data","collections","ListTestCase"];
haxe.data.collections.ListTestCase.__super__ = haxe.test.TestCase;
for(var k in haxe.test.TestCase.prototype ) haxe.data.collections.ListTestCase.prototype[k] = haxe.test.TestCase.prototype[k];
haxe.data.collections.ListTestCase.prototype.assertListEquals = function(l1,l2) {
	this.assertTrue(haxe.data.collections.List.EqualT(IntExtensions.EqualT(Int)).equal(l1,l2),null,{ fileName : "ListTestCase.hx", lineNumber : 140, className : "haxe.data.collections.ListTestCase", methodName : "assertListEquals"});
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
haxe.data.collections.ListTestCase.prototype.newList = function() {
	return haxe.data.collections.List.create(IntExtensions.EqualT(Int));
}
haxe.data.collections.ListTestCase.prototype.testCanIterateThroughElements = function() {
	var l = this.defaultList();
	var count = 4950;
	var iterated = 0;
	{ var $it49 = l.iterator();
	while( $it49.hasNext() ) { var k = $it49.next();
	{
		count -= k;
		++iterated;
	}
	}}
	this.assertEquals(100,iterated,null,{ fileName : "ListTestCase.hx", lineNumber : 85, className : "haxe.data.collections.ListTestCase", methodName : "testCanIterateThroughElements"});
	this.assertEquals(0,count,null,{ fileName : "ListTestCase.hx", lineNumber : 86, className : "haxe.data.collections.ListTestCase", methodName : "testCanIterateThroughElements"});
}
haxe.data.collections.ListTestCase.prototype.testContainsElements = function() {
	var l = this.newList();
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			this.assertFalse(l.contains(i),null,{ fileName : "ListTestCase.hx", lineNumber : 65, className : "haxe.data.collections.ListTestCase", methodName : "testContainsElements"});
			l = l.add(i);
			this.assertTrue(l.contains(i),null,{ fileName : "ListTestCase.hx", lineNumber : 69, className : "haxe.data.collections.ListTestCase", methodName : "testContainsElements"});
		}
	}
}
haxe.data.collections.ListTestCase.prototype.testFilter = function() {
	var l = haxe.abstract.FoldableExtensions.filter(this.defaultList(),function(e) {
		return e < 50;
	});
	this.assertEquals(50,l.getSize(),null,{ fileName : "ListTestCase.hx", lineNumber : 92, className : "haxe.data.collections.ListTestCase", methodName : "testFilter"});
}
haxe.data.collections.ListTestCase.prototype.testFoldr = function() {
	this.assertEquals(4950,this.defaultList().foldr(0,function(b,a) {
		return a + b;
	}),null,{ fileName : "ListTestCase.hx", lineNumber : 110, className : "haxe.data.collections.ListTestCase", methodName : "testFoldr"});
}
haxe.data.collections.ListTestCase.prototype.testHead = function() {
	this.assertEquals(0,this.defaultList().getHead(),null,{ fileName : "ListTestCase.hx", lineNumber : 128, className : "haxe.data.collections.ListTestCase", methodName : "testHead"});
}
haxe.data.collections.ListTestCase.prototype.testHeadOption = function() {
	var $e = (this.defaultList().getHeadOption());
	switch( $e[1] ) {
	case 1:
	var v = $e[2];
	{
		this.assertEquals(0,v,null,{ fileName : "ListTestCase.hx", lineNumber : 133, className : "haxe.data.collections.ListTestCase", methodName : "testHeadOption"});
	}break;
	default:{
		this.assertTrue(false,null,{ fileName : "ListTestCase.hx", lineNumber : 135, className : "haxe.data.collections.ListTestCase", methodName : "testHeadOption"});
	}break;
	}
}
haxe.data.collections.ListTestCase.prototype.testLast = function() {
	this.assertEquals(99,this.defaultList().getLast(),null,{ fileName : "ListTestCase.hx", lineNumber : 116, className : "haxe.data.collections.ListTestCase", methodName : "testLast"});
}
haxe.data.collections.ListTestCase.prototype.testLastOption = function() {
	var $e = (this.defaultList().getLastOption());
	switch( $e[1] ) {
	case 1:
	var v = $e[2];
	{
		this.assertEquals(99,v,null,{ fileName : "ListTestCase.hx", lineNumber : 121, className : "haxe.data.collections.ListTestCase", methodName : "testLastOption"});
	}break;
	default:{
		this.assertTrue(false,null,{ fileName : "ListTestCase.hx", lineNumber : 123, className : "haxe.data.collections.ListTestCase", methodName : "testLastOption"});
	}break;
	}
}
haxe.data.collections.ListTestCase.prototype.testReverse = function() {
	var l = this.newList().addAll([9,2,1,100]);
	var rl = this.newList().addAll([100,1,2,9]);
	this.assertListEquals(rl,l.reverse());
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
	this.assertEquals(101,l.getSize(),null,{ fileName : "ListTestCase.hx", lineNumber : 46, className : "haxe.data.collections.ListTestCase", methodName : "testSizeGrowsWhenAddingDuplicateElements"});
}
haxe.data.collections.ListTestCase.prototype.testSizeGrowsWhenAddingUniqueElements = function() {
	var l = this.newList();
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			this.assertEquals(i,l.getSize(),null,{ fileName : "ListTestCase.hx", lineNumber : 33, className : "haxe.data.collections.ListTestCase", methodName : "testSizeGrowsWhenAddingUniqueElements"});
			l = l.add(i);
		}
	}
	this.assertEquals(100,l.getSize(),null,{ fileName : "ListTestCase.hx", lineNumber : 38, className : "haxe.data.collections.ListTestCase", methodName : "testSizeGrowsWhenAddingUniqueElements"});
}
haxe.data.collections.ListTestCase.prototype.testSizeShrinksWhenRemovingElements = function() {
	var l = this.defaultList();
	{
		var _g = 0;
		while(_g < 100) {
			var i = _g++;
			this.assertEquals(100 - i,l.getSize(),null,{ fileName : "ListTestCase.hx", lineNumber : 53, className : "haxe.data.collections.ListTestCase", methodName : "testSizeShrinksWhenRemovingElements"});
			l = l.remove(i);
		}
	}
	this.assertEquals(0,l.getSize(),null,{ fileName : "ListTestCase.hx", lineNumber : 58, className : "haxe.data.collections.ListTestCase", methodName : "testSizeShrinksWhenRemovingElements"});
}
haxe.data.collections.ListTestCase.prototype.testSort = function() {
	var ul = this.newList().addAll([9,2,1,100]);
	var ol = this.newList().addAll([1,2,9,100]);
	this.assertListEquals(ol,ul.sort(IntExtensions.OrderT(Int)));
}
haxe.data.collections.ListTestCase.prototype.__class__ = haxe.data.collections.ListTestCase;
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
	catch( $e50 ) {
		{
			var e = $e50;
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
	{ var $it51 = it;
	while( $it51.hasNext() ) { var i = $it51.next();
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
$Main = function() { }
$Main.__name__ = ["@Main"];
$Main.prototype.__class__ = $Main;
$_ = {}
js.Boot.__res = {}
js.Boot.__init();
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
haxe.text.json.Json.encodeObject = FunctionExtensions.compose($closure(haxe.text.json.Json,"encode"),$closure(haxe.text.json.Json,"fromObject"));
haxe.text.json.Json.decodeObject = FunctionExtensions.compose($closure(haxe.text.json.Json,"toObject"),$closure(haxe.text.json.Json,"decode"));
haxe.Timer.arr = new Array();
js.Lib.onerror = null;
haxe.io.log.Logger.defaultHandlers = [];
haxe.io.log.Logger.defaultLevel = haxe.io.log.LogLevel.Warning;
haxe.data.collections.Map.MaxLoad = 10;
haxe.data.collections.Map.MinLoad = 1;
$Main.init = StaxTestSuite.main();
