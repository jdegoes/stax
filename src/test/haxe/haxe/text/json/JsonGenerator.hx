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

import haxe.text.json.JValue;
using haxe.text.json.JValue;

class JsonGenerator {
  public static function generate (): JValue {
    var x = Math.random ();

         if (x < 1.0 / 6.0) return JNull;
    else if (x < 2.0 / 6.0) return generateBoolean ();
    else if (x < 3.0 / 6.0) return generateNumber ();
    else if (x < 4.0 / 6.0) return generateString ();
    else if (x < 5.0 / 6.0) return generateArray ();
    else                    return generateObject ();
  }

  public static function generateBoolean (): JValue {return JBool   (Math.random () < 0.5);}
  public static function generateNumber  (): JValue {return JNumber (Math.exp (Math.random () - 0.5) * Math.log (1.0e36) - Math.exp (Math.random () - 0.5) * Math.log (1.0e36));}
  public static function generateString  (?length: Int = 0): JValue {
    var s = "";

#if neko
    // Neko null-terminated string bug
    if (length > 0) for (i in 0 ... length)      s += String.fromCharCode (Math.floor (Math.random () * (Math.random () < 0.5 ? 127 : 65534)) + 1);
    else            while (Math.random () < 0.9) s += String.fromCharCode (Math.floor (Math.random () * (Math.random () < 0.5 ? 127 : 65534)) + 1);
#else
    if (length > 0) for (i in 0 ... length)      s += String.fromCharCode (Math.floor (Math.random () * (Math.random () < 0.5 ? 128 : 65536)));
    else            while (Math.random () < 0.9) s += String.fromCharCode (Math.floor (Math.random () * (Math.random () < 0.5 ? 128 : 65536)));
#end
    return JString (s);
  }

  public static function generateArray   (): JValue {
    var xs = [];
    while (Math.random () < 0.5) xs.push (generate ());
    return JArray (xs);
  }

  public static function generateObject  (): JValue {
    var h = new Array<JValue>();
    while (Math.random () < 0.5) h.push (JField(generateString ().extractString (), generate ()));
    return JObject (h);
  }
}
