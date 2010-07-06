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

import haxe.unit.TestCase;
import haxe.unit.TestRunner;

import haxe.text.json.Json;
import haxe.text.json.JValue;
import haxe.text.json.JsonGenerator;

using haxe.text.json.JValue;
using Lambda;

class JsonTestCase extends TestCase {
  public function assertIdentity (x: String): Void {
    assertLooksEqual (Json.decode (x), Json.decode (Json.encode (Json.decode (x))));
    //assertLooksEqual (Json.decodeObject (x), Json.decodeObject (Json.encodeObject (Json.decodeObject (x))));
  }

  public function assertLooksEqual (x: Dynamic, y: Dynamic): Void {
    assertEquals (Std.string (x), Std.string (y));
  }

  public function testRandomStrings (): Void {for (i in 1 ... 1000) assertIdentity (Json.encode (JsonGenerator.generateString ()));}
  public function testRandomValues  (): Void {for (i in 1 ... 1000) assertIdentity (Json.encode (JsonGenerator.generate ()));}

  public function testSanityOfParseInt (): Void {
    assertEquals (Std.parseInt ("0x30"), 48);
    assertEquals (Std.parseInt ("0xD8A6"), 0xD8A6);
    assertEquals (Std.parseInt ("55462"), 55462);
  }

  public function testEnumExtractionReferentiality (): Void {
    var x = JObject ([]);
    x.extractArray().push(JField("foo", JString ("bar")));
    x.extractArray().push(JField("bif", JString ("baz")));
    assertLooksEqual (x.extractArray()[0], JField("foo", JString ("bar")));
    assertLooksEqual (x.extractArray()[1], JField("bif", JString ("baz")));
  }

  public function testLiteralEncodings (): Void {
    assertEquals (Json.encode (JString ("foo")), "\"foo\"");
    assertEquals (Json.encode (JString ("\"foo\"")), "\"\\\"foo\\\"\"");
    assertEquals (Json.encode (JString ("foo\n")), "\"foo\\n\"");
    assertEquals (Json.encode (JString ("\\foo\\")), "\"\\\\foo\\\\\"");

    assertEquals (Json.encode (JNumber (3)), "3");
    assertEquals (Json.encode (JNumber (1.01)), "1.01");

    assertEquals (Json.encode (JBool (true)), "true");
    assertEquals (Json.encode (JBool (false)), "false");
    assertEquals (Json.encode (JNull), "null");
  }

  public function testLiteralDecodings (): Void {
    assertLooksEqual (Json.decode ("true"), JBool (true));
    assertLooksEqual (Json.decode ("false"), JBool (false));
    assertLooksEqual (Json.decode ("null"), JNull);

    assertLooksEqual (Json.decode ("\"\""), JString (""));

    assertLooksEqual (Json.decode ("3"), JNumber (3));
    assertLooksEqual (Json.decode ("1.01"), JNumber (1.01));
    assertLooksEqual (Json.decode ("\"foo\""), JString ("foo"));
    assertLooksEqual (Json.decode ("\"\\\\foo\""), JString ("\\foo"));
    assertLooksEqual (Json.decode ("\"\\nfoo\""), JString ("\nfoo"));
    assertLooksEqual (Json.decode ("\"\\\"foo\\\"\""), JString ("\"foo\""));

    assertLooksEqual (Json.decode ("\"\\u0020foobar\""), JString (" foobar"));

    assertLooksEqual (Json.decode ("\"\\\"\\\" is equal to \\\"\\\", but isn't equal to \\\"\\n\\\"\""), JString ("\"\" is equal to \"\", but isn't equal to \"\n\""));
  }

  public function testLiteralIdentities (): Void {
    assertIdentity ("\"\"");
    assertIdentity ("0");
    assertIdentity ("1.2");
    assertIdentity ("-5");

    assertIdentity ("false");
    assertIdentity ("true");
    assertIdentity ("null");
  }

  public function testArrays (): Void {
    assertLooksEqual (JArray ([]), Json.decode ("[]"));

    assertIdentity ("[]");
    assertIdentity ("[[]]");
    assertIdentity ("[[1]]");
    assertIdentity ("[[1],[2]]");
    assertIdentity ("[1,2,[3,4],5,6]");
    assertIdentity ("[1,[2,[3,[4,[5,6]]]]]");
  }

  public function testBogusArrays (): Void {
    assertLooksEqual (Json.decode ("[1   , 2 ,, 3, ]"), JArray ([JNumber (1), JNumber (2), JNumber (3)]));
    assertLooksEqual (Json.decode ("[,,]"),             JArray ([]));
    assertLooksEqual (Json.decode ("[,,1]"),            JArray ([JNumber (1)]));
  }

  public function testBogusObjects (): Void {
    assertLooksEqual (Json.decode ("{\"foo\": \"bar\", ,,\"bif\":\"baz\",}"), Json.decode ("{\"foo\":\"bar\",\"bif\":\"baz\"}"));
    assertLooksEqual (Json.decode ("{,,,}"),                                  Json.decode ("{}"));
  }

  public function testObjects (): Void {
    assertIdentity ("{}");
    assertIdentity ("{\"foo\":{}}");
    assertIdentity ("{\"bar\":null,\"foo\":{}}");
    assertIdentity ("{\"foo\":\"bar\"}");
    assertIdentity ("{\"baz\":\"bok\",\"foo\":{\"bar\":\"bif\"}}");
    assertIdentity ("{\"bar\":[1,2,3,4,{\"bif\":\"bar\"}],\"bif\":{\"baz\":\"bok\"}}");
  }

