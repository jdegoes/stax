package haxe.text.html;

import haxe.unit.TestCase;

class HTMLParserTestCase extends TestCase {
  public function testToMakeSureHaXeIsntBreakingThings (): Void {
    assertEquals (1 % 3 < 5 % 3, true);
  }

  #if js
  public function testThatScriptsAreNotExecuted (): Void {
    HTMLParser.parseIntoElements ("<script>alert(\"If you see this, then the test fails.\")</script>");
    assertEquals (true, true);  // To make HaXe happy
  }

  public function testThatElementsAreStuffedIntoAnArray (): Void {
    assertEquals (HTMLParser.parseIntoElements ("<div></div><span></span>").length, 2);
    assertEquals (HTMLParser.parseIntoElements ("<div></div><span></span>")[0].nodeName.toLowerCase(), "div");
    assertEquals (HTMLParser.parseIntoElements ("<div></div><span></span>")[1].nodeName.toLowerCase(), "span");
  }

  public function testThatScriptsArePlacedLast (): Void {
    assertEquals (HTMLParser.parseIntoElements ("<div>foo</div><script>foo</script><div>bar</div>").length, 3);
    assertEquals (HTMLParser.parseIntoElements ("<div>foo</div><script>foo</script><div>bar</div>")[0].nodeName.toLowerCase(), "div");
    assertEquals (HTMLParser.parseIntoElements ("<div>foo</div><script>foo</script><div>bar</div>")[1].nodeName.toLowerCase(), "div");
    assertEquals (HTMLParser.parseIntoElements ("<div>foo</div><script>foo</script><div>bar</div>")[2].nodeName.toLowerCase(), "script");
  }
  #end

  public function testEmptyString (): Void {
    assertEquals (HTMLParser.parse ("").length, 1);
    assertEquals (HTMLParser.parse ("")[0], "");
  }

  public function testText (): Void {
    assertEquals (HTMLParser.parse ("foo").length, 1);
    assertEquals (HTMLParser.parse ("foo")[0], "foo");
  }

  public function testLoneCData (): Void {
    assertEquals (HTMLParser.parse ("<![CDATA[bar]]>").length, 1);
    assertEquals (HTMLParser.parse ("<![CDATA[bar]]>")[0], "<![CDATA[bar]]>");
  }

  public function testTextCData (): Void {
    assertEquals (HTMLParser.parse ("foo<![CDATA[bar]]>bif").length, 1);
    assertEquals (HTMLParser.parse ("foo<![CDATA[bar]]>bif")[0], "foo<![CDATA[bar]]>bif");
  }

  public function testLoneComments (): Void {
    assertEquals (HTMLParser.parse ("<!--bar-->").length, 1);
    assertEquals (HTMLParser.parse ("<!--bar-->")[0], "<!--bar-->");
  }

  public function testTextComments (): Void {
    assertEquals (HTMLParser.parse ("foo<!--bar-->bif").length, 1);
    assertEquals (HTMLParser.parse ("foo<!--bar-->bif")[0], "foo<!--bar-->bif");
  }

  public function testLoneScripts (): Void {
    assertEquals (HTMLParser.parse ("<script>foo</script>").length, 2);
    assertEquals (HTMLParser.parse ("<script>foo</script>")[0], "");
    assertEquals (HTMLParser.parse ("<script>foo</script>")[1], "<script>foo</script>");
  }

  public function testTextScripts (): Void {
    assertEquals (HTMLParser.parse ("foo<script>bar</script>bif").length, 2);
    assertEquals (HTMLParser.parse ("foo<script>bar</script>bif")[0], "foobif");
    assertEquals (HTMLParser.parse ("foo<script>bar</script>bif")[1], "<script>bar</script>");
  }

  public function testEmptyScripts (): Void {
    assertEquals (HTMLParser.parse ("foo<script></script>bif").length, 2);
    assertEquals (HTMLParser.parse ("foo<script></script>bif")[0], "foobif");
    assertEquals (HTMLParser.parse ("foo<script></script>bif")[1], "<script></script>");
  }

  public function testScriptsWithWonkyCases (): Void {
    assertEquals (HTMLParser.parse ("foo<SCRIPT>bar</SCRIPT>bif").length, 2);
    assertEquals (HTMLParser.parse ("foo<SCRIPT>bar</SCRIPT>bif")[0], "foobif");
    assertEquals (HTMLParser.parse ("foo<SCRIPT>bar</SCRIPT>bif")[1], "<SCRIPT>bar</SCRIPT>");
  }

  public function testScriptsWithAttributes (): Void {
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'>bar</script>bif").length, 2);
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'>bar</script>bif")[0], "foobif");
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'>bar</script>bif")[1], "<script src='foo.bar.bif'>bar</script>");
  }

  public function testEmptyScriptsWithAttributes (): Void {
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'></script>bif").length, 2);
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'></script>bif")[0], "foobif");
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'></script>bif")[1], "<script src='foo.bar.bif'></script>");
  }

