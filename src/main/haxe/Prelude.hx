/*
 HaXe library written by John A. De Goes <john@socialmedia.com>
 Contributed by Social Media Networks

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
import Type;

import PreludeExtensions;
using PreludeExtensions;

enum Unit {
  Unit;
}

typedef AnyRef = {}
typedef CodeBlock = Void -> Void
typedef Function<P1, R> = P1 -> R
typedef Function1<P1, R> = P1 -> R
typedef Function2<P1, P2, R> = P1 -> P2 -> R
typedef Function3<P1, P2, P3, R> = P1 -> P2 -> P3 -> R
typedef Function4<P1, P2, P3, P4, R> = P1 -> P2 -> P3 -> P4 -> R
typedef Function5<P1, P2, P3, P4, P5, R> = P1 -> P2 -> P3 -> P4 -> P5 -> R
typedef Function6<P1, P2, P3, P4, P5, P6, R> = P1 -> P2 -> P3 -> P4 -> P5 -> P6 -> R
typedef Function7<P1, P2, P3, P4, P5, P6, P7, R> = P1 -> P2 -> P3 -> P4 -> P5 -> P6 -> P7 -> R
typedef Function8<P1, P2, P3, P4, P5, P6, P7, P8, R> = P1 -> P2 -> P3 -> P4 -> P5 -> P6 -> P7 -> P8 -> R
typedef Function9<P1, P2, P3, P4, P5, P6, P7, P8, P9, R> = P1 -> P2 -> P3 -> P4 -> P5 -> P6 -> P7 -> P8 -> P9 -> R
typedef Function10<P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, R> = P1 -> P2 -> P3 -> P4 -> P5 -> P6 -> P7 -> P8 -> P9 -> P10 -> R

typedef Reducer<T> = T -> T -> T

typedef Factory<T> = Void -> T

typedef Thunk<T> = Void -> T

/** An option represents an optional value -- the value may or may not be
 * present. Option is a much safer alternative to null that often enables
 * reduction in code size and increase in code clarity.
 */
enum Option<T> {
  None;
  Some(v: T);
}

/** Either represents a type that is either a "left" value or a "right" value,
 * but not both. Either is often used to represent success/failure, where the
 * left side represents failure, and the right side represents success.
 */
enum Either<A, B> {
  Left(v: A);
  Right(v: B);
}

typedef FailureOrSuccess<A, B> = Either<A, B>

/**
 * An asynchronous operation that may complete in the future unless
 * successfully canceled.
 * <p>
 * Futures can be combined and chained together to form complicated
 * asynchronous control flows. Often used operations are map() and
 * flatMap().
 * <p>
 */
class Future<T> {
  var _listeners: Array<T -> Void>;
  var _result: T;
  var _isSet: Bool;
  var _isCanceled: Bool;
  var _cancelers: Array<Void -> Bool>;
  var _canceled: Array<Void -> Void>;

  public function new() {
    _listeners  = [];
    _result     = null;
    _isSet      = false;
    _isCanceled = false;
    _cancelers  = [];
    _canceled   = [];
  }

  /** Creates a "dead" future that is canceled and will never be delivered.
   */
  public static function dead<T>(): Future<T> {
    return new Future().withEffect(function(future) {
      future.cancel();
    });
  }

  /** Delivers the value of the future to anyone awaiting it. If the value has
   * already been delivered, this method will throw an exception.
   */
  public function deliver(t: T): Future<T> {
    return if (_isCanceled) this;
    else if (_isSet) Stax.error("Future already delivered");
    else {
      _result = t;
      _isSet  = true;

      for (l in _listeners) l(_result);

      _listeners = [];

      this;
    }
  }

  /** Installs the specified canceler on the future. Under ordinary
   * circumstances, the future will not be canceled unless all cancelers
   * return true. If the future is already done, this method has no effect.
   * <p>
   * This method does not normally need to be called. It's provided primarily
   * for the implementation of future primitives.
   */
  public function allowCancelOnlyIf(f: Void -> Bool): Future<T> {
    if (!isDone()) _cancelers.push(f);

    return this;
  }

  /** Installs a handler that will be called if and only if the future is
   * canceled.
   * <p>
   * This method does not normally need to be called, since there is no
   * difference between a future being canceled and a future taking an
   * arbitrarily long amount of time to evaluate. It's provided primarily
   * for implementation of future primitives to save resources when it's
   * explicitly known the result of a future will not be used.
   */
  public function ifCanceled(f: Void -> Void): Future<T> {
    if (isCanceled()) f();
    else if (!isDone()) _canceled.push(f);

    return this;
  }

