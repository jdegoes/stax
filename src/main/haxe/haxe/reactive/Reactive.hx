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
import stax.Tuples;
import stax.plus.Equal;

import haxe.reactive.Streams;

using Stax;
using stax.Iterables;


typedef Timeout = {}

class External {
    public static var setTimeout: (Void -> Void) -> Int -> Timeout = function(f, time) { return haxe.Timer.delay(f, time); };
    
    public static var cancelTimeout: Timeout -> Void = function(timer) { cast(timer, haxe.Timer).stop(); }
    
    public static var now: Void -> Float = function() { return Date.now().getTime(); }
}

enum Propagation<T> {
    propagate(value: Pulse<T>);
    doNotPropagate;
}

class Pulse<T> {
    public var stamp (default, null): Int;
    public var value (default, null): T;
    
    public function new(stamp: Int, value: T) {
        this.stamp = stamp;
        this.value = value;
        
        var elements: Array<Dynamic> = [];
        
        elements.push(stamp); elements.push(value);
    }
    
    public function map<S>(f: T -> S): Pulse<S> {
        return withValue(f(value));
    }
    
    public function withValue<S>(newValue: S): Pulse<S> {
        return new Pulse<S>(stamp, newValue);
    }
}    

class Stamp {
    private static var _stamp: Int = 1;
    
    public static function lastStamp(): Int {
        return _stamp;
    }
    
    public static function nextStamp(): Int {
        return ++_stamp;
    }
}

class Rank {
    private static var _rank: Int = 0;
    
    public static function lastRank(): Int {
        return _rank;
    }
    
    public static function nextRank(): Int {
        return ++_rank;
    }
}

typedef KeyValue<T> = { k: Int, v: T };

private class PriorityQueue<T> {
    var val: Array<KeyValue<T>>;
    
    public function new() {
        this.val = [];
    }
    
    public function length(): Int {
        return this.val.length;
    }
    
    public function insert(kv: KeyValue<T>) {
        this.val.push(kv);
        
        var kvpos = this.val.length - 1;
        
        while (kvpos > 0 && kv.k < this.val[Math.floor((kvpos-1)/2)].k) {
            var oldpos = kvpos;
            kvpos = Math.floor((kvpos-1)/2);
            
            this.val[oldpos] = this.val[kvpos];
            this.val[kvpos]  = kv;
        }
    }
    
    public function isEmpty(): Bool { 
        return this.val.length == 0; 
    }
    
    public function pop(): KeyValue<T> {
        if (this.val.length == 1) {
            return this.val.pop();
        }
        
        var ret = this.val.shift();
        
        this.val.unshift(this.val.pop());
        
        var kvpos = 0;
        var kv    = this.val[0];
        
        while (true) { 
            var leftChild  = (kvpos*2+1 < this.val.length ? this.val[kvpos*2+1].k : kv.k+1);
            var rightChild = (kvpos*2+2 < this.val.length ? this.val[kvpos*2+2].k : kv.k+1);
            
            if (leftChild > kv.k && rightChild > kv.k) {
                break;
            }
            else if (leftChild < rightChild) {
                this.val[kvpos] = this.val[kvpos*2+1];
                this.val[kvpos*2+1] = kv;
                kvpos = kvpos*2+1;
            }
            else {
                this.val[kvpos] = this.val[kvpos*2+2];
                this.val[kvpos*2+2] = kv;
                kvpos = kvpos*2+2;
            }
        }
        
        return ret;
    }
}

class Stream<T> {
    private var _rank: Int;
    private var _sendsTo: Array<Stream<Dynamic>>;
    private var _updater: Pulse<Dynamic> -> Propagation<T>;
    
    private var _weak: Bool;
    
    public var weaklyHeld (getWeaklyHeld, setWeaklyHeld): Bool;
    
    private var _cleanups: Array<Void -> Void>;
    
    public function new(updater: Pulse<Dynamic> -> Propagation<T>, sources: Array<Stream<Dynamic>> = null) {
        this._updater  = updater;

        this._sendsTo  = [];
        this._weak     = false;
        this._rank     = Rank.nextRank();
        this._cleanups = [];
        
        if (sources != null) {
            for (source in sources) {
                source.attachListener(this);
            }
        }
    }
    
    public function attachListener(dependent: Stream<Dynamic>): Void {
        this._sendsTo.push(dependent);

        // Rewrite the propagation graph:
        if (this._rank > dependent._rank) {
            var lowest = Rank.lastRank() + 1;
            var q: Array<Stream<Dynamic>> = [dependent];

            while (q.length > 0) {
                var cur = q.splice(0,1)[0];
                
                cur._rank = Rank.nextRank();
                
                q = q.concat(cur._sendsTo);
            }
        }
    }
    
    public function removeListener(dependent: Stream<Dynamic>, isWeakReference: Bool = false): Bool {
        var foundSending = false;
        
        for (i in 0..._sendsTo.length) {
            if (_sendsTo[i] == dependent) {
                _sendsTo.splice(i, 1);
                
                foundSending = true;
                
                break;
            }
        }

        if (isWeakReference && _sendsTo.length == 0) {
            weaklyHeld = true;
        }

        return foundSending;
    }
    
