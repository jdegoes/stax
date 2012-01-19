package haxe.reactive;

import stax.Tuples;
import Prelude;
import haxe.test.TestCase;
import haxe.reactive.Reactive;
import haxe.data.collections.List;
import haxe.data.collections.Collection;
import haxe.reactive.SignalCollectionExtensions;
import haxe.reactive.SignalSignal;
import haxe.reactive.SignalFloat;
import haxe.reactive.SignalInt;
import haxe.reactive.SignalBool;
import haxe.reactive.Signals;
import haxe.reactive.StreamStream;
import haxe.reactive.StreamBool;
import haxe.reactive.Streams;
import haxe.reactive.Collections;

using stax.IterableOps;
using haxe.data.collections.List;

using haxe.functional.FoldableExtensions;

class TimeoutBundle {
  public var func    (default, null): Void -> Void;
  public var timeout (default, null): Int;
  
  public function new(f: Void -> Void, t: Int) {
    this.func    = f;
    this.timeout = t;
  }
  
  public static function from(f: Void -> Void, t: Int): TimeoutBundle {
    return new TimeoutBundle(f, t);
  }
}


class ReactiveTestCase extends TestCase {
  public var counter:         Int;
//    var _collectionsToStream:   Array<Int>;
//    var _collectionsToStreamB:  Array<Int>;
//    var _sendLaterIn:           Array<Int>;
//    var _sendLater:             String;
//    var _streamDelay:           Array<Int>;
//    var _streamCalm:            Array<Int>;
//    var _streamCalmB:           Array<Int>;
  
  var _now: Int;
  var _timeouts: Array<TimeoutBundle>;
  
  public function new():Void {
    super();            
    counter =               0;
    _now =                  0;
    _timeouts =             [];
//      _collectionsToStream =  [];
//      _collectionsToStreamB = [];
//      _sendLaterIn =          [];
//      _streamDelay =          [];
//      _streamCalm =           [];
//      _streamCalmB =          [];
    
    var self = this;
    
    External.setTimeout = function(f, time): Timeout {
      var bundle = TimeoutBundle.from(f, time + self._now);
      
      self._timeouts.push(bundle);
      
      return bundle;
    }
    
    External.cancelTimeout = function(t: Timeout): Void {
      var bundle: TimeoutBundle = cast t;
      
      self._timeouts.remove(bundle);
    }
    
    External.now = function(): Float { 
      return self._now;
    }
  }

/*
* -----------------  Stream Tests  -------------------
* Missing: attachListener, removeListener, whenFinishedDo
* Broken:  
*/
  public function testForEach():Void {
    var stream: Stream<Int> = Streams.identity();
    var self = this;
    
    var count = 0;
    
    var arr1: Iterable<Int> = [1, 2, 3, 4, 5, 6, 7];
    
    var sForEach = stream.forEach(function(v) { self.incrementCounter(); });
    pump(stream, arr1, sForEach);
    
    assertEquals(counter, 7);
    resetCounter();
  }

  
  public function testEach():Void {
    var stream: Stream<Int> = Streams.identity();
    var self = this;
    
    var count = 0;
    
    var arr1: Iterable<Int> = [1, 2, 3, 4, 5, 6, 7];
    
    var each = stream.each(function(v) { self.incrementCounter(); });
    pump(stream, arr1, each);
    
    assertEquals(counter, 7);
    resetCounter();
  }
  
  public function testStreamToArray():Void {
    var self   = this;
    var stream = stream();
    
    var array = stream.toArray();
    
    var iter: Iterable<Int> = [1, 2, 3, 4, 5];
    
    voidPump(stream, iter);
    
    assertEquals([1, 2, 3, 4, 5], array);
  }
  
  public function testStreamConstant():Void {
    var stream:  Stream<Int> = Streams.identity();
    
    var constant = stream.constant(3).toArray();
    for (i in 0...3) {
      stream.sendEvent(i);
    }
    
    assertEquals([3, 3, 3], constant);
  }
  
  public function testBind():Void {
    var stream: Stream<Int> = Streams.identity();
    
    var boundStreams: Array<Stream<Int>> = [Streams.identity(), Streams.identity(), Streams.identity()];
    
    var binded = stream.bind(function(x) { 
      return switch(x) { 
        case 1: boundStreams[0]; 
        case 2: boundStreams[1]; 
        case 3: boundStreams[2]; 
        default: throw "error"; null; 
      }
    });
    
    var farray = binded.toArray();
    
    stream.sendEvent(1);
    boundStreams[0].sendEvent(666);
    assertEquals(666, farray.pop());
    
    stream.sendEvent(2);
    boundStreams[1].sendEvent(333);
    assertEquals(333, farray.pop());
    
    stream.sendEvent(3);
    boundStreams[2].sendEvent(777);
    assertEquals(777, farray.pop());
  }
  
  public function testSendEvent():Void {
    var stream = stream();
    
    var testStream = stream.toArray();
    
    assertEquals([], testStream);
    
    stream.sendEvent("updated");
    
    assertEquals("updated", testStream.pop());
  }

  public function testSendLaterIn():Void {
    setupTimingTest();
    
    var stream = Collections.toStream([1, 2], 10);
    
    var contents = stream.toArray();
    
    var laterIn = stream.sendLaterIn(3, 5);
    
    assertEquals(5, _timeouts[1].timeout);
    
    _now = 5;        
    _timeouts[1].func();
    
    assertEquals(3, contents.pop());
    
    assertEquals(10, _timeouts[0].timeout);
    
    _now = 10;        
    _timeouts[0].func();
    
    assertEquals(1, contents.pop());
    
    assertEquals(20, _timeouts[1].timeout);
    
    _now = 20;        
    _timeouts[1].func();
    
    assertEquals(2, contents.pop());
  }
  
  public function testSendLater():Void {
    setupTimingTest();
    
    var stream = Collections.toStream([4, 5, 6], 7);
    
    var contents = stream.toArray();
    
    stream.sendEvent(3);
    var laterIn = stream.sendLater(99);
    
    assertEquals(0, _timeouts[1].timeout);
    _now = 0;
    assertEquals(3, contents.pop());
    
    assertEquals(0, _timeouts[1].timeout);
    
    _timeouts[1].func();
    
    _now = 0;
    assertEquals(99, contents.pop());
            
    assertEquals(7, _timeouts[0].timeout);
    
    _now = 7;
    _timeouts[0].func();
    
    assertEquals(4, contents.pop());
    
    assertEquals(14, _timeouts[1].timeout);
    
    _now = 14;
    _timeouts[1].func();
    
    assertEquals(5, contents.pop());
    
    assertEquals(21, _timeouts[1].timeout);
    
    _now = 21;
    _timeouts[1].func();
    
    assertEquals(6, contents.pop());
  }
    
  public function testStartsWith():Void {
    var stream = stream().startsWith(true);
    
    assertTrue(stream.valueNow());
  }
  
  public function testDelay():Void {
    setupTimingTest();
    
    var stream = Collections.toStream([1, 2, 3, 4], 5);
    
    var streams = [stream, stream.delay(2)];
    
    var merged = Streams.merge(streams).toArray();
    
    advanceTime(25);
    
    assertEquals([1, 1, 2, 2, 3, 3, 4, 4], merged);
  }

  public function testDelayS():Void {
    setupTimingTest();
    var stream = Collections.toStream([1, 2, 3, 4], 5);
    
    var b = Signals.constant(7);
    
    assertTimeoutExists(5);
    
    var streams = [stream, stream.delayS(b)];
    
    var merged = Streams.merge(streams).toArray();
    
    advanceTime(30);
    
    assertEquals([1, 2, 1, 3, 2, 4, 3, 4], merged);
  }
 
  public function testCalm():Void {
    setupTimingTest();
    
    var stream = Streams.identity();
    
    var calmed = stream.calm(10).toArray();
    
    for (i in 0...4) {
      stream.sendEvent(1);
      
      advanceTime(9);
    }
    
    assertEquals([], calmed);
    
    advanceTime(1);
    
    for (i in 0...3) {
      stream.sendEvent(1);
      
      advanceTime(10);
    }
    
    assertEquals([1, 1, 1, 1], calmed);
  }
  
  public function testCalmS():Void {
    setupTimingTest();
    
    var stream = Streams.identity();
    
    var b = Signals.constant(10);
    
    var calmed = stream.calmS(b).toArray();
    
    for (i in 0...4) {
      stream.sendEvent(1);
      
      advanceTime(9);
    }
    
    assertEquals([], calmed);
    
    advanceTime(1);
    
    for (i in 0...3) {
      stream.sendEvent(1);
      
      advanceTime(10);
    }
    
    assertEquals([1, 1, 1, 1], calmed);
  }
  
  public function testBlindS():Void {
    setupTimingTest();
    
    var stream = Streams.identity();
    
    var b = Signals.constant(4);
    
    var blinded = stream.blindS(b).toArray();
    
    for (i in 0...6) {
      stream.sendEvent(1);
      
      advanceTime(1);
    }
    
    assertEquals([1, 1], blinded);
            
    for (i in 0...5) {
      advanceTime(4);
      stream.sendEvent(2);
    }
    
    assertEquals([1, 1, 2, 2, 2], blinded);
  }
  
  public function testBlind():Void {
    setupTimingTest();
    
    var stream = Streams.identity();
    
    var blinded = stream.blind(4).toArray();
    
    for (i in 0...6) {
      stream.sendEvent(1);
      
      advanceTime(1);
    }
    
    assertEquals([1, 1], blinded);
            
    for (i in 0...5) {
      advanceTime(4);
      stream.sendEvent(2);
    }
    
    assertEquals([1, 1, 2, 2, 2], blinded);
  }
  
  public function testMap():Void {
    var stream: Stream<Int> =  Streams.identity();
    
    var arr1: Iterable<Int> =       [1, 2, 3, 4, 5, 6, 7];
    
    var streamMap =                 stream.map(function(v) { return v * 2; });
    
    assertEquals(pump(stream, arr1, streamMap), [2, 4, 6, 8, 10, 12, 14]);
  }
  
  public function testFlatMap():Void {
    var stream: Stream<Int> = Streams.identity();
   
    var mappedStreams: Array<Stream<Int>> = [Streams.identity(), Streams.identity(), Streams.identity()];
   
    var flattened = stream.flatMap(function(x) { 
      return switch(x) { 
        case 1: mappedStreams[0]; 
        case 2: mappedStreams[1]; 
        case 3: mappedStreams[2]; 
        default: throw "error"; null; 
      }
    });
   
    var farray = flattened.toArray();
   
    stream.sendEvent(1);
    mappedStreams[0].sendEvent(666);
    assertEquals(666, farray.pop());
   
    stream.sendEvent(2);
    mappedStreams[1].sendEvent(333);
    assertEquals(333, farray.pop());
   
    stream.sendEvent(3);
    mappedStreams[2].sendEvent(777);
    assertEquals(777, farray.pop());
  }

  public function testScanl():Void {
    var stream =    stream();
    var stream2 =   Streams.identity();
    
    var arr1: Iterable<Int> = [1, 2, 3];
    
    var sScanl =        stream.scanl("apple", function(v1, v2) { return v1 + ": " + Std.string(v2); }).toArray();
    var sScanlNull =    stream2.scanl("apple", function(v1, v2) { return v1 + ": " + Std.string(v2); }).toArray();
    
    voidPump(stream, arr1);
    
    assertEquals([], sScanlNull);
    assertEquals(["apple: 1", "apple: 1: 2", "apple: 1: 2: 3"], sScanl);
  }
  
  public function testScanlP():Void {
    var stream: Stream<Int> = Streams.identity();
    
    var arr1: Iterable<Int> = [1, 2, 3, 4, 5, 6, 7];
    
    var sScanlP = stream.scanlP(function(v1, v2) { return v1 + v2; });
    
    assertEquals(pump(stream, arr1, sScanlP), [1, 3, 6, 10, 15, 21, 28]);
  }
  public function testTake():Void {
    var stream: Stream<Int> = Streams.identity();
    
    var arr1: Iterable<Int> = [1, 2, 3, 4, 5, 6, 7];
    var arr2: Iterable<Int> = [];
    
    assertEquals(pump(stream, arr1, stream.take(3)), [1, 2, 3]);
    assertEquals(pump(stream, arr1, stream.take(0)), []);
    assertEquals(pump(stream, arr2, stream.take(3)), []);
    assertEquals(pump(stream, arr1, stream.take(9)), [1, 2, 3, 4, 5, 6, 7]);
  }
  
  public function testTakeWhile():Void {
    var stream: Stream<Int> = Streams.identity();
    
    var arr1: Iterable<Int> = [1, 2, 3, 4, 5, 6, 7];
    var arr2: Iterable<Int> = [];
    
    var lessThanFour =      function(v) { return v < 4; }
    var lessThanTen =       function(v) { return v < 10; }
    var greaterThanTwo =    function(v) { return v > 2; }
    
    assertEquals(pump(stream, arr1, stream.takeWhile(lessThanFour)), [1, 2, 3]);
    assertEquals(pump(stream, arr1, stream.takeWhile(greaterThanTwo)), []);
    assertEquals(pump(stream, arr2, stream.takeWhile(lessThanFour)), []);
    assertEquals(pump(stream, arr1, stream.takeWhile(lessThanTen)), [1, 2, 3, 4, 5, 6, 7]);
  }
 
  public function testShift():Void {
    var stream: Stream<Int> = Streams.identity();
    
    var arr1: Iterable<Int> = [1, 2, 3, 4, 5, 6, 7];
    
    assertEquals([1, 2], pump(stream, arr1, stream.shift(5)));
  }
  
  public function testShiftWhile():Void {
    var stream: Stream<Int> = Streams.identity();
    
    var arr1: Iterable<Int> = [1, 2, 3, 4, 5, 6, 7];
    
    var lessThanFour = function(v) { return v < 4; }
    
    assertEquals([1, 2, 3, 4], pump(stream, arr1, stream.shiftWhile(lessThanFour)));
  }
  
