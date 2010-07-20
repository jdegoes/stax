package haxe.reactive;

import Prelude;


import haxe.test.TestCase;

import haxe.reactive.Reactive;

import haxe.reactive.BehaviorCollection;
import haxe.reactive.BehaviorBehavior;
import haxe.reactive.BehaviorFloat;
import haxe.reactive.BehaviorInt;
import haxe.reactive.BehaviorBool;
import haxe.reactive.Behaviors;
import haxe.reactive.StreamStream;
import haxe.reactive.StreamBool;
import haxe.reactive.Streams;
import haxe.reactive.Collections;

using Prelude;
using haxe.abstract.Foldable;

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


class ReactiveTester extends TestCase {
    public var counter:         Int;
    var _collectionsToStream:   Array<Int>;
    var _collectionsToStreamB:  Array<Int>;
    var _sendLaterIn:           Array<Int>;
    var _sendLater:             String;
    var _streamDelay:           Array<Int>;
    var _streamCalm:            Array<Int>;
    var _streamCalmB:           Array<Int>;
    
    var _now: Int;
    var _timeouts: Array<TimeoutBundle>;
    
    public function new():Void {
        super();            
        counter =               0;
        _now =                  0;
        _timeouts =             [];
        _collectionsToStream =  [];
        _collectionsToStreamB = [];
        _sendLaterIn =          [];
        _streamDelay =          [];
        _streamCalm =           [];
        _streamCalmB =          [];
        
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
        var stream: EventStream<Int> = Streams.identity();
        var self = this;
        
        var count = 0;
        
        var arr1: Iterable<Int> = [1, 2, 3, 4, 5, 6, 7];
        
        var sForEach = stream.forEach(function(v) { self.incrementCounter(); });
        pump(stream, arr1, sForEach);
        
        assertEquals(counter, 7);
        resetCounter();
    }
    
    public function testEach():Void {
        var stream: EventStream<Int> = Streams.identity();
        var self = this;
        
        var count = 0;
        
        var arr1: Iterable<Int> = [1, 2, 3, 4, 5, 6, 7];
        
        var each = stream.each(function(v) { self.incrementCounter(); });
        pump(stream, arr1, each);
        
        assertEquals(counter, 7);
        resetCounter();
    }
    
    public function testStreamToArray():Void {
        var self =      this;
        var stream =    stream();
        
        var array = stream.toArray();
        
        var iter: Iterable<Int> = [1, 2, 3, 4, 5];
        
        voidPump(stream, iter);
        
        assertIterableEquals([1, 2, 3, 4, 5], array);
    }
    
    public function testEventStreamConstant():Void {
        var stream:  EventStream<Int> = Streams.identity();

        var constant = stream.constant(3).toArray();
        for (i in 0...3) {
            stream.sendEvent(i);
        }
        
        assertIterableEquals([3, 3, 3], constant);
    }
    
    public function testBind():Void {
        var stream: EventStream<Int> = Streams.identity();

        var boundStreams: Array<EventStream<Int>> = [Streams.identity(), Streams.identity(), Streams.identity()];

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
        
        assertIterableEquals([], testStream);
        
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
        
        assertIterableEquals([1, 1, 2, 2, 3, 3, 4, 4], merged);
    }

    public function testDelayB():Void {
        setupTimingTest();
        var stream = Collections.toStream([1, 2, 3, 4], 5);
        
        var b = Behaviors.constant(7);
        
        assertTimeoutExists(5);
        
        var streams = [stream, stream.delayB(b)];
        
        var merged = Streams.merge(streams).toArray();
        
        advanceTime(30);
        
        assertIterableEquals([1, 2, 1, 3, 2, 4, 3, 4], merged.toArray());
    }

    public function testCalm():Void {
        setupTimingTest();
        
        var stream = Streams.identity();
        
        var calmed = stream.calm(10).toArray();
        
        for (i in 0...4) {
            stream.sendEvent(1);
            
            advanceTime(9);
        }
        
        assertIterableEquals([], calmed);
        
        advanceTime(1);
        
        for (i in 0...3) {
            stream.sendEvent(1);
            
            advanceTime(10);
        }
        
        assertIterableEquals([1, 1, 1, 1], calmed);
    }
    
    public function testCalmB():Void {
        setupTimingTest();
        
        var stream = Streams.identity();
        
        var b = Behaviors.constant(10);
        
        var calmed = stream.calmB(b).toArray();
        
        for (i in 0...4) {
            stream.sendEvent(1);
            
            advanceTime(9);
        }
        
        assertIterableEquals([], calmed);
        
        advanceTime(1);
        
        for (i in 0...3) {
            stream.sendEvent(1);
            
            advanceTime(10);
        }
        
        assertIterableEquals([1, 1, 1, 1], calmed);
    }
    
    public function testBlindB():Void {
        setupTimingTest();
        
        var stream = Streams.identity();
        
        var b = Behaviors.constant(4);
        
        var blinded = stream.blindB(b).toArray();
        
        for (i in 0...6) {
            stream.sendEvent(1);
            
            advanceTime(1);
        }
        
        assertIterableEquals([1, 1], blinded);
                
        for (i in 0...5) {
            advanceTime(4);
            stream.sendEvent(2);
        }
        
        assertIterableEquals([1, 1, 2, 2, 2], blinded);
    }
    
    public function testBlind():Void {
        setupTimingTest();
        
        var stream = Streams.identity();
        
        var blinded = stream.blind(4).toArray();
        
        for (i in 0...6) {
            stream.sendEvent(1);
            
            advanceTime(1);
        }
        
        assertIterableEquals([1, 1], blinded);
                
        for (i in 0...5) {
            advanceTime(4);
            stream.sendEvent(2);
        }
        
        assertIterableEquals([1, 1, 2, 2, 2], blinded);
    }
    
    public function testMap():Void {
        var stream: EventStream<Int> =  Streams.identity();
        
        var arr1: Iterable<Int> =       [1, 2, 3, 4, 5, 6, 7];
        
        var streamMap =                 stream.map(function(v) { return v * 2; });
        
        assertIterableEquals(pump(stream, arr1, streamMap), [2, 4, 6, 8, 10, 12, 14]);
    }
    
    public function testFlatMap():Void {
        var stream: EventStream<Int> = Streams.identity();

        var mappedStreams: Array<EventStream<Int>> = [Streams.identity(), Streams.identity(), Streams.identity()];

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
        
        assertIterableEquals([], sScanlNull);
        assertIterableEquals(["apple: 1", "apple: 1: 2", "apple: 1: 2: 3"], sScanl);
    }
    
    public function testScanlP():Void {
        var stream: EventStream<Int> = Streams.identity();
        
        var arr1: Iterable<Int> = [1, 2, 3, 4, 5, 6, 7];
        
        var sScanlP = stream.scanlP(function(v1, v2) { return v1 + v2; });
        
        assertIterableEquals(pump(stream, arr1, sScanlP), [1, 3, 6, 10, 15, 21, 28]);
    }
    
    public function testTake():Void {
        var stream: EventStream<Int> = Streams.identity();
        
        var arr1: Iterable<Int> = [1, 2, 3, 4, 5, 6, 7];
        var arr2: Iterable<Int> = [];
        
        assertIterableEquals(pump(stream, arr1, stream.take(3)), [1, 2, 3]);
        assertIterableEquals(pump(stream, arr1, stream.take(0)), []);
        assertIterableEquals(pump(stream, arr2, stream.take(3)), []);
        assertIterableEquals(pump(stream, arr1, stream.take(9)), [1, 2, 3, 4, 5, 6, 7]);
    }
    
    public function testTakeWhile():Void {
        var stream: EventStream<Int> = Streams.identity();
        
        var arr1: Iterable<Int> = [1, 2, 3, 4, 5, 6, 7];
        var arr2: Iterable<Int> = [];
        
        var lessThanFour =      function(v) { return v < 4; }
        var lessThanTen =       function(v) { return v < 10; }
        var greaterThanTwo =    function(v) { return v > 2; }
        
        assertIterableEquals(pump(stream, arr1, stream.takeWhile(lessThanFour)), [1, 2, 3]);
        assertIterableEquals(pump(stream, arr1, stream.takeWhile(greaterThanTwo)), []);
        assertIterableEquals(pump(stream, arr2, stream.takeWhile(lessThanFour)), []);
        assertIterableEquals(pump(stream, arr1, stream.takeWhile(lessThanTen)), [1, 2, 3, 4, 5, 6, 7]);
    }
    
    public function testShift():Void {
        var stream: EventStream<Int> = Streams.identity();
        
        var arr1: Iterable<Int> = [1, 2, 3, 4, 5, 6, 7];
        
        assertIterableEquals([1, 2], pump(stream, arr1, stream.shift(5)));
    }
    
    public function testShiftWhile():Void {
        var stream: EventStream<Int> =  Streams.identity();
        
        var arr1: Iterable<Int> =       [1, 2, 3, 4, 5, 6, 7];
        
        var lessThanFour = function(v) { return v < 4; }
        
        assertIterableEquals([1, 2, 3, 4], pump(stream, arr1, stream.shiftWhile(lessThanFour)));
    }
    
    public function testShiftWith():Void {
        var stream: EventStream<Int> =  Streams.identity();
        
        var arr1: Iterable<Int> =       [1, 2, 3, 4, 5, 6, 7];
        var arr2: Iterable<Int> =       [9, 8];
        
        assertIterableEquals([9, 8, 1, 2, 3, 4, 5], pump(stream, arr1, stream.shiftWith(arr2)));
    }
    
    public function testDrop():Void {
        var stream: EventStream<Int> =  Streams.identity();
        
        var arr1: Iterable<Int> =       [1, 2, 3, 4, 5, 6, 7];
        
        assertIterableEquals([5, 6, 7], pump(stream, arr1, stream.drop(4)));
        assertIterableEquals([], pump(stream, arr1, stream.drop(20)));
    }
    
    public function testDropWhile():Void {
        var stream: EventStream<Int> =  Streams.identity();
        
        var arr1: Iterable<Int> =       [1, 2, 3, 4, 5, 6, 7];
        
        var lessThanThree = function(v) { return v < 3; }
        
        assertIterableEquals([3, 4, 5, 6, 7], pump(stream, arr1, stream.dropWhile(lessThanThree)));
        assertIterableEquals([1, 2, 3, 4, 5, 6, 7], pump(stream, arr1, stream.dropWhile(function(v) { return v > 100; })));
    }
    
    public function testPartition():Void {
        var stream: EventStream<Int> = Streams.identity();
        
        var arr1: Iterable<Int> =   [1, 2, 3, 4, 5, 6, 7];
        var greaterThanFive =       function(v) { return v > 5; }
        
        var partition =     stream.partition(greaterThanFive);
        var partitioned =   pumpTuple2(stream, arr1, partition._1.toArray(), partition._2.toArray());
        
        assertIterableEquals([6, 7], partitioned._1);
        assertIterableEquals([1, 2, 3, 4, 5], partitioned._2);
    }
    
    public function testPartitionWhile():Void {
        var stream: EventStream<Int> = Streams.identity();
        
        var arr1: Iterable<Int> = [1, 2, 3, 4, 5, 6, 7];
        
        var lessThanTwo =       function(v) { return v < 2; }
        var lessThanOne =       function(v) { return v < 1; }
        var lessThanTwenty =    function(v) { return v < 20; }
        
        
        
        assertIterableEquals([1], pump(stream, arr1, stream.partition(lessThanTwo)._1));
        assertIterableEquals([2, 3, 4, 5, 6, 7], pump(stream, arr1, stream.partition(lessThanTwo)._2));
        
        assertIterableEquals([], pump(stream, arr1, stream.partition(lessThanOne)._1));
        assertIterableEquals([1, 2, 3, 4, 5, 6, 7], pump(stream, arr1, stream.partition(lessThanOne)._2));
        
        assertIterableEquals([1, 2, 3, 4, 5, 6, 7], pump(stream, arr1, stream.partition(lessThanTwenty)._1));
        assertIterableEquals([], pump(stream, arr1, stream.partition(lessThanTwenty)._2));
    }
    