  /** Attempts to cancel the future. This may succeed only if the future is
   * not already delivered, and if all cancel conditions are satisfied.
   * <p>
   * If a future is canceled, the result will never be delivered.
   *
   * @return true if the future is canceled, false otherwise.
   */
  public function cancel(): Bool {
    return if (isDone()) false;   // <-- Already done, can't be canceled
    else if (isCanceled()) true;  // <-- Already canceled, nothing to do
    else {                        // <-- Ask to see if everyone's OK with canceling
      var r = true;

      for (canceller in _cancelers) r = r && canceller();

      if (r) {
        // Everyone's OK with canceling, mark state & notify:
        forceCancel();
      }

      r;
    }
  }

  /** Determines if the future is "done" -- that is, delivered or canceled.
   */
  public function isDone(): Bool {
    return isDelivered() || isCanceled();
  }

  /** Determines if the future is delivered.
   */
  public function isDelivered(): Bool {
    return _isSet;
  }

  /** Determines if the future is canceled.
   */
  public function isCanceled(): Bool {
    return _isCanceled;
  }

  /** Delivers the result of the future to the specified handler as soon as it
   * is delivered.
   */
  public function deliverTo(f: T -> Void): Future<T> {
    if (isCanceled()) return this;
    else if (isDelivered()) f(_result);
    else _listeners.push(f);

    return this;
  }

  /** Uses the specified function to transform the result of this future into
   * a different value, returning a future of that value.
   * <p>
   * urlLoader.load("image.png").map(function(data) return new Image(data)).deliverTo(function(image) imageContainer.add(image));
   */
  public function map<S>(f: T -> S): Future<S> {
    var fut: Future<S> = new Future();

    deliverTo(function(t: T) { fut.deliver(f(t)); });
    ifCanceled(function() { fut.forceCancel(); });

    return fut;
  }

  /** Maps the result of this future to another future, and returns a future
   * of the result of that future. Useful when chaining together multiple
   * asynchronous operations that must be completed sequentially.
   * <p>
   * <pre>
   * <code>
   * urlLoader.load("config.xml").flatMap(function(xml){
   *   return urlLoader.load(parse(xml).mediaUrl);
   * }).deliverTo(function(loadedMedia){
   *   container.add(loadedMedia);
   * });
   * </code>
   * </pre>
   */
  public function flatMap<S>(f: T -> Future<S>): Future<S> {
    var fut: Future<S> = new Future();

    deliverTo(function(t: T) {
      f(t).deliverTo(function(s: S) {
        fut.deliver(s);
      }).ifCanceled(function() {
        fut.forceCancel();
      });
    });

    ifCanceled(function() { fut.forceCancel(); });

    return fut;
  }

  /** Returns a new future that will be delivered only if the result of this
   * future is accepted by the specified filter (otherwise, the new future
   * will be canceled).
   */
  public function filter(f: T -> Bool): Future<T> {
    var fut: Future<T> = new Future();

    deliverTo(function(t: T) { if (f(t)) fut.deliver(t); else fut.forceCancel(); });

    ifCanceled(function() fut.forceCancel());

    return fut;
  }

  /** Zips this future and the specified future into another future, whose
   * result is a tuple of the individual results of the futures. Useful when
   * an operation requires the result of two futures, but each future may
   * execute independently of the other.
   */
  public function zip<A>(f2: Future<A>): Future<Tuple2<T, A>> {
    var zipped: Future<Tuple2<T, A>> = new Future();

    var f1 = this;

    var deliverZip = function() {
      if (f1.isDelivered() && f2.isDelivered()) {
        zipped.deliver(
          Tuple2.create(f1.value().get(), f2.value().get())
        );
      }
    }

    f1.deliverTo(function(v) deliverZip());
    f2.deliverTo(function(v) deliverZip());

    zipped.allowCancelOnlyIf(function() return f1.cancel() || f2.cancel());

    f1.ifCanceled(function() zipped.forceCancel());
    f2.ifCanceled(function() zipped.forceCancel());

    return zipped;
  }

  /** Retrieves the value of the future, as an option.
   */
  public function value(): Option<T> {
    return if (_isSet) Some(_result) else None;
  }

  public function toOption(): Option<T> {
    return value();
  }

  public function toArray(): Array<T> {
    return value().toArray();
  }

  private function forceCancel(): Future<T> {
    if (!_isCanceled) {
      _isCanceled = true;

      for (canceled in _canceled) canceled();
    }

    return this;
  }

  public static function create<T>(): Future<T> {
    return new Future<T>();
  }
}

interface Product {
  public var productPrefix (getProductPrefix, null): String;

  public var productArity (getProductArity, null): Int;

  public function productElement(n: Int): Dynamic;
}