  public function testShiftWith():Void {
    var stream: Stream<Int> =  Streams.identity();
    
    var arr1: Iterable<Int> =       [1, 2, 3, 4, 5, 6, 7];
    var arr2: Iterable<Int> =       [9, 8];
    
    assertEquals([9, 8, 1, 2, 3, 4, 5], pump(stream, arr1, stream.shiftWith(arr2)));
  }
  
  public function testDrop():Void {
    var stream: Stream<Int> =  Streams.identity();
    
    var arr1: Iterable<Int> =       [1, 2, 3, 4, 5, 6, 7];
    
    assertEquals([5, 6, 7], pump(stream, arr1, stream.drop(4)));
    assertEquals([], pump(stream, arr1, stream.drop(20)));
  }
  
  public function testDropWhile():Void {
    var stream: Stream<Int> =  Streams.identity();
    
    var arr1: Iterable<Int> =       [1, 2, 3, 4, 5, 6, 7];
    
    var lessThanThree = function(v) { return v < 3; }
    
    assertEquals([3, 4, 5, 6, 7], pump(stream, arr1, stream.dropWhile(lessThanThree)));
    assertEquals([1, 2, 3, 4, 5, 6, 7], pump(stream, arr1, stream.dropWhile(function(v) { return v > 100; })));
  }
  
  public function testPartition():Void {
    var stream: Stream<Int> = Streams.identity();
    
    var arr1: Iterable<Int> =   [1, 2, 3, 4, 5, 6, 7];
    var greaterThanFive =       function(v) { return v > 5; }
    
    var partition =     stream.partition(greaterThanFive);
    var partitioned =   pumpTuple2(stream, arr1, partition._1.toArray(), partition._2.toArray());
    
    assertEquals([6, 7], partitioned._1);
    assertEquals([1, 2, 3, 4, 5], partitioned._2);
  }
  
  public function testPartitionWhile():Void {
    var stream: Stream<Int> = Streams.identity();
    
    var arr1: Iterable<Int> = [1, 2, 3, 4, 5, 6, 7];
    
    var lessThanTwo =       function(v) { return v < 2; }
    var lessThanOne =       function(v) { return v < 1; }
    var lessThanTwenty =    function(v) { return v < 20; }
    
    
    
    assertEquals([1], pump(stream, arr1, stream.partition(lessThanTwo)._1));
    assertEquals([2, 3, 4, 5, 6, 7], pump(stream, arr1, stream.partition(lessThanTwo)._2));
    
    assertEquals([], pump(stream, arr1, stream.partition(lessThanOne)._1));
    assertEquals([1, 2, 3, 4, 5, 6, 7], pump(stream, arr1, stream.partition(lessThanOne)._2));
    
    assertEquals([1, 2, 3, 4, 5, 6, 7], pump(stream, arr1, stream.partition(lessThanTwenty)._1));
    assertEquals([], pump(stream, arr1, stream.partition(lessThanTwenty)._2));
  }
  
  public function testFilter():Void {
    var stream: Stream<Int> =  Streams.identity();
    
    var arr1: Iterable<Int> =       [1, 2, 3, 4, 5, 6, 7];
    var arr0: Iterable<Int> =       [];
    
    var equalsThree = function(v) { return v == 3; }
    
    assertEquals([], pump(stream, arr0, stream.filter(equalsThree)));
    assertEquals([3], pump(stream, arr1, stream.filter(equalsThree)));
  }
  
  public function testFilterWhile():Void {
    var stream: Stream<Int> =  Streams.identity();
    var arr1: Iterable<Int> =       [1, 2, 3, 4, 5, 6, 7];
    var arr0: Iterable<Int> =       [];
    
    var lessThanSeven =     function(v) { return v < 7; }
    var greaterThanEight =  function(v) { return v > 8; }
    var equalsZero =        function(v) { return v == 0; }
    
    assertEquals([1, 2, 3, 4, 5, 6], pump(stream, arr1, stream.filterWhile(lessThanSeven)));
    assertEquals([], pump(stream, arr1, stream.filterWhile(greaterThanEight)));
    assertEquals([], pump(stream, arr0, stream.filterWhile(lessThanSeven)));
    assertEquals([], pump(stream, arr1, stream.filterWhile(equalsZero)));
  }
 
  public function testZip():Void {
    var stream: Stream<Int> = Streams.identity();
    
    var arr0: Iterable<Int> = [];
    var arr1: Iterable<Int> = [1, 2, 3, 4, 5, 6, 7];
    
    var zipped = stream.zip(stream.shift(2)).map(function(t) { return t._1 * t._2; });
    
    assertEquals([], pump(stream, arr0, zipped));
    assertEquals([3, 8, 15, 24, 35], pump(stream, arr1, zipped));
  }
  
  public function testZip3():Void {
    var stream: Stream<Int> = Streams.identity();
    
    var arr0: Iterable<Int> = [];
    var arr1: Iterable<Int> = [1, 2, 3, 4, 5, 6, 7];
    
    var zipped = stream.zip3(stream, stream).map(function(t) { return t._1 + t._2 - t._3; });
    
    assertEquals([], pump(stream, arr0, zipped));
    assertEquals([1, 2, 3, 4, 5, 6, 7], pump(stream, arr1, zipped));
  }
  
  public function testZip4():Void {
    var stream: Stream<Int> = Streams.identity();
    
    var stream2 = stream.map(function(v) { return v + 1; });
    var stream3 = stream.map(function(v) { return v * 2; });
    var stream4 = stream.map(function(v) { return v - 1; });
    
    var arr0: Iterable<Int> = [];
    var arr1: Iterable<Int> = [1, 2, 3, 4, 5, 6, 7];
    
    var zipped = stream.zip4(stream2, stream3, stream4).toArray();
    
    voidPump(stream, arr0);
    
    assertEquals([], zipped);
    
    voidPump(stream, arr1);
    
    var testArray = [];
    
    for (e in zipped)
        testArray.push([e._1, e._2, e._3, e._4]);
    
    assertEquals([[1, 2, 2, 0], [2, 3, 4, 1], [3, 4, 6, 2], [4, 5, 8, 3], [5, 6, 10, 4], [6, 7, 12, 5], [7, 8, 14, 6]], testArray);
  }
  
  public function testZip5():Void {
    var stream: Stream<Int> = Streams.identity();
    
    var stream2 = stream.map(function(v) { return Std.int(v + 1); });
    var stream3 = stream.map(function(v) { return Std.int(v * 2); });
    var stream4 = stream.map(function(v) { return Std.int(v - 1); });
    var stream5 = stream.map(function(v) { return Std.int(v  / 2 * 10); });
    
    var arr0: Iterable<Int> = [];
    var arr1: Iterable<Int> = [1, 2, 3, 4, 5, 6, 7];
    
    var zipped = stream.zip5(stream2, stream3, stream4, stream5).toArray();
    
    voidPump(stream, arr0);
    
    assertEquals([], zipped);
    
    voidPump(stream, arr1);
    
    var testArray = [];
    
    for (e in zipped)
      testArray.push([e._1, e._2, e._3, e._4, e._5]);
    
    assertEquals([[1, 2, 2, 0, 5], [2, 3, 4, 1, 10], [3, 4, 6, 2, 15], [4, 5, 8, 3, 20], [5, 6, 10, 4, 25], [6, 7, 12, 5, 30], [7, 8, 14, 6, 35]], testArray);
  }
  
  public function testGroup():Void {
    var stream: Stream<Int> = Streams.identity();
    
    var arr0: Array<Int> = [];
    var arr1: Array<Int> = [1, 2, 2, 3, 4, 5, 5, 5, 6, 7];
    
    var grouper = stream.group().toArray();
    
    for (event in arr1) {
      stream.sendEvent(event);
    }
    
    var testArray = [];
    
    for (e in grouper) {
      var curArray = [];
      for (i in e) {
        curArray.push(i);
      }
      testArray.push(curArray);
    }
    
    assertEquals([[1], [2, 2], [3], [4], [5, 5, 5], [6]], testArray);
  }

  public function testGroupBy():Void {
    var stream: Stream<String> = Streams.identity();
    
    var arr1: Iterable<String> = ["foo", "bar", "blat", "bit", "a", "chip", "chop", "dog"];
    var cmp = function(v1, v2) { return v1.length == v2.length; };
    
    var grouper = stream.groupBy(cmp).toArray();
    
    for (event in arr1) {
      stream.sendEvent(event);
    }
    
    var grouped: Array<Array<String>> = [];
    
    for (i in grouper) {
      grouped.push(i.toArray());
    }
    
    assertEquals(grouped, [["foo", "bar"], ["blat"], ["bit"], ["a"], ["chip", "chop"]]);
  }

  public function testMerge():Void {
    var stream:  Stream<Int> = Streams.identity();
    var stream1: Stream<Int> = Streams.identity();
    var stream2: Stream<Int> = Streams.identity();
    
    var arr0: Iterable<Int> = [];
    var arr1: Iterable<Int> = [1, 2, 3, 4, 5, 6, 7];
    var arrT: Array<Int> = [4, 5, 6];
    
    var newMerge = stream.merge(stream2).toArray();
    
    for (e in arr1) {
      stream.sendEvent(e);
    }
    
    for (i in arrT) {
      stream2.sendEvent(i);
    }
    
    var test = newMerge;
    var merged = stream1.merge(stream1);
    
    assertEquals([], pump(stream, arr0, merged));
    assertEquals([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7], pump(stream1, arr1, merged));
    assertEquals([1, 2, 3, 4, 5, 6, 7, 4, 5, 6], test);
  }
  
  public function testUniqueSteps():Void {
    var stream: Stream<Int> =  Streams.identity();
    var stream2: Stream<Int> = Streams.identity();
    
    var arrT: Array<Int> =  [4, 5, 6];
    var arrT2: Array<Int> = [4, 5, 6];
    
    var streams = stream.merge(stream2).merge(stream.map(function(v) { return v + 1; }));
    
    var uniques = streams.uniqueSteps().toArray();
    
    voidPump(stream, arrT);
    voidPump(stream2, arrT2);
    
    assertEquals([4, 5, 6, 4, 5, 6], uniques);
  }
  
  public function testUniqueEvents():Void {
    var stream: Stream<Int> = Streams.identity();
    var arr: Array<Int> = [4, 5, 6, 7];
    
    var streams = stream.merge(stream.map(function(v) { return v; })).merge(stream.map(function(t) { return t + 4; }));
    
    var uniques = streams.uniqueEvents().toArray();
    
    voidPump(stream, arr);
    
    assertEquals([4, 8, 5, 9, 6, 10, 7, 11], uniques);
  }
  
  public function testUnique():Void {
    var stream:     Stream<Int> = Streams.identity();
    var stream2:    Stream<Int> = Streams.identity();
    
    var arr:  Array<Int> = [4, 5, 6, 7];
    var arr2: Array<Int> = [1, 2, 3, 4];
    var streams = stream.merge(stream.map(function(v) { return v; })).merge(stream.map(function(t) { return t + 4; })).merge(stream2);
    
    var uniques = streams.unique().toArray();
    
    voidPump(stream2, arr2);
    voidPump(stream, arr);
    
    assertEquals([1, 2, 3, 4, 5, 6, 7], uniques);
  }
  
  public function testFilterRepeats():Void {
    var stream = stream();
    
    var arr0: Iterable<Int> = [];
    var arr1: Iterable<Int> = [1, 2, 3, 3, 2, 0, 7, 7, 4, 5, 6, 7];
    
    var filtered = stream.filterRepeats();
    
    assertEquals([], pump(stream, arr0, filtered));
    assertEquals([1, 2, 3, 2, 0, 7, 4, 5, 6, 7], pump(stream, arr1, filtered));
  }
  
  public function testFilterRepeatsBy():Void {
    var stream = stream();
    
    var arr0: Iterable<Int> = [];
    var arr1: Iterable<Int> = [2, 2, 4, 8, 0, 0, 7, 7, 4, 5, 10, 7];
    
    var cmp = function(v1: Int, v2: Int): Bool { return v1 == v2 / 2; };
    var filteredBy = stream.filterRepeatsBy(1, cmp);
    
    assertEquals([], pump(stream, arr0, filteredBy));
    assertEquals([4,0,7,7,4,5,7], pump(stream, arr1, filteredBy));
  }
  
  public function testSnapshot():Void {
    var stream = stream();
    
    var mySignal = Streams.identity().startsWith(0);
    mySignal.changes().sendEvent(4);
    
    var snapshot = stream.snapshot(mySignal).toArray();
    var arr1: Iterable<Int> = [2, 8];
    
    for (e in arr1) {
      stream.sendEvent(e);
    }
    
    mySignal.changes().sendEvent(6);
    
    for (e in arr1) {
      stream.sendEvent(e);
    }
    
    assertEquals([4, 4, 6, 6], snapshot);
  }

/*
* -----------------  Collections Tests  -------------------
* Missing: 
* Broken:  
*/
  public function testCollectionsToStream():Void {
    setupTimingTest();
    
    var stream = Collections.toStream([1, 2, 3, 4], 5);
    var contents = stream.toArray();
    
    assertEquals(5, _timeouts[0].timeout);
    
    _now = 5;
    _timeouts[0].func();
    
    assertEquals(1, contents.pop());
    
    assertEquals(10, _timeouts[0].timeout);
    
    _now = 10;
    _timeouts[0].func();
    
    assertEquals(2, contents.pop());
    
    assertEquals(15, _timeouts[0].timeout);
    
    _now = 15;
    _timeouts[0].func();
    
    assertEquals(3, contents.pop());
    
    assertEquals(20, _timeouts[0].timeout);
    
    _now = 20;
    _timeouts[0].func();
   
    assertEquals(4, contents.pop());
  }
  
