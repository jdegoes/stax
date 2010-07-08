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

class BehaviorFloat {
    private function new() { }
    
    public static function plus(b: Behavior<Float>, value: Float): Behavior<Float> {
        return plusB(b, Behaviors.constant(value));
    }
    
    public static function plusB(b1: Behavior<Float>, b2: Behavior<Float>): Behavior<Float> {
        return b1.zip(b2).map(function(t) { return t._1 + t._2; });
    }
    
    public static function minusB(b1: Behavior<Float>, b2: Behavior<Float>): Behavior<Float> {
        return b1.zip(b2).map(function(t) { return t._1 - t._2; });
    }
    
    public static function minus(b: Behavior<Float>, value: Float): Behavior<Float> {
        return minusB(b, Behaviors.constant(value));
    }
    
    public static function timesB(b1: Behavior<Float>, b2: Behavior<Float>): Behavior<Float> {
        return b1.zip(b2).map(function(t) { return t._1 * t._2; });
    }
    
    public static function times(b: Behavior<Float>, value: Float): Behavior<Float> {
        return timesB(b, Behaviors.constant(value));
    }
    
    public static function dividedByB(b1: Behavior<Float>, b2: Behavior<Float>): Behavior<Float> {
        return b1.zip(b2).map(function(t) { return t._1 / t._2; });
    }
    
    public static function dividedBy(b: Behavior<Float>, value: Float): Behavior<Float> {
        return dividedByB(b, Behaviors.constant(value));
    }
    
    public static function abs(b: Behavior<Float>): Behavior<Float> {
        return b.map(function(e) { return Math.abs(e); });
    }
    
    public static function negate(b: Behavior<Float>): Behavior<Float> {
        return b.map(function(e) { return -e; });
    }
    
    public static function floor(b: Behavior<Float>): Behavior<Float> {
        return b.map(function(e): Float { return Math.floor(e); });
    }
    
    public static function ceil(b: Behavior<Float>): Behavior<Float> {
        return b.map(function(e): Float { return Math.ceil(e); });
    }
    
    public static function round(b: Behavior<Float>): Behavior<Float> {
        return b.map(function(e): Float { return Math.round(e); });
    }
    
    public static function acos(b: Behavior<Float>): Behavior<Float> {
        return b.map(function(e) { return Math.acos(e); });
    }
    
    public static function asin(b: Behavior<Float>): Behavior<Float> {
        return b.map(function(e) { return Math.asin(e); });
    }
    
    public static function atan(b: Behavior<Float>): Behavior<Float> {
        return b.map(function(e) { return Math.atan(e); });
    }
    
    public static function atan2B(b1: Behavior<Float>, b2: Behavior<Float>): Behavior<Float> {
        return b1.zip(b2).map(function(t) { return Math.atan2(t._1, t._2); });
    }
    
    public static function atan2(b: Behavior<Float>, value: Float): Behavior<Float> {
        return atan2B(b, Behaviors.constant(value));
    }
    
    public static function cos(b: Behavior<Float>): Behavior<Float> {
        return b.map(function(e) { return Math.cos(e); });
    }
    
    public static function exp(b: Behavior<Float>): Behavior<Float> {
        return b.map(function(e) { return Math.exp(e); });
    }
    
    public static function log(b: Behavior<Float>): Behavior<Float> {
        return b.map(function(e) { return Math.log(e); });
    }
    
    public static function maxB(b1: Behavior<Float>, b2: Behavior<Float>): Behavior<Float> {
        return b1.zip(b2).map(function(t) { return Math.max(t._1, t._2); });
    }
    
    public static function max(b: Behavior<Float>, value: Float): Behavior<Float> {
        return maxB(b, Behaviors.constant(value));
    }
    
    public static function minB(b1: Behavior<Float>, b2: Behavior<Float>): Behavior<Float> {
        return b1.zip(b2).map(function(t) { return Math.min(t._1, t._2); });
    }
    
    public static function min(b: Behavior<Float>, value: Float): Behavior<Float> {
        return minB(b, Behaviors.constant(value));
    }
    
    public static function powB(b1: Behavior<Float>, b2: Behavior<Float>): Behavior<Float> {
        return b1.zip(b2).map(function(t) { return Math.pow(t._1, t._2); });
    }
    
    public static function pow(b: Behavior<Float>, value: Float): Behavior<Float> {
        return powB(b, Behaviors.constant(value));
    }
    
    public static function sin(b: Behavior<Float>): Behavior<Float> {
        return b.map(function(e) { return Math.sin(e); });
    }
    
    public static function sqrt(b: Behavior<Float>): Behavior<Float> {
        return b.map(function(e) { return Math.sqrt(e); });
    }
    
    public static function tan(b: Behavior<Float>): Behavior<Float> {
        return b.map(function(e) { return Math.tan(e); });
    }
}