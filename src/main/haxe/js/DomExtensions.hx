package js;

import Dom;

class DomCollectionExtensions
{
	public static function toArray<T>(c: DomCollection<T>): Array<T> {
	  var a: Array<T> = [];
	  
	  for (i in 0...c.length) {
	    a.push(c[i]);
	  }
	  
	  return a;
	}
}