    /**
     * Invokes the specified function when this stream is "finished", defined 
     * as being unable to produce any more events.
     */
    public function whenFinishedDo(f: Void -> Void): Void {
        if (weaklyHeld) {
            f();
        }
        else {
            _cleanups.push(f);
        }
    }
    
    /**
     * Calls the specified function for each event.
     */
    public function forEach(f: T -> Void): Stream<T> {
        Streams.create(
            function(pulse: Pulse<T>): Propagation<T> {
                f(pulse.value);
                
                return doNotPropagate;
            },
            [this]
        );
        
        return this;
    }
    
    /**
     * Calls the specified function for each event.
     */
    public function each(f: T -> Void): Stream<T> {
        return forEach(f);
    }
    
    /**
     * Converts the stream to an array. Note: This array will grow 
     * continuously without bound unless clients remove elements from it.
     */
    public function toArray(): Array<T> {
        var array: Array<T> = [];
        
        each(function(e) { array.push(e); });
        
        return array;
    }

    /**
     * Maps this stream to a stream of constant values.
     *
     * @param value The constant that every value will be mapped to.
     *
     */
    public function constant<Z>(value: Z): Stream<Z> {
        return map(function(v) { return value; });
    }
    
    /**
     * AKA flatMap. Binds each value to another stream, and returns a 
     * flattened stream.
     *
     * @param k The bind function.
     */
    public function bind<Z>(k: T -> Stream<Z>): Stream<Z> {
        var m: Stream<T> = this;
        var prevE: Stream<Z> = null;

        var outE: Stream<Z> = Streams.identity();

        var inE: Stream<Dynamic> = Streams.create(
            function (pulse: Pulse<Dynamic>): Propagation<Dynamic> {
                if (prevE != null) {
                    prevE.removeListener(outE, true); // XXX This is sloppy
                }
                
                prevE = k(pulse.value);
                
                prevE.attachListener(outE);

                return doNotPropagate;
            },
            [m]
        );

        return outE;
    }
    
    /**
     * Sends an event now. This function should not be used except to create
     * "pure" streams.
     *
     * @param value The value to send.
     */
    public function sendEvent(value: Dynamic): Stream<T> {
        propagatePulse(new Pulse(Stamp.nextStamp(), value));
        return this;
    }

    /**
     * A typed version of sendEvent.
	 * Sends an event now. This function should not be used except to create
     * "pure" streams.
     *
     * @param value The value to send.
     */
    public function sendEventTyped(value: T): Stream<T> {
        propagatePulse(new Pulse(Stamp.nextStamp(), value));
        return this;
    }
    
    /**
     * Sends an event later. This function should not be used except to create
     * "pure" streams.
     *
     * @param value     The value to send.
     *
     * @param millis    The number of milliseconds to send it in. If this is 0, 
     *                  the event will be scheduled for "as soon as possible".
     *
     */
    public function sendLaterIn(value: Dynamic, millis: Int): Stream<T> {
        var self = this;
        
        External.setTimeout(
            function() {
                self.sendEvent(value);
            },
            millis
        );
        
        return this;
    }
    
    /**
     * Sends an event later, "as soon as possible".
     *
     * @param value The value to send.
     */
    public function sendLater(value: Dynamic): Stream<T> {
        return sendLaterIn(value, 0);
    }
    
    /**
     * Creates a signal backed by this event stream, which starts with the 
     * specified value.
     *
     * @param init  The initial value.
     */
    public function startsWith(init: T): Signal<T> {
        return new Signal<T>(
            this,
            init,
            function(pulse: Pulse<Dynamic>): Propagation<T> {
                return propagate(pulse);
            }
        );
    }
    
    /**
     * Delays this stream by the specified number of milliseconds.
     *
     * @param   time    Time in milliseconds as an Int
     */
    public function delay(time: Int): Stream<T> {
        var resE: Stream<T> = Streams.identity();

        Streams.create(
            function(pulse: Pulse<T>): Propagation<T> { 
                resE.sendLaterIn(pulse.value, time);
                
                return doNotPropagate;
            },
            [this]
        );

        return resE;
    }
    
    /**
     * Delays this stream by the specified number of milliseconds.
     * 
     * @param   time    Time in milliseconds as a Signal
     */
    public function delayS(time: Signal<Int>): Stream<T> {
        var self = this;

        var receiverEE: Stream<Stream<T>> = Streams.identity();
        
        var link = {
            from:    self, 
            towards: self.delay(time.valueNow())
        };

        // XXX: event is not guaranteed to output
        var switcherE = Streams.create(
            function (pulse: Pulse<Int>): Propagation<Int> {
                link.from.removeListener(link.towards); 
                
                link = {
                    from:    self, 
                    towards: self.delay(pulse.value)
                };
                
                receiverEE.sendEvent(link.towards);
                
                return doNotPropagate;
            },
            [time.changes()]
        );

        var resE = StreamStream.flatten(receiverEE);

        switcherE.sendEvent(time.valueNow());
        
        return resE;
    }
    
