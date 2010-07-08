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

class StreamStream {
    private function new() { }
    
    /**
     * Converts an EventStream of EventStreams into
     * a single EventStream, whose events represent 
     * those of the last EventStream to have an Event.
     *
     * @param   streams     The EventStream of 
     *                      EventStreams to be
     *                      flattened.
     */
    public static function switchE<T>(streams: EventStream<EventStream<T>>): EventStream<T> {
        return flatten(streams);
    }
    
    /**
     * Converts an EventStream of EventStreams into
     * a single EventStream, whose events represent 
     * those of the last EventStream to have an Event.
     *
     * @param   streams     The EventStream of 
     *                      EventStreams to be
     *                      flattened.
     */
    public static function join<T>(stream: EventStream<EventStream<T>>): EventStream<T> {
        return flatten(stream);
    }
    
    /**
     * Converts an EventStream of EventStreams into
     * a single EventStream, whose events represent 
     * those of the last EventStream to have an Event.
     *
     * @param   streams     The EventStream of 
     *                      EventStreams to be
     *                      flattened.
     */
    public static function flatten<T>(stream: EventStream<EventStream<T>>): EventStream<T> {
        return stream.bind(
            function(stream: EventStream<T>): EventStream<T> {
                return stream;
            }
        );
    }
}