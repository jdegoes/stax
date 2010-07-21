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

class SignalBool {
    private function new() { }
    
    /**
     * Returns a Signal with the Bool of each value mapped to the
     * opposite of the original original Signal.
     */
    public static function not(signal: Signal<Bool>): Signal<Bool> {
        return StreamBool.not(signal.changes()).startsWith(!signal.valueNow());
    }
    
    /**
     * Switches off of a Signal of Bools, returning
     * either a thenE Signal<T> when true or an elseE 
     * when falseSignal<T>.
     * 
     *
     * @param contition     A Signal of Bools that will 
     *                      be used to determine which 
     *                      Signal to return.
     *
     * @param thenE         The Signal that will be returned 
     *                      if stream == true;
     *
     * @param elseE         The Signal that will be returned 
      *                      if stream == false;
     *
     * @return              If a Signal from condition == true
     *                      Signal thenE, else Signal elseE
     */
    public static function ifTrue<T>(condition: Signal<Bool>, thenS: Signal<T>, elseS: Signal<T>): Signal<T> {
        return condition.map(
            function(b) {
                return if (b) thenS.valueNow(); else elseS.valueNow();
            }
        );
    }
    
    /**
     * Returns a Signal, true or false depending on whether 
     * or not all of the Signals supplied in the Iterable at a
     * given point of time are true.
     *
     * @param streams       An Iterable of the Signals to 
     *                      be evaluated.
     *
     * @return              If all the Signals in Iterable at
     *                      a given time are true, true, else
     *                      false.
     */
    public static function and(signals: Iterable<Signal<Bool>>): Signal<Bool> {
        return Signals.zipN(signals).map(function(i) { return i.and(); });
    }
    
    /**
     * Returns a Signal, true or false depending on whether 
     * or not any of the Signals supplied in the Iterable at a
     * given point of time are true.
     *
     * @param streams       An Iterable of the Signals to 
     *                      be evaluated.
     *
     * @return              If any the Signals in Iterable at
     *                      a given time are true, true, else
     *                      false.
     */
    public static function or(signals: Iterable<Signal<Bool>>): Signal<Bool> {
        return Signals.zipN(signals).map(function(i) { return i.or(); });
    }
}