private class AbstractProduct implements Product {
  public var productPrefix (getProductPrefix, null): String;

  public var productArity (getProductArity, null): Int;

  private var _productElements: Array<Dynamic>;

  public function new(elements: Array<Dynamic>) {
    _productElements = elements;
  }

  public function productElement(n: Int): Dynamic {
    return _productElements[n];
  }

  public function toString(): String {
    var string = productPrefix + "(";

    for (i in 0...productArity) {
      if (i != 0) string += ", ";

      string += Std.string(productElement(i));
    }

    return string + ")";
  }

  private function getProductPrefix(): String {
    return Stax.error("Not implemented");
  }

  private function getProductArity(): Int {
    return Stax.error("Not implemented");
  }
}

class Tuple2<A, B> extends AbstractProduct {
  public var _1 (default, null): A;
  public var _2 (default, null): B;

  public function new(first: A, second: B) {
    super([first, second]);

    this._1  = first; this._2 = second;
  }

  override private function getProductPrefix(): String {
    return "Tuple2";
  }

  override private function getProductArity(): Int {
    return 2;
  }

  public function entuple<C>(c: C): Tuple3<A, B, C> {
    return Tuple3.create(_1, _2, c);
  }

  public static function create<A, B>(a: A, b: B): Tuple2<A, B> {
    return new Tuple2<A, B>(a, b);
  }

  public function compare(other : Tuple2<A, B>): Int {
  var c = Stax.getOrderFor(_1)(_1, other._1);
  return if (c != 0)
    c;
  else
    Stax.getOrderFor(_2)(_2, other._2);
  }

  public function equals(other : Tuple2<A, B>): Bool {
  return if (!Stax.getEqualFor(_1)(_1, other._1))
    false;
    else
    Stax.getEqualFor(_2)(_2, other._2);
  }

  override public function toString(): String {
  return "Tuple2(" + Stax.getShowFor(_1)(_1) + ", " + Stax.getShowFor(_2)(_2) + ")";
  }

  public function  hashCode() : Int {
  return 786433 * Stax.getHasherFor(_1)(_1) + 24593 * Stax.getHasherFor(_2)(_2);
  }

  public static function OrderF<T1, T2>(order1: OrderFunction<T1>, order2: OrderFunction<T2>): OrderFunction<Tuple2<T1, T2>> {
    return function (v1: Tuple2<T1, T2>, v2: Tuple2<T1, T2>) {
      var c = order1(v1._1, v2._1);
      if (c != 0) return c;

      c = order2(v1._2, v2._2);
      if (c != 0) return c;

      return 0;
    };
  }
  public static function EqualF<T1, T2>(equal1: EqualFunction<T1>, equal2: EqualFunction<T2>): EqualFunction<Tuple2<T1, T2>> {
    return function (v1: Tuple2<T1, T2>, v2: Tuple2<T1, T2>) {
      return equal1(v1._1, v2._1) && equal2(v1._2, v2._2);
    };
  }

  public static function ShowF<T1, T2>(show1: ShowFunction<T1>, show2: ShowFunction<T2>): ShowFunction<Tuple2<T1, T2>> {
    return function (v1: Tuple2<T1, T2>) {
      return "Tuple2(" + show1(v1._1) + ", " + show2(v1._2) + ")";
    };
  }

  public static function HasherF<T1, T2>(hash1: HasherFunction<T1>, hash2: HasherFunction<T2>): HasherFunction<Tuple2<T1, T2>> {
    return function (v: Tuple2<T1, T2>) {
      return 786433 * hash1(v._1) + 24593 * hash2(v._2);
    };
  }
}

class Tuple3<A, B, C> extends AbstractProduct {
  public static function OrderF<T1, T2, T3>(order1: OrderFunction<T1>, order2: OrderFunction<T2>, order3: OrderFunction<T3>): OrderFunction<Tuple3<T1, T2, T3>> {
    return function (v1: Tuple3<T1, T2, T3>, v2: Tuple3<T1, T2, T3>) {
      var c = order1(v1._1, v2._1);
      if (c != 0) return c;

      c = order2(v1._2, v2._2);
      if (c != 0) return c;

      c = order3(v1._3, v2._3);
      if (c != 0) return c;

      return 0;
    };
  }