    /**
     * Calms the stream. No event will be fired unless it occurs T milliseconds
     * after the prior event.
     *
     * @param time  The number of milliseconds.
     */
    public function calm(time: Int): Stream<T> {
        return calmS(Signals.constant(time));
    }
    
    /**
     * Calms the stream. No event will be get through unless it occurs T 
     * milliseconds or more before the following event.
     *
     * @param time  The number of milliseconds.
     */
    public function calmS(time: Signal<Int>): Stream<T> {
        var out: Stream<T> = Streams.identity();
      
        var towards: Timeout = null;
      
        Streams.create(
            function (pulse: Pulse<T>): Propagation<T> {
                if (towards != null) {
                    External.cancelTimeout(towards);
                }
                
                towards = External.setTimeout(
                    function() {
                        towards = null;
                        
                        out.sendEvent(pulse.value);
                    },
                    time.valueNow()
                );
                
                return doNotPropagate;
            },
            [this]
        );
        
        return out;
    }
    
    /**
     * Blinds the event stream to events occurring less than the specified 
     * milliseconds together.
     *
     * @param time The time to blind the stream to.
     */
    public function blind(time: Int): Stream<T> {
        return blindS(Signals.constant(time));
    }
    
    /**
     * Blinds the event stream to events occurring the specified 
     * number of milliseconds together or less.
     *
     * @param time The time to blind the stream to.
     */
    public function blindS(time: Signal<Int>): Stream<T> {
        var lastSent = External.now() - time.valueNow() - 1;
        
        return Streams.create(            
            function (p: Pulse<T>): Propagation<T> {
                var curTime = External.now();
                
                if (curTime - lastSent > time.valueNow()) { // XXX What happens if signal time decreases, then we "owe" a prior event???
                    lastSent = curTime;
                    
                    return propagate(p);
                }
                else { 
                    return doNotPropagate;
                }
            },
            [this]
        );
    }
    
    /**
     * Maps this stream into a stream of values determined by "snapshotting" 
     * the value of the signal.
     *
     * @param value The value.
     */
    public function snapshot<Z>(value: Signal<Z>): Stream<Z> {
        return map(function(t) { return value.valueNow(); });
    }
    
    /**
     * Filters adjacent repeats.
     *
     * @param optStart  An optional start value.
     */
    public function filterRepeats(?optStart: T): Stream<T> {                     
        return filterRepeatsBy(optStart, function(v1, v2) return Equal.getEqualFor(v1)(v1, v2));
    }
    
    /**
     * Filters adjacent repeats.
     *
     * @param optStart  An optional start value.
     * @param eq        An equality function.
     */
    public function filterRepeatsBy(?optStart: T, eq: T -> T -> Bool): Stream<T> {
        var hadFirst = optStart == null ? false : true;
        var prev     = optStart;
        
        return filter(
            function(v) {
                return if (!hadFirst || !eq(prev,v)) {
                    hadFirst = true;
                    prev     = v;
                    
                    true;
                }
                else false;
            }
        );
    }
    
    /**
     * Maps this stream to another stream by using the specified function.
     *
     * @param mapper    The mapping function.
     */
    public function map<Z>(mapper: T -> Z): Stream<Z> { 
        return Streams.create(
            function(pulse: Pulse<T>): Propagation<Z> {
                return propagate(pulse.map(mapper));
            },
            [this]
        );
    }
    
    /**
     * Flattens the result of mapping each value to another stream.
     *
     * @param mapper The mapper.
     */
    public function flatMap<Z>(mapper: T -> Stream<Z>): Stream<Z> { 
        return bind(mapper);
    }
    
    /**
     * A stream of values resulting from left folding.
     *
     * @param initial   The initial value.
     * @param folder    The folding function.
     */
    public function scanl<Z>(initial: Z, folder: Z -> T -> Z): Stream<Z> {
        var acc = initial;
        
        return this.map(
            function (n: T): Z {
                var next = folder(acc, n);
                
                acc = next;
                
                return next;
            }
        );
    }

    /**
     * Same as scanl, but without an initial value.
     */
    public function scanlP(folder: T -> T -> T): Stream<T> { 
        var acc = null;
        
        return this.map(
            function (n: T): T {
                var next: T;
                
                if (acc != null) {
                    next = folder(acc, n);
                }
                else {
                    next = n;
                }
                
                acc = next;
                
                return next;
            }
        );
    }
    
    /**
     * Returns a finite stream consisting of the first n elements of this 
     * stream.
     *
     * @param n The number of values.
     */
    public function take(n: Int): Stream<T> {
        var count = n;
        
        var self = this;
        
        return Streams.create(
            function(pulse: Pulse<Dynamic>): Propagation<T> {
                return if (count > 0) { 
                    --count; propagate(pulse); 
                }
                else {
                    self.weaklyHeld = true;
                    
                    doNotPropagate;
                }
            },
            [this]
        );
    }
    
