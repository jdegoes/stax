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

class SignalFloat {
    private function new() { }
    
    public static function plus(b: Signal<Float>, value: Float): Signal<Float> {
        return plusS(b, Signals.constant(value));
    }
    
    public static function plusS(b1: Signal<Float>, b2: Signal<Float>): Signal<Float> {
        return b1.zip(b2).map(function(t) { return t._1 + t._2; });
    }
    
    public static function minusS(b1: Signal<Float>, b2: Signal<Float>): Signal<Float> {
        return b1.zip(b2).map(function(t) { return t._1 - t._2; });
    }
    
    public static function minus(b: Signal<Float>, value: Float): Signal<Float> {
        return minusS(b, Signals.constant(value));
    }
    
    public static function timesS(b1: Signal<Float>, b2: Signal<Float>): Signal<Float> {
        return b1.zip(b2).map(function(t) { return t._1 * t._2; });
    }
    
    public static function times(b: Signal<Float>, value: Float): Signal<Float> {
        return timesS(b, Signals.constant(value));
    }
    
    public static function dividedByS(b1: Signal<Float>, b2: Signal<Float>): Signal<Float> {
        return b1.zip(b2).map(function(t) { return t._1 / t._2; });
    }
    
    public static function dividedBy(b: Signal<Float>, value: Float): Signal<Float> {
        return dividedByS(b, Signals.constant(value));
    }
    
    public static function abs(b: Signal<Float>): Signal<Float> {
        return b.map(function(e) { return Math.abs(e); });
    }
    
    public static function negate(b: Signal<Float>): Signal<Float> {
        return b.map(function(e) { return -e; });
    }
    
    public static function floor(b: Signal<Float>): Signal<Float> {
        return b.map(function(e): Float { return Math.floor(e); });
    }
    
    public static function ceil(b: Signal<Float>): Signal<Float> {
        return b.map(function(e): Float { return Math.ceil(e); });
    }
    
    public static function round(b: Signal<Float>): Signal<Float> {
        return b.map(function(e): Float { return Math.round(e); });
    }
    
    public static function acos(b: Signal<Float>): Signal<Float> {
        return b.map(function(e) { return Math.acos(e); });
    }
    
    public static function asin(b: Signal<Float>): Signal<Float> {
        return b.map(function(e) { return Math.asin(e); });
    }
    
    public static function atan(b: Signal<Float>): Signal<Float> {
        return b.map(function(e) { return Math.atan(e); });
    }
    
    public static function atan2B(b1: Signal<Float>, b2: Signal<Float>): Signal<Float> {
        return b1.zip(b2).map(function(t) { return Math.atan2(t._1, t._2); });
    }
    
    public static function atan2(b: Signal<Float>, value: Float): Signal<Float> {
        return atan2B(b, Signals.constant(value));
    }
    
    public static function cos(b: Signal<Float>): Signal<Float> {
        return b.map(function(e) { return Math.cos(e); });
    }
    
    public static function exp(b: Signal<Float>): Signal<Float> {
        return b.map(function(e) { return Math.exp(e); });
    }
    
    public static function log(b: Signal<Float>): Signal<Float> {
        return b.map(function(e) { return Math.log(e); });
    }
    
    public static function maxS(b1: Signal<Float>, b2: Signal<Float>): Signal<Float> {
        return b1.zip(b2).map(function(t) { return Math.max(t._1, t._2); });
    }
    
    public static function max(b: Signal<Float>, value: Float): Signal<Float> {
        return maxS(b, Signals.constant(value));
    }
    
    public static function minS(b1: Signal<Float>, b2: Signal<Float>): Signal<Float> {
        return b1.zip(b2).map(function(t) { return Math.min(t._1, t._2); });
    }
    
    public static function min(b: Signal<Float>, value: Float): Signal<Float> {
        return minS(b, Signals.constant(value));
    }
    
    public static function powS(b1: Signal<Float>, b2: Signal<Float>): Signal<Float> {
        return b1.zip(b2).map(function(t) { return Math.pow(t._1, t._2); });
    }
    
    public static function pow(b: Signal<Float>, value: Float): Signal<Float> {
        return powS(b, Signals.constant(value));
    }
    
    public static function sin(b: Signal<Float>): Signal<Float> {
        return b.map(function(e) { return Math.sin(e); });
    }
    
    public static function sqrt(b: Signal<Float>): Signal<Float> {
        return b.map(function(e) { return Math.sqrt(e); });
    }
    
    public static function tan(b: Signal<Float>): Signal<Float> {
        return b.map(function(e) { return Math.tan(e); });
    }
}