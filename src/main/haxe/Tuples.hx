package ;

/**
 * ...
 * @author 0b1kn00b
 */
import Prelude;
import haxe.text.json.JValue;
import haxe.data.transcode.TranscodeJValue;
import haxe.data.transcode.TranscodeJValueExtensions;

class Tuples {
	public static function entuple<A,B,C,D>(t:Tuple3<A,B,C>,d: D): Tuple4<A, B, C, D> {
    return Tuple4.create(t._1, t._2, t._3, d);
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