    /**
     * Returns a finite stream consisting of the first subset of this stream
     * for which the filter returns true.
     *
     * @param n The number of values.
     */
    public function takeWhile(filter: T -> Bool): Stream<T> {
        var stillChecking = true;
        
        var self = this;
        
        return Streams.create(
            function(pulse: Pulse<Dynamic>): Propagation<T> {
                return if (stillChecking) {
                    if (filter(pulse.value)) {
                        propagate(pulse);
                    }
                    else {
                        stillChecking = false;
                        
                        self.weaklyHeld = true;
                        
                        doNotPropagate;
                    }
                }
                else doNotPropagate;
            },
            [this]
        );
    }
    
    /**
     * Shifts events forward in time by the specified number of events.
     * 
     * @param n The number of events to shift by.
     */
    public function shift(n: Int): Stream<T> {
        var queue: Array<T> = [];
        
        return Streams.create(
            function(pulse: Pulse<T>): Propagation<T> {
                queue.push(pulse.value);
                
                return if (queue.length <= n) doNotPropagate;
                       else propagate(pulse.withValue(queue.shift()));
            },
            [this]
        );
    }
    
    /**
     * Shifts events forward in time until the specified predicate returns 
     * false for an event.
     *
     * @param pred  The predicate.
     */
    public function shiftWhile(pred: T -> Bool): Stream<T> {
        var queue: Array<T> = [];
        
        var checking = true;
        
        return Streams.create(
            function(pulse: Pulse<T>): Propagation<T> {
                queue.push(pulse.value);
                
                return if (checking) {
                           if (pred(pulse.value)) doNotPropagate;
                           else {
                               checking = false;
                               
                               propagate(pulse.withValue(queue.shift()));
                           }
                       }
                       else propagate(pulse.withValue(queue.shift()));
            },
            [this]
        );
    }
    
    /**
     * Shifts events forward in time by pulling from the specified iterable
     * until it's exhausted, then streaming the delayed events.
     *
     * @param elements  The elements to use in time shifting.
     */
    public function shiftWith(elements: Iterable<T>): Stream<T> {
        var queue: Array<T> = elements.toArray();
        
        var n = queue.length;
        
        return Streams.create(
            function(pulse: Pulse<T>): Propagation<T> {
                queue.push(pulse.value);
                
                return if (queue.length <= n) doNotPropagate;
                       else propagate(pulse.withValue(queue.shift()));
            },
            [this]
        );
    }
    
    /**
     * Drops the specified number of events from this stream. This method does
     * not change the timestamps of events.
     *
     * @param n The number to drop.
     */
    public function drop(n: Int): Stream<T> {
        var count = n;
        
        return Streams.create(
            function(pulse: Pulse<T>): Propagation<T> {
                return if (count > 0) { --count; doNotPropagate; }
                       else propagate(pulse);
            },
            [this]
        );
    }
    
    /**
     * Drops events for as long as the predicate returns true.
     *
     * @param pred  The predicate.
     */
    public function dropWhile(pred: T -> Bool): Stream<T> {
        var checking = true;
        
        return Streams.create(
            function(pulse: Pulse<T>): Propagation<T> {
                return if (checking) {
                           if (pred(pulse.value)) doNotPropagate;
                           else {
                               checking = false;
                               
                               propagate(pulse);
                           }
                       }
                       else propagate(pulse);
            },
            [this]
        );
    }
    
    /**
     * Partitions the stream into two event streams, one for which the 
     * predicate is true, one for which the predicate is false.
     *
     * @param pred  The predicate.
     */
    public function partition(pred: T -> Bool): Tuple2<Stream<T>, Stream<T>> { 
        var trueStream = Streams.create(
            function(pulse: Pulse<T>): Propagation<T> {
                return if (pred(pulse.value)) propagate(pulse); else doNotPropagate;
            },
            [this]
        );
        
        var falseStream = Streams.create(
            function(pulse: Pulse<T>): Propagation<T> {
                return if (!pred(pulse.value)) propagate(pulse); else doNotPropagate;
            },
            [this]
        );
        
        return Tuple2.create(trueStream, falseStream);
    }

    /**
     * Returns a tuple of takeWhile/dropWhile for the specified predicate.
     *
     * @param pred  The predicate.
     */
    public function partitionWhile(pred: T -> Bool): Tuple2<Stream<T>, Stream<T>> { 
        var trueStream  = takeWhile(pred);
        var falseStream = dropWhile(pred);
        
        return Tuple2.create(trueStream, falseStream);
    }
    
    /**
     * Filters this stream by the specified predicate.
     *
      * @param pred The predicate.
      */
    public function filter(pred: T -> Bool): Stream<T> {
        return Streams.create(
            function(pulse: Pulse<Dynamic>): Propagation<T> {
                return if (pred(pulse.value)) propagate(pulse); else doNotPropagate;
            },
            [this]
        );
    }
    
    /**
     * Accepts all elements until the predicate first returns false.
     *
     * @param pred  The predicate.
     */
    public function filterWhile(pred: T -> Bool): Stream<T> { 
        var checking = true;
        
        var self = this;
        
        return Streams.create(
            function(pulse: Pulse<Dynamic>): Propagation<T> {
                return if (checking) {
                    if (pred(pulse.value)) {
                        propagate(pulse);
                    }
                    else {
                        checking = false;
                        
                        self.weaklyHeld = true;
                        
                        doNotPropagate;
                    }
                }
                else doNotPropagate;
            },
            [this]
        );
    }
    