  public function testCollectionsToStreamS():Void {
    setupTimingTest();
    
    var timeSignal = Signals.constant(2);
    var stream = Collections.toStreamS([1, 2, 3, 4, 5], timeSignal);
    var contents = stream.toArray();
    
    _now = 0;
    assertEquals([], contents);
    assertEquals(2, _timeouts[0].timeout);
    
    _now = 2;
    _timeouts[0].func();
    
    assertEquals(1, contents.pop());
    
    assertEquals(4, _timeouts[0].timeout);
    
    _now = 4;
    _timeouts[0].func();
    
    assertEquals(2, contents.pop());
    
    assertEquals(6, _timeouts[0].timeout);
    
    _now = 6;
    _timeouts[0].func();
    
    assertEquals(3, contents.pop());
    
    assertEquals(8, _timeouts[0].timeout);
    
    _now = 8;
    _timeouts[0].func();
    
    assertEquals(4, contents.pop());
  }
/*
* -----------------  Streams Tests  -------------------
* Missing: 
* Broken:  
*/

  public function testStreamsCreate():Void {
    var stream1:  Stream<Int> = Streams.identity();
    var stream2:  Stream<Int> = Streams.identity();
    
    var streams:Iterable<Stream<Int>> = [stream1, stream2];
    
    var arr1: Iterable<Int> = [2, 2, 4, 8];
    
    var newStream = Streams.create(function(pulse) { return propagate(pulse); }, streams).toArray();
    
    for (i in arr1) {
      stream1.sendEvent(i);
      stream2.sendEvent(i + 1);
    }
    
    assertEquals([2, 3, 2, 3, 4, 5, 8, 9], newStream);
  }
  
  public function testStreamsIdentity():Void {
    var stream:  Stream<Int> = Streams.identity();
    
    var pumped = stream.toArray();
    
    voidPump(stream, [99, 99, 99, 99]);
    
    assertEquals([99, 99, 99, 99], pumped);
  }
  
  public function testStreamsReceiver():Void {
    var stream:  Stream<Int> = Streams.receiver();
    
    var pumped = stream.toArray();
    
    voidPump(stream, [99, 99, 99, 99]);
    
    assertEquals([99, 99, 99, 99], pumped);
  }
   
  public function testStreamsMerge():Void {
    var stream1:  Stream<Int> = Streams.identity();
    var stream2:  Stream<Int> = Streams.identity();
    var stream3:  Stream<Int> = Streams.identity();
    
    var mergeArray:Iterable<Stream<Int>> = [stream1, stream2, stream3];
    
    var arr1: Iterable<Int> = [2, 2, 4, 8];
    var arr2: Iterable<Int> = [9, 8, 7];
    
    var merged = Streams.merge(mergeArray).toArray();
    
    for (i in arr1) {
      stream1.sendEvent(i);
      stream2.sendEvent(i + 1);
    }
    
    voidPump(stream3, arr2);
    
    assertEquals([2, 3, 2, 3, 4, 5, 8, 9, 9, 8, 7], merged);
  }
  
  public function testStreamsZero():Void {
    var stream0: Stream<Int> = Streams.zero();
    
    var message: String = "";
    
    try {
      stream0.sendEvent("something");
    }
    catch(e: Dynamic) {
      message = Std.string(e);
    }
    
    assertEquals("zeroE : received a value; zeroE should not receive a value; the value was something", message);
  }
  
  public function testStreamsOne():Void {
    setupTimingTest();
    
    var stream:  Stream<Int> = Streams.one(100);
    
    var contents = stream.toArray();
    
    var self = this;
    
    var bundle = _timeouts.pop();
    
    assertEquals(0, bundle.timeout);
    
    bundle.func();
    
    assertEquals([100], contents);
  }
 
  public function testStreamsConstant():Void {
    var stream1 = Streams.identity();
    var stream2 = stream1.map(function(v) { return v * 2; });
    
    var mergeArray:Iterable<Stream<Int>> = [stream1, stream2];
    
    var arr1: Iterable<Int> = [2, 2, 4, 8];
    
    var constant = Streams.constant(9, mergeArray).toArray();
    
    for (i in arr1) {
      stream1.sendEvent(i);
    }
    
    assertEquals([9, 9, 9, 9, 9, 9, 9, 9], constant);
  }
  
  public function testStreamsCond():Void {
    var boolStream: Stream<Bool> =      Streams.identity();
    var ifTrueStream: Stream<String> =  boolStream.map(function(v) { return "Is True"; } );
    
    var conditions: Iterable<Tuple2<Stream<Bool>, Stream<String>>> = [Tuple2.create(boolStream, ifTrueStream)];
    var boolArray = [true, false, true];
    
    var conded = Streams.cond(conditions).toArray();
    
    voidPump(boolStream, boolArray);
    
    assertEquals(["Is True", "Is True"], conded);
  }
  
  public function testTimer(): Void {
    setupTimingTest();
    
    var stream = Streams.timer(5);
    
    var output = stream.toArray();
    
    assertTimeoutExists(5);
    
    advanceTime(25);
    
    assertEquals(30, _timeouts[0].timeout);
    assertEquals(25, output.pop());
  }
    
  public function testTimerS(): Void {
    setupTimingTest();
    
    var stream = Streams.timerS(Signals.constant(10));
    
    var output = stream.toArray();
    
    assertTimeoutExists(10);
    
    advanceTime(50);
    
    assertEquals(60, _timeouts[0].timeout);
    assertEquals(50, output.pop());
  }
  
  public function testStreamZipN():Void {
    var stream1 = Streams.identity();
    var stream2 = stream1.map(function(v) { return v + 1; });
    
    var iterables: Iterable<Stream<Int>> = [stream1, stream2];
    
    var arr1: Iterable<Int> = [2, 2, 4, 8];
    
    var zipped = Streams.zipN(iterables).toArray();
    
    for (i in arr1) {
      stream1.sendEvent(i);
    }
    
    var testArray = [];
    
    for (e in zipped) {
      var curArray = [];
      for (i in e) {
        curArray.push(i);
      }
      testArray.push(curArray);
    }
    
    assertEquals([[2, 3], [2, 3], [4, 5], [8, 9]], testArray);
  }
  
  public function testRandom(): Void {
    setupTimingTest();
    
    var stream = Streams.random(10);
    
    var output = stream.toArray();
    
    assertTimeoutExists(10);
    
    advanceTime(40);
    
    var randomsReturned = true;
    
    for (i in 0...output.length) {
      var digit = output[i];
      
      if (!Std.is(digit, Float))  randomsReturned = false;
      if (digit == null)          randomsReturned = false;
      if (digit == Math.NaN)      randomsReturned = false;
      if (digit > 1.0 || digit < 0.0)   randomsReturned = false;
    }
    
    assertEquals(randomsReturned, true);
  }
  
  public function testRandomS(): Void {
    setupTimingTest();
    
    var b = Signals.constant(5);
    var stream = Streams.randomS(b);
    
    var output = stream.toArray();
    
    assertTimeoutExists(5);
    
    advanceTime(40);
    
    var randomsReturned = true;
    
    for (i in 0...output.length) {
      var digit = output[i];
      
      if (!Std.is(digit, Float))  randomsReturned = false;
      if (digit == null)          randomsReturned = false;
      if (digit == Math.NaN)      randomsReturned = false;
      if (digit > 1.0 || digit < 0.0)   randomsReturned = false;
    }
    
    assertEquals(randomsReturned, true);
  }
    
/*
* -----------------  StreamBool Tests  -------------------
* Missing: 
* Broken:  
*/
  public function testStreamBoolNot():Void {
    var stream  = stream();
    var boolArr = [true, false, true];
    
    var not = StreamBool.not(stream).toArray();
    
    voidPump(stream, boolArr);
    
    assertEquals([false, true, false], not);
  }
  
  public function testStreamBoolAnd():Void {
    var stream = stream();
    
    var iterables:Iterable<Stream<Bool>> =  [stream, stream];
    var iterables2:Iterable<Stream<Bool>> = [stream, stream.map(function(v) { return false; })];
    
    var boolArr =  [true, true, true];
    
    var and =  StreamBool.and(iterables).toArray();
    var and2 = StreamBool.and(iterables2).toArray();
    
    voidPump(stream, boolArr);
    
    assertEquals([true, true, true], and);
    assertEquals([false, false, false], and2);
  }

  public function testStreamBoolOr():Void {
    var stream = stream();
    
    var index = 0;
    var mappedValues = [true, false, false];
    
    var iterables:Iterable<Stream<Bool>> = [stream, stream.map(function(v) { return mappedValues[index++]; })];
    
    var boolArr =  [true, false, true];
    
    var or = StreamBool.or(iterables).toArray();
    
    voidPump(stream, boolArr);
    
    assertEquals([true, false, true], or);
  }
  
  public function testStreamBoolIfTrue():Void {
    var stream =  stream();
    var boolArr = [false, true, false];
    
    var ifTrue =   stream.map(function(v) { return "Is True"; });
    var ifFalse =  stream.map(function(v) { return "Is False"; });
    
    var evaluator = StreamBool.ifTrue(stream, ifTrue, ifFalse).toArray();
    
    voidPump(stream, boolArr);
    
    assertEquals(["Is False", "Is True", "Is False"], evaluator);
  }

/*
* -----------------  StreamStream Tests  -------------------
* Missing: 
* Broken:  
*/
  public function testStreamStreamFlatten():Void {
    var stream =  stream();
    
    var iterables: Stream<Stream<Bool>> = Streams.identity();
    var boolArr =  [true, true, true];
    
    var flattened = StreamStream.flatten(iterables).toArray();
    
    iterables.sendEvent(stream);
    iterables.sendEvent(stream.map(function(v) { return false; }));
    
    voidPump(stream, boolArr);
    
    assertEquals([false, false, false], flattened);
    
    iterables.sendEvent(stream);
    voidPump(stream, boolArr);
    
    assertEquals([false, false, false, true, true, true], flattened);
  }
  
  public function testStreamStreamSwitchE():Void {
    var stream = stream();
    
    var iterables: Stream<Stream<Bool>> = Streams.identity();
    var boolArr =  [true, true, true];
    
    var switchEed = StreamStream.switchE(iterables).toArray();
    
    iterables.sendEvent(stream);
    iterables.sendEvent(stream.map(function(v) { return false; }));
    
    voidPump(stream, boolArr);
    
    assertEquals([false, false, false], switchEed);
    
    iterables.sendEvent(stream);
    voidPump(stream, boolArr);
    
    assertEquals([false, false, false, true, true, true], switchEed);
  }
  
  public function testStreamStreamJoin():Void {
    var stream = stream();
    
    var iterables: Stream<Stream<Bool>> = Streams.identity();
    var boolArr =  [true, true, true];
    
    var joined = StreamStream.join(iterables).toArray();
    
    iterables.sendEvent(stream);
    iterables.sendEvent(stream.map(function(v) { return false; }));
    
    voidPump(stream, boolArr);
    
    assertEquals([false, false, false], joined);
    
    iterables.sendEvent(stream);
    voidPump(stream, boolArr);
    
    assertEquals([false, false, false, true, true, true], joined);
  }

/*
* -----------------  SignalTests  -------------------
* Missing: 
* Broken:  
*/
    
  public function testSignalChanges():Void {
    var stream = stream();
    
    var mySignal = Streams.identity().startsWith(0);
    var array = mySignal.changes().toArray();
    
    mySignal.changes().sendEvent(4);
    mySignal.changes().sendEvent(3);
    
    assertEquals([4, 3], array);
  }
  
  public function testSignalValueNow():Void {
    var stream = stream();
    
    var mySignal = Streams.identity().startsWith(0);
    
    mySignal.changes().sendEvent(3);
    
    assertEquals(3, mySignal.valueNow());
  }
  
  public function testSignalMapC():Void {
    var stream = stream();
    
    var mapper: Stream<Int> -> Stream<Int> = function(v: Stream<Int>) { return v.map(function(val) { return val + 1; }); };
    var signalArray = [1, 2, 3, 4, 5];
    var mySignal = Streams.identity().startsWith(0);
    
    var array = mySignal.mapC(mapper).changes().toArray();
    
    for (i in signalArray) {
      mySignal.changes().sendEvent(i);
    }
    
    assertEquals([2, 3, 4, 5, 6], array);
  }
  
  public function testSignalMap():Void {
    var stream = stream();
    
    var mapper: Int -> String = function(v) { return Std.string(v) + ": Iterating"; };
    var signalArray = [1, 2, 3, 4, 5];
    var mySignal = Streams.identity().startsWith(0);
    
    var array = mySignal.map(mapper).changes().toArray();
    
    for (i in signalArray) {
      mySignal.changes().sendEvent(i);
    }
    
    assertEquals(["1: Iterating", "2: Iterating", "3: Iterating", "4: Iterating", "5: Iterating"], array);
  }
  
  public function testSignalMapS():Void {
    var streamM = stream();
    
    var stream:  Stream<Int -> String> =   Streams.identity();
    
    var beFunc = stream.startsWith(function(v) { return Std.string(v); });
    
    var signalArray = [1, 2];
    var mySignal = Streams.identity().startsWith(0);
    
    var array = mySignal.mapS(beFunc).changes().toArray();
    
    stream.sendEvent(function(v) { return Std.string(v) + ": String"; });
    
    for (i in signalArray) {
      mySignal.changes().sendEvent(i);
    }
    
    assertEquals(["1: String", "2: String"], array);
  }
  
  public function testSignalZip():Void {
    var mySignal = stream().startsWith(0);
    
    var mappedSignal = mySignal.map(function(v) { return v + 1; });
    
    var zipped: Signal<Tuple2<Int, Int>> = mySignal.zip(mappedSignal);
    
    var all = zipped.changes().toArray();
    
    assertEquals(Tuple2.create(0, 1), zipped.valueNow());
    
    mySignal.sendSignal(2);
    
    assertEquals(Tuple2.create(2, 3), zipped.valueNow());
    
    mySignal.sendSignal(3);
    
    assertEquals(Tuple2.create(3, 4), zipped.valueNow());
  }
  
