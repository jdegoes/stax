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

using haxe.data.collections.IterableExtensions;

class StreamBool {
    private function new() { }
    
    /**
     * Returns a stream with the Bool of each value mapped to the
     * opposite of the original stream.
     */
    public static function not(stream: EventStream<Bool>): EventStream<Bool> {
        return stream.map(function(v) { return !v; });
    }
    
    /**
     * Switches off of an EventStream of Bools, returning
     * either a thenE EventStream<T> when true or an elseE 
     * when falseEventStream<T>.
     * 
     *
     * @param stream        An EventStream of Bools that will 
     *                      be used to determine which 
     *                      EventStream to return.
     *
     * @param thenE         The EventStream that will be returned 
     *                      if stream == true;
     *
     * @param elseE         The EventStream that will be returned 
      *                      if stream == false;
     *
     * @return              If an event from stream == true
     *                      stream thenE, else stream elseE
     */
    public static function ifTrue<T>(stream: EventStream<Bool>, thenE: EventStream<T>, elseE: EventStream<T>) {
        var testStamp = -1;
        var testValue = false;

        Streams.create(
            function(pulse: Pulse<Dynamic>): Propagation<Bool> { 
                testStamp = pulse.stamp; 
                testValue = pulse.value; 
                
                return doNotPropagate; 
            },
            [stream]
        );
         
        return Streams.merge(
            [
                Streams.create(
                    function(pulse: Pulse<T>): Propagation<T> { 
                        return if (testValue && (testStamp == pulse.stamp)) propagate(pulse); else doNotPropagate;
                    },
                    [thenE]
                ),
                Streams.create(
                    function(pulse: Pulse<T>): Propagation<T> { 
                        return if (!testValue && (testStamp == pulse.stamp)) propagate(pulse); else doNotPropagate;
                    },
                    [elseE]
                )
            ]
        );
    }
    
    /**
     * Returns an EventStream, the events of which are either
     * true or false, depending on whether or not the supplied 
     * Iterable<EventStream<Bool>>'s values are all true for a 
     * given time step.
     *
     * @param streams       An Iterable of the EventStreams to 
     *                      be evaluated
     *
     * @return              An EventStream of Bools, where each 
     *                      Bool event represents whether or not 
     *                      all events in the supplied 
     *                      Iterable<EventStream<Bool>> are true 
     *                      on a given time step.
     */
    public static function and(streams: Iterable<EventStream<Bool>>): EventStream<Bool> {
        var rev   = streams.reversed();
        var count = streams.size();
        
        var iterator = rev.iterator();
        
        var acc: EventStream<Bool> = if (iterator.hasNext()) iterator.next(); else Streams.one(true);
        
        while (iterator.hasNext()) {
            var next = iterator.next();
            
            acc = ifTrue(next, acc, next.constant(false));
        }
        
        return acc;
    }
    
    /**
     * Returns an EventStream, the events of which are either
     * true or false, depending on whether or not any of the 
     * values in the supplied Iterable<EventStream<Bool>> 
     * are all true for a given time step.
     *
     * @param streams       An Iterable of the EventStreams to 
     *                      be evaluated
     *
     * @return              An EventStream of Bools, where each 
     *                      Bool event represents whether or not 
     *                      any events in the supplied 
     *                      Iterable<EventStream<Bool>> are true 
     *                      on a given time step.
     */
    public static function or(streams: Iterable<EventStream<Bool>>): EventStream<Bool> {
        var rev   = streams.reversed();
        var count = streams.size();

        var iterator = rev.iterator();

        var acc: EventStream<Bool> = if (iterator.hasNext()) iterator.next(); else Streams.one(false);

        while (iterator.hasNext()) {
            var next = iterator.next();

            acc = ifTrue(next, next, acc);
        }

        return acc;
    }
}