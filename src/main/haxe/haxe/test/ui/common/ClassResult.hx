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

import haxe.test.TestResult;

/**
* @todo add documentation
*/
class ClassResult {
  var fixtures : Hash<FixtureResult>;
  public var className(default, null) : String;
  public var setupName(default, null) : String;
  public var teardownName(default, null) : String;
  public var hasSetup(default, null) : Bool;
  public var hasTeardown(default, null) : Bool;

  public var methods(default, null) : Int;
  public var stats(default, null) : ResultStats;

  public function new(className : String, setupName : String, teardownName : String) {
    fixtures = new Hash();
    this.className = className;
    this.setupName = setupName;
    hasSetup = setupName != null;
    this.teardownName = teardownName;
    hasTeardown = teardownName != null;

    methods = 0;
    stats = new ResultStats();
  }

  public function add(result : FixtureResult) {
    if(fixtures.exists(result.methodName)) throw "invalid duplicated fixture result";

    stats.wire(result.stats);

    methods++;
    fixtures.set(result.methodName, result);
  }

  public function get(method : String) {
    return fixtures.get(method);
  }

  public function exists(method : String) {
    return fixtures.exists(method);
  }

  public function methodNames(errorsHavePriority = true) : Array<String> {
    var names = [];
    for(name in fixtures.keys())
      names.push(name);
    if(errorsHavePriority) {
      var me = this;
      names.sort(function(a, b) {
        var as = me.get(a).stats;
        var bs = me.get(b).stats;
        if(as.hasErrors) {
          return (!bs.hasErrors) ? -1 : (as.errors == bs.errors ? Reflect.compare(a, b) : Reflect.compare(as.errors, bs.errors));
        } else if(bs.hasErrors) {
          return 1;
        } else if(as.hasFailures) {
          return (!bs.hasFailures) ? -1 : (as.failures == bs.failures ? Reflect.compare(a, b) : Reflect.compare(as.failures, bs.failures));
        } else if(bs.hasFailures) {
          return 1;
        } else if(as.hasWarnings) {
          return (!bs.hasWarnings) ? -1 : (as.warnings == bs.warnings ? Reflect.compare(a, b) : Reflect.compare(as.warnings, bs.warnings));
        } else if(bs.hasWarnings) {
          return 1;
        } else {
          return Reflect.compare(a, b);
        }
      });
    } else {
      names.sort(function(a, b) {
        return Reflect.compare(a, b);
      });
    }
    return names;
  }


}