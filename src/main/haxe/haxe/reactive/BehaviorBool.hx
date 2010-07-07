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

class BehaviorBool {
    private function new() { }
    
    /**
     * Returns a Behavior with the Bool of each value mapped to the
     * opposite of the original original Behavior.
     */
    public static function not(behavior: Behavior<Bool>): Behavior<Bool> {
        return StreamBool.not(behavior.changes()).startsWith(!behavior.valueNow());
    }
    
    /**
     * Switches off of a Behavior of Bools, returning
     * either a thenE Behavior<T> when true or an elseE 
     * when falseBehavior<T>.
     * 
     *
     * @param contition     A Behavior of Bools that will 
     *                      be used to determine which 
     *                      Behavior to return.
     *
     * @param thenE         The Behavior that will be returned 
     *                      if stream == true;
     *
     * @param elseE         The Behavior that will be returned 
      *                      if stream == false;
     *
     * @return              If a Behavior from condition == true
     *                      Behavior thenE, else Behavior elseE
     */
    public static function ifTrue<T>(condition: Behavior<Bool>, thenB: Behavior<T>, elseB: Behavior<T>): Behavior<T> {
        return condition.map(
            function(b) {
                return if (b) thenB.valueNow(); else elseB.valueNow();
            }
        );
    }
    
    /**
     * Returns a Behavior, true or false depending on whether 
     * or not all of the Behaviors supplied in the Iterable at a
     * given point of time are true.
     *
     * @param streams       An Iterable of the Behaviors to 
     *                      be evaluated.
     *
     * @return              If all the Behaviors in Iterable at
     *                      a given time are true, true, else
     *                      false.
     */
    public static function and(behaviors: Iterable<Behavior<Bool>>): Behavior<Bool> {
        return Behaviors.zipN(behaviors).map(function(i) { return i.and(); });
    }
    
    /**
     * Returns a Behavior, true or false depending on whether 
     * or not any of the Behaviors supplied in the Iterable at a
     * given point of time are true.
     *
     * @param streams       An Iterable of the Behaviors to 
     *                      be evaluated.
     *
     * @return              If any the Behaviors in Iterable at
     *                      a given time are true, true, else
     *                      false.
     */
    public static function or(behaviors: Iterable<Behavior<Bool>>): Behavior<Bool> {
        return Behaviors.zipN(behaviors).map(function(i) { return i.or(); });
    }
}


