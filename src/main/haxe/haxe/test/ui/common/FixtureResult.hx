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
package haxe.test.ui.common;

import haxe.test.Assertation;

/**
* @todo add documentation
*/
class FixtureResult {
  public var methodName(default, null) : String;
  public var hasTestError(default, null) : Bool;
  public var hasSetupError(default, null) : Bool;
  public var hasTeardownError(default, null) : Bool;
  public var hasTimeoutError(default, null) : Bool;
  public var hasAsyncError(default, null) : Bool;

  public var stats(default, null) : ResultStats;

  var list(default, null) : List<Assertation>;
  public function new(methodName : String) {
    this.methodName = methodName;
    this.list = new List();
    hasTestError = false;
    hasSetupError = false;
    hasTeardownError = false;
    hasTimeoutError = false;
    hasAsyncError = false;

    stats = new ResultStats();
  }

  public function iterator() {
    return list.iterator();
  }

  public function add(assertation : Assertation) {
    list.add(assertation);
    switch(assertation) {
      case Success(_):
        stats.addSuccesses(1);
      case Failure(_, _):
        stats.addFailures(1);
      case Error(_, _):
        stats.addErrors(1);
      case SetupError(_, _):
        stats.addErrors(1);
        hasSetupError = true;
      case TeardownError(_, _):
        stats.addErrors(1);
        hasTeardownError = true;
      case TimeoutError(_, _):
        stats.addErrors(1);
        hasTimeoutError = true;
      case AsyncError(_, _):
        stats.addErrors(1);
        hasAsyncError = true;
      case Warning(_):
        stats.addWarnings(1);
    }
  }
}