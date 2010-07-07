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
package haxe.reactive;

import haxe.reactive.Reactive;

class BehaviorInt {
    private function new() { }
    
    public static function plus(b: Behavior<Int>, value: Int): Behavior<Int> {
        return plusB(b, Behaviors.constant(value));
    }
    
    public static function plusB(b1: Behavior<Int>, b2: Behavior<Int>): Behavior<Int> {
        return b1.zip(b2).map(function(t) { return t._1 + t._2; });
    }
    
    public static function minusB(b1: Behavior<Int>, b2: Behavior<Int>): Behavior<Int> {
        return b1.zip(b2).map(function(t) { return t._1 - t._2; });
    }
    
    public static function minus(b: Behavior<Int>, value: Int): Behavior<Int> {
        return minusB(b, Behaviors.constant(value));
    }
    
    public static function timesB(b1: Behavior<Int>, b2: Behavior<Int>): Behavior<Int> {
        return b1.zip(b2).map(function(t) { return t._1 * t._2; });
    }
    
    public static function times(b: Behavior<Int>, value: Int): Behavior<Int> {
        return timesB(b, Behaviors.constant(value));
    }
    
    public static function modB(b1: Behavior<Int>, b2: Behavior<Int>): Behavior<Int> {
        return b1.zip(b2).map(function(t) { return t._1 % t._2; });
    }
    
    public static function mod(b: Behavior<Int>, value: Int): Behavior<Int> {
        return modB(b, Behaviors.constant(value));
    }
    
    public static function dividedByB(b1: Behavior<Int>, b2: Behavior<Int>): Behavior<Int> {
        return b1.zip(b2).map(function(t) { return Std.int(t._1 / t._2); });
    }
    
    public static function dividedBy(b: Behavior<Int>, value: Int): Behavior<Int> {
        return dividedByB(b, Behaviors.constant(value));
    }
    
    public static function abs(b: Behavior<Int>): Behavior<Int> {
        return b.map(function(e) { return Std.int(Math.abs(e)); });
    }
    
    public static function negate(b: Behavior<Int>): Behavior<Int> {
        return b.map(function(e) { return -e; });
    }
    
    public static function toFloat(b: Behavior<Int>): Behavior<Float> {
        return b.map(function(e): Float { return e; });
    }
}