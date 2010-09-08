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

import haxe.test.Dispatcher;
import haxe.test.Runner;
import haxe.test.TestResult;

/**
* @todo add documentation
* @todo add tests for this class
*/
class ResultAggregator {
  var runner : Runner;
  var flattenPackage : Bool;
  public var root(default, null) : PackageResult;

  public var onStart(default, null) : Notifier;
  public var onComplete(default, null) : Dispatcher<PackageResult>;
  public var onProgress(default, null) : Dispatcher<{ done : Int, totals : Int }>;

  public function new(runner : Runner, flattenPackage = false) {
    if(runner == null) throw "runner argument is null";
    this.flattenPackage = flattenPackage;
    this.runner = runner;
    runner.onStart.add(start);
    runner.onProgress.add(progress);
    runner.onComplete.add(complete);

    onStart = new Notifier();
    onComplete = new Dispatcher();
    onProgress = new Dispatcher();
  }

  function start(runner : Runner) {
    root = new PackageResult(null);
    onStart.dispatch();
  }

  function getOrCreatePackage(pack : String, flat : Bool, ?ref : PackageResult) {
    if(ref == null) ref = root;
    if(pack == null || pack == '') return ref;
    if(flat) {
      if(ref.existsPackage(pack))
        return ref.getPackage(pack);
      var p = new PackageResult(pack);
      ref.addPackage(p);
      return p;
    } else {
      var parts = pack.split('.');
      for(part in parts) {
        ref = getOrCreatePackage(part, true, ref);
      }
      return ref;
    }
  }

  function getOrCreateClass(pack : PackageResult, cls : String, setup : String, teardown : String) {
    if(pack.existsClass(cls)) return pack.getClass(cls);
    var c = new ClassResult(cls, setup, teardown);
    pack.addClass(c);
    return c;
  }

  function createFixture(result : TestResult) {
    var f = new FixtureResult(result.method);
    for(assertation in result.assertations)
      f.add(assertation);
    return f;
  }

  function progress(e) {
    root.addResult(e.result, flattenPackage);
    onProgress.dispatch(e);
  }

  function complete(runner : Runner) {
    onComplete.dispatch(root);
  }
}