  public function testPath (): Void {
    assertLooksEqual (Json.decode ("{\"foo\":\"bar\"}").path ("foo"), JString ("bar"));
    assertLooksEqual (Json.decode ("{\"a\":{\"b\":{\"c\":5,\"d\":6}}}").path ("a/b/c"), JNumber (5));
    assertLooksEqual (Json.decode ("{\"a\":{\"b\":{\"c\":5,\"d\":6}}}").path ("a/b/d"), JNumber (6));
    assertLooksEqual (Json.decode ("{\"a\":{\"b\":{\"c\":5,\"d\":6}}}").path ("/a/b/c"), JNumber (5));
    assertLooksEqual (Json.decode ("{\"a\":{\"b\":{\"c\":5,\"d\":6}}}").path ("/a/b/d"), JNumber (6));
    assertLooksEqual (Json.decode ("{\"a\":{\"b\":{\"c\":5,\"d\":6}}}").path ("a/b/c/"), JNumber (5));
    assertLooksEqual (Json.decode ("{\"a\":{\"b\":{\"c\":5,\"d\":6}}}").path ("a/b/d/"), JNumber (6));
    assertLooksEqual (Json.decode ("{\"a\":{\"b\":{\"c\":5,\"d\":6}}}").path ("/a/b/c/"), JNumber (5));
    assertLooksEqual (Json.decode ("{\"a\":{\"b\":{\"c\":5,\"d\":6}}}").path ("/a/b/d/"), JNumber (6));
    assertLooksEqual (Json.decode ("{\"a\":{\"b\":{\"c\":5,\"d\":6}}}").path ("////a/b/c/"), JNumber (5));
    assertLooksEqual (Json.decode ("{\"a\":{\"b\":{\"c\":5,\"d\":6}}}").path ("////a/b/d/"), JNumber (6));
    assertLooksEqual (Json.decode ("\"foobar\"").path (""), JString ("foobar"));
  }

  public function testMap (): Void {
    assertLooksEqual (Json.decode ("[]").extractArray().map                              (function (x) {throw "YELP";}).array(), []);
    assertLooksEqual (Json.decode ("[1,2,3]").extractArray().map                         (function (x) {return x.extractNumber ();}).array(), [1, 2, 3]);
    assertLooksEqual (Json.decode ("[\"foo1\",\"bar12\",\"bif123\"]").extractArray().map (function (x) {return x.extractString ().length;}).array(), [4, 5, 6]);

    assertLooksEqual (Json.decode ("[]").extractArray().map                                (function (k) {throw "YELP";}).array(), []);
    assertLooksEqual (Json.decode ("{\"foo\":\"bar\"}").extractArray().map                 (function (k) {return k.extractKey ();}).array(), ["foo"]);
    assertLooksEqual (Json.decode ("{\"foo\":\"bar\",\"bif\":\"baz\"}").extractArray().map (function (k) {return k.extractKey ();}).array(), ["foo", "bif"]);
  }

  public function testArrayFold (): Void {
    assertLooksEqual (Json.decode ("[1]").fold             (0.0, function (t, x) {return switch (x) {case JNumber (x): x + t;
                                                                                                     default:          t;};}), 1);

    assertLooksEqual (Json.decode ("[1, 2, 3, 4, 5]").fold (0.0, function (t, x) {return switch (x) {case JNumber (x): x + t;
                                                                                                     default:          t;};}), 15);
  }

  public function testObjectFold (): Void {
    assertLooksEqual (Json.decode ("{\"foo\":\"bar\"}").fold         ([], function (xs, x) {return xs.concat (try {[x.extractKey ()];} catch (e: Dynamic) {[];});}), ["foo"]);
    assertLooksEqual (Json.decode ("{\"a\":\"b\",\"c\":\"d\"}").fold ([], function (xs, x) {return xs.concat (try {[x.extractKey ()];} catch (e: Dynamic) {[];});}), ["a", "c"]);
  }

  public function testObjectEncodings (): Void {
    assertLooksEqual (Json.toObject (Json.decode ("{\"foo\": \"bar\"}")), {foo: "bar"});
    assertLooksEqual (Json.toObject (Json.decode ("{}")), {});
    assertLooksEqual (Json.toObject (Json.decode ("{\"foo\": [1, 2, 3, 4, 5]}")), {foo: [1, 2, 3, 4, 5]});
    assertLooksEqual (Json.toObject (Json.decode ("{\"foo\": [1, 2, 3, 4, 5], \"bar\": null}")), {foo: [1, 2, 3, 4, 5], bar: null});
  }

  public function testArrayEncodings (): Void {
    assertLooksEqual (Json.toObject (Json.decode ("[]")), []);
    assertLooksEqual (Json.toObject (Json.decode ("[1, 2, 3, 4, 5]")), [1, 2, 3, 4, 5]);
    assertLooksEqual (Json.toObject (Json.decode ("[1, true, null, \"bar\"]")), [1, true, null, "bar"]);
  }

  public function testObjectDecodings (): Void {
    assertLooksEqual (Json.fromObject ({foo: "bar"}),                     Json.decode ("{\"foo\": \"bar\"}"));
    assertLooksEqual (Json.fromObject ({foo: "bar", bif: [1, 2, "baz"]}), Json.decode ("{\"foo\": \"bar\", \"bif\": [1, 2, \"baz\"]}"));
    assertLooksEqual (Json.fromObject ({}),                               Json.decode ("{}"));
  }

  public function testArrayDecodings (): Void {
    assertLooksEqual (Json.fromObject ([]), Json.decode ("[]"));
    assertLooksEqual (Json.fromObject ([1, 2, "foo"]), Json.decode ("[1, 2, \"foo\"]"));
    assertLooksEqual (Json.fromObject ([{foo: "bar"}]), Json.decode ("[{\"foo\": \"bar\"}]"));
  }
}
