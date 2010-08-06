/*
 HaXe library written by John A. De Goes <john@socialmedia.com>
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
package haxe.functional;

import Prelude;

typedef PartialFunction<A, Z> = PartialFunction1<A, Z>

interface PartialFunction1<A, Z> {
  public function isDefinedAt(a: A): Bool;
  
  public function orElse(that: PartialFunction1<A, Z>): PartialFunction1<A, Z>;
  
  public function orAlways(f: A ->  Z): PartialFunction1<A, Z>;
  
  public function orAlwaysC(z: Thunk<Z>): PartialFunction1<A, Z>;
  
  public function call(a: A): Z;
    
  public function toFunction(): A -> Option<Z>;
}

interface PartialFunction2<A, B, Z> {
  public function isDefinedAt(a: A, b: B): Bool;
  
  public function orElse(that: PartialFunction2<A, B, Z>): PartialFunction2<A, B, Z>;
  
  public function orAlways(f: A -> B ->  Z): PartialFunction2<A, B, Z>;
  
  public function orAlwaysC(z: Thunk<Z>): PartialFunction2<A, B, Z>;
  
  public function call(a: A, b: B): Z;
    
  public function toFunction(): A -> B -> Option<Z>;
}

interface PartialFunction3<A, B, C, Z> {
  public function isDefinedAt(a: A, b: B, c: C): Bool;
  
  public function orElse(that: PartialFunction3<A, B, C, Z>): PartialFunction3<A, B, C, Z>;
  
  public function orAlways(f: A -> B -> C ->  Z): PartialFunction3<A, B, C, Z>;
  
  public function orAlwaysC(z: Thunk<Z>): PartialFunction3<A, B, C, Z>;
  
  public function call(a: A, b: B, c: C): Z;
    
  public function toFunction(): A -> B -> C -> Option<Z>;
}

interface PartialFunction4<A, B, C, D, Z> {
  public function isDefinedAt(a: A, b: B, c: C, d: D): Bool;
  
  public function orElse(that: PartialFunction4<A, B, C, D, Z>): PartialFunction4<A, B, C, D, Z>;
  
  public function orAlways(f: A -> B -> C -> D -> Z): PartialFunction4<A, B, C, D, Z>;
  
  public function orAlwaysC(z: Thunk<Z>): PartialFunction4<A, B, C, D, Z>;
  
  public function call(a: A, b: B, c: C, d: D): Z;
    
  public function toFunction(): A -> B -> C -> D -> Option<Z>;
}

interface PartialFunction5<A, B, C, D, E, Z> {
  public function isDefinedAt(a: A, b: B, c: C, d: D, e: E): Bool;
  
  public function orElse(that: PartialFunction5<A, B, C, D, E, Z>): PartialFunction5<A, B, C, D, E, Z>;
  
  public function orAlways(f: A -> B -> C -> D -> E -> Z): PartialFunction5<A, B, C, D, E, Z>;
  
  public function orAlwaysC(z: Thunk<Z>): PartialFunction5<A, B, C, D, E, Z>;
  
  public function call(a: A, b: B, c: C, d: D, e: E): Z;
    
  public function toFunction(): A -> B -> C -> D -> E -> Option<Z>;
}