    /**
     * Zips elements of supplied streams together using a function and returns a
     * Stream of the resulting elements.
     *
     * [1, 2, 3].zipWith([1, 2, 3], Tuple2.create) == [Tuple2[1, 1], Tuple2[2, 2], Tuple2[3, 3]]
     *
     * @param as  The stream with which to zipWith 'this'.
     * @param f  The function that will be used to get the result from the inputs streams ('this' and as).
     *
     * @return     The Stream of the result of the application of the function on using both stream elements as input.
	 * 
     */
    public function zipWith<A, R>(as: Stream<A>, f : T -> A -> R): Stream<R> { 
        var testStamp = -1;
        
        var value1: T = null;

        Streams.create(
            function(pulse: Pulse<T>): Propagation<T> { 
                testStamp = pulse.stamp; 
                
                value1 = pulse.value; 
                
                return doNotPropagate; 
            },
            [this]
        );
         
        return Streams.create(
            function(pulse: Pulse<A>): Propagation<R> { 
                return if (testStamp == pulse.stamp) propagate(pulse.withValue(f(value1, pulse.value))); else doNotPropagate;
            },
            [as]
        );
    }

    /**
     * Zips elements of supplied streams together and returns an
     * Stream of Tuple2 containing the zipped elements.
     *
     * [1, 2, 3].zip[1, 2, 3] == [Tuple2[1, 1], Tuple2[2, 2], Tuple2[3, 3]]
     *
     * @param as  The stream with which to zip 'this'.
     *
     * @return     A Tuple slice containing an element from each 
     *             stream
     */
    public function zip<A>(as: Stream<A>): Stream < Tuple2 < T, A >> {
		return zipWith(as, Tuple2.create);
    }
    
    /**
     * Zips elements of supplied streams together and returns an
     * Stream of Tuple3 containing the zipped elements.
     *
     * [1, 2, 3].zip([1, 2, 3], [1, 2, 3]) == [Tuple3[1, 1, 1], Tuple3[2, 2, 2], Tuple3[3, 3, 3]]
     *
     * @param as  The a stream with which to zip 'this'.
     * @param bs  The b stream with which to zip 'this' and as.
     *
     * @return     A Tuple slice containing an element from each 
     *             stream
     */
    public function zip3<A, B>(as: Stream<A>, bs: Stream<B>): Stream<Tuple3<T, A, B>> { 
        var streams: Array<Dynamic> = [];
        
        streams.push(this);
        streams.push(as);
        streams.push(bs);
        
        return Streams.zipN(streams).map(function(i: Iterable<Dynamic>): Tuple3<T, A, B> { return Tuple3.create(i.at(0), i.at(1), i.at(2)); });
    }
    
    /**
     * Zips elements of supplied streams together and returns an
     * Stream of Tuple4 containing the zipped elements.
     *
     * For example see above
     *
     * @param as  The a stream with which to zip 'this'.
     * @param bs  The b stream with which to zip 'this' and as.
     * @param cs  The c stream with which to zip 'this,' as, and bs.
     *
     * @return     A Tuple slice containing one element from each 
     *             stream
     */
    public function zip4<A, B, C>(as: Stream<A>, bs: Stream<B>, cs: Stream<C>): Stream<Tuple4<T, A, B, C>> { 
        var streams: Array<Dynamic> = [];
        
        streams.push(this);
        streams.push(as);
        streams.push(bs);
        streams.push(cs);
        
        return Streams.zipN(streams).map(function(i: Iterable<Dynamic>): Tuple4<T, A, B, C> { return Tuple4.create(i.at(0), i.at(1), i.at(2), i.at(3)); });
    }
    
    /**
     * Zips elements of supplied streams together and returns an
     * Stream of Tuple5 containing the zipped elements.
     *
     * For example see above
     *
     * @param as  The a stream with which to zip 'this'.
     * @param bs  The b stream with which to zip 'this' and as.
     * @param cs  The c stream with which to zip 'this,' as, and bs.
     * @param ds  The d stream with which to zip 'this,' as, bs, and cs.
     *
     * @return     A Tuple slice containing one element from each 
     *             stream
     */
    public function zip5<A, B, C, D>(as: Stream<A>, bs: Stream<B>, cs: Stream<C>, ds: Stream<D>): Stream<Tuple5<T, A, B, C, D>> { 
        var streams: Array<Dynamic> = [];
        
        streams.push(this);
        streams.push(as);
        streams.push(bs);
        streams.push(cs);
        streams.push(ds);
        
        return Streams.zipN(streams).map(function(i: Iterable<Dynamic>): Tuple5<T, A, B, C, D> { return Tuple5.create(i.at(0), i.at(1), i.at(2), i.at(3), i.at(4)); });
    }
    
