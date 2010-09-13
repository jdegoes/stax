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

import haxe.text.json.JValue;
import haxe.data.transcode.TranscodeJValue;
import haxe.data.transcode.TranscodeJValueExtensions;
import PreludeExtensions;
using PreludeExtensions;

enum Unit {
  Unit;
}

typedef AnyRef = {}
typedef CodeBlock = Void -> Void
typedef Function<P1, R> = P1 -> R
typedef Function0<R> = Void -> R
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
    _orders = []; _equals = []; _hashes = []; _shows = [];
  }

  public function productElement(n: Int): Dynamic {
    return _productElements[n];
  }

  public function toString(): String {
    var s = productPrefix + "(" + getShow(0)(productElement(0));
    for(i in 1...productArity)
      s += ", " + getShow(i)(productElement(i));
    return s + ")";
  }

  static var _baseHashes = [
    [786433, 24593],
    [196613, 3079, 389],
    [1543, 49157, 196613, 97],
    [12289, 769, 393241, 193, 53]
  ];
  public function hashCode() : Int {
    var h = 0;
    for(i in 0...productArity)
      h += _baseHashes[productArity-2][i] * getHash(i)(productElement(i));
    return h;
  }

  private function productCompare(other : AbstractProduct): Int {
    for(i in 0...productArity) {
      var c = getOrder(i)(productElement(i), other.productElement(i));
      if(c != 0)
        return c;
    }
    return 0;
  }

  private function productDecompose(): JValue{
    return JArray(_productElements.map(function(t){return TranscodeJValue.getDecomposerFor(Type.typeof(t))(t);}));
  }

  private function productEquals(other : AbstractProduct): Bool {
    for(i in 0...productArity)
      if(!getEqual(i)(productElement(i), other.productElement(i)))
        return false;
    return true;
  }

  private function getProductPrefix(): String {
    return Stax.error("Not implemented");
  }

  private function getProductArity(): Int {
    return Stax.error("Not implemented");
  }

  private var _orders : Array<OrderFunction<Dynamic>>;
  private var _equals : Array<EqualFunction<Dynamic>>;
  private var _hashes : Array<HashFunction <Dynamic>>;
  private var _shows  : Array<ShowFunction <Dynamic>>;
  private function getOrder(i : Int) {
    return if(null == _orders[i]) {
      _orders[i] = Stax.getOrderFor(productElement(i));
    } else
      _orders[i];
  }

  private function getEqual(i : Int) {
    return if(null == _equals[i]) {
      _equals[i] = Stax.getEqualFor(productElement(i));
    } else
      _equals[i];
  }

  private function getHash(i : Int) {
    return if(null == _hashes[i]) {
      _hashes[i] = Stax.getHashFor(productElement(i));
    } else
      _hashes[i];
  }

  private function getShow(i : Int) {
    return if(null == _shows[i]) {
      _shows[i] = Stax.getShowFor(productElement(i));
    } else
      _shows[i];
  }
}

class Tuple2<A, B> extends AbstractProduct {
  public var _1 (default, null): A;
  public var _2 (default, null): B;

  function new(first: A, second: B) {
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

  public function compare(other : Tuple2<A, B>): Int {
    return productCompare(other);
  }

  public function equals(other : Tuple2<A, B>): Bool {
    return productEquals(other);
  }

  public static function create<A, B>(a: A, b: B): Tuple2<A, B> {
    return new Tuple2<A, B>(a, b);
  }
  public function decompose(): JValue {
    return productDecompose();
  }
  public static function extract<A, B>(v: JValue, e1: JExtractorFunction<A>, e2: JExtractorFunction<B>): Tuple2<A, B> {
    return switch(v) {
      case JArray(v): Tuple2.create(e1(v[0]), e2(v[1]));

      default: Stax.error("Expected Array but was: " + v);
    }
  }
}

class Tuple3<A, B, C> extends AbstractProduct {
  public var _1 (default, null): A;
  public var _2 (default, null): B;
  public var _3 (default, null): C;

