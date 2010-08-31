/**
 * ...
 * @author Franco Ponticelli
 */

package js.dom;

import js.Dom;
import js.Lib;

/**
 * TODO:
 * - test on IPod
 * - check for memory leaks
 */
class SWFEmbed
{
	static var OBJECT_IE_ATTRIBUTES = ['id', 'width', 'height', 'align'];
	static var OBJECT_ATTRIBUTES = ['id', 'data', 'width', 'height', 'align'];
	static var OBJECT_IE_PARAMS = ['movie', 'quality', 'bgcolor', 'swliveconnect', 'play', 'loop', 'menu', 'scale', 'base', 'flashvars', 'salign', 'wmode', 'allowscriptaccess','allowfullscreen'];
	static var OBJECT_PARAMS = ['quality', 'bgcolor', 'swliveconnect', 'play', 'loop', 'menu', 'scale', 'base', 'flashvars', 'salign', 'wmode', 'allowscriptaccess','allowfullscreen'];

	public var swfPath(getSwfPath, setSwfPath) : String;
	public var id(getId, null) : String;
	
	public var width(getWidth, setWidth) : Int;
	public var height(getHeight, setHeight) : Int;
	
	public var bgcolor(getBgColor, setBgColor) : Int;
	public var quality(getQuality, setQuality) : SWFQuality;
	
	public var swliveconnect(getSwliveConnect, setSwliveConnect) : Bool;
	public var play(getPlay, setPlay) : Bool;
	public var loop(getLoop, setLoop) : Bool;
	public var menu(getMenu, setMenu) : Bool;
	public var allowFullscreen(getAllowFullscreen, setAllowFullscreen) : Bool;
	
	public var base(getBase, setBase) : String;
	public var flashvars(getFlashvars, setFlashvars) : String;
	
	public var scale(getScale, setScale) : Scale;
	public var align(getAlign, setAlign) : Align;
	public var salign(getSAlign, setSAlign) : SAlign;
	public var wmode(getWMode, setWMode) : WMode;
	
	public var allowScriptAccess(getAllowScriptAccess, setAllowScriptAccess) : AllowScriptAccess;
	public var allowNetworking(getAllowNetworking, setAllowNetworking) : AllowNetworking;
	
	var _embedded : Bool;
	public var _params : Hash<String>;
	
	public static function hasFlashPlugin()
	{
		untyped
		{
			if (__js__("typeof navigator.plugins != 'undefined'"))
			{
				if (__js__("typeof navigator.plugins['Shockwave Flash'] == 'object'"))
					return true;
			}
			if (__js__("typeof window.ActiveXObject != 'undefined'")) {
				try {
					return null != __js__('new ActiveXObject("ShockwaveFlash.ShockwaveFlash")');
				} catch (e : Dynamic) {
					return false;
				}
			} else {
				return false;
			}
		}
	}
	
	public function new(swfpath : String, width : Int, height : Int, bgcolor = 0xFFFFFF, ?quality : SWFQuality, ?scale : Scale)
	{
		_embedded = false;
		_params = new Hash();
		
		this.swfPath = swfpath;
		this.width = width;
		this.height = height;
		this.bgcolor = bgcolor;
		if (null == quality)
			this.quality = SWFQuality.High;
		else
			this.quality = quality;
		if (null == scale)
			this.scale = Scale.NoScale;
		else
			this.scale = scale;
	}
	
	public function traceParams() {
	  trace(_params);
	}
	
	public function embed(?id : String, ?el : HtmlDom) : HtmlDom
	{
		if (null != id)
			el = Lib.document.getElementById(id);
		if (null == el)
			throw "invalid container for embedding";
		setId(el.id);
		_embedded = true;
		return _createDom(el);
	}
	
	public function _set(k : String, v : Dynamic)
	{
		if (_embedded)
			throw "dom element already created, can't change its properties";
		_params.set(k, v);
	}
	
	function _createDom(el : HtmlDom)
	{
		if (Lib.isIE)
		{
			return _createDomIeObject(el);
		} else {
			return _createDomObject(el);
		}
	}
	
	function _createDomIeObject(el : HtmlDom)
	{
		var params = [];
		var attrs = [];
		for (key in OBJECT_IE_ATTRIBUTES)
			if (_params.exists(key))
				attrs.push(key + '="' + _params.get(key) + '"');
		for (key in OBJECT_IE_PARAMS)
			if (_params.exists(key))
				params.push(_createStringParam(key, _params.get(key)));
		untyped el.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + attrs.join(' ') + '>' + params.join('') + '</object>';
		el = Lib.document.getElementById(id);
		return el;
	}
	
	function _createDomObject(el : HtmlDom)
	{
		var o = Lib.document.createElement("object");
		o.setAttribute("type", "application/x-shockwave-flash");
		for (key in OBJECT_ATTRIBUTES)
			if (_params.exists(key))
				o.setAttribute(key, _params.get(key));
		for (key in OBJECT_PARAMS)
			if (_params.exists(key))
				o.appendChild(_createParam(key, _params.get(key)));
		el.parentNode.replaceChild(o, el);
		return o;
	}
	