    /**
     * Groups Stream elements which are sent
     * sequentially and are == to each other into
     * iterables and returns these in a new stream
     *
     * @return     An Stream of grouped elements
     */
    public function group(): Stream<Iterable<T>> {
        return groupBy(function(e1, e2) { return e1 == e2; });
    }
    
    /**
     * Groups Stream elements which are sent
     * sequentially and which return true from the
     * supplied comparison function into iterables
     * and returns these in a new stream
     *
     * @param   eq      The comparison function that
     *                  will be used fo evaluate the 
     *                  equality of the stream
     *                  elements.
     *
     * @return     An Stream of grouped elements
     */
    public function groupBy(eq: T -> T -> Bool): Stream<Iterable<T>> { 
        var prev = null;
        
        var cur: Array<T> = [];
        
        return Streams.create(
            function(pulse: Pulse<T>): Propagation<Iterable<T>> {
                var ret: Propagation<Iterable<T>> = doNotPropagate;
                
                if (prev != null) {
                    if (!eq(prev, pulse.value)) {
                        var iter: Iterable<T> = cur;
                        
                        ret = propagate(pulse.withValue(iter));
                        
                        cur = [];
                        
                        cur.push(pulse.value);
                        
                        prev = null;
                    }
                    else {
                        cur.push(pulse.value);
                    }
                }
                else {
                    cur.push(pulse.value);
                }
                
                prev = pulse.value;
                
                return ret;
            },
            [this]
        );
    }
    
    /**
     * Merges this stream and the specified stream.
     *
     * @param that  The Stream with which to 
     *              merge 'this' stream
     */
    public function merge(that: Stream<T>): Stream<T> {
        return Streams.create(function(p) { return propagate(p); }, [this, that]);
    }
    /**
     * Creates a new Stream in which only events on 
     * different time steps will appear
     *
     */
    public function uniqueSteps(): Stream<T> {
        var lastStamp = -1;
        
        return Streams.create(
            function(pulse: Pulse<T>): Propagation<T> {
                return if (pulse.stamp != lastStamp) {
                           lastStamp = pulse.stamp;
                           
                           propagate(pulse);
                       }
                       else doNotPropagate;
            },
            [this]
        );
    }
    
    /**
     * Creates a new Stream in which only new events
     * will appear (including those on the same time step)
     *
     * @param eq  The Function used to check event equality
     */
    public function uniqueEvents(?eq: T -> T -> Bool): Stream<T> {
        if (eq == null) eq = function(e1, e2) { return e1 == e2; }
        
        var lastEvent: T = null;
        
        return Streams.create(
            function(pulse: Pulse<T>): Propagation<T> {
                return if (lastEvent==null || !eq(pulse.value, lastEvent)) {
                           lastEvent = pulse.value;
                           
                           propagate(pulse);
                       }
                       else doNotPropagate;
            },
            [this]
        );
    }
    /**
     * Creates a new Stream in which only unique events
     * taking place at unique timesteps will appear
     *
     * @param eq  The Function used to check event equality
     */
    public function unique(?eq: T -> T -> Bool): Stream<T> {
        return uniqueSteps().uniqueEvents(eq);
    }
    
    private function propagatePulse(pulse: Pulse<Dynamic>) {
        // XXX Change so that we won't propagate more than one value per time step???
        var queue = new PriorityQueue<{stream: Stream<Dynamic>, pulse: Pulse<Dynamic>}>();
        
        var self = cast(this, Stream<Dynamic>);

        queue.insert({k: _rank, v: {stream: self, pulse: pulse}});
        
        while (queue.length() > 0) {
            var qv = queue.pop();
            
            var stream = qv.v.stream;
            var pulse  = qv.v.pulse;
            
            var propagation: Propagation<Dynamic> = stream._updater(pulse);
            
            switch (propagation) {
                case propagate(nextPulse): {
                    var weaklyHeld = true;
                    
                    for (recipient in stream._sendsTo) {
                        weaklyHeld = weaklyHeld && recipient.weaklyHeld;
                    
                        queue.insert(
                            {
                                k: recipient._rank,
                                v: {
                                    stream: cast(recipient, Stream<Dynamic>),
                                    pulse:  nextPulse
                                }
                            }
                        );
                    }
                
                    if (stream._sendsTo.length > 0 && weaklyHeld) {
                        stream.weaklyHeld = true;
                    }
                }
                    
                case doNotPropagate:
            }
        }
    }
    
    private function setWeaklyHeld(held: Bool): Bool {
        if (_weak != held) {
            _weak = held;
        
            if (!held) {
                for (cleanup in _cleanups) cleanup();
            
                _cleanups = [];
            }
        }
        
        return _weak;
    }
    
    private function getWeaklyHeld(): Bool {
        return _weak;
    }
}

class Signal<T> {
    private var _underlyingRaw: Stream<Dynamic>;
    private var _underlying:    Stream<T>;
    private var _updater:       Pulse<Dynamic> -> Propagation<T>;
    
    private var _last: T;
    