  public static function EqualF<T1, T2, T3>(equal1: EqualFunction<T1>, equal2: EqualFunction<T2>, equal3: EqualFunction<T3>): EqualFunction<Tuple3<T1, T2, T3>> {
    return function (v1: Tuple3<T1, T2, T3>, v2: Tuple3<T1, T2, T3>) {
      return equal1(v1._1, v2._1) && equal2(v1._2, v2._2) && equal3(v1._3, v2._3);
    };
  }
  public static function ShowF<T1, T2, T3>(show1: ShowFunction<T1>, show2: ShowFunction<T2>, show3: ShowFunction<T3>): ShowFunction<Tuple3<T1, T2, T3>> {
    return function (v1: Tuple3<T1, T2, T3>) {
      return "Tuple3(" + show1(v1._1) + ", " + show2(v1._2) + ", " + show3(v1._3) + ")";
    };
  }
  public static function HasherF<T1, T2, T3>(hash1: HasherFunction<T1>, hash2: HasherFunction<T2>, hash3: HasherFunction<T3>): HasherFunction<Tuple3<T1, T2, T3>> {
    return function (v: Tuple3<T1, T2, T3>) {
      return 196613 * hash1(v._1) + 3079 * hash2(v._2) + 389 * hash3(v._3);
    };
  }

  public var _1 (default, null): A;
  public var _2 (default, null): B;
  public var _3 (default, null): C;

  public function new(first: A, second: B, third: C) {
    super([first, second, third]);

    this._1 = first; this._2 = second; this._3 = third;
  }

  override private function getProductPrefix(): String {
    return "Tuple3";
  }

  override private function getProductArity(): Int {
    return 3;
  }

  public function entuple<D>(d: D): Tuple4<A, B, C, D> {
    return Tuple4.create(_1, _2, _3, d);
  }

  public function compare(other : Tuple3<A, B, C>): Int {
  var c = Stax.getOrderFor(_1)(_1, other._1);
  if (c != 0)
    return c;
  c = Stax.getOrderFor(_2)(_2, other._2);
  if (c != 0)
    return c;
  return Stax.getOrderFor(_3)(_3, other._3);
  }

  public function equals(other : Tuple3<A, B, C>): Bool {
  return if (!Stax.getEqualFor(_1)(_1, other._1))
    false;
    else if (!Stax.getEqualFor(_2)(_2, other._2))
     false
  else
    Stax.getEqualFor(_3)(_3, other._3);
  }

  override public function toString(): String {
  return "Tuple3(" + Stax.getShowFor(_1)(_1) + ", " + Stax.getShowFor(_2)(_2) + ", " + Stax.getShowFor(_3)(_3) + ")";
  }

  public function  hashCode() : Int {
  return 196613 * Stax.getHasherFor(_1)(_1) + 3079 * Stax.getHasherFor(_2)(_2) + 389 * Stax.getHasherFor(_3)(_3);
  }

  public static function create<A, B, C>(a: A, b: B, c: C): Tuple3<A, B, C> {
    return new Tuple3<A, B, C>(a, b, c);
  }
}

class Tuple4<A, B, C, D> extends AbstractProduct {
  public static function OrderF<T1, T2, T3, T4>(order1: OrderFunction<T1>, order2: OrderFunction<T2>, order3: OrderFunction<T3>, order4: OrderFunction<T4>): OrderFunction<Tuple4<T1, T2, T3, T4>> {
    return function (v1: Tuple4<T1, T2, T3, T4>, v2: Tuple4<T1, T2, T3, T4>) {
      var c = order1(v1._1, v2._1);
      if (c != 0) return c;

      c = order2(v1._2, v2._2);
      if (c != 0) return c;

      c = order3(v1._3, v2._3);
      if (c != 0) return c;

      c = order4(v1._4, v2._4);
      if (c != 0) return c;

      return 0;
    };
  }

  public static function EqualF<T1, T2, T3, T4>(equal1: EqualFunction<T1>, equal2: EqualFunction<T2>, equal3: EqualFunction<T3>, equal4: EqualFunction<T4>): EqualFunction<Tuple4<T1, T2, T3, T4>> {
    return function (v1: Tuple4<T1, T2, T3, T4>, v2: Tuple4<T1, T2, T3, T4>) {
      return equal1(v1._1, v2._1) && equal2(v1._2, v2._2) && equal3(v1._3, v2._3) && equal4(v1._4, v2._4);
    };
  }
  public static function ShowF<T1, T2, T3, T4>(show1: ShowFunction<T1>, show2: ShowFunction<T2>, show3: ShowFunction<T3>, show4: ShowFunction<T4>): ShowFunction<Tuple4<T1, T2, T3, T4>> {
    return function (v1: Tuple4<T1, T2, T3, T4>) {
      return "Tuple4(" + show1(v1._1) + ", " + show2(v1._2) + ", " + show3(v1._3) + ", " + show4(v1._4) + ")";
    };
  }
  public static function HasherF<T1, T2, T3, T4>(hash1: HasherFunction<T1>, hash2: HasherFunction<T2>, hash3: HasherFunction<T3>, hash4: HasherFunction<T4>): HasherFunction<Tuple4<T1, T2, T3, T4>> {
    return function (v: Tuple4<T1, T2, T3, T4>) {
      return 1543 * hash1(v._1) + 49157 * hash2(v._2) + 196613 * hash3(v._3) + 97 * hash4(v._4);
    };
  }

