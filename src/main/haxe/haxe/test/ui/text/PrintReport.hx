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
package haxe.test.ui.text;

import haxe.PosInfos;

import haxe.test.Runner;
import haxe.test.TestResult;
import haxe.test.ui.common.ResultAggregator;
import haxe.test.ui.common.PackageResult;
import haxe.Stack;

#if php
import php.Lib;
#elseif neko
import neko.Lib;
#elseif cpp
import cpp.Lib;
#end

/**
* @todo add documentation
*/
class PrintReport extends PlainTextReport {
  var useTrace : Bool;
#if (php || neko)
  public function new(runner : Runner, ?useTrace : Bool) {
    if(null == useTrace)
      useTrace = false;
      this.useTrace = useTrace;
      super(runner, _handler);
#if php
    if (php.Lib.isCli()) {
#elseif neko
    if (!neko.Web.isModNeko) {
#end
      newline = "\n";
      indent  = "  ";
    } else {
      newline = "<br>";
      indent  = "&nbsp;&nbsp;";
    }
  }
  
  function _handler(report : PlainTextReport)
  {
    if (useTrace)
      _trace(report.getResults());
    else
      _print(report.getResults());
  }
#else
  public function new(runner : Runner) {
    super(runner, _handler);
    newline = "\n";
    indent  = "  ";
  }
  
  function _handler(report : PlainTextReport)
  {
    _trace(report.getResults());
  }
#end

  function _trace(s : String) {
    s = StringTools.replace(s, '  ', indent);
    s = StringTools.replace(s, '\n', newline);
    trace(s);
  }
#if (php || neko || cpp)
  function _print(s : String) {
    Lib.print(s);
  }
#end
}