    public function testFilter():Void {
        var stream: EventStream<Int> =  Streams.identity();
        
        var arr1: Iterable<Int> =       [1, 2, 3, 4, 5, 6, 7];
        var arr0: Iterable<Int> =       [];
        
        var equalsThree = function(v) { return v == 3; }
        
        assertIterableEquals([], pump(stream, arr0, stream.filter(equalsThree)));
        assertIterableEquals([3], pump(stream, arr1, stream.filter(equalsThree)));
    }
    
    public function testFilterWhile():Void {
        var stream: EventStream<Int> =  Streams.identity();
        var arr1: Iterable<Int> =       [1, 2, 3, 4, 5, 6, 7];
        var arr0: Iterable<Int> =       [];
        
        var lessThanSeven =     function(v) { return v < 7; }
        var greaterThanEight =  function(v) { return v > 8; }
        var equalsZero =        function(v) { return v == 0; }
        
        assertIterableEquals([1, 2, 3, 4, 5, 6], pump(stream, arr1, stream.filterWhile(lessThanSeven)));
        assertIterableEquals([], pump(stream, arr1, stream.filterWhile(greaterThanEight)));
        assertIterableEquals([], pump(stream, arr0, stream.filterWhile(lessThanSeven)));
        assertIterableEquals([], pump(stream, arr1, stream.filterWhile(equalsZero)));
    }

   
    public function testZip():Void {
        var stream: EventStream<Int> = Streams.identity();
        
        var arr0: Iterable<Int> = [];
        var arr1: Iterable<Int> = [1, 2, 3, 4, 5, 6, 7];
        
        var zipped = stream.zip(stream.shift(2)).map(function(t) { return t._1 * t._2; });
        
        assertIterableEquals([], pump(stream, arr0, zipped));
        assertIterableEquals([3, 8, 15, 24, 35], pump(stream, arr1, zipped));
    }
    
    public function testZip3():Void {
        var stream: EventStream<Int> = Streams.identity();
        
        var arr0: Iterable<Int> = [];
        var arr1: Iterable<Int> = [1, 2, 3, 4, 5, 6, 7];
        
        var zipped = stream.zip3(stream, stream).map(function(t) { return t._1 + t._2 - t._3; });
        
        assertIterableEquals([], pump(stream, arr0, zipped));
        assertIterableEquals([1, 2, 3, 4, 5, 6, 7], pump(stream, arr1, zipped));
    }
    
    public function testZip4():Void {
        var stream: EventStream<Int> = Streams.identity();
        
        var stream2 = stream.map(function(v) { return v + 1; });
        var stream3 = stream.map(function(v) { return v * 2; });
        var stream4 = stream.map(function(v) { return v - 1; });
        
        var arr0: Iterable<Int> = [];
        var arr1: Iterable<Int> = [1, 2, 3, 4, 5, 6, 7];
        
        var zipped = stream.zip4(stream2, stream3, stream4).toArray();
        
        voidPump(stream, arr0);
        
        assertIterableEquals([], zipped);
        
        voidPump(stream, arr1);
        
        var testArray = [];
        
        for (e in zipped) {
            var curArray = [];
            for (i in e) {
                curArray.push(i);
            }
            testArray.push(curArray);
        }
        
        assertIterableEquals([[1, 2, 2, 0], [2, 3, 4, 1], [3, 4, 6, 2], [4, 5, 8, 3], [5, 6, 10, 4], [6, 7, 12, 5], [7, 8, 14, 6]], testArray);
    }
    
    public function testZip5():Void {
        var stream: EventStream<Int> = Streams.identity();
        
        var stream2 = stream.map(function(v) { return v + 1; });
        var stream3 = stream.map(function(v) { return v * 2; });
        var stream4 = stream.map(function(v) { return v - 1; });
        var stream5 = stream.map(function(v) { return v  / 2 * 10; });
        
        var arr0: Iterable<Int> = [];
        var arr1: Iterable<Int> = [1, 2, 3, 4, 5, 6, 7];
        
        var zipped = stream.zip5(stream2, stream3, stream4, stream5).toArray();
        
        voidPump(stream, arr0);
        
        assertIterableEquals([], zipped);
        
        voidPump(stream, arr1);
        
        var testArray = [];
        
        for (e in zipped) {
            var curArray = [];
            for (i in e) {
                curArray.push(i);
            }
            testArray.push(curArray);
        }
        
        assertIterableEquals([[1, 2, 2, 0, 5], [2, 3, 4, 1, 10], [3, 4, 6, 2, 15], [4, 5, 8, 3, 20], [5, 6, 10, 4, 25], [6, 7, 12, 5, 30], [7, 8, 14, 6, 35]], testArray);
    }
    
    public function testGroup():Void {
        var stream: EventStream<Int> = Streams.identity();
        
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
        
        assertIterableEquals([[1], [2, 2], [3], [4], [5, 5, 5], [6]], testArray);
    }

    public function testGroupBy():Void {
        var stream: EventStream<String> = Streams.identity();
        
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
        
        assertIterableEquals(grouped, [["foo", "bar"], ["blat"], ["bit"], ["a"], ["chip", "chop"]]);
        
    }


    public function testMerge():Void {
        var stream:  EventStream<Int> = Streams.identity();
        var stream1: EventStream<Int> = Streams.identity();
        var stream2: EventStream<Int> = Streams.identity();
        
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

        assertIterableEquals([], pump(stream, arr0, merged));
        assertIterableEquals([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7], pump(stream1, arr1, merged));
        assertIterableEquals([1, 2, 3, 4, 5, 6, 7, 4, 5, 6], test);
    }
    
    public function testUniqueSteps():Void {
        var stream: EventStream<Int> =  Streams.identity();
        var stream2: EventStream<Int> = Streams.identity();
        
        var arrT: Array<Int> =  [4, 5, 6];
        var arrT2: Array<Int> = [4, 5, 6];
        
        var streams = stream.merge(stream2).merge(stream.map(function(v) { return v + 1; }));
        
        var uniques = streams.uniqueSteps().toArray();
        
        voidPump(stream, arrT);
        voidPump(stream2, arrT2);
        
        assertIterableEquals([4, 5, 6, 4, 5, 6], uniques);
    }
    
    public function testUniqueEvents():Void {
        var stream: EventStream<Int> = Streams.identity();
        var arr: Array<Int> = [4, 5, 6, 7];
        
        var streams = stream.merge(stream.map(function(v) { return v; })).merge(stream.map(function(t) { return t + 4; }));
        
        var uniques = streams.uniqueEvents().toArray();
        
        voidPump(stream, arr);
        
        assertIterableEquals([4, 8, 5, 9, 6, 10, 7, 11], uniques);
    }
    
    public function testUnique():Void {
        var stream:     EventStream<Int> = Streams.identity();
        var stream2:    EventStream<Int> = Streams.identity();
        
        var arr:  Array<Int> = [4, 5, 6, 7];
        var arr2: Array<Int> = [1, 2, 3, 4];
        var streams = stream.merge(stream.map(function(v) { return v; })).merge(stream.map(function(t) { return t + 4; })).merge(stream2);
        
        var uniques = streams.unique().toArray();
        
        voidPump(stream2, arr2);
        voidPump(stream, arr);
        
        assertIterableEquals([1, 2, 3, 4, 5, 6, 7], uniques);
    }
    
    public function testFilterRepeats():Void {
        var stream = stream();
        
        var arr0: Iterable<Int> = [];
        var arr1: Iterable<Int> = [1, 2, 3, 3, 2, 0, 7, 7, 4, 5, 6, 7];
        
        var filtered = stream.filterRepeats();

        assertIterableEquals([], pump(stream, arr0, filtered));
        assertIterableEquals([1, 2, 3, 2, 0, 7, 4, 5, 6, 7], pump(stream, arr1, filtered));
    }
    
    public function testFilterRepeatsBy():Void {
        var stream = stream();
        
        var arr0: Iterable<Int> = [];
        var arr1: Iterable<Int> = [2, 2, 4, 8, 0, 0, 7, 7, 4, 5, 10, 7];
        
        var cmp = function(v1: Int, v2: Int): Bool { return v1 == v2 / 2; };
        var filteredBy = stream.filterRepeatsBy(1, cmp);
        
        assertIterableEquals([], pump(stream, arr0, filteredBy));
        assertIterableEquals([4,0,7,7,4,5,7], pump(stream, arr1, filteredBy));
    }
    
