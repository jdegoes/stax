/*
 HaXe library written by John A. De Goes <john@socialmedia.com>

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
package haxe.util;

import Prelude;

import haxe.test.TestCase;
import haxe.util.ObjectExtensions;

using PreludeExtensions;
using haxe.util.ObjectExtensions;

class ObjectExtensionsTestCase extends TestCase {
  public function new() {
    super();
  }
  
  public function testGet() {
    var o = { foo: "bar" };
    
    assertEquals("bar", o.getAny("foo").get());
  }
  
  public function testSet() {
    var o = { foo: "bar" };
    
    assertEquals("baz", o.setAny("foo", "baz").getAny("foo").get());
  }
  
  public function testReplaceAll() {
    var o = { foo: "bar", bar: "foo" };
    
    var replaced = o.replaceAllAny({foo: "foo"}, '');
    
    assertEquals("bar", replaced.getAny("foo").get());
    
    assertTrue(replaced.getAny("bar").isEmpty());
  }
}