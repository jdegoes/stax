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

import Prelude;
import haxe.reactive.Reactive;
import haxe.data.collections.Collection;

using haxe.data.collections.IterableExtensions;
using Prelude;
using haxe.abstract.Foldable;

class Streams {
    private function new() { }
    
    /**
     * Creates a new stream with the specified updater and optional sources.
     *
     * @param updater   The updater.
     * @param sources   (Optional) The sources.
     *
     */
    public static function create<I, O>(updater: Pulse<I> -> Propagation<O>, sources: Iterable<Stream<I>> = null): Stream<O> {
        var sourceEvents = if (sources == null) null else (sources.toArray());
        return new Stream<O>(cast updater, sourceEvents);
    }
    
    /**
     * Creates a new stream that merely propagates all pulses it receives.
     *
     * @param sources
     */
    public static function identity<T>(sources: Iterable<Stream<T>> = null): Stream<T> {
        var sourceArray = if (sources == null) null else (sources.toArray());
        return new Stream<T>(function(pulse) { return propagate(pulse); }, sourceArray);
    }
    
    /**
     * Creates an event stream that will never have any events. Calling 
     * sendEvent() on such a stream will throw an exception.
     */
    public static function zero<T>(): Stream<T> {
        return Streams.create(function(pulse: Pulse<Dynamic>): Propagation<T> { throw 'zeroE : received a value; zeroE should not receive a value; the value was ' + pulse.value; return doNotPropagate; });            
    }
    
    /**
     * Creates an event stream that will send a single value.
     */
    public static function one<T>(val: T): Stream<T> {
        var sent = false;
        
        var stream = Streams.create(
            function(pulse: Pulse<Dynamic>): Propagation<T> {
                if (sent) {
                    throw 'Streams.one: received an extra value';
                }
                
                sent = false;
                
                return propagate(pulse);
            }
        );
        
        stream.sendLater(val);
        
        return stream;
    }
    
    /**
     * Merges the specified streams, or returns a zero stream if there are no 
     * streams.
     */
    public static function merge<T>(streams: Iterable<Stream<T>>): Stream<T> {
        return if (streams.size() == 0) zero();
        else identity(streams);
    }
    
    /**
     * Retrieves a constant stream. If sources are specified, events from the
     * sources will be mapped to the constant.
     *
     * @param value     The constant.
     * @param sources   (Optional) Source streams.
     */
    public static function constant<I, O>(value: O, sources: Iterable<Stream<I>> = null): Stream<O> {
        return Streams.create(
            function(pulse: Pulse<I>): Propagation<O> {
                return propagate(pulse.withValue(value));
            },
            sources
        );
    }
    
    /**
     * Creates a "receiver" stream whose sole purpose is to be used in 
     * combination with sendEvent().
     */
    public static function receiver() {
        return Streams.identity();
    }
    
    /**
     * Switches off of an Stream of Bools, returning
     * the specified Stream<T> when true
     * 
     *
     * @param conditions    An Iterable of Tuple2s, composed of a
     *                      true/false Stream and an 'if true' 
     *                      Stream that will be returned if 
     *                      Tuple._1 == 'true.'
     *
     * @return              If 'conditions' contains aTuple2._1 
     *                      == 'true', Stream<T> else a
     *                      zero Stream.
     */
    public static function cond<T>(conditions: Iterable<Tuple2<Stream<Bool>, Stream<T>>>): Stream<T> {
        return switch (conditions.headOption()) {
            case None:    Streams.zero();
            case Some(h): StreamBool.ifTrue(h._1, h._2, cond(conditions.tail()));
        }
    }
    
    /**
     * Creates a stream of time events, spaced out by the specified number of
     * milliseconds.
     *
     * @param time The number of milliseconds.
     */
    public static function timer(time: Int): Stream<Int> {
        return timerS(Signals.constant(time));
    }
    
    /**
     * Creates a stream of time events, spaced out by the specified number of
     * milliseconds.
     *
     * @param time The number of milliseconds.
     */
    public static function timerS(time: Signal<Int>): Stream<Int> {
        var stream: Stream<Int> = Streams.identity();
        
        var pulser: Void -> Void = null;
        var timer = null;
        
        var createTimer = function() {
            return External.setTimeout(pulser, time.valueNow());
        }
        
        pulser = function() {
            stream.sendEvent(External.now());
            
            if (timer != null) External.cancelTimeout(timer);
            
            if (!stream.weaklyHeld) {
                timer = createTimer();
            }
        }
        
        timer = createTimer();
        
        return stream;
    }
    
    /**
     * Zips together the specified streams.
     */
    public static function zipN<T>(streams: Iterable<Stream<T>>): Stream<Iterable<T>> {
        var stamps = streams.map(function(s) { return -1;   }).toArray();
        var values = streams.map(function(s) { return null; }).toArray();
        
        var output: Stream<T> = Streams.identity();
        
        for (index in 0...streams.size()) {
            var stream = streams.at(index);
            
            output = output.merge(Streams.create(
                function(pulse: Pulse<T>): Propagation<T> {
                    stamps[index] = pulse.stamp;
                    values[index] = pulse.value;
                    
                    return propagate(pulse);
                },
                [stream]
            ));
        }
        
        return Streams.create(
            function (pulse: Pulse<T>): Propagation<Iterable<T>> {
                var stampsEqual = stamps.nub().size() == 1;
                
                return if (stampsEqual) {
                    var iter: Iterable<T> = values.snapshot();
                    
                    propagate(pulse.withValue(iter));
                }
                else doNotPropagate;
            },
            [output]
        ).uniqueSteps();
    }
    
    /**
     * Creates a stream of random number events, separated by the specified 
     * number of milliseconds.
     */
    public static function randomS(time: Signal<Int>): Stream<Float> {
        return timerS(time).map(function(e) { return Math.random(); });
    }
    
    /**
     * Creates a stream of random number events, separated by the specified 
     * number of milliseconds.
     */
    public static function random(time: Int): Stream<Float> {
        return randomS(Signals.constant(time));
    }
}