  public var _1 (default, null): A;
  public var _2 (default, null): B;
  public var _3 (default, null): C;
  public var _4 (default, null): D;

  public function new(first: A, second: B, third: C, fourth: D) {
    super([first, second, third, fourth]);

    this._1 = first; this._2 = second; this._3 = third; this._4 = fourth;
  }

  override private function getProductPrefix(): String {
    return "Tuple4";
  }

  override private function getProductArity(): Int {
    return 4;
  }

  public function entuple<E>(e: E): Tuple5<A, B, C, D, E> {
    return Tuple5.create(_1, _2, _3, _4, e);
  }

  public function compare(other : Tuple4<A, B, C, D>): Int {
  var c = Stax.getOrderFor(_1)(_1, other._1);
  if (c != 0)
    return c;
  c = Stax.getOrderFor(_2)(_2, other._2);
  if (c != 0)
    return c;
  c = Stax.getOrderFor(_3)(_3, other._3);
  if (c != 0)
    return c;
  return Stax.getOrderFor(_4)(_4, other._4);
  }

  public function equals(other : Tuple4<A, B, C, D>): Bool {
  return if (!Stax.getEqualFor(_1)(_1, other._1))
    false;
    else if (!Stax.getEqualFor(_2)(_2, other._2))
     false
    else if (!Stax.getEqualFor(_3)(_3, other._3))
     false
  else
    Stax.getEqualFor(_4)(_4, other._4);
  }

  override public function toString(): String {
  return "Tuple4(" + Stax.getShowFor(_1)(_1) + ", " + Stax.getShowFor(_2)(_2) + ", " + Stax.getShowFor(_3)(_3) + ", " + Stax.getShowFor(_4)(_4) + ")";
  }

  public function  hashCode() : Int {
  return 1543 * Stax.getHasherFor(_1)(_1) + 49157 * Stax.getHasherFor(_2)(_2) + 196613 * Stax.getHasherFor(_3)(_3) + 97 * Stax.getHasherFor(_4)(_4);
  }

  public static function create<A, B, C, D>(a: A, b: B, c: C, d: D): Tuple4<A, B, C, D> {
    return new Tuple4<A, B, C, D>(a, b, c, d);
  }
}

class Tuple5<A, B, C, D, E> extends AbstractProduct {
  public static function OrderF<T1, T2, T3, T4, T5>(order1: OrderFunction<T1>, order2: OrderFunction<T2>, order3: OrderFunction<T3>, order4: OrderFunction<T4>, order5: OrderFunction<T5>): OrderFunction<Tuple5<T1, T2, T3, T4, T5>> {
    return function (v1: Tuple5<T1, T2, T3, T4, T5>, v2: Tuple5<T1, T2, T3, T4, T5>) {
      var c = order1(v1._1, v2._1);
      if (c != 0) return c;

      c = order2(v1._2, v2._2);
      if (c != 0) return c;

      c = order3(v1._3, v2._3);
      if (c != 0) return c;

      c = order4(v1._4, v2._4);
      if (c != 0) return c;

      c = order5(v1._5, v2._5);
      if (c != 0) return c;

      return 0;
    };
  }

  public static function EqualF<T1, T2, T3, T4, T5>(equal1: EqualFunction<T1>, equal2: EqualFunction<T2>, equal3: EqualFunction<T3>, equal4: EqualFunction<T4>, equal5: EqualFunction<T5>): EqualFunction<Tuple5<T1, T2, T3, T4, T5>> {
    return function (v1: Tuple5<T1, T2, T3, T4, T5>, v2: Tuple5<T1, T2, T3, T4, T5>) {
      return equal1(v1._1, v2._1) && equal2(v1._2, v2._2) && equal3(v1._3, v2._3) && equal4(v1._4, v2._4) && equal5(v1._5, v2._5);
    };
  }
  public static function ShowF<T1, T2, T3, T4, T5>(show1: ShowFunction<T1>, show2: ShowFunction<T2>, show3: ShowFunction<T3>, show4: ShowFunction<T4>, show5: ShowFunction<T5>): ShowFunction<Tuple5<T1, T2, T3, T4, T5>> {
    return function (v1: Tuple5<T1, T2, T3, T4, T5>) {
      return "Tuple5(" + show1(v1._1) + ", " + show2(v1._2) + ", " + show3(v1._3) + ", " + show4(v1._4) + ", " + show5(v1._5) + ")";
    };
  }
  public static function HasherF<T1, T2, T3, T4, T5>(hash1: HasherFunction<T1>, hash2: HasherFunction<T2>, hash3: HasherFunction<T3>, hash4: HasherFunction<T4>, hash5: HasherFunction<T5>): HasherFunction<Tuple5<T1, T2, T3, T4, T5>> {
    return function (v: Tuple5<T1, T2, T3, T4, T5>) {
      return 12289 * hash1(v._1) + 769 * hash2(v._2) + 393241 * hash3(v._3) + 193 * hash4(v._4) + 53 * hash5(v._5);
    };
  }

