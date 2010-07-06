import haxe.data.collections.List;

class Table {
  public var entries (default, null): Array<Dynamic>;
  
  public function new(a: Array<Dynamic>) {
    entries = a;
  }
}

/** A function that accepts a table, and returns a list of results. */
typedef Selector<T> = Table -> List<T>

/** A function that accepts an item, and returns true or false. */
typedef Filter<T> = T -> Bool

/** Example data type */
typedef MyData = { name: String, age: Int }
