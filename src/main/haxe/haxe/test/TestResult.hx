/*
 HaXe library written by Franco Ponticelli <franco.ponticelli@gmail.com>

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the
 distribution.

 THIS SOFTWARE IS PROVIDED BY FRANCO PONTICELLI "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
 FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL SOCIAL MEDIA NETWORKS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
package haxe.test;

import haxe.test.Assertation;

/**
* @todo add documentation
*/
class TestResult {
  public var pack          : String;
  public var cls           : String;
  public var method        : String;
  public var setup         : String;
  public var teardown      : String;
  public var assertations  : List<Assertation>;

  public function new(){}

  public static function ofHandler(handler : TestHandler<Dynamic>) {
    var r = new TestResult();
    var path = Type.getClassName(Type.getClass(handler.fixture.target)).split('.');
    r.cls           = path.pop();
    r.pack          = path.join('.');
    r.method        = handler.fixture.methodName;
    r.setup         = handler.fixture.setup;
    r.teardown      = handler.fixture.teardown;
    r.assertations  = handler.results;
    return r;
  }
}