  public var _1 (default, null): A;
  public var _2 (default, null): B;
  public var _3 (default, null): C;
  public var _4 (default, null): D;
  public var _5 (default, null): E;

  public function new(first: A, second: B, third: C, fourth: D, fifth: E) {
    super([first, second, third, fourth, fifth]);

    this._1 = first; this._2 = second; this._3 = third; this._4 = fourth; this._5 = fifth;
  }

  override private function getProductPrefix(): String {
    return "Tuple5";
  }

  override private function getProductArity(): Int {
    return 5;
  }

  public function compare(other : Tuple5<A, B, C, D, E>): Int {
  var c = Stax.getOrderFor(_1)(_1, other._1);
  if (c != 0)
    return c;
  c = Stax.getOrderFor(_2)(_2, other._2);
  if (c != 0)
    return c;
  c = Stax.getOrderFor(_3)(_3, other._3);
  if (c != 0)
    return c;
  c = Stax.getOrderFor(_4)(_4, other._4);
  if (c != 0)
    return c;
  return Stax.getOrderFor(_5)(_5, other._5);
  }

  public function equals(other : Tuple5<A, B, C, D, E>): Bool {
  return if (!Stax.getEqualFor(_1)(_1, other._1))
    false;
    else if (!Stax.getEqualFor(_2)(_2, other._2))
     false
    else if (!Stax.getEqualFor(_3)(_3, other._3))
     false
    else if (!Stax.getEqualFor(_4)(_4, other._4))
     false
  else
    Stax.getEqualFor(_5)(_5, other._5);
  }

  override public function toString(): String {
  return "Tuple5(" + Stax.getShowFor(_1)(_1) + ", " + Stax.getShowFor(_2)(_2) + ", " + Stax.getShowFor(_3)(_3) + ", " + Stax.getShowFor(_4)(_4) + ", " + Stax.getShowFor(_5)(_5) + ")";
  }

  public function  hashCode() : Int {
  return 12289 * Stax.getHasherFor(_1)(_1) + 769 * Stax.getHasherFor(_2)(_2) + 393241 * Stax.getHasherFor(_3)(_3) + 193 * Stax.getHasherFor(_4)(_4) + 53 * Stax.getHasherFor(_5)(_5);
  }

  public static function create<A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): Tuple5<A, B, C, D, E> {
    return new Tuple5<A, B, C, D, E>(a, b, c, d, e);
  }
}

typedef OrderFunction<T>  = Function2<T, T, Int>;
typedef EqualFunction<T>  = Function2<T, T, Bool>;
typedef ShowFunction<T>   = Function<T, String>;
typedef HasherFunction<T> = Function<T, Int>;

