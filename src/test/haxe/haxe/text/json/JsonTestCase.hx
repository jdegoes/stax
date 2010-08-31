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

import haxe.test.TestCase;

import haxe.text.json.Json;
import haxe.text.json.JValue;
import haxe.text.json.JsonGenerator;

using haxe.text.json.JValueExtensions;
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
    assertLooksEqual (Json.decode ("{\"foo\":\"bar\"}").fold         ([], function (xs, x) {var v = null; try {v = [x.extractKey ()];} catch (e: Dynamic) {v = [];}; return xs.concat (v);}), ["foo"]);
    assertLooksEqual (Json.decode ("{\"a\":\"b\",\"c\":\"d\"}").fold ([], function (xs, x) {var v = null; try {v = [x.extractKey ()];} catch (e: Dynamic) {v = [];}; return xs.concat (v);}), ["a", "c"]);
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
  
  public function testObjectDecodingRegression1(): Void {
    var string = '{"results":[{"profile_image_url":"http://a2.twimg.com/profile_images/1045840718/lii_normal.jpg","created_at":"Mon, 02 Aug 2010 20:36:16 +0000","from_user":"AliineRodrigues","metadata":{"result_type":"recent"},"to_user_id":null,"text":"RT @imnotmoni: @gabiipop @AliineRodrigues asaushaushauhsausa uu00F1a mulatininha fugosa. llame a santa kika -not xDD","id":20165933792,"from_user_id":28130713,"geo":null,"iso_language_code":"es","source":"&lt;a href=&quot;http://twitter.com/&quot;&gt;web&lt;/a&gt;"},{"profile_image_url":"http://a1.twimg.com/profile_images/996076313/Imagen023_normal.jpg","created_at":"Mon, 02 Aug 2010 20:36:15 +0000","from_user":"heri_wagner","metadata":{"result_type":"recent"},"to_user_id":null,"text":"RT @perrodepavlov #esnaquu00EDsimo el culto a la santa muerte &lt;&lt; yo diria &quot;narquisimo&quot; =S","id":20165932871,"from_user_id":99215763,"geo":null,"iso_language_code":"es","source":"&lt;a href=&quot;http://github.com/cezarsa/chromed_bird&quot; rel=&quot;nofollow&quot;&gt;Chromed Bird&lt;/a&gt;"},{"profile_image_url":"http://a2.twimg.com/profile_images/1069963050/37263_1412094954987_1610913811_1003558_4400767_n_copy_normal.png","created_at":"Mon, 02 Aug 2010 20:36:11 +0000","from_user":"holdme_","metadata":{"result_type":"recent"},"to_user_id":null,"text":"mamma santa che coscioni che hai fatto http://27.media.tumblr.com/tumblr_l6jhy1EH301qa27x6o1_500.png ahahhahahha @nickjonas","id":20165929351,"from_user_id":80652540,"geo":null,"iso_language_code":"it","source":"&lt;a href=&quot;http://83degrees.com/to/powertwitter&quot; rel=&quot;nofollow&quot;&gt;Power Twitter&lt;/a&gt;"},{"profile_image_url":"http://a3.twimg.com/profile_images/510112827/PRN_logo_normal.bmp","created_at":"Mon, 02 Aug 2010 20:36:11 +0000","from_user":"PRNbiz","metadata":{"result_type":"recent"},"to_user_id":null,"text":"Program Announced: 34th Internationalization and Unicode Conference: Santa Clara, Calif., USA; October 18-20, 2010... http://bit.ly/9K92RB","id":20165929344,"from_user_id":34612434,"geo":null,"iso_language_code":"en","source":"&lt;a href=&quot;http://twitterfeed.com&quot; rel=&quot;nofollow&quot;&gt;twitterfeed&lt;/a&gt;"},{"profile_image_url":"http://a2.twimg.com/profile_images/1076818910/perfil_normal.jpg","created_at":"Mon, 02 Aug 2010 20:36:11 +0000","from_user":"Joanux810","metadata":{"result_type":"recent"},"to_user_id":89683958,"text":"@baby_zinthy Alrededor de 100 pesos, pues santa fe queda al sur de la ciudad, y que de que-santafe, la expo queda a 5 minutos","id":20165929331,"from_user_id":109316690,"to_user":"baby_zinthy","geo":null,"iso_language_code":"es","source":"&lt;a href=&quot;http://twitter.com/&quot;&gt;web&lt;/a&gt;"},{"profile_image_url":"http://a1.twimg.com/profile_images/118565949/imagem_7_normal.jpg","created_at":"Mon, 02 Aug 2010 20:36:10 +0000","from_user":"Zamorim","metadata":{"result_type":"recent"},"to_user_id":null,"text":"RT @LeiSecaRJ: SEG 17:25 #Blitz Niteru00F3i RT @u200Eduannidejeanu200E: Blitz Santa Rosa Niteroi em frente ao supermercado premier com reboque.","id":20165928149,"from_user_id":36772960,"geo":null,"iso_language_code":"es","source":"&lt;a href=&quot;http://tweethopper.com&quot; rel=&quot;nofollow&quot;&gt;tweet hopper&lt;/a&gt;"},{"profile_image_url":"http://a2.twimg.com/profile_images/1009631706/65e3a70d-c7df-4f15-bba4-414e45087ded_normal.png","created_at":"Mon, 02 Aug 2010 20:36:03 +0000","from_user":"lucianoclaw","metadata":{"result_type":"recent"},"to_user_id":null,"text":"no rio seru00E1 em magu00E9 e santa cruz e na bahia sera em serrinha esse ja tem data sera dia 20 e 21/11","id":20165920876,"from_user_id":28818485,"geo":null,"iso_language_code":"pt","source":"&lt;a href=&quot;http://www.tweetdeck.com&quot; rel=&quot;nofollow&quot;&gt;TweetDeck&lt;/a&gt;"},{"profile_image_url":"http://a0.twimg.com/profile_images/1092501912/pglr_-__48_normal.png","created_at":"Mon, 02 Aug 2010 20:36:02 +0000","from_user":"lanzameudocinho","metadata":{"result_type":"recent"},"to_user_id":null,"text":"KKKKKKKKKKKKKKKKKKKKKKKKKK A @PELUTESAO SE ACHA A SANTA U.U u2193","id":20165920259,"from_user_id":129719133,"geo":null,"iso_language_code":"it","source":"&lt;a href=&quot;http://twitter.com/&quot;&gt;web&lt;/a&gt;"},{"profile_image_url":"http://a1.twimg.com/profile_images/1080492017/alok_normal.jpg","created_at":"Mon, 02 Aug 2010 20:35:58 +0000","from_user":"gabiipop","metadata":{"result_type":"recent"},"to_user_id":28130713,"text":"@AliineRodrigues @imnotmoni shamemos santa kiku00E3 HUAHSUAHSUHSUSHU obrigado queridjinhow","id":20165917174,"from_user_id":21038998,"to_user":"AliineRodrigues","geo":null,"iso_language_code":"pt","source":"&lt;a href=&quot;http://twitter.com/&quot;&gt;web&lt;/a&gt;"},{"profile_image_url":"http://a2.twimg.com/profile_images/894695414/MELT_SMILE_web_copy_normal.jpg","created_at":"Mon, 02 Aug 2010 20:35:54 +0000","from_user":"meltdowncomics","metadata":{"result_type":"recent"},"to_user_id":null,"text":"RT @DisneyStorePrez: Seeing Santa Monica for the 1st time today since we put product in the store.  Cannot wait for the Friday opening!","id":20165913125,"from_user_id":1932339,"geo":null,"iso_language_code":"en","source":"&lt;a href=&quot;http://twitter.com/&quot;&gt;web&lt;/a&gt;"},{"profile_image_url":"http://a1.twimg.com/profile_images/1093206513/srk_don248_normal.jpg","created_at":"Mon, 02 Aug 2010 20:35:45 +0000","from_user":"nagendraaithal","metadata":{"result_type":"recent"},"to_user_id":null,"text":"Santa Ko Exam Me Koi Sawal Nhi Aata Tha To Wo Hr Ques K Neche ???????????? Aisi Line Laga K Neche Likhta Hai Scratch Kar lo Answer Pad Lo","id":20165905363,"from_user_id":105070299,"geo":null,"iso_language_code":"en","source":"&lt;a href=&quot;http://dabr.co.uk&quot; rel=&quot;nofollow&quot;&gt;dabr&lt;/a&gt;"},{"profile_image_url":"http://a1.twimg.com/profile_images/1094044101/carnaval_2010_019_normal.jpg","created_at":"Mon, 02 Aug 2010 20:35:44 +0000","from_user":"donromero7","metadata":{"result_type":"recent"},"to_user_id":null,"text":"RT @LeiSecaRJ: SEG 17:25 #Blitz Niteru00F3i RT @u200Eduannidejeanu200E: Blitz Santa Rosa Niteroi em frente ao supermercado premier com reboque.","id":20165904898,"from_user_id":49424581,"geo":null,"iso_language_code":"es","source":"&lt;a href=&quot;http://tweethopper.com&quot; rel=&quot;nofollow&quot;&gt;tweet hopper&lt;/a&gt;"},{"profile_image_url":"http://a3.twimg.com/profile_images/1052988803/msn1_normal.jpg","created_at":"Mon, 02 Aug 2010 20:35:34 +0000","from_user":"spacecarolis","metadata":{"result_type":"recent"},"to_user_id":16487990,"text":"@pelanzarestart voooooooooooooooooooolta pra santa catarina pe )):","id":20165895807,"from_user_id":70616091,"to_user":"pelanzarestart","geo":null,"iso_language_code":"it","source":"&lt;a href=&quot;http://twitter.com/&quot;&gt;web&lt;/a&gt;"},{"profile_image_url":"http://a0.twimg.com/profile_images/627448636/IMG_2187_normal.JPG","created_at":"Mon, 02 Aug 2010 20:35:33 +0000","from_user":"Yarbroughtow","metadata":{"result_type":"recent"},"to_user_id":null,"text":"Yarbrough Bros Towing in Rohnert Park this a/m to body shop in Santa Rosa, then got 1 in Healdsburg towing in Santa Rosa direction also.","id":20165894168,"from_user_id":90110966,"geo":null,"iso_language_code":"en","source":"&lt;a href=&quot;http://twitter.com/&quot;&gt;web&lt;/a&gt;"},{"profile_image_url":"http://a0.twimg.com/profile_images/1024563412/400x400_DS_Logo_normal.jpg","created_at":"Mon, 02 Aug 2010 20:35:29 +0000","from_user":"DisneyStorePrez","metadata":{"result_type":"recent"},"to_user_id":null,"text":"Seeing Santa Monica for the 1st time today since we put product in the store.  Cannot wait for the Friday opening!","id":20165891220,"from_user_id":8558121,"geo":null,"iso_language_code":"en","source":"&lt;a href=&quot;http://twitter.com/&quot;&gt;web&lt;/a&gt;"}],"max_id":20165933792,"since_id":0,"refresh_url":"?since_id=20165933792&q=santa","next_page":"?page=2&max_id=20165933792&q=santa","results_per_page":15,"page":1,"completed_in":0.890801,"query":"santa"}';
    
    var decoded = Json.decodeObject(string);
    
    assertEquals(string, Json.encodeObject(decoded));
  }
}