  function new(first: A, second: B, third: C) {
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
    return productCompare(other);
  }

  public function equals(other : Tuple3<A, B, C>): Bool {
    return productEquals(other);
  }

  public static function create<A, B, C>(a: A, b: B, c: C): Tuple3<A, B, C> {
    return new Tuple3<A, B, C>(a, b, c);
  }
  public function decompose(): JValue {
    return productDecompose();
  }
  public static function extract<A, B, C>(v: JValue, e1: JExtractorFunction<A>, e2: JExtractorFunction<B>, e3: JExtractorFunction<C>): Tuple3<A, B, C> {
    return switch(v) {
      case JArray(v): Tuple3.create(e1(v[0]), e2(v[1]), e3(v[2]));

      default: Stax.error("Expected Array but was: " + v);
    }
  }
}

class Tuple4<A, B, C, D> extends AbstractProduct {
  public var _1 (default, null): A;
  public var _2 (default, null): B;
  public var _3 (default, null): C;
  public var _4 (default, null): D;

  function new(first: A, second: B, third: C, fourth: D) {
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
    return productCompare(other);
  }

  public function equals(other : Tuple4<A, B, C, D>): Bool {
    return productEquals(other);
  }

  public static function create<A, B, C, D>(a: A, b: B, c: C, d: D): Tuple4<A, B, C, D> {
    return new Tuple4<A, B, C, D>(a, b, c, d);
  }
  public function decompose(): JValue {
    return productDecompose();
  }
  public static function extract<A, B, C, D>(v: JValue, e1: JExtractorFunction<A>, e2: JExtractorFunction<B>, e3: JExtractorFunction<C>, e4: JExtractorFunction<D>): Tuple4<A, B, C, D> {
    return switch(v) {
      case JArray(v): Tuple4.create(e1(v[0]), e2(v[1]), e3(v[2]), e4(v[3]));

      default: Stax.error("Expected Array but was: " + v);
    }
  }
}

class Tuple5<A, B, C, D, E> extends AbstractProduct {
  public var _1 (default, null): A;
  public var _2 (default, null): B;
  public var _3 (default, null): C;
  public var _4 (default, null): D;
  public var _5 (default, null): E;

  function new(first: A, second: B, third: C, fourth: D, fifth: E) {
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
    return productCompare(other);
  }

  public function equals(other : Tuple5<A, B, C, D, E>): Bool {
    return productEquals(other);
  }

  public static function create<A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): Tuple5<A, B, C, D, E> {
    return new Tuple5<A, B, C, D, E>(a, b, c, d, e);
  }
  public function decompose(): JValue {
    return productDecompose();
  }
  public static function extract<A, B, C, D, E>(v: JValue, e1: JExtractorFunction<A>, e2: JExtractorFunction<B>, e3: JExtractorFunction<C>, e4: JExtractorFunction<D>, e5: JExtractorFunction<E>): Tuple5<A, B, C, D, E> {
    return switch(v) {
      case JArray(v): Tuple5.create(e1(v[0]), e2(v[1]), e3(v[2]), e4(v[3]), e5(v[4]));

      default: Stax.error("Expected Array but was: " + v);
    }
  }
}