class Stax {
  static function _createOrderImpl<T>(impl : OrderFunction<Dynamic>) : OrderFunction<T> {
    return function(a, b) {
    return if(a == b || (a == null && b == null)) 0;
      else if(a == null) -1;
      else if(b == null) 1;
      else impl(a, b);
    };
  }
  /** Returns a OrderFunction (T -> T -> Int). It works for any type expect TFunction.
   *  Custom Classes must provide a compare(other : T) : Int method or an exception will be thrown.
   */
  public static function getOrderFor<T>(t : T) : OrderFunction<T> {
    return getOrderForType(Type.typeof(t));
  }
  public static function getOrderForType<T>(v: ValueType) : OrderFunction<T> {
    return switch(v) {
    case TBool:
      _createOrderImpl(BoolExtensions.compare);
    case TInt:
      _createOrderImpl(IntExtensions.compare);
    case TFloat:
      _createOrderImpl(FloatExtensions.compare);
    case TUnknown:
    function(a : T, b : T) return (a == b) ? 0 : ((cast a) > (cast b) ? 1 : -1);
    case TObject:
      _createOrderImpl(function(a, b){
         for(key in Reflect.fields(a)) {
        var va = Reflect.field(a, key);
        var v = getOrderFor(va)(va, Reflect.field(b, key));
        if(0 != v)
          return v;
      }
      return 0;
      });
    case TClass(c):
      switch(Type.getClassName(c)) {
      case "String":
        _createOrderImpl(StringExtensions.compare);
      case "Date":
        _createOrderImpl(DateExtensions.compare);
      case "Array":
      _createOrderImpl(ArrayExtensions.compare);
        default:
      if(Type.getInstanceFields(c).remove("compare")) {
        _createOrderImpl(function(a, b) return (cast a).compare(b));
      } else {
        error("class "+Type.getClassName(c)+" is not comparable");
      }
      }
    case TEnum(e):
        _createOrderImpl(function(a, b) {
      var v = Type.enumIndex(a) - Type.enumIndex(b);
      if(0 != v)
        return v;
      var pa = Type.enumParameters(a);
      var pb = Type.enumParameters(b);
      for(i in 0...pa.length) {
        var v = Stax.getOrderFor(pa[i])(pa[i], pb[i]);
        if(v != 0)
          return v;
      }
      return 0;
    });
    case TNull:
      _createOrderImpl(function(a, b) return error("at least one of the arguments should be null"));
    case TFunction:
    error("unable to compare on a function");

  }
  }

  static function _createEqualImpl<T>(impl : EqualFunction<Dynamic>) {
    return function(a, b) {
    return if(a == b || (a == null && b == null)) true;
      else if(a == null || b == null) false;
      else impl(a, b);
    };
  }
  /** Returns an EqualFunction (T -> T -> Bool). It works for any type. Custom Classes must provide
   * an "equals(other : T) : Bool" method or a "compare(other : T) : Int" method otherwise an exception will be thrown.
   */
  public static function getEqualFor<T>(t : T) : EqualFunction<T> {
    return getEqualForType(Type.typeof(t));
  }
  public static function getEqualForType<T>(v: ValueType) : EqualFunction<T> {
    return switch(v) {
      case TBool:
        _createEqualImpl(BoolExtensions.equals);
      case TInt:
        _createEqualImpl(IntExtensions.equals);
      case TFloat:
        _createEqualImpl(FloatExtensions.equals);
      case TUnknown:
      function(a : T, b : T) return a == b;
      case TObject:
        _createEqualImpl(function(a, b) {
        for(key in Reflect.fields(a)) {
          var va = Reflect.field(a, key);
          if(!getEqualFor(va)(va, Reflect.field(b, key)))
            return false;
        }
        return true;
      });
    case TClass(c):
      switch(Type.getClassName(c)) {
        case "String":
          _createEqualImpl(StringExtensions.equals);
        case "Date":
          _createEqualImpl(DateExtensions.equals);
        case "Array":
          _createEqualImpl(ArrayExtensions.equals);
        default:
          var fields = Type.getInstanceFields(c);
          if(fields.remove("equals")) {
            _createEqualImpl(function(a, b) return (cast a).equals(b));
          } else if(fields.remove("compare")) {
            _createEqualImpl(function(a, b) return (cast a).compare(b) == 0);
          } else {
            error("class "+Type.getClassName(c)+" has not equals method");
          }
      }
    case TEnum(e):
      _createEqualImpl(function(a, b) {
        if(0 != Type.enumIndex(a) - Type.enumIndex(b))
          return false;
        var pa = Type.enumParameters(a);
        var pb = Type.enumParameters(b);
        for(i in 0...pa.length) {
          if(!Stax.getEqualFor(pa[i])(pa[i], pb[i]))
            return false;
        }
        return true;
      });
    case TNull:
      _createEqualImpl(function(a, b) return error("at least one of the arguments should be null"));
    case TFunction:
      _createEqualImpl(Reflect.compareMethods);
  }
  }

  static function _createShowImpl<T>(impl : ShowFunction<Dynamic>) : ShowFunction<T> {
    return function(v) return null == v ? 'null' : impl(v);
  }