  public function testCDataInsideScript (): Void {
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'><![CDATA[ foo bar bif ]]></script>bif").length, 2);
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'><![CDATA[ foo bar bif ]]></script>bif")[0], "foobif");
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'><![CDATA[ foo bar bif ]]></script>bif")[1], "<script src='foo.bar.bif'><![CDATA[ foo bar bif ]]></script>");
  }

  public function testCDataProtectingCloseScript (): Void {
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'><![CDATA[ foo bar bif </script> ]]></script>bif").length, 2);
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'><![CDATA[ foo bar bif </script> ]]></script>bif")[0], "foobif");
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'><![CDATA[ foo bar bif </script> ]]></script>bif")[1], "<script src='foo.bar.bif'><![CDATA[ foo bar bif </script> ]]></script>");
  }

  public function testStringInsideScript (): Void {
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'>s = 'foo bar bif' = s</script>bif").length, 2);
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'>s = 'foo bar bif' = s</script>bif")[0], "foobif");
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'>s = 'foo bar bif' = s</script>bif")[1], "<script src='foo.bar.bif'>s = 'foo bar bif' = s</script>");
  }

  public function testStringProtectingCloseScript (): Void {
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'>s = 'foo bar bif </script>' = s</script>bif").length, 2);
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'>s = 'foo bar bif </script>' = s</script>bif")[0], "foobif");
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'>s = 'foo bar bif </script>' = s</script>bif")[1], "<script src='foo.bar.bif'>s = 'foo bar bif </script>' = s</script>");
  }

  public function testFencepostStringInsideScript (): Void {
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'>'foo bar bif'</script>bif").length, 2);
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'>'foo bar bif'</script>bif")[0], "foobif");
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'>'foo bar bif'</script>bif")[1], "<script src='foo.bar.bif'>'foo bar bif'</script>");
  }

  public function testFencepostStringProtectingCloseScript (): Void {
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'>'foo bar bif </script>'</script>bif").length, 2);
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'>'foo bar bif </script>'</script>bif")[0], "foobif");
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'>'foo bar bif </script>'</script>bif")[1], "<script src='foo.bar.bif'>'foo bar bif </script>'</script>");
  }

  public function testEscapedStringProtectingCloseScript (): Void {
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'>s = 'foo bar bif\\\\\\' </script>' = s</script>bif").length, 2);
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'>s = 'foo bar bif\\\\\\' </script>' = s</script>bif")[0], "foobif");
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'>s = 'foo bar bif\\\\\\' </script>' = s</script>bif")[1], "<script src='foo.bar.bif'>s = 'foo bar bif\\\\\\' </script>' = s</script>");
  }

  public function testNotEscapedStringProtectingCloseScript (): Void {
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'>s = 'foo bar bif\\\\ </script>\\\\' = s</script>bif").length, 2);
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'>s = 'foo bar bif\\\\ </script>\\\\' = s</script>bif")[0], "foobif");
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'>s = 'foo bar bif\\\\ </script>\\\\' = s</script>bif")[1], "<script src='foo.bar.bif'>s = 'foo bar bif\\\\ </script>\\\\' = s</script>");
  }

  public function testCommentsAroundScript (): Void {
    assertEquals (HTMLParser.parse ("foo<!--<script src='foo.bar.bif'>s = 'foo bar bif\\\\ </script>\\\\' = s</script>-->bif").length, 1);
    assertEquals (HTMLParser.parse ("foo<!--<script src='foo.bar.bif'>s = 'foo bar bif\\\\ </script>\\\\' = s</script>-->bif")[0],
                                    "foo<!--<script src='foo.bar.bif'>s = 'foo bar bif\\\\ </script>\\\\' = s</script>-->bif");
  }

  public function testCDataAroundScript (): Void {
    assertEquals (HTMLParser.parse ("foo<![CDATA[<script src='foo.bar.bif'>s = 'foo bar bif\\\\ </script>\\\\' = s</script>]]>bif").length, 1);
    assertEquals (HTMLParser.parse ("foo<![CDATA[<script src='foo.bar.bif'>s = 'foo bar bif\\\\ </script>\\\\' = s</script>]]>bif")[0],
                                    "foo<![CDATA[<script src='foo.bar.bif'>s = 'foo bar bif\\\\ </script>\\\\' = s</script>]]>bif");
  }

  public function testTwoScripts (): Void {
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'>s = 'foo bar bif\\\\ </script>\\\\' = s</script>bif<script>bar</script>bif").length, 3);
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'>s = 'foo bar bif\\\\ </script>\\\\' = s</script>bif<script>bar</script>bif")[0], "foobifbif");
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'>s = 'foo bar bif\\\\ </script>\\\\' = s</script>bif<script>bar</script>bif")[1],
                                       "<script src='foo.bar.bif'>s = 'foo bar bif\\\\ </script>\\\\' = s</script>");
    assertEquals (HTMLParser.parse ("foo<script src='foo.bar.bif'>s = 'foo bar bif\\\\ </script>\\\\' = s</script>bif<script>bar</script>bif")[2],
                                                                                                                    "<script>bar</script>");
  }
}