    public function new(stream: Stream<Dynamic>, init: T, updater: Pulse<Dynamic> -> Propagation<T>) {
        this._last          = init;        
        this._underlyingRaw = stream;
        this._updater       = updater;
        
        var self = this;
        
        this._underlying = Streams.create(
            function(pulse: Pulse<Dynamic>): Propagation<T> {
                return switch (updater(pulse)) {
                    case propagate(newPulse):
                        self._last = newPulse.value;
                        
                        propagate(newPulse);
                    case doNotPropagate:
                        doNotPropagate;
                }
            },
            // [stream]???
            [stream.uniqueSteps()]
        );
    }
    
    /**
     * Applies a function to a value and returns the 
     * result as a Signal.
     *
     * @param   f   The function to apply.
     *
     * @result      A Signal that is the result
     *              of the supplied function. 
     */
    public function map<Z>(f: T -> Z): Signal<Z> {
        return lift(f);
    }
    
    /**
     * Applies a function to a value and returns the 
     * result as a Signal.
     *
     * @param   f   A Signal that accepts a T and 
     *              returns a Z.
     *
     * @result      A Signal that is the result
     *              of the supplied function. 
     */
    public function mapS<Z>(f: Signal<T -> Z>): Signal<Z> {
        return liftS(f);
    }
    
    /**
     * Applies a function to a value and returns the 
     * result as a Signal.
     *
     * @param   f   The function to apply.
     *
     * @result      A Signal that is the result
     *              of the supplied function. 
     */
    public function lift<Z>(f: T -> Z): Signal<Z> {
        return changes().map(f).startsWith(f(valueNow()));
    }
    
    /**
     * Applies a function to a value and returns the 
     * result as a Signal.
     *
     * @param   f   A Signal that accepts a T and 
     *              returns a Z.
     *
     * @result      A Signal that is the result
     *              of the supplied function. 
     */
    public function liftS<Z>(f: Signal<T -> Z>): Signal<Z> {
        // uniqueSteps()???
        return changes().map(
            function(a) {
                return f.valueNow()(a);
            }
        ).startsWith(f.valueNow()(valueNow()));
    }
    
    /**
     * Zips elements of supplied streams together using a function and returns a
     * Signal of the resulting elements.
     *
     * [1, 2, 3].zipWith([1, 2, 3], Tuple2.create) == [Tuple2[1, 1], Tuple2[2, 2], Tuple2[3, 3]]
     *
     * @param as  The signal with which to zipWith 'this'.
     * @param f  The function that will be used to get the result from the inputs signals ('this' and as).
     *
     * @return     The Signal of the result of the application of the function on using both stream elements as input.
	 * 
     */
    public function zipWith<A, R>(b2: Signal<A>, f : T -> A -> R): Signal<R> { 
        var self = this;
        
        var applyF = function() {
            return f(self.valueNow(), b2.valueNow());
        }
        
        return Streams.create(
            function(pulse: Pulse<Dynamic>): Propagation<R> {
                return propagate(pulse.withValue(applyF()));
            },
            [this, b2].map(function(b) { return cast(b.changes(), Stream<Dynamic>); })
        ).startsWith(applyF());
	}
	
    /**
     * Zips elements of supplied Signals together and returns a
     * Signal of Tuple2 containing the zipped elements.
     *
     * [1, 2, 3].zip[1, 2, 3] == [Tuple2[1, 1], Tuple2[2, 2], Tuple2[3, 3]]
     *
     * @param b2  The Signal with which to zip 'this' Signal.
     *
     * @return     A Signal Tuple slice containing an element from each 
     *             supplied Signal
     */
    public function zip<B>(b2: Signal<B>): Signal < Tuple2 < T, B >> {
		return zipWith(b2, Tuple2.create);
    }
    
    /**
     * Zips elements of supplied Signals together and returns a
     * Signal of Tuple3 containing the zipped elements.
     *
     * @param b2  A Signal to be zipped.
     * @param b3  A Signal to be zipped.
     *
     * @return     A Signal Tuple slice containing an element from each 
     *             Signal
     */
    public function zip3<B, C>(b2: Signal<B>, b3: Signal<C>): Signal<Tuple3<T, B, C>> {
        var self = this;
        
        var createTuple = function() {
            return Tuple3.create(self.valueNow(), b2.valueNow(), b3.valueNow());
        }
        
        return Streams.create(
            function(pulse: Pulse<Dynamic>): Propagation<Tuple3<T, B, C>> {
                return propagate(pulse.withValue(createTuple()));
            },
            [this, b2, b3].map(function(b) { return cast(b.changes(), Stream<Dynamic>); })
        ).startsWith(createTuple());
    }
    
    /**
     * Zips elements of supplied Signals together and returns a
     * Signal of Tuple4 containing the zipped elements.
     *
     * @param b2  A Signal to be zipped.
      * @param b3  A Signal to be zipped.
      * @param b4  A Signal to be zipped.
      *
      * @return     A Signal Tuple slice containing an element from each 
      *             Signal
       */
    public function zip4<B, C, D>(b2: Signal<B>, b3: Signal<C>, b4: Signal<D>): Signal<Tuple4<T, B, C, D>> {
        var self = this;
        
        var createTuple = function() {
            return Tuple4.create(self.valueNow(), b2.valueNow(), b3.valueNow(), b4.valueNow());
        }
        
        return Streams.create(
            function(pulse: Pulse<Dynamic>): Propagation<Tuple4<T, B, C, D>> {
                return propagate(pulse.withValue(createTuple()));
            },
            [this, b2, b3, b4].map(function(b) { return cast(b.changes(), Stream<Dynamic>); })
        ).startsWith(createTuple());
    }
    
