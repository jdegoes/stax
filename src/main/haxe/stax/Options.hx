package stax;

/**
 * ...
 * @author 0b1kn00b
 */
import Prelude;
using stax.Options;
using stax.Eithers;
using stax.Dynamics;

class Options {
  public static function toOption<T>(t: T): Option<T> {
    return if (t == null) None; else Some(t);
  }
	  
  public static function toArray<T>(o: Option<T>): Array<T> {
    return switch (o) {
      case None:    [];
      case Some(v): [v];
    }
  }
  
  public static function map<T, S>(o: Option<T>, f: T -> S): Option<S> {
    return switch (o) {
      case None: None;
      case Some(v): Some(f(v));
    }
  }
	
  public static function then<T, S>(o1: Option<T>, o2: Option<S>): Option<S> {
    return o2;
  }
  public static function foreach<T>(o: Option<T>, f: T -> Void): Void {
    return switch (o) {
      case None: 
      case Some(v): f(v);
    }
  }
  
  public static function filter<T>(o: Option<T>, f: T -> Bool): Option<T> {
    return switch (o) {
      case None: None;
      case Some(v): if (f(v)) o else None;
    }
  }
  
  public static function flatMap<T, S>(o: Option<T>, f: T -> Option<S>): Option<S> {
    return flatten(map(o, f));
  }
  
  public static function flatten<T>(o1: Option<Option<T>>): Option<T> {
    return switch (o1) {
      case None: None;
      case Some(o2): o2;
    }
  }
  
  public static function zip<T, S>(o1: Option<T>, o2: Option<S>) {
    return switch (o1) {
      case None: None;
      case Some(v1): o2.map(callback( stax.Tuples.entuple , v1));
    }
  }

  public static function zipWith<T, S, V>(o1: Option<T>, o2: Option<S>, f : T -> S -> V) : Option<V> {
    return switch (o1) {
      case None: None;
      case Some(v1):
				switch (o2) {
					case None : None;
					case Some(v2) : Some(f(v1, v2));
				}
    }
  }

  public static function get<T>(o: Option<T>): T {
    return switch (o) {
      case None: Stax.error("Error: Option is empty"); null;
      case Some(v): v;
    }
  }
  
  public static function orElse<T>(o1: Option<T>, thunk: Thunk<Option<T>>): Option<T> {
    return switch (o1) {
      case None: thunk();
      
      case Some(v): o1;
    }
  }
  
  public static function orElseC<T>(o1: Option<T>, o2: Option<T>): Option<T> {
    return Options.orElse(o1, o2.toThunk());
  }
  
  public static function orEither<T, S>(o1: Option<T>, thunk: Thunk<S>): Either<S, T> {
    return switch (o1) {
      case None: Eithers.toLeft(thunk());
      case Some(v): Eithers.toRight(v);
    }
  }
  
  public static function orEitherC<T, S>(o1: Option<T>, c: S): Either<S, T> {
    return Options.orEither(o1, c.toThunk());
  }
  
  public static function getOrElse<T>(o: Option<T>, thunk: Thunk<T>): T {
    return switch(o) {
      case None: thunk();
      case Some(v): v;
    }
  }
  
  public static function getOrElseC<T>(o: Option<T>, c: T): T {
    return Options.getOrElse(o, c.toThunk());
  }
  
  public static function isEmpty<T>(o: Option<T>): Bool {
    return switch(o) {
      case None:    true;
      case Some(_): false;
    }
  }
  public static function isDefined<T>(o: Option<T>): Bool {
    return switch(o) {
      case None:    false;
      case Some(_): true;
    }
  }
}