  public function testSignalZip3():Void {
    var mySignal = stream().startsWith(0);
    
    var mappedSignal1 = mySignal.map(function(v) { return v + 1; });
    var mappedSignal2 = mappedSignal1.map(function(v) { return v + 1; });
    
    var zipped = mySignal.zip3(mappedSignal1, mappedSignal2);
    
    assertEquals(Tuple3.create(0, 1, 2), zipped.valueNow());
    
    mySignal.sendSignal(2);
    
    assertEquals(Tuple3.create(2, 3, 4), zipped.valueNow());
    
    mySignal.sendSignal(3);
    
    assertEquals(Tuple3.create(3, 4, 5), zipped.valueNow());
  }
    
  public function testSignalZip4():Void {
    var mySignal = stream().startsWith(0);
    
    var mappedSignal1 = mySignal.map(function(v) { return v + 1; });
    var mappedSignal2 = mappedSignal1.map(function(v) { return v + 1; });
    var mappedSignal3 = mappedSignal2.map(function(v) { return v * 2; });
    
    var zipped = mySignal.zip4(mappedSignal1, mappedSignal2, mappedSignal3);
    
    assertEquals(Tuple4.create(0, 1, 2, 4), zipped.valueNow());
    
    mySignal.sendSignal(2);
    
    assertEquals(Tuple4.create(2, 3, 4, 8), zipped.valueNow());
    
    mySignal.sendSignal(3);
    
    assertEquals(Tuple4.create(3, 4, 5, 10), zipped.valueNow());
  }
  
  public function testSignalZip5():Void {
    var mySignal = stream().startsWith(0);
    
    var mappedSignal1 = mySignal.map(function(v) { return v + 1; });
    var mappedSignal2 = mappedSignal1.map(function(v) { return v + 1; });
    var mappedSignal3 = mappedSignal2.map(function(v) { return v * 2; });
    var mappedSignal4 = mappedSignal3.map(function(v) { return v * 2 - 10; });
    
    var zipped = mySignal.zip5(mappedSignal1, mappedSignal2, mappedSignal3, mappedSignal4);
    
    assertEquals(Tuple5.create(0, 1, 2, 4, -2), zipped.valueNow());
    
    mySignal.sendSignal(2);
    
    assertEquals(Tuple5.create(2, 3, 4, 8, 6), zipped.valueNow());
    
    mySignal.sendSignal(3);
    
    assertEquals(Tuple5.create(3, 4, 5, 10, 10), zipped.valueNow());
  }

  public function testSignalZipN():Void {
    var stream = stream();
    
    var signalArray = [0, 1, 2, 3];
    var mySignal = Streams.identity().startsWith(0);
    
    var mySignals: Array<Signal<Int>> = [mySignal, mySignal.map(function(v) { return v + 1; })];
    
    var zipped = mySignal.zipN(mySignals).changes().toArray();
    
    for (i in signalArray) {
      mySignal.changes().sendEvent(i);
    }
           
    var testArray = [];
    
    for (e in zipped) {
      var curArray = [];
      for (i in e) {
        curArray.push(i);
      }
      testArray.push(curArray);
    }
    
    assertEquals([[0, 0, 1], [1, 1, 2], [2, 2, 3], [3, 3, 4]], testArray);
  }
    
  public function testSignalCalm(): Void {
    setupTimingTest();
    var stream = stream();
    
    var mySignal = stream.startsWith(0);
    
    var calmed = mySignal.calm(3);
    var output = calmed.changes().toArray();
    
    stream.sendEvent(0);
    
    for (i in 0...3) {
      advanceTime(2);
      stream.sendEvent(1);
    }
    
    advanceTime(5);
    
    for (i in 0...2) {
      advanceTime(3);
      stream.sendEvent(2);
    }
    
    advanceTime(5);
    
    for (i in 0...3) {
      advanceTime(4);
      stream.sendEvent(3);
    }
    
    advanceTime(5);
    
    for (i in 0...4) {
      advanceTime(1);
      stream.sendEvent(4);
    }
    
    assertEquals([1, 2, 2, 3, 3, 3], output);
  }
  
  public function testSignalBlind(): Void {
    setupTimingTest();
    var stream = stream();
    
    var mySignal = stream.startsWith(0);
    
    var blinded = mySignal.blind(3);
    var output = blinded.changes().toArray();
    
    stream.sendEvent(0);
    
    for (i in 0...3) {
      advanceTime(2);
      stream.sendEvent(1);
    }
    
    advanceTime(5);
    
    for (i in 0...2) {
      advanceTime(3);
      stream.sendEvent(2);
    }
    
    advanceTime(5);
    
    for (i in 0...3) {
      advanceTime(4);
      stream.sendEvent(3);
    }
    
    advanceTime(5);
    
    for (i in 0...5) {
      advanceTime(1);
      stream.sendEvent(4);
    }
    
    assertEquals([0, 1, 2, 3, 3, 3, 4, 4], output);
  }
    
  public function testSignalBlindb(): Void {
    setupTimingTest();
    var stream = stream();
    
    var b = Signals.constant(8);
    var mySignal = stream.startsWith(0);
    
    var blinded = mySignal.blindS(b);
    var output = blinded.changes().toArray();
    
    for (i in 0...5) {
      stream.sendEvent(5);
      advanceTime(7);
    }
    
    advanceTime(10);
    
    for (i in 0...6) {
      stream.sendEvent(1);
      advanceTime(3);
    }
    
    advanceTime(10);
    
    
    for (i in 0...2) {
      stream.sendEvent(10);
      advanceTime(10);
    }
    
    assertEquals([5, 5, 5, 1, 1, 10, 10], output);
  }
  
  public function testSignalCalmS(): Void {
    setupTimingTest();
    var stream = stream();
    
    var b = Signals.constant(4);
    var mySignal = stream.startsWith(0);
    
    var calmed = mySignal.calmS(b);
    var output = calmed.changes().toArray();
    
    stream.sendEvent(0);
    
    for (i in 0...3) {
      stream.sendEvent(99);
    }
    
    advanceTime(5);
    
    for (i in 0...3) {
      advanceTime(3);
      stream.sendEvent(56);
    }
    
    advanceTime(5);
    
    for (i in 0...3) {
      advanceTime(4);
      stream.sendEvent(15);
    }
    
    advanceTime(5);
    
    for (i in 0...4) {
      advanceTime(1);
      stream.sendEvent(4);
    }
    
    advanceTime(5);
    
    assertEquals([99, 56, 15, 15, 15, 4], output);
  }
    
  public function testSignalDelay(): Void {
    setupTimingTest();
    
    var stream2 = Collections.toStream([1, 2, 3, 4], 5).startsWith(0);
    
    var streams = stream2.zip3(stream2.delay(10), stream2.map(function(v) { return v -1; }));
    var output = streams.changes().toArray();
    
    advanceTime(5);
    
    assertEquals(Tuple3.create(1, 0, 0), streams.valueNow());
    
    advanceTime(5);
    
    assertEquals(Tuple3.create(2, 0, 1), streams.valueNow());
    
    advanceTime(5);
      
    assertEquals(Tuple3.create(3, 1, 2), streams.valueNow());
    
    advanceTime(5);
    
    assertEquals(Tuple3.create(4, 2, 3), streams.valueNow());
    
    advanceTime(5);
    
    assertEquals(Tuple3.create(4, 3, 3), streams.valueNow());
    
    advanceTime(5);
    
    assertEquals(Tuple3.create(4, 4, 3), streams.valueNow());
  }
  
  public function testSignalDelayS(): Void {
    setupTimingTest();
    
    var stream2 = Collections.toStream([1, 2, 3, 4], 5).startsWith(0);
    
    var b = Signals.constant(5);
    
    var streams = stream2.zip3(stream2.delayS(b), stream2.map(function(v) { return v -1; }));
    var output = streams.changes().toArray();
    
    advanceTime(5);
    
    assertEquals(Tuple3.create(1, 0, 0), streams.valueNow());
    
    advanceTime(5);
    
    assertEquals(Tuple3.create(2, 1, 1), streams.valueNow());
    
    advanceTime(5);
    
    assertEquals(Tuple3.create(3, 2, 2), streams.valueNow());
    
    advanceTime(5);
    
    assertEquals(Tuple3.create(4, 3, 3), streams.valueNow());
    
    advanceTime(5);
    
    assertEquals(Tuple3.create(4, 4, 3), streams.valueNow());
  }
  
  public function testSignalSend(): Void {
    var mySignal = Streams.identity().startsWith(0);
    
    var signalArray = [1, 2, 3, 4, 5];
    
    for (i in signalArray) {
      mySignal.sendSignal(i);
    }
    
    assertEquals(5, mySignal.valueNow());
  }
    
/*
* -----------------  SignalsTests  -------------------
* Missing:
* Broken:  
*/
    
  public function testSignalsZipN():Void {
    var mySignal =  Streams.identity().startsWith(0);
    var mySignals = [mySignal, mySignal.map(function(v) { return v + 1; })];
    
    var signalArray = [1, 2, 3, 4, 5];
    
    var zipped = Signals.zipN(mySignals).changes().toArray();
    
    for (i in signalArray) {
      mySignal.sendSignal(i);
    }
      
    var testArray = [];
    
    for (e in zipped) {
      var curArray = [];
      for (i in e) {
        curArray.push(i);
      }
      testArray.push(curArray);
    }
    
    assertEquals([[1, 2], [2, 3], [3, 4], [4, 5], [5, 6]], testArray);
  }
  
  public function testSignalsSample():Void {
    setupTimingTest();
    
    var stream = Collections.toStream([1, 2, 3, 4], 5);
    
    var sampled = Signals.sample(10);
    
    var output = sampled.changes().toArray();
    
    advanceTime(60);
    
    assertEquals([10, 20, 30, 40, 50, 60], output);
  }
  
  public function testSignalsSampleS():Void {
    setupTimingTest();
    
    var stream = Collections.toStream([1, 2, 3, 4], 5);
    
    var b =       Signals.constant(15);
    var sampled = Signals.sampleS(b);
    
    var output = sampled.changes().toArray();
    
    advanceTime(60);
    
    assertEquals([15, 30, 45, 60], output);
  }
    
  public function testSignalsCond():Void {
    var trueSignal =  Signals.constant("Is True");
    var falseSignal = Signals.constant("Is False");
    
    var t = Signals.constant(true);
    
    var conditions: Array<Tuple2<Signal<Bool>, Signal<String>>> = [Tuple2.create(t, trueSignal)];
    
    var conded = Signals.cond(conditions, falseSignal);
    
    assertEquals("Is True", conded.valueNow());
    
    t.sendSignal(false);
    
    assertFalse(t.valueNow());
    
    assertEquals("Is False", conded.valueNow());
  }
  
  public function testSignalsConstant():Void {
    var mySignal = Signals.constant(9);
    
    assertEquals(9, mySignal.valueNow());
            
    mySignal.changes().sendEvent(4);
    mySignal.changes().sendEvent(6);
    
    mySignal = Signals.constant(2);
    
    assertEquals(2, mySignal.valueNow());
  }
    
/*
* -----------------  SignalBool Tests  -------------------
* Missing: 
* Broken:  
*/
  public function testSignalBoolNot():Void {
    var mySignal = stream().startsWith(true);
    
    var boolArray = [true, true, false, true];
    
    var not = SignalBool.not(mySignal).changes().toArray();
    
    voidPump(mySignal.changes(), boolArray);
    
    assertEquals([false, false, true, false], not);
  }
  
  public function testSignalBoolIfTrue():Void {
    var mySignal = Signals.constant(true);
    
    var isTrue =  Signals.constant("Is True");
    var isFalse = Signals.constant("Is False");
    
    var evaluator = SignalBool.ifTrue(mySignal, isTrue, isFalse);
    
    assertEquals("Is True", evaluator.valueNow());
    
    mySignal.sendSignal(false);
    
    assertEquals("Is False", evaluator.valueNow());
  }
  
  public function testSignalBoolAnd():Void {
    var mySignal1 =  Signals.constant(true);
    var mySignal2 =  Streams.identity().startsWith(false);
    
    var signals: Iterable<Signal<Bool>> = [mySignal1, mySignal2];
            
    var and = SignalBool.and(signals);
    
    assertFalse(and.valueNow());
    
    mySignal2.sendSignal(true);
    
    assertTrue(and.valueNow());
    
    mySignal1.sendSignal(false);
    
    assertFalse(and.valueNow());
  }
  
  public function testSignalBoolOr():Void {
    var mySignal =  Signals.constant(true);
    var mySignal2 = Signals.constant(false);
    
    var signals: Iterable<Signal<Bool>> =   [mySignal, mySignal2];
            
    var evaluator = SignalBool.or(signals);
    
    assertTrue(evaluator.valueNow());
    
    mySignal.sendSignal(false);
    
    assertFalse(evaluator.valueNow());
    
    mySignal2.sendSignal(true);
    
    assertTrue(evaluator.valueNow());
    
    mySignal.sendSignal(true);
    
    assertTrue(evaluator.valueNow());
  }    
/*
* -----------------  SignalInt Tests  -------------------
*/

  public function testSignalIntPlus():Void {
    var mySignal = Signals.constant(9);
    
    var plus = SignalInt.plus(mySignal, 9);
    
    assertEquals(18, plus.valueNow());
    
    plus = SignalInt.plus(plus, -19);
    assertEquals(-1, plus.valueNow());
  }
  
  public function testSignalIntPlusS():Void {
    var mySignal =    Signals.constant(9);
    var addSignal =   Signals.constant(-3);
    
    var plusS = SignalInt.plusS(mySignal, addSignal);
    
    assertEquals(6, plusS.valueNow());
  }
  
  public function testSignalIntMinus():Void {
    var mySignal = Signals.constant(9);
    
    var minus = SignalInt.minus(mySignal, 9);
    
    assertEquals(0, minus.valueNow());
    
    minus = SignalInt.minus(minus, -19);
    
    assertEquals(19, minus.valueNow());
  }
  