   /**
      * Zips elements of supplied Signals together and returns a
      * Signal of Tuple5 containing the zipped elements.
      *
      * @param b2  A Signal to be zipped.
      * @param b3  A Signal to be zipped.
      * @param b4  A Signal to be zipped.
      * @param b5  A Signal to be zipped.
      *
      * @return     A Signal Tuple slice containing an element from each 
      *             Signal
      */
    public function zip5<B, C, D, E>(b2: Signal<B>, b3: Signal<C>, b4: Signal<D>, b5: Signal<E>): Signal<Tuple5<T, B, C, D, E>> {
        var self = this;
        
        var createTuple = function() {
            return Tuple5.create(self.valueNow(), b2.valueNow(), b3.valueNow(), b4.valueNow(), b5.valueNow());
        }
        
        return Streams.create(
            function(pulse: Pulse<Dynamic>): Propagation<Tuple5<T, B, C, D, E>> {
                return propagate(pulse.withValue(createTuple()));
            },
            [this, b2, b3, b4, b5].map(function(b) { return cast(b.changes(), Stream<Dynamic>); })
        ).startsWith(createTuple());
    }
    
    /**
     * Zips together the specified Signals.
     *
     *@param    signals   An Iterable of the 
     *                      Signals to be zipped.
     */
    public function zipN(signals: Iterable<Signal<T>>): Signal<Iterable<T>> {
        var signals = signals.cons(this);
        
        return Signals.zipN(signals);
    }
    
    /**
     * Calms the stream. No event will be get through unless it occurs T 
     * milliseconds or more before the following event.
     *
     * @param time  The number of milliseconds.
     */
    public function calm(time: Int): Signal<T> {
        return mapC(function(s) { return s.calm(time); });
    }
    
    /**
     * Calms the stream. No event will be get through unless it occurs T 
     * milliseconds or more before the following event.
     *
     * @param time  The number of milliseconds as a Signal.
     */
    public function calmS(time: Signal<Int>): Signal<T> {
        return mapC(function(s) { return s.calmS(time); });
    }
    
    /**
     * Blinds the event stream to events occurring the specified 
     * number of milliseconds together or less.
     *
     * @param time The time to blind the stream to.
     */
    public function blind(time: Int): Signal<T> {
        return mapC(function(s) { return s.blind(time); });
    }
    
    /**
     * Blinds the event stream to events occurring the specified 
     * number of milliseconds together or less.
     *
     * @param time The time to blind the stream to.
     */
    public function blindS(time: Signal<Int>): Signal<T> {
        return mapC(function(s) { return s.blindS(time); });
    }
    
    /**
     * Delays this stream by the specified number of milliseconds.
     * 
     * @param   time    Time in milliseconds as an Int
     */
    public function delay(time: Int): Signal<T> {
        return mapC(function(s) { return s.delay(time); });
    }
    
    /**
     * Delays this stream by the specified number of milliseconds.
     * 
     * @param   time    Time in milliseconds as a Signal
     */
    public function delayS(time: Signal<Int>): Signal<T> {
        return mapC(function(s) { return s.delayS(time); });
    }
    
    /**
     * Returns the present value of 'this' Signal. 
     *
     */
    public function valueNow(): T {
        return _last;
    }
    
    /**
     * Applies a function to a signal's value that 
     * accepts an Stream value and returns the 
     * result as an Stream value.
     *
     * @param   f   The function to apply.
     *
     * @result      A Signal that is the result
     *              of the supplied function. 
     */
    public function mapC(f: Stream<T> -> Stream<T>): Signal<T> {
        return f(changes()).startsWith(valueNow());
    }
    
    /**
     * Returns the Stream underlying the Signal.
     *
     * @result      The underlying Stream.
     */
    inline public function changes(): Stream<T> {
        return _underlying;
    }
    
    /**
     * Calls the specified function for each event.
     */
    public function whenChanges(f: T -> Void): Void {
      changes().forEach(f);
    }

    /**
     * Calls the specified function for each event.
     */
    public function nowAndWhenChanges(f: T -> Void): Void {
      changes().forEach(f);
      f(valueNow());
    }
    
    /**
     * Sends an event to the underlying Stream that will be immediately 
     * propagated with a new timestamp.
     *
     * @param   value   the value to send Into the Stream.
     */
    public function sendSignal(value: Dynamic): Void {
        changes().sendEvent(value);
    }

    /**
     * Sends an event to the underlying Stream that will be immediately 
     * propagated with a new timestamp.
     *
     * @param   value   the value to send Into the Stream.
     */
    public function sendSignalTyped(value: T): Void {
        changes().sendEventTyped(value);
    }
}

