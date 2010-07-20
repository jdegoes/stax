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

using haxe.util.StringExtensions;

using Prelude;

class StringExtensionsTestCase extends TestCase {
  public function testChunk() {
    var result = 'foobarblah'.chunk(3);
    
    var iterator = result.iterator();
    
    assertEquals('foo', iterator.next());
    assertEquals('bar', iterator.next());
    assertEquals('bla', iterator.next());
    assertEquals('h',   iterator.next());
  }
  
  public function testChars() {
    var result = 'foob'.chars();
    
    var iterator = result.iterator();
    
    assertEquals('f', iterator.next());
    assertEquals('o', iterator.next());
    assertEquals('o', iterator.next());
    assertEquals('b', iterator.next());
    
    assertFalse(iterator.hasNext());
  }
  
  public function testString() {
    assertEquals('foobar', 'foobar'.chars().string());
  }
}