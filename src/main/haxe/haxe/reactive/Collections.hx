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

class Collections {
    private function new() { }

    /**
     * Converts a collection to a stream, whose events are separated by the 
     * specified amount of time.
     *
     * @param collection    The collection.
     * @param time          The time, in milliseconds.
     *
     */
    public static function toStream<T>(collection: Iterable<T>, time: Int): EventStream<T> {
        return toStreamB(collection, Behaviors.constant(time));
    }
    
    /**
     * Converts a collection to a stream, whose events are separated by the 
     * specified amount of time.
     *
     * @param collection    The collection.
     * @param time          The time, as a behavior, in milliseconds.
     *
     */
    public static function toStreamB<T>(collection: Iterable<T>, time: Behavior<Int>): EventStream<T> {
        var startTime: Float = -1.0;
        var accum = 0;
        
        var iterator = collection.iterator();
        
        if (!iterator.hasNext()) return Streams.zero();
        
        var stream: EventStream<T> = Streams.identity();
        
        var pulser: Void -> Void = null;
        var timer = null;

        var createTimer = function() {
            var nowTime = External.now();
            
            if (startTime < 0.0) startTime = nowTime;
            
            var delta = time.valueNow();
            
            var endTime = startTime + accum + delta; 
            
            var timeToWait = endTime - nowTime;
            
            accum += delta;
            
            return if (timeToWait < 0) {
                pulser();
                
                null;
            }
            else {
                var t = External.setTimeout(pulser, Std.int(timeToWait));
            
                t;
            }
        }
        
        pulser = function() {
            var next = iterator.next();
            
            stream.sendEvent(next);

            if (timer != null) External.cancelTimeout(timer);

            if (iterator.hasNext()) {
                timer = createTimer();
            }
        }

        timer = createTimer();
        
        return stream;
    }
}