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

import stax.Maths;

using haxe.util.OrderExtension;

class OrderExtensionsTestCase extends TestCase {
  public function testGreaterThan() {
    assertTrue (Ints.compare.greaterThan()(2, 1));
    assertFalse(Ints.compare.greaterThan()(1, 1));

    assertTrue (Ints.compare.greaterThanOrEqual()(2, 1));
    assertTrue (Ints.compare.greaterThanOrEqual()(1, 1));
    assertFalse(Ints.compare.greaterThanOrEqual()(1, 2));

    assertTrue (Ints.compare.lessThan()(1, 2));
    assertFalse(Ints.compare.lessThan()(1, 1));

    assertTrue (Ints.compare.lessThanOrEqual()(1, 2));
    assertTrue (Ints.compare.lessThanOrEqual()(1, 1));
    assertFalse(Ints.compare.lessThanOrEqual()(2, 1));

    assertTrue (Ints.compare.notEqual()(2, 1));
    assertTrue (Ints.compare.notEqual()(1, 2));
    assertFalse(Ints.compare.notEqual()(1, 1));

    assertTrue (Ints.compare.equal()(1, 1));
    assertFalse(Ints.compare.equal()(1, 2));
  }
}