	function _createStringParam(name : String, value : String)
	{
		return '<param name="' + name + '" value="' + value + '" />';
	}
	
	function _createParam(name : String, value : String)
	{
		var param = Lib.document.createElement("param");
		param.setAttribute("name", name);
		param.setAttribute("value", value);
		return param;
	}

	function getWidth() { return Std.parseInt(_params.get("width")); }
	function setWidth(v : Int) { if (v < 0) throw "invalid width value: " + v; _params.set("width", "" + v); return v; }
	
	function getHeight() { return Std.parseInt(_params.get("height")); }
	function setHeight(v : Int) { if (v < 0) throw "invalid height value: " + v; _params.set("height", "" + v); return v; }
	
	function getBgColor() { return Std.parseInt("0x" + _params.get("bgcolor").substr(1)); }
	function setBgColor(v : Int) { if (v < 0) throw "invalid bgcolor value: " + v; _params.set("bgcolor", "#" + StringTools.hex(v, 6)); return v; }
	
	function getQuality() { return Type.createEnum(SWFQuality, _params.get("quality"), []); }
	function setQuality(v : SWFQuality) { _params.set("quality", ("" + v).toLowerCase()); return v; }
	
	function getId() { return _params.get("id"); }
	function setId(v : String) { _params.set("id", v); _params.set("name", v); return v; }
	
	function getSwfPath() { return _params.get("movie"); }
	function setSwfPath(v : String) { _params.set("movie", v); _params.set("data", v); return v; }
	
	function getSwliveConnect() { return _params.get("swliveconnect") == 'true'; }
	function setSwliveConnect(v : Bool) { _params.set("swliveconnect", v ? 'true' : 'false'); return v; }
	
	function getPlay() { return _params.get("play") == 'true'; }
	function setPlay(v : Bool) { _params.set("play", v ? 'true' : 'false'); return v; }
	
	function getLoop() { return _params.get("loop") == 'true'; }
	function setLoop(v : Bool) { _params.set("loop", v ? 'true' : 'false'); return v; }
	
	function getMenu() { return _params.get("menu") == 'true'; }
	function setMenu(v : Bool) { _params.set("menu", v ? 'true' : 'false'); return v; }
	
	function getAllowFullscreen() { return _params.get("allowFullscreen") == 'true'; }
	function setAllowFullscreen(v : Bool) { _params.set("allowFullscreen", v ? 'true' : 'false'); return v; }
	
	function getBase() { return _params.get("base"); }
	function setBase(v : String) { _params.set("base", v); return v; }
	
	function getFlashvars() { return _params.get("flashvars"); }
	function setFlashvars(v : String) { _params.set("flashvars", v); return v; }
	
	function getScale() { return Type.createEnum(Scale, _params.get("scale"), []); }
	function setScale(v : Scale) { _params.set("scale", ("" + v).toLowerCase()); return v; }
	
	function getAlign() { return Type.createEnum(Align, _params.get("align"), []); }
	function setAlign(v : Align) { _params.set("align", ("" + v).toLowerCase()); return v; }
	
	function getSAlign() { return Type.createEnum(SAlign, _params.get("salign"), []); }
	function setSAlign(v : SAlign) { _params.set("salign", ("" + v).toLowerCase()); return v; }
	
	function getWMode() { return Type.createEnum(WMode, _params.get("wmode"), []); }
	function setWMode(v : WMode) { _params.set("wmode", ("" + v).toLowerCase()); return v; }
	
	function getAllowScriptAccess() { return Type.createEnum(AllowScriptAccess, _params.get("allowScriptAccess"), []); }
	function setAllowScriptAccess(v : AllowScriptAccess) { _params.set("allowScriptAccess", ("" + v).toLowerCase()); return v; }
	
	function getAllowNetworking() { return Type.createEnum(AllowNetworking, _params.get("allowNetworking"), []); }
	function setAllowNetworking(v : AllowNetworking) { _params.set("allowNetworking", ("" + v).toLowerCase()); return v; }
	
	public function toString()
	{
		var attrs = [];
		for (key in OBJECT_ATTRIBUTES.concat(OBJECT_PARAMS))
		{
			if(_params.exists(key))
				attrs.push(key + ": " + _params.get(key));
		}
		return "SWFEmbed [" + attrs.join(", ") + "]";
	}
}

enum SWFQuality
{
	Low;
	Medium;
	High;
	Best;
}

enum Scale
{
	Default;
	NoScale;
	ExactFit;
}

enum Align
{
	Left;
	Right;
	Center;
}

enum SAlign
{
	L;  // Left
	R;  // Right
	T;  // Top
	B;  // Bottom
	TL; // Top-Left
	TR; // Top-Right
	BL; // Bottom-Left
	BR; // Bottom-Right
}

enum WMode
{
	Window;
	Opaque;
	Transparent;
}

enum AllowScriptAccess
{
	Always;
	SameDomain;
	Never;
}

enum AllowNetworking
{
	All;
	Internal;
	None;
}