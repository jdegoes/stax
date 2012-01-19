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
<<<<<<< HEAD

/**
 * An asynchronous operation that may complete in the future unless
 * successfully canceled.
 * <p>
 * Futures can be combined and chained together to form complicated
 * asynchronous control flows. Often used operations are map() and
 * flatMap().
 * <p>
 */

interface Product {
  public var productPrefix (getProductPrefix, null): String;

  public var productArity (getProductArity, null): Int;

  public function productElement(n: Int): Dynamic;
}

class AbstractProduct implements Product {
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

class Tuple2< A, B> extends AbstractProduct {
  public var _1 (default, null): A;
  public var _2 (default, null): B;

	public function apply<C>(f : A -> B -> C ) : C
		return f(_1, _2)

		
	public static function first<A, B>(t : Tuple2<A, B>) return t._1
	public static function second<A, B>(t : Tuple2<A, B>) return t._2
	
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

<<<<<<< HEAD
  public function entuple<C>(c: C): Tuple3<A, B, C> {
    return Tuple3.create(_1, _2, c);
  }

  public static function bothEqual<T>(a : Tuple2<T, T>) : Bool return a._1 == a._2
  
=======
>>>>>>> Moved Tuple4 and Tuple5 to Tuples.hx
  public function compare(other : Tuple2<A, B>): Int {
    return productCompare(other);
  }
	public function entuple<C>(c: C): Tuple3<A, B, C> {
    return Tuple3.create(_1, _2, c);
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
class Tuple3< A, B, C> extends AbstractProduct {
  public var _1 (default, null): A;
  public var _2 (default, null): B;
  public var _3 (default, null): C;

  function new(first: A, second: B, third: C) {
    super([first, second, third]);

    this._1 = first; this._2 = second; this._3 = third;
  }

	public function apply<D>(f : A -> B -> C -> D ) : D
		return f(_1, _2, _3)

	public static function first<A, B, C>(t : Tuple3<A, B, C>) return t._1
	public static function second<A, B, C>(t : Tuple3<A, B, C>) return t._2
	public static function third<A, B, C>(t : Tuple3<A, B, C>) return t._3
	
  override private function getProductPrefix(): String {
    return "Tuple3";
  }

  override private function getProductArity(): Int {
    return 3;
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
=======
>>>>>>> refactor
typedef OrderFunction<T>  = Function2<T, T, Int>;
typedef EqualFunction<T>  = Function2<T, T, Bool>;
typedef ShowFunction<T>   = Function<T, String>;
typedef HashFunction<T> = Function<T, Int>;   

typedef CollectionTools<T> = {
		order : Null<OrderFunction<T>>,
		equal	: Null<EqualFunction<T>>,
		show	: Null<ShowFunction<T>>,
		hash	: Null<HashFunction<T>>,
}
class FieldOrder {
  public static inline var Ascending = 1;
  public static inline var Descending = -1;
  public static inline var Ignore = 0;
}
