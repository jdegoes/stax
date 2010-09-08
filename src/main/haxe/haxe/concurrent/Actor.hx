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
package haxe.concurrent;

enum ActorStatus {
  Running; // The actor is currently running and processing messages
  Stopped; // The actor is not running
  Failed;  // The actor has failed
}

/** An actor.
 */
interface Actor<T, S> {
  /** The status of the actor. */
  public function status(): ActorStatus;
  
  /** Starts the actor, if it is not already running. */
  public function start(): Future<Actor<T, S>>;
  
  /** Stops the actor, if it is not already running. */
  public function stop(): Future<Actor<T, S>>;
  
  /** Returns a number from 0 to 1 indicating load on the actor. */
  public function load(): Float;
  
  /** Sends data to the actor, and returns a future of the response. */
  public function send(data: T): Future<S>;
}

interface ActorFactory<T, S> {
  /** Creates an actor using a function that will be called to handle every 
   * message the actor receives. The function should not enclose any variables
   * and should maintain state exclusively through its parameter and return value.
   *
   * @param handler   The message handler. This function will be passed the 
   *                  current state and the current message, and should return
   *                  the next state and a future of the response.
   *
   * @param coalescer An optional function to coalesce adjacent messages in 
   *                  the actor's queue.
   */
  public function create<X>(handler: X -> T -> Tuple2<X, Future<S>>, ?coalescer: T -> T -> T): Actor<T, S>;
  
  /** Creates a stateless actor (an actor that requires no initial state, and 
   * does not produce any state.
   */
  public function createStateless(loop: T -> Future<S>, ?coalescer: T -> T -> T): Actor<T, S>;
}