    public function testSnapshot():Void {
        var stream = stream();
        
        var myBehavior = Streams.identity().startsWith(0);
        myBehavior.changes().sendEvent(4);
        
        var snapshot = stream.snapshot(myBehavior).toArray();
        var arr1: Iterable<Int> = [2, 8];
        
        for (e in arr1) {
            stream.sendEvent(e);
        }
        
        myBehavior.changes().sendEvent(6);
        
        for (e in arr1) {
            stream.sendEvent(e);
        }
        
        assertIterableEquals([4, 4, 6, 6], snapshot);
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
    
    public function testCollectionsToStreamB():Void {
            setupTimingTest();
            
            var timeBehavior = Behaviors.constant(2);
            var stream = Collections.toStreamB([1, 2, 3, 4, 5], timeBehavior);
            var contents = stream.toArray();

            _now = 0;
            assertIterableEquals([], contents);
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
        var stream1:  EventStream<Int> = Streams.identity();
        var stream2:  EventStream<Int> = Streams.identity();
        
        var streams:Iterable<EventStream<Int>> = [stream1, stream2];
        
        var arr1: Iterable<Int> = [2, 2, 4, 8];
        
        var newStream = Streams.create(function(pulse) { return propagate(pulse); }, streams).toArray();
        
        for (i in arr1) {
            stream1.sendEvent(i);
            stream2.sendEvent(i + 1);
        }
        
        assertIterableEquals([2, 3, 2, 3, 4, 5, 8, 9], newStream);
    }
    
    public function testStreamsIdentity():Void {
        var stream:  EventStream<Int> = Streams.identity();
        
        var pumped = stream.toArray();
        
        voidPump(stream, [99, 99, 99, 99]);
        
        assertIterableEquals([99, 99, 99, 99], pumped);
    }
    
    public function testStreamsReceiver():Void {
        var stream:  EventStream<Int> = Streams.receiver();
        
        var pumped = stream.toArray();
        
        voidPump(stream, [99, 99, 99, 99]);
        
        assertIterableEquals([99, 99, 99, 99], pumped);
    }
    
    public function testStreamsMerge():Void {
        var stream1:  EventStream<Int> = Streams.identity();
        var stream2:  EventStream<Int> = Streams.identity();
        var stream3:  EventStream<Int> = Streams.identity();
        
        var mergeArray:Iterable<EventStream<Int>> = [stream1, stream2, stream3];
        
        var arr1: Iterable<Int> = [2, 2, 4, 8];
        var arr2: Iterable<Int> = [9, 8, 7];
        
        var merged = Streams.merge(mergeArray).toArray();
        
        for (i in arr1) {
            stream1.sendEvent(i);
            stream2.sendEvent(i + 1);
        }
        
        voidPump(stream3, arr2);
        
        assertIterableEquals([2, 3, 2, 3, 4, 5, 8, 9, 9, 8, 7], merged);
    }
    
    public function testStreamsZero():Void {
        var stream0: EventStream<Int> = Streams.zero();
        
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
        
        var stream:  EventStream<Int> = Streams.one(100);
        
        var contents = stream.toArray();
        
        var self = this;
        
        var bundle = _timeouts.pop();
        
        assertEquals(0, bundle.timeout);
        
        bundle.func();
        
        assertIterableEquals([100], contents);
    }
    
    public function testStreamsConstant():Void {
        var stream1 = Streams.identity();
        var stream2 = stream1.map(function(v) { return v * 2; });
        
        var mergeArray:Iterable<EventStream<Int>> = [stream1, stream2];
        
        var arr1: Iterable<Int> = [2, 2, 4, 8];
        
        var constant = Streams.constant(9, mergeArray).toArray();
        
        for (i in arr1) {
            stream1.sendEvent(i);
        }
        
        assertIterableEquals([9, 9, 9, 9, 9, 9, 9, 9], constant);
    }
    
    public function testStreamsCond():Void {
        var boolStream: EventStream<Bool> =      Streams.identity();
        var ifTrueStream: EventStream<String> =  boolStream.map(function(v) { return "Is True"; } );
        
        var conditions: Iterable<Tuple2<EventStream<Bool>, EventStream<String>>> = [Tuple2.from(boolStream, ifTrueStream)];
        var boolArray = [true, false, true];
        
        var conded = Streams.cond(conditions).toArray();

        voidPump(boolStream, boolArray);
        
        assertIterableEquals(["Is True", "Is True"], conded);
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
    
    public function testTimerB(): Void {
        setupTimingTest();
        
        var stream = Streams.timerB(Behaviors.constant(10));
        
        var output = stream.toArray();
        
        assertTimeoutExists(10);
        
        advanceTime(50);
        
        assertEquals(60, _timeouts[0].timeout);
        assertEquals(50, output.pop());
    }
    
    public function testStreamZipN():Void {
        var stream1 = Streams.identity();
        var stream2 = stream1.map(function(v) { return v + 1; });
        
        var iterables: Iterable<EventStream<Int>> = [stream1, stream2];
        
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
        
        assertIterableEquals([[2, 3], [2, 3], [4, 5], [8, 9]], testArray);
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
    
    public function testRandomB(): Void {
        setupTimingTest();
        
        var b = Behaviors.constant(5);
        var stream = Streams.randomB(b);
        
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
        
        assertIterableEquals([false, true, false], not);
    }
    
    public function testStreamBoolAnd():Void {
        var stream = stream();
        
        var iterables:Iterable<EventStream<Bool>> =  [stream, stream];
        var iterables2:Iterable<EventStream<Bool>> = [stream, stream.map(function(v) { return false; })];
        
        var boolArr =  [true, true, true];
        
        var and =  StreamBool.and(iterables).toArray();
        var and2 = StreamBool.and(iterables2).toArray();
        
        voidPump(stream, boolArr);
        
        assertIterableEquals([true, true, true], and);
        assertIterableEquals([false, false, false], and2);
    }

    public function testStreamBoolOr():Void {
        var stream = stream();
        
        var index = 0;
        var mappedValues = [true, false, false];
        
        var iterables:Iterable<EventStream<Bool>> = [stream, stream.map(function(v) { return mappedValues[index++]; })];
        
        var boolArr =  [true, false, true];
        
        var or = StreamBool.or(iterables).toArray();
        
        voidPump(stream, boolArr);
        
        assertIterableEquals([true, false, true], or);
    }
    
    public function testStreamBoolIfTrue():Void {
        var stream =  stream();
        var boolArr = [false, true, false];
        
        var ifTrue =   stream.map(function(v) { return "Is True"; });
        var ifFalse =  stream.map(function(v) { return "Is False"; });

        var evaluator = StreamBool.ifTrue(stream, ifTrue, ifFalse).toArray();
        
        voidPump(stream, boolArr);
        
        assertIterableEquals(["Is False", "Is True", "Is False"], evaluator);
        
    }
/*
* -----------------  StreamStream Tests  -------------------
* Missing: 
* Broken:  
*/
    
    public function testStreamStreamFlatten():Void {
        var stream =  stream();
        
        var iterables: EventStream<EventStream<Bool>> = Streams.identity();
        var boolArr =  [true, true, true];
        
        var flattened = StreamStream.flatten(iterables).toArray();
        
        iterables.sendEvent(stream);
        iterables.sendEvent(stream.map(function(v) { return false; }));
        
        voidPump(stream, boolArr);
        
        assertIterableEquals([false, false, false], flattened);
        
        iterables.sendEvent(stream);
        voidPump(stream, boolArr);
        
        assertIterableEquals([false, false, false, true, true, true], flattened);
    }
    
    public function testStreamStreamSwitchE():Void {
        var stream = stream();
        
        var iterables: EventStream<EventStream<Bool>> = Streams.identity();
        var boolArr =  [true, true, true];
        
        var switchEed = StreamStream.switchE(iterables).toArray();
        
        iterables.sendEvent(stream);
        iterables.sendEvent(stream.map(function(v) { return false; }));
        
        voidPump(stream, boolArr);
        
        assertIterableEquals([false, false, false], switchEed);
        
        iterables.sendEvent(stream);
        voidPump(stream, boolArr);
        
        assertIterableEquals([false, false, false, true, true, true], switchEed);
    }
    
    public function testStreamStreamJoin():Void {
        var stream = stream();
        
        var iterables: EventStream<EventStream<Bool>> = Streams.identity();
        var boolArr =  [true, true, true];
        
        var joined = StreamStream.join(iterables).toArray();
        
        iterables.sendEvent(stream);
        iterables.sendEvent(stream.map(function(v) { return false; }));
        
        voidPump(stream, boolArr);
        
        assertIterableEquals([false, false, false], joined);
        
        iterables.sendEvent(stream);
        voidPump(stream, boolArr);
        
        assertIterableEquals([false, false, false, true, true, true], joined);
    }

/*
* -----------------  BehaviorTests  -------------------
* Missing: 
* Broken:  
*/
    
    public function testBehaviorChanges():Void {
        var stream = stream();
        
        var myBehavior = Streams.identity().startsWith(0);
        var array = myBehavior.changes().toArray();
        
        myBehavior.changes().sendEvent(4);
        myBehavior.changes().sendEvent(3);
        
        assertIterableEquals([4, 3], array);
    }
    
    public function testBehaviorValueNow():Void {
        var stream = stream();
        
        var myBehavior = Streams.identity().startsWith(0);
        
        myBehavior.changes().sendEvent(3);
        
        assertEquals(3, myBehavior.valueNow());
    }
    
    public function testBehaviorMapC():Void {
        var stream = stream();
        
        var mapper: EventStream<Int> -> EventStream<Int> = function(v: EventStream<Int>) { return v.map(function(val) { return val + 1; }); };
        var behaviorArray = [1, 2, 3, 4, 5];
        var myBehavior = Streams.identity().startsWith(0);
        
        var array = myBehavior.mapC(mapper).changes().toArray();
        
        for (i in behaviorArray) {
            myBehavior.changes().sendEvent(i);
        }
        
        assertIterableEquals([2, 3, 4, 5, 6], array);
    }
    
    public function testBehaviorMap():Void {
        var stream = stream();
        
        var mapper: Int -> String = function(v) { return Std.string(v) + ": Iterating"; };
        var behaviorArray = [1, 2, 3, 4, 5];
        var myBehavior = Streams.identity().startsWith(0);
        
        var array = myBehavior.map(mapper).changes().toArray();
        
        for (i in behaviorArray) {
            myBehavior.changes().sendEvent(i);
        }
        
        assertIterableEquals(["1: Iterating", "2: Iterating", "3: Iterating", "4: Iterating", "5: Iterating"], array);
    }
    
    public function testBehaviorMapB():Void {
        var streamM = stream();
        
        var stream:  EventStream<Int -> String> =   Streams.identity();
        
        var beFunc = stream.startsWith(function(v) { return Std.string(v); });
        
        var behaviorArray = [1, 2];
        var myBehavior = Streams.identity().startsWith(0);
        
        var array = myBehavior.mapB(beFunc).changes().toArray();
        
        stream.sendEvent(function(v) { return Std.string(v) + ": String"; });
        
        for (i in behaviorArray) {
            myBehavior.changes().sendEvent(i);
        }
        
        assertIterableEquals(["1: String", "2: String"], array);
    }
    
    public function testBehaviorZip():Void {
        var myBehavior = stream().startsWith(0);
        
        var mappedBehavior = myBehavior.map(function(v) { return v + 1; });
        
        var zipped: Behavior<Tuple2<Int, Int>> = myBehavior.zip(mappedBehavior);
        
        var all = zipped.changes().toArray();
        
        assertTrue(Filter.isEqual(Tuple2.from(0, 1), zipped.valueNow()));
        
        myBehavior.sendBehavior(2);
        
        assertTrue(Filter.isEqual(Tuple2.from(2, 3), zipped.valueNow()));
        
        myBehavior.sendBehavior(3);
        
        assertTrue(Filter.isEqual(Tuple2.from(3, 4), zipped.valueNow()));
    }
    
    public function testBehaviorZip3():Void {
        var myBehavior = stream().startsWith(0);
        
        var mappedBehavior1 = myBehavior.map(function(v) { return v + 1; });
        var mappedBehavior2 = mappedBehavior1.map(function(v) { return v + 1; });
        
        var zipped = myBehavior.zip3(mappedBehavior1, mappedBehavior2);
        
        assertTrue(Filter.isEqual(Tuple3.from(0, 1, 2), zipped.valueNow()));
        
        myBehavior.sendBehavior(2);
        
        assertTrue(Filter.isEqual(Tuple3.from(2, 3, 4), zipped.valueNow()));
        
        myBehavior.sendBehavior(3);
        
        assertTrue(Filter.isEqual(Tuple3.from(3, 4, 5), zipped.valueNow()));
    }
    
    public function testBehaviorZip4():Void {
        var myBehavior = stream().startsWith(0);
        
        var mappedBehavior1 = myBehavior.map(function(v) { return v + 1; });
        var mappedBehavior2 = mappedBehavior1.map(function(v) { return v + 1; });
        var mappedBehavior3 = mappedBehavior2.map(function(v) { return v * 2; });
        
        var zipped = myBehavior.zip4(mappedBehavior1, mappedBehavior2, mappedBehavior3);
        
        assertTrue(Filter.isEqual(Tuple4.from(0, 1, 2, 4), zipped.valueNow()));
        
        myBehavior.sendBehavior(2);
        
        assertTrue(Filter.isEqual(Tuple4.from(2, 3, 4, 8), zipped.valueNow()));
        
        myBehavior.sendBehavior(3);
        
        assertTrue(Filter.isEqual(Tuple4.from(3, 4, 5, 10), zipped.valueNow()));
    }
    
    public function testBehaviorZip5():Void {
        var myBehavior = stream().startsWith(0);
        
        var mappedBehavior1 = myBehavior.map(function(v) { return v + 1; });
        var mappedBehavior2 = mappedBehavior1.map(function(v) { return v + 1; });
        var mappedBehavior3 = mappedBehavior2.map(function(v) { return v * 2; });
        var mappedBehavior4 = mappedBehavior3.map(function(v) { return v * 2 - 10; });
        
        var zipped = myBehavior.zip5(mappedBehavior1, mappedBehavior2, mappedBehavior3, mappedBehavior4);
        
        assertTrue(Filter.isEqual(Tuple5.from(0, 1, 2, 4, -2), zipped.valueNow()));
        
        myBehavior.sendBehavior(2);
        
        assertTrue(Filter.isEqual(Tuple5.from(2, 3, 4, 8, 6), zipped.valueNow()));
        
        myBehavior.sendBehavior(3);
        
        assertTrue(Filter.isEqual(Tuple5.from(3, 4, 5, 10, 10), zipped.valueNow()));
    }

    public function testBehaviorZipN():Void {
        var stream = stream();
        
        var behaviorArray = [0, 1, 2, 3];
        var myBehavior = Streams.identity().startsWith(0);
        
        var myBehaviors: Array<Behavior<Int>> = [myBehavior, myBehavior.map(function(v) { return v + 1; })];
        
        var zipped = myBehavior.zipN(myBehaviors).changes().toArray();
        
        for (i in behaviorArray) {
            myBehavior.changes().sendEvent(i);
        }
               
        var testArray = [];
        
        for (e in zipped) {
            var curArray = [];
            for (i in e) {
                curArray.push(i);
            }
            testArray.push(curArray);
        }
        
        assertIterableEquals([[0, 0, 1], [1, 1, 2], [2, 2, 3], [3, 3, 4]], testArray);
    }
    
    public function testBehaviorCalm(): Void {
        setupTimingTest();
        var stream = stream();
        
        var myBehavior = stream.startsWith(0);
        
        var calmed = myBehavior.calm(3);
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
        
        assertIterableEquals([1, 2, 2, 3, 3, 3], output);
    }
    
    public function testBehaviorBlind(): Void {
        setupTimingTest();
        var stream = stream();
        
        var myBehavior = stream.startsWith(0);
        
        var blinded = myBehavior.blind(3);
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
        
        assertIterableEquals([0, 1, 2, 3, 3, 3, 4, 4], output);
    }
    
    public function testBehaviorBlindb(): Void {
        setupTimingTest();
        var stream = stream();
        
        var b = Behaviors.constant(8);
        var myBehavior = stream.startsWith(0);
        
        var blinded = myBehavior.blindB(b);
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
        
        assertIterableEquals([5, 5, 5, 1, 1, 10, 10], output);
    }
    
    public function testBehaviorCalmB(): Void {
        setupTimingTest();
        var stream = stream();
        
        var b = Behaviors.constant(4);
        var myBehavior = stream.startsWith(0);
        
        var calmed = myBehavior.calmB(b);
        var output = calmed.changes().toArray();
        
        stream.sendEvent(0);
        
        for (i in 0...3) {
            advanceTime(2);
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
        
        assertIterableEquals([99, 56, 15, 15, 15, 4], output);
    }
    
    public function testBehaviorDelay(): Void {
        setupTimingTest();
        
        var stream2 = Collections.toStream([1, 2, 3, 4], 5).startsWith(0);
        
        var streams = stream2.zip3(stream2.delay(10), stream2.map(function(v) { return v -1; }));
        var output = streams.changes().toArray();
        
        advanceTime(5);
        
        assertIterableEquals(Tuple3.from(1, 0, 0), streams.valueNow());
        
        advanceTime(5);
        
        assertIterableEquals(Tuple3.from(2, 0, 1), streams.valueNow());
        
        advanceTime(5);
          
        assertIterableEquals(Tuple3.from(3, 1, 2), streams.valueNow());
        
        advanceTime(5);
        
        assertIterableEquals(Tuple3.from(4, 2, 3), streams.valueNow());
        
        advanceTime(5);
        
        assertIterableEquals(Tuple3.from(4, 3, 3), streams.valueNow());
        
        advanceTime(5);
        
        assertIterableEquals(Tuple3.from(4, 4, 3), streams.valueNow());
    }
    
    public function testBehaviorDelayB(): Void {
        setupTimingTest();
        
        var stream2 = Collections.toStream([1, 2, 3, 4], 5).startsWith(0);
        
        var b = Behaviors.constant(5);
        
        var streams = stream2.zip3(stream2.delayB(b), stream2.map(function(v) { return v -1; }));
        var output = streams.changes().toArray();
        
        advanceTime(5);
        
        assertIterableEquals(Tuple3.from(1, 0, 0), streams.valueNow());
        
        advanceTime(5);
        
        assertIterableEquals(Tuple3.from(2, 1, 1), streams.valueNow());
        
        advanceTime(5);
        
        assertIterableEquals(Tuple3.from(3, 2, 2), streams.valueNow());
        
        advanceTime(5);
        
        assertIterableEquals(Tuple3.from(4, 3, 3), streams.valueNow());
        
        advanceTime(5);
        
        assertIterableEquals(Tuple3.from(4, 4, 3), streams.valueNow());
    }
    
    public function testBehaviorSend(): Void {
        var myBehavior = Streams.identity().startsWith(0);
        
        var behaviorArray = [1, 2, 3, 4, 5];
        
        for (i in behaviorArray) {
            myBehavior.sendBehavior(i);
        }
        
        assertEquals(5, myBehavior.valueNow());
    }
    
/*
* -----------------  BehaviorsTests  -------------------
* Missing:
* Broken:  
*/
    
    public function testBehaviorsZipN():Void {
        var myBehavior =  Streams.identity().startsWith(0);
        var myBehaviors = [myBehavior, myBehavior.map(function(v) { return v + 1; })];
        
        var behaviorArray = [1, 2, 3, 4, 5];
        
        var zipped = Behaviors.zipN(myBehaviors).changes().toArray();
        
        for (i in behaviorArray) {
            myBehavior.sendBehavior(i);
            
        }
          
        var testArray = [];
        
        for (e in zipped) {
            var curArray = [];
            for (i in e) {
                curArray.push(i);
            }
            testArray.push(curArray);
        }
        
        assertIterableEquals([[1, 2], [2, 3], [3, 4], [4, 5], [5, 6]], testArray);
    }
    
    public function testBehaviorsSample():Void {
        setupTimingTest();
        
        var stream = Collections.toStream([1, 2, 3, 4], 5);
        
        var sampled = Behaviors.sample(10);
        
        var output = sampled.changes().toArray();
        
        advanceTime(60);
        
        assertIterableEquals([10, 20, 30, 40, 50, 60], output);
    }
    
    public function testBehaviorsSampleB():Void {
        setupTimingTest();
        
        var stream = Collections.toStream([1, 2, 3, 4], 5);
        
        var b =       Behaviors.constant(15);
        var sampled = Behaviors.sampleB(b);
        
        var output = sampled.changes().toArray();
        
        advanceTime(60);
        
        assertIterableEquals([15, 30, 45, 60], output);
    }
    
    public function testBehaviorsCond():Void {
        var trueBehavior =  Behaviors.constant("Is True");
        var falseBehavior = Behaviors.constant("Is False");
        
        var t = Behaviors.constant(true);
        
        var conditions: Array<Tuple2<Behavior<Bool>, Behavior<String>>> = [Tuple2.from(t, trueBehavior)];
        
        var conded = Behaviors.cond(conditions, falseBehavior);
        
        assertEquals("Is True", conded.valueNow());
        
        t.sendBehavior(false);
        
        assertFalse(t.valueNow());
        
        assertEquals("Is False", conded.valueNow());
    }
    
    public function testBehaviorsConstant():Void {
        var myBehavior = Behaviors.constant(9);
        
        assertEquals(9, myBehavior.valueNow());
                
        myBehavior.changes().sendEvent(4);
        myBehavior.changes().sendEvent(6);
        
        myBehavior = Behaviors.constant(2);
        
        assertEquals(2, myBehavior.valueNow());
    }
    
/*
* -----------------  BehaviorBool Tests  -------------------
* Missing: 
* Broken:  
*/
    public function testBehaviorBoolNot():Void {
        var myBehavior = stream().startsWith(true);
        
        var boolArray = [true, true, false, true];
        
        var not = BehaviorBool.not(myBehavior).changes().toArray();
        
        voidPump(myBehavior.changes(), boolArray);
        
        assertIterableEquals([false, false, true, false], not);
    }
    
    public function testBehaviorBoolIfTrue():Void {
        var myBehavior = Behaviors.constant(true);
        
        var isTrue =  Behaviors.constant("Is True");
        var isFalse = Behaviors.constant("Is False");
        
        var evaluator = BehaviorBool.ifTrue(myBehavior, isTrue, isFalse);
        
        assertEquals("Is True", evaluator.valueNow());
        
        myBehavior.sendBehavior(false);
        
        assertEquals("Is False", evaluator.valueNow());
    }
    
    public function testBehaviorBoolAnd():Void {
        var myBehavior1 =  Behaviors.constant(true);
        var myBehavior2 =  Streams.identity().startsWith(false);
        
        var behaviors: Iterable<Behavior<Bool>> = [myBehavior1, myBehavior2];
                
        var and = BehaviorBool.and(behaviors);
        
        assertFalse(and.valueNow());
        
        myBehavior2.sendBehavior(true);
        
        assertTrue(and.valueNow());
        
        myBehavior1.sendBehavior(false);
        
        assertFalse(and.valueNow());
    }
    
    public function testBehaviorBoolOr():Void {
        var myBehavior =  Behaviors.constant(true);
        var myBehavior2 = Behaviors.constant(false);
        
        var behaviors: Iterable<Behavior<Bool>> =   [myBehavior, myBehavior2];
                
        var evaluator = BehaviorBool.or(behaviors);
        
        assertTrue(evaluator.valueNow());
        
        myBehavior.sendBehavior(false);
        
        assertFalse(evaluator.valueNow());
        
        myBehavior2.sendBehavior(true);
        
        assertTrue(evaluator.valueNow());
        
        myBehavior.sendBehavior(true);
        
        assertTrue(evaluator.valueNow());
    }
    
/*
* -----------------  BehaviorInt Tests  -------------------
*/

    public function testBehaviorIntPlus():Void {
        var myBehavior = Behaviors.constant(9);
        
        var plus = BehaviorInt.plus(myBehavior, 9);
        
        assertEquals(18, plus.valueNow());
        
        plus = BehaviorInt.plus(plus, -19);
        assertEquals(-1, plus.valueNow());
    }
    
    public function testBehaviorIntPlusB():Void {
        var myBehavior =    Behaviors.constant(9);
        var addBehavior =   Behaviors.constant(-3);
        
        var plusB = BehaviorInt.plusB(myBehavior, addBehavior);
        
        assertEquals(6, plusB.valueNow());
    }
    
    public function testBehaviorIntMinus():Void {
        var myBehavior = Behaviors.constant(9);
        
        var minus = BehaviorInt.minus(myBehavior, 9);
        
        assertEquals(0, minus.valueNow());
        
        minus = BehaviorInt.minus(minus, -19);
        
        assertEquals(19, minus.valueNow());
    }
    
    public function testBehaviorIntMinusB():Void {
        var myBehavior =    Behaviors.constant(9);
        var minusBehavior = Behaviors.constant(-3);
        
        var minusB = BehaviorInt.minusB(myBehavior, minusBehavior);
        
        assertEquals(12, minusB.valueNow());
    }
    
    
    public function testBehaviorIntTimes():Void {
        var myBehavior = Behaviors.constant(4);
        
        var times = BehaviorInt.times(myBehavior, 3);
        
        assertEquals(12, times.valueNow());
    }
    
    public function testBehaviorIntTimesB():Void {
        var myBehavior =    Behaviors.constant(2);
        var timesBehavior = Behaviors.constant(-5);
        
        var timesB = BehaviorInt.timesB(myBehavior, timesBehavior);
        
        assertEquals(-10, timesB.valueNow());
    }
    
    public function testBehaviorIntMod():Void {
        var myBehavior = Behaviors.constant(12);
        
        var mod = BehaviorInt.mod(myBehavior, 3);
        
        assertEquals(0, mod.valueNow());
        
        mod = BehaviorInt.mod(myBehavior, 5);
        
        assertEquals(2, mod.valueNow());
    }
    
    public function testBehaviorIntModB():Void {
        var myBehavior =    Behaviors.constant(12);
        var modBehavior =   Behaviors.constant(2);
        
        var mod = BehaviorInt.modB(myBehavior, modBehavior);
        
        assertEquals(0, mod.valueNow());
        
        myBehavior.sendBehavior(13);
        
        assertEquals(1, mod.valueNow());
    }
    
    public function testBehaviorIntDividedBy():Void {
        var myBehavior = Behaviors.constant(24);
        
        var divided = BehaviorInt.dividedBy(myBehavior, 6);
        
        assertEquals(4, divided.valueNow());
        
        myBehavior.sendBehavior(-12);
        
        assertEquals(-2, divided.valueNow());
    }
    
    public function testBehaviorIntDividedByB():Void {
        var myBehavior =    Behaviors.constant(24);
        var divBehavior =   Behaviors.constant(2);
        
        var divided = BehaviorInt.dividedByB(myBehavior, divBehavior);
        
        assertEquals(12, divided.valueNow());
        
        myBehavior.sendBehavior(12);
        
        assertEquals(6, divided.valueNow());
    }
    
    public function testBehaviorIntAbs():Void {
        var myBehavior = Behaviors.constant(-24);
        
        var abs = BehaviorInt.abs(myBehavior);
        
        assertEquals(24, abs.valueNow());
    }
    
    public function testBehaviorIntNegate():Void {
        var myBehavior = Behaviors.constant(0);
        
        var negate = BehaviorInt.negate(myBehavior);
        
        assertEquals(0, negate.valueNow());
        
        myBehavior.sendBehavior(6);
        
        assertEquals(-6, negate.valueNow());
    }
    
    public function testBehaviorIntToFloat():Void {
        var myBehavior = Behaviors.constant(2);
        
        var toFloat = BehaviorInt.toFloat(myBehavior);
        
        assertEquals(2.0, toFloat.valueNow());
    }

/*
* -----------------  BehaviorFloat Tests  -------------------
* Missing: 
* Broken:  
*/

    public function testBehaviorFloatPlus():Void {
        var myBehavior = Behaviors.constant(9.5);
        
        var plus = BehaviorFloat.plus(myBehavior, 8.5);
        
        assertEquals(18.0, plus.valueNow());
        
        myBehavior.sendBehavior(-10);
        assertEquals(-1.5, plus.valueNow());
    }
    
    public function testBehaviorFloatPlusB():Void {
        var myBehavior =    Behaviors.constant(9.5);
        var addBehavior =   Behaviors.constant(-3.0);
        
        var plusB = BehaviorFloat.plusB(myBehavior, addBehavior);
        
        assertEquals(6.5, plusB.valueNow());
    }
    
    public function testBehaviorFloatMinus():Void {
        var myBehavior = Behaviors.constant(8.5);
        
        var minus = BehaviorFloat.minus(myBehavior, 9.0);
        
        assertEquals(-0.5, minus.valueNow());
        
        myBehavior.sendBehavior(-9.5);
        
        assertEquals(-18.5, minus.valueNow());
    }
    
    public function testBehaviorFloatMinusB():Void {
        var myBehavior =    Behaviors.constant(-4.5);
        var minusBehavior = Behaviors.constant(-5.0);
        
        var minusB = BehaviorFloat.minusB(myBehavior, minusBehavior);
        
        assertEquals(0.5, minusB.valueNow());
    }
    
    public function testBehaviorFloatTimes():Void {
        var myBehavior = Streams.identity().startsWith(2.0);
        
        var times = BehaviorFloat.times(myBehavior, 3.7);

        assertEquals(7.4, times.valueNow());
    }
    
    public function testBehaviorFloatTimesB():Void {
        var myBehavior =    Behaviors.constant(4.0);
        var timesBehavior = Behaviors.constant(-5.5);
        
        var timesB = BehaviorFloat.timesB(myBehavior, timesBehavior);
        
        assertEquals(-22.0, timesB.valueNow());
    }
    
    public function testBehaviorFloatDividedBy():Void {
        var myBehavior = Behaviors.constant(22.2);
        
        var divided = BehaviorFloat.dividedBy(myBehavior, 11.1);
        
        assertEquals(2.0, divided.valueNow());
        
        myBehavior.sendBehavior(33.3);
        
        assertEquals(3.0, divided.valueNow());
    }
    
    public function testBehaviorFloatDividedByB():Void {
        var myBehavior =    Behaviors.constant(24.0);
        var divBehavior =   Behaviors.constant(2.0);
        
        var divided = BehaviorFloat.dividedByB(myBehavior, divBehavior);
        
        assertEquals(12.0, divided.valueNow());
        
        myBehavior.sendBehavior(11.2);
        
        assertEquals(5.6, divided.valueNow());
    }
    
    public function testBehaviorFloatAbs():Void {
        var myBehavior = Behaviors.constant(-24.3);
        
        var abs = BehaviorFloat.abs(myBehavior);
        
        assertEquals(24.3, abs.valueNow());
    }
    
    public function testBehaviorFloatNegate():Void {
        var myBehavior = Behaviors.constant(0.0);
        
        var negate = BehaviorFloat.negate(myBehavior);
        
        assertEquals(0.0, negate.valueNow());
        
        myBehavior.sendBehavior(6.1);
        
        assertEquals(-6.1, negate.valueNow());
    }
    
    public function testBehaviorFloatFloor():Void {
        var myBehavior = Behaviors.constant(9.12345);
        
        var floor = BehaviorFloat.floor(myBehavior);
        
        assertEquals(9.0, floor.valueNow());
    }
    
    public function testBehaviorFloatCeil():Void {
        var myBehavior = Behaviors.constant(9.12345);
        
        var ceil = BehaviorFloat.ceil(myBehavior);
        
        assertEquals(10.0, ceil.valueNow());
    }
    
    public function testBehaviorFloatRound():Void {
        var myBehavior = Behaviors.constant(4.5);
        
        var round =  BehaviorFloat.round(myBehavior);
        
        assertEquals(5.0, round.valueNow());
        
        myBehavior.sendBehavior(4.4);
        
        assertEquals(4.0, round.valueNow());
    }
    
    public function testBehaviorFloatAcos():Void {
        var myBehavior = Behaviors.constant(0.5);
        
        var acos =  BehaviorFloat.acos(myBehavior);
        
        assertEquals(1.047, Math.round(acos.valueNow() * 1000) / 1000);
    }
    
    public function testBehaviorFloatAsin():Void {
        var myBehavior = Behaviors.constant(0.64);
        
        var asin =  BehaviorFloat.asin(myBehavior);
        
        assertEquals(0.694, Math.round(asin.valueNow() * 1000) / 1000);
    }
    
    public function testBehaviorFloatAtan():Void {
        var myBehavior = Behaviors.constant(2.0);
        
        var atan =  BehaviorFloat.atan(myBehavior);
        
        assertEquals(1.107, Math.round(atan.valueNow() * 1000) / 1000);
    }
    
    public function testBehaviorFloatAtan2():Void {
        var myBehavior = Behaviors.constant(8.0);
        
        var atan2 =  BehaviorFloat.atan2(myBehavior, 4);
        
        assertEquals(1.107, Math.round(atan2.valueNow() * 1000) / 1000);
    }
    
    public function testBehaviorFloatAtan2B():Void {
        var myBehavior =    Behaviors.constant(8.0);
        var myBehavior2 =   Behaviors.constant(4.0);
        
        var atan2B =  BehaviorFloat.atan2B(myBehavior, myBehavior2);
        
        assertEquals(1.107, Math.round(atan2B.valueNow() * 1000) / 1000);
    }
    
    public function testBehaviorFloatCos():Void {
        var myBehavior = Behaviors.constant(3.0);
        
        var cos =  BehaviorFloat.cos(myBehavior);
        
        assertEquals(-0.99, Math.round(cos.valueNow() * 1000) / 1000);
    }
    
    public function testBehaviorFloatExp():Void {
        var myBehavior = Behaviors.constant(5.0);
        
        var exp =  BehaviorFloat.exp(myBehavior);
        
        assertEquals(148.413, Math.round(exp.valueNow() * 1000) / 1000);
    }
    
    public function testBehaviorFloatLog():Void {
        var myBehavior = Behaviors.constant(2.0);
        
        var log =  BehaviorFloat.log(myBehavior);
        
        assertEquals(0.693, Math.round(log.valueNow() * 1000) / 1000);
    }
    
    public function testBehaviorFloatMaxB():Void {
        var myBehavior =    Behaviors.constant(2.0);
        var myBehavior2 =   Behaviors.constant(4.0);
        
        var maxB =  BehaviorFloat.maxB(myBehavior, myBehavior2);
        
        assertEquals(4.0, maxB.valueNow());
    }
    
    public function testBehaviorFloatMax():Void {
        var myBehavior = Behaviors.constant(2.0);
        
        var max =  BehaviorFloat.max(myBehavior, 0.123);
        
        assertEquals(2.0, max.valueNow());
    }
    
    public function testBehaviorFloatMinB():Void {
        var myBehavior =    Behaviors.constant(2.0);
        var myBehavior2 =   Behaviors.constant(4.0);
        
        var minB =  BehaviorFloat.minB(myBehavior, myBehavior2);
        
        assertEquals(2.0, minB.valueNow());
    }
    
    public function testBehaviorFloatMin():Void {
        var myBehavior = Behaviors.constant(2.0);
        
        var min =  BehaviorFloat.min(myBehavior, 0.123);
        
        assertEquals(0.123, min.valueNow());
    }
    
    public function testBehaviorFloatPowB():Void {
        var myBehavior =    Behaviors.constant(2.0);
        var myBehavior2 =   Behaviors.constant(4.0);
        
        var powB =  BehaviorFloat.powB(myBehavior, myBehavior2);
        
        assertEquals(16.0, powB.valueNow());
    }
    
    public function testBehaviorFloatPow():Void {
        var myBehavior = Behaviors.constant(2.8);
        
        var pow =  BehaviorFloat.pow(myBehavior, 5.0);
        
        assertEquals(172.104, Math.round(pow.valueNow() * 1000) / 1000);
    }
    
    public function testBehaviorFloatSin():Void {
        var myBehavior = Behaviors.constant(3.0);
        
        var sin =  BehaviorFloat.sin(myBehavior);
        
        assertEquals(0.141, Math.round(sin.valueNow() * 1000) / 1000);
    }
    
    public function testBehaviorFloatSqrt():Void {
        var myBehavior = Behaviors.constant(16.0);
        
        var sqrt =  BehaviorFloat.sqrt(myBehavior);
        
        assertEquals(4.0, Math.round(sqrt.valueNow() * 1000) / 1000);
    }
    
    public function testBehaviorFloatTan():Void {
        var myBehavior = Behaviors.constant(60.0);
        
        var tan =  BehaviorFloat.tan(myBehavior);
        
        assertEquals(0.32, Math.round(tan.valueNow() * 1000) / 1000);
    }

/*
* -----------------  BehaviorBehavior Tests  -------------------
* Missing: 
* Broken:  
*/

    public function testBehaviorBehaviorFlatten():Void {
        var b1 = stream().startsWith(2);
        var behaviors: Behavior<Behavior<Int>> = Streams.identity().startsWith(b1);
        
        var switchBed = BehaviorBehavior.switchB(behaviors);
        
        assertEquals(2, switchBed.valueNow());
        
        b1.sendBehavior(4);
        
        assertEquals(4, switchBed.valueNow());
        
        b1.sendBehavior(5); b1.sendBehavior(6);
        
        assertEquals(6, switchBed.valueNow());
    }
    
    public function testBehaviorBehaviorSwitchB():Void {
        var b1 = stream().startsWith(2);
        var behaviors: Behavior<Behavior<Int>> = Streams.identity().startsWith(b1);
        
        var switchBed = BehaviorBehavior.switchB(behaviors);
        
        assertEquals(2, switchBed.valueNow());
        
        b1.sendBehavior(4);
        
        assertEquals(4, switchBed.valueNow());
        
        b1.sendBehavior(5); b1.sendBehavior(6);
        
        assertEquals(6, switchBed.valueNow());
    }
    
    public function testBehaviorBehaviorJoin():Void {
        var b1 = stream().startsWith(2);
        var behaviors: Behavior<Behavior<Int>> = Streams.identity().startsWith(b1);
        
        var joined = BehaviorBehavior.join(behaviors);
        
        assertEquals(2, joined.valueNow());
        
        b1.sendBehavior(4);
        
        assertEquals(4, joined.valueNow());
        
        b1.sendBehavior(5); b1.sendBehavior(6);
        
        assertEquals(6, joined.valueNow());
    }
    
    public function testBehaviorCollectionTake(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 2, 3, 4, 5]));
        
        var taken = BehaviorCollection.take(behavior, 3).valueNow();
        
        assertIterableEquals([1, 2, 3], taken);
    }
    
    public function testBehaviorCollectionDrop(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 2, 3, 4, 5]));
        
        var dropped = BehaviorCollection.drop(behavior, 3).valueNow();
        
        assertIterableEquals([4, 5], dropped);
    }
    
    public function testBehaviorCollectionConcat(): Void {
        var behavior: Behavior<Collection<Int>> =  Behaviors.constant(toCollection([1, 2, 3, 4, 5]));
        var behavior2: Behavior<Collection<Int>> = Behaviors.constant(toCollection([6, 7, 8]));
        
        var concated = BehaviorCollection.concatB(behavior, behavior2).valueNow();
        
        assertIterableEquals([1, 2, 3, 4, 5, 6, 7, 8], concated);
    }
    
    public function testBehaviorCollectionJoin(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 2, 3, 4, 5]));
        
        var joined = BehaviorCollection.join(behavior, " ; ").valueNow();
        
        assertEquals("1 ; 2 ; 3 ; 4 ; 5", joined);
    }

    public function testBehaviorCollectionSize(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 2, 3, 4, 5]));
        
        var size = BehaviorCollection.size(behavior).valueNow();
        
        assertEquals(5, size);
    }
    
    public function testBehaviorCollectionZip(): Void {
        var behavior1: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 2, 3, 4, 5]));
        var behavior2: Behavior<Collection<Int>> = Behaviors.constant(toCollection([6, 7, 8]));
        
        var zipped = BehaviorCollection.zipB(behavior1, behavior2).valueNow();
        
        assertIterableEquals([tuple2(1, 6), tuple2(2, 7), tuple2(3, 8)], zipped);
    }
    
    public function testBehaviorCollectionZip3(): Void {
        var behavior1: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1,  2, 3, 4, 5]));
        var behavior2: Behavior<Collection<Int>> = Behaviors.constant(toCollection([6,  7, 8]));
        var behavior3: Behavior<Collection<Int>> = Behaviors.constant(toCollection([99, 8, 13]));
        
        var zipped = BehaviorCollection.zip3B(behavior1, behavior2, behavior3).valueNow();
        
        assertIterableEquals([tuple3(1, 6, 99), tuple3(2, 7, 8), tuple3(3, 8, 13)], zipped);
    }
    
    public function testBehaviorCollectionZip4(): Void {
        var behavior1: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1,  2, 3, 4, 5]));
        var behavior2: Behavior<Collection<Int>> = Behaviors.constant(toCollection([6,  7, 1, 8]));
        var behavior3: Behavior<Collection<Int>> = Behaviors.constant(toCollection([99, 8, 13]));
        var behavior4: Behavior<Collection<Int>> = Behaviors.constant(toCollection([12, 13, 14, 15]));
        
        var zipped = BehaviorCollection.zip4B(behavior1, behavior2, behavior3, behavior4).valueNow();
        
        assertIterableEquals([tuple4(1, 6, 99, 12), tuple4(2, 7, 8, 13), tuple4(3, 1, 13, 14)], zipped);
    }
    
    public function testBehaviorCollectionZip5(): Void {
        var behavior1: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1,   2, 3, 4, 5]));
        var behavior2: Behavior<Collection<Int>> = Behaviors.constant(toCollection([6,   7, 1, 8]));
        var behavior3: Behavior<Collection<Int>> = Behaviors.constant(toCollection([99,  8, 13]));
        var behavior4: Behavior<Collection<Int>> = Behaviors.constant(toCollection([12, 13, 14, 15]));
        var behavior5: Behavior<Collection<Int>> = Behaviors.constant(toCollection([6,   7, 1, 8]));
        
        var zipped = BehaviorCollection.zip5B(behavior1, behavior2, behavior3, behavior4, behavior5).valueNow();
        
        assertIterableEquals([tuple5(1, 6, 99, 12, 6), tuple5(2, 7, 8, 13, 7), tuple5(3, 1, 13, 14, 1)], zipped);
    }
    
    public function testBehaviorCollectionAppend(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([3, 4, 5]));
        
        var append = BehaviorCollection.append(behavior, 4).valueNow();
        
        assertIterableEquals([3, 4, 5, 4], append);
    }
    
    public function testBehaviorCollectionCons(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([3, 4, 5]));
        
        var cons = BehaviorCollection.cons(behavior, 4).valueNow();
        
        assertIterableEquals([4, 3, 4, 5], cons);
    }
    
    public function testBehaviorCollectionHeadOpt(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([]));
        
        var headOpt = BehaviorCollection.headOpt(behavior);
        
        assertOptionEquals(None, headOpt.valueNow());
        
        behavior.sendBehavior(toCollection([1, 2, 3]));
        
        assertOptionEquals(Some(1), headOpt.valueNow());
    }
    
    public function testBehaviorCollectionSlice(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([]));
        
        var slice = BehaviorCollection.slice(behavior, 2, 5);
        
        assertIterableEquals([], slice.valueNow());
        
        behavior.sendBehavior(toCollection([1, 1, 7, 9, 8, 7]));
        
        assertIterableEquals([7, 9, 8], slice.valueNow());
    }
    
    public function testBehaviorCollectionLastOpt(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([]));
        
        var lastOpt = BehaviorCollection.lastOpt(behavior);
        
        assertOptionEquals(None, lastOpt.valueNow());
        
        behavior.sendBehavior(toCollection([1, 2, 3]));
        
        assertOptionEquals(Some(3), lastOpt.valueNow());
    }

    public function testBehaviorCollectionCountWhile(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 2, 7, 8, 3, 99]));
        
        var countWhile = BehaviorCollection.countWhile(behavior, function(v) { return v < 8; });
        
        assertEquals(3, countWhile.valueNow());
    }
    
    public function testBehaviorCollectionDropWhile(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([100, 75, 50, 25]));
        
        var dropWhile = BehaviorCollection.dropWhile(behavior, function(v) { return v > 50; });
        
        assertIterableEquals([50, 25], dropWhile.valueNow());
    }
    
    public function testBehaviorCollectionTakeWhile(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([100, 75, 50, 25]));
        
        var takeWhile = BehaviorCollection.takeWhile(behavior, function(v) { return v >= 50; });
        
        assertIterableEquals([100, 75, 50], takeWhile.valueNow());
    }
    
    public function testBehaviorCollectionCount(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([10, 15, 25, 30, 40, 45, 50]));
        
        var count = BehaviorCollection.count(behavior, function(v) { return v > 40; });
        
        assertEquals(2, count.valueNow());
    }
    
    public function testBehaviorCollectionAll(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([10, 15, 25, 30, 40, 45, 50]));
        
        var all = BehaviorCollection.all(behavior, function(v) { return v > 40; });
        var all2 = BehaviorCollection.all(behavior, function(v) { return v > 9; });
        
        assertEquals(false, all.valueNow());
        assertEquals(true, all2.valueNow());
    }
    
    public function testBehaviorCollectionAny(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([10, 15, 25, 30, 40, 45, 50]));
        
        var any = BehaviorCollection.any(behavior, function(v) { return v > 40; });
        var any2 = BehaviorCollection.any(behavior, function(v) { return v > 50; });
        
        assertEquals(true, any.valueNow());
        assertEquals(false, any2.valueNow());
    }
    
    public function testBehaviorCollectionForEach(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([10, 15, 25, 30, 40, 45, 50]));
        var self = this;
        
        var forEach = BehaviorCollection.forEach(behavior, function(v) { self.incrementCounter(); });
        
        assertEquals(7, getCounter());
        resetCounter();
    }
    
    public function testBehaviorCollectionMap(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([10, 15, 45, 50]));
        
        var map = BehaviorCollection.map(behavior, function(v) { return ++v; });
        
        assertIterableEquals([11, 16, 46, 51], map.valueNow());
    }
    
    public function testBehaviorCollectionMap2(): Void {
        var behavior1: Behavior<Collection<Int>> = Behaviors.constant(toCollection([10, 15, 45, 50, 75]));
        var behavior2: Behavior<Collection<Int>> = Behaviors.constant(toCollection([10, 15, 45, 50, 13]));
        
        var map = BehaviorCollection.map2B(behavior1, behavior2, function(v1, v2) { return v1 - v2; });
        
        assertIterableEquals([0, 0, 0, 0, 62], map.valueNow());
    }
    
    public function testBehaviorCollectionMap3(): Void {
        var behavior1: Behavior<Collection<Int>> = Behaviors.constant(toCollection([10, 15, 45, 50, 75]));
        var behavior2: Behavior<Collection<Int>> = Behaviors.constant(toCollection([10, 15, 45, 50, 13]));
        var behavior3: Behavior<Collection<Int>> = Behaviors.constant(toCollection([14, 24, 20, 18]));
        
        var map = BehaviorCollection.map3B(behavior1, behavior2, behavior3, function(v1, v2, v3) { return v1 - v2 + v3; });
        
        assertIterableEquals([14, 24, 20, 18], map.valueNow());
    }
    
    public function testBehaviorCollectionMap4(): Void {
        var behavior1: Behavior<Collection<Int>> = Behaviors.constant(toCollection([10, 15, 45, 50, 75]));
        var behavior2: Behavior<Collection<Int>> = Behaviors.constant(toCollection([10, 15, 45, 50, 13]));
        var behavior3: Behavior<Collection<Int>> = Behaviors.constant(toCollection([14, 24, 20, 18]));
        var behavior4: Behavior<Collection<Int>> = Behaviors.constant(toCollection([2,   4,  4,  2]));
        
        var map = BehaviorCollection.map4B(behavior1, behavior2, behavior3, behavior4, function(v1, v2, v3, v4) { return (v1 - v2 + v3) / v4; });
        
        assertIterableEquals([7, 6, 5, 9.0], map.valueNow());
    }
    
    public function testBehaviorCollectionMap5(): Void {
        var behavior1: Behavior<Collection<Int>> = Behaviors.constant(toCollection([10, 15, 45, 50, 75]));
        var behavior2: Behavior<Collection<Int>> = Behaviors.constant(toCollection([10, 15, 45, 50, 13]));
        var behavior3: Behavior<Collection<Int>> = Behaviors.constant(toCollection([14, 24, 20, 18]));
        var behavior4: Behavior<Collection<Int>> = Behaviors.constant(toCollection([2,   4,  4,  2]));
        var behavior5: Behavior<Collection<Int>> = Behaviors.constant(toCollection([10, 8, 3]));
        
        var map = BehaviorCollection.map5B(behavior1, behavior2, behavior3, behavior4, behavior5, function(v1, v2, v3, v4, v5) { return ((v1 - v2 + v3) / v4) - v5; });
        
        assertIterableEquals([-3, -2, 2.0], map.valueNow());
    }
    
    public function testBehaviorCollectionPartition(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 2, 3, 4, 5, 6, 7, 3, 4]));
        var filter = function(v) { return v < 4; };
        
        var partition = BehaviorCollection.partition(behavior, filter);
        
        assertIterableEquals([1, 2, 3, 3], partition.valueNow()._1);
        assertIterableEquals([4, 5, 6, 7, 4], partition.valueNow()._2);
    }
    
    public function testBehaviorCollectionPartitionWhile(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 2, 3, 4, 5, 6, 7, 3, 4]));
        var filter = function(v) { return v <= 5; };
        
        var partitionWhile = BehaviorCollection.partitionWhile(behavior, filter);
        
        assertIterableEquals([1, 2, 3, 4, 5], partitionWhile.valueNow()._1);
        assertIterableEquals([6, 7, 3, 4], partitionWhile.valueNow()._2);
    }
    
    public function testBehaviorCollectionTranspose(): Void {
        var behavior1: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 2, 3, 4, 5]));
        var behavior2: Behavior<Collection<Int>> = Behaviors.constant(toCollection([6, 7, 8]));
        
        var transposeped = BehaviorCollection.transposeB(behavior1, behavior2).valueNow();
        
        assertIterableEquals([tuple2(1, 6), tuple2(2, 7), tuple2(3, 8)], transposeped);
    }
    
    public function testBehaviorCollectionTranspose3(): Void {
        var behavior1: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1,  2, 3, 4, 5]));
        var behavior2: Behavior<Collection<Int>> = Behaviors.constant(toCollection([6,  7, 8]));
        var behavior3: Behavior<Collection<Int>> = Behaviors.constant(toCollection([99, 8, 13]));
        
        var transposeped = BehaviorCollection.transpose3B(behavior1, behavior2, behavior3).valueNow();
        
        assertIterableEquals([tuple3(1, 6, 99), tuple3(2, 7, 8), tuple3(3, 8, 13)], transposeped);
    }
    
    public function testBehaviorCollectionTranspose4(): Void {
        var behavior1: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1,  2, 3, 4, 5]));
        var behavior2: Behavior<Collection<Int>> = Behaviors.constant(toCollection([6,  7, 1, 8]));
        var behavior3: Behavior<Collection<Int>> = Behaviors.constant(toCollection([99, 8, 13]));
        var behavior4: Behavior<Collection<Int>> = Behaviors.constant(toCollection([12, 13, 14, 15]));
        
        var transposeped = BehaviorCollection.transpose4B(behavior1, behavior2, behavior3, behavior4).valueNow();
        
        assertIterableEquals([tuple4(1, 6, 99, 12), tuple4(2, 7, 8, 13), tuple4(3, 1, 13, 14)], transposeped);
    }
    
    public function testBehaviorCollectionTranspose5(): Void {
        var behavior1: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1,   2, 3, 4, 5]));
        var behavior2: Behavior<Collection<Int>> = Behaviors.constant(toCollection([6,   7, 1, 8]));
        var behavior3: Behavior<Collection<Int>> = Behaviors.constant(toCollection([99,  8, 13]));
        var behavior4: Behavior<Collection<Int>> = Behaviors.constant(toCollection([12, 13, 14, 15]));
        var behavior5: Behavior<Collection<Int>> = Behaviors.constant(toCollection([6,   7, 1, 8]));
        
        var transposeped = BehaviorCollection.transpose5B(behavior1, behavior2, behavior3, behavior4, behavior5).valueNow();
        
        assertIterableEquals([tuple5(1, 6, 99, 12, 6), tuple5(2, 7, 8, 13, 7), tuple5(3, 1, 13, 14, 1)], transposeped);
    }
    
    public function testBehaviorCollectionFilter(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 2, 3, 4, 5, 6, 7, 3, 4]));
        var f = function(v) { return v < 4; };
        
        var filter = BehaviorCollection.filter(behavior, f);
        
        assertIterableEquals([1, 2, 3, 3], filter.valueNow());
    }
    
    public function testBehaviorCollectionFilterWhile(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 2, 3, 4, 5, 6, 7, 3, 4]));
        var f = function(v) { return v <= 5; };
        
        var filterWhile = BehaviorCollection.filterWhile(behavior, f);
        
        assertIterableEquals([1, 2, 3, 4, 5], filterWhile.valueNow());
    }
    
    public function testBehaviorCollectionFlatMap(): Void {
        var self = this;
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 2, 3, 3, 4]));
        var f = function(v) { return self.singleton(v).cons(v * 10); };
        
        var flatMap = BehaviorCollection.flatMap(behavior, f);
        
        assertIterableEquals([10, 1, 20, 2, 30, 3, 30, 3, 40, 4], flatMap.valueNow());
    }
    
    public function testBehaviorCollectionFlatMap2(): Void {
        var behavior1: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 2, 3, 4, 5]));
        var behavior2: Behavior<Collection<Int>> = Behaviors.constant(toCollection([6, 7, 8]));
        
        var self = this;
        var mapper = function(v1, v2) { return self.singleton(v1).cons(v2 *2); };
        var flatMapped = BehaviorCollection.flatMap2B(behavior1, behavior2, mapper).valueNow();
        
        assertIterableEquals([12, 1, 14, 2, 16, 3], flatMapped);
    }
    
    public function testBehaviorCollectionFlatMap3(): Void {
        var behavior1: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1,  2, 3, 4, 5]));
        var behavior2: Behavior<Collection<Int>> = Behaviors.constant(toCollection([6,  7, 8]));
        var behavior3: Behavior<Collection<Int>> = Behaviors.constant(toCollection([99, 8, 13]));
        
        var self = this;
        var mapper = function(v1, v2, v3) { return self.singleton(v2).cons(v1 + v3); };
        var flatMapped = BehaviorCollection.flatMap3B(behavior1, behavior2, behavior3, mapper).valueNow();
        
        assertIterableEquals([100, 6, 10, 7, 16, 8], flatMapped);
    }
    
    public function testBehaviorCollectionFlatMap4(): Void {
        var behavior1: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1,  2, 3, 4, 5]));
        var behavior2: Behavior<Collection<Int>> = Behaviors.constant(toCollection([9,  14, 8]));
        var behavior3: Behavior<Collection<Int>> = Behaviors.constant(toCollection([12, 8, 13]));
        var behavior4: Behavior<Collection<Int>> = Behaviors.constant(toCollection([2, 2]));
        
        var self = this;
        var mapper = function(v1, v2, v3, v4) { return self.singleton(v2).cons(v1 + v3).append(v4); };
        var flatMapped = BehaviorCollection.flatMap4B(behavior1, behavior2, behavior3, behavior4, mapper).valueNow();
        
        assertIterableEquals([13, 9, 2, 10, 14, 2], flatMapped);
    }
    
    public function testBehaviorCollectionFlatMap5(): Void {
        var behavior1: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1,  2, 3, 5, 5]));
        var behavior2: Behavior<Collection<Int>> = Behaviors.constant(toCollection([9,  15, 8]));
        var behavior3: Behavior<Collection<Int>> = Behaviors.constant(toCollection([12, 8, 13]));
        var behavior4: Behavior<Collection<Int>> = Behaviors.constant(toCollection([2, 2]));
        var behavior5: Behavior<Collection<Int>> = Behaviors.constant(toCollection([12, 24]));
        
        var self = this;
        var mapper = function(v1, v2, v3, v4, v5) { return self.singleton(v2).cons(v1 + v3).append(v4 * v5); };
        var flatMapped = BehaviorCollection.flatMap5B(behavior1, behavior2, behavior3, behavior4, behavior5, mapper).valueNow();
        
        assertIterableEquals([13, 9, 24, 10, 15, 48], flatMapped);
    }
    
    public function testBehaviorCollectionFoldr(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 3, 4]));
        var f = function(v1, v2) { return v1 + " : " + Std.string(v2); };
        
        var foldr = BehaviorCollection.foldr(behavior, "foo", f);
        
        assertEquals("foo : 4 : 3 : 1", foldr.valueNow());
    }
    
    public function testBehaviorCollectionFoldl(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 3, 4]));
        var f = function(v1, v2) { return v1 + " : " + Std.string(v2); };
        
        var foldl = BehaviorCollection.foldl(behavior, "foo", f);
        
        assertEquals("foo : 1 : 3 : 4", foldl.valueNow());
    }
    
    public function testBehaviorCollectionFoldl2(): Void {
        var behavior1: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 3, 4]));
        var behavior2: Behavior<Collection<Int>> = Behaviors.constant(toCollection([4, 5, 6, 7]));
        
        var f = function(v1, v2, v3) { return v1 + " : " + Std.string(v2 + v3); };
        
        var foldl2B = BehaviorCollection.foldl2B(behavior1, behavior2, "foo", f);
        
        assertEquals("foo : 5 : 8 : 10", foldl2B.valueNow());
    }
    
    public function testBehaviorCollectionFoldl3(): Void {
        var behavior1: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 3, 4]));
        var behavior2: Behavior<Collection<Int>> = Behaviors.constant(toCollection([4, 5, 6, 7]));
        var behavior3: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 2, 3]));
        
        var f = function(v1, v2, v3, v4) { return v1 + " : " + Std.string(v2 + v3) + " : " + Std.string(v4); };
        
        var foldl3B = BehaviorCollection.foldl3B(behavior1, behavior2, behavior3, "foo", f);
        
        assertEquals("foo : 5 : 1 : 8 : 2 : 10 : 3", foldl3B.valueNow());
    }
    
    public function testBehaviorCollectionFoldl4(): Void {
        var behavior1: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 3, 4]));
        var behavior2: Behavior<Collection<Int>> = Behaviors.constant(toCollection([4, 5, 6, 7]));
        var behavior3: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 2, 3]));
        var behavior4: Behavior<Collection<Int>> = Behaviors.constant(toCollection([10, 10]));
        
        var f = function(v1, v2, v3, v4, v5) { return v1 + " : " + Std.string(v2 + v3) + " : " + Std.string(v4 * v5); };
        
        var foldl4B = BehaviorCollection.foldl4B(behavior1, behavior2, behavior3, behavior4, "foo", f);
        
        assertEquals("foo : 5 : 10 : 8 : 20", foldl4B.valueNow());
    }
    
    public function testBehaviorCollectionFoldl5(): Void {
        var behavior1: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 3, 4]));
        var behavior2: Behavior<Collection<Int>> = Behaviors.constant(toCollection([4, 5, 6, 7]));
        var behavior3: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 2, 3]));
        var behavior4: Behavior<Collection<Int>> = Behaviors.constant(toCollection([10, 10]));
        var behavior5: Behavior<Collection<Int>> = Behaviors.constant(toCollection([2, 4]));
        
        var f = function(v1, v2, v3, v4, v5, v6) { return v1 + " : " + Std.string(v2 + v3) + " : " + Std.string((v4 * v5) - v6); };
        
        var foldl5B = BehaviorCollection.foldl5B(behavior1, behavior2, behavior3, behavior4, behavior5, "foo", f);
        
        assertEquals("foo : 5 : 8 : 8 : 16", foldl5B.valueNow());
    }
    
    public function testBehaviorCollectionToArray(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([40, 45, 50]));
        
        var toArray = BehaviorCollection.toArray(behavior);
        
        assertIterableEquals([40, 45, 50], toArray.valueNow());
        assertTrue(Std.is(toArray.valueNow(), Array));
    }
    
    public function testBehaviorCollectionScanl(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 3, 5]));
        
        var f = function(v1, v2) { return v1 + v2; };
        
        var scanl = BehaviorCollection.scanl(behavior, 1, f);
        
        assertIterableEquals([1, 2, 5, 10], scanl.valueNow());
    }
    
    public function testBehaviorCollectionScanr(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 3, 5]));
        
        var f = function(v1, v2) { return v1 + v2; };
        
        var scanr = BehaviorCollection.scanr(behavior, 1, f);
        
        assertIterableEquals([1, 6, 9, 10], scanr.valueNow());
    }
    
    public function testBehaviorCollectionScanrP(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([2, 3, 5]));
        
        var f = function(v1, v2) { return v1 + v2; };
        
        var scanrP = BehaviorCollection.scanrP(behavior, f);
        
        assertIterableEquals([8, 10], scanrP.valueNow());
    }
    
    public function testBehaviorCollectionScanlP(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([2, 3, 5]));
        
        var f = function(v1, v2) { return v1 + v2; };
        
        var scanlP = BehaviorCollection.scanlP(behavior, f);
        
        assertIterableEquals([5, 10], scanlP.valueNow());
    }
    
    public function testBehaviorCollectionGroupBy(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([4, 2, 3, 5, 10, 5, 16, 8, 4, 2, 2, 3]));
        
        var f = function(v1, v2) { return v1 == v2 * 2; };
        
        var groupBy = BehaviorCollection.groupBy(behavior, f);

        assertIterableEquals([[4, 2], [3], [5], [10, 5], [16, 8, 4, 2], [2], [3]], colPump(groupBy.valueNow()));
    }
    
    public function testBehaviorCollectionGroup(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([4, 2, 3, 5, 5, 5, 10, 5, 16, 8, 4, 2, 2, 3]));
        
        var group = BehaviorCollection.group(behavior);

        assertIterableEquals([[4], [2], [3], [5, 5, 5], [10], [5], [16], [8], [4], [2, 2], [3]], colPump(group.valueNow()));
    }
    
    public function testBehaviorCollectionMember(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([4, 2, 7, 3]));
        
        var member =  BehaviorCollection.member(behavior, 7);
        var member2 = BehaviorCollection.member(behavior, 1);

        assertTrue(member.valueNow());
        assertFalse(member2.valueNow());
    }
    
    public function testBehaviorCollectionExists(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([4, 2, 7, 3]));
        
        var exists =  BehaviorCollection.exists(behavior, function(v) { return v < 10; });
        var exists2 = BehaviorCollection.exists(behavior, function(v) { return v > 7; });

        assertTrue(exists.valueNow());
        assertFalse(exists2.valueNow());
    }
    
    public function testBehaviorCollectionFind(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([4, 2, 7, 3]));
        
        var find =  BehaviorCollection.find(behavior, function(v) { return v < 10; });
        var find2 = BehaviorCollection.find(behavior, function(v) { return v > 7; });

        assertOptionEquals(Some(4), find.valueNow());
        assertOptionEquals(None, find2.valueNow());
    }
    
    public function testBehaviorCollectionExistsP(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([4, 2, 7, 3]));
        
        var existsP =  BehaviorCollection.existsP(behavior, 5, function(v1, ref) { return v1 < ref; });
        var existsP2 = BehaviorCollection.existsP(behavior, 1, function(v1, ref) { return v1 < ref; });

        assertTrue(existsP.valueNow());
        assertFalse(existsP2.valueNow());
    }
    
    public function testBehaviorCollectionNubBy(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([4, 2, 3, 5, 5, 5, 10, 5, 16, 8, 4, 2, 5, 2, 3, 5]));
        
        var nubBy =  BehaviorCollection.nubBy(behavior, function(v1, v2) { return  if (v1 == v2 || v1 == v2 * 2) true else false; });
        
        assertIterableEquals([4, 3, 5, 10, 16], nubBy.valueNow());
    }
    
    public function testBehaviorCollectionNub(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([4, 2, 3, 5, 5, 5, 10, 5, 16, 8, 4, 2, 5, 2, 3, 5]));
        
        var nub =  BehaviorCollection.nub(behavior);
        
        assertIterableEquals([4, 2, 3, 5, 10, 16, 8], nub.valueNow());
    }
    
    public function testBehaviorCollectionIntersect(): Void {
        var behavior1: Behavior<Collection<Int>> = Behaviors.constant(toCollection([4, 2, 2, 5, 2, 3, 5]));
        var behavior2: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 2, 3, 4]));
        
        var intersectB =  BehaviorCollection.intersectB(behavior1, behavior2);
        
        assertIterableEquals([4, 2, 2, 2, 3], intersectB.valueNow());
    }
    
    public function testBehaviorCollectionIntersectBy(): Void {
        var behavior1: Behavior<Collection<Float>> = Behaviors.constant(toCollection([4.0, 2, 2, 8, 2, 3, 5]));
        var behavior2: Behavior<Collection<Float>> = Behaviors.constant(toCollection([1.0, 2, 8, 8, 2, 2, 3, 4]));
        
        var intersectByB =  BehaviorCollection.intersectByB(behavior1, behavior2, function(v1, v2) { return v2 / 2 == v1; });
        
        assertIterableEquals([4.0, 2, 2, 8, 2], intersectByB.valueNow());
    }
    
    public function testBehaviorCollectionUnionBy(): Void {
        var behavior1: Behavior<Collection<Float>> = Behaviors.constant(toCollection([4.0, 2, 2, 8, 2, 3, 5]));
        var behavior2: Behavior<Collection<Float>> = Behaviors.constant(toCollection([1.0, 2, 3, 4]));
        
        var unionByB =  BehaviorCollection.unionByB(behavior1, behavior2, function(v1, v2) { return v1 / 2 == v2; });
        
        assertIterableEquals([4.0, 2, 2, 8, 2, 3, 5, 3], unionByB.valueNow());
    }
    
    public function testBehaviorCollectionUnion(): Void {
        var behavior1: Behavior<Collection<Float>> = Behaviors.constant(toCollection([4.0, 2, 2, 8, 2, 3, 5]));
        var behavior2: Behavior<Collection<Float>> = Behaviors.constant(toCollection([1.0, 2, 3, 4]));
        
        var unionB =  BehaviorCollection.unionB(behavior1, behavior2);
        
        assertIterableEquals([4.0, 2, 2, 8, 2, 3, 5, 1], unionB.valueNow());
    }
    
    public function testBehaviorCollectionIsPrefixOf(): Void {
        var behavior0: Behavior<Collection<Int>> = Behaviors.constant(toCollection([]));
        var behavior1: Behavior<Collection<Int>> = Behaviors.constant(toCollection([2, 3, 4, 5]));
        var behavior2: Behavior<Collection<Int>> = Behaviors.constant(toCollection([2, 3, 4, 5, 6, 7, 1, 2, 3, 4]));
        var behavior3: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 2, 3, 4]));
        
        var isPrefixOf =  BehaviorCollection.isPrefixOfB(behavior1, behavior2);
        var isPrefixOf2 = BehaviorCollection.isPrefixOfB(behavior2, behavior3);
        var isPrefixOf3 = BehaviorCollection.isPrefixOfB(behavior0, behavior3);
        
        assertTrue(isPrefixOf.valueNow());
        assertFalse(isPrefixOf2.valueNow());
        assertTrue(isPrefixOf3.valueNow());
    }
    
    public function testBehaviorCollectionIsSuffixOf(): Void {
        var behavior0: Behavior<Collection<Int>> = Behaviors.constant(toCollection([]));
        var behavior1: Behavior<Collection<Int>> = Behaviors.constant(toCollection([2, 3, 4, 5]));
        var behavior2: Behavior<Collection<Int>> = Behaviors.constant(toCollection([2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5]));
        var behavior3: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 2, 3, 4]));
        
        var isSuffixOf =  BehaviorCollection.isSuffixOfB(behavior1, behavior3);
        var isSuffixOf2 = BehaviorCollection.isSuffixOfB(behavior1, behavior2);
        var isSuffixOf3 = BehaviorCollection.isSuffixOfB(behavior0, behavior3);
        
        assertFalse(isSuffixOf.valueNow());
        assertTrue(isSuffixOf2.valueNow());
        assertTrue(isSuffixOf3.valueNow());
    }
    
    public function testBehaviorCollectionDelete(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([2, 3, 4, 5, 3, 4, 5]));
        
        var delete = BehaviorCollection.delete(behavior, 5);

        assertIterableEquals([2, 3, 4, 3, 4, 5], delete.valueNow());
    }
    
    public function testBehaviorCollectionDeleteBy(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([3, 4, 5, 2, 3, 2, 4, 5]));
        var cmp = function(v1, v2) { return v2 / 2 == v1; }
        
        var deleteBy = BehaviorCollection.deleteBy(behavior, 4, cmp);
        
        assertIterableEquals([3, 4, 5, 3, 2, 4, 5], deleteBy.valueNow());
    }
    
    public function testBehaviorCollectionFindIndicesOf(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([3, 4, 5, 2, 3, 2, 4, 5]));
        var cmp = function(v) { return v < 4; };
        
        var findIndicesOf = BehaviorCollection.findIndicesOf(behavior, cmp);
        
        assertIterableEquals([0, 3, 4, 5], findIndicesOf.valueNow());
    }
    
    public function testBehaviorCollectionFindIndexOf(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([2, 3, 2, 4, 5]));
        var cmp = function(v) { return v == 5; };
        var cmp2 = function(v) { return v == 7; };
        
        var findIndexOf = BehaviorCollection.findIndexOf(behavior, cmp);
        var findIndexOf2 = BehaviorCollection.findIndexOf(behavior, cmp2);
        
        assertOptionEquals(Some(4), findIndexOf.valueNow());
        assertOptionEquals(None, findIndexOf2.valueNow());
    }
    
    public function testBehaviorCollectionIndexOf(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([2, 3, 2, 4, 5]));
        
        var indexOf = BehaviorCollection.indexOf(behavior, 4);
        var indexOf2 = BehaviorCollection.indexOf(behavior, 10);
        
        assertOptionEquals(Some(3), indexOf.valueNow());
        assertOptionEquals(None, indexOf2.valueNow());
    }
    
    public function testBehaviorCollectionIndicesOf(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([2, 3, 2, 4, 5]));
        
        var indicesOf = BehaviorCollection.indicesOf(behavior, 2);
        var indicesOf2 = BehaviorCollection.indicesOf(behavior, 10);
        
        assertIterableEquals([0, 2], indicesOf.valueNow());
        assertIterableEquals([], indicesOf2.valueNow());
    }
    
    public function testBehaviorCollectionReplaceBy(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([2, 3, 2, 4, 5]));
        
        var f = function(v) { return v == 2; };
        
        var replaceBy = BehaviorCollection.replaceBy(behavior, 99, f);
        
        assertIterableEquals([99, 3, 99, 4, 5], replaceBy.valueNow());
    }
    
    public function testBehaviorCollectionSnapshot(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([2, 3, 2, 4, 5]));
        
        var snapshot = BehaviorCollection.snapshot(behavior);
        
        assertIterableEquals([2, 3, 2, 4, 5], snapshot.valueNow());
        
        behavior.sendBehavior(toCollection([]));
        
        assertIterableEquals([], snapshot.valueNow());
    }
    
    public function testBehaviorCollectionInsertBy(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 2, 3, 5, 6]));
        
        var f = function(v1, v2) { return  v1 < v2; };
        
        var insertBy = BehaviorCollection.insertBy(behavior, 4, f);
        
        assertIterableEquals([1, 2, 3, 4, 5, 6], insertBy.valueNow());
    }
    
    public function testBehaviorCollectionSort(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 6, 4, 8, 8, 7, 3, 2, 2, 0, 9, 7, 2]));
        
        var f = function(v1, v2) { return  v1 < v2; };
        
        var sort = BehaviorCollection.sort(behavior, f);
        
        assertIterableEquals([0, 1, 2, 2, 2, 3, 4, 6, 7, 7, 8, 8, 9], sort.valueNow());
    }
    
    public function testBehaviorCollectionDeleteFirstBy(): Void {
        var behavior1: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 6, 4, 8, 8]));
        var behavior2: Behavior<Collection<Int>> = Behaviors.constant(toCollection([8, 1, 9, 3, 2]));
        
        var f = function(v1, v2) { return  Filter.isEqual(v1, v2); };
        
        var deleteFirstBy = BehaviorCollection.deleteFirstByB(behavior1, behavior2, f);
        
        assertIterableEquals([6, 4, 8], deleteFirstBy.valueNow());
    }
    
    public function testBehaviorCollectionTails(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 0, 9, 7, 2]));
        
        var tails = BehaviorCollection.tails(behavior);
        
        assertIterableEquals([[1, 0, 9, 7, 2], [0, 9, 7, 2], [9, 7, 2], [7, 2], [2], []], colPump(tails.valueNow()));
    }
    
    public function testBehaviorCollectionWrap(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 0, 9, 7, 2]));
        
        var wrap = BehaviorCollection.wrap(behavior);
        
        assertIterableEquals([[1, 0, 9, 7, 2]], colPump(wrap.valueNow()));
    }
    
    public function testBehaviorCollectionToString(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 0, 9, 7, 2]));
        
        var toString = BehaviorCollection.toString(behavior);
        
        assertEquals("Collection(1, 0, 9, 7, 2)", toString.valueNow());
    }
    
    public function testBehaviorCollectionInstances(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([7, 1, 0, 9, 7, 2]));
        
        var instances = BehaviorCollection.instances(behavior, 7);
        
        assertEquals(2, instances.valueNow());
    }
    
    public function testBehaviorCollectionInstancesBy(): Void {
        var behavior: Behavior<Collection<Int>> = Behaviors.constant(toCollection([6, 1, 0, 9, 6, 2, 6]));
        
        var f = function(v1, v2) { return v2 * 2 == v1; };
        
        var instancesBy = BehaviorCollection.instancesBy(behavior, 3, f);
        
        assertEquals(3, instancesBy.valueNow());
    }
    
    public function testBehaviorCollectionMinus(): Void {
        var behavior1: Behavior<Collection<Int>> = Behaviors.constant(toCollection([6, 1, 0, 9, 6, 2, 6, 2]));
        var behavior2: Behavior<Collection<Int>> = Behaviors.constant(toCollection([1, 2, 3, 4, 5]));
        
        var minus = BehaviorCollection.minusB(behavior1, behavior2);
        
        assertIterableEquals([6, 0, 9, 6, 6], minus.valueNow());
    }
    
    
    
    
    
    
    
    
    




