package stax;

/**
 * ...
 * @author 0b1kn00b
 */
import Prelude;

typedef TTuple2<A,B> = {
	_1 : A,
	_2 : B
}
typedef TTuple3<A,B,C> = { > TTuple2<A,B>,
	_3 : C,
}
typedef TTuple4<A,B,C,D> = { > TTuple3<A,B,C>,
	_4 : C,
}
typedef TTuple5<A,B,C,D,E> = { > TTuple4<A,B,C,D>,
	_5 : C,
}

class Tuples {
	public static function entuple<A, B>(a: A, b: B): Tuple2<A, B> {
    return Tuple2.create(a, b);
  }
}
interface Product {
  public var productPrefix (getProductPrefix, null): String;

  public var productArity (getProductArity, null): Int;

  public function productElement(n: Int): Dynamic;
}

class AbstractProduct implements Product {
  public var productPrefix (getProductPrefix, null): String;

  public var productArity (getProductArity, null): Int;

  public var _productElements: Array<Dynamic>;

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
}
class Tuple4< A, B, C, D> extends AbstractProduct {
  public var _1 (default, null): A;
  public var _2 (default, null): B;
  public var _3 (default, null): C;
  public var _4 (default, null): D;

  function new(first: A, second: B, third: C, fourth: D) {
    super([first, second, third, fourth]);

    this._1 = first; this._2 = second; this._3 = third; this._4 = fourth;
  }
	
	public function apply<E>(f : A -> B -> C -> D -> E) : E
		return f(_1, _2, _3, _4)

	public static function first<A, B, C, D>(t : Tuple4<A, B, C, D>) return t._1
	public static function second<A, B, C, D>(t : Tuple4<A, B, C, D>) return t._2
	public static function third<A, B, C, D>(t : Tuple4<A, B, C, D>) return t._3
	public static function fourth<A, B, C, D>(t : Tuple4<A, B, C, D>) return t._4
	
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
}

class Tuple5< A, B, C, D, E> extends AbstractProduct {
  public var _1 (default, null): A;
  public var _2 (default, null): B;
  public var _3 (default, null): C;
  public var _4 (default, null): D;
  public var _5 (default, null): E;

  function new(first: A, second: B, third: C, fourth: D, fifth: E) {
    super([first, second, third, fourth, fifth]);

    this._1 = first; this._2 = second; this._3 = third; this._4 = fourth; this._5 = fifth;
  }

	public function apply<F>(f : A -> B -> C -> D -> E -> F) : F
		return f(_1, _2, _3, _4, _5)
	
	public static function first<A, B, C, D, E>(t : Tuple5<A, B, C, D, E>) return t._1
	public static function second<A, B, C, D, E>(t : Tuple5<A, B, C, D, E>) return t._2
	public static function third<A, B, C, D, E>(t : Tuple5<A, B, C, D, E>) return t._3
	public static function fourth<A, B, C, D, E>(t : Tuple5<A, B, C, D, E>) return t._4
	public static function fifth<A, B, C, D, E>(t : Tuple5<A, B, C, D, E>) return t._5
	
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
}