  /** Returns a ShowFunction (T -> String). It works for any type. For Custom Classes you must provide a toString()
   * method, otherwise the full class name is returned.
   */
  public static function getShowFor<T>(t : T) : ShowFunction<T> {
    return getShowForType(Type.typeof(t));
  }
  public static function getShowForType<T>(v : ValueType) : ShowFunction<T> {
    return switch(v) {
    case TBool:
      _createShowImpl(BoolExtensions.toString);
    case TInt:
      _createShowImpl(IntExtensions.toString);
    case TFloat:
      _createShowImpl(FloatExtensions.toString);
    case TUnknown:
    _createShowImpl(function(v) return '<unknown>');
    case TObject:
      _createShowImpl(function(v)
      {
      var buf = [];
      for(k in Reflect.fields(v)) {
        var i = Reflect.field(v, k);
        buf.push(k + ":" + getShowFor(i)(i));
      }
      return "{" + buf.join(",") + "}";
      });
    case TClass(c):
      switch(Type.getClassName(c)) {
      case "String":
            _createShowImpl(StringExtensions.toString);
      case "Array":
            _createShowImpl(ArrayExtensions.toString);
        default:
            _createShowImpl(function(v : T) {
        return if(Type.getInstanceFields(Type.getClass(v)).remove("toString"))
          Reflect.callMethod(v, Reflect.field(v, "toString"), []);
        else
              Type.getClassName(Type.getClass(v));
      });
      }
    case TEnum(e):
      _createShowImpl(function(v) {
      var buf = Type.enumConstructor(v);
      var params = Type.enumParameters(v);
      if(params.length == 0)
        return buf;
      else {
      buf +="(";
      for(p in params)
        buf += getShowFor(p)(p);
      return buf + ")";
      }
      });
    case TNull:
      function(v) return "null";
    case TFunction:
      _createShowImpl(function(v) return '<function>');
  }
  }

  static function _createHasherImpl<T>(impl : HasherFunction<Dynamic>) return function(v : T) if(null == v) return 0 else return impl(v)

  /** Returns a HasherFunction (T -> Int). It works for any type. For Custom Classes you must provide a hashCode()
   * method, otherwise the full class name is returned.
   */
  public static function getHasherFor<T>(t : T) : HasherFunction<T> {
    return getHasherForType(Type.typeof(t));
  }
  public static function getHasherForType<T>(v: ValueType) : HasherFunction<T> {
    return switch(v) {
    case TBool:
      _createHasherImpl(BoolExtensions.hashCode);
    case TInt:
      _createHasherImpl(IntExtensions.hashCode);
    case TFloat:
      _createHasherImpl(FloatExtensions.hashCode);
    case TUnknown:
    _createHasherImpl(function(v : T) return error("can't retrieve hascode for TUnknown: " + v));
    case TObject:
      _createHasherImpl(function(v){
      var s = getShowFor(v)(v);
      return getHasherFor(s)(s);
      });
    case TClass(c):
      switch(Type.getClassName(c)) {
      case "String":
        _createHasherImpl(StringExtensions.hashCode);
          case "Date":
            _createHasherImpl(DateExtensions.hashCode);
      case "Array":
            _createHasherImpl(ArrayExtensions.hashCode);
        default:
            _createHasherImpl(function(v : T) {
        return if(Type.getInstanceFields(Type.getClass(v)).remove("hashCode"))
          Reflect.callMethod(v, Reflect.field(v, "hashCode"), []);
        else
              error("class does not have a hashCode method");
      });
      }
    case TEnum(e):
      _createHasherImpl(function(v : T) {
      var hash = Type.enumConstructor(v).hashCode() * 6151;
      for(i in Type.enumParameters(v))
        hash += Stax.getHasherFor(i)(i) * 6151;
      return hash;
    });
    case TFunction:
      _createHasherImpl(function(v : T) return error("function can't provide a hash code"));
    case TNull:
      function(v) return 0;
    default:
    function(v : T) return -1;
  }
  }

  public static function noop1<A>() {
    return function(a: A) { }
  }
  public static function noop2<A, B>() {
    return function(a: A, b: B) { }
  }
  public static function noop3<A, B, C>() {
    return function(a: A, b: B, c: C) { }
  }
  public static function noop4<A, B, C, D>() {
    return function(a: A, b: B, c: C, d: D) { }
  }
  public static function noop5<A, B, C, D, E>() {
    return function(a: A, b: B, c: C, d: D, e: E) { }
  }

  public static function identity<A>(): Function<A, A> {
    return function(a: A) { return a; }
  }

  public static function unfold<T, R>(initial: T, unfolder: T -> Option<Tuple2<T, R>>): Iterable<R> {
    return {
      iterator: function(): Iterator<R> {
        var _next: Option<R> = None;
        var _progress: T = initial;

        var precomputeNext = function() {
          switch (unfolder(_progress)) {
            case None:
              _progress = null;
              _next     = None;

            case Some(tuple):
              _progress = tuple._1;
              _next     = Some(tuple._2);
          }
        }

        precomputeNext();

        return {
          hasNext: function(): Bool {
            return !_next.isEmpty();
          },

          next: function(): R {
            var n = _next.get();

            precomputeNext();

            return n;
          }
        }
      }
    }
  }

  public static function error<T>(msg: String): T { throw msg; return null; }
}