typedef OrderFunction<T>  = Function2<T, T, Int>;
typedef EqualFunction<T>  = Function2<T, T, Bool>;
typedef ShowFunction<T>   = Function<T, String>;
typedef HashFunction<T> = Function<T, Int>;

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
        if(_hasMetaDataClass(c)) {
		      _createOrderImpl(function(a, b) {
            var m = haxe.rtti.Meta.getFields(c);
            var orderedFields = Type.getInstanceFields(c).map(function(v){
              var fieldMeta = Reflect.field(m, v);
              var weight    = if (fieldMeta != null){
                  if (Reflect.hasField(fieldMeta, "OrderAscending")) 1
                  else if (Reflect.hasField(fieldMeta, "OrderDescending")) -1
                  else 0;
                }
                else 0;
              return Tuple2.create(v, weight);
            }).filter(function(v){return v._2 != 0;});

            var values = orderedFields.map(function(v){return Tuple3.create(Reflect.field(a, v._1), Reflect.field(b, v._1), v._2);});

            for (value in values) {
//              if(Reflect.isFunction(value._1))
//                continue;
              var c = getOrderFor(value._1)(value._1, value._2) * value._3;

              if (c != 0) return c;
            }

            return 0;
          });
		    } else if(Type.getInstanceFields(c).remove("compare")) {
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
  static function _hasMetaDataClass(c : Class<Dynamic>) {
    var m = haxe.rtti.Meta.getType(c); 
    return null != m && Reflect.hasField(m, "DataClass");
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
          if(_hasMetaDataClass(c)) { 
            _createEqualImpl(function(a, b) {          
              var values = fields.map(function(f){return Tuple2.create(Reflect.field(a, f), Reflect.field(b, f));});
              for (value in values) {
                if(Reflect.isFunction(value._1))
                  continue;
                if(!getEqualFor(value._1)(value._1, value._2))
                  return false;
              }
              return true;
            });    
          } else if(fields.remove("equals")) {
            _createEqualImpl(function(a, b) return (cast a).equals(b));
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
  
  /**
   *  @todo Reflect.fields doesn't work consistenly across platforms so we may probably pass to use Type.getInstanceFields. The problem here
   *  is that we must check if the fields are functions before grabbing the value.
   */
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
          return if(_hasMetaDataClass(c)) {
            var values = Reflect.fields(v).map(function(f){return Reflect.field(v, f);}).map(function(v){return Stax.getShowFor(v)(v);});
            values.mkString(Type.getClassName(c) + '(', ')', ', ');
          } else if(Type.getInstanceFields(c).remove("toString"))
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

  static function _createHashImpl<T>(impl : HashFunction<Dynamic>) return function(v : T) if(null == v) return 0 else return impl(v)

  /** Returns a HashFunction (T -> Int). It works for any type. For Custom Classes you must provide a hashCode()
   * method, otherwise the full class name is returned.
   */
  public static function getHashFor<T>(t : T) : HashFunction<T> {
    return getHashForType(Type.typeof(t));
  }
  public static function getHashForType<T>(v: ValueType) : HashFunction<T> {
    return switch(v) {
      case TBool:
        _createHashImpl(BoolExtensions.hashCode);
      case TInt:
        _createHashImpl(IntExtensions.hashCode);
      case TFloat:
        _createHashImpl(FloatExtensions.hashCode);
      case TUnknown:
      _createHashImpl(function(v : T) return error("can't retrieve hascode for TUnknown: " + v));
      case TObject:
        _createHashImpl(function(v){
        var s = getShowFor(v)(v);
        return getHashFor(s)(s);
        });
      case TClass(c):
        switch(Type.getClassName(c)) {
        case "String":
          _createHashImpl(StringExtensions.hashCode);
        case "Date":
          _createHashImpl(DateExtensions.hashCode);
        case "Array":
          _createHashImpl(ArrayExtensions.hashCode);
        default:
          if(_hasMetaDataClass(c)) {
            _createHashImpl(function(v : T) {
              var className = Type.getClassName(c);
              var values    = Reflect.fields(v).map(function(f){return Reflect.field(v, f);});
              return values.foldl(9901 * StringExtensions.hashCode(className), function(v, e){return v + (333667 * (Stax.getHashFor(e)(e) + 197192));});
            });
          } else if(Type.getInstanceFields(c).remove("hashCode")) {
            _createHashImpl(function(v) return Reflect.callMethod(v, Reflect.field(v, "hashCode"), []));
          } else {
            error("class does not have a hashCode method");
          }
        }
      case TEnum(e):
        _createHashImpl(function(v : T) {
        var hash = Type.enumConstructor(v).hashCode() * 6151;
        for(i in Type.enumParameters(v))
          hash += Stax.getHashFor(i)(i) * 6151;
        return hash;
      });
      case TFunction:
        _createHashImpl(function(v : T) return error("function can't provide a hash code"));
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
