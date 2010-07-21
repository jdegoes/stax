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

class SignalSignal {
    private function new() { }
    
    /**
     * Converts an Signal of Signals into
     * a single Signal, whose values represent 
     * those of the last Signal to have an Event.
     *
     * @param   streams     The Signal of 
     *                      Signals to be
     *                      flattened.
     */
    public static function switchS<T>(signal: Signal<Signal<T>>): Signal<T> {
        return flatten(signal);
    }
    
    /**
     * Converts an Signal of Signals into
     * a single Signal, whose values represent 
     * those of the last Signal to have an Event.
     *
     * @param   streams     The Signal of 
     *                      Signals to be
     *                      flattened.
     */
    public static function join<T>(signal: Signal<Signal<T>>): Signal<T> {
        return flatten(signal);
    }
    
    /**
     * Converts an Signal of Signals into
     * a single Signal, whose values represent 
     * those of the last Signal to have an Event.
     *
     * @param   streams     The Signal of 
     *                      Signals to be
     *                      flattened.
     */
    public static function flatten<T>(signal: Signal<Signal<T>>): Signal<T> {
        var init: Signal<T> = signal.valueNow();

        var prevSourceE: Stream<T> = null;

        var receiverE: Stream<T> = Streams.identity();

        //XXX could result in out-of-order propagation! Fix!
        var makerE = Streams.create(
            function(p: Pulse<Signal<T>>): Propagation<Void> {
                if (prevSourceE != null) {
                    prevSourceE.removeListener(receiverE);
                }

                prevSourceE = p.value.changes();
                
                prevSourceE.attachListener(receiverE);

                receiverE.sendEvent(p.value.valueNow());
                
                return doNotPropagate;
            },
            [signal.changes()]
        );

        makerE.sendEvent(init);

        return receiverE.startsWith(init.valueNow());
    }
}