  public function testSignalIntMinusS():Void {
    var mySignal =    Signals.constant(9);
    var minusSignal = Signals.constant(-3);
    
    var minusS = SignalInt.minusS(mySignal, minusSignal);
    
    assertEquals(12, minusS.valueNow());
  }
  
  
  public function testSignalIntTimes():Void {
    var mySignal = Signals.constant(4);
    
    var times = SignalInt.times(mySignal, 3);
    
    assertEquals(12, times.valueNow());
  }
  
  public function testSignalIntTimesS():Void {
    var mySignal =    Signals.constant(2);
    var timesSignal = Signals.constant(-5);
    
    var timesS = SignalInt.timesS(mySignal, timesSignal);
    
    assertEquals(-10, timesS.valueNow());
  }
  
  public function testSignalIntMod():Void {
    var mySignal = Signals.constant(12);
    
    var mod = SignalInt.mod(mySignal, 3);
    
    assertEquals(0, mod.valueNow());
    
    mod = SignalInt.mod(mySignal, 5);
    
    assertEquals(2, mod.valueNow());
  }
  
  public function testSignalIntModS():Void {
    var mySignal =    Signals.constant(12);
    var modSignal =   Signals.constant(2);
    
    var mod = SignalInt.modS(mySignal, modSignal);
    
    assertEquals(0, mod.valueNow());
    
    mySignal.sendSignal(13);
    
    assertEquals(1, mod.valueNow());
  }
  
  public function testSignalIntDividedBy():Void {
    var mySignal = Signals.constant(24);
    
    var divided = SignalInt.dividedBy(mySignal, 6);
    
    assertEquals(4, divided.valueNow());
    
    mySignal.sendSignal(-12);
    
    assertEquals(-2, divided.valueNow());
  }
  
  public function testSignalIntDividedByS():Void {
    var mySignal =    Signals.constant(24);
    var divSignal =   Signals.constant(2);
    
    var divided = SignalInt.dividedByS(mySignal, divSignal);
    
    assertEquals(12, divided.valueNow());
    
    mySignal.sendSignal(12);
    
    assertEquals(6, divided.valueNow());
  }
  
  public function testSignalIntAbs():Void {
    var mySignal = Signals.constant(-24);
    
    var abs = SignalInt.abs(mySignal);
    
    assertEquals(24, abs.valueNow());
  }
  
  public function testSignalIntNegate():Void {
    var mySignal = Signals.constant(0);
    
    var negate = SignalInt.negate(mySignal);
    
    assertEquals(0, negate.valueNow());
    
    mySignal.sendSignal(6);
    
    assertEquals(-6, negate.valueNow());
  }
  
  public function testSignalIntToFloat():Void {
    var mySignal = Signals.constant(2);
    
    var toFloat = SignalInt.toFloat(mySignal);
    
    assertEquals(2.0, toFloat.valueNow());
  }

/*
* -----------------  SignalFloat Tests  -------------------
* Missing: 
* Broken:  
*/

  public function testSignalFloatPlus():Void {
    var mySignal = Signals.constant(9.5);
    
    var plus = SignalFloat.plus(mySignal, 8.5);
    
    assertEquals(18.0, plus.valueNow());
    
    mySignal.sendSignal(-10);
    assertEquals(-1.5, plus.valueNow());
  }
  
  public function testSignalFloatPlusS():Void {
    var mySignal =    Signals.constant(9.5);
    var addSignal =   Signals.constant(-3.0);
    
    var plusS = SignalFloat.plusS(mySignal, addSignal);
    
    assertEquals(6.5, plusS.valueNow());
  }
  
  public function testSignalFloatMinus():Void {
    var mySignal = Signals.constant(8.5);
    
    var minus = SignalFloat.minus(mySignal, 9.0);
    
    assertEquals(-0.5, minus.valueNow());
    
    mySignal.sendSignal(-9.5);
    
    assertEquals(-18.5, minus.valueNow());
  }
  
  public function testSignalFloatMinusS():Void {
    var mySignal =    Signals.constant(-4.5);
    var minusSignal = Signals.constant(-5.0);
    
    var minusS = SignalFloat.minusS(mySignal, minusSignal);
    
    assertEquals(0.5, minusS.valueNow());
  }
  
  public function testSignalFloatTimes():Void {
    var mySignal = Streams.identity().startsWith(2.0);
    
    var times = SignalFloat.times(mySignal, 3.7);
    
    assertEquals(7.4, times.valueNow());
  }
  
  public function testSignalFloatTimesS():Void {
    var mySignal =    Signals.constant(4.0);
    var timesSignal = Signals.constant(-5.5);
    
    var timesS = SignalFloat.timesS(mySignal, timesSignal);
    
    assertEquals(-22.0, timesS.valueNow());
  }
    
  public function testSignalFloatDividedBy():Void {
    var mySignal = Signals.constant(22.2);
    
    var divided = SignalFloat.dividedBy(mySignal, 11.1);
    
    assertEquals(2.0, divided.valueNow());
    
    mySignal.sendSignal(33.3);
    
    assertEquals(3.0, divided.valueNow());
  }
  
  public function testSignalFloatDividedByS():Void {
    var mySignal =    Signals.constant(24.0);
    var divSignal =   Signals.constant(2.0);
    
    var divided = SignalFloat.dividedByS(mySignal, divSignal);
    
    assertEquals(12.0, divided.valueNow());
    
    mySignal.sendSignal(11.2);
    
    assertEquals(5.6, divided.valueNow());
  }
  
  public function testSignalFloatAbs():Void {
    var mySignal = Signals.constant(-24.3);
    
    var abs = SignalFloat.abs(mySignal);
    
    assertEquals(24.3, abs.valueNow());
  }
  
  public function testSignalFloatNegate():Void {
    var mySignal = Signals.constant(0.0);
    
    var negate = SignalFloat.negate(mySignal);
    
    assertEquals(0.0, negate.valueNow());
    
    mySignal.sendSignal(6.1);
    
    assertEquals(-6.1, negate.valueNow());
  }
  
  public function testSignalFloatFloor():Void {
    var mySignal = Signals.constant(9.12345);
    
    var floor = SignalFloat.floor(mySignal);
    
    assertEquals(9.0, floor.valueNow());
  }
  
  public function testSignalFloatCeil():Void {
    var mySignal = Signals.constant(9.12345);
    
    var ceil = SignalFloat.ceil(mySignal);
    
    assertEquals(10.0, ceil.valueNow());
  }
    
  public function testSignalFloatRound():Void {
    var mySignal = Signals.constant(4.5);
    
    var round =  SignalFloat.round(mySignal);
    
    assertEquals(5.0, round.valueNow());
    
    mySignal.sendSignal(4.4);
    
    assertEquals(4.0, round.valueNow());
  }
  
  public function testSignalFloatAcos():Void {
    var mySignal = Signals.constant(0.5);
    
    var acos =  SignalFloat.acos(mySignal);
    
    assertEquals(1.047, Math.round(acos.valueNow() * 1000) / 1000);
  }
  
  public function testSignalFloatAsin():Void {
    var mySignal = Signals.constant(0.64);
    
    var asin =  SignalFloat.asin(mySignal);
    
    assertEquals(0.694, Math.round(asin.valueNow() * 1000) / 1000);
  }
  
  public function testSignalFloatAtan():Void {
    var mySignal = Signals.constant(2.0);
    
    var atan =  SignalFloat.atan(mySignal);
    
    assertEquals(1.107, Math.round(atan.valueNow() * 1000) / 1000);
  }
  
  public function testSignalFloatAtan2():Void {
    var mySignal = Signals.constant(8.0);
    
    var atan2 =  SignalFloat.atan2(mySignal, 4);
    
    assertEquals(1.107, Math.round(atan2.valueNow() * 1000) / 1000);
  }
  
  public function testSignalFloatAtan2B():Void {
    var mySignal =    Signals.constant(8.0);
    var mySignal2 =   Signals.constant(4.0);
    
    var atan2B =  SignalFloat.atan2B(mySignal, mySignal2);
    
    assertEquals(1.107, Math.round(atan2B.valueNow() * 1000) / 1000);
  }
  
  public function testSignalFloatCos():Void {
    var mySignal = Signals.constant(3.0);
    
    var cos =  SignalFloat.cos(mySignal);
    
    assertEquals(-0.99, Math.round(cos.valueNow() * 1000) / 1000);
  }
  
  public function testSignalFloatExp():Void {
    var mySignal = Signals.constant(5.0);
    
    var exp =  SignalFloat.exp(mySignal);
    
    assertEquals(148.413, Math.round(exp.valueNow() * 1000) / 1000);
  }
  
  public function testSignalFloatLog():Void {
    var mySignal = Signals.constant(2.0);
    
    var log =  SignalFloat.log(mySignal);
    
    assertEquals(0.693, Math.round(log.valueNow() * 1000) / 1000);
  }
  
  public function testSignalFloatMaxS():Void {
    var mySignal =    Signals.constant(2.0);
    var mySignal2 =   Signals.constant(4.0);
    
    var maxS =  SignalFloat.maxS(mySignal, mySignal2);
    
    assertEquals(4.0, maxS.valueNow());
  }
  
  public function testSignalFloatMax():Void {
    var mySignal = Signals.constant(2.0);
    
    var max =  SignalFloat.max(mySignal, 0.123);
    
    assertEquals(2.0, max.valueNow());
  }
  
  public function testSignalFloatMinS():Void {
    var mySignal =    Signals.constant(2.0);
    var mySignal2 =   Signals.constant(4.0);
    
    var minS =  SignalFloat.minS(mySignal, mySignal2);
    
    assertEquals(2.0, minS.valueNow());
  }
  
  public function testSignalFloatMin():Void {
    var mySignal = Signals.constant(2.0);
    
    var min =  SignalFloat.min(mySignal, 0.123);
    
    assertEquals(0.123, min.valueNow());
  }
  
  public function testSignalFloatPowS():Void {
    var mySignal =    Signals.constant(2.0);
    var mySignal2 =   Signals.constant(4.0);
    
    var powS =  SignalFloat.powS(mySignal, mySignal2);
    
    assertEquals(16.0, powS.valueNow());
  }
  
  public function testSignalFloatPow():Void {
    var mySignal = Signals.constant(2.8);
    
    var pow =  SignalFloat.pow(mySignal, 5.0);
    
    assertEquals(172.104, Math.round(pow.valueNow() * 1000) / 1000);
  }
  
  public function testSignalFloatSin():Void {
    var mySignal = Signals.constant(3.0);
    
    var sin =  SignalFloat.sin(mySignal);
    
    assertEquals(0.141, Math.round(sin.valueNow() * 1000) / 1000);
  }
  
  public function testSignalFloatSqrt():Void {
    var mySignal = Signals.constant(16.0);
    
    var sqrt =  SignalFloat.sqrt(mySignal);
    
    assertEquals(4.0, Math.round(sqrt.valueNow() * 1000) / 1000);
  }
  
  public function testSignalFloatTan():Void {
    var mySignal = Signals.constant(60.0);
    
    var tan =  SignalFloat.tan(mySignal);
    
    assertEquals(0.32, Math.round(tan.valueNow() * 1000) / 1000);
  }

/*
* -----------------  SignalSignal Tests  -------------------
* Missing: 
* Broken:  
*/

  public function testSignalSignalFlatten():Void {
    var b1 = stream().startsWith(2);
    var signals: Signal<Signal<Int>> = Streams.identity().startsWith(b1);
    
    var switchBed = SignalSignal.switchS(signals);
    
    assertEquals(2, switchBed.valueNow());
    
    b1.sendSignal(4);
    
    assertEquals(4, switchBed.valueNow());
    
    b1.sendSignal(5); b1.sendSignal(6);
    
    assertEquals(6, switchBed.valueNow());
  }
 
  public function testSignalSignalSwitchS():Void {
    var b1 = stream().startsWith(2);
    var signals: Signal<Signal<Int>> = Streams.identity().startsWith(b1);
    
    var switchBed = SignalSignal.switchS(signals);
    
    assertEquals(2, switchBed.valueNow());
    
    b1.sendSignal(4);
    
    assertEquals(4, switchBed.valueNow());
    
    b1.sendSignal(5); b1.sendSignal(6);
    
    assertEquals(6, switchBed.valueNow());
  }
   
  public function testSignalSignalJoin():Void {
    var b1 = stream().startsWith(2);
    var signals: Signal<Signal<Int>> = Streams.identity().startsWith(b1);
    
    var joined = SignalSignal.join(signals);
    
    assertEquals(2, joined.valueNow());
    
    b1.sendSignal(4);
    
    assertEquals(4, joined.valueNow());
    
    b1.sendSignal(5); b1.sendSignal(6);
    
    assertEquals(6, joined.valueNow());
  }
/*F  
  public function testSignalCollectionTake(): Void {
    var signal: Signal<List<Int>> = Signals.constant([1, 2, 3, 4, 5].toList());
    
    var taken = SignalCollectionExtensions.take(signal, 3).valueNow();
    
    assertEquals([1, 2, 3], taken);
  }
  
  public function testSignalCollectionDrop(): Void {
    var signal = Signals.constant(toCollection([1, 2, 3, 4, 5]));
    
    var dropped = SignalCollectionExtensions.drop(signal, 3).valueNow();
    
    assertEquals([4, 5], dropped);
  }
*/
  
  public function testSignalCollectionConcat(): Void {
    var signal  = Signals.constant(toCollection([1, 2, 3, 4, 5]));
    var signal2 = Signals.constant(toCollection([6, 7, 8]));

    var concated = SignalCollectionExtensions.concatS(signal, signal2).valueNow();
    
    assertEquals([1, 2, 3, 4, 5, 6, 7, 8], concated.toArray());
  }
  
