/*
 HaXe JSON library written by Spencer Tipping <spencer@socialmedia.com>
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
package haxe.text.json;

import Prelude;
import haxe.text.json.JValue;

using haxe.text.json.JValueExtensions;
using PreludeExtensions;

class Json {
  @:keep public static var encodeObject = encode.compose(fromObject);
  @:keep public static var decodeObject = toObject.compose(decode);

  public static function toObject(v: JValue): Dynamic {
    switch (v) {
      case JNull:        return null;
      case JString (v):  return v;
      case JNumber (v):  return v;
      case JBool (v):    return v;
      case JArray (xs):  return xs.map(function (x) {return toObject (x);});
      case JObject (fs): return fs.foldl({}, function (o: Dynamic, e: JValue) {
        var field = e.extractField();
        
        Reflect.setField (o, field._1, toObject (field._2)); 
        
        return o;
      });
      case JField(k, v): return Stax.error("Cannot convert JField to object");
    }
  }

  public static function fromObject (d: Dynamic): JValue {
    switch (Type.typeof (d)) {
      case TUnknown:  throw "Type of object must be definite: " + d;
      case TClass(c):      if (Std.is (d, String)) return JString (d);
                      else if (Std.is (d, Hash))   return JObject (d.keys.toArray().map (function (k: String): JValue {return JField (k, d.get (k));}));
                      else if (Std.is (d, Array)) return JArray  (cast(d, Array<Dynamic>).map (fromObject));
                      else return Stax.error("Unknown object type: " + d);
                      
      case TEnum (e): return Stax.error("Json.fromObject does not support enum conversions.");
      case TFunction: return Stax.error("Json.fromObject does not support function conversions.");
      case TNull:     return JNull;
      case TBool:     return JBool(d);
      case TInt:      return JNumber(d);
      case TFloat:    return JNumber(d);
      case TObject:   return JObject (Reflect.fields (d).map (function (f) {return JField (f, fromObject (Reflect.field (d, f)));}));
    }
  }

  public static function encode (v: JValue): String {
    switch (v) {
      case JNull:        return "null";
      case JString (v):  return "\"" + ~/./.customReplace (~/(\n)/g.replace (~/("|\\)/g.replace (v, "\\$1"), "\\n"), function (r) {
                                                             var c = r.matched (0).charCodeAt (0);
                                                             return c >= 32 && c <= 127 ? String.fromCharCode (c) : "\\u" + StringTools.hex (c, 4);
                                                           }) + "\"";
      case JNumber (v):  return Std.string (v);
      case JBool (v):    return v ? "true" : "false";
      case JArray (xs):  return "[" + xs.map (encode).join (",") + "]";
      case JObject (fs): return "{" + fs.map (function (f) {
        var field = f.extractField();
        
        return encode(JString(field._1)) + ":" + encode (field._2);
      }).join (",") + "}";
      case JField(k, v): return Stax.error("Cannot encode JField");
    }
  }

  public static function decode (s: String): JValue {
    // Here's how this function is structured. [1]

    // First, there are local variables of various sorts. /i/ is the current position, /l/ is the length of the input string, /mark/ marks where the current token starts, /temp/ is a temporary
    // string variable, /current/ is the stack of partially-processed values, the last of which is always /last/ for quick access, /name/ is set when we're in object context and are reading a
    // field name, and /state/ stores the contexts as numbers for the purposes of priming the switch-table.

    // The main loop comes next. Lexing is done incrementally, starting with munching of whitespace. The mark moves with the whitespace munch so that we don't include whitespace in the token
    // that we pass into the parser. If there are any characters left after whitespace munchage, we start reading a token. JSON requires no lookahead or context to determine token types, so
    // the first character forms a partition over token types. Strings are parsed until we find a " without a preceding backslash. There's one caveat that prevents us from skipping over just
    // any \" combination, however. The string could look like this: "\\", and we would still be parsing away. So we do need to establish context for the backslash; does it escape something,
    // or is it being escaped? We do this with the /escaped/ flag; if true, then the character at position i will be being escaped on the next go-round.

    // Numbers are lexed a bit inefficiently, but they occupy few characters. We allow any string of in-number characters and assume that it makes sense. If it doesn't, the later conversion
    // into a proper number will fail.

    // Booleans and null are optimized. Because the words /true/, /false/, and /null/ have distinct first characters, there is no need to examine the whole word. (There are no other barewords
    // allowed in JSON.) Thus we can actually read faster than linear time for these cases.

    // The token type, stored in /type/, makes up part of the decisional that we use to process the next token. The other part comes from the accumulated state. There is some really cool
    // optimization here. First, strings and numbers are assigned token types 3 and 4, respectively (these numbers aren't arbitrary). Other values are derived from the character codes of the
    // input; for the characters in the string "{[,:]}tnf", the codes are 123, 91, 44, 58, 93, 125, 116, 110, and 102 respectively. Under modulo-12 reduction, the first six become 3, 7, 8, 10,
    // 9, and 5 respectively. Under modulo-5 reduction, the next two become 1 and 0, respectively, and 102 is mapped to 2. This leaves 4 and 6 to be used for strings and numbers, and now we
    // have a bijection onto the integers modulo 11. [2]

    // Values to encode state are derived from the decisional token types. For example, if we're inside a JSON object then there are two states. One is the "I'm expecting the field name"
    // state, and the other is the "I'm expecting the field value" state. On the other hand, JSON arrays have only one state: they always expect a value. Certain combinations of states and
    // tokens are invalid; for instance, you don't expect a ] while parsing an object, nor do you expect a } while parsing an array. (For the sake of all IE victims, I'm not doing anything
    // special about commas. You can have eight commas in a row for all I care. All extra commas get ignored.)

    // As mentioned earlier, we predicate on combinations of both state and token type, and here are the decisions:
    //
    //   { or [:                               push (last = object or array) onto current, enter (object or array) state
    //   } in object state:                    if (name != null) associate (name -> value) in last; pop current, last = current.last, pop state
    //   ] in array state:                     if (name != null) push value onto last; pop current, last = current.last, pop state
    //   , in object state:                    if (name != null) associate (name -> value) in last; set name = null and enter object state
    //   , in array state:                     if (value != null) push value onto last
    //   : in name state:                      name = value.v; enter value state
    //   string, number, true, false, or null: value = it
    //
    // The encodings are:
    //
    //   0 = null state
    //   1 = array state
    //   2 = name state
    //   3 = value state

    // [1] haXe does no tail-call optimization, so we have to manually manage parsing state stacks. Otherwise this function would be written using CPS and would be a bit cleaner.
    // [2] Why go to all this trouble? A switch table can be compiled/interpreted in different ways, but if the cases are contiguous then a jump table could be used. This is faster than the
    //     binary search that would probably be used if there were enough gaps.

    var i = 0, l = s.length, mark: Int, line = 1, temp: String, type = 0;
    var current = new Array<JValue>(),  last: Null<JValue> = null;
    var   names = new Array<String>(),  name: Null<String> = null;
    var                                value: Null<JValue> = null;
    var  states = new Array   <Int>(), state: Int = 0;

    while ((mark = i) < l) {
      var escaped = false;

      while (i < l && "\n\r\t ".indexOf (temp = s.charAt (i)) > -1) {
        mark = ++i;
        if ("\n\r".indexOf (temp) > -1) ++line;
      }

      if (i < l)      if      ((temp = s.charAt (i)) == "\"") {type = 4; while (++i < l && (escaped || (temp = s.charAt (i)) != "\"")) escaped = ! escaped && temp == "\\";}
                 else if       ("{[,:]}".indexOf (temp) > -1) {type = temp.charCodeAt (0) % 12; ++i;}
                 else if                        (temp == "f") {type = 2;                        i += 5;}                // false
                 else if           ("tn".indexOf (temp) > -1) {type = temp.charCodeAt (0) %  5; i += 4;}                // true or null
                 else if ("0123456789.-".indexOf (temp) > -1) {type = 6; while (++i < l && "0123456789.eE+-".indexOf (s.charAt (i)) > -1) {}}
                 else throw "Invalid JSON lexeme starting at character " + Std.string (i) + ": " + temp + " (character code " + Std.string (temp.charCodeAt (0)) +
                            ", on line " + Std.string (line) + ")";

           if (type == 4) {temp = s.substr (mark + 1, i - mark - 1); ++i;}
      else if (type == 6)  temp = s.substr (mark, i - mark);

      switch (type) {
        case 3: current.push (last = JObject (new Array<JValue> ()));                                                   // Open brace
                  names.push  (name); name = null;
                 states.push (state); state = 2;
                value = null;

        case 7: current.push (last = JArray (new Array<JValue> ()));                                                    // Open square bracket
                 states.push (state); state = 1;
                value = null;

        case 8: if      (state == 1 && value != null) last.extractArray ().push (value);                                // Comma
                else if (state == 3 && name  != null && value != null) {last.extractArray ().push (JField (name, value)); state = 2;}
                value = null;

        case 10:if (state == 2) {name = value.extractString (); state = 3;}                                             // Colon
                else            throw "Non-sequitur colon on line " + line + " (character " + i + ", state " + state + ")";

        case 5: if (state <= 1) throw "Unmatched closing brace on line " + line + " (character " + i + ")";             // Close brace

                if (name != null && value != null) last.extractArray ().push (JField (name, value));

                value = current.pop ();
                state = states.pop ();
                 name = names.pop (); 
                if (current.length > 0) last = current[current.length - 1];

        case 9: if (state != 1)    throw "Unmatched closing square bracket on line " + line + " (character " + i + ")"; // Close square bracket
                if (value != null) last.extractArray ().push (value);

                value = current.pop ();
                state = states.pop (); 
                if (current.length > 0) last = current[current.length - 1];

        case 0: value = JNull;                                                                                          // null
        case 1: value = JBool (true);                                                                                   // true
        case 2: value = JBool (false);                                                                                  // false
        case 4: value = JString (~/\\([bfnrt\\\/"]|u[0-9a-fA-F]{4})/.customReplace (temp, function (r) {                // string
                                   var s = r.matched (1);
                                   if      (s ==  "n") return "\n";                    else if (s ==  "r") return "\r";
                                   else if (s ==  "b") return String.fromCharCode (8); else if (s ==  "f") return String.fromCharCode (12);
                                   else if (s ==  "t") return "\t";                    else if (s == "\\") return "\\";
                                   else if (s == "\"") return "\"";                    else if (s ==  "/") return "/";
                                   else                return String.fromCharCode (Std.parseInt ("0x" + s.substr (1)));
                                 }));

        case 6: value = JNumber (Std.parseFloat (temp));                                                   // number
      }
    }

    if (current.length > 0) throw "Closing brace/bracket deficit of " + Std.string (current.length);

    return value;
  }
}