/*
*  <----------------  Private Functions  ---------------->
*
*/ 

    private function colPump<T>(collection: Collection<Collection<T>>): Array<Array<T>> {
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

    private function voidPump<T>(testStream: EventStream<T>, iter: Iterable<T>): Void {
        for (e in iter) {
            testStream.sendEvent(e);
        }
    }
    
    private function pump<T>(testStream: EventStream<T>, iter: Iterable<T>, eS: EventStream<T>): Array<T> {
        var eventStream = eS.toArray();
        
        for (e in iter) {
            testStream.sendEvent(e);
        }
        
        return eventStream;
    }
    
    private function pumpTuple2<T>(masterStream: EventStream<Int>, iter: Iterable<T>, arr_1: Array<T>, arr_2: Array<T>): Tuple2<Array<T>, Array<T>> {
        var eventStream1 = arr_1;
        var eventStream2 = arr_2;
        
        for (e in iter) {
            masterStream.sendEvent(e);
        }
        
        return Tuple2.from(eventStream1, eventStream2);
    }
    
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
    
    private function incrementCounter(): Void { 
        counter = counter + 1;
    }
    
    
    private function resetCounter(): Void {
        counter = 0;
    }
    
    private function getCounter(): Int{
        return counter;
    }
    
    private function stream<T>(): EventStream<T> {
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
    
    private function toCollection<S>(iter: Iterable<S>): Collection<S> {
         return new StrictCollectionAdapter<S>(iter);
     }
     
     private function singleton<S>(e: S): Collection<S> {
        return toCollection([e]);
    }
     
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
}