  public function testSignalCollectionJoin(): Void {
    var signal = Signals.constant(toCollection([1, 2, 3, 4, 5]));
    
    var joined = SignalCollectionExtensions.join(signal, " ; ").valueNow();
    
    assertEquals("1 ; 2 ; 3 ; 4 ; 5", joined);
  }

  public function testSignalCollectionSize(): Void {
    var signal = Signals.constant(toCollection([1, 2, 3, 4, 5]));
    
    var size = SignalCollectionExtensions.size(signal).valueNow();
    
    assertEquals(5, size);
  }
  
  public function testSignalCollectionZip(): Void {
    var signal1 = Signals.constant([1, 2, 3, 4, 5].toList());
    var signal2 = Signals.constant([6, 7, 8].toList());
    
    var zipped = SignalCollectionExtensions.zipS(signal1, signal2).valueNow();
    
    assertEquals([Tuple2.create(1, 6), Tuple2.create(2, 7), Tuple2.create(3, 8)], zipped.toArray());
  }
/*F 
  public function testSignalCollectionZip3(): Void {
    var signal1 = Signals.constant(toCollection([1,  2, 3, 4, 5]));
    var signal2 = Signals.constant(toCollection([6,  7, 8]));
    var signal3 = Signals.constant(toCollection([99, 8, 13]));
    
    var zipped = SignalCollectionExtensions.zip3B(signal1, signal2, signal3).valueNow();
    
    assertEquals([tuple3(1, 6, 99), tuple3(2, 7, 8), tuple3(3, 8, 13)], zipped);
  }
  
  public function testSignalCollectionZip4(): Void {
    var signal1 = Signals.constant(toCollection([1,  2, 3, 4, 5]));
    var signal2 = Signals.constant(toCollection([6,  7, 1, 8]));
    var signal3 = Signals.constant(toCollection([99, 8, 13]));
    var signal4 = Signals.constant(toCollection([12, 13, 14, 15]));
    
    var zipped = SignalCollectionExtensions.zip4B(signal1, signal2, signal3, signal4).valueNow();
    
    assertEquals([tuple4(1, 6, 99, 12), tuple4(2, 7, 8, 13), tuple4(3, 1, 13, 14)], zipped);
  } 
  
  public function testSignalCollectionZip5(): Void {
    var signal1 = Signals.constant(toCollection([1,   2, 3, 4, 5]));
    var signal2 = Signals.constant(toCollection([6,   7, 1, 8]));
    var signal3 = Signals.constant(toCollection([99,  8, 13]));
    var signal4 = Signals.constant(toCollection([12, 13, 14, 15]));
    var signal5 = Signals.constant(toCollection([6,   7, 1, 8]));
    
    var zipped = SignalCollectionExtensions.zip5B(signal1, signal2, signal3, signal4, signal5).valueNow();
    
    assertEquals([tuple5(1, 6, 99, 12, 6), tuple5(2, 7, 8, 13, 7), tuple5(3, 1, 13, 14, 1)], zipped);
  }
*/  
  public function testSignalCollectionAppend(): Void {
    var signal = Signals.constant(toCollection([3, 4, 5]));
    
    var append = SignalCollectionExtensions.append(signal, 4).valueNow();
    
    assertEquals([3, 4, 5, 4], append.toArray());
  }
/*F  
  public function testSignalCollectionCons(): Void {
    var signal = Signals.constant(toCollection([3, 4, 5]));
    
    var cons = SignalCollectionExtensions.cons(signal, 4).valueNow();
    
    assertEquals([4, 3, 4, 5], cons.toArray());
  }
 
  public function testSignalCollectionHeadOpt(): Void {
    var signal = Signals.constant(toCollection([]));
    
    var headOpt = SignalCollectionExtensions.headOpt(signal);
    
    assertOptionEquals(None, headOpt.valueNow());
    
    signal.sendSignal(toCollection([1, 2, 3]));
    
    assertOptionEquals(Some(1), headOpt.valueNow());
  }
  
  public function testSignalCollectionSlice(): Void {
    var signal = Signals.constant(toCollection([]));
    
    var slice = SignalCollectionExtensions.slice(signal, 2, 5);
    
    assertEquals([], slice.valueNow());
    
    signal.sendSignal(toCollection([1, 1, 7, 9, 8, 7]));
    
    assertEquals([7, 9, 8], slice.valueNow().toArray());
  }
 
  public function testSignalCollectionLastOpt(): Void {
    var signal = Signals.constant(toCollection([]));
    
    var lastOpt = SignalCollectionExtensions.lastOpt(signal);
    
    assertOptionEquals(None, lastOpt.valueNow());
    
    signal.sendSignal(toCollection([1, 2, 3]));
    
    assertOptionEquals(Some(3), lastOpt.valueNow());
  }

  public function testSignalCollectionCountWhile(): Void {
    var signal = Signals.constant(toCollection([1, 2, 7, 8, 3, 99]));
    
    var countWhile = SignalCollectionExtensions.countWhile(signal, function(v) { return v < 8; });
    
    assertEquals(3, countWhile.valueNow());
  }
 
  public function testSignalCollectionDropWhile(): Void {
    var signal = Signals.constant(toCollection([100, 75, 50, 25]));
    
    var dropWhile = SignalCollectionExtensions.dropWhile(signal, function(v) { return v > 50; });
    
    assertEquals([50, 25], dropWhile.valueNow().toArray());
  }
 
  public function testSignalCollectionTakeWhile(): Void {
    var signal = Signals.constant(toCollection([100, 75, 50, 25]));
    
    var takeWhile = SignalCollectionExtensions.takeWhile(signal, function(v) { return v >= 50; });
    
    assertEquals([100, 75, 50], takeWhile.valueNow().toArray());
  }
*/  
  public function testSignalCollectionCount(): Void {
    var signal = Signals.constant(toCollection([10, 15, 25, 30, 40, 45, 50]));
    
    var count = SignalCollectionExtensions.count(signal, function(v) { return v > 40; });
    
    assertEquals(2, count.valueNow());
  }
  
  public function testSignalCollectionAll(): Void {
    var signal = Signals.constant(toCollection([10, 15, 25, 30, 40, 45, 50]));
    
    var all = SignalCollectionExtensions.all(signal, function(v) { return v > 40; });
    var all2 = SignalCollectionExtensions.all(signal, function(v) { return v > 9; });
    
    assertEquals(false, all.valueNow());
    assertEquals(true, all2.valueNow());
  }
  
  public function testSignalCollectionAny(): Void {
    var signal = Signals.constant(toCollection([10, 15, 25, 30, 40, 45, 50]));
    
    var any = SignalCollectionExtensions.any(signal, function(v) { return v > 40; });
    var any2 = SignalCollectionExtensions.any(signal, function(v) { return v > 50; });
    
    assertEquals(true, any.valueNow());
    assertEquals(false, any2.valueNow());
  }
  
  public function testSignalCollectionForEach(): Void {
    var signal = Signals.constant(toCollection([10, 15, 25, 30, 40, 45, 50]));
    var self = this;
    
    var forEach = SignalCollectionExtensions.forEach(signal, function(v) { self.incrementCounter(); });
    
    assertEquals(7, getCounter());
    resetCounter();
  }
  
  public function testSignalCollectionMap(): Void {
    var signal = Signals.constant(toCollection([10, 15, 45, 50]));
    
    var map = SignalCollectionExtensions.map(signal, function(v) { return ++v; });
    
    assertEquals([11, 16, 46, 51], map.valueNow().toArray());
  }
/*F  
  public function testSignalCollectionMap2(): Void {
    var signal1 = Signals.constant(toCollection([10, 15, 45, 50, 75]));
    var signal2 = Signals.constant(toCollection([10, 15, 45, 50, 13]));
    
    var map = SignalCollectionExtensions.map2B(signal1, signal2, function(v1, v2) { return v1 - v2; });
    
    assertEquals([0, 0, 0, 0, 62], map.valueNow().toArray());
  }
  
  public function testSignalCollectionMap3(): Void {
    var signal1 = Signals.constant(toCollection([10, 15, 45, 50, 75]));
    var signal2 = Signals.constant(toCollection([10, 15, 45, 50, 13]));
    var signal3 = Signals.constant(toCollection([14, 24, 20, 18]));
    
    var map = SignalCollectionExtensions.map3B(signal1, signal2, signal3, function(v1, v2, v3) { return v1 - v2 + v3; });
    
    assertEquals([14, 24, 20, 18], map.valueNow().toArray());
  }
  
  public function testSignalCollectionMap4(): Void {
    var signal1 = Signals.constant(toCollection([10, 15, 45, 50, 75]));
    var signal2 = Signals.constant(toCollection([10, 15, 45, 50, 13]));
    var signal3 = Signals.constant(toCollection([14, 24, 20, 18]));
    var signal4 = Signals.constant(toCollection([2,   4,  4,  2]));
    
    var map = SignalCollectionExtensions.map4B(signal1, signal2, signal3, signal4, function(v1, v2, v3, v4) { return (v1 - v2 + v3) / v4; });
    
    assertEquals([7, 6, 5, 9.0], map.valueNow().toArray());
  }
  
  public function testSignalCollectionMap5(): Void {
    var signal1 = Signals.constant(toCollection([10, 15, 45, 50, 75]));
    var signal2 = Signals.constant(toCollection([10, 15, 45, 50, 13]));
    var signal3 = Signals.constant(toCollection([14, 24, 20, 18]));
    var signal4 = Signals.constant(toCollection([2,   4,  4,  2]));
    var signal5 = Signals.constant(toCollection([10, 8, 3]));
    
    var map = SignalCollectionExtensions.map5B(signal1, signal2, signal3, signal4, signal5, function(v1, v2, v3, v4, v5) { return ((v1 - v2 + v3) / v4) - v5; });
    
    assertEquals([-3, -2, 2.0], map.valueNow().toArray());
  }
*/  
  public function testSignalCollectionPartition(): Void {
    var signal = Signals.constant(toCollection([1, 2, 3, 4, 5, 6, 7, 3, 4]));
    var filter = function(v) { return v < 4; };
    
    var partition = SignalCollectionExtensions.partition(signal, filter);
    
    assertEquals([1, 2, 3, 3], partition.valueNow()._1.toArray());
    assertEquals([4, 5, 6, 7, 4], partition.valueNow()._2.toArray());
  }
/*F  
  public function testSignalCollectionPartitionWhile(): Void {
    var signal = Signals.constant(toCollection([1, 2, 3, 4, 5, 6, 7, 3, 4]));
    var filter = function(v) { return v <= 5; };
    
    var partitionWhile = SignalCollectionExtensions.partitionWhile(signal, filter);
    
    assertEquals([1, 2, 3, 4, 5], partitionWhile.valueNow()._1.toArray());
    assertEquals([6, 7, 3, 4], partitionWhile.valueNow()._2.toArray());
  }
  
  public function testSignalCollectionTranspose(): Void {
    var signal1 = Signals.constant(toCollection([1, 2, 3, 4, 5]));
    var signal2 = Signals.constant(toCollection([6, 7, 8]));
    
    var transposeped = SignalCollectionExtensions.transposeS(signal1, signal2).valueNow();
    
    assertEquals([tuple2(1, 6), tuple2(2, 7), tuple2(3, 8)], transposeped);
  }
  
  public function testSignalCollectionTranspose3(): Void {
    var signal1 = Signals.constant(toCollection([1,  2, 3, 4, 5]));
    var signal2 = Signals.constant(toCollection([6,  7, 8]));
    var signal3 = Signals.constant(toCollection([99, 8, 13]));
    
    var transposeped = SignalCollectionExtensions.transpose3B(signal1, signal2, signal3).valueNow();
    
    assertEquals([tuple3(1, 6, 99), tuple3(2, 7, 8), tuple3(3, 8, 13)], transposeped);
  }
  
  public function testSignalCollectionTranspose4(): Void {
    var signal1 = Signals.constant(toCollection([1,  2, 3, 4, 5]));
    var signal2 = Signals.constant(toCollection([6,  7, 1, 8]));
    var signal3 = Signals.constant(toCollection([99, 8, 13]));
    var signal4 = Signals.constant(toCollection([12, 13, 14, 15]));
    
    var transposeped = SignalCollectionExtensions.transpose4B(signal1, signal2, signal3, signal4).valueNow();
    
    assertEquals([tuple4(1, 6, 99, 12), tuple4(2, 7, 8, 13), tuple4(3, 1, 13, 14)], transposeped);
  }
  
  public function testSignalCollectionTranspose5(): Void {
    var signal1 = Signals.constant(toCollection([1,   2, 3, 4, 5]));
    var signal2 = Signals.constant(toCollection([6,   7, 1, 8]));
    var signal3 = Signals.constant(toCollection([99,  8, 13]));
    var signal4 = Signals.constant(toCollection([12, 13, 14, 15]));
    var signal5 = Signals.constant(toCollection([6,   7, 1, 8]));
    
    var transposeped = SignalCollectionExtensions.transpose5B(signal1, signal2, signal3, signal4, signal5).valueNow();
    
    assertEquals([tuple5(1, 6, 99, 12, 6), tuple5(2, 7, 8, 13, 7), tuple5(3, 1, 13, 14, 1)], transposeped);
  }
*/  
  public function testSignalCollectionFilter(): Void {
    var signal = Signals.constant(toCollection([1, 2, 3, 4, 5, 6, 7, 3, 4]));
    var f = function(v) { return v < 4; };
    
    var filter = SignalCollectionExtensions.filter(signal, f);
    
    assertEquals([1, 2, 3, 3], filter.valueNow().toArray());
  }
/*F  
  public function testSignalCollectionFilterWhile(): Void {
    var signal = Signals.constant(toCollection([1, 2, 3, 4, 5, 6, 7, 3, 4]));
    var f = function(v) { return v <= 5; };
    
    var filterWhile = SignalCollectionExtensions.filterWhile(signal, f);
    
    assertEquals([1, 2, 3, 4, 5], filterWhile.valueNow());
  }
  
  public function testSignalCollectionFlatMap(): Void {
    var self = this;
    var signal = Signals.constant(toCollection([1, 2, 3, 3, 4]));
    var f = function(v) { return self.singleton(v).cons(v * 10); };
    
    var flatMap = SignalCollectionExtensions.flatMap(signal, f);
    
    assertEquals([10, 1, 20, 2, 30, 3, 30, 3, 40, 4], flatMap.valueNow().toArray());
  }
  
  public function testSignalCollectionFlatMap2(): Void {
    var signal1 = Signals.constant(toCollection([1, 2, 3, 4, 5]));
    var signal2 = Signals.constant(toCollection([6, 7, 8]));
    
    var self = this;
    var mapper = function(v1, v2) { return self.singleton(v1).cons(v2 *2); };
    var flatMapped = SignalCollectionExtensions.flatMap2B(signal1, signal2, mapper).valueNow();
    
    assertEquals([12, 1, 14, 2, 16, 3], flatMapped.toArray();
  }
  
  public function testSignalCollectionFlatMap3(): Void {
    var signal1 = Signals.constant(toCollection([1,  2, 3, 4, 5]));
    var signal2 = Signals.constant(toCollection([6,  7, 8]));
    var signal3 = Signals.constant(toCollection([99, 8, 13]));
    
    var self = this;
    var mapper = function(v1, v2, v3) { return self.singleton(v2).cons(v1 + v3); };
    var flatMapped = SignalCollectionExtensions.flatMap3B(signal1, signal2, signal3, mapper).valueNow();
    
    assertEquals([100, 6, 10, 7, 16, 8], flatMapped.toArray();
  }
  
  public function testSignalCollectionFlatMap4(): Void {
    var signal1 = Signals.constant(toCollection([1,  2, 3, 4, 5]));
    var signal2 = Signals.constant(toCollection([9,  14, 8]));
    var signal3 = Signals.constant(toCollection([12, 8, 13]));
    var signal4 = Signals.constant(toCollection([2, 2]));
    
    var self = this;
    var mapper = function(v1, v2, v3, v4) { return self.singleton(v2).cons(v1 + v3).append(v4); };
    var flatMapped = SignalCollectionExtensions.flatMap4B(signal1, signal2, signal3, signal4, mapper).valueNow();
    
    assertEquals([13, 9, 2, 10, 14, 2], flatMapped.toArray();
  }
  
  public function testSignalCollectionFlatMap5(): Void {
    var signal1 = Signals.constant(toCollection([1,  2, 3, 5, 5]));
    var signal2 = Signals.constant(toCollection([9,  15, 8]));
    var signal3 = Signals.constant(toCollection([12, 8, 13]));
    var signal4 = Signals.constant(toCollection([2, 2]));
    var signal5 = Signals.constant(toCollection([12, 24]));
    
    var self = this;
    var mapper = function(v1, v2, v3, v4, v5) { return self.singleton(v2).cons(v1 + v3).append(v4 * v5); };
    var flatMapped = SignalCollectionExtensions.flatMap5B(signal1, signal2, signal3, signal4, signal5, mapper).valueNow();
    
    assertEquals([13, 9, 24, 10, 15, 48], flatMapped.toArray();
  }
*/  
  public function testSignalCollectionFoldr(): Void {
    var signal = Signals.constant(toCollection([1, 3, 4]));
    var f = function(v1 : Int, v2) { return v2 + " : " + v1; };
    
    var foldr = SignalCollectionExtensions.foldr(signal, "foo", f);
    
    assertEquals("foo : 4 : 3 : 1", foldr.valueNow());
  }
 
  public function testSignalCollectionFoldl(): Void {
    var signal = Signals.constant(toCollection([1, 3, 4]));
    var f = function(v1, v2 : Int) { return v1 + " : " + v2; };
    
    var foldl = SignalCollectionExtensions.foldl(signal, "foo", f);
    
    assertEquals("foo : 1 : 3 : 4", foldl.valueNow());
  }
/*F  
  public function testSignalCollectionFoldl2(): Void {
    var signal1 = Signals.constant(toCollection([1, 3, 4]));
    var signal2 = Signals.constant(toCollection([4, 5, 6, 7]));
    
    var f = function(v1, v2, v3) { return v1 + " : " + Std.string(v2 + v3); };
    
    var foldl2B = SignalCollectionExtensions.foldl2B(signal1, signal2, "foo", f);
    
    assertEquals("foo : 5 : 8 : 10", foldl2B.valueNow());
  }
  
  public function testSignalCollectionFoldl3(): Void {
    var signal1 = Signals.constant(toCollection([1, 3, 4]));
    var signal2 = Signals.constant(toCollection([4, 5, 6, 7]));
    var signal3 = Signals.constant(toCollection([1, 2, 3]));
    
    var f = function(v1, v2, v3, v4) { return v1 + " : " + Std.string(v2 + v3) + " : " + Std.string(v4); };
    
    var foldl3B = SignalCollectionExtensions.foldl3B(signal1, signal2, signal3, "foo", f);
    
    assertEquals("foo : 5 : 1 : 8 : 2 : 10 : 3", foldl3B.valueNow());
  }
  
  public function testSignalCollectionFoldl4(): Void {
    var signal1 = Signals.constant(toCollection([1, 3, 4]));
    var signal2 = Signals.constant(toCollection([4, 5, 6, 7]));
    var signal3 = Signals.constant(toCollection([1, 2, 3]));
    var signal4 = Signals.constant(toCollection([10, 10]));
    
    var f = function(v1, v2, v3, v4, v5) { return v1 + " : " + Std.string(v2 + v3) + " : " + Std.string(v4 * v5); };
    
    var foldl4B = SignalCollectionExtensions.foldl4B(signal1, signal2, signal3, signal4, "foo", f);
    
    assertEquals("foo : 5 : 10 : 8 : 20", foldl4B.valueNow());
  }
  
  public function testSignalCollectionFoldl5(): Void {
    var signal1 = Signals.constant(toCollection([1, 3, 4]));
    var signal2 = Signals.constant(toCollection([4, 5, 6, 7]));
    var signal3 = Signals.constant(toCollection([1, 2, 3]));
    var signal4 = Signals.constant(toCollection([10, 10]));
    var signal5 = Signals.constant(toCollection([2, 4]));
    
    var f = function(v1, v2, v3, v4, v5, v6) { return v1 + " : " + Std.string(v2 + v3) + " : " + Std.string((v4 * v5) - v6); };
    
    var foldl5B = SignalCollectionExtensions.foldl5B(signal1, signal2, signal3, signal4, signal5, "foo", f);
    
    assertEquals("foo : 5 : 8 : 8 : 16", foldl5B.valueNow());
  }
*/  
  public function testSignalCollectionToArray(): Void {
    var signal = Signals.constant(toCollection([40, 45, 50]));
    
    var toArray = SignalCollectionExtensions.toArray(signal);
    
    assertEquals([40, 45, 50], toArray.valueNow());
    assertTrue(Std.is(toArray.valueNow(), Array));
  }
  
  public function testSignalCollectionScanl(): Void {
    var signal = Signals.constant(toCollection([1, 3, 5]));
    
    var f = function(v1, v2) { return v1 + v2; };
    
    var scanl = SignalCollectionExtensions.scanl(signal, 1, f);
    
    assertEquals([1, 2, 4, 6], scanl.valueNow().toArray());
  }
  
  public function testSignalCollectionScanr(): Void {
    var signal = Signals.constant(toCollection([1, 3, 5]));
    
    var f = function(v1, v2) { return v1 + v2; };
    
    var scanr = SignalCollectionExtensions.scanr(signal, 1, f);
    
    assertEquals([1, 6, 4, 2], scanr.valueNow().toArray());
  }
/*F  
  public function testSignalCollectionScanrP(): Void {
    var signal = Signals.constant(toCollection([2, 3, 5]));
    
    var f = function(v1, v2) { return v1 + v2; };
    
    var scanrP = SignalCollectionExtensions.scanrP(signal, f);
    
    assertEquals([8, 10], scanrP.valueNow().toArray());
  }
  
  public function testSignalCollectionScanlP(): Void {
    var signal = Signals.constant(toCollection([2, 3, 5]));
    
    var f = function(v1, v2) { return v1 + v2; };
    
    var scanlP = SignalCollectionExtensions.scanlP(signal, f);
    
    assertEquals([5, 10], scanlP.valueNow().toArray());
  }
  
  public function testSignalCollectionGroupBy(): Void {
    var signal = Signals.constant(toCollection([4, 2, 3, 5, 10, 5, 16, 8, 4, 2, 2, 3]));
    
    var f = function(v1, v2) { return v1 == v2 * 2; };
    
    var groupBy = SignalCollectionExtensions.groupBy(signal, f);
    
    assertEquals([[4, 2], [3], [5], [10, 5], [16, 8, 4, 2], [2], [3]], colPump(groupBy.valueNow()));
  }
  
  public function testSignalCollectionGroup(): Void {
    var signal = Signals.constant(toCollection([4, 2, 3, 5, 5, 5, 10, 5, 16, 8, 4, 2, 2, 3]));
    
    var group = SignalCollectionExtensions.group(signal);
    
    assertEquals([[4], [2], [3], [5, 5, 5], [10], [5], [16], [8], [4], [2, 2], [3]], colPump(group.valueNow()));
  }
  
  public function testSignalCollectionMember(): Void {
    var signal = Signals.constant(toCollection([4, 2, 7, 3]));
    
    var member =  SignalCollectionExtensions.member(signal, 7);
    var member2 = SignalCollectionExtensions.member(signal, 1);
    
    assertTrue(member.valueNow());
    assertFalse(member2.valueNow());
  }

  public function testSignalCollectionExists(): Void {
    var signal = Signals.constant(toCollection([4, 2, 7, 3]));
    
    var exists =  SignalCollectionExtensions.exists(signal, function(v) { return v < 10; });
    var exists2 = SignalCollectionExtensions.exists(signal, function(v) { return v > 7; });
    
    assertTrue(exists.valueNow());
    assertFalse(exists2.valueNow());
  }
  
  public function testSignalCollectionFind(): Void {
    var signal = Signals.constant(toCollection([4, 2, 7, 3]));
    
    var find =  SignalCollectionExtensions.find(signal, function(v) { return v < 10; });
    var find2 = SignalCollectionExtensions.find(signal, function(v) { return v > 7; });
   
    assertOptionEquals(Some(4), find.valueNow());
    assertOptionEquals(None, find2.valueNow());
  }
  
  public function testSignalCollectionExistsP(): Void {
    var signal = Signals.constant(toCollection([4, 2, 7, 3]));
    
    var existsP =  SignalCollectionExtensions.existsP(signal, 5, function(v1, ref) { return v1 < ref; });
    var existsP2 = SignalCollectionExtensions.existsP(signal, 1, function(v1, ref) { return v1 < ref; });
    
    assertTrue(existsP.valueNow());
    assertFalse(existsP2.valueNow());
  }
  
  public function testSignalCollectionNubBy(): Void {
    var signal = Signals.constant(toCollection([4, 2, 3, 5, 5, 5, 10, 5, 16, 8, 4, 2, 5, 2, 3, 5]));
    
    var nubBy =  SignalCollectionExtensions.nubBy(signal, function(v1, v2) { return  if (v1 == v2 || v1 == v2 * 2) true else false; });
    
    assertEquals([4, 3, 5, 10, 16], nubBy.valueNow());
  }
  
  public function testSignalCollectionNub(): Void {
    var signal = Signals.constant(toCollection([4, 2, 3, 5, 5, 5, 10, 5, 16, 8, 4, 2, 5, 2, 3, 5]));
    
    var nub =  SignalCollectionExtensions.nub(signal);
    
    assertEquals([4, 2, 3, 5, 10, 16, 8], nub.valueNow());
  }
  
  public function testSignalCollectionIntersect(): Void {
    var signal1 = Signals.constant(toCollection([4, 2, 2, 5, 2, 3, 5]));
    var signal2 = Signals.constant(toCollection([1, 2, 3, 4]));
    
    var intersectS =  SignalCollectionExtensions.intersectS(signal1, signal2);
    
    assertEquals([4, 2, 2, 2, 3], intersectS.valueNow());
  }
 
  public function testSignalCollectionIntersectBy(): Void {
    var signal1 = Signals.constant(toCollection([4.0, 2, 2, 8, 2, 3, 5]));
    var signal2 = Signals.constant(toCollection([1.0, 2, 8, 8, 2, 2, 3, 4]));
    
    var intersectByS =  SignalCollectionExtensions.intersectByS(signal1, signal2, function(v1, v2) { return v2 / 2 == v1; });
    
    assertEquals([4.0, 2, 2, 8, 2], intersectByS.valueNow().toArray());
  }
  
  public function testSignalCollectionUnionBy(): Void {
    var signal1 = Signals.constant(toCollection([4.0, 2, 2, 8, 2, 3, 5]));
    var signal2 = Signals.constant(toCollection([1.0, 2, 3, 4]));
    
    var unionByS =  SignalCollectionExtensions.unionByS(signal1, signal2, function(v1, v2) { return v1 / 2 == v2; });
    
    assertEquals([4.0, 2, 2, 8, 2, 3, 5, 3], unionByS.valueNow().toArray());
  }
  
  public function testSignalCollectionUnion(): Void {
    var signal1 = Signals.constant(toCollection([4.0, 2, 2, 8, 2, 3, 5]));
    var signal2 = Signals.constant(toCollection([1.0, 2, 3, 4]));
    
    var unionS =  SignalCollectionExtensions.unionS(signal1, signal2);
    
    assertEquals([4.0, 2, 2, 8, 2, 3, 5, 1], unionS.valueNow().toArray());
  }
  
  public function testSignalCollectionIsPrefixOf(): Void {
    var signal0 = Signals.constant(toCollection([]));
    var signal1 = Signals.constant(toCollection([2, 3, 4, 5]));
    var signal2 = Signals.constant(toCollection([2, 3, 4, 5, 6, 7, 1, 2, 3, 4]));
    var signal3 = Signals.constant(toCollection([1, 2, 3, 4]));
    
    var isPrefixOf =  SignalCollectionExtensions.isPrefixOfS(signal1, signal2);
    var isPrefixOf2 = SignalCollectionExtensions.isPrefixOfS(signal2, signal3);
    var isPrefixOf3 = SignalCollectionExtensions.isPrefixOfS(signal0, signal3);
    
    assertTrue(isPrefixOf.valueNow());
    assertFalse(isPrefixOf2.valueNow());
    assertTrue(isPrefixOf3.valueNow());
  }
  
  public function testSignalCollectionIsSuffixOf(): Void {
    var signal0 = Signals.constant(toCollection([]));
    var signal1 = Signals.constant(toCollection([2, 3, 4, 5]));
    var signal2 = Signals.constant(toCollection([2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5]));
    var signal3 = Signals.constant(toCollection([1, 2, 3, 4]));
    
    var isSuffixOf =  SignalCollectionExtensions.isSuffixOfS(signal1, signal3);
    var isSuffixOf2 = SignalCollectionExtensions.isSuffixOfS(signal1, signal2);
    var isSuffixOf3 = SignalCollectionExtensions.isSuffixOfS(signal0, signal3);
    
    assertFalse(isSuffixOf.valueNow());
    assertTrue(isSuffixOf2.valueNow());
    assertTrue(isSuffixOf3.valueNow());
  }
  
  public function testSignalCollectionDelete(): Void {
    var signal = Signals.constant(toCollection([2, 3, 4, 5, 3, 4, 5]));
    
    var delete = SignalCollectionExtensions.delete(signal, 5);
    
    assertEquals([2, 3, 4, 3, 4, 5], delete.valueNow());
  }
  
  public function testSignalCollectionDeleteBy(): Void {
    var signal = Signals.constant(toCollection([3, 4, 5, 2, 3, 2, 4, 5]));
    var cmp = function(v1, v2) { return v2 / 2 == v1; }
    
    var deleteBy = SignalCollectionExtensions.deleteBy(signal, 4, cmp);
    
    assertEquals([3, 4, 5, 3, 2, 4, 5], deleteBy.valueNow());
  }
  
  public function testSignalCollectionFindIndicesOf(): Void {
    var signal = Signals.constant(toCollection([3, 4, 5, 2, 3, 2, 4, 5]));
    var cmp = function(v) { return v < 4; };
    
    var findIndicesOf = SignalCollectionExtensions.findIndicesOf(signal, cmp);
    
    assertEquals([0, 3, 4, 5], findIndicesOf.valueNow());
  }
  
  public function testSignalCollectionFindIndexOf(): Void {
    var signal = Signals.constant(toCollection([2, 3, 2, 4, 5]));
    var cmp = function(v) { return v == 5; };
    var cmp2 = function(v) { return v == 7; };
    
    var findIndexOf = SignalCollectionExtensions.findIndexOf(signal, cmp);
    var findIndexOf2 = SignalCollectionExtensions.findIndexOf(signal, cmp2);
    
    assertEquals(Some(4), findIndexOf.valueNow());
    assertEquals(None, findIndexOf2.valueNow());
  }
  
  public function testSignalCollectionIndexOf(): Void {
    var signal = Signals.constant(toCollection([2, 3, 2, 4, 5]));
    
    var indexOf = SignalCollectionExtensions.indexOf(signal, 4);
    var indexOf2 = SignalCollectionExtensions.indexOf(signal, 10);
    
    assertOptionEquals(Some(3), indexOf.valueNow());
    assertOptionEquals(None, indexOf2.valueNow());
  }
  
  public function testSignalCollectionIndicesOf(): Void {
    var signal = Signals.constant(toCollection([2, 3, 2, 4, 5]));
    
    var indicesOf = SignalCollectionExtensions.indicesOf(signal, 2);
    var indicesOf2 = SignalCollectionExtensions.indicesOf(signal, 10);
    
    assertEquals([0, 2], indicesOf.valueNow().toArray());
    assertEquals([], indicesOf2.valueNow().toArray());
  }
  
  public function testSignalCollectionReplaceBy(): Void {
    var signal = Signals.constant(toCollection([2, 3, 2, 4, 5]));
    
    var f = function(v) { return v == 2; };
    
    var replaceBy = SignalCollectionExtensions.replaceBy(signal, 99, f);
    
    assertEquals([99, 3, 99, 4, 5], replaceBy.valueNow());
  }
  
  public function testSignalCollectionSnapshot(): Void {
    var signal = Signals.constant(toCollection([2, 3, 2, 4, 5]));
    
    var snapshot = SignalCollectionExtensions.snapshot(signal);
    
    assertEquals([2, 3, 2, 4, 5], snapshot.valueNow());
    
    signal.sendSignal(toCollection([]));
    
    assertEquals([], snapshot.valueNow().toArray());
  }
  
  public function testSignalCollectionInsertBy(): Void {
    var signal = Signals.constant(toCollection([1, 2, 3, 5, 6]));
    
    var f = function(v1, v2) { return  v1 < v2; };
    
    var insertBy = SignalCollectionExtensions.insertBy(signal, 4, f);
    
    assertEquals([1, 2, 3, 4, 5, 6], insertBy.valueNow());
  }
  
  public function testSignalCollectionSort(): Void {
    var signal = Signals.constant(toCollection([1, 6, 4, 8, 8, 7, 3, 2, 2, 0, 9, 7, 2]));
    
    var f = function(v1, v2) { return  v1 < v2; };
    
    var sort = SignalCollectionExtensions.sort(signal, f);
    
    assertEquals([0, 1, 2, 2, 2, 3, 4, 6, 7, 7, 8, 8, 9], sort.valueNow());
  }
  
  public function testSignalCollectionDeleteFirstBy(): Void {
    var signal1 = Signals.constant(toCollection([1, 6, 4, 8, 8]));
    var signal2 = Signals.constant(toCollection([8, 1, 9, 3, 2]));
    
    var f = function(v1, v2) { return  v1.equals(v2); };
    
    var deleteFirstBy = SignalCollectionExtensions.deleteFirstByS(signal1, signal2, f);
    
    assertEquals([6, 4, 8], deleteFirstBy.valueNow());
  }
  
  public function testSignalCollectionTails(): Void {
    var signal = Signals.constant(toCollection([1, 0, 9, 7, 2]));
    
    var tails = SignalCollectionExtensions.tails(signal);
    
    assertEquals([[1, 0, 9, 7, 2], [0, 9, 7, 2], [9, 7, 2], [7, 2], [2], []], colPump(tails.valueNow()));
  }
  
  public function testSignalCollectionWrap(): Void {
    var signal = Signals.constant(toCollection([1, 0, 9, 7, 2]));
    
    var wrap = SignalCollectionExtensions.wrap(signal);
    
    assertEquals([[1, 0, 9, 7, 2]], colPump(wrap.valueNow()));
  }
  
  public function testSignalCollectionToString(): Void {
    var signal = Signals.constant(toCollection([1, 0, 9, 7, 2]));
    
    var toString = SignalCollectionExtensions.toString(signal);
    
    assertEquals("Collection(1, 0, 9, 7, 2)", toString.valueNow());
  }
  
  public function testSignalCollectionInstances(): Void {
    var signal = Signals.constant(toCollection([7, 1, 0, 9, 7, 2]));
    
    var instances = SignalCollectionExtensions.instances(signal, 7);
    
    assertEquals(2, instances.valueNow());
  }
  
  public function testSignalCollectionInstancesBy(): Void {
    var signal = Signals.constant(toCollection([6, 1, 0, 9, 6, 2, 6]));
    
    var f = function(v1, v2) { return v2 * 2 == v1; };
    
    var instancesBy = SignalCollectionExtensions.instancesBy(signal, 3, f);
    
    assertEquals(3, instancesBy.valueNow());
  }
  
  public function testSignalCollectionMinus(): Void {
    var signal1 = Signals.constant(toCollection([6, 1, 0, 9, 6, 2, 6, 2]));
    var signal2 = Signals.constant(toCollection([1, 2, 3, 4, 5]));
    
    var minus = SignalCollectionExtensions.minusS(signal1, signal2);
    
    assertEquals([6, 0, 9, 6, 6], minus.valueNow());
  }
*/      
    
    
    
    
    
    
    




/*
*  <----------------  Private Functions  ---------------->
*
*/ 
/*F
    private function colPump<C, T>(collection: Collection<Dynamic, Collection<C, T>>): Array<Array<T>> {
        var testArray = [];
        
        for (e in collection) {
            var curArray = [];
            for (i in e) {
                curArray.push(i);
            }
            testArray.push(curArray);
        }
        
        return testArray;
    }
*/
    private function voidPump<T>(testStream: Stream<T>, iter: Iterable<T>): Void {
        for (e in iter) {
            testStream.sendEvent(e);
        }
    }
    
    private function pump<T>(testStream: Stream<T>, iter: Iterable<T>, eS: Stream<T>): Array<T> {
        var eventStream = eS.toArray();
        
        for (e in iter) {
            testStream.sendEvent(e);
        }
        
        return eventStream;
    }
    
    private function pumpTuple2<T>(masterStream: Stream<Int>, iter: Iterable<T>, arr_1: Array<T>, arr_2: Array<T>): Tuple2<Array<T>, Array<T>> {
        var eventStream1 = arr_1;
        var eventStream2 = arr_2;
        
        for (e in iter) {
            masterStream.sendEvent(e);
        }
        
        return Tuple2.create(eventStream1, eventStream2);
    }

    /*F
    private function assertIterableEquals<T>(iter1: Iterable<T>, iter2: Iterable<T>, ?minLength: Int, equals: T -> T -> Bool = null, ?pos: haxe.PosInfos): Void {
        var finalEquals: T -> T -> Bool = if (equals == null) function(v1, v2) { return Filter.isEqual(v1, v2); } else equals;
        
        var i1 = iter1.iterator();
        var i2 = iter2.iterator();
        
        var index = 0;
        
        while (i1.hasNext() && i2.hasNext()) {
            var n1 = i1.next();
            var n2 = i2.next();
            
            if (!finalEquals(n1, n2)) {
                throw "Element " + index + " differs: iter1[" + index + "] = " + n1 + ", iter2[" + index + "] = " + n2;
                assertTrue(false);
            }
            
            ++index;
        }
        
        if (minLength == null) {
            if (i2.hasNext()) { throw "Iter2 has more elements than iter1: iter1.length = " + index + " : Line = " + pos.lineNumber; assertTrue(false); }
            if (i1.hasNext()) { throw "Iter1 has more elements than iter2: iter2.length = " + index + " : Line = " + pos.lineNumber; assertTrue(false); }
        }
        else if (minLength != index) {
            throw "The iterable does not have the minimum length: " + minLength;
        }
        assertTrue(true);
    } 
    */
/*F    
    private function assertOptionEquals<T>(opt1: Option<T>, opt2: Option<T>, equals: T -> T -> Bool = null): Void {
        if (equals == null) {
            equals = Filter.isEqual;
        }
        
        switch (opt1) {
            case None:  {
                switch (opt2) {
                 case None:     assertTrue(true);
                 case Some(e):  { trace("Value 1 == None, but Value 2 == " + e); assertTrue(false); }
                }
            };
            case Some(e):   {
                switch (opt2) {
                    case None: { trace("Value 1 == "+ e + ", but Value 2 == None"); assertTrue(false); }
                    case Some(f): {
                        if (Filter.isEqual(e, f)) assertTrue(true) else { trace("Value 1 == "+ e + ", but Value 2 == " + f); assertTrue(false); }
                    }
                }
            }
        }
        
        assertTrue(true);
    }
*/    
    private function incrementCounter(): Void { 
        counter = counter + 1;
    }
    
    
    private function resetCounter(): Void {
        counter = 0;
    }
    
    private function getCounter(): Int{
        return counter;
    }
    
    private function stream<T>(): Stream<T> {
        return Streams.identity();
    }
   
    private function setupTimingTest(): Void {
        _timeouts = [];
        _now = 0;
    }
     
    private function advanceTime(millis: Int): Void {
        var start = _now, 
            end   = _now + millis;
        
        for (curTime in start...(end + 1)) {
            _now = curTime;
            
            var found = true;
            
            while (found) {
                found = false;
                
                var copy = [].concat(_timeouts);
                var matched = [];
                
                for (timeout in copy) {
                    var t = timeout.timeout;

                    if (curTime == t) {

                        timeout.func();

                        _timeouts.remove(timeout);
                        
                        found = true;
                    }
                }
            }
        }
    }
        
    private function assertTimeoutExists(millis: Int): Void {
        var found = false;
        
        for (timeout in _timeouts) {
            if (timeout.timeout == millis) {
                found = true;
                
                break;
            }
        }
        
        if (!found) {
            throw "Expected to find timeout with millis = " + millis + ", but did not";
        }
    }
    
    static function toCollection<T>(values : Array<T>) : Collection<List<T>, T> {
      return values.toList();
    }
    
    private function singleton<S>(e: S): Collection<List<S>, S> {
      return toCollection([e]);
    }
/*F 
     
     
     
     private function tuple2<A, B>(a: A, b: B): Tuple2<A, B> {
        return new Tuple2<A, B>(a, b);
    }
    private function tuple3<A, B, C>(a: A, b: B, c: C): Tuple3<A, B, C> {
        return new Tuple3<A, B, C>(a, b, c);
    }
    private function tuple4<A, B, C, D>(a: A, b: B, c: C, d: D): Tuple4<A, B, C, D> {
        return new Tuple4<A, B, C, D>(a, b, c, d);
    }
    private function tuple5<A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): Tuple5<A, B, C, D, E> {
        return new Tuple5<A, B, C, D, E>(a, b, c, d, e